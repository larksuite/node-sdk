import identity from "lodash.identity";
import pickBy from "lodash.pickby";
import get from "lodash.get";
import fs from "fs";
import { fillApiPath } from "@node-sdk/utils";
import { Logger } from "@node-sdk/typings";
import { formatErrors } from "@node-sdk/client/utils";
import { IRequestOptions } from "@node-sdk/code-gen/types";
import { IPayload } from "@node-sdk/client/types";
import { HttpInstance } from "@node-sdk/typings/http";
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
     * AI能力
     */
    speech_to_text = {
        /**
         * 语音识别
         */
        speech: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=speech_to_text&resource=speech&apiName=file_recognize&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/file_recognize document }
             *
             * 语音文件识别 (ASR)
             *
             * 语音文件识别接口，上传整段语音文件进行一次性识别。接口适合 60 秒以内音频识别
             *
             * 单租户限流：20QPS，同租户下的应用没有限流，共享本租户的 20QPS 限流
             */
            fileRecognize: async (
                payload?: {
                    data: {
                        speech: { speech?: string };
                        config: {
                            file_id: string;
                            format: string;
                            engine_type: string;
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
                            data?: { recognition_text: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/speech_to_text/v1/speech/file_recognize`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=speech_to_text&resource=speech&apiName=stream_recognize&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/stream_recognize document }
             *
             * 语音流式识别 (ASR)
             *
             * 语音流式接口，将整个音频文件分片进行传入模型。能够实时返回数据。建议每个音频分片的大小为 100-200ms
             *
             * 单租户限流：20 路（一个 stream_id 称为一路会话），同租户下的应用没有限流，共享本租户的 20路限流
             */
            streamRecognize: async (
                payload?: {
                    data: {
                        speech: { speech?: string };
                        config: {
                            stream_id: string;
                            sequence_id: number;
                            action: number;
                            format: string;
                            engine_type: string;
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
                                stream_id: string;
                                sequence_id: number;
                                recognition_text: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/speech_to_text/v1/speech/stream_recognize`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        v1: {
            /**
             * 语音识别
             */
            speech: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=speech_to_text&resource=speech&apiName=file_recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/file_recognize document }
                 *
                 * 语音文件识别 (ASR)
                 *
                 * 语音文件识别接口，上传整段语音文件进行一次性识别。接口适合 60 秒以内音频识别
                 *
                 * 单租户限流：20QPS，同租户下的应用没有限流，共享本租户的 20QPS 限流
                 */
                fileRecognize: async (
                    payload?: {
                        data: {
                            speech: { speech?: string };
                            config: {
                                file_id: string;
                                format: string;
                                engine_type: string;
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
                                data?: { recognition_text: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/speech_to_text/v1/speech/file_recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=speech_to_text&resource=speech&apiName=stream_recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/stream_recognize document }
                 *
                 * 语音流式识别 (ASR)
                 *
                 * 语音流式接口，将整个音频文件分片进行传入模型。能够实时返回数据。建议每个音频分片的大小为 100-200ms
                 *
                 * 单租户限流：20 路（一个 stream_id 称为一路会话），同租户下的应用没有限流，共享本租户的 20路限流
                 */
                streamRecognize: async (
                    payload?: {
                        data: {
                            speech: { speech?: string };
                            config: {
                                stream_id: string;
                                sequence_id: number;
                                action: number;
                                format: string;
                                engine_type: string;
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
                                    stream_id: string;
                                    sequence_id: number;
                                    recognition_text: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/speech_to_text/v1/speech/stream_recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
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
