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
import grounding from "./grounding";

// auto gen
export default abstract class Client extends grounding {
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
    gtm_ai = {
        v1: {
            /**
             * cluster_task
             */
            clusterTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=gtm_ai&resource=cluster_task&apiName=state&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=state&project=gtm_ai&resource=cluster_task&version=v1 document }
                 *
                 * 查询聚类任务
                 *
                 * 根据提交聚类任务接口返回的任务id，查询任务的运行状态 待运行/运行中/已完成/失败
                 */
                state: async (
                    payload?: {
                        data?: { task_id?: string };
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
                                data?: { task_id?: string; state?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/gtm_ai/v1/cluster_task/state`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=gtm_ai&resource=cluster_task&apiName=submit&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=submit&project=gtm_ai&resource=cluster_task&version=v1 document }
                 *
                 * 提交聚类任务
                 *
                 * 提交问题与对应业务域的知识、用例，将问题按业务域内的特征进行聚类、分组
                 */
                submit: async (
                    payload?: {
                        data?: {
                            questions?: Array<{
                                question: string;
                                question_id?: string;
                            }>;
                            hierarchy_level?: number;
                            domain_knowledge?: string;
                            examples?: Array<{
                                input: string;
                                cluster_label: string;
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
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/gtm_ai/v1/cluster_task/submit`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=gtm_ai&resource=cluster_task&apiName=result&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=result&project=gtm_ai&resource=cluster_task&version=v1 document }
                 *
                 * 获取聚类结果
                 *
                 * 通过提交聚类任务接口返回的task_id，查询聚类的结果;#### 调用顺序：;需先调用[提交聚类任务](https://open.larkoffice.com/document/ai/gtm_ai-v1/cluster_task/submit)接口获取任务id，待任务完成后再调用本接口查询已完成的聚类结果。
                 */
                result: async (
                    payload?: {
                        data?: { task_id?: string };
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
                                    cluster_results?: Array<{
                                        question: string;
                                        cluster: string;
                                        cluster_question_count: number;
                                        question_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/gtm_ai/v1/cluster_task/result`,
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
