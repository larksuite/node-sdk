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
import board from "./board";

// auto gen
export default abstract class Client extends board {
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
     * 日历
     */
    calendar = {
        /**
         * 日历访问控制
         */
        calendarAcl: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/create document }
             *
             * 创建访问控制
             *
             * 该接口用于以当前身份（应用 / 用户）给日历添加访问控制权限，即日历成员。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。
             */
            create: async (
                payload?: {
                    data: {
                        role:
                            | "unknown"
                            | "free_busy_reader"
                            | "reader"
                            | "writer"
                            | "owner";
                        scope: { type: "user"; user_id?: string };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                acl_id: string;
                                role:
                                    | "unknown"
                                    | "free_busy_reader"
                                    | "reader"
                                    | "writer"
                                    | "owner";
                                scope: { type: "user"; user_id?: string };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/delete document }
             *
             * 删除访问控制
             *
             * 该接口用于以当前身份（应用 / 用户）删除日历的控制权限，即日历成员。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。
             */
            delete: async (
                payload?: {
                    path: { calendar_id: string; acl_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/:acl_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            listWithIterator: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                                acls?: Array<{
                                                    acl_id: string;
                                                    role:
                                                        | "unknown"
                                                        | "free_busy_reader"
                                                        | "reader"
                                                        | "writer"
                                                        | "owner";
                                                    scope: {
                                                        type: "user";
                                                        user_id?: string;
                                                    };
                                                }>;
                                                has_more?: boolean;
                                                page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/list document }
             *
             * 获取访问控制列表
             *
             * 该接口用于以当前身份（应用 / 用户）获取日历的控制权限列表。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                acls?: Array<{
                                    acl_id: string;
                                    role:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                    scope: { type: "user"; user_id?: string };
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=subscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/subscription document }
             *
             * 订阅日历访问控制变更事件;
             *
             * 该接口用于以用户身份订阅指定日历下的日历成员变更事件。
             *
             * 用户必须对日历有访问权限。
             */
            subscription: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/subscription`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=unsubscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/unsubscription document }
             *
             * 取消订阅日历访问控制变更事件
             *
             * 该接口用于以用户身份取消订阅指定日历下的日历成员变更事件。
             *
             * 用户必须对日历有访问权限。
             */
            unsubscription: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/unsubscription`,
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
         * 日历管理
         */
        calendar: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/create document }
             *
             * 创建共享日历
             *
             * 该接口用于为当前身份（应用 / 用户）创建一个共享日历。;;身份由 Header Authorization 的 Token 类型决定。
             */
            create: async (
                payload?: {
                    data?: {
                        summary?: string;
                        description?: string;
                        permissions?:
                            | "private"
                            | "show_only_free_busy"
                            | "public";
                        color?: number;
                        summary_alias?: string;
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
                                calendar?: {
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/delete document }
             *
             * 删除共享日历
             *
             * 该接口用于以当前身份（应用 / 用户）删除一个共享日历。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 当前身份必须对日历具有 owner 权限。
             */
            delete: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get document }
             *
             * 查询日历信息
             *
             * 该接口用于以当前身份（应用 / 用户）根据日历 ID 获取日历信息。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 当前身份必须对日历有访问权限。
             */
            get: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                calendar_id: string;
                                summary?: string;
                                description?: string;
                                permissions?:
                                    | "private"
                                    | "show_only_free_busy"
                                    | "public";
                                color?: number;
                                type?:
                                    | "unknown"
                                    | "primary"
                                    | "shared"
                                    | "google"
                                    | "resource"
                                    | "exchange";
                                summary_alias?: string;
                                is_deleted?: boolean;
                                is_third_party?: boolean;
                                role?:
                                    | "unknown"
                                    | "free_busy_reader"
                                    | "reader"
                                    | "writer"
                                    | "owner";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/list document }
             *
             * 查询日历列表
             *
             * 该接口用于分页获得当前身份（应用 / 用户）的日历列表。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 调用时首先使用 page_token 分页拉取存量数据，之后使用 sync_token 增量同步变更数据。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        sync_token?: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                sync_token?: string;
                                calendar_list?: Array<{
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=patch&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/patch document }
             *
             * 更新日历信息
             *
             * 该接口用于以当前身份（应用 / 用户）修改日历信息。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 当前身份对日历有 owner 权限时，可修改全局字段：summary, description, permission。;;当前身份对日历不具有 owner 权限时，仅可修改对自己生效的字段：color, summary_alias。
             */
            patch: async (
                payload?: {
                    data?: {
                        summary?: string;
                        description?: string;
                        permissions?:
                            | "private"
                            | "show_only_free_busy"
                            | "public";
                        color?: number;
                        summary_alias?: string;
                    };
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                calendar?: {
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=primary&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/primary document }
             *
             * 查询主日历信息
             *
             * 获取当前身份的主日历信息。
             */
            primary: async (
                payload?: {
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
                                calendars?: Array<{
                                    calendar?: {
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    };
                                    user_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/primary`,
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
            searchWithIterator: async (
                payload?: {
                    data: { query: string };
                    params?: { page_token?: string; page_size?: number };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/search`,
                                path
                            ),
                            method: "POST",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                                    calendar_id: string;
                                                    summary?: string;
                                                    description?: string;
                                                    permissions?:
                                                        | "private"
                                                        | "show_only_free_busy"
                                                        | "public";
                                                    color?: number;
                                                    type?:
                                                        | "unknown"
                                                        | "primary"
                                                        | "shared"
                                                        | "google"
                                                        | "resource"
                                                        | "exchange";
                                                    summary_alias?: string;
                                                    is_deleted?: boolean;
                                                    is_third_party?: boolean;
                                                    role?:
                                                        | "unknown"
                                                        | "free_busy_reader"
                                                        | "reader"
                                                        | "writer"
                                                        | "owner";
                                                }>;
                                                page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=search&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/search document }
             *
             * 搜索日历
             *
             * 该接口用于通过关键字查询公共日历或用户主日历。
             */
            search: async (
                payload?: {
                    data: { query: string };
                    params?: { page_token?: string; page_size?: number };
                },
                options?: IRequestOptions
            ) => {
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
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                }>;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/search`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=subscribe&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscribe document }
             *
             * 订阅日历
             *
             * 该接口用于以当前身份（应用 / 用户）订阅某个日历。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * - 仅可订阅类型为 primary 或 shared 的公开日历。;- 可订阅日历数量上限为1000。
             */
            subscribe: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                calendar?: {
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/subscribe`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=subscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscription document }
             *
             * 订阅日历变更事件
             *
             * 该接口用于以用户身份订阅当前身份下日历列表中的所有日历变更。
             */
            subscription: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/subscription`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=unsubscribe&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscribe document }
             *
             * 取消订阅日历
             *
             * 该接口用于以当前身份（应用 / 用户）取消对某日历的订阅状态。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 仅可操作已经被当前身份订阅的日历。
             */
            unsubscribe: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/unsubscribe`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=unsubscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscription document }
             *
             * 取消订阅日历变更事件
             *
             * 该接口用于以用户身份取消订阅当前身份下日历列表中的日历变更事件。
             */
            unsubscription: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/unsubscription`,
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
         * 日程参与人
         */
        calendarEventAttendee: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=batch_delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/batch_delete document }
             *
             * 删除日程参与人
             *
             * 批量删除日程的参与人。
             *
             * - 当前身份需要有日历的 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。;;- 当前身份需要是日程的组织者。
             */
            batchDelete: async (
                payload?: {
                    data?: {
                        attendee_ids?: Array<string>;
                        delete_ids?: Array<{
                            type?: "user" | "chat" | "resource" | "third_party";
                            user_id?: string;
                            chat_id?: string;
                            room_id?: string;
                            third_party_email?: string;
                        }>;
                        need_notification?: boolean;
                        instance_start_time_admin?: string;
                        is_enable_admin?: boolean;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/batch_delete`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/create document }
             *
             * 创建日程参与人;
             *
             * 批量给日程添加参与人。
             *
             * - 当前身份需要有日历的 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。;;- 当前身份需要是日程的组织者，或日程设置了「参与人可邀请其它参与人」权限。;;- 新添加的日程参与人必须与日程组织者在同一个企业内。;;- 使用该接口添加会议室后，会议室会进入异步的预约流程，请求结束不代表会议室预约成功，需后续再查询预约状态。;;- 每个日程最多只能有 3000 名参与人。;;- 开启管理员能力后预约会议室可不受会议室预约范围的限制（当前不支持用管理员身份给其他人的日程预约会议室）
             */
            create: async (
                payload?: {
                    data?: {
                        attendees?: Array<{
                            type?: "user" | "chat" | "resource" | "third_party";
                            is_optional?: boolean;
                            user_id?: string;
                            chat_id?: string;
                            room_id?: string;
                            third_party_email?: string;
                            operate_id?: string;
                            resource_customization?: Array<{
                                index_key: string;
                                input_content?: string;
                                options?: Array<{
                                    option_key?: string;
                                    others_content?: string;
                                }>;
                            }>;
                            approval_reason?: string;
                        }>;
                        need_notification?: boolean;
                        instance_start_time_admin?: string;
                        is_enable_admin?: boolean;
                        add_operator_to_attendee?: boolean;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                attendees?: Array<{
                                    type?:
                                        | "user"
                                        | "chat"
                                        | "resource"
                                        | "third_party";
                                    attendee_id?: string;
                                    rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    is_optional?: boolean;
                                    is_organizer?: boolean;
                                    is_external?: boolean;
                                    display_name?: string;
                                    chat_members?: Array<{
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        display_name?: string;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                    }>;
                                    user_id?: string;
                                    chat_id?: string;
                                    room_id?: string;
                                    third_party_email?: string;
                                    operate_id?: string;
                                    resource_customization?: Array<{
                                        index_key: string;
                                        input_content?: string;
                                        options?: Array<{
                                            option_key?: string;
                                            others_content?: string;
                                        }>;
                                    }>;
                                    approval_reason?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
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
            listWithIterator: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        need_resource_customization?: boolean;
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { calendar_id: string; event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                                    type?:
                                                        | "user"
                                                        | "chat"
                                                        | "resource"
                                                        | "third_party";
                                                    attendee_id?: string;
                                                    rsvp_status?:
                                                        | "needs_action"
                                                        | "accept"
                                                        | "tentative"
                                                        | "decline"
                                                        | "removed";
                                                    is_optional?: boolean;
                                                    is_organizer?: boolean;
                                                    is_external?: boolean;
                                                    display_name?: string;
                                                    chat_members?: Array<{
                                                        rsvp_status?:
                                                            | "needs_action"
                                                            | "accept"
                                                            | "tentative"
                                                            | "decline"
                                                            | "removed";
                                                        is_optional?: boolean;
                                                        display_name?: string;
                                                        is_organizer?: boolean;
                                                        is_external?: boolean;
                                                    }>;
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    room_id?: string;
                                                    third_party_email?: string;
                                                    operate_id?: string;
                                                    resource_customization?: Array<{
                                                        index_key: string;
                                                        input_content?: string;
                                                        options?: Array<{
                                                            option_key?: string;
                                                            others_content?: string;
                                                        }>;
                                                    }>;
                                                }>;
                                                has_more?: boolean;
                                                page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/list document }
             *
             * 获取日程参与人列表
             *
             * 获取日程的参与人列表，若参与者列表中有群组，请使用 [获取参与人群成员列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list) 。
             *
             * - 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。;;- 当前身份必须有权限查看日程的参与人列表。
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        need_resource_customization?: boolean;
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    type?:
                                        | "user"
                                        | "chat"
                                        | "resource"
                                        | "third_party";
                                    attendee_id?: string;
                                    rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    is_optional?: boolean;
                                    is_organizer?: boolean;
                                    is_external?: boolean;
                                    display_name?: string;
                                    chat_members?: Array<{
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        display_name?: string;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                    }>;
                                    user_id?: string;
                                    chat_id?: string;
                                    room_id?: string;
                                    third_party_email?: string;
                                    operate_id?: string;
                                    resource_customization?: Array<{
                                        index_key: string;
                                        input_content?: string;
                                        options?: Array<{
                                            option_key?: string;
                                            others_content?: string;
                                        }>;
                                    }>;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
                            path
                        ),
                        method: "GET",
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
         * 日程参与人群成员
         */
        calendarEventAttendeeChatMember: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: {
                        calendar_id: string;
                        event_id: string;
                        attendee_id: string;
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                                    rsvp_status?:
                                                        | "needs_action"
                                                        | "accept"
                                                        | "tentative"
                                                        | "decline"
                                                        | "removed";
                                                    is_optional?: boolean;
                                                    display_name?: string;
                                                    open_id?: string;
                                                    is_organizer?: boolean;
                                                    is_external?: boolean;
                                                }>;
                                                has_more?: boolean;
                                                page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee.chat_member&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list document }
             *
             * 获取日程参与群成员列表
             *
             * 获取日程的群参与人的群成员列表。
             *
             * - 当前身份必须有权限查看日程的参与人列表。;;- 当前身份必须在群聊中，或有权限查看群成员列表。
             */
            list: async (
                payload?: {
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: {
                        calendar_id: string;
                        event_id: string;
                        attendee_id: string;
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
                                    rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    is_optional?: boolean;
                                    display_name?: string;
                                    open_id?: string;
                                    is_organizer?: boolean;
                                    is_external?: boolean;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members`,
                            path
                        ),
                        method: "GET",
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
         * 日程
         */
        calendarEvent: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/create document }
             *
             * 创建日程
             *
             * 该接口用于以当前身份（应用 / 用户）在日历上创建一个日程。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。
             */
            create: async (
                payload?: {
                    data: {
                        summary?: string;
                        description?: string;
                        need_notification?: boolean;
                        start_time: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        end_time: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        vchat?: {
                            vc_type?:
                                | "vc"
                                | "third_party"
                                | "no_meeting"
                                | "lark_live"
                                | "unknown";
                            icon_type?: "vc" | "live" | "default";
                            description?: string;
                            meeting_url?: string;
                            live_link?: string;
                            vc_info?: { unique_id: string; meeting_no: string };
                            meeting_settings?: {
                                owner_id?: string;
                                join_meeting_permission?:
                                    | "anyone_can_join"
                                    | "only_organization_employees"
                                    | "only_event_attendees";
                                password?: string;
                                assign_hosts?: Array<string>;
                                auto_record?: boolean;
                                open_lobby?: boolean;
                                allow_attendees_start?: boolean;
                            };
                        };
                        visibility?: "default" | "public" | "private";
                        attendee_ability?:
                            | "none"
                            | "can_see_others"
                            | "can_invite_others"
                            | "can_modify_event";
                        free_busy_status?: "busy" | "free";
                        location?: {
                            name?: string;
                            address?: string;
                            latitude?: number;
                            longitude?: number;
                        };
                        color?: number;
                        reminders?: Array<{ minutes?: number }>;
                        recurrence?: string;
                        schemas?: Array<{
                            ui_name?: string;
                            ui_status?:
                                | "hide"
                                | "readonly"
                                | "editable"
                                | "unknown";
                            app_link?: string;
                        }>;
                        attachments?: Array<{ file_token?: string }>;
                    };
                    params?: {
                        idempotency_key?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                event?: {
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    need_notification?: boolean;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        vc_info?: {
                                            unique_id: string;
                                            meeting_no: string;
                                        };
                                        meeting_settings?: {
                                            owner_id?: string;
                                            join_meeting_permission?:
                                                | "anyone_can_join"
                                                | "only_organization_employees"
                                                | "only_event_attendees";
                                            password?: string;
                                            assign_hosts?: Array<string>;
                                            auto_record?: boolean;
                                            open_lobby?: boolean;
                                            allow_attendees_start?: boolean;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    create_time?: string;
                                    schemas?: Array<{
                                        ui_name?: string;
                                        ui_status?:
                                            | "hide"
                                            | "readonly"
                                            | "editable"
                                            | "unknown";
                                        app_link?: string;
                                    }>;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    app_link?: string;
                                    attachments?: Array<{
                                        file_token?: string;
                                        file_size?: string;
                                        is_deleted?: boolean;
                                        name?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/delete document }
             *
             * 删除日程
             *
             * 该接口用于以当前身份（应用 / 用户）删除日历上的一个日程。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。;;当前身份必须是日程的组织者。
             */
            delete: async (
                payload?: {
                    params?: { need_notification?: boolean };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/get document }
             *
             * 获取日程
             *
             * 该接口用于以当前身份（应用 / 用户）获取日历上的一个日程。;身份由 Header Authorization 的 Token 类型决定。
             *
             * - 当前身份必须对日历有reader、writer或owner权限才会返回日程详细信息（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。;- [例外日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction#71c5ec78)可通过event_id的非0时间戳后缀，来获取修改的重复性日程的哪一天日程的时间信息。
             */
            get: async (
                payload?: {
                    params?: {
                        need_meeting_settings?: boolean;
                        need_attendee?: boolean;
                        max_attendee_num?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                event?: {
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        vc_info?: {
                                            unique_id: string;
                                            meeting_no: string;
                                        };
                                        meeting_settings?: {
                                            owner_id?: string;
                                            join_meeting_permission?:
                                                | "anyone_can_join"
                                                | "only_organization_employees"
                                                | "only_event_attendees";
                                            password?: string;
                                            assign_hosts?: Array<string>;
                                            auto_record?: boolean;
                                            open_lobby?: boolean;
                                            allow_attendees_start?: boolean;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    create_time?: string;
                                    schemas?: Array<{
                                        ui_name?: string;
                                        ui_status?:
                                            | "hide"
                                            | "readonly"
                                            | "editable"
                                            | "unknown";
                                        app_link?: string;
                                    }>;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    app_link?: string;
                                    attendees?: Array<{
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "resource"
                                            | "third_party";
                                        attendee_id?: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                        display_name?: string;
                                        chat_members?: Array<{
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            display_name?: string;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                        }>;
                                        user_id?: string;
                                        chat_id?: string;
                                        room_id?: string;
                                        third_party_email?: string;
                                        operate_id?: string;
                                        resource_customization?: Array<{
                                            index_key: string;
                                            input_content?: string;
                                            options?: Array<{
                                                option_key?: string;
                                                others_content?: string;
                                            }>;
                                        }>;
                                    }>;
                                    has_more_attendee?: boolean;
                                    attachments?: Array<{
                                        file_token?: string;
                                        file_size?: string;
                                        name?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=instance_view&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=instance_view&project=calendar&resource=calendar.event&version=v4 document }
             */
            instanceView: async (
                payload?: {
                    params: {
                        start_time: string;
                        end_time: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    event_id: string;
                                    summary?: string;
                                    description?: string;
                                    start_time?: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time?: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    app_link?: string;
                                    organizer_calendar_id?: string;
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        vc_info?: {
                                            unique_id: string;
                                            meeting_no: string;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    recurring_event_id?: string;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    attendees?: Array<{
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "resource"
                                            | "third_party";
                                        attendee_id?: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                        display_name?: string;
                                        chat_members?: Array<{
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            display_name?: string;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                        }>;
                                        user_id?: string;
                                        chat_id?: string;
                                        room_id?: string;
                                        third_party_email?: string;
                                        operate_id?: string;
                                        resource_customization?: Array<{
                                            index_key: string;
                                            input_content?: string;
                                            options?: Array<{
                                                option_key?: string;
                                                others_content?: string;
                                            }>;
                                        }>;
                                        approval_reason?: string;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/instance_view`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=instances&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=instances&project=calendar&resource=calendar.event&version=v4 document }
             */
            instances: async (
                payload?: {
                    params: {
                        start_time: string;
                        end_time: string;
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    event_id: string;
                                    summary?: string;
                                    description?: string;
                                    start_time?: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time?: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    app_link?: string;
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/instances`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/list document }
             *
             * 获取日程列表
             *
             * 该接口用于以当前身份（应用 / 用户）获取日历下的日程列表。;身份由 Header Authorization 的 Token 类型决定。
             *
             * - 当前身份必须对日历有reader、writer或owner权限才会返回日程详细信息（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。;;- 仅支持primary、shared和resource类型的日历获取日程列表。;;- page_token 分页拉取存量数据，sync_token 增量同步变更数据；目前仅传anchor_time时，会返回page_token。;;- 为了确保调用方日程同步数据的一致性，在使用sync_token时，不能同时使用start_time和end_time，否则可能造成日程数据缺失。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        anchor_time?: string;
                        page_token?: string;
                        sync_token?: string;
                        start_time?: string;
                        end_time?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                sync_token?: string;
                                items?: Array<{
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        vc_info?: {
                                            unique_id: string;
                                            meeting_no: string;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    create_time?: string;
                                    schemas?: Array<{
                                        ui_name?: string;
                                        ui_status?:
                                            | "hide"
                                            | "readonly"
                                            | "editable"
                                            | "unknown";
                                        app_link?: string;
                                    }>;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    app_link?: string;
                                    attachments?: Array<{
                                        file_token?: string;
                                        file_size?: string;
                                        name?: string;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=patch&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/patch document }
             *
             * 更新日程
             *
             * 该接口用于以当前身份（应用 / 用户）更新日历上的一个日程。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。;;当前身份为日程组织者时，可修改所有可编辑字段。;;当前身份为日程参与者时，仅可编辑部分字段。（如：visibility, free_busy_status, color, reminders）
             */
            patch: async (
                payload?: {
                    data?: {
                        summary?: string;
                        description?: string;
                        need_notification?: boolean;
                        start_time?: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        end_time?: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        vchat?: {
                            vc_type?:
                                | "vc"
                                | "third_party"
                                | "no_meeting"
                                | "lark_live"
                                | "unknown";
                            icon_type?: "vc" | "live" | "default";
                            description?: string;
                            meeting_url?: string;
                            live_link?: string;
                            vc_info?: { unique_id: string; meeting_no: string };
                            meeting_settings?: {
                                owner_id?: string;
                                join_meeting_permission?:
                                    | "anyone_can_join"
                                    | "only_organization_employees"
                                    | "only_event_attendees";
                                password?: string;
                                assign_hosts?: Array<string>;
                                auto_record?: boolean;
                                open_lobby?: boolean;
                                allow_attendees_start?: boolean;
                            };
                        };
                        visibility?: "default" | "public" | "private";
                        attendee_ability?:
                            | "none"
                            | "can_see_others"
                            | "can_invite_others"
                            | "can_modify_event";
                        free_busy_status?: "busy" | "free";
                        location?: {
                            name?: string;
                            address?: string;
                            latitude?: number;
                            longitude?: number;
                        };
                        color?: number;
                        reminders?: Array<{ minutes?: number }>;
                        recurrence?: string;
                        schemas?: Array<{
                            ui_name?: string;
                            ui_status?:
                                | "hide"
                                | "readonly"
                                | "editable"
                                | "unknown";
                            app_link?: string;
                        }>;
                        attachments?: Array<{
                            file_token?: string;
                            is_deleted?: boolean;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                event?: {
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    need_notification?: boolean;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        vc_info?: {
                                            unique_id: string;
                                            meeting_no: string;
                                        };
                                        meeting_settings?: {
                                            owner_id?: string;
                                            join_meeting_permission?:
                                                | "anyone_can_join"
                                                | "only_organization_employees"
                                                | "only_event_attendees";
                                            password?: string;
                                            assign_hosts?: Array<string>;
                                            auto_record?: boolean;
                                            open_lobby?: boolean;
                                            allow_attendees_start?: boolean;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    create_time?: string;
                                    schemas?: Array<{
                                        ui_name?: string;
                                        ui_status?:
                                            | "hide"
                                            | "readonly"
                                            | "editable"
                                            | "unknown";
                                        app_link?: string;
                                    }>;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    app_link?: string;
                                    attachments?: Array<{
                                        file_token?: string;
                                        file_size?: string;
                                        is_deleted?: boolean;
                                        name?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=reply&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reply&project=calendar&resource=calendar.event&version=v4 document }
             */
            reply: async (
                payload?: {
                    data: { rsvp_status: "accept" | "decline" | "tentative" };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/reply`,
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
            searchWithIterator: async (
                payload?: {
                    data: {
                        query: string;
                        filter?: {
                            start_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            end_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            user_ids?: Array<string>;
                            room_ids?: Array<string>;
                            chat_ids?: Array<string>;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search`,
                                path
                            ),
                            method: "POST",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                                    event_id: string;
                                                    organizer_calendar_id?: string;
                                                    summary?: string;
                                                    description?: string;
                                                    start_time: {
                                                        date?: string;
                                                        timestamp?: string;
                                                        timezone?: string;
                                                    };
                                                    end_time: {
                                                        date?: string;
                                                        timestamp?: string;
                                                        timezone?: string;
                                                    };
                                                    visibility?:
                                                        | "default"
                                                        | "public"
                                                        | "private";
                                                    attendee_ability?:
                                                        | "none"
                                                        | "can_see_others"
                                                        | "can_invite_others"
                                                        | "can_modify_event";
                                                    free_busy_status?:
                                                        | "busy"
                                                        | "free";
                                                    location?: {
                                                        name?: string;
                                                        address?: string;
                                                        latitude?: number;
                                                        longitude?: number;
                                                    };
                                                    color?: number;
                                                    reminders?: Array<{
                                                        minutes?: number;
                                                    }>;
                                                    recurrence?: string;
                                                    status?:
                                                        | "tentative"
                                                        | "confirmed"
                                                        | "cancelled";
                                                    is_exception?: boolean;
                                                    recurring_event_id?: string;
                                                    event_organizer?: {
                                                        user_id?: string;
                                                        display_name?: string;
                                                    };
                                                    app_link?: string;
                                                    attachments?: Array<{
                                                        file_token?: string;
                                                        file_size?: string;
                                                        is_deleted?: boolean;
                                                        name?: string;
                                                    }>;
                                                }>;
                                                page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=search&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/search document }
             *
             * 搜索日程
             *
             * 该接口用于以用户身份搜索某日历下的相关日程。;;身份由 Header Authorization 的 Token 类型决定。
             *
             * 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。
             */
            search: async (
                payload?: {
                    data: {
                        query: string;
                        filter?: {
                            start_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            end_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            user_ids?: Array<string>;
                            room_ids?: Array<string>;
                            chat_ids?: Array<string>;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    app_link?: string;
                                    attachments?: Array<{
                                        file_token?: string;
                                        file_size?: string;
                                        is_deleted?: boolean;
                                        name?: string;
                                    }>;
                                }>;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=subscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/subscription document }
             *
             * 订阅日程变更事件
             *
             * 该接口用于以用户身份订阅指定日历下的日程变更事件。
             *
             * 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。
             */
            subscription: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/subscription`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=unsubscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/unsubscription document }
             *
             * 取消订阅日程变更事件
             *
             * 该接口用于以用户身份取消订阅指定日历下的日程变更事件。
             *
             * 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。
             */
            unsubscription: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/unsubscription`,
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
         * calendar.event.meeting_chat
         */
        calendarEventMeetingChat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.meeting_chat&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event.meeting_chat&version=v4 document }
             */
            create: async (
                payload?: {
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                meeting_chat_id?: string;
                                applink?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.meeting_chat&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar.event.meeting_chat&version=v4 document }
             */
            delete: async (
                payload?: {
                    params: { meeting_chat_id: string };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat`,
                            path
                        ),
                        method: "DELETE",
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
         * Exchange绑定
         */
        exchangeBinding: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/create document }
             *
             * 创建Exchange绑定关系
             *
             * 本接口将Exchange账户绑定到飞书账户，进而支持Exchange日历的导入
             *
             * 操作用户需要是企业超级管理员
             */
            create: async (
                payload?: {
                    data?: {
                        admin_account?: string;
                        exchange_account?: string;
                        user_id?: string;
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
                                admin_account?: string;
                                exchange_account?: string;
                                user_id?: string;
                                status?:
                                    | "doing"
                                    | "cal_done"
                                    | "timespan_done"
                                    | "done"
                                    | "err";
                                exchange_binding_id: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/exchange_bindings`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/delete document }
             *
             * 解除Exchange绑定关系
             *
             * 本接口解除Exchange账户和飞书账户的绑定关系，Exchange账户解除绑定后才能绑定其他飞书账户
             *
             * 操作用户需要是企业超级管理员
             */
            delete: async (
                payload?: {
                    path: { exchange_binding_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/get document }
             *
             * 获取绑定状态
             *
             * 本接口获取Exchange账户的绑定状态，包括exchange日历是否同步完成。
             *
             * 操作用户需要是企业超级管理员
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { exchange_binding_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                admin_account?: string;
                                exchange_account?: string;
                                user_id?: string;
                                status?:
                                    | "doing"
                                    | "cal_done"
                                    | "timespan_done"
                                    | "done"
                                    | "err";
                                exchange_binding_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id`,
                            path
                        ),
                        method: "GET",
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
         * freebusy
         */
        freebusy: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/freebusy/list document }
             *
             * 查询主日历忙闲信息
             *
             * 查询用户主日历或会议室的忙闲信息。
             */
            list: async (
                payload?: {
                    data: {
                        time_min: string;
                        time_max: string;
                        user_id?: string;
                        room_id?: string;
                        include_external_calendar?: boolean;
                        only_busy?: boolean;
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
                                freebusy_list?: Array<{
                                    start_time: string;
                                    end_time: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/freebusy/list`,
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
         * 日历设置
         */
        setting: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=setting&apiName=generate_caldav_conf&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/setting/generate_caldav_conf document }
             *
             * 生成CalDAV配置
             *
             * 用于为当前用户生成一个CalDAV账号密码，用于将飞书日历信息同步到本地设备日历。
             */
            generateCaldavConf: async (
                payload?: {
                    data?: { device_name?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                password?: string;
                                user_name?: string;
                                server_address?: string;
                                device_name?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/settings/generate_caldav_conf`,
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
         * 请假
         */
        timeoffEvent: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=timeoff_event&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/create document }
             *
             * 创建请假日程
             *
             * 为指定用户创建一个请假日程，可以是一个普通请假日程，也可以是一个全天日程。;创建请假日程后，会在相应时间内，在用户个人签名页展示请假信息。
             */
            create: async (
                payload?: {
                    data: {
                        user_id: string;
                        timezone: string;
                        start_time: string;
                        end_time: string;
                        title?: string;
                        description?: string;
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
                                timeoff_event_id: string;
                                user_id: string;
                                timezone: string;
                                start_time: string;
                                end_time: string;
                                title?: string;
                                description?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/timeoff_events`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=timeoff_event&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/delete document }
             *
             * 删除请假日程
             *
             * 删除一个指定的请假日程，请假日程删除，用户个人签名页的请假信息也会消失。;一个应用只能删除自己创建的请假日程。
             */
            delete: async (
                payload?: {
                    path: { timeoff_event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/timeoff_events/:timeoff_event_id`,
                            path
                        ),
                        method: "DELETE",
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
        v4: {
            /**
             * 日历访问控制
             */
            calendarAcl: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/create document }
                 *
                 * 创建访问控制
                 *
                 * 该接口用于以当前身份（应用 / 用户）给日历添加访问控制权限，即日历成员。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。
                 */
                create: async (
                    payload?: {
                        data: {
                            role:
                                | "unknown"
                                | "free_busy_reader"
                                | "reader"
                                | "writer"
                                | "owner";
                            scope: { type: "user"; user_id?: string };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    acl_id: string;
                                    role:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                    scope: { type: "user"; user_id?: string };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/delete document }
                 *
                 * 删除访问控制
                 *
                 * 该接口用于以当前身份（应用 / 用户）删除日历的控制权限，即日历成员。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。
                 */
                delete: async (
                    payload?: {
                        path: { calendar_id: string; acl_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/:acl_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                listWithIterator: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { calendar_id: string };
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                                    acls?: Array<{
                                                        acl_id: string;
                                                        role:
                                                            | "unknown"
                                                            | "free_busy_reader"
                                                            | "reader"
                                                            | "writer"
                                                            | "owner";
                                                        scope: {
                                                            type: "user";
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/list document }
                 *
                 * 获取访问控制列表
                 *
                 * 该接口用于以当前身份（应用 / 用户）获取日历的控制权限列表。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { calendar_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    acls?: Array<{
                                        acl_id: string;
                                        role:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                        scope: {
                                            type: "user";
                                            user_id?: string;
                                        };
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=subscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/subscription document }
                 *
                 * 订阅日历访问控制变更事件;
                 *
                 * 该接口用于以用户身份订阅指定日历下的日历成员变更事件。
                 *
                 * 用户必须对日历有访问权限。
                 */
                subscription: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/subscription`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=unsubscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/unsubscription document }
                 *
                 * 取消订阅日历访问控制变更事件
                 *
                 * 该接口用于以用户身份取消订阅指定日历下的日历成员变更事件。
                 *
                 * 用户必须对日历有访问权限。
                 */
                unsubscription: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/unsubscription`,
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
             * 日历管理
             */
            calendar: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/create document }
                 *
                 * 创建共享日历
                 *
                 * 该接口用于为当前身份（应用 / 用户）创建一个共享日历。;;身份由 Header Authorization 的 Token 类型决定。
                 */
                create: async (
                    payload?: {
                        data?: {
                            summary?: string;
                            description?: string;
                            permissions?:
                                | "private"
                                | "show_only_free_busy"
                                | "public";
                            color?: number;
                            summary_alias?: string;
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
                                    calendar?: {
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/delete document }
                 *
                 * 删除共享日历
                 *
                 * 该接口用于以当前身份（应用 / 用户）删除一个共享日历。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 当前身份必须对日历具有 owner 权限。
                 */
                delete: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get document }
                 *
                 * 查询日历信息
                 *
                 * 该接口用于以当前身份（应用 / 用户）根据日历 ID 获取日历信息。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 当前身份必须对日历有访问权限。
                 */
                get: async (
                    payload?: {
                        path: { calendar_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/list document }
                 *
                 * 查询日历列表
                 *
                 * 该接口用于分页获得当前身份（应用 / 用户）的日历列表。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 调用时首先使用 page_token 分页拉取存量数据，之后使用 sync_token 增量同步变更数据。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            sync_token?: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    sync_token?: string;
                                    calendar_list?: Array<{
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=patch&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/patch document }
                 *
                 * 更新日历信息
                 *
                 * 该接口用于以当前身份（应用 / 用户）修改日历信息。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 当前身份对日历有 owner 权限时，可修改全局字段：summary, description, permission。;;当前身份对日历不具有 owner 权限时，仅可修改对自己生效的字段：color, summary_alias。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            summary?: string;
                            description?: string;
                            permissions?:
                                | "private"
                                | "show_only_free_busy"
                                | "public";
                            color?: number;
                            summary_alias?: string;
                        };
                        path: { calendar_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    calendar?: {
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=primary&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/primary document }
                 *
                 * 查询主日历信息
                 *
                 * 获取当前身份的主日历信息。
                 */
                primary: async (
                    payload?: {
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
                                    calendars?: Array<{
                                        calendar?: {
                                            calendar_id: string;
                                            summary?: string;
                                            description?: string;
                                            permissions?:
                                                | "private"
                                                | "show_only_free_busy"
                                                | "public";
                                            color?: number;
                                            type?:
                                                | "unknown"
                                                | "primary"
                                                | "shared"
                                                | "google"
                                                | "resource"
                                                | "exchange";
                                            summary_alias?: string;
                                            is_deleted?: boolean;
                                            is_third_party?: boolean;
                                            role?:
                                                | "unknown"
                                                | "free_busy_reader"
                                                | "reader"
                                                | "writer"
                                                | "owner";
                                        };
                                        user_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/primary`,
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
                searchWithIterator: async (
                    payload?: {
                        data: { query: string };
                        params?: { page_token?: string; page_size?: number };
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/search`,
                                    path
                                ),
                                method: "POST",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                                        calendar_id: string;
                                                        summary?: string;
                                                        description?: string;
                                                        permissions?:
                                                            | "private"
                                                            | "show_only_free_busy"
                                                            | "public";
                                                        color?: number;
                                                        type?:
                                                            | "unknown"
                                                            | "primary"
                                                            | "shared"
                                                            | "google"
                                                            | "resource"
                                                            | "exchange";
                                                        summary_alias?: string;
                                                        is_deleted?: boolean;
                                                        is_third_party?: boolean;
                                                        role?:
                                                            | "unknown"
                                                            | "free_busy_reader"
                                                            | "reader"
                                                            | "writer"
                                                            | "owner";
                                                    }>;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=search&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/search document }
                 *
                 * 搜索日历
                 *
                 * 该接口用于通过关键字查询公共日历或用户主日历。
                 */
                search: async (
                    payload?: {
                        data: { query: string };
                        params?: { page_token?: string; page_size?: number };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    }>;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/search`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=subscribe&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscribe document }
                 *
                 * 订阅日历
                 *
                 * 该接口用于以当前身份（应用 / 用户）订阅某个日历。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * - 仅可订阅类型为 primary 或 shared 的公开日历。;- 可订阅日历数量上限为1000。
                 */
                subscribe: async (
                    payload?: {
                        path: { calendar_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    calendar?: {
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/subscribe`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=subscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscription document }
                 *
                 * 订阅日历变更事件
                 *
                 * 该接口用于以用户身份订阅当前身份下日历列表中的所有日历变更。
                 */
                subscription: async (
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
                                `${this.domain}/open-apis/calendar/v4/calendars/subscription`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=unsubscribe&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscribe document }
                 *
                 * 取消订阅日历
                 *
                 * 该接口用于以当前身份（应用 / 用户）取消对某日历的订阅状态。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 仅可操作已经被当前身份订阅的日历。
                 */
                unsubscribe: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/unsubscribe`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=unsubscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscription document }
                 *
                 * 取消订阅日历变更事件
                 *
                 * 该接口用于以用户身份取消订阅当前身份下日历列表中的日历变更事件。
                 */
                unsubscription: async (
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
                                `${this.domain}/open-apis/calendar/v4/calendars/unsubscription`,
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
             * 日程参与人
             */
            calendarEventAttendee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=batch_delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/batch_delete document }
                 *
                 * 删除日程参与人
                 *
                 * 批量删除日程的参与人。
                 *
                 * - 当前身份需要有日历的 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。;;- 当前身份需要是日程的组织者。
                 */
                batchDelete: async (
                    payload?: {
                        data?: {
                            attendee_ids?: Array<string>;
                            delete_ids?: Array<{
                                type?:
                                    | "user"
                                    | "chat"
                                    | "resource"
                                    | "third_party";
                                user_id?: string;
                                chat_id?: string;
                                room_id?: string;
                                third_party_email?: string;
                            }>;
                            need_notification?: boolean;
                            instance_start_time_admin?: string;
                            is_enable_admin?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string; event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/batch_delete`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/create document }
                 *
                 * 创建日程参与人;
                 *
                 * 批量给日程添加参与人。
                 *
                 * - 当前身份需要有日历的 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。;;- 当前身份需要是日程的组织者，或日程设置了「参与人可邀请其它参与人」权限。;;- 新添加的日程参与人必须与日程组织者在同一个企业内。;;- 使用该接口添加会议室后，会议室会进入异步的预约流程，请求结束不代表会议室预约成功，需后续再查询预约状态。;;- 每个日程最多只能有 3000 名参与人。;;- 开启管理员能力后预约会议室可不受会议室预约范围的限制（当前不支持用管理员身份给其他人的日程预约会议室）
                 */
                create: async (
                    payload?: {
                        data?: {
                            attendees?: Array<{
                                type?:
                                    | "user"
                                    | "chat"
                                    | "resource"
                                    | "third_party";
                                is_optional?: boolean;
                                user_id?: string;
                                chat_id?: string;
                                room_id?: string;
                                third_party_email?: string;
                                operate_id?: string;
                                resource_customization?: Array<{
                                    index_key: string;
                                    input_content?: string;
                                    options?: Array<{
                                        option_key?: string;
                                        others_content?: string;
                                    }>;
                                }>;
                                approval_reason?: string;
                            }>;
                            need_notification?: boolean;
                            instance_start_time_admin?: string;
                            is_enable_admin?: boolean;
                            add_operator_to_attendee?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string; event_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    attendees?: Array<{
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "resource"
                                            | "third_party";
                                        attendee_id?: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                        display_name?: string;
                                        chat_members?: Array<{
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            display_name?: string;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                        }>;
                                        user_id?: string;
                                        chat_id?: string;
                                        room_id?: string;
                                        third_party_email?: string;
                                        operate_id?: string;
                                        resource_customization?: Array<{
                                            index_key: string;
                                            input_content?: string;
                                            options?: Array<{
                                                option_key?: string;
                                                others_content?: string;
                                            }>;
                                        }>;
                                        approval_reason?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            need_resource_customization?: boolean;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { calendar_id: string; event_id: string };
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                                        type?:
                                                            | "user"
                                                            | "chat"
                                                            | "resource"
                                                            | "third_party";
                                                        attendee_id?: string;
                                                        rsvp_status?:
                                                            | "needs_action"
                                                            | "accept"
                                                            | "tentative"
                                                            | "decline"
                                                            | "removed";
                                                        is_optional?: boolean;
                                                        is_organizer?: boolean;
                                                        is_external?: boolean;
                                                        display_name?: string;
                                                        chat_members?: Array<{
                                                            rsvp_status?:
                                                                | "needs_action"
                                                                | "accept"
                                                                | "tentative"
                                                                | "decline"
                                                                | "removed";
                                                            is_optional?: boolean;
                                                            display_name?: string;
                                                            is_organizer?: boolean;
                                                            is_external?: boolean;
                                                        }>;
                                                        user_id?: string;
                                                        chat_id?: string;
                                                        room_id?: string;
                                                        third_party_email?: string;
                                                        operate_id?: string;
                                                        resource_customization?: Array<{
                                                            index_key: string;
                                                            input_content?: string;
                                                            options?: Array<{
                                                                option_key?: string;
                                                                others_content?: string;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/list document }
                 *
                 * 获取日程参与人列表
                 *
                 * 获取日程的参与人列表，若参与者列表中有群组，请使用 [获取参与人群成员列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list) 。
                 *
                 * - 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。;;- 当前身份必须有权限查看日程的参与人列表。
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            need_resource_customization?: boolean;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { calendar_id: string; event_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "resource"
                                            | "third_party";
                                        attendee_id?: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                        display_name?: string;
                                        chat_members?: Array<{
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            display_name?: string;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                        }>;
                                        user_id?: string;
                                        chat_id?: string;
                                        room_id?: string;
                                        third_party_email?: string;
                                        operate_id?: string;
                                        resource_customization?: Array<{
                                            index_key: string;
                                            input_content?: string;
                                            options?: Array<{
                                                option_key?: string;
                                                others_content?: string;
                                            }>;
                                        }>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
                                path
                            ),
                            method: "GET",
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
             * 日程参与人群成员
             */
            calendarEventAttendeeChatMember: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            calendar_id: string;
                            event_id: string;
                            attendee_id: string;
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                                        rsvp_status?:
                                                            | "needs_action"
                                                            | "accept"
                                                            | "tentative"
                                                            | "decline"
                                                            | "removed";
                                                        is_optional?: boolean;
                                                        display_name?: string;
                                                        open_id?: string;
                                                        is_organizer?: boolean;
                                                        is_external?: boolean;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee.chat_member&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list document }
                 *
                 * 获取日程参与群成员列表
                 *
                 * 获取日程的群参与人的群成员列表。
                 *
                 * - 当前身份必须有权限查看日程的参与人列表。;;- 当前身份必须在群聊中，或有权限查看群成员列表。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            calendar_id: string;
                            event_id: string;
                            attendee_id: string;
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
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        display_name?: string;
                                        open_id?: string;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members`,
                                path
                            ),
                            method: "GET",
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
             * 日程
             */
            calendarEvent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/create document }
                 *
                 * 创建日程
                 *
                 * 该接口用于以当前身份（应用 / 用户）在日历上创建一个日程。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。
                 */
                create: async (
                    payload?: {
                        data: {
                            summary?: string;
                            description?: string;
                            need_notification?: boolean;
                            start_time: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            end_time: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            vchat?: {
                                vc_type?:
                                    | "vc"
                                    | "third_party"
                                    | "no_meeting"
                                    | "lark_live"
                                    | "unknown";
                                icon_type?: "vc" | "live" | "default";
                                description?: string;
                                meeting_url?: string;
                                live_link?: string;
                                vc_info?: {
                                    unique_id: string;
                                    meeting_no: string;
                                };
                                meeting_settings?: {
                                    owner_id?: string;
                                    join_meeting_permission?:
                                        | "anyone_can_join"
                                        | "only_organization_employees"
                                        | "only_event_attendees";
                                    password?: string;
                                    assign_hosts?: Array<string>;
                                    auto_record?: boolean;
                                    open_lobby?: boolean;
                                    allow_attendees_start?: boolean;
                                };
                            };
                            visibility?: "default" | "public" | "private";
                            attendee_ability?:
                                | "none"
                                | "can_see_others"
                                | "can_invite_others"
                                | "can_modify_event";
                            free_busy_status?: "busy" | "free";
                            location?: {
                                name?: string;
                                address?: string;
                                latitude?: number;
                                longitude?: number;
                            };
                            color?: number;
                            reminders?: Array<{ minutes?: number }>;
                            recurrence?: string;
                            schemas?: Array<{
                                ui_name?: string;
                                ui_status?:
                                    | "hide"
                                    | "readonly"
                                    | "editable"
                                    | "unknown";
                                app_link?: string;
                            }>;
                            attachments?: Array<{ file_token?: string }>;
                        };
                        params?: {
                            idempotency_key?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    event?: {
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        need_notification?: boolean;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            vc_info?: {
                                                unique_id: string;
                                                meeting_no: string;
                                            };
                                            meeting_settings?: {
                                                owner_id?: string;
                                                join_meeting_permission?:
                                                    | "anyone_can_join"
                                                    | "only_organization_employees"
                                                    | "only_event_attendees";
                                                password?: string;
                                                assign_hosts?: Array<string>;
                                                auto_record?: boolean;
                                                open_lobby?: boolean;
                                                allow_attendees_start?: boolean;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        create_time?: string;
                                        schemas?: Array<{
                                            ui_name?: string;
                                            ui_status?:
                                                | "hide"
                                                | "readonly"
                                                | "editable"
                                                | "unknown";
                                            app_link?: string;
                                        }>;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        app_link?: string;
                                        attachments?: Array<{
                                            file_token?: string;
                                            file_size?: string;
                                            is_deleted?: boolean;
                                            name?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/delete document }
                 *
                 * 删除日程
                 *
                 * 该接口用于以当前身份（应用 / 用户）删除日历上的一个日程。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。;;当前身份必须是日程的组织者。
                 */
                delete: async (
                    payload?: {
                        params?: { need_notification?: boolean };
                        path: { calendar_id: string; event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/get document }
                 *
                 * 获取日程
                 *
                 * 该接口用于以当前身份（应用 / 用户）获取日历上的一个日程。;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * - 当前身份必须对日历有reader、writer或owner权限才会返回日程详细信息（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。;- [例外日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction#71c5ec78)可通过event_id的非0时间戳后缀，来获取修改的重复性日程的哪一天日程的时间信息。
                 */
                get: async (
                    payload?: {
                        params?: {
                            need_meeting_settings?: boolean;
                            need_attendee?: boolean;
                            max_attendee_num?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string; event_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    event?: {
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            vc_info?: {
                                                unique_id: string;
                                                meeting_no: string;
                                            };
                                            meeting_settings?: {
                                                owner_id?: string;
                                                join_meeting_permission?:
                                                    | "anyone_can_join"
                                                    | "only_organization_employees"
                                                    | "only_event_attendees";
                                                password?: string;
                                                assign_hosts?: Array<string>;
                                                auto_record?: boolean;
                                                open_lobby?: boolean;
                                                allow_attendees_start?: boolean;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        create_time?: string;
                                        schemas?: Array<{
                                            ui_name?: string;
                                            ui_status?:
                                                | "hide"
                                                | "readonly"
                                                | "editable"
                                                | "unknown";
                                            app_link?: string;
                                        }>;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        app_link?: string;
                                        attendees?: Array<{
                                            type?:
                                                | "user"
                                                | "chat"
                                                | "resource"
                                                | "third_party";
                                            attendee_id?: string;
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                            display_name?: string;
                                            chat_members?: Array<{
                                                rsvp_status?:
                                                    | "needs_action"
                                                    | "accept"
                                                    | "tentative"
                                                    | "decline"
                                                    | "removed";
                                                is_optional?: boolean;
                                                display_name?: string;
                                                is_organizer?: boolean;
                                                is_external?: boolean;
                                            }>;
                                            user_id?: string;
                                            chat_id?: string;
                                            room_id?: string;
                                            third_party_email?: string;
                                            operate_id?: string;
                                            resource_customization?: Array<{
                                                index_key: string;
                                                input_content?: string;
                                                options?: Array<{
                                                    option_key?: string;
                                                    others_content?: string;
                                                }>;
                                            }>;
                                        }>;
                                        has_more_attendee?: boolean;
                                        attachments?: Array<{
                                            file_token?: string;
                                            file_size?: string;
                                            name?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=instance_view&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=instance_view&project=calendar&resource=calendar.event&version=v4 document }
                 */
                instanceView: async (
                    payload?: {
                        params: {
                            start_time: string;
                            end_time: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        event_id: string;
                                        summary?: string;
                                        description?: string;
                                        start_time?: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time?: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        app_link?: string;
                                        organizer_calendar_id?: string;
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            vc_info?: {
                                                unique_id: string;
                                                meeting_no: string;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        recurring_event_id?: string;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        attendees?: Array<{
                                            type?:
                                                | "user"
                                                | "chat"
                                                | "resource"
                                                | "third_party";
                                            attendee_id?: string;
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                            display_name?: string;
                                            chat_members?: Array<{
                                                rsvp_status?:
                                                    | "needs_action"
                                                    | "accept"
                                                    | "tentative"
                                                    | "decline"
                                                    | "removed";
                                                is_optional?: boolean;
                                                display_name?: string;
                                                is_organizer?: boolean;
                                                is_external?: boolean;
                                            }>;
                                            user_id?: string;
                                            chat_id?: string;
                                            room_id?: string;
                                            third_party_email?: string;
                                            operate_id?: string;
                                            resource_customization?: Array<{
                                                index_key: string;
                                                input_content?: string;
                                                options?: Array<{
                                                    option_key?: string;
                                                    others_content?: string;
                                                }>;
                                            }>;
                                            approval_reason?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/instance_view`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=instances&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=instances&project=calendar&resource=calendar.event&version=v4 document }
                 */
                instances: async (
                    payload?: {
                        params: {
                            start_time: string;
                            end_time: string;
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { calendar_id: string; event_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        event_id: string;
                                        summary?: string;
                                        description?: string;
                                        start_time?: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time?: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        app_link?: string;
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/instances`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/list document }
                 *
                 * 获取日程列表
                 *
                 * 该接口用于以当前身份（应用 / 用户）获取日历下的日程列表。;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * - 当前身份必须对日历有reader、writer或owner权限才会返回日程详细信息（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。;;- 仅支持primary、shared和resource类型的日历获取日程列表。;;- page_token 分页拉取存量数据，sync_token 增量同步变更数据；目前仅传anchor_time时，会返回page_token。;;- 为了确保调用方日程同步数据的一致性，在使用sync_token时，不能同时使用start_time和end_time，否则可能造成日程数据缺失。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            anchor_time?: string;
                            page_token?: string;
                            sync_token?: string;
                            start_time?: string;
                            end_time?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                    sync_token?: string;
                                    items?: Array<{
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            vc_info?: {
                                                unique_id: string;
                                                meeting_no: string;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        create_time?: string;
                                        schemas?: Array<{
                                            ui_name?: string;
                                            ui_status?:
                                                | "hide"
                                                | "readonly"
                                                | "editable"
                                                | "unknown";
                                            app_link?: string;
                                        }>;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        app_link?: string;
                                        attachments?: Array<{
                                            file_token?: string;
                                            file_size?: string;
                                            name?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=patch&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/patch document }
                 *
                 * 更新日程
                 *
                 * 该接口用于以当前身份（应用 / 用户）更新日历上的一个日程。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。;;当前身份为日程组织者时，可修改所有可编辑字段。;;当前身份为日程参与者时，仅可编辑部分字段。（如：visibility, free_busy_status, color, reminders）
                 */
                patch: async (
                    payload?: {
                        data?: {
                            summary?: string;
                            description?: string;
                            need_notification?: boolean;
                            start_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            end_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            vchat?: {
                                vc_type?:
                                    | "vc"
                                    | "third_party"
                                    | "no_meeting"
                                    | "lark_live"
                                    | "unknown";
                                icon_type?: "vc" | "live" | "default";
                                description?: string;
                                meeting_url?: string;
                                live_link?: string;
                                vc_info?: {
                                    unique_id: string;
                                    meeting_no: string;
                                };
                                meeting_settings?: {
                                    owner_id?: string;
                                    join_meeting_permission?:
                                        | "anyone_can_join"
                                        | "only_organization_employees"
                                        | "only_event_attendees";
                                    password?: string;
                                    assign_hosts?: Array<string>;
                                    auto_record?: boolean;
                                    open_lobby?: boolean;
                                    allow_attendees_start?: boolean;
                                };
                            };
                            visibility?: "default" | "public" | "private";
                            attendee_ability?:
                                | "none"
                                | "can_see_others"
                                | "can_invite_others"
                                | "can_modify_event";
                            free_busy_status?: "busy" | "free";
                            location?: {
                                name?: string;
                                address?: string;
                                latitude?: number;
                                longitude?: number;
                            };
                            color?: number;
                            reminders?: Array<{ minutes?: number }>;
                            recurrence?: string;
                            schemas?: Array<{
                                ui_name?: string;
                                ui_status?:
                                    | "hide"
                                    | "readonly"
                                    | "editable"
                                    | "unknown";
                                app_link?: string;
                            }>;
                            attachments?: Array<{
                                file_token?: string;
                                is_deleted?: boolean;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string; event_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    event?: {
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        need_notification?: boolean;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            vc_info?: {
                                                unique_id: string;
                                                meeting_no: string;
                                            };
                                            meeting_settings?: {
                                                owner_id?: string;
                                                join_meeting_permission?:
                                                    | "anyone_can_join"
                                                    | "only_organization_employees"
                                                    | "only_event_attendees";
                                                password?: string;
                                                assign_hosts?: Array<string>;
                                                auto_record?: boolean;
                                                open_lobby?: boolean;
                                                allow_attendees_start?: boolean;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        create_time?: string;
                                        schemas?: Array<{
                                            ui_name?: string;
                                            ui_status?:
                                                | "hide"
                                                | "readonly"
                                                | "editable"
                                                | "unknown";
                                            app_link?: string;
                                        }>;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        app_link?: string;
                                        attachments?: Array<{
                                            file_token?: string;
                                            file_size?: string;
                                            is_deleted?: boolean;
                                            name?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=reply&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reply&project=calendar&resource=calendar.event&version=v4 document }
                 */
                reply: async (
                    payload?: {
                        data: {
                            rsvp_status: "accept" | "decline" | "tentative";
                        };
                        path: { calendar_id: string; event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/reply`,
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
                searchWithIterator: async (
                    payload?: {
                        data: {
                            query: string;
                            filter?: {
                                start_time?: {
                                    date?: string;
                                    timestamp?: string;
                                    timezone?: string;
                                };
                                end_time?: {
                                    date?: string;
                                    timestamp?: string;
                                    timezone?: string;
                                };
                                user_ids?: Array<string>;
                                room_ids?: Array<string>;
                                chat_ids?: Array<string>;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { calendar_id: string };
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search`,
                                    path
                                ),
                                method: "POST",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                                        event_id: string;
                                                        organizer_calendar_id?: string;
                                                        summary?: string;
                                                        description?: string;
                                                        start_time: {
                                                            date?: string;
                                                            timestamp?: string;
                                                            timezone?: string;
                                                        };
                                                        end_time: {
                                                            date?: string;
                                                            timestamp?: string;
                                                            timezone?: string;
                                                        };
                                                        visibility?:
                                                            | "default"
                                                            | "public"
                                                            | "private";
                                                        attendee_ability?:
                                                            | "none"
                                                            | "can_see_others"
                                                            | "can_invite_others"
                                                            | "can_modify_event";
                                                        free_busy_status?:
                                                            | "busy"
                                                            | "free";
                                                        location?: {
                                                            name?: string;
                                                            address?: string;
                                                            latitude?: number;
                                                            longitude?: number;
                                                        };
                                                        color?: number;
                                                        reminders?: Array<{
                                                            minutes?: number;
                                                        }>;
                                                        recurrence?: string;
                                                        status?:
                                                            | "tentative"
                                                            | "confirmed"
                                                            | "cancelled";
                                                        is_exception?: boolean;
                                                        recurring_event_id?: string;
                                                        event_organizer?: {
                                                            user_id?: string;
                                                            display_name?: string;
                                                        };
                                                        app_link?: string;
                                                        attachments?: Array<{
                                                            file_token?: string;
                                                            file_size?: string;
                                                            is_deleted?: boolean;
                                                            name?: string;
                                                        }>;
                                                    }>;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=search&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/search document }
                 *
                 * 搜索日程
                 *
                 * 该接口用于以用户身份搜索某日历下的相关日程。;;身份由 Header Authorization 的 Token 类型决定。
                 *
                 * 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            filter?: {
                                start_time?: {
                                    date?: string;
                                    timestamp?: string;
                                    timezone?: string;
                                };
                                end_time?: {
                                    date?: string;
                                    timestamp?: string;
                                    timezone?: string;
                                };
                                user_ids?: Array<string>;
                                room_ids?: Array<string>;
                                chat_ids?: Array<string>;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { calendar_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        app_link?: string;
                                        attachments?: Array<{
                                            file_token?: string;
                                            file_size?: string;
                                            is_deleted?: boolean;
                                            name?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=subscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/subscription document }
                 *
                 * 订阅日程变更事件
                 *
                 * 该接口用于以用户身份订阅指定日历下的日程变更事件。
                 *
                 * 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。
                 */
                subscription: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/subscription`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=unsubscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/unsubscription document }
                 *
                 * 取消订阅日程变更事件
                 *
                 * 该接口用于以用户身份取消订阅指定日历下的日程变更事件。
                 *
                 * 当前身份必须对日历有reader、writer或owner权限（调用[获取日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，role字段可查看权限）。
                 */
                unsubscription: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/unsubscription`,
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
             * calendar.event.meeting_chat
             */
            calendarEventMeetingChat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.meeting_chat&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event.meeting_chat&version=v4 document }
                 */
                create: async (
                    payload?: {
                        path: { calendar_id: string; event_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    meeting_chat_id?: string;
                                    applink?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.meeting_chat&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar.event.meeting_chat&version=v4 document }
                 */
                delete: async (
                    payload?: {
                        params: { meeting_chat_id: string };
                        path: { calendar_id: string; event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat`,
                                path
                            ),
                            method: "DELETE",
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
             * Exchange绑定
             */
            exchangeBinding: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/create document }
                 *
                 * 创建Exchange绑定关系
                 *
                 * 本接口将Exchange账户绑定到飞书账户，进而支持Exchange日历的导入
                 *
                 * 操作用户需要是企业超级管理员
                 */
                create: async (
                    payload?: {
                        data?: {
                            admin_account?: string;
                            exchange_account?: string;
                            user_id?: string;
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
                                    admin_account?: string;
                                    exchange_account?: string;
                                    user_id?: string;
                                    status?:
                                        | "doing"
                                        | "cal_done"
                                        | "timespan_done"
                                        | "done"
                                        | "err";
                                    exchange_binding_id: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/exchange_bindings`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/delete document }
                 *
                 * 解除Exchange绑定关系
                 *
                 * 本接口解除Exchange账户和飞书账户的绑定关系，Exchange账户解除绑定后才能绑定其他飞书账户
                 *
                 * 操作用户需要是企业超级管理员
                 */
                delete: async (
                    payload?: {
                        path: { exchange_binding_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/get document }
                 *
                 * 获取绑定状态
                 *
                 * 本接口获取Exchange账户的绑定状态，包括exchange日历是否同步完成。
                 *
                 * 操作用户需要是企业超级管理员
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { exchange_binding_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    admin_account?: string;
                                    exchange_account?: string;
                                    user_id?: string;
                                    status?:
                                        | "doing"
                                        | "cal_done"
                                        | "timespan_done"
                                        | "done"
                                        | "err";
                                    exchange_binding_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id`,
                                path
                            ),
                            method: "GET",
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
             * freebusy
             */
            freebusy: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/freebusy/list document }
                 *
                 * 查询主日历忙闲信息
                 *
                 * 查询用户主日历或会议室的忙闲信息。
                 */
                list: async (
                    payload?: {
                        data: {
                            time_min: string;
                            time_max: string;
                            user_id?: string;
                            room_id?: string;
                            include_external_calendar?: boolean;
                            only_busy?: boolean;
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
                                    freebusy_list?: Array<{
                                        start_time: string;
                                        end_time: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/freebusy/list`,
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
             * 日历设置
             */
            setting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=setting&apiName=generate_caldav_conf&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/setting/generate_caldav_conf document }
                 *
                 * 生成CalDAV配置
                 *
                 * 用于为当前用户生成一个CalDAV账号密码，用于将飞书日历信息同步到本地设备日历。
                 */
                generateCaldavConf: async (
                    payload?: {
                        data?: { device_name?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    password?: string;
                                    user_name?: string;
                                    server_address?: string;
                                    device_name?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/settings/generate_caldav_conf`,
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
             * 请假
             */
            timeoffEvent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=timeoff_event&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/create document }
                 *
                 * 创建请假日程
                 *
                 * 为指定用户创建一个请假日程，可以是一个普通请假日程，也可以是一个全天日程。;创建请假日程后，会在相应时间内，在用户个人签名页展示请假信息。
                 */
                create: async (
                    payload?: {
                        data: {
                            user_id: string;
                            timezone: string;
                            start_time: string;
                            end_time: string;
                            title?: string;
                            description?: string;
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
                                    timeoff_event_id: string;
                                    user_id: string;
                                    timezone: string;
                                    start_time: string;
                                    end_time: string;
                                    title?: string;
                                    description?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/timeoff_events`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=timeoff_event&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/delete document }
                 *
                 * 删除请假日程
                 *
                 * 删除一个指定的请假日程，请假日程删除，用户个人签名页的请假信息也会消失。;一个应用只能删除自己创建的请假日程。
                 */
                delete: async (
                    payload?: {
                        path: { timeoff_event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/timeoff_events/:timeoff_event_id`,
                                path
                            ),
                            method: "DELETE",
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
