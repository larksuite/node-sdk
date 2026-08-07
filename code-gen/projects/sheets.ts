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
import sheet_ai from "./sheet_ai";

// auto gen
export default abstract class Client extends sheet_ai {
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
    sheets = {
        /**
         * spreadsheet
         */
        spreadsheet: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet&version=v3 document }
             *
             * 修改电子表格属性
             *
             * 该接口用于修改电子表格的属性。目前支持修改电子表格标题。
             */
            patch: async (
                payload?: {
                    data?: { title?: string };
                    path?: { spreadsheet_token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet&version=v3 document }
             *
             * 获取电子表格信息
             *
             * 根据电子表格 token 获取电子表格的基础信息，包括电子表格的所有者、URL 链接等。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有电子表格的阅读、编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { spreadsheet_token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                spreadsheet?: {
                                    title?: string;
                                    owner_id?: string;
                                    token?: string;
                                    url?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet&version=v3 document }
             *
             * 创建电子表格
             *
             * 在云空间指定目录下创建电子表格。可自定义表格标题。不支持带内容创建表格。
             */
            create: async (
                payload?: {
                    data?: {
                        title?: string;
                        folder_token?: string;
                        without_mount?: boolean;
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
                                spreadsheet?: {
                                    title?: string;
                                    folder_token?: string;
                                    url?: string;
                                    spreadsheet_token?: string;
                                    without_mount?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * spreadsheet.sheet
         */
        spreadsheetSheet: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=replace&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=replace&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 替换单元格
             *
             * 在指定范围内，查找并替换符合查找条件的单元格。
             *
             * ## 使用限制;;单次最多可替换 1,000 个单元格。
             */
            replace: async (
                payload?: {
                    data: {
                        find_condition: {
                            range: string;
                            match_case?: boolean;
                            match_entire_cell?: boolean;
                            search_by_regex?: boolean;
                            include_formulas?: boolean;
                        };
                        find: string;
                        replacement: string;
                    };
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                replace_result?: {
                                    matched_cells?: Array<string>;
                                    matched_formula_cells?: Array<string>;
                                    rows_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/replace`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=move_dimension&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=move_dimension&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 移动行列
             *
             * 该接口用于移动行或列。行或列被移动到目标位置后，原本在目标位置的行列会对应右移或下移。
             */
            moveDimension: async (
                payload?: {
                    data?: {
                        source?: {
                            major_dimension?: string;
                            start_index?: number;
                            end_index?: number;
                        };
                        destination_index?: number;
                    };
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/move_dimension`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=find&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=find&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 查找单元格
             *
             * 在指定范围内查找符合查找条件的单元格。
             */
            find: async (
                payload?: {
                    data: {
                        find_condition: {
                            range: string;
                            match_case?: boolean;
                            match_entire_cell?: boolean;
                            search_by_regex?: boolean;
                            include_formulas?: boolean;
                        };
                        find: string;
                    };
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                find_result?: {
                                    matched_cells?: Array<string>;
                                    matched_formula_cells?: Array<string>;
                                    rows_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/find`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 查询工作表
             *
             * 根据工作表 ID 查询工作表属性信息，包括工作表的标题、索引位置、是否被隐藏等。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有电子表格的阅读、编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
             */
            get: async (
                payload?: {
                    path: { spreadsheet_token: string; sheet_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                sheet?: {
                                    sheet_id?: string;
                                    title?: string;
                                    index?: number;
                                    hidden?: boolean;
                                    grid_properties?: {
                                        frozen_row_count?: number;
                                        frozen_column_count?: number;
                                        row_count?: number;
                                        column_count?: number;
                                    };
                                    resource_type?: string;
                                    merges?: Array<{
                                        start_row_index?: number;
                                        end_row_index?: number;
                                        start_column_index?: number;
                                        end_column_index?: number;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=query&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 获取工作表
             *
             * 根据电子表格 token 获取表格中所有工作表及其属性信息，包括工作表 ID、标题、索引位置、是否被隐藏等。
             *
             * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有电子表格的阅读、编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
             */
            query: async (
                payload?: {
                    path?: { spreadsheet_token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                sheets?: Array<{
                                    sheet_id?: string;
                                    title?: string;
                                    index?: number;
                                    hidden?: boolean;
                                    grid_properties?: {
                                        frozen_row_count?: number;
                                        frozen_column_count?: number;
                                        row_count?: number;
                                        column_count?: number;
                                    };
                                    resource_type?: string;
                                    merges?: Array<{
                                        start_row_index?: number;
                                        end_row_index?: number;
                                        start_column_index?: number;
                                        end_column_index?: number;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/query`,
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
         * spreadsheet.sheet.filter
         */
        spreadsheetSheetFilter: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.filter&version=v3 document }
             *
             * 删除筛选
             *
             * 删除电子表格中指定工作表的所有筛选。
             */
            delete: async (
                payload?: {
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.filter&version=v3 document }
             *
             * 获取筛选
             *
             * 获取电子表格中工作表的详细筛选信息，包括筛选的应用范围、筛选条件、被筛选条件过滤掉的行。
             */
            get: async (
                payload?: {
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                sheet_filter_info?: {
                                    range: string;
                                    filtered_out_rows: Array<number>;
                                    filter_infos: Array<{
                                        col: string;
                                        conditions: Array<{
                                            filter_type: string;
                                            compare_type?: string;
                                            expected?: Array<string>;
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.filter&version=v3 document }
             *
             * 创建筛选
             *
             * 在电子表格工作表的指定范围内，设置筛选条件，创建筛选。
             */
            create: async (
                payload?: {
                    data: {
                        range: string;
                        col: string;
                        condition: {
                            filter_type: string;
                            compare_type?: string;
                            expected?: Array<string>;
                        };
                    };
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=sheets&resource=spreadsheet.sheet.filter&version=v3 document }
             *
             * 更新筛选
             *
             * 在电子表格工作表筛选范围中，更新指定列的筛选条件。
             */
            update: async (
                payload?: {
                    data: {
                        col: string;
                        condition: {
                            filter_type: string;
                            compare_type?: string;
                            expected?: Array<string>;
                        };
                    };
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`,
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
         * spreadsheet.sheet.filter_view
         */
        spreadsheetSheetFilterView: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.filter_view&version=v3 document }
             *
             * 获取筛选视图
             *
             * 获取指定筛选视图的信息，包括 ID、名称和筛选范围。
             *
             * 要获取所有筛选视图的信息，可调用[查询筛选视图](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/query)。
             */
            get: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        filter_view_id?: string;
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
                                filter_view?: {
                                    filter_view_id?: string;
                                    filter_view_name?: string;
                                    range?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.filter_view&version=v3 document }
             *
             * 创建筛选视图
             *
             * 指定电子表格工作表的筛选范围，创建一个筛选视图。
             *
             * ## 使用限制;;单个工作表中的筛选视图数量不得超过 150 个。
             */
            create: async (
                payload?: {
                    data?: {
                        filter_view_id?: string;
                        filter_view_name?: string;
                        range?: string;
                    };
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                filter_view?: {
                                    filter_view_id?: string;
                                    filter_view_name?: string;
                                    range?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.filter_view&version=v3 document }
             *
             * 删除筛选视图
             *
             * 删除指定筛选视图。
             */
            delete: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        filter_view_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=query&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=sheets&resource=spreadsheet.sheet.filter_view&version=v3 document }
             *
             * 查询筛选视图
             *
             * 查询电子表格指定工作表的所有筛选视图及其基本信息，包括视图 ID、视图名称和筛选范围。
             */
            query: async (
                payload?: {
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    filter_view_id?: string;
                                    filter_view_name?: string;
                                    range?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/query`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.filter_view&version=v3 document }
             *
             * 更新筛选视图
             *
             * 更新筛选视图的名称或筛选范围。
             */
            patch: async (
                payload?: {
                    data?: { filter_view_name?: string; range?: string };
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        filter_view_id?: string;
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
                                filter_view?: {
                                    filter_view_id?: string;
                                    filter_view_name?: string;
                                    range?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id`,
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
         * spreadsheet.sheet.filter_view.condition
         */
        spreadsheetSheetFilterViewCondition: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.filter_view.condition&version=v3 document }
             *
             * 获取筛选条件
             *
             * 获取筛选视图某列的筛选条件，包括筛选的类型、比较类型、筛选参数等。
             */
            get: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        filter_view_id?: string;
                        condition_id?: string;
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
                                condition?: {
                                    condition_id?: string;
                                    filter_type?: string;
                                    compare_type?: string;
                                    expected?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.filter_view.condition&version=v3 document }
             *
             * 删除筛选条件
             *
             * 删除筛选视图指定列的所有筛选条件。
             */
            delete: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        filter_view_id?: string;
                        condition_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=query&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=sheets&resource=spreadsheet.sheet.filter_view.condition&version=v3 document }
             *
             * 查询筛选条件
             *
             * 查询指定筛选视图的所有筛选条件，包括筛选的类型、比较类型、筛选参数等。
             */
            query: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        filter_view_id?: string;
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
                                    condition_id?: string;
                                    filter_type?: string;
                                    compare_type?: string;
                                    expected?: Array<string>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/query`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.filter_view.condition&version=v3 document }
             *
             * 创建筛选条件
             *
             * 在筛选视图的指定列创建筛选条件，包括筛选的类型、比较类型、筛选参数等。
             */
            create: async (
                payload?: {
                    data?: {
                        condition_id?: string;
                        filter_type?: string;
                        compare_type?: string;
                        expected?: Array<string>;
                    };
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        filter_view_id?: string;
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
                                condition?: {
                                    condition_id?: string;
                                    filter_type?: string;
                                    compare_type?: string;
                                    expected?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=sheets&resource=spreadsheet.sheet.filter_view.condition&version=v3 document }
             *
             * 更新筛选条件
             *
             * 更新筛选视图指定列的筛选条件，包括筛选的类型、比较类型、筛选参数等。
             */
            update: async (
                payload?: {
                    data?: {
                        filter_type?: string;
                        compare_type?: string;
                        expected?: Array<string>;
                    };
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        filter_view_id?: string;
                        condition_id?: string;
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
                                condition?: {
                                    condition_id?: string;
                                    filter_type?: string;
                                    compare_type?: string;
                                    expected?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id`,
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
         * spreadsheet.sheet.float_image
         */
        spreadsheetSheetFloatImage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.float_image&version=v3 document }
             *
             * 创建浮动图片
             *
             * 在电子表格工作表的指定位置创建一张浮动图片。
             *
             * ## 前提条件;;你已调用[上传素材](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all)或[分片上传素材](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare)上传图片至表格并获取了图片的 `file_token`，作为本接口中图片的 `float_image_token`。;; ## 使用限制;;- 图片大小不得超过 20 MB。;- 单个电子表格最多支持放置 4,000 张不同 token 的图片，即表格内不重复的图片（包括浮动图片和单元格图片）总数不超过 4,000 张。将相同 token 的图片多次放置在表格的不同位置，数量上仅算一张图片。
             */
            create: async (
                payload?: {
                    data?: {
                        float_image_id?: string;
                        float_image_token?: string;
                        range?: string;
                        width?: number;
                        height?: number;
                        offset_x?: number;
                        offset_y?: number;
                    };
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                float_image?: {
                                    float_image_id?: string;
                                    float_image_token?: string;
                                    range?: string;
                                    width?: number;
                                    height?: number;
                                    offset_x?: number;
                                    offset_y?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.float_image&version=v3 document }
             *
             * 获取浮动图片
             *
             * 获取电子表格工作表内指定浮动图片的参数信息。;
             */
            get: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        float_image_id?: string;
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
                                float_image?: {
                                    float_image_id?: string;
                                    float_image_token?: string;
                                    range?: string;
                                    width?: number;
                                    height?: number;
                                    offset_x?: number;
                                    offset_y?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.float_image&version=v3 document }
             *
             * 删除浮动图片
             *
             * 删除电子表格工作表内指定的浮动图片。;
             */
            delete: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        float_image_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.float_image&version=v3 document }
             *
             * 更新浮动图片
             *
             * 更新已有的浮动图片位置和宽高。
             */
            patch: async (
                payload?: {
                    data?: {
                        float_image_token?: string;
                        range?: string;
                        width?: number;
                        height?: number;
                        offset_x?: number;
                        offset_y?: number;
                    };
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        float_image_id?: string;
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
                                float_image?: {
                                    float_image_id?: string;
                                    float_image_token?: string;
                                    range?: string;
                                    width?: number;
                                    height?: number;
                                    offset_x?: number;
                                    offset_y?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=query&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=sheets&resource=spreadsheet.sheet.float_image&version=v3 document }
             *
             * 查询浮动图片
             *
             * 获取电子表格工作表内所有的浮动图片的参数信息。
             */
            query: async (
                payload?: {
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    float_image_id?: string;
                                    float_image_token?: string;
                                    range?: string;
                                    width?: number;
                                    height?: number;
                                    offset_x?: number;
                                    offset_y?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/query`,
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
        v3: {
            /**
             * spreadsheet
             */
            spreadsheet: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet&version=v3 document }
                 *
                 * 修改电子表格属性
                 *
                 * 该接口用于修改电子表格的属性。目前支持修改电子表格标题。
                 */
                patch: async (
                    payload?: {
                        data?: { title?: string };
                        path?: { spreadsheet_token?: string };
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet&version=v3 document }
                 *
                 * 获取电子表格信息
                 *
                 * 根据电子表格 token 获取电子表格的基础信息，包括电子表格的所有者、URL 链接等。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有电子表格的阅读、编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { spreadsheet_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    spreadsheet?: {
                                        title?: string;
                                        owner_id?: string;
                                        token?: string;
                                        url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet&version=v3 document }
                 *
                 * 创建电子表格
                 *
                 * 在云空间指定目录下创建电子表格。可自定义表格标题。不支持带内容创建表格。
                 */
                create: async (
                    payload?: {
                        data?: {
                            title?: string;
                            folder_token?: string;
                            without_mount?: boolean;
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
                                    spreadsheet?: {
                                        title?: string;
                                        folder_token?: string;
                                        url?: string;
                                        spreadsheet_token?: string;
                                        without_mount?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * spreadsheet.sheet
             */
            spreadsheetSheet: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=replace&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=replace&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 替换单元格
                 *
                 * 在指定范围内，查找并替换符合查找条件的单元格。
                 *
                 * ## 使用限制;;单次最多可替换 1,000 个单元格。
                 */
                replace: async (
                    payload?: {
                        data: {
                            find_condition: {
                                range: string;
                                match_case?: boolean;
                                match_entire_cell?: boolean;
                                search_by_regex?: boolean;
                                include_formulas?: boolean;
                            };
                            find: string;
                            replacement: string;
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                    replace_result?: {
                                        matched_cells?: Array<string>;
                                        matched_formula_cells?: Array<string>;
                                        rows_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/replace`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=move_dimension&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=move_dimension&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 移动行列
                 *
                 * 该接口用于移动行或列。行或列被移动到目标位置后，原本在目标位置的行列会对应右移或下移。
                 */
                moveDimension: async (
                    payload?: {
                        data?: {
                            source?: {
                                major_dimension?: string;
                                start_index?: number;
                                end_index?: number;
                            };
                            destination_index?: number;
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/move_dimension`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=find&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=find&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 查找单元格
                 *
                 * 在指定范围内查找符合查找条件的单元格。
                 */
                find: async (
                    payload?: {
                        data: {
                            find_condition: {
                                range: string;
                                match_case?: boolean;
                                match_entire_cell?: boolean;
                                search_by_regex?: boolean;
                                include_formulas?: boolean;
                            };
                            find: string;
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                    find_result?: {
                                        matched_cells?: Array<string>;
                                        matched_formula_cells?: Array<string>;
                                        rows_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/find`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 查询工作表
                 *
                 * 根据工作表 ID 查询工作表属性信息，包括工作表的标题、索引位置、是否被隐藏等。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有电子表格的阅读、编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
                 */
                get: async (
                    payload?: {
                        path: { spreadsheet_token: string; sheet_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    sheet?: {
                                        sheet_id?: string;
                                        title?: string;
                                        index?: number;
                                        hidden?: boolean;
                                        grid_properties?: {
                                            frozen_row_count?: number;
                                            frozen_column_count?: number;
                                            row_count?: number;
                                            column_count?: number;
                                        };
                                        resource_type?: string;
                                        merges?: Array<{
                                            start_row_index?: number;
                                            end_row_index?: number;
                                            start_column_index?: number;
                                            end_column_index?: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=query&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 获取工作表
                 *
                 * 根据电子表格 token 获取表格中所有工作表及其属性信息，包括工作表 ID、标题、索引位置、是否被隐藏等。
                 *
                 * ## 前提条件;;调用此接口前，请确保当前调用身份（tenant_access_token 或 user_access_token）已有电子表格的阅读、编辑等文档权限，否则接口将返回 HTTP 403 或 400 状态码。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
                 */
                query: async (
                    payload?: {
                        path?: { spreadsheet_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    sheets?: Array<{
                                        sheet_id?: string;
                                        title?: string;
                                        index?: number;
                                        hidden?: boolean;
                                        grid_properties?: {
                                            frozen_row_count?: number;
                                            frozen_column_count?: number;
                                            row_count?: number;
                                            column_count?: number;
                                        };
                                        resource_type?: string;
                                        merges?: Array<{
                                            start_row_index?: number;
                                            end_row_index?: number;
                                            start_column_index?: number;
                                            end_column_index?: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/query`,
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
             * spreadsheet.sheet.filter
             */
            spreadsheetSheetFilter: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.filter&version=v3 document }
                 *
                 * 删除筛选
                 *
                 * 删除电子表格中指定工作表的所有筛选。
                 */
                delete: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.filter&version=v3 document }
                 *
                 * 获取筛选
                 *
                 * 获取电子表格中工作表的详细筛选信息，包括筛选的应用范围、筛选条件、被筛选条件过滤掉的行。
                 */
                get: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                    sheet_filter_info?: {
                                        range: string;
                                        filtered_out_rows: Array<number>;
                                        filter_infos: Array<{
                                            col: string;
                                            conditions: Array<{
                                                filter_type: string;
                                                compare_type?: string;
                                                expected?: Array<string>;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.filter&version=v3 document }
                 *
                 * 创建筛选
                 *
                 * 在电子表格工作表的指定范围内，设置筛选条件，创建筛选。
                 */
                create: async (
                    payload?: {
                        data: {
                            range: string;
                            col: string;
                            condition: {
                                filter_type: string;
                                compare_type?: string;
                                expected?: Array<string>;
                            };
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=sheets&resource=spreadsheet.sheet.filter&version=v3 document }
                 *
                 * 更新筛选
                 *
                 * 在电子表格工作表筛选范围中，更新指定列的筛选条件。
                 */
                update: async (
                    payload?: {
                        data: {
                            col: string;
                            condition: {
                                filter_type: string;
                                compare_type?: string;
                                expected?: Array<string>;
                            };
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`,
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
             * spreadsheet.sheet.filter_view
             */
            spreadsheetSheetFilterView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.filter_view&version=v3 document }
                 *
                 * 获取筛选视图
                 *
                 * 获取指定筛选视图的信息，包括 ID、名称和筛选范围。
                 *
                 * 要获取所有筛选视图的信息，可调用[查询筛选视图](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/query)。
                 */
                get: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            filter_view_id?: string;
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
                                    filter_view?: {
                                        filter_view_id?: string;
                                        filter_view_name?: string;
                                        range?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.filter_view&version=v3 document }
                 *
                 * 创建筛选视图
                 *
                 * 指定电子表格工作表的筛选范围，创建一个筛选视图。
                 *
                 * ## 使用限制;;单个工作表中的筛选视图数量不得超过 150 个。
                 */
                create: async (
                    payload?: {
                        data?: {
                            filter_view_id?: string;
                            filter_view_name?: string;
                            range?: string;
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                    filter_view?: {
                                        filter_view_id?: string;
                                        filter_view_name?: string;
                                        range?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.filter_view&version=v3 document }
                 *
                 * 删除筛选视图
                 *
                 * 删除指定筛选视图。
                 */
                delete: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            filter_view_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=query&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=sheets&resource=spreadsheet.sheet.filter_view&version=v3 document }
                 *
                 * 查询筛选视图
                 *
                 * 查询电子表格指定工作表的所有筛选视图及其基本信息，包括视图 ID、视图名称和筛选范围。
                 */
                query: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                        filter_view_id?: string;
                                        filter_view_name?: string;
                                        range?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.filter_view&version=v3 document }
                 *
                 * 更新筛选视图
                 *
                 * 更新筛选视图的名称或筛选范围。
                 */
                patch: async (
                    payload?: {
                        data?: { filter_view_name?: string; range?: string };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            filter_view_id?: string;
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
                                    filter_view?: {
                                        filter_view_id?: string;
                                        filter_view_name?: string;
                                        range?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id`,
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
             * spreadsheet.sheet.filter_view.condition
             */
            spreadsheetSheetFilterViewCondition: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.filter_view.condition&version=v3 document }
                 *
                 * 获取筛选条件
                 *
                 * 获取筛选视图某列的筛选条件，包括筛选的类型、比较类型、筛选参数等。
                 */
                get: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            filter_view_id?: string;
                            condition_id?: string;
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
                                    condition?: {
                                        condition_id?: string;
                                        filter_type?: string;
                                        compare_type?: string;
                                        expected?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.filter_view.condition&version=v3 document }
                 *
                 * 删除筛选条件
                 *
                 * 删除筛选视图指定列的所有筛选条件。
                 */
                delete: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            filter_view_id?: string;
                            condition_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=query&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=sheets&resource=spreadsheet.sheet.filter_view.condition&version=v3 document }
                 *
                 * 查询筛选条件
                 *
                 * 查询指定筛选视图的所有筛选条件，包括筛选的类型、比较类型、筛选参数等。
                 */
                query: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            filter_view_id?: string;
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
                                        condition_id?: string;
                                        filter_type?: string;
                                        compare_type?: string;
                                        expected?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.filter_view.condition&version=v3 document }
                 *
                 * 创建筛选条件
                 *
                 * 在筛选视图的指定列创建筛选条件，包括筛选的类型、比较类型、筛选参数等。
                 */
                create: async (
                    payload?: {
                        data?: {
                            condition_id?: string;
                            filter_type?: string;
                            compare_type?: string;
                            expected?: Array<string>;
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            filter_view_id?: string;
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
                                    condition?: {
                                        condition_id?: string;
                                        filter_type?: string;
                                        compare_type?: string;
                                        expected?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=sheets&resource=spreadsheet.sheet.filter_view.condition&version=v3 document }
                 *
                 * 更新筛选条件
                 *
                 * 更新筛选视图指定列的筛选条件，包括筛选的类型、比较类型、筛选参数等。
                 */
                update: async (
                    payload?: {
                        data?: {
                            filter_type?: string;
                            compare_type?: string;
                            expected?: Array<string>;
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            filter_view_id?: string;
                            condition_id?: string;
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
                                    condition?: {
                                        condition_id?: string;
                                        filter_type?: string;
                                        compare_type?: string;
                                        expected?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id`,
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
             * spreadsheet.sheet.float_image
             */
            spreadsheetSheetFloatImage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.float_image&version=v3 document }
                 *
                 * 创建浮动图片
                 *
                 * 在电子表格工作表的指定位置创建一张浮动图片。
                 *
                 * ## 前提条件;;你已调用[上传素材](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all)或[分片上传素材](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare)上传图片至表格并获取了图片的 `file_token`，作为本接口中图片的 `float_image_token`。;; ## 使用限制;;- 图片大小不得超过 20 MB。;- 单个电子表格最多支持放置 4,000 张不同 token 的图片，即表格内不重复的图片（包括浮动图片和单元格图片）总数不超过 4,000 张。将相同 token 的图片多次放置在表格的不同位置，数量上仅算一张图片。
                 */
                create: async (
                    payload?: {
                        data?: {
                            float_image_id?: string;
                            float_image_token?: string;
                            range?: string;
                            width?: number;
                            height?: number;
                            offset_x?: number;
                            offset_y?: number;
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                    float_image?: {
                                        float_image_id?: string;
                                        float_image_token?: string;
                                        range?: string;
                                        width?: number;
                                        height?: number;
                                        offset_x?: number;
                                        offset_y?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.float_image&version=v3 document }
                 *
                 * 获取浮动图片
                 *
                 * 获取电子表格工作表内指定浮动图片的参数信息。;
                 */
                get: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            float_image_id?: string;
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
                                    float_image?: {
                                        float_image_id?: string;
                                        float_image_token?: string;
                                        range?: string;
                                        width?: number;
                                        height?: number;
                                        offset_x?: number;
                                        offset_y?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.float_image&version=v3 document }
                 *
                 * 删除浮动图片
                 *
                 * 删除电子表格工作表内指定的浮动图片。;
                 */
                delete: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            float_image_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.float_image&version=v3 document }
                 *
                 * 更新浮动图片
                 *
                 * 更新已有的浮动图片位置和宽高。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            float_image_token?: string;
                            range?: string;
                            width?: number;
                            height?: number;
                            offset_x?: number;
                            offset_y?: number;
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            float_image_id?: string;
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
                                    float_image?: {
                                        float_image_id?: string;
                                        float_image_token?: string;
                                        range?: string;
                                        width?: number;
                                        height?: number;
                                        offset_x?: number;
                                        offset_y?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=query&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=sheets&resource=spreadsheet.sheet.float_image&version=v3 document }
                 *
                 * 查询浮动图片
                 *
                 * 获取电子表格工作表内所有的浮动图片的参数信息。
                 */
                query: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
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
                                        float_image_id?: string;
                                        float_image_token?: string;
                                        range?: string;
                                        width?: number;
                                        height?: number;
                                        offset_x?: number;
                                        offset_y?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/query`,
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
