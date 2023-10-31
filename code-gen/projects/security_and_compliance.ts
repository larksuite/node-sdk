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
import search from "./search";

// auto gen
export default abstract class Client extends search {
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
    security_and_compliance = {
        /**
         * openapi_log
         */
        openapiLog: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=openapi_log&apiName=list_data&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_data&project=security_and_compliance&resource=openapi_log&version=v1 document }
             */
            listData: async (
                payload?: {
                    data?: {
                        api_keys?: Array<string>;
                        start_time?: number;
                        end_time?: number;
                        app_id?: string;
                        page_size?: number;
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
                                items?: Array<{
                                    id: string;
                                    api_key: string;
                                    event_time?: number;
                                    app_id?: string;
                                    ip?: string;
                                    log_detail?: {
                                        path?: string;
                                        method?: string;
                                        query_param?: string;
                                        payload?: string;
                                        status_code?: number;
                                        response?: string;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/openapi_logs/list_data`,
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
             * openapi_log
             */
            openapiLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=openapi_log&apiName=list_data&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_data&project=security_and_compliance&resource=openapi_log&version=v1 document }
                 */
                listData: async (
                    payload?: {
                        data?: {
                            api_keys?: Array<string>;
                            start_time?: number;
                            end_time?: number;
                            app_id?: string;
                            page_size?: number;
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
                                    items?: Array<{
                                        id: string;
                                        api_key: string;
                                        event_time?: number;
                                        app_id?: string;
                                        ip?: string;
                                        log_detail?: {
                                            path?: string;
                                            method?: string;
                                            query_param?: string;
                                            payload?: string;
                                            status_code?: number;
                                            response?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/openapi_logs/list_data`,
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
