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
import myai_mail from "./myai_mail";

// auto gen
export default abstract class Client extends myai_mail {
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
    myai_memory_reflection = {
        v1: {
            /**
             * reflection_im
             */
            reflectionIm: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_memory_reflection&resource=reflection_im&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=myai_memory_reflection&resource=reflection_im&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: { force_update?: boolean };
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
                                data?: { result?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_memory_reflection/v1/reflection_im`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_memory_reflection&resource=reflection_im&apiName=summary&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=summary&project=myai_memory_reflection&resource=reflection_im&version=v1 document }
                 */
                summary: async (
                    payload?: {
                        data?: { force_update?: boolean };
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
                                    result?: string;
                                    response?: {
                                        summary?: string;
                                        presents?: Array<{
                                            type?: string;
                                            body?: string;
                                            interactable?: boolean;
                                            operation_type?: string;
                                            callback_url?: string;
                                            callback_info?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_memory_reflection/v1/reflection_im/summary`,
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
             * summary_data
             */
            summaryData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_memory_reflection&resource=summary_data&apiName=fetch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=fetch&project=myai_memory_reflection&resource=summary_data&version=v1 document }
                 */
                fetch: async (
                    payload?: {
                        data?: {
                            weekly_param?: {
                                topic_name: string;
                                time_span?: number;
                            };
                            daily_param?: { date?: number };
                            generate_topics_param?: {
                                user_id?: string;
                                time_span?: number;
                            };
                            scene?: string;
                            fetch_type?: number;
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
                                    summary_text?: string;
                                    generate_topics?: string;
                                    bot_app_info?: {
                                        name?: string;
                                        app_link?: string;
                                    };
                                    fetch_status?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_memory_reflection/v1/summary_data/fetch`,
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
             * card_callback
             */
            cardCallback: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_memory_reflection&resource=card_callback&apiName=callback&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=callback&project=myai_memory_reflection&resource=card_callback&version=v1 document }
                 */
                callback: async (
                    payload?: {
                        data?: {
                            callback_info?: string;
                            message_id?: string;
                            open_chat_id?: string;
                            open_message_id?: string;
                            token?: string;
                            status?: {
                                from_status?: string;
                                to_status?: string;
                            };
                            action?: {
                                tag?: string;
                                value?: {
                                    clear_unread?: string;
                                    callback_id?: string;
                                    force_update?: string;
                                    subscription?: string;
                                    summary?: string;
                                    summary_click?: string;
                                    unread_click?: string;
                                    mute_chat?: string;
                                    trigger_topic?: string;
                                    copy_item?: string;
                                    remove_item?: string;
                                    check_item?: string;
                                    push_week_report_gen_card?: string;
                                    gen_yesterday_report?: string;
                                    recommend_topic?: string;
                                    gen_week_report?: string;
                                    new_card?: string;
                                    remove_topic?: string;
                                    update_week_topic_gen_card?: string;
                                    week_topic_sum_item_thumbs_up?: string;
                                    week_topic_sum_item_thumbs_down?: string;
                                    week_item_level_general_feedback?: string;
                                    click_query?: string;
                                };
                                input_value?: string;
                                form_value?: {
                                    select_weekly_span?: string;
                                    input_weekly_keyword?: string;
                                    input_weekly_format?: string;
                                };
                            };
                            get_subscription_setting?: { user_id?: string };
                            set_subscription_setting?: {
                                subscription_setting?: {
                                    user_id?: string;
                                    topic_infos?: Array<{
                                        topic_name?: string;
                                        keywords?: Array<string>;
                                        description?: string;
                                    }>;
                                    push_times?: Array<number>;
                                    scene: string;
                                    subscribe?: boolean;
                                    time_span?: number;
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
                                    presents?: Array<{
                                        type?: string;
                                        body?: string;
                                        interactable?: boolean;
                                        operation_type?: string;
                                        callback_url?: string;
                                        callback_info?: string;
                                    }>;
                                    subscription_setting?: {
                                        user_id?: string;
                                        topic_infos?: Array<{
                                            topic_name?: string;
                                            keywords?: Array<string>;
                                            description?: string;
                                        }>;
                                        push_times?: Array<number>;
                                        scene: string;
                                        subscribe?: boolean;
                                        time_span?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_memory_reflection/v1/card_callback/callback`,
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
