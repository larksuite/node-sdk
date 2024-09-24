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
import sup_project from "./sup_project";

// auto gen
export default abstract class Client extends sup_project {
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
     * 任务
     */
    task = {
        /**
         * 任务
         */
        task: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=batch_delete_collaborator&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_collaborator document }
             *
             * 批量删除执行者
             *
             * 该接口用于批量删除执行者
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=batch_delete_follower&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_follower document }
             *
             * 批量删除关注人
             *
             * 该接口用于批量删除关注人
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=complete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/complete document }
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/create document }
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/delete document }
             *
             * 删除任务
             *
             * 该接口用于删除任务
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/get document }
             *
             * 获取任务详情
             *
             * 该接口用于获取任务详情，包括任务标题、描述、时间、来源等信息
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
                                    get<
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
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/list document }
             *
             * 获取任务列表
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/patch document }
             *
             * 更新任务
             *
             * 该接口用于修改任务的标题、描述、时间、来源等相关信息
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=uncomplete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/uncomplete document }
             *
             * 取消完成任务
             *
             * 该接口用于取消任务的已完成状态
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
        },
        /**
         * 执行者
         */
        taskCollaborator: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/create document }
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/delete document }
             *
             * 删除执行者
             *
             * 该接口用于删除任务执行者
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
                                    get<
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
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/list document }
             *
             * 获取一个任务的执行者列表
             *
             * 该接口用于查询任务执行者列表，支持分页，最大值为50
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
        },
        /**
         * 评论
         */
        taskComment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/create document }
             *
             * 创建评论
             *
             * 该接口用于创建和回复任务的评论。当parent_id字段为0时，为创建评论；当parent_id不为0时，为回复某条评论
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/delete document }
             *
             * 删除评论
             *
             * 该接口用于通过评论ID删除评论
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/get document }
             *
             * 获取评论详情
             *
             * 该接口用于通过评论ID获取评论详情
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
                                    get<
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
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/list document }
             *
             * 获取评论列表
             *
             * 该接口用于查询任务评论列表，支持分页，最大值为100
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
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/update document }
             *
             * 更新评论
             *
             * 该接口用于更新评论内容
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
        },
        /**
         * 关注人
         */
        taskFollower: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/create document }
             *
             * 新增关注人
             *
             * 该接口用于创建任务关注人。可以一次性添加多位关注人。关注人ID要使用表示用户的ID。
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/delete document }
             *
             * 删除关注人
             *
             * 该接口用于删除任务关注人
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
                                    get<
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
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/list document }
             *
             * 获取任务关注人列表
             *
             * 该接口用于查询任务关注人列表，支持分页，最大值为50
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
        },
        /**
         * 提醒
         */
        taskReminder: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/create document }
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/delete document }
             *
             * 删除提醒时间
             *
             * 删除提醒时间，返回结果状态
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
                                    get<
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
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/list document }
             *
             * 查询提醒时间列表
             *
             * 返回提醒时间列表，支持分页，最大值为50
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
        },
        v1: {
            /**
             * 任务
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=batch_delete_collaborator&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_collaborator document }
                 *
                 * 批量删除执行者
                 *
                 * 该接口用于批量删除执行者
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=batch_delete_follower&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_follower document }
                 *
                 * 批量删除关注人
                 *
                 * 该接口用于批量删除关注人
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=complete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/complete document }
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/create document }
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/delete document }
                 *
                 * 删除任务
                 *
                 * 该接口用于删除任务
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/get document }
                 *
                 * 获取任务详情
                 *
                 * 该接口用于获取任务详情，包括任务标题、描述、时间、来源等信息
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
                                        get<
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
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/list document }
                 *
                 * 获取任务列表
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/patch document }
                 *
                 * 更新任务
                 *
                 * 该接口用于修改任务的标题、描述、时间、来源等相关信息
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=uncomplete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/uncomplete document }
                 *
                 * 取消完成任务
                 *
                 * 该接口用于取消任务的已完成状态
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
            },
            /**
             * 执行者
             */
            taskCollaborator: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/create document }
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/delete document }
                 *
                 * 删除执行者
                 *
                 * 该接口用于删除任务执行者
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
                                        get<
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
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/list document }
                 *
                 * 获取一个任务的执行者列表
                 *
                 * 该接口用于查询任务执行者列表，支持分页，最大值为50
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
            },
            /**
             * 评论
             */
            taskComment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/create document }
                 *
                 * 创建评论
                 *
                 * 该接口用于创建和回复任务的评论。当parent_id字段为0时，为创建评论；当parent_id不为0时，为回复某条评论
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/delete document }
                 *
                 * 删除评论
                 *
                 * 该接口用于通过评论ID删除评论
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/get document }
                 *
                 * 获取评论详情
                 *
                 * 该接口用于通过评论ID获取评论详情
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
                                        get<
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
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/list document }
                 *
                 * 获取评论列表
                 *
                 * 该接口用于查询任务评论列表，支持分页，最大值为100
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/update document }
                 *
                 * 更新评论
                 *
                 * 该接口用于更新评论内容
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
            },
            /**
             * 关注人
             */
            taskFollower: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/create document }
                 *
                 * 新增关注人
                 *
                 * 该接口用于创建任务关注人。可以一次性添加多位关注人。关注人ID要使用表示用户的ID。
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/delete document }
                 *
                 * 删除关注人
                 *
                 * 该接口用于删除任务关注人
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
                                        get<
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
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/list document }
                 *
                 * 获取任务关注人列表
                 *
                 * 该接口用于查询任务关注人列表，支持分页，最大值为50
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
            },
            /**
             * 提醒
             */
            taskReminder: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/create document }
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/delete document }
                 *
                 * 删除提醒时间
                 *
                 * 删除提醒时间，返回结果状态
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
                                        get<
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
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/list document }
                 *
                 * 查询提醒时间列表
                 *
                 * 返回提醒时间列表，支持分页，最大值为50
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
            },
        },
        v2: {
            /**
             * attachment
             */
            attachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=attachment&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=attachment&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=attachment&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=attachment&version=v2 document }
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            resource_type?: string;
                            resource_id: string;
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
                                        get<
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
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            resource_type?: string;
                            resource_id: string;
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=attachment&apiName=upload&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=task&resource=attachment&version=v2 document }
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

                    return get(res, "data", null);
                },
            },
            /**
             * comment
             */
            comment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=comment&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=comment&version=v2 document }
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=comment&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=comment&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=comment&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=comment&version=v2 document }
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
                                        get<
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
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=comment&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=comment&version=v2 document }
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
            },
            /**
             * custom_field
             */
            customField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field&apiName=add&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add&project=task&resource=custom_field&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=custom_field&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=custom_field&version=v2 document }
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            resource_type?: string;
                            resource_id?: string;
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
                                        get<
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
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            resource_type?: string;
                            resource_id?: string;
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=custom_field&version=v2 document }
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
            },
            /**
             * custom_field.option
             */
            customFieldOption: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field.option&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=custom_field.option&version=v2 document }
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=custom_field.option&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=custom_field.option&version=v2 document }
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
            },
            /**
             * section
             */
            section: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=section&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=section&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=section&version=v2 document }
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            resource_type: string;
                            resource_id?: string;
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
                                        get<
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
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            resource_type: string;
                            resource_id?: string;
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=section&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=section&version=v2 document }
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
                                        get<
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
                                            },
                                            "data"
                                        >(res, "data") || {};

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
            },
            /**
             * task
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=add_dependencies&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_dependencies&project=task&resource=task&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=add_members&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_members&project=task&resource=task&version=v2 document }
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=add_reminders&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_reminders&project=task&resource=task&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=add_tasklist&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_tasklist&project=task&resource=task&version=v2 document }
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=task&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=task&version=v2 document }
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            completed?: boolean;
                            type?: string;
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
                                        get<
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
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            completed?: boolean;
                            type?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=task&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=remove_dependencies&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_dependencies&project=task&resource=task&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=remove_members&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_members&project=task&resource=task&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=remove_reminders&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_reminders&project=task&resource=task&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=remove_tasklist&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_tasklist&project=task&resource=task&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=tasklists&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=tasklists&project=task&resource=task&version=v2 document }
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
            },
            /**
             * task.subtask
             */
            taskSubtask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.subtask&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=task.subtask&version=v2 document }
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
                                        get<
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
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
            },
            /**
             * tasklist.activity_subscription
             */
            tasklistActivitySubscription: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist.activity_subscription&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=tasklist.activity_subscription&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist.activity_subscription&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=tasklist.activity_subscription&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist.activity_subscription&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=tasklist.activity_subscription&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist.activity_subscription&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=tasklist.activity_subscription&version=v2 document }
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
             * tasklist
             */
            tasklist: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=add_members&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_members&project=task&resource=tasklist&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=task&resource=tasklist&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=task&resource=tasklist&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=task&resource=tasklist&version=v2 document }
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
                                        get<
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
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=task&resource=tasklist&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=remove_members&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_members&project=task&resource=tasklist&version=v2 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=tasklist&apiName=tasks&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=tasks&project=task&resource=tasklist&version=v2 document }
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
            },
        },
    };
}
