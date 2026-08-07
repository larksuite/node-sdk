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
import im from "./im";

// auto gen
export default abstract class Client extends im {
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
    inline_platform = {
        v1: {
            /**
             * inline_platform
             */
            inlinePlatform: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=inline_platform&resource=inline_platform&apiName=create_doc_with_gen_content&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_doc_with_gen_content&project=inline_platform&resource=inline_platform&version=v1 document }
                 */
                createDocWithGenContent: async (
                    payload?: {
                        data?: { user_input?: string; task_type?: string };
                    },
                    options?: IRequestOptions
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
                                    present?: { type?: string; body?: string };
                                    hint?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/inline_platform/v1/inline_platform/create_doc_with_gen_content`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=inline_platform&resource=inline_platform&apiName=gen_image&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=gen_image&project=inline_platform&resource=inline_platform&version=v1 document }
                 */
                genImage: async (
                    payload?: {
                        data?: {
                            user_input?: string;
                            task_type?: string;
                            need_count?: number;
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
                                    present?: { type?: string; body?: string };
                                    hint?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/inline_platform/v1/inline_platform/gen_image`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=inline_platform&resource=inline_platform&apiName=comprehend_content_from_url&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=comprehend_content_from_url&project=inline_platform&resource=inline_platform&version=v1 document }
                 */
                comprehendContentFromUrl: async (
                    payload?: {
                        data?: {
                            refer_doc_content?: string;
                            task_type?: string;
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
                                    present?: { type?: string; body?: string };
                                    hint?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/inline_platform/v1/inline_platform/comprehend_content_from_url`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=inline_platform&resource=inline_platform&apiName=comprehend_create_doc&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=comprehend_create_doc&project=inline_platform&resource=inline_platform&version=v1 document }
                 */
                comprehendCreateDoc: async (
                    payload?: {
                        data?: {
                            task_type?: string;
                            user_input?: string;
                            refer_doc_content?: string;
                            action_type?: number;
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
                                    present?: { type?: string; body?: string };
                                    hint?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/inline_platform/v1/inline_platform/comprehend_create_doc`,
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
             * ai_extension
             */
            aiExtension: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=inline_platform&resource=ai_extension&apiName=create_doc&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_doc&project=inline_platform&resource=ai_extension&version=v1 document }
                 */
                createDoc: async (
                    payload?: {
                        data?: { title?: string; content?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { result?: { url?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/inline_platform/v1/ai_extension/create_doc`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=inline_platform&resource=ai_extension&apiName=search_doc&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_doc&project=inline_platform&resource=ai_extension&version=v1 document }
                 */
                searchDoc: async (
                    payload?: {
                        data: { search_key: string };
                    },
                    options?: IRequestOptions
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
                                    result?: { doc_urls?: Array<string> };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/inline_platform/v1/ai_extension/search_doc`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=inline_platform&resource=ai_extension&apiName=get_doc_raw_content&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_doc_raw_content&project=inline_platform&resource=ai_extension&version=v1 document }
                 */
                getDocRawContent: async (
                    payload?: {
                        data: { url: string };
                    },
                    options?: IRequestOptions
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
                                    result?: {
                                        content?: string;
                                        raw_content?: { text?: string };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/inline_platform/v1/ai_extension/get_doc_raw_content`,
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
