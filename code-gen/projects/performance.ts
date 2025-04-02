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
         
         */
    performance = {
        v2: {
            /**
             * activity
             */
            activity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=activity&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=activity&version=v2 document }
                 *
                 * 获取项目的信息
                 */
                query: async (
                    payload?: {
                        data?: {
                            semester_ids?: Array<string>;
                            activity_ids?: Array<string>;
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
                                    activities?: Array<{
                                        id: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        semester_id?: string;
                                        mode?:
                                            | "metric_development"
                                            | "performance_review"
                                            | "metric_development_and_performance_review";
                                        progress?:
                                            | "configurable"
                                            | "unable"
                                            | "initiating"
                                            | "enabled"
                                            | "finished";
                                        create_time?: string;
                                        modify_time?: string;
                                        create_user_id?: string;
                                        modify_user_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/activity/query`,
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
             * additional_information
             */
            additionalInformation: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=additional_information&apiName=import&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=import&project=performance&resource=additional_information&version=v2 document }
                 *
                 * 可批量导入被评估人的补充信息作为评估参考（包括新增和更新场景）
                 */
                import: async (
                    payload?: {
                        data: {
                            semester_id: string;
                            additional_informations?: Array<{
                                item_id?: string;
                                external_id?: string;
                                reviewee_user_id: string;
                                item: string;
                                time: string;
                                detailed_description: string;
                            }>;
                            import_record_name?: string;
                        };
                        params: {
                            client_token: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                    import_record_id?: string;
                                    additional_informations?: Array<{
                                        item_id?: string;
                                        external_id?: string;
                                        reviewee_user_id: string;
                                        item: string;
                                        time: string;
                                        detailed_description: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/additional_informations/import`,
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
                queryWithIterator: async (
                    payload?: {
                        data: {
                            semester_id: string;
                            item_ids?: Array<string>;
                            external_ids?: Array<string>;
                            reviewee_user_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            page_token?: string;
                            page_size?: number;
                        };
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
                                    `${this.domain}/open-apis/performance/v2/additional_informations/query`,
                                    path
                                ),
                                method: "POST",
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
                                                    additional_informations?: Array<{
                                                        item_id?: string;
                                                        external_id?: string;
                                                        reviewee_user_id: string;
                                                        item: string;
                                                        time: string;
                                                        detailed_description: string;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=additional_information&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=additional_information&version=v2 document }
                 *
                 * 可批量查询被评估人的补充信息
                 */
                query: async (
                    payload?: {
                        data: {
                            semester_id: string;
                            item_ids?: Array<string>;
                            external_ids?: Array<string>;
                            reviewee_user_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            page_token?: string;
                            page_size?: number;
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
                                    additional_informations?: Array<{
                                        item_id?: string;
                                        external_id?: string;
                                        reviewee_user_id: string;
                                        item: string;
                                        time: string;
                                        detailed_description: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/additional_informations/query`,
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
             * additional_informations.batch
             */
            additionalInformationsBatch: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=additional_informations.batch&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=performance&resource=additional_informations.batch&version=v2 document }
                 *
                 * 批量删除补充信息
                 */
                delete: async (
                    payload?: {
                        data: {
                            semester_id: string;
                            additional_informations: Array<string>;
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
                                    additional_informations?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/additional_informations/batch`,
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
            },
            /**
             * indicator
             */
            indicator: {
                queryWithIterator: async (
                    payload?: {
                        data?: { indicator_ids?: Array<string> };
                        params?: { page_token?: string; page_size?: number };
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
                                    `${this.domain}/open-apis/performance/v2/indicators/query`,
                                    path
                                ),
                                method: "POST",
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
                                                    indicators?: Array<{
                                                        id: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        type?:
                                                            | "general_review_item"
                                                            | "review_item_based_on_key_metric"
                                                            | "okr_review_item"
                                                            | "plus"
                                                            | "minus";
                                                        options?: Array<{
                                                            id: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            lable?: string;
                                                        }>;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=indicator&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=indicator&version=v2 document }
                 *
                 * 获取评估题配置
                 */
                query: async (
                    payload?: {
                        data?: { indicator_ids?: Array<string> };
                        params?: { page_token?: string; page_size?: number };
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
                                    indicators?: Array<{
                                        id: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        type?:
                                            | "general_review_item"
                                            | "review_item_based_on_key_metric"
                                            | "okr_review_item"
                                            | "plus"
                                            | "minus";
                                        options?: Array<{
                                            id: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            lable?: string;
                                        }>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/indicators/query`,
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
             * metric_detail
             */
            metricDetail: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=metric_detail&apiName=import&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=import&project=performance&resource=metric_detail&version=v2 document }
                 *
                 * 批量录入指定周期被评估人的关键指标详情
                 */
                import: async (
                    payload?: {
                        data: {
                            semester_id: string;
                            import_record_name?: string;
                            imported_metrics: Array<{
                                reviewee_user_id: string;
                                metric_id: string;
                                fields: Array<{
                                    field_id: string;
                                    field_value?: string;
                                    field_value_person?: string;
                                }>;
                            }>;
                        };
                        params: {
                            client_token: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                data?: { import_record_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/metric_details/import`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=metric_detail&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=metric_detail&version=v2 document }
                 *
                 * 批量获取指定周期中被评估人的关键指标详情
                 */
                query: async (
                    payload?: {
                        data: {
                            semester_id: string;
                            reviewee_user_ids: Array<string>;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                    semester_id?: string;
                                    reviewee_metrics?: Array<{
                                        reviewee_user_id?: {
                                            open_id?: string;
                                            user_id?: string;
                                        };
                                        metric_template_id?: string;
                                        metric_details?: {
                                            metric_id?: string;
                                            name?: string;
                                            fields?: Array<{
                                                field_id?: string;
                                                field_value?: string;
                                                field_value_person?: {
                                                    open_id?: string;
                                                    user_id?: string;
                                                };
                                            }>;
                                            dimension_id?: string;
                                            dimension_name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            dimension_weight?: string;
                                            add_from?: "reviewee" | "admin";
                                            is_from_library?: boolean;
                                        };
                                        reviewee_stage_statuses?: Array<{
                                            stage_id?: string;
                                            stage_type?: string;
                                            stage_status?: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/metric_details/query`,
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
             * metric_field
             */
            metricField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=metric_field&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=metric_field&version=v2 document }
                 *
                 * 获取指标的字段基础信息
                 */
                query: async (
                    payload?: {
                        data?: { field_ids?: Array<string> };
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
                                        field_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        type?:
                                            | "text"
                                            | "number"
                                            | "pencentage"
                                            | "person";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/metric_fields/query`,
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
             * metric_lib
             */
            metricLib: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=metric_lib&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=metric_lib&version=v2 document }
                 *
                 * 获取指标库的信息
                 */
                query: async (
                    payload?: {
                        data?: {
                            is_active?: boolean;
                            tag_ids?: Array<string>;
                            type_ids?: Array<string>;
                            range_of_availability?:
                                | "admins_and_reviewees"
                                | "only_admins";
                            scoring_setting_type?:
                                | "score_manually"
                                | "score_by_formula";
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            page_token?: string;
                            page_size?: number;
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
                                        metric_id?: string;
                                        name?: string;
                                        type_id?: string;
                                        tags?: Array<{
                                            tag_id?: string;
                                            tag_name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        fields?: Array<{
                                            field_id?: string;
                                            input_setting?:
                                                | "admin"
                                                | "data_source_inputter"
                                                | "reviewee";
                                            field_value?: string;
                                            field_value_person?: {
                                                open_id?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                        scoring_setting_type?:
                                            | "score_manually"
                                            | "score_by_formula";
                                        scoring_formula?: {
                                            formula_id?: string;
                                            formula_name?: string;
                                            formula_details?: string;
                                        };
                                        data_source_inputters?: Array<{
                                            open_id?: string;
                                            user_id?: string;
                                        }>;
                                        range_of_availability?:
                                            | "admins_and_reviewees"
                                            | "only_admins";
                                        is_active?: boolean;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/metric_libs/query`,
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
             * metric_tag
             */
            metricTag: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            tag_ids?: Array<string>;
                        };
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
                                    `${this.domain}/open-apis/performance/v2/metric_tags`,
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
                                                        tag_id?: string;
                                                        tag_name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        index?: number;
                                                        create_time?: string;
                                                        update_time?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=metric_tag&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=performance&resource=metric_tag&version=v2 document }
                 *
                 * 获取指标标签列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            tag_ids?: Array<string>;
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
                                        tag_id?: string;
                                        tag_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        index?: number;
                                        create_time?: string;
                                        update_time?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/metric_tags`,
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
             * metric_template
             */
            metricTemplate: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=metric_template&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=metric_template&version=v2 document }
                 *
                 * 获取指标模板的信息
                 */
                query: async (
                    payload?: {
                        data?: {
                            metrics_template_ids?: Array<string>;
                            status?:
                                | "to_be_configured"
                                | "to_be_activated"
                                | "enabled"
                                | "disabled";
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            page_token?: string;
                            page_size?: number;
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
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        status?:
                                            | "to_be_configured"
                                            | "to_be_activated"
                                            | "enabled"
                                            | "disabled";
                                        is_set_by_group?: boolean;
                                        total_metric_score_method?:
                                            | "review_manually"
                                            | "sum"
                                            | "weight"
                                            | "formula";
                                        metric_weight_method?:
                                            | "sum_of_metric_weights_for_each_dimension_equals_1"
                                            | "total_sum_of_all_metric_weight_equals_1";
                                        metric_dimensions?: Array<{
                                            group_id?: string;
                                            metric_dimension_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            evaluation_rule_id_for_each_metric?: string;
                                            dimension_weight?: string;
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            review_rule_option?: number;
                                            custom_metric_config?: {
                                                default_formula_id?: string;
                                                least_metrics_size?: number;
                                                add_metric_options?: Array<number>;
                                            };
                                        }>;
                                        metrics?: Array<{
                                            group_id?: string;
                                            metric_id?: string;
                                            name?: string;
                                            type_id?: string;
                                            fields?: Array<{
                                                id?: string;
                                                input_setting?:
                                                    | "admin"
                                                    | "data_source_inputter"
                                                    | "reviewee";
                                                filed_value?: string;
                                                field_value_person?: {
                                                    open_id?: string;
                                                    user_id?: string;
                                                };
                                            }>;
                                            is_from_library?: boolean;
                                            scoring_setting_type?:
                                                | "socre_manually"
                                                | "score_by_formula";
                                            data_source_inputters?: Array<{
                                                open_id?: string;
                                                user_id?: string;
                                            }>;
                                            metric_dimension_id?: string;
                                            review_rule_config?: {
                                                max?: string;
                                                min?: string;
                                            };
                                        }>;
                                        groups?: Array<{
                                            group_id?: string;
                                            name?: string;
                                        }>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/metric_templates/query`,
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
             * question
             */
            question: {
                queryWithIterator: async (
                    payload?: {
                        data?: { tag_based_question_ids?: Array<string> };
                        params?: { page_token?: string; page_size?: number };
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
                                    `${this.domain}/open-apis/performance/v2/questions/query`,
                                    path
                                ),
                                method: "POST",
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
                                                    tag_based_questions?: Array<{
                                                        question_id: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        tag_items?: Array<{
                                                            id: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        }>;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=question&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=question&version=v2 document }
                 *
                 * 获取标签填写题配置
                 */
                query: async (
                    payload?: {
                        data?: { tag_based_question_ids?: Array<string> };
                        params?: { page_token?: string; page_size?: number };
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
                                    tag_based_questions?: Array<{
                                        question_id: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        tag_items?: Array<{
                                            id: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/questions/query`,
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
             * review_data
             */
            reviewData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=review_data&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=review_data&version=v2 document }
                 *
                 * 获取绩效详情V2
                 */
                query: async (
                    payload?: {
                        data: {
                            semester_ids: Array<string>;
                            reviewee_user_ids: Array<string>;
                            stage_types?: Array<
                                | "summarize_key_outputs"
                                | "review"
                                | "communication_and_open_result"
                                | "view_result"
                                | "reconsideration"
                                | "leader_review"
                            >;
                            review_stage_roles?: Array<
                                | "reviewee"
                                | "invited_reviewer"
                                | "solid_line_leader"
                                | "dotted_line_leader"
                                | "secondary_solid_line_leader"
                                | "direct_project_leader"
                                | "custom_review_role"
                                | "metric_reviewer"
                            >;
                            stage_ids?: Array<string>;
                            need_leader_review_data_source?: boolean;
                            updated_later_than?: string;
                            stage_progresses?: Array<number>;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                    datas?: Array<{
                                        user_id?: {
                                            open_id?: string;
                                            user_id?: string;
                                        };
                                        semester_id?: string;
                                        activity_id?: string;
                                        review_template_id?: string;
                                        stages?: Array<{
                                            stage_id?: string;
                                            stage_type?:
                                                | "summarize_key_outputs"
                                                | "review"
                                                | "communication_and_open_result"
                                                | "view_result"
                                                | "reconsideration"
                                                | "leader_review";
                                            template_id?: string;
                                            records?: Array<{
                                                progress?: number;
                                                units?: Array<{
                                                    unit_id?: string;
                                                    is_unknown?: boolean;
                                                    data?: Array<{
                                                        field_id: string;
                                                        reviewer_user_id?: {
                                                            open_id?: string;
                                                            user_id?: string;
                                                        };
                                                        submit_time?: string;
                                                        indicator_id?: string;
                                                        option_id?: string;
                                                        score?: string;
                                                        text?: string;
                                                        tag_based_question_id?: string;
                                                        tag_text_item_data?: Array<{
                                                            tag_text_id?: string;
                                                            tag_text?: string;
                                                            tag_richtext?: string;
                                                        }>;
                                                        perf_coefficient_value?: string;
                                                        sub_indicator_data?: Array<{
                                                            field_id: string;
                                                            indicator_id?: string;
                                                            option_id?: string;
                                                            score?: string;
                                                            text?: string;
                                                            richtext?: string;
                                                        }>;
                                                        objective_data?: Array<{
                                                            objective_id: string;
                                                            score?: string;
                                                            text?: string;
                                                            keyresult_data?: Array<{
                                                                keyresult_id: string;
                                                                score?: string;
                                                                text?: string;
                                                                richtext?: string;
                                                            }>;
                                                            richtext?: string;
                                                        }>;
                                                        metric_data?: Array<{
                                                            id: string;
                                                            score?: string;
                                                        }>;
                                                        leader_review_data_source?:
                                                            | "review"
                                                            | "calibaration"
                                                            | "reconsideration";
                                                        multi_texts?: Array<string>;
                                                        richtext?: string;
                                                        multi_richtexts?: Array<string>;
                                                        is_principal_review_item?: boolean;
                                                    }>;
                                                }>;
                                                invited_review_record_info?: {
                                                    reviewer_id?: {
                                                        open_id?: string;
                                                        user_id?: string;
                                                    };
                                                    is_rejected?: boolean;
                                                    rejected_reason?: string;
                                                    distribute_type?: number;
                                                    avg_diff?: string;
                                                    relationship_with_reviewee?:
                                                        | "direct_report"
                                                        | "skiplevel_report"
                                                        | "former_direct_manager"
                                                        | "skiplevel_manager"
                                                        | "teammate"
                                                        | "crossteam_colleague";
                                                    invitedby?:
                                                        | "system_default"
                                                        | "reviewee"
                                                        | "manager"
                                                        | "hrbp_or_others"
                                                        | "voluntary";
                                                };
                                                direct_project_leader_record_info?: {
                                                    reviewer_id?: {
                                                        open_id?: string;
                                                        user_id?: string;
                                                    };
                                                    cooperation_projects?: Array<{
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        roles?: Array<{
                                                            reviewer_role?: {
                                                                role_id?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                            reviewee_role?: {
                                                                role_id?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                        }>;
                                                    }>;
                                                };
                                                record_id?: string;
                                            }>;
                                            review_stage_role?:
                                                | "reviewee"
                                                | "invited_reviewer"
                                                | "solid_line_leader"
                                                | "dotted_line_leader"
                                                | "secondary_solid_line_leader"
                                                | "direct_project_leader"
                                                | "custom_review_role"
                                                | "metric_reviewer";
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/review_datas/query`,
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
             * review_template
             */
            reviewTemplate: {
                queryWithIterator: async (
                    payload?: {
                        data?: { review_template_ids?: Array<string> };
                        params?: { page_token?: string; page_size?: number };
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
                                    `${this.domain}/open-apis/performance/v2/review_templates/query`,
                                    path
                                ),
                                method: "POST",
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
                                                    review_templates?: Array<{
                                                        templates?: Array<{
                                                            template_id: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            stage_type?: string;
                                                            review_stage_role?: string;
                                                        }>;
                                                        units?: Array<{
                                                            unit_id: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            fields?: Array<{
                                                                field_id: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                                indicator_id?: string;
                                                                tag_based_question_id?: string;
                                                                objective_text_qustion_title?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                                keyresult_text_qustion_title?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                                parent_field_id?: string;
                                                            }>;
                                                        }>;
                                                        review_template_id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        description?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        status?: string;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=review_template&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=review_template&version=v2 document }
                 *
                 * 获取评估模板配置
                 */
                query: async (
                    payload?: {
                        data?: { review_template_ids?: Array<string> };
                        params?: { page_token?: string; page_size?: number };
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
                                    review_templates?: Array<{
                                        templates?: Array<{
                                            template_id: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            stage_type?: string;
                                            review_stage_role?: string;
                                        }>;
                                        units?: Array<{
                                            unit_id: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            fields?: Array<{
                                                field_id: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                indicator_id?: string;
                                                tag_based_question_id?: string;
                                                objective_text_qustion_title?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                keyresult_text_qustion_title?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                parent_field_id?: string;
                                            }>;
                                        }>;
                                        review_template_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        status?: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/review_templates/query`,
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
             * reviewee
             */
            reviewee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=reviewee&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=performance&resource=reviewee&version=v2 document }
                 *
                 * 获取指定周期参与了的被评估人
                 */
                query: async (
                    payload?: {
                        data: {
                            semester_id: string;
                            user_ids?: Array<string>;
                            activity_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            page_token?: string;
                            page_size?: number;
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
                                    semester_id?: string;
                                    reviewees?: Array<{
                                        reviewee_user_id?: {
                                            open_id?: string;
                                            user_id?: string;
                                        };
                                        activity_ids?: Array<string>;
                                        reviewprofile_url?: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/reviewees/query`,
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
             * user_group_user_rel
             */
            userGroupUserRel: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=performance&resource=user_group_user_rel&apiName=write&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=write&project=performance&resource=user_group_user_rel&version=v2 document }
                 *
                 * 写入人员组成员范围
                 */
                write: async (
                    payload?: {
                        data?: {
                            group_id?: string;
                            scope_visible_setting?: number;
                            user_ids?: Array<string>;
                        };
                        params: {
                            client_token: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                    data?: {
                                        success_user_ids?: Array<string>;
                                        fail_user_datas?: Array<{
                                            user_id?: string;
                                            fail_code?: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/performance/v2/user_group_user_rels/write`,
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
