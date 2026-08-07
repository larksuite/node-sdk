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
import optical_char_recognition from "./optical_char_recognition";

// auto gen
export default abstract class Client extends optical_char_recognition {
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
    partner_ai = {
        v1: {
            /**
             * tenant_ai_item
             */
            tenantAiItem: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=partner_ai&resource=tenant_ai_item&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=partner_ai&resource=tenant_ai_item&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: { user_id?: string; user_id_type?: string };
                        path: { tenant_ai_item_id: string };
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
                                    tenant_ai_item?: {
                                        id: string;
                                        enabled: boolean;
                                        user_quota?: number;
                                        ai_package_purchased?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/partner_ai/v1/tenant_ai_items/:tenant_ai_item_id`,
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
             * credential
             */
            credential: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=partner_ai&resource=credential&apiName=apply&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=apply&project=partner_ai&resource=credential&version=v1 document }
                 *
                 * 获取上报凭证
                 */
                apply: async (
                    payload?: {
                        data: {
                            ai_item_id: string;
                            trace_id: string;
                            expected_quota?: number;
                            user_id?: string;
                        };
                        params?: { user_id_type?: string };
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
                                data?: { token: string; expired_at: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/partner_ai/v1/credential/apply`,
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
             * tenant_quota
             */
            tenantQuota: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=partner_ai&resource=tenant_quota&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=partner_ai&resource=tenant_quota&version=v1 document }
                 */
                get: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    tenant_quota?: {
                                        sufficient?: boolean;
                                        quota?: number;
                                        ai_package_purchased?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/partner_ai/v1/tenant_quota`,
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
             * usage_record
             */
            usageRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=partner_ai&resource=usage_record&apiName=report&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=report&project=partner_ai&resource=usage_record&version=v1 document }
                 */
                report: async (
                    payload?: {
                        data: {
                            report_token: string;
                            record: {
                                ai_item_id: string;
                                trace_id: string;
                                client_info?: {
                                    client_ip?: string;
                                    user_agent?: string;
                                };
                                usage_amount: {
                                    type?: string;
                                    credit?: number;
                                    minute?: number;
                                };
                                details: string;
                                reconcile_ref?: string;
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
                                data?: { id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/partner_ai/usage_records/report`,
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
