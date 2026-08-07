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
import passport from "./passport";

// auto gen
export default abstract class Client extends passport {
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
    payroll = {
        v1: {
            /**
             * collection_template
             */
            collectionTemplate: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            collection_item_types?: Array<number>;
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
                                    `${this.domain}/open-apis/payroll/v1/collection_templates`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    collection_templates?: Array<{
                                                        template_id?: string;
                                                        template_name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        version_id?: string;
                                                        items?: Array<{
                                                            template_id?: string;
                                                            template_version_id?: string;
                                                            item_id?: string;
                                                            item_name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            field_type?: number;
                                                            decimal_places?: number;
                                                            calc_method?: number;
                                                            preset?: boolean;
                                                            is_required?: boolean;
                                                        }>;
                                                        country_regions?: Array<{
                                                            id?: string;
                                                            alpha3_code?: string;
                                                        }>;
                                                        is_active?: boolean;
                                                        effective_date?: string;
                                                        created_time?: string;
                                                        modified_time?: string;
                                                    }>;
                                                    total?: number;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=collection_template&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=collection_template&version=v1 document }
                 *
                 * 查询填报模板列表
                 *
                 * Query the list of filling templates
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            collection_item_types?: Array<number>;
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
                                    collection_templates?: Array<{
                                        template_id?: string;
                                        template_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        version_id?: string;
                                        items?: Array<{
                                            template_id?: string;
                                            template_version_id?: string;
                                            item_id?: string;
                                            item_name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            field_type?: number;
                                            decimal_places?: number;
                                            calc_method?: number;
                                            preset?: boolean;
                                            is_required?: boolean;
                                        }>;
                                        country_regions?: Array<{
                                            id?: string;
                                            alpha3_code?: string;
                                        }>;
                                        is_active?: boolean;
                                        effective_date?: string;
                                        created_time?: string;
                                        modified_time?: string;
                                    }>;
                                    total?: number;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/collection_templates`,
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
             * datasource_record
             */
            datasourceRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=datasource_record&apiName=save&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=save&project=payroll&resource=datasource_record&version=v1 document }
                 *
                 * 创建 / 更新外部算薪数据
                 *
                 * 参照数据源配置字段格式，批量保存（创建或更新）数据记录。;1. 记录的唯一标志通过业务主键判断（employment_id + payroll_period）;2. 若不存在数据记录，则本次保存会插入1条记录。;3. 若已存在数据记录，则本次保存会覆盖更新已有记录（只更新传入字段的值，未传入字段值不更新），如果传入的数据记录没有任何变化，则不更新。;4. 若更新或者插入成功，会返回产生数据变更的记录条数。
                 *
                 * 1. 除了接口自身的限流外，还会限制单个数据源只能串行批量写入（防止批量更新同一批数据导致底层性能或者死锁风险），需调用端做好并发控制;2. 本接口如果发生报错，调用方可认为全部保存失败，不会存在部分保存失败部分成功场景。;3. 请确保写入的数据记录的数据源及字段都是被启用的。;;;
                 */
                save: async (
                    payload?: {
                        data: {
                            source_code: string;
                            records: Array<{
                                active_status: number;
                                field_values: Array<{
                                    field_code: string;
                                    value: string;
                                    field_type?: number;
                                }>;
                            }>;
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
                                data?: { affect_counts: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/datasource_records/save`,
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
                            source_code: string;
                            selected_fields?: Array<string>;
                            field_filters?: Array<{
                                field_code: string;
                                field_values?: Array<string>;
                                operator?: number;
                            }>;
                        };
                        params: { page_size: number; page_token?: string };
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
                                    `${this.domain}/open-apis/payroll/v1/datasource_records/query`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    page_token?: string;
                                                    has_more: boolean;
                                                    records: Array<{
                                                        active_status: number;
                                                        field_values: Array<{
                                                            field_code: string;
                                                            value: string;
                                                            field_type?: number;
                                                        }>;
                                                    }>;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=datasource_record&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=payroll&resource=datasource_record&version=v1 document }
                 *
                 * 批量查询外部算薪数据记录
                 *
                 * 1. 支持通过payroll_period（必传）、employment_id（可选）这两个预置字段，批量查询指定数据源下的数据记录列表。;2. 数据源配置信息可从[获取外部数据源配置信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/datasource/list)或者 「飞书人事后台-设置-算薪数据设置-外部数据源配置」页面 获取
                 */
                query: async (
                    payload?: {
                        data: {
                            source_code: string;
                            selected_fields?: Array<string>;
                            field_filters?: Array<{
                                field_code: string;
                                field_values?: Array<string>;
                                operator?: number;
                            }>;
                        };
                        params: { page_size: number; page_token?: string };
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
                                    page_token?: string;
                                    has_more: boolean;
                                    records: Array<{
                                        active_status: number;
                                        field_values: Array<{
                                            field_code: string;
                                            value: string;
                                            field_type?: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/datasource_records/query`,
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
             * payment_detail
             */
            paymentDetail: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=payment_detail&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=payroll&resource=payment_detail&version=v1 document }
                 *
                 * 批量查询发薪明细
                 *
                 * 根据 __发薪活动 ID 列表__ 、__发薪日起止时间__ 和 __飞书人事雇佣 ID 列表__ 分页查询发薪明细列表和关联的算薪明细分段数据。;;
                 *
                 * 当前接口仅支持查询某些员工在特定范围内的发薪明细，若需要查询某个发薪活动下的所有发薪明细数据，请使用[查询发薪活动明细列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_activity_detail/list)接口。;;## 注意事项;1. 批量查询发薪明细接口提供的请求参数中，用户必须填写「__发薪日起止时间__（pay_period_start_date，pay_period_end_date）」或「__发薪活动 ID 列表__」，当传入的三个参数均为空时，开放接口将返回 2500006 错误码。;2. 每一次调用接口时，系统最多会扫描 __50__ 个发薪活动，当用户传入的查询条件命中的发薪活动个数大于 __50__ 时，开放接口将根据查询参数返回 2500003 或 2500008 错误码，请合理使用查询参数。;3. 开放接口中的「员工的飞书人事雇佣 ID 列表（employee_ids）」参数为必填。;4. **批量查询发薪明细接口数据取自发薪活动**，调用前请先创建发薪活动并完成算薪活动关联。
                 */
                query: async (
                    payload?: {
                        data: {
                            page_index: number;
                            page_size: number;
                            acct_item_ids?: Array<string>;
                            employee_ids: Array<string>;
                            pay_period_start_date?: string;
                            pay_period_end_date?: string;
                            activity_ids?: Array<string>;
                            include_segment_data?: boolean;
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
                                    payment_details?: Array<{
                                        employee_id?: string;
                                        activity_id?: string;
                                        payment_accounting_items?: Array<{
                                            id?: string;
                                            accounting_item_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            accounting_item_value?: {
                                                original_value?: string;
                                                reference_values?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                            };
                                            segment_values?: Array<{
                                                start_time?: string;
                                                end_time?: string;
                                                reference_values?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                                original_value?: string;
                                            }>;
                                            accounting_item_type?: number;
                                        }>;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/payment_detail/query`,
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
             * payment_activity
             */
            paymentActivity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=payment_activity&apiName=archive&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=archive&project=payroll&resource=payment_activity&version=v1 document }
                 *
                 * 封存发薪活动
                 *
                 * 根据发薪活动ID对发薪活动进行封存。注意：仅当发薪活动状态为审批通过时，方可进行封存。
                 */
                archive: async (
                    payload?: {
                        data: { activity_id: string };
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
                                `${this.domain}/open-apis/payroll/v1/payment_activitys/archive`,
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            pay_period_start_date: string;
                            pay_period_end_date: string;
                            page_size: number;
                            page_token?: string;
                            statuses?: Array<number>;
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
                                    `${this.domain}/open-apis/payroll/v1/payment_activitys`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    payment_activitys?: Array<{
                                                        activity_id?: string;
                                                        activity_names?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        pay_date?: string;
                                                        total_number_of_payroll?: number;
                                                        number_of_calculation_activities?: number;
                                                        calculation_activities?: Array<{
                                                            calculation_activity_id?: string;
                                                            calculation_activity_names?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                        }>;
                                                        activity_status?: number;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=payment_activity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=payment_activity&version=v1 document }
                 *
                 * 查询发薪活动列表
                 *
                 * 根据「发薪日起止范围」、「发薪活动状态」和「分页参数」查询发薪活动列表。
                 */
                list: async (
                    payload?: {
                        params: {
                            pay_period_start_date: string;
                            pay_period_end_date: string;
                            page_size: number;
                            page_token?: string;
                            statuses?: Array<number>;
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
                                    payment_activitys?: Array<{
                                        activity_id?: string;
                                        activity_names?: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        pay_date?: string;
                                        total_number_of_payroll?: number;
                                        number_of_calculation_activities?: number;
                                        calculation_activities?: Array<{
                                            calculation_activity_id?: string;
                                            calculation_activity_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                        }>;
                                        activity_status?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/payment_activitys`,
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
             * calendar
             */
            calendar: {
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
                                    `${this.domain}/open-apis/payroll/v1/calendars`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        id?: string;
                                                        names?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        region?: string;
                                                        work_calendar?: string;
                                                        time_zone?: string;
                                                        payroll_cycle?: number;
                                                        status?: number;
                                                        creator_id?: string;
                                                        create_time?: string;
                                                        effective_date?: string;
                                                        period_years?: Array<string>;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=calendar&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=calendar&version=v1 document }
                 *
                 * 获取算薪日历列表
                 *
                 * 批量获取算薪日历列表
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
                                        id?: string;
                                        names?: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        region?: string;
                                        work_calendar?: string;
                                        time_zone?: string;
                                        payroll_cycle?: number;
                                        status?: number;
                                        creator_id?: string;
                                        create_time?: string;
                                        effective_date?: string;
                                        period_years?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/calendars`,
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
             * collection_detail
             */
            collectionDetail: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            country_region_alpha3_codes: Array<string>;
                            approval_pass_start_time: string;
                            approval_pass_end_time: string;
                            page_size: number;
                            page_token?: string;
                            template_ids?: Array<string>;
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
                                    `${this.domain}/open-apis/payroll/v1/collection_details`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    emp_activity_datas?: Array<{
                                                        employment_id?: string;
                                                        activities?: Array<{
                                                            activity_id?: string;
                                                            template_id?: string;
                                                            template_version_id?: string;
                                                            calendar_period?: {
                                                                period_start_date?: string;
                                                                period_end_date?: string;
                                                                period_key?: string;
                                                                period_name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                                payroll_cycle?: number;
                                                                time_zone?: string;
                                                                pay_date?: string;
                                                                payroll_calendar_id?: string;
                                                                cut_off_date?: string;
                                                                taxable_period?: string;
                                                                manual_modified?: boolean;
                                                                attendance_start_date?: string;
                                                                attendance_end_date?: string;
                                                                cut_off_date_for_paylist?: string;
                                                            };
                                                            calendar_effective_date?: string;
                                                            country_regions?: Array<{
                                                                id?: string;
                                                                alpha3_code?: string;
                                                            }>;
                                                            collection_employee_datas?: Array<{
                                                                row_id?: string;
                                                                activity_id?: string;
                                                                employee_info?: {
                                                                    user_id?: string;
                                                                    name?: {
                                                                        zh_cn?: string;
                                                                        en_us?: string;
                                                                    };
                                                                    employee_number?: string;
                                                                    employee_id?: string;
                                                                };
                                                                collection_datas?: Array<{
                                                                    id?: string;
                                                                    collection_type?: number;
                                                                    data_period?: {
                                                                        start_date?: string;
                                                                        end_date?: string;
                                                                    };
                                                                    currency_id?: string;
                                                                    currency_code?: string;
                                                                    collection_item_values?: Array<{
                                                                        item_id?: string;
                                                                        value?: string;
                                                                        field_type?: number;
                                                                        currency_id?: string;
                                                                        currency_code?: string;
                                                                    }>;
                                                                    template_snapshot?: {
                                                                        template_id?: string;
                                                                        template_name?: {
                                                                            zh_cn?: string;
                                                                            en_us?: string;
                                                                        };
                                                                        template_version_id?: string;
                                                                        items?: Array<{
                                                                            template_id?: string;
                                                                            template_version_id?: string;
                                                                            item_id?: string;
                                                                            item_name?: {
                                                                                zh_cn?: string;
                                                                                en_us?: string;
                                                                            };
                                                                            field_type?: number;
                                                                            decimal_places?: number;
                                                                            calc_method?: number;
                                                                            preset?: boolean;
                                                                            is_required?: boolean;
                                                                        }>;
                                                                        activity_id?: string;
                                                                    };
                                                                    created_at?: string;
                                                                    modified_at?: string;
                                                                    creator_info?: {
                                                                        user_id?: string;
                                                                        name?: {
                                                                            zh_cn?: string;
                                                                            en_us?: string;
                                                                        };
                                                                        employee_number?: string;
                                                                        employee_id?: string;
                                                                    };
                                                                    modifier_info?: {
                                                                        user_id?: string;
                                                                        name?: {
                                                                            zh_cn?: string;
                                                                            en_us?: string;
                                                                        };
                                                                        employee_number?: string;
                                                                        employee_id?: string;
                                                                    };
                                                                    calendar_period?: {
                                                                        period_start_date?: string;
                                                                        period_end_date?: string;
                                                                        period_key?: string;
                                                                        period_name?: {
                                                                            zh_cn?: string;
                                                                            en_us?: string;
                                                                        };
                                                                        payroll_cycle?: number;
                                                                        time_zone?: string;
                                                                        pay_date?: string;
                                                                        payroll_calendar_id?: string;
                                                                        cut_off_date?: string;
                                                                        taxable_period?: string;
                                                                        manual_modified?: boolean;
                                                                        attendance_start_date?: string;
                                                                        attendance_end_date?: string;
                                                                        cut_off_date_for_paylist?: string;
                                                                    };
                                                                    effective_time?: string;
                                                                    source_activity_id?: string;
                                                                    status?: number;
                                                                    related_data_id?: string;
                                                                }>;
                                                            }>;
                                                            activity_approval_pass_time?: string;
                                                        }>;
                                                    }>;
                                                    activity_template_snapshots?: Array<{
                                                        template_id?: string;
                                                        template_name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        template_version_id?: string;
                                                        items?: Array<{
                                                            template_id?: string;
                                                            template_version_id?: string;
                                                            item_id?: string;
                                                            item_name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            field_type?: number;
                                                            decimal_places?: number;
                                                            calc_method?: number;
                                                            preset?: boolean;
                                                            is_required?: boolean;
                                                        }>;
                                                        activity_id?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    total?: number;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=collection_detail&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=collection_detail&version=v1 document }
                 *
                 * 查询填报明细数据列表
                 *
                 * 查询填报明细数据列表
                 */
                list: async (
                    payload?: {
                        params: {
                            country_region_alpha3_codes: Array<string>;
                            approval_pass_start_time: string;
                            approval_pass_end_time: string;
                            page_size: number;
                            page_token?: string;
                            template_ids?: Array<string>;
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
                                    emp_activity_datas?: Array<{
                                        employment_id?: string;
                                        activities?: Array<{
                                            activity_id?: string;
                                            template_id?: string;
                                            template_version_id?: string;
                                            calendar_period?: {
                                                period_start_date?: string;
                                                period_end_date?: string;
                                                period_key?: string;
                                                period_name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                payroll_cycle?: number;
                                                time_zone?: string;
                                                pay_date?: string;
                                                payroll_calendar_id?: string;
                                                cut_off_date?: string;
                                                taxable_period?: string;
                                                manual_modified?: boolean;
                                                attendance_start_date?: string;
                                                attendance_end_date?: string;
                                                cut_off_date_for_paylist?: string;
                                            };
                                            calendar_effective_date?: string;
                                            country_regions?: Array<{
                                                id?: string;
                                                alpha3_code?: string;
                                            }>;
                                            collection_employee_datas?: Array<{
                                                row_id?: string;
                                                activity_id?: string;
                                                employee_info?: {
                                                    user_id?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    employee_number?: string;
                                                    employee_id?: string;
                                                };
                                                collection_datas?: Array<{
                                                    id?: string;
                                                    collection_type?: number;
                                                    data_period?: {
                                                        start_date?: string;
                                                        end_date?: string;
                                                    };
                                                    currency_id?: string;
                                                    currency_code?: string;
                                                    collection_item_values?: Array<{
                                                        item_id?: string;
                                                        value?: string;
                                                        field_type?: number;
                                                        currency_id?: string;
                                                        currency_code?: string;
                                                    }>;
                                                    template_snapshot?: {
                                                        template_id?: string;
                                                        template_name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        template_version_id?: string;
                                                        items?: Array<{
                                                            template_id?: string;
                                                            template_version_id?: string;
                                                            item_id?: string;
                                                            item_name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            field_type?: number;
                                                            decimal_places?: number;
                                                            calc_method?: number;
                                                            preset?: boolean;
                                                            is_required?: boolean;
                                                        }>;
                                                        activity_id?: string;
                                                    };
                                                    created_at?: string;
                                                    modified_at?: string;
                                                    creator_info?: {
                                                        user_id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        employee_number?: string;
                                                        employee_id?: string;
                                                    };
                                                    modifier_info?: {
                                                        user_id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        employee_number?: string;
                                                        employee_id?: string;
                                                    };
                                                    calendar_period?: {
                                                        period_start_date?: string;
                                                        period_end_date?: string;
                                                        period_key?: string;
                                                        period_name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        payroll_cycle?: number;
                                                        time_zone?: string;
                                                        pay_date?: string;
                                                        payroll_calendar_id?: string;
                                                        cut_off_date?: string;
                                                        taxable_period?: string;
                                                        manual_modified?: boolean;
                                                        attendance_start_date?: string;
                                                        attendance_end_date?: string;
                                                        cut_off_date_for_paylist?: string;
                                                    };
                                                    effective_time?: string;
                                                    source_activity_id?: string;
                                                    status?: number;
                                                    related_data_id?: string;
                                                }>;
                                            }>;
                                            activity_approval_pass_time?: string;
                                        }>;
                                    }>;
                                    activity_template_snapshots?: Array<{
                                        template_id?: string;
                                        template_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        template_version_id?: string;
                                        items?: Array<{
                                            template_id?: string;
                                            template_version_id?: string;
                                            item_id?: string;
                                            item_name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            field_type?: number;
                                            decimal_places?: number;
                                            calc_method?: number;
                                            preset?: boolean;
                                            is_required?: boolean;
                                        }>;
                                        activity_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/collection_details`,
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
             * cost_allocation_plan
             */
            costAllocationPlan: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            pay_period: string;
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
                                    `${this.domain}/open-apis/payroll/v1/cost_allocation_plans`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        id?: string;
                                                        names?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        applicable_country_region?: string;
                                                        dimensions?: Array<{
                                                            i18n_names?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            api_name?: string;
                                                            obj_api_name?: string;
                                                        }>;
                                                        cost_items?: Array<{
                                                            id?: string;
                                                            name?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            enable_correct?: boolean;
                                                        }>;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=cost_allocation_plan&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=cost_allocation_plan&version=v1 document }
                 *
                 * 批量查询成本分摊方案
                 *
                 * 根据期间分页批量查询成本分摊方案，仅返回期间内生效的方案列表。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            pay_period: string;
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
                                        names?: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        applicable_country_region?: string;
                                        dimensions?: Array<{
                                            i18n_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            api_name?: string;
                                            obj_api_name?: string;
                                        }>;
                                        cost_items?: Array<{
                                            id?: string;
                                            name?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            enable_correct?: boolean;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/cost_allocation_plans`,
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
             * payment_activity_detail
             */
            paymentActivityDetail: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=payment_activity_detail&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=payment_activity_detail&version=v1 document }
                 *
                 * 查询发薪活动明细列表
                 *
                 * 根据「发薪活动 ID 」和「分页参数」查询发薪活动明细列表和关联的算薪明细分段数据。
                 *
                 * ## 使用场景;;> 当前接口仅支持查询某个发薪活动下的所有发薪明细数据，若需要查询某些员工在特定范围内的发薪明细，请使用[批量查询发薪明细](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_detail/query)接口。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_index: number;
                            page_size: number;
                            activity_id: string;
                            include_segment_data?: boolean;
                            acct_item_ids?: Array<string>;
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
                                    payment_activity_details?: Array<{
                                        employee_id?: string;
                                        payment_details?: Array<{
                                            id?: string;
                                            accounting_item_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            accounting_item_value?: {
                                                original_value?: string;
                                                reference_values?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                            };
                                            segment_values?: Array<{
                                                start_time?: string;
                                                end_time?: string;
                                                reference_values?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                                original_value?: string;
                                            }>;
                                            accounting_item_type?: number;
                                        }>;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/payment_activity_details`,
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
             * calendar_period
             */
            calendarPeriod: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=calendar_period&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=calendar_period&version=v1 document }
                 *
                 * 获取日历期间信息
                 *
                 * 根据算薪日历ID以及年份获取对应的期间信息
                 */
                list: async (
                    payload?: {
                        params: {
                            calendar_id: string;
                            period_years?: Array<string>;
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
                                    calendar_id?: string;
                                    periods?: Array<{
                                        period_start_date?: string;
                                        period_end_date?: string;
                                        period_key?: string;
                                        period_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        payroll_cycle?: number;
                                        time_zone?: string;
                                        pay_date?: string;
                                        payroll_calendar_id?: string;
                                        cut_off_date?: string;
                                        taxable_period?: string;
                                        manual_modified?: boolean;
                                        attendance_start_date?: string;
                                        attendance_end_date?: string;
                                        cut_off_date_for_paylist?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/calendar_periods`,
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
             * cost_allocation_detail
             */
            costAllocationDetail: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=cost_allocation_detail&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=payroll&resource=cost_allocation_detail&version=v1 document }
                 *
                 * 写入成本分摊更正数据
                 *
                 * 根据报表三元组（方案id，期间，报表类型）写入成本分摊更正数据。若存在未提交的OpenAPI写入数据，会通过（employeeID,维度值,成本项）匹配数据，存在则更正，否则新建。
                 */
                create: async (
                    payload?: {
                        data: {
                            cost_plan_id: string;
                            period: string;
                            report_type: number;
                            correct_details: Array<{
                                employee_id: string;
                                active_status: number;
                                dimensions?: Array<{
                                    obj_api_name: string;
                                    api_name: string;
                                    value: string;
                                }>;
                                cost_items?: Array<{
                                    id?: string;
                                    value?: string;
                                }>;
                            }>;
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
                                    fail_infos?: Array<{
                                        idx?: number;
                                        error_code?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/cost_allocation_details`,
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            cost_allocation_plan_id: string;
                            pay_period: string;
                            report_type: number;
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
                                    `${this.domain}/open-apis/payroll/v1/cost_allocation_details`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    cost_allocation_report_datas?: Array<{
                                                        data_summary_dimensions?: Array<{
                                                            dimension_level?: number;
                                                            dimension_type?: number;
                                                            dimension_value_id?: string;
                                                            enum_dimension?: {
                                                                enum_value_id?: string;
                                                                enum_key?: string;
                                                            };
                                                            dimension_value_lookup_info?: {
                                                                type?: string;
                                                                id?: string;
                                                                code?: string;
                                                            };
                                                            dimension_names?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            dimension_titles?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                        }>;
                                                        compensation_cost_item?: {
                                                            number_of_individuals_for_payment?: number;
                                                            compensation_costs?: Array<{
                                                                compensation_cost_value?: string;
                                                                i18n_names?: Array<{
                                                                    locale?: string;
                                                                    value?: string;
                                                                    id?: string;
                                                                }>;
                                                            }>;
                                                        };
                                                        employment_id?: string;
                                                    }>;
                                                    cost_allocation_report_names?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                        id?: string;
                                                    }>;
                                                    pay_period?: string;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=cost_allocation_detail&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=cost_allocation_detail&version=v1 document }
                 *
                 * 查询成本分摊报表明细
                 *
                 * 根据报表方案、期间、和报表类型获取成本分摊明细数据。调用接口前，需打开「财务过账」开关，并且完成发布成本分摊报表。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            cost_allocation_plan_id: string;
                            pay_period: string;
                            report_type: number;
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
                                    cost_allocation_report_datas?: Array<{
                                        data_summary_dimensions?: Array<{
                                            dimension_level?: number;
                                            dimension_type?: number;
                                            dimension_value_id?: string;
                                            enum_dimension?: {
                                                enum_value_id?: string;
                                                enum_key?: string;
                                            };
                                            dimension_value_lookup_info?: {
                                                type?: string;
                                                id?: string;
                                                code?: string;
                                            };
                                            dimension_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            dimension_titles?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                        }>;
                                        compensation_cost_item?: {
                                            number_of_individuals_for_payment?: number;
                                            compensation_costs?: Array<{
                                                compensation_cost_value?: string;
                                                i18n_names?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                            }>;
                                        };
                                        employment_id?: string;
                                    }>;
                                    cost_allocation_report_names?: Array<{
                                        locale?: string;
                                        value?: string;
                                        id?: string;
                                    }>;
                                    pay_period?: string;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/cost_allocation_details`,
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
             * dmp_original_data
             */
            dmpOriginalData: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            country: string;
                            object_name: string;
                            version_date: string;
                            page_token?: string;
                            employee_numbers?: Array<string>;
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
                                    `${this.domain}/open-apis/payroll/v1/dmp_original_data`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items: Array<{
                                                        employee_number?: string;
                                                        time_periods?: Array<{
                                                            from_date?: string;
                                                            to_date?: string;
                                                            fields?: Array<{
                                                                key?: string;
                                                                value?: string;
                                                                type?: number;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    object_name: string;
                                                    sub_object_group_by_fields: Array<string>;
                                                    count: number;
                                                    has_more: boolean;
                                                    page_token?: string;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=dmp_original_data&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=dmp_original_data&version=v1 document }
                 *
                 * 获取DMP原始数据
                 *
                 * 用于获取字节海外算薪数据，支持获取指定日期的数据
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            country: string;
                            object_name: string;
                            version_date: string;
                            page_token?: string;
                            employee_numbers?: Array<string>;
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
                                    items: Array<{
                                        employee_number?: string;
                                        time_periods?: Array<{
                                            from_date?: string;
                                            to_date?: string;
                                            fields?: Array<{
                                                key?: string;
                                                value?: string;
                                                type?: number;
                                            }>;
                                        }>;
                                    }>;
                                    object_name: string;
                                    sub_object_group_by_fields: Array<string>;
                                    count: number;
                                    has_more: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/dmp_original_data`,
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
             * dmp_change_event
             */
            dmpChangeEvent: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            country: string;
                            object_name: string;
                            change_date: string;
                            page_token?: string;
                            employee_numbers?: Array<string>;
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
                                    `${this.domain}/open-apis/payroll/v1/dmp_change_events`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items: Array<{
                                                        employee_number?: string;
                                                        old_version_data?: Array<{
                                                            from_date?: string;
                                                            to_date?: string;
                                                            fields?: Array<{
                                                                key?: string;
                                                                value?: string;
                                                                type?: number;
                                                            }>;
                                                        }>;
                                                        new_version_data?: Array<{
                                                            from_date?: string;
                                                            to_date?: string;
                                                            fields?: Array<{
                                                                key?: string;
                                                                value?: string;
                                                                type?: number;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    object_name: string;
                                                    sub_object_group_by_fields: Array<string>;
                                                    count: number;
                                                    has_more: boolean;
                                                    page_token?: string;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=dmp_change_event&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=dmp_change_event&version=v1 document }
                 *
                 * 获取 DMP 变更事件
                 *
                 * 用于获取字节海外算薪数据变更事件，支持按指定日期获取
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            country: string;
                            object_name: string;
                            change_date: string;
                            page_token?: string;
                            employee_numbers?: Array<string>;
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
                                    items: Array<{
                                        employee_number?: string;
                                        old_version_data?: Array<{
                                            from_date?: string;
                                            to_date?: string;
                                            fields?: Array<{
                                                key?: string;
                                                value?: string;
                                                type?: number;
                                            }>;
                                        }>;
                                        new_version_data?: Array<{
                                            from_date?: string;
                                            to_date?: string;
                                            fields?: Array<{
                                                key?: string;
                                                value?: string;
                                                type?: number;
                                            }>;
                                        }>;
                                    }>;
                                    object_name: string;
                                    sub_object_group_by_fields: Array<string>;
                                    count: number;
                                    has_more: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/dmp_change_events`,
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
             * donations_tax_data
             */
            donationsTaxData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=donations_tax_data&apiName=fetch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=fetch&project=payroll&resource=donations_tax_data&version=v1 document }
                 *
                 * 拉取员工捐赠报税数据
                 *
                 * 根据月份和工号拉取员工的捐赠报税数据
                 */
                fetch: async (
                    payload?: {
                        data?: {
                            employee_ids?: Array<string>;
                            year?: string;
                            month?: string;
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
                                    results?: Array<{
                                        employee_id?: number;
                                        legal_name?: string;
                                        identity_type?: string;
                                        identity_number?: string;
                                        issuing_company?: string;
                                        non_tax_residence?: string;
                                        total_donation_amount?: string;
                                        tax_free_donation_amount30?: string;
                                        tax_free_donation_amount100?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/donations_tax_data/fetch`,
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
             * datasource
             */
            datasource: {
                listWithIterator: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
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
                                    `${this.domain}/open-apis/payroll/v1/datasources`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    page_token?: string;
                                                    has_more: boolean;
                                                    datasources: Array<{
                                                        code: string;
                                                        i18n_names: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        active_status: number;
                                                        fields: Array<{
                                                            code: string;
                                                            i18n_names: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            field_type: number;
                                                            active_status: number;
                                                            i18n_description?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            decimal_places?: number;
                                                        }>;
                                                        i18n_description?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        data_period_type?: number;
                                                    }>;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=datasource&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=datasource&version=v1 document }
                 *
                 * 获取外部数据源配置信息
                 *
                 * 批量查询飞书人事后台：设置->算薪数据设置->外部数据源设置 中的数据源设置列表
                 *
                 * 停用的数据源、字段不能保存数据
                 */
                list: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
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
                                    page_token?: string;
                                    has_more: boolean;
                                    datasources: Array<{
                                        code: string;
                                        i18n_names: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        active_status: number;
                                        fields: Array<{
                                            code: string;
                                            i18n_names: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            field_type: number;
                                            active_status: number;
                                            i18n_description?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            decimal_places?: number;
                                        }>;
                                        i18n_description?: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        data_period_type?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/datasources`,
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
             * verification_activity_row
             */
            verificationActivityRow: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            activity_id?: string;
                            employment_ids?: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            need_total?: boolean;
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
                                    `${this.domain}/open-apis/payroll/v1/verification_activity_rows`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    total?: number;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    activity_rows?: Array<{
                                                        row_id?: string;
                                                        employment_id?: string;
                                                        activity_id?: string;
                                                        employee_number?: string;
                                                        employee_id?: string;
                                                        working_hours_type?: {
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        };
                                                        pay_group?: {
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        };
                                                        start_date?: string;
                                                        end_date?: string;
                                                        cutoff_date?: string;
                                                        item_values?: Array<{
                                                            item_id?: string;
                                                            value?: string;
                                                            is_ref?: boolean;
                                                            name?: {
                                                                id?: string;
                                                                zh_name?: string;
                                                                en_name?: string;
                                                            };
                                                        }>;
                                                        prorations?: Array<{
                                                            start_date?: string;
                                                            end_date?: string;
                                                            cutoff_date?: string;
                                                            item_values?: Array<{
                                                                item_id?: string;
                                                                value?: string;
                                                                is_ref?: boolean;
                                                                name?: {
                                                                    id?: string;
                                                                    zh_name?: string;
                                                                    en_name?: string;
                                                                };
                                                            }>;
                                                        }>;
                                                    }>;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=verification_activity_row&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=verification_activity_row&version=v1 document }
                 *
                 * 获取核对活动结果数据
                 */
                list: async (
                    payload?: {
                        params?: {
                            activity_id?: string;
                            employment_ids?: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            need_total?: boolean;
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
                                    total?: number;
                                    has_more?: boolean;
                                    page_token?: string;
                                    activity_rows?: Array<{
                                        row_id?: string;
                                        employment_id?: string;
                                        activity_id?: string;
                                        employee_number?: string;
                                        employee_id?: string;
                                        working_hours_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        pay_group?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        start_date?: string;
                                        end_date?: string;
                                        cutoff_date?: string;
                                        item_values?: Array<{
                                            item_id?: string;
                                            value?: string;
                                            is_ref?: boolean;
                                            name?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                        }>;
                                        prorations?: Array<{
                                            start_date?: string;
                                            end_date?: string;
                                            cutoff_date?: string;
                                            item_values?: Array<{
                                                item_id?: string;
                                                value?: string;
                                                is_ref?: boolean;
                                                name?: {
                                                    id?: string;
                                                    zh_name?: string;
                                                    en_name?: string;
                                                };
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/verification_activity_rows`,
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
             * verification_activity
             */
            verificationActivity: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            plan_ids?: Array<string>;
                            activity_ids?: Array<string>;
                            pay_period_seqs?: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            need_total?: boolean;
                            update_time_greate_than?: string;
                            update_time_greate_equal_than?: string;
                            update_time_less_than?: string;
                            update_time_less_equal_than?: string;
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
                                    `${this.domain}/open-apis/payroll/v1/verification_activities`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    total?: number;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    activities?: Array<{
                                                        activity_id?: string;
                                                        plan_id?: string;
                                                        version_id?: string;
                                                        name?: {
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        };
                                                        activity_status?: number;
                                                        pay_period_seq?: string;
                                                        retro_period_seq?: string;
                                                        plan_snapshot?: {
                                                            is_retro?: boolean;
                                                            is_collect?: boolean;
                                                            is_proration?: boolean;
                                                            country_region?: {
                                                                id?: string;
                                                                zh_name?: string;
                                                                en_name?: string;
                                                            };
                                                            currency?: {
                                                                id?: string;
                                                                zh_name?: string;
                                                                en_name?: string;
                                                            };
                                                            calendar_type?: number;
                                                            pay_calendars?: Array<{
                                                                id?: string;
                                                                zh_name?: string;
                                                                en_name?: string;
                                                                calendar_source?: number;
                                                            }>;
                                                            scope_type?: number;
                                                            pay_groups?: Array<{
                                                                id?: string;
                                                                zh_name?: string;
                                                                en_name?: string;
                                                            }>;
                                                            filter_type?: number;
                                                            filter_rule?: {
                                                                filter_conditions?: Array<{
                                                                    left_value?: {
                                                                        api_name?: string;
                                                                        field_type?: number;
                                                                        value?: string;
                                                                        ref_id?: string;
                                                                        currency?: {
                                                                            id?: string;
                                                                            zh_name?: string;
                                                                            en_name?: string;
                                                                        };
                                                                    };
                                                                    operator_type?: number;
                                                                    right_values?: Array<{
                                                                        api_name?: string;
                                                                        field_type?: number;
                                                                        value?: string;
                                                                        ref_id?: string;
                                                                        currency?: {
                                                                            id?: string;
                                                                            zh_name?: string;
                                                                            en_name?: string;
                                                                        };
                                                                    }>;
                                                                }>;
                                                                filter_relationship?: string;
                                                            };
                                                            approval_type?: number;
                                                            items?: Array<{
                                                                item_id?: string;
                                                                item_name?: {
                                                                    id?: string;
                                                                    zh_name?: string;
                                                                    en_name?: string;
                                                                };
                                                                field_type?: number;
                                                                decimal_places?: number;
                                                                aggregation_type?: number;
                                                                seq?: number;
                                                                source_type?: number;
                                                                source_config?: {
                                                                    formula_config?: {
                                                                        formula_id?: string;
                                                                        formula_item_id?: string;
                                                                        formula_text?: string;
                                                                        api_name?: string;
                                                                        source_aggregation_type?: number;
                                                                        ref_type?: number;
                                                                    };
                                                                    ref_source_config?: {
                                                                        formula_id?: string;
                                                                        formula_item_id?: string;
                                                                        formula_text?: string;
                                                                        api_name?: string;
                                                                        source_aggregation_type?: number;
                                                                        ref_type?: number;
                                                                    };
                                                                };
                                                                status?: number;
                                                            }>;
                                                            data_source_rule?: {
                                                                api_name?: string;
                                                                datasource_name?: {
                                                                    id?: string;
                                                                    zh_name?: string;
                                                                    en_name?: string;
                                                                };
                                                                object_type?: number;
                                                                datasource_items?: Array<{
                                                                    name?: {
                                                                        id?: string;
                                                                        zh_name?: string;
                                                                        en_name?: string;
                                                                    };
                                                                    field_id?: string;
                                                                    field_type?: number;
                                                                    object_api_name?: string;
                                                                    field_api_name?: string;
                                                                    decimal_places?: number;
                                                                    object_type?: number;
                                                                    source_type?: number;
                                                                }>;
                                                            };
                                                        };
                                                        update_time?: number;
                                                        approve_time?: number;
                                                    }>;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=verification_activity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=verification_activity&version=v1 document }
                 *
                 * 获取核对活动信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            plan_ids?: Array<string>;
                            activity_ids?: Array<string>;
                            pay_period_seqs?: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            need_total?: boolean;
                            update_time_greate_than?: string;
                            update_time_greate_equal_than?: string;
                            update_time_less_than?: string;
                            update_time_less_equal_than?: string;
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
                                    total?: number;
                                    has_more?: boolean;
                                    page_token?: string;
                                    activities?: Array<{
                                        activity_id?: string;
                                        plan_id?: string;
                                        version_id?: string;
                                        name?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        activity_status?: number;
                                        pay_period_seq?: string;
                                        retro_period_seq?: string;
                                        plan_snapshot?: {
                                            is_retro?: boolean;
                                            is_collect?: boolean;
                                            is_proration?: boolean;
                                            country_region?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            currency?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            calendar_type?: number;
                                            pay_calendars?: Array<{
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                                calendar_source?: number;
                                            }>;
                                            scope_type?: number;
                                            pay_groups?: Array<{
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            }>;
                                            filter_type?: number;
                                            filter_rule?: {
                                                filter_conditions?: Array<{
                                                    left_value?: {
                                                        api_name?: string;
                                                        field_type?: number;
                                                        value?: string;
                                                        ref_id?: string;
                                                        currency?: {
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        };
                                                    };
                                                    operator_type?: number;
                                                    right_values?: Array<{
                                                        api_name?: string;
                                                        field_type?: number;
                                                        value?: string;
                                                        ref_id?: string;
                                                        currency?: {
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        };
                                                    }>;
                                                }>;
                                                filter_relationship?: string;
                                            };
                                            approval_type?: number;
                                            items?: Array<{
                                                item_id?: string;
                                                item_name?: {
                                                    id?: string;
                                                    zh_name?: string;
                                                    en_name?: string;
                                                };
                                                field_type?: number;
                                                decimal_places?: number;
                                                aggregation_type?: number;
                                                seq?: number;
                                                source_type?: number;
                                                source_config?: {
                                                    formula_config?: {
                                                        formula_id?: string;
                                                        formula_item_id?: string;
                                                        formula_text?: string;
                                                        api_name?: string;
                                                        source_aggregation_type?: number;
                                                        ref_type?: number;
                                                    };
                                                    ref_source_config?: {
                                                        formula_id?: string;
                                                        formula_item_id?: string;
                                                        formula_text?: string;
                                                        api_name?: string;
                                                        source_aggregation_type?: number;
                                                        ref_type?: number;
                                                    };
                                                };
                                                status?: number;
                                            }>;
                                            data_source_rule?: {
                                                api_name?: string;
                                                datasource_name?: {
                                                    id?: string;
                                                    zh_name?: string;
                                                    en_name?: string;
                                                };
                                                object_type?: number;
                                                datasource_items?: Array<{
                                                    name?: {
                                                        id?: string;
                                                        zh_name?: string;
                                                        en_name?: string;
                                                    };
                                                    field_id?: string;
                                                    field_type?: number;
                                                    object_api_name?: string;
                                                    field_api_name?: string;
                                                    decimal_places?: number;
                                                    object_type?: number;
                                                    source_type?: number;
                                                }>;
                                            };
                                        };
                                        update_time?: number;
                                        approve_time?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/verification_activities`,
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
             * verification_plan
             */
            verificationPlan: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            plan_ids?: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            need_total?: boolean;
                            update_time_greate_than?: string;
                            update_time_greate_equal_than?: string;
                            update_time_less_than?: string;
                            update_time_less_equal_than?: string;
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
                                    `${this.domain}/open-apis/payroll/v1/verification_plans`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    page_token?: string;
                                                    plans?: Array<{
                                                        plan_id?: string;
                                                        version_id?: string;
                                                        time_zone?: string;
                                                        is_active?: boolean;
                                                        effective_period_seq?: string;
                                                        name?: {
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        };
                                                        country_region_id?: {
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        };
                                                        currency_id?: {
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        };
                                                        calendar_type?: number;
                                                        pay_calendars?: Array<{
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                            calendar_source?: number;
                                                        }>;
                                                        scope_type?: number;
                                                        pay_groups?: Array<{
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        }>;
                                                        datasource_config?: {
                                                            filter_type?: number;
                                                            filter_rule?: {
                                                                filter_conditions?: Array<{
                                                                    left_value?: {
                                                                        api_name?: string;
                                                                        field_type?: number;
                                                                        value?: string;
                                                                        ref_id?: string;
                                                                        currency?: {
                                                                            id?: string;
                                                                            zh_name?: string;
                                                                            en_name?: string;
                                                                        };
                                                                    };
                                                                    operator_type?: number;
                                                                    right_values?: Array<{
                                                                        api_name?: string;
                                                                        field_type?: number;
                                                                        value?: string;
                                                                        ref_id?: string;
                                                                        currency?: {
                                                                            id?: string;
                                                                            zh_name?: string;
                                                                            en_name?: string;
                                                                        };
                                                                    }>;
                                                                }>;
                                                                filter_relationship?: string;
                                                            };
                                                            is_collect?: boolean;
                                                            is_proration?: boolean;
                                                            is_retro?: boolean;
                                                            items?: Array<{
                                                                item_id?: string;
                                                                item_name?: {
                                                                    id?: string;
                                                                    zh_name?: string;
                                                                    en_name?: string;
                                                                };
                                                                field_type?: number;
                                                                decimal_places?: number;
                                                                aggregation_type?: number;
                                                                seq?: number;
                                                                source_type?: number;
                                                                source_config?: {
                                                                    formula_config?: {
                                                                        formula_id?: string;
                                                                        formula_item_id?: string;
                                                                        formula_text?: string;
                                                                        api_name?: string;
                                                                        source_aggregation_type?: number;
                                                                        ref_type?: number;
                                                                    };
                                                                    ref_source_config?: {
                                                                        formula_id?: string;
                                                                        formula_item_id?: string;
                                                                        formula_text?: string;
                                                                        api_name?: string;
                                                                        source_aggregation_type?: number;
                                                                        ref_type?: number;
                                                                    };
                                                                };
                                                                status?: number;
                                                            }>;
                                                            data_source_rule?: {
                                                                api_name?: string;
                                                                datasource_name?: {
                                                                    id?: string;
                                                                    zh_name?: string;
                                                                    en_name?: string;
                                                                };
                                                                object_type?: number;
                                                                datasource_items?: Array<{
                                                                    name?: {
                                                                        id?: string;
                                                                        zh_name?: string;
                                                                        en_name?: string;
                                                                    };
                                                                    field_id?: string;
                                                                    field_type?: number;
                                                                    object_api_name?: string;
                                                                    field_api_name?: string;
                                                                    decimal_places?: number;
                                                                    object_type?: number;
                                                                    source_type?: number;
                                                                }>;
                                                            };
                                                        };
                                                        approval_type?: number;
                                                        ovbservers?: Array<string>;
                                                        admins?: Array<string>;
                                                        reviewers?: Array<string>;
                                                        plan_type?: number;
                                                        update_time?: number;
                                                    }>;
                                                    total?: number;
                                                    has_more?: boolean;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=verification_plan&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=verification_plan&version=v1 document }
                 *
                 * 获取核对方案信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            plan_ids?: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            need_total?: boolean;
                            update_time_greate_than?: string;
                            update_time_greate_equal_than?: string;
                            update_time_less_than?: string;
                            update_time_less_equal_than?: string;
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
                                    page_token?: string;
                                    plans?: Array<{
                                        plan_id?: string;
                                        version_id?: string;
                                        time_zone?: string;
                                        is_active?: boolean;
                                        effective_period_seq?: string;
                                        name?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        country_region_id?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        currency_id?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        calendar_type?: number;
                                        pay_calendars?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            calendar_source?: number;
                                        }>;
                                        scope_type?: number;
                                        pay_groups?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                        datasource_config?: {
                                            filter_type?: number;
                                            filter_rule?: {
                                                filter_conditions?: Array<{
                                                    left_value?: {
                                                        api_name?: string;
                                                        field_type?: number;
                                                        value?: string;
                                                        ref_id?: string;
                                                        currency?: {
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        };
                                                    };
                                                    operator_type?: number;
                                                    right_values?: Array<{
                                                        api_name?: string;
                                                        field_type?: number;
                                                        value?: string;
                                                        ref_id?: string;
                                                        currency?: {
                                                            id?: string;
                                                            zh_name?: string;
                                                            en_name?: string;
                                                        };
                                                    }>;
                                                }>;
                                                filter_relationship?: string;
                                            };
                                            is_collect?: boolean;
                                            is_proration?: boolean;
                                            is_retro?: boolean;
                                            items?: Array<{
                                                item_id?: string;
                                                item_name?: {
                                                    id?: string;
                                                    zh_name?: string;
                                                    en_name?: string;
                                                };
                                                field_type?: number;
                                                decimal_places?: number;
                                                aggregation_type?: number;
                                                seq?: number;
                                                source_type?: number;
                                                source_config?: {
                                                    formula_config?: {
                                                        formula_id?: string;
                                                        formula_item_id?: string;
                                                        formula_text?: string;
                                                        api_name?: string;
                                                        source_aggregation_type?: number;
                                                        ref_type?: number;
                                                    };
                                                    ref_source_config?: {
                                                        formula_id?: string;
                                                        formula_item_id?: string;
                                                        formula_text?: string;
                                                        api_name?: string;
                                                        source_aggregation_type?: number;
                                                        ref_type?: number;
                                                    };
                                                };
                                                status?: number;
                                            }>;
                                            data_source_rule?: {
                                                api_name?: string;
                                                datasource_name?: {
                                                    id?: string;
                                                    zh_name?: string;
                                                    en_name?: string;
                                                };
                                                object_type?: number;
                                                datasource_items?: Array<{
                                                    name?: {
                                                        id?: string;
                                                        zh_name?: string;
                                                        en_name?: string;
                                                    };
                                                    field_id?: string;
                                                    field_type?: number;
                                                    object_api_name?: string;
                                                    field_api_name?: string;
                                                    decimal_places?: number;
                                                    object_type?: number;
                                                    source_type?: number;
                                                }>;
                                            };
                                        };
                                        approval_type?: number;
                                        ovbservers?: Array<string>;
                                        admins?: Array<string>;
                                        reviewers?: Array<string>;
                                        plan_type?: number;
                                        update_time?: number;
                                    }>;
                                    total?: number;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/verification_plans`,
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
             * cost_allocation_report
             */
            costAllocationReport: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            cost_allocation_plan_id: string;
                            pay_period: string;
                            report_type: number;
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
                                    `${this.domain}/open-apis/payroll/v1/cost_allocation_reports`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    pay_period?: string;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    cost_allocation_report_names?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                        id?: string;
                                                    }>;
                                                    cost_allocation_report_datas?: Array<{
                                                        data_summary_dimensions?: Array<{
                                                            dimension_level?: number;
                                                            dimension_type?: number;
                                                            dimension_value_id?: string;
                                                            enum_dimension?: {
                                                                enum_value_id?: string;
                                                                enum_key?: string;
                                                            };
                                                            dimension_value_lookup_info?: {
                                                                type?: string;
                                                                id?: string;
                                                                code?: string;
                                                            };
                                                            dimension_names?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            dimension_titles?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                        }>;
                                                        compensation_cost_item?: {
                                                            number_of_individuals_for_payment?: number;
                                                            compensation_costs?: Array<{
                                                                compensation_cost_value?: string;
                                                                i18n_names?: Array<{
                                                                    locale?: string;
                                                                    value?: string;
                                                                    id?: string;
                                                                }>;
                                                            }>;
                                                        };
                                                        employment_id?: string;
                                                    }>;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=cost_allocation_report&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=cost_allocation_report&version=v1 document }
                 *
                 * 查询成本分摊报表汇总数据
                 *
                 * 根据算薪期间和成本分摊方案id获取成本分摊汇总数据。调用接口前，需在payroll 系统中打开「财务过账」开关，并且完成发布成本分摊报表。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            cost_allocation_plan_id: string;
                            pay_period: string;
                            report_type: number;
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
                                    pay_period?: string;
                                    page_token?: string;
                                    has_more?: boolean;
                                    cost_allocation_report_names?: Array<{
                                        locale?: string;
                                        value?: string;
                                        id?: string;
                                    }>;
                                    cost_allocation_report_datas?: Array<{
                                        data_summary_dimensions?: Array<{
                                            dimension_level?: number;
                                            dimension_type?: number;
                                            dimension_value_id?: string;
                                            enum_dimension?: {
                                                enum_value_id?: string;
                                                enum_key?: string;
                                            };
                                            dimension_value_lookup_info?: {
                                                type?: string;
                                                id?: string;
                                                code?: string;
                                            };
                                            dimension_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            dimension_titles?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                        }>;
                                        compensation_cost_item?: {
                                            number_of_individuals_for_payment?: number;
                                            compensation_costs?: Array<{
                                                compensation_cost_value?: string;
                                                i18n_names?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                            }>;
                                        };
                                        employment_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/cost_allocation_reports`,
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
             * pay_group
             */
            payGroup: {
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
                                    `${this.domain}/open-apis/payroll/v1/pay_groups`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        pay_group_id: string;
                                                        name: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        code: string;
                                                        status: string;
                                                        country_region?: {
                                                            id?: string;
                                                            alpha3_code?: string;
                                                        };
                                                        is_global_region?: boolean;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=pay_group&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=pay_group&version=v1 document }
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
                                        pay_group_id: string;
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        code: string;
                                        status: string;
                                        country_region?: {
                                            id?: string;
                                            alpha3_code?: string;
                                        };
                                        is_global_region?: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/pay_groups`,
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
             * paygroup
             */
            paygroup: {
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
                                    `${this.domain}/open-apis/payroll/v1/paygroups`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        pay_group_id: string;
                                                        name: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        code: string;
                                                        status: number;
                                                        country_region?: {
                                                            id?: string;
                                                            alpha3_code?: string;
                                                        };
                                                        is_global_region?: boolean;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=paygroup&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=paygroup&version=v1 document }
                 *
                 * 获取薪资组基本信息
                 *
                 * - 薪资组是按薪酬管理的纬度创建的组，组内的员工由相同的HR处理薪酬相关工作，通过薪资组可实现对薪资组人员的管理和在薪酬计算发放等环节的人员权限范围控制;- 本接口返回所有薪资组的基本信息，包括薪资组ID、薪资组名称、薪资组编码、薪资组状态等，不含薪资组下的员工信息
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
                                        pay_group_id: string;
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        code: string;
                                        status: number;
                                        country_region?: {
                                            id?: string;
                                            alpha3_code?: string;
                                        };
                                        is_global_region?: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/paygroups`,
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
             * acct_item
             */
            acctItem: {
                listWithIterator: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
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
                                    `${this.domain}/open-apis/payroll/v1/acct_items`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        id?: string;
                                                        i18n_names?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        category_id?: string;
                                                        data_type?: number;
                                                        decimal_places?: number;
                                                        active_status?: number;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            }
                                        )?.data || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=acct_item&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=acct_item&version=v1 document }
                 *
                 * 批量查询算薪项
                 *
                 * 批量查询算薪项
                 */
                list: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
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
                                        i18n_names?: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        category_id?: string;
                                        data_type?: number;
                                        decimal_places?: number;
                                        active_status?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/acct_items`,
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
        },
    };
}
