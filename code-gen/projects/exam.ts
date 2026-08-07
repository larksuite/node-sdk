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
import event from "./event";

// auto gen
export default abstract class Client extends event {
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
    exam = {
        /**
         * paper
         */
        paper: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=exam&resource=paper&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=exam&resource=paper&version=v1 document }
             *
             * 根据考试获取试卷数据
             *
             * 获取考试关联的试卷信息。
             */
            query: async (
                payload?: {
                    params: { project_id: string };
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
                                data?: {
                                    paper_id: string;
                                    question_num: number;
                                    score: number;
                                    duration: string;
                                    name: { zh_cn?: string; en_us?: string };
                                    instruction: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    text_question_num: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/exam/v1/papers/query`,
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
         * project
         */
        project: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=exam&resource=project&apiName=completion_result&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=completion_result&project=exam&resource=project&version=v1 document }
             *
             * 获取考试完成情况
             *
             * 获取考试完成情况。
             */
            completionResult: async (
                payload?: {
                    params: { project_id: string };
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
                                data?: {
                                    pass_score?: number;
                                    max_answer_count?: number;
                                    examinee_count?: number;
                                    not_answering_count?: number;
                                    answering_count?: number;
                                    submitted_count?: number;
                                    fail_count?: number;
                                    pass_count?: number;
                                    not_join_count?: number;
                                    reviewed_total?: number;
                                    need_review_total?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/exam/v1/projects/completion_result`,
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
             * {@link https://open.feishu.cn/api-explorer?project=exam&resource=project&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=exam&resource=project&version=v1 document }
             *
             * 查询考试列表
             *
             * 接口用于检索满足特定条件的所有考试
             */
            search: async (
                payload?: {
                    data?: {
                        keyword?: string;
                        stage_list?: Array<number>;
                        creator_id_list?: Array<string>;
                        app_type?: number;
                    };
                    params: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        page_size: string;
                        page_token?: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    project_id: string;
                                    project_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    start_time: string;
                                    end_time: string;
                                    stage: number;
                                    user_id: {
                                        open_id?: string;
                                        user_id?: string;
                                    };
                                    email?: string;
                                    create_time: string;
                                    allowed_answer_count: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/exam/v1/projects/search`,
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
         * project.examinee
         */
        projectExaminee: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=exam&resource=project.examinee&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=exam&resource=project.examinee&version=v1 document }
             *
             * 获取考试学员数据
             *
             * 检索指定考试中的学员数据
             */
            search: async (
                payload?: {
                    data?: { examinee_ids?: Array<string> };
                    params: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        page_size: string;
                        page_token?: string;
                    };
                    path: { project_id: string };
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    project_id: string;
                                    project_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    user_id: {
                                        open_id?: string;
                                        user_id?: string;
                                    };
                                    email?: string;
                                    pass_status: number;
                                    records?: Array<{
                                        score: number;
                                        answering_duration: string;
                                        end_time?: string;
                                        right_question_num?: number;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/exam/v1/projects/:project_id/examinees/search`,
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
        v1: {
            /**
             * paper
             */
            paper: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=exam&resource=paper&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=exam&resource=paper&version=v1 document }
                 *
                 * 根据考试获取试卷数据
                 *
                 * 获取考试关联的试卷信息。
                 */
                query: async (
                    payload?: {
                        params: { project_id: string };
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
                                    data?: {
                                        paper_id: string;
                                        question_num: number;
                                        score: number;
                                        duration: string;
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        instruction: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        text_question_num: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/exam/v1/papers/query`,
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
             * project
             */
            project: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=exam&resource=project&apiName=completion_result&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=completion_result&project=exam&resource=project&version=v1 document }
                 *
                 * 获取考试完成情况
                 *
                 * 获取考试完成情况。
                 */
                completionResult: async (
                    payload?: {
                        params: { project_id: string };
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
                                    data?: {
                                        pass_score?: number;
                                        max_answer_count?: number;
                                        examinee_count?: number;
                                        not_answering_count?: number;
                                        answering_count?: number;
                                        submitted_count?: number;
                                        fail_count?: number;
                                        pass_count?: number;
                                        not_join_count?: number;
                                        reviewed_total?: number;
                                        need_review_total?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/exam/v1/projects/completion_result`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=exam&resource=project&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=exam&resource=project&version=v1 document }
                 *
                 * 查询考试列表
                 *
                 * 接口用于检索满足特定条件的所有考试
                 */
                search: async (
                    payload?: {
                        data?: {
                            keyword?: string;
                            stage_list?: Array<number>;
                            creator_id_list?: Array<string>;
                            app_type?: number;
                        };
                        params: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            page_size: string;
                            page_token?: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        project_id: string;
                                        project_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        start_time: string;
                                        end_time: string;
                                        stage: number;
                                        user_id: {
                                            open_id?: string;
                                            user_id?: string;
                                        };
                                        email?: string;
                                        create_time: string;
                                        allowed_answer_count: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/exam/v1/projects/search`,
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
             * project.examinee
             */
            projectExaminee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=exam&resource=project.examinee&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=exam&resource=project.examinee&version=v1 document }
                 *
                 * 获取考试学员数据
                 *
                 * 检索指定考试中的学员数据
                 */
                search: async (
                    payload?: {
                        data?: { examinee_ids?: Array<string> };
                        params: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            page_size: string;
                            page_token?: string;
                        };
                        path: { project_id: string };
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        project_id: string;
                                        project_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        user_id: {
                                            open_id?: string;
                                            user_id?: string;
                                        };
                                        email?: string;
                                        pass_status: number;
                                        records?: Array<{
                                            score: number;
                                            answering_duration: string;
                                            end_time?: string;
                                            right_question_num?: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/exam/v1/projects/:project_id/examinees/search`,
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
