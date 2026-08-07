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
import search_in_app from "./search_in_app";

// auto gen
export default abstract class Client extends search_in_app {
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
    search = {
        /**
         * connect_data_source
         */
        connectDataSource: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=connect_data_source&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=connect_data_source&version=v2 document }
             */
            create: async (
                payload?: {
                    data: {
                        service_url: string;
                        project_name?: string;
                        display_name?: string;
                        description?: string;
                        icon_url?: string;
                        project_description?: string;
                        contact_email?: string;
                        tenant_name?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/connect_data_sources`,
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
         * data_source
         */
        dataSource: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=get&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=search&resource=data_source&version=v2 document }
             *
             * 获取数据源
             *
             * 获取已经创建的数据源。
             */
            get: async (
                payload?: {
                    path: { data_source_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                data_source?: {
                                    id?: string;
                                    name: string;
                                    state?: number;
                                    description?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    is_exceed_quota?: boolean;
                                    icon_url?: string;
                                    template?: string;
                                    searchable_fields?: Array<string>;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_description?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    schema_id?: string;
                                    app_id?: string;
                                    connect_type?: number;
                                    connector_param?: {
                                        callback_user_id_type?: number;
                                        callback_endpoint?: string;
                                    };
                                    enable_answer?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_sources/:data_source_id`,
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
                        view?: number;
                        page_size?: number;
                        page_token?: string;
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
                                `${this.domain}/open-apis/search/v2/data_sources`,
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
                                                    id?: string;
                                                    name: string;
                                                    state?: number;
                                                    description?: string;
                                                    create_time?: string;
                                                    update_time?: string;
                                                    is_exceed_quota?: boolean;
                                                    icon_url?: string;
                                                    template?: string;
                                                    searchable_fields?: Array<string>;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
                                                    };
                                                    i18n_description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
                                                    };
                                                    schema_id?: string;
                                                    app_id?: string;
                                                    connect_type?: number;
                                                    connector_param?: {
                                                        callback_user_id_type?: number;
                                                        callback_endpoint?: string;
                                                    };
                                                    enable_answer?: boolean;
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=list&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=search&resource=data_source&version=v2 document }
             *
             * 批量获取数据源
             *
             * 批量获取创建的数据源信息。
             */
            list: async (
                payload?: {
                    params?: {
                        view?: number;
                        page_size?: number;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    id?: string;
                                    name: string;
                                    state?: number;
                                    description?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    is_exceed_quota?: boolean;
                                    icon_url?: string;
                                    template?: string;
                                    searchable_fields?: Array<string>;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_description?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    schema_id?: string;
                                    app_id?: string;
                                    connect_type?: number;
                                    connector_param?: {
                                        callback_user_id_type?: number;
                                        callback_endpoint?: string;
                                    };
                                    enable_answer?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_sources`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=delete&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=search&resource=data_source&version=v2 document }
             *
             * 删除数据源
             *
             * 删除一个已存在的数据源。
             */
            delete: async (
                payload?: {
                    path: { data_source_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_sources/:data_source_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=data_source&version=v2 document }
             *
             * 创建数据源
             *
             * 创建一个数据源。
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        state?: number;
                        description?: string;
                        icon_url?: string;
                        template?: string;
                        searchable_fields?: Array<string>;
                        i18n_name?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                        i18n_description?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                        schema_id?: string;
                        app_id?: string;
                        connect_type?: number;
                        connector_param?: {
                            callback_user_id_type?: number;
                            callback_endpoint?: string;
                        };
                        enable_answer?: boolean;
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
                                data_source?: {
                                    id?: string;
                                    name: string;
                                    state?: number;
                                    description?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    is_exceed_quota?: boolean;
                                    icon_url?: string;
                                    template?: string;
                                    searchable_fields?: Array<string>;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_description?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    schema_id?: string;
                                    app_id?: string;
                                    connect_type?: number;
                                    connector_param?: {
                                        callback_user_id_type?: number;
                                        callback_endpoint?: string;
                                    };
                                    enable_answer?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_sources`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=patch&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=search&resource=data_source&version=v2 document }
             *
             * 修改数据源
             *
             * 更新一个已经存在的数据源。
             */
            patch: async (
                payload?: {
                    data?: {
                        name?: string;
                        state?: number;
                        description?: string;
                        icon_url?: string;
                        i18n_name?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                        i18n_description?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                        connector_param?: {
                            callback_user_id_type?: number;
                            callback_endpoint?: string;
                        };
                        enable_answer?: boolean;
                    };
                    path: { data_source_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                data_source?: {
                                    id?: string;
                                    name: string;
                                    state?: number;
                                    description?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    is_exceed_quota?: boolean;
                                    icon_url?: string;
                                    template?: string;
                                    searchable_fields?: Array<string>;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_description?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    schema_id?: string;
                                    app_id?: string;
                                    connect_type?: number;
                                    connector_param?: {
                                        callback_user_id_type?: number;
                                        callback_endpoint?: string;
                                    };
                                    enable_answer?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_sources/:data_source_id`,
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
         * data_source.item
         */
        dataSourceItem: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=record&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=record&project=search&resource=data_source.item&version=v2 document }
             */
            record: async (
                payload?: {
                    path: { data_source_id: string; item_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                record: {
                                    item_id: string;
                                    data_source_id: string;
                                    version: string;
                                    created_at?: string;
                                    updated_at?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items/:item_id/record`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=delete&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=search&resource=data_source.item&version=v2 document }
             *
             * 删除数据项
             *
             * 删除数据项。
             */
            delete: async (
                payload?: {
                    path: { data_source_id: string; item_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items/:item_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=data_source.item&version=v2 document }
             *
             * 为指定数据项创建索引
             *
             * 索引一条数据记录。
             */
            create: async (
                payload?: {
                    data: {
                        id: string;
                        acl: Array<{
                            access?: "allow" | "deny";
                            value?: string;
                            type?:
                                | "user_id"
                                | "open_id"
                                | "union_id"
                                | "department_id"
                                | "open_department_id"
                                | "group_id"
                                | "app_group_id"
                                | "user"
                                | "group";
                        }>;
                        metadata: {
                            title: string;
                            source_url: string;
                            create_time?: number;
                            update_time?: number;
                            source_url_mobile?: string;
                        };
                        structured_data: string;
                        content?: {
                            format?: "html" | "plaintext";
                            content_data?: string;
                        };
                    };
                    path: { data_source_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=get&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=search&resource=data_source.item&version=v2 document }
             *
             * 查询指定数据项
             *
             * 获取单个数据记录。
             */
            get: async (
                payload?: {
                    path?: { data_source_id?: string; item_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                item: {
                                    id: string;
                                    acl: Array<{
                                        access?: "allow" | "deny";
                                        value?: string;
                                        type?:
                                            | "user_id"
                                            | "open_id"
                                            | "union_id"
                                            | "department_id"
                                            | "open_department_id"
                                            | "group_id"
                                            | "app_group_id"
                                            | "user"
                                            | "group";
                                    }>;
                                    metadata: {
                                        title: string;
                                        source_url: string;
                                        create_time?: number;
                                        update_time?: number;
                                        source_url_mobile?: string;
                                    };
                                    structured_data: string;
                                    content?: {
                                        format?: "html" | "plaintext";
                                        content_data?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items/:item_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=batch_create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=search&resource=data_source.item&version=v2 document }
             */
            batchCreate: async (
                payload?: {
                    data: {
                        items: Array<{
                            id: string;
                            acl: Array<{
                                access?: "allow" | "deny";
                                value?: string;
                                type?:
                                    | "user_id"
                                    | "open_id"
                                    | "union_id"
                                    | "department_id"
                                    | "open_department_id"
                                    | "group_id"
                                    | "app_group_id"
                                    | "user"
                                    | "group";
                            }>;
                            metadata: {
                                title: string;
                                source_url: string;
                                create_time?: number;
                                update_time?: number;
                                source_url_mobile?: string;
                            };
                            structured_data: string;
                            content?: {
                                format?: "html" | "plaintext";
                                content_data?: string;
                            };
                        }>;
                    };
                    path: { data_source_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                result: Array<{
                                    item_id: string;
                                    is_success: boolean;
                                    err?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items/batch_create`,
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
         * message
         */
        message: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=message&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=message&version=v2 document }
             *
             * 搜索消息
             *
             * 用户可以通过关键字搜索可见消息，可见性和套件内搜索一致。
             */
            create: async (
                payload?: {
                    data: {
                        query: string;
                        from_ids?: Array<string>;
                        chat_ids?: Array<string>;
                        message_type?: "file" | "image" | "media";
                        at_chatter_ids?: Array<string>;
                        from_type?: "bot" | "user";
                        chat_type?: "group_chat" | "p2p_chat";
                        start_time?: string;
                        end_time?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_size?: number;
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
                                items?: Array<string>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/message`,
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
         * dataset
         */
        dataset: {
            listWithIterator: async (
                payload?: {
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
                                `${this.domain}/open-apis/search/v2/datasets`,
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
                                                datasets?: Array<{
                                                    dataset_id: string;
                                                    app_id: string;
                                                    create_time: string;
                                                    update_time: string;
                                                    chunk_num: number;
                                                    doc_num: number;
                                                    name: string;
                                                    description: string;
                                                    filter_schemas?: Array<{
                                                        field: string;
                                                        type:
                                                            | "list<string>"
                                                            | "string"
                                                            | "int64"
                                                            | "float";
                                                        default_val?: string;
                                                        field_type?:
                                                            | "enum"
                                                            | "range";
                                                    }>;
                                                    model_config?: {
                                                        model_name?: string;
                                                    };
                                                    viewer_app_ids?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset&apiName=list&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=search&resource=dataset&version=v2 document }
             *
             * 获取所有数据集
             *
             * 获取所有数据集
             */
            list: async (
                payload?: {
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
                                datasets?: Array<{
                                    dataset_id: string;
                                    app_id: string;
                                    create_time: string;
                                    update_time: string;
                                    chunk_num: number;
                                    doc_num: number;
                                    name: string;
                                    description: string;
                                    filter_schemas?: Array<{
                                        field: string;
                                        type:
                                            | "list<string>"
                                            | "string"
                                            | "int64"
                                            | "float";
                                        default_val?: string;
                                        field_type?: "enum" | "range";
                                    }>;
                                    model_config?: { model_name?: string };
                                    viewer_app_ids?: Array<string>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/datasets`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset&apiName=get&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=search&resource=dataset&version=v2 document }
             *
             * 获取数据集
             *
             * 获取数据集
             */
            get: async (
                payload?: {
                    path: { dataset_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                dataset: {
                                    dataset_id: string;
                                    app_id: string;
                                    create_time: string;
                                    update_time: string;
                                    chunk_num: number;
                                    doc_num: number;
                                    name: string;
                                    description: string;
                                    filter_schemas?: Array<{
                                        field: string;
                                        type:
                                            | "list<string>"
                                            | "string"
                                            | "int64"
                                            | "float";
                                        default_val?: string;
                                        field_type?: "enum" | "range";
                                    }>;
                                    model_config?: { model_name?: string };
                                    viewer_app_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/datasets/:dataset_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset&apiName=delete&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=search&resource=dataset&version=v2 document }
             *
             * 删除数据集
             *
             * 删除数据集
             */
            delete: async (
                payload?: {
                    path: { dataset_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/datasets/:dataset_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=dataset&version=v2 document }
             *
             * 创建数据集
             *
             * 创建数据集
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        description: string;
                        filter_schemas?: Array<{
                            field: string;
                            type: "list<string>" | "string" | "int64" | "float";
                            default_val?: string;
                            field_type?: "enum" | "range";
                        }>;
                        model_config?: { model_name?: string };
                        viewer_app_ids?: Array<string>;
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
                                dataset?: {
                                    dataset_id: string;
                                    app_id: string;
                                    create_time: string;
                                    update_time: string;
                                    chunk_num: number;
                                    doc_num: number;
                                    name: string;
                                    description: string;
                                    filter_schemas?: Array<{
                                        field: string;
                                        type:
                                            | "list<string>"
                                            | "string"
                                            | "int64"
                                            | "float";
                                        default_val?: string;
                                        field_type?: "enum" | "range";
                                    }>;
                                    model_config?: { model_name?: string };
                                    viewer_app_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/datasets`,
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
         * dataset.doc
         */
        datasetDoc: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=get&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=search&resource=dataset.doc&version=v2 document }
             *
             * 获取数据集文档
             *
             * 获取数据集文档
             */
            get: async (
                payload?: {
                    path: { dataset_id: string; doc_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                doc?: {
                                    doc_id: string;
                                    filter_data?: string;
                                    chunks: Array<{
                                        chunk_id: string;
                                        doc_id: string;
                                        dataset_id: string;
                                        update_time?: string;
                                        content: string;
                                        filter_data: string;
                                        score?: number;
                                        token_num?: number;
                                        overlength?: boolean;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs/:doc_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=search&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=dataset.doc&version=v2 document }
             *
             * 数据集文档搜索
             *
             * 从数据集文本块中搜索与查询语句语义相关的结果。
             */
            search: async (
                payload?: {
                    data: {
                        query: string;
                        filter_param?: string;
                        count: number;
                        disable_rank?: boolean;
                        model_param?: {
                            encoder_name?: string;
                            ranker_name?: string;
                            filter_name?: string;
                            booster_name?: string;
                            passage_language?: string;
                        };
                    };
                    path: { dataset_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    chunk_id: string;
                                    doc_id: string;
                                    dataset_id: string;
                                    update_time?: string;
                                    content: string;
                                    filter_data: string;
                                    score?: number;
                                    token_num?: number;
                                    overlength?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=batch_delete&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=search&resource=dataset.doc&version=v2 document }
             *
             * 批量删除数据集文档
             *
             * 批量删除数据集文档
             */
            batchDelete: async (
                payload?: {
                    data: { doc_ids: Array<string> };
                    path: { dataset_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs/batch_delete`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=batch_create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=search&resource=dataset.doc&version=v2 document }
             *
             * 批量创建数据集文档
             *
             * 批量创建数据集文档
             */
            batchCreate: async (
                payload?: {
                    data: {
                        docs_param: Array<{
                            doc_id: string;
                            filter_data?: string;
                            content?: string;
                            chunks?: Array<string>;
                            overlength_handle_type?: number;
                        }>;
                    };
                    path: { dataset_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                docs?: Array<{
                                    doc_id: string;
                                    filter_data?: string;
                                    chunks: Array<{
                                        chunk_id: string;
                                        doc_id: string;
                                        dataset_id: string;
                                        update_time?: string;
                                        content: string;
                                        filter_data: string;
                                        score?: number;
                                        token_num?: number;
                                        overlength?: boolean;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs/batch_create`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=delete&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=search&resource=dataset.doc&version=v2 document }
             *
             * 删除数据集文档
             *
             * 删除数据集文档
             */
            delete: async (
                payload?: {
                    path: { dataset_id: string; doc_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs/:doc_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=dataset.doc&version=v2 document }
             *
             * 创建数据集文档
             *
             * 创建数据集文档
             */
            create: async (
                payload?: {
                    data: {
                        doc_param: {
                            doc_id: string;
                            filter_data?: string;
                            content?: string;
                            chunks?: Array<string>;
                            overlength_handle_type?: number;
                        };
                    };
                    path: { dataset_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                doc?: {
                                    doc_id: string;
                                    filter_data?: string;
                                    chunks: Array<{
                                        chunk_id: string;
                                        doc_id: string;
                                        dataset_id: string;
                                        update_time?: string;
                                        content: string;
                                        filter_data: string;
                                        score?: number;
                                        token_num?: number;
                                        overlength?: boolean;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs`,
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
         * qa
         */
        qa: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=qa&apiName=search&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=qa&version=v2 document }
             */
            search: async (
                payload?: {
                    data: {
                        query: string;
                        passages: Array<string>;
                        model_config: {
                            model_name: string;
                            prompt?: string;
                            max_token?: number;
                            temperature?: number;
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
                            data?: { answer: string; prompt?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/qa/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=qa&apiName=paraphrase&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=paraphrase&project=search&resource=qa&version=v2 document }
             */
            paraphrase: async (
                payload?: {
                    data: { text: string; strategy: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    text: string;
                                    extra?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/qa/paraphrase`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=qa&apiName=embedding&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=embedding&project=search&resource=qa&version=v2 document }
             *
             * 文本向量化
             *
             * 把文本编码成向量
             */
            embedding: async (
                payload?: {
                    data: {
                        passages: Array<string>;
                        model_name?: string;
                        overflow_strategy?: "truncate" | "split_then_average";
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
                            data?: { embeddings: Array<Array<number>> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/qa/embedding`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=qa&apiName=rank&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rank&project=search&resource=qa&version=v2 document }
             *
             * 文本相关性排序
             *
             * 判断passage是否可以回答query
             */
            rank: async (
                payload?: {
                    data: {
                        query: string;
                        passages: Array<string>;
                        model_name: string;
                        overflow_strategy?: "truncate" | "split_then_max";
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
                            data?: { scores: Array<number> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/qa/rank`,
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
         * data_connector
         */
        dataConnector: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_connector&apiName=search&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=data_connector&version=v2 document }
             */
            search: async (
                payload?: {
                    data?: { query?: string; datasource_ids?: Array<string> };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { data?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/data_connector/search`,
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
         * suite_dataset
         */
        suiteDataset: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=suite_dataset&apiName=search&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=suite_dataset&version=v2 document }
             *
             * 套件数据集搜索
             *
             * 从套件数据集搜索与查询语句语义相关的文本块。
             */
            search: async (
                payload?: {
                    data: {
                        query: string;
                        count?: number;
                        passage_param: {
                            doc_param?: {
                                searchable?: boolean;
                                doc_tokens?: Array<string>;
                                folder_tokens?: Array<string>;
                                obj_ids?: Array<string>;
                                disable_search_link?: boolean;
                                excluded_obj_ids?: Array<string>;
                                excluded_doc_tokens?: Array<string>;
                                excluded_folder_tokens?: Array<string>;
                                enable_cross_tenant?: boolean;
                                only_search_public?: boolean;
                            };
                            wiki_param?: {
                                searchable?: boolean;
                                space_ids?: Array<string>;
                                obj_ids?: Array<string>;
                                wiki_tokens?: Array<string>;
                                node_tokens?: Array<string>;
                                excluded_space_ids?: Array<string>;
                                excluded_obj_ids?: Array<string>;
                                excluded_wiki_tokens?: Array<string>;
                                excluded_node_tokens?: Array<string>;
                                enable_cross_tenant?: boolean;
                                only_search_public?: boolean;
                            };
                            web_param?: {
                                searchable?: boolean;
                                domains?: Array<string>;
                            };
                            helpdesk_param?: {
                                searchable?: boolean;
                                helpdesk_ids?: Array<string>;
                            };
                            lingo_param?: { searchable?: boolean };
                            message_param?: {
                                searchable?: boolean;
                                chat_ids?: Array<string>;
                                excluded_passage_ids?: Array<string>;
                                excluded_chat_ids?: Array<string>;
                                excluded_message_ids?: Array<string>;
                            };
                        };
                        model_param?: {
                            encoder_name?: string;
                            ranker_name?: string;
                            filter_name?: string;
                            booster_name?: string;
                            passage_language?: string;
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
                                passages?: Array<{
                                    passage_id: string;
                                    passage_source: number;
                                    content: string;
                                    title?: string;
                                    url?: string;
                                    score?: number;
                                    extra?: string;
                                    content_for_llm?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/suite_dataset/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=suite_dataset&apiName=split&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=split&project=search&resource=suite_dataset&version=v2 document }
             *
             * 套件数据集切片
             *
             * 支持套件内doc/docx/sheet/base的文档切片。
             */
            split: async (
                payload?: {
                    data: {
                        url: string;
                        split_strategy?: "LeafToRoot" | "NaturalOrder";
                        passage_max_token_num?: number;
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
                                passages?: Array<{
                                    passage_id?: string;
                                    obj_id?: string;
                                    content?: string;
                                    num_tokens?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/suite_dataset/split`,
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
         * nls
         */
        nls: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=nls&apiName=search&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=nls&version=v2 document }
             *
             * 自然语言搜索
             *
             * 输入自然语言文本，获取套件内相关实体的搜索结果。
             */
            search: async (
                payload?: {
                    data: {
                        query: string;
                        model_config: { model_name: string };
                        user_info?: {
                            user_language: string;
                            timezone?: string;
                            user_id?: string;
                            user_open_id?: string;
                            tenant_id?: string;
                            locale?: string;
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
                                entities: Array<string>;
                                explanatory_tag?: string;
                                search_dsl?: string;
                                additional_task?: string;
                                nls_score?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/nls/search`,
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
         * dialog
         */
        dialog: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dialog&apiName=card_callback&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=card_callback&project=search&resource=dialog&version=v2 document }
             */
            cardCallback: async (
                payload?: {
                    data?: {
                        open_chat_id?: string;
                        open_message_id?: string;
                        token?: string;
                        action?: {
                            tag?: string;
                            value?: {
                                strategy_info?: string;
                                agent_id?: string;
                                agent_type?: number;
                                response_type?: number;
                                session_id?: string;
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
                                presents?: Array<{
                                    type:
                                        | "rich_text"
                                        | "card"
                                        | "template_card";
                                    body: string;
                                    operation_type?: "UPDATE" | "APPEND";
                                    interactable?: boolean;
                                    operation_url?: string;
                                    callback_url?: string;
                                    callback_info?: string;
                                    card_template_id?: string;
                                    card_variables?: {};
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/dialog/card_callback`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dialog&apiName=present_data_callback&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=present_data_callback&project=search&resource=dialog&version=v2 document }
             */
            presentDataCallback: async (
                payload?: {
                    data: {
                        message_id: string;
                        status: { from_status?: string; to_status?: string };
                        callback_info?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/dialog/present_data_callback`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dialog&apiName=search&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=dialog&version=v2 document }
             */
            search: async (
                payload?: {
                    data?: {
                        tool_raw_instruction?: string;
                        scenario_context_schema_version?: string;
                        scenario_context?: {
                            extra?: {
                                grounding_id?: string;
                                model_key?: string;
                                specified_obj_ids?: string;
                                suggest_query_id?: string;
                                button_send_message_info?: string;
                                button_regenerate_message?: string;
                                enterprise_qa_channel_info?: string;
                            };
                            system_info?: {
                                time?: string;
                                time_zone?: string;
                                lang?: string;
                                brand?: "feishu" | "lark";
                                weekday?: string;
                                session_id?: string;
                                shadow_name?: string;
                                msg_id?: string;
                                agent_id?: string;
                                locale?: string;
                                app_version?: string;
                            };
                            memory?: Array<{
                                role?: "human" | "ai" | "system";
                                content?: string;
                            }>;
                            scenario?: string;
                            work_mode?: number;
                            tool_raw_instruction?: string;
                        };
                        agent_type?: number;
                        response_type?: number;
                        passage_param?: {
                            doc_param?: {
                                searchable?: boolean;
                                doc_tokens?: Array<string>;
                                folder_tokens?: Array<string>;
                                obj_ids?: Array<string>;
                                disable_search_link?: boolean;
                                excluded_obj_ids?: Array<string>;
                                excluded_doc_tokens?: Array<string>;
                                excluded_folder_tokens?: Array<string>;
                                enable_cross_tenant?: boolean;
                                only_search_public?: boolean;
                            };
                            wiki_param?: {
                                searchable?: boolean;
                                space_ids?: Array<string>;
                                obj_ids?: Array<string>;
                                wiki_tokens?: Array<string>;
                                node_tokens?: Array<string>;
                                excluded_space_ids?: Array<string>;
                                excluded_obj_ids?: Array<string>;
                                excluded_wiki_tokens?: Array<string>;
                                excluded_node_tokens?: Array<string>;
                                enable_cross_tenant?: boolean;
                                only_search_public?: boolean;
                            };
                            web_param?: {
                                searchable?: boolean;
                                domains?: Array<string>;
                            };
                            helpdesk_param?: {
                                searchable?: boolean;
                                helpdesk_ids?: Array<string>;
                            };
                            lingo_param?: { searchable?: boolean };
                            message_param?: {
                                searchable?: boolean;
                                chat_ids?: Array<string>;
                                excluded_passage_ids?: Array<string>;
                                excluded_chat_ids?: Array<string>;
                                excluded_message_ids?: Array<string>;
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
                                hint?: string;
                                present?: {
                                    type:
                                        | "rich_text"
                                        | "card"
                                        | "template_card";
                                    body: string;
                                    operation_type?: "UPDATE" | "APPEND";
                                    interactable?: boolean;
                                    operation_url?: string;
                                    callback_url?: string;
                                    callback_info?: string;
                                    card_template_id?: string;
                                    card_variables?: {};
                                };
                                rag_answer_response?: {
                                    answer?: string;
                                    passages?: Array<{
                                        passage_id: string;
                                        passage_source: number;
                                        content: string;
                                        title?: string;
                                        url?: string;
                                        score?: number;
                                        extra?: string;
                                        content_for_llm?: string;
                                    }>;
                                    probe?: {
                                        hit_authority?: boolean;
                                        hit_confidence_warn?: boolean;
                                        hit_llm_reject?: boolean;
                                    };
                                };
                                response_type?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/dialog/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=dialog&apiName=stream_search&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=stream_search&project=search&resource=dialog&version=v2 document }
             */
            streamSearch: async (
                payload?: {
                    data?: {
                        tool_raw_instruction?: string;
                        scenario_context_schema_version?: string;
                        scenario_context?: {
                            extra?: {
                                grounding_id?: string;
                                model_key?: string;
                                specified_obj_ids?: string;
                                suggest_query_id?: string;
                                button_send_message_info?: string;
                                button_regenerate_message?: string;
                                enterprise_qa_channel_info?: string;
                            };
                            system_info?: {
                                time?: string;
                                time_zone?: string;
                                lang?: string;
                                brand?: "feishu" | "lark";
                                weekday?: string;
                                session_id?: string;
                                shadow_name?: string;
                                msg_id?: string;
                                agent_id?: string;
                                locale?: string;
                                app_version?: string;
                            };
                            memory?: Array<{
                                role?: "human" | "ai" | "system";
                                content?: string;
                            }>;
                            scenario?: string;
                            work_mode?: number;
                            tool_raw_instruction?: string;
                        };
                        agent_type?: number;
                        response_type?: number;
                        passage_param?: {
                            doc_param?: {
                                searchable?: boolean;
                                doc_tokens?: Array<string>;
                                folder_tokens?: Array<string>;
                                obj_ids?: Array<string>;
                                disable_search_link?: boolean;
                                excluded_obj_ids?: Array<string>;
                                excluded_doc_tokens?: Array<string>;
                                excluded_folder_tokens?: Array<string>;
                                enable_cross_tenant?: boolean;
                                only_search_public?: boolean;
                            };
                            wiki_param?: {
                                searchable?: boolean;
                                space_ids?: Array<string>;
                                obj_ids?: Array<string>;
                                wiki_tokens?: Array<string>;
                                node_tokens?: Array<string>;
                                excluded_space_ids?: Array<string>;
                                excluded_obj_ids?: Array<string>;
                                excluded_wiki_tokens?: Array<string>;
                                excluded_node_tokens?: Array<string>;
                                enable_cross_tenant?: boolean;
                                only_search_public?: boolean;
                            };
                            web_param?: {
                                searchable?: boolean;
                                domains?: Array<string>;
                            };
                            helpdesk_param?: {
                                searchable?: boolean;
                                helpdesk_ids?: Array<string>;
                            };
                            lingo_param?: { searchable?: boolean };
                            message_param?: {
                                searchable?: boolean;
                                chat_ids?: Array<string>;
                                excluded_passage_ids?: Array<string>;
                                excluded_chat_ids?: Array<string>;
                                excluded_message_ids?: Array<string>;
                            };
                        };
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/dialog/stream_search`,
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
         * schema
         */
        schema: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=get&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=search&resource=schema&version=v2 document }
             *
             * 获取数据范式
             *
             * 获取单个数据范式。
             */
            get: async (
                payload?: {
                    path: { schema_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                schema?: {
                                    properties: Array<{
                                        name: string;
                                        type:
                                            | "text"
                                            | "int"
                                            | "tag"
                                            | "timestamp"
                                            | "double"
                                            | "tinytext"
                                            | "user_ids";
                                        is_searchable?: boolean;
                                        is_sortable?: boolean;
                                        is_returnable?: boolean;
                                        sort_options?: {
                                            priority?: number;
                                            order?: "asc" | "desc";
                                        };
                                        type_definitions?: {
                                            tag?: Array<{
                                                name: string;
                                                color:
                                                    | "red"
                                                    | "green"
                                                    | "blue"
                                                    | "grey"
                                                    | "yellow";
                                                text: string;
                                            }>;
                                            user_ids?: {
                                                id_type:
                                                    | "open_id"
                                                    | "union_id"
                                                    | "user_id";
                                            };
                                        };
                                        search_options?: {
                                            enable_semantic_match?: boolean;
                                            enable_exact_match?: boolean;
                                            enable_prefix_match?: boolean;
                                            enable_number_suffix_match?: boolean;
                                            enable_camel_match?: boolean;
                                        };
                                        is_filterable?: boolean;
                                        filter_options?: {
                                            display_name: string;
                                            i18n_display_name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                            option_mode?: "single" | "multiple";
                                            associated_smart_filter?:
                                                | "from"
                                                | "date";
                                            filter_type?:
                                                | "user"
                                                | "time"
                                                | "searchable"
                                                | "predefine_enum";
                                            predefine_enum_values?: Array<{
                                                name: string;
                                                text: string;
                                            }>;
                                            enable_client_filter?: boolean;
                                            reference_datasource_id?: string;
                                        };
                                        answer_option?: {
                                            is_searchable?: boolean;
                                            is_returnable?: boolean;
                                        };
                                        desc?: string;
                                    }>;
                                    display: {
                                        card_key: "search_common_card";
                                        fields_mapping?: Array<{
                                            display_field: string;
                                            data_field: string;
                                        }>;
                                    };
                                    schema_id: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/schemas/:schema_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=delete&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=search&resource=schema&version=v2 document }
             *
             * 删除数据范式
             *
             * 删除已存在的数据范式。
             */
            delete: async (
                payload?: {
                    path: { schema_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/schemas/:schema_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=schema&version=v2 document }
             *
             * 创建数据范式
             *
             * 创建一个数据范式。
             */
            create: async (
                payload?: {
                    data: {
                        properties: Array<{
                            name: string;
                            type:
                                | "text"
                                | "int"
                                | "tag"
                                | "timestamp"
                                | "double"
                                | "tinytext"
                                | "user_ids";
                            is_searchable?: boolean;
                            is_sortable?: boolean;
                            is_returnable?: boolean;
                            sort_options?: {
                                priority?: number;
                                order?: "asc" | "desc";
                            };
                            type_definitions?: {
                                tag?: Array<{
                                    name: string;
                                    color:
                                        | "red"
                                        | "green"
                                        | "blue"
                                        | "grey"
                                        | "yellow";
                                    text: string;
                                }>;
                                user_ids?: {
                                    id_type: "open_id" | "union_id" | "user_id";
                                };
                            };
                            search_options?: {
                                enable_semantic_match?: boolean;
                                enable_exact_match?: boolean;
                                enable_prefix_match?: boolean;
                                enable_number_suffix_match?: boolean;
                                enable_camel_match?: boolean;
                            };
                            is_filterable?: boolean;
                            filter_options?: {
                                display_name: string;
                                i18n_display_name?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                    ja_jp?: string;
                                };
                                option_mode?: "single" | "multiple";
                                associated_smart_filter?: "from" | "date";
                                filter_type?:
                                    | "user"
                                    | "time"
                                    | "searchable"
                                    | "predefine_enum";
                                predefine_enum_values?: Array<{
                                    name: string;
                                    text: string;
                                }>;
                                enable_client_filter?: boolean;
                                reference_datasource_id?: string;
                            };
                            answer_option?: {
                                is_searchable?: boolean;
                                is_returnable?: boolean;
                            };
                            desc?: string;
                        }>;
                        display: {
                            card_key: "search_common_card";
                            fields_mapping?: Array<{
                                display_field: string;
                                data_field: string;
                            }>;
                        };
                        schema_id: string;
                    };
                    params?: { validate_only?: boolean };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                schema?: {
                                    properties: Array<{
                                        name: string;
                                        type:
                                            | "text"
                                            | "int"
                                            | "tag"
                                            | "timestamp"
                                            | "double"
                                            | "tinytext"
                                            | "user_ids";
                                        is_searchable?: boolean;
                                        is_sortable?: boolean;
                                        is_returnable?: boolean;
                                        sort_options?: {
                                            priority?: number;
                                            order?: "asc" | "desc";
                                        };
                                        type_definitions?: {
                                            tag?: Array<{
                                                name: string;
                                                color:
                                                    | "red"
                                                    | "green"
                                                    | "blue"
                                                    | "grey"
                                                    | "yellow";
                                                text: string;
                                            }>;
                                            user_ids?: {
                                                id_type:
                                                    | "open_id"
                                                    | "union_id"
                                                    | "user_id";
                                            };
                                        };
                                        search_options?: {
                                            enable_semantic_match?: boolean;
                                            enable_exact_match?: boolean;
                                            enable_prefix_match?: boolean;
                                            enable_number_suffix_match?: boolean;
                                            enable_camel_match?: boolean;
                                        };
                                        is_filterable?: boolean;
                                        filter_options?: {
                                            display_name: string;
                                            i18n_display_name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                            option_mode?: "single" | "multiple";
                                            associated_smart_filter?:
                                                | "from"
                                                | "date";
                                            filter_type?:
                                                | "user"
                                                | "time"
                                                | "searchable"
                                                | "predefine_enum";
                                            predefine_enum_values?: Array<{
                                                name: string;
                                                text: string;
                                            }>;
                                            enable_client_filter?: boolean;
                                            reference_datasource_id?: string;
                                        };
                                        answer_option?: {
                                            is_searchable?: boolean;
                                            is_returnable?: boolean;
                                        };
                                        desc?: string;
                                    }>;
                                    display: {
                                        card_key: "search_common_card";
                                        fields_mapping?: Array<{
                                            display_field: string;
                                            data_field: string;
                                        }>;
                                    };
                                    schema_id: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/schemas`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=patch&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=search&resource=schema&version=v2 document }
             *
             * 修改数据范式
             *
             * 修改数据范式。
             */
            patch: async (
                payload?: {
                    data?: {
                        display?: {
                            card_key: "search_common_card";
                            fields_mapping?: Array<{
                                display_field: string;
                                data_field: string;
                            }>;
                        };
                        properties?: Array<{
                            name: string;
                            desc?: string;
                            answer_option?: {
                                is_searchable?: boolean;
                                is_returnable?: boolean;
                            };
                        }>;
                    };
                    path: { schema_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                schema?: {
                                    properties: Array<{
                                        name: string;
                                        type:
                                            | "text"
                                            | "int"
                                            | "tag"
                                            | "timestamp"
                                            | "double"
                                            | "tinytext"
                                            | "user_ids";
                                        is_searchable?: boolean;
                                        is_sortable?: boolean;
                                        is_returnable?: boolean;
                                        sort_options?: {
                                            priority?: number;
                                            order?: "asc" | "desc";
                                        };
                                        type_definitions?: {
                                            tag?: Array<{
                                                name: string;
                                                color:
                                                    | "red"
                                                    | "green"
                                                    | "blue"
                                                    | "grey"
                                                    | "yellow";
                                                text: string;
                                            }>;
                                            user_ids?: {
                                                id_type:
                                                    | "open_id"
                                                    | "union_id"
                                                    | "user_id";
                                            };
                                        };
                                        search_options?: {
                                            enable_semantic_match?: boolean;
                                            enable_exact_match?: boolean;
                                            enable_prefix_match?: boolean;
                                            enable_number_suffix_match?: boolean;
                                            enable_camel_match?: boolean;
                                        };
                                        is_filterable?: boolean;
                                        filter_options?: {
                                            display_name: string;
                                            i18n_display_name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                            option_mode?: "single" | "multiple";
                                            associated_smart_filter?:
                                                | "from"
                                                | "date";
                                            filter_type?:
                                                | "user"
                                                | "time"
                                                | "searchable"
                                                | "predefine_enum";
                                            predefine_enum_values?: Array<{
                                                name: string;
                                                text: string;
                                            }>;
                                            enable_client_filter?: boolean;
                                            reference_datasource_id?: string;
                                        };
                                        answer_option?: {
                                            is_searchable?: boolean;
                                            is_returnable?: boolean;
                                        };
                                        desc?: string;
                                    }>;
                                    display: {
                                        card_key: "search_common_card";
                                        fields_mapping?: Array<{
                                            display_field: string;
                                            data_field: string;
                                        }>;
                                    };
                                    schema_id: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/schemas/:schema_id`,
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
         * ci
         */
        ci: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=ci&apiName=post&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=post&project=search&resource=ci&version=v2 document }
             *
             * 获取人员协作亲密度
             *
             * 获取用户密切协作的人员列表及协作亲密度。
             *
             * 接口只返回同企业的在职用户。
             */
            post: async (
                payload?: {
                    data: {
                        user_id: string;
                        top_k?: number;
                        start_time_filter?: string;
                        end_time_filter?: string;
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
                                simple_related_users: Array<{
                                    user_id: string;
                                    score: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/ci/post`,
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
         * rag_answer
         */
        ragAnswer: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=rag_answer&apiName=fetch&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=fetch&project=search&resource=rag_answer&version=v2 document }
             */
            fetch: async (
                payload?: {
                    data?: { query?: string; scene?: number };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                rag_answer?: {
                                    answer?: string;
                                    reasoning_content?: string;
                                    passages?: Array<{
                                        passage_id: string;
                                        passage_source: number;
                                        content: string;
                                        title?: string;
                                        url?: string;
                                        score?: number;
                                        extra?: string;
                                        content_for_llm?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/rag_answer/fetch`,
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
         * knowledge_qa
         */
        knowledgeQa: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=knowledge_qa&apiName=image&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=image&project=search&resource=knowledge_qa&version=v2 document }
             *
             * 答案图片下载
             *
             * 使用[端到端问答](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/knowledge_qa/answer)或[端到端流式问答](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/knowledge_qa/stream_answer)时，答案中的图片可通过此接口下载。;;
             */
            image: async (
                payload?: {
                    path: { image_key: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/knowledge_qa/images/:image_key`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=knowledge_qa&apiName=search&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=knowledge_qa&version=v2 document }
             *
             * 向量搜索
             *
             * 根据用户的问题，返回相关的**参考资料内容**。;;
             */
            search: async (
                payload?: {
                    data?: {
                        query?: string;
                        enterprise_knowledge_source?: {
                            space?: {
                                searchable?: boolean;
                                filter?: {
                                    doc_tokens?: Array<string>;
                                    folder_tokens?: Array<string>;
                                };
                                reject?: {
                                    doc_tokens?: Array<string>;
                                    folder_tokens?: Array<string>;
                                };
                            };
                            wiki?: {
                                searchable: boolean;
                                filter?: {
                                    wiki_tokens?: Array<string>;
                                    node_tokens?: Array<string>;
                                    space_ids?: Array<string>;
                                };
                                reject?: {
                                    wiki_tokens?: Array<string>;
                                    node_tokens?: Array<string>;
                                    space_ids?: Array<string>;
                                };
                            };
                            message?: {
                                searchable?: boolean;
                                filter?: {
                                    chat_ids?: Array<string>;
                                    time_range?: {
                                        start?: number;
                                        end?: number;
                                    };
                                };
                                reject?: {
                                    message_ids?: Array<string>;
                                    chat_ids?: Array<string>;
                                };
                            };
                            helpdesk_faq?: {
                                searchable?: boolean;
                                filter?: { helpdesk_ids?: Array<string> };
                            };
                            lingo?: { searchable?: boolean };
                            comment?: {
                                wiki_searchable?: boolean;
                                space_searchable?: boolean;
                            };
                            minutes?: { searchable?: boolean };
                            mail?: { searchable?: boolean };
                            approval?: { searchable?: boolean };
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
                                passages?: Array<{
                                    id?: string;
                                    source_type?: number;
                                    title?: string;
                                    content?: string;
                                    url?: string;
                                    score?: number;
                                }>;
                                extra?: Record<string, string>;
                                passages_ignore_filter?: Array<{
                                    id?: string;
                                    source_type?: number;
                                    title?: string;
                                    content?: string;
                                    url?: string;
                                    score?: number;
                                }>;
                                references?: {
                                    enterprise_refs?: Array<{
                                        id?: string;
                                        source_type?: number;
                                        title?: string;
                                        content?: string;
                                        url?: string;
                                    }>;
                                    internet_refs?: Array<{
                                        title?: string;
                                        summary?: string;
                                        url?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/knowledge_qa/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=knowledge_qa&apiName=stream_answer&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=stream_answer&project=search&resource=knowledge_qa&version=v2 document }
             *
             * 知识问答（流式）
             *
             * 根据用户的问题，流式返回**带引用的答案**以及**参考资料预览**。;;;
             *
             * 流式接口基于 HTTP SSE 协议。请求头中的`Content-Type`需要修改为`text/plain`。;;## 高级功能;- **可选大模型**：支持豆包、DeepSeek-R1。详见 ==model_type== 参数。;- **可选知识范围**：详见 ==knowledge_scope== 和 ==enterprise_knowledge_source== 参数。;- **多模态能力**：结合云文档、知识库内的**画板、图片**的内容理解，返回**图文结合**的答案。详见 ==enable_image== 参数。
             */
            streamAnswer: async (
                payload?: {
                    data: {
                        query: string;
                        enable_image?: boolean;
                        knowledge_scope:
                            | "enterprise"
                            | "internet"
                            | "llm"
                            | "hybrid";
                        enterprise_knowledge_source?: {
                            space?: {
                                searchable?: boolean;
                                filter?: {
                                    doc_tokens?: Array<string>;
                                    folder_tokens?: Array<string>;
                                };
                                reject?: {
                                    doc_tokens?: Array<string>;
                                    folder_tokens?: Array<string>;
                                };
                            };
                            wiki?: {
                                searchable: boolean;
                                filter?: {
                                    wiki_tokens?: Array<string>;
                                    node_tokens?: Array<string>;
                                    space_ids?: Array<string>;
                                };
                                reject?: {
                                    wiki_tokens?: Array<string>;
                                    node_tokens?: Array<string>;
                                    space_ids?: Array<string>;
                                };
                            };
                            message?: {
                                searchable?: boolean;
                                filter?: {
                                    chat_ids?: Array<string>;
                                    time_range?: {
                                        start?: number;
                                        end?: number;
                                    };
                                };
                                reject?: {
                                    message_ids?: Array<string>;
                                    chat_ids?: Array<string>;
                                };
                            };
                            helpdesk_faq?: {
                                searchable?: boolean;
                                filter?: { helpdesk_ids?: Array<string> };
                            };
                            lingo?: { searchable?: boolean };
                            comment?: {
                                wiki_searchable?: boolean;
                                space_searchable?: boolean;
                            };
                            minutes?: { searchable?: boolean };
                            mail?: { searchable?: boolean };
                            approval?: { searchable?: boolean };
                        };
                        extra?: { locale?: string; timezone?: string };
                        model_type:
                            | "doubao"
                            | "deepseek"
                            | "doubao_thinking"
                            | "doubao_auto_thinking";
                        history_messages?: Array<{
                            role: number;
                            content: string;
                        }>;
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
                                id: number;
                                event: "pending" | "finished" | "failed";
                                data?: {
                                    answer?: string;
                                    reasoning_content?: string;
                                    status_code?: number;
                                    status_message?: string;
                                    references?: {
                                        enterprise_refs?: Array<{
                                            id?: string;
                                            source_type?: number;
                                            title?: string;
                                            content?: string;
                                            url?: string;
                                        }>;
                                        internet_refs?: Array<{
                                            title?: string;
                                            summary?: string;
                                            url?: string;
                                        }>;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/knowledge_qa/stream_answer`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=knowledge_qa&apiName=answer&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=answer&project=search&resource=knowledge_qa&version=v2 document }
             *
             * 知识问答
             *
             * 根据用户的问题，返回**带引用的答案**以及**参考资料预览**。;;;
             *
             * ## 高级功能;- **可选大模型**：支持豆包、DeepSeek-R1 等。详见 ==model_type== 参数。;- **可选知识范围**：详见 ==knowledge_scope== 和 ==enterprise_knowledge_source== 参数。;- **多模态能力**：结合云文档、知识库内的**画板、图片**的内容理解，返回**图文结合**的答案。详见 ==enable_image== 参数。
             */
            answer: async (
                payload?: {
                    data: {
                        query: string;
                        enable_image?: boolean;
                        knowledge_scope:
                            | "enterprise"
                            | "internet"
                            | "llm"
                            | "hybrid";
                        enterprise_knowledge_source?: {
                            space?: {
                                searchable?: boolean;
                                filter?: {
                                    doc_tokens?: Array<string>;
                                    folder_tokens?: Array<string>;
                                };
                                reject?: {
                                    doc_tokens?: Array<string>;
                                    folder_tokens?: Array<string>;
                                };
                            };
                            wiki?: {
                                searchable: boolean;
                                filter?: {
                                    wiki_tokens?: Array<string>;
                                    node_tokens?: Array<string>;
                                    space_ids?: Array<string>;
                                };
                                reject?: {
                                    wiki_tokens?: Array<string>;
                                    node_tokens?: Array<string>;
                                    space_ids?: Array<string>;
                                };
                            };
                            message?: {
                                searchable?: boolean;
                                filter?: {
                                    chat_ids?: Array<string>;
                                    time_range?: {
                                        start?: number;
                                        end?: number;
                                    };
                                };
                                reject?: {
                                    message_ids?: Array<string>;
                                    chat_ids?: Array<string>;
                                };
                            };
                            helpdesk_faq?: {
                                searchable?: boolean;
                                filter?: { helpdesk_ids?: Array<string> };
                            };
                            lingo?: { searchable?: boolean };
                            comment?: {
                                wiki_searchable?: boolean;
                                space_searchable?: boolean;
                            };
                            minutes?: { searchable?: boolean };
                            mail?: { searchable?: boolean };
                            approval?: { searchable?: boolean };
                        };
                        extra?: { locale?: string; timezone?: string };
                        model_type:
                            | "doubao"
                            | "deepseek"
                            | "doubao_thinking"
                            | "doubao_auto_thinking";
                        history_messages?: Array<{
                            role: number;
                            content: string;
                        }>;
                        enable_agentic_output?: boolean;
                        enable_delta_text?: boolean;
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
                                answer?: string;
                                reasoning_content?: string;
                                status_code?: number;
                                status_message?: string;
                                references?: {
                                    enterprise_refs?: Array<{
                                        id?: string;
                                        source_type?: number;
                                        title?: string;
                                        content?: string;
                                        url?: string;
                                    }>;
                                    internet_refs?: Array<{
                                        title?: string;
                                        summary?: string;
                                        url?: string;
                                    }>;
                                };
                                output_items?: Array<{
                                    item_id?: number;
                                    event?: number;
                                    type?: number;
                                    status?: number;
                                    text?: string;
                                    annotations?: Array<{
                                        type?: number;
                                        key?: string;
                                        image?: {
                                            image_meta?: { image_key?: string };
                                        };
                                        ref?: {
                                            ref_type?: number;
                                            enterprise?: {
                                                id?: string;
                                                source_type?: number;
                                                title?: string;
                                                content?: string;
                                                url?: string;
                                            };
                                            internet?: {
                                                title?: string;
                                                summary?: string;
                                                url?: string;
                                            };
                                        };
                                        board?: {
                                            image?: {
                                                image_meta?: {
                                                    image_key?: string;
                                                };
                                            };
                                            board_id?: string;
                                            board_type?: number;
                                            raw_code?: string;
                                            board_status?: number;
                                        };
                                    }>;
                                    error_message?: string;
                                    error_code?: number;
                                    tool_call?: {
                                        tool_type?: number;
                                        search?: {
                                            queries?: Array<string>;
                                            references?: Array<{
                                                ref_type?: number;
                                                enterprise?: {
                                                    id?: string;
                                                    source_type?: number;
                                                    title?: string;
                                                    content?: string;
                                                    url?: string;
                                                };
                                                internet?: {
                                                    title?: string;
                                                    summary?: string;
                                                    url?: string;
                                                };
                                            }>;
                                        };
                                    };
                                    references?: Array<{
                                        queries?: Array<string>;
                                        references?: Array<{
                                            ref_type?: number;
                                            enterprise?: {
                                                id?: string;
                                                source_type?: number;
                                                title?: string;
                                                content?: string;
                                                url?: string;
                                            };
                                            internet?: {
                                                title?: string;
                                                summary?: string;
                                                url?: string;
                                            };
                                        }>;
                                    }>;
                                }>;
                                extra?: Record<string, string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/knowledge_qa/answer`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=knowledge_qa&apiName=fetch_doc_info&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=fetch_doc_info&project=search&resource=knowledge_qa&version=v2 document }
             *
             * 根据飞书/Lark 云文档 URL，读取当前用户有权限访问的文档内容与元数据。支持 Docx、Wiki、电子表格、多维表格、幻灯片和云盘文件等类型，返回文档标题、正文、更新时间以及正文引用的图片元数据，并支持长内容分页读取。### 分页说明- 首次请求传入 `url`；如需分页，同时将 `enable_pagination` 设置为 `true`。- `page_size` 用于指定单页正文的 token 预算，服务端会根据允许范围调整。- 当响应中的 `has_more` 为 `true` 时，将 `next_page_token` 作为下一次请求的 `page_token`。
             */
            fetchDocInfo: async (
                payload?: {
                    data?: {
                        url?: string;
                        with_block_id?: boolean;
                        enable_pagination?: boolean;
                        page_token?: string;
                        page_size?: number;
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
                                title?: string;
                                full_content?: string;
                                url?: string;
                                update_time?: string;
                                qa_image_meta_map?: Record<
                                    string,
                                    { image_key?: string }
                                >;
                                next_page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/knowledge_qa/fetch_doc_info`,
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
         * tenant_license
         */
        tenantLicense: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=tenant_license&apiName=launch&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=launch&project=search&resource=tenant_license&version=v2 document }
             */
            launch: async (
                payload?: {
                    data?: {
                        union_id?: string;
                        display_id?: string;
                        is_check_free?: string;
                        is_launch?: string;
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
                                tenant_id?: string;
                                is_launched?: string;
                                is_free?: string;
                                is_data_available?: string;
                                user_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/tenant_license/launch`,
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
         * memory_graph_tool_call
         */
        memoryGraphToolCall: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=memory_graph_tool_call&apiName=personalized_function_call&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=personalized_function_call&project=search&resource=memory_graph_tool_call&version=v2 document }
             */
            personalizedFunctionCall: async (
                payload?: {
                    data?: {
                        tool_name?: string;
                        params?: Record<string, string>;
                        scene?: string;
                        user_id?: string;
                        extra?: Record<string, string>;
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
                                tool_response?: string;
                                extra?: Record<string, string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/memory_graph_tool_call/personalized_function_call`,
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
         * app
         */
        app: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=app&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=app&version=v2 document }
             *
             * 搜索应用
             *
             * 用户可以通过关键字搜索到可见应用，应用可见性与套件内搜索一致。
             */
            create: async (
                payload?: {
                    data: { query: string };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_size?: number;
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
                                items?: Array<string>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/app`,
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
         * doc_wiki
         */
        docWiki: {
            searchWithIterator: async (
                payload?: {
                    data: {
                        query: string;
                        doc_filter?: {
                            creator_ids?: Array<string>;
                            doc_types?: Array<
                                | "DOC"
                                | "SHEET"
                                | "BITABLE"
                                | "MINDNOTE"
                                | "FILE"
                                | "WIKI"
                                | "DOCX"
                                | "FOLDER"
                                | "CATALOG"
                                | "SLIDES"
                                | "SHORTCUT"
                            >;
                            folder_tokens?: Array<string>;
                            only_title?: boolean;
                            open_time?: { start?: number; end?: number };
                            sort_type?:
                                | "DEFAULT_TYPE"
                                | "OPEN_TIME"
                                | "EDIT_TIME"
                                | "EDIT_TIME_ASC"
                                | "ENTITY_CREATE_TIME_ASC"
                                | "ENTITY_CREATE_TIME_DESC"
                                | "CREATE_TIME"
                                | "CREATE_TIME_ASC";
                            create_time?: { start?: number; end?: number };
                            chat_ids?: Array<string>;
                            sharer_ids?: Array<string>;
                            only_comment?: boolean;
                            my_edit_time?: { start?: number; end?: number };
                            my_comment_time?: { start?: number; end?: number };
                            original_creator_ids?: Array<string>;
                        };
                        wiki_filter?: {
                            creator_ids?: Array<string>;
                            doc_types?: Array<
                                | "DOC"
                                | "SHEET"
                                | "BITABLE"
                                | "MINDNOTE"
                                | "FILE"
                                | "WIKI"
                                | "DOCX"
                                | "FOLDER"
                                | "CATALOG"
                                | "SLIDES"
                                | "SHORTCUT"
                            >;
                            space_ids?: Array<string>;
                            only_title?: boolean;
                            open_time?: { start?: number; end?: number };
                            sort_type?:
                                | "DEFAULT_TYPE"
                                | "OPEN_TIME"
                                | "EDIT_TIME"
                                | "EDIT_TIME_ASC"
                                | "ENTITY_CREATE_TIME_ASC"
                                | "ENTITY_CREATE_TIME_DESC"
                                | "CREATE_TIME"
                                | "CREATE_TIME_ASC";
                            create_time?: { start?: number; end?: number };
                            chat_ids?: Array<string>;
                            sharer_ids?: Array<string>;
                            only_comment?: boolean;
                            my_edit_time?: { start?: number; end?: number };
                            my_comment_time?: { start?: number; end?: number };
                            original_creator_ids?: Array<string>;
                        };
                        page_token?: string;
                        page_size?: number;
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
                                `${this.domain}/open-apis/search/v2/doc_wiki/search`,
                                path
                            ),
                            method: "POST",
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
                                                total?: number;
                                                has_more: boolean;
                                                res_units?: Array<{
                                                    title_highlighted?: string;
                                                    summary_highlighted?: string;
                                                    entity_type?:
                                                        | "DOC"
                                                        | "WIKI";
                                                    result_meta?: {
                                                        doc_types?:
                                                            | "DOC"
                                                            | "SHEET"
                                                            | "BITABLE"
                                                            | "MINDNOTE"
                                                            | "FILE"
                                                            | "WIKI"
                                                            | "DOCX"
                                                            | "FOLDER"
                                                            | "CATALOG"
                                                            | "SLIDES"
                                                            | "SHORTCUT";
                                                        update_time?: number;
                                                        url?: string;
                                                        owner_name?: string;
                                                        owner_id?: string;
                                                        is_cross_tenant?: boolean;
                                                        create_time?: number;
                                                        last_open_time?: number;
                                                        edit_user_id?: string;
                                                        edit_user_name?: string;
                                                        token?: string;
                                                        file_type?: string;
                                                        icon_info?: string;
                                                    };
                                                }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=doc_wiki&apiName=search&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=doc_wiki&version=v2 document }
             *
             * 文档搜索
             *
             * 该接口用于根据搜索关键词（query）对当前用户可见的云文档进行搜索
             */
            search: async (
                payload?: {
                    data: {
                        query: string;
                        doc_filter?: {
                            creator_ids?: Array<string>;
                            doc_types?: Array<
                                | "DOC"
                                | "SHEET"
                                | "BITABLE"
                                | "MINDNOTE"
                                | "FILE"
                                | "WIKI"
                                | "DOCX"
                                | "FOLDER"
                                | "CATALOG"
                                | "SLIDES"
                                | "SHORTCUT"
                            >;
                            folder_tokens?: Array<string>;
                            only_title?: boolean;
                            open_time?: { start?: number; end?: number };
                            sort_type?:
                                | "DEFAULT_TYPE"
                                | "OPEN_TIME"
                                | "EDIT_TIME"
                                | "EDIT_TIME_ASC"
                                | "ENTITY_CREATE_TIME_ASC"
                                | "ENTITY_CREATE_TIME_DESC"
                                | "CREATE_TIME"
                                | "CREATE_TIME_ASC";
                            create_time?: { start?: number; end?: number };
                            chat_ids?: Array<string>;
                            sharer_ids?: Array<string>;
                            only_comment?: boolean;
                            my_edit_time?: { start?: number; end?: number };
                            my_comment_time?: { start?: number; end?: number };
                            original_creator_ids?: Array<string>;
                        };
                        wiki_filter?: {
                            creator_ids?: Array<string>;
                            doc_types?: Array<
                                | "DOC"
                                | "SHEET"
                                | "BITABLE"
                                | "MINDNOTE"
                                | "FILE"
                                | "WIKI"
                                | "DOCX"
                                | "FOLDER"
                                | "CATALOG"
                                | "SLIDES"
                                | "SHORTCUT"
                            >;
                            space_ids?: Array<string>;
                            only_title?: boolean;
                            open_time?: { start?: number; end?: number };
                            sort_type?:
                                | "DEFAULT_TYPE"
                                | "OPEN_TIME"
                                | "EDIT_TIME"
                                | "EDIT_TIME_ASC"
                                | "ENTITY_CREATE_TIME_ASC"
                                | "ENTITY_CREATE_TIME_DESC"
                                | "CREATE_TIME"
                                | "CREATE_TIME_ASC";
                            create_time?: { start?: number; end?: number };
                            chat_ids?: Array<string>;
                            sharer_ids?: Array<string>;
                            only_comment?: boolean;
                            my_edit_time?: { start?: number; end?: number };
                            my_comment_time?: { start?: number; end?: number };
                            original_creator_ids?: Array<string>;
                        };
                        page_token?: string;
                        page_size?: number;
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
                                total?: number;
                                has_more: boolean;
                                res_units?: Array<{
                                    title_highlighted?: string;
                                    summary_highlighted?: string;
                                    entity_type?: "DOC" | "WIKI";
                                    result_meta?: {
                                        doc_types?:
                                            | "DOC"
                                            | "SHEET"
                                            | "BITABLE"
                                            | "MINDNOTE"
                                            | "FILE"
                                            | "WIKI"
                                            | "DOCX"
                                            | "FOLDER"
                                            | "CATALOG"
                                            | "SLIDES"
                                            | "SHORTCUT";
                                        update_time?: number;
                                        url?: string;
                                        owner_name?: string;
                                        owner_id?: string;
                                        is_cross_tenant?: boolean;
                                        create_time?: number;
                                        last_open_time?: number;
                                        edit_user_id?: string;
                                        edit_user_name?: string;
                                        token?: string;
                                        file_type?: string;
                                        icon_info?: string;
                                    };
                                }>;
                                page_token?: string;
                                notice?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/doc_wiki/search`,
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
         * memory_hub
         */
        memoryHub: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=memory_hub&apiName=list_memory&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_memory&project=search&resource=memory_hub&version=v2 document }
             *
             * 获取 Memory Hub 记忆列表
             */
            listMemory: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                data?: {
                                    memories?: Array<{
                                        memory_key?: string;
                                        default_variant_key?: string;
                                        name?: string;
                                        description?: string;
                                        showcase?: string;
                                        status?:
                                            | "ready"
                                            | "generating"
                                            | "need_info"
                                            | "failed"
                                            | "disabled";
                                        variants?: Array<{
                                            variant_key?: string;
                                            name?: string;
                                            description?: string;
                                            status?:
                                                | "ready"
                                                | "generating"
                                                | "need_info"
                                                | "failed"
                                                | "disabled";
                                        }>;
                                        detail_entry?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/memory_hub/list_memory`,
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=memory_hub&apiName=get_memory&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_memory&project=search&resource=memory_hub&version=v2 document }
             *
             * 获取 Memory 详情
             */
            getMemory: async (
                payload?: {
                    data?: { memory_key?: string; variant_key?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                data?: {
                                    memory_key?: string;
                                    variant_key?: string;
                                    status?:
                                        | "ready"
                                        | "generating"
                                        | "need_info"
                                        | "failed"
                                        | "disabled";
                                    metadata?: Record<string, string>;
                                    detail_entry?: string;
                                    payload_type?: string;
                                    payload?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/search/v2/memory_hub/get_memory`,
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
        v2: {
            /**
             * connect_data_source
             */
            connectDataSource: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=connect_data_source&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=connect_data_source&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            service_url: string;
                            project_name?: string;
                            display_name?: string;
                            description?: string;
                            icon_url?: string;
                            project_description?: string;
                            contact_email?: string;
                            tenant_name?: string;
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
                                `${this.domain}/open-apis/search/v2/connect_data_sources`,
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
             * data_source
             */
            dataSource: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=search&resource=data_source&version=v2 document }
                 *
                 * 获取数据源
                 *
                 * 获取已经创建的数据源。
                 */
                get: async (
                    payload?: {
                        path: { data_source_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    data_source?: {
                                        id?: string;
                                        name: string;
                                        state?: number;
                                        description?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        is_exceed_quota?: boolean;
                                        icon_url?: string;
                                        template?: string;
                                        searchable_fields?: Array<string>;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        schema_id?: string;
                                        app_id?: string;
                                        connect_type?: number;
                                        connector_param?: {
                                            callback_user_id_type?: number;
                                            callback_endpoint?: string;
                                        };
                                        enable_answer?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/data_sources/:data_source_id`,
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
                            view?: number;
                            page_size?: number;
                            page_token?: string;
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
                                    `${this.domain}/open-apis/search/v2/data_sources`,
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
                                                        id?: string;
                                                        name: string;
                                                        state?: number;
                                                        description?: string;
                                                        create_time?: string;
                                                        update_time?: string;
                                                        is_exceed_quota?: boolean;
                                                        icon_url?: string;
                                                        template?: string;
                                                        searchable_fields?: Array<string>;
                                                        i18n_name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
                                                        };
                                                        i18n_description?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
                                                        };
                                                        schema_id?: string;
                                                        app_id?: string;
                                                        connect_type?: number;
                                                        connector_param?: {
                                                            callback_user_id_type?: number;
                                                            callback_endpoint?: string;
                                                        };
                                                        enable_answer?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=search&resource=data_source&version=v2 document }
                 *
                 * 批量获取数据源
                 *
                 * 批量获取创建的数据源信息。
                 */
                list: async (
                    payload?: {
                        params?: {
                            view?: number;
                            page_size?: number;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        id?: string;
                                        name: string;
                                        state?: number;
                                        description?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        is_exceed_quota?: boolean;
                                        icon_url?: string;
                                        template?: string;
                                        searchable_fields?: Array<string>;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        schema_id?: string;
                                        app_id?: string;
                                        connect_type?: number;
                                        connector_param?: {
                                            callback_user_id_type?: number;
                                            callback_endpoint?: string;
                                        };
                                        enable_answer?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/data_sources`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=search&resource=data_source&version=v2 document }
                 *
                 * 删除数据源
                 *
                 * 删除一个已存在的数据源。
                 */
                delete: async (
                    payload?: {
                        path: { data_source_id: string };
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
                                `${this.domain}/open-apis/search/v2/data_sources/:data_source_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=data_source&version=v2 document }
                 *
                 * 创建数据源
                 *
                 * 创建一个数据源。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            state?: number;
                            description?: string;
                            icon_url?: string;
                            template?: string;
                            searchable_fields?: Array<string>;
                            i18n_name?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            i18n_description?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            schema_id?: string;
                            app_id?: string;
                            connect_type?: number;
                            connector_param?: {
                                callback_user_id_type?: number;
                                callback_endpoint?: string;
                            };
                            enable_answer?: boolean;
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
                                    data_source?: {
                                        id?: string;
                                        name: string;
                                        state?: number;
                                        description?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        is_exceed_quota?: boolean;
                                        icon_url?: string;
                                        template?: string;
                                        searchable_fields?: Array<string>;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        schema_id?: string;
                                        app_id?: string;
                                        connect_type?: number;
                                        connector_param?: {
                                            callback_user_id_type?: number;
                                            callback_endpoint?: string;
                                        };
                                        enable_answer?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/data_sources`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=search&resource=data_source&version=v2 document }
                 *
                 * 修改数据源
                 *
                 * 更新一个已经存在的数据源。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            name?: string;
                            state?: number;
                            description?: string;
                            icon_url?: string;
                            i18n_name?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            i18n_description?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            connector_param?: {
                                callback_user_id_type?: number;
                                callback_endpoint?: string;
                            };
                            enable_answer?: boolean;
                        };
                        path: { data_source_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    data_source?: {
                                        id?: string;
                                        name: string;
                                        state?: number;
                                        description?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        is_exceed_quota?: boolean;
                                        icon_url?: string;
                                        template?: string;
                                        searchable_fields?: Array<string>;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        schema_id?: string;
                                        app_id?: string;
                                        connect_type?: number;
                                        connector_param?: {
                                            callback_user_id_type?: number;
                                            callback_endpoint?: string;
                                        };
                                        enable_answer?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/data_sources/:data_source_id`,
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
             * data_source.item
             */
            dataSourceItem: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=record&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=record&project=search&resource=data_source.item&version=v2 document }
                 */
                record: async (
                    payload?: {
                        path: { data_source_id: string; item_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    record: {
                                        item_id: string;
                                        data_source_id: string;
                                        version: string;
                                        created_at?: string;
                                        updated_at?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items/:item_id/record`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=search&resource=data_source.item&version=v2 document }
                 *
                 * 删除数据项
                 *
                 * 删除数据项。
                 */
                delete: async (
                    payload?: {
                        path: { data_source_id: string; item_id: string };
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
                                `${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items/:item_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=data_source.item&version=v2 document }
                 *
                 * 为指定数据项创建索引
                 *
                 * 索引一条数据记录。
                 */
                create: async (
                    payload?: {
                        data: {
                            id: string;
                            acl: Array<{
                                access?: "allow" | "deny";
                                value?: string;
                                type?:
                                    | "user_id"
                                    | "open_id"
                                    | "union_id"
                                    | "department_id"
                                    | "open_department_id"
                                    | "group_id"
                                    | "app_group_id"
                                    | "user"
                                    | "group";
                            }>;
                            metadata: {
                                title: string;
                                source_url: string;
                                create_time?: number;
                                update_time?: number;
                                source_url_mobile?: string;
                            };
                            structured_data: string;
                            content?: {
                                format?: "html" | "plaintext";
                                content_data?: string;
                            };
                        };
                        path: { data_source_id: string };
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
                                `${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=search&resource=data_source.item&version=v2 document }
                 *
                 * 查询指定数据项
                 *
                 * 获取单个数据记录。
                 */
                get: async (
                    payload?: {
                        path?: { data_source_id?: string; item_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    item: {
                                        id: string;
                                        acl: Array<{
                                            access?: "allow" | "deny";
                                            value?: string;
                                            type?:
                                                | "user_id"
                                                | "open_id"
                                                | "union_id"
                                                | "department_id"
                                                | "open_department_id"
                                                | "group_id"
                                                | "app_group_id"
                                                | "user"
                                                | "group";
                                        }>;
                                        metadata: {
                                            title: string;
                                            source_url: string;
                                            create_time?: number;
                                            update_time?: number;
                                            source_url_mobile?: string;
                                        };
                                        structured_data: string;
                                        content?: {
                                            format?: "html" | "plaintext";
                                            content_data?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items/:item_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=batch_create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=search&resource=data_source.item&version=v2 document }
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            items: Array<{
                                id: string;
                                acl: Array<{
                                    access?: "allow" | "deny";
                                    value?: string;
                                    type?:
                                        | "user_id"
                                        | "open_id"
                                        | "union_id"
                                        | "department_id"
                                        | "open_department_id"
                                        | "group_id"
                                        | "app_group_id"
                                        | "user"
                                        | "group";
                                }>;
                                metadata: {
                                    title: string;
                                    source_url: string;
                                    create_time?: number;
                                    update_time?: number;
                                    source_url_mobile?: string;
                                };
                                structured_data: string;
                                content?: {
                                    format?: "html" | "plaintext";
                                    content_data?: string;
                                };
                            }>;
                        };
                        path: { data_source_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    result: Array<{
                                        item_id: string;
                                        is_success: boolean;
                                        err?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items/batch_create`,
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
             * message
             */
            message: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=message&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=message&version=v2 document }
                 *
                 * 搜索消息
                 *
                 * 用户可以通过关键字搜索可见消息，可见性和套件内搜索一致。
                 */
                create: async (
                    payload?: {
                        data: {
                            query: string;
                            from_ids?: Array<string>;
                            chat_ids?: Array<string>;
                            message_type?: "file" | "image" | "media";
                            at_chatter_ids?: Array<string>;
                            from_type?: "bot" | "user";
                            chat_type?: "group_chat" | "p2p_chat";
                            start_time?: string;
                            end_time?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_size?: number;
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
                                    items?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/message`,
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
             * dataset
             */
            dataset: {
                listWithIterator: async (
                    payload?: {
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
                                    `${this.domain}/open-apis/search/v2/datasets`,
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
                                                    datasets?: Array<{
                                                        dataset_id: string;
                                                        app_id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        chunk_num: number;
                                                        doc_num: number;
                                                        name: string;
                                                        description: string;
                                                        filter_schemas?: Array<{
                                                            field: string;
                                                            type:
                                                                | "list<string>"
                                                                | "string"
                                                                | "int64"
                                                                | "float";
                                                            default_val?: string;
                                                            field_type?:
                                                                | "enum"
                                                                | "range";
                                                        }>;
                                                        model_config?: {
                                                            model_name?: string;
                                                        };
                                                        viewer_app_ids?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=search&resource=dataset&version=v2 document }
                 *
                 * 获取所有数据集
                 *
                 * 获取所有数据集
                 */
                list: async (
                    payload?: {
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
                                    datasets?: Array<{
                                        dataset_id: string;
                                        app_id: string;
                                        create_time: string;
                                        update_time: string;
                                        chunk_num: number;
                                        doc_num: number;
                                        name: string;
                                        description: string;
                                        filter_schemas?: Array<{
                                            field: string;
                                            type:
                                                | "list<string>"
                                                | "string"
                                                | "int64"
                                                | "float";
                                            default_val?: string;
                                            field_type?: "enum" | "range";
                                        }>;
                                        model_config?: { model_name?: string };
                                        viewer_app_ids?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/datasets`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=search&resource=dataset&version=v2 document }
                 *
                 * 获取数据集
                 *
                 * 获取数据集
                 */
                get: async (
                    payload?: {
                        path: { dataset_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    dataset: {
                                        dataset_id: string;
                                        app_id: string;
                                        create_time: string;
                                        update_time: string;
                                        chunk_num: number;
                                        doc_num: number;
                                        name: string;
                                        description: string;
                                        filter_schemas?: Array<{
                                            field: string;
                                            type:
                                                | "list<string>"
                                                | "string"
                                                | "int64"
                                                | "float";
                                            default_val?: string;
                                            field_type?: "enum" | "range";
                                        }>;
                                        model_config?: { model_name?: string };
                                        viewer_app_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/datasets/:dataset_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=search&resource=dataset&version=v2 document }
                 *
                 * 删除数据集
                 *
                 * 删除数据集
                 */
                delete: async (
                    payload?: {
                        path: { dataset_id: string };
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
                                `${this.domain}/open-apis/search/v2/datasets/:dataset_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=dataset&version=v2 document }
                 *
                 * 创建数据集
                 *
                 * 创建数据集
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            description: string;
                            filter_schemas?: Array<{
                                field: string;
                                type:
                                    | "list<string>"
                                    | "string"
                                    | "int64"
                                    | "float";
                                default_val?: string;
                                field_type?: "enum" | "range";
                            }>;
                            model_config?: { model_name?: string };
                            viewer_app_ids?: Array<string>;
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
                                    dataset?: {
                                        dataset_id: string;
                                        app_id: string;
                                        create_time: string;
                                        update_time: string;
                                        chunk_num: number;
                                        doc_num: number;
                                        name: string;
                                        description: string;
                                        filter_schemas?: Array<{
                                            field: string;
                                            type:
                                                | "list<string>"
                                                | "string"
                                                | "int64"
                                                | "float";
                                            default_val?: string;
                                            field_type?: "enum" | "range";
                                        }>;
                                        model_config?: { model_name?: string };
                                        viewer_app_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/datasets`,
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
             * dataset.doc
             */
            datasetDoc: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=search&resource=dataset.doc&version=v2 document }
                 *
                 * 获取数据集文档
                 *
                 * 获取数据集文档
                 */
                get: async (
                    payload?: {
                        path: { dataset_id: string; doc_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    doc?: {
                                        doc_id: string;
                                        filter_data?: string;
                                        chunks: Array<{
                                            chunk_id: string;
                                            doc_id: string;
                                            dataset_id: string;
                                            update_time?: string;
                                            content: string;
                                            filter_data: string;
                                            score?: number;
                                            token_num?: number;
                                            overlength?: boolean;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs/:doc_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=dataset.doc&version=v2 document }
                 *
                 * 数据集文档搜索
                 *
                 * 从数据集文本块中搜索与查询语句语义相关的结果。
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            filter_param?: string;
                            count: number;
                            disable_rank?: boolean;
                            model_param?: {
                                encoder_name?: string;
                                ranker_name?: string;
                                filter_name?: string;
                                booster_name?: string;
                                passage_language?: string;
                            };
                        };
                        path: { dataset_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        chunk_id: string;
                                        doc_id: string;
                                        dataset_id: string;
                                        update_time?: string;
                                        content: string;
                                        filter_data: string;
                                        score?: number;
                                        token_num?: number;
                                        overlength?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=batch_delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=search&resource=dataset.doc&version=v2 document }
                 *
                 * 批量删除数据集文档
                 *
                 * 批量删除数据集文档
                 */
                batchDelete: async (
                    payload?: {
                        data: { doc_ids: Array<string> };
                        path: { dataset_id: string };
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
                                `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=batch_create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=search&resource=dataset.doc&version=v2 document }
                 *
                 * 批量创建数据集文档
                 *
                 * 批量创建数据集文档
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            docs_param: Array<{
                                doc_id: string;
                                filter_data?: string;
                                content?: string;
                                chunks?: Array<string>;
                                overlength_handle_type?: number;
                            }>;
                        };
                        path: { dataset_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    docs?: Array<{
                                        doc_id: string;
                                        filter_data?: string;
                                        chunks: Array<{
                                            chunk_id: string;
                                            doc_id: string;
                                            dataset_id: string;
                                            update_time?: string;
                                            content: string;
                                            filter_data: string;
                                            score?: number;
                                            token_num?: number;
                                            overlength?: boolean;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=search&resource=dataset.doc&version=v2 document }
                 *
                 * 删除数据集文档
                 *
                 * 删除数据集文档
                 */
                delete: async (
                    payload?: {
                        path: { dataset_id: string; doc_id: string };
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
                                `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs/:doc_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dataset.doc&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=dataset.doc&version=v2 document }
                 *
                 * 创建数据集文档
                 *
                 * 创建数据集文档
                 */
                create: async (
                    payload?: {
                        data: {
                            doc_param: {
                                doc_id: string;
                                filter_data?: string;
                                content?: string;
                                chunks?: Array<string>;
                                overlength_handle_type?: number;
                            };
                        };
                        path: { dataset_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    doc?: {
                                        doc_id: string;
                                        filter_data?: string;
                                        chunks: Array<{
                                            chunk_id: string;
                                            doc_id: string;
                                            dataset_id: string;
                                            update_time?: string;
                                            content: string;
                                            filter_data: string;
                                            score?: number;
                                            token_num?: number;
                                            overlength?: boolean;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/datasets/:dataset_id/docs`,
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
             * qa
             */
            qa: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=qa&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=qa&version=v2 document }
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            passages: Array<string>;
                            model_config: {
                                model_name: string;
                                prompt?: string;
                                max_token?: number;
                                temperature?: number;
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
                                data?: { answer: string; prompt?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/qa/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=qa&apiName=paraphrase&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=paraphrase&project=search&resource=qa&version=v2 document }
                 */
                paraphrase: async (
                    payload?: {
                        data: { text: string; strategy: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        text: string;
                                        extra?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/qa/paraphrase`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=qa&apiName=embedding&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=embedding&project=search&resource=qa&version=v2 document }
                 *
                 * 文本向量化
                 *
                 * 把文本编码成向量
                 */
                embedding: async (
                    payload?: {
                        data: {
                            passages: Array<string>;
                            model_name?: string;
                            overflow_strategy?:
                                | "truncate"
                                | "split_then_average";
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
                                data?: { embeddings: Array<Array<number>> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/qa/embedding`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=qa&apiName=rank&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rank&project=search&resource=qa&version=v2 document }
                 *
                 * 文本相关性排序
                 *
                 * 判断passage是否可以回答query
                 */
                rank: async (
                    payload?: {
                        data: {
                            query: string;
                            passages: Array<string>;
                            model_name: string;
                            overflow_strategy?: "truncate" | "split_then_max";
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
                                data?: { scores: Array<number> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/qa/rank`,
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
             * data_connector
             */
            dataConnector: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_connector&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=data_connector&version=v2 document }
                 */
                search: async (
                    payload?: {
                        data?: {
                            query?: string;
                            datasource_ids?: Array<string>;
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
                                data?: { data?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/data_connector/search`,
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
             * suite_dataset
             */
            suiteDataset: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=suite_dataset&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=suite_dataset&version=v2 document }
                 *
                 * 套件数据集搜索
                 *
                 * 从套件数据集搜索与查询语句语义相关的文本块。
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            count?: number;
                            passage_param: {
                                doc_param?: {
                                    searchable?: boolean;
                                    doc_tokens?: Array<string>;
                                    folder_tokens?: Array<string>;
                                    obj_ids?: Array<string>;
                                    disable_search_link?: boolean;
                                    excluded_obj_ids?: Array<string>;
                                    excluded_doc_tokens?: Array<string>;
                                    excluded_folder_tokens?: Array<string>;
                                    enable_cross_tenant?: boolean;
                                    only_search_public?: boolean;
                                };
                                wiki_param?: {
                                    searchable?: boolean;
                                    space_ids?: Array<string>;
                                    obj_ids?: Array<string>;
                                    wiki_tokens?: Array<string>;
                                    node_tokens?: Array<string>;
                                    excluded_space_ids?: Array<string>;
                                    excluded_obj_ids?: Array<string>;
                                    excluded_wiki_tokens?: Array<string>;
                                    excluded_node_tokens?: Array<string>;
                                    enable_cross_tenant?: boolean;
                                    only_search_public?: boolean;
                                };
                                web_param?: {
                                    searchable?: boolean;
                                    domains?: Array<string>;
                                };
                                helpdesk_param?: {
                                    searchable?: boolean;
                                    helpdesk_ids?: Array<string>;
                                };
                                lingo_param?: { searchable?: boolean };
                                message_param?: {
                                    searchable?: boolean;
                                    chat_ids?: Array<string>;
                                    excluded_passage_ids?: Array<string>;
                                    excluded_chat_ids?: Array<string>;
                                    excluded_message_ids?: Array<string>;
                                };
                            };
                            model_param?: {
                                encoder_name?: string;
                                ranker_name?: string;
                                filter_name?: string;
                                booster_name?: string;
                                passage_language?: string;
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
                                    passages?: Array<{
                                        passage_id: string;
                                        passage_source: number;
                                        content: string;
                                        title?: string;
                                        url?: string;
                                        score?: number;
                                        extra?: string;
                                        content_for_llm?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/suite_dataset/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=suite_dataset&apiName=split&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=split&project=search&resource=suite_dataset&version=v2 document }
                 *
                 * 套件数据集切片
                 *
                 * 支持套件内doc/docx/sheet/base的文档切片。
                 */
                split: async (
                    payload?: {
                        data: {
                            url: string;
                            split_strategy?: "LeafToRoot" | "NaturalOrder";
                            passage_max_token_num?: number;
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
                                    passages?: Array<{
                                        passage_id?: string;
                                        obj_id?: string;
                                        content?: string;
                                        num_tokens?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/suite_dataset/split`,
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
             * nls
             */
            nls: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=nls&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=nls&version=v2 document }
                 *
                 * 自然语言搜索
                 *
                 * 输入自然语言文本，获取套件内相关实体的搜索结果。
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            model_config: { model_name: string };
                            user_info?: {
                                user_language: string;
                                timezone?: string;
                                user_id?: string;
                                user_open_id?: string;
                                tenant_id?: string;
                                locale?: string;
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
                                    entities: Array<string>;
                                    explanatory_tag?: string;
                                    search_dsl?: string;
                                    additional_task?: string;
                                    nls_score?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/nls/search`,
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
             * dialog
             */
            dialog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dialog&apiName=card_callback&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=card_callback&project=search&resource=dialog&version=v2 document }
                 */
                cardCallback: async (
                    payload?: {
                        data?: {
                            open_chat_id?: string;
                            open_message_id?: string;
                            token?: string;
                            action?: {
                                tag?: string;
                                value?: {
                                    strategy_info?: string;
                                    agent_id?: string;
                                    agent_type?: number;
                                    response_type?: number;
                                    session_id?: string;
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
                                    presents?: Array<{
                                        type:
                                            | "rich_text"
                                            | "card"
                                            | "template_card";
                                        body: string;
                                        operation_type?: "UPDATE" | "APPEND";
                                        interactable?: boolean;
                                        operation_url?: string;
                                        callback_url?: string;
                                        callback_info?: string;
                                        card_template_id?: string;
                                        card_variables?: {};
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/dialog/card_callback`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dialog&apiName=present_data_callback&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=present_data_callback&project=search&resource=dialog&version=v2 document }
                 */
                presentDataCallback: async (
                    payload?: {
                        data: {
                            message_id: string;
                            status: {
                                from_status?: string;
                                to_status?: string;
                            };
                            callback_info?: string;
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
                                `${this.domain}/open-apis/search/v2/dialog/present_data_callback`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dialog&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=dialog&version=v2 document }
                 */
                search: async (
                    payload?: {
                        data?: {
                            tool_raw_instruction?: string;
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                extra?: {
                                    grounding_id?: string;
                                    model_key?: string;
                                    specified_obj_ids?: string;
                                    suggest_query_id?: string;
                                    button_send_message_info?: string;
                                    button_regenerate_message?: string;
                                    enterprise_qa_channel_info?: string;
                                };
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: "feishu" | "lark";
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    msg_id?: string;
                                    agent_id?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                memory?: Array<{
                                    role?: "human" | "ai" | "system";
                                    content?: string;
                                }>;
                                scenario?: string;
                                work_mode?: number;
                                tool_raw_instruction?: string;
                            };
                            agent_type?: number;
                            response_type?: number;
                            passage_param?: {
                                doc_param?: {
                                    searchable?: boolean;
                                    doc_tokens?: Array<string>;
                                    folder_tokens?: Array<string>;
                                    obj_ids?: Array<string>;
                                    disable_search_link?: boolean;
                                    excluded_obj_ids?: Array<string>;
                                    excluded_doc_tokens?: Array<string>;
                                    excluded_folder_tokens?: Array<string>;
                                    enable_cross_tenant?: boolean;
                                    only_search_public?: boolean;
                                };
                                wiki_param?: {
                                    searchable?: boolean;
                                    space_ids?: Array<string>;
                                    obj_ids?: Array<string>;
                                    wiki_tokens?: Array<string>;
                                    node_tokens?: Array<string>;
                                    excluded_space_ids?: Array<string>;
                                    excluded_obj_ids?: Array<string>;
                                    excluded_wiki_tokens?: Array<string>;
                                    excluded_node_tokens?: Array<string>;
                                    enable_cross_tenant?: boolean;
                                    only_search_public?: boolean;
                                };
                                web_param?: {
                                    searchable?: boolean;
                                    domains?: Array<string>;
                                };
                                helpdesk_param?: {
                                    searchable?: boolean;
                                    helpdesk_ids?: Array<string>;
                                };
                                lingo_param?: { searchable?: boolean };
                                message_param?: {
                                    searchable?: boolean;
                                    chat_ids?: Array<string>;
                                    excluded_passage_ids?: Array<string>;
                                    excluded_chat_ids?: Array<string>;
                                    excluded_message_ids?: Array<string>;
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
                                    hint?: string;
                                    present?: {
                                        type:
                                            | "rich_text"
                                            | "card"
                                            | "template_card";
                                        body: string;
                                        operation_type?: "UPDATE" | "APPEND";
                                        interactable?: boolean;
                                        operation_url?: string;
                                        callback_url?: string;
                                        callback_info?: string;
                                        card_template_id?: string;
                                        card_variables?: {};
                                    };
                                    rag_answer_response?: {
                                        answer?: string;
                                        passages?: Array<{
                                            passage_id: string;
                                            passage_source: number;
                                            content: string;
                                            title?: string;
                                            url?: string;
                                            score?: number;
                                            extra?: string;
                                            content_for_llm?: string;
                                        }>;
                                        probe?: {
                                            hit_authority?: boolean;
                                            hit_confidence_warn?: boolean;
                                            hit_llm_reject?: boolean;
                                        };
                                    };
                                    response_type?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/dialog/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=dialog&apiName=stream_search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=stream_search&project=search&resource=dialog&version=v2 document }
                 */
                streamSearch: async (
                    payload?: {
                        data?: {
                            tool_raw_instruction?: string;
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                extra?: {
                                    grounding_id?: string;
                                    model_key?: string;
                                    specified_obj_ids?: string;
                                    suggest_query_id?: string;
                                    button_send_message_info?: string;
                                    button_regenerate_message?: string;
                                    enterprise_qa_channel_info?: string;
                                };
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: "feishu" | "lark";
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    msg_id?: string;
                                    agent_id?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                memory?: Array<{
                                    role?: "human" | "ai" | "system";
                                    content?: string;
                                }>;
                                scenario?: string;
                                work_mode?: number;
                                tool_raw_instruction?: string;
                            };
                            agent_type?: number;
                            response_type?: number;
                            passage_param?: {
                                doc_param?: {
                                    searchable?: boolean;
                                    doc_tokens?: Array<string>;
                                    folder_tokens?: Array<string>;
                                    obj_ids?: Array<string>;
                                    disable_search_link?: boolean;
                                    excluded_obj_ids?: Array<string>;
                                    excluded_doc_tokens?: Array<string>;
                                    excluded_folder_tokens?: Array<string>;
                                    enable_cross_tenant?: boolean;
                                    only_search_public?: boolean;
                                };
                                wiki_param?: {
                                    searchable?: boolean;
                                    space_ids?: Array<string>;
                                    obj_ids?: Array<string>;
                                    wiki_tokens?: Array<string>;
                                    node_tokens?: Array<string>;
                                    excluded_space_ids?: Array<string>;
                                    excluded_obj_ids?: Array<string>;
                                    excluded_wiki_tokens?: Array<string>;
                                    excluded_node_tokens?: Array<string>;
                                    enable_cross_tenant?: boolean;
                                    only_search_public?: boolean;
                                };
                                web_param?: {
                                    searchable?: boolean;
                                    domains?: Array<string>;
                                };
                                helpdesk_param?: {
                                    searchable?: boolean;
                                    helpdesk_ids?: Array<string>;
                                };
                                lingo_param?: { searchable?: boolean };
                                message_param?: {
                                    searchable?: boolean;
                                    chat_ids?: Array<string>;
                                    excluded_passage_ids?: Array<string>;
                                    excluded_chat_ids?: Array<string>;
                                    excluded_message_ids?: Array<string>;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/dialog/stream_search`,
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
             * schema
             */
            schema: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=search&resource=schema&version=v2 document }
                 *
                 * 获取数据范式
                 *
                 * 获取单个数据范式。
                 */
                get: async (
                    payload?: {
                        path: { schema_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    schema?: {
                                        properties: Array<{
                                            name: string;
                                            type:
                                                | "text"
                                                | "int"
                                                | "tag"
                                                | "timestamp"
                                                | "double"
                                                | "tinytext"
                                                | "user_ids";
                                            is_searchable?: boolean;
                                            is_sortable?: boolean;
                                            is_returnable?: boolean;
                                            sort_options?: {
                                                priority?: number;
                                                order?: "asc" | "desc";
                                            };
                                            type_definitions?: {
                                                tag?: Array<{
                                                    name: string;
                                                    color:
                                                        | "red"
                                                        | "green"
                                                        | "blue"
                                                        | "grey"
                                                        | "yellow";
                                                    text: string;
                                                }>;
                                                user_ids?: {
                                                    id_type:
                                                        | "open_id"
                                                        | "union_id"
                                                        | "user_id";
                                                };
                                            };
                                            search_options?: {
                                                enable_semantic_match?: boolean;
                                                enable_exact_match?: boolean;
                                                enable_prefix_match?: boolean;
                                                enable_number_suffix_match?: boolean;
                                                enable_camel_match?: boolean;
                                            };
                                            is_filterable?: boolean;
                                            filter_options?: {
                                                display_name: string;
                                                i18n_display_name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                                option_mode?:
                                                    | "single"
                                                    | "multiple";
                                                associated_smart_filter?:
                                                    | "from"
                                                    | "date";
                                                filter_type?:
                                                    | "user"
                                                    | "time"
                                                    | "searchable"
                                                    | "predefine_enum";
                                                predefine_enum_values?: Array<{
                                                    name: string;
                                                    text: string;
                                                }>;
                                                enable_client_filter?: boolean;
                                                reference_datasource_id?: string;
                                            };
                                            answer_option?: {
                                                is_searchable?: boolean;
                                                is_returnable?: boolean;
                                            };
                                            desc?: string;
                                        }>;
                                        display: {
                                            card_key: "search_common_card";
                                            fields_mapping?: Array<{
                                                display_field: string;
                                                data_field: string;
                                            }>;
                                        };
                                        schema_id: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/schemas/:schema_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=search&resource=schema&version=v2 document }
                 *
                 * 删除数据范式
                 *
                 * 删除已存在的数据范式。
                 */
                delete: async (
                    payload?: {
                        path: { schema_id: string };
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
                                `${this.domain}/open-apis/search/v2/schemas/:schema_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=schema&version=v2 document }
                 *
                 * 创建数据范式
                 *
                 * 创建一个数据范式。
                 */
                create: async (
                    payload?: {
                        data: {
                            properties: Array<{
                                name: string;
                                type:
                                    | "text"
                                    | "int"
                                    | "tag"
                                    | "timestamp"
                                    | "double"
                                    | "tinytext"
                                    | "user_ids";
                                is_searchable?: boolean;
                                is_sortable?: boolean;
                                is_returnable?: boolean;
                                sort_options?: {
                                    priority?: number;
                                    order?: "asc" | "desc";
                                };
                                type_definitions?: {
                                    tag?: Array<{
                                        name: string;
                                        color:
                                            | "red"
                                            | "green"
                                            | "blue"
                                            | "grey"
                                            | "yellow";
                                        text: string;
                                    }>;
                                    user_ids?: {
                                        id_type:
                                            | "open_id"
                                            | "union_id"
                                            | "user_id";
                                    };
                                };
                                search_options?: {
                                    enable_semantic_match?: boolean;
                                    enable_exact_match?: boolean;
                                    enable_prefix_match?: boolean;
                                    enable_number_suffix_match?: boolean;
                                    enable_camel_match?: boolean;
                                };
                                is_filterable?: boolean;
                                filter_options?: {
                                    display_name: string;
                                    i18n_display_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    option_mode?: "single" | "multiple";
                                    associated_smart_filter?: "from" | "date";
                                    filter_type?:
                                        | "user"
                                        | "time"
                                        | "searchable"
                                        | "predefine_enum";
                                    predefine_enum_values?: Array<{
                                        name: string;
                                        text: string;
                                    }>;
                                    enable_client_filter?: boolean;
                                    reference_datasource_id?: string;
                                };
                                answer_option?: {
                                    is_searchable?: boolean;
                                    is_returnable?: boolean;
                                };
                                desc?: string;
                            }>;
                            display: {
                                card_key: "search_common_card";
                                fields_mapping?: Array<{
                                    display_field: string;
                                    data_field: string;
                                }>;
                            };
                            schema_id: string;
                        };
                        params?: { validate_only?: boolean };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    schema?: {
                                        properties: Array<{
                                            name: string;
                                            type:
                                                | "text"
                                                | "int"
                                                | "tag"
                                                | "timestamp"
                                                | "double"
                                                | "tinytext"
                                                | "user_ids";
                                            is_searchable?: boolean;
                                            is_sortable?: boolean;
                                            is_returnable?: boolean;
                                            sort_options?: {
                                                priority?: number;
                                                order?: "asc" | "desc";
                                            };
                                            type_definitions?: {
                                                tag?: Array<{
                                                    name: string;
                                                    color:
                                                        | "red"
                                                        | "green"
                                                        | "blue"
                                                        | "grey"
                                                        | "yellow";
                                                    text: string;
                                                }>;
                                                user_ids?: {
                                                    id_type:
                                                        | "open_id"
                                                        | "union_id"
                                                        | "user_id";
                                                };
                                            };
                                            search_options?: {
                                                enable_semantic_match?: boolean;
                                                enable_exact_match?: boolean;
                                                enable_prefix_match?: boolean;
                                                enable_number_suffix_match?: boolean;
                                                enable_camel_match?: boolean;
                                            };
                                            is_filterable?: boolean;
                                            filter_options?: {
                                                display_name: string;
                                                i18n_display_name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                                option_mode?:
                                                    | "single"
                                                    | "multiple";
                                                associated_smart_filter?:
                                                    | "from"
                                                    | "date";
                                                filter_type?:
                                                    | "user"
                                                    | "time"
                                                    | "searchable"
                                                    | "predefine_enum";
                                                predefine_enum_values?: Array<{
                                                    name: string;
                                                    text: string;
                                                }>;
                                                enable_client_filter?: boolean;
                                                reference_datasource_id?: string;
                                            };
                                            answer_option?: {
                                                is_searchable?: boolean;
                                                is_returnable?: boolean;
                                            };
                                            desc?: string;
                                        }>;
                                        display: {
                                            card_key: "search_common_card";
                                            fields_mapping?: Array<{
                                                display_field: string;
                                                data_field: string;
                                            }>;
                                        };
                                        schema_id: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/schemas`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=search&resource=schema&version=v2 document }
                 *
                 * 修改数据范式
                 *
                 * 修改数据范式。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            display?: {
                                card_key: "search_common_card";
                                fields_mapping?: Array<{
                                    display_field: string;
                                    data_field: string;
                                }>;
                            };
                            properties?: Array<{
                                name: string;
                                desc?: string;
                                answer_option?: {
                                    is_searchable?: boolean;
                                    is_returnable?: boolean;
                                };
                            }>;
                        };
                        path: { schema_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    schema?: {
                                        properties: Array<{
                                            name: string;
                                            type:
                                                | "text"
                                                | "int"
                                                | "tag"
                                                | "timestamp"
                                                | "double"
                                                | "tinytext"
                                                | "user_ids";
                                            is_searchable?: boolean;
                                            is_sortable?: boolean;
                                            is_returnable?: boolean;
                                            sort_options?: {
                                                priority?: number;
                                                order?: "asc" | "desc";
                                            };
                                            type_definitions?: {
                                                tag?: Array<{
                                                    name: string;
                                                    color:
                                                        | "red"
                                                        | "green"
                                                        | "blue"
                                                        | "grey"
                                                        | "yellow";
                                                    text: string;
                                                }>;
                                                user_ids?: {
                                                    id_type:
                                                        | "open_id"
                                                        | "union_id"
                                                        | "user_id";
                                                };
                                            };
                                            search_options?: {
                                                enable_semantic_match?: boolean;
                                                enable_exact_match?: boolean;
                                                enable_prefix_match?: boolean;
                                                enable_number_suffix_match?: boolean;
                                                enable_camel_match?: boolean;
                                            };
                                            is_filterable?: boolean;
                                            filter_options?: {
                                                display_name: string;
                                                i18n_display_name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                                option_mode?:
                                                    | "single"
                                                    | "multiple";
                                                associated_smart_filter?:
                                                    | "from"
                                                    | "date";
                                                filter_type?:
                                                    | "user"
                                                    | "time"
                                                    | "searchable"
                                                    | "predefine_enum";
                                                predefine_enum_values?: Array<{
                                                    name: string;
                                                    text: string;
                                                }>;
                                                enable_client_filter?: boolean;
                                                reference_datasource_id?: string;
                                            };
                                            answer_option?: {
                                                is_searchable?: boolean;
                                                is_returnable?: boolean;
                                            };
                                            desc?: string;
                                        }>;
                                        display: {
                                            card_key: "search_common_card";
                                            fields_mapping?: Array<{
                                                display_field: string;
                                                data_field: string;
                                            }>;
                                        };
                                        schema_id: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/schemas/:schema_id`,
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
             * ci
             */
            ci: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=ci&apiName=post&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=post&project=search&resource=ci&version=v2 document }
                 *
                 * 获取人员协作亲密度
                 *
                 * 获取用户密切协作的人员列表及协作亲密度。
                 *
                 * 接口只返回同企业的在职用户。
                 */
                post: async (
                    payload?: {
                        data: {
                            user_id: string;
                            top_k?: number;
                            start_time_filter?: string;
                            end_time_filter?: string;
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
                                    simple_related_users: Array<{
                                        user_id: string;
                                        score: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/ci/post`,
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
             * rag_answer
             */
            ragAnswer: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=rag_answer&apiName=fetch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=fetch&project=search&resource=rag_answer&version=v2 document }
                 */
                fetch: async (
                    payload?: {
                        data?: { query?: string; scene?: number };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    rag_answer?: {
                                        answer?: string;
                                        reasoning_content?: string;
                                        passages?: Array<{
                                            passage_id: string;
                                            passage_source: number;
                                            content: string;
                                            title?: string;
                                            url?: string;
                                            score?: number;
                                            extra?: string;
                                            content_for_llm?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/rag_answer/fetch`,
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
             * knowledge_qa
             */
            knowledgeQa: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=knowledge_qa&apiName=image&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=image&project=search&resource=knowledge_qa&version=v2 document }
                 *
                 * 答案图片下载
                 *
                 * 使用[端到端问答](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/knowledge_qa/answer)或[端到端流式问答](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/knowledge_qa/stream_answer)时，答案中的图片可通过此接口下载。;;
                 */
                image: async (
                    payload?: {
                        path: { image_key: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/knowledge_qa/images/:image_key`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=knowledge_qa&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=knowledge_qa&version=v2 document }
                 *
                 * 向量搜索
                 *
                 * 根据用户的问题，返回相关的**参考资料内容**。;;
                 */
                search: async (
                    payload?: {
                        data?: {
                            query?: string;
                            enterprise_knowledge_source?: {
                                space?: {
                                    searchable?: boolean;
                                    filter?: {
                                        doc_tokens?: Array<string>;
                                        folder_tokens?: Array<string>;
                                    };
                                    reject?: {
                                        doc_tokens?: Array<string>;
                                        folder_tokens?: Array<string>;
                                    };
                                };
                                wiki?: {
                                    searchable: boolean;
                                    filter?: {
                                        wiki_tokens?: Array<string>;
                                        node_tokens?: Array<string>;
                                        space_ids?: Array<string>;
                                    };
                                    reject?: {
                                        wiki_tokens?: Array<string>;
                                        node_tokens?: Array<string>;
                                        space_ids?: Array<string>;
                                    };
                                };
                                message?: {
                                    searchable?: boolean;
                                    filter?: {
                                        chat_ids?: Array<string>;
                                        time_range?: {
                                            start?: number;
                                            end?: number;
                                        };
                                    };
                                    reject?: {
                                        message_ids?: Array<string>;
                                        chat_ids?: Array<string>;
                                    };
                                };
                                helpdesk_faq?: {
                                    searchable?: boolean;
                                    filter?: { helpdesk_ids?: Array<string> };
                                };
                                lingo?: { searchable?: boolean };
                                comment?: {
                                    wiki_searchable?: boolean;
                                    space_searchable?: boolean;
                                };
                                minutes?: { searchable?: boolean };
                                mail?: { searchable?: boolean };
                                approval?: { searchable?: boolean };
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
                                    passages?: Array<{
                                        id?: string;
                                        source_type?: number;
                                        title?: string;
                                        content?: string;
                                        url?: string;
                                        score?: number;
                                    }>;
                                    extra?: Record<string, string>;
                                    passages_ignore_filter?: Array<{
                                        id?: string;
                                        source_type?: number;
                                        title?: string;
                                        content?: string;
                                        url?: string;
                                        score?: number;
                                    }>;
                                    references?: {
                                        enterprise_refs?: Array<{
                                            id?: string;
                                            source_type?: number;
                                            title?: string;
                                            content?: string;
                                            url?: string;
                                        }>;
                                        internet_refs?: Array<{
                                            title?: string;
                                            summary?: string;
                                            url?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/knowledge_qa/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=knowledge_qa&apiName=stream_answer&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=stream_answer&project=search&resource=knowledge_qa&version=v2 document }
                 *
                 * 知识问答（流式）
                 *
                 * 根据用户的问题，流式返回**带引用的答案**以及**参考资料预览**。;;;
                 *
                 * 流式接口基于 HTTP SSE 协议。请求头中的`Content-Type`需要修改为`text/plain`。;;## 高级功能;- **可选大模型**：支持豆包、DeepSeek-R1。详见 ==model_type== 参数。;- **可选知识范围**：详见 ==knowledge_scope== 和 ==enterprise_knowledge_source== 参数。;- **多模态能力**：结合云文档、知识库内的**画板、图片**的内容理解，返回**图文结合**的答案。详见 ==enable_image== 参数。
                 */
                streamAnswer: async (
                    payload?: {
                        data: {
                            query: string;
                            enable_image?: boolean;
                            knowledge_scope:
                                | "enterprise"
                                | "internet"
                                | "llm"
                                | "hybrid";
                            enterprise_knowledge_source?: {
                                space?: {
                                    searchable?: boolean;
                                    filter?: {
                                        doc_tokens?: Array<string>;
                                        folder_tokens?: Array<string>;
                                    };
                                    reject?: {
                                        doc_tokens?: Array<string>;
                                        folder_tokens?: Array<string>;
                                    };
                                };
                                wiki?: {
                                    searchable: boolean;
                                    filter?: {
                                        wiki_tokens?: Array<string>;
                                        node_tokens?: Array<string>;
                                        space_ids?: Array<string>;
                                    };
                                    reject?: {
                                        wiki_tokens?: Array<string>;
                                        node_tokens?: Array<string>;
                                        space_ids?: Array<string>;
                                    };
                                };
                                message?: {
                                    searchable?: boolean;
                                    filter?: {
                                        chat_ids?: Array<string>;
                                        time_range?: {
                                            start?: number;
                                            end?: number;
                                        };
                                    };
                                    reject?: {
                                        message_ids?: Array<string>;
                                        chat_ids?: Array<string>;
                                    };
                                };
                                helpdesk_faq?: {
                                    searchable?: boolean;
                                    filter?: { helpdesk_ids?: Array<string> };
                                };
                                lingo?: { searchable?: boolean };
                                comment?: {
                                    wiki_searchable?: boolean;
                                    space_searchable?: boolean;
                                };
                                minutes?: { searchable?: boolean };
                                mail?: { searchable?: boolean };
                                approval?: { searchable?: boolean };
                            };
                            extra?: { locale?: string; timezone?: string };
                            model_type:
                                | "doubao"
                                | "deepseek"
                                | "doubao_thinking"
                                | "doubao_auto_thinking";
                            history_messages?: Array<{
                                role: number;
                                content: string;
                            }>;
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
                                    id: number;
                                    event: "pending" | "finished" | "failed";
                                    data?: {
                                        answer?: string;
                                        reasoning_content?: string;
                                        status_code?: number;
                                        status_message?: string;
                                        references?: {
                                            enterprise_refs?: Array<{
                                                id?: string;
                                                source_type?: number;
                                                title?: string;
                                                content?: string;
                                                url?: string;
                                            }>;
                                            internet_refs?: Array<{
                                                title?: string;
                                                summary?: string;
                                                url?: string;
                                            }>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/knowledge_qa/stream_answer`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=knowledge_qa&apiName=answer&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=answer&project=search&resource=knowledge_qa&version=v2 document }
                 *
                 * 知识问答
                 *
                 * 根据用户的问题，返回**带引用的答案**以及**参考资料预览**。;;;
                 *
                 * ## 高级功能;- **可选大模型**：支持豆包、DeepSeek-R1 等。详见 ==model_type== 参数。;- **可选知识范围**：详见 ==knowledge_scope== 和 ==enterprise_knowledge_source== 参数。;- **多模态能力**：结合云文档、知识库内的**画板、图片**的内容理解，返回**图文结合**的答案。详见 ==enable_image== 参数。
                 */
                answer: async (
                    payload?: {
                        data: {
                            query: string;
                            enable_image?: boolean;
                            knowledge_scope:
                                | "enterprise"
                                | "internet"
                                | "llm"
                                | "hybrid";
                            enterprise_knowledge_source?: {
                                space?: {
                                    searchable?: boolean;
                                    filter?: {
                                        doc_tokens?: Array<string>;
                                        folder_tokens?: Array<string>;
                                    };
                                    reject?: {
                                        doc_tokens?: Array<string>;
                                        folder_tokens?: Array<string>;
                                    };
                                };
                                wiki?: {
                                    searchable: boolean;
                                    filter?: {
                                        wiki_tokens?: Array<string>;
                                        node_tokens?: Array<string>;
                                        space_ids?: Array<string>;
                                    };
                                    reject?: {
                                        wiki_tokens?: Array<string>;
                                        node_tokens?: Array<string>;
                                        space_ids?: Array<string>;
                                    };
                                };
                                message?: {
                                    searchable?: boolean;
                                    filter?: {
                                        chat_ids?: Array<string>;
                                        time_range?: {
                                            start?: number;
                                            end?: number;
                                        };
                                    };
                                    reject?: {
                                        message_ids?: Array<string>;
                                        chat_ids?: Array<string>;
                                    };
                                };
                                helpdesk_faq?: {
                                    searchable?: boolean;
                                    filter?: { helpdesk_ids?: Array<string> };
                                };
                                lingo?: { searchable?: boolean };
                                comment?: {
                                    wiki_searchable?: boolean;
                                    space_searchable?: boolean;
                                };
                                minutes?: { searchable?: boolean };
                                mail?: { searchable?: boolean };
                                approval?: { searchable?: boolean };
                            };
                            extra?: { locale?: string; timezone?: string };
                            model_type:
                                | "doubao"
                                | "deepseek"
                                | "doubao_thinking"
                                | "doubao_auto_thinking";
                            history_messages?: Array<{
                                role: number;
                                content: string;
                            }>;
                            enable_agentic_output?: boolean;
                            enable_delta_text?: boolean;
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
                                    answer?: string;
                                    reasoning_content?: string;
                                    status_code?: number;
                                    status_message?: string;
                                    references?: {
                                        enterprise_refs?: Array<{
                                            id?: string;
                                            source_type?: number;
                                            title?: string;
                                            content?: string;
                                            url?: string;
                                        }>;
                                        internet_refs?: Array<{
                                            title?: string;
                                            summary?: string;
                                            url?: string;
                                        }>;
                                    };
                                    output_items?: Array<{
                                        item_id?: number;
                                        event?: number;
                                        type?: number;
                                        status?: number;
                                        text?: string;
                                        annotations?: Array<{
                                            type?: number;
                                            key?: string;
                                            image?: {
                                                image_meta?: {
                                                    image_key?: string;
                                                };
                                            };
                                            ref?: {
                                                ref_type?: number;
                                                enterprise?: {
                                                    id?: string;
                                                    source_type?: number;
                                                    title?: string;
                                                    content?: string;
                                                    url?: string;
                                                };
                                                internet?: {
                                                    title?: string;
                                                    summary?: string;
                                                    url?: string;
                                                };
                                            };
                                            board?: {
                                                image?: {
                                                    image_meta?: {
                                                        image_key?: string;
                                                    };
                                                };
                                                board_id?: string;
                                                board_type?: number;
                                                raw_code?: string;
                                                board_status?: number;
                                            };
                                        }>;
                                        error_message?: string;
                                        error_code?: number;
                                        tool_call?: {
                                            tool_type?: number;
                                            search?: {
                                                queries?: Array<string>;
                                                references?: Array<{
                                                    ref_type?: number;
                                                    enterprise?: {
                                                        id?: string;
                                                        source_type?: number;
                                                        title?: string;
                                                        content?: string;
                                                        url?: string;
                                                    };
                                                    internet?: {
                                                        title?: string;
                                                        summary?: string;
                                                        url?: string;
                                                    };
                                                }>;
                                            };
                                        };
                                        references?: Array<{
                                            queries?: Array<string>;
                                            references?: Array<{
                                                ref_type?: number;
                                                enterprise?: {
                                                    id?: string;
                                                    source_type?: number;
                                                    title?: string;
                                                    content?: string;
                                                    url?: string;
                                                };
                                                internet?: {
                                                    title?: string;
                                                    summary?: string;
                                                    url?: string;
                                                };
                                            }>;
                                        }>;
                                    }>;
                                    extra?: Record<string, string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/knowledge_qa/answer`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=knowledge_qa&apiName=fetch_doc_info&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=fetch_doc_info&project=search&resource=knowledge_qa&version=v2 document }
                 *
                 * 根据飞书/Lark 云文档 URL，读取当前用户有权限访问的文档内容与元数据。支持 Docx、Wiki、电子表格、多维表格、幻灯片和云盘文件等类型，返回文档标题、正文、更新时间以及正文引用的图片元数据，并支持长内容分页读取。### 分页说明- 首次请求传入 `url`；如需分页，同时将 `enable_pagination` 设置为 `true`。- `page_size` 用于指定单页正文的 token 预算，服务端会根据允许范围调整。- 当响应中的 `has_more` 为 `true` 时，将 `next_page_token` 作为下一次请求的 `page_token`。
                 */
                fetchDocInfo: async (
                    payload?: {
                        data?: {
                            url?: string;
                            with_block_id?: boolean;
                            enable_pagination?: boolean;
                            page_token?: string;
                            page_size?: number;
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
                                    title?: string;
                                    full_content?: string;
                                    url?: string;
                                    update_time?: string;
                                    qa_image_meta_map?: Record<
                                        string,
                                        { image_key?: string }
                                    >;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/knowledge_qa/fetch_doc_info`,
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
             * tenant_license
             */
            tenantLicense: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=tenant_license&apiName=launch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=launch&project=search&resource=tenant_license&version=v2 document }
                 */
                launch: async (
                    payload?: {
                        data?: {
                            union_id?: string;
                            display_id?: string;
                            is_check_free?: string;
                            is_launch?: string;
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
                                    tenant_id?: string;
                                    is_launched?: string;
                                    is_free?: string;
                                    is_data_available?: string;
                                    user_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/tenant_license/launch`,
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
             * memory_graph_tool_call
             */
            memoryGraphToolCall: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=memory_graph_tool_call&apiName=personalized_function_call&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=personalized_function_call&project=search&resource=memory_graph_tool_call&version=v2 document }
                 */
                personalizedFunctionCall: async (
                    payload?: {
                        data?: {
                            tool_name?: string;
                            params?: Record<string, string>;
                            scene?: string;
                            user_id?: string;
                            extra?: Record<string, string>;
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
                                    tool_response?: string;
                                    extra?: Record<string, string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/memory_graph_tool_call/personalized_function_call`,
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
             * app
             */
            app: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=app&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=app&version=v2 document }
                 *
                 * 搜索应用
                 *
                 * 用户可以通过关键字搜索到可见应用，应用可见性与套件内搜索一致。
                 */
                create: async (
                    payload?: {
                        data: { query: string };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_size?: number;
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
                                    items?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/app`,
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
             * doc_wiki
             */
            docWiki: {
                searchWithIterator: async (
                    payload?: {
                        data: {
                            query: string;
                            doc_filter?: {
                                creator_ids?: Array<string>;
                                doc_types?: Array<
                                    | "DOC"
                                    | "SHEET"
                                    | "BITABLE"
                                    | "MINDNOTE"
                                    | "FILE"
                                    | "WIKI"
                                    | "DOCX"
                                    | "FOLDER"
                                    | "CATALOG"
                                    | "SLIDES"
                                    | "SHORTCUT"
                                >;
                                folder_tokens?: Array<string>;
                                only_title?: boolean;
                                open_time?: { start?: number; end?: number };
                                sort_type?:
                                    | "DEFAULT_TYPE"
                                    | "OPEN_TIME"
                                    | "EDIT_TIME"
                                    | "EDIT_TIME_ASC"
                                    | "ENTITY_CREATE_TIME_ASC"
                                    | "ENTITY_CREATE_TIME_DESC"
                                    | "CREATE_TIME"
                                    | "CREATE_TIME_ASC";
                                create_time?: { start?: number; end?: number };
                                chat_ids?: Array<string>;
                                sharer_ids?: Array<string>;
                                only_comment?: boolean;
                                my_edit_time?: { start?: number; end?: number };
                                my_comment_time?: {
                                    start?: number;
                                    end?: number;
                                };
                                original_creator_ids?: Array<string>;
                            };
                            wiki_filter?: {
                                creator_ids?: Array<string>;
                                doc_types?: Array<
                                    | "DOC"
                                    | "SHEET"
                                    | "BITABLE"
                                    | "MINDNOTE"
                                    | "FILE"
                                    | "WIKI"
                                    | "DOCX"
                                    | "FOLDER"
                                    | "CATALOG"
                                    | "SLIDES"
                                    | "SHORTCUT"
                                >;
                                space_ids?: Array<string>;
                                only_title?: boolean;
                                open_time?: { start?: number; end?: number };
                                sort_type?:
                                    | "DEFAULT_TYPE"
                                    | "OPEN_TIME"
                                    | "EDIT_TIME"
                                    | "EDIT_TIME_ASC"
                                    | "ENTITY_CREATE_TIME_ASC"
                                    | "ENTITY_CREATE_TIME_DESC"
                                    | "CREATE_TIME"
                                    | "CREATE_TIME_ASC";
                                create_time?: { start?: number; end?: number };
                                chat_ids?: Array<string>;
                                sharer_ids?: Array<string>;
                                only_comment?: boolean;
                                my_edit_time?: { start?: number; end?: number };
                                my_comment_time?: {
                                    start?: number;
                                    end?: number;
                                };
                                original_creator_ids?: Array<string>;
                            };
                            page_token?: string;
                            page_size?: number;
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
                                    `${this.domain}/open-apis/search/v2/doc_wiki/search`,
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
                                                    total?: number;
                                                    has_more: boolean;
                                                    res_units?: Array<{
                                                        title_highlighted?: string;
                                                        summary_highlighted?: string;
                                                        entity_type?:
                                                            | "DOC"
                                                            | "WIKI";
                                                        result_meta?: {
                                                            doc_types?:
                                                                | "DOC"
                                                                | "SHEET"
                                                                | "BITABLE"
                                                                | "MINDNOTE"
                                                                | "FILE"
                                                                | "WIKI"
                                                                | "DOCX"
                                                                | "FOLDER"
                                                                | "CATALOG"
                                                                | "SLIDES"
                                                                | "SHORTCUT";
                                                            update_time?: number;
                                                            url?: string;
                                                            owner_name?: string;
                                                            owner_id?: string;
                                                            is_cross_tenant?: boolean;
                                                            create_time?: number;
                                                            last_open_time?: number;
                                                            edit_user_id?: string;
                                                            edit_user_name?: string;
                                                            token?: string;
                                                            file_type?: string;
                                                            icon_info?: string;
                                                        };
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=doc_wiki&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=search&resource=doc_wiki&version=v2 document }
                 *
                 * 文档搜索
                 *
                 * 该接口用于根据搜索关键词（query）对当前用户可见的云文档进行搜索
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            doc_filter?: {
                                creator_ids?: Array<string>;
                                doc_types?: Array<
                                    | "DOC"
                                    | "SHEET"
                                    | "BITABLE"
                                    | "MINDNOTE"
                                    | "FILE"
                                    | "WIKI"
                                    | "DOCX"
                                    | "FOLDER"
                                    | "CATALOG"
                                    | "SLIDES"
                                    | "SHORTCUT"
                                >;
                                folder_tokens?: Array<string>;
                                only_title?: boolean;
                                open_time?: { start?: number; end?: number };
                                sort_type?:
                                    | "DEFAULT_TYPE"
                                    | "OPEN_TIME"
                                    | "EDIT_TIME"
                                    | "EDIT_TIME_ASC"
                                    | "ENTITY_CREATE_TIME_ASC"
                                    | "ENTITY_CREATE_TIME_DESC"
                                    | "CREATE_TIME"
                                    | "CREATE_TIME_ASC";
                                create_time?: { start?: number; end?: number };
                                chat_ids?: Array<string>;
                                sharer_ids?: Array<string>;
                                only_comment?: boolean;
                                my_edit_time?: { start?: number; end?: number };
                                my_comment_time?: {
                                    start?: number;
                                    end?: number;
                                };
                                original_creator_ids?: Array<string>;
                            };
                            wiki_filter?: {
                                creator_ids?: Array<string>;
                                doc_types?: Array<
                                    | "DOC"
                                    | "SHEET"
                                    | "BITABLE"
                                    | "MINDNOTE"
                                    | "FILE"
                                    | "WIKI"
                                    | "DOCX"
                                    | "FOLDER"
                                    | "CATALOG"
                                    | "SLIDES"
                                    | "SHORTCUT"
                                >;
                                space_ids?: Array<string>;
                                only_title?: boolean;
                                open_time?: { start?: number; end?: number };
                                sort_type?:
                                    | "DEFAULT_TYPE"
                                    | "OPEN_TIME"
                                    | "EDIT_TIME"
                                    | "EDIT_TIME_ASC"
                                    | "ENTITY_CREATE_TIME_ASC"
                                    | "ENTITY_CREATE_TIME_DESC"
                                    | "CREATE_TIME"
                                    | "CREATE_TIME_ASC";
                                create_time?: { start?: number; end?: number };
                                chat_ids?: Array<string>;
                                sharer_ids?: Array<string>;
                                only_comment?: boolean;
                                my_edit_time?: { start?: number; end?: number };
                                my_comment_time?: {
                                    start?: number;
                                    end?: number;
                                };
                                original_creator_ids?: Array<string>;
                            };
                            page_token?: string;
                            page_size?: number;
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
                                    total?: number;
                                    has_more: boolean;
                                    res_units?: Array<{
                                        title_highlighted?: string;
                                        summary_highlighted?: string;
                                        entity_type?: "DOC" | "WIKI";
                                        result_meta?: {
                                            doc_types?:
                                                | "DOC"
                                                | "SHEET"
                                                | "BITABLE"
                                                | "MINDNOTE"
                                                | "FILE"
                                                | "WIKI"
                                                | "DOCX"
                                                | "FOLDER"
                                                | "CATALOG"
                                                | "SLIDES"
                                                | "SHORTCUT";
                                            update_time?: number;
                                            url?: string;
                                            owner_name?: string;
                                            owner_id?: string;
                                            is_cross_tenant?: boolean;
                                            create_time?: number;
                                            last_open_time?: number;
                                            edit_user_id?: string;
                                            edit_user_name?: string;
                                            token?: string;
                                            file_type?: string;
                                            icon_info?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    notice?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/doc_wiki/search`,
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
             * memory_hub
             */
            memoryHub: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=memory_hub&apiName=list_memory&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_memory&project=search&resource=memory_hub&version=v2 document }
                 *
                 * 获取 Memory Hub 记忆列表
                 */
                listMemory: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    data?: {
                                        memories?: Array<{
                                            memory_key?: string;
                                            default_variant_key?: string;
                                            name?: string;
                                            description?: string;
                                            showcase?: string;
                                            status?:
                                                | "ready"
                                                | "generating"
                                                | "need_info"
                                                | "failed"
                                                | "disabled";
                                            variants?: Array<{
                                                variant_key?: string;
                                                name?: string;
                                                description?: string;
                                                status?:
                                                    | "ready"
                                                    | "generating"
                                                    | "need_info"
                                                    | "failed"
                                                    | "disabled";
                                            }>;
                                            detail_entry?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/memory_hub/list_memory`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=memory_hub&apiName=get_memory&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_memory&project=search&resource=memory_hub&version=v2 document }
                 *
                 * 获取 Memory 详情
                 */
                getMemory: async (
                    payload?: {
                        data?: { memory_key?: string; variant_key?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    data?: {
                                        memory_key?: string;
                                        variant_key?: string;
                                        status?:
                                            | "ready"
                                            | "generating"
                                            | "need_info"
                                            | "failed"
                                            | "disabled";
                                        metadata?: Record<string, string>;
                                        detail_entry?: string;
                                        payload_type?: string;
                                        payload?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/search/v2/memory_hub/get_memory`,
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
