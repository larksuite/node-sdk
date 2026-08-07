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
import report from "./report";

// auto gen
export default abstract class Client extends report {
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
    rule_engine = {
        v1: {
            /**
             * product.group.rule_table
             */
            productGroupRuleTable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table&apiName=release&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=release&project=rule_engine&resource=product.group.rule_table&version=v1 document }
                 *
                 * 发布规则表配置
                 *
                 * 规则表修改完成后需 [预发布规则表配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table/pre_release)，成功后才能调用此接口对规则表配置进行正式发布，发布成功后修改的配置才会生效。
                 */
                release: async (
                    payload?: {
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
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
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/release`,
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
                        params: { page_size: number; page_token?: string };
                        path: { product_id: string; group_id: string };
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
                                    `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables`,
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
                                                    rule_tables?: Array<{
                                                        id: string;
                                                        name: string;
                                                        status: number;
                                                        release_version?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=rule_engine&resource=product.group.rule_table&version=v1 document }
                 *
                 * 查询规则表列表
                 *
                 * 此接口可用来分页查询规则表列表。
                 */
                list: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
                        path: { product_id: string; group_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    rule_tables?: Array<{
                                        id: string;
                                        name: string;
                                        status: number;
                                        release_version?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table&apiName=pre_release&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=pre_release&project=rule_engine&resource=product.group.rule_table&version=v1 document }
                 *
                 * 预发布规则表配置
                 *
                 * 当对某规则表完成全部的新增、修改和删除操作后，需调用此接口对规则表的配置进行预发布，完成后再调用 [发布规则表配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table/release) 进行正式发布，成功后规则表更改的内容才算正式生效。
                 */
                preRelease: async (
                    payload?: {
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
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
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/pre_release`,
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
             * product.group.rule_table.table_row
             */
            productGroupRuleTableTableRow: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table.table_row&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=rule_engine&resource=product.group.rule_table.table_row&version=v1 document }
                 *
                 * 修改规则表行
                 *
                 * 可调用此接口修改目标行信息，请求体与 [创建规则表行](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table-table_row/create) 相同，接口只会修改入参中指定的单元格，对其它单元格无效。
                 *
                 * 单元格对应的列 id，单元格内容类型需与对应的规则表列头数据保持一致，列头数据可调用 [获取规则表列头信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table-table_column/column_headers) 得到。
                 */
                update: async (
                    payload?: {
                        data: {
                            table_cells: Array<{
                                table_column_id: string;
                                table_cell_content_type:
                                    | "STRING"
                                    | "NUMBER"
                                    | "BOOLEAN"
                                    | "COLLECTION"
                                    | "EMPLOYEE_COLLECTION"
                                    | "DEPARTMENT_COLLECTION"
                                    | "ROLE_COLLECTION";
                                table_cell_content: {
                                    string?: string;
                                    number?: number;
                                    bool?: boolean;
                                    collection?: Array<string>;
                                    employee_collection?: Array<string>;
                                    department_collection?: Array<string>;
                                    role_collection?: Array<string>;
                                };
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
                            table_row_id: string;
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
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_rows/:table_row_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table.table_row&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=rule_engine&resource=product.group.rule_table.table_row&version=v1 document }
                 *
                 * 根据行 ID 查询规则表单行信息
                 *
                 * 可调用此接口获取目标规则表目标行的数据，返回值为单元格组成的列表，可以通过单元格的列 id 与 [获取规则表列头信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table-table_column/column_headers) 中的列 id 进行对应。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
                            table_row_id: string;
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
                                    table_row?: {
                                        id: string;
                                        table_cells: Array<{
                                            table_column_id: string;
                                            table_cell_content_type:
                                                | "STRING"
                                                | "NUMBER"
                                                | "BOOLEAN"
                                                | "COLLECTION"
                                                | "EMPLOYEE_COLLECTION"
                                                | "DEPARTMENT_COLLECTION"
                                                | "ROLE_COLLECTION";
                                            table_cell_content: {
                                                string?: string;
                                                number?: number;
                                                bool?: boolean;
                                                collection?: Array<string>;
                                                employee_collection?: Array<string>;
                                                department_collection?: Array<string>;
                                                role_collection?: Array<string>;
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_rows/:table_row_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table.table_row&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=rule_engine&resource=product.group.rule_table.table_row&version=v1 document }
                 *
                 * 删除规则表行
                 *
                 * 可调用此接口删除规则表目标行数据。
                 *
                 * - 删除操作不可撤回。;- 当规则表仅剩一行时不可删除。
                 */
                delete: async (
                    payload?: {
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
                            table_row_id: string;
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
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_rows/:table_row_id`,
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
                searchWithIterator: async (
                    payload?: {
                        data: {
                            table_cell: {
                                table_column_id: string;
                                table_cell_content_type:
                                    | "STRING"
                                    | "NUMBER"
                                    | "BOOLEAN"
                                    | "COLLECTION"
                                    | "EMPLOYEE_COLLECTION"
                                    | "DEPARTMENT_COLLECTION"
                                    | "ROLE_COLLECTION";
                                table_cell_content: {
                                    string?: string;
                                    number?: number;
                                    bool?: boolean;
                                    collection?: Array<string>;
                                    employee_collection?: Array<string>;
                                    department_collection?: Array<string>;
                                    role_collection?: Array<string>;
                                };
                            };
                        };
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
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
                                    `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_rows/search`,
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
                                                    table_rows?: Array<{
                                                        id: string;
                                                        table_cells: Array<{
                                                            table_column_id: string;
                                                            table_cell_content_type:
                                                                | "STRING"
                                                                | "NUMBER"
                                                                | "BOOLEAN"
                                                                | "COLLECTION"
                                                                | "EMPLOYEE_COLLECTION"
                                                                | "DEPARTMENT_COLLECTION"
                                                                | "ROLE_COLLECTION";
                                                            table_cell_content: {
                                                                string?: string;
                                                                number?: number;
                                                                bool?: boolean;
                                                                collection?: Array<string>;
                                                                employee_collection?: Array<string>;
                                                                department_collection?: Array<string>;
                                                                role_collection?: Array<string>;
                                                            };
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table.table_row&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=rule_engine&resource=product.group.rule_table.table_row&version=v1 document }
                 *
                 * 根据筛选条件查询规则表行信息列表
                 *
                 * 可调用此接口搜索规则表中的某些行信息，若单元格内容类型为字符串、数值和布尔时，支持精确查找；当类型为集合、人员集合和部门集合时，支持模糊搜索，当集合包含入参中的值时即返回。
                 *
                 * - 不支持以行 ID 为条件进行查找，如果需要，请调用 [根据行 ID 查询规则表单行信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table-table_row/get)。;- 不支持空值查找，即单元格内容不能为空。;- 搜索时需指定列，系统会按指定列去搜索对应的行信息。
                 */
                search: async (
                    payload?: {
                        data: {
                            table_cell: {
                                table_column_id: string;
                                table_cell_content_type:
                                    | "STRING"
                                    | "NUMBER"
                                    | "BOOLEAN"
                                    | "COLLECTION"
                                    | "EMPLOYEE_COLLECTION"
                                    | "DEPARTMENT_COLLECTION"
                                    | "ROLE_COLLECTION";
                                table_cell_content: {
                                    string?: string;
                                    number?: number;
                                    bool?: boolean;
                                    collection?: Array<string>;
                                    employee_collection?: Array<string>;
                                    department_collection?: Array<string>;
                                    role_collection?: Array<string>;
                                };
                            };
                        };
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
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
                                    table_rows?: Array<{
                                        id: string;
                                        table_cells: Array<{
                                            table_column_id: string;
                                            table_cell_content_type:
                                                | "STRING"
                                                | "NUMBER"
                                                | "BOOLEAN"
                                                | "COLLECTION"
                                                | "EMPLOYEE_COLLECTION"
                                                | "DEPARTMENT_COLLECTION"
                                                | "ROLE_COLLECTION";
                                            table_cell_content: {
                                                string?: string;
                                                number?: number;
                                                bool?: boolean;
                                                collection?: Array<string>;
                                                employee_collection?: Array<string>;
                                                department_collection?: Array<string>;
                                                role_collection?: Array<string>;
                                            };
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_rows/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
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
                                    `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_rows`,
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
                                                    table_rows?: Array<{
                                                        id: string;
                                                        table_cells: Array<{
                                                            table_column_id: string;
                                                            table_cell_content_type:
                                                                | "STRING"
                                                                | "NUMBER"
                                                                | "BOOLEAN"
                                                                | "COLLECTION"
                                                                | "EMPLOYEE_COLLECTION"
                                                                | "DEPARTMENT_COLLECTION"
                                                                | "ROLE_COLLECTION";
                                                            table_cell_content: {
                                                                string?: string;
                                                                number?: number;
                                                                bool?: boolean;
                                                                collection?: Array<string>;
                                                                employee_collection?: Array<string>;
                                                                department_collection?: Array<string>;
                                                                role_collection?: Array<string>;
                                                            };
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table.table_row&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=rule_engine&resource=product.group.rule_table.table_row&version=v1 document }
                 *
                 * 查询规则表行信息列表
                 *
                 * 可调用此接口分页查询规则表中的所有行信息，每行的数据结构与[根据行 ID 查询规则表单行信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table-table_row/get) 相同。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
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
                                    table_rows?: Array<{
                                        id: string;
                                        table_cells: Array<{
                                            table_column_id: string;
                                            table_cell_content_type:
                                                | "STRING"
                                                | "NUMBER"
                                                | "BOOLEAN"
                                                | "COLLECTION"
                                                | "EMPLOYEE_COLLECTION"
                                                | "DEPARTMENT_COLLECTION"
                                                | "ROLE_COLLECTION";
                                            table_cell_content: {
                                                string?: string;
                                                number?: number;
                                                bool?: boolean;
                                                collection?: Array<string>;
                                                employee_collection?: Array<string>;
                                                department_collection?: Array<string>;
                                                role_collection?: Array<string>;
                                            };
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_rows`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table.table_row&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=rule_engine&resource=product.group.rule_table.table_row&version=v1 document }
                 *
                 * 创建规则表行
                 *
                 * 可调用此接口在规则表最下方添加行，添加时可同时创建单元格信息，接口只会创建入参中指定的单元格，对其它单元格无效。
                 *
                 * 单元格对应的列 id，单元格内容类型需与对应的规则表列头数据保持一致，列头数据可调用[获取规则表列头信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table-table_column/column_headers) 得到。
                 */
                create: async (
                    payload?: {
                        data: {
                            table_cells: Array<{
                                table_column_id: string;
                                table_cell_content_type:
                                    | "STRING"
                                    | "NUMBER"
                                    | "BOOLEAN"
                                    | "COLLECTION"
                                    | "EMPLOYEE_COLLECTION"
                                    | "DEPARTMENT_COLLECTION"
                                    | "ROLE_COLLECTION";
                                table_cell_content: {
                                    string?: string;
                                    number?: number;
                                    bool?: boolean;
                                    collection?: Array<string>;
                                    employee_collection?: Array<string>;
                                    department_collection?: Array<string>;
                                    role_collection?: Array<string>;
                                };
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
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
                                data?: { table_row_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_rows`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table.table_row&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=rule_engine&resource=product.group.rule_table.table_row&version=v1 document }
                 *
                 * 批量创建规则表行
                 *
                 * 可调用此接口在规则表最下方批量添加行，添加时可同时创建单元格信息，接口只会创建入参中指定的单元格，对其它单元格无效。
                 *
                 * 单元格对应的列 id，单元格内容类型需与对应的规则表列头数据保持一致，列头数据可调用[获取规则表列头信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table-table_column/column_headers) 得到。
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            table_rows: Array<{
                                table_cells: Array<{
                                    table_column_id: string;
                                    table_cell_content_type:
                                        | "STRING"
                                        | "NUMBER"
                                        | "BOOLEAN"
                                        | "COLLECTION"
                                        | "EMPLOYEE_COLLECTION"
                                        | "DEPARTMENT_COLLECTION"
                                        | "ROLE_COLLECTION";
                                    table_cell_content: {
                                        string?: string;
                                        number?: number;
                                        bool?: boolean;
                                        collection?: Array<string>;
                                        employee_collection?: Array<string>;
                                        department_collection?: Array<string>;
                                        role_collection?: Array<string>;
                                    };
                                }>;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
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
                                data?: { table_row_ids: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_rows/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table.table_row&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=rule_engine&resource=product.group.rule_table.table_row&version=v1 document }
                 *
                 * 批量修改规则表行
                 *
                 * 可调用此接口批量修改行信息，请求体与[批量创建规则表行](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table-table_row/batch_create)类似，接口只会创建入参中指定的单元格，对其它单元格无效。
                 *
                 * 单元格对应的列 id，单元格内容类型需与对应的规则表列头数据保持一致，列头数据可调用[获取规则表列头信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/product-group-rule_table-table_column/column_headers) 得到。
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            table_rows: Array<{
                                id: string;
                                table_cells: Array<{
                                    table_column_id: string;
                                    table_cell_content_type:
                                        | "STRING"
                                        | "NUMBER"
                                        | "BOOLEAN"
                                        | "COLLECTION"
                                        | "EMPLOYEE_COLLECTION"
                                        | "DEPARTMENT_COLLECTION"
                                        | "ROLE_COLLECTION";
                                    table_cell_content: {
                                        string?: string;
                                        number?: number;
                                        bool?: boolean;
                                        collection?: Array<string>;
                                        employee_collection?: Array<string>;
                                        department_collection?: Array<string>;
                                        role_collection?: Array<string>;
                                    };
                                }>;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
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
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_rows/batch_update`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * product.group.rule_table.table_column
             */
            productGroupRuleTableTableColumn: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=rule_engine&resource=product.group.rule_table.table_column&apiName=column_headers&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=column_headers&project=rule_engine&resource=product.group.rule_table.table_column&version=v1 document }
                 *
                 * 查询规则表列头信息
                 *
                 * 可调用此接口获取规则表列头的详细信息，包括列 id，列名称，列类型和规则表单元格内容类型。
                 *
                 * 单元格内容类型的具体转化逻辑请参照 [单元格内容类型概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/rule_engine-v1/table-content-type-overview)。
                 */
                columnHeaders: async (
                    payload?: {
                        path: {
                            product_id: string;
                            group_id: string;
                            rule_table_id: string;
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
                                    columns_headers?: Array<{
                                        id: string;
                                        name?: string;
                                        type: number;
                                        table_cell_content_type:
                                            | "STRING"
                                            | "NUMBER"
                                            | "BOOLEAN"
                                            | "COLLECTION"
                                            | "EMPLOYEE_COLLECTION"
                                            | "DEPARTMENT_COLLECTION"
                                            | "ROLE_COLLECTION";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/rule_engine/v1/products/:product_id/groups/:group_id/rule_tables/:rule_table_id/table_columns/column_headers`,
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
