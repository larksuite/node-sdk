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
import attendance from "./attendance";

// auto gen
export default abstract class Client extends attendance {
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
    audio_video_ai = {
        v1: {
            /**
             * meeting_assistance
             */
            meetingAssistance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=audio_video_ai&resource=meeting_assistance&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=audio_video_ai&resource=meeting_assistance&version=v1 document }
                 *
                 * 查询会议助手任务结果
                 *
                 * 查询通过[提交会议助手请求](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/audio_video_ai-v1/meeting_assistance/create)接口提交的任务分析结果。
                 */
                get: async (
                    payload?: {
                        params?: { task_id?: string };
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
                                    actions?: Array<{
                                        content?: string;
                                        transcript_ids?: Array<string>;
                                        executor?: string;
                                        start_time?: number;
                                        execution_time?: string;
                                    }>;
                                    paragraph?: { data?: string };
                                    chapter_summaries?: Array<{
                                        start_time?: number;
                                        end_time?: number;
                                        title?: string;
                                        summary?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/audio_video_ai/v1/meeting_assistance`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=audio_video_ai&resource=meeting_assistance&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=audio_video_ai&resource=meeting_assistance&version=v1 document }
                 *
                 * 提交会议助手请求
                 *
                 * 提交一个会议助手分析生成的请求，输出总结、待办和章节纪要
                 */
                create: async (
                    payload?: {
                        data: {
                            transcripts: Array<{
                                paragraph_id?: number;
                                start_ms?: number;
                                end_ms?: number;
                                sentences?: Array<{
                                    sentence_id?: number;
                                    content?: string;
                                    lang?: string;
                                    start_ms?: number;
                                    stop_ms?: number;
                                    user_id?: string;
                                    device_id?: number;
                                    user_type?: number;
                                    user_name?: string;
                                }>;
                            }>;
                            topic?: string;
                            duration: string;
                            object_id?: string;
                            operator_id: string;
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
                                `${this.domain}/open-apis/audio_video_ai/v1/meeting_assistance`,
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
             * media_analysis_task
             */
            mediaAnalysisTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=audio_video_ai&resource=media_analysis_task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=audio_video_ai&resource=media_analysis_task&version=v1 document }
                 *
                 * 查询音视频任务处理结果
                 *
                 * 可对音频/视频进行语音转写，转写结果翻译，生成全文总结，章节总结，会议todo。（限时免费试用：单租户总试用额度 30 小时。免费版不支持调用。）
                 */
                get: async (
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
                                    data?: {
                                        task_status?:
                                            | "running"
                                            | "success"
                                            | "failed"
                                            | "unknown";
                                        data?: {
                                            audio_transcription?: string;
                                            translation?: string;
                                            information_extraction?: string;
                                            summarization?: string;
                                            chapter?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/audio_video_ai/v1/media_analysis_task`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=audio_video_ai&resource=media_analysis_task&apiName=submit&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=submit&project=audio_video_ai&resource=media_analysis_task&version=v1 document }
                 *
                 * 提交音视频处理任务
                 *
                 * 可对音频/视频进行语音转写，转写结果翻译，生成全文总结，章节总结，会议todo。（限时免费试用：单租户总试用额度 30 小时，1 QPM 限流。免费版不支持调用。）
                 */
                submit: async (
                    payload?: {
                        data: {
                            input: {
                                offline?: {
                                    file_url: string;
                                    file_type: "audio" | "video" | "text";
                                };
                            };
                            params: {
                                automatic_identification_lang_enabled: boolean;
                                audio_transcription_enabled: boolean;
                                translation_enabled: boolean;
                                information_extraction_enabled: boolean;
                                summarization_enabled: boolean;
                                chapter_enabled: boolean;
                                source_lang?: "zh_cn" | "en_us" | "ja_jp";
                                audio_transcription_params?: {
                                    speaker_identification_enabled: boolean;
                                    number_of_speakers?: number;
                                };
                                translation_params?: {
                                    target_lang: "zh_cn" | "en_us" | "ja_jp";
                                };
                                information_extraction_params?: {
                                    types: Array<
                                        | "todo_list"
                                        | "question"
                                        | "transition"
                                        | "monologue"
                                    >;
                                };
                                summarization_params?: {
                                    types: Array<"summary">;
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
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/audio_video_ai/v1/media_analysis_task/submit`,
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
             * common_analysis_task
             */
            commonAnalysisTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=audio_video_ai&resource=common_analysis_task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=audio_video_ai&resource=common_analysis_task&version=v1 document }
                 *
                 * 查询任务信息
                 */
                get: async (
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
                                    common_analysis_task?: {
                                        task_id?: string;
                                        business_id?: string;
                                        task_status?: string;
                                        task_code?: number;
                                        task_message?: string;
                                        result?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/audio_video_ai/v1/common_analysis_task`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=audio_video_ai&resource=common_analysis_task&apiName=submit&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=submit&project=audio_video_ai&resource=common_analysis_task&version=v1 document }
                 *
                 * 媒体分析任务提交
                 */
                submit: async (
                    payload?: {
                        data: {
                            pipeline_id: number;
                            business_id: string;
                            event_notification: boolean;
                            input: string;
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
                                    task_id?: string;
                                    business_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/audio_video_ai/v1/common_analysis_task/submit`,
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
