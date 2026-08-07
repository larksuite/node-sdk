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
import sheets from "./sheets";

// auto gen
export default abstract class Client extends sheets {
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
    slides_ai = {
        v1: {
            /**
             * xml_presentation.slide
             */
            xmlPresentationSlide: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation.slide&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=slides_ai&resource=xml_presentation.slide&version=v1 document }
                 *
                 * 在指定 XML 演示文稿下删除页面
                 */
                delete: async (
                    payload?: {
                        params: {
                            slide_id: string;
                            revision_id?: number;
                            tid?: string;
                        };
                        path: { xml_presentation_id: string };
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
                                data?: { revision_id?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/xml_presentations/:xml_presentation_id/slide`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation.slide&apiName=replace&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=replace&project=slides_ai&resource=xml_presentation.slide&version=v1 document }
                 *
                 * 对指定 XML 演示文稿页面进行元素级别的局部替换
                 */
                replace: async (
                    payload?: {
                        data: {
                            parts: Array<{
                                action: string;
                                pattern?: string;
                                replacement?: string;
                                is_multiple?: boolean;
                                block_id?: string;
                                insertion?: string;
                                insert_before_block_id?: string;
                            }>;
                            comment?: string;
                        };
                        params: {
                            slide_id: string;
                            revision_id?: number;
                            tid?: string;
                        };
                        path: { xml_presentation_id: string };
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
                                    revision_id?: number;
                                    failed_part_index?: number;
                                    failed_reason?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/xml_presentations/:xml_presentation_id/slide/replace`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation.slide&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=slides_ai&resource=xml_presentation.slide&version=v1 document }
                 *
                 * 获取指定 XML 演示文稿的单个页面 XML 内容
                 */
                get: async (
                    payload?: {
                        params?: {
                            slide_id?: string;
                            revision_id?: number;
                            slide_number?: number;
                        };
                        path: { xml_presentation_id: string };
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
                                    slide?: {
                                        slide_id?: string;
                                        content?: string;
                                    };
                                    revision_id?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/xml_presentations/:xml_presentation_id/slide`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation.slide&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=slides_ai&resource=xml_presentation.slide&version=v1 document }
                 *
                 * 在指定 XML 演示文稿下创建页面
                 */
                create: async (
                    payload?: {
                        data: {
                            slide: { slide_id?: string; content?: string };
                            before_slide_id?: string;
                        };
                        params?: { revision_id?: number; tid?: string };
                        path: { xml_presentation_id: string };
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
                                    slide_id?: string;
                                    revision_id?: number;
                                    issues?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/xml_presentations/:xml_presentation_id/slide`,
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
             * xml_presentation.slide_image
             */
            xmlPresentationSlideImage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation.slide_image&apiName=render&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=render&project=slides_ai&resource=xml_presentation.slide_image&version=v1 document }
                 *
                 * 渲染页面截图为图片
                 */
                render: async (
                    payload?: {
                        data: { content: string };
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
                                    slide_image?: {
                                        slide_id?: string;
                                        format?: number;
                                        data?: string;
                                        slide_number?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/slide_image/render`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation.slide_image&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=slides_ai&resource=xml_presentation.slide_image&version=v1 document }
                 *
                 * 获取幻灯片截图
                 */
                list: async (
                    payload?: {
                        data?: {
                            slide_ids?: Array<string>;
                            slide_numbers?: Array<number>;
                        };
                        path: { xml_presentation_id: string };
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
                                    slide_images?: Array<{
                                        slide_id?: string;
                                        format?: number;
                                        data?: string;
                                        slide_number?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/xml_presentations/:xml_presentation_id/slide_images`,
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
             * xml_presentation
             */
            xmlPresentation: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=slides_ai&resource=xml_presentation&version=v1 document }
                 *
                 * 读取演示文稿全文信息，XML 格式返回
                 */
                get: async (
                    payload?: {
                        params?: {
                            revision_id?: number;
                            remove_attr_id?: boolean;
                        };
                        path: { xml_presentation_id: string };
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
                                    xml_presentation?: {
                                        presentation_id?: string;
                                        revision_id?: number;
                                        content?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/xml_presentations/:xml_presentation_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=slides_ai&resource=xml_presentation&version=v1 document }
                 *
                 * 以 XML 格式创建演示文稿
                 */
                create: async (
                    payload?: {
                        data?: {
                            xml_presentation?: {
                                presentation_id?: string;
                                revision_id?: number;
                                content?: string;
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
                                    xml_presentation_id?: string;
                                    slide_ids?: Array<string>;
                                    revision_id?: number;
                                    url?: string;
                                    issues?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/xml_presentations`,
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
             * xml_presentation.history
             */
            xmlPresentationHistory: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation.history&apiName=revert_status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=revert_status&project=slides_ai&resource=xml_presentation.history&version=v1 document }
                 *
                 * 查询 XML 演示文稿历史回滚任务状态
                 */
                revertStatus: async (
                    payload?: {
                        params: { task_id: string };
                        path: { xml_presentation_id: string };
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
                                    status?:
                                        | "done"
                                        | "partial_failed"
                                        | "running"
                                        | "failed";
                                    failed_block_tokens?: Array<string>;
                                    history_version_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/xml_presentations/:xml_presentation_id/history/revert_status`,
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
                listWithIterator: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: number };
                        path: { xml_presentation_id: string };
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
                                    `${this.domain}/open-apis/slides_ai/v1/xml_presentations/:xml_presentation_id/histories`,
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
                                                    entries?: Array<{
                                                        revision_id?: number;
                                                        edit_time?: string;
                                                        type?: number;
                                                        name?: string;
                                                        description?: string;
                                                        editor_ids?: Array<string>;
                                                        history_version_id?: string;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation.history&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=slides_ai&resource=xml_presentation.history&version=v1 document }
                 *
                 * 列出 XML 演示文稿历史版本
                 */
                list: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: number };
                        path: { xml_presentation_id: string };
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
                                    entries?: Array<{
                                        revision_id?: number;
                                        edit_time?: string;
                                        type?: number;
                                        name?: string;
                                        description?: string;
                                        editor_ids?: Array<string>;
                                        history_version_id?: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/xml_presentations/:xml_presentation_id/histories`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides_ai&resource=xml_presentation.history&apiName=revert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=revert&project=slides_ai&resource=xml_presentation.history&version=v1 document }
                 *
                 * 按 history_version_id 发起 XML 演示文稿历史版本回滚任务
                 */
                revert: async (
                    payload?: {
                        data: { history_version_id: string };
                        path: { xml_presentation_id: string };
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
                                    task_id?: string;
                                    status?:
                                        | "done"
                                        | "partial_failed"
                                        | "running"
                                        | "failed";
                                    poll_after_ms?: number;
                                    history_version_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides_ai/v1/xml_presentations/:xml_presentation_id/history/revert`,
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
