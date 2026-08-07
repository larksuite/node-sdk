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
import lingo from "./lingo";

// auto gen
export default abstract class Client extends lingo {
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
    llpp = {
        v1: {
            /**
             * model
             */
            model: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model&apiName=versions&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=versions&project=llpp&resource=model&version=v1 document }
                 *
                 * 获取模型列表
                 *
                 * 获取模型列表，列表中的模型可以用于创建任务
                 */
                versions: async (
                    payload?: {
                        params?: { offset?: number; size?: number };
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
                                    model_versions: Array<{
                                        model_key: string;
                                        payload?: string;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v1/model/versions`,
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
             * task_execute
             */
            taskExecute: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task_execute&apiName=stream&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=stream&project=llpp&resource=task_execute&version=v1 document }
                 */
                stream: async (
                    payload?: {
                        data?: {
                            prompt_vars?: Array<{
                                key?: string;
                                value?: string;
                            }>;
                            task_key?: string;
                            qualifier?: string;
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
                                `${this.domain}/open-apis/llpp/v1/task_execute/stream`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task_execute&apiName=post&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=post&project=llpp&resource=task_execute&version=v1 document }
                 *
                 * 任务执行-同步
                 *
                 * 执行在LLPP平台（大模型任务管理平台）上配置的任务，执行结果同步返回
                 */
                post: async (
                    payload?: {
                        data?: {
                            task_key?: string;
                            qualifier?: string;
                            prompt_vars?: Array<{
                                key?: string;
                                value?: string;
                            }>;
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
                                    text?: string;
                                    token_consumed?: {
                                        total_token_num?: number;
                                        input_token_num?: number;
                                        output_token_num?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v1/task_execute/post`,
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
             * task
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=llpp&resource=task&version=v1 document }
                 *
                 * 删除任务
                 *
                 * 删除创建的任务（一周内有调用或被访问过的任务无法删除）。
                 */
                delete: async (
                    payload?: {
                        params: { id: string };
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
                                data?: { success: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v1/task`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=version&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=version&project=llpp&resource=task&version=v1 document }
                 *
                 * 获取任务指定版本
                 *
                 * 获取任务的指定版本，返回值中包含提示词模板、模型的详细信息等。
                 */
                version: async (
                    payload?: {
                        params: { id: string; version: number };
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
                                    task_version: {
                                        task_id: string;
                                        version: number;
                                        description: string;
                                        prompt_template: {
                                            input: {
                                                messages?: Array<{
                                                    role: string;
                                                    content: string;
                                                }>;
                                                max_tokens?: number;
                                                temperature?: number;
                                                top_p?: number;
                                                stops?: Array<string>;
                                                presence_penalty?: number;
                                                frequency_penalty?: number;
                                                model_key?: string;
                                            };
                                            prompt_vars: Array<{
                                                var_name: string;
                                                description: string;
                                                default_val?: string;
                                                is_required?: boolean;
                                            }>;
                                        };
                                        status: number;
                                        tenant_id: string;
                                        created_at: string;
                                        updated_at: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v1/task/version`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=llpp&resource=task&version=v1 document }
                 *
                 * 获取任务
                 *
                 * 获取已经创建的任务，返回值中包含任务的基本信息，如任务的 key, dev 版本号，已经发布的最新版本号等；要获取对应版本的 prompt 提示词等详细信息可以使用获取任务版本接口。
                 */
                get: async (
                    payload?: {
                        params: { id: string };
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
                                    task: {
                                        id: string;
                                        name: string;
                                        description: string;
                                        current_version: number;
                                        dev_version: number;
                                        tenant_id: string;
                                        app_id?: string;
                                        key?: string;
                                        namespace_id?: string;
                                        created_at: string;
                                        updated_at: string;
                                        source?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v1/task`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=publish&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=publish&project=llpp&resource=task&version=v1 document }
                 *
                 * 发布任务
                 *
                 * 可以通过该接口将任务对应的 dev 版本发布为正式版本（已发布版本）
                 */
                publish: async (
                    payload?: {
                        data: { description: string };
                        params: { id: string };
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
                                data?: { success: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v1/task/publish`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=llpp&resource=task&version=v1 document }
                 *
                 * 创建任务
                 *
                 * 通过传入适用于不同场景的提示词模板（Prompt template），创建对应的提示任务（Prompt task）, 创建成功后会返回对应的任务 ID，任务 ID 可用于删除任务、修改任务、更新任务等接口，任务创建后默认生成一个 version 为 0 的 dev 版本。
                 */
                create: async (
                    payload?: {
                        data: {
                            task_params: {
                                name: string;
                                description: string;
                                prompt_template: {
                                    input: {
                                        messages?: Array<{
                                            role: string;
                                            content: string;
                                        }>;
                                        max_tokens?: number;
                                        temperature?: number;
                                        top_p?: number;
                                        stops?: Array<string>;
                                        presence_penalty?: number;
                                        frequency_penalty?: number;
                                        model_key?: string;
                                    };
                                    prompt_vars: Array<{
                                        var_name: string;
                                        description: string;
                                        default_val?: string;
                                        is_required?: boolean;
                                    }>;
                                };
                                key: string;
                            };
                            all_executable?: boolean;
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
                                data?: { id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v1/task`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=llpp&resource=task&version=v1 document }
                 *
                 * 修改任务
                 *
                 * 该接口用于修改任务的 dev 版本进行调试。调试完成后，你可通过发布任务接口将 dev 版本发布为正式版本。
                 */
                update: async (
                    payload?: {
                        data: {
                            task_params: {
                                name: string;
                                description: string;
                                prompt_template: {
                                    input: {
                                        messages?: Array<{
                                            role: string;
                                            content: string;
                                        }>;
                                        max_tokens?: number;
                                        temperature?: number;
                                        top_p?: number;
                                        stops?: Array<string>;
                                        presence_penalty?: number;
                                        frequency_penalty?: number;
                                        model_key?: string;
                                    };
                                    prompt_vars: Array<{
                                        var_name: string;
                                        description: string;
                                        default_val?: string;
                                        is_required?: boolean;
                                    }>;
                                };
                                key: string;
                            };
                            all_executable?: boolean;
                        };
                        params: { id: string; version: number };
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
                                data?: { sucess: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v1/task`,
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
        v2: {
            /**
             * task_evaluation.eval_record
             */
            taskEvaluationEvalRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task_evaluation.eval_record&apiName=stop&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=stop&project=llpp&resource=task_evaluation.eval_record&version=v2 document }
                 *
                 * 中止评测
                 *
                 * 指定评测记录id，中止对应的评测流程
                 */
                stop: async (
                    payload?: {
                        path: { eval_record_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/task_evaluations/eval_records/:eval_record_id/stop`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task_evaluation.eval_record&apiName=get_record&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_record&project=llpp&resource=task_evaluation.eval_record&version=v2 document }
                 *
                 * 查询评测状态
                 *
                 * 指定评测记录id（获取方式：[发起评测](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/llpp-v2/task_evaluation/create)），查询对应评测流程的完成状态。
                 */
                getRecord: async (
                    payload?: {
                        path: { eval_record_id: string };
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
                                    task_eval_record?: {
                                        id?: string;
                                        eval_status?: number;
                                        created_at?: string;
                                        updated_at?: string;
                                        eval_type?: number;
                                        eval_metrics?: string;
                                        consumed_token_num?: string;
                                        eval_set_id?: string;
                                        completed_num?: string;
                                        total_num?: string;
                                        failed_reason?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/task_evaluations/eval_records/:eval_record_id`,
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
             * task_evaluation.eval_set
             */
            taskEvaluationEvalSet: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task_evaluation.eval_set&apiName=list_set_meta&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_set_meta&project=llpp&resource=task_evaluation.eval_set&version=v2 document }
                 *
                 * 获取评测集列表
                 *
                 * 上传评测集后，可以通过该接口查看某个任务下面所有评测集的基本信息，包含文件大小，数据条数等。需要获取具体的评测集文件时，通过[下载评测数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/llpp-v2/task_evaluation/download)接口进行下载。
                 */
                listSetMeta: async (
                    payload?: {
                        params: { task_id: string };
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
                                    task_eval_data_metas: Array<{
                                        eval_set_id?: string;
                                        task_id?: string;
                                        file_name?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        file_size?: string;
                                        file_type?: number;
                                        total_num?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/task_evaluations/eval_sets/list_meta`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task_evaluation.eval_set&apiName=delete_set&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_set&project=llpp&resource=task_evaluation.eval_set&version=v2 document }
                 *
                 * 删除评测集
                 *
                 * 删除指定的评测集，任务参数有不兼容改动时，评测集可能会失效，此时可以通过该接口移除旧评测集。
                 */
                deleteSet: async (
                    payload?: {
                        path: { eval_set_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/task_evaluations/eval_sets/:eval_set_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task_evaluation.eval_set&apiName=upload&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=llpp&resource=task_evaluation.eval_set&version=v2 document }
                 *
                 * 上传评测集
                 *
                 * 根据评测集模板组织好评测数据后可以通过本接口上传评测集。评测集归属于指定的task，每个task至多可以上传10个评测集。
                 */
                upload: async (
                    payload?: {
                        data: { task_id: string; file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    eval_data_meta?: {
                                        eval_set_id?: string;
                                        task_id?: string;
                                        file_name?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        file_size?: string;
                                        file_type?: number;
                                        total_num?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/task_evaluations/eval_sets/upload`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * task_evaluation
             */
            taskEvaluation: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task_evaluation&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=llpp&resource=task_evaluation&version=v2 document }
                 *
                 * 发起评测
                 *
                 * 上传合法的评测集后，通过本接口发起评测。
                 */
                create: async (
                    payload?: {
                        data: {
                            task_id: string;
                            eval_type: number;
                            eval_set_ids: Array<string>;
                            refereeing_task_config?: {
                                task_id?: string;
                                qualifier?: string;
                                question_var_name?: string;
                                answer_var_name?: string;
                                reference_var_name?: string;
                                criteria_var_name?: string;
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
                                data?: { eval_record_ids?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/task_evaluations`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task_evaluation&apiName=download&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=llpp&resource=task_evaluation&version=v2 document }
                 *
                 * 下载评测数据
                 *
                 * 下载评测相关文件，包括评测集模板，评测集或者评测运行结果。
                 */
                download: async (
                    payload?: {
                        params: {
                            object_id: string;
                            file_type: number;
                            data_file_format: number;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/task_evaluations/download`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
                            this.logger.error(consumedError);
                            throw new Error(consumedError);
                        }
                    };

                    return {
                        writeFile: async (filePath: string) => {
                            checkIsReadable();
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
            },
            /**
             * task
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=llpp&resource=task&version=v2 document }
                 *
                 * 获取单个任务
                 *
                 * 获取已经创建的任务，返回值中包含任务的基本信息，如果需要获取对应版本的 prompt 提示词等详细信息时，可以使用[获取任务指定版本](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/llpp-v2/task-task_version/get)接口。
                 */
                get: async (
                    payload?: {
                        path: { task_id: string };
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
                                    task?: {
                                        id?: string;
                                        name?: string;
                                        description?: string;
                                        key?: string;
                                        current_version?: number;
                                        dev_version?: number;
                                        namespace_id?: string;
                                        tenant_id?: string;
                                        app_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        source?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/tasks/:task_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=llpp&resource=task&version=v2 document }
                 *
                 * 删除任务
                 *
                 * 删除已经创建的任务，需要确认当前任务已经不再使用。
                 *
                 * 谨慎使用该接口，误删会导致执行当前任务报错。
                 */
                delete: async (
                    payload?: {
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/tasks/:task_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=llpp&resource=task&version=v2 document }
                 *
                 * 更新任务
                 *
                 * 用于修改任务的 dev 版本，修改完成后可通过[发布任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/llpp-v2/task/publish)接口将 dev 版本发布为正式版本。
                 */
                update: async (
                    payload?: {
                        data?: {
                            task_name?: string;
                            task_description?: string;
                            prompt_template?: {
                                model_input_params?: {
                                    model_id?: string;
                                    model_version_id?: string;
                                    messages?: Array<{
                                        role?: "user" | "assistant" | "system";
                                        content?: string;
                                    }>;
                                    max_tokens?: number;
                                    temperature?: number;
                                    top_p?: number;
                                    stops?: Array<string>;
                                    presence_penalty?: number;
                                    frequency_penalty?: number;
                                };
                                prompt_vars?: Array<{
                                    var_name?: string;
                                    description?: string;
                                    default_val?: string;
                                    is_required?: boolean;
                                    type?: number;
                                }>;
                            };
                        };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/tasks/:task_id`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=llpp&resource=task&version=v2 document }
                 *
                 * 创建任务
                 *
                 * 通过传入适用于不同场景的提示词模板（Prompt template），创建对应的提示任务（Prompt task）, 创建成功后会返回对应的任务 ID，任务 ID 可用于更新任务、发布任务、删除任务等接口，任务创建后默认生成一个 version 为 0 的 dev 版本。
                 */
                create: async (
                    payload?: {
                        data: {
                            task_name: string;
                            task_key: string;
                            task_description?: string;
                            prompt_template?: {
                                model_input_params?: {
                                    model_id?: string;
                                    model_version_id?: string;
                                    messages?: Array<{
                                        role?: "user" | "assistant" | "system";
                                        content?: string;
                                    }>;
                                    max_tokens?: number;
                                    temperature?: number;
                                    top_p?: number;
                                    stops?: Array<string>;
                                    presence_penalty?: number;
                                    frequency_penalty?: number;
                                };
                                prompt_vars?: Array<{
                                    var_name?: string;
                                    description?: string;
                                    default_val?: string;
                                    is_required?: boolean;
                                    type?: number;
                                }>;
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
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/tasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=publish&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=publish&project=llpp&resource=task&version=v2 document }
                 *
                 * 发布任务
                 *
                 * 将任务对应的 dev 版本发布为正式版本，正式版本可用于任务执行。
                 */
                publish: async (
                    payload?: {
                        data?: { publish_description?: string };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/tasks/:task_id/publish`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=llpp&resource=task&version=v2 document }
                 *
                 * 获取任务列表
                 *
                 * 获取当前应用/用户有权限的任务列表，返回值中包含任务的基本信息。
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
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
                                    tasks?: Array<{
                                        id?: string;
                                        name?: string;
                                        description?: string;
                                        key?: string;
                                        current_version?: number;
                                        dev_version?: number;
                                        namespace_id?: string;
                                        tenant_id?: string;
                                        app_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        source?: number;
                                    }>;
                                    total?: number;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/tasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=stream&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=stream&project=llpp&resource=task&version=v2 document }
                 *
                 * 执行任务
                 *
                 * 任务完成发布后，可以调用该接口执行任务，该接口会以SSE协议流式返回大模型输出的文本(文本作了base64编码)，如下所示：;```;id:D420B6E8-2F51-4235-B778-5C1C494681E8 // 任务执行的sessionID，无需关注;event:"PROCESSING" // 任务执行状态，通常情况下只会有 PROCESSING 或 FINISHED 两种取值;data:"SGVsbG8sIOS4lgoK55WM" // 生成文本的base64编码;;id:D420B6E8-2F51-4235-B778-5C1C494681E8;event:"FINISHED" // 接收到 FINISHED 时，代表任务执行完成;data:"SGVsbG8sIOS4lgjsloK55WM";;id:D420B6E8-2F51-4235-B778-5C1C494681E8;event:"FAILED, err msg:xxx" // 接收到 FAILED 时，代表任务执行失败 ;data:"";```;
                 */
                stream: async (
                    payload?: {
                        data: {
                            task_key?: string;
                            task_id?: string;
                            qualifier: string;
                            prompt_vars: Array<{
                                key?: string;
                                value?: string;
                            }>;
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
                                `${this.domain}/open-apis/llpp/v2/tasks/execute/stream`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task&apiName=execute&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=execute&project=llpp&resource=task&version=v2 document }
                 *
                 * 执行任务
                 *
                 * 任务完成发布后，可以调用该接口执行任务，该接口会同步返回大模型输出的文本。
                 */
                execute: async (
                    payload?: {
                        data: {
                            task_key?: string;
                            task_id?: string;
                            qualifier: string;
                            prompt_vars: Array<{
                                key?: string;
                                value?: string;
                            }>;
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
                                    text?: string;
                                    finish_reason?: string;
                                    usage?: {
                                        completion_tokens?: string;
                                        prompt_tokens?: string;
                                        total_tokens?: string;
                                    };
                                    session_id?: string;
                                    reasoning_content?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/tasks/execute`,
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
             * task.task_version
             */
            taskTaskVersion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task.task_version&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=llpp&resource=task.task_version&version=v2 document }
                 *
                 * 获取任务指定版本
                 *
                 * 获取任务的指定版本，返回值中包含提示词模板、模型的详细信息等。
                 */
                get: async (
                    payload?: {
                        path: { task_id: string; version_number: number };
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
                                    task_version?: {
                                        task_id?: string;
                                        version_number?: number;
                                        description?: string;
                                        prompt_template?: {
                                            model_input_params?: {
                                                model_id?: string;
                                                model_version_id?: string;
                                                messages?: Array<{
                                                    role?:
                                                        | "user"
                                                        | "assistant"
                                                        | "system";
                                                    content?: string;
                                                }>;
                                                max_tokens?: number;
                                                temperature?: number;
                                                top_p?: number;
                                                stops?: Array<string>;
                                                presence_penalty?: number;
                                                frequency_penalty?: number;
                                            };
                                            prompt_vars?: Array<{
                                                var_name?: string;
                                                description?: string;
                                                default_val?: string;
                                                is_required?: boolean;
                                                type?: number;
                                            }>;
                                        };
                                        status?: number;
                                        tenant_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/tasks/:task_id/task_versions/:version_number`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=task.task_version&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=llpp&resource=task.task_version&version=v2 document }
                 *
                 * 获取任务版本列表
                 *
                 * 获取指定任务的所有任务版本。
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { task_id: string };
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
                                    task_versions?: Array<{
                                        task_id?: string;
                                        version_number?: number;
                                        description?: string;
                                        prompt_template?: {
                                            model_input_params?: {
                                                model_id?: string;
                                                model_version_id?: string;
                                                messages?: Array<{
                                                    role?:
                                                        | "user"
                                                        | "assistant"
                                                        | "system";
                                                    content?: string;
                                                }>;
                                                max_tokens?: number;
                                                temperature?: number;
                                                top_p?: number;
                                                stops?: Array<string>;
                                                presence_penalty?: number;
                                                frequency_penalty?: number;
                                            };
                                            prompt_vars?: Array<{
                                                var_name?: string;
                                                description?: string;
                                                default_val?: string;
                                                is_required?: boolean;
                                                type?: number;
                                            }>;
                                        };
                                        status?: number;
                                        tenant_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                    }>;
                                    total?: number;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/tasks/:task_id/task_versions`,
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
             * model
             */
            model: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=llpp&resource=model&version=v2 document }
                 *
                 * 更新模型
                 *
                 * 可以对当前模型的描述进行修改，暂不支持修改模型名称。
                 */
                update: async (
                    payload?: {
                        data?: { model_description?: string };
                        path: { model_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/models/:model_id`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=llpp&resource=model&version=v2 document }
                 *
                 * 删除模型
                 *
                 * 删除已经创建的模型，如果当前模型下存在未下线的模型版本，则不允许被删除。
                 */
                delete: async (
                    payload?: {
                        path: { model_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/models/:model_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=llpp&resource=model&version=v2 document }
                 *
                 * 创建模型
                 *
                 * 通过传入名称、描述来创建模型，创建成功后会返回模型 ID。
                 */
                create: async (
                    payload?: {
                        data: {
                            model_name: string;
                            model_description?: string;
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
                                data?: { model_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/models`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=llpp&resource=model&version=v2 document }
                 *
                 * 获取模型
                 *
                 * 获取模型的基本信息，不包括模型版本的相关信息。
                 */
                get: async (
                    payload?: {
                        path: { model_id: string };
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
                                    model?: {
                                        id?: string;
                                        name?: string;
                                        description?: string;
                                        tenant_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        version_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/models/:model_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=llpp&resource=model&version=v2 document }
                 *
                 * 获取模型列表
                 *
                 * 获取用户/应用有权限的模型列表，返回模型相关信息。
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
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
                                    models?: Array<{
                                        id?: string;
                                        name?: string;
                                        description?: string;
                                        tenant_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        version_count?: number;
                                    }>;
                                    total?: number;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/models`,
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
             * model_version
             */
            modelVersion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model_version&apiName=activate&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=activate&project=llpp&resource=model_version&version=v2 document }
                 *
                 * 上架模型版本
                 *
                 * 将指定模型版本进行上架，上架后可在创建任务时指定该模型版本作为推理模型。
                 */
                activate: async (
                    payload?: {
                        path: { model_version_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/model_versions/:model_version_id/activate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model_version&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=llpp&resource=model_version&version=v2 document }
                 *
                 * 删除模型版本
                 *
                 * 删除指定的模型版本，待删除的模型版本必须是已经下线的版本。
                 */
                delete: async (
                    payload?: {
                        path: { model_version_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/model_versions/:model_version_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model_version&apiName=deactivate&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=deactivate&project=llpp&resource=model_version&version=v2 document }
                 *
                 * 下线模型版本
                 *
                 * 下线指定的模型版本，同时必须要指定替换模型，下线后使用该模型版本的任务会使用替换模型进行推理。
                 */
                deactivate: async (
                    payload?: {
                        data?: {
                            replacement?: {
                                model_id?: string;
                                model_version_id?: string;
                            };
                        };
                        path: { model_version_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/model_versions/:model_version_id/deactivate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model_version&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=llpp&resource=model_version&version=v2 document }
                 *
                 * 创建模型版本
                 *
                 * 在指定模型下创建模型版本，需要设置模型的输入输出限制方式，并提供调用的相关参数，进行创建时，会尝试向指定的地址发起推理请求，请求成功后才会创建成功，否则创建失败。
                 */
                create: async (
                    payload?: {
                        data: {
                            model_version_name: string;
                            model_version_meta?: {
                                input_price?: number;
                                output_price?: number;
                                limitation_config?: {
                                    model_limitation_type?: number;
                                    total_input_output_length_limit?: number;
                                    input_length_limit?: number;
                                    output_length_limit?: number;
                                    system_length_limit?: number;
                                };
                                oneapi_payload?: {
                                    channel_type?: string;
                                    name?: string;
                                    endpoint_id?: string;
                                    api_base?: string;
                                    api_key?: string;
                                    ak?: string;
                                    sk?: string;
                                    method?: string;
                                };
                            };
                        };
                        params: { model_id: string };
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
                                data?: { model_version_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/model_versions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model_version&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=llpp&resource=model_version&version=v2 document }
                 *
                 * 获取模型版本列表
                 *
                 * 获取指定模型的所有模型版本列表，如未指定需要获取的数量，默认返回 20 条数据。
                 */
                list: async (
                    payload?: {
                        params: {
                            model_id: string;
                            model_version_status?: number;
                            page_size?: number;
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
                                    model_versions?: Array<{
                                        id?: string;
                                        name?: string;
                                        type?: number;
                                        status?: number;
                                        un_publish_at?: string;
                                        tenant_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        model_id?: string;
                                        meta?: {
                                            input_price?: number;
                                            output_price?: number;
                                            limitation_config?: {
                                                model_limitation_type?: number;
                                                total_input_output_length_limit?: number;
                                                input_length_limit?: number;
                                                output_length_limit?: number;
                                                system_length_limit?: number;
                                            };
                                            oneapi_payload?: {
                                                channel_type?: string;
                                                name?: string;
                                                endpoint_id?: string;
                                                api_base?: string;
                                                api_key?: string;
                                                ak?: string;
                                                sk?: string;
                                                method?: string;
                                            };
                                        };
                                    }>;
                                    total?: number;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/model_versions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=model_version&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=llpp&resource=model_version&version=v2 document }
                 *
                 * 更新模型版本
                 *
                 * 更新未上线的模型版本的相关参数，发起请求时会尝试向指定的地址发起推理请求，请求成功后才会更新成功，否则更新失败。
                 */
                update: async (
                    payload?: {
                        data?: {
                            model_version_meta?: {
                                input_price?: number;
                                output_price?: number;
                                limitation_config?: {
                                    model_limitation_type?: number;
                                    total_input_output_length_limit?: number;
                                    input_length_limit?: number;
                                    output_length_limit?: number;
                                    system_length_limit?: number;
                                };
                                oneapi_payload?: {
                                    channel_type?: string;
                                    name?: string;
                                    endpoint_id?: string;
                                    api_base?: string;
                                    api_key?: string;
                                    ak?: string;
                                    sk?: string;
                                    method?: string;
                                };
                            };
                        };
                        path: { model_version_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/model_versions/:model_version_id`,
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
             * permission
             */
            permission: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=permission&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=llpp&resource=permission&version=v2 document }
                 */
                get: async (
                    payload?: {
                        params: { resource_type: number };
                        path: { resource_id: string };
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
                                    permission?: {
                                        resource_id?: string;
                                        resource_type?: number;
                                        app_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/llpp/v2/permissions/:resource_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=llpp&resource=permission&apiName=add_app&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_app&project=llpp&resource=permission&version=v2 document }
                 */
                addApp: async (
                    payload?: {
                        data?: { app_ids?: Array<string> };
                        params: { resource_type: number };
                        path: { resource_id: string };
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
                                `${this.domain}/open-apis/llpp/v2/permissions/:resource_id/add_app`,
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
