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
import security_and_compliance from "./security_and_compliance";

// auto gen
export default abstract class Client extends security_and_compliance {
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
     * 云文档-电子表格
     */
    sheets = {
        /**
         * 表格
         */
        spreadsheet: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/create document }
             *
             * 创建表格
             *
             * 在指定目录下创建表格
             */
            create: async (
                payload?: {
                    data?: { title?: string; folder_token?: string };
                },
                options?: IRequestOptions
            ) => {
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/get document }
             *
             * 获取电子表格信息
             *
             * 该接口用于获取电子表格的基础信息。
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/patch document }
             *
             * 修改电子表格属性
             *
             * 该接口用于修改电子表格的属性
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 筛选
         */
        spreadsheetSheetFilter: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/create document }
             *
             * 创建筛选
             *
             * 在子表内创建筛选。
             *
             * 参数值可参考[筛选指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/filter-user-guide)
             */
            create: async (
                payload?: {
                    data: {
                        range: string;
                        col: string;
                        condition: {
                            filter_type: string;
                            compare_type?: string;
                            expected: Array<string>;
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/delete document }
             *
             * 删除筛选
             *
             * 删除子表的筛选
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/get document }
             *
             * 获取筛选
             *
             * 获取子表的详细筛选信息
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
                                            expected: Array<string>;
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/update document }
             *
             * 更新筛选
             *
             * 更新子表筛选范围中的列筛选条件。
             *
             * 参数值可参考[筛选指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/filter-user-guide)
             */
            update: async (
                payload?: {
                    data: {
                        col: string;
                        condition: {
                            filter_type: string;
                            compare_type?: string;
                            expected: Array<string>;
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 筛选条件
         */
        spreadsheetSheetFilterViewCondition: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/create document }
             *
             * 创建筛选条件
             *
             * 在筛选视图的筛选范围的某一列创建筛选条件。
             *
             * 筛选条件参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/delete document }
             *
             * 删除筛选条件
             *
             * 删除筛选视图的筛选范围某一列的筛选条件。
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/get document }
             *
             * 获取筛选条件
             *
             * 获取筛选视图某列的筛选条件信息。
             *
             * 筛选条件含义参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=query&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/query document }
             *
             * 查询筛选条件
             *
             * 查询一个筛选视图的所有筛选条件，返回筛选视图的筛选范围内的筛选条件。
             *
             * 筛选条件含义可参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/update document }
             *
             * 更新筛选条件
             *
             * 更新筛选视图范围的某列的筛选条件，condition id 即为列的字母号。
             *
             * 筛选条件参数可参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 筛选视图
         */
        spreadsheetSheetFilterView: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/create document }
             *
             * 创建筛选视图
             *
             * 根据传入的参数创建一个筛选视图。Id 和 名字可选，不填的话会默认生成；range 必填。Id 长度为10，由 0-9、a-z、A-Z 组合生成。名字长度不超过100。单个子表内的筛选视图个数不超过 150。
             *
             * 筛选范围的设置参考：[筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/delete document }
             *
             * 删除筛选视图
             *
             * 删除指定 id 对应的筛选视图。
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/get document }
             *
             * 获取筛选视图
             *
             * 获取指定筛选视图 id 的名字和筛选范围。
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/patch document }
             *
             * 更新筛选视图
             *
             * 更新筛选视图的名字或者筛选范围。名字长度不超过100，不能重复即子表内唯一；筛选范围不超过子表的最大范围。
             *
             * 筛选范围的设置参考：[筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=query&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/query document }
             *
             * 查询筛选视图
             *
             * 查询子表内所有的筛选视图基本信息，包括 id、name 和 range
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 单元格
         */
        spreadsheetSheet: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=find&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/find document }
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/get document }
             *
             * 查询工作表
             *
             * 该接口用于通过工作表ID查询工作表属性信息。
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=move_dimension&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/move_dimension document }
             *
             * 移动行列
             *
             * 该接口用于移动行列，行列被移动到目标位置后，原本在目标位置的行列会对应右移或下移。
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=query&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/query document }
             *
             * 获取工作表
             *
             * 该接口用于获取电子表格下所有工作表及其属性。
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=replace&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/replace document }
             *
             * 替换单元格
             *
             * 按照指定的条件查找子表的某个范围内的数据符合条件的单元格并替换值，返回替换成功的单元格位置。一次请求最多允许替换5000个单元格，如果超过请将range缩小范围再操作。请求体中的 range、find、replaccement 字段必填。
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 浮动图片
         */
        spreadsheetSheetFloatImage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/create document }
             *
             * 创建浮动图片
             *
             * 根据传入的参数创建一张浮动图片。Float_image_token （[上传图片至表格后得到](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all)）和range（只支持一个单元格） 必填。Float_image_id 可选，不填的话会默认生成，长度为10，由 0-9、a-z、A-Z 组合生成。表格内不重复的图片（浮动图片+单元格图片）总数不超过4000。width 和 height 为图片展示的宽高，可选，不填的话会使用图片的真实宽高。offset_x 和 offset_y 为图片左上角距离所在单元格左上角的偏移，可选，默认为 0。
             *
             * 浮动图片的设置参考：[浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/delete document }
             *
             * 删除浮动图片
             *
             * 删除 float_image_id 对应的浮动图片。
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/get document }
             *
             * 获取浮动图片
             *
             * 根据 float_image_id 获取对应浮动图片的信息。
             *
             * 浮动图片参考：[浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/patch document }
             *
             * 更新浮动图片
             *
             * 更新已有的浮动图片位置和宽高，包括 range、width、height、offset_x 和 offset_y，不包括 float_image_id 和 float_image_token。
             *
             * 浮动图片更新参考：[浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=query&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/query document }
             *
             * 查询浮动图片
             *
             * 返回子表内所有的浮动图片信息。
             *
             * 浮动图片参考：[浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        v3: {
            /**
             * 表格
             */
            spreadsheet: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/create document }
                 *
                 * 创建表格
                 *
                 * 在指定目录下创建表格
                 */
                create: async (
                    payload?: {
                        data?: { title?: string; folder_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/get document }
                 *
                 * 获取电子表格信息
                 *
                 * 该接口用于获取电子表格的基础信息。
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/patch document }
                 *
                 * 修改电子表格属性
                 *
                 * 该接口用于修改电子表格的属性
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 筛选
             */
            spreadsheetSheetFilter: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/create document }
                 *
                 * 创建筛选
                 *
                 * 在子表内创建筛选。
                 *
                 * 参数值可参考[筛选指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/filter-user-guide)
                 */
                create: async (
                    payload?: {
                        data: {
                            range: string;
                            col: string;
                            condition: {
                                filter_type: string;
                                compare_type?: string;
                                expected: Array<string>;
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/delete document }
                 *
                 * 删除筛选
                 *
                 * 删除子表的筛选
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/get document }
                 *
                 * 获取筛选
                 *
                 * 获取子表的详细筛选信息
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
                                                expected: Array<string>;
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/update document }
                 *
                 * 更新筛选
                 *
                 * 更新子表筛选范围中的列筛选条件。
                 *
                 * 参数值可参考[筛选指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/filter-user-guide)
                 */
                update: async (
                    payload?: {
                        data: {
                            col: string;
                            condition: {
                                filter_type: string;
                                compare_type?: string;
                                expected: Array<string>;
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 筛选条件
             */
            spreadsheetSheetFilterViewCondition: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/create document }
                 *
                 * 创建筛选条件
                 *
                 * 在筛选视图的筛选范围的某一列创建筛选条件。
                 *
                 * 筛选条件参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/delete document }
                 *
                 * 删除筛选条件
                 *
                 * 删除筛选视图的筛选范围某一列的筛选条件。
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/get document }
                 *
                 * 获取筛选条件
                 *
                 * 获取筛选视图某列的筛选条件信息。
                 *
                 * 筛选条件含义参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=query&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/query document }
                 *
                 * 查询筛选条件
                 *
                 * 查询一个筛选视图的所有筛选条件，返回筛选视图的筛选范围内的筛选条件。
                 *
                 * 筛选条件含义可参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/update document }
                 *
                 * 更新筛选条件
                 *
                 * 更新筛选视图范围的某列的筛选条件，condition id 即为列的字母号。
                 *
                 * 筛选条件参数可参考 [筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 筛选视图
             */
            spreadsheetSheetFilterView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/create document }
                 *
                 * 创建筛选视图
                 *
                 * 根据传入的参数创建一个筛选视图。Id 和 名字可选，不填的话会默认生成；range 必填。Id 长度为10，由 0-9、a-z、A-Z 组合生成。名字长度不超过100。单个子表内的筛选视图个数不超过 150。
                 *
                 * 筛选范围的设置参考：[筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/delete document }
                 *
                 * 删除筛选视图
                 *
                 * 删除指定 id 对应的筛选视图。
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/get document }
                 *
                 * 获取筛选视图
                 *
                 * 获取指定筛选视图 id 的名字和筛选范围。
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/patch document }
                 *
                 * 更新筛选视图
                 *
                 * 更新筛选视图的名字或者筛选范围。名字长度不超过100，不能重复即子表内唯一；筛选范围不超过子表的最大范围。
                 *
                 * 筛选范围的设置参考：[筛选视图的筛选条件指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/filter-view-condition-user-guide)
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=query&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/query document }
                 *
                 * 查询筛选视图
                 *
                 * 查询子表内所有的筛选视图基本信息，包括 id、name 和 range
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 单元格
             */
            spreadsheetSheet: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=find&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/find document }
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/get document }
                 *
                 * 查询工作表
                 *
                 * 该接口用于通过工作表ID查询工作表属性信息。
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=move_dimension&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/move_dimension document }
                 *
                 * 移动行列
                 *
                 * 该接口用于移动行列，行列被移动到目标位置后，原本在目标位置的行列会对应右移或下移。
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=query&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/query document }
                 *
                 * 获取工作表
                 *
                 * 该接口用于获取电子表格下所有工作表及其属性。
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=replace&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/replace document }
                 *
                 * 替换单元格
                 *
                 * 按照指定的条件查找子表的某个范围内的数据符合条件的单元格并替换值，返回替换成功的单元格位置。一次请求最多允许替换5000个单元格，如果超过请将range缩小范围再操作。请求体中的 range、find、replaccement 字段必填。
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 浮动图片
             */
            spreadsheetSheetFloatImage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/create document }
                 *
                 * 创建浮动图片
                 *
                 * 根据传入的参数创建一张浮动图片。Float_image_token （[上传图片至表格后得到](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all)）和range（只支持一个单元格） 必填。Float_image_id 可选，不填的话会默认生成，长度为10，由 0-9、a-z、A-Z 组合生成。表格内不重复的图片（浮动图片+单元格图片）总数不超过4000。width 和 height 为图片展示的宽高，可选，不填的话会使用图片的真实宽高。offset_x 和 offset_y 为图片左上角距离所在单元格左上角的偏移，可选，默认为 0。
                 *
                 * 浮动图片的设置参考：[浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/delete document }
                 *
                 * 删除浮动图片
                 *
                 * 删除 float_image_id 对应的浮动图片。
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/get document }
                 *
                 * 获取浮动图片
                 *
                 * 根据 float_image_id 获取对应浮动图片的信息。
                 *
                 * 浮动图片参考：[浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/patch document }
                 *
                 * 更新浮动图片
                 *
                 * 更新已有的浮动图片位置和宽高，包括 range、width、height、offset_x 和 offset_y，不包括 float_image_id 和 float_image_token。
                 *
                 * 浮动图片更新参考：[浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=query&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/query document }
                 *
                 * 查询浮动图片
                 *
                 * 返回子表内所有的浮动图片信息。
                 *
                 * 浮动图片参考：[浮动图片指南](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/float-image-user-guide)
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
