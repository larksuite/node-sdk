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
import exam from "./exam";

// auto gen
export default abstract class Client extends exam {
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
    face_detection = {
        /**
         * image
         */
        image: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=face_detection&resource=image&apiName=detect_face_attributes&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=detect_face_attributes&project=face_detection&resource=image&version=v1 document }
             *
             * 检测人脸并进行属性分析
             *
             * 检测图片中的人脸属性和质量等信息。
             *
             * 注意：返回值为 -1 表示该功能还暂未实现
             */
            detectFaceAttributes: async (
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
                            data?: {
                                image_info: { width?: number; height?: number };
                                face_infos: Array<{
                                    position?: {
                                        upper_left: { x: number; y: number };
                                        lower_right: { x: number; y: number };
                                    };
                                    attribute?: {
                                        gender?: {
                                            type: number;
                                            probability: number;
                                        };
                                        age?: number;
                                        emotion?: {
                                            type: number;
                                            probability: number;
                                        };
                                        beauty?: number;
                                        pose?: {
                                            pitch?: number;
                                            yaw?: number;
                                            roll?: number;
                                        };
                                        hat?: {
                                            type: number;
                                            probability: number;
                                        };
                                        glass?: {
                                            type: number;
                                            probability: number;
                                        };
                                        mask?: {
                                            type: number;
                                            probability: number;
                                        };
                                    };
                                    quality?: {
                                        sharpness?: number;
                                        brightness?: number;
                                        occlude?: {
                                            eyebrow?: number;
                                            nose?: number;
                                            cheek?: number;
                                            mouth?: number;
                                            chin?: number;
                                            left_eye?: number;
                                            right_eye?: number;
                                        };
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/face_detection/v1/image/detect_face_attributes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=face_detection&resource=image&apiName=detect_face_attributes&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=detect_face_attributes&project=face_detection&resource=image&version=v1 document }
                 *
                 * 检测人脸并进行属性分析
                 *
                 * 检测图片中的人脸属性和质量等信息。
                 *
                 * 注意：返回值为 -1 表示该功能还暂未实现
                 */
                detectFaceAttributes: async (
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
                                data?: {
                                    image_info: {
                                        width?: number;
                                        height?: number;
                                    };
                                    face_infos: Array<{
                                        position?: {
                                            upper_left: {
                                                x: number;
                                                y: number;
                                            };
                                            lower_right: {
                                                x: number;
                                                y: number;
                                            };
                                        };
                                        attribute?: {
                                            gender?: {
                                                type: number;
                                                probability: number;
                                            };
                                            age?: number;
                                            emotion?: {
                                                type: number;
                                                probability: number;
                                            };
                                            beauty?: number;
                                            pose?: {
                                                pitch?: number;
                                                yaw?: number;
                                                roll?: number;
                                            };
                                            hat?: {
                                                type: number;
                                                probability: number;
                                            };
                                            glass?: {
                                                type: number;
                                                probability: number;
                                            };
                                            mask?: {
                                                type: number;
                                                probability: number;
                                            };
                                        };
                                        quality?: {
                                            sharpness?: number;
                                            brightness?: number;
                                            occlude?: {
                                                eyebrow?: number;
                                                nose?: number;
                                                cheek?: number;
                                                mouth?: number;
                                                chin?: number;
                                                left_eye?: number;
                                                right_eye?: number;
                                            };
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/face_detection/v1/image/detect_face_attributes`,
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
