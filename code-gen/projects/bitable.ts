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
import base from "./base";

// auto gen
export default abstract class Client extends base {
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
    bitable = {
        /**
         * app.table
         */
        appTable: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=bitable&resource=app.table&version=v1 document }
             *
             * 更新数据表
             *
             * 更新数据表的名称。
             */
            patch: async (
                payload?: {
                    data?: { name?: string };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { name?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=bitable&resource=app.table&version=v1 document }
             *
             * 删除多个数据表
             *
             * 通过 app_token 和 table_id 删除多个数据表。
             *
             * ## 注意事项;;如果多维表格中只剩最后一张数据表，则不允许被删除。
             */
            batchDelete: async (
                payload?: {
                    data?: { table_ids?: Array<string> };
                    path: { app_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/batch_delete`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=bitable&resource=app.table&version=v1 document }
             *
             * 新增多个数据表
             *
             * 新增多个数据表，仅可指定数据表名称。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;## 使用限制;;每个多维表格中，数据表与仪表盘的总数量上限为 100。;
             */
            batchCreate: async (
                payload?: {
                    data?: {
                        tables?: Array<{
                            name?: string;
                            default_view_name?: string;
                            fields?: Array<{
                                field_name: string;
                                type: number;
                                ui_type?:
                                    | "Text"
                                    | "Barcode"
                                    | "Number"
                                    | "Progress"
                                    | "Currency"
                                    | "Rating"
                                    | "SingleSelect"
                                    | "MultiSelect"
                                    | "DateTime"
                                    | "Checkbox"
                                    | "User"
                                    | "GroupChat"
                                    | "Phone"
                                    | "Url"
                                    | "Attachment"
                                    | "SingleLink"
                                    | "Formula"
                                    | "DuplexLink"
                                    | "Location"
                                    | "CreatedTime"
                                    | "ModifiedTime"
                                    | "CreatedUser"
                                    | "ModifiedUser"
                                    | "AutoNumber";
                                property?: {
                                    options?: Array<{
                                        name?: string;
                                        id?: string;
                                        color?: number;
                                    }>;
                                    formatter?: string;
                                    date_formatter?: string;
                                    auto_fill?: boolean;
                                    multiple?: boolean;
                                    table_id?: string;
                                    table_name?: string;
                                    back_field_name?: string;
                                    auto_serial?: {
                                        type:
                                            | "custom"
                                            | "auto_increment_number";
                                        options?: Array<{
                                            type:
                                                | "system_number"
                                                | "fixed_text"
                                                | "created_time";
                                            value: string;
                                        }>;
                                    };
                                    location?: {
                                        input_type: "only_mobile" | "not_limit";
                                    };
                                    formula_expression?: string;
                                    allowed_edit_modes?: {
                                        manual?: boolean;
                                        scan?: boolean;
                                    };
                                    min?: number;
                                    max?: number;
                                    range_customize?: boolean;
                                    currency_code?: string;
                                    rating?: { symbol?: string };
                                    type?: {
                                        data_type: number;
                                        ui_property?: {
                                            currency_code?: string;
                                            formatter?: string;
                                            range_customize?: boolean;
                                            min?: number;
                                            max?: number;
                                            date_formatter?: string;
                                            rating?: { symbol?: string };
                                        };
                                        ui_type?:
                                            | "Number"
                                            | "Progress"
                                            | "Currency"
                                            | "Rating"
                                            | "DateTime";
                                    };
                                    filter_info?: {
                                        target_table?: string;
                                        filter_info?: {
                                            conjunction: "and" | "or";
                                            conditions: Array<{
                                                field_id: string;
                                                operator:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty"
                                                    | "isGreater"
                                                    | "isGreaterEqual"
                                                    | "isLess"
                                                    | "isLessEqual";
                                                value?: string;
                                                condition_id?: string;
                                                field_type?: number;
                                            }>;
                                        };
                                    };
                                };
                                description?: {
                                    disable_sync?: boolean;
                                    text?: string;
                                };
                            }>;
                        }>;
                    };
                    path: { app_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { table_ids?: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/batch_create`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.table&version=v1 document }
             *
             * 新增一个数据表
             *
             * 新增一个数据表，支持传入数据表名称、视图名称和字段。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;## 使用限制;;每个多维表格中，数据表与仪表盘的总数量上限为 100。
             */
            create: async (
                payload?: {
                    data?: {
                        table?: {
                            name?: string;
                            default_view_name?: string;
                            fields?: Array<{
                                field_name: string;
                                type: number;
                                ui_type?:
                                    | "Text"
                                    | "Barcode"
                                    | "Number"
                                    | "Progress"
                                    | "Currency"
                                    | "Rating"
                                    | "SingleSelect"
                                    | "MultiSelect"
                                    | "DateTime"
                                    | "Checkbox"
                                    | "User"
                                    | "GroupChat"
                                    | "Phone"
                                    | "Url"
                                    | "Attachment"
                                    | "SingleLink"
                                    | "Formula"
                                    | "DuplexLink"
                                    | "Location"
                                    | "CreatedTime"
                                    | "ModifiedTime"
                                    | "CreatedUser"
                                    | "ModifiedUser"
                                    | "AutoNumber";
                                property?: {
                                    options?: Array<{
                                        name?: string;
                                        id?: string;
                                        color?: number;
                                    }>;
                                    formatter?: string;
                                    date_formatter?: string;
                                    auto_fill?: boolean;
                                    multiple?: boolean;
                                    table_id?: string;
                                    table_name?: string;
                                    back_field_name?: string;
                                    auto_serial?: {
                                        type:
                                            | "custom"
                                            | "auto_increment_number";
                                        options?: Array<{
                                            type:
                                                | "system_number"
                                                | "fixed_text"
                                                | "created_time";
                                            value: string;
                                        }>;
                                    };
                                    location?: {
                                        input_type: "only_mobile" | "not_limit";
                                    };
                                    formula_expression?: string;
                                    allowed_edit_modes?: {
                                        manual?: boolean;
                                        scan?: boolean;
                                    };
                                    min?: number;
                                    max?: number;
                                    range_customize?: boolean;
                                    currency_code?: string;
                                    rating?: { symbol?: string };
                                    type?: {
                                        data_type: number;
                                        ui_property?: {
                                            currency_code?: string;
                                            formatter?: string;
                                            range_customize?: boolean;
                                            min?: number;
                                            max?: number;
                                            date_formatter?: string;
                                            rating?: { symbol?: string };
                                        };
                                        ui_type?:
                                            | "Number"
                                            | "Progress"
                                            | "Currency"
                                            | "Rating"
                                            | "DateTime";
                                    };
                                    filter_info?: {
                                        target_table?: string;
                                        filter_info?: {
                                            conjunction: "and" | "or";
                                            conditions: Array<{
                                                field_id: string;
                                                operator:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty"
                                                    | "isGreater"
                                                    | "isGreaterEqual"
                                                    | "isLess"
                                                    | "isLessEqual";
                                                value?: string;
                                            }>;
                                        };
                                    };
                                };
                                description?: {
                                    disable_sync?: boolean;
                                    text?: string;
                                };
                            }>;
                        };
                    };
                    path: { app_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                table_id?: string;
                                default_view_id?: string;
                                field_id_list?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.table&version=v1 document }
             *
             * 删除一个数据表
             *
             * 通过 app_token 和 table_id 删除指定的多维表格数据表。
             *
             * ## 注意事项;;如果多维表格中只剩最后一张数据表，则不允许被删除。
             */
            delete: async (
                payload?: {
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id`,
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
                    path: { app_token: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
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
                                                total?: number;
                                                items?: Array<{
                                                    table_id?: string;
                                                    revision?: number;
                                                    name?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.table&version=v1 document }
             *
             * 列出数据表
             *
             * 列出多维表格中的所有数据表，包括其 ID、版本号和名称。
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: { app_token: string };
                },
                options?: IRequestOptions
            ) => {
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
                                total?: number;
                                items?: Array<{
                                    table_id?: string;
                                    revision?: number;
                                    name?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
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
         * app.dashboard
         */
        appDashboard: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.dashboard&apiName=copy&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=copy&project=bitable&resource=app.dashboard&version=v1 document }
             *
             * 复制仪表盘
             *
             * 基于现有仪表盘复制出新的仪表盘。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有原多维表格的阅读权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
             */
            copy: async (
                payload?: {
                    data: { name: string };
                    path: { app_token: string; block_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { block_id?: string; name?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards/:block_id/copy`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
                        with_share_config?: boolean;
                    };
                    path: { app_token: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards`,
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
                                                dashboards: Array<{
                                                    block_id: string;
                                                    name: string;
                                                    share_config?: {
                                                        share_flag?: boolean;
                                                        share_scope_type?:
                                                            | "1"
                                                            | "2"
                                                            | "3";
                                                        share_token?: string;
                                                        share_link?: string;
                                                        show_source?: boolean;
                                                        source_link?: string;
                                                    };
                                                }>;
                                                page_token: string;
                                                has_more: boolean;
                                                total?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.dashboard&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.dashboard&version=v1 document }
             *
             * 列出仪表盘
             *
             * 获取多维表格中的所有仪表盘。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的阅读等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        with_share_config?: boolean;
                    };
                    path: { app_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                dashboards: Array<{
                                    block_id: string;
                                    name: string;
                                    share_config?: {
                                        share_flag?: boolean;
                                        share_scope_type?: "1" | "2" | "3";
                                        share_token?: string;
                                        share_link?: string;
                                        show_source?: boolean;
                                        source_link?: string;
                                    };
                                }>;
                                page_token: string;
                                has_more: boolean;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=bitable&resource=app&version=v1 document }
             *
             * 更新多维表格元数据
             *
             * 更新多维表格元数据，包括多维表格的名称、是否开启高级权限。
             */
            update: async (
                payload?: {
                    data?: { name?: string; is_advanced?: boolean };
                    path: { app_token: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    app_token?: string;
                                    name?: string;
                                    is_advanced?: boolean;
                                    time_zone?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=copy&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=copy&project=bitable&resource=app&version=v1 document }
             *
             * 复制多维表格
             *
             * 复制一个多维表格，可以指定复制到某个有权限的文件夹下。
             *
             * 当多维表格记录数超 50,000 条可复制上限时，仅可复制多维表格结构。;;## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格和目标文件夹的阅读、编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通云文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
             */
            copy: async (
                payload?: {
                    data?: {
                        name?: string;
                        folder_token?: string;
                        without_content?: boolean;
                        time_zone?: string;
                    };
                    path: { app_token: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    app_token?: string;
                                    name?: string;
                                    revision?: number;
                                    folder_token?: string;
                                    url?: string;
                                    time_zone?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/copy`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app&version=v1 document }
             *
             * 创建多维表格
             *
             * 在指定文件夹中创建一个多维表格，包含一个空白的数据表。
             *
             * 要基于模板创建多维表格，可先获取模板多维表格 `app_token` 作为文件 token，再调用[复制文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/copy)接口创建多维表格。
             */
            create: async (
                payload?: {
                    data?: {
                        name?: string;
                        folder_token?: string;
                        time_zone?: string;
                    };
                    params?: {
                        customized_config?: boolean;
                        source_app_token?: string;
                        copy_types?: Array<string>;
                        api_type?: string;
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
                                    app_token?: string;
                                    name?: string;
                                    revision?: number;
                                    folder_token?: string;
                                    url?: string;
                                    default_table_id?: string;
                                    time_zone?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=bitable&resource=app&version=v1 document }
             *
             * 获取多维表格元数据
             *
             * 获取指定多维表格的元数据信息，包括多维表格名称、多维表格版本号、多维表格是否开启高级权限等。
             */
            get: async (
                payload?: {
                    path: { app_token: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    app_token?: string;
                                    name?: string;
                                    revision?: number;
                                    is_advanced?: boolean;
                                    time_zone?: string;
                                    formula_type?: number;
                                    advance_version?: "v1" | "v2";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token`,
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
         * app.table.record
         */
        appTableRecord: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 删除多条记录
             *
             * 删除多维表格数据表中现有的多条记录。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;## 注意事项;;- 从其它数据源同步的数据表，不支持开发者对记录进行增加、删除、和修改操作。;- 单次调用中最多删除 500 条记录。
             */
            batchDelete: async (
                payload?: {
                    data: { records: Array<string> };
                    params?: { ignore_consistency_check?: boolean };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                records?: Array<{
                                    deleted?: boolean;
                                    record_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_delete`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 新增多条记录
             *
             * 在多维表格数据表中新增多条记录，单次调用最多新增 1,000 条记录。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;## 注意事项;;从其它数据源同步的数据表，不支持对记录进行增加、删除、和修改操作。
             */
            batchCreate: async (
                payload?: {
                    data: {
                        records: Array<{
                            fields: Record<
                                string,
                                | string
                                | number
                                | number
                                | number
                                | boolean
                                | { text?: string; link?: string }
                                | {
                                      location?: string;
                                      pname?: string;
                                      cityname?: string;
                                      adname?: string;
                                      address?: string;
                                      name?: string;
                                      full_address?: string;
                                  }
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<string>
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      en_name?: string;
                                      email?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<{
                                      file_token?: string;
                                      name?: string;
                                      type?: string;
                                      size?: number;
                                      url?: string;
                                      tmp_url?: string;
                                  }>
                            >;
                            created_by?: {
                                id?: string;
                                name?: string;
                                en_name?: string;
                                email?: string;
                                avatar_url?: string;
                            };
                            created_time?: number;
                            last_modified_by?: {
                                id?: string;
                                name?: string;
                                en_name?: string;
                                email?: string;
                                avatar_url?: string;
                            };
                            last_modified_time?: number;
                            shared_url?: string;
                            record_url?: string;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        client_token?: string;
                        ignore_consistency_check?: boolean;
                    };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                records?: Array<{
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_create`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 更新多条记录
             *
             * 更新数据表中的多条记录，单次调用最多更新 1,000 条记录。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;## 注意事项;从其它数据源同步的数据表，不支持对记录进行增加、删除、和修改操作。
             */
            batchUpdate: async (
                payload?: {
                    data: {
                        records: Array<{
                            fields: Record<
                                string,
                                | string
                                | number
                                | number
                                | number
                                | boolean
                                | { text?: string; link?: string }
                                | {
                                      location?: string;
                                      pname?: string;
                                      cityname?: string;
                                      adname?: string;
                                      address?: string;
                                      name?: string;
                                      full_address?: string;
                                  }
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<string>
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      en_name?: string;
                                      email?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<{
                                      file_token?: string;
                                      name?: string;
                                      type?: string;
                                      size?: number;
                                      url?: string;
                                      tmp_url?: string;
                                  }>
                            >;
                            record_id?: string;
                            created_by?: {
                                id?: string;
                                name?: string;
                                en_name?: string;
                                email?: string;
                                avatar_url?: string;
                            };
                            created_time?: number;
                            last_modified_by?: {
                                id?: string;
                                name?: string;
                                en_name?: string;
                                email?: string;
                                avatar_url?: string;
                            };
                            last_modified_time?: number;
                            shared_url?: string;
                            record_url?: string;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        ignore_consistency_check?: boolean;
                        client_token?: string;
                    };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                records?: Array<{
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_update`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 更新记录
             *
             * 更新多维表格数据表中的一条记录。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;## 注意事项;;;- 从其它数据源同步的数据表，不支持对记录进行增加、删除、和修改操作。;- 更新记录为增量更新，仅更新传入的字段。如果想对记录中的某个字段值置空，可将字段设为 null，例如：;```json;{;  "fields": {;    "文本字段": null;  };};```
             */
            update: async (
                payload?: {
                    data: {
                        fields: Record<
                            string,
                            | string
                            | number
                            | number
                            | number
                            | boolean
                            | { text?: string; link?: string }
                            | {
                                  location?: string;
                                  pname?: string;
                                  cityname?: string;
                                  adname?: string;
                                  address?: string;
                                  name?: string;
                                  full_address?: string;
                              }
                            | Array<{
                                  id?: string;
                                  name?: string;
                                  avatar_url?: string;
                              }>
                            | Array<string>
                            | Array<{
                                  id?: string;
                                  name?: string;
                                  en_name?: string;
                                  email?: string;
                              }>
                            | Array<{
                                  file_token?: string;
                                  name?: string;
                                  type?: string;
                                  size?: number;
                                  url?: string;
                                  tmp_url?: string;
                              }>
                        >;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        ignore_consistency_check?: boolean;
                        client_token?: string;
                    };
                    path: {
                        app_token: string;
                        table_id: string;
                        record_id: string;
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
                                record?: {
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 新增记录
             *
             * 在多维表格数据表中新增一条记录。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;;## 注意事项;;从其它数据源同步的数据表，不支持对记录进行增加、删除、和修改操作。
             */
            create: async (
                payload?: {
                    data: {
                        fields: Record<
                            string,
                            | string
                            | number
                            | number
                            | number
                            | boolean
                            | { text?: string; link?: string }
                            | {
                                  location?: string;
                                  pname?: string;
                                  cityname?: string;
                                  adname?: string;
                                  address?: string;
                                  name?: string;
                                  full_address?: string;
                              }
                            | Array<{
                                  id?: string;
                                  name?: string;
                                  avatar_url?: string;
                              }>
                            | Array<string>
                            | Array<{
                                  id?: string;
                                  name?: string;
                                  en_name?: string;
                                  email?: string;
                              }>
                            | Array<{
                                  file_token?: string;
                                  name?: string;
                                  type?: string;
                                  size?: number;
                                  url?: string;
                                  tmp_url?: string;
                              }>
                        >;
                        record_id?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        client_token?: string;
                        ignore_consistency_check?: boolean;
                    };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                record?: {
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
                        view_id?: string;
                        field_names?: Array<string>;
                        sort?: Array<{ field_name?: string; desc?: boolean }>;
                        filter?: {
                            conjunction: "and" | "or";
                            conditions?: Array<{
                                field_name: string;
                                operator:
                                    | "is"
                                    | "isNot"
                                    | "contains"
                                    | "doesNotContain"
                                    | "isEmpty"
                                    | "isNotEmpty"
                                    | "isGreater"
                                    | "isGreaterEqual"
                                    | "isLess"
                                    | "isLessEqual"
                                    | "like"
                                    | "in";
                                value?: Array<string>;
                            }>;
                            children?: Array<{
                                conjunction: "and" | "or";
                                conditions?: Array<{
                                    field_name: string;
                                    operator:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty"
                                        | "isGreater"
                                        | "isGreaterEqual"
                                        | "isLess"
                                        | "isLessEqual"
                                        | "like"
                                        | "in";
                                    value?: Array<string>;
                                }>;
                            }>;
                        };
                        automatic_fields?: boolean;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { app_token: string; table_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search`,
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
                                                items?: Array<{
                                                    fields: Record<
                                                        string,
                                                        | string
                                                        | number
                                                        | number
                                                        | number
                                                        | boolean
                                                        | {
                                                              text?: string;
                                                              link?: string;
                                                          }
                                                        | {
                                                              location?: string;
                                                              pname?: string;
                                                              cityname?: string;
                                                              adname?: string;
                                                              address?: string;
                                                              name?: string;
                                                              full_address?: string;
                                                          }
                                                        | Array<{
                                                              id?: string;
                                                              name?: string;
                                                              avatar_url?: string;
                                                          }>
                                                        | Array<string>
                                                        | Array<{
                                                              id?: string;
                                                              name?: string;
                                                              en_name?: string;
                                                              email?: string;
                                                              avatar_url?: string;
                                                          }>
                                                        | Array<{
                                                              file_token?: string;
                                                              name?: string;
                                                              type?: string;
                                                              size?: number;
                                                              url?: string;
                                                              tmp_url?: string;
                                                          }>
                                                    >;
                                                    record_id?: string;
                                                    created_by?: {
                                                        id?: string;
                                                        name?: string;
                                                        en_name?: string;
                                                        email?: string;
                                                        avatar_url?: string;
                                                    };
                                                    created_time?: number;
                                                    last_modified_by?: {
                                                        id?: string;
                                                        name?: string;
                                                        en_name?: string;
                                                        email?: string;
                                                        avatar_url?: string;
                                                    };
                                                    last_modified_time?: number;
                                                    shared_url?: string;
                                                    record_url?: string;
                                                }>;
                                                has_more?: boolean;
                                                page_token?: string;
                                                total?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 查询记录
             *
             * 该接口用于查询数据表中的现有记录，单次最多查询 500 行记录，支持分页获取。
             *
             * ## 注意事项;;若多维表格开启了高级权限，你需确保调用身份拥有多维表格的可管理权限，否则可能出现调用成功但返回数据为空的情况。了解具体步骤，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
             */
            search: async (
                payload?: {
                    data?: {
                        view_id?: string;
                        field_names?: Array<string>;
                        sort?: Array<{ field_name?: string; desc?: boolean }>;
                        filter?: {
                            conjunction: "and" | "or";
                            conditions?: Array<{
                                field_name: string;
                                operator:
                                    | "is"
                                    | "isNot"
                                    | "contains"
                                    | "doesNotContain"
                                    | "isEmpty"
                                    | "isNotEmpty"
                                    | "isGreater"
                                    | "isGreaterEqual"
                                    | "isLess"
                                    | "isLessEqual"
                                    | "like"
                                    | "in";
                                value?: Array<string>;
                            }>;
                            children?: Array<{
                                conjunction: "and" | "or";
                                conditions?: Array<{
                                    field_name: string;
                                    operator:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty"
                                        | "isGreater"
                                        | "isGreaterEqual"
                                        | "isLess"
                                        | "isLessEqual"
                                        | "like"
                                        | "in";
                                    value?: Array<string>;
                                }>;
                            }>;
                        };
                        automatic_fields?: boolean;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 批量获取记录
             *
             * 通过多个记录 ID 查询记录信息。该接口最多支持查询 100 条记录。
             */
            batchGet: async (
                payload?: {
                    data: {
                        record_ids: Array<string>;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        with_shared_url?: boolean;
                        automatic_fields?: boolean;
                    };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                records?: Array<{
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                }>;
                                forbidden_record_ids?: Array<string>;
                                absent_record_ids?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_get`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 删除记录
             *
             * 删除多维表格数据表中的一条记录。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;;## 注意事项;;从其它数据源同步的数据表，不支持对记录进行增加、删除、和修改操作。
             */
            delete: async (
                payload?: {
                    params?: { ignore_consistency_check?: boolean };
                    path: {
                        app_token: string;
                        table_id: string;
                        record_id: string;
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
                            data?: { deleted?: boolean; record_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 检索记录
             *
             * 该接口用于根据 record_id 的值检索现有记录。
             *
             * 该接口为历史版本接口，已不推荐使用。你可使用新版[批量获取记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_get)接口。
             */
            get: async (
                payload?: {
                    params?: {
                        text_field_as_array?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        display_formula_ref?: boolean;
                        with_shared_url?: boolean;
                        automatic_fields?: boolean;
                    };
                    path: {
                        app_token: string;
                        table_id: string;
                        record_id: string;
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
                                record?: {
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
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
                        view_id?: string;
                        filter?: string;
                        sort?: string;
                        field_names?: string;
                        text_field_as_array?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        display_formula_ref?: boolean;
                        automatic_fields?: boolean;
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { app_token: string; table_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
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
                                                total?: number;
                                                items?: Array<{
                                                    fields: Record<
                                                        string,
                                                        | string
                                                        | number
                                                        | number
                                                        | number
                                                        | boolean
                                                        | {
                                                              text?: string;
                                                              link?: string;
                                                          }
                                                        | {
                                                              location?: string;
                                                              pname?: string;
                                                              cityname?: string;
                                                              adname?: string;
                                                              address?: string;
                                                              name?: string;
                                                              full_address?: string;
                                                          }
                                                        | Array<{
                                                              id?: string;
                                                              name?: string;
                                                              avatar_url?: string;
                                                          }>
                                                        | Array<string>
                                                        | Array<{
                                                              id?: string;
                                                              name?: string;
                                                              en_name?: string;
                                                              email?: string;
                                                              avatar_url?: string;
                                                          }>
                                                        | Array<{
                                                              file_token?: string;
                                                              name?: string;
                                                              type?: string;
                                                              size?: number;
                                                              url?: string;
                                                              tmp_url?: string;
                                                          }>
                                                    >;
                                                    record_id?: string;
                                                    created_by?: {
                                                        id?: string;
                                                        name?: string;
                                                        en_name?: string;
                                                        email?: string;
                                                        avatar_url?: string;
                                                    };
                                                    created_time?: number;
                                                    last_modified_by?: {
                                                        id?: string;
                                                        name?: string;
                                                        en_name?: string;
                                                        email?: string;
                                                        avatar_url?: string;
                                                    };
                                                    last_modified_time?: number;
                                                    shared_url?: string;
                                                    record_url?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 列出记录
             *
             * 该接口用于列出数据表中的现有记录，单次最多列出 500 行记录，支持分页获取。
             *
             * ::: note;该接口为历史接口，已不推荐使用。你可使用[查询记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/search)替代。;:::
             */
            list: async (
                payload?: {
                    params?: {
                        view_id?: string;
                        filter?: string;
                        sort?: string;
                        field_names?: string;
                        text_field_as_array?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        display_formula_ref?: boolean;
                        automatic_fields?: boolean;
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                total?: number;
                                items?: Array<{
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
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
         * app.role.member
         */
        appRoleMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=bitable&resource=app.role.member&version=v1 document }
             *
             * 批量删除协作者
             *
             * 删除多维表格高级权限中自定义角色的协作者。
             *
             * ## 前提条件;;要调用协作者相关接口，你需确保多维表格已开启高级权限并设置了自定义角色。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限，通过[新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create)接口设置自定义角色。
             */
            batchDelete: async (
                payload?: {
                    data: {
                        member_list: Array<{
                            type?:
                                | "open_id"
                                | "union_id"
                                | "user_id"
                                | "chat_id"
                                | "department_id"
                                | "open_department_id";
                            id: string;
                        }>;
                    };
                    path: { app_token: string; role_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_delete`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=bitable&resource=app.role.member&version=v1 document }
             *
             * 批量新增协作者
             *
             * 批量新增多维表格高级权限中自定义角色的协作者。
             *
             * ## 前提条件;;要调用协作者相关接口，你需确保多维表格已开启高级权限并设置了自定义角色。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限，通过[新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create)接口设置自定义角色。;
             */
            batchCreate: async (
                payload?: {
                    data: {
                        member_list: Array<{
                            type?:
                                | "open_id"
                                | "union_id"
                                | "user_id"
                                | "chat_id"
                                | "department_id"
                                | "open_department_id";
                            id: string;
                        }>;
                    };
                    path: { app_token: string; role_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_create`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.role.member&version=v1 document }
             *
             * 新增协作者
             *
             * 新增多维表格高级权限中自定义角色的协作者。
             */
            create: async (
                payload?: {
                    data: { member_id: string };
                    params?: {
                        member_id_type?:
                            | "open_id"
                            | "union_id"
                            | "user_id"
                            | "chat_id"
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { app_token?: string; role_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
                    path: { app_token: string; role_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
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
                                                    open_id?: string;
                                                    union_id?: string;
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    department_id?: string;
                                                    open_department_id?: string;
                                                    member_name?: string;
                                                    member_en_name?: string;
                                                    member_type?:
                                                        | "user"
                                                        | "chat"
                                                        | "department";
                                                }>;
                                                has_more?: boolean;
                                                page_token?: string;
                                                total?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.role.member&version=v1 document }
             *
             * 列出协作者
             *
             * 列出多维表格高级权限中自定义角色的协作者。
             *
             * ## 前提条件;;要调用协作者相关接口，你需确保多维表格已开启高级权限并设置了自定义角色。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限，通过[新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create)接口设置自定义角色。;
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: { app_token: string; role_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    open_id?: string;
                                    union_id?: string;
                                    user_id?: string;
                                    chat_id?: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    member_name?: string;
                                    member_en_name?: string;
                                    member_type?:
                                        | "user"
                                        | "chat"
                                        | "department";
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.role.member&version=v1 document }
             *
             * 删除协作者
             *
             * 删除多维表格高级权限中自定义角色的协作者。
             *
             * ## 前提条件;;要调用协作者相关接口，你需确保多维表格已开启高级权限并设置了自定义角色。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限，通过[新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create)接口设置自定义角色。
             */
            delete: async (
                payload?: {
                    params?: {
                        member_id_type?:
                            | "open_id"
                            | "union_id"
                            | "user_id"
                            | "chat_id"
                            | "department_id"
                            | "open_department_id";
                    };
                    path: {
                        app_token?: string;
                        role_id?: string;
                        member_id: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/:member_id`,
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
         * app.role
         */
        appRole: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.role&version=v1 document }
             *
             * 新增自定义角色
             *
             * 新增多维表格高级权限中自定义的角色。
             *
             * 推荐使用新版[新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/create)接口，支持高级权限 2.0 版本新增的权限点位，包括更精细的行级别权限控制、多维表格的复制、导出点位的控制等。;;## 前提条件;;要调用自定义角色相关接口，你需确保多维表格已开启高级权限。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限。
             */
            create: async (
                payload?: {
                    data: {
                        role_name: string;
                        table_roles: Array<{
                            table_perm: number;
                            table_name?: string;
                            table_id?: string;
                            rec_rule?: {
                                conditions: Array<{
                                    field_name: string;
                                    operator?:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty";
                                    value?: Array<string>;
                                }>;
                                conjunction?: "and" | "or";
                                other_perm?: number;
                            };
                            field_perm?: Record<string, number>;
                            allow_add_record?: boolean;
                            allow_delete_record?: boolean;
                        }>;
                        block_roles?: Array<{
                            block_id: string;
                            block_perm: number;
                        }>;
                    };
                    path?: { app_token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                role?: {
                                    role_name: string;
                                    role_id?: string;
                                    table_roles: Array<{
                                        table_perm: number;
                                        table_name?: string;
                                        table_id?: string;
                                        rec_rule?: {
                                            conditions: Array<{
                                                field_name: string;
                                                operator?:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty";
                                                value?: Array<string>;
                                                field_type?: number;
                                            }>;
                                            conjunction?: "and" | "or";
                                            other_perm?: number;
                                        };
                                        field_perm?: Record<string, number>;
                                        allow_add_record?: boolean;
                                        allow_delete_record?: boolean;
                                    }>;
                                    block_roles?: Array<{
                                        block_id: string;
                                        block_type?: "dashboard";
                                        block_perm: number;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=bitable&resource=app.role&version=v1 document }
             *
             * 更新自定义角色
             *
             * 更新多维表格高级权限中自定义的角色。
             *
             * 更新自定义角色为增量更新，仅对传值的字段进行更新，不传值则不更新。推荐使用新版[更新自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/update)接口，支持高级权限 2.0 版本新增的权限点位，包括更精细的行级别权限控制、多维表格的复制、导出点位的控制等。;;## 前提条件;;要调用自定义角色相关接口，你需确保多维表格已开启高级权限。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限。
             */
            update: async (
                payload?: {
                    data: {
                        role_name: string;
                        table_roles: Array<{
                            table_perm: number;
                            table_name?: string;
                            table_id?: string;
                            rec_rule?: {
                                conditions: Array<{
                                    field_name: string;
                                    operator?:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty";
                                    value?: Array<string>;
                                }>;
                                conjunction?: "and" | "or";
                                other_perm?: number;
                            };
                            field_perm?: Record<string, number>;
                            allow_add_record?: boolean;
                            allow_delete_record?: boolean;
                        }>;
                        block_roles?: Array<{
                            block_id: string;
                            block_perm: number;
                        }>;
                    };
                    path?: { app_token?: string; role_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                role?: {
                                    role_name: string;
                                    role_id?: string;
                                    table_roles: Array<{
                                        table_perm: number;
                                        table_name?: string;
                                        table_id?: string;
                                        rec_rule?: {
                                            conditions: Array<{
                                                field_name: string;
                                                operator?:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty";
                                                value?: Array<string>;
                                                field_type?: number;
                                            }>;
                                            conjunction?: "and" | "or";
                                            other_perm?: number;
                                        };
                                        field_perm?: Record<string, number>;
                                        allow_add_record?: boolean;
                                        allow_delete_record?: boolean;
                                    }>;
                                    block_roles?: Array<{
                                        block_id: string;
                                        block_type?: "dashboard";
                                        block_perm: number;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.role&version=v1 document }
             *
             * 删除自定义角色
             *
             * 删除多维表格高级权限中自定义的角色。
             *
             * ## 前提条件;;要调用自定义角色相关接口，你需确保多维表格已开启高级权限。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限。
             */
            delete: async (
                payload?: {
                    path?: { app_token?: string; role_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id`,
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
                    path?: { app_token?: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
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
                                                    role_name: string;
                                                    role_id?: string;
                                                    table_roles: Array<{
                                                        table_perm: number;
                                                        table_name?: string;
                                                        table_id?: string;
                                                        rec_rule?: {
                                                            conditions: Array<{
                                                                field_name: string;
                                                                operator?:
                                                                    | "is"
                                                                    | "isNot"
                                                                    | "contains"
                                                                    | "doesNotContain"
                                                                    | "isEmpty"
                                                                    | "isNotEmpty";
                                                                value?: Array<string>;
                                                                field_type?: number;
                                                            }>;
                                                            conjunction?:
                                                                | "and"
                                                                | "or";
                                                            other_perm?: number;
                                                        };
                                                        field_perm?: Record<
                                                            string,
                                                            number
                                                        >;
                                                        allow_add_record?: boolean;
                                                        allow_delete_record?: boolean;
                                                    }>;
                                                    block_roles?: Array<{
                                                        block_id: string;
                                                        block_type?: "dashboard";
                                                        block_perm: number;
                                                    }>;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                total?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.role&version=v1 document }
             *
             * 列出自定义角色
             *
             * 列出多维表格高级权限中用户自定义的角色。
             *
             * 推荐使用新版[列出自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/list)接口，支持高级权限 2.0 版本新增的权限点位，包括更精细的行级别权限控制、多维表格的复制、导出点位的控制等。;;## 前提条件;;要调用自定义角色相关接口，你需确保多维表格已开启高级权限。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限。
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path?: { app_token?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    role_name: string;
                                    role_id?: string;
                                    table_roles: Array<{
                                        table_perm: number;
                                        table_name?: string;
                                        table_id?: string;
                                        rec_rule?: {
                                            conditions: Array<{
                                                field_name: string;
                                                operator?:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty";
                                                value?: Array<string>;
                                                field_type?: number;
                                            }>;
                                            conjunction?: "and" | "or";
                                            other_perm?: number;
                                        };
                                        field_perm?: Record<string, number>;
                                        allow_add_record?: boolean;
                                        allow_delete_record?: boolean;
                                    }>;
                                    block_roles?: Array<{
                                        block_id: string;
                                        block_type?: "dashboard";
                                        block_perm: number;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
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
         * app.table.view
         */
        appTableView: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.table.view&version=v1 document }
             *
             * 新增视图
             *
             * 在多维表格数据表中新增一个视图，可指定视图类型，包括表格视图、看板视图、画册视图、甘特视图和表单视图。
             *
             * ## 使用限制;;视图最大支持数量为 200，包括公共视图、锁定视图和个人视图。因此个人在多维表格中看到的视图数量可能仅是部分视图。
             */
            create: async (
                payload?: {
                    data: {
                        view_name: string;
                        view_type?:
                            | "grid"
                            | "kanban"
                            | "gallery"
                            | "gantt"
                            | "form";
                    };
                    path?: { app_token?: string; table_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                view?: {
                                    view_id?: string;
                                    view_name?: string;
                                    view_type?: string;
                                    property?: {
                                        filter_info?: {
                                            conjunction: "and" | "or";
                                            conditions: Array<{
                                                field_id: string;
                                                operator:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty"
                                                    | "isGreater"
                                                    | "isGreaterEqual"
                                                    | "isLess"
                                                    | "isLessEqual";
                                                value?: string;
                                                condition_id?: string;
                                                field_type?: number;
                                            }>;
                                            condition_omitted?: boolean;
                                        };
                                        hidden_fields?: Array<string>;
                                        hierarchy_config?: {
                                            field_id?: string;
                                        };
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=bitable&resource=app.table.view&version=v1 document }
             *
             * 更新视图
             *
             * 增量更新视图信息，包括视图名称、属性等，可设置视图的筛选条件。
             */
            patch: async (
                payload?: {
                    data?: {
                        view_name?: string;
                        property?: {
                            filter_info?: {
                                conjunction: "and" | "or";
                                conditions: Array<{
                                    field_id: string;
                                    operator:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty"
                                        | "isGreater"
                                        | "isGreaterEqual"
                                        | "isLess"
                                        | "isLessEqual";
                                    value?: string;
                                }>;
                            };
                            hidden_fields?: Array<string>;
                            hierarchy_config?: { field_id?: string };
                        };
                    };
                    params?: { user_id_type?: string };
                    path?: {
                        app_token?: string;
                        table_id?: string;
                        view_id?: string;
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
                                view?: {
                                    view_id?: string;
                                    view_name?: string;
                                    view_type?: string;
                                    property?: {
                                        filter_info?: {
                                            conjunction: "and" | "or";
                                            conditions: Array<{
                                                field_id: string;
                                                operator:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty"
                                                    | "isGreater"
                                                    | "isGreaterEqual"
                                                    | "isLess"
                                                    | "isLessEqual";
                                                value?: string;
                                                condition_id?: string;
                                                field_type?: number;
                                            }>;
                                            condition_omitted?: boolean;
                                        };
                                        hidden_fields?: Array<string>;
                                        hierarchy_config?: {
                                            field_id?: string;
                                        };
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.table.view&version=v1 document }
             *
             * 删除视图
             *
             * 通过 app_token、table_id 和 view_id，删除多维表格数据表中的指定视图。
             */
            delete: async (
                payload?: {
                    path?: {
                        app_token?: string;
                        table_id?: string;
                        view_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=bitable&resource=app.table.view&version=v1 document }
             *
             * 获取视图
             *
             * 根据视图 ID 获取现有视图信息，包括视图名称、类型、属性等。
             */
            get: async (
                payload?: {
                    params?: { user_id_type?: string };
                    path?: {
                        app_token?: string;
                        table_id?: string;
                        view_id?: string;
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
                                view?: {
                                    view_id?: string;
                                    view_name?: string;
                                    view_type?: string;
                                    property?: {
                                        filter_info?: {
                                            conjunction: "and" | "or";
                                            conditions: Array<{
                                                field_id: string;
                                                operator:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty"
                                                    | "isGreater"
                                                    | "isGreaterEqual"
                                                    | "isLess"
                                                    | "isLessEqual";
                                                value?: string;
                                                condition_id?: string;
                                                field_type?: number;
                                            }>;
                                            condition_omitted?: boolean;
                                        };
                                        hidden_fields?: Array<string>;
                                        hierarchy_config?: {
                                            field_id?: string;
                                        };
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
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
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { app_token?: string; table_id?: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
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
                                                    view_id?: string;
                                                    view_name?: string;
                                                    view_type?: string;
                                                    property?: {
                                                        filter_info?: {
                                                            conjunction:
                                                                | "and"
                                                                | "or";
                                                            conditions: Array<{
                                                                field_id: string;
                                                                operator:
                                                                    | "is"
                                                                    | "isNot"
                                                                    | "contains"
                                                                    | "doesNotContain"
                                                                    | "isEmpty"
                                                                    | "isNotEmpty"
                                                                    | "isGreater"
                                                                    | "isGreaterEqual"
                                                                    | "isLess"
                                                                    | "isLessEqual";
                                                                value?: string;
                                                                condition_id?: string;
                                                                field_type?: number;
                                                            }>;
                                                            condition_omitted?: boolean;
                                                        };
                                                        hidden_fields?: Array<string>;
                                                        hierarchy_config?: {
                                                            field_id?: string;
                                                        };
                                                    };
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                total?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.table.view&version=v1 document }
             *
             * 列出视图
             *
             * 获取多维表格数据表中的所有视图。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { app_token?: string; table_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    view_id?: string;
                                    view_name?: string;
                                    view_type?: string;
                                    property?: {
                                        filter_info?: {
                                            conjunction: "and" | "or";
                                            conditions: Array<{
                                                field_id: string;
                                                operator:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty"
                                                    | "isGreater"
                                                    | "isGreaterEqual"
                                                    | "isLess"
                                                    | "isLessEqual";
                                                value?: string;
                                                condition_id?: string;
                                                field_type?: number;
                                            }>;
                                            condition_omitted?: boolean;
                                        };
                                        hidden_fields?: Array<string>;
                                        hierarchy_config?: {
                                            field_id?: string;
                                        };
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
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
         * app.table.form
         */
        appTableForm: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=upgrade&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upgrade&project=bitable&resource=app.table.form&version=v1 document }
             *
             * 升级旧版表单
             *
             * 升级旧版表单至收集表
             */
            upgrade: async (
                payload?: {
                    data: {
                        form_name: string;
                        display_mode: "traditional" | "one_question_per_page";
                    };
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
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
                            data?: { form?: { id?: string } };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/upgrade`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=bitable&resource=app.table.form&version=v1 document }
             *
             * 获取表单元数据
             *
             * 获取表单的所有元数据，包括表单名称、描述、是否共享等。
             *
             * 表单视图是多维表格的一种视图类型。每个表单都有唯一标识 `form_id`，即当前视图的 `view_id`。
             */
            get: async (
                payload?: {
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
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
                                form: {
                                    name?: string;
                                    description?: string;
                                    shared?: boolean;
                                    shared_url?: string;
                                    shared_limit?:
                                        | "off"
                                        | "tenant_editable"
                                        | "anyone_editable";
                                    submit_limit_once?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=bitable&resource=app.table.form&version=v1 document }
             *
             * 更新表单元数据
             *
             * 更新表单视图中的元数据，包括表单名称、描述、是否共享等。
             *
             * 表单视图是多维表格的一种视图类型。每个表单都有唯一标识 `form_id`，即当前视图的 `view_id`。
             */
            patch: async (
                payload?: {
                    data?: {
                        name?: string;
                        description?: string;
                        shared?: boolean;
                        shared_limit?:
                            | "off"
                            | "tenant_editable"
                            | "anyone_editable";
                        submit_limit_once?: boolean;
                    };
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
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
                                form: {
                                    name?: string;
                                    description?: string;
                                    shared?: boolean;
                                    shared_url?: string;
                                    shared_limit?:
                                        | "off"
                                        | "tenant_editable"
                                        | "anyone_editable";
                                    submit_limit_once?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id`,
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
         * app.table.field_group
         */
        appTableFieldGroup: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field_group&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.table.field_group&version=v1 document }
             *
             * 创建字段编组
             *
             * 该接口用于为多维表格数据表的字段创建编组。创建字段编组后，字段将被组织到该编组中，便于多维表格的数据管理;#### 业务使用场景;适用于多维表格字段较多，需要分类管理字段的场景
             */
            create: async (
                payload?: {
                    data: {
                        field_groups: Array<{
                            id?: string;
                            name: string;
                            children: Array<{ type: "field"; id: string }>;
                            description?: string;
                        }>;
                    };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { field_groups?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/field_groups`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * app.table.form.field
         */
        appTableFormField: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=bitable&resource=app.table.form.field&version=v1 document }
             *
             * 更新表单问题
             *
             * 更新表单中的问题项。
             *
             * 表单视图是多维表格的一种视图类型。每个表单都有唯一标识 `form_id`，即当前视图的 `view_id`。
             */
            patch: async (
                payload?: {
                    data?: {
                        pre_field_id?: string;
                        title?: string;
                        description?: string;
                        required?: boolean;
                        visible?: boolean;
                        rich_description?: Array<{
                            segment_type: "text" | "url";
                            text: string;
                            link?: string;
                        }>;
                    };
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
                        field_id: string;
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
                                fields?: {
                                    pre_field_id?: string;
                                    title?: string;
                                    description?: string;
                                    required?: boolean;
                                    visible?: boolean;
                                    rich_description?: Array<{
                                        segment_type: "text" | "url";
                                        text: string;
                                        link?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields/:field_id`,
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
                    params?: { page_size?: number; page_token?: string };
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields`,
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
                                                items: Array<{
                                                    field_id?: string;
                                                    title?: string;
                                                    description?: string;
                                                    required?: boolean;
                                                    visible?: boolean;
                                                    rich_description?: Array<{
                                                        segment_type:
                                                            | "text"
                                                            | "url";
                                                        text: string;
                                                        link?: string;
                                                    }>;
                                                }>;
                                                page_token: string;
                                                has_more: boolean;
                                                total: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.table.form.field&version=v1 document }
             *
             * 列出表单问题
             *
             * 列出表单中的所有问题项。
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
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
                                    field_id?: string;
                                    title?: string;
                                    description?: string;
                                    required?: boolean;
                                    visible?: boolean;
                                    rich_description?: Array<{
                                        segment_type: "text" | "url";
                                        text: string;
                                        link?: string;
                                    }>;
                                }>;
                                page_token: string;
                                has_more: boolean;
                                total: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields`,
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
         * app.workflow
         */
        appWorkflow: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.workflow&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=bitable&resource=app.workflow&version=v1 document }
             *
             * 更新自动化流程状态
             *
             * 开启或关闭自动化流程。
             */
            update: async (
                payload?: {
                    data: { status: string };
                    path: { app_token?: string; workflow_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/workflows/:workflow_id`,
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
                    path?: { app_token?: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/workflows`,
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
                                                workflows: Array<{
                                                    workflow_id: string;
                                                    status?: string;
                                                    title?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.workflow&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.workflow&version=v1 document }
             *
             * 列出自动化流程
             *
             * 该接口用于列出多维表格的自动化流程。
             */
            list: async (
                payload?: {
                    path?: { app_token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                workflows: Array<{
                                    workflow_id: string;
                                    status?: string;
                                    title?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/workflows`,
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
         * app.table.field
         */
        appTableField: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.table.field&version=v1 document }
             *
             * 删除字段
             *
             * 删除多维表格数据表中的一个字段。
             */
            delete: async (
                payload?: {
                    path: {
                        app_token: string;
                        table_id: string;
                        field_id: string;
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
                            data?: { field_id?: string; deleted?: boolean };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id`,
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
                        view_id?: string;
                        text_field_as_array?: boolean;
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { app_token: string; table_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
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
                                                total?: number;
                                                items?: Array<{
                                                    field_name: string;
                                                    type: number;
                                                    property?: {
                                                        options?: Array<{
                                                            name?: string;
                                                            id?: string;
                                                            color?: number;
                                                        }>;
                                                        formatter?: string;
                                                        date_formatter?: string;
                                                        auto_fill?: boolean;
                                                        multiple?: boolean;
                                                        table_id?: string;
                                                        table_name?: string;
                                                        back_field_name?: string;
                                                        auto_serial?: {
                                                            type:
                                                                | "custom"
                                                                | "auto_increment_number";
                                                            options?: Array<{
                                                                type:
                                                                    | "system_number"
                                                                    | "fixed_text"
                                                                    | "created_time";
                                                                value: string;
                                                            }>;
                                                        };
                                                        location?: {
                                                            input_type:
                                                                | "only_mobile"
                                                                | "not_limit";
                                                        };
                                                        formula_expression?: string;
                                                        allowed_edit_modes?: {
                                                            manual?: boolean;
                                                            scan?: boolean;
                                                        };
                                                        min?: number;
                                                        max?: number;
                                                        range_customize?: boolean;
                                                        currency_code?: string;
                                                        rating?: {
                                                            symbol?: string;
                                                        };
                                                        type?: {
                                                            data_type: number;
                                                            ui_property?: {
                                                                currency_code?: string;
                                                                formatter?: string;
                                                                range_customize?: boolean;
                                                                min?: number;
                                                                max?: number;
                                                                date_formatter?: string;
                                                                rating?: {
                                                                    symbol?: string;
                                                                };
                                                            };
                                                            ui_type?:
                                                                | "Number"
                                                                | "Progress"
                                                                | "Currency"
                                                                | "Rating"
                                                                | "DateTime";
                                                        };
                                                        filter_info?: {
                                                            target_table?: string;
                                                            filter_info?: {
                                                                conjunction:
                                                                    | "and"
                                                                    | "or";
                                                                conditions: Array<{
                                                                    field_id: string;
                                                                    operator:
                                                                        | "is"
                                                                        | "isNot"
                                                                        | "contains"
                                                                        | "doesNotContain"
                                                                        | "isEmpty"
                                                                        | "isNotEmpty"
                                                                        | "isGreater"
                                                                        | "isGreaterEqual"
                                                                        | "isLess"
                                                                        | "isLessEqual";
                                                                    value?: string;
                                                                    condition_id?: string;
                                                                    field_type?: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    description?: string;
                                                    is_primary?: boolean;
                                                    field_id?: string;
                                                    ui_type?:
                                                        | "Text"
                                                        | "Barcode"
                                                        | "Number"
                                                        | "Progress"
                                                        | "Currency"
                                                        | "Rating"
                                                        | "SingleSelect"
                                                        | "MultiSelect"
                                                        | "DateTime"
                                                        | "Checkbox"
                                                        | "User"
                                                        | "GroupChat"
                                                        | "Phone"
                                                        | "Url"
                                                        | "Attachment"
                                                        | "SingleLink"
                                                        | "Formula"
                                                        | "DuplexLink"
                                                        | "Location"
                                                        | "CreatedTime"
                                                        | "ModifiedTime"
                                                        | "CreatedUser"
                                                        | "ModifiedUser"
                                                        | "AutoNumber";
                                                    is_hidden?: boolean;
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.table.field&version=v1 document }
             *
             * 列出字段
             *
             * 获取多维表格数据表中的的所有字段。
             */
            list: async (
                payload?: {
                    params?: {
                        view_id?: string;
                        text_field_as_array?: boolean;
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                total?: number;
                                items?: Array<{
                                    field_name: string;
                                    type: number;
                                    property?: {
                                        options?: Array<{
                                            name?: string;
                                            id?: string;
                                            color?: number;
                                        }>;
                                        formatter?: string;
                                        date_formatter?: string;
                                        auto_fill?: boolean;
                                        multiple?: boolean;
                                        table_id?: string;
                                        table_name?: string;
                                        back_field_name?: string;
                                        auto_serial?: {
                                            type:
                                                | "custom"
                                                | "auto_increment_number";
                                            options?: Array<{
                                                type:
                                                    | "system_number"
                                                    | "fixed_text"
                                                    | "created_time";
                                                value: string;
                                            }>;
                                        };
                                        location?: {
                                            input_type:
                                                | "only_mobile"
                                                | "not_limit";
                                        };
                                        formula_expression?: string;
                                        allowed_edit_modes?: {
                                            manual?: boolean;
                                            scan?: boolean;
                                        };
                                        min?: number;
                                        max?: number;
                                        range_customize?: boolean;
                                        currency_code?: string;
                                        rating?: { symbol?: string };
                                        type?: {
                                            data_type: number;
                                            ui_property?: {
                                                currency_code?: string;
                                                formatter?: string;
                                                range_customize?: boolean;
                                                min?: number;
                                                max?: number;
                                                date_formatter?: string;
                                                rating?: { symbol?: string };
                                            };
                                            ui_type?:
                                                | "Number"
                                                | "Progress"
                                                | "Currency"
                                                | "Rating"
                                                | "DateTime";
                                        };
                                        filter_info?: {
                                            target_table?: string;
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                            };
                                        };
                                    };
                                    description?: string;
                                    is_primary?: boolean;
                                    field_id?: string;
                                    ui_type?:
                                        | "Text"
                                        | "Barcode"
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "SingleSelect"
                                        | "MultiSelect"
                                        | "DateTime"
                                        | "Checkbox"
                                        | "User"
                                        | "GroupChat"
                                        | "Phone"
                                        | "Url"
                                        | "Attachment"
                                        | "SingleLink"
                                        | "Formula"
                                        | "DuplexLink"
                                        | "Location"
                                        | "CreatedTime"
                                        | "ModifiedTime"
                                        | "CreatedUser"
                                        | "ModifiedUser"
                                        | "AutoNumber";
                                    is_hidden?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=bitable&resource=app.table.field&version=v1 document }
             *
             * 更新字段
             *
             * 在多维表格数据表中更新一个字段。更新字段时为全量更新，property 等字段会被完全覆盖。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
             */
            update: async (
                payload?: {
                    data: {
                        field_name: string;
                        type: number;
                        property?: {
                            options?: Array<{
                                name?: string;
                                id?: string;
                                color?: number;
                            }>;
                            formatter?: string;
                            date_formatter?: string;
                            auto_fill?: boolean;
                            multiple?: boolean;
                            table_id?: string;
                            table_name?: string;
                            back_field_name?: string;
                            auto_serial?: {
                                type: "custom" | "auto_increment_number";
                                options?: Array<{
                                    type:
                                        | "system_number"
                                        | "fixed_text"
                                        | "created_time";
                                    value: string;
                                }>;
                            };
                            location?: {
                                input_type: "only_mobile" | "not_limit";
                            };
                            formula_expression?: string;
                            allowed_edit_modes?: {
                                manual?: boolean;
                                scan?: boolean;
                            };
                            min?: number;
                            max?: number;
                            range_customize?: boolean;
                            currency_code?: string;
                            rating?: { symbol?: string };
                            type?: {
                                data_type: number;
                                ui_property?: {
                                    currency_code?: string;
                                    formatter?: string;
                                    range_customize?: boolean;
                                    min?: number;
                                    max?: number;
                                    date_formatter?: string;
                                    rating?: { symbol?: string };
                                };
                                ui_type?:
                                    | "Number"
                                    | "Progress"
                                    | "Currency"
                                    | "Rating"
                                    | "DateTime";
                            };
                            filter_info?: {
                                target_table?: string;
                                filter_info?: {
                                    conjunction: "and" | "or";
                                    conditions: Array<{
                                        field_id: string;
                                        operator:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty"
                                            | "isGreater"
                                            | "isGreaterEqual"
                                            | "isLess"
                                            | "isLessEqual";
                                        value?: string;
                                    }>;
                                };
                            };
                        };
                        description?: { disable_sync?: boolean; text?: string };
                        is_primary?: boolean;
                        ui_type?:
                            | "Text"
                            | "Email"
                            | "Barcode"
                            | "Number"
                            | "Progress"
                            | "Currency"
                            | "Rating"
                            | "SingleSelect"
                            | "MultiSelect"
                            | "DateTime"
                            | "Checkbox"
                            | "User"
                            | "GroupChat"
                            | "Phone"
                            | "Url"
                            | "Attachment"
                            | "SingleLink"
                            | "Formula"
                            | "DuplexLink"
                            | "Location"
                            | "CreatedTime"
                            | "ModifiedTime"
                            | "CreatedUser"
                            | "ModifiedUser"
                            | "AutoNumber"
                            | "Signature";
                        is_hidden?: boolean;
                    };
                    params?: { client_token?: string };
                    path: {
                        app_token: string;
                        table_id: string;
                        field_id: string;
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
                                field?: {
                                    field_name: string;
                                    type: number;
                                    property?: {
                                        options?: Array<{
                                            name?: string;
                                            id?: string;
                                            color?: number;
                                        }>;
                                        formatter?: string;
                                        date_formatter?: string;
                                        auto_fill?: boolean;
                                        multiple?: boolean;
                                        table_id?: string;
                                        table_name?: string;
                                        back_field_name?: string;
                                        auto_serial?: {
                                            type:
                                                | "custom"
                                                | "auto_increment_number";
                                            options?: Array<{
                                                type:
                                                    | "system_number"
                                                    | "fixed_text"
                                                    | "created_time";
                                                value: string;
                                            }>;
                                        };
                                        location?: {
                                            input_type:
                                                | "only_mobile"
                                                | "not_limit";
                                        };
                                        formula_expression?: string;
                                        allowed_edit_modes?: {
                                            manual?: boolean;
                                            scan?: boolean;
                                        };
                                        min?: number;
                                        max?: number;
                                        range_customize?: boolean;
                                        currency_code?: string;
                                        rating?: { symbol?: string };
                                        type?: {
                                            data_type: number;
                                            ui_property?: {
                                                currency_code?: string;
                                                formatter?: string;
                                                range_customize?: boolean;
                                                min?: number;
                                                max?: number;
                                                date_formatter?: string;
                                                rating?: { symbol?: string };
                                            };
                                            ui_type?:
                                                | "Number"
                                                | "Progress"
                                                | "Currency"
                                                | "Rating"
                                                | "DateTime";
                                        };
                                        filter_info?: {
                                            target_table?: string;
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                            };
                                        };
                                    };
                                    description?: {
                                        disable_sync?: boolean;
                                        text?: string;
                                    };
                                    is_primary?: boolean;
                                    field_id?: string;
                                    ui_type?:
                                        | "Text"
                                        | "Email"
                                        | "Barcode"
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "SingleSelect"
                                        | "MultiSelect"
                                        | "DateTime"
                                        | "Checkbox"
                                        | "User"
                                        | "GroupChat"
                                        | "Phone"
                                        | "Url"
                                        | "Attachment"
                                        | "SingleLink"
                                        | "Formula"
                                        | "DuplexLink"
                                        | "Location"
                                        | "CreatedTime"
                                        | "ModifiedTime"
                                        | "CreatedUser"
                                        | "ModifiedUser"
                                        | "AutoNumber"
                                        | "Signature";
                                    is_hidden?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.table.field&version=v1 document }
             *
             * 新增字段
             *
             * 在多维表格数据表中新增一个字段。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
             */
            create: async (
                payload?: {
                    data: {
                        field_name: string;
                        type: number;
                        property?: {
                            options?: Array<{
                                name?: string;
                                id?: string;
                                color?: number;
                            }>;
                            formatter?: string;
                            date_formatter?: string;
                            auto_fill?: boolean;
                            multiple?: boolean;
                            table_id?: string;
                            table_name?: string;
                            back_field_name?: string;
                            auto_serial?: {
                                type: "custom" | "auto_increment_number";
                                options?: Array<{
                                    type:
                                        | "system_number"
                                        | "fixed_text"
                                        | "created_time";
                                    value: string;
                                }>;
                            };
                            location?: {
                                input_type: "only_mobile" | "not_limit";
                            };
                            formula_expression?: string;
                            allowed_edit_modes?: {
                                manual?: boolean;
                                scan?: boolean;
                            };
                            min?: number;
                            max?: number;
                            range_customize?: boolean;
                            currency_code?: string;
                            rating?: { symbol?: string };
                            type?: {
                                data_type: number;
                                ui_property?: {
                                    currency_code?: string;
                                    formatter?: string;
                                    range_customize?: boolean;
                                    min?: number;
                                    max?: number;
                                    date_formatter?: string;
                                    rating?: { symbol?: string };
                                };
                                ui_type?:
                                    | "Number"
                                    | "Progress"
                                    | "Currency"
                                    | "Rating"
                                    | "DateTime";
                            };
                            filter_info?: {
                                target_table?: string;
                                filter_info?: {
                                    conjunction: "and" | "or";
                                    conditions: Array<{
                                        field_id: string;
                                        operator:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty"
                                            | "isGreater"
                                            | "isGreaterEqual"
                                            | "isLess"
                                            | "isLessEqual";
                                        value?: string;
                                    }>;
                                };
                            };
                        };
                        description?: { disable_sync?: boolean; text?: string };
                        is_primary?: boolean;
                        field_id?: string;
                        ui_type?:
                            | "Text"
                            | "Email"
                            | "Barcode"
                            | "Number"
                            | "Progress"
                            | "Currency"
                            | "Rating"
                            | "SingleSelect"
                            | "MultiSelect"
                            | "DateTime"
                            | "Checkbox"
                            | "User"
                            | "GroupChat"
                            | "Phone"
                            | "Url"
                            | "Attachment"
                            | "SingleLink"
                            | "Formula"
                            | "DuplexLink"
                            | "Location"
                            | "CreatedTime"
                            | "ModifiedTime"
                            | "CreatedUser"
                            | "ModifiedUser"
                            | "AutoNumber"
                            | "Signature";
                        is_hidden?: boolean;
                    };
                    params?: { client_token?: string };
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                field?: {
                                    field_name: string;
                                    type: number;
                                    property?: {
                                        options?: Array<{
                                            name?: string;
                                            id?: string;
                                            color?: number;
                                        }>;
                                        formatter?: string;
                                        date_formatter?: string;
                                        auto_fill?: boolean;
                                        multiple?: boolean;
                                        table_id?: string;
                                        table_name?: string;
                                        back_field_name?: string;
                                        auto_serial?: {
                                            type:
                                                | "custom"
                                                | "auto_increment_number";
                                            options?: Array<{
                                                type:
                                                    | "system_number"
                                                    | "fixed_text"
                                                    | "created_time";
                                                value: string;
                                            }>;
                                        };
                                        location?: {
                                            input_type:
                                                | "only_mobile"
                                                | "not_limit";
                                        };
                                        formula_expression?: string;
                                        allowed_edit_modes?: {
                                            manual?: boolean;
                                            scan?: boolean;
                                        };
                                        min?: number;
                                        max?: number;
                                        range_customize?: boolean;
                                        currency_code?: string;
                                        rating?: { symbol?: string };
                                        type?: {
                                            data_type: number;
                                            ui_property?: {
                                                currency_code?: string;
                                                formatter?: string;
                                                range_customize?: boolean;
                                                min?: number;
                                                max?: number;
                                                date_formatter?: string;
                                                rating?: { symbol?: string };
                                            };
                                            ui_type?:
                                                | "Number"
                                                | "Progress"
                                                | "Currency"
                                                | "Rating"
                                                | "DateTime";
                                        };
                                        filter_info?: {
                                            target_table?: string;
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                            };
                                        };
                                    };
                                    description?: {
                                        disable_sync?: boolean;
                                        text?: string;
                                    };
                                    is_primary?: boolean;
                                    field_id?: string;
                                    ui_type?:
                                        | "Text"
                                        | "Email"
                                        | "Barcode"
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "SingleSelect"
                                        | "MultiSelect"
                                        | "DateTime"
                                        | "Checkbox"
                                        | "User"
                                        | "GroupChat"
                                        | "Phone"
                                        | "Url"
                                        | "Attachment"
                                        | "SingleLink"
                                        | "Formula"
                                        | "DuplexLink"
                                        | "Location"
                                        | "CreatedTime"
                                        | "ModifiedTime"
                                        | "CreatedUser"
                                        | "ModifiedUser"
                                        | "AutoNumber"
                                        | "Signature";
                                    is_hidden?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * app.block_workflow
         */
        appBlockWorkflow: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.block_workflow&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.block_workflow&version=v1 document }
             *
             * 列出工作流
             *
             * 此接口用于返回多维表格中所有工作流，多维表格管理员可通过此接口来管理表中的工作流
             */
            list: async (
                payload?: {
                    path: { app_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                workflows?: Array<{
                                    workflow_id?: string;
                                    title?: string;
                                    status?: "Enable" | "Disable";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/block_workflows`,
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
             * app.table
             */
            appTable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=bitable&resource=app.table&version=v1 document }
                 *
                 * 更新数据表
                 *
                 * 更新数据表的名称。
                 */
                patch: async (
                    payload?: {
                        data?: { name?: string };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { name?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=bitable&resource=app.table&version=v1 document }
                 *
                 * 删除多个数据表
                 *
                 * 通过 app_token 和 table_id 删除多个数据表。
                 *
                 * ## 注意事项;;如果多维表格中只剩最后一张数据表，则不允许被删除。
                 */
                batchDelete: async (
                    payload?: {
                        data?: { table_ids?: Array<string> };
                        path: { app_token: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/batch_delete`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=bitable&resource=app.table&version=v1 document }
                 *
                 * 新增多个数据表
                 *
                 * 新增多个数据表，仅可指定数据表名称。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;## 使用限制;;每个多维表格中，数据表与仪表盘的总数量上限为 100。;
                 */
                batchCreate: async (
                    payload?: {
                        data?: {
                            tables?: Array<{
                                name?: string;
                                default_view_name?: string;
                                fields?: Array<{
                                    field_name: string;
                                    type: number;
                                    ui_type?:
                                        | "Text"
                                        | "Barcode"
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "SingleSelect"
                                        | "MultiSelect"
                                        | "DateTime"
                                        | "Checkbox"
                                        | "User"
                                        | "GroupChat"
                                        | "Phone"
                                        | "Url"
                                        | "Attachment"
                                        | "SingleLink"
                                        | "Formula"
                                        | "DuplexLink"
                                        | "Location"
                                        | "CreatedTime"
                                        | "ModifiedTime"
                                        | "CreatedUser"
                                        | "ModifiedUser"
                                        | "AutoNumber";
                                    property?: {
                                        options?: Array<{
                                            name?: string;
                                            id?: string;
                                            color?: number;
                                        }>;
                                        formatter?: string;
                                        date_formatter?: string;
                                        auto_fill?: boolean;
                                        multiple?: boolean;
                                        table_id?: string;
                                        table_name?: string;
                                        back_field_name?: string;
                                        auto_serial?: {
                                            type:
                                                | "custom"
                                                | "auto_increment_number";
                                            options?: Array<{
                                                type:
                                                    | "system_number"
                                                    | "fixed_text"
                                                    | "created_time";
                                                value: string;
                                            }>;
                                        };
                                        location?: {
                                            input_type:
                                                | "only_mobile"
                                                | "not_limit";
                                        };
                                        formula_expression?: string;
                                        allowed_edit_modes?: {
                                            manual?: boolean;
                                            scan?: boolean;
                                        };
                                        min?: number;
                                        max?: number;
                                        range_customize?: boolean;
                                        currency_code?: string;
                                        rating?: { symbol?: string };
                                        type?: {
                                            data_type: number;
                                            ui_property?: {
                                                currency_code?: string;
                                                formatter?: string;
                                                range_customize?: boolean;
                                                min?: number;
                                                max?: number;
                                                date_formatter?: string;
                                                rating?: { symbol?: string };
                                            };
                                            ui_type?:
                                                | "Number"
                                                | "Progress"
                                                | "Currency"
                                                | "Rating"
                                                | "DateTime";
                                        };
                                        filter_info?: {
                                            target_table?: string;
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                            };
                                        };
                                    };
                                    description?: {
                                        disable_sync?: boolean;
                                        text?: string;
                                    };
                                }>;
                            }>;
                        };
                        path: { app_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { table_ids?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.table&version=v1 document }
                 *
                 * 新增一个数据表
                 *
                 * 新增一个数据表，支持传入数据表名称、视图名称和字段。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;## 使用限制;;每个多维表格中，数据表与仪表盘的总数量上限为 100。
                 */
                create: async (
                    payload?: {
                        data?: {
                            table?: {
                                name?: string;
                                default_view_name?: string;
                                fields?: Array<{
                                    field_name: string;
                                    type: number;
                                    ui_type?:
                                        | "Text"
                                        | "Barcode"
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "SingleSelect"
                                        | "MultiSelect"
                                        | "DateTime"
                                        | "Checkbox"
                                        | "User"
                                        | "GroupChat"
                                        | "Phone"
                                        | "Url"
                                        | "Attachment"
                                        | "SingleLink"
                                        | "Formula"
                                        | "DuplexLink"
                                        | "Location"
                                        | "CreatedTime"
                                        | "ModifiedTime"
                                        | "CreatedUser"
                                        | "ModifiedUser"
                                        | "AutoNumber";
                                    property?: {
                                        options?: Array<{
                                            name?: string;
                                            id?: string;
                                            color?: number;
                                        }>;
                                        formatter?: string;
                                        date_formatter?: string;
                                        auto_fill?: boolean;
                                        multiple?: boolean;
                                        table_id?: string;
                                        table_name?: string;
                                        back_field_name?: string;
                                        auto_serial?: {
                                            type:
                                                | "custom"
                                                | "auto_increment_number";
                                            options?: Array<{
                                                type:
                                                    | "system_number"
                                                    | "fixed_text"
                                                    | "created_time";
                                                value: string;
                                            }>;
                                        };
                                        location?: {
                                            input_type:
                                                | "only_mobile"
                                                | "not_limit";
                                        };
                                        formula_expression?: string;
                                        allowed_edit_modes?: {
                                            manual?: boolean;
                                            scan?: boolean;
                                        };
                                        min?: number;
                                        max?: number;
                                        range_customize?: boolean;
                                        currency_code?: string;
                                        rating?: { symbol?: string };
                                        type?: {
                                            data_type: number;
                                            ui_property?: {
                                                currency_code?: string;
                                                formatter?: string;
                                                range_customize?: boolean;
                                                min?: number;
                                                max?: number;
                                                date_formatter?: string;
                                                rating?: { symbol?: string };
                                            };
                                            ui_type?:
                                                | "Number"
                                                | "Progress"
                                                | "Currency"
                                                | "Rating"
                                                | "DateTime";
                                        };
                                        filter_info?: {
                                            target_table?: string;
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                }>;
                                            };
                                        };
                                    };
                                    description?: {
                                        disable_sync?: boolean;
                                        text?: string;
                                    };
                                }>;
                            };
                        };
                        path: { app_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    table_id?: string;
                                    default_view_id?: string;
                                    field_id_list?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.table&version=v1 document }
                 *
                 * 删除一个数据表
                 *
                 * 通过 app_token 和 table_id 删除指定的多维表格数据表。
                 *
                 * ## 注意事项;;如果多维表格中只剩最后一张数据表，则不允许被删除。
                 */
                delete: async (
                    payload?: {
                        path: { app_token: string; table_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id`,
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
                        path: { app_token: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
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
                                                    total?: number;
                                                    items?: Array<{
                                                        table_id?: string;
                                                        revision?: number;
                                                        name?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.table&version=v1 document }
                 *
                 * 列出数据表
                 *
                 * 列出多维表格中的所有数据表，包括其 ID、版本号和名称。
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { app_token: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                    total?: number;
                                    items?: Array<{
                                        table_id?: string;
                                        revision?: number;
                                        name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
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
             * app.dashboard
             */
            appDashboard: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.dashboard&apiName=copy&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=copy&project=bitable&resource=app.dashboard&version=v1 document }
                 *
                 * 复制仪表盘
                 *
                 * 基于现有仪表盘复制出新的仪表盘。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有原多维表格的阅读权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
                 */
                copy: async (
                    payload?: {
                        data: { name: string };
                        path: { app_token: string; block_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { block_id?: string; name?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards/:block_id/copy`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
                            with_share_config?: boolean;
                        };
                        path: { app_token: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards`,
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
                                                    dashboards: Array<{
                                                        block_id: string;
                                                        name: string;
                                                        share_config?: {
                                                            share_flag?: boolean;
                                                            share_scope_type?:
                                                                | "1"
                                                                | "2"
                                                                | "3";
                                                            share_token?: string;
                                                            share_link?: string;
                                                            show_source?: boolean;
                                                            source_link?: string;
                                                        };
                                                    }>;
                                                    page_token: string;
                                                    has_more: boolean;
                                                    total?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.dashboard&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.dashboard&version=v1 document }
                 *
                 * 列出仪表盘
                 *
                 * 获取多维表格中的所有仪表盘。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的阅读等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            with_share_config?: boolean;
                        };
                        path: { app_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    dashboards: Array<{
                                        block_id: string;
                                        name: string;
                                        share_config?: {
                                            share_flag?: boolean;
                                            share_scope_type?: "1" | "2" | "3";
                                            share_token?: string;
                                            share_link?: string;
                                            show_source?: boolean;
                                            source_link?: string;
                                        };
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=bitable&resource=app&version=v1 document }
                 *
                 * 更新多维表格元数据
                 *
                 * 更新多维表格元数据，包括多维表格的名称、是否开启高级权限。
                 */
                update: async (
                    payload?: {
                        data?: { name?: string; is_advanced?: boolean };
                        path: { app_token: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        app_token?: string;
                                        name?: string;
                                        is_advanced?: boolean;
                                        time_zone?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=copy&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=copy&project=bitable&resource=app&version=v1 document }
                 *
                 * 复制多维表格
                 *
                 * 复制一个多维表格，可以指定复制到某个有权限的文件夹下。
                 *
                 * 当多维表格记录数超 50,000 条可复制上限时，仅可复制多维表格结构。;;## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格和目标文件夹的阅读、编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通云文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
                 */
                copy: async (
                    payload?: {
                        data?: {
                            name?: string;
                            folder_token?: string;
                            without_content?: boolean;
                            time_zone?: string;
                        };
                        path: { app_token: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        app_token?: string;
                                        name?: string;
                                        revision?: number;
                                        folder_token?: string;
                                        url?: string;
                                        time_zone?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/copy`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app&version=v1 document }
                 *
                 * 创建多维表格
                 *
                 * 在指定文件夹中创建一个多维表格，包含一个空白的数据表。
                 *
                 * 要基于模板创建多维表格，可先获取模板多维表格 `app_token` 作为文件 token，再调用[复制文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/copy)接口创建多维表格。
                 */
                create: async (
                    payload?: {
                        data?: {
                            name?: string;
                            folder_token?: string;
                            time_zone?: string;
                        };
                        params?: {
                            customized_config?: boolean;
                            source_app_token?: string;
                            copy_types?: Array<string>;
                            api_type?: string;
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
                                        app_token?: string;
                                        name?: string;
                                        revision?: number;
                                        folder_token?: string;
                                        url?: string;
                                        default_table_id?: string;
                                        time_zone?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=bitable&resource=app&version=v1 document }
                 *
                 * 获取多维表格元数据
                 *
                 * 获取指定多维表格的元数据信息，包括多维表格名称、多维表格版本号、多维表格是否开启高级权限等。
                 */
                get: async (
                    payload?: {
                        path: { app_token: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        app_token?: string;
                                        name?: string;
                                        revision?: number;
                                        is_advanced?: boolean;
                                        time_zone?: string;
                                        formula_type?: number;
                                        advance_version?: "v1" | "v2";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token`,
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
             * app.table.record
             */
            appTableRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 删除多条记录
                 *
                 * 删除多维表格数据表中现有的多条记录。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;## 注意事项;;- 从其它数据源同步的数据表，不支持开发者对记录进行增加、删除、和修改操作。;- 单次调用中最多删除 500 条记录。
                 */
                batchDelete: async (
                    payload?: {
                        data: { records: Array<string> };
                        params?: { ignore_consistency_check?: boolean };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    records?: Array<{
                                        deleted?: boolean;
                                        record_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_delete`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 新增多条记录
                 *
                 * 在多维表格数据表中新增多条记录，单次调用最多新增 1,000 条记录。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;## 注意事项;;从其它数据源同步的数据表，不支持对记录进行增加、删除、和修改操作。
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            records: Array<{
                                fields: Record<
                                    string,
                                    | string
                                    | number
                                    | number
                                    | number
                                    | boolean
                                    | { text?: string; link?: string }
                                    | {
                                          location?: string;
                                          pname?: string;
                                          cityname?: string;
                                          adname?: string;
                                          address?: string;
                                          name?: string;
                                          full_address?: string;
                                      }
                                    | Array<{
                                          id?: string;
                                          name?: string;
                                          avatar_url?: string;
                                      }>
                                    | Array<string>
                                    | Array<{
                                          id?: string;
                                          name?: string;
                                          en_name?: string;
                                          email?: string;
                                          avatar_url?: string;
                                      }>
                                    | Array<{
                                          file_token?: string;
                                          name?: string;
                                          type?: string;
                                          size?: number;
                                          url?: string;
                                          tmp_url?: string;
                                      }>
                                >;
                                created_by?: {
                                    id?: string;
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    avatar_url?: string;
                                };
                                created_time?: number;
                                last_modified_by?: {
                                    id?: string;
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    avatar_url?: string;
                                };
                                last_modified_time?: number;
                                shared_url?: string;
                                record_url?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            client_token?: string;
                            ignore_consistency_check?: boolean;
                        };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    records?: Array<{
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 更新多条记录
                 *
                 * 更新数据表中的多条记录，单次调用最多更新 1,000 条记录。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;## 注意事项;从其它数据源同步的数据表，不支持对记录进行增加、删除、和修改操作。
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            records: Array<{
                                fields: Record<
                                    string,
                                    | string
                                    | number
                                    | number
                                    | number
                                    | boolean
                                    | { text?: string; link?: string }
                                    | {
                                          location?: string;
                                          pname?: string;
                                          cityname?: string;
                                          adname?: string;
                                          address?: string;
                                          name?: string;
                                          full_address?: string;
                                      }
                                    | Array<{
                                          id?: string;
                                          name?: string;
                                          avatar_url?: string;
                                      }>
                                    | Array<string>
                                    | Array<{
                                          id?: string;
                                          name?: string;
                                          en_name?: string;
                                          email?: string;
                                          avatar_url?: string;
                                      }>
                                    | Array<{
                                          file_token?: string;
                                          name?: string;
                                          type?: string;
                                          size?: number;
                                          url?: string;
                                          tmp_url?: string;
                                      }>
                                >;
                                record_id?: string;
                                created_by?: {
                                    id?: string;
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    avatar_url?: string;
                                };
                                created_time?: number;
                                last_modified_by?: {
                                    id?: string;
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    avatar_url?: string;
                                };
                                last_modified_time?: number;
                                shared_url?: string;
                                record_url?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            ignore_consistency_check?: boolean;
                            client_token?: string;
                        };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    records?: Array<{
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_update`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 更新记录
                 *
                 * 更新多维表格数据表中的一条记录。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;## 注意事项;;;- 从其它数据源同步的数据表，不支持对记录进行增加、删除、和修改操作。;- 更新记录为增量更新，仅更新传入的字段。如果想对记录中的某个字段值置空，可将字段设为 null，例如：;```json;{;  "fields": {;    "文本字段": null;  };};```
                 */
                update: async (
                    payload?: {
                        data: {
                            fields: Record<
                                string,
                                | string
                                | number
                                | number
                                | number
                                | boolean
                                | { text?: string; link?: string }
                                | {
                                      location?: string;
                                      pname?: string;
                                      cityname?: string;
                                      adname?: string;
                                      address?: string;
                                      name?: string;
                                      full_address?: string;
                                  }
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<string>
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      en_name?: string;
                                      email?: string;
                                  }>
                                | Array<{
                                      file_token?: string;
                                      name?: string;
                                      type?: string;
                                      size?: number;
                                      url?: string;
                                      tmp_url?: string;
                                  }>
                            >;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            ignore_consistency_check?: boolean;
                            client_token?: string;
                        };
                        path: {
                            app_token: string;
                            table_id: string;
                            record_id: string;
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
                                    record?: {
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 新增记录
                 *
                 * 在多维表格数据表中新增一条记录。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;;## 注意事项;;从其它数据源同步的数据表，不支持对记录进行增加、删除、和修改操作。
                 */
                create: async (
                    payload?: {
                        data: {
                            fields: Record<
                                string,
                                | string
                                | number
                                | number
                                | number
                                | boolean
                                | { text?: string; link?: string }
                                | {
                                      location?: string;
                                      pname?: string;
                                      cityname?: string;
                                      adname?: string;
                                      address?: string;
                                      name?: string;
                                      full_address?: string;
                                  }
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<string>
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      en_name?: string;
                                      email?: string;
                                  }>
                                | Array<{
                                      file_token?: string;
                                      name?: string;
                                      type?: string;
                                      size?: number;
                                      url?: string;
                                      tmp_url?: string;
                                  }>
                            >;
                            record_id?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            client_token?: string;
                            ignore_consistency_check?: boolean;
                        };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    record?: {
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
                            view_id?: string;
                            field_names?: Array<string>;
                            sort?: Array<{
                                field_name?: string;
                                desc?: boolean;
                            }>;
                            filter?: {
                                conjunction: "and" | "or";
                                conditions?: Array<{
                                    field_name: string;
                                    operator:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty"
                                        | "isGreater"
                                        | "isGreaterEqual"
                                        | "isLess"
                                        | "isLessEqual"
                                        | "like"
                                        | "in";
                                    value?: Array<string>;
                                }>;
                                children?: Array<{
                                    conjunction: "and" | "or";
                                    conditions?: Array<{
                                        field_name: string;
                                        operator:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty"
                                            | "isGreater"
                                            | "isGreaterEqual"
                                            | "isLess"
                                            | "isLessEqual"
                                            | "like"
                                            | "in";
                                        value?: Array<string>;
                                    }>;
                                }>;
                            };
                            automatic_fields?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { app_token: string; table_id: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search`,
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
                                                    items?: Array<{
                                                        fields: Record<
                                                            string,
                                                            | string
                                                            | number
                                                            | number
                                                            | number
                                                            | boolean
                                                            | {
                                                                  text?: string;
                                                                  link?: string;
                                                              }
                                                            | {
                                                                  location?: string;
                                                                  pname?: string;
                                                                  cityname?: string;
                                                                  adname?: string;
                                                                  address?: string;
                                                                  name?: string;
                                                                  full_address?: string;
                                                              }
                                                            | Array<{
                                                                  id?: string;
                                                                  name?: string;
                                                                  avatar_url?: string;
                                                              }>
                                                            | Array<string>
                                                            | Array<{
                                                                  id?: string;
                                                                  name?: string;
                                                                  en_name?: string;
                                                                  email?: string;
                                                                  avatar_url?: string;
                                                              }>
                                                            | Array<{
                                                                  file_token?: string;
                                                                  name?: string;
                                                                  type?: string;
                                                                  size?: number;
                                                                  url?: string;
                                                                  tmp_url?: string;
                                                              }>
                                                        >;
                                                        record_id?: string;
                                                        created_by?: {
                                                            id?: string;
                                                            name?: string;
                                                            en_name?: string;
                                                            email?: string;
                                                            avatar_url?: string;
                                                        };
                                                        created_time?: number;
                                                        last_modified_by?: {
                                                            id?: string;
                                                            name?: string;
                                                            en_name?: string;
                                                            email?: string;
                                                            avatar_url?: string;
                                                        };
                                                        last_modified_time?: number;
                                                        shared_url?: string;
                                                        record_url?: string;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    total?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 查询记录
                 *
                 * 该接口用于查询数据表中的现有记录，单次最多查询 500 行记录，支持分页获取。
                 *
                 * ## 注意事项;;若多维表格开启了高级权限，你需确保调用身份拥有多维表格的可管理权限，否则可能出现调用成功但返回数据为空的情况。了解具体步骤，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
                 */
                search: async (
                    payload?: {
                        data?: {
                            view_id?: string;
                            field_names?: Array<string>;
                            sort?: Array<{
                                field_name?: string;
                                desc?: boolean;
                            }>;
                            filter?: {
                                conjunction: "and" | "or";
                                conditions?: Array<{
                                    field_name: string;
                                    operator:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty"
                                        | "isGreater"
                                        | "isGreaterEqual"
                                        | "isLess"
                                        | "isLessEqual"
                                        | "like"
                                        | "in";
                                    value?: Array<string>;
                                }>;
                                children?: Array<{
                                    conjunction: "and" | "or";
                                    conditions?: Array<{
                                        field_name: string;
                                        operator:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty"
                                            | "isGreater"
                                            | "isGreaterEqual"
                                            | "isLess"
                                            | "isLessEqual"
                                            | "like"
                                            | "in";
                                        value?: Array<string>;
                                    }>;
                                }>;
                            };
                            automatic_fields?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 批量获取记录
                 *
                 * 通过多个记录 ID 查询记录信息。该接口最多支持查询 100 条记录。
                 */
                batchGet: async (
                    payload?: {
                        data: {
                            record_ids: Array<string>;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            with_shared_url?: boolean;
                            automatic_fields?: boolean;
                        };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    records?: Array<{
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    }>;
                                    forbidden_record_ids?: Array<string>;
                                    absent_record_ids?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_get`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 删除记录
                 *
                 * 删除多维表格数据表中的一条记录。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。;;;## 注意事项;;从其它数据源同步的数据表，不支持对记录进行增加、删除、和修改操作。
                 */
                delete: async (
                    payload?: {
                        params?: { ignore_consistency_check?: boolean };
                        path: {
                            app_token: string;
                            table_id: string;
                            record_id: string;
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
                                    deleted?: boolean;
                                    record_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 检索记录
                 *
                 * 该接口用于根据 record_id 的值检索现有记录。
                 *
                 * 该接口为历史版本接口，已不推荐使用。你可使用新版[批量获取记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_get)接口。
                 */
                get: async (
                    payload?: {
                        params?: {
                            text_field_as_array?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            display_formula_ref?: boolean;
                            with_shared_url?: boolean;
                            automatic_fields?: boolean;
                        };
                        path: {
                            app_token: string;
                            table_id: string;
                            record_id: string;
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
                                    record?: {
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
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
                            view_id?: string;
                            filter?: string;
                            sort?: string;
                            field_names?: string;
                            text_field_as_array?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            display_formula_ref?: boolean;
                            automatic_fields?: boolean;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { app_token: string; table_id: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
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
                                                    total?: number;
                                                    items?: Array<{
                                                        fields: Record<
                                                            string,
                                                            | string
                                                            | number
                                                            | number
                                                            | number
                                                            | boolean
                                                            | {
                                                                  text?: string;
                                                                  link?: string;
                                                              }
                                                            | {
                                                                  location?: string;
                                                                  pname?: string;
                                                                  cityname?: string;
                                                                  adname?: string;
                                                                  address?: string;
                                                                  name?: string;
                                                                  full_address?: string;
                                                              }
                                                            | Array<{
                                                                  id?: string;
                                                                  name?: string;
                                                                  avatar_url?: string;
                                                              }>
                                                            | Array<string>
                                                            | Array<{
                                                                  id?: string;
                                                                  name?: string;
                                                                  en_name?: string;
                                                                  email?: string;
                                                                  avatar_url?: string;
                                                              }>
                                                            | Array<{
                                                                  file_token?: string;
                                                                  name?: string;
                                                                  type?: string;
                                                                  size?: number;
                                                                  url?: string;
                                                                  tmp_url?: string;
                                                              }>
                                                        >;
                                                        record_id?: string;
                                                        created_by?: {
                                                            id?: string;
                                                            name?: string;
                                                            en_name?: string;
                                                            email?: string;
                                                            avatar_url?: string;
                                                        };
                                                        created_time?: number;
                                                        last_modified_by?: {
                                                            id?: string;
                                                            name?: string;
                                                            en_name?: string;
                                                            email?: string;
                                                            avatar_url?: string;
                                                        };
                                                        last_modified_time?: number;
                                                        shared_url?: string;
                                                        record_url?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 列出记录
                 *
                 * 该接口用于列出数据表中的现有记录，单次最多列出 500 行记录，支持分页获取。
                 *
                 * ::: note;该接口为历史接口，已不推荐使用。你可使用[查询记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/search)替代。;:::
                 */
                list: async (
                    payload?: {
                        params?: {
                            view_id?: string;
                            filter?: string;
                            sort?: string;
                            field_names?: string;
                            text_field_as_array?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            display_formula_ref?: boolean;
                            automatic_fields?: boolean;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                    total?: number;
                                    items?: Array<{
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
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
             * app.role.member
             */
            appRoleMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=bitable&resource=app.role.member&version=v1 document }
                 *
                 * 批量删除协作者
                 *
                 * 删除多维表格高级权限中自定义角色的协作者。
                 *
                 * ## 前提条件;;要调用协作者相关接口，你需确保多维表格已开启高级权限并设置了自定义角色。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限，通过[新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create)接口设置自定义角色。
                 */
                batchDelete: async (
                    payload?: {
                        data: {
                            member_list: Array<{
                                type?:
                                    | "open_id"
                                    | "union_id"
                                    | "user_id"
                                    | "chat_id"
                                    | "department_id"
                                    | "open_department_id";
                                id: string;
                            }>;
                        };
                        path: { app_token: string; role_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_delete`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=bitable&resource=app.role.member&version=v1 document }
                 *
                 * 批量新增协作者
                 *
                 * 批量新增多维表格高级权限中自定义角色的协作者。
                 *
                 * ## 前提条件;;要调用协作者相关接口，你需确保多维表格已开启高级权限并设置了自定义角色。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限，通过[新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create)接口设置自定义角色。;
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            member_list: Array<{
                                type?:
                                    | "open_id"
                                    | "union_id"
                                    | "user_id"
                                    | "chat_id"
                                    | "department_id"
                                    | "open_department_id";
                                id: string;
                            }>;
                        };
                        path: { app_token: string; role_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.role.member&version=v1 document }
                 *
                 * 新增协作者
                 *
                 * 新增多维表格高级权限中自定义角色的协作者。
                 */
                create: async (
                    payload?: {
                        data: { member_id: string };
                        params?: {
                            member_id_type?:
                                | "open_id"
                                | "union_id"
                                | "user_id"
                                | "chat_id"
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { app_token?: string; role_id?: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
                        path: { app_token: string; role_id: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
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
                                                        open_id?: string;
                                                        union_id?: string;
                                                        user_id?: string;
                                                        chat_id?: string;
                                                        department_id?: string;
                                                        open_department_id?: string;
                                                        member_name?: string;
                                                        member_en_name?: string;
                                                        member_type?:
                                                            | "user"
                                                            | "chat"
                                                            | "department";
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    total?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.role.member&version=v1 document }
                 *
                 * 列出协作者
                 *
                 * 列出多维表格高级权限中自定义角色的协作者。
                 *
                 * ## 前提条件;;要调用协作者相关接口，你需确保多维表格已开启高级权限并设置了自定义角色。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限，通过[新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create)接口设置自定义角色。;
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { app_token: string; role_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        open_id?: string;
                                        union_id?: string;
                                        user_id?: string;
                                        chat_id?: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        member_name?: string;
                                        member_en_name?: string;
                                        member_type?:
                                            | "user"
                                            | "chat"
                                            | "department";
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.role.member&version=v1 document }
                 *
                 * 删除协作者
                 *
                 * 删除多维表格高级权限中自定义角色的协作者。
                 *
                 * ## 前提条件;;要调用协作者相关接口，你需确保多维表格已开启高级权限并设置了自定义角色。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限，通过[新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create)接口设置自定义角色。
                 */
                delete: async (
                    payload?: {
                        params?: {
                            member_id_type?:
                                | "open_id"
                                | "union_id"
                                | "user_id"
                                | "chat_id"
                                | "department_id"
                                | "open_department_id";
                        };
                        path: {
                            app_token?: string;
                            role_id?: string;
                            member_id: string;
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/:member_id`,
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
             * app.role
             */
            appRole: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.role&version=v1 document }
                 *
                 * 新增自定义角色
                 *
                 * 新增多维表格高级权限中自定义的角色。
                 *
                 * 推荐使用新版[新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/create)接口，支持高级权限 2.0 版本新增的权限点位，包括更精细的行级别权限控制、多维表格的复制、导出点位的控制等。;;## 前提条件;;要调用自定义角色相关接口，你需确保多维表格已开启高级权限。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限。
                 */
                create: async (
                    payload?: {
                        data: {
                            role_name: string;
                            table_roles: Array<{
                                table_perm: number;
                                table_name?: string;
                                table_id?: string;
                                rec_rule?: {
                                    conditions: Array<{
                                        field_name: string;
                                        operator?:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty";
                                        value?: Array<string>;
                                    }>;
                                    conjunction?: "and" | "or";
                                    other_perm?: number;
                                };
                                field_perm?: Record<string, number>;
                                allow_add_record?: boolean;
                                allow_delete_record?: boolean;
                            }>;
                            block_roles?: Array<{
                                block_id: string;
                                block_perm: number;
                            }>;
                        };
                        path?: { app_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    role?: {
                                        role_name: string;
                                        role_id?: string;
                                        table_roles: Array<{
                                            table_perm: number;
                                            table_name?: string;
                                            table_id?: string;
                                            rec_rule?: {
                                                conditions: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                other_perm?: number;
                                            };
                                            field_perm?: Record<string, number>;
                                            allow_add_record?: boolean;
                                            allow_delete_record?: boolean;
                                        }>;
                                        block_roles?: Array<{
                                            block_id: string;
                                            block_type?: "dashboard";
                                            block_perm: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=bitable&resource=app.role&version=v1 document }
                 *
                 * 更新自定义角色
                 *
                 * 更新多维表格高级权限中自定义的角色。
                 *
                 * 更新自定义角色为增量更新，仅对传值的字段进行更新，不传值则不更新。推荐使用新版[更新自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/update)接口，支持高级权限 2.0 版本新增的权限点位，包括更精细的行级别权限控制、多维表格的复制、导出点位的控制等。;;## 前提条件;;要调用自定义角色相关接口，你需确保多维表格已开启高级权限。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限。
                 */
                update: async (
                    payload?: {
                        data: {
                            role_name: string;
                            table_roles: Array<{
                                table_perm: number;
                                table_name?: string;
                                table_id?: string;
                                rec_rule?: {
                                    conditions: Array<{
                                        field_name: string;
                                        operator?:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty";
                                        value?: Array<string>;
                                    }>;
                                    conjunction?: "and" | "or";
                                    other_perm?: number;
                                };
                                field_perm?: Record<string, number>;
                                allow_add_record?: boolean;
                                allow_delete_record?: boolean;
                            }>;
                            block_roles?: Array<{
                                block_id: string;
                                block_perm: number;
                            }>;
                        };
                        path?: { app_token?: string; role_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    role?: {
                                        role_name: string;
                                        role_id?: string;
                                        table_roles: Array<{
                                            table_perm: number;
                                            table_name?: string;
                                            table_id?: string;
                                            rec_rule?: {
                                                conditions: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                other_perm?: number;
                                            };
                                            field_perm?: Record<string, number>;
                                            allow_add_record?: boolean;
                                            allow_delete_record?: boolean;
                                        }>;
                                        block_roles?: Array<{
                                            block_id: string;
                                            block_type?: "dashboard";
                                            block_perm: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.role&version=v1 document }
                 *
                 * 删除自定义角色
                 *
                 * 删除多维表格高级权限中自定义的角色。
                 *
                 * ## 前提条件;;要调用自定义角色相关接口，你需确保多维表格已开启高级权限。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限。
                 */
                delete: async (
                    payload?: {
                        path?: { app_token?: string; role_id?: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id`,
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
                        path?: { app_token?: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
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
                                                        role_name: string;
                                                        role_id?: string;
                                                        table_roles: Array<{
                                                            table_perm: number;
                                                            table_name?: string;
                                                            table_id?: string;
                                                            rec_rule?: {
                                                                conditions: Array<{
                                                                    field_name: string;
                                                                    operator?:
                                                                        | "is"
                                                                        | "isNot"
                                                                        | "contains"
                                                                        | "doesNotContain"
                                                                        | "isEmpty"
                                                                        | "isNotEmpty";
                                                                    value?: Array<string>;
                                                                    field_type?: number;
                                                                }>;
                                                                conjunction?:
                                                                    | "and"
                                                                    | "or";
                                                                other_perm?: number;
                                                            };
                                                            field_perm?: Record<
                                                                string,
                                                                number
                                                            >;
                                                            allow_add_record?: boolean;
                                                            allow_delete_record?: boolean;
                                                        }>;
                                                        block_roles?: Array<{
                                                            block_id: string;
                                                            block_type?: "dashboard";
                                                            block_perm: number;
                                                        }>;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    total?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.role&version=v1 document }
                 *
                 * 列出自定义角色
                 *
                 * 列出多维表格高级权限中用户自定义的角色。
                 *
                 * 推荐使用新版[列出自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/list)接口，支持高级权限 2.0 版本新增的权限点位，包括更精细的行级别权限控制、多维表格的复制、导出点位的控制等。;;## 前提条件;;要调用自定义角色相关接口，你需确保多维表格已开启高级权限。你可通过[更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update)接口开启高级权限。
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path?: { app_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        role_name: string;
                                        role_id?: string;
                                        table_roles: Array<{
                                            table_perm: number;
                                            table_name?: string;
                                            table_id?: string;
                                            rec_rule?: {
                                                conditions: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                other_perm?: number;
                                            };
                                            field_perm?: Record<string, number>;
                                            allow_add_record?: boolean;
                                            allow_delete_record?: boolean;
                                        }>;
                                        block_roles?: Array<{
                                            block_id: string;
                                            block_type?: "dashboard";
                                            block_perm: number;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
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
             * app.table.view
             */
            appTableView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.table.view&version=v1 document }
                 *
                 * 新增视图
                 *
                 * 在多维表格数据表中新增一个视图，可指定视图类型，包括表格视图、看板视图、画册视图、甘特视图和表单视图。
                 *
                 * ## 使用限制;;视图最大支持数量为 200，包括公共视图、锁定视图和个人视图。因此个人在多维表格中看到的视图数量可能仅是部分视图。
                 */
                create: async (
                    payload?: {
                        data: {
                            view_name: string;
                            view_type?:
                                | "grid"
                                | "kanban"
                                | "gallery"
                                | "gantt"
                                | "form";
                        };
                        path?: { app_token?: string; table_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    view?: {
                                        view_id?: string;
                                        view_name?: string;
                                        view_type?: string;
                                        property?: {
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                                condition_omitted?: boolean;
                                            };
                                            hidden_fields?: Array<string>;
                                            hierarchy_config?: {
                                                field_id?: string;
                                            };
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=bitable&resource=app.table.view&version=v1 document }
                 *
                 * 更新视图
                 *
                 * 增量更新视图信息，包括视图名称、属性等，可设置视图的筛选条件。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            view_name?: string;
                            property?: {
                                filter_info?: {
                                    conjunction: "and" | "or";
                                    conditions: Array<{
                                        field_id: string;
                                        operator:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty"
                                            | "isGreater"
                                            | "isGreaterEqual"
                                            | "isLess"
                                            | "isLessEqual";
                                        value?: string;
                                    }>;
                                };
                                hidden_fields?: Array<string>;
                                hierarchy_config?: { field_id?: string };
                            };
                        };
                        params?: { user_id_type?: string };
                        path?: {
                            app_token?: string;
                            table_id?: string;
                            view_id?: string;
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
                                    view?: {
                                        view_id?: string;
                                        view_name?: string;
                                        view_type?: string;
                                        property?: {
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                                condition_omitted?: boolean;
                                            };
                                            hidden_fields?: Array<string>;
                                            hierarchy_config?: {
                                                field_id?: string;
                                            };
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.table.view&version=v1 document }
                 *
                 * 删除视图
                 *
                 * 通过 app_token、table_id 和 view_id，删除多维表格数据表中的指定视图。
                 */
                delete: async (
                    payload?: {
                        path?: {
                            app_token?: string;
                            table_id?: string;
                            view_id?: string;
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=bitable&resource=app.table.view&version=v1 document }
                 *
                 * 获取视图
                 *
                 * 根据视图 ID 获取现有视图信息，包括视图名称、类型、属性等。
                 */
                get: async (
                    payload?: {
                        params?: { user_id_type?: string };
                        path?: {
                            app_token?: string;
                            table_id?: string;
                            view_id?: string;
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
                                    view?: {
                                        view_id?: string;
                                        view_name?: string;
                                        view_type?: string;
                                        property?: {
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                                condition_omitted?: boolean;
                                            };
                                            hidden_fields?: Array<string>;
                                            hierarchy_config?: {
                                                field_id?: string;
                                            };
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
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
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { app_token?: string; table_id?: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
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
                                                        view_id?: string;
                                                        view_name?: string;
                                                        view_type?: string;
                                                        property?: {
                                                            filter_info?: {
                                                                conjunction:
                                                                    | "and"
                                                                    | "or";
                                                                conditions: Array<{
                                                                    field_id: string;
                                                                    operator:
                                                                        | "is"
                                                                        | "isNot"
                                                                        | "contains"
                                                                        | "doesNotContain"
                                                                        | "isEmpty"
                                                                        | "isNotEmpty"
                                                                        | "isGreater"
                                                                        | "isGreaterEqual"
                                                                        | "isLess"
                                                                        | "isLessEqual";
                                                                    value?: string;
                                                                    condition_id?: string;
                                                                    field_type?: number;
                                                                }>;
                                                                condition_omitted?: boolean;
                                                            };
                                                            hidden_fields?: Array<string>;
                                                            hierarchy_config?: {
                                                                field_id?: string;
                                                            };
                                                        };
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    total?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.table.view&version=v1 document }
                 *
                 * 列出视图
                 *
                 * 获取多维表格数据表中的所有视图。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { app_token?: string; table_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        view_id?: string;
                                        view_name?: string;
                                        view_type?: string;
                                        property?: {
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                                condition_omitted?: boolean;
                                            };
                                            hidden_fields?: Array<string>;
                                            hierarchy_config?: {
                                                field_id?: string;
                                            };
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
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
             * app.table.form
             */
            appTableForm: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=upgrade&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upgrade&project=bitable&resource=app.table.form&version=v1 document }
                 *
                 * 升级旧版表单
                 *
                 * 升级旧版表单至收集表
                 */
                upgrade: async (
                    payload?: {
                        data: {
                            form_name: string;
                            display_mode:
                                | "traditional"
                                | "one_question_per_page";
                        };
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
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
                                data?: { form?: { id?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/upgrade`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=bitable&resource=app.table.form&version=v1 document }
                 *
                 * 获取表单元数据
                 *
                 * 获取表单的所有元数据，包括表单名称、描述、是否共享等。
                 *
                 * 表单视图是多维表格的一种视图类型。每个表单都有唯一标识 `form_id`，即当前视图的 `view_id`。
                 */
                get: async (
                    payload?: {
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
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
                                    form: {
                                        name?: string;
                                        description?: string;
                                        shared?: boolean;
                                        shared_url?: string;
                                        shared_limit?:
                                            | "off"
                                            | "tenant_editable"
                                            | "anyone_editable";
                                        submit_limit_once?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=bitable&resource=app.table.form&version=v1 document }
                 *
                 * 更新表单元数据
                 *
                 * 更新表单视图中的元数据，包括表单名称、描述、是否共享等。
                 *
                 * 表单视图是多维表格的一种视图类型。每个表单都有唯一标识 `form_id`，即当前视图的 `view_id`。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            name?: string;
                            description?: string;
                            shared?: boolean;
                            shared_limit?:
                                | "off"
                                | "tenant_editable"
                                | "anyone_editable";
                            submit_limit_once?: boolean;
                        };
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
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
                                    form: {
                                        name?: string;
                                        description?: string;
                                        shared?: boolean;
                                        shared_url?: string;
                                        shared_limit?:
                                            | "off"
                                            | "tenant_editable"
                                            | "anyone_editable";
                                        submit_limit_once?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id`,
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
             * app.table.field_group
             */
            appTableFieldGroup: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field_group&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.table.field_group&version=v1 document }
                 *
                 * 创建字段编组
                 *
                 * 该接口用于为多维表格数据表的字段创建编组。创建字段编组后，字段将被组织到该编组中，便于多维表格的数据管理;#### 业务使用场景;适用于多维表格字段较多，需要分类管理字段的场景
                 */
                create: async (
                    payload?: {
                        data: {
                            field_groups: Array<{
                                id?: string;
                                name: string;
                                children: Array<{ type: "field"; id: string }>;
                                description?: string;
                            }>;
                        };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { field_groups?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/field_groups`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * app.table.form.field
             */
            appTableFormField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=bitable&resource=app.table.form.field&version=v1 document }
                 *
                 * 更新表单问题
                 *
                 * 更新表单中的问题项。
                 *
                 * 表单视图是多维表格的一种视图类型。每个表单都有唯一标识 `form_id`，即当前视图的 `view_id`。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            pre_field_id?: string;
                            title?: string;
                            description?: string;
                            required?: boolean;
                            visible?: boolean;
                            rich_description?: Array<{
                                segment_type: "text" | "url";
                                text: string;
                                link?: string;
                            }>;
                        };
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
                            field_id: string;
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
                                    fields?: {
                                        pre_field_id?: string;
                                        title?: string;
                                        description?: string;
                                        required?: boolean;
                                        visible?: boolean;
                                        rich_description?: Array<{
                                            segment_type: "text" | "url";
                                            text: string;
                                            link?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields/:field_id`,
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
                        params?: { page_size?: number; page_token?: string };
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields`,
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
                                                        field_id?: string;
                                                        title?: string;
                                                        description?: string;
                                                        required?: boolean;
                                                        visible?: boolean;
                                                        rich_description?: Array<{
                                                            segment_type:
                                                                | "text"
                                                                | "url";
                                                            text: string;
                                                            link?: string;
                                                        }>;
                                                    }>;
                                                    page_token: string;
                                                    has_more: boolean;
                                                    total: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.table.form.field&version=v1 document }
                 *
                 * 列出表单问题
                 *
                 * 列出表单中的所有问题项。
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
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
                                        field_id?: string;
                                        title?: string;
                                        description?: string;
                                        required?: boolean;
                                        visible?: boolean;
                                        rich_description?: Array<{
                                            segment_type: "text" | "url";
                                            text: string;
                                            link?: string;
                                        }>;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                    total: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields`,
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
             * app.workflow
             */
            appWorkflow: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.workflow&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=bitable&resource=app.workflow&version=v1 document }
                 *
                 * 更新自动化流程状态
                 *
                 * 开启或关闭自动化流程。
                 */
                update: async (
                    payload?: {
                        data: { status: string };
                        path: { app_token?: string; workflow_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/workflows/:workflow_id`,
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
                        path?: { app_token?: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/workflows`,
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
                                                    workflows: Array<{
                                                        workflow_id: string;
                                                        status?: string;
                                                        title?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.workflow&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.workflow&version=v1 document }
                 *
                 * 列出自动化流程
                 *
                 * 该接口用于列出多维表格的自动化流程。
                 */
                list: async (
                    payload?: {
                        path?: { app_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    workflows: Array<{
                                        workflow_id: string;
                                        status?: string;
                                        title?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/workflows`,
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
             * app.table.field
             */
            appTableField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=bitable&resource=app.table.field&version=v1 document }
                 *
                 * 删除字段
                 *
                 * 删除多维表格数据表中的一个字段。
                 */
                delete: async (
                    payload?: {
                        path: {
                            app_token: string;
                            table_id: string;
                            field_id: string;
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
                                data?: { field_id?: string; deleted?: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id`,
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
                            view_id?: string;
                            text_field_as_array?: boolean;
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { app_token: string; table_id: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
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
                                                    total?: number;
                                                    items?: Array<{
                                                        field_name: string;
                                                        type: number;
                                                        property?: {
                                                            options?: Array<{
                                                                name?: string;
                                                                id?: string;
                                                                color?: number;
                                                            }>;
                                                            formatter?: string;
                                                            date_formatter?: string;
                                                            auto_fill?: boolean;
                                                            multiple?: boolean;
                                                            table_id?: string;
                                                            table_name?: string;
                                                            back_field_name?: string;
                                                            auto_serial?: {
                                                                type:
                                                                    | "custom"
                                                                    | "auto_increment_number";
                                                                options?: Array<{
                                                                    type:
                                                                        | "system_number"
                                                                        | "fixed_text"
                                                                        | "created_time";
                                                                    value: string;
                                                                }>;
                                                            };
                                                            location?: {
                                                                input_type:
                                                                    | "only_mobile"
                                                                    | "not_limit";
                                                            };
                                                            formula_expression?: string;
                                                            allowed_edit_modes?: {
                                                                manual?: boolean;
                                                                scan?: boolean;
                                                            };
                                                            min?: number;
                                                            max?: number;
                                                            range_customize?: boolean;
                                                            currency_code?: string;
                                                            rating?: {
                                                                symbol?: string;
                                                            };
                                                            type?: {
                                                                data_type: number;
                                                                ui_property?: {
                                                                    currency_code?: string;
                                                                    formatter?: string;
                                                                    range_customize?: boolean;
                                                                    min?: number;
                                                                    max?: number;
                                                                    date_formatter?: string;
                                                                    rating?: {
                                                                        symbol?: string;
                                                                    };
                                                                };
                                                                ui_type?:
                                                                    | "Number"
                                                                    | "Progress"
                                                                    | "Currency"
                                                                    | "Rating"
                                                                    | "DateTime";
                                                            };
                                                            filter_info?: {
                                                                target_table?: string;
                                                                filter_info?: {
                                                                    conjunction:
                                                                        | "and"
                                                                        | "or";
                                                                    conditions: Array<{
                                                                        field_id: string;
                                                                        operator:
                                                                            | "is"
                                                                            | "isNot"
                                                                            | "contains"
                                                                            | "doesNotContain"
                                                                            | "isEmpty"
                                                                            | "isNotEmpty"
                                                                            | "isGreater"
                                                                            | "isGreaterEqual"
                                                                            | "isLess"
                                                                            | "isLessEqual";
                                                                        value?: string;
                                                                        condition_id?: string;
                                                                        field_type?: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        description?: string;
                                                        is_primary?: boolean;
                                                        field_id?: string;
                                                        ui_type?:
                                                            | "Text"
                                                            | "Barcode"
                                                            | "Number"
                                                            | "Progress"
                                                            | "Currency"
                                                            | "Rating"
                                                            | "SingleSelect"
                                                            | "MultiSelect"
                                                            | "DateTime"
                                                            | "Checkbox"
                                                            | "User"
                                                            | "GroupChat"
                                                            | "Phone"
                                                            | "Url"
                                                            | "Attachment"
                                                            | "SingleLink"
                                                            | "Formula"
                                                            | "DuplexLink"
                                                            | "Location"
                                                            | "CreatedTime"
                                                            | "ModifiedTime"
                                                            | "CreatedUser"
                                                            | "ModifiedUser"
                                                            | "AutoNumber";
                                                        is_hidden?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.table.field&version=v1 document }
                 *
                 * 列出字段
                 *
                 * 获取多维表格数据表中的的所有字段。
                 */
                list: async (
                    payload?: {
                        params?: {
                            view_id?: string;
                            text_field_as_array?: boolean;
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                    total?: number;
                                    items?: Array<{
                                        field_name: string;
                                        type: number;
                                        property?: {
                                            options?: Array<{
                                                name?: string;
                                                id?: string;
                                                color?: number;
                                            }>;
                                            formatter?: string;
                                            date_formatter?: string;
                                            auto_fill?: boolean;
                                            multiple?: boolean;
                                            table_id?: string;
                                            table_name?: string;
                                            back_field_name?: string;
                                            auto_serial?: {
                                                type:
                                                    | "custom"
                                                    | "auto_increment_number";
                                                options?: Array<{
                                                    type:
                                                        | "system_number"
                                                        | "fixed_text"
                                                        | "created_time";
                                                    value: string;
                                                }>;
                                            };
                                            location?: {
                                                input_type:
                                                    | "only_mobile"
                                                    | "not_limit";
                                            };
                                            formula_expression?: string;
                                            allowed_edit_modes?: {
                                                manual?: boolean;
                                                scan?: boolean;
                                            };
                                            min?: number;
                                            max?: number;
                                            range_customize?: boolean;
                                            currency_code?: string;
                                            rating?: { symbol?: string };
                                            type?: {
                                                data_type: number;
                                                ui_property?: {
                                                    currency_code?: string;
                                                    formatter?: string;
                                                    range_customize?: boolean;
                                                    min?: number;
                                                    max?: number;
                                                    date_formatter?: string;
                                                    rating?: {
                                                        symbol?: string;
                                                    };
                                                };
                                                ui_type?:
                                                    | "Number"
                                                    | "Progress"
                                                    | "Currency"
                                                    | "Rating"
                                                    | "DateTime";
                                            };
                                            filter_info?: {
                                                target_table?: string;
                                                filter_info?: {
                                                    conjunction: "and" | "or";
                                                    conditions: Array<{
                                                        field_id: string;
                                                        operator:
                                                            | "is"
                                                            | "isNot"
                                                            | "contains"
                                                            | "doesNotContain"
                                                            | "isEmpty"
                                                            | "isNotEmpty"
                                                            | "isGreater"
                                                            | "isGreaterEqual"
                                                            | "isLess"
                                                            | "isLessEqual";
                                                        value?: string;
                                                        condition_id?: string;
                                                        field_type?: number;
                                                    }>;
                                                };
                                            };
                                        };
                                        description?: string;
                                        is_primary?: boolean;
                                        field_id?: string;
                                        ui_type?:
                                            | "Text"
                                            | "Barcode"
                                            | "Number"
                                            | "Progress"
                                            | "Currency"
                                            | "Rating"
                                            | "SingleSelect"
                                            | "MultiSelect"
                                            | "DateTime"
                                            | "Checkbox"
                                            | "User"
                                            | "GroupChat"
                                            | "Phone"
                                            | "Url"
                                            | "Attachment"
                                            | "SingleLink"
                                            | "Formula"
                                            | "DuplexLink"
                                            | "Location"
                                            | "CreatedTime"
                                            | "ModifiedTime"
                                            | "CreatedUser"
                                            | "ModifiedUser"
                                            | "AutoNumber";
                                        is_hidden?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=bitable&resource=app.table.field&version=v1 document }
                 *
                 * 更新字段
                 *
                 * 在多维表格数据表中更新一个字段。更新字段时为全量更新，property 等字段会被完全覆盖。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
                 */
                update: async (
                    payload?: {
                        data: {
                            field_name: string;
                            type: number;
                            property?: {
                                options?: Array<{
                                    name?: string;
                                    id?: string;
                                    color?: number;
                                }>;
                                formatter?: string;
                                date_formatter?: string;
                                auto_fill?: boolean;
                                multiple?: boolean;
                                table_id?: string;
                                table_name?: string;
                                back_field_name?: string;
                                auto_serial?: {
                                    type: "custom" | "auto_increment_number";
                                    options?: Array<{
                                        type:
                                            | "system_number"
                                            | "fixed_text"
                                            | "created_time";
                                        value: string;
                                    }>;
                                };
                                location?: {
                                    input_type: "only_mobile" | "not_limit";
                                };
                                formula_expression?: string;
                                allowed_edit_modes?: {
                                    manual?: boolean;
                                    scan?: boolean;
                                };
                                min?: number;
                                max?: number;
                                range_customize?: boolean;
                                currency_code?: string;
                                rating?: { symbol?: string };
                                type?: {
                                    data_type: number;
                                    ui_property?: {
                                        currency_code?: string;
                                        formatter?: string;
                                        range_customize?: boolean;
                                        min?: number;
                                        max?: number;
                                        date_formatter?: string;
                                        rating?: { symbol?: string };
                                    };
                                    ui_type?:
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "DateTime";
                                };
                                filter_info?: {
                                    target_table?: string;
                                    filter_info?: {
                                        conjunction: "and" | "or";
                                        conditions: Array<{
                                            field_id: string;
                                            operator:
                                                | "is"
                                                | "isNot"
                                                | "contains"
                                                | "doesNotContain"
                                                | "isEmpty"
                                                | "isNotEmpty"
                                                | "isGreater"
                                                | "isGreaterEqual"
                                                | "isLess"
                                                | "isLessEqual";
                                            value?: string;
                                        }>;
                                    };
                                };
                            };
                            description?: {
                                disable_sync?: boolean;
                                text?: string;
                            };
                            is_primary?: boolean;
                            ui_type?:
                                | "Text"
                                | "Email"
                                | "Barcode"
                                | "Number"
                                | "Progress"
                                | "Currency"
                                | "Rating"
                                | "SingleSelect"
                                | "MultiSelect"
                                | "DateTime"
                                | "Checkbox"
                                | "User"
                                | "GroupChat"
                                | "Phone"
                                | "Url"
                                | "Attachment"
                                | "SingleLink"
                                | "Formula"
                                | "DuplexLink"
                                | "Location"
                                | "CreatedTime"
                                | "ModifiedTime"
                                | "CreatedUser"
                                | "ModifiedUser"
                                | "AutoNumber"
                                | "Signature";
                            is_hidden?: boolean;
                        };
                        params?: { client_token?: string };
                        path: {
                            app_token: string;
                            table_id: string;
                            field_id: string;
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
                                    field?: {
                                        field_name: string;
                                        type: number;
                                        property?: {
                                            options?: Array<{
                                                name?: string;
                                                id?: string;
                                                color?: number;
                                            }>;
                                            formatter?: string;
                                            date_formatter?: string;
                                            auto_fill?: boolean;
                                            multiple?: boolean;
                                            table_id?: string;
                                            table_name?: string;
                                            back_field_name?: string;
                                            auto_serial?: {
                                                type:
                                                    | "custom"
                                                    | "auto_increment_number";
                                                options?: Array<{
                                                    type:
                                                        | "system_number"
                                                        | "fixed_text"
                                                        | "created_time";
                                                    value: string;
                                                }>;
                                            };
                                            location?: {
                                                input_type:
                                                    | "only_mobile"
                                                    | "not_limit";
                                            };
                                            formula_expression?: string;
                                            allowed_edit_modes?: {
                                                manual?: boolean;
                                                scan?: boolean;
                                            };
                                            min?: number;
                                            max?: number;
                                            range_customize?: boolean;
                                            currency_code?: string;
                                            rating?: { symbol?: string };
                                            type?: {
                                                data_type: number;
                                                ui_property?: {
                                                    currency_code?: string;
                                                    formatter?: string;
                                                    range_customize?: boolean;
                                                    min?: number;
                                                    max?: number;
                                                    date_formatter?: string;
                                                    rating?: {
                                                        symbol?: string;
                                                    };
                                                };
                                                ui_type?:
                                                    | "Number"
                                                    | "Progress"
                                                    | "Currency"
                                                    | "Rating"
                                                    | "DateTime";
                                            };
                                            filter_info?: {
                                                target_table?: string;
                                                filter_info?: {
                                                    conjunction: "and" | "or";
                                                    conditions: Array<{
                                                        field_id: string;
                                                        operator:
                                                            | "is"
                                                            | "isNot"
                                                            | "contains"
                                                            | "doesNotContain"
                                                            | "isEmpty"
                                                            | "isNotEmpty"
                                                            | "isGreater"
                                                            | "isGreaterEqual"
                                                            | "isLess"
                                                            | "isLessEqual";
                                                        value?: string;
                                                        condition_id?: string;
                                                        field_type?: number;
                                                    }>;
                                                };
                                            };
                                        };
                                        description?: {
                                            disable_sync?: boolean;
                                            text?: string;
                                        };
                                        is_primary?: boolean;
                                        field_id?: string;
                                        ui_type?:
                                            | "Text"
                                            | "Email"
                                            | "Barcode"
                                            | "Number"
                                            | "Progress"
                                            | "Currency"
                                            | "Rating"
                                            | "SingleSelect"
                                            | "MultiSelect"
                                            | "DateTime"
                                            | "Checkbox"
                                            | "User"
                                            | "GroupChat"
                                            | "Phone"
                                            | "Url"
                                            | "Attachment"
                                            | "SingleLink"
                                            | "Formula"
                                            | "DuplexLink"
                                            | "Location"
                                            | "CreatedTime"
                                            | "ModifiedTime"
                                            | "CreatedUser"
                                            | "ModifiedUser"
                                            | "AutoNumber"
                                            | "Signature";
                                        is_hidden?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app.table.field&version=v1 document }
                 *
                 * 新增字段
                 *
                 * 在多维表格数据表中新增一个字段。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有多维表格的编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
                 */
                create: async (
                    payload?: {
                        data: {
                            field_name: string;
                            type: number;
                            property?: {
                                options?: Array<{
                                    name?: string;
                                    id?: string;
                                    color?: number;
                                }>;
                                formatter?: string;
                                date_formatter?: string;
                                auto_fill?: boolean;
                                multiple?: boolean;
                                table_id?: string;
                                table_name?: string;
                                back_field_name?: string;
                                auto_serial?: {
                                    type: "custom" | "auto_increment_number";
                                    options?: Array<{
                                        type:
                                            | "system_number"
                                            | "fixed_text"
                                            | "created_time";
                                        value: string;
                                    }>;
                                };
                                location?: {
                                    input_type: "only_mobile" | "not_limit";
                                };
                                formula_expression?: string;
                                allowed_edit_modes?: {
                                    manual?: boolean;
                                    scan?: boolean;
                                };
                                min?: number;
                                max?: number;
                                range_customize?: boolean;
                                currency_code?: string;
                                rating?: { symbol?: string };
                                type?: {
                                    data_type: number;
                                    ui_property?: {
                                        currency_code?: string;
                                        formatter?: string;
                                        range_customize?: boolean;
                                        min?: number;
                                        max?: number;
                                        date_formatter?: string;
                                        rating?: { symbol?: string };
                                    };
                                    ui_type?:
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "DateTime";
                                };
                                filter_info?: {
                                    target_table?: string;
                                    filter_info?: {
                                        conjunction: "and" | "or";
                                        conditions: Array<{
                                            field_id: string;
                                            operator:
                                                | "is"
                                                | "isNot"
                                                | "contains"
                                                | "doesNotContain"
                                                | "isEmpty"
                                                | "isNotEmpty"
                                                | "isGreater"
                                                | "isGreaterEqual"
                                                | "isLess"
                                                | "isLessEqual";
                                            value?: string;
                                        }>;
                                    };
                                };
                            };
                            description?: {
                                disable_sync?: boolean;
                                text?: string;
                            };
                            is_primary?: boolean;
                            field_id?: string;
                            ui_type?:
                                | "Text"
                                | "Email"
                                | "Barcode"
                                | "Number"
                                | "Progress"
                                | "Currency"
                                | "Rating"
                                | "SingleSelect"
                                | "MultiSelect"
                                | "DateTime"
                                | "Checkbox"
                                | "User"
                                | "GroupChat"
                                | "Phone"
                                | "Url"
                                | "Attachment"
                                | "SingleLink"
                                | "Formula"
                                | "DuplexLink"
                                | "Location"
                                | "CreatedTime"
                                | "ModifiedTime"
                                | "CreatedUser"
                                | "ModifiedUser"
                                | "AutoNumber"
                                | "Signature";
                            is_hidden?: boolean;
                        };
                        params?: { client_token?: string };
                        path: { app_token: string; table_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    field?: {
                                        field_name: string;
                                        type: number;
                                        property?: {
                                            options?: Array<{
                                                name?: string;
                                                id?: string;
                                                color?: number;
                                            }>;
                                            formatter?: string;
                                            date_formatter?: string;
                                            auto_fill?: boolean;
                                            multiple?: boolean;
                                            table_id?: string;
                                            table_name?: string;
                                            back_field_name?: string;
                                            auto_serial?: {
                                                type:
                                                    | "custom"
                                                    | "auto_increment_number";
                                                options?: Array<{
                                                    type:
                                                        | "system_number"
                                                        | "fixed_text"
                                                        | "created_time";
                                                    value: string;
                                                }>;
                                            };
                                            location?: {
                                                input_type:
                                                    | "only_mobile"
                                                    | "not_limit";
                                            };
                                            formula_expression?: string;
                                            allowed_edit_modes?: {
                                                manual?: boolean;
                                                scan?: boolean;
                                            };
                                            min?: number;
                                            max?: number;
                                            range_customize?: boolean;
                                            currency_code?: string;
                                            rating?: { symbol?: string };
                                            type?: {
                                                data_type: number;
                                                ui_property?: {
                                                    currency_code?: string;
                                                    formatter?: string;
                                                    range_customize?: boolean;
                                                    min?: number;
                                                    max?: number;
                                                    date_formatter?: string;
                                                    rating?: {
                                                        symbol?: string;
                                                    };
                                                };
                                                ui_type?:
                                                    | "Number"
                                                    | "Progress"
                                                    | "Currency"
                                                    | "Rating"
                                                    | "DateTime";
                                            };
                                            filter_info?: {
                                                target_table?: string;
                                                filter_info?: {
                                                    conjunction: "and" | "or";
                                                    conditions: Array<{
                                                        field_id: string;
                                                        operator:
                                                            | "is"
                                                            | "isNot"
                                                            | "contains"
                                                            | "doesNotContain"
                                                            | "isEmpty"
                                                            | "isNotEmpty"
                                                            | "isGreater"
                                                            | "isGreaterEqual"
                                                            | "isLess"
                                                            | "isLessEqual";
                                                        value?: string;
                                                        condition_id?: string;
                                                        field_type?: number;
                                                    }>;
                                                };
                                            };
                                        };
                                        description?: {
                                            disable_sync?: boolean;
                                            text?: string;
                                        };
                                        is_primary?: boolean;
                                        field_id?: string;
                                        ui_type?:
                                            | "Text"
                                            | "Email"
                                            | "Barcode"
                                            | "Number"
                                            | "Progress"
                                            | "Currency"
                                            | "Rating"
                                            | "SingleSelect"
                                            | "MultiSelect"
                                            | "DateTime"
                                            | "Checkbox"
                                            | "User"
                                            | "GroupChat"
                                            | "Phone"
                                            | "Url"
                                            | "Attachment"
                                            | "SingleLink"
                                            | "Formula"
                                            | "DuplexLink"
                                            | "Location"
                                            | "CreatedTime"
                                            | "ModifiedTime"
                                            | "CreatedUser"
                                            | "ModifiedUser"
                                            | "AutoNumber"
                                            | "Signature";
                                        is_hidden?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * app.block_workflow
             */
            appBlockWorkflow: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.block_workflow&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=bitable&resource=app.block_workflow&version=v1 document }
                 *
                 * 列出工作流
                 *
                 * 此接口用于返回多维表格中所有工作流，多维表格管理员可通过此接口来管理表中的工作流
                 */
                list: async (
                    payload?: {
                        path: { app_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    workflows?: Array<{
                                        workflow_id?: string;
                                        title?: string;
                                        status?: "Enable" | "Disable";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/block_workflows`,
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
