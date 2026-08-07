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
import myai_memory_reflection from "./myai_memory_reflection";

// auto gen
export default abstract class Client extends myai_memory_reflection {
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
    myai_scenario_summary = {
        v1: {
            /**
             * ai_summary
             */
            aiSummary: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_scenario_summary&resource=ai_summary&apiName=recall_knowledge&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recall_knowledge&project=myai_scenario_summary&resource=ai_summary&version=v1 document }
                 */
                recallKnowledge: async (
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
                                extra?: { model_key?: string };
                            };
                            query?: string;
                            entity_ids?: string;
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
                                    result?: { knowledge_result?: string };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_scenario_summary/v1/ai_summary/recall_knowledge`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_scenario_summary&resource=ai_summary&apiName=summarize_entities&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=summarize_entities&project=myai_scenario_summary&resource=ai_summary&version=v1 document }
                 */
                summarizeEntities: async (
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
                                extra?: { model_key?: string };
                            };
                            entity_ids?: string;
                            need_separate_summarize?: string;
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
                                data?: { result?: { summary_result?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_scenario_summary/v1/ai_summary/summarize_entities`,
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
