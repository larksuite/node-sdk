import { fillApiPath } from "@node-sdk/utils";
import { Logger } from "@node-sdk/typings";
import { formatErrors } from "@node-sdk/client/utils";
import { IRequestOptions } from "@node-sdk/code-gen/types";
import { IPayload } from "@node-sdk/client/types";
import { HttpInstance } from "@node-sdk/typings/http";
import { Readable } from "stream";
import { stringify } from "qs";
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
         * workplace_user_notification
         */
        workplaceUserNotification: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_user_notification&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=workplace&resource=workplace_user_notification&version=v1 document }
             *
             * 删除用户弹窗通知
             *
             * 删除工作台用户弹窗通知。
             */
            delete: async (
                payload?: {
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_user_notifications/:notification_id`,
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
                        user_id_type: "user_id" | "union_id" | "open_id";
                        receive_id?: string;
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
                                `${this.domain}/open-apis/workplace/v1/workplace_user_notifications`,
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
                                                    notification_id: string;
                                                    content: string;
                                                    expire_time: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_user_notification&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=workplace&resource=workplace_user_notification&version=v1 document }
             *
             * 获取用户弹窗通知列表
             *
             * 获取工作台用户弹窗通知列表。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        user_id_type: "user_id" | "union_id" | "open_id";
                        receive_id?: string;
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
                                    notification_id: string;
                                    content: string;
                                    expire_time: string;
                                }>;
                                page_token?: string;
                                has_more: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_user_notifications`,
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
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_user_notification&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=workplace&resource=workplace_user_notification&version=v1 document }
             *
             * 获取用户弹窗通知详情
             *
             * 获取工作台用户弹窗通知详情。
             */
            get: async (
                payload?: {
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                workplace_user_notification?: {
                                    notification_id: string;
                                    content: string;
                                    expire_time: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_user_notifications/:notification_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_user_notification&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=workplace&resource=workplace_user_notification&version=v1 document }
             *
             * 创建用户弹窗通知
             *
             * 创建工作台用户弹窗通知。
             */
            create: async (
                payload?: {
                    data: { content: string; expire_time: string };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
                        receive_id: string;
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
                                workplace_user_notification?: {
                                    notification_id: string;
                                    content: string;
                                    expire_time: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_user_notifications`,
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
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_user_notification&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=workplace&resource=workplace_user_notification&version=v1 document }
             *
             * 更新用户弹窗通知
             *
             * 更新工作台用户弹窗通知。
             */
            update: async (
                payload?: {
                    data: { content: string; expire_time: string };
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_user_notifications/:notification_id`,
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
         * workplace_tenant_notification
         */
        workplaceTenantNotification: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_tenant_notification&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=workplace&resource=workplace_tenant_notification&version=v1 document }
             *
             * 删除租户弹窗通知
             *
             * 删除工作台租户弹窗通知。
             */
            delete: async (
                payload?: {
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications/:notification_id`,
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
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications`,
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
                                                    notification_id: string;
                                                    content: string;
                                                    expire_time: string;
                                                    rule: {
                                                        is_all_visible?: boolean;
                                                        visible_department_ids?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_tenant_notification&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=workplace&resource=workplace_tenant_notification&version=v1 document }
             *
             * 获取租户弹窗通知列表
             *
             * 获取工作台租户弹窗通知列表。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                    notification_id: string;
                                    content: string;
                                    expire_time: string;
                                    rule: {
                                        is_all_visible?: boolean;
                                        visible_department_ids?: Array<string>;
                                    };
                                }>;
                                page_token?: string;
                                has_more: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications`,
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
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_tenant_notification&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=workplace&resource=workplace_tenant_notification&version=v1 document }
             *
             * 获取租户弹窗通知详情
             *
             * 获取工作台租户弹窗通知详情。
             */
            get: async (
                payload?: {
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                workplace_tenant_notification?: {
                                    notification_id: string;
                                    content: string;
                                    expire_time: string;
                                    rule: {
                                        is_all_visible?: boolean;
                                        visible_department_ids?: Array<string>;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications/:notification_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_tenant_notification&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=workplace&resource=workplace_tenant_notification&version=v1 document }
             *
             * 创建租户弹窗通知
             *
             * 创建工作台租户弹窗通知。
             */
            create: async (
                payload?: {
                    data: {
                        content: string;
                        expire_time: string;
                        rule: {
                            is_all_visible?: boolean;
                            visible_department_ids?: Array<string>;
                        };
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                workplace_tenant_notification?: {
                                    notification_id: string;
                                    content: string;
                                    expire_time: string;
                                    rule: {
                                        is_all_visible?: boolean;
                                        visible_department_ids?: Array<string>;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications`,
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
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_tenant_notification&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=workplace&resource=workplace_tenant_notification&version=v1 document }
             *
             * 更新租户弹窗通知
             *
             * 更新工作台租户弹窗通知。
             */
            update: async (
                payload?: {
                    data: {
                        content: string;
                        expire_time: string;
                        rule: {
                            is_all_visible?: boolean;
                            visible_department_ids?: Array<string>;
                        };
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications/:notification_id`,
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
         * workplace_access_data
         */
        workplaceAccessData: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_access_data&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=workplace_access_data&version=v1 document }
             *
             * 获取工作台访问数据
             *
             * 获取工作台访问数据（包含默认工作台与定制工作台）
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
         * workplace_block_access_data
         */
        workplaceBlockAccessData: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_block_access_data&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=workplace_block_access_data&version=v1 document }
             *
             * 获取定制工作台小组件访问数据
             *
             * 获取定制工作台小组件访问数据
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
         * custom_workplace_access_data
         */
        customWorkplaceAccessData: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=custom_workplace_access_data&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=custom_workplace_access_data&version=v1 document }
             *
             * 获取定制工作台访问数据
             *
             * 获取定制工作台访问数据
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
             * workplace_user_notification
             */
            workplaceUserNotification: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_user_notification&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=workplace&resource=workplace_user_notification&version=v1 document }
                 *
                 * 删除用户弹窗通知
                 *
                 * 删除工作台用户弹窗通知。
                 */
                delete: async (
                    payload?: {
                        path: { notification_id: string };
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
                                `${this.domain}/open-apis/workplace/v1/workplace_user_notifications/:notification_id`,
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
                            user_id_type: "user_id" | "union_id" | "open_id";
                            receive_id?: string;
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
                                    `${this.domain}/open-apis/workplace/v1/workplace_user_notifications`,
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
                                                        notification_id: string;
                                                        content: string;
                                                        expire_time: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_user_notification&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=workplace&resource=workplace_user_notification&version=v1 document }
                 *
                 * 获取用户弹窗通知列表
                 *
                 * 获取工作台用户弹窗通知列表。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type: "user_id" | "union_id" | "open_id";
                            receive_id?: string;
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
                                        notification_id: string;
                                        content: string;
                                        expire_time: string;
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/workplace/v1/workplace_user_notifications`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_user_notification&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=workplace&resource=workplace_user_notification&version=v1 document }
                 *
                 * 获取用户弹窗通知详情
                 *
                 * 获取工作台用户弹窗通知详情。
                 */
                get: async (
                    payload?: {
                        path: { notification_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    workplace_user_notification?: {
                                        notification_id: string;
                                        content: string;
                                        expire_time: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/workplace/v1/workplace_user_notifications/:notification_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_user_notification&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=workplace&resource=workplace_user_notification&version=v1 document }
                 *
                 * 创建用户弹窗通知
                 *
                 * 创建工作台用户弹窗通知。
                 */
                create: async (
                    payload?: {
                        data: { content: string; expire_time: string };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
                            receive_id: string;
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
                                    workplace_user_notification?: {
                                        notification_id: string;
                                        content: string;
                                        expire_time: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/workplace/v1/workplace_user_notifications`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_user_notification&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=workplace&resource=workplace_user_notification&version=v1 document }
                 *
                 * 更新用户弹窗通知
                 *
                 * 更新工作台用户弹窗通知。
                 */
                update: async (
                    payload?: {
                        data: { content: string; expire_time: string };
                        path: { notification_id: string };
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
                                `${this.domain}/open-apis/workplace/v1/workplace_user_notifications/:notification_id`,
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
             * workplace_tenant_notification
             */
            workplaceTenantNotification: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_tenant_notification&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=workplace&resource=workplace_tenant_notification&version=v1 document }
                 *
                 * 删除租户弹窗通知
                 *
                 * 删除工作台租户弹窗通知。
                 */
                delete: async (
                    payload?: {
                        path: { notification_id: string };
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
                                `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications/:notification_id`,
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
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications`,
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
                                                        notification_id: string;
                                                        content: string;
                                                        expire_time: string;
                                                        rule: {
                                                            is_all_visible?: boolean;
                                                            visible_department_ids?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_tenant_notification&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=workplace&resource=workplace_tenant_notification&version=v1 document }
                 *
                 * 获取租户弹窗通知列表
                 *
                 * 获取工作台租户弹窗通知列表。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                        notification_id: string;
                                        content: string;
                                        expire_time: string;
                                        rule: {
                                            is_all_visible?: boolean;
                                            visible_department_ids?: Array<string>;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_tenant_notification&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=workplace&resource=workplace_tenant_notification&version=v1 document }
                 *
                 * 获取租户弹窗通知详情
                 *
                 * 获取工作台租户弹窗通知详情。
                 */
                get: async (
                    payload?: {
                        path: { notification_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    workplace_tenant_notification?: {
                                        notification_id: string;
                                        content: string;
                                        expire_time: string;
                                        rule: {
                                            is_all_visible?: boolean;
                                            visible_department_ids?: Array<string>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications/:notification_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_tenant_notification&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=workplace&resource=workplace_tenant_notification&version=v1 document }
                 *
                 * 创建租户弹窗通知
                 *
                 * 创建工作台租户弹窗通知。
                 */
                create: async (
                    payload?: {
                        data: {
                            content: string;
                            expire_time: string;
                            rule: {
                                is_all_visible?: boolean;
                                visible_department_ids?: Array<string>;
                            };
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    workplace_tenant_notification?: {
                                        notification_id: string;
                                        content: string;
                                        expire_time: string;
                                        rule: {
                                            is_all_visible?: boolean;
                                            visible_department_ids?: Array<string>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_tenant_notification&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=workplace&resource=workplace_tenant_notification&version=v1 document }
                 *
                 * 更新租户弹窗通知
                 *
                 * 更新工作台租户弹窗通知。
                 */
                update: async (
                    payload?: {
                        data: {
                            content: string;
                            expire_time: string;
                            rule: {
                                is_all_visible?: boolean;
                                visible_department_ids?: Array<string>;
                            };
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { notification_id: string };
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
                                `${this.domain}/open-apis/workplace/v1/workplace_tenant_notifications/:notification_id`,
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
             * workplace_access_data
             */
            workplaceAccessData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_access_data&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=workplace_access_data&version=v1 document }
                 *
                 * 获取工作台访问数据
                 *
                 * 获取工作台访问数据（包含默认工作台与定制工作台）
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
             * workplace_block_access_data
             */
            workplaceBlockAccessData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_block_access_data&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=workplace_block_access_data&version=v1 document }
                 *
                 * 获取定制工作台小组件访问数据
                 *
                 * 获取定制工作台小组件访问数据
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
             * custom_workplace_access_data
             */
            customWorkplaceAccessData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=custom_workplace_access_data&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=custom_workplace_access_data&version=v1 document }
                 *
                 * 获取定制工作台访问数据
                 *
                 * 获取定制工作台访问数据
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
