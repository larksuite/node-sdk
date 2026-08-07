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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=append_dimension&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=append_dimension&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 增加行列
             *
             * 该接口用于在工作表末尾增加行列
             */
            appendDimension: async (
                payload?: {
                    data: {
                        major_dimension: "ROWS" | "COLUMNS";
                        length: number;
                        inherit_from_before?: boolean;
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/append_dimension`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=delete_dimension&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_dimension&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 删除行列
             *
             * 该接口用于删除行列
             */
            deleteDimension: async (
                payload?: {
                    data?: {
                        major_dimension?: string;
                        start_index?: number;
                        end_index?: number;
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/delete_dimension`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=insert_dimension&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=insert_dimension&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 插入行列
             *
             * 该接口用于插入行列
             */
            insertDimension: async (
                payload?: {
                    data?: {
                        dimension_range?: {
                            major_dimension?: string;
                            start_index?: number;
                            end_index?: number;
                        };
                        inherit_from?: "Before" | "After";
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/insert_dimension`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=update_dimension&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_dimension&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 更新行列属性
             *
             * 该接口用于更新行列大小与可见性
             */
            updateDimension: async (
                payload?: {
                    data: {
                        dimension_range: {
                            major_dimension?: string;
                            start_index?: number;
                            end_index?: number;
                        };
                        properties: { hidden?: boolean; pixel_size?: number };
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/update_dimension`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=merge_cells&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=merge_cells&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 合并单元格
             *
             * 合并电子表格工作表中的单元格。
             *
             * ## 使用限制;;合并的单元格数量不得超过 5,000 个。
             */
            mergeCells: async (
                payload?: {
                    data?: {
                        merge_cells?: Array<{
                            range: {
                                start_row_index?: number;
                                end_row_index?: number;
                                start_column_index?: number;
                                end_column_index?: number;
                            };
                            merge_type?:
                                | "MergeAll"
                                | "MergeRows"
                                | "MergeColumns";
                        }>;
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/merge_cells`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 删除工作表
             *
             * 该接口用户删除工作表
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=unmerge_cells&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unmerge_cells&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 拆分单元格
             *
             * 该接口用于拆分单元格，请求参数中的范围需要与合并单元格大小完全一致。
             */
            unmergeCells: async (
                payload?: {
                    data?: {
                        unmerge_cells?: Array<{
                            start_row_index?: number;
                            end_row_index?: number;
                            start_column_index?: number;
                            end_column_index?: number;
                        }>;
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/unmerge_cells`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 修改工作表属性
             *
             * 修改工作表位置、表名等。
             */
            patch: async (
                payload?: {
                    data?: {
                        title?: string;
                        index?: number;
                        hidden?: boolean;
                        resource_type?: string;
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=update_grid_properties&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_grid_properties&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 冻结行列
             *
             * 该接口用于更新工作表冻结行列信息
             */
            updateGridProperties: async (
                payload?: {
                    data?: {
                        frozen_row_count?: number;
                        frozen_column_count?: number;
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/update_grid_properties`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 创建工作表
             *
             * 给指定电子表格创建工作表。
             */
            create: async (
                payload?: {
                    data?: { title?: string; index?: number };
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=copy&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=copy&project=sheets&resource=spreadsheet.sheet&version=v3 document }
             *
             * 复制工作表
             *
             * 该接口用于在独立表格中复制工作表
             */
            copy: async (
                payload?: {
                    data?: { title?: string; index?: number };
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/copy`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
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
         * spreadsheet.sheet.value
         */
        spreadsheetSheetValue: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=batch_clear&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_clear&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
             *
             * 清除单元格内容
             *
             * 清除单元格内容，同时会保留单元格原有的样式。传入的 range 数量不得超过 10 个。
             */
            batchClear: async (
                payload?: {
                    data?: { ranges?: Array<string> };
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/batch_clear`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=append&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=append&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
             *
             * 追加数据
             *
             * 在电子表格工作表的指定范围中，在空白位置中追加数据。例如，若指定范围参数 range 为 6e5ed3!A1:B2，该接口将从 A1 开始往下查找，即依次寻找 A1、A2、A3...单元格，在找到的第一个空白位置中写入数据。
             *
             * ## 使用限制;- 单次写入不超过 5,000 个单元格;- 每个单元格不可超过 50,000 字符，由于服务端会增加控制字符，因此推荐每个单元格不超过 40,000 字符;- 单次写入 Reminder 数量不超过 100 个;- 单次写入 Reminder 提醒人员数量不超过 1,000 个;- 单次写入提及文档数量不超过 10 个;- 单次写入图片数量不超过 50 个
             */
            append: async (
                payload?: {
                    data?: {
                        values?: Array<
                            Array<
                                Array<{
                                    type?: string;
                                    text?: {
                                        text?: string;
                                        segment_style?: {
                                            affected_text?: string;
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strike_through?: boolean;
                                                underline?: boolean;
                                                fore_color?: string;
                                                font_size?: number;
                                            };
                                        };
                                    };
                                    mention_user?: {
                                        name?: string;
                                        user_id?: string;
                                        notify?: boolean;
                                        segment_style?: {
                                            affected_text?: string;
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strike_through?: boolean;
                                                underline?: boolean;
                                                fore_color?: string;
                                                font_size?: number;
                                            };
                                        };
                                    };
                                    mention_document?: {
                                        title?: string;
                                        object_type?: string;
                                        token?: string;
                                        segment_style?: {
                                            affected_text?: string;
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strike_through?: boolean;
                                                underline?: boolean;
                                                fore_color?: string;
                                                font_size?: number;
                                            };
                                        };
                                        link?: string;
                                    };
                                    value?: { value?: string };
                                    date_time?: { date_time?: string };
                                    file?: {
                                        file_token?: string;
                                        name?: string;
                                        segment_style?: {
                                            affected_text?: string;
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strike_through?: boolean;
                                                underline?: boolean;
                                                fore_color?: string;
                                                font_size?: number;
                                            };
                                        };
                                    };
                                    image?: { image_token?: string };
                                    link?: {
                                        text?: string;
                                        link?: string;
                                        segment_styles?: Array<{
                                            affected_text?: string;
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strike_through?: boolean;
                                                underline?: boolean;
                                                fore_color?: string;
                                                font_size?: number;
                                            };
                                        }>;
                                    };
                                    reminder?: {
                                        notify_date_time?: string;
                                        notify_user_id?: Array<string>;
                                        notify_text?: string;
                                        notify_strategy?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "7"
                                            | "8";
                                    };
                                    formula?: {
                                        formula?: string;
                                        formula_value?: string;
                                        affected_range?: string;
                                    };
                                }>
                            >
                        >;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        range?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/:range/append`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=insert&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=insert&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
             *
             * 插入数据
             *
             * 在电子表格**特定工作表指定范围**的开始位置上方增加若干行，并在该范围中填充数据。
             */
            insert: async (
                payload?: {
                    data?: {
                        values?: Array<
                            Array<
                                Array<{
                                    type?: string;
                                    text?: {
                                        text?: string;
                                        segment_style?: {
                                            affected_text?: string;
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strike_through?: boolean;
                                                underline?: boolean;
                                                fore_color?: string;
                                                font_size?: number;
                                            };
                                        };
                                    };
                                    mention_user?: {
                                        name?: string;
                                        user_id?: string;
                                        notify?: boolean;
                                        segment_style?: {
                                            affected_text?: string;
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strike_through?: boolean;
                                                underline?: boolean;
                                                fore_color?: string;
                                                font_size?: number;
                                            };
                                        };
                                    };
                                    mention_document?: {
                                        title?: string;
                                        object_type?: string;
                                        token?: string;
                                        segment_style?: {
                                            affected_text?: string;
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strike_through?: boolean;
                                                underline?: boolean;
                                                fore_color?: string;
                                                font_size?: number;
                                            };
                                        };
                                        link?: string;
                                    };
                                    value?: { value?: string };
                                    date_time?: { date_time?: string };
                                    file?: {
                                        file_token?: string;
                                        name?: string;
                                        segment_style?: {
                                            affected_text?: string;
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strike_through?: boolean;
                                                underline?: boolean;
                                                fore_color?: string;
                                                font_size?: number;
                                            };
                                        };
                                    };
                                    image?: { image_token?: string };
                                    link?: {
                                        text?: string;
                                        link?: string;
                                        segment_styles?: Array<{
                                            affected_text?: string;
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strike_through?: boolean;
                                                underline?: boolean;
                                                fore_color?: string;
                                                font_size?: number;
                                            };
                                        }>;
                                    };
                                    reminder?: {
                                        notify_date_time?: string;
                                        notify_user_id?: Array<string>;
                                        notify_text?: string;
                                        notify_strategy?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "7"
                                            | "8";
                                    };
                                    formula?: {
                                        formula?: string;
                                        formula_value?: string;
                                        affected_range?: string;
                                    };
                                }>
                            >
                        >;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        range?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/:range/insert`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=batch_update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
             *
             * 写入单元格
             *
             * 将数据写入到指定区域。当写入范围超出表格现有范围时，将自动扩增行列，扩增的行列将会继承上一行/列的样式。
             *
             * ## 使用限制;- 单次请求的区域数量不可超过 10 个;- 单次写入的单元格不可超过 5,000 个;- 每个单元格不可超过 50,000 字符，由于服务端会增加控制字符，因此推荐每个单元格不超过 40,000 字符;- 单次写入 Reminder 数量不超过 100 个;- 单次写入 Reminder 提醒人员数量不超过 1,000 个;- 单次写入提及文档数量不超过 10 个;- 单次写入图片数量不超过 50 个
             */
            batchUpdate: async (
                payload?: {
                    data?: {
                        value_ranges?: Array<{
                            range?: string;
                            values?: Array<
                                Array<
                                    Array<{
                                        type?: string;
                                        text?: {
                                            text?: string;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                        };
                                        mention_user?: {
                                            name?: string;
                                            user_id?: string;
                                            notify?: boolean;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                        };
                                        mention_document?: {
                                            title?: string;
                                            object_type?: string;
                                            token?: string;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                            link?: string;
                                        };
                                        value?: { value?: string };
                                        date_time?: { date_time?: string };
                                        file?: {
                                            file_token?: string;
                                            name?: string;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                        };
                                        image?: { image_token?: string };
                                        link?: {
                                            text?: string;
                                            link?: string;
                                            segment_styles?: Array<{
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            }>;
                                        };
                                        reminder?: {
                                            notify_date_time?: string;
                                            notify_user_id?: Array<string>;
                                            notify_text?: string;
                                            notify_strategy?:
                                                | "0"
                                                | "1"
                                                | "2"
                                                | "3"
                                                | "4"
                                                | "5"
                                                | "6"
                                                | "7"
                                                | "8";
                                        };
                                        formula?: {
                                            formula?: string;
                                            formula_value?: string;
                                            affected_range?: string;
                                        };
                                    }>
                                >
                            >;
                        }>;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/batch_update`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=batch_get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
             *
             * 获取电子表格富文本内容
             *
             * 获取电子表格的富文本内容。
             */
            batchGet: async (
                payload?: {
                    data?: { ranges?: Array<string> };
                    params?: {
                        datetime_render_option?:
                            | "formatted_string"
                            | "serial_number";
                        value_render_option?:
                            | "formatted_value"
                            | "unformatted_value";
                        user_id_type?: "open_id" | "union_id" | "user_id";
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
                                value_ranges?: Array<{
                                    range?: string;
                                    values?: Array<
                                        Array<
                                            Array<{
                                                type?: string;
                                                text?: {
                                                    text?: string;
                                                    segment_style?: {
                                                        affected_text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            italic?: boolean;
                                                            strike_through?: boolean;
                                                            underline?: boolean;
                                                            fore_color?: string;
                                                            font_size?: number;
                                                        };
                                                    };
                                                };
                                                mention_user?: {
                                                    name?: string;
                                                    user_id?: string;
                                                    notify?: boolean;
                                                    segment_style?: {
                                                        affected_text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            italic?: boolean;
                                                            strike_through?: boolean;
                                                            underline?: boolean;
                                                            fore_color?: string;
                                                            font_size?: number;
                                                        };
                                                    };
                                                };
                                                mention_document?: {
                                                    title?: string;
                                                    object_type?: string;
                                                    token?: string;
                                                    segment_style?: {
                                                        affected_text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            italic?: boolean;
                                                            strike_through?: boolean;
                                                            underline?: boolean;
                                                            fore_color?: string;
                                                            font_size?: number;
                                                        };
                                                    };
                                                    link?: string;
                                                };
                                                value?: { value?: string };
                                                date_time?: {
                                                    date_time?: string;
                                                };
                                                file?: {
                                                    file_token?: string;
                                                    name?: string;
                                                    segment_style?: {
                                                        affected_text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            italic?: boolean;
                                                            strike_through?: boolean;
                                                            underline?: boolean;
                                                            fore_color?: string;
                                                            font_size?: number;
                                                        };
                                                    };
                                                };
                                                image?: {
                                                    image_token?: string;
                                                };
                                                link?: {
                                                    text?: string;
                                                    link?: string;
                                                    segment_styles?: Array<{
                                                        affected_text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            italic?: boolean;
                                                            strike_through?: boolean;
                                                            underline?: boolean;
                                                            fore_color?: string;
                                                            font_size?: number;
                                                        };
                                                    }>;
                                                };
                                                reminder?: {
                                                    notify_date_time?: string;
                                                    notify_user_id?: Array<string>;
                                                    notify_text?: string;
                                                    notify_strategy?:
                                                        | "0"
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "5"
                                                        | "6"
                                                        | "7"
                                                        | "8";
                                                };
                                                formula?: {
                                                    formula?: string;
                                                    formula_value?: string;
                                                    affected_range?: string;
                                                };
                                            }>
                                        >
                                    >;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/batch_get`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=batch_get_plain&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get_plain&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
             *
             * 获取电子表格纯文本内容
             *
             * 获取工作表的纯文本内容。
             */
            batchGetPlain: async (
                payload?: {
                    data?: { ranges?: Array<string> };
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
                                value_ranges?: Array<{
                                    range?: string;
                                    values?: Array<Array<string>>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/batch_get_plain`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
        /**
         * spreadsheet.sheet.conditional_format
         */
        spreadsheetSheetConditionalFormat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.conditional_format&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=sheets&resource=spreadsheet.sheet.conditional_format&version=v3 document }
             */
            list: async (
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
                                conditional_formats?: Array<{
                                    conditional_format_id?: string;
                                    conditional_format_rule: {
                                        boolean_rule?: {
                                            type?:
                                                | "CellEqual"
                                                | "CellNotEqual"
                                                | "CellGreaterThan"
                                                | "CellGreaterThanOrEqual"
                                                | "CellLessThen"
                                                | "CellLessThanOrEqual"
                                                | "CellBetween"
                                                | "CellNotBetween"
                                                | "TextBeginsWith"
                                                | "TextEndsWith"
                                                | "TextContains"
                                                | "TextNotContains"
                                                | "TextIs"
                                                | "DateBefore"
                                                | "DateIs"
                                                | "DateAfter"
                                                | "Top"
                                                | "Bottom"
                                                | "AboveAverage"
                                                | "BelowAverage"
                                                | "CustomFormula";
                                            boolean_conditional_values?: Array<{
                                                type:
                                                    | "Number"
                                                    | "Text"
                                                    | "TimePeriod"
                                                    | "Percentage";
                                                number?: string;
                                                text?: string;
                                                time_period?:
                                                    | "Today"
                                                    | "Yesterday"
                                                    | "Tomorrow"
                                                    | "LastSeventDays";
                                            }>;
                                        };
                                        type: "BooleanRuleCondition";
                                    };
                                    index?: number;
                                    ranges: {
                                        sheet_id: string;
                                        start_row_index?: number;
                                        end_row_index?: number;
                                        start_column_index?: number;
                                        end_column_index?: number;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/conditional_formats`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.conditional_format&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.conditional_format&version=v3 document }
             */
            patch: async (
                payload?: {
                    data?: {
                        ranges?: Array<{
                            sheet_id: string;
                            start_row_index?: number;
                            end_row_index?: number;
                            start_column_index?: number;
                            end_column_index?: number;
                        }>;
                        conditional_format_rule?: {
                            boolean_rule?: {
                                type?:
                                    | "CellEqual"
                                    | "CellNotEqual"
                                    | "CellGreaterThan"
                                    | "CellGreaterThanOrEqual"
                                    | "CellLessThen"
                                    | "CellLessThanOrEqual"
                                    | "CellBetween"
                                    | "CellNotBetween"
                                    | "TextBeginsWith"
                                    | "TextEndsWith"
                                    | "TextContains"
                                    | "TextNotContains"
                                    | "TextIs"
                                    | "DateBefore"
                                    | "DateIs"
                                    | "DateAfter"
                                    | "Top"
                                    | "Bottom"
                                    | "AboveAverage"
                                    | "BelowAverage"
                                    | "CustomFormula";
                                boolean_conditional_values?: Array<{
                                    type:
                                        | "Number"
                                        | "Text"
                                        | "TimePeriod"
                                        | "Percentage";
                                    number?: string;
                                    text?: string;
                                    time_period?:
                                        | "Today"
                                        | "Yesterday"
                                        | "Tomorrow"
                                        | "LastSeventDays";
                                }>;
                            };
                            type: "BooleanRuleCondition";
                        };
                        index?: number;
                    };
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        conditional_format_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/conditional_formats/:conditional_format_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.conditional_format&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.conditional_format&version=v3 document }
             */
            get: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        conditional_format_id?: string;
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
                                conditional_format?: {
                                    conditional_format_id?: string;
                                    conditional_format_rule: {
                                        boolean_rule?: {
                                            type?:
                                                | "CellEqual"
                                                | "CellNotEqual"
                                                | "CellGreaterThan"
                                                | "CellGreaterThanOrEqual"
                                                | "CellLessThen"
                                                | "CellLessThanOrEqual"
                                                | "CellBetween"
                                                | "CellNotBetween"
                                                | "TextBeginsWith"
                                                | "TextEndsWith"
                                                | "TextContains"
                                                | "TextNotContains"
                                                | "TextIs"
                                                | "DateBefore"
                                                | "DateIs"
                                                | "DateAfter"
                                                | "Top"
                                                | "Bottom"
                                                | "AboveAverage"
                                                | "BelowAverage"
                                                | "CustomFormula";
                                            boolean_conditional_values?: Array<{
                                                type:
                                                    | "Number"
                                                    | "Text"
                                                    | "TimePeriod"
                                                    | "Percentage";
                                                number?: string;
                                                text?: string;
                                                time_period?:
                                                    | "Today"
                                                    | "Yesterday"
                                                    | "Tomorrow"
                                                    | "LastSeventDays";
                                            }>;
                                        };
                                        type: "BooleanRuleCondition";
                                    };
                                    index?: number;
                                    ranges: {
                                        sheet_id: string;
                                        start_row_index?: number;
                                        end_row_index?: number;
                                        start_column_index?: number;
                                        end_column_index?: number;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/conditional_formats/:conditional_format_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.conditional_format&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.conditional_format&version=v3 document }
             */
            create: async (
                payload?: {
                    data: {
                        conditional_format_rule: {
                            boolean_rule?: {
                                type?:
                                    | "CellEqual"
                                    | "CellNotEqual"
                                    | "CellGreaterThan"
                                    | "CellGreaterThanOrEqual"
                                    | "CellLessThen"
                                    | "CellLessThanOrEqual"
                                    | "CellBetween"
                                    | "CellNotBetween"
                                    | "TextBeginsWith"
                                    | "TextEndsWith"
                                    | "TextContains"
                                    | "TextNotContains"
                                    | "TextIs"
                                    | "DateBefore"
                                    | "DateIs"
                                    | "DateAfter"
                                    | "Top"
                                    | "Bottom"
                                    | "AboveAverage"
                                    | "BelowAverage"
                                    | "CustomFormula";
                                boolean_conditional_values?: Array<{
                                    type:
                                        | "Number"
                                        | "Text"
                                        | "TimePeriod"
                                        | "Percentage";
                                    number?: string;
                                    text?: string;
                                    time_period?:
                                        | "Today"
                                        | "Yesterday"
                                        | "Tomorrow"
                                        | "LastSeventDays";
                                }>;
                            };
                            type: "BooleanRuleCondition";
                        };
                        index?: number;
                        ranges: {
                            sheet_id: string;
                            start_row_index?: number;
                            end_row_index?: number;
                            start_column_index?: number;
                            end_column_index?: number;
                        };
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
                            data?: { conditional_format_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/conditional_formats`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.conditional_format&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.conditional_format&version=v3 document }
             */
            delete: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        conditional_format_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/conditional_formats/:conditional_format_id`,
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
         * spreadsheet.sheet.data_validation
         */
        spreadsheetSheetDataValidation: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.data_validation&apiName=batch_clear&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_clear&project=sheets&resource=spreadsheet.sheet.data_validation&version=v3 document }
             */
            batchClear: async (
                payload?: {
                    data?: {
                        condition_id?: string;
                        filter_type?: string;
                        compare_type?: string;
                        expected?: Array<string>;
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/data_validations/batch_clear`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.data_validation&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.data_validation&version=v3 document }
             */
            get: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        data_validation_id?: string;
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
                                data_validation?: {
                                    data_validation_id?: number;
                                    data_validation_rule?: {
                                        type:
                                            | "SingleOption"
                                            | "MultipleOption"
                                            | "CheckBox"
                                            | "NumberDataValidation"
                                            | "DateDataValidation"
                                            | "TextDataValidation";
                                        single_option?: {
                                            type: "OneOfList" | "OneOfRange";
                                            range?: string;
                                            data_validation_values?: Array<{
                                                option_value: string;
                                                option_color?: string;
                                            }>;
                                            properties?: {
                                                show_dropdown_icon?: boolean;
                                            };
                                        };
                                        multiple_option?: {
                                            type:
                                                | "MultipleOfList"
                                                | "MultipleOfRange";
                                            range?: string;
                                            data_validation_values?: Array<{
                                                option_value: string;
                                                option_color?: string;
                                            }>;
                                            properties?: {
                                                show_dropdown_icon?: boolean;
                                            };
                                        };
                                    };
                                    strict?: string;
                                    help_text?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/data_validations/:data_validation_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.data_validation&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.data_validation&version=v3 document }
             */
            patch: async (
                payload?: {
                    data: {
                        data_validation_rule: {
                            type:
                                | "SingleOption"
                                | "MultipleOption"
                                | "CheckBox"
                                | "NumberDataValidation"
                                | "DateDataValidation"
                                | "TextDataValidation";
                            single_option?: {
                                type: "OneOfList" | "OneOfRange";
                                range?: string;
                                data_validation_values?: Array<{
                                    option_value: string;
                                    option_color?: string;
                                }>;
                                properties?: { show_dropdown_icon?: boolean };
                            };
                            multiple_option?: {
                                type: "MultipleOfList" | "MultipleOfRange";
                                range?: string;
                                data_validation_values?: Array<{
                                    option_value: string;
                                    option_color?: string;
                                }>;
                                properties?: { show_dropdown_icon?: boolean };
                            };
                        };
                        strict?: boolean;
                        help_text?: string;
                    };
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        data_validation_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/data_validations/:data_validation_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.data_validation&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.data_validation&version=v3 document }
             */
            create: async (
                payload?: {
                    data?: {
                        data_validation_rule?: {
                            type:
                                | "SingleOption"
                                | "MultipleOption"
                                | "CheckBox"
                                | "NumberDataValidation"
                                | "DateDataValidation"
                                | "TextDataValidation";
                            single_option?: {
                                type: "OneOfList" | "OneOfRange";
                                range?: string;
                                data_validation_values?: Array<{
                                    option_value: string;
                                    option_color?: string;
                                }>;
                                properties?: { show_dropdown_icon?: boolean };
                            };
                            multiple_option?: {
                                type: "MultipleOfList" | "MultipleOfRange";
                                range?: string;
                                data_validation_values?: Array<{
                                    option_value: string;
                                    option_color?: string;
                                }>;
                                properties?: { show_dropdown_icon?: boolean };
                            };
                        };
                        strict?: string;
                        help_text?: string;
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/data_validations`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * spreadsheet.sheet.style
         */
        spreadsheetSheetStyle: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.style&apiName=batch_clear&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_clear&project=sheets&resource=spreadsheet.sheet.style&version=v3 document }
             */
            batchClear: async (
                payload?: {
                    data: { ranges: Array<string> };
                    path?: { spreadsheet_token?: string; sheet_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/styles/batch_clear`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.style&apiName=batch_update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=sheets&resource=spreadsheet.sheet.style&version=v3 document }
             */
            batchUpdate: async (
                payload?: {
                    data?: {
                        style_ranges?: Array<{
                            range?: string;
                            styles?: Array<
                                Array<{
                                    font_style?: {
                                        bold?: boolean;
                                        italic?: boolean;
                                        strikethrough?: boolean;
                                        underline?: boolean;
                                        foreground_color?: string;
                                        background_color?: string;
                                    };
                                    border_style?: {
                                        top?: {
                                            style?: "Solid" | "None";
                                            color?: string;
                                        };
                                        left?: {
                                            style?: "Solid" | "None";
                                            color?: string;
                                        };
                                        right?: {
                                            style?: "Solid" | "None";
                                            color?: string;
                                        };
                                        bottom?: {
                                            style?: "Solid" | "None";
                                            color?: string;
                                        };
                                    };
                                    alignment_style?: {
                                        horizontal_alignment?:
                                            | "Left"
                                            | "Center"
                                            | "Right";
                                        vertical_alignment?:
                                            | "Top"
                                            | "Middle"
                                            | "Bottom";
                                    };
                                    wrap_strategy?:
                                        | "Overflow"
                                        | "Clip"
                                        | "Wrap";
                                    format?: string;
                                }>
                            >;
                        }>;
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
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/styles/batch_update`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * spreadsheet.sheet.protected_range
         */
        spreadsheetSheetProtectedRange: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.protected_range&version=v3 document }
             *
             * 删除保护范围
             *
             * 该接口用于删除工作表下指定保护范围。
             */
            delete: async (
                payload?: {
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        protected_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges/:protected_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.protected_range&version=v3 document }
             *
             * 修改保护范围
             *
             * 该接口用于修改保护范围、保护信息等。
             */
            patch: async (
                payload?: {
                    data?: {
                        description?: string;
                        protected_rows?: {
                            sheet_id: string;
                            start_index?: number;
                            end_index?: number;
                        };
                        protected_columns?: {
                            sheet_id: string;
                            start_index?: number;
                            end_index?: number;
                        };
                    };
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        protected_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges/:protected_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.protected_range&version=v3 document }
             *
             * 创建保护范围
             *
             * 该接口用于创建保护范围，可以创建保护行，保护列或者保护工作表。
             */
            create: async (
                payload?: {
                    data?: {
                        description?: string;
                        protected_dimension?: "ROWS" | "COLUMNS" | "SHEET";
                        protected_rows?: {
                            sheet_id: string;
                            start_index?: number;
                            end_index?: number;
                        };
                        protected_columns?: {
                            sheet_id: string;
                            start_index?: number;
                            end_index?: number;
                        };
                        protected_sheet?: { sheet_id: string };
                        editors?: {
                            users?: Array<string>;
                            departments?: Array<string>;
                            chats?: Array<string>;
                        };
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                            data?: { protected_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.protected_range&version=v3 document }
             *
             * 获取保护范围
             *
             * 该接口的作用是获取指定工作表的保护范围信息，包括保护范围的 ID、描述、维度、行、列、工作表和可编辑者等信息。
             */
            get: async (
                payload?: {
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: {
                        spreadsheet_token?: string;
                        sheet_id?: string;
                        protected_id?: string;
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
                                protected_range?: {
                                    protected_id?: string;
                                    description?: string;
                                    protected_dimension?:
                                        | "ROWS"
                                        | "COLUMNS"
                                        | "SHEET";
                                    protected_rows?: {
                                        sheet_id: string;
                                        start_index?: number;
                                        end_index?: number;
                                    };
                                    protected_columns?: {
                                        sheet_id: string;
                                        start_index?: number;
                                        end_index?: number;
                                    };
                                    protected_sheet?: { sheet_id: string };
                                    editors?: {
                                        users?: Array<string>;
                                        departments?: Array<string>;
                                        chats?: Array<string>;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges/:protected_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=sheets&resource=spreadsheet.sheet.protected_range&version=v3 document }
             *
             * 列出保护范围
             *
             * 用于列出工作表下所有的保护范围。
             */
            list: async (
                payload?: {
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                protected_ranges?: Array<{
                                    protected_id?: string;
                                    description?: string;
                                    protected_dimension?:
                                        | "ROWS"
                                        | "COLUMNS"
                                        | "SHEET";
                                    protected_rows?: {
                                        sheet_id: string;
                                        start_index?: number;
                                        end_index?: number;
                                    };
                                    protected_columns?: {
                                        sheet_id: string;
                                        start_index?: number;
                                        end_index?: number;
                                    };
                                    protected_sheet?: { sheet_id: string };
                                    editors?: {
                                        users?: Array<string>;
                                        departments?: Array<string>;
                                        chats?: Array<string>;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges`,
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
         * spreadsheet.sheet.protected_range.editor
         */
        spreadsheetSheetProtectedRangeEditor: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range.editor&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.protected_range.editor&version=v3 document }
             *
             * 删除保护范围协作者
             *
             * 该接口用户删除指定的协作者，但无法移除表格所有者、文档可管理角色的权限。所有ID数量总和不得超过10个。
             */
            patch: async (
                payload?: {
                    data?: {
                        users?: Array<string>;
                        departments?: Array<string>;
                        chats?: Array<string>;
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: {
                        spreadsheet_token: string;
                        sheet_id?: string;
                        protected_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges/:protected_id/editor`,
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
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range.editor&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=sheets&resource=spreadsheet.sheet.protected_range.editor&version=v3 document }
             *
             * 增加保护范围协作者
             *
             * 该接口用于增加保护范围协作者。增加的协作者必须为表格的协作者，且需要拥有表格的编辑权限。
             */
            update: async (
                payload?: {
                    data?: {
                        users?: Array<string>;
                        departments?: Array<string>;
                        chats?: Array<string>;
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: {
                        spreadsheet_token: string;
                        sheet_id?: string;
                        protected_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges/:protected_id/editor`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=append_dimension&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=append_dimension&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 增加行列
                 *
                 * 该接口用于在工作表末尾增加行列
                 */
                appendDimension: async (
                    payload?: {
                        data: {
                            major_dimension: "ROWS" | "COLUMNS";
                            length: number;
                            inherit_from_before?: boolean;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/append_dimension`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=delete_dimension&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_dimension&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 删除行列
                 *
                 * 该接口用于删除行列
                 */
                deleteDimension: async (
                    payload?: {
                        data?: {
                            major_dimension?: string;
                            start_index?: number;
                            end_index?: number;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/delete_dimension`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=insert_dimension&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=insert_dimension&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 插入行列
                 *
                 * 该接口用于插入行列
                 */
                insertDimension: async (
                    payload?: {
                        data?: {
                            dimension_range?: {
                                major_dimension?: string;
                                start_index?: number;
                                end_index?: number;
                            };
                            inherit_from?: "Before" | "After";
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/insert_dimension`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=update_dimension&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_dimension&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 更新行列属性
                 *
                 * 该接口用于更新行列大小与可见性
                 */
                updateDimension: async (
                    payload?: {
                        data: {
                            dimension_range: {
                                major_dimension?: string;
                                start_index?: number;
                                end_index?: number;
                            };
                            properties: {
                                hidden?: boolean;
                                pixel_size?: number;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/update_dimension`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=merge_cells&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=merge_cells&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 合并单元格
                 *
                 * 合并电子表格工作表中的单元格。
                 *
                 * ## 使用限制;;合并的单元格数量不得超过 5,000 个。
                 */
                mergeCells: async (
                    payload?: {
                        data?: {
                            merge_cells?: Array<{
                                range: {
                                    start_row_index?: number;
                                    end_row_index?: number;
                                    start_column_index?: number;
                                    end_column_index?: number;
                                };
                                merge_type?:
                                    | "MergeAll"
                                    | "MergeRows"
                                    | "MergeColumns";
                            }>;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/merge_cells`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 删除工作表
                 *
                 * 该接口用户删除工作表
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=unmerge_cells&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unmerge_cells&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 拆分单元格
                 *
                 * 该接口用于拆分单元格，请求参数中的范围需要与合并单元格大小完全一致。
                 */
                unmergeCells: async (
                    payload?: {
                        data?: {
                            unmerge_cells?: Array<{
                                start_row_index?: number;
                                end_row_index?: number;
                                start_column_index?: number;
                                end_column_index?: number;
                            }>;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/unmerge_cells`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 修改工作表属性
                 *
                 * 修改工作表位置、表名等。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            title?: string;
                            index?: number;
                            hidden?: boolean;
                            resource_type?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=update_grid_properties&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_grid_properties&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 冻结行列
                 *
                 * 该接口用于更新工作表冻结行列信息
                 */
                updateGridProperties: async (
                    payload?: {
                        data?: {
                            frozen_row_count?: number;
                            frozen_column_count?: number;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/update_grid_properties`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 创建工作表
                 *
                 * 给指定电子表格创建工作表。
                 */
                create: async (
                    payload?: {
                        data?: { title?: string; index?: number };
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=copy&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=copy&project=sheets&resource=spreadsheet.sheet&version=v3 document }
                 *
                 * 复制工作表
                 *
                 * 该接口用于在独立表格中复制工作表
                 */
                copy: async (
                    payload?: {
                        data?: { title?: string; index?: number };
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/copy`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
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
             * spreadsheet.sheet.value
             */
            spreadsheetSheetValue: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=batch_clear&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_clear&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
                 *
                 * 清除单元格内容
                 *
                 * 清除单元格内容，同时会保留单元格原有的样式。传入的 range 数量不得超过 10 个。
                 */
                batchClear: async (
                    payload?: {
                        data?: { ranges?: Array<string> };
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/batch_clear`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=append&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=append&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
                 *
                 * 追加数据
                 *
                 * 在电子表格工作表的指定范围中，在空白位置中追加数据。例如，若指定范围参数 range 为 6e5ed3!A1:B2，该接口将从 A1 开始往下查找，即依次寻找 A1、A2、A3...单元格，在找到的第一个空白位置中写入数据。
                 *
                 * ## 使用限制;- 单次写入不超过 5,000 个单元格;- 每个单元格不可超过 50,000 字符，由于服务端会增加控制字符，因此推荐每个单元格不超过 40,000 字符;- 单次写入 Reminder 数量不超过 100 个;- 单次写入 Reminder 提醒人员数量不超过 1,000 个;- 单次写入提及文档数量不超过 10 个;- 单次写入图片数量不超过 50 个
                 */
                append: async (
                    payload?: {
                        data?: {
                            values?: Array<
                                Array<
                                    Array<{
                                        type?: string;
                                        text?: {
                                            text?: string;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                        };
                                        mention_user?: {
                                            name?: string;
                                            user_id?: string;
                                            notify?: boolean;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                        };
                                        mention_document?: {
                                            title?: string;
                                            object_type?: string;
                                            token?: string;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                            link?: string;
                                        };
                                        value?: { value?: string };
                                        date_time?: { date_time?: string };
                                        file?: {
                                            file_token?: string;
                                            name?: string;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                        };
                                        image?: { image_token?: string };
                                        link?: {
                                            text?: string;
                                            link?: string;
                                            segment_styles?: Array<{
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            }>;
                                        };
                                        reminder?: {
                                            notify_date_time?: string;
                                            notify_user_id?: Array<string>;
                                            notify_text?: string;
                                            notify_strategy?:
                                                | "0"
                                                | "1"
                                                | "2"
                                                | "3"
                                                | "4"
                                                | "5"
                                                | "6"
                                                | "7"
                                                | "8";
                                        };
                                        formula?: {
                                            formula?: string;
                                            formula_value?: string;
                                            affected_range?: string;
                                        };
                                    }>
                                >
                            >;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            range?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/:range/append`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=insert&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=insert&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
                 *
                 * 插入数据
                 *
                 * 在电子表格**特定工作表指定范围**的开始位置上方增加若干行，并在该范围中填充数据。
                 */
                insert: async (
                    payload?: {
                        data?: {
                            values?: Array<
                                Array<
                                    Array<{
                                        type?: string;
                                        text?: {
                                            text?: string;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                        };
                                        mention_user?: {
                                            name?: string;
                                            user_id?: string;
                                            notify?: boolean;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                        };
                                        mention_document?: {
                                            title?: string;
                                            object_type?: string;
                                            token?: string;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                            link?: string;
                                        };
                                        value?: { value?: string };
                                        date_time?: { date_time?: string };
                                        file?: {
                                            file_token?: string;
                                            name?: string;
                                            segment_style?: {
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            };
                                        };
                                        image?: { image_token?: string };
                                        link?: {
                                            text?: string;
                                            link?: string;
                                            segment_styles?: Array<{
                                                affected_text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strike_through?: boolean;
                                                    underline?: boolean;
                                                    fore_color?: string;
                                                    font_size?: number;
                                                };
                                            }>;
                                        };
                                        reminder?: {
                                            notify_date_time?: string;
                                            notify_user_id?: Array<string>;
                                            notify_text?: string;
                                            notify_strategy?:
                                                | "0"
                                                | "1"
                                                | "2"
                                                | "3"
                                                | "4"
                                                | "5"
                                                | "6"
                                                | "7"
                                                | "8";
                                        };
                                        formula?: {
                                            formula?: string;
                                            formula_value?: string;
                                            affected_range?: string;
                                        };
                                    }>
                                >
                            >;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            range?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/:range/insert`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=batch_update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
                 *
                 * 写入单元格
                 *
                 * 将数据写入到指定区域。当写入范围超出表格现有范围时，将自动扩增行列，扩增的行列将会继承上一行/列的样式。
                 *
                 * ## 使用限制;- 单次请求的区域数量不可超过 10 个;- 单次写入的单元格不可超过 5,000 个;- 每个单元格不可超过 50,000 字符，由于服务端会增加控制字符，因此推荐每个单元格不超过 40,000 字符;- 单次写入 Reminder 数量不超过 100 个;- 单次写入 Reminder 提醒人员数量不超过 1,000 个;- 单次写入提及文档数量不超过 10 个;- 单次写入图片数量不超过 50 个
                 */
                batchUpdate: async (
                    payload?: {
                        data?: {
                            value_ranges?: Array<{
                                range?: string;
                                values?: Array<
                                    Array<
                                        Array<{
                                            type?: string;
                                            text?: {
                                                text?: string;
                                                segment_style?: {
                                                    affected_text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strike_through?: boolean;
                                                        underline?: boolean;
                                                        fore_color?: string;
                                                        font_size?: number;
                                                    };
                                                };
                                            };
                                            mention_user?: {
                                                name?: string;
                                                user_id?: string;
                                                notify?: boolean;
                                                segment_style?: {
                                                    affected_text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strike_through?: boolean;
                                                        underline?: boolean;
                                                        fore_color?: string;
                                                        font_size?: number;
                                                    };
                                                };
                                            };
                                            mention_document?: {
                                                title?: string;
                                                object_type?: string;
                                                token?: string;
                                                segment_style?: {
                                                    affected_text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strike_through?: boolean;
                                                        underline?: boolean;
                                                        fore_color?: string;
                                                        font_size?: number;
                                                    };
                                                };
                                                link?: string;
                                            };
                                            value?: { value?: string };
                                            date_time?: { date_time?: string };
                                            file?: {
                                                file_token?: string;
                                                name?: string;
                                                segment_style?: {
                                                    affected_text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strike_through?: boolean;
                                                        underline?: boolean;
                                                        fore_color?: string;
                                                        font_size?: number;
                                                    };
                                                };
                                            };
                                            image?: { image_token?: string };
                                            link?: {
                                                text?: string;
                                                link?: string;
                                                segment_styles?: Array<{
                                                    affected_text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strike_through?: boolean;
                                                        underline?: boolean;
                                                        fore_color?: string;
                                                        font_size?: number;
                                                    };
                                                }>;
                                            };
                                            reminder?: {
                                                notify_date_time?: string;
                                                notify_user_id?: Array<string>;
                                                notify_text?: string;
                                                notify_strategy?:
                                                    | "0"
                                                    | "1"
                                                    | "2"
                                                    | "3"
                                                    | "4"
                                                    | "5"
                                                    | "6"
                                                    | "7"
                                                    | "8";
                                            };
                                            formula?: {
                                                formula?: string;
                                                formula_value?: string;
                                                affected_range?: string;
                                            };
                                        }>
                                    >
                                >;
                            }>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/batch_update`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=batch_get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
                 *
                 * 获取电子表格富文本内容
                 *
                 * 获取电子表格的富文本内容。
                 */
                batchGet: async (
                    payload?: {
                        data?: { ranges?: Array<string> };
                        params?: {
                            datetime_render_option?:
                                | "formatted_string"
                                | "serial_number";
                            value_render_option?:
                                | "formatted_value"
                                | "unformatted_value";
                            user_id_type?: "open_id" | "union_id" | "user_id";
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
                                    value_ranges?: Array<{
                                        range?: string;
                                        values?: Array<
                                            Array<
                                                Array<{
                                                    type?: string;
                                                    text?: {
                                                        text?: string;
                                                        segment_style?: {
                                                            affected_text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                italic?: boolean;
                                                                strike_through?: boolean;
                                                                underline?: boolean;
                                                                fore_color?: string;
                                                                font_size?: number;
                                                            };
                                                        };
                                                    };
                                                    mention_user?: {
                                                        name?: string;
                                                        user_id?: string;
                                                        notify?: boolean;
                                                        segment_style?: {
                                                            affected_text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                italic?: boolean;
                                                                strike_through?: boolean;
                                                                underline?: boolean;
                                                                fore_color?: string;
                                                                font_size?: number;
                                                            };
                                                        };
                                                    };
                                                    mention_document?: {
                                                        title?: string;
                                                        object_type?: string;
                                                        token?: string;
                                                        segment_style?: {
                                                            affected_text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                italic?: boolean;
                                                                strike_through?: boolean;
                                                                underline?: boolean;
                                                                fore_color?: string;
                                                                font_size?: number;
                                                            };
                                                        };
                                                        link?: string;
                                                    };
                                                    value?: { value?: string };
                                                    date_time?: {
                                                        date_time?: string;
                                                    };
                                                    file?: {
                                                        file_token?: string;
                                                        name?: string;
                                                        segment_style?: {
                                                            affected_text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                italic?: boolean;
                                                                strike_through?: boolean;
                                                                underline?: boolean;
                                                                fore_color?: string;
                                                                font_size?: number;
                                                            };
                                                        };
                                                    };
                                                    image?: {
                                                        image_token?: string;
                                                    };
                                                    link?: {
                                                        text?: string;
                                                        link?: string;
                                                        segment_styles?: Array<{
                                                            affected_text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                italic?: boolean;
                                                                strike_through?: boolean;
                                                                underline?: boolean;
                                                                fore_color?: string;
                                                                font_size?: number;
                                                            };
                                                        }>;
                                                    };
                                                    reminder?: {
                                                        notify_date_time?: string;
                                                        notify_user_id?: Array<string>;
                                                        notify_text?: string;
                                                        notify_strategy?:
                                                            | "0"
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "5"
                                                            | "6"
                                                            | "7"
                                                            | "8";
                                                    };
                                                    formula?: {
                                                        formula?: string;
                                                        formula_value?: string;
                                                        affected_range?: string;
                                                    };
                                                }>
                                            >
                                        >;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/batch_get`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.value&apiName=batch_get_plain&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get_plain&project=sheets&resource=spreadsheet.sheet.value&version=v3 document }
                 *
                 * 获取电子表格纯文本内容
                 *
                 * 获取工作表的纯文本内容。
                 */
                batchGetPlain: async (
                    payload?: {
                        data?: { ranges?: Array<string> };
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
                                    value_ranges?: Array<{
                                        range?: string;
                                        values?: Array<Array<string>>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/values/batch_get_plain`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
            /**
             * spreadsheet.sheet.conditional_format
             */
            spreadsheetSheetConditionalFormat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.conditional_format&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=sheets&resource=spreadsheet.sheet.conditional_format&version=v3 document }
                 */
                list: async (
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
                                    conditional_formats?: Array<{
                                        conditional_format_id?: string;
                                        conditional_format_rule: {
                                            boolean_rule?: {
                                                type?:
                                                    | "CellEqual"
                                                    | "CellNotEqual"
                                                    | "CellGreaterThan"
                                                    | "CellGreaterThanOrEqual"
                                                    | "CellLessThen"
                                                    | "CellLessThanOrEqual"
                                                    | "CellBetween"
                                                    | "CellNotBetween"
                                                    | "TextBeginsWith"
                                                    | "TextEndsWith"
                                                    | "TextContains"
                                                    | "TextNotContains"
                                                    | "TextIs"
                                                    | "DateBefore"
                                                    | "DateIs"
                                                    | "DateAfter"
                                                    | "Top"
                                                    | "Bottom"
                                                    | "AboveAverage"
                                                    | "BelowAverage"
                                                    | "CustomFormula";
                                                boolean_conditional_values?: Array<{
                                                    type:
                                                        | "Number"
                                                        | "Text"
                                                        | "TimePeriod"
                                                        | "Percentage";
                                                    number?: string;
                                                    text?: string;
                                                    time_period?:
                                                        | "Today"
                                                        | "Yesterday"
                                                        | "Tomorrow"
                                                        | "LastSeventDays";
                                                }>;
                                            };
                                            type: "BooleanRuleCondition";
                                        };
                                        index?: number;
                                        ranges: {
                                            sheet_id: string;
                                            start_row_index?: number;
                                            end_row_index?: number;
                                            start_column_index?: number;
                                            end_column_index?: number;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/conditional_formats`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.conditional_format&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.conditional_format&version=v3 document }
                 */
                patch: async (
                    payload?: {
                        data?: {
                            ranges?: Array<{
                                sheet_id: string;
                                start_row_index?: number;
                                end_row_index?: number;
                                start_column_index?: number;
                                end_column_index?: number;
                            }>;
                            conditional_format_rule?: {
                                boolean_rule?: {
                                    type?:
                                        | "CellEqual"
                                        | "CellNotEqual"
                                        | "CellGreaterThan"
                                        | "CellGreaterThanOrEqual"
                                        | "CellLessThen"
                                        | "CellLessThanOrEqual"
                                        | "CellBetween"
                                        | "CellNotBetween"
                                        | "TextBeginsWith"
                                        | "TextEndsWith"
                                        | "TextContains"
                                        | "TextNotContains"
                                        | "TextIs"
                                        | "DateBefore"
                                        | "DateIs"
                                        | "DateAfter"
                                        | "Top"
                                        | "Bottom"
                                        | "AboveAverage"
                                        | "BelowAverage"
                                        | "CustomFormula";
                                    boolean_conditional_values?: Array<{
                                        type:
                                            | "Number"
                                            | "Text"
                                            | "TimePeriod"
                                            | "Percentage";
                                        number?: string;
                                        text?: string;
                                        time_period?:
                                            | "Today"
                                            | "Yesterday"
                                            | "Tomorrow"
                                            | "LastSeventDays";
                                    }>;
                                };
                                type: "BooleanRuleCondition";
                            };
                            index?: number;
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            conditional_format_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/conditional_formats/:conditional_format_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.conditional_format&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.conditional_format&version=v3 document }
                 */
                get: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            conditional_format_id?: string;
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
                                    conditional_format?: {
                                        conditional_format_id?: string;
                                        conditional_format_rule: {
                                            boolean_rule?: {
                                                type?:
                                                    | "CellEqual"
                                                    | "CellNotEqual"
                                                    | "CellGreaterThan"
                                                    | "CellGreaterThanOrEqual"
                                                    | "CellLessThen"
                                                    | "CellLessThanOrEqual"
                                                    | "CellBetween"
                                                    | "CellNotBetween"
                                                    | "TextBeginsWith"
                                                    | "TextEndsWith"
                                                    | "TextContains"
                                                    | "TextNotContains"
                                                    | "TextIs"
                                                    | "DateBefore"
                                                    | "DateIs"
                                                    | "DateAfter"
                                                    | "Top"
                                                    | "Bottom"
                                                    | "AboveAverage"
                                                    | "BelowAverage"
                                                    | "CustomFormula";
                                                boolean_conditional_values?: Array<{
                                                    type:
                                                        | "Number"
                                                        | "Text"
                                                        | "TimePeriod"
                                                        | "Percentage";
                                                    number?: string;
                                                    text?: string;
                                                    time_period?:
                                                        | "Today"
                                                        | "Yesterday"
                                                        | "Tomorrow"
                                                        | "LastSeventDays";
                                                }>;
                                            };
                                            type: "BooleanRuleCondition";
                                        };
                                        index?: number;
                                        ranges: {
                                            sheet_id: string;
                                            start_row_index?: number;
                                            end_row_index?: number;
                                            start_column_index?: number;
                                            end_column_index?: number;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/conditional_formats/:conditional_format_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.conditional_format&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.conditional_format&version=v3 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            conditional_format_rule: {
                                boolean_rule?: {
                                    type?:
                                        | "CellEqual"
                                        | "CellNotEqual"
                                        | "CellGreaterThan"
                                        | "CellGreaterThanOrEqual"
                                        | "CellLessThen"
                                        | "CellLessThanOrEqual"
                                        | "CellBetween"
                                        | "CellNotBetween"
                                        | "TextBeginsWith"
                                        | "TextEndsWith"
                                        | "TextContains"
                                        | "TextNotContains"
                                        | "TextIs"
                                        | "DateBefore"
                                        | "DateIs"
                                        | "DateAfter"
                                        | "Top"
                                        | "Bottom"
                                        | "AboveAverage"
                                        | "BelowAverage"
                                        | "CustomFormula";
                                    boolean_conditional_values?: Array<{
                                        type:
                                            | "Number"
                                            | "Text"
                                            | "TimePeriod"
                                            | "Percentage";
                                        number?: string;
                                        text?: string;
                                        time_period?:
                                            | "Today"
                                            | "Yesterday"
                                            | "Tomorrow"
                                            | "LastSeventDays";
                                    }>;
                                };
                                type: "BooleanRuleCondition";
                            };
                            index?: number;
                            ranges: {
                                sheet_id: string;
                                start_row_index?: number;
                                end_row_index?: number;
                                start_column_index?: number;
                                end_column_index?: number;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: { conditional_format_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/conditional_formats`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.conditional_format&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.conditional_format&version=v3 document }
                 */
                delete: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            conditional_format_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/conditional_formats/:conditional_format_id`,
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
             * spreadsheet.sheet.data_validation
             */
            spreadsheetSheetDataValidation: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.data_validation&apiName=batch_clear&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_clear&project=sheets&resource=spreadsheet.sheet.data_validation&version=v3 document }
                 */
                batchClear: async (
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/data_validations/batch_clear`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.data_validation&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.data_validation&version=v3 document }
                 */
                get: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            data_validation_id?: string;
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
                                    data_validation?: {
                                        data_validation_id?: number;
                                        data_validation_rule?: {
                                            type:
                                                | "SingleOption"
                                                | "MultipleOption"
                                                | "CheckBox"
                                                | "NumberDataValidation"
                                                | "DateDataValidation"
                                                | "TextDataValidation";
                                            single_option?: {
                                                type:
                                                    | "OneOfList"
                                                    | "OneOfRange";
                                                range?: string;
                                                data_validation_values?: Array<{
                                                    option_value: string;
                                                    option_color?: string;
                                                }>;
                                                properties?: {
                                                    show_dropdown_icon?: boolean;
                                                };
                                            };
                                            multiple_option?: {
                                                type:
                                                    | "MultipleOfList"
                                                    | "MultipleOfRange";
                                                range?: string;
                                                data_validation_values?: Array<{
                                                    option_value: string;
                                                    option_color?: string;
                                                }>;
                                                properties?: {
                                                    show_dropdown_icon?: boolean;
                                                };
                                            };
                                        };
                                        strict?: string;
                                        help_text?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/data_validations/:data_validation_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.data_validation&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.data_validation&version=v3 document }
                 */
                patch: async (
                    payload?: {
                        data: {
                            data_validation_rule: {
                                type:
                                    | "SingleOption"
                                    | "MultipleOption"
                                    | "CheckBox"
                                    | "NumberDataValidation"
                                    | "DateDataValidation"
                                    | "TextDataValidation";
                                single_option?: {
                                    type: "OneOfList" | "OneOfRange";
                                    range?: string;
                                    data_validation_values?: Array<{
                                        option_value: string;
                                        option_color?: string;
                                    }>;
                                    properties?: {
                                        show_dropdown_icon?: boolean;
                                    };
                                };
                                multiple_option?: {
                                    type: "MultipleOfList" | "MultipleOfRange";
                                    range?: string;
                                    data_validation_values?: Array<{
                                        option_value: string;
                                        option_color?: string;
                                    }>;
                                    properties?: {
                                        show_dropdown_icon?: boolean;
                                    };
                                };
                            };
                            strict?: boolean;
                            help_text?: string;
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            data_validation_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/data_validations/:data_validation_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.data_validation&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.data_validation&version=v3 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            data_validation_rule?: {
                                type:
                                    | "SingleOption"
                                    | "MultipleOption"
                                    | "CheckBox"
                                    | "NumberDataValidation"
                                    | "DateDataValidation"
                                    | "TextDataValidation";
                                single_option?: {
                                    type: "OneOfList" | "OneOfRange";
                                    range?: string;
                                    data_validation_values?: Array<{
                                        option_value: string;
                                        option_color?: string;
                                    }>;
                                    properties?: {
                                        show_dropdown_icon?: boolean;
                                    };
                                };
                                multiple_option?: {
                                    type: "MultipleOfList" | "MultipleOfRange";
                                    range?: string;
                                    data_validation_values?: Array<{
                                        option_value: string;
                                        option_color?: string;
                                    }>;
                                    properties?: {
                                        show_dropdown_icon?: boolean;
                                    };
                                };
                            };
                            strict?: string;
                            help_text?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/data_validations`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * spreadsheet.sheet.style
             */
            spreadsheetSheetStyle: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.style&apiName=batch_clear&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_clear&project=sheets&resource=spreadsheet.sheet.style&version=v3 document }
                 */
                batchClear: async (
                    payload?: {
                        data: { ranges: Array<string> };
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/styles/batch_clear`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.style&apiName=batch_update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=sheets&resource=spreadsheet.sheet.style&version=v3 document }
                 */
                batchUpdate: async (
                    payload?: {
                        data?: {
                            style_ranges?: Array<{
                                range?: string;
                                styles?: Array<
                                    Array<{
                                        font_style?: {
                                            bold?: boolean;
                                            italic?: boolean;
                                            strikethrough?: boolean;
                                            underline?: boolean;
                                            foreground_color?: string;
                                            background_color?: string;
                                        };
                                        border_style?: {
                                            top?: {
                                                style?: "Solid" | "None";
                                                color?: string;
                                            };
                                            left?: {
                                                style?: "Solid" | "None";
                                                color?: string;
                                            };
                                            right?: {
                                                style?: "Solid" | "None";
                                                color?: string;
                                            };
                                            bottom?: {
                                                style?: "Solid" | "None";
                                                color?: string;
                                            };
                                        };
                                        alignment_style?: {
                                            horizontal_alignment?:
                                                | "Left"
                                                | "Center"
                                                | "Right";
                                            vertical_alignment?:
                                                | "Top"
                                                | "Middle"
                                                | "Bottom";
                                        };
                                        wrap_strategy?:
                                            | "Overflow"
                                            | "Clip"
                                            | "Wrap";
                                        format?: string;
                                    }>
                                >;
                            }>;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/styles/batch_update`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * spreadsheet.sheet.protected_range
             */
            spreadsheetSheetProtectedRange: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=sheets&resource=spreadsheet.sheet.protected_range&version=v3 document }
                 *
                 * 删除保护范围
                 *
                 * 该接口用于删除工作表下指定保护范围。
                 */
                delete: async (
                    payload?: {
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            protected_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges/:protected_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.protected_range&version=v3 document }
                 *
                 * 修改保护范围
                 *
                 * 该接口用于修改保护范围、保护信息等。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            description?: string;
                            protected_rows?: {
                                sheet_id: string;
                                start_index?: number;
                                end_index?: number;
                            };
                            protected_columns?: {
                                sheet_id: string;
                                start_index?: number;
                                end_index?: number;
                            };
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            protected_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges/:protected_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=sheets&resource=spreadsheet.sheet.protected_range&version=v3 document }
                 *
                 * 创建保护范围
                 *
                 * 该接口用于创建保护范围，可以创建保护行，保护列或者保护工作表。
                 */
                create: async (
                    payload?: {
                        data?: {
                            description?: string;
                            protected_dimension?: "ROWS" | "COLUMNS" | "SHEET";
                            protected_rows?: {
                                sheet_id: string;
                                start_index?: number;
                                end_index?: number;
                            };
                            protected_columns?: {
                                sheet_id: string;
                                start_index?: number;
                                end_index?: number;
                            };
                            protected_sheet?: { sheet_id: string };
                            editors?: {
                                users?: Array<string>;
                                departments?: Array<string>;
                                chats?: Array<string>;
                            };
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                data?: { protected_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=sheets&resource=spreadsheet.sheet.protected_range&version=v3 document }
                 *
                 * 获取保护范围
                 *
                 * 该接口的作用是获取指定工作表的保护范围信息，包括保护范围的 ID、描述、维度、行、列、工作表和可编辑者等信息。
                 */
                get: async (
                    payload?: {
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: {
                            spreadsheet_token?: string;
                            sheet_id?: string;
                            protected_id?: string;
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
                                    protected_range?: {
                                        protected_id?: string;
                                        description?: string;
                                        protected_dimension?:
                                            | "ROWS"
                                            | "COLUMNS"
                                            | "SHEET";
                                        protected_rows?: {
                                            sheet_id: string;
                                            start_index?: number;
                                            end_index?: number;
                                        };
                                        protected_columns?: {
                                            sheet_id: string;
                                            start_index?: number;
                                            end_index?: number;
                                        };
                                        protected_sheet?: { sheet_id: string };
                                        editors?: {
                                            users?: Array<string>;
                                            departments?: Array<string>;
                                            chats?: Array<string>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges/:protected_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=sheets&resource=spreadsheet.sheet.protected_range&version=v3 document }
                 *
                 * 列出保护范围
                 *
                 * 用于列出工作表下所有的保护范围。
                 */
                list: async (
                    payload?: {
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    protected_ranges?: Array<{
                                        protected_id?: string;
                                        description?: string;
                                        protected_dimension?:
                                            | "ROWS"
                                            | "COLUMNS"
                                            | "SHEET";
                                        protected_rows?: {
                                            sheet_id: string;
                                            start_index?: number;
                                            end_index?: number;
                                        };
                                        protected_columns?: {
                                            sheet_id: string;
                                            start_index?: number;
                                            end_index?: number;
                                        };
                                        protected_sheet?: { sheet_id: string };
                                        editors?: {
                                            users?: Array<string>;
                                            departments?: Array<string>;
                                            chats?: Array<string>;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges`,
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
             * spreadsheet.sheet.protected_range.editor
             */
            spreadsheetSheetProtectedRangeEditor: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range.editor&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=sheets&resource=spreadsheet.sheet.protected_range.editor&version=v3 document }
                 *
                 * 删除保护范围协作者
                 *
                 * 该接口用户删除指定的协作者，但无法移除表格所有者、文档可管理角色的权限。所有ID数量总和不得超过10个。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            users?: Array<string>;
                            departments?: Array<string>;
                            chats?: Array<string>;
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            spreadsheet_token: string;
                            sheet_id?: string;
                            protected_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges/:protected_id/editor`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.protected_range.editor&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=sheets&resource=spreadsheet.sheet.protected_range.editor&version=v3 document }
                 *
                 * 增加保护范围协作者
                 *
                 * 该接口用于增加保护范围协作者。增加的协作者必须为表格的协作者，且需要拥有表格的编辑权限。
                 */
                update: async (
                    payload?: {
                        data?: {
                            users?: Array<string>;
                            departments?: Array<string>;
                            chats?: Array<string>;
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            spreadsheet_token: string;
                            sheet_id?: string;
                            protected_id?: string;
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
                                `${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/protected_ranges/:protected_id/editor`,
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
    };
}
