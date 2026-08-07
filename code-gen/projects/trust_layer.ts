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
import translation from "./translation";

// auto gen
export default abstract class Client extends translation {
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
    trust_layer = {
        v1: {
            /**
             * text
             */
            text: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=trust_layer&resource=text&apiName=scan&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=scan&project=trust_layer&resource=text&version=v1 document }
                 *
                 * 文本检测
                 */
                scan: async (
                    payload?: {
                        data?: {
                            biz_id?: number;
                            event_key?: string;
                            built_in_rule_keys?: Array<string>;
                            operator_id?: string;
                            texts?: Array<string>;
                            context?: string;
                            need_detail?: boolean;
                            mask_mode?: string;
                            session_id?: string;
                            content?: string;
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
                                    decision?: string;
                                    details?: Array<{
                                        type?: string;
                                        dlp_detail?: {
                                            decision?: string;
                                            rule_key?: string;
                                            pos?: Array<{
                                                index?: number;
                                                start?: number;
                                                end?: number;
                                            }>;
                                            is_built_in?: boolean;
                                        };
                                        cms_detail?: {
                                            decision?: string;
                                            rule_key?: string;
                                            prop?: number;
                                        };
                                    }>;
                                    modifed_content?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_layer/v1/text/scan`,
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
