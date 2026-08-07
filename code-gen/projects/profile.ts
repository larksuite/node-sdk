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
import personal_settings from "./personal_settings";

// auto gen
export default abstract class Client extends personal_settings {
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
    profile = {
        v2: {
            /**
             * user_profile
             */
            userProfile: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=profile&resource=user_profile&apiName=batch_query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_query&project=profile&resource=user_profile&version=v2 document }
                 *
                 * 批量获取用户个人资料（个人状态、个性签名）
                 */
                batchQuery: async (
                    payload?: {
                        data: {
                            query_option?: {
                                include_personal_status?: boolean;
                                include_description?: boolean;
                            };
                            user_ids: Array<string>;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    user_profiles: Array<{
                                        user_id?: string;
                                        personal_status?: {
                                            personal_status_id?: string;
                                            title?: string;
                                            i18n_title?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                            icon_key?: string;
                                            effective_interval?: {
                                                start_time?: string;
                                                end_time?: string;
                                                is_show_end_time?: boolean;
                                                is_open_without_end_time?: boolean;
                                            };
                                            is_not_disturb_mode?: boolean;
                                        };
                                        description?: {
                                            default_value?: string;
                                            i18n_value?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                            default_locale?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/profile/v2/user_profiles/batch_query`,
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
