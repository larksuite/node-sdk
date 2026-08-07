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
         
         */
    mcp = {
        v1: {
            /**
             * search
             */
            search: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mcp&resource=search&apiName=search_doc&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_doc&project=mcp&resource=search&version=v1 document }
                 */
                searchDoc: async (
                    payload?: {
                        data?: {
                            req?: {
                                query?: string;
                                filters?: {
                                    doc_types?: string;
                                    owners?: string;
                                    sort_rule?: string;
                                    locations?: {
                                        groups?: string;
                                        spaces?: string;
                                    };
                                    create_time?: string;
                                    open_time?: string;
                                };
                                page?: {
                                    size?: number;
                                    offset?: number;
                                    page_token?: string;
                                };
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
                                data?: {
                                    res?: {
                                        items: Array<{
                                            title: string;
                                            id: string;
                                        }>;
                                        offset?: number;
                                        has_more: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mcp/v1/search/search_doc`,
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
