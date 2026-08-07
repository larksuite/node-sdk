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
import security_plugin from "./security_plugin";

// auto gen
export default abstract class Client extends security_plugin {
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
    sheet_ai = {
        v1: {
            /**
             * quick_action
             */
            quickAction: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheet_ai&resource=quick_action&apiName=translate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=translate&project=sheet_ai&resource=quick_action&version=v1 document }
                 */
                translate: async (
                    payload?: {
                        data?: { text?: string; target_language?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { text?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheet_ai/v1/quick_action/translate`,
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
             * sheet
             */
            sheet: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheet_ai&resource=sheet&apiName=formula_assistant&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=formula_assistant&project=sheet_ai&resource=sheet&version=v1 document }
                 */
                formulaAssistant: async (
                    payload?: {
                        data?: {
                            question?: string;
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                extra?: {
                                    token?: string;
                                    lang?: string;
                                    header_data?: string;
                                    sheet_id?: string;
                                };
                                tool_raw_instruction?: string;
                                work_mode?: number;
                                object?: { type?: string; biz_id?: string };
                                scenario?: string;
                            };
                        };
                        params?: { source?: number };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { hint?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheet_ai/v1/sheet/formula_assistant`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheet_ai&resource=sheet&apiName=generate_action&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=generate_action&project=sheet_ai&resource=sheet&version=v1 document }
                 */
                generateAction: async (
                    payload?: {
                        data: {
                            question: string;
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                extra?: {
                                    token: string;
                                    lang?: string;
                                    header_data?: string;
                                };
                                work_mode?: number;
                                scenario?: string;
                            };
                        };
                        params?: { action_type?: string; source?: number };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        body?: string;
                                        type?: string;
                                        interactable?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheet_ai/v1/sheet/generate_action`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheet_ai&resource=sheet&apiName=data_insight&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=data_insight&project=sheet_ai&resource=sheet&version=v1 document }
                 */
                dataInsight: async (
                    payload?: {
                        data?: {
                            question?: string;
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                extra?: {
                                    token?: string;
                                    lang?: string;
                                    data?: string;
                                    ranges?: string;
                                    updated?: string;
                                    model_key?: string;
                                    mode?: string;
                                    unique_task_id?: string;
                                };
                                system_info?: {
                                    lang?: string;
                                    session_id?: string;
                                    app_version?: string;
                                };
                                tool_raw_instruction?: string;
                                work_mode?: number;
                                object?: { type?: string; biz_id?: string };
                                upload_objects?: Array<{
                                    type?: string;
                                    biz_id?: string;
                                }>;
                                scenario?: string;
                            };
                        };
                        params?: { source?: number };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        body?: string;
                                        type?: string;
                                        interactable?: boolean;
                                        callback_url?: string;
                                        callback_info?: string;
                                    };
                                    presents?: Array<{
                                        body?: string;
                                        type?: string;
                                        interactable?: boolean;
                                        callback_url?: string;
                                        callback_info?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheet_ai/v1/sheet/data_insight`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheet_ai&resource=sheet&apiName=content&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=content&project=sheet_ai&resource=sheet&version=v1 document }
                 */
                content: async (
                    payload?: {
                        params?: {
                            file_source?: string;
                            file_token?: string;
                            row?: number;
                            column?: number;
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
                                    value_ranges?: {
                                        values?: Array<Array<string>>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheet_ai/v1/sheet/content`,
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
             * tool
             */
            tool: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheet_ai&resource=tool&apiName=read&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=read&project=sheet_ai&resource=tool&version=v2 document }
                 *
                 * LarkLCI OpenAPI 读 Tool 调用
                 */
                read: async (
                    payload?: {
                        data: {
                            tool_name: string;
                            input?: string;
                            extra?: {
                                scene?: string;
                                transaction_id?: string;
                                msg_id?: string;
                                revision?: string;
                            };
                        };
                        path: { spreadsheet_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    output?: string;
                                    extra?: {
                                        token?: string;
                                        title?: string;
                                        base_revision?: string;
                                        revision?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheet_ai/v2/spreadsheets/:spreadsheet_token/tools/invoke_read`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=sheet_ai&resource=tool&apiName=write&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=write&project=sheet_ai&resource=tool&version=v2 document }
                 *
                 * LarkLCI OpenAPI 写 Tool 调用
                 */
                write: async (
                    payload?: {
                        data: {
                            tool_name: string;
                            input?: string;
                            extra?: {
                                scene?: string;
                                transaction_id?: string;
                                msg_id?: string;
                                revision?: string;
                            };
                        };
                        path: { spreadsheet_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    output?: string;
                                    extra?: {
                                        token?: string;
                                        title?: string;
                                        base_revision?: string;
                                        revision?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/sheet_ai/v2/spreadsheets/:spreadsheet_token/tools/invoke_write`,
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
