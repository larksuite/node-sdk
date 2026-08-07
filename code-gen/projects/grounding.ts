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
import financial_access_platform from "./financial_access_platform";

// auto gen
export default abstract class Client extends financial_access_platform {
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
    grounding = {
        v1: {
            /**
             * chat
             */
            chat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=grounding&resource=chat&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=grounding&resource=chat&version=v1 document }
                 *
                 * 该接口用于使用自然对话检索企业内外知识文档
                 */
                create: async (
                    payload?: {
                        data: {
                            message: string;
                            datasets: Array<string>;
                            conversation_id?: string;
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
                                    text?: string;
                                    references: Array<{
                                        id: string;
                                        source:
                                            | "helpdesk"
                                            | "wiki"
                                            | "docx"
                                            | "doc"
                                            | "web"
                                            | "unknown";
                                        title?: string;
                                        url?: string;
                                        snippet?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/grounding/v1/chat`,
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
