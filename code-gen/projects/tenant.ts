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
import task from "./task";

// auto gen
export default abstract class Client extends task {
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
    tenant = {
        tenant: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=tenant&apiName=query&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=tenant&resource=tenant&version=v2 document }
             *
             * 获取企业信息
             *
             * 获取企业名称、企业编号等企业信息
             */
            query: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                tenant?: {
                                    name: string;
                                    display_id: string;
                                    tenant_tag: number;
                                    tenant_key: string;
                                    avatar: {
                                        avatar_origin?: string;
                                        avatar_72?: string;
                                        avatar_240?: string;
                                        avatar_640?: string;
                                    };
                                    domain?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/tenant/v2/tenant/query`,
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
        tenantProductAssignInfo: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=tenant.product_assign_info&apiName=query&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=tenant&resource=tenant.product_assign_info&version=v2 document }
             *
             * 获取企业席位信息
             *
             * 获取租户下待分配的席位列表（仅返回未满的席位），包含席位名称、席位ID、数量及对应有效期。;返回的待分配席位范围为：​;1. 客户当前已订阅且处于生效状态的席位（注：不包含增购的、尚未生效的未来席位）；​;2. 客户已订阅且未来生效的全新订阅席位。​;;即增购的未来席位不在本接口返回的待分配席位列表范围内。
             */
            query: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                assign_info_list?: Array<{
                                    subscription_id?: string;
                                    license_plan_key?: string;
                                    product_name?: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                    total_seats?: string;
                                    assigned_seats?: string;
                                    start_time?: string;
                                    end_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/tenant/v2/tenant/assign_info_list/query`,
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
             * company_info
             */
            companyInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=company_info&apiName=info_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=info_get&project=tenant&resource=company_info&version=v1 document }
                 */
                infoGet: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    name?: string;
                                    id?: string;
                                    industry?: string;
                                    scale?: string;
                                    domain?: string;
                                    contact?: {
                                        name?: string;
                                        email?: string;
                                        mobile?: string;
                                        telephone?: string;
                                        postcode?: string;
                                        address?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/tenant/v1/info/get`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=company_info&apiName=info_patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=info_patch&project=tenant&resource=company_info&version=v1 document }
                 */
                infoPatch: async (
                    payload?: {
                        data?: {
                            name?: string;
                            contact?: {
                                name?: string;
                                email?: string;
                                mobile?: string;
                                telephone?: string;
                                postcode?: string;
                                address?: string;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/tenant/v1/info/patch`,
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
        v2: {
            /**
             * tenant
             */
            tenant: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=tenant&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=tenant&resource=tenant&version=v2 document }
                 *
                 * 获取企业信息
                 *
                 * 获取企业名称、企业编号等企业信息
                 */
                query: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    tenant?: {
                                        name: string;
                                        display_id: string;
                                        tenant_tag: number;
                                        tenant_key: string;
                                        avatar: {
                                            avatar_origin?: string;
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                        };
                                        domain?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/tenant/v2/tenant/query`,
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
             * tenant.product_assign_info
             */
            tenantProductAssignInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=tenant.product_assign_info&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=tenant&resource=tenant.product_assign_info&version=v2 document }
                 *
                 * 获取企业席位信息
                 *
                 * 获取租户下待分配的席位列表（仅返回未满的席位），包含席位名称、席位ID、数量及对应有效期。;返回的待分配席位范围为：​;1. 客户当前已订阅且处于生效状态的席位（注：不包含增购的、尚未生效的未来席位）；​;2. 客户已订阅且未来生效的全新订阅席位。​;;即增购的未来席位不在本接口返回的待分配席位列表范围内。
                 */
                query: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    assign_info_list?: Array<{
                                        subscription_id?: string;
                                        license_plan_key?: string;
                                        product_name?: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        total_seats?: string;
                                        assigned_seats?: string;
                                        start_time?: string;
                                        end_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/tenant/v2/tenant/assign_info_list/query`,
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
