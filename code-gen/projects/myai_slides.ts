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
import myai_scenario_summary from "./myai_scenario_summary";

// auto gen
export default abstract class Client extends myai_scenario_summary {
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
    myai_slides = {
        v1: {
            /**
             * slides
             */
            slides: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_slides&resource=slides&apiName=generate_slides&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=generate_slides&project=myai_slides&resource=slides&version=v1 document }
                 */
                generateSlides: async (
                    payload?: {
                        data?: {
                            topic?: string;
                            tool_raw_instruction?: string;
                            scenario_context?: {
                                system_info?: {
                                    lang?: string;
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
                                    hint?: string;
                                    present?: { type?: string; body?: string };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_slides/v1/slides/generate_slides`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_slides&resource=slides&apiName=generate_outline&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=generate_outline&project=myai_slides&resource=slides&version=v1 document }
                 */
                generateOutline: async (
                    payload?: {
                        data?: {
                            topic?: string;
                            scenario_context?: {
                                system_info?: {
                                    lang?: string;
                                    session_id?: string;
                                };
                                extra?: {
                                    chat_mode_id?: string;
                                    token?: string;
                                    instance_id?: string;
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
                                    present?: {
                                        type?: string;
                                        body?: string;
                                        operation_type?: string;
                                        interactable?: boolean;
                                        callback_url?: string;
                                        callback_info?: string;
                                        card_template_id?: string;
                                        card_variables?: { content?: string };
                                    };
                                    hint?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_slides/v1/slides/generate_outline`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_slides&resource=slides&apiName=recommend_theme&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recommend_theme&project=myai_slides&resource=slides&version=v1 document }
                 */
                recommendTheme: async (
                    payload?: {
                        data?: {
                            open_message_id?: string;
                            action?: {
                                tag?: string;
                                value?: {
                                    uuid?: string;
                                    generate_slides_stage?: string;
                                };
                            };
                            message_id?: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    present?: {
                                        type?: string;
                                        body?: string;
                                        operation_type?: string;
                                        interactable?: boolean;
                                        callback_url?: string;
                                        callback_info?: string;
                                    };
                                    hint?: string;
                                    presents?: Array<{
                                        type?: string;
                                        body?: string;
                                        operation_type?: string;
                                        interactable?: boolean;
                                        callback_url?: string;
                                        callback_info?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_slides/v1/slides/recommend_theme`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_slides&resource=slides&apiName=generate_poster&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=generate_poster&project=myai_slides&resource=slides&version=v1 document }
                 */
                generatePoster: async (
                    payload?: {
                        data?: {
                            tool_raw_instruction?: string;
                            scenario_context?: {
                                system_info?: {
                                    lang?: string;
                                    session_id?: string;
                                };
                            };
                            topic?: string;
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
                                        type?: string;
                                        body?: string;
                                        operation_type?: string;
                                        interactable?: boolean;
                                        callback_url?: string;
                                        callback_info?: string;
                                        card_template_id?: string;
                                        card_variables?: { content?: string };
                                        operation_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_slides/v1/slides/generate_poster`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_slides&resource=slides&apiName=beautify_slides&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=beautify_slides&project=myai_slides&resource=slides&version=v1 document }
                 */
                beautifySlides: async (
                    payload?: {
                        data?: {
                            tool_raw_instruction?: string;
                            scenario_context?: {
                                system_info?: {
                                    lang?: string;
                                    session_id?: string;
                                };
                                extra?: {
                                    chat_mode_id?: string;
                                    token?: string;
                                    instance_id?: string;
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
                                    present?: {
                                        type?: string;
                                        body?: string;
                                        operation_type?: string;
                                        interactable?: boolean;
                                        callback_url?: string;
                                        callback_info?: string;
                                        card_template_id?: string;
                                        card_variables?: { content?: string };
                                        operation_url?: string;
                                    };
                                    hint?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_slides/v1/slides/beautify_slides`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_slides&resource=slides&apiName=generate_gtm_slides&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=generate_gtm_slides&project=myai_slides&resource=slides&version=v1 document }
                 */
                generateGtmSlides: async (
                    payload?: {
                        data: {
                            tool_raw_instruction: string;
                            base_url?: string;
                            scenario_context?: {
                                system_info?: {
                                    lang?: string;
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
                                    present?: {
                                        type?: string;
                                        body?: string;
                                        callback_url?: string;
                                        callback_info?: string;
                                    };
                                    result?: { answer?: string };
                                    hint?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_slides/v1/slides/generate_gtm_slides`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_slides&resource=slides&apiName=present_status_callback&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=present_status_callback&project=myai_slides&resource=slides&version=v1 document }
                 */
                presentStatusCallback: async (
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
                                `${this.domain}/open-apis/myai_slides/v1/slides/present_status_callback`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_slides&resource=slides&apiName=operation_callback&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=operation_callback&project=myai_slides&resource=slides&version=v1 document }
                 */
                operationCallback: async (
                    payload?: {
                        data: {
                            open_message_id?: string;
                            open_chat_id?: string;
                            operator_tenant_key?: string;
                            token?: string;
                            action: {
                                value?: { type: string; payload: string };
                                tag?: string;
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
                                        type?: string;
                                        body?: string;
                                        operation_type?: string;
                                        interactable?: boolean;
                                        callback_url?: string;
                                        callback_info?: string;
                                        card_template_id?: string;
                                        card_variables?: { content?: string };
                                        operation_url?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_slides/v1/slides/operation_callback`,
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
