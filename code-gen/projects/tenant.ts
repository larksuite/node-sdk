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
     * 企业信息
     */
    tenant = {
        /**
         * tenant.product_assign_info
         */
        tenantProductAssignInfo: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=tenant.product_assign_info&apiName=query&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=tenant&resource=tenant.product_assign_info&version=v2 document }
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 企业信息
         */
        tenant: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=tenant&apiName=query&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant/query document }
             *
             * 获取企业信息
             *
             * 获取企业名称、企业编号等企业信息
             *
             * 如果ISV应用是企业创建时默认安装，并且180天内企业未打开或使用过此应用，则无法通过此接口获取到企业信息。
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
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        v2: {
            /**
             * tenant.product_assign_info
             */
            tenantProductAssignInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=tenant.product_assign_info&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=tenant&resource=tenant.product_assign_info&version=v2 document }
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
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 企业信息
             */
            tenant: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=tenant&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant/query document }
                 *
                 * 获取企业信息
                 *
                 * 获取企业名称、企业编号等企业信息
                 *
                 * 如果ISV应用是企业创建时默认安装，并且180天内企业未打开或使用过此应用，则无法通过此接口获取到企业信息。
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
