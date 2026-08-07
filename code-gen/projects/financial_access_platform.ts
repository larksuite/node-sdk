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
import face_detection from "./face_detection";

// auto gen
export default abstract class Client extends face_detection {
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
    financial_access_platform = {
        v1: {
            /**
             * data
             */
            data: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=financial_access_platform&resource=data&apiName=payment&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=payment&project=financial_access_platform&resource=data&version=v1 document }
                 *
                 * 资金流数据接入
                 *
                 * 基于业务记录、实际账户的银行及第三方的资金的收款、退款、支出明细，创建资金变动及对应的维度信息增强的业务财务记录。
                 */
                payment: async (
                    payload?: {
                        data: {
                            biz_id: string;
                            biz_id_case: string;
                            interface_type: string;
                            source_code: string;
                            data_uniq_id: string;
                            ext_data?: string;
                            order_info: {
                                account_date: string;
                                trade_company: string;
                                trade_type?: string;
                                memo_trade_type?: string;
                                biz_order_no?: string;
                                business_time?: string;
                                amount?: string;
                                trade_amount?: string;
                                trade_currency?: string;
                                quote_amount?: string;
                                quote_currency?: string;
                                confirm_currency?: string;
                                confirm_amount?: string;
                                country?: string;
                                confirm_refund_comments?: string;
                                rebate_company_code?: string;
                                refund?: {
                                    item_code?: string;
                                    origin_account_date?: string;
                                    refund_code?: string;
                                    refund_account_number?: string;
                                    refund_amount?: string;
                                    exchange_date?: string;
                                    origin_biz_order_id?: string;
                                };
                                channel?: {
                                    proceeds_code?: string;
                                    pay_channel_code?: string;
                                    channel_merchant_id?: string;
                                    nostro_bank_account_number?: string;
                                    channel_out_trade_no?: string;
                                    channel_out_refund_no?: string;
                                    channel_order_no?: string;
                                    trade_submit_time?: string;
                                    trade_pay_time?: string;
                                };
                                virtual_flow?: {
                                    payment_direction?: string;
                                    account_type_code?: string;
                                    reciprocal_bank_account_name?: string;
                                    reciprocal_bank_account_number?: string;
                                    tax_amount?: string;
                                };
                                confirm?: {
                                    ea_type: string;
                                    customer_financial_code?: string;
                                    confirm_type?: string;
                                    verification_type?: string;
                                    pp_account_date?: string;
                                    relation_order_number_key?: string;
                                    verification_time?: string;
                                    confirm_time?: string;
                                    item_id?: string;
                                    item_account_time?: string;
                                    contract_code?: string;
                                    customer_trade_code?: string;
                                    project_code?: string;
                                    customer_number?: string;
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
                                    result?: {
                                        status:
                                            | "success"
                                            | "processing"
                                            | "failed";
                                        code: string;
                                        message?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/financial_access_platform/v1/data/payment`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=financial_access_platform&resource=data&apiName=charge&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=charge&project=financial_access_platform&resource=data&version=v1 document }
                 *
                 * 数据冲销
                 *
                 * 针对接入的资金流数据、收入数据，在接入成功时， 进行业务的冲销，作废。
                 */
                charge: async (
                    payload?: {
                        data: {
                            source_code: string;
                            biz_id: string;
                            biz_id_case: string;
                            interface_type: string;
                            data_uniq_id: string;
                            order_info: {
                                charge_against_reason: string;
                                charge_against_state: string;
                                charge_against_time: string;
                                origin_data_uniq_id: string;
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
                                    result?: {
                                        status:
                                            | "success"
                                            | "processing"
                                            | "failed";
                                        code: string;
                                        message?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/financial_access_platform/v1/data/charge`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=financial_access_platform&resource=data&apiName=hive_mock&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=hive_mock&project=financial_access_platform&resource=data&version=v1 document }
                 *
                 * Hive模式数据Mock
                 *
                 * 通过Hive模式接入进行联调的数据，可通过此接口进行数据快速Mock校验，提高接入素问，校验包括必填校验、枚举校验。
                 */
                hiveMock: async (
                    payload?: {
                        data: {
                            biz_id: string;
                            biz_id_case: string;
                            interface_type: string;
                            trade_type?: string;
                            data_uniq_id: string;
                            biz_order_no?: string;
                            trade_company?: string;
                            account_date?: string;
                            biz_data?: string;
                            source_code?: string;
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
                                    result?: {
                                        status:
                                            | "success"
                                            | "processing"
                                            | "failed";
                                        code: string;
                                        message?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/financial_access_platform/v1/data/hive_mock`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=financial_access_platform&resource=data&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=financial_access_platform&resource=data&version=v1 document }
                 *
                 * 数据查询
                 *
                 * 对接入的数据进行查询，查看数据接入的状态。
                 */
                query: async (
                    payload?: {
                        data: {
                            biz_id: string;
                            interface_type: string;
                            data_uniq_id: string;
                            source_code: string;
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
                                    result?: {
                                        success?: boolean;
                                        code?: number;
                                        message?: string;
                                        data?: {
                                            biz_id?: string;
                                            data_uniq_id?: string;
                                            process_status?:
                                                | "success"
                                                | "processing"
                                                | "unProcess"
                                                | "failed";
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/financial_access_platform/v1/data/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=financial_access_platform&resource=data&apiName=income&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=income&project=financial_access_platform&resource=data&version=v1 document }
                 *
                 * 收入流
                 *
                 * 基于权责发生，创建消耗收入的确认、调整，分摊收入的确认、调整。
                 */
                income: async (
                    payload?: {
                        data: {
                            biz_id: string;
                            biz_id_case: string;
                            interface_type: string;
                            source_code?: string;
                            data_uniq_id: string;
                            ext_data?: string;
                            order_info: {
                                account_date: string;
                                trade_company: string;
                                memo_income_type: string;
                                trade_type?: string;
                                biz_order_no: string;
                                customer_financial_code?: string;
                                business_time?: string;
                                income_currency?: string;
                                income_amount?: string;
                                device_platform?: string;
                                income_time?: string;
                                appname?: string;
                                inter_company?: string;
                                product_mdm_code?: string;
                                costcenter_code?: string;
                                area?: string;
                                contract_code?: string;
                                customer_trade_code?: string;
                                country?: string;
                                project_code?: string;
                                income_comment?: string;
                                origin_biz_order_id?: string;
                                income?: {
                                    income_start_time?: string;
                                    income_end_time?: string;
                                    amount?: string;
                                    trade_currency?: string;
                                    fixed_amount?: string;
                                    trade_pay_time?: string;
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
                                    result?: {
                                        status:
                                            | "success"
                                            | "processing"
                                            | "failed";
                                        code: string;
                                        message?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/financial_access_platform/v1/data/income`,
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
