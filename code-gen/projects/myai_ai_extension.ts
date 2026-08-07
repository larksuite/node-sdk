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
import moments from "./moments";

// auto gen
export default abstract class Client extends moments {
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
    myai_ai_extension = {
        v1: {
            /**
             * card
             */
            card: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=card&apiName=event_callback&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=event_callback&project=myai_ai_extension&resource=card&version=v1 document }
                 */
                eventCallback: async (
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
                                `${this.domain}/open-apis/myai_ai_extension/v1/card/event_callback`,
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
             * word
             */
            word: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=word&apiName=query_suggestion_context&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_suggestion_context&project=myai_ai_extension&resource=word&version=v1 document }
                 */
                querySuggestionContext: async (
                    payload?: {
                        params: {
                            file_token?: string;
                            file_source: number;
                            context_types?: Array<string>;
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
                                    content?: string;
                                    chunks?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ai_extension/v1/word/query_suggestion_context`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=word&apiName=extension_onboarding&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=extension_onboarding&project=myai_ai_extension&resource=word&version=v1 document }
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
                                extra?: { model_key?: string };
                                upload_objects?: Array<{
                                    biz_id?: string;
                                    type?: string;
                                }>;
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
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
                                        callback_url?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ai_extension/v1/word/extension_onboarding`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=word&apiName=general_qa&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=general_qa&project=myai_ai_extension&resource=word&version=v1 document }
                 */
                generalQa: async (
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
                                extra?: { model_key?: string };
                                upload_objects?: Array<{
                                    biz_id?: string;
                                    type?: string;
                                }>;
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
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
                                `${this.domain}/open-apis/myai_ai_extension/v1/word/general_qa`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=word&apiName=file_onboarding&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_onboarding&project=myai_ai_extension&resource=word&version=v1 document }
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
                                extra?: { model_key?: string };
                                upload_objects?: Array<{
                                    biz_id?: string;
                                    type?: string;
                                }>;
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
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
                                        callback_url?: string;
                                        callback_info?: string;
                                    };
                                    hint?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ai_extension/v1/word/file_onboarding`,
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
             * pdf
             */
            pdf: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=pdf&apiName=query_suggestion_context&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_suggestion_context&project=myai_ai_extension&resource=pdf&version=v1 document }
                 */
                querySuggestionContext: async (
                    payload?: {
                        params: {
                            file_token: string;
                            file_source: number;
                            context_types?: Array<string>;
                            hash_answer?: string;
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
                                    content?: string;
                                    chunks?: Array<string>;
                                    is_answer_based_on_document?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ai_extension/v1/pdf/query_suggestion_context`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=pdf&apiName=extension_onboarding&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=extension_onboarding&project=myai_ai_extension&resource=pdf&version=v1 document }
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
                                extra?: { model_key?: string };
                                upload_objects?: Array<{
                                    biz_id?: string;
                                    type?: string;
                                }>;
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
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
                                        callback_url?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ai_extension/v1/pdf/extension_onboarding`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=pdf&apiName=file_onboarding&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_onboarding&project=myai_ai_extension&resource=pdf&version=v1 document }
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
                                extra?: { model_key?: string };
                                upload_objects?: Array<{
                                    biz_id?: string;
                                    type?: string;
                                }>;
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
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
                                        callback_url?: string;
                                        callback_info?: string;
                                    };
                                    hint?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ai_extension/v1/pdf/file_onboarding`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=pdf&apiName=general_qa&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=general_qa&project=myai_ai_extension&resource=pdf&version=v1 document }
                 */
                generalQa: async (
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
                                extra?: { model_key?: string };
                                upload_objects?: Array<{
                                    biz_id?: string;
                                    type?: string;
                                }>;
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
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
                                `${this.domain}/open-apis/myai_ai_extension/v1/pdf/general_qa`,
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
             * doc
             */
            doc: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=doc&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=myai_ai_extension&resource=doc&version=v1 document }
                 */
                create: async (
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
                                extra?: { model_key?: string };
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
                                        callback_url?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ai_extension/v1/doc`,
                                path
                            ),
                            method: "",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=doc&apiName=file_onboarding&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_onboarding&project=myai_ai_extension&resource=doc&version=v1 document }
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
                                extra?: { model_key?: string };
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
                                        callback_url?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ai_extension/v1/doc/file_onboarding`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ai_extension&resource=doc&apiName=general_qa&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=general_qa&project=myai_ai_extension&resource=doc&version=v1 document }
                 */
                generalQa: async (
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
                                extra?: { model_key?: string };
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
                                    result?: { answer?: string };
                                    present?: {
                                        type?: string;
                                        body?: string;
                                        card_variables?: {
                                            content?: string;
                                            guidance?: string;
                                        };
                                        card_template_id?: string;
                                        callback_url?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ai_extension/v1/doc/general_qa`,
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
