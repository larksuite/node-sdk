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
     * 搜索
     */
    search = {
        /**
         * app
         */
        app: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=app&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=app&version=v2 document }
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
         * 数据源
         */
        dataSource: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/create document }
             *
             * 创建数据源
             *
             * 创建一个数据源
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=delete&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/delete document }
             *
             * 删除数据源
             *
             * 删除一个已存在的数据源
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=get&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/get document }
             *
             * 获取数据源
             *
             * 获取已经创建的数据源
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
                                    get<
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=list&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/list document }
             *
             * 批量获取数据源
             *
             * 批量获取创建的数据源信息
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=patch&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/patch document }
             *
             * 修改数据源
             *
             * 更新一个已经存在的数据源
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
         * 数据项
         */
        dataSourceItem: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/create document }
             *
             * 索引数据项
             *
             * 索引一条数据记录
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=delete&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/delete document }
             *
             * 删除数据项
             *
             * 删除数据项
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=get&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/get document }
             *
             * 获取数据项
             *
             * 获取单个数据记录
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
        },
        /**
         * message
         */
        message: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=message&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=message&version=v2 document }
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
         * 数据范式
         */
        schema: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/create document }
             *
             * 创建数据范式
             *
             * 创建一个数据范式
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=delete&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/delete document }
             *
             * 删除数据范式
             *
             * 删除已存在的数据范式
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=get&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/get document }
             *
             * 获取数据范式
             *
             * 获取单个数据范式
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
             * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=patch&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/patch document }
             *
             * 修改数据范式
             *
             * 修改数据范式
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
        v2: {
            /**
             * app
             */
            app: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=app&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=app&version=v2 document }
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
             * 数据源
             */
            dataSource: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/create document }
                 *
                 * 创建数据源
                 *
                 * 创建一个数据源
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/delete document }
                 *
                 * 删除数据源
                 *
                 * 删除一个已存在的数据源
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/get document }
                 *
                 * 获取数据源
                 *
                 * 获取已经创建的数据源
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
                                        get<
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/list document }
                 *
                 * 批量获取数据源
                 *
                 * 批量获取创建的数据源信息
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/patch document }
                 *
                 * 修改数据源
                 *
                 * 更新一个已经存在的数据源
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
             * 数据项
             */
            dataSourceItem: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/create document }
                 *
                 * 索引数据项
                 *
                 * 索引一条数据记录
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/delete document }
                 *
                 * 删除数据项
                 *
                 * 删除数据项
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/get document }
                 *
                 * 获取数据项
                 *
                 * 获取单个数据记录
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
            },
            /**
             * message
             */
            message: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=message&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=search&resource=message&version=v2 document }
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
             * 数据范式
             */
            schema: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/create document }
                 *
                 * 创建数据范式
                 *
                 * 创建一个数据范式
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/delete document }
                 *
                 * 删除数据范式
                 *
                 * 删除已存在的数据范式
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/get document }
                 *
                 * 获取数据范式
                 *
                 * 获取单个数据范式
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
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/patch document }
                 *
                 * 修改数据范式
                 *
                 * 修改数据范式
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
        },
    };
}
