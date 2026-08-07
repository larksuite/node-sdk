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
import myai_base_ai from "./myai_base_ai";

// auto gen
export default abstract class Client extends myai_base_ai {
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
    myai_ccm_extension = {
        v1: {
            /**
             * doc
             */
            doc: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=doc&apiName=obj_stats&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=obj_stats&project=myai_ccm_extension&resource=doc&version=v1 document }
                 */
                objStats: async (
                    payload?: {
                        params: { url: string };
                    },
                    options?: IRequestOptions
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
                                        pv?: string;
                                        uv?: string;
                                        stats_time?: string;
                                        like_count?: string;
                                        comment_count?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ccm_extension/v1/doc/obj_stats`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=doc&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=myai_ccm_extension&resource=doc&version=v1 document }
                 */
                search: async (
                    payload?: {
                        params: { search_key: string };
                    },
                    options?: IRequestOptions
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
                                `${this.domain}/open-apis/myai_ccm_extension/v1/doc/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=doc&apiName=create_doc&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_doc&project=myai_ccm_extension&resource=doc&version=v1 document }
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
                                `${this.domain}/open-apis/myai_ccm_extension/v1/doc/create_doc`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=doc&apiName=raw_content&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=raw_content&project=myai_ccm_extension&resource=doc&version=v1 document }
                 */
                rawContent: async (
                    payload?: {
                        params: { url: string };
                    },
                    options?: IRequestOptions
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
                                `${this.domain}/open-apis/myai_ccm_extension/v1/doc/raw_content`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=doc&apiName=meta&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=meta&project=myai_ccm_extension&resource=doc&version=v1 document }
                 */
                meta: async (
                    payload?: {
                        params: { url: string };
                    },
                    options?: IRequestOptions
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
                                        owner?: {
                                            name?: string;
                                            open_id?: string;
                                        };
                                        create_time?: string;
                                        latest_modify_time?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ccm_extension/v1/doc/meta`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=doc&apiName=embed&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=embed&project=myai_ccm_extension&resource=doc&version=v1 document }
                 */
                embed: async (
                    payload?: {
                        params?: { url?: string };
                    },
                    options?: IRequestOptions
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
                                        ccm_url?: Array<string>;
                                        task_url?: Array<string>;
                                        iframe_url?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ccm_extension/v1/doc/embed`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=doc&apiName=search_suite_data_set_with_urls&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_suite_data_set_with_urls&project=myai_ccm_extension&resource=doc&version=v1 document }
                 */
                searchSuiteDataSetWithUrls: async (
                    payload?: {
                        data: {
                            query: string;
                            url: string;
                            seperator?: string;
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
                                    result: {
                                        union_passages: { text?: string };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ccm_extension/v1/doc/search_suite_data_set_with_urls`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=doc&apiName=search_suite_data_set&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_suite_data_set&project=myai_ccm_extension&resource=doc&version=v1 document }
                 */
                searchSuiteDataSet: async (
                    payload?: {
                        data?: { query?: string };
                    },
                    options?: IRequestOptions
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
                                        answer?: string;
                                        reference?: {
                                            references?: Array<{
                                                passage_id?: string;
                                                passage_source?: number;
                                                content?: string;
                                                title?: string;
                                                url?: string;
                                                score?: number;
                                                extra?: string;
                                                available?: boolean;
                                            }>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ccm_extension/v1/doc/search_suite_data_set`,
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
             * comment
             */
            comment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=comment&apiName=raw_content&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=raw_content&project=myai_ccm_extension&resource=comment&version=v1 document }
                 */
                rawContent: async (
                    payload?: {
                        params: { url: string };
                    },
                    options?: IRequestOptions
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
                                    result?: { content?: { text?: string } };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ccm_extension/v1/comment/raw_content`,
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
             * wiki
             */
            wiki: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=wiki&apiName=children_node&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=children_node&project=myai_ccm_extension&resource=wiki&version=v1 document }
                 */
                childrenNode: async (
                    payload?: {
                        params?: { wiki_url?: string };
                    },
                    options?: IRequestOptions
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
                                    result?: { wiki_url?: Array<string> };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ccm_extension/v1/wiki/children_node`,
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
             * space
             */
            space: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_ccm_extension&resource=space&apiName=display&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=display&project=myai_ccm_extension&resource=space&version=v1 document }
                 */
                display: async (
                    payload?: {
                        params?: { limit?: string };
                    },
                    options?: IRequestOptions
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
                                        favorite?: Array<string>;
                                        recent?: Array<string>;
                                        shared?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_ccm_extension/v1/space/display`,
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
