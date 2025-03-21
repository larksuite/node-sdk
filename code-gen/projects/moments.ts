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
import { Readable } from "stream";
import { stringify } from "qs";
import minutes from "./minutes";

// auto gen
export default abstract class Client extends minutes {
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
    moments = {
        /**
         * post
         */
        post: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=post&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=moments&resource=post&version=v1 document }
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { post_id: string };
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
                                post?: {
                                    user_id?: string;
                                    content: string;
                                    image_key_list?: Array<string>;
                                    media_file_token?: string;
                                    comment_count?: number;
                                    reaction_set?: {
                                        reactions?: Array<{
                                            type?: string;
                                            count?: number;
                                        }>;
                                        total_count?: number;
                                    };
                                    id?: string;
                                    create_time?: string;
                                    media_cover_image_key?: string;
                                    category_ids?: Array<string>;
                                    link?: string;
                                    user_type?: number;
                                    dislike_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/posts/:post_id`,
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
        v1: {
            /**
             * post
             */
            post: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=post&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=moments&resource=post&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { post_id: string };
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
                                    post?: {
                                        user_id?: string;
                                        content: string;
                                        image_key_list?: Array<string>;
                                        media_file_token?: string;
                                        comment_count?: number;
                                        reaction_set?: {
                                            reactions?: Array<{
                                                type?: string;
                                                count?: number;
                                            }>;
                                            total_count?: number;
                                        };
                                        id?: string;
                                        create_time?: string;
                                        media_cover_image_key?: string;
                                        category_ids?: Array<string>;
                                        link?: string;
                                        user_type?: number;
                                        dislike_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/moments/v1/posts/:post_id`,
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
