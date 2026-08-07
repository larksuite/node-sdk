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
import subscriptions from "./subscriptions";

// auto gen
export default abstract class Client extends subscriptions {
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
    task = {
        /**
         * task
         */
        task: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=task&version=v1 document }
             *
             * 查询指定任务
             *
             * 该接口用于获取任务详情，包括任务标题、描述、时间、来源等信息。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string };
                },
                options?: IRequestOptions
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
                                task?: {
                                    id?: string;
                                    summary?: string;
                                    description?: string;
                                    complete_time?: string;
                                    creator_id?: string;
                                    extra?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    due?: {
                                        time?: string;
                                        timezone?: string;
                                        is_all_day?: boolean;
                                    };
                                    origin: {
                                        platform_i18n_name: string;
                                        href?: { url?: string; title?: string };
                                    };
                                    can_edit?: boolean;
                                    custom?: string;
                                    source?: number;
                                    followers?: Array<{
                                        id?: string;
                                        id_list?: Array<string>;
                                    }>;
                                    collaborators?: Array<{
                                        id?: string;
                                        id_list?: Array<string>;
                                    }>;
                                    collaborator_ids?: Array<string>;
                                    follower_ids?: Array<string>;
                                    repeat_rule?: string;
                                    rich_summary?: string;
                                    rich_description?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id`,
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
                        start_create_time?: string;
                        end_create_time?: string;
                        task_completed?: boolean;
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
                                `${this.domain}/open-apis/task/v1/tasks`,
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
                                                    id?: string;
                                                    summary?: string;
                                                    description?: string;
                                                    complete_time?: string;
                                                    creator_id?: string;
                                                    extra?: string;
                                                    create_time?: string;
                                                    update_time?: string;
                                                    due?: {
                                                        time?: string;
                                                        timezone?: string;
                                                        is_all_day?: boolean;
                                                    };
                                                    origin: {
                                                        platform_i18n_name: string;
                                                        href?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                    };
                                                    can_edit?: boolean;
                                                    custom?: string;
                                                    source?: number;
                                                    followers?: Array<{
                                                        id?: string;
                                                        id_list?: Array<string>;
                                                    }>;
                                                    collaborators?: Array<{
                                                        id?: string;
                                                        id_list?: Array<string>;
                                                    }>;
                                                    collaborator_ids?: Array<string>;
                                                    follower_ids?: Array<string>;
                                                    repeat_rule?: string;
                                                    rich_summary?: string;
                                                    rich_description?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task&version=v1 document }
             *
             * 查询所有任务
             *
             * 以分页的方式获取任务列表。当使用user_access_token时，获取与该用户身份相关的所有任务。当使用tenant_access_token时，获取以该应用身份通过“创建任务“接口创建的所有任务（并非获取该应用所在租户下所有用户创建的任务）。;本接口支持通过任务创建时间以及任务的完成状态对任务进行过滤。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        start_create_time?: string;
                        end_create_time?: string;
                        task_completed?: boolean;
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
                                items?: Array<{
                                    id?: string;
                                    summary?: string;
                                    description?: string;
                                    complete_time?: string;
                                    creator_id?: string;
                                    extra?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    due?: {
                                        time?: string;
                                        timezone?: string;
                                        is_all_day?: boolean;
                                    };
                                    origin: {
                                        platform_i18n_name: string;
                                        href?: { url?: string; title?: string };
                                    };
                                    can_edit?: boolean;
                                    custom?: string;
                                    source?: number;
                                    followers?: Array<{
                                        id?: string;
                                        id_list?: Array<string>;
                                    }>;
                                    collaborators?: Array<{
                                        id?: string;
                                        id_list?: Array<string>;
                                    }>;
                                    collaborator_ids?: Array<string>;
                                    follower_ids?: Array<string>;
                                    repeat_rule?: string;
                                    rich_summary?: string;
                                    rich_description?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=batch_delete_follower&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete_follower&project=task&resource=task&version=v1 document }
             *
             * 批量删除关注人
             *
             * 该接口用于批量删除关注人。
             */
            batchDeleteFollower: async (
                payload?: {
                    data?: { id_list?: Array<string> };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { followers?: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/batch_delete_follower`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=batch_delete_collaborator&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete_collaborator&project=task&resource=task&version=v1 document }
             *
             * 批量删除执行者
             *
             * 该接口用于批量删除执行者。
             */
            batchDeleteCollaborator: async (
                payload?: {
                    data?: { id_list?: Array<string> };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { collaborators?: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/batch_delete_collaborator`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=uncomplete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=uncomplete&project=task&resource=task&version=v1 document }
             *
             * 取消完成任务
             *
             * 该接口用于取消任务的已完成状态。
             */
            uncomplete: async (
                payload?: {
                    path: { task_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/uncomplete`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task&version=v1 document }
             *
             * 删除任务
             *
             * 该接口用于删除任务。
             */
            delete: async (
                payload?: {
                    path: { task_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=task&version=v1 document }
             *
             * 更新任务
             *
             * 该接口用于修改任务的标题、描述、时间、来源等相关信息。
             */
            patch: async (
                payload?: {
                    data: {
                        task: {
                            summary?: string;
                            description?: string;
                            extra?: string;
                            due?: {
                                time?: string;
                                timezone?: string;
                                is_all_day?: boolean;
                            };
                            origin?: {
                                platform_i18n_name: string;
                                href?: { url?: string; title?: string };
                            };
                            can_edit?: boolean;
                            custom?: string;
                            followers?: Array<{
                                id?: string;
                                id_list?: Array<string>;
                            }>;
                            collaborators?: Array<{
                                id?: string;
                                id_list?: Array<string>;
                            }>;
                            collaborator_ids?: Array<string>;
                            follower_ids?: Array<string>;
                            repeat_rule?: string;
                            rich_summary?: string;
                            rich_description?: string;
                        };
                        update_fields: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string };
                },
                options?: IRequestOptions
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
                                task?: {
                                    id?: string;
                                    summary?: string;
                                    description?: string;
                                    complete_time?: string;
                                    creator_id?: string;
                                    extra?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    due?: {
                                        time?: string;
                                        timezone?: string;
                                        is_all_day?: boolean;
                                    };
                                    origin: {
                                        platform_i18n_name: string;
                                        href?: { url?: string; title?: string };
                                    };
                                    custom?: string;
                                    source?: number;
                                    followers?: Array<{
                                        id?: string;
                                        id_list?: Array<string>;
                                    }>;
                                    collaborators?: Array<{
                                        id?: string;
                                        id_list?: Array<string>;
                                    }>;
                                    collaborator_ids?: Array<string>;
                                    follower_ids?: Array<string>;
                                    repeat_rule?: string;
                                    rich_summary?: string;
                                    rich_description?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=complete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=complete&project=task&resource=task&version=v1 document }
             *
             * 完成任务
             *
             * 该接口用于将任务状态修改为“已完成”。;完成任务是指整个任务全部完成，而不支持执行者分别完成任务，执行成功后，任务对所有关联用户都变为完成状态。
             */
            complete: async (
                payload?: {
                    path: { task_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/complete`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task&version=v1 document }
             *
             * 创建任务
             *
             * 该接口可以创建一个任务，支持填写任务的基本信息，包括任务的标题，描述及协作者等。;在此基础上，创建任务时可以设置截止时间和重复规则，将任务设置为定期执行的重复任务。通过添加协作者，则可以让其他用户协同完成该任务。;此外，接口也提供了一些支持自定义内容的字段，调用方可以实现定制化效果，如完成任务后跳转到指定结束界面。
             */
            create: async (
                payload?: {
                    data: {
                        summary?: string;
                        description?: string;
                        extra?: string;
                        due?: {
                            time?: string;
                            timezone?: string;
                            is_all_day?: boolean;
                        };
                        origin: {
                            platform_i18n_name: string;
                            href?: { url?: string; title?: string };
                        };
                        can_edit?: boolean;
                        custom?: string;
                        collaborator_ids?: Array<string>;
                        follower_ids?: Array<string>;
                        repeat_rule?: string;
                        rich_summary?: string;
                        rich_description?: string;
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
                                task?: {
                                    id?: string;
                                    summary?: string;
                                    description?: string;
                                    complete_time?: string;
                                    creator_id?: string;
                                    extra?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    due?: {
                                        time?: string;
                                        timezone?: string;
                                        is_all_day?: boolean;
                                    };
                                    origin: {
                                        platform_i18n_name: string;
                                        href?: { url?: string; title?: string };
                                    };
                                    custom?: string;
                                    source?: number;
                                    followers?: Array<{
                                        id?: string;
                                        id_list?: Array<string>;
                                    }>;
                                    collaborators?: Array<{
                                        id?: string;
                                        id_list?: Array<string>;
                                    }>;
                                    collaborator_ids?: Array<string>;
                                    follower_ids?: Array<string>;
                                    repeat_rule?: string;
                                    rich_summary?: string;
                                    rich_description?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks`,
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
         * task.comment
         */
        taskComment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task.comment&version=v1 document }
             *
             * 删除评论
             *
             * 该接口用于通过评论ID删除评论。
             */
            delete: async (
                payload?: {
                    path: { task_id: string; comment_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/comments/:comment_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=task.comment&version=v1 document }
             *
             * 获取评论详情
             *
             * 该接口用于通过评论ID获取评论详情。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string; comment_id: string };
                },
                options?: IRequestOptions
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
                                comment?: {
                                    content?: string;
                                    parent_id?: string;
                                    id?: string;
                                    create_milli_time?: string;
                                    rich_content?: string;
                                    creator_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/comments/:comment_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=task&resource=task.comment&version=v1 document }
             *
             * 更新评论
             *
             * 该接口用于更新评论内容。
             */
            update: async (
                payload?: {
                    data?: { content?: string; rich_content?: string };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string; comment_id: string };
                },
                options?: IRequestOptions
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
                                comment?: {
                                    content?: string;
                                    parent_id?: string;
                                    id?: string;
                                    create_milli_time?: string;
                                    rich_content?: string;
                                    creator_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/comments/:comment_id`,
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
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        list_direction?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { task_id?: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/comments`,
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
                                                    content?: string;
                                                    parent_id?: string;
                                                    id?: string;
                                                    create_milli_time?: string;
                                                    rich_content?: string;
                                                    creator_id?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task.comment&version=v1 document }
             *
             * 获取评论列表
             *
             * 该接口用于查询任务评论列表，支持分页，最大值为100。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        list_direction?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { task_id?: string };
                },
                options?: IRequestOptions
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
                                    content?: string;
                                    parent_id?: string;
                                    id?: string;
                                    create_milli_time?: string;
                                    rich_content?: string;
                                    creator_id?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/comments`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task.comment&version=v1 document }
             *
             * 创建评论
             *
             * 该接口用于创建和回复任务的评论。当parent_id字段为0时，为创建评论；当parent_id不为0时，为回复某条评论。
             */
            create: async (
                payload?: {
                    data?: {
                        content?: string;
                        parent_id?: string;
                        create_milli_time?: string;
                        rich_content?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string };
                },
                options?: IRequestOptions
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
                                comment?: {
                                    content?: string;
                                    parent_id?: string;
                                    id?: string;
                                    create_milli_time?: string;
                                    rich_content?: string;
                                    creator_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/comments`,
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
         * task.collaborator
         */
        taskCollaborator: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { task_id?: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators`,
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
                                                    id?: string;
                                                    id_list?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task.collaborator&version=v1 document }
             *
             * 获取执行者列表
             *
             * 该接口用于查询任务执行者列表，支持分页，最大值为50。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { task_id?: string };
                },
                options?: IRequestOptions
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
                                    id_list?: Array<string>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task.collaborator&version=v1 document }
             *
             * 删除指定执行者
             *
             * 该接口用于删除任务执行者。
             */
            delete: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string; collaborator_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators/:collaborator_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task.collaborator&version=v1 document }
             *
             * 新增执行者
             *
             * 该接口用于新增任务执行者，一次性可以添加多个执行者。;只有任务的创建者和执行者才能添加执行者，关注人无权限添加。
             */
            create: async (
                payload?: {
                    data?: { id?: string; id_list?: Array<string> };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string };
                },
                options?: IRequestOptions
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
                                collaborator: {
                                    id?: string;
                                    id_list?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators`,
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
         * task.follower
         */
        taskFollower: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { task_id?: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/followers`,
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
                                                    id?: string;
                                                    id_list?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task.follower&version=v1 document }
             *
             * 获取关注人列表
             *
             * 该接口用于查询任务关注人列表，支持分页，最大值为50。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { task_id?: string };
                },
                options?: IRequestOptions
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
                                    id_list?: Array<string>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/followers`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task.follower&version=v1 document }
             *
             * 新增关注人
             *
             * 该接口用于新增任务关注人。可以一次性添加多位关注人。关注人ID要使用表示用户的ID。
             */
            create: async (
                payload?: {
                    data?: { id?: string; id_list?: Array<string> };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string };
                },
                options?: IRequestOptions
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
                                follower: {
                                    id?: string;
                                    id_list?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/followers`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task.follower&version=v1 document }
             *
             * 删除指定关注人
             *
             * 该接口用于删除任务关注人。
             */
            delete: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string; follower_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/followers/:follower_id`,
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
         * task.reminder
         */
        taskReminder: {
            listWithIterator: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path?: { task_id?: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/reminders`,
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
                                                    id?: string;
                                                    relative_fire_minute: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task.reminder&version=v1 document }
             *
             * 查询提醒时间列表
             *
             * 返回提醒时间列表，支持分页，最大值为50。
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path?: { task_id?: string };
                },
                options?: IRequestOptions
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
                                    relative_fire_minute: number;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/reminders`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task.reminder&version=v1 document }
             *
             * 新增提醒时间
             *
             * 该接口用于创建任务的提醒时间。提醒时间在截止时间基础上做偏移，但是偏移后的结果不能早于当前时间。
             */
            create: async (
                payload?: {
                    data: { relative_fire_minute: number };
                    path: { task_id: string };
                },
                options?: IRequestOptions
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
                                reminder?: {
                                    id?: string;
                                    relative_fire_minute: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/reminders`,
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task.reminder&version=v1 document }
             *
             * 删除提醒时间
             *
             * 删除提醒时间，返回结果状态。
             */
            delete: async (
                payload?: {
                    path: { task_id: string; reminder_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/task/v1/tasks/:task_id/reminders/:reminder_id`,
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
        v1: {
            /**
             * task
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=task&version=v1 document }
                 *
                 * 查询指定任务
                 *
                 * 该接口用于获取任务详情，包括任务标题、描述、时间、来源等信息。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        id?: string;
                                        summary?: string;
                                        description?: string;
                                        complete_time?: string;
                                        creator_id?: string;
                                        extra?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        due?: {
                                            time?: string;
                                            timezone?: string;
                                            is_all_day?: boolean;
                                        };
                                        origin: {
                                            platform_i18n_name: string;
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                        };
                                        can_edit?: boolean;
                                        custom?: string;
                                        source?: number;
                                        followers?: Array<{
                                            id?: string;
                                            id_list?: Array<string>;
                                        }>;
                                        collaborators?: Array<{
                                            id?: string;
                                            id_list?: Array<string>;
                                        }>;
                                        collaborator_ids?: Array<string>;
                                        follower_ids?: Array<string>;
                                        repeat_rule?: string;
                                        rich_summary?: string;
                                        rich_description?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id`,
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
                            start_create_time?: string;
                            end_create_time?: string;
                            task_completed?: boolean;
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
                                    `${this.domain}/open-apis/task/v1/tasks`,
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
                                                        summary?: string;
                                                        description?: string;
                                                        complete_time?: string;
                                                        creator_id?: string;
                                                        extra?: string;
                                                        create_time?: string;
                                                        update_time?: string;
                                                        due?: {
                                                            time?: string;
                                                            timezone?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        origin: {
                                                            platform_i18n_name: string;
                                                            href?: {
                                                                url?: string;
                                                                title?: string;
                                                            };
                                                        };
                                                        can_edit?: boolean;
                                                        custom?: string;
                                                        source?: number;
                                                        followers?: Array<{
                                                            id?: string;
                                                            id_list?: Array<string>;
                                                        }>;
                                                        collaborators?: Array<{
                                                            id?: string;
                                                            id_list?: Array<string>;
                                                        }>;
                                                        collaborator_ids?: Array<string>;
                                                        follower_ids?: Array<string>;
                                                        repeat_rule?: string;
                                                        rich_summary?: string;
                                                        rich_description?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task&version=v1 document }
                 *
                 * 查询所有任务
                 *
                 * 以分页的方式获取任务列表。当使用user_access_token时，获取与该用户身份相关的所有任务。当使用tenant_access_token时，获取以该应用身份通过“创建任务“接口创建的所有任务（并非获取该应用所在租户下所有用户创建的任务）。;本接口支持通过任务创建时间以及任务的完成状态对任务进行过滤。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            start_create_time?: string;
                            end_create_time?: string;
                            task_completed?: boolean;
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
                                    items?: Array<{
                                        id?: string;
                                        summary?: string;
                                        description?: string;
                                        complete_time?: string;
                                        creator_id?: string;
                                        extra?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        due?: {
                                            time?: string;
                                            timezone?: string;
                                            is_all_day?: boolean;
                                        };
                                        origin: {
                                            platform_i18n_name: string;
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                        };
                                        can_edit?: boolean;
                                        custom?: string;
                                        source?: number;
                                        followers?: Array<{
                                            id?: string;
                                            id_list?: Array<string>;
                                        }>;
                                        collaborators?: Array<{
                                            id?: string;
                                            id_list?: Array<string>;
                                        }>;
                                        collaborator_ids?: Array<string>;
                                        follower_ids?: Array<string>;
                                        repeat_rule?: string;
                                        rich_summary?: string;
                                        rich_description?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=batch_delete_follower&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete_follower&project=task&resource=task&version=v1 document }
                 *
                 * 批量删除关注人
                 *
                 * 该接口用于批量删除关注人。
                 */
                batchDeleteFollower: async (
                    payload?: {
                        data?: { id_list?: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { followers?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/batch_delete_follower`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=batch_delete_collaborator&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete_collaborator&project=task&resource=task&version=v1 document }
                 *
                 * 批量删除执行者
                 *
                 * 该接口用于批量删除执行者。
                 */
                batchDeleteCollaborator: async (
                    payload?: {
                        data?: { id_list?: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { collaborators?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/batch_delete_collaborator`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=uncomplete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=uncomplete&project=task&resource=task&version=v1 document }
                 *
                 * 取消完成任务
                 *
                 * 该接口用于取消任务的已完成状态。
                 */
                uncomplete: async (
                    payload?: {
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/uncomplete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task&version=v1 document }
                 *
                 * 删除任务
                 *
                 * 该接口用于删除任务。
                 */
                delete: async (
                    payload?: {
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=task&version=v1 document }
                 *
                 * 更新任务
                 *
                 * 该接口用于修改任务的标题、描述、时间、来源等相关信息。
                 */
                patch: async (
                    payload?: {
                        data: {
                            task: {
                                summary?: string;
                                description?: string;
                                extra?: string;
                                due?: {
                                    time?: string;
                                    timezone?: string;
                                    is_all_day?: boolean;
                                };
                                origin?: {
                                    platform_i18n_name: string;
                                    href?: { url?: string; title?: string };
                                };
                                can_edit?: boolean;
                                custom?: string;
                                followers?: Array<{
                                    id?: string;
                                    id_list?: Array<string>;
                                }>;
                                collaborators?: Array<{
                                    id?: string;
                                    id_list?: Array<string>;
                                }>;
                                collaborator_ids?: Array<string>;
                                follower_ids?: Array<string>;
                                repeat_rule?: string;
                                rich_summary?: string;
                                rich_description?: string;
                            };
                            update_fields: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        id?: string;
                                        summary?: string;
                                        description?: string;
                                        complete_time?: string;
                                        creator_id?: string;
                                        extra?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        due?: {
                                            time?: string;
                                            timezone?: string;
                                            is_all_day?: boolean;
                                        };
                                        origin: {
                                            platform_i18n_name: string;
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                        };
                                        custom?: string;
                                        source?: number;
                                        followers?: Array<{
                                            id?: string;
                                            id_list?: Array<string>;
                                        }>;
                                        collaborators?: Array<{
                                            id?: string;
                                            id_list?: Array<string>;
                                        }>;
                                        collaborator_ids?: Array<string>;
                                        follower_ids?: Array<string>;
                                        repeat_rule?: string;
                                        rich_summary?: string;
                                        rich_description?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=complete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=complete&project=task&resource=task&version=v1 document }
                 *
                 * 完成任务
                 *
                 * 该接口用于将任务状态修改为“已完成”。;完成任务是指整个任务全部完成，而不支持执行者分别完成任务，执行成功后，任务对所有关联用户都变为完成状态。
                 */
                complete: async (
                    payload?: {
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/complete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task&version=v1 document }
                 *
                 * 创建任务
                 *
                 * 该接口可以创建一个任务，支持填写任务的基本信息，包括任务的标题，描述及协作者等。;在此基础上，创建任务时可以设置截止时间和重复规则，将任务设置为定期执行的重复任务。通过添加协作者，则可以让其他用户协同完成该任务。;此外，接口也提供了一些支持自定义内容的字段，调用方可以实现定制化效果，如完成任务后跳转到指定结束界面。
                 */
                create: async (
                    payload?: {
                        data: {
                            summary?: string;
                            description?: string;
                            extra?: string;
                            due?: {
                                time?: string;
                                timezone?: string;
                                is_all_day?: boolean;
                            };
                            origin: {
                                platform_i18n_name: string;
                                href?: { url?: string; title?: string };
                            };
                            can_edit?: boolean;
                            custom?: string;
                            collaborator_ids?: Array<string>;
                            follower_ids?: Array<string>;
                            repeat_rule?: string;
                            rich_summary?: string;
                            rich_description?: string;
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
                                    task?: {
                                        id?: string;
                                        summary?: string;
                                        description?: string;
                                        complete_time?: string;
                                        creator_id?: string;
                                        extra?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        due?: {
                                            time?: string;
                                            timezone?: string;
                                            is_all_day?: boolean;
                                        };
                                        origin: {
                                            platform_i18n_name: string;
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                        };
                                        custom?: string;
                                        source?: number;
                                        followers?: Array<{
                                            id?: string;
                                            id_list?: Array<string>;
                                        }>;
                                        collaborators?: Array<{
                                            id?: string;
                                            id_list?: Array<string>;
                                        }>;
                                        collaborator_ids?: Array<string>;
                                        follower_ids?: Array<string>;
                                        repeat_rule?: string;
                                        rich_summary?: string;
                                        rich_description?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks`,
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
             * task.comment
             */
            taskComment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task.comment&version=v1 document }
                 *
                 * 删除评论
                 *
                 * 该接口用于通过评论ID删除评论。
                 */
                delete: async (
                    payload?: {
                        path: { task_id: string; comment_id: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/comments/:comment_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=task.comment&version=v1 document }
                 *
                 * 获取评论详情
                 *
                 * 该接口用于通过评论ID获取评论详情。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string; comment_id: string };
                    },
                    options?: IRequestOptions
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
                                    comment?: {
                                        content?: string;
                                        parent_id?: string;
                                        id?: string;
                                        create_milli_time?: string;
                                        rich_content?: string;
                                        creator_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/comments/:comment_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=task&resource=task.comment&version=v1 document }
                 *
                 * 更新评论
                 *
                 * 该接口用于更新评论内容。
                 */
                update: async (
                    payload?: {
                        data?: { content?: string; rich_content?: string };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string; comment_id: string };
                    },
                    options?: IRequestOptions
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
                                    comment?: {
                                        content?: string;
                                        parent_id?: string;
                                        id?: string;
                                        create_milli_time?: string;
                                        rich_content?: string;
                                        creator_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/comments/:comment_id`,
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
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            list_direction?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { task_id?: string };
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
                                    `${this.domain}/open-apis/task/v1/tasks/:task_id/comments`,
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
                                                        content?: string;
                                                        parent_id?: string;
                                                        id?: string;
                                                        create_milli_time?: string;
                                                        rich_content?: string;
                                                        creator_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task.comment&version=v1 document }
                 *
                 * 获取评论列表
                 *
                 * 该接口用于查询任务评论列表，支持分页，最大值为100。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            list_direction?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { task_id?: string };
                    },
                    options?: IRequestOptions
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
                                        content?: string;
                                        parent_id?: string;
                                        id?: string;
                                        create_milli_time?: string;
                                        rich_content?: string;
                                        creator_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/comments`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task.comment&version=v1 document }
                 *
                 * 创建评论
                 *
                 * 该接口用于创建和回复任务的评论。当parent_id字段为0时，为创建评论；当parent_id不为0时，为回复某条评论。
                 */
                create: async (
                    payload?: {
                        data?: {
                            content?: string;
                            parent_id?: string;
                            create_milli_time?: string;
                            rich_content?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
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
                                    comment?: {
                                        content?: string;
                                        parent_id?: string;
                                        id?: string;
                                        create_milli_time?: string;
                                        rich_content?: string;
                                        creator_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/comments`,
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
             * task.collaborator
             */
            taskCollaborator: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { task_id?: string };
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
                                    `${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators`,
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
                                                        id_list?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task.collaborator&version=v1 document }
                 *
                 * 获取执行者列表
                 *
                 * 该接口用于查询任务执行者列表，支持分页，最大值为50。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { task_id?: string };
                    },
                    options?: IRequestOptions
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
                                        id_list?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task.collaborator&version=v1 document }
                 *
                 * 删除指定执行者
                 *
                 * 该接口用于删除任务执行者。
                 */
                delete: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string; collaborator_id: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators/:collaborator_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task.collaborator&version=v1 document }
                 *
                 * 新增执行者
                 *
                 * 该接口用于新增任务执行者，一次性可以添加多个执行者。;只有任务的创建者和执行者才能添加执行者，关注人无权限添加。
                 */
                create: async (
                    payload?: {
                        data?: { id?: string; id_list?: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
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
                                    collaborator: {
                                        id?: string;
                                        id_list?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators`,
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
             * task.follower
             */
            taskFollower: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { task_id?: string };
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
                                    `${this.domain}/open-apis/task/v1/tasks/:task_id/followers`,
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
                                                        id_list?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task.follower&version=v1 document }
                 *
                 * 获取关注人列表
                 *
                 * 该接口用于查询任务关注人列表，支持分页，最大值为50。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { task_id?: string };
                    },
                    options?: IRequestOptions
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
                                        id_list?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/followers`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task.follower&version=v1 document }
                 *
                 * 新增关注人
                 *
                 * 该接口用于新增任务关注人。可以一次性添加多位关注人。关注人ID要使用表示用户的ID。
                 */
                create: async (
                    payload?: {
                        data?: { id?: string; id_list?: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
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
                                    follower: {
                                        id?: string;
                                        id_list?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/followers`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task.follower&version=v1 document }
                 *
                 * 删除指定关注人
                 *
                 * 该接口用于删除任务关注人。
                 */
                delete: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string; follower_id: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/followers/:follower_id`,
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
             * task.reminder
             */
            taskReminder: {
                listWithIterator: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path?: { task_id?: string };
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
                                    `${this.domain}/open-apis/task/v1/tasks/:task_id/reminders`,
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
                                                        relative_fire_minute: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task.reminder&version=v1 document }
                 *
                 * 查询提醒时间列表
                 *
                 * 返回提醒时间列表，支持分页，最大值为50。
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path?: { task_id?: string };
                    },
                    options?: IRequestOptions
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
                                        relative_fire_minute: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/reminders`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task.reminder&version=v1 document }
                 *
                 * 新增提醒时间
                 *
                 * 该接口用于创建任务的提醒时间。提醒时间在截止时间基础上做偏移，但是偏移后的结果不能早于当前时间。
                 */
                create: async (
                    payload?: {
                        data: { relative_fire_minute: number };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
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
                                    reminder?: {
                                        id?: string;
                                        relative_fire_minute: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/reminders`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task.reminder&version=v1 document }
                 *
                 * 删除提醒时间
                 *
                 * 删除提醒时间，返回结果状态。
                 */
                delete: async (
                    payload?: {
                        path: { task_id: string; reminder_id: string };
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
                                `${this.domain}/open-apis/task/v1/tasks/:task_id/reminders/:reminder_id`,
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
        },
        v2: {
            /**
             * tasklist
             */
            tasklist: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=task_statistics&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=task_statistics&project=task&resource=tasklist&version=v2 document }
                 */
                taskStatistics: async (
                    payload?: {
                        path?: { tasklist_guid?: string };
                    },
                    options?: IRequestOptions
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
                                    task_statistics?: {
                                        total_tasks_count?: number;
                                        total_completed_tasks_count?: number;
                                        total_uncompleted_tasks_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/task_statistics`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=tasks&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=tasks&project=task&resource=tasklist&version=v2 document }
                 *
                 * 获取清单任务列表
                 *
                 * 获取一个清单的任务列表，返回任务的摘要信息。;;本接口支持分页。清单中的任务以“自定义拖拽”的顺序返回。;;本接口支持简单的按照任务的完成状态或者任务的创建时间范围过滤。;;分页参数说明：是否还有分页数据的判断依据是has_more=true，并非items个数，由于历史原因可能出现当前分页items为空的情况。
                 *
                 * 需要清单读取权限。详情见[清单功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/overview)中的“清单是如何鉴权的？“章节。
                 */
                tasks: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            completed?: boolean;
                            created_from?: string;
                            created_to?: string;
                            user_id_type?: string;
                        };
                        path: { tasklist_guid: string };
                    },
                    options?: IRequestOptions
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
                                        guid?: string;
                                        summary?: string;
                                        completed_at?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        subtask_count?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/tasks`,
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
                activityRecordsWithIterator: async (
                    payload?: {
                        params?: {
                            page_count?: number;
                            page_token?: string;
                            locale?: "zh_cn" | "en_us" | "ja_jp";
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            timezone?: string;
                            time_range?: "today";
                            page_size?: number;
                        };
                        path: { tasklist_guid: string };
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
                                    `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/activity_records`,
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
                                                        key?: number;
                                                        content?: string;
                                                        created_at?: string;
                                                        op_user?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        key_name?: string;
                                                        target_task_guid?: string;
                                                        target_task_name?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=activity_records&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=activity_records&project=task&resource=tasklist&version=v2 document }
                 */
                activityRecords: async (
                    payload?: {
                        params?: {
                            page_count?: number;
                            page_token?: string;
                            locale?: "zh_cn" | "en_us" | "ja_jp";
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            timezone?: string;
                            time_range?: "today";
                            page_size?: number;
                        };
                        path: { tasklist_guid: string };
                    },
                    options?: IRequestOptions
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
                                        key?: number;
                                        content?: string;
                                        created_at?: string;
                                        op_user?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        key_name?: string;
                                        target_task_guid?: string;
                                        target_task_name?: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/activity_records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=add_subscribers&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_subscribers&project=task&resource=tasklist&version=v2 document }
                 */
                addSubscribers: async (
                    payload?: {
                        data: {
                            subscribers: Array<{
                                id?: string;
                                type?: string;
                                role?: string;
                                name?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { tasklist_guid: string };
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
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/add_subscribers`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=tasklist&version=v2 document }
                 *
                 * 删除清单
                 *
                 * 删除一个清单。;;删除清单后，不可对该清单做任何操作，也无法再访问到清单。清单被删除后不可恢复。
                 *
                 * 删除清单需要清单管理权限。详情见[清单功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/overview)中的“清单是如何鉴权的？“章节。
                 */
                delete: async (
                    payload?: {
                        path?: { tasklist_guid?: string };
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
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=remove_subscribers&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_subscribers&project=task&resource=tasklist&version=v2 document }
                 */
                removeSubscribers: async (
                    payload?: {
                        data?: {
                            subscribers?: Array<{
                                id?: string;
                                type?: string;
                                role?: string;
                                name?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path?: { tasklist_guid?: string };
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
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/remove_subscribers`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=tasklist&version=v2 document }
                 *
                 * 获取清单详情
                 *
                 * 获取一个清单的详细信息，包括清单名，所有者，清单成员等。
                 *
                 * 需要清单的读取权限。详情见[清单功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/overview)中的“清单是如何鉴权的？“章节。
                 */
                get: async (
                    payload?: {
                        params?: { user_id_type?: string };
                        path?: { tasklist_guid?: string };
                    },
                    options?: IRequestOptions
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
                                    tasklist?: {
                                        guid?: string;
                                        name?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        owner?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        archive_msec?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid`,
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
                            user_id_type?: string;
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
                                    `${this.domain}/open-apis/task/v2/tasklists`,
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
                                                        guid?: string;
                                                        name?: string;
                                                        creator?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        owner?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        members?: Array<{
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        }>;
                                                        url?: string;
                                                        created_at?: string;
                                                        updated_at?: string;
                                                        archive_msec?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=tasklist&version=v2 document }
                 *
                 * 获取清单列表
                 *
                 * 获取调用身份所有可读取的清单列表。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: string;
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
                                        guid?: string;
                                        name?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        owner?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        archive_msec?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=detail&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=detail&project=task&resource=tasklist&version=v2 document }
                 *
                 * 查询企业清单详情;
                 *
                 * 获取（企业下所有用户的）清单详细信息，包括清单名，所有者，清单成员等。;
                 */
                detail: async (
                    payload?: {
                        path: { tasklist_guid: string };
                    },
                    options?: IRequestOptions
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
                                    tasklist?: {
                                        guid?: string;
                                        name?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        owner?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        archive_msec?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/detail`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=add_members&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_members&project=task&resource=tasklist&version=v2 document }
                 *
                 * 添加清单成员
                 *
                 * 向一个清单添加1个或多个协作成员。成员信息通过设置`members`字段实现。关于member的格式，详见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 如何表示任务和清单的成员？”章节。;;一个清单协作成员可以是一个用户，应用或者群组。每个成员可以设置“可编辑”或者“可阅读”的角色。群组作为协作成员表示该群里所有群成员都自动拥有群组协作成员的角色。;;如果要添加的成员已经是清单成员，且角色和请求中设置是一样的，则会被自动忽略，接口返回成功。;;如果要添加的成员已经是清单成员，且角色和请求中设置是不一样的（比如原来的角色是可阅读，请求中设为可编辑），则相当于更新其角色。;;如果要添加的成员已经是清单的所有者，则会被自动忽略。接口返回成功。其所有者的角色不会改变。;;本接口不能用来设置清单所有者，如要设置，可以使用[更新清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/patch)接口。
                 *
                 * 需要清单编辑权限。详情见[清单功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/overview)中的“清单是如何鉴权的？“章节。
                 */
                addMembers: async (
                    payload?: {
                        data: {
                            members: Array<{
                                id?: string;
                                type?: string;
                                role?: string;
                                name?: string;
                            }>;
                        };
                        params?: { user_id_type?: string };
                        path?: { tasklist_guid?: string };
                    },
                    options?: IRequestOptions
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
                                    tasklist?: {
                                        guid?: string;
                                        name?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        owner?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        archive_msec?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/add_members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=remove_members&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_members&project=task&resource=tasklist&version=v2 document }
                 *
                 * 移除清单成员
                 *
                 * 移除清单的一个或多个协作成员。通过设置`members`字段表示要移除的成员信息。关于member的格式，详见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 如何表示任务和清单的成员？”章节。;;清单中同一个成员只能有一个角色，通过的member的id和type可以唯一确定一个成员，因此请求参数中对于要删除的成员，不需要填写"role"字段。;;如果要移除的成员不在清单中，则被自动忽略，接口返回成功。;;该接口不能用于移除清单所有者。如果要移除的成员是清单所有者，则会被自动忽略。如要设置清单所有者，需要调用[更新清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/patch)接口。
                 *
                 * 需要清单编辑权限。详情见[清单功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/overview)中的“清单是如何鉴权的？“章节。
                 */
                removeMembers: async (
                    payload?: {
                        data: {
                            members: Array<{
                                id?: string;
                                type?: string;
                                role?: string;
                                name?: string;
                            }>;
                        };
                        params?: { user_id_type?: string };
                        path?: { tasklist_guid?: string };
                    },
                    options?: IRequestOptions
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
                                    tasklist?: {
                                        guid?: string;
                                        name?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        owner?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        archive_msec?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/remove_members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=tasklist&version=v2 document }
                 *
                 * 创建清单
                 *
                 * 创建一个清单。清单可以用于组织和管理属于同一个项目的多个任务。;;创建时，必须填写清单的名字。同时，可以设置通过`members`字段设置清单的协作成员。关于member的格式，详见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 如何表示任务和清单的成员？”章节。;;创建清单后，创建人自动成为清单的所有者。如果请求同时将创建人设置为可编辑/可阅读角色，则最终该用户成为清单所有者，并自动从清单成员列表中消失。因为同一个用户在同一个清单只能拥有一个角色。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            members?: Array<{
                                id?: string;
                                type?: string;
                                role?: string;
                                name?: string;
                            }>;
                            archive_tasklist?: boolean;
                        };
                        params?: { user_id_type?: string };
                    },
                    options?: IRequestOptions
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
                                    tasklist?: {
                                        guid?: string;
                                        name?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        owner?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        archive_msec?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=tasklist&version=v2 document }
                 *
                 * 更新清单
                 *
                 * 更新清单，可以更新清单的名字和所有者。;;更新清单时，将`update_fields`字段中填写所有要修改的清单字段名，同时在`tasklist`字段中填写要修改的字段的新值即可。更新调用规范详见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 关于资源的更新”章节。;;支持更新的字段包括:;;* `name` - 清单名字;* `owner` - 清单所有者;;更新清单所有者（owner）时，如果该成员已经是清单的“可编辑”或者“可阅读”角色，则该成员将直接升级为所有者角色，自动从清单的成员列表中消失。这是因为同一个用户在同一个清单中只能有一个角色。同时，支持使用`origin_owner_to_role`字段将原有所有者变为可编辑/可阅读角色或者直接退出清单。;;该接口不能用于更新清单的成员和增删清单中的任务。;* 如要增删清单中的成员，可以使用[添加清单成员](https://open.feishu.cn/document:/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/add_members)和[移除清单成员](https://open.feishu.cn/document:/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/remove_members)接口。;* 如要增删清单中的任务，可以使用[任务加入清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_tasklist)和[任务移出清单]( https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_tasklist)接口。
                 *
                 * 更新清单名字需要清单的编辑权限。;;更新清单所有人必须由清单的管理权限。;;详情见[清单功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/overview)中的“清单是如何鉴权的？“章节。
                 */
                patch: async (
                    payload?: {
                        data: {
                            tasklist: {
                                name?: string;
                                owner?: {
                                    id?: string;
                                    type?: string;
                                    role?: string;
                                    name?: string;
                                };
                                archive_tasklist?: boolean;
                            };
                            update_fields: Array<string>;
                            origin_owner_to_role?: "editor" | "viewer" | "none";
                        };
                        params?: { user_id_type?: string };
                        path: { tasklist_guid: string };
                    },
                    options?: IRequestOptions
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
                                    tasklist?: {
                                        guid?: string;
                                        name?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        owner?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        archive_msec?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=assign_container_to_section&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=assign_container_to_section&project=task&resource=tasklist&version=v2 document }
                 */
                assignContainerToSection: async (
                    payload?: {
                        data?: {
                            insert_before?: string;
                            insert_after?: string;
                            section_guid?: string;
                            user_id_type?: string;
                            target_user_id?: string;
                        };
                        path: { tasklist_guid: string };
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
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/assign_container_to_section`,
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
                searchWithIterator: async (
                    payload?: {
                        data?: {
                            query?: string;
                            filter?: {
                                create_time?: {
                                    start_time?: string;
                                    end_time?: string;
                                };
                                user_id?: Array<string>;
                            };
                        };
                        params?: {
                            page_size?: number;
                            page_token?: string;
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
                                    `${this.domain}/open-apis/task/v2/tasklists/search`,
                                    path
                                ),
                                method: "POST",
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
                                                        id: string;
                                                        display_info?: string;
                                                        meta_data?: {
                                                            app_link?: string;
                                                            avatar?: string;
                                                            description?: string;
                                                        };
                                                    }>;
                                                    total?: number;
                                                    has_more: boolean;
                                                    page_token?: string;
                                                    notice?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=task&resource=tasklist&version=v2 document }
                 *
                 * 搜索清单
                 *
                 * 通过清单关键词搜索清单的信息，包括清单名称、清单ID、清单链接、清单描述
                 */
                search: async (
                    payload?: {
                        data?: {
                            query?: string;
                            filter?: {
                                create_time?: {
                                    start_time?: string;
                                    end_time?: string;
                                };
                                user_id?: Array<string>;
                            };
                        };
                        params?: {
                            page_size?: number;
                            page_token?: string;
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
                                    items: Array<{
                                        id: string;
                                        display_info?: string;
                                        meta_data?: {
                                            app_link?: string;
                                            avatar?: string;
                                            description?: string;
                                        };
                                    }>;
                                    total?: number;
                                    has_more: boolean;
                                    page_token?: string;
                                    notice?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/search`,
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
             * task
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=tasklists&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=tasklists&project=task&resource=task&version=v2 document }
                 *
                 * 列取任务所在清单
                 *
                 * 列取一个任务所在的所有清单的信息，包括清单的GUID和所在自定义分组的GUID。;;只有调用身份有权限访问的清单信息会被返回。
                 *
                 * 调用身份需要拥有任务的读取权限。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                tasklists: async (
                    payload?: {
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    tasklists?: Array<{
                                        tasklist_guid?: string;
                                        section_guid?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/tasklists`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=statistics&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=statistics&project=task&resource=task&version=v2 document }
                 */
                statistics: async (
                    payload?: {
                        params?: { type?: string };
                    },
                    options?: IRequestOptions
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
                                    statistics?: {
                                        total_tasks_count?: number;
                                        total_completed_tasks_count?: number;
                                        total_uncompleted_tasks_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/statistics`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task&version=v2 document }
                 *
                 * 删除任务
                 *
                 * 删除一个任务。;;删除后任务无法再被获取到。
                 *
                 * 删除任务需要任务的可编辑权限。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                delete: async (
                    payload?: {
                        path: { task_guid: string };
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
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=add_dependencies&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_dependencies&project=task&resource=task&version=v2 document }
                 *
                 * 添加依赖
                 *
                 * 为一个任务添加一个或多个依赖。可以添加任务的前置依赖和后置依赖。存在依赖关系的任务如果在同一个清单，可以通过清单的甘特图来展示其依赖关系。;;本接口也可以用于修改一个现有依赖的类型（前置改为后置或者后置改为前置）。;;注意：添加的依赖的`task_guid`不能重复，也不能添加当前任务为自己的依赖。尝试添加一个已经存在的依赖会被自动忽略。
                 *
                 * 添加任务依赖调用身份需要拥有当前任务的编辑权限和所有被添加为依赖的任务的编辑权限。
                 */
                addDependencies: async (
                    payload?: {
                        data?: {
                            dependencies?: Array<{
                                type: "prev" | "next";
                                task_guid: string;
                            }>;
                        };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    dependencies?: Array<{
                                        type: "prev" | "next";
                                        task_guid: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/add_dependencies`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=remove_dependencies&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_dependencies&project=task&resource=task&version=v2 document }
                 *
                 * 移除依赖
                 *
                 * 从一个任务移除一个或者多个依赖。移除时只需要输入要移除的`task_guid`即可。;;注意，如果要移除的依赖非当前任务的依赖，会被自动忽略。接口会返回成功。
                 *
                 * 移除任务依赖时，需要当前任务的编辑权限。
                 */
                removeDependencies: async (
                    payload?: {
                        data: { dependencies: Array<{ task_guid: string }> };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    dependencies?: Array<{
                                        type: "prev" | "next";
                                        task_guid: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/remove_dependencies`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=user_complete_task_status&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_complete_task_status&project=task&resource=task&version=v2 document }
                 */
                userCompleteTaskStatus: async (
                    payload?: {
                        data?: {
                            be_completed_user_id?: string;
                            complete?: boolean;
                            user_id_type?: string;
                            target_user_id?: string;
                        };
                        path: { task_guid: string };
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
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/user_complete_task_status`,
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
                searchWithIterator: async (
                    payload?: {
                        data?: {
                            query?: string;
                            filter?: {
                                creator_ids?: Array<string>;
                                assignee_ids?: Array<string>;
                                is_completed?: boolean;
                                due_time?: {
                                    start_time?: string;
                                    end_time?: string;
                                };
                                follower_ids?: Array<string>;
                            };
                        };
                        params?: {
                            page_size?: number;
                            page_token?: string;
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
                                    `${this.domain}/open-apis/task/v2/tasks/search`,
                                    path
                                ),
                                method: "POST",
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
                                                        id: string;
                                                        display_info?: string;
                                                        meta_data?: {
                                                            app_link?: string;
                                                            avatar?: string;
                                                            description?: string;
                                                        };
                                                    }>;
                                                    total?: number;
                                                    has_more: boolean;
                                                    page_token?: string;
                                                    notice?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=task&resource=task&version=v2 document }
                 *
                 * 搜索任务
                 *
                 * 通过任务关键词搜索任务的信息，包括任务名称、任务链接、任务ID、任务描述
                 */
                search: async (
                    payload?: {
                        data?: {
                            query?: string;
                            filter?: {
                                creator_ids?: Array<string>;
                                assignee_ids?: Array<string>;
                                is_completed?: boolean;
                                due_time?: {
                                    start_time?: string;
                                    end_time?: string;
                                };
                                follower_ids?: Array<string>;
                            };
                        };
                        params?: {
                            page_size?: number;
                            page_token?: string;
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
                                    items: Array<{
                                        id: string;
                                        display_info?: string;
                                        meta_data?: {
                                            app_link?: string;
                                            avatar?: string;
                                            description?: string;
                                        };
                                    }>;
                                    total?: number;
                                    has_more: boolean;
                                    page_token?: string;
                                    notice?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=set_ancestor_task&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set_ancestor_task&project=task&resource=task&version=v2 document }
                 *
                 * 设置父任务
                 *
                 * 管理任务的父子关系，支持设置任务的父任务，或者将任务转为独立任务。
                 */
                setAncestorTask: async (
                    payload?: {
                        data?: {
                            ancestor_guid?: string;
                            user_id_type?: string;
                            target_user_id?: string;
                        };
                        path: { task_guid: string };
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
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/set_ancestor_task`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=add_members&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_members&project=task&resource=task&version=v2 document }
                 *
                 * 添加任务成员
                 *
                 * 添加任务的负责人或者关注人。一次性可以添加多个成员。返回任务的实体中会返回最终任务成员的列表。;;* 关于member的格式，详见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 如何表示任务和清单的成员？”章节。;* 成员的角色支持"assignee"和"follower"。;* 成员类型支持"user"和"app"。;* 如果要添加的成员已经在任务中，则自动被忽略。
                 *
                 * 添加任务成员需要任务的可编辑权限。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                addMembers: async (
                    payload?: {
                        data: {
                            members: Array<{
                                id: string;
                                type?: string;
                                role: string;
                                name?: string;
                            }>;
                            client_token?: string;
                        };
                        params?: { user_id_type?: string };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/add_members`,
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
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            completed?: boolean;
                            type?: string;
                            user_id_type?: string;
                            agent_task_status?: number;
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
                                    `${this.domain}/open-apis/task/v2/tasks`,
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
                                                        guid?: string;
                                                        summary?: string;
                                                        description?: string;
                                                        due?: {
                                                            timestamp?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        reminders?: Array<{
                                                            id?: string;
                                                            relative_fire_minute: number;
                                                        }>;
                                                        creator?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        members?: Array<{
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        }>;
                                                        completed_at?: string;
                                                        attachments?: Array<{
                                                            guid?: string;
                                                            file_token?: string;
                                                            name?: string;
                                                            size?: number;
                                                            resource?: {
                                                                type?: string;
                                                                id?: string;
                                                            };
                                                            uploader?: {
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            };
                                                            is_cover?: boolean;
                                                            uploaded_at?: string;
                                                        }>;
                                                        origin?: {
                                                            platform_i18n_name?: {
                                                                en_us?: string;
                                                                zh_cn?: string;
                                                                zh_hk?: string;
                                                                zh_tw?: string;
                                                                ja_jp?: string;
                                                                fr_fr?: string;
                                                                it_it?: string;
                                                                de_de?: string;
                                                                ru_ru?: string;
                                                                th_th?: string;
                                                                es_es?: string;
                                                                ko_kr?: string;
                                                            };
                                                            href?: {
                                                                url?: string;
                                                                title?: string;
                                                            };
                                                            refer_resources?: Array<{
                                                                resource_id?: string;
                                                                type?: string;
                                                                source_message?: {
                                                                    message_id?: string;
                                                                    content?: string;
                                                                };
                                                                unavailable_reason?: string;
                                                            }>;
                                                        };
                                                        extra?: string;
                                                        tasklists?: Array<{
                                                            tasklist_guid?: string;
                                                            section_guid?: string;
                                                        }>;
                                                        repeat_rule?: string;
                                                        parent_task_guid?: string;
                                                        mode?: number;
                                                        source?: number;
                                                        custom_complete?: {
                                                            pc?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                            ios?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                            android?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                        };
                                                        task_id?: string;
                                                        created_at?: string;
                                                        updated_at?: string;
                                                        status?: string;
                                                        url?: string;
                                                        start?: {
                                                            timestamp?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        subtask_count?: number;
                                                        is_milestone?: boolean;
                                                        custom_fields?: Array<{
                                                            guid?: string;
                                                            type?: string;
                                                            number_value?: string;
                                                            datetime_value?: string;
                                                            member_value?: Array<{
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            }>;
                                                            single_select_value?: string;
                                                            multi_select_value?: Array<string>;
                                                            name?: string;
                                                            text_value?: string;
                                                        }>;
                                                        dependencies?: Array<{
                                                            type:
                                                                | "prev"
                                                                | "next";
                                                            task_guid: string;
                                                        }>;
                                                        assignee_related?: Array<{
                                                            id?: string;
                                                            completed_at?: string;
                                                        }>;
                                                        positive_reminders?: Array<{
                                                            id?: string;
                                                            relative_fire_minute: number;
                                                        }>;
                                                        agent_task_status?: number;
                                                        agent_task_progress?: string;
                                                        text_deliveries?: Array<string>;
                                                        attachment_deliveries?: Array<{
                                                            guid?: string;
                                                            file_token?: string;
                                                            name?: string;
                                                            size?: number;
                                                            resource?: {
                                                                type?: string;
                                                                id?: string;
                                                            };
                                                            uploader?: {
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            };
                                                            is_cover?: boolean;
                                                            uploaded_at?: string;
                                                            url?: string;
                                                        }>;
                                                        next_task_guid?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task&version=v2 document }
                 *
                 * 列取任务列表
                 *
                 * 基于调用身份，列出特定类型的所有任务。支持分页。;;目前只支持列取任务界面上“我负责的”任务。返回的任务数据按照任务在”我负责的“界面中”自定义拖拽“的顺序排序。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            completed?: boolean;
                            type?: string;
                            user_id_type?: string;
                            agent_task_status?: number;
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
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=add_reminders&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_reminders&project=task&resource=task&version=v2 document }
                 *
                 * 添加任务提醒
                 *
                 * 为一个任务添加提醒。提醒是基于任务的截止时间计算得到的一个时刻。为了设置提醒，任务必须首先拥有截止时间(due)。可以在[创建任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/create)时设置截止时间，或者通过[更新任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/patch)设置一个截止时间。;;目前一个任务只能设置1个提醒。但接口的形式可以在未来扩充为一个任务支持多个提醒。;;如果当前任务已经有提醒了，要更新提醒的设置，需要先调用[移除任务提醒](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_reminders)接口移除原有提醒。再调用本接口添加提醒。
                 *
                 * 需要任务的编辑权限。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                addReminders: async (
                    payload?: {
                        data: {
                            reminders: Array<{ relative_fire_minute: number }>;
                        };
                        params?: { user_id_type?: string };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/add_reminders`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=remove_members&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_members&project=task&resource=task&version=v2 document }
                 *
                 * 移除任务成员
                 *
                 * 移除任务成员。一次性可以移除多个成员。可以移除任务的负责人或者关注人。移除时，如果要移除的成员不是任务成员，会被自动忽略。本接口返回移除成员后的任务数据，包含移除后的任务成员列表。
                 *
                 * 移除任务成员需要任务的编辑权限。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                removeMembers: async (
                    payload?: {
                        data: {
                            members: Array<{
                                id: string;
                                type?: string;
                                role: string;
                                name?: string;
                            }>;
                        };
                        params?: { user_id_type?: string };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/remove_members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=detail&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=detail&project=task&resource=task&version=v2 document }
                 *
                 * 查询企业任务详情;
                 *
                 * 该接口用于获取（企业下所有用户的）任务详情，包括任务标题、描述、时间、成员等信息。;
                 */
                detail: async (
                    payload?: {
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/detail`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=remove_reminders&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_reminders&project=task&resource=task&version=v2 document }
                 *
                 * 移除任务提醒
                 *
                 * 将一个提醒从任务中移除。;;如果要移除的提醒本来就不存在，本接口将直接返回成功。
                 *
                 * 需要任务的编辑权限。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                removeReminders: async (
                    payload?: {
                        data: { reminder_ids: Array<string> };
                        params?: { user_id_type?: string };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/remove_reminders`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task&version=v2 document }
                 *
                 * 创建任务
                 *
                 * 该接口可以创建一个任务，在创建任务时，支持填写任务的基本信息（如标题、描述、负责人等），此外，还可以设置任务的开始时间、截止时间提醒等条件，此外，还可以通过传入 tasklists 字段将新任务加到多个清单中。;;创建任务时，可以通过设置`members`字段来设置任务的负责人和关注人。关于member的格式，详见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 如何表示任务和清单的成员？ ”章节。;;如果要设置任务的开始时间和截止时间，需要遵守任务时间的格式和约束。详见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 如何使用开始时间和截止时间？”章节。;;如要设置自定义字段值，可以设置`custom_fields`字段。但因为自定义字段归属于清单，因此要填写的自定义字段的guid必须归属于要添加的清单(通过`tasklists`设置）。详见[自定义字段概览](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/custom-field-overview)。;;通过设置`client_token`实现幂等调用。详见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 幂等调用 ”章节。;;如要创建一个任务的子任务，需要使用[创建子任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task-subtask/create)接口。;;创建任务时可以一并设置自定义字段值。但根据自定义字段的权限关系，任务只能添加`tasklists`字段设置的清单中关联的自定义字段的值。详见[自定义字段功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/custom-field-overview)中的介绍。
                 *
                 * 如果创建任务时要将任务加入到多个清单中，调用身份必须对所有清单有可编辑权限。详情见[清单功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/overview)中的“清单是如何鉴权的？“章节。
                 */
                create: async (
                    payload?: {
                        data: {
                            summary: string;
                            description?: string;
                            due?: { timestamp?: string; is_all_day?: boolean };
                            origin?: {
                                platform_i18n_name?: {
                                    en_us?: string;
                                    zh_cn?: string;
                                    zh_hk?: string;
                                    zh_tw?: string;
                                    ja_jp?: string;
                                    fr_fr?: string;
                                    it_it?: string;
                                    de_de?: string;
                                    ru_ru?: string;
                                    th_th?: string;
                                    es_es?: string;
                                    ko_kr?: string;
                                };
                                href?: { url?: string; title?: string };
                                refer_resources?: Array<{
                                    resource_id?: string;
                                    type?: string;
                                    source_message?: {
                                        message_id?: string;
                                        content?: string;
                                    };
                                    unavailable_reason?: string;
                                }>;
                            };
                            extra?: string;
                            completed_at?: string;
                            members?: Array<{
                                id: string;
                                type?: string;
                                role: string;
                                name?: string;
                            }>;
                            repeat_rule?: string;
                            custom_complete?: {
                                pc?: {
                                    href?: string;
                                    tip?: {
                                        en_us?: string;
                                        zh_cn?: string;
                                        zh_hk?: string;
                                        zh_tw?: string;
                                        ja_jp?: string;
                                        fr_fr?: string;
                                        it_it?: string;
                                        de_de?: string;
                                        ru_ru?: string;
                                        th_th?: string;
                                        es_es?: string;
                                        ko_kr?: string;
                                    };
                                };
                                ios?: {
                                    href?: string;
                                    tip?: {
                                        en_us?: string;
                                        zh_cn?: string;
                                        zh_hk?: string;
                                        zh_tw?: string;
                                        ja_jp?: string;
                                        fr_fr?: string;
                                        it_it?: string;
                                        de_de?: string;
                                        ru_ru?: string;
                                        th_th?: string;
                                        es_es?: string;
                                        ko_kr?: string;
                                    };
                                };
                                android?: {
                                    href?: string;
                                    tip?: {
                                        en_us?: string;
                                        zh_cn?: string;
                                        zh_hk?: string;
                                        zh_tw?: string;
                                        ja_jp?: string;
                                        fr_fr?: string;
                                        it_it?: string;
                                        de_de?: string;
                                        ru_ru?: string;
                                        th_th?: string;
                                        es_es?: string;
                                        ko_kr?: string;
                                    };
                                };
                            };
                            tasklists?: Array<{
                                tasklist_guid?: string;
                                section_guid?: string;
                            }>;
                            client_token?: string;
                            start?: {
                                timestamp?: string;
                                is_all_day?: boolean;
                            };
                            reminders?: Array<{ relative_fire_minute: number }>;
                            mode?: number;
                            is_milestone?: boolean;
                            custom_fields?: Array<{
                                guid: string;
                                number_value?: string;
                                member_value?: Array<{
                                    id?: string;
                                    type?: string;
                                    name?: string;
                                }>;
                                datetime_value?: string;
                                single_select_value?: string;
                                multi_select_value?: Array<string>;
                                text_value?: string;
                            }>;
                            docx_source?: { token: string; block_id: string };
                            positive_reminders?: Array<{
                                relative_fire_minute: number;
                            }>;
                            agent_task_status?: number;
                            agent_task_progress?: string;
                            text_deliveries?: Array<string>;
                        };
                        params?: { user_id_type?: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=task&version=v2 document }
                 *
                 * 更新任务
                 *
                 * 该接口用于修改任务的标题、描述、截止时间等信息。;;更新时，将`update_fields`字段中填写所有要修改的任务字段名，同时在`task`字段中填写要修改的字段的新值即可。如果`update_fields`中设置了要变更一个字段的名字，但是task里没设置新的值，则表示将该字段清空。调用约定详情见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 关于资源的更新”章节。;;该接口可以用于完成任务和将任务恢复至未完成，只需要修改`completed_at`字段即可。但留意，目前不管任务本身是会签任务还是或签任务，OpenAPI对任务进行完成只能实现“整体完成”，不支持个人单独完成。此外，不能对已经完成的任务再次完成，但可以将其恢复到未完成的状态(设置`completed_at`为"0")。;;如更新自定义字段的值，需要调用身份同时拥有任务的编辑权限和自定义字段的编辑权限。详情见[自定义字段功能概览](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/custom-field-overview)。更新时，只有填写在`task.custom_fields`的自定义字段值会被更新，不填写的不会被改变。;;任务成员/提醒/清单数据不能使用本接口进行更新。;* 如要修改任务成员，需要使用[添加任务成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_members);和[移除任务成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_members)接口。;* 如要修改任务提醒，需要使用[添加任务提醒](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_reminders)和[移除任务提醒](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_reminders)接口。;* 如要变更任务所在的清单，需要使用[任务加入清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_tasklist)和[任务移出清单]( https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_tasklist)接口。
                 *
                 * 修改时需要调用身份对任务有编辑权限。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                patch: async (
                    payload?: {
                        data: {
                            task?: {
                                summary?: string;
                                description?: string;
                                due?: {
                                    timestamp?: string;
                                    is_all_day?: boolean;
                                };
                                extra?: string;
                                completed_at?: string;
                                repeat_rule?: string;
                                custom_complete?: {
                                    pc?: {
                                        href?: string;
                                        tip?: {
                                            en_us?: string;
                                            zh_cn?: string;
                                            zh_hk?: string;
                                            zh_tw?: string;
                                            ja_jp?: string;
                                            fr_fr?: string;
                                            it_it?: string;
                                            de_de?: string;
                                            ru_ru?: string;
                                            th_th?: string;
                                            es_es?: string;
                                            ko_kr?: string;
                                        };
                                    };
                                    ios?: {
                                        href?: string;
                                        tip?: {
                                            en_us?: string;
                                            zh_cn?: string;
                                            zh_hk?: string;
                                            zh_tw?: string;
                                            ja_jp?: string;
                                            fr_fr?: string;
                                            it_it?: string;
                                            de_de?: string;
                                            ru_ru?: string;
                                            th_th?: string;
                                            es_es?: string;
                                            ko_kr?: string;
                                        };
                                    };
                                    android?: {
                                        href?: string;
                                        tip?: {
                                            en_us?: string;
                                            zh_cn?: string;
                                            zh_hk?: string;
                                            zh_tw?: string;
                                            ja_jp?: string;
                                            fr_fr?: string;
                                            it_it?: string;
                                            de_de?: string;
                                            ru_ru?: string;
                                            th_th?: string;
                                            es_es?: string;
                                            ko_kr?: string;
                                        };
                                    };
                                };
                                start?: {
                                    timestamp?: string;
                                    is_all_day?: boolean;
                                };
                                mode?: number;
                                is_milestone?: boolean;
                                custom_fields?: Array<{
                                    guid: string;
                                    number_value?: string;
                                    member_value?: Array<{
                                        id?: string;
                                        type?: string;
                                        name?: string;
                                    }>;
                                    datetime_value?: string;
                                    single_select_value?: string;
                                    multi_select_value?: Array<string>;
                                    text_value?: string;
                                }>;
                                positive_reminders?: Array<{
                                    relative_fire_minute: number;
                                }>;
                                agent_task_status?: number;
                                agent_task_progress?: string;
                                text_deliveries?: Array<string>;
                            };
                            update_fields: Array<string>;
                        };
                        params?: { user_id_type?: string };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=remove_tasklist&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_tasklist&project=task&resource=task&version=v2 document }
                 *
                 * 任务移出清单
                 *
                 * 将任务从一个清单中移出。返回任务详情。;;如果任务不在清单中，接口将返回成功。
                 *
                 * 需要清单的可编辑权限。详情见[清单功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/overview)中的“清单是如何鉴权的？“章节。
                 */
                removeTasklist: async (
                    payload?: {
                        data: { tasklist_guid: string };
                        params?: { user_id_type?: string };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/remove_tasklist`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=task&version=v2 document }
                 *
                 * 获取任务详情
                 *
                 * 该接口用于获取任务详情，包括任务标题、描述、时间、成员等信息。
                 *
                 * 获取任务详情调用身份需要拥有对任务的可读取权限。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                get: async (
                    payload?: {
                        params?: { user_id_type?: string };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid`,
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
                listAllTasksByTenantWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            update_msec?: string;
                            target_user_id?: string;
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
                                    `${this.domain}/open-apis/task/v2/tasks/list_all_tasks_by_tenant`,
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
                                                        guid?: string;
                                                        summary?: string;
                                                        description?: string;
                                                        due?: {
                                                            timestamp?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        reminders?: Array<{
                                                            id?: string;
                                                            relative_fire_minute: number;
                                                        }>;
                                                        creator?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        members?: Array<{
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        }>;
                                                        completed_at?: string;
                                                        attachments?: Array<{
                                                            guid?: string;
                                                            file_token?: string;
                                                            name?: string;
                                                            size?: number;
                                                            resource?: {
                                                                type?: string;
                                                                id?: string;
                                                            };
                                                            uploader?: {
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            };
                                                            is_cover?: boolean;
                                                            uploaded_at?: string;
                                                            url?: string;
                                                        }>;
                                                        origin?: {
                                                            platform_i18n_name?: {
                                                                en_us?: string;
                                                                zh_cn?: string;
                                                                zh_hk?: string;
                                                                zh_tw?: string;
                                                                ja_jp?: string;
                                                                fr_fr?: string;
                                                                it_it?: string;
                                                                de_de?: string;
                                                                ru_ru?: string;
                                                                th_th?: string;
                                                                es_es?: string;
                                                                ko_kr?: string;
                                                            };
                                                            href?: {
                                                                url?: string;
                                                                title?: string;
                                                            };
                                                            refer_resources?: Array<{
                                                                resource_id?: string;
                                                                type?: string;
                                                                source_message?: {
                                                                    message_id?: string;
                                                                    content?: string;
                                                                };
                                                                unavailable_reason?: string;
                                                            }>;
                                                        };
                                                        extra?: string;
                                                        tasklists?: Array<{
                                                            tasklist_guid?: string;
                                                            section_guid?: string;
                                                        }>;
                                                        repeat_rule?: string;
                                                        parent_task_guid?: string;
                                                        mode?: number;
                                                        source?: number;
                                                        custom_complete?: {
                                                            pc?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                            ios?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                            android?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                        };
                                                        task_id?: string;
                                                        created_at?: string;
                                                        updated_at?: string;
                                                        status?: string;
                                                        url?: string;
                                                        start?: {
                                                            timestamp?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        subtask_count?: number;
                                                        is_milestone?: boolean;
                                                        custom_fields?: Array<{
                                                            guid?: string;
                                                            type?: string;
                                                            number_value?: string;
                                                            datetime_value?: string;
                                                            member_value?: Array<{
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            }>;
                                                            single_select_value?: string;
                                                            multi_select_value?: Array<string>;
                                                            name?: string;
                                                            text_value?: string;
                                                        }>;
                                                        dependencies?: Array<{
                                                            type:
                                                                | "prev"
                                                                | "next";
                                                            task_guid: string;
                                                        }>;
                                                        assignee_related?: Array<{
                                                            id?: string;
                                                            completed_at?: string;
                                                        }>;
                                                        positive_reminders?: Array<{
                                                            id?: string;
                                                            relative_fire_minute: number;
                                                        }>;
                                                        agent_task_status?: number;
                                                        agent_task_progress?: string;
                                                        text_deliveries?: Array<string>;
                                                        attachment_deliveries?: Array<{
                                                            guid?: string;
                                                            file_token?: string;
                                                            name?: string;
                                                            size?: number;
                                                            resource?: {
                                                                type?: string;
                                                                id?: string;
                                                            };
                                                            uploader?: {
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            };
                                                            is_cover?: boolean;
                                                            uploaded_at?: string;
                                                            url?: string;
                                                        }>;
                                                        next_task_guid?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=list_all_tasks_by_tenant&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_all_tasks_by_tenant&project=task&resource=task&version=v2 document }
                 */
                listAllTasksByTenant: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            update_msec?: string;
                            target_user_id?: string;
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
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/list_all_tasks_by_tenant`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=add_tasklist&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_tasklist&project=task&resource=task&version=v2 document }
                 *
                 * 任务加入清单
                 *
                 * 将一个任务加入清单。返回任务的详细信息，包括任务所在的所有清单信息。;;如果任务已经在该清单，接口将返回成功。
                 *
                 * 需要调用身份同时拥有任务的编辑权限和清单的编辑权限。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节和[清单功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/overview)中的“清单是如何鉴权的？“章节。
                 */
                addTasklist: async (
                    payload?: {
                        data: { tasklist_guid: string; section_guid?: string };
                        params?: { user_id_type?: string };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/add_tasklist`,
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
             * comment
             */
            comment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=comment&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=comment&version=v2 document }
                 *
                 * 获取评论详情
                 *
                 * 给定一个评论的ID，返回评论的详情，包括内容，创建人，创建时间和更新时间等信息。
                 *
                 * 获取任务的评论详情需要评论归属任务的读取权限，详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                get: async (
                    payload?: {
                        params?: { user_id_type?: string };
                        path: { comment_id: string };
                    },
                    options?: IRequestOptions
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
                                    comment?: {
                                        id?: string;
                                        content?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        reply_to_comment_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        resource_type?: string;
                                        resource_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/comments/:comment_id`,
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
                            page_size?: number;
                            page_token?: string;
                            resource_type?: string;
                            resource_id: string;
                            direction?: "asc" | "desc";
                            user_id_type?: string;
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
                                    `${this.domain}/open-apis/task/v2/comments`,
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
                                                        content?: string;
                                                        creator?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        reply_to_comment_id?: string;
                                                        created_at?: string;
                                                        updated_at?: string;
                                                        resource_type?: string;
                                                        resource_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=comment&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=comment&version=v2 document }
                 *
                 * 获取评论列表
                 *
                 * 给定一个资源，返回该资源的评论列表。;;支持分页。评论可以按照创建时间的正序（asc, 从最老到最新），或者逆序（desc，从最老到最新），返回数据。
                 *
                 * 获取任务的评论列表需要任务的读取权限，详见[任务是如何鉴权的？](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/faq)
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            resource_type?: string;
                            resource_id: string;
                            direction?: "asc" | "desc";
                            user_id_type?: string;
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
                                        id?: string;
                                        content?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        reply_to_comment_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        resource_type?: string;
                                        resource_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/comments`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=comment&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=comment&version=v2 document }
                 *
                 * 删除评论
                 *
                 * 删除一条评论。;;评论被删除后，将无法进行任何操作，也无法恢复。
                 *
                 * 需要评论归属任务的读取权限，并且只能删除自己发送的评论。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                delete: async (
                    payload?: {
                        path: { comment_id: string };
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
                                `${this.domain}/open-apis/task/v2/comments/:comment_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=comment&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=comment&version=v2 document }
                 *
                 * 更新评论
                 *
                 * 更新一条评论。;;更新时，将`update_fields`字段中填写所有要修改的评论的字段名，同时在`comment`字段中填写要修改的字段的新值即可。更新接口规范详情见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 关于资源的更新”章节。;;目前只支持更新评论的"content"字段。
                 *
                 * 更新评论需要评论归属任务的读取权限，并且只能更新自己创建的评论。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                patch: async (
                    payload?: {
                        data: {
                            comment: { content?: string };
                            update_fields: Array<string>;
                        };
                        params?: { user_id_type?: string };
                        path: { comment_id: string };
                    },
                    options?: IRequestOptions
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
                                    comment?: {
                                        id?: string;
                                        content?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        reply_to_comment_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        resource_type?: string;
                                        resource_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/comments/:comment_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=comment&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=comment&version=v2 document }
                 *
                 * 创建评论
                 *
                 * 为一个任务创建评论，或者回复该任务的某个评论。;;若要创建一个回复评论，需要在创建时设置`reply_to_comment_id`字段。被回复的评论和新建的评论必须属于同一个任务。
                 *
                 * 对任务进行评论时需要评论的读取权限。详情见[清单功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/overview)中的“清单是如何鉴权的？“章节。
                 */
                create: async (
                    payload?: {
                        data: {
                            content: string;
                            reply_to_comment_id?: string;
                            resource_type?: string;
                            resource_id?: string;
                        };
                        params?: { user_id_type?: string };
                    },
                    options?: IRequestOptions
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
                                    comment?: {
                                        id?: string;
                                        content?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        reply_to_comment_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        resource_type?: string;
                                        resource_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/comments`,
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
             * section
             */
            section: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=section&version=v2 document }
                 *
                 * 获取自定义分组详情
                 *
                 * 获取一个自定义分组详情，包括名称，创建人等信息。如果该自定义分组归属于一个清单，还会返回清单的摘要信息。
                 *
                 * 需要清单归属资源的读取权限。
                 */
                get: async (
                    payload?: {
                        params?: { user_id_type?: string };
                        path: { section_guid: string };
                    },
                    options?: IRequestOptions
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
                                    section?: {
                                        guid?: string;
                                        name?: string;
                                        resource_type?: string;
                                        is_default?: boolean;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        tasklist?: {
                                            guid?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/sections/:section_guid`,
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
                tasksWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            completed?: boolean;
                            created_from?: string;
                            created_to?: string;
                            user_id_type?: string;
                        };
                        path: { section_guid: string };
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
                                    `${this.domain}/open-apis/task/v2/sections/:section_guid/tasks`,
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
                                                        guid?: string;
                                                        summary?: string;
                                                        completed_at?: string;
                                                        start?: {
                                                            timestamp?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        due?: {
                                                            timestamp?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        members?: Array<{
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        }>;
                                                        subtask_count?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=tasks&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=tasks&project=task&resource=section&version=v2 document }
                 *
                 * 列取自定义分组中的任务
                 *
                 * 列取一个自定义分组里的所有任务。支持分页。任务按照自定义排序的顺序返回。本接口支持简单的过滤。
                 *
                 * 需要自定义分组所在资源的读取权限。
                 */
                tasks: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            completed?: boolean;
                            created_from?: string;
                            created_to?: string;
                            user_id_type?: string;
                        };
                        path: { section_guid: string };
                    },
                    options?: IRequestOptions
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
                                        guid?: string;
                                        summary?: string;
                                        completed_at?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        subtask_count?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/sections/:section_guid/tasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=add_tasks&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_tasks&project=task&resource=section&version=v2 document }
                 */
                addTasks: async (
                    payload?: {
                        data: { task_guids: Array<string> };
                        path?: { section_guid?: string };
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
                                `${this.domain}/open-apis/task/v2/sections/:section_guid/add_tasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=section&version=v2 document }
                 *
                 * 删除自定义分组
                 *
                 * 删除一个自定义分组。删除后该自定义分组中的任务会被移动到被删除自定义分组所属资源的默认自定义分组中。;;不能删除默认的自定义分组。
                 *
                 * 需要自定义分组归属资源的编辑权限。
                 */
                delete: async (
                    payload?: {
                        path: { section_guid: string };
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
                                `${this.domain}/open-apis/task/v2/sections/:section_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=section&version=v2 document }
                 *
                 * 更新自定义分组
                 *
                 * 更新自定义分组，可以更新自定义分组的名称和位置。;;更新时，将`update_fields`字段中填写所有要修改的字段名，同时在`section`字段中填写要修改的字段的新值即可。调用约定详情见[功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/overview)中的“ 关于资源的更新”章节。;;目前支持更新的字段包括：;* `name` - 自定义字段名字;;* `insert_before` - 要让当前自定义分组放到某个自定义分组前面的section_guid，用于改变当前自定义分组的位置;;* `insert_after` - 要让当前自定义分组放到某个自定义分组后面的secion_guid，用于改变当前自定义分组的位置。;;`insert_before`和`insert_after`如果填写，必须是同一个资源的合法section_guid。注意不能同时设置`insert_before`和`insert_after`。
                 *
                 * 需要自定义分组所在资源的编辑权限。
                 */
                patch: async (
                    payload?: {
                        data: {
                            section: {
                                name?: string;
                                insert_before?: string;
                                insert_after?: string;
                            };
                            update_fields: Array<string>;
                        };
                        params?: { user_id_type?: string };
                        path: { section_guid: string };
                    },
                    options?: IRequestOptions
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
                                    section?: {
                                        guid?: string;
                                        name?: string;
                                        resource_type?: string;
                                        is_default?: boolean;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        tasklist?: {
                                            guid?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/sections/:section_guid`,
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
                            page_size?: number;
                            page_token?: string;
                            resource_type: string;
                            resource_id?: string;
                            user_id_type?: string;
                            update_msec?: string;
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
                                    `${this.domain}/open-apis/task/v2/sections`,
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
                                                        guid?: string;
                                                        name?: string;
                                                        is_default?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=section&version=v2 document }
                 *
                 * 获取自定义分组列表
                 *
                 * 获取一个资源下所有的自定义分组列表。支持分页。返回结果按照自定义分组在界面上的顺序排序。
                 *
                 * 获取自定义分组列表需要资源的读取权限。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            resource_type: string;
                            resource_id?: string;
                            user_id_type?: string;
                            update_msec?: string;
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
                                        guid?: string;
                                        name?: string;
                                        is_default?: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/sections`,
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
                listTasklistSectionsWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            target_user_id?: string;
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
                                    `${this.domain}/open-apis/task/v2/sections/list_tasklist_sections`,
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
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    items?: Array<{
                                                        guid?: string;
                                                        name?: string;
                                                        resource_type?: string;
                                                        is_default?: boolean;
                                                        creator?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        tasklist?: {
                                                            guid?: string;
                                                            name?: string;
                                                        };
                                                        created_at?: string;
                                                        updated_at?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=list_tasklist_sections&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_tasklist_sections&project=task&resource=section&version=v2 document }
                 */
                listTasklistSections: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            target_user_id?: string;
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
                                    has_more?: boolean;
                                    items?: Array<{
                                        guid?: string;
                                        name?: string;
                                        resource_type?: string;
                                        is_default?: boolean;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        tasklist?: {
                                            guid?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/sections/list_tasklist_sections`,
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
                tasklistWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            target_user_id?: string;
                        };
                        path: { section_guid: string };
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
                                    `${this.domain}/open-apis/task/v2/sections/:section_guid/tasklist`,
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
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    items?: Array<{
                                                        guid?: string;
                                                        name?: string;
                                                        creator?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        owner?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        members?: Array<{
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        }>;
                                                        url?: string;
                                                        created_at?: string;
                                                        updated_at?: string;
                                                        archive_msec?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=tasklist&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=tasklist&project=task&resource=section&version=v2 document }
                 */
                tasklist: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            target_user_id?: string;
                        };
                        path: { section_guid: string };
                    },
                    options?: IRequestOptions
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
                                    has_more?: boolean;
                                    items?: Array<{
                                        guid?: string;
                                        name?: string;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        owner?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        archive_msec?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/sections/:section_guid/tasklist`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=section&version=v2 document }
                 *
                 * 创建自定义分组
                 *
                 * 为清单或我负责的任务列表创建一个自定义分组。创建时可以需要提供名称和可选的配置。如果不指定位置，新分组会放到指定resource的自定义分组列表的最后。;;当在清单中创建自定义分组时，需要设置`resource_type`为"tasklist", `resource_id`设为清单的GUID。;;当为我负责任务列表中创建自定义分组时，需要设置`resource_type`为"my_tasks"，不需要设置`resource_id`。调用身份只能为自己的我负责的任务列表创建自定义分组。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            resource_type: string;
                            resource_id?: string;
                            insert_before?: string;
                            insert_after?: string;
                        };
                        params?: { user_id_type?: string };
                    },
                    options?: IRequestOptions
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
                                    section?: {
                                        guid?: string;
                                        name?: string;
                                        resource_type?: string;
                                        is_default?: boolean;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        tasklist?: {
                                            guid?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/sections`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=update_task_list_section&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_task_list_section&project=task&resource=section&version=v2 document }
                 */
                updateTaskListSection: async (
                    payload?: {
                        data?: {
                            update_fields?: Array<string>;
                            user_id_type?: string;
                            section?: {
                                guid?: string;
                                name?: string;
                                resource_type?: string;
                                is_default?: boolean;
                                creator?: {
                                    id?: string;
                                    type?: string;
                                    role?: string;
                                    name?: string;
                                };
                                tasklist?: { guid?: string; name?: string };
                                created_at?: string;
                                updated_at?: string;
                            };
                            target_user_id?: string;
                        };
                        path: { section_guid: string };
                    },
                    options?: IRequestOptions
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
                                    section?: {
                                        guid?: string;
                                        name?: string;
                                        resource_type?: string;
                                        is_default?: boolean;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        tasklist?: {
                                            guid?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/sections/:section_guid/update_task_list_section`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=create_tasklist_section&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_tasklist_section&project=task&resource=section&version=v2 document }
                 *
                 * 创建清单的分组
                 */
                createTasklistSection: async (
                    payload?: {
                        data?: {
                            name?: string;
                            insert_before?: string;
                            insert_after?: string;
                            user_id_type?: string;
                            target_user_id?: string;
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
                                    section?: {
                                        guid?: string;
                                        name?: string;
                                        resource_type?: string;
                                        is_default?: boolean;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        tasklist?: {
                                            guid?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/sections/create_tasklist_section`,
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
             * custom_field
             */
            customField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=custom_field&version=v2 document }
                 *
                 * 获取自定义字段
                 *
                 * 根据一个自定义字段的GUID，获取其详细的设置信息。
                 *
                 * 获取自定义字段需要有自定义字段的读取权限。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
                        };
                        path: { custom_field_guid: string };
                    },
                    options?: IRequestOptions
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
                                    custom_field?: {
                                        guid?: string;
                                        name?: string;
                                        type?: string;
                                        number_setting?: {
                                            format?:
                                                | "normal"
                                                | "percentage"
                                                | "cny"
                                                | "usd"
                                                | "custom";
                                            custom_symbol?: string;
                                            custom_symbol_position?:
                                                | "left"
                                                | "right";
                                            separator?: "none" | "thousand";
                                            decimal_count?: number;
                                        };
                                        member_setting?: { multi?: boolean };
                                        datetime_setting?: { format?: string };
                                        single_select_setting?: {
                                            options?: Array<{
                                                guid?: string;
                                                name?: string;
                                                color_index?: number;
                                                is_hidden?: boolean;
                                            }>;
                                        };
                                        multi_select_setting?: {
                                            options?: Array<{
                                                guid?: string;
                                                name?: string;
                                                color_index?: number;
                                                is_hidden?: boolean;
                                            }>;
                                        };
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                        text_setting?: {};
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/custom_fields/:custom_field_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=custom_field&version=v2 document }
                 *
                 * 创建自定义字段
                 *
                 * 创建一个自定义字段，并将其加入一个资源上（目前资源只支持清单）。创建自定义字段必须提供字段名称，类型和相应类型的设置。;;目前任务自定义字段支持数字(number)，成员(member)，日期(datetime)，单选(single_select),多选(multi_select), 文本(text)几种类型。分别使用"number_setting", "member_setting", "datetime_setting", "single_select_setting", "multi_select_setting","text_setting"来设置。;;例如创建一个数字类型的自定义字段，并添加到guid为"ec5ed63d-a4a9-44de-a935-7ba243471c0a"的清单，可以这样发请求。;;```;POST /task/v2/custom_fields;{; "name": "价格",; "type": "number",; "resource_type": "tasklist",; "resource_id": "ec5ed63d-a4a9-44de-a935-7ba243471c0a",; "number_setting": {; "format": "cny",; "decimal_count": 2,; "separator": "thousand"; };};```;表示创建一个叫做“价格”的自定义字段，保留两位小数。在界面上显示时采用人民币的格式，并显示千分位分隔符。;;类似的，创建一个单选字段，可以这样调用接口：;```;POST /task/v2/custom_fields;{; "name": "优先级",; "type": "single_select",; "resource_type": "tasklist",; "resource_id": "ec5ed63d-a4a9-44de-a935-7ba243471c0a",; "single_select_setting": {; "options": [; {; "name": "高",; "color_index": 1; },; {; "name": "中",; "color_index": 11; },; {; "name": "低",; "color_index": 16; }; ]; };};```;表示创建一个叫“优先级”的单选，包含“高”，“中”，“低”三个选项，每个选项设置一个颜色值。
                 *
                 * 在一个资源上创建自定义字段需要该资源的可编辑权限。
                 */
                create: async (
                    payload?: {
                        data: {
                            resource_type: string;
                            resource_id: string;
                            name: string;
                            type:
                                | "number"
                                | "datetime"
                                | "member"
                                | "single_select"
                                | "multi_select"
                                | "text";
                            number_setting?: {
                                format?:
                                    | "normal"
                                    | "percentage"
                                    | "cny"
                                    | "usd"
                                    | "custom";
                                custom_symbol?: string;
                                custom_symbol_position?: "left" | "right";
                                separator?: "none" | "thousand";
                                decimal_count?: number;
                            };
                            member_setting?: { multi?: boolean };
                            datetime_setting?: { format?: string };
                            single_select_setting?: {
                                options?: Array<{
                                    name: string;
                                    color_index?: number;
                                    is_hidden?: boolean;
                                }>;
                            };
                            multi_select_setting?: {
                                options?: Array<{
                                    name: string;
                                    color_index?: number;
                                    is_hidden?: boolean;
                                }>;
                            };
                            text_setting?: {};
                        };
                        params?: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
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
                                    custom_field?: {
                                        guid?: string;
                                        name?: string;
                                        type?: string;
                                        number_setting?: {
                                            format?:
                                                | "normal"
                                                | "percentage"
                                                | "cny"
                                                | "usd"
                                                | "custom";
                                            custom_symbol?: string;
                                            custom_symbol_position?:
                                                | "left"
                                                | "right";
                                            separator?: "none" | "thousand";
                                            decimal_count?: number;
                                        };
                                        member_setting?: { multi?: boolean };
                                        datetime_setting?: { format?: string };
                                        single_select_setting?: {
                                            options?: Array<{
                                                guid?: string;
                                                name?: string;
                                                color_index?: number;
                                                is_hidden?: boolean;
                                            }>;
                                        };
                                        multi_select_setting?: {
                                            options?: Array<{
                                                guid?: string;
                                                name?: string;
                                                color_index?: number;
                                                is_hidden?: boolean;
                                            }>;
                                        };
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                        text_setting?: {};
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/custom_fields`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field&apiName=add&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add&project=task&resource=custom_field&version=v2 document }
                 *
                 * 将自定义字段加入资源
                 *
                 * 将自定义字段加入一个资源。目前资源类型支持清单tasklist。一个自定义字段可以加入多个清单中。加入后，该清单可以展示任务的该字段的值，同时基于该字段实现筛选，分组等功能。;;如果自定义字段的设置被更新，字段加入的所有资源都能收到这个更新，并进行相应的展示。
                 *
                 * 将自定义字段加入一个资源需要该字段和资源的可编辑权限。
                 */
                add: async (
                    payload?: {
                        data: { resource_type: string; resource_id: string };
                        path: { custom_field_guid: string };
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
                                `${this.domain}/open-apis/task/v2/custom_fields/:custom_field_guid/add`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=custom_field&version=v2 document }
                 *
                 * 更新自定义字段
                 *
                 * 更新一个自定义字段的名称和设定。更新时，将`update_fields`字段中填写所有要修改的任务字段名，同时在`custom_field`字段中填写要修改的字段的新值即可。自定义字段不允许修改类型，只能根据类型修改其设置。;;`update_fields`支持更新的字段包括：;;* `name`：自定义字段名称;* `number_setting` ：数字类型设置（当且仅当要更新的自定义字段类型是数字时);* `member_setting` ：人员类型设置（当且仅当要更新的自定义字段类型是人员时);* `datetime_setting` ：日期类型设置 (当且仅当要更新的自定义字段类型是日期时);* `single_select_setting`：单选类型设置 (当且仅当要更新的自定义字段类型是单选时);* `multi_select_setting`：多选类型设置 (当且仅当要更新的自定义字段类型是多选时);* `text_setting`: 文本类型设置（目前文本类型没有可设置项）;;当更改某个设置时，如果不填写一个字段，表示不覆盖原有的设定。比如，对于一个数字，原有的setting是:;```json;"number_setting": {; "format": "normal",; "decimal_count": 2,; "separator": "none",; "custom_symbol": "L",; "custom_symbol_position": "right";};```;;使用如下参数调用接口：;```;PATCH /task/v2/custom_fields/:custom_field_guid;{; "custom_field": {; "number_setting": {; "decimal_count": 4; }; },; "update_fields": ["number_setting"];};```;;表示仅仅将小数位数从2改为4，其余的设置`format`, `separator`, `custom_field`等都不变。;;对于单选/多选类型的自定义字段，其设定是一个选项列表。更新时，使用方式接近使用App的界面。使用者不必传入字段的所有选项，而是只需要提供最终希望界面可见（is_hidden=false) 的选项。原有字段中的选项如果没有出现在输入中，则被置为`is_hidden=true`并放到所有可见选项之后。;;对于某一个更新的选项，如果提供了option_guid，将视作更新该选项（此时option_guid必须存在于当前字段，否则会返回错误）；如果不提供，将视作新建一个选项（新的选项的option_guid会在response中被返回)。;;例如，一个单选字段原来有3个选项A，B，C，D。其中C是隐藏的。用户可以这样更新选项：;;```;PATCH /task/v2/custom_fields/:custom_field_guid;{; "custom_field": {; "single_select_setting": {; "options": [; {; "name": "E",; "color_index": 25; },; {; "guid": "<option_guid of A>"; "name": "A2"; },; {; "guid": "<option_guid of C>",; },; ]; }; },; "update_fields": ["single_select_setting"];};```;;调用后最终得到了新的选项列表E, A, C, B, D。其中：;;* 选项E被新建出来，其`color_index`被设为了25。;* 选项A被更新，其名称被改为了"A2"。但其color_index因为没有设置而保持不变；;* 选项整体顺序遵循用户的输入顺序，即E，A，C。同时E，A，C作为直接的输入，其is_hidden均被设为了false，其中，C原本是is_hidden=true，也会被设置为is_hidden=false。;* 选项B和D因为用户没有输入，其`is_hidden`被置为了true，并且被放到了所有用户输入的选项之后。;;如果只是单纯的希望修改用户可见的选项的顺序，比如从原本的选项A,B,C修改为C,B,A，可以这样调用接口：;```;PATCH /task/v2/custom_fields/:custom_field_guid;{; "custom_field": {; "single_select_setting": {; "optoins": [; {; "guid": "<option_guid_of_C>"; },; {; "guid": "<option_guid of B>"; },; {; "guid": "<option_guid of A>",; },; ]; }; },; "update_fields": ["single_select_setting"];};```;;如果希望直接将字段里的所有选项都标记为不可见，可以这样调用接口：;```;PATCH /task/v2/custom_fields/:custom_field_guid;{; "custom_field": {; "single_select_setting": {; "optoins": []; }; },; "update_fields": ["single_select_setting"];};```;;更新单选/多选字段的选项必须满足“可见选项名字不能重复”的约束。否则会返回错误。开发者需要自行保证输入的选项名不可以重复。;;如希望只更新单个选项，或者希望单独设置某个选项的is_hidden，本接口无法支持，但可以使用[更新自定义字段选项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field-option/patch)接口实现。
                 *
                 * 更新自定义字段需要拥有自定义字段的编辑权限。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            custom_field?: {
                                name?: string;
                                number_setting?: {
                                    format?:
                                        | "normal"
                                        | "percentage"
                                        | "cny"
                                        | "usd"
                                        | "custom";
                                    custom_symbol?: string;
                                    custom_symbol_position?: "left" | "right";
                                    separator?: "none" | "thousand";
                                    decimal_count?: number;
                                };
                                member_setting?: { multi?: boolean };
                                datetime_setting?: { format?: string };
                                single_select_setting?: {
                                    options?: Array<{
                                        guid?: string;
                                        name?: string;
                                        color_index?: number;
                                    }>;
                                };
                                multi_select_setting?: {
                                    options?: Array<{
                                        guid?: string;
                                        name?: string;
                                        color_index?: number;
                                    }>;
                                };
                                text_setting?: {};
                            };
                            update_fields?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { custom_field_guid: string };
                    },
                    options?: IRequestOptions
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
                                    custom_field?: {
                                        guid?: string;
                                        name?: string;
                                        type?: string;
                                        number_setting?: {
                                            format?:
                                                | "normal"
                                                | "percentage"
                                                | "cny"
                                                | "usd"
                                                | "custom";
                                            custom_symbol?: string;
                                            custom_symbol_position?:
                                                | "left"
                                                | "right";
                                            separator?: "none" | "thousand";
                                            decimal_count?: number;
                                        };
                                        member_setting?: { multi?: boolean };
                                        datetime_setting?: { format?: string };
                                        single_select_setting?: {
                                            options?: Array<{
                                                guid?: string;
                                                name?: string;
                                                color_index?: number;
                                                is_hidden?: boolean;
                                            }>;
                                        };
                                        multi_select_setting?: {
                                            options?: Array<{
                                                guid?: string;
                                                name?: string;
                                                color_index?: number;
                                                is_hidden?: boolean;
                                            }>;
                                        };
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                        text_setting?: {};
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/custom_fields/:custom_field_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field&apiName=remove&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove&project=task&resource=custom_field&version=v2 document }
                 *
                 * 将自定义字段移出资源
                 *
                 * 将自定义字段从资源中移出。移除后，该资源将无法再使用该字段。目前资源的类型支持"tasklist"。;;如果要移除的自定义字段本来就不存在于资源中，本接口将正常返回。;;注意自定义字段是通过清单来实现授权的，如果将自定义字段从所有关联的清单中移除，就意味着任何调用身份都无法再访问改自定义字段。
                 *
                 * 需要资源的可编辑权限。
                 */
                remove: async (
                    payload?: {
                        data: { resource_type: string; resource_id: string };
                        path: { custom_field_guid: string };
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
                                `${this.domain}/open-apis/task/v2/custom_fields/:custom_field_guid/remove`,
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
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            resource_type?: string;
                            resource_id?: string;
                            update_msec?: string;
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
                                    `${this.domain}/open-apis/task/v2/custom_fields`,
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
                                                        guid?: string;
                                                        name?: string;
                                                        type?: string;
                                                        number_setting?: {
                                                            format?:
                                                                | "normal"
                                                                | "percentage"
                                                                | "cny"
                                                                | "usd"
                                                                | "custom";
                                                            custom_symbol?: string;
                                                            custom_symbol_position?:
                                                                | "left"
                                                                | "right";
                                                            separator?:
                                                                | "none"
                                                                | "thousand";
                                                            decimal_count?: number;
                                                        };
                                                        member_setting?: {
                                                            multi?: boolean;
                                                        };
                                                        datetime_setting?: {
                                                            format?: string;
                                                        };
                                                        single_select_setting?: {
                                                            options?: Array<{
                                                                guid?: string;
                                                                name?: string;
                                                                color_index?: number;
                                                                is_hidden?: boolean;
                                                            }>;
                                                        };
                                                        multi_select_setting?: {
                                                            options?: Array<{
                                                                guid?: string;
                                                                name?: string;
                                                                color_index?: number;
                                                                is_hidden?: boolean;
                                                            }>;
                                                        };
                                                        creator?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        created_at?: string;
                                                        updated_at?: string;
                                                        text_setting?: {};
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=custom_field&version=v2 document }
                 *
                 * 列取自定义字段
                 *
                 * 列取用户可访问的自定义字段列表。如果不提供`resource_type`和`resource_id`参数，则返回用户可访问的所有自定义字段。;;如果提供`resource_type`和`resource_id`，则返回该资源下的自定义字段。目前`resource_type`仅支持"tasklist"，此时`resource_id`应为一个清单的tasklist_guid。;;该接口支持分页。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            resource_type?: string;
                            resource_id?: string;
                            update_msec?: string;
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
                                        guid?: string;
                                        name?: string;
                                        type?: string;
                                        number_setting?: {
                                            format?:
                                                | "normal"
                                                | "percentage"
                                                | "cny"
                                                | "usd"
                                                | "custom";
                                            custom_symbol?: string;
                                            custom_symbol_position?:
                                                | "left"
                                                | "right";
                                            separator?: "none" | "thousand";
                                            decimal_count?: number;
                                        };
                                        member_setting?: { multi?: boolean };
                                        datetime_setting?: { format?: string };
                                        single_select_setting?: {
                                            options?: Array<{
                                                guid?: string;
                                                name?: string;
                                                color_index?: number;
                                                is_hidden?: boolean;
                                            }>;
                                        };
                                        multi_select_setting?: {
                                            options?: Array<{
                                                guid?: string;
                                                name?: string;
                                                color_index?: number;
                                                is_hidden?: boolean;
                                            }>;
                                        };
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                        text_setting?: {};
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/custom_fields`,
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
             * tasklist.activity_subscription
             */
            tasklistActivitySubscription: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist.activity_subscription&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=tasklist.activity_subscription&version=v2 document }
                 *
                 * 获取动态订阅
                 *
                 * 提供一个清单的GUID和一个订阅的GUID，获取该订阅的详细信息，包括名称，订阅者，可通知的event keys列表等。
                 *
                 * 获取动态订阅需要该清单的读取权限。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: {
                            tasklist_guid: string;
                            activity_subscription_guid: string;
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
                                    activity_subscription?: {
                                        guid?: string;
                                        name?: string;
                                        subscribers?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        include_keys?: Array<number>;
                                        disabled?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/activity_subscriptions/:activity_subscription_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist.activity_subscription&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=tasklist.activity_subscription&version=v2 document }
                 *
                 * 列取动态订阅
                 *
                 * 给定一个清单的GUID，获取其所有的订阅信息。结果按照订阅的创建时间排序。
                 *
                 * 列取动态订阅需要清单的读取权限。
                 */
                list: async (
                    payload?: {
                        params?: {
                            limit?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { tasklist_guid: string };
                    },
                    options?: IRequestOptions
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
                                        guid?: string;
                                        name?: string;
                                        subscribers?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        include_keys?: Array<number>;
                                        disabled?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/activity_subscriptions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist.activity_subscription&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=tasklist.activity_subscription&version=v2 document }
                 *
                 * 删除动态订阅
                 *
                 * 给定一个清单的GUID和一个订阅的GUID，将其删除。删除后的数据不可恢复。
                 *
                 * 删除订阅需要有该清单的编辑权限。
                 */
                delete: async (
                    payload?: {
                        path: {
                            tasklist_guid: string;
                            activity_subscription_guid: string;
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
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/activity_subscriptions/:activity_subscription_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist.activity_subscription&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=tasklist.activity_subscription&version=v2 document }
                 *
                 * 创建动态订阅
                 *
                 * 为一个清单创建一个订阅。每个订阅可以包含1个或多个订阅者（目前只支持普通群组）。订阅创建后，如清单发生相应的事件，则会向订阅里的订阅者发送通知消息。一个清单最多可以创建50个订阅。每个订阅最大支持50个订阅者。订阅者目前仅支持"chat"类型。;;每个订阅可以通过设置`include_keys`可以针对哪些事件(event_key)做通知。如果`include_keys`为空，则不对任何事件进行通知。;;如有需要，创建时也可以直接将`disabled`设为true，创建一个禁止发送订阅通知的订阅。
                 *
                 * 添加订阅群时，调用身份（用户或应用机器人）必须已是群成员。成功添加了订阅后，调用身份丧失了清单的可编辑权限或者退出了群，订阅依然会存在，直到被删除。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            subscribers: Array<{
                                id?: string;
                                type?: string;
                                name?: string;
                            }>;
                            include_keys: Array<number>;
                            disabled?: boolean;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { tasklist_guid: string };
                    },
                    options?: IRequestOptions
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
                                    activity_subscription?: {
                                        guid?: string;
                                        name?: string;
                                        subscribers?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        include_keys?: Array<number>;
                                        disabled?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/activity_subscriptions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist.activity_subscription&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=tasklist.activity_subscription&version=v2 document }
                 *
                 * 更新动态订阅
                 *
                 * 提供一个清单的GUID和一个动态订阅的GUID，对其进行更新。更新时，将`update_fields`字段中填写所有要修改的字段名，同时在`activity_subscription`字段中填写要修改的字段的新值即可。;;`update_fields`支持更新的字段包括：;* name：订阅的名称;* subscribers: 订阅者列表。如更新，会将旧的订阅者列表完全替换为新的订阅者列表。支持最大50个订阅者。并且订阅者必须是chat类型。;* include_keys ：订阅需要发送通知的key。如更新，会将旧的列表完全替换为新的include_keys列表。只能设置支持的event keys (见字段描述）。;* disabled：修改订阅的开启/禁用状态。
                 *
                 * 如要更新订阅，调用身份需要拥有该清单的编辑权限。;;如更新了订阅者列表，调用身份（用户或应用机器人）必须被添加为订阅群的群成员。
                 */
                patch: async (
                    payload?: {
                        data: {
                            activity_subscription: {
                                name?: string;
                                subscribers?: Array<{
                                    id?: string;
                                    type?: string;
                                    name?: string;
                                }>;
                                include_keys?: Array<number>;
                                disabled?: boolean;
                            };
                            update_fields: Array<
                                | "name"
                                | "include_keys"
                                | "subscribers"
                                | "disabled"
                            >;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: {
                            tasklist_guid: string;
                            activity_subscription_guid: string;
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
                                    activity_subscription?: {
                                        guid?: string;
                                        name?: string;
                                        subscribers?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        include_keys?: Array<number>;
                                        disabled?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasklists/:tasklist_guid/activity_subscriptions/:activity_subscription_guid`,
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
             * attachment
             */
            attachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=attachment&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=attachment&version=v2 document }
                 *
                 * 获取附件
                 *
                 * 提供一个附件GUID，返回附件的详细信息，包括GUID，名称，大小，上传时间，临时可下载链接等。
                 *
                 * 获取附件需要附件归属资源的可读取权限。
                 */
                get: async (
                    payload?: {
                        params?: { user_id_type?: string };
                        path: { attachment_guid: string };
                    },
                    options?: IRequestOptions
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
                                    attachment?: {
                                        guid?: string;
                                        file_token?: string;
                                        name?: string;
                                        size?: number;
                                        resource?: {
                                            type?: string;
                                            id?: string;
                                        };
                                        uploader?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        is_cover?: boolean;
                                        uploaded_at?: string;
                                        url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/attachments/:attachment_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=attachment&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=attachment&version=v2 document }
                 *
                 * 删除附件
                 *
                 * 提供一个附件GUID，删除该附件。删除后该附件不可再恢复。
                 *
                 * 删除附件调用身份需要拥有被删除附件所属资源的的编辑权限，或者调用身份就是附件的上传人。
                 */
                delete: async (
                    payload?: {
                        path?: { attachment_guid?: string };
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
                                `${this.domain}/open-apis/task/v2/attachments/:attachment_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=attachment&apiName=upload&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=task&resource=attachment&version=v2 document }
                 *
                 * 上传附件
                 *
                 * 为特定资源上传附件。本接口可以支持一次上传多个附件，最多5个。每个附件尺寸不超过50MB，格式不限。;;上传请求体的格式为"form-data"。若希望上传多个附件，则提供多个"file"字段即可。返回的附件顺序将会与输入的file顺序保持一致。;;目前资源类型仅支持"task", `resource_id`需要填写任务的GUID。;
                 *
                 * 为任务上传附件需要任务的可编辑权限
                 */
                upload: async (
                    payload?: {
                        data: {
                            resource_type?: string;
                            resource_id: string;
                            file: Buffer | fs.ReadStream;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
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
                                    items?: Array<{
                                        guid?: string;
                                        file_token?: string;
                                        name?: string;
                                        size?: number;
                                        resource?: {
                                            type?: string;
                                            id?: string;
                                        };
                                        uploader?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        is_cover?: boolean;
                                        uploaded_at?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/attachments/upload`,
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
                        params: {
                            page_size?: number;
                            page_token?: string;
                            resource_type?: string;
                            resource_id: string;
                            user_id_type?: string;
                            updated_mesc?: string;
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
                                    `${this.domain}/open-apis/task/v2/attachments`,
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
                                                        guid?: string;
                                                        file_token?: string;
                                                        name?: string;
                                                        size?: number;
                                                        resource?: {
                                                            type?: string;
                                                            id?: string;
                                                        };
                                                        uploader?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        is_cover?: boolean;
                                                        uploaded_at?: string;
                                                        url?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=attachment&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=attachment&version=v2 document }
                 *
                 * 列取附件
                 *
                 * 列取一个资源的所有附件。返回的附件列表支持分页，按照附件上传时间排序。;;每个附件会返回一个可供下载的临时url，有效期为3分钟，最多可以支持3次下载。如果超过使用限制，需要通过本接口获取新的临时url。
                 *
                 * 获取任务的附件列表，需要该任务的读取权限。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            resource_type?: string;
                            resource_id: string;
                            user_id_type?: string;
                            updated_mesc?: string;
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
                                        guid?: string;
                                        file_token?: string;
                                        name?: string;
                                        size?: number;
                                        resource?: {
                                            type?: string;
                                            id?: string;
                                        };
                                        uploader?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        is_cover?: boolean;
                                        uploaded_at?: string;
                                        url?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/attachments`,
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
             * custom_field.option
             */
            customFieldOption: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field.option&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=custom_field.option&version=v2 document }
                 *
                 * 更新自定义字段选项
                 *
                 * 根据一个自定义字段的GUID和其选项的GUID，更新该选项的数据。要更新的字段必须是单选或者多选类型，且要更新的字段必须归属于该字段。;;更新时，将`update_fields`字段中填写所有要修改的任务字段名，同时在`option`字段中填写要修改的字段的新值即可。`update_fields`支持的字段包括：;;* `name`: 选项名称;* `color_index`: 选项的颜色索引值;* `is_hidden`: 是否从界面上隐藏;* `insert_before`: 将当前option放到同字段某个option之前的那个option_guid。;* `insert_after`: 将当前option放到同字段某个option之后的那个option_guid。
                 *
                 * 更新选项需要自定义字段的编辑权限
                 */
                patch: async (
                    payload?: {
                        data?: {
                            option?: {
                                name?: string;
                                color_index?: number;
                                insert_before?: string;
                                insert_after?: string;
                                is_hidden?: boolean;
                            };
                            update_fields?: Array<string>;
                        };
                        path: {
                            custom_field_guid: string;
                            option_guid: string;
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
                                    option?: {
                                        guid?: string;
                                        name?: string;
                                        color_index?: number;
                                        is_hidden?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/custom_fields/:custom_field_guid/options/:option_guid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field.option&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=custom_field.option&version=v2 document }
                 *
                 * 创建自定义字段选项
                 *
                 * 为单选或多选字段添加一个自定义选项。一个单选/多选字段最大支持100个选项。;;新添加的选项如果不隐藏，其名字不能和已存在的不隐藏选项的名字重复。
                 *
                 * 需要对自定义字段的编辑权限。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            color_index?: number;
                            insert_before?: string;
                            insert_after?: string;
                            is_hidden?: boolean;
                        };
                        path: { custom_field_guid: string };
                    },
                    options?: IRequestOptions
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
                                    option?: {
                                        guid?: string;
                                        name?: string;
                                        color_index?: number;
                                        is_hidden?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/custom_fields/:custom_field_guid/options`,
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
             * task_v2
             */
            taskV2: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task_v2&apiName=task_subscription&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=task_subscription&project=task&resource=task_v2&version=v2 document }
                 *
                 * 订阅任务更新事件
                 *
                 * - 订阅范围; - 使用应用身份，订阅当前应用所负责的任务的变更事件; - 使用用户身份，订阅当前用户所创建、负责、关注的任务的变更事件;
                 */
                taskSubscription: async (
                    payload?: {
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
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
                                data?: { code?: number; msg?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/task_v2/task_subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task_v2&apiName=task_in_docx&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=task_in_docx&project=task&resource=task_v2&version=v2 document }
                 *
                 * 查询云文档中的任务
                 */
                taskInDocx: async (
                    payload?: {
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
                            task_guid?: string;
                            docx_token?: string;
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
                                    task?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/task_v2/task_in_docx`,
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
                listRelatedTaskWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            completed?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            task_updated_time?: string;
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
                                    `${this.domain}/open-apis/task/v2/task_v2/list_related_task`,
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
                                                        guid?: string;
                                                        summary?: string;
                                                        description?: string;
                                                        due?: {
                                                            timestamp?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        reminders?: Array<{
                                                            id?: string;
                                                            relative_fire_minute: number;
                                                        }>;
                                                        creator?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        members?: Array<{
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        }>;
                                                        completed_at?: string;
                                                        attachments?: Array<{
                                                            guid?: string;
                                                            file_token?: string;
                                                            name?: string;
                                                            size?: number;
                                                            resource?: {
                                                                type?: string;
                                                                id?: string;
                                                            };
                                                            uploader?: {
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            };
                                                            is_cover?: boolean;
                                                            uploaded_at?: string;
                                                            url?: string;
                                                        }>;
                                                        origin?: {
                                                            platform_i18n_name?: {
                                                                en_us?: string;
                                                                zh_cn?: string;
                                                                zh_hk?: string;
                                                                zh_tw?: string;
                                                                ja_jp?: string;
                                                                fr_fr?: string;
                                                                it_it?: string;
                                                                de_de?: string;
                                                                ru_ru?: string;
                                                                th_th?: string;
                                                                es_es?: string;
                                                                ko_kr?: string;
                                                            };
                                                            href?: {
                                                                url?: string;
                                                                title?: string;
                                                            };
                                                            refer_resources?: Array<{
                                                                resource_id?: string;
                                                                type?: string;
                                                                source_message?: {
                                                                    message_id?: string;
                                                                    content?: string;
                                                                };
                                                                unavailable_reason?: string;
                                                            }>;
                                                        };
                                                        extra?: string;
                                                        tasklists?: Array<{
                                                            tasklist_guid?: string;
                                                            section_guid?: string;
                                                        }>;
                                                        repeat_rule?: string;
                                                        parent_task_guid?: string;
                                                        mode?: number;
                                                        source?: number;
                                                        custom_complete?: {
                                                            pc?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                            ios?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                            android?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                        };
                                                        task_id?: string;
                                                        created_at?: string;
                                                        updated_at?: string;
                                                        status?: string;
                                                        url?: string;
                                                        start?: {
                                                            timestamp?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        subtask_count?: number;
                                                        is_milestone?: boolean;
                                                        custom_fields?: Array<{
                                                            guid?: string;
                                                            type?: string;
                                                            number_value?: string;
                                                            datetime_value?: string;
                                                            member_value?: Array<{
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            }>;
                                                            single_select_value?: string;
                                                            multi_select_value?: Array<string>;
                                                            name?: string;
                                                            text_value?: string;
                                                        }>;
                                                        dependencies?: Array<{
                                                            type:
                                                                | "prev"
                                                                | "next";
                                                            task_guid: string;
                                                        }>;
                                                        assignee_related?: Array<{
                                                            id?: string;
                                                            completed_at?: string;
                                                        }>;
                                                        positive_reminders?: Array<{
                                                            id?: string;
                                                            relative_fire_minute: number;
                                                        }>;
                                                        agent_task_status?: number;
                                                        agent_task_progress?: string;
                                                        text_deliveries?: Array<string>;
                                                        attachment_deliveries?: Array<{
                                                            guid?: string;
                                                            file_token?: string;
                                                            name?: string;
                                                            size?: number;
                                                            resource?: {
                                                                type?: string;
                                                                id?: string;
                                                            };
                                                            uploader?: {
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            };
                                                            is_cover?: boolean;
                                                            uploaded_at?: string;
                                                            url?: string;
                                                        }>;
                                                        next_task_guid?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task_v2&apiName=list_related_task&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_related_task&project=task&resource=task_v2&version=v2 document }
                 *
                 * 列取与我相关的任务
                 *
                 * 获取任务中心 我负责的、我关注的、我创建的、我分配的任务列表，按任务的更新时间升序排序
                 */
                listRelatedTask: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            completed?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            task_updated_time?: string;
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
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/task_v2/list_related_task`,
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
             * agent
             */
            agent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=agent&apiName=list_registered_agent&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_registered_agent&project=task&resource=agent&version=v2 document }
                 *
                 * ## 功能介绍 获取已注册的第三方任务代理应用列表，包含应用标识、名称等核心信息，用于管理企业内接入的任务协作工具，支持批量查询已完成注册的代理应用数据。 ### 注意事项 - 返回的应用列表仅包含当前企业已完成注册流程的代理应用，未通过审核或注册中的应用不会展示。
                 */
                listRegisteredAgent: async (
                    payload?: {},
                    options?: IRequestOptions
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
                                        app_id?: string;
                                        app_name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/agent/list_registered_agent`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=agent&apiName=register_agent&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=register_agent&project=task&resource=agent&version=v2 document }
                 *
                 * 注册/注销 AI 智能体
                 */
                registerAgent: async (
                    payload?: {},
                    options?: IRequestOptions
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
                                    agent?: {
                                        app_id?: string;
                                        app_name?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/agent/register_agent`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=agent&apiName=unregister_agent&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unregister_agent&project=task&resource=agent&version=v2 document }
                 *
                 * ## 功能介绍;解除指定任务代理的绑定关系，停止其代处理任务的权限，常用于员工离职、岗位调整或代理权限到期等场景。;;### 注意事项;- 解绑操作不可逆，需确认代理已完成当前待处理任务或已完成任务交接。;- 解绑后代理将无法再接收新的待处理任务，已接收的任务需手动转派或由原责任人处理。
                 */
                unregisterAgent: async (
                    payload?: {},
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
                                `${this.domain}/open-apis/task/v2/agent/unregister_agent`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=agent&apiName=update_agent_profile&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_agent_profile&project=task&resource=agent&version=v2 document }
                 *
                 * ## 功能介绍 更新任务代理的主页内容数据。
                 */
                updateAgentProfile: async (
                    payload?: {
                        data?: { profile_content?: string };
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
                                `${this.domain}/open-apis/task/v2/agent/update_agent_profile`,
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
             * agent_task_step_info
             */
            agentTaskStepInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=agent_task_step_info&apiName=append_task_steps&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=append_task_steps&project=task&resource=agent_task_step_info&version=v2 document }
                 *
                 * ## 功能介绍 写入任务记录。
                 */
                appendTaskSteps: async (
                    payload?: {
                        data?: {
                            task_guid?: string;
                            task_steps?: Array<{
                                quote?: string;
                                content: string;
                                timestamp?: number;
                            }>;
                            idempotent_key?: string;
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
                                `${this.domain}/open-apis/task/v2/agent_task_step_info/append_task_steps`,
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
             * task.subtask
             */
            taskSubtask: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: string;
                        };
                        path?: { task_guid?: string };
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
                                    `${this.domain}/open-apis/task/v2/tasks/:task_guid/subtasks`,
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
                                                        guid?: string;
                                                        summary?: string;
                                                        description?: string;
                                                        due?: {
                                                            timestamp?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        reminders?: Array<{
                                                            id?: string;
                                                            relative_fire_minute: number;
                                                        }>;
                                                        creator?: {
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        };
                                                        members?: Array<{
                                                            id?: string;
                                                            type?: string;
                                                            role?: string;
                                                            name?: string;
                                                        }>;
                                                        completed_at?: string;
                                                        attachments?: Array<{
                                                            guid?: string;
                                                            file_token?: string;
                                                            name?: string;
                                                            size?: number;
                                                            resource?: {
                                                                type?: string;
                                                                id?: string;
                                                            };
                                                            uploader?: {
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            };
                                                            is_cover?: boolean;
                                                            uploaded_at?: string;
                                                        }>;
                                                        origin?: {
                                                            platform_i18n_name?: {
                                                                en_us?: string;
                                                                zh_cn?: string;
                                                                zh_hk?: string;
                                                                zh_tw?: string;
                                                                ja_jp?: string;
                                                                fr_fr?: string;
                                                                it_it?: string;
                                                                de_de?: string;
                                                                ru_ru?: string;
                                                                th_th?: string;
                                                                es_es?: string;
                                                                ko_kr?: string;
                                                            };
                                                            href?: {
                                                                url?: string;
                                                                title?: string;
                                                            };
                                                            refer_resources?: Array<{
                                                                resource_id?: string;
                                                                type?: string;
                                                                source_message?: {
                                                                    message_id?: string;
                                                                    content?: string;
                                                                };
                                                                unavailable_reason?: string;
                                                            }>;
                                                        };
                                                        extra?: string;
                                                        tasklists?: Array<{
                                                            tasklist_guid?: string;
                                                            section_guid?: string;
                                                        }>;
                                                        repeat_rule?: string;
                                                        parent_task_guid?: string;
                                                        mode?: number;
                                                        source?: number;
                                                        custom_complete?: {
                                                            pc?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                            ios?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                            android?: {
                                                                href?: string;
                                                                tip?: {
                                                                    en_us?: string;
                                                                    zh_cn?: string;
                                                                    zh_hk?: string;
                                                                    zh_tw?: string;
                                                                    ja_jp?: string;
                                                                    fr_fr?: string;
                                                                    it_it?: string;
                                                                    de_de?: string;
                                                                    ru_ru?: string;
                                                                    th_th?: string;
                                                                    es_es?: string;
                                                                    ko_kr?: string;
                                                                };
                                                            };
                                                        };
                                                        task_id?: string;
                                                        created_at?: string;
                                                        updated_at?: string;
                                                        status?: string;
                                                        url?: string;
                                                        start?: {
                                                            timestamp?: string;
                                                            is_all_day?: boolean;
                                                        };
                                                        subtask_count?: number;
                                                        is_milestone?: boolean;
                                                        custom_fields?: Array<{
                                                            guid?: string;
                                                            type?: string;
                                                            number_value?: string;
                                                            datetime_value?: string;
                                                            member_value?: Array<{
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            }>;
                                                            single_select_value?: string;
                                                            multi_select_value?: Array<string>;
                                                            name?: string;
                                                            text_value?: string;
                                                        }>;
                                                        dependencies?: Array<{
                                                            type:
                                                                | "prev"
                                                                | "next";
                                                            task_guid: string;
                                                        }>;
                                                        assignee_related?: Array<{
                                                            id?: string;
                                                            completed_at?: string;
                                                        }>;
                                                        positive_reminders?: Array<{
                                                            id?: string;
                                                            relative_fire_minute: number;
                                                        }>;
                                                        agent_task_status?: number;
                                                        agent_task_progress?: string;
                                                        text_deliveries?: Array<string>;
                                                        attachment_deliveries?: Array<{
                                                            guid?: string;
                                                            file_token?: string;
                                                            name?: string;
                                                            size?: number;
                                                            resource?: {
                                                                type?: string;
                                                                id?: string;
                                                            };
                                                            uploader?: {
                                                                id?: string;
                                                                type?: string;
                                                                role?: string;
                                                                name?: string;
                                                            };
                                                            is_cover?: boolean;
                                                            uploaded_at?: string;
                                                            url?: string;
                                                        }>;
                                                        next_task_guid?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.subtask&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=task&resource=task.subtask&version=v2 document }
                 *
                 * 获取任务的子任务列表
                 *
                 * 获取一个任务的子任务列表。;;支持分页，数据按照子任务在界面上的顺序返回。
                 *
                 * 需要父任务的读取权限。详见[任务是如何鉴权的？](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/faq)
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: string;
                        };
                        path?: { task_guid?: string };
                    },
                    options?: IRequestOptions
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
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/subtasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.subtask&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task.subtask&version=v2 document }
                 *
                 * 创建子任务
                 *
                 * 给一个任务创建一个子任务。;;接口功能除了额外需要输入父任务的GUID之外，和[创建任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/create)接口功能完全一致。
                 *
                 * 创建子任务需要拥有父任务的编辑权限。详见[任务是如何鉴权的？](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/faq);;如果将新任务加入清单，则需要清单的可编辑权限。详情见[任务功能概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/overview)中的“任务是如何鉴权的？”章节。
                 */
                create: async (
                    payload?: {
                        data: {
                            summary: string;
                            description?: string;
                            due?: { timestamp?: string; is_all_day?: boolean };
                            origin?: {
                                platform_i18n_name?: {
                                    en_us?: string;
                                    zh_cn?: string;
                                    zh_hk?: string;
                                    zh_tw?: string;
                                    ja_jp?: string;
                                    fr_fr?: string;
                                    it_it?: string;
                                    de_de?: string;
                                    ru_ru?: string;
                                    th_th?: string;
                                    es_es?: string;
                                    ko_kr?: string;
                                };
                                href?: { url?: string; title?: string };
                                refer_resources?: Array<{
                                    resource_id?: string;
                                    type?: string;
                                    source_message?: {
                                        message_id?: string;
                                        content?: string;
                                    };
                                    unavailable_reason?: string;
                                }>;
                            };
                            extra?: string;
                            completed_at?: string;
                            members?: Array<{
                                id: string;
                                type?: string;
                                role: string;
                                name?: string;
                            }>;
                            repeat_rule?: string;
                            custom_complete?: {
                                pc?: {
                                    href?: string;
                                    tip?: {
                                        en_us?: string;
                                        zh_cn?: string;
                                        zh_hk?: string;
                                        zh_tw?: string;
                                        ja_jp?: string;
                                        fr_fr?: string;
                                        it_it?: string;
                                        de_de?: string;
                                        ru_ru?: string;
                                        th_th?: string;
                                        es_es?: string;
                                        ko_kr?: string;
                                    };
                                };
                                ios?: {
                                    href?: string;
                                    tip?: {
                                        en_us?: string;
                                        zh_cn?: string;
                                        zh_hk?: string;
                                        zh_tw?: string;
                                        ja_jp?: string;
                                        fr_fr?: string;
                                        it_it?: string;
                                        de_de?: string;
                                        ru_ru?: string;
                                        th_th?: string;
                                        es_es?: string;
                                        ko_kr?: string;
                                    };
                                };
                                android?: {
                                    href?: string;
                                    tip?: {
                                        en_us?: string;
                                        zh_cn?: string;
                                        zh_hk?: string;
                                        zh_tw?: string;
                                        ja_jp?: string;
                                        fr_fr?: string;
                                        it_it?: string;
                                        de_de?: string;
                                        ru_ru?: string;
                                        th_th?: string;
                                        es_es?: string;
                                        ko_kr?: string;
                                    };
                                };
                            };
                            tasklists?: Array<{
                                tasklist_guid?: string;
                                section_guid?: string;
                            }>;
                            client_token?: string;
                            start?: {
                                timestamp?: string;
                                is_all_day?: boolean;
                            };
                            reminders?: Array<{ relative_fire_minute: number }>;
                            mode?: number;
                            is_milestone?: boolean;
                            custom_fields?: Array<{
                                guid: string;
                                number_value?: string;
                                member_value?: Array<{
                                    id?: string;
                                    type?: string;
                                    role?: string;
                                    name?: string;
                                }>;
                                datetime_value?: string;
                                single_select_value?: string;
                                multi_select_value?: Array<string>;
                                text_value?: string;
                            }>;
                            docx_source?: { token: string; block_id: string };
                            agent_task_status?: number;
                            agent_task_progress?: string;
                            text_deliveries?: Array<string>;
                        };
                        params?: { user_id_type?: string };
                        path: { task_guid: string };
                    },
                    options?: IRequestOptions
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
                                    subtask?: {
                                        guid?: string;
                                        summary?: string;
                                        description?: string;
                                        due?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        creator?: {
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        };
                                        members?: Array<{
                                            id?: string;
                                            type?: string;
                                            role?: string;
                                            name?: string;
                                        }>;
                                        completed_at?: string;
                                        attachments?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                        }>;
                                        origin?: {
                                            platform_i18n_name?: {
                                                en_us?: string;
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                ja_jp?: string;
                                                fr_fr?: string;
                                                it_it?: string;
                                                de_de?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                es_es?: string;
                                                ko_kr?: string;
                                            };
                                            href?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            refer_resources?: Array<{
                                                resource_id?: string;
                                                type?: string;
                                                source_message?: {
                                                    message_id?: string;
                                                    content?: string;
                                                };
                                                unavailable_reason?: string;
                                            }>;
                                        };
                                        extra?: string;
                                        tasklists?: Array<{
                                            tasklist_guid?: string;
                                            section_guid?: string;
                                        }>;
                                        repeat_rule?: string;
                                        parent_task_guid?: string;
                                        mode?: number;
                                        source?: number;
                                        custom_complete?: {
                                            pc?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            ios?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                            android?: {
                                                href?: string;
                                                tip?: {
                                                    en_us?: string;
                                                    zh_cn?: string;
                                                    zh_hk?: string;
                                                    zh_tw?: string;
                                                    ja_jp?: string;
                                                    fr_fr?: string;
                                                    it_it?: string;
                                                    de_de?: string;
                                                    ru_ru?: string;
                                                    th_th?: string;
                                                    es_es?: string;
                                                    ko_kr?: string;
                                                };
                                            };
                                        };
                                        task_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        status?: string;
                                        url?: string;
                                        start?: {
                                            timestamp?: string;
                                            is_all_day?: boolean;
                                        };
                                        subtask_count?: number;
                                        is_milestone?: boolean;
                                        custom_fields?: Array<{
                                            guid?: string;
                                            type?: string;
                                            number_value?: string;
                                            datetime_value?: string;
                                            member_value?: Array<{
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            }>;
                                            single_select_value?: string;
                                            multi_select_value?: Array<string>;
                                            name?: string;
                                            text_value?: string;
                                        }>;
                                        dependencies?: Array<{
                                            type: "prev" | "next";
                                            task_guid: string;
                                        }>;
                                        assignee_related?: Array<{
                                            id?: string;
                                            completed_at?: string;
                                        }>;
                                        positive_reminders?: Array<{
                                            id?: string;
                                            relative_fire_minute: number;
                                        }>;
                                        agent_task_status?: number;
                                        agent_task_progress?: string;
                                        text_deliveries?: Array<string>;
                                        attachment_deliveries?: Array<{
                                            guid?: string;
                                            file_token?: string;
                                            name?: string;
                                            size?: number;
                                            resource?: {
                                                type?: string;
                                                id?: string;
                                            };
                                            uploader?: {
                                                id?: string;
                                                type?: string;
                                                role?: string;
                                                name?: string;
                                            };
                                            is_cover?: boolean;
                                            uploaded_at?: string;
                                            url?: string;
                                        }>;
                                        next_task_guid?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/task/v2/tasks/:task_guid/subtasks`,
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
