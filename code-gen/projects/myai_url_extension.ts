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
import myai_slides from "./myai_slides";

// auto gen
export default abstract class Client extends myai_slides {
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
    myai_url_extension = {
        v1: {
            /**
             * url_extension
             */
            urlExtension: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_url_extension&resource=url_extension&apiName=extension_onboarding&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=extension_onboarding&project=myai_url_extension&resource=url_extension&version=v1 document }
                 */
                extensionOnboarding: async (
                    payload?: {
                        data?: {
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                upload_objects?: Array<{
                                    biz_id?: string;
                                    type?: string;
                                }>;
                            };
                            tool_raw_instruction?: string;
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
                                        card_variables?: {
                                            content?: string;
                                            guidance?: string;
                                        };
                                        card_template_id?: string;
                                        cardback_url?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_url_extension/v1/url_extension/extension_onboarding`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_url_extension&resource=url_extension&apiName=card_bind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=card_bind&project=myai_url_extension&resource=url_extension&version=v1 document }
                 */
                cardBind: async (
                    payload?: {
                        data?: {
                            message_id?: string;
                            status?: {
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
                                `${this.domain}/open-apis/myai_url_extension/v1/url_extension/card_bind`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_url_extension&resource=url_extension&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=myai_url_extension&resource=url_extension&version=v1 document }
                 */
                query: async (
                    payload?: {
                        data?: {
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                upload_objects?: Array<{
                                    biz_id?: string;
                                    type?: string;
                                }>;
                            };
                            tool_raw_instruction?: string;
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
                                data?: { result?: { answer?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_url_extension/v1/url_extension/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_url_extension&resource=url_extension&apiName=file_onboarding&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_onboarding&project=myai_url_extension&resource=url_extension&version=v1 document }
                 */
                fileOnboarding: async (
                    payload?: {
                        data?: {
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                upload_objects?: Array<{
                                    biz_id?: string;
                                    type?: string;
                                }>;
                            };
                            tool_raw_instruction?: string;
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
                                        card_variables?: {
                                            content?: string;
                                            guidance?: string;
                                        };
                                        card_template_id?: string;
                                        cardback_url?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_url_extension/v1/url_extension/file_onboarding`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_url_extension&resource=url_extension&apiName=query_suggestion_context&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_suggestion_context&project=myai_url_extension&resource=url_extension&version=v1 document }
                 */
                querySuggestionContext: async (
                    payload?: {
                        params?: { url_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { title?: string; content?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_url_extension/v1/url_extension/query_suggestion_context`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_url_extension&resource=url_extension&apiName=gen_hotlist_summary&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=gen_hotlist_summary&project=myai_url_extension&resource=url_extension&version=v1 document }
                 */
                genHotlistSummary: async (
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
                                `${this.domain}/open-apis/myai_url_extension/v1/url_extension/gen_hotlist_summary`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_url_extension&resource=url_extension&apiName=get_hotlist_summary&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_hotlist_summary&project=myai_url_extension&resource=url_extension&version=v1 document }
                 */
                getHotlistSummary: async (
                    payload?: {},
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    summarize?: {
                                        title?: string;
                                        favicon_url?: string;
                                        cover_url?: string;
                                        summary?: string;
                                        url?: string;
                                    };
                                    card?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_url_extension/v1/url_extension/get_hotlist_summary`,
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
