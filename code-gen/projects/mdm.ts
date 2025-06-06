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
        v3: {
            /**
             * batch_country_region
             */
            batchCountryRegion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=batch_country_region&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=batch_country_region&version=v3 document }
                 *
                 * 查询国家 / 地区
                 */
                get: async (
                    payload?: {
                        data?: { common?: { tenant_id?: string } };
                        params: {
                            fields: Array<string>;
                            ids: Array<string>;
                            languages: Array<string>;
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
                                    data?: Array<{
                                        alpha_3_code?: string;
                                        alpha_2_code?: string;
                                        numeric_code?: string;
                                        name?: {
                                            value?: string;
                                            multilingual_value?: Record<
                                                string,
                                                string
                                            >;
                                            return_language?: string;
                                        };
                                        mdm_code?: string;
                                        full_name?: {
                                            value?: string;
                                            multilingual_value?: Record<
                                                string,
                                                string
                                            >;
                                            return_language?: string;
                                        };
                                        global_code?: string;
                                        status?: string;
                                        continents?: {
                                            value: string;
                                            multilingual_name?: Record<
                                                string,
                                                string
                                            >;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v3/batch_country_region`,
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
             * country_region
             */
            countryRegion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=country_region&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mdm&resource=country_region&version=v3 document }
                 *
                 * 搜索国家 / 地区
                 */
                list: async (
                    payload?: {
                        data?: {
                            filter?: {
                                logic: string;
                                expressions?: Array<{
                                    field: string;
                                    operator: string;
                                    value: {
                                        string_value?: string;
                                        bool_value?: boolean;
                                        int_value?: string;
                                        string_list_value?: Array<string>;
                                        int_list_value?: Array<string>;
                                    };
                                }>;
                            };
                            common?: { tenant_id?: string };
                        };
                        params: {
                            languages: Array<string>;
                            fields: Array<string>;
                            limit?: number;
                            offset?: number;
                            return_count?: boolean;
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
                                    data?: Array<{
                                        alpha_3_code?: string;
                                        alpha_2_code?: string;
                                        numeric_code?: string;
                                        name?: {
                                            value?: string;
                                            multilingual_value?: Record<
                                                string,
                                                string
                                            >;
                                            return_language?: string;
                                        };
                                        mdm_code?: string;
                                        full_name?: {
                                            value?: string;
                                            multilingual_value?: Record<
                                                string,
                                                string
                                            >;
                                            return_language?: string;
                                        };
                                        global_code?: string;
                                        status?: string;
                                        continents?: {
                                            value: string;
                                            multilingual_name?: Record<
                                                string,
                                                string
                                            >;
                                        };
                                    }>;
                                    total?: string;
                                    next_page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v3/country_regions`,
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
