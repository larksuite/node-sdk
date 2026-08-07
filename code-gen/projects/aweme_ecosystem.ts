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
import authz from "./authz";

// auto gen
export default abstract class Client extends authz {
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
    aweme_ecosystem = {
        /**
         * aweme_user
         */
        awemeUser: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=aweme_ecosystem&resource=aweme_user&apiName=get_bind_info&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_bind_info&project=aweme_ecosystem&resource=aweme_user&version=v1 document }
             *
             * 获取绑定抖音用户信息
             *
             * 获取绑定信息;;适用于获取飞书账号是否为“抖音员工号”运营者。
             */
            getBindInfo: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "open_id" | "union_id";
                        user_id?: string;
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
                                aweme_user?: {
                                    aweme_user_id?: string;
                                    user_id?: string;
                                    is_binded?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/aweme_ecosystem/v1/aweme_users/get_bind_info`,
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
             * aweme_user
             */
            awemeUser: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aweme_ecosystem&resource=aweme_user&apiName=get_bind_info&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_bind_info&project=aweme_ecosystem&resource=aweme_user&version=v1 document }
                 *
                 * 获取绑定抖音用户信息
                 *
                 * 获取绑定信息;;适用于获取飞书账号是否为“抖音员工号”运营者。
                 */
                getBindInfo: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "open_id" | "union_id";
                            user_id?: string;
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
                                    aweme_user?: {
                                        aweme_user_id?: string;
                                        user_id?: string;
                                        is_binded?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aweme_ecosystem/v1/aweme_users/get_bind_info`,
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
