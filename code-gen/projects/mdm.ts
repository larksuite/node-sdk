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
import mail from "./mail";

// auto gen
export default abstract class Client extends mail {
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
     * 主数据
     */
    mdm = {
        /**
         * 数据维度
         */
        userAuthDataRelation: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=user_auth_data_relation&apiName=bind&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/bind document }
             *
             * 用户数据维度绑定
             *
             * 通过该接口，可为指定应用下的用户绑定一类数据维度，支持批量给多个用户同时增量授权。
             */
            bind: async (
                payload?: {
                    data: {
                        root_dimension_type: string;
                        sub_dimension_types: Array<string>;
                        authorized_user_ids: Array<string>;
                        uams_app_id: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/user_auth_data_relations/bind`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=user_auth_data_relation&apiName=unbind&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/unbind document }
             *
             * 用户数据维度解绑
             *
             * 通过该接口，可为指定应用下的指定用户解除一类数据维度。
             */
            unbind: async (
                payload?: {
                    data: {
                        root_dimension_type: string;
                        sub_dimension_types: Array<string>;
                        authorized_user_ids: Array<string>;
                        uams_app_id: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/user_auth_data_relations/unbind`,
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
             * 数据维度
             */
            userAuthDataRelation: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=user_auth_data_relation&apiName=bind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/bind document }
                 *
                 * 用户数据维度绑定
                 *
                 * 通过该接口，可为指定应用下的用户绑定一类数据维度，支持批量给多个用户同时增量授权。
                 */
                bind: async (
                    payload?: {
                        data: {
                            root_dimension_type: string;
                            sub_dimension_types: Array<string>;
                            authorized_user_ids: Array<string>;
                            uams_app_id: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/mdm/v1/user_auth_data_relations/bind`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=user_auth_data_relation&apiName=unbind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/unbind document }
                 *
                 * 用户数据维度解绑
                 *
                 * 通过该接口，可为指定应用下的指定用户解除一类数据维度。
                 */
                unbind: async (
                    payload?: {
                        data: {
                            root_dimension_type: string;
                            sub_dimension_types: Array<string>;
                            authorized_user_ids: Array<string>;
                            uams_app_id: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/mdm/v1/user_auth_data_relations/unbind`,
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
