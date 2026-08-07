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
             * cost_allocation_detail
             */
            costAllocationDetail: {
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
