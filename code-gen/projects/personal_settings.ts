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
import { Readable } from "stream";
import { stringify } from "qs";
import people_bytedance from "./people_bytedance";

// auto gen
export default abstract class Client extends people_bytedance {
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
     * 个人设置
     */
    personal_settings = {
        /**
         * 系统状态
         */
        systemStatus: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=batch_close&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_close document }
             *
             * 批量关闭系统状态
             *
             * 批量关闭用户系统状态可用
             */
            batchClose: async (
                payload?: {
                    data: { user_list: Array<string> };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { system_status_id?: string };
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
                                result_list: Array<{
                                    user_id?: string;
                                    result?:
                                        | "success"
                                        | "fail"
                                        | "invisible_user_id"
                                        | "invalid_user_id"
                                        | "resign_user_id";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/personal_settings/v1/system_statuses/:system_status_id/batch_close`,
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
             * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=batch_open&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_open document }
             *
             * 批量开启系统状态
             *
             * 批量开启用户系统状态可用
             */
            batchOpen: async (
                payload?: {
                    data: {
                        user_list: Array<{ user_id: string; end_time: string }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { system_status_id?: string };
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
                                result_list: Array<{
                                    user_id: string;
                                    end_time: string;
                                    result?:
                                        | "success_show"
                                        | "success_user_close_syn"
                                        | "success_user_in_higher_priority_system_status"
                                        | "fail"
                                        | "invisible_user_id"
                                        | "invalid_user_id"
                                        | "resign_user_id";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/personal_settings/v1/system_statuses/:system_status_id/batch_open`,
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
             * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/create document }
             *
             * 创建系统状态
             *
             * 创建租户维度的系统状态。
             *
             * 注意事项:;- 操作的数据为租户维度数据，请小心操作。;- 每个租户最多创建10个系统状态。
             */
            create: async (
                payload?: {
                    data: {
                        title: string;
                        i18n_title?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                        icon_key:
                            | "GeneralDoNotDisturb"
                            | "GeneralInMeetingBusy"
                            | "Coffee"
                            | "GeneralBusinessTrip"
                            | "GeneralWorkFromHome"
                            | "StatusEnjoyLife"
                            | "GeneralTravellingCar"
                            | "StatusBus"
                            | "StatusInFlight"
                            | "Typing"
                            | "EatingFood"
                            | "SICK"
                            | "GeneralSun"
                            | "GeneralMoonRest"
                            | "StatusReading"
                            | "Status_PrivateMessage"
                            | "StatusFlashOfInspiration"
                            | "GeneralVacation";
                        color?:
                            | "BLUE"
                            | "GRAY"
                            | "INDIGO"
                            | "WATHET"
                            | "GREEN"
                            | "TURQUOISE"
                            | "YELLOW"
                            | "LIME"
                            | "RED"
                            | "ORANGE"
                            | "PURPLE"
                            | "VIOLET"
                            | "CARMINE";
                        priority?: number;
                        sync_setting?: {
                            is_open_by_default?: boolean;
                            title?: string;
                            i18n_title?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            explain?: string;
                            i18n_explain?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
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
                                system_status?: {
                                    system_status_id?: string;
                                    title: string;
                                    i18n_title?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    icon_key:
                                        | "GeneralDoNotDisturb"
                                        | "GeneralInMeetingBusy"
                                        | "Coffee"
                                        | "GeneralBusinessTrip"
                                        | "GeneralWorkFromHome"
                                        | "StatusEnjoyLife"
                                        | "GeneralTravellingCar"
                                        | "StatusBus"
                                        | "StatusInFlight"
                                        | "Typing"
                                        | "EatingFood"
                                        | "SICK"
                                        | "GeneralSun"
                                        | "GeneralMoonRest"
                                        | "StatusReading"
                                        | "Status_PrivateMessage"
                                        | "StatusFlashOfInspiration"
                                        | "GeneralVacation";
                                    color?:
                                        | "BLUE"
                                        | "GRAY"
                                        | "INDIGO"
                                        | "WATHET"
                                        | "GREEN"
                                        | "TURQUOISE"
                                        | "YELLOW"
                                        | "LIME"
                                        | "RED"
                                        | "ORANGE"
                                        | "PURPLE"
                                        | "VIOLET"
                                        | "CARMINE";
                                    priority?: number;
                                    sync_setting?: {
                                        is_open_by_default?: boolean;
                                        title?: string;
                                        i18n_title?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        explain?: string;
                                        i18n_explain?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/personal_settings/v1/system_statuses`,
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
             * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/delete document }
             *
             * 删除系统状态
             *
             * 删除租户维度的系统状态。
             *
             * 注意事项：;- 操作的数据为租户维度数据，请小心操作。 ;- 删除系统状态后，并不影响正在使用该状态用户下系统状态的客户端展示。
             */
            delete: async (
                payload?: {
                    path?: { system_status_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/personal_settings/v1/system_statuses/:system_status_id`,
                            path
                        ),
                        method: "DELETE",
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
            listWithIterator: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const sendRequest = async (innerPayload: {
                    headers: any;
                    params: any;
                    data: any;
                }) => {
                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/personal_settings/v1/system_statuses`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                    return res;
                };

                const Iterable = {
                    async *[Symbol.asyncIterator]() {
                        let hasMore = true;
                        let pageToken;

                        while (hasMore) {
                            try {
                                const res = await sendRequest({
                                    headers,
                                    params: {
                                        ...params,
                                        page_token: pageToken,
                                    },
                                    data,
                                });

                                const {
                                    // @ts-ignore
                                    has_more,
                                    // @ts-ignore
                                    page_token,
                                    // @ts-ignore
                                    next_page_token,
                                    ...rest
                                } =
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    system_status_id?: string;
                                                    title: string;
                                                    i18n_title?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
                                                    };
                                                    icon_key:
                                                        | "GeneralDoNotDisturb"
                                                        | "GeneralInMeetingBusy"
                                                        | "Coffee"
                                                        | "GeneralBusinessTrip"
                                                        | "GeneralWorkFromHome"
                                                        | "StatusEnjoyLife"
                                                        | "GeneralTravellingCar"
                                                        | "StatusBus"
                                                        | "StatusInFlight"
                                                        | "Typing"
                                                        | "EatingFood"
                                                        | "SICK"
                                                        | "GeneralSun"
                                                        | "GeneralMoonRest"
                                                        | "StatusReading"
                                                        | "Status_PrivateMessage"
                                                        | "StatusFlashOfInspiration"
                                                        | "GeneralVacation";
                                                    color?:
                                                        | "BLUE"
                                                        | "GRAY"
                                                        | "INDIGO"
                                                        | "WATHET"
                                                        | "GREEN"
                                                        | "TURQUOISE"
                                                        | "YELLOW"
                                                        | "LIME"
                                                        | "RED"
                                                        | "ORANGE"
                                                        | "PURPLE"
                                                        | "VIOLET"
                                                        | "CARMINE";
                                                    priority?: number;
                                                    sync_setting?: {
                                                        is_open_by_default?: boolean;
                                                        title?: string;
                                                        i18n_title?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
                                                        };
                                                        explain?: string;
                                                        i18n_explain?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
                                                        };
                                                    };
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

                                yield rest;

                                hasMore = Boolean(has_more);
                                pageToken = page_token || next_page_token;
                            } catch (e) {
                                yield null;
                                break;
                            }
                        }
                    },
                };

                return Iterable;
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/list document }
             *
             * 获取系统状态
             *
             * 获取租户下所有系统状态
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
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
                                    system_status_id?: string;
                                    title: string;
                                    i18n_title?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    icon_key:
                                        | "GeneralDoNotDisturb"
                                        | "GeneralInMeetingBusy"
                                        | "Coffee"
                                        | "GeneralBusinessTrip"
                                        | "GeneralWorkFromHome"
                                        | "StatusEnjoyLife"
                                        | "GeneralTravellingCar"
                                        | "StatusBus"
                                        | "StatusInFlight"
                                        | "Typing"
                                        | "EatingFood"
                                        | "SICK"
                                        | "GeneralSun"
                                        | "GeneralMoonRest"
                                        | "StatusReading"
                                        | "Status_PrivateMessage"
                                        | "StatusFlashOfInspiration"
                                        | "GeneralVacation";
                                    color?:
                                        | "BLUE"
                                        | "GRAY"
                                        | "INDIGO"
                                        | "WATHET"
                                        | "GREEN"
                                        | "TURQUOISE"
                                        | "YELLOW"
                                        | "LIME"
                                        | "RED"
                                        | "ORANGE"
                                        | "PURPLE"
                                        | "VIOLET"
                                        | "CARMINE";
                                    priority?: number;
                                    sync_setting?: {
                                        is_open_by_default?: boolean;
                                        title?: string;
                                        i18n_title?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        explain?: string;
                                        i18n_explain?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/personal_settings/v1/system_statuses`,
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
             * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/patch document }
             *
             * 修改系统状态
             *
             * 修改租户维度系统状态。
             *
             * 注意事项：;- 操作的数据为租户维度数据，请小心操作。 ;- 修改系统状态后，并不影响正在使用的用户。该用户的系统状态可用时间到期后，再次被开启可用的时候，用户客户端才会同步到更新后的系统状态。
             */
            patch: async (
                payload?: {
                    data: {
                        system_status: {
                            title: string;
                            i18n_title?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            icon_key:
                                | "GeneralDoNotDisturb"
                                | "GeneralInMeetingBusy"
                                | "Coffee"
                                | "GeneralBusinessTrip"
                                | "GeneralWorkFromHome"
                                | "StatusEnjoyLife"
                                | "GeneralTravellingCar"
                                | "StatusBus"
                                | "StatusInFlight"
                                | "Typing"
                                | "EatingFood"
                                | "SICK"
                                | "GeneralSun"
                                | "GeneralMoonRest"
                                | "StatusReading"
                                | "Status_PrivateMessage"
                                | "StatusFlashOfInspiration"
                                | "GeneralVacation";
                            color?:
                                | "BLUE"
                                | "GRAY"
                                | "INDIGO"
                                | "WATHET"
                                | "GREEN"
                                | "TURQUOISE"
                                | "YELLOW"
                                | "LIME"
                                | "RED"
                                | "ORANGE"
                                | "PURPLE"
                                | "VIOLET"
                                | "CARMINE";
                            priority?: number;
                            sync_setting?: {
                                is_open_by_default?: boolean;
                                title?: string;
                                i18n_title?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                    ja_jp?: string;
                                };
                                explain?: string;
                                i18n_explain?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                    ja_jp?: string;
                                };
                            };
                        };
                        update_fields: Array<
                            | "TITLE"
                            | "I18N_TITLE"
                            | "ICON"
                            | "COLOR"
                            | "PRIORITY"
                            | "SYNC_SETTING"
                        >;
                    };
                    path?: { system_status_id?: string };
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
                                system_status?: {
                                    system_status_id?: string;
                                    title: string;
                                    i18n_title?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    icon_key:
                                        | "GeneralDoNotDisturb"
                                        | "GeneralInMeetingBusy"
                                        | "Coffee"
                                        | "GeneralBusinessTrip"
                                        | "GeneralWorkFromHome"
                                        | "StatusEnjoyLife"
                                        | "GeneralTravellingCar"
                                        | "StatusBus"
                                        | "StatusInFlight"
                                        | "Typing"
                                        | "EatingFood"
                                        | "SICK"
                                        | "GeneralSun"
                                        | "GeneralMoonRest"
                                        | "StatusReading"
                                        | "Status_PrivateMessage"
                                        | "StatusFlashOfInspiration"
                                        | "GeneralVacation";
                                    color?:
                                        | "BLUE"
                                        | "GRAY"
                                        | "INDIGO"
                                        | "WATHET"
                                        | "GREEN"
                                        | "TURQUOISE"
                                        | "YELLOW"
                                        | "LIME"
                                        | "RED"
                                        | "ORANGE"
                                        | "PURPLE"
                                        | "VIOLET"
                                        | "CARMINE";
                                    priority?: number;
                                    sync_setting?: {
                                        is_open_by_default?: boolean;
                                        title?: string;
                                        i18n_title?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        explain?: string;
                                        i18n_explain?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/personal_settings/v1/system_statuses/:system_status_id`,
                            path
                        ),
                        method: "PATCH",
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
             * 系统状态
             */
            systemStatus: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=batch_close&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_close document }
                 *
                 * 批量关闭系统状态
                 *
                 * 批量关闭用户系统状态可用
                 */
                batchClose: async (
                    payload?: {
                        data: { user_list: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { system_status_id?: string };
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
                                    result_list: Array<{
                                        user_id?: string;
                                        result?:
                                            | "success"
                                            | "fail"
                                            | "invisible_user_id"
                                            | "invalid_user_id"
                                            | "resign_user_id";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/personal_settings/v1/system_statuses/:system_status_id/batch_close`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=batch_open&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_open document }
                 *
                 * 批量开启系统状态
                 *
                 * 批量开启用户系统状态可用
                 */
                batchOpen: async (
                    payload?: {
                        data: {
                            user_list: Array<{
                                user_id: string;
                                end_time: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { system_status_id?: string };
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
                                    result_list: Array<{
                                        user_id: string;
                                        end_time: string;
                                        result?:
                                            | "success_show"
                                            | "success_user_close_syn"
                                            | "success_user_in_higher_priority_system_status"
                                            | "fail"
                                            | "invisible_user_id"
                                            | "invalid_user_id"
                                            | "resign_user_id";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/personal_settings/v1/system_statuses/:system_status_id/batch_open`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/create document }
                 *
                 * 创建系统状态
                 *
                 * 创建租户维度的系统状态。
                 *
                 * 注意事项:;- 操作的数据为租户维度数据，请小心操作。;- 每个租户最多创建10个系统状态。
                 */
                create: async (
                    payload?: {
                        data: {
                            title: string;
                            i18n_title?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            icon_key:
                                | "GeneralDoNotDisturb"
                                | "GeneralInMeetingBusy"
                                | "Coffee"
                                | "GeneralBusinessTrip"
                                | "GeneralWorkFromHome"
                                | "StatusEnjoyLife"
                                | "GeneralTravellingCar"
                                | "StatusBus"
                                | "StatusInFlight"
                                | "Typing"
                                | "EatingFood"
                                | "SICK"
                                | "GeneralSun"
                                | "GeneralMoonRest"
                                | "StatusReading"
                                | "Status_PrivateMessage"
                                | "StatusFlashOfInspiration"
                                | "GeneralVacation";
                            color?:
                                | "BLUE"
                                | "GRAY"
                                | "INDIGO"
                                | "WATHET"
                                | "GREEN"
                                | "TURQUOISE"
                                | "YELLOW"
                                | "LIME"
                                | "RED"
                                | "ORANGE"
                                | "PURPLE"
                                | "VIOLET"
                                | "CARMINE";
                            priority?: number;
                            sync_setting?: {
                                is_open_by_default?: boolean;
                                title?: string;
                                i18n_title?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                    ja_jp?: string;
                                };
                                explain?: string;
                                i18n_explain?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                    ja_jp?: string;
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
                                    system_status?: {
                                        system_status_id?: string;
                                        title: string;
                                        i18n_title?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        icon_key:
                                            | "GeneralDoNotDisturb"
                                            | "GeneralInMeetingBusy"
                                            | "Coffee"
                                            | "GeneralBusinessTrip"
                                            | "GeneralWorkFromHome"
                                            | "StatusEnjoyLife"
                                            | "GeneralTravellingCar"
                                            | "StatusBus"
                                            | "StatusInFlight"
                                            | "Typing"
                                            | "EatingFood"
                                            | "SICK"
                                            | "GeneralSun"
                                            | "GeneralMoonRest"
                                            | "StatusReading"
                                            | "Status_PrivateMessage"
                                            | "StatusFlashOfInspiration"
                                            | "GeneralVacation";
                                        color?:
                                            | "BLUE"
                                            | "GRAY"
                                            | "INDIGO"
                                            | "WATHET"
                                            | "GREEN"
                                            | "TURQUOISE"
                                            | "YELLOW"
                                            | "LIME"
                                            | "RED"
                                            | "ORANGE"
                                            | "PURPLE"
                                            | "VIOLET"
                                            | "CARMINE";
                                        priority?: number;
                                        sync_setting?: {
                                            is_open_by_default?: boolean;
                                            title?: string;
                                            i18n_title?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                            explain?: string;
                                            i18n_explain?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/personal_settings/v1/system_statuses`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/delete document }
                 *
                 * 删除系统状态
                 *
                 * 删除租户维度的系统状态。
                 *
                 * 注意事项：;- 操作的数据为租户维度数据，请小心操作。 ;- 删除系统状态后，并不影响正在使用该状态用户下系统状态的客户端展示。
                 */
                delete: async (
                    payload?: {
                        path?: { system_status_id?: string };
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
                                `${this.domain}/open-apis/personal_settings/v1/system_statuses/:system_status_id`,
                                path
                            ),
                            method: "DELETE",
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
                listWithIterator: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const sendRequest = async (innerPayload: {
                        headers: any;
                        params: any;
                        data: any;
                    }) => {
                        const res = await this.httpInstance
                            .request<any, any>({
                                url: fillApiPath(
                                    `${this.domain}/open-apis/personal_settings/v1/system_statuses`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
                                paramsSerializer: (params) =>
                                    stringify(params, {
                                        arrayFormat: "repeat",
                                    }),
                            })
                            .catch((e) => {
                                this.logger.error(formatErrors(e));
                            });
                        return res;
                    };

                    const Iterable = {
                        async *[Symbol.asyncIterator]() {
                            let hasMore = true;
                            let pageToken;

                            while (hasMore) {
                                try {
                                    const res = await sendRequest({
                                        headers,
                                        params: {
                                            ...params,
                                            page_token: pageToken,
                                        },
                                        data,
                                    });

                                    const {
                                        // @ts-ignore
                                        has_more,
                                        // @ts-ignore
                                        page_token,
                                        // @ts-ignore
                                        next_page_token,
                                        ...rest
                                    } =
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        system_status_id?: string;
                                                        title: string;
                                                        i18n_title?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
                                                        };
                                                        icon_key:
                                                            | "GeneralDoNotDisturb"
                                                            | "GeneralInMeetingBusy"
                                                            | "Coffee"
                                                            | "GeneralBusinessTrip"
                                                            | "GeneralWorkFromHome"
                                                            | "StatusEnjoyLife"
                                                            | "GeneralTravellingCar"
                                                            | "StatusBus"
                                                            | "StatusInFlight"
                                                            | "Typing"
                                                            | "EatingFood"
                                                            | "SICK"
                                                            | "GeneralSun"
                                                            | "GeneralMoonRest"
                                                            | "StatusReading"
                                                            | "Status_PrivateMessage"
                                                            | "StatusFlashOfInspiration"
                                                            | "GeneralVacation";
                                                        color?:
                                                            | "BLUE"
                                                            | "GRAY"
                                                            | "INDIGO"
                                                            | "WATHET"
                                                            | "GREEN"
                                                            | "TURQUOISE"
                                                            | "YELLOW"
                                                            | "LIME"
                                                            | "RED"
                                                            | "ORANGE"
                                                            | "PURPLE"
                                                            | "VIOLET"
                                                            | "CARMINE";
                                                        priority?: number;
                                                        sync_setting?: {
                                                            is_open_by_default?: boolean;
                                                            title?: string;
                                                            i18n_title?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                                ja_jp?: string;
                                                            };
                                                            explain?: string;
                                                            i18n_explain?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                                ja_jp?: string;
                                                            };
                                                        };
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

                                    yield rest;

                                    hasMore = Boolean(has_more);
                                    pageToken = page_token || next_page_token;
                                } catch (e) {
                                    yield null;
                                    break;
                                }
                            }
                        },
                    };

                    return Iterable;
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/list document }
                 *
                 * 获取系统状态
                 *
                 * 获取租户下所有系统状态
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
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
                                        system_status_id?: string;
                                        title: string;
                                        i18n_title?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        icon_key:
                                            | "GeneralDoNotDisturb"
                                            | "GeneralInMeetingBusy"
                                            | "Coffee"
                                            | "GeneralBusinessTrip"
                                            | "GeneralWorkFromHome"
                                            | "StatusEnjoyLife"
                                            | "GeneralTravellingCar"
                                            | "StatusBus"
                                            | "StatusInFlight"
                                            | "Typing"
                                            | "EatingFood"
                                            | "SICK"
                                            | "GeneralSun"
                                            | "GeneralMoonRest"
                                            | "StatusReading"
                                            | "Status_PrivateMessage"
                                            | "StatusFlashOfInspiration"
                                            | "GeneralVacation";
                                        color?:
                                            | "BLUE"
                                            | "GRAY"
                                            | "INDIGO"
                                            | "WATHET"
                                            | "GREEN"
                                            | "TURQUOISE"
                                            | "YELLOW"
                                            | "LIME"
                                            | "RED"
                                            | "ORANGE"
                                            | "PURPLE"
                                            | "VIOLET"
                                            | "CARMINE";
                                        priority?: number;
                                        sync_setting?: {
                                            is_open_by_default?: boolean;
                                            title?: string;
                                            i18n_title?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                            explain?: string;
                                            i18n_explain?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/personal_settings/v1/system_statuses`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=personal_settings&resource=system_status&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/patch document }
                 *
                 * 修改系统状态
                 *
                 * 修改租户维度系统状态。
                 *
                 * 注意事项：;- 操作的数据为租户维度数据，请小心操作。 ;- 修改系统状态后，并不影响正在使用的用户。该用户的系统状态可用时间到期后，再次被开启可用的时候，用户客户端才会同步到更新后的系统状态。
                 */
                patch: async (
                    payload?: {
                        data: {
                            system_status: {
                                title: string;
                                i18n_title?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                    ja_jp?: string;
                                };
                                icon_key:
                                    | "GeneralDoNotDisturb"
                                    | "GeneralInMeetingBusy"
                                    | "Coffee"
                                    | "GeneralBusinessTrip"
                                    | "GeneralWorkFromHome"
                                    | "StatusEnjoyLife"
                                    | "GeneralTravellingCar"
                                    | "StatusBus"
                                    | "StatusInFlight"
                                    | "Typing"
                                    | "EatingFood"
                                    | "SICK"
                                    | "GeneralSun"
                                    | "GeneralMoonRest"
                                    | "StatusReading"
                                    | "Status_PrivateMessage"
                                    | "StatusFlashOfInspiration"
                                    | "GeneralVacation";
                                color?:
                                    | "BLUE"
                                    | "GRAY"
                                    | "INDIGO"
                                    | "WATHET"
                                    | "GREEN"
                                    | "TURQUOISE"
                                    | "YELLOW"
                                    | "LIME"
                                    | "RED"
                                    | "ORANGE"
                                    | "PURPLE"
                                    | "VIOLET"
                                    | "CARMINE";
                                priority?: number;
                                sync_setting?: {
                                    is_open_by_default?: boolean;
                                    title?: string;
                                    i18n_title?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    explain?: string;
                                    i18n_explain?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                };
                            };
                            update_fields: Array<
                                | "TITLE"
                                | "I18N_TITLE"
                                | "ICON"
                                | "COLOR"
                                | "PRIORITY"
                                | "SYNC_SETTING"
                            >;
                        };
                        path?: { system_status_id?: string };
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
                                    system_status?: {
                                        system_status_id?: string;
                                        title: string;
                                        i18n_title?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        icon_key:
                                            | "GeneralDoNotDisturb"
                                            | "GeneralInMeetingBusy"
                                            | "Coffee"
                                            | "GeneralBusinessTrip"
                                            | "GeneralWorkFromHome"
                                            | "StatusEnjoyLife"
                                            | "GeneralTravellingCar"
                                            | "StatusBus"
                                            | "StatusInFlight"
                                            | "Typing"
                                            | "EatingFood"
                                            | "SICK"
                                            | "GeneralSun"
                                            | "GeneralMoonRest"
                                            | "StatusReading"
                                            | "Status_PrivateMessage"
                                            | "StatusFlashOfInspiration"
                                            | "GeneralVacation";
                                        color?:
                                            | "BLUE"
                                            | "GRAY"
                                            | "INDIGO"
                                            | "WATHET"
                                            | "GREEN"
                                            | "TURQUOISE"
                                            | "YELLOW"
                                            | "LIME"
                                            | "RED"
                                            | "ORANGE"
                                            | "PURPLE"
                                            | "VIOLET"
                                            | "CARMINE";
                                        priority?: number;
                                        sync_setting?: {
                                            is_open_by_default?: boolean;
                                            title?: string;
                                            i18n_title?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                            explain?: string;
                                            i18n_explain?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/personal_settings/v1/system_statuses/:system_status_id`,
                                path
                            ),
                            method: "PATCH",
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
