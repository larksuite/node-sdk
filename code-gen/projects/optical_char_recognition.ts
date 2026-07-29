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
import okr from "./okr";

// auto gen
export default abstract class Client extends okr {
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
    optical_char_recognition = {
        /**
         * image
         */
        image: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=optical_char_recognition&resource=image&apiName=basic_recognize&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=basic_recognize&project=optical_char_recognition&resource=image&version=v1 document }
             *
             * 识别图片中的文字
             *
             * 可识别图片中的文字，按图片中的区域划分，分段返回文本列表。文件大小需小于5M。
             */
            basicRecognize: async (
                payload?: {
                    data?: { image?: string };
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
                            data?: { text_list: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/optical_char_recognition/v1/image/basic_recognize`,
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
             * image
             */
            image: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=optical_char_recognition&resource=image&apiName=basic_recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=basic_recognize&project=optical_char_recognition&resource=image&version=v1 document }
                 *
                 * 识别图片中的文字
                 *
                 * 可识别图片中的文字，按图片中的区域划分，分段返回文本列表。文件大小需小于5M。
                 */
                basicRecognize: async (
                    payload?: {
                        data?: { image?: string };
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
                                data?: { text_list: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/optical_char_recognition/v1/image/basic_recognize`,
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
