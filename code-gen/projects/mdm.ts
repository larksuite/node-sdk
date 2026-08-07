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
import mcp from "./mcp";

// auto gen
export default abstract class Client extends mcp {
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
    mdm = {
        /**
         * vendor
         */
        vendor: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        vendor?: string;
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
                                `${this.domain}/open-apis/mdm/v1/vendors`,
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
                                    (
                                        res as {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    id?: string;
                                                    ad_country?: string;
                                                    ad_province?: string;
                                                    ad_city?: string;
                                                    address?: string;
                                                    ad_postcode?: string;
                                                    legal_person?: string;
                                                    certification_type?:
                                                        | "0"
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "5"
                                                        | "6"
                                                        | "8"
                                                        | "9"
                                                        | "10"
                                                        | "11"
                                                        | "12"
                                                        | "13";
                                                    certification_id?: string;
                                                    contact_person?: string;
                                                    contact_telephone?: string;
                                                    contact_mobile_phone?: string;
                                                    fax?: string;
                                                    e_mail?: string;
                                                    status: number;
                                                    vendor?: string;
                                                    vendor_text?: string;
                                                    short_text?: string;
                                                    vendor_type?: "1" | "2";
                                                    vendor_category?:
                                                        | "11"
                                                        | "12"
                                                        | "21"
                                                        | "22"
                                                        | "23";
                                                    vendor_nature?:
                                                        | "0"
                                                        | "1"
                                                        | "2";
                                                    linked_employee?: string;
                                                    linked_customer?: string;
                                                    associated_with_legal_entity?: boolean;
                                                    extend_info?: Array<{
                                                        field_type: number;
                                                        field_value?: string;
                                                        options?: Array<string>;
                                                        num?: number;
                                                        date?: string;
                                                        range_date?: Array<string>;
                                                        field_code: string;
                                                        appendix?: Array<{
                                                            file_id?: string;
                                                            file_name?: string;
                                                            file_type?:
                                                                | "DOC"
                                                                | "DOCX"
                                                                | "XLS"
                                                                | "XLSX"
                                                                | "PNG"
                                                                | "JPG"
                                                                | "JPEG"
                                                                | "PDF"
                                                                | "ZIP"
                                                                | "RAR";
                                                            file_size?: number;
                                                            download_url?: string;
                                                        }>;
                                                    }>;
                                                    vendor_accounts?: Array<{
                                                        id?: string;
                                                        account?: string;
                                                        iban?: string;
                                                        account_name?: string;
                                                        bank_id?: string;
                                                        bank_code?: string;
                                                        swift_code?: string;
                                                        vendor_site_code?: string;
                                                        bank_name?: string;
                                                        bank_acronym?: string;
                                                        country?: string;
                                                        bank_control_code?: string;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    vendor_addresses?: Array<{
                                                        id?: string;
                                                        country?: string;
                                                        province?: string;
                                                        city?: string;
                                                        county?: string;
                                                        address?: string;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    vendor_company_views?: Array<{
                                                        id?: string;
                                                        company_code?: string;
                                                        gl_account?: string;
                                                        vendor_site_code?: string;
                                                        payment_term?: string;
                                                        down_payment_term?: string;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    vendor_contacts?: Array<{
                                                        id?: string;
                                                        name?: string;
                                                        position?: string;
                                                        email?: string;
                                                        phone?: string;
                                                        remark?: string;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    gl_account?: string;
                                                    down_payment_term?: string;
                                                    payment_term?: string;
                                                    vendor_site_code?: string;
                                                    appendix?: Array<{
                                                        file_id?: string;
                                                        file_name?: string;
                                                        file_type?:
                                                            | "DOC"
                                                            | "DOCX"
                                                            | "XLS"
                                                            | "XLSX"
                                                            | "PNG"
                                                            | "JPG"
                                                            | "JPEG"
                                                            | "PDF"
                                                            | "ZIP"
                                                            | "RAR";
                                                        file_size?: number;
                                                        download_url?: string;
                                                    }>;
                                                    is_risked?: boolean;
                                                    owner_depts?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mdm&resource=vendor&version=v1 document }
             *
             * 获取交易方
             *
             * 根据交易方编码来获取对应的交易方。参数均采用驼峰式
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        vendor?: string;
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
                                    ad_country?: string;
                                    ad_province?: string;
                                    ad_city?: string;
                                    address?: string;
                                    ad_postcode?: string;
                                    legal_person?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    contact_person?: string;
                                    contact_telephone?: string;
                                    contact_mobile_phone?: string;
                                    fax?: string;
                                    e_mail?: string;
                                    status: number;
                                    vendor?: string;
                                    vendor_text?: string;
                                    short_text?: string;
                                    vendor_type?: "1" | "2";
                                    vendor_category?:
                                        | "11"
                                        | "12"
                                        | "21"
                                        | "22"
                                        | "23";
                                    vendor_nature?: "0" | "1" | "2";
                                    linked_employee?: string;
                                    linked_customer?: string;
                                    associated_with_legal_entity?: boolean;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    vendor_accounts?: Array<{
                                        id?: string;
                                        account?: string;
                                        iban?: string;
                                        account_name?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        swift_code?: string;
                                        vendor_site_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_addresses?: Array<{
                                        id?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        county?: string;
                                        address?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_company_views?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        gl_account?: string;
                                        vendor_site_code?: string;
                                        payment_term?: string;
                                        down_payment_term?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_contacts?: Array<{
                                        id?: string;
                                        name?: string;
                                        position?: string;
                                        email?: string;
                                        phone?: string;
                                        remark?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    gl_account?: string;
                                    down_payment_term?: string;
                                    payment_term?: string;
                                    vendor_site_code?: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                    is_risked?: boolean;
                                    owner_depts?: Array<string>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/vendors`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=vendor&version=v1 document }
             *
             * 获取单个交易方
             *
             * 根据交易方id来获取交易方信息。参数均采用驼峰式
             */
            get: async (
                payload?: {
                    path?: { vendor_id?: string };
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
                                vendor?: {
                                    id?: string;
                                    ad_country?: string;
                                    ad_province?: string;
                                    ad_city?: string;
                                    address?: string;
                                    ad_postcode?: string;
                                    legal_person?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    contact_person?: string;
                                    contact_telephone?: string;
                                    contact_mobile_phone?: string;
                                    fax?: string;
                                    e_mail?: string;
                                    status: number;
                                    vendor?: string;
                                    vendor_text?: string;
                                    short_text?: string;
                                    vendor_type?: "1" | "2";
                                    vendor_category?:
                                        | "11"
                                        | "12"
                                        | "21"
                                        | "22"
                                        | "23";
                                    vendor_nature?: "0" | "1" | "2";
                                    linked_employee?: string;
                                    linked_customer?: string;
                                    associated_with_legal_entity?: boolean;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    vendor_accounts?: Array<{
                                        id?: string;
                                        account?: string;
                                        iban?: string;
                                        account_name?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        swift_code?: string;
                                        vendor_site_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_addresses?: Array<{
                                        id?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        county?: string;
                                        address?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_company_views?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        gl_account?: string;
                                        vendor_site_code?: string;
                                        payment_term?: string;
                                        down_payment_term?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_contacts?: Array<{
                                        id?: string;
                                        name?: string;
                                        position?: string;
                                        email?: string;
                                        phone?: string;
                                        remark?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    gl_account?: string;
                                    down_payment_term?: string;
                                    payment_term?: string;
                                    vendor_site_code?: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                    is_risked?: boolean;
                                    owner_depts?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/vendors/:vendor_id`,
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
            listAllWithIterator: async (
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
                                `${this.domain}/open-apis/mdm/v1/vendors/list_all`,
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
                                    (
                                        res as {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    id?: string;
                                                    ad_country?: string;
                                                    ad_province?: string;
                                                    ad_city?: string;
                                                    address?: string;
                                                    ad_postcode?: string;
                                                    legal_person?: string;
                                                    certification_type?:
                                                        | "0"
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "5"
                                                        | "6"
                                                        | "8"
                                                        | "9"
                                                        | "10"
                                                        | "11"
                                                        | "12"
                                                        | "13";
                                                    certification_id?: string;
                                                    contact_person?: string;
                                                    contact_telephone?: string;
                                                    contact_mobile_phone?: string;
                                                    fax?: string;
                                                    e_mail?: string;
                                                    status: number;
                                                    vendor?: string;
                                                    vendor_text?: string;
                                                    short_text?: string;
                                                    vendor_type?: "1" | "2";
                                                    vendor_category?:
                                                        | "11"
                                                        | "12"
                                                        | "21"
                                                        | "22"
                                                        | "23";
                                                    vendor_nature?:
                                                        | "0"
                                                        | "1"
                                                        | "2";
                                                    linked_employee?: string;
                                                    linked_customer?: string;
                                                    associated_with_legal_entity?: boolean;
                                                    extend_info?: Array<{
                                                        field_type: number;
                                                        field_value?: string;
                                                        options?: Array<string>;
                                                        num?: number;
                                                        date?: string;
                                                        range_date?: Array<string>;
                                                        field_code: string;
                                                        appendix?: Array<{
                                                            file_id?: string;
                                                            file_name?: string;
                                                            file_type?:
                                                                | "DOC"
                                                                | "DOCX"
                                                                | "XLS"
                                                                | "XLSX"
                                                                | "PNG"
                                                                | "JPG"
                                                                | "JPEG"
                                                                | "PDF"
                                                                | "ZIP"
                                                                | "RAR";
                                                            file_size?: number;
                                                            download_url?: string;
                                                        }>;
                                                    }>;
                                                    vendor_accounts?: Array<{
                                                        id?: string;
                                                        account?: string;
                                                        iban?: string;
                                                        account_name?: string;
                                                        bank_id?: string;
                                                        bank_code?: string;
                                                        swift_code?: string;
                                                        vendor_site_code?: string;
                                                        bank_name?: string;
                                                        bank_acronym?: string;
                                                        country?: string;
                                                        bank_control_code?: string;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    vendor_addresses?: Array<{
                                                        id?: string;
                                                        country?: string;
                                                        province?: string;
                                                        city?: string;
                                                        county?: string;
                                                        address?: string;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    vendor_company_views?: Array<{
                                                        id?: string;
                                                        company_code?: string;
                                                        gl_account?: string;
                                                        vendor_site_code?: string;
                                                        payment_term?: string;
                                                        down_payment_term?: string;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    vendor_contacts?: Array<{
                                                        id?: string;
                                                        name?: string;
                                                        position?: string;
                                                        email?: string;
                                                        phone?: string;
                                                        remark?: string;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                    }>;
                                                    gl_account?: string;
                                                    down_payment_term?: string;
                                                    payment_term?: string;
                                                    vendor_site_code?: string;
                                                    appendix?: Array<{
                                                        file_id?: string;
                                                        file_name?: string;
                                                        file_type?:
                                                            | "DOC"
                                                            | "DOCX"
                                                            | "XLS"
                                                            | "XLSX"
                                                            | "PNG"
                                                            | "JPG"
                                                            | "JPEG"
                                                            | "PDF"
                                                            | "ZIP"
                                                            | "RAR";
                                                        file_size?: number;
                                                        download_url?: string;
                                                    }>;
                                                    is_risked?: boolean;
                                                    owner_depts?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=list_all&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_all&project=mdm&resource=vendor&version=v1 document }
             *
             * 交易方全量数据分页查询
             *
             * 交易方全量数据分页查询。参数均采用驼峰式
             */
            listAll: async (
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
                                    ad_country?: string;
                                    ad_province?: string;
                                    ad_city?: string;
                                    address?: string;
                                    ad_postcode?: string;
                                    legal_person?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    contact_person?: string;
                                    contact_telephone?: string;
                                    contact_mobile_phone?: string;
                                    fax?: string;
                                    e_mail?: string;
                                    status: number;
                                    vendor?: string;
                                    vendor_text?: string;
                                    short_text?: string;
                                    vendor_type?: "1" | "2";
                                    vendor_category?:
                                        | "11"
                                        | "12"
                                        | "21"
                                        | "22"
                                        | "23";
                                    vendor_nature?: "0" | "1" | "2";
                                    linked_employee?: string;
                                    linked_customer?: string;
                                    associated_with_legal_entity?: boolean;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    vendor_accounts?: Array<{
                                        id?: string;
                                        account?: string;
                                        iban?: string;
                                        account_name?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        swift_code?: string;
                                        vendor_site_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_addresses?: Array<{
                                        id?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        county?: string;
                                        address?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_company_views?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        gl_account?: string;
                                        vendor_site_code?: string;
                                        payment_term?: string;
                                        down_payment_term?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_contacts?: Array<{
                                        id?: string;
                                        name?: string;
                                        position?: string;
                                        email?: string;
                                        phone?: string;
                                        remark?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    gl_account?: string;
                                    down_payment_term?: string;
                                    payment_term?: string;
                                    vendor_site_code?: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                    is_risked?: boolean;
                                    owner_depts?: Array<string>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/vendors/list_all`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=vendor&version=v1 document }
             *
             * 创建交易方
             *
             * 使用该接口创建一个交易方,字段是否必填是根据后台动态配置的，如想获取配置，主数据的配置开放文档里获取。参数均采用驼峰式
             */
            create: async (
                payload?: {
                    data: {
                        id?: string;
                        ad_country?: string;
                        ad_province?: string;
                        ad_city?: string;
                        address?: string;
                        ad_postcode?: string;
                        legal_person?: string;
                        certification_type?:
                            | "0"
                            | "1"
                            | "2"
                            | "3"
                            | "4"
                            | "5"
                            | "6"
                            | "8"
                            | "9"
                            | "10"
                            | "11"
                            | "12"
                            | "13";
                        certification_id?: string;
                        contact_person?: string;
                        contact_telephone?: string;
                        contact_mobile_phone?: string;
                        fax?: string;
                        e_mail?: string;
                        status: number;
                        vendor?: string;
                        vendor_text?: string;
                        short_text?: string;
                        vendor_type?: "1" | "2";
                        vendor_category?: "11" | "12" | "21" | "22" | "23";
                        vendor_nature?: "0" | "1" | "2";
                        linked_employee?: string;
                        linked_customer?: string;
                        associated_with_legal_entity?: boolean;
                        extend_info?: Array<{
                            field_type: number;
                            field_value?: string;
                            options?: Array<string>;
                            num?: number;
                            date?: string;
                            range_date?: Array<string>;
                            field_code: string;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                        }>;
                        vendor_accounts?: Array<{
                            id?: string;
                            account?: string;
                            iban?: string;
                            account_name?: string;
                            bank_id?: string;
                            bank_code?: string;
                            swift_code?: string;
                            vendor_site_code?: string;
                            bank_name?: string;
                            bank_acronym?: string;
                            country?: string;
                            bank_control_code?: string;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                        }>;
                        vendor_addresses?: Array<{
                            id?: string;
                            country?: string;
                            province?: string;
                            city?: string;
                            county?: string;
                            address?: string;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                        }>;
                        vendor_company_views?: Array<{
                            id?: string;
                            company_code?: string;
                            gl_account?: string;
                            vendor_site_code?: string;
                            payment_term?: string;
                            down_payment_term?: string;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                        }>;
                        vendor_contacts?: Array<{
                            id?: string;
                            name?: string;
                            position?: string;
                            email?: string;
                            phone?: string;
                            remark?: string;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                        }>;
                        gl_account?: string;
                        down_payment_term?: string;
                        payment_term?: string;
                        vendor_site_code?: string;
                        appendix?: Array<{
                            file_id?: string;
                            file_name?: string;
                            file_type?:
                                | "DOC"
                                | "DOCX"
                                | "XLS"
                                | "XLSX"
                                | "PNG"
                                | "JPG"
                                | "JPEG"
                                | "PDF"
                                | "ZIP"
                                | "RAR";
                            file_size?: number;
                            download_url?: string;
                        }>;
                        is_risked?: boolean;
                        owner_depts?: Array<string>;
                    };
                    params?: {
                        user_id?: string;
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
                                vendor?: {
                                    id?: string;
                                    ad_country?: string;
                                    ad_province?: string;
                                    ad_city?: string;
                                    address?: string;
                                    ad_postcode?: string;
                                    legal_person?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    contact_person?: string;
                                    contact_telephone?: string;
                                    contact_mobile_phone?: string;
                                    fax?: string;
                                    e_mail?: string;
                                    status: number;
                                    vendor?: string;
                                    vendor_text?: string;
                                    short_text?: string;
                                    vendor_type?: "1" | "2";
                                    vendor_category?:
                                        | "11"
                                        | "12"
                                        | "21"
                                        | "22"
                                        | "23";
                                    vendor_nature?: "0" | "1" | "2";
                                    linked_employee?: string;
                                    linked_customer?: string;
                                    associated_with_legal_entity?: boolean;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    vendor_accounts?: Array<{
                                        id?: string;
                                        account?: string;
                                        iban?: string;
                                        account_name?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        swift_code?: string;
                                        vendor_site_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_addresses?: Array<{
                                        id?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        county?: string;
                                        address?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_company_views?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        gl_account?: string;
                                        vendor_site_code?: string;
                                        payment_term?: string;
                                        down_payment_term?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_contacts?: Array<{
                                        id?: string;
                                        name?: string;
                                        position?: string;
                                        email?: string;
                                        phone?: string;
                                        remark?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    gl_account?: string;
                                    down_payment_term?: string;
                                    payment_term?: string;
                                    vendor_site_code?: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                    is_risked?: boolean;
                                    owner_depts?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/vendors`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=vendor&version=v1 document }
             *
             * 更新交易方
             *
             * 使用该接口来根据id来更新交易方的全部字段，字段是否必填是根据后台动态配置的，如想获取配置，主数据的配置开放文档里获取。参数均采用驼峰式
             */
            update: async (
                payload?: {
                    data: {
                        id?: string;
                        ad_country?: string;
                        ad_province?: string;
                        ad_city?: string;
                        address?: string;
                        ad_postcode?: string;
                        legal_person?: string;
                        certification_type?:
                            | "0"
                            | "1"
                            | "2"
                            | "3"
                            | "4"
                            | "5"
                            | "6"
                            | "8"
                            | "9"
                            | "10"
                            | "11"
                            | "12"
                            | "13";
                        certification_id?: string;
                        contact_person?: string;
                        contact_telephone?: string;
                        contact_mobile_phone?: string;
                        fax?: string;
                        e_mail?: string;
                        status: number;
                        vendor?: string;
                        vendor_text?: string;
                        short_text?: string;
                        vendor_type?: "1" | "2";
                        vendor_category?: "11" | "12" | "21" | "22" | "23";
                        vendor_nature?: "0" | "1" | "2";
                        linked_employee?: string;
                        linked_customer?: string;
                        associated_with_legal_entity?: boolean;
                        extend_info?: Array<{
                            field_type: number;
                            field_value?: string;
                            options?: Array<string>;
                            num?: number;
                            date?: string;
                            range_date?: Array<string>;
                            field_code: string;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                        }>;
                        vendor_accounts?: Array<{
                            id?: string;
                            account?: string;
                            iban?: string;
                            account_name?: string;
                            bank_id?: string;
                            bank_code?: string;
                            swift_code?: string;
                            vendor_site_code?: string;
                            bank_name?: string;
                            bank_acronym?: string;
                            country?: string;
                            bank_control_code?: string;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                        }>;
                        vendor_addresses?: Array<{
                            id?: string;
                            country?: string;
                            province?: string;
                            city?: string;
                            county?: string;
                            address?: string;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                        }>;
                        vendor_company_views?: Array<{
                            id?: string;
                            company_code?: string;
                            gl_account?: string;
                            vendor_site_code?: string;
                            payment_term?: string;
                            down_payment_term?: string;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                        }>;
                        vendor_contacts?: Array<{
                            id?: string;
                            name?: string;
                            position?: string;
                            email?: string;
                            phone?: string;
                            remark?: string;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                        }>;
                        gl_account?: string;
                        down_payment_term?: string;
                        payment_term?: string;
                        vendor_site_code?: string;
                        appendix?: Array<{
                            file_id?: string;
                            file_name?: string;
                            file_type?:
                                | "DOC"
                                | "DOCX"
                                | "XLS"
                                | "XLSX"
                                | "PNG"
                                | "JPG"
                                | "JPEG"
                                | "PDF"
                                | "ZIP"
                                | "RAR";
                            file_size?: number;
                            download_url?: string;
                        }>;
                        is_risked?: boolean;
                        owner_depts?: Array<string>;
                    };
                    params?: {
                        user_id?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { vendor_id?: string };
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
                                vendor?: {
                                    id?: string;
                                    ad_country?: string;
                                    ad_province?: string;
                                    ad_city?: string;
                                    address?: string;
                                    ad_postcode?: string;
                                    legal_person?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    contact_person?: string;
                                    contact_telephone?: string;
                                    contact_mobile_phone?: string;
                                    fax?: string;
                                    e_mail?: string;
                                    status: number;
                                    vendor?: string;
                                    vendor_text?: string;
                                    short_text?: string;
                                    vendor_type?: "1" | "2";
                                    vendor_category?:
                                        | "11"
                                        | "12"
                                        | "21"
                                        | "22"
                                        | "23";
                                    vendor_nature?: "0" | "1" | "2";
                                    linked_employee?: string;
                                    linked_customer?: string;
                                    associated_with_legal_entity?: boolean;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    vendor_accounts?: Array<{
                                        id?: string;
                                        account?: string;
                                        iban?: string;
                                        account_name?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        swift_code?: string;
                                        vendor_site_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_addresses?: Array<{
                                        id?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        county?: string;
                                        address?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_company_views?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        gl_account?: string;
                                        vendor_site_code?: string;
                                        payment_term?: string;
                                        down_payment_term?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_contacts?: Array<{
                                        id?: string;
                                        name?: string;
                                        position?: string;
                                        email?: string;
                                        phone?: string;
                                        remark?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    gl_account?: string;
                                    down_payment_term?: string;
                                    payment_term?: string;
                                    vendor_site_code?: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                    is_risked?: boolean;
                                    owner_depts?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/vendors/:vendor_id`,
                            path
                        ),
                        method: "PUT",
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=query_vendors&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_vendors&project=mdm&resource=vendor&version=v1 document }
             *
             * 根据证件id查询交易方
             *
             * 根据交易方证件id来获取对应的交易方。参数均采用蛇形
             */
            queryVendors: async (
                payload?: {
                    params: {
                        certification_id: string;
                        ad_country: string;
                        certification_type?: string;
                        status?: number;
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
                                vendor?: {
                                    id?: string;
                                    ad_country?: string;
                                    ad_province?: string;
                                    ad_city?: string;
                                    address?: string;
                                    ad_postcode?: string;
                                    legal_person?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    contact_person?: string;
                                    contact_telephone?: string;
                                    contact_mobile_phone?: string;
                                    fax?: string;
                                    e_mail?: string;
                                    status: number;
                                    vendor?: string;
                                    vendor_text?: string;
                                    short_text?: string;
                                    vendor_type?: "1" | "2";
                                    vendor_category?:
                                        | "11"
                                        | "12"
                                        | "21"
                                        | "22"
                                        | "23";
                                    vendor_nature?: "0" | "1" | "2";
                                    linked_employee?: string;
                                    linked_customer?: string;
                                    associated_with_legal_entity?: boolean;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    vendor_accounts?: Array<{
                                        id?: string;
                                        account?: string;
                                        iban?: string;
                                        account_name?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        swift_code?: string;
                                        vendor_site_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_addresses?: Array<{
                                        id?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        county?: string;
                                        address?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_company_views?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        gl_account?: string;
                                        vendor_site_code?: string;
                                        payment_term?: string;
                                        down_payment_term?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    vendor_contacts?: Array<{
                                        id?: string;
                                        name?: string;
                                        position?: string;
                                        email?: string;
                                        phone?: string;
                                        remark?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                    }>;
                                    gl_account?: string;
                                    down_payment_term?: string;
                                    payment_term?: string;
                                    vendor_site_code?: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                    is_risked?: boolean;
                                    owner_depts?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/vendors/query_vendors`,
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
         * legal_entity
         */
        legalEntity: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        legal_entity?: string;
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
                                `${this.domain}/open-apis/mdm/v1/legal_entities`,
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
                                    (
                                        res as {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    id?: string;
                                                    legal_entity?: string;
                                                    legal_entity_text?: string;
                                                    short_text?: string;
                                                    certification_type?:
                                                        | "0"
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "5"
                                                        | "6"
                                                        | "8"
                                                        | "9"
                                                        | "10"
                                                        | "11"
                                                        | "12"
                                                        | "13";
                                                    certification_id?: string;
                                                    legal_person?: string;
                                                    country?: string;
                                                    province?: string;
                                                    city?: string;
                                                    address?: string;
                                                    taxpayer_type?: "1" | "2";
                                                    telephone?: string;
                                                    bank_id?: string;
                                                    bank_name?: string;
                                                    bank_account?: string;
                                                    status: number;
                                                    legal_entity_banks?: Array<{
                                                        id?: string;
                                                        company_code?: string;
                                                        bank_id?: string;
                                                        bank_code?: string;
                                                        bank_name?: string;
                                                        bank_acronym?: string;
                                                        country?: string;
                                                        account_name?: string;
                                                        bank_account?: string;
                                                        swift_code?: string;
                                                        bank_control_code?: string;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                        iban_account?: string;
                                                        currency: string;
                                                        gl_account?: string;
                                                        clearing_account?: string;
                                                        account_attribute_desc?: string;
                                                    }>;
                                                    extend_info?: Array<{
                                                        field_type: number;
                                                        field_value?: string;
                                                        options?: Array<string>;
                                                        num?: number;
                                                        date?: string;
                                                        range_date?: Array<string>;
                                                        field_code: string;
                                                        appendix?: Array<{
                                                            file_id?: string;
                                                            file_name?: string;
                                                            file_type?:
                                                                | "DOC"
                                                                | "DOCX"
                                                                | "XLS"
                                                                | "XLSX"
                                                                | "PNG"
                                                                | "JPG"
                                                                | "JPEG"
                                                                | "PDF"
                                                                | "ZIP"
                                                                | "RAR";
                                                            file_size?: number;
                                                            download_url?: string;
                                                        }>;
                                                    }>;
                                                    appendix?: Array<{
                                                        file_id?: string;
                                                        file_name?: string;
                                                        file_type?:
                                                            | "DOC"
                                                            | "DOCX"
                                                            | "XLS"
                                                            | "XLSX"
                                                            | "PNG"
                                                            | "JPG"
                                                            | "JPEG"
                                                            | "PDF"
                                                            | "ZIP"
                                                            | "RAR";
                                                        file_size?: number;
                                                        download_url?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=legal_entity&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mdm&resource=legal_entity&version=v1 document }
             *
             * 获取法人实体
             *
             * 根据法人实体编码，来获取对应的法人实体信息。参数均采用驼峰式
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        legal_entity?: string;
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
                                    legal_entity?: string;
                                    legal_entity_text?: string;
                                    short_text?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    legal_person?: string;
                                    country?: string;
                                    province?: string;
                                    city?: string;
                                    address?: string;
                                    taxpayer_type?: "1" | "2";
                                    telephone?: string;
                                    bank_id?: string;
                                    bank_name?: string;
                                    bank_account?: string;
                                    status: number;
                                    legal_entity_banks?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        account_name?: string;
                                        bank_account?: string;
                                        swift_code?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        iban_account?: string;
                                        currency: string;
                                        gl_account?: string;
                                        clearing_account?: string;
                                        account_attribute_desc?: string;
                                    }>;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/legal_entities`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=legal_entity&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=legal_entity&version=v1 document }
             *
             * 获取单个法人实体信息
             *
             * 通过该接口，凭借法人主体id 获取单个法人实体信息。参数均采用驼峰式
             */
            get: async (
                payload?: {
                    path?: { legal_entity_id?: string };
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
                                legal_entity?: {
                                    id?: string;
                                    legal_entity?: string;
                                    legal_entity_text?: string;
                                    short_text?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    legal_person?: string;
                                    country?: string;
                                    province?: string;
                                    city?: string;
                                    address?: string;
                                    taxpayer_type?: "1" | "2";
                                    telephone?: string;
                                    bank_id?: string;
                                    bank_name?: string;
                                    bank_account?: string;
                                    status: number;
                                    legal_entity_banks?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        account_name?: string;
                                        bank_account?: string;
                                        swift_code?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        iban_account?: string;
                                        currency: string;
                                        gl_account?: string;
                                        clearing_account?: string;
                                        account_attribute_desc?: string;
                                    }>;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/legal_entities/:legal_entity_id`,
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
            listAllWithIterator: async (
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
                                `${this.domain}/open-apis/mdm/v1/legal_entities/list_all`,
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
                                    (
                                        res as {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    id?: string;
                                                    legal_entity?: string;
                                                    legal_entity_text?: string;
                                                    short_text?: string;
                                                    certification_type?:
                                                        | "0"
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "5"
                                                        | "6"
                                                        | "8"
                                                        | "9"
                                                        | "10"
                                                        | "11"
                                                        | "12"
                                                        | "13";
                                                    certification_id?: string;
                                                    legal_person?: string;
                                                    country?: string;
                                                    province?: string;
                                                    city?: string;
                                                    address?: string;
                                                    taxpayer_type?: "1" | "2";
                                                    telephone?: string;
                                                    bank_id?: string;
                                                    bank_name?: string;
                                                    bank_account?: string;
                                                    status: number;
                                                    legal_entity_banks?: Array<{
                                                        id?: string;
                                                        company_code?: string;
                                                        bank_id?: string;
                                                        bank_code?: string;
                                                        bank_name?: string;
                                                        bank_acronym?: string;
                                                        country?: string;
                                                        account_name?: string;
                                                        bank_account?: string;
                                                        swift_code?: string;
                                                        bank_control_code?: string;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                        iban_account?: string;
                                                        currency: string;
                                                        gl_account?: string;
                                                        clearing_account?: string;
                                                        account_attribute_desc?: string;
                                                    }>;
                                                    extend_info?: Array<{
                                                        field_type: number;
                                                        field_value?: string;
                                                        options?: Array<string>;
                                                        num?: number;
                                                        date?: string;
                                                        range_date?: Array<string>;
                                                        field_code: string;
                                                        appendix?: Array<{
                                                            file_id?: string;
                                                            file_name?: string;
                                                            file_type?:
                                                                | "DOC"
                                                                | "DOCX"
                                                                | "XLS"
                                                                | "XLSX"
                                                                | "PNG"
                                                                | "JPG"
                                                                | "JPEG"
                                                                | "PDF"
                                                                | "ZIP"
                                                                | "RAR";
                                                            file_size?: number;
                                                            download_url?: string;
                                                        }>;
                                                    }>;
                                                    appendix?: Array<{
                                                        file_id?: string;
                                                        file_name?: string;
                                                        file_type?:
                                                            | "DOC"
                                                            | "DOCX"
                                                            | "XLS"
                                                            | "XLSX"
                                                            | "PNG"
                                                            | "JPG"
                                                            | "JPEG"
                                                            | "PDF"
                                                            | "ZIP"
                                                            | "RAR";
                                                        file_size?: number;
                                                        download_url?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=legal_entity&apiName=list_all&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_all&project=mdm&resource=legal_entity&version=v1 document }
             *
             * 法人实体全量数据分页查询
             *
             * 法人实体全量数据分页查询。参数均采用驼峰式
             */
            listAll: async (
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
                                    legal_entity?: string;
                                    legal_entity_text?: string;
                                    short_text?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    legal_person?: string;
                                    country?: string;
                                    province?: string;
                                    city?: string;
                                    address?: string;
                                    taxpayer_type?: "1" | "2";
                                    telephone?: string;
                                    bank_id?: string;
                                    bank_name?: string;
                                    bank_account?: string;
                                    status: number;
                                    legal_entity_banks?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        account_name?: string;
                                        bank_account?: string;
                                        swift_code?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        iban_account?: string;
                                        currency: string;
                                        gl_account?: string;
                                        clearing_account?: string;
                                        account_attribute_desc?: string;
                                    }>;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/legal_entities/list_all`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=legal_entity&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=legal_entity&version=v1 document }
             *
             * 创建法人实体
             *
             * 根据该接口，来创建一个法人实体，字段是否必填是根据后台动态配置的，如想获取配置，主数据的配置开放文档里获取。参数均采用驼峰式
             */
            create: async (
                payload?: {
                    data: {
                        id?: string;
                        legal_entity?: string;
                        legal_entity_text?: string;
                        short_text?: string;
                        certification_type?:
                            | "0"
                            | "1"
                            | "2"
                            | "3"
                            | "4"
                            | "5"
                            | "6"
                            | "8"
                            | "9"
                            | "10"
                            | "11"
                            | "12"
                            | "13";
                        certification_id?: string;
                        legal_person?: string;
                        country?: string;
                        province?: string;
                        city?: string;
                        address?: string;
                        taxpayer_type?: "1" | "2";
                        telephone?: string;
                        bank_id?: string;
                        bank_name?: string;
                        bank_account?: string;
                        status: number;
                        legal_entity_banks?: Array<{
                            id?: string;
                            company_code?: string;
                            bank_id?: string;
                            bank_code?: string;
                            bank_name?: string;
                            bank_acronym?: string;
                            country?: string;
                            account_name?: string;
                            bank_account?: string;
                            swift_code?: string;
                            bank_control_code?: string;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            iban_account?: string;
                            currency: string;
                            gl_account?: string;
                            clearing_account?: string;
                            account_attribute_desc?: string;
                        }>;
                        extend_info?: Array<{
                            field_type: number;
                            field_value?: string;
                            options?: Array<string>;
                            num?: number;
                            date?: string;
                            range_date?: Array<string>;
                            field_code: string;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                        }>;
                        appendix?: Array<{
                            file_id?: string;
                            file_name?: string;
                            file_type?:
                                | "DOC"
                                | "DOCX"
                                | "XLS"
                                | "XLSX"
                                | "PNG"
                                | "JPG"
                                | "JPEG"
                                | "PDF"
                                | "ZIP"
                                | "RAR";
                            file_size?: number;
                            download_url?: string;
                        }>;
                    };
                    params?: {
                        user_id?: string;
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
                                legal_entity?: {
                                    id?: string;
                                    legal_entity?: string;
                                    legal_entity_text?: string;
                                    short_text?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    legal_person?: string;
                                    country?: string;
                                    province?: string;
                                    city?: string;
                                    address?: string;
                                    taxpayer_type?: "1" | "2";
                                    telephone?: string;
                                    bank_id?: string;
                                    bank_name?: string;
                                    bank_account?: string;
                                    status: number;
                                    legal_entity_banks?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        account_name?: string;
                                        bank_account?: string;
                                        swift_code?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        iban_account?: string;
                                        currency: string;
                                        gl_account?: string;
                                        clearing_account?: string;
                                        account_attribute_desc?: string;
                                    }>;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/legal_entities`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=legal_entity&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=legal_entity&version=v1 document }
             *
             * 更新法人实体
             *
             * 使用该接口来根据id来更新法人实体的全部字段，字段是否必填是根据后台动态配置的，如想获取配置，主数据的配置开放文档里获取。参数均采用驼峰式
             */
            update: async (
                payload?: {
                    data: {
                        id?: string;
                        legal_entity?: string;
                        legal_entity_text?: string;
                        short_text?: string;
                        certification_type?:
                            | "0"
                            | "1"
                            | "2"
                            | "3"
                            | "4"
                            | "5"
                            | "6"
                            | "8"
                            | "9"
                            | "10"
                            | "11"
                            | "12"
                            | "13";
                        certification_id?: string;
                        legal_person?: string;
                        country?: string;
                        province?: string;
                        city?: string;
                        address?: string;
                        taxpayer_type?: "1" | "2";
                        telephone?: string;
                        bank_id?: string;
                        bank_name?: string;
                        bank_account?: string;
                        status: number;
                        legal_entity_banks?: Array<{
                            id?: string;
                            company_code?: string;
                            bank_id?: string;
                            bank_code?: string;
                            bank_name?: string;
                            bank_acronym?: string;
                            country?: string;
                            account_name?: string;
                            bank_account?: string;
                            swift_code?: string;
                            bank_control_code?: string;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            iban_account?: string;
                            currency: string;
                            gl_account?: string;
                            clearing_account?: string;
                            account_attribute_desc?: string;
                        }>;
                        extend_info?: Array<{
                            field_type: number;
                            field_value?: string;
                            options?: Array<string>;
                            num?: number;
                            date?: string;
                            range_date?: Array<string>;
                            field_code: string;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                        }>;
                        appendix?: Array<{
                            file_id?: string;
                            file_name?: string;
                            file_type?:
                                | "DOC"
                                | "DOCX"
                                | "XLS"
                                | "XLSX"
                                | "PNG"
                                | "JPG"
                                | "JPEG"
                                | "PDF"
                                | "ZIP"
                                | "RAR";
                            file_size?: number;
                            download_url?: string;
                        }>;
                    };
                    params?: {
                        user_id?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { legal_entity_id?: string };
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
                                legal_entity?: {
                                    id?: string;
                                    legal_entity?: string;
                                    legal_entity_text?: string;
                                    short_text?: string;
                                    certification_type?:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12"
                                        | "13";
                                    certification_id?: string;
                                    legal_person?: string;
                                    country?: string;
                                    province?: string;
                                    city?: string;
                                    address?: string;
                                    taxpayer_type?: "1" | "2";
                                    telephone?: string;
                                    bank_id?: string;
                                    bank_name?: string;
                                    bank_account?: string;
                                    status: number;
                                    legal_entity_banks?: Array<{
                                        id?: string;
                                        company_code?: string;
                                        bank_id?: string;
                                        bank_code?: string;
                                        bank_name?: string;
                                        bank_acronym?: string;
                                        country?: string;
                                        account_name?: string;
                                        bank_account?: string;
                                        swift_code?: string;
                                        bank_control_code?: string;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        iban_account?: string;
                                        currency: string;
                                        gl_account?: string;
                                        clearing_account?: string;
                                        account_attribute_desc?: string;
                                    }>;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/legal_entities/:legal_entity_id`,
                            path
                        ),
                        method: "PUT",
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
         * config
         */
        config: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=config&apiName=config_list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=config_list&project=mdm&resource=config&version=v1 document }
             *
             * 字段配置列表查询
             *
             * 字段配置列表查询
             */
            configList: async (
                payload?: {
                    params?: { biz_line?: "vendor" | "legalEntity" };
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
                                config?: Array<{
                                    field_code?: string;
                                    field_name?: string;
                                    module?: number;
                                    field_describe?: string;
                                    sys?: number;
                                    field_type?: number;
                                    required?: number;
                                    status?: number;
                                    field_version?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/config/config_list`,
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
         * department_cost_center_relationship
         */
        departmentCostCenterRelationship: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=department_cost_center_relationship&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=department_cost_center_relationship&version=v1 document }
             *
             * 获取单个部门与成本中心关系
             *
             * 获取单个部门与成本中心关系
             */
            get: async (
                payload?: {
                    path?: { department_cost_center_relationship_uid?: string };
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
                                department_cost_center_relationship?: {
                                    department_cost_center_relationship_uid?: string;
                                    company_code?: string;
                                    open_department_id: string;
                                    cost_center_code: string;
                                    department_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/department_cost_center_relationships/:department_cost_center_relationship_uid`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=department_cost_center_relationship&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=department_cost_center_relationship&version=v1 document }
             *
             * 更新部门与成本中心关系
             *
             * 更新部门与成本中心关系部分字段，没有填写的字段不会被更新
             */
            update: async (
                payload?: {
                    data?: { company_code?: string };
                    path?: { department_cost_center_relationship_uid?: string };
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
                                department_cost_center_relationship?: {
                                    department_cost_center_relationship_uid?: string;
                                    company_code?: string;
                                    open_department_id: string;
                                    cost_center_code: string;
                                    department_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/department_cost_center_relationships/:department_cost_center_relationship_uid`,
                            path
                        ),
                        method: "PUT",
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=department_cost_center_relationship&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=department_cost_center_relationship&version=v1 document }
             *
             * 删除部门与成本中心关系
             *
             * 删除单个部门与成本中心关系
             */
            delete: async (
                payload?: {
                    path?: { department_cost_center_relationship_uid?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/department_cost_center_relationships/:department_cost_center_relationship_uid`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=department_cost_center_relationship&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=department_cost_center_relationship&version=v1 document }
             *
             * 搜索部门与成本中心关系
             *
             * 分页搜索部门与成本中心关系
             */
            search: async (
                payload?: {
                    data?: {
                        company_code?: string;
                        cost_center_code?: string;
                        department_id?: string;
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        page_size?: string;
                        page_token?: string;
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
                                    department_cost_center_relationship_uid?: string;
                                    company_code?: string;
                                    open_department_id: string;
                                    cost_center_code: string;
                                    department_id?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/department_cost_center_relationships/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=department_cost_center_relationship&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=department_cost_center_relationship&version=v1 document }
             *
             * 创建部门与成本中心关系
             *
             * 创建单个部门与成本中心关系
             */
            create: async (
                payload?: {
                    data: {
                        company_code?: string;
                        cost_center_code: string;
                        department_id?: string;
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                department_cost_center_relationship?: {
                                    department_cost_center_relationship_uid?: string;
                                    company_code?: string;
                                    open_department_id: string;
                                    cost_center_code: string;
                                    department_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/department_cost_center_relationships`,
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
         * internal_order
         */
        internalOrder: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=internal_order&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=internal_order&version=v1 document }
             *
             * 新建内部订单
             *
             * 新建单个内部订单
             */
            create: async (
                payload?: {
                    data: {
                        internal_order_code: string;
                        internal_order_name: string;
                        type: string;
                        responsible_user_union_id?: string;
                        company_code?: string;
                        co_area_code: string;
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
                                internal_order: {
                                    internal_order_uid?: string;
                                    internal_order_code: string;
                                    internal_order_name: string;
                                    type: string;
                                    responsible_user_union_id?: string;
                                    company_code?: string;
                                    co_area_code: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/internal_orders`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=internal_order&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=internal_order&version=v1 document }
             *
             * 搜索内部订单
             *
             * 分页搜索内部订单
             */
            search: async (
                payload?: {
                    data?: {
                        type?: string;
                        responsible_user_union_id?: string;
                        company_code?: string;
                    };
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        query?: string;
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
                                    internal_order_uid?: string;
                                    internal_order_code: string;
                                    internal_order_name: string;
                                    type: string;
                                    responsible_user_union_id?: string;
                                    company_code?: string;
                                    co_area_code: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/internal_orders/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=internal_order&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=internal_order&version=v1 document }
             *
             * 删除内部订单
             *
             * 删除单个内部订单
             */
            delete: async (
                payload?: {
                    path: { internal_order_uid: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/internal_orders/:internal_order_uid`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=internal_order&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=internal_order&version=v1 document }
             *
             * 更新内部订单
             *
             * 更新内部订单部分字段，没有填写的字段不会被更新
             */
            update: async (
                payload?: {
                    data?: {
                        internal_order_name?: string;
                        responsible_user_union_id?: string;
                        company_code?: string;
                    };
                    path: { internal_order_uid: string };
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
                                internel_order?: {
                                    internal_order_uid?: string;
                                    internal_order_code: string;
                                    internal_order_name: string;
                                    type: string;
                                    responsible_user_union_id?: string;
                                    company_code?: string;
                                    co_area_code: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/internal_orders/:internal_order_uid`,
                            path
                        ),
                        method: "PUT",
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=internal_order&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=internal_order&version=v1 document }
             *
             * 获取单个内部订单
             *
             * 获取单个内部订单
             */
            get: async (
                payload?: {
                    path: { internal_order_uid: string };
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
                                internal_order?: {
                                    internal_order_uid?: string;
                                    internal_order_code: string;
                                    internal_order_name: string;
                                    type: string;
                                    responsible_user_union_id?: string;
                                    company_code?: string;
                                    co_area_code: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/internal_orders/:internal_order_uid`,
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
         * company.asset
         */
        companyAsset: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.asset&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=company.asset&version=v1 document }
             *
             * 获取单个公司资产
             *
             * 获取单个公司资产
             */
            get: async (
                payload?: {
                    path: { company_uid: string; asset_uid: string };
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
                                asset?: {
                                    asset_uid?: string;
                                    asset_sub_no: string;
                                    asset_type: string;
                                    asset_type_name: string;
                                    asset_name: string;
                                    quantity?: number;
                                    unit?: string;
                                    company_uid: string;
                                    asset_type_name_en?: string;
                                    asset_no: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid/assets/:asset_uid`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.asset&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=company.asset&version=v1 document }
             *
             * 删除公司资产
             *
             * 删除单个公司资产
             */
            delete: async (
                payload?: {
                    path: { company_uid: string; asset_uid?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid/assets/:asset_uid`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.asset&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=company.asset&version=v1 document }
             *
             * 创建公司资产
             *
             * 创建单个公司资产
             */
            create: async (
                payload?: {
                    data: {
                        asset_sub_no: string;
                        asset_type: string;
                        asset_type_name: string;
                        asset_name: string;
                        quantity?: number;
                        unit?: string;
                        asset_type_name_en?: string;
                        asset_no: string;
                    };
                    path: { company_uid: string };
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
                                asset?: {
                                    asset_uid?: string;
                                    asset_sub_no: string;
                                    asset_type: string;
                                    asset_type_name: string;
                                    asset_name: string;
                                    quantity?: number;
                                    unit?: string;
                                    company_uid: string;
                                    asset_type_name_en?: string;
                                    asset_no: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid/assets`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.asset&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=company.asset&version=v1 document }
             *
             * 更新公司资产
             *
             * 更新公司资产部分字段，没有填写的字段不会被更新
             */
            update: async (
                payload?: {
                    data?: {
                        asset_name?: string;
                        quantity?: number;
                        unit?: string;
                        asset_type_name_en?: string;
                    };
                    path: { company_uid: string; asset_uid?: string };
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
                                asset?: {
                                    asset_uid?: string;
                                    asset_sub_no: string;
                                    asset_type: string;
                                    asset_type_name: string;
                                    asset_name: string;
                                    quantity?: number;
                                    unit?: string;
                                    company_uid: string;
                                    asset_type_name_en?: string;
                                    asset_no: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid/assets/:asset_uid`,
                            path
                        ),
                        method: "PUT",
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.asset&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=company.asset&version=v1 document }
             *
             * 搜索公司资产
             *
             * 分页搜索公司资产
             */
            search: async (
                payload?: {
                    data?: { asset_sub_no?: string; asset_type?: string };
                    params?: {
                        query?: string;
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { company_uid: string };
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
                                    asset_uid?: string;
                                    asset_sub_no: string;
                                    asset_type: string;
                                    asset_type_name: string;
                                    asset_name: string;
                                    quantity?: number;
                                    unit?: string;
                                    company_uid: string;
                                    asset_type_name_en?: string;
                                    asset_no: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid/assets/search`,
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
         * company
         */
        company: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=company&version=v1 document }
             *
             * 删除公司
             *
             * 删除单个公司
             */
            delete: async (
                payload?: {
                    path?: { company_uid?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=company&version=v1 document }
             *
             * 获取单个公司
             *
             * 获取单个公司
             */
            get: async (
                payload?: {
                    path?: { company_uid?: string };
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
                                company?: {
                                    company_code: string;
                                    company_name: string;
                                    company_uid?: string;
                                    legal_entity_code: string;
                                    co_area_code: string;
                                    currency_code: string;
                                    country_code: string;
                                    company_name_en?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=company&version=v1 document }
             *
             * 更新公司
             *
             * 更新公司部分字段，没有填写的字段不会被更新
             */
            update: async (
                payload?: {
                    data?: {
                        company_name?: string;
                        co_area_code?: string;
                        company_name_en?: string;
                    };
                    path: { company_uid: string };
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
                                company?: {
                                    company_code: string;
                                    company_name: string;
                                    company_uid?: string;
                                    legal_entity_code: string;
                                    co_area_code: string;
                                    currency_code: string;
                                    country_code: string;
                                    company_name_en?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid`,
                            path
                        ),
                        method: "PUT",
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=company&version=v1 document }
             *
             * 创建公司
             *
             * 创建单个公司
             */
            create: async (
                payload?: {
                    data: {
                        company_code: string;
                        company_name: string;
                        legal_entity_code: string;
                        co_area_code: string;
                        currency_code: string;
                        country_code: string;
                        company_name_en?: string;
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
                                company?: {
                                    company_code: string;
                                    company_name: string;
                                    company_uid?: string;
                                    legal_entity_code: string;
                                    co_area_code: string;
                                    currency_code: string;
                                    country_code: string;
                                    company_name_en?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=company&version=v1 document }
             *
             * 搜索公司
             *
             * 分页搜索公司
             */
            search: async (
                payload?: {
                    data?: {
                        legal_entity_code?: string;
                        co_area_code?: string;
                        country_code?: string;
                    };
                    params?: {
                        query?: string;
                        page_size?: number;
                        page_token?: string;
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
                                    company_code: string;
                                    company_name: string;
                                    company_uid?: string;
                                    legal_entity_code: string;
                                    co_area_code: string;
                                    currency_code: string;
                                    country_code: string;
                                    company_name_en?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/search`,
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
         * company.company_bank_account
         */
        companyCompanyBankAccount: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.company_bank_account&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=company.company_bank_account&version=v1 document }
             *
             * 删除公司银行账号
             *
             * 删除单个公司银行账号
             */
            delete: async (
                payload?: {
                    path: {
                        company_uid: string;
                        company_bank_account_uid?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid/company_bank_accounts/:company_bank_account_uid`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.company_bank_account&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=company.company_bank_account&version=v1 document }
             *
             * 获取单个公司银行账号
             *
             * 获取单个公司银行账号
             */
            get: async (
                payload?: {
                    path: {
                        company_uid: string;
                        company_bank_account_uid: string;
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
                                company_bank_account?: {
                                    company_bank_account_uid?: string;
                                    company_uid: string;
                                    account: string;
                                    iban?: string;
                                    account_name: string;
                                    currency_code: string;
                                    local_routing_code?: string;
                                    gl_account_code?: string;
                                    clearing_account_code?: string;
                                    swift?: string;
                                    account_attri_desc?: string;
                                    i18n_account_attri_desc?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid/company_bank_accounts/:company_bank_account_uid`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.company_bank_account&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=company.company_bank_account&version=v1 document }
             *
             * 搜索公司银行账号
             *
             * 分页搜索公司银行账号
             */
            search: async (
                payload?: {
                    data?: {
                        iban?: string;
                        local_routing_code?: string;
                        swift?: string;
                    };
                    params?: {
                        query?: string;
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { company_uid: string };
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
                                    company_bank_account_uid?: string;
                                    company_uid: string;
                                    account: string;
                                    iban?: string;
                                    account_name: string;
                                    currency_code: string;
                                    local_routing_code?: string;
                                    gl_account_code?: string;
                                    clearing_account_code?: string;
                                    swift?: string;
                                    account_attri_desc?: string;
                                    i18n_account_attri_desc?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid/company_bank_accounts/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.company_bank_account&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=company.company_bank_account&version=v1 document }
             *
             * 更新公司银行账号
             *
             * 更新公司银行账号部分字段，没有填写的字段不会被更新
             */
            update: async (
                payload?: {
                    data?: {
                        iban?: string;
                        account_name?: string;
                        local_routing_code?: string;
                        gl_account_code?: string;
                        clearing_account_code?: string;
                        swift?: string;
                        account_attri_desc?: string;
                        i18n_account_attri_desc?: Array<{
                            lang_locale: "zh_CN" | "en_US" | "ja_JP";
                            value: string;
                            valid_to: string;
                        }>;
                    };
                    path: {
                        company_uid: string;
                        company_bank_account_uid?: string;
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
                                company_bank_account?: {
                                    company_bank_account_uid?: string;
                                    company_uid: string;
                                    account: string;
                                    iban?: string;
                                    account_name: string;
                                    currency_code: string;
                                    local_routing_code?: string;
                                    gl_account_code?: string;
                                    clearing_account_code?: string;
                                    swift?: string;
                                    account_attri_desc?: string;
                                    i18n_account_attri_desc?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid/company_bank_accounts/:company_bank_account_uid`,
                            path
                        ),
                        method: "PUT",
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.company_bank_account&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=company.company_bank_account&version=v1 document }
             *
             * 创建公司银行账号
             *
             * 创建单个公司银行账号
             */
            create: async (
                payload?: {
                    data: {
                        account: string;
                        iban?: string;
                        account_name: string;
                        currency_code: string;
                        local_routing_code?: string;
                        gl_account_code?: string;
                        clearing_account_code?: string;
                        swift?: string;
                        account_attri_desc?: string;
                        i18n_account_attri_desc?: Array<{
                            lang_locale: "zh_CN" | "en_US" | "ja_JP";
                            value: string;
                            valid_to: string;
                        }>;
                    };
                    path: { company_uid: string };
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
                                company_bank_account?: {
                                    company_bank_account_uid?: string;
                                    company_uid: string;
                                    account: string;
                                    iban?: string;
                                    account_name: string;
                                    currency_code: string;
                                    local_routing_code?: string;
                                    gl_account_code?: string;
                                    clearing_account_code?: string;
                                    swift?: string;
                                    account_attri_desc?: string;
                                    i18n_account_attri_desc?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/companies/:company_uid/company_bank_accounts`,
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
         * gl_account_company_relationship
         */
        glAccountCompanyRelationship: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account_company_relationship&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=gl_account_company_relationship&version=v1 document }
             *
             * 删除会计科目与公司关系
             *
             * 删除单个会计科目与公司关系
             */
            delete: async (
                payload?: {
                    path?: { gl_account_company_relationship_uid?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/gl_account_company_relationships/:gl_account_company_relationship_uid`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account_company_relationship&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=gl_account_company_relationship&version=v1 document }
             *
             * 获取单个会计科目与公司关系
             *
             * 获取单个会计科目与公司关系
             */
            get: async (
                payload?: {
                    path?: { gl_account_company_relationship_uid?: string };
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
                                gl_account_company_relationship?: {
                                    gl_account_code: string;
                                    company_code: string;
                                    gl_account_company_relationship_uid?: string;
                                    valid_to: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/gl_account_company_relationships/:gl_account_company_relationship_uid`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account_company_relationship&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=gl_account_company_relationship&version=v1 document }
             *
             * 搜索会计科目与公司关系
             *
             * 分页搜索会计科目与公司关系
             */
            search: async (
                payload?: {
                    data?: {
                        gl_account_code?: string;
                        company_code?: string;
                        valid_to?: string;
                    };
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
                                    gl_account_code: string;
                                    company_code: string;
                                    gl_account_company_relationship_uid?: string;
                                    valid_to: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/gl_account_company_relationships/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account_company_relationship&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=gl_account_company_relationship&version=v1 document }
             *
             * 更新会计科目与公司关系
             *
             * 更新会计科目与公司关系部分字段，没有填写的字段不会被更新
             */
            update: async (
                payload?: {
                    data?: { valid_to?: string };
                    path?: { gl_account_company_relationship_uid?: string };
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
                                gl_account_company_relationship?: {
                                    gl_account_code: string;
                                    company_code: string;
                                    gl_account_company_relationship_uid?: string;
                                    valid_to: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/gl_account_company_relationships/:gl_account_company_relationship_uid`,
                            path
                        ),
                        method: "PUT",
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account_company_relationship&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=gl_account_company_relationship&version=v1 document }
             *
             * 创建会计科目与公司关系
             *
             * 创建单个会计科目与公司关系
             */
            create: async (
                payload?: {
                    data: {
                        gl_account_code: string;
                        company_code: string;
                        valid_to: string;
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
                                gl_account_company_relationship: {
                                    gl_account_code: string;
                                    company_code: string;
                                    gl_account_company_relationship_uid?: string;
                                    valid_to: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/gl_account_company_relationships`,
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
         * cost_center
         */
        costCenter: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=cost_center&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=cost_center&version=v1 document }
             *
             * 搜索成本中心
             *
             * 分页搜索成本中心
             */
            search: async (
                payload?: {
                    data?: {
                        responsible_user_union_id?: string;
                        company_code?: string;
                        profit_center_code?: string;
                        business_area?: string;
                        fee_type?: string;
                        valid_to?: string;
                        company_code_list?: Array<string>;
                    };
                    params?: {
                        query?: string;
                        page_size?: number;
                        page_token?: string;
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
                                    cost_center_uid?: string;
                                    cost_center_code: string;
                                    i18n_cost_center_name?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                    responsible_user_union_id?: string;
                                    co_area_code: string;
                                    company_code?: string;
                                    profit_center_code?: string;
                                    business_area?: string;
                                    fee_type: string;
                                    valid_to: string;
                                    cost_center_name: string;
                                    company_code_list?: Array<string>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/cost_centers/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=cost_center&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=cost_center&version=v1 document }
             *
             * 更新成本中心
             *
             * 更新成本中心部分字段，没有填写的字段不会被更新
             */
            update: async (
                payload?: {
                    data?: {
                        i18n_cost_center_name?: Array<{
                            lang_locale: "zh_CN" | "en_US" | "ja_JP";
                            value: string;
                            valid_to: string;
                        }>;
                        responsible_user_union_id?: string;
                        company_code?: string;
                        business_area?: string;
                        fee_type?: string;
                        valid_to?: string;
                        cost_center_name?: string;
                        company_code_list?: Array<string>;
                    };
                    path?: { cost_center_uid?: string };
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
                                cost_center?: {
                                    cost_center_uid?: string;
                                    cost_center_code: string;
                                    i18n_cost_center_name?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                    responsible_user_union_id?: string;
                                    co_area_code: string;
                                    company_code?: string;
                                    profit_center_code?: string;
                                    business_area?: string;
                                    fee_type: string;
                                    valid_to: string;
                                    cost_center_name: string;
                                    company_code_list?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/cost_centers/:cost_center_uid`,
                            path
                        ),
                        method: "PUT",
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=cost_center&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=cost_center&version=v1 document }
             *
             * 获取单个成本中心
             *
             * 获取单个成本中心
             */
            get: async (
                payload?: {
                    path?: { cost_center_uid?: string };
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
                                cost_center?: {
                                    cost_center_uid?: string;
                                    cost_center_code: string;
                                    i18n_cost_center_name?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                    responsible_user_union_id?: string;
                                    co_area_code: string;
                                    company_code?: string;
                                    profit_center_code?: string;
                                    business_area?: string;
                                    fee_type: string;
                                    valid_to: string;
                                    cost_center_name: string;
                                    company_code_list?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/cost_centers/:cost_center_uid`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=cost_center&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=cost_center&version=v1 document }
             *
             * 删除成本中心
             *
             * 删除单个成本中心
             */
            delete: async (
                payload?: {
                    path?: { cost_center_uid?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/cost_centers/:cost_center_uid`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=cost_center&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=cost_center&version=v1 document }
             *
             * 新建成本中心
             *
             * 新建单个成本中心
             */
            create: async (
                payload?: {
                    data: {
                        cost_center_code: string;
                        i18n_cost_center_name?: Array<{
                            lang_locale: "zh_CN" | "en_US" | "ja_JP";
                            value: string;
                            valid_to: string;
                        }>;
                        responsible_user_union_id?: string;
                        co_area_code: string;
                        company_code?: string;
                        profit_center_code?: string;
                        business_area?: string;
                        fee_type: string;
                        valid_to: string;
                        cost_center_name: string;
                        company_code_list?: Array<string>;
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
                                cost_center: {
                                    cost_center_uid?: string;
                                    cost_center_code: string;
                                    i18n_cost_center_name?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                    responsible_user_union_id?: string;
                                    co_area_code: string;
                                    company_code?: string;
                                    profit_center_code?: string;
                                    business_area?: string;
                                    fee_type: string;
                                    valid_to: string;
                                    cost_center_name: string;
                                    company_code_list?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/cost_centers`,
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
         * gl_account
         */
        glAccount: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=gl_account&version=v1 document }
             *
             * 搜索会计科目
             *
             * 分页搜索会计科目
             */
            search: async (
                payload?: {
                    data: { type: string };
                    params?: {
                        query?: string;
                        page_size?: number;
                        page_token?: string;
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
                                    gl_account_uid?: string;
                                    gl_account: string;
                                    gl_account_name: string;
                                    i18n_gl_account_name?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                    type: string;
                                    valid_to: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/gl_accounts/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=gl_account&version=v1 document }
             *
             * 删除会计科目
             *
             * 删除单个会计科目
             */
            delete: async (
                payload?: {
                    path?: { gl_account_uid?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/gl_accounts/:gl_account_uid`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=gl_account&version=v1 document }
             *
             * 获取单个会计科目
             *
             * 获取单个会计科目
             */
            get: async (
                payload?: {
                    path?: { gl_account_uid?: string };
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
                                gl_account?: {
                                    gl_account_uid?: string;
                                    gl_account: string;
                                    gl_account_name: string;
                                    i18n_gl_account_name?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                    type: string;
                                    valid_to: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/gl_accounts/:gl_account_uid`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=gl_account&version=v1 document }
             *
             * 更新会计科目
             *
             * 更新会计科目部分字段，没有填写的字段不会被更新
             */
            update: async (
                payload?: {
                    data?: {
                        gl_account_name?: string;
                        i18n_gl_account_name?: Array<{
                            lang_locale: "zh_CN" | "en_US" | "ja_JP";
                            value: string;
                            valid_to: string;
                        }>;
                        type?: string;
                        valid_to?: string;
                    };
                    path?: { gl_account_uid?: string };
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
                                gl_account?: {
                                    gl_account_uid?: string;
                                    gl_account: string;
                                    gl_account_name: string;
                                    i18n_gl_account_name?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                    type: string;
                                    valid_to: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/gl_accounts/:gl_account_uid`,
                            path
                        ),
                        method: "PUT",
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=gl_account&version=v1 document }
             *
             * 创建会计科目
             *
             * 创建单个会计科目
             */
            create: async (
                payload?: {
                    data: {
                        gl_account: string;
                        gl_account_name: string;
                        i18n_gl_account_name?: Array<{
                            lang_locale: "zh_CN" | "en_US" | "ja_JP";
                            value: string;
                            valid_to: string;
                        }>;
                        type: string;
                        valid_to: string;
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
                                gl_account?: {
                                    gl_account_uid?: string;
                                    gl_account: string;
                                    gl_account_name: string;
                                    i18n_gl_account_name?: Array<{
                                        lang_locale:
                                            | "zh_CN"
                                            | "en_US"
                                            | "ja_JP";
                                        value: string;
                                        valid_to: string;
                                    }>;
                                    type: string;
                                    valid_to: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/gl_accounts`,
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
         * project
         */
        project: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=project&version=v1 document }
             *
             * 创建项目
             *
             * 创建一个项目
             */
            create: async (
                payload?: {
                    data: {
                        project_uid?: string;
                        code?: string;
                        name?: string;
                        type?: string;
                        responsible_user_union_id?: string;
                        start_day?: string;
                        end_day?: string;
                        parent_code?: string;
                        level?: number;
                        level_info?: string;
                        status: number;
                        extend_info?: Array<{
                            field_type: number;
                            field_value?: string;
                            options?: Array<string>;
                            num?: number;
                            date?: string;
                            range_date?: Array<string>;
                            field_code: string;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                        }>;
                        is_all_company: boolean;
                        project_company_dept_mappings?: Array<{
                            project_union_id?: string;
                            company_union_id: string;
                            is_all_department: boolean;
                            department_union_id: string;
                        }>;
                        multi_language_name: Array<{
                            language: "zh" | "en" | "ja";
                            value: string;
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
                                project?: {
                                    project_uid?: string;
                                    code?: string;
                                    name?: string;
                                    type?: string;
                                    responsible_user_union_id?: string;
                                    start_day?: string;
                                    end_day?: string;
                                    parent_code?: string;
                                    level?: number;
                                    level_info?: string;
                                    status: number;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    is_all_company: boolean;
                                    project_company_dept_mappings?: Array<{
                                        project_union_id?: string;
                                        company_union_id: string;
                                        is_all_department: boolean;
                                        department_union_id: string;
                                    }>;
                                    multi_language_name: Array<{
                                        language: "zh" | "en" | "ja";
                                        value: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/projects`,
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
            searchWithIterator: async (
                payload?: {
                    data: {
                        project_uid?: string;
                        code?: string;
                        name?: string;
                        type?: string;
                        responsible_user_union_id?: string;
                        start_day?: string;
                        end_day?: string;
                        parent_code?: string;
                        level?: number;
                        level_info?: string;
                        status: number;
                        extend_info?: Array<{
                            field_type: number;
                            field_value?: string;
                            options?: Array<string>;
                            num?: number;
                            date?: string;
                            range_date?: Array<string>;
                            field_code: string;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                        }>;
                        is_all_company: boolean;
                        project_company_dept_mappings?: Array<{
                            project_union_id?: string;
                            company_union_id: string;
                            is_all_department: boolean;
                            department_union_id: string;
                        }>;
                        multi_language_name: Array<{
                            language: "zh" | "en" | "ja";
                            value: string;
                        }>;
                    };
                    params?: {
                        query?: string;
                        page_size?: number;
                        page_token?: number;
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
                                `${this.domain}/open-apis/mdm/v1/projects/search`,
                                path
                            ),
                            method: "POST",
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
                                    (
                                        res as {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    project_uid?: string;
                                                    code?: string;
                                                    name?: string;
                                                    type?: string;
                                                    responsible_user_union_id?: string;
                                                    start_day?: string;
                                                    end_day?: string;
                                                    parent_code?: string;
                                                    level?: number;
                                                    level_info?: string;
                                                    status: number;
                                                    extend_info?: Array<{
                                                        field_type: number;
                                                        field_value?: string;
                                                        options?: Array<string>;
                                                        num?: number;
                                                        date?: string;
                                                        range_date?: Array<string>;
                                                        field_code: string;
                                                        appendix?: Array<{
                                                            file_id?: string;
                                                            file_name?: string;
                                                            file_type?:
                                                                | "DOC"
                                                                | "DOCX"
                                                                | "XLS"
                                                                | "XLSX"
                                                                | "PNG"
                                                                | "JPG"
                                                                | "JPEG"
                                                                | "PDF"
                                                                | "ZIP"
                                                                | "RAR";
                                                            file_size?: number;
                                                            download_url?: string;
                                                        }>;
                                                    }>;
                                                    is_all_company: boolean;
                                                    project_company_dept_mappings?: Array<{
                                                        project_union_id?: string;
                                                        company_union_id: string;
                                                        is_all_department: boolean;
                                                        department_union_id: string;
                                                    }>;
                                                    multi_language_name: Array<{
                                                        language:
                                                            | "zh"
                                                            | "en"
                                                            | "ja";
                                                        value: string;
                                                    }>;
                                                }>;
                                                page_token?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=project&version=v1 document }
             *
             * 搜索项目
             *
             * query 字段不填：可以查询全量项目数据; query 字段填写：可以根据code / name 来搜索数据
             */
            search: async (
                payload?: {
                    data: {
                        project_uid?: string;
                        code?: string;
                        name?: string;
                        type?: string;
                        responsible_user_union_id?: string;
                        start_day?: string;
                        end_day?: string;
                        parent_code?: string;
                        level?: number;
                        level_info?: string;
                        status: number;
                        extend_info?: Array<{
                            field_type: number;
                            field_value?: string;
                            options?: Array<string>;
                            num?: number;
                            date?: string;
                            range_date?: Array<string>;
                            field_code: string;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                        }>;
                        is_all_company: boolean;
                        project_company_dept_mappings?: Array<{
                            project_union_id?: string;
                            company_union_id: string;
                            is_all_department: boolean;
                            department_union_id: string;
                        }>;
                        multi_language_name: Array<{
                            language: "zh" | "en" | "ja";
                            value: string;
                        }>;
                    };
                    params?: {
                        query?: string;
                        page_size?: number;
                        page_token?: number;
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
                                    project_uid?: string;
                                    code?: string;
                                    name?: string;
                                    type?: string;
                                    responsible_user_union_id?: string;
                                    start_day?: string;
                                    end_day?: string;
                                    parent_code?: string;
                                    level?: number;
                                    level_info?: string;
                                    status: number;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    is_all_company: boolean;
                                    project_company_dept_mappings?: Array<{
                                        project_union_id?: string;
                                        company_union_id: string;
                                        is_all_department: boolean;
                                        department_union_id: string;
                                    }>;
                                    multi_language_name: Array<{
                                        language: "zh" | "en" | "ja";
                                        value: string;
                                    }>;
                                }>;
                                page_token?: number;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/projects/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=project&version=v1 document }
             *
             * 获取单个项目
             *
             * 根据project_uid 获取对应的项目数据
             */
            get: async (
                payload?: {
                    path: { project_uid: string };
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
                                project?: {
                                    project_uid?: string;
                                    code?: string;
                                    name?: string;
                                    type?: string;
                                    responsible_user_union_id?: string;
                                    start_day?: string;
                                    end_day?: string;
                                    parent_code?: string;
                                    level?: number;
                                    level_info?: string;
                                    status: number;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    is_all_company: boolean;
                                    project_company_dept_mappings?: Array<{
                                        project_union_id?: string;
                                        company_union_id: string;
                                        is_all_department: boolean;
                                        department_union_id: string;
                                    }>;
                                    multi_language_name: Array<{
                                        language: "zh" | "en" | "ja";
                                        value: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/projects/:project_uid`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=project&version=v1 document }
             *
             * 删除项目
             *
             * 根据project_uid 删除项目
             */
            delete: async (
                payload?: {
                    path: { project_uid: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/projects/:project_uid`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=project&version=v1 document }
             *
             * 更新项目
             *
             * 根据project_uid更新项目
             */
            update: async (
                payload?: {
                    data: {
                        code?: string;
                        name?: string;
                        type?: string;
                        responsible_user_union_id?: string;
                        start_day?: string;
                        end_day?: string;
                        parent_code?: string;
                        level?: number;
                        level_info?: string;
                        status: number;
                        extend_info?: Array<{
                            field_type: number;
                            field_value?: string;
                            options?: Array<string>;
                            num?: number;
                            date?: string;
                            range_date?: Array<string>;
                            field_code: string;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                        }>;
                        is_all_company: boolean;
                        project_company_dept_mappings?: Array<{
                            project_union_id?: string;
                            company_union_id: string;
                            is_all_department: boolean;
                            department_union_id: string;
                        }>;
                        multi_language_name: Array<{
                            language: "zh" | "en" | "ja";
                            value: string;
                        }>;
                    };
                    path: { project_uid: string };
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
                                project?: {
                                    project_uid?: string;
                                    code?: string;
                                    name?: string;
                                    type?: string;
                                    responsible_user_union_id?: string;
                                    start_day?: string;
                                    end_day?: string;
                                    parent_code?: string;
                                    level?: number;
                                    level_info?: string;
                                    status: number;
                                    extend_info?: Array<{
                                        field_type: number;
                                        field_value?: string;
                                        options?: Array<string>;
                                        num?: number;
                                        date?: string;
                                        range_date?: Array<string>;
                                        field_code: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    is_all_company: boolean;
                                    project_company_dept_mappings?: Array<{
                                        project_union_id?: string;
                                        company_union_id: string;
                                        is_all_department: boolean;
                                        department_union_id: string;
                                    }>;
                                    multi_language_name: Array<{
                                        language: "zh" | "en" | "ja";
                                        value: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/projects/:project_uid`,
                            path
                        ),
                        method: "PUT",
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
         * user_auth_data_relation
         */
        userAuthDataRelation: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=user_auth_data_relation&apiName=unbind&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind&project=mdm&resource=user_auth_data_relation&version=v1 document }
             *
             * 用户数据维度解绑
             *
             * 通过该接口，可为指定应用下的指定用户解除一类数据维度。
             */
            unbind: async (
                payload?: {
                    data: {
                        root_dimension_type: string;
                        sub_dimension_types: Array<string>;
                        authorized_user_ids: Array<string>;
                        uams_app_id: string;
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
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/user_auth_data_relations/unbind`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=user_auth_data_relation&apiName=bind&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=bind&project=mdm&resource=user_auth_data_relation&version=v1 document }
             *
             * 用户数据维度绑定
             *
             * 通过该接口，可为指定应用下的用户绑定一类数据维度，支持批量给多个用户同时增量授权。
             */
            bind: async (
                payload?: {
                    data: {
                        root_dimension_type: string;
                        sub_dimension_types: Array<string>;
                        authorized_user_ids: Array<string>;
                        uams_app_id: string;
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
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/user_auth_data_relations/bind`,
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
         * fixed_exchange_rate
         */
        fixedExchangeRate: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=fixed_exchange_rate&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=fixed_exchange_rate&version=v1 document }
             *
             * 查询固定汇率
             *
             * 根据原始币种、目标币种、查询日期获取固定汇率
             */
            get: async (
                payload?: {
                    params: {
                        source_currency: string;
                        target_currency: string;
                        date: string;
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
                                fixed_exchange_rate?: {
                                    source_currency?: string;
                                    target_currency?: string;
                                    effective_date?: string;
                                    exchange_rate?: string;
                                    status?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/fixed_exchange_rate`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=fixed_exchange_rate&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=fixed_exchange_rate&version=v1 document }
             *
             * 更新固定汇率
             *
             * 以原始币种、目标币种、生效日期的组合作为唯一键设定固定汇率，如果指定条件下无汇率值，则新增一条汇率值，否则为更新当前条件下汇率值。
             */
            update: async (
                payload?: {
                    data?: {
                        source_currency?: string;
                        target_currency?: string;
                        effective_date?: string;
                        exchange_rate?: string;
                        status?: number;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mdm/v1/fixed_exchange_rate`,
                            path
                        ),
                        method: "PUT",
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
             * vendor
             */
            vendor: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            vendor?: string;
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
                                    `${this.domain}/open-apis/mdm/v1/vendors`,
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
                                                        ad_country?: string;
                                                        ad_province?: string;
                                                        ad_city?: string;
                                                        address?: string;
                                                        ad_postcode?: string;
                                                        legal_person?: string;
                                                        certification_type?:
                                                            | "0"
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "5"
                                                            | "6"
                                                            | "8"
                                                            | "9"
                                                            | "10"
                                                            | "11"
                                                            | "12"
                                                            | "13";
                                                        certification_id?: string;
                                                        contact_person?: string;
                                                        contact_telephone?: string;
                                                        contact_mobile_phone?: string;
                                                        fax?: string;
                                                        e_mail?: string;
                                                        status: number;
                                                        vendor?: string;
                                                        vendor_text?: string;
                                                        short_text?: string;
                                                        vendor_type?: "1" | "2";
                                                        vendor_category?:
                                                            | "11"
                                                            | "12"
                                                            | "21"
                                                            | "22"
                                                            | "23";
                                                        vendor_nature?:
                                                            | "0"
                                                            | "1"
                                                            | "2";
                                                        linked_employee?: string;
                                                        linked_customer?: string;
                                                        associated_with_legal_entity?: boolean;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                        vendor_accounts?: Array<{
                                                            id?: string;
                                                            account?: string;
                                                            iban?: string;
                                                            account_name?: string;
                                                            bank_id?: string;
                                                            bank_code?: string;
                                                            swift_code?: string;
                                                            vendor_site_code?: string;
                                                            bank_name?: string;
                                                            bank_acronym?: string;
                                                            country?: string;
                                                            bank_control_code?: string;
                                                            extend_info?: Array<{
                                                                field_type: number;
                                                                field_value?: string;
                                                                options?: Array<string>;
                                                                num?: number;
                                                                date?: string;
                                                                range_date?: Array<string>;
                                                                field_code: string;
                                                                appendix?: Array<{
                                                                    file_id?: string;
                                                                    file_name?: string;
                                                                    file_type?:
                                                                        | "DOC"
                                                                        | "DOCX"
                                                                        | "XLS"
                                                                        | "XLSX"
                                                                        | "PNG"
                                                                        | "JPG"
                                                                        | "JPEG"
                                                                        | "PDF"
                                                                        | "ZIP"
                                                                        | "RAR";
                                                                    file_size?: number;
                                                                    download_url?: string;
                                                                }>;
                                                            }>;
                                                        }>;
                                                        vendor_addresses?: Array<{
                                                            id?: string;
                                                            country?: string;
                                                            province?: string;
                                                            city?: string;
                                                            county?: string;
                                                            address?: string;
                                                            extend_info?: Array<{
                                                                field_type: number;
                                                                field_value?: string;
                                                                options?: Array<string>;
                                                                num?: number;
                                                                date?: string;
                                                                range_date?: Array<string>;
                                                                field_code: string;
                                                                appendix?: Array<{
                                                                    file_id?: string;
                                                                    file_name?: string;
                                                                    file_type?:
                                                                        | "DOC"
                                                                        | "DOCX"
                                                                        | "XLS"
                                                                        | "XLSX"
                                                                        | "PNG"
                                                                        | "JPG"
                                                                        | "JPEG"
                                                                        | "PDF"
                                                                        | "ZIP"
                                                                        | "RAR";
                                                                    file_size?: number;
                                                                    download_url?: string;
                                                                }>;
                                                            }>;
                                                        }>;
                                                        vendor_company_views?: Array<{
                                                            id?: string;
                                                            company_code?: string;
                                                            gl_account?: string;
                                                            vendor_site_code?: string;
                                                            payment_term?: string;
                                                            down_payment_term?: string;
                                                            extend_info?: Array<{
                                                                field_type: number;
                                                                field_value?: string;
                                                                options?: Array<string>;
                                                                num?: number;
                                                                date?: string;
                                                                range_date?: Array<string>;
                                                                field_code: string;
                                                                appendix?: Array<{
                                                                    file_id?: string;
                                                                    file_name?: string;
                                                                    file_type?:
                                                                        | "DOC"
                                                                        | "DOCX"
                                                                        | "XLS"
                                                                        | "XLSX"
                                                                        | "PNG"
                                                                        | "JPG"
                                                                        | "JPEG"
                                                                        | "PDF"
                                                                        | "ZIP"
                                                                        | "RAR";
                                                                    file_size?: number;
                                                                    download_url?: string;
                                                                }>;
                                                            }>;
                                                        }>;
                                                        vendor_contacts?: Array<{
                                                            id?: string;
                                                            name?: string;
                                                            position?: string;
                                                            email?: string;
                                                            phone?: string;
                                                            remark?: string;
                                                            extend_info?: Array<{
                                                                field_type: number;
                                                                field_value?: string;
                                                                options?: Array<string>;
                                                                num?: number;
                                                                date?: string;
                                                                range_date?: Array<string>;
                                                                field_code: string;
                                                                appendix?: Array<{
                                                                    file_id?: string;
                                                                    file_name?: string;
                                                                    file_type?:
                                                                        | "DOC"
                                                                        | "DOCX"
                                                                        | "XLS"
                                                                        | "XLSX"
                                                                        | "PNG"
                                                                        | "JPG"
                                                                        | "JPEG"
                                                                        | "PDF"
                                                                        | "ZIP"
                                                                        | "RAR";
                                                                    file_size?: number;
                                                                    download_url?: string;
                                                                }>;
                                                            }>;
                                                        }>;
                                                        gl_account?: string;
                                                        down_payment_term?: string;
                                                        payment_term?: string;
                                                        vendor_site_code?: string;
                                                        appendix?: Array<{
                                                            file_id?: string;
                                                            file_name?: string;
                                                            file_type?:
                                                                | "DOC"
                                                                | "DOCX"
                                                                | "XLS"
                                                                | "XLSX"
                                                                | "PNG"
                                                                | "JPG"
                                                                | "JPEG"
                                                                | "PDF"
                                                                | "ZIP"
                                                                | "RAR";
                                                            file_size?: number;
                                                            download_url?: string;
                                                        }>;
                                                        is_risked?: boolean;
                                                        owner_depts?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mdm&resource=vendor&version=v1 document }
                 *
                 * 获取交易方
                 *
                 * 根据交易方编码来获取对应的交易方。参数均采用驼峰式
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            vendor?: string;
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
                                        ad_country?: string;
                                        ad_province?: string;
                                        ad_city?: string;
                                        address?: string;
                                        ad_postcode?: string;
                                        legal_person?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        contact_person?: string;
                                        contact_telephone?: string;
                                        contact_mobile_phone?: string;
                                        fax?: string;
                                        e_mail?: string;
                                        status: number;
                                        vendor?: string;
                                        vendor_text?: string;
                                        short_text?: string;
                                        vendor_type?: "1" | "2";
                                        vendor_category?:
                                            | "11"
                                            | "12"
                                            | "21"
                                            | "22"
                                            | "23";
                                        vendor_nature?: "0" | "1" | "2";
                                        linked_employee?: string;
                                        linked_customer?: string;
                                        associated_with_legal_entity?: boolean;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        vendor_accounts?: Array<{
                                            id?: string;
                                            account?: string;
                                            iban?: string;
                                            account_name?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            swift_code?: string;
                                            vendor_site_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_addresses?: Array<{
                                            id?: string;
                                            country?: string;
                                            province?: string;
                                            city?: string;
                                            county?: string;
                                            address?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_company_views?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            gl_account?: string;
                                            vendor_site_code?: string;
                                            payment_term?: string;
                                            down_payment_term?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_contacts?: Array<{
                                            id?: string;
                                            name?: string;
                                            position?: string;
                                            email?: string;
                                            phone?: string;
                                            remark?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        gl_account?: string;
                                        down_payment_term?: string;
                                        payment_term?: string;
                                        vendor_site_code?: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                        is_risked?: boolean;
                                        owner_depts?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/vendors`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=vendor&version=v1 document }
                 *
                 * 获取单个交易方
                 *
                 * 根据交易方id来获取交易方信息。参数均采用驼峰式
                 */
                get: async (
                    payload?: {
                        path?: { vendor_id?: string };
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
                                    vendor?: {
                                        id?: string;
                                        ad_country?: string;
                                        ad_province?: string;
                                        ad_city?: string;
                                        address?: string;
                                        ad_postcode?: string;
                                        legal_person?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        contact_person?: string;
                                        contact_telephone?: string;
                                        contact_mobile_phone?: string;
                                        fax?: string;
                                        e_mail?: string;
                                        status: number;
                                        vendor?: string;
                                        vendor_text?: string;
                                        short_text?: string;
                                        vendor_type?: "1" | "2";
                                        vendor_category?:
                                            | "11"
                                            | "12"
                                            | "21"
                                            | "22"
                                            | "23";
                                        vendor_nature?: "0" | "1" | "2";
                                        linked_employee?: string;
                                        linked_customer?: string;
                                        associated_with_legal_entity?: boolean;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        vendor_accounts?: Array<{
                                            id?: string;
                                            account?: string;
                                            iban?: string;
                                            account_name?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            swift_code?: string;
                                            vendor_site_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_addresses?: Array<{
                                            id?: string;
                                            country?: string;
                                            province?: string;
                                            city?: string;
                                            county?: string;
                                            address?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_company_views?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            gl_account?: string;
                                            vendor_site_code?: string;
                                            payment_term?: string;
                                            down_payment_term?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_contacts?: Array<{
                                            id?: string;
                                            name?: string;
                                            position?: string;
                                            email?: string;
                                            phone?: string;
                                            remark?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        gl_account?: string;
                                        down_payment_term?: string;
                                        payment_term?: string;
                                        vendor_site_code?: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                        is_risked?: boolean;
                                        owner_depts?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/vendors/:vendor_id`,
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
                listAllWithIterator: async (
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
                                    `${this.domain}/open-apis/mdm/v1/vendors/list_all`,
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
                                                        ad_country?: string;
                                                        ad_province?: string;
                                                        ad_city?: string;
                                                        address?: string;
                                                        ad_postcode?: string;
                                                        legal_person?: string;
                                                        certification_type?:
                                                            | "0"
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "5"
                                                            | "6"
                                                            | "8"
                                                            | "9"
                                                            | "10"
                                                            | "11"
                                                            | "12"
                                                            | "13";
                                                        certification_id?: string;
                                                        contact_person?: string;
                                                        contact_telephone?: string;
                                                        contact_mobile_phone?: string;
                                                        fax?: string;
                                                        e_mail?: string;
                                                        status: number;
                                                        vendor?: string;
                                                        vendor_text?: string;
                                                        short_text?: string;
                                                        vendor_type?: "1" | "2";
                                                        vendor_category?:
                                                            | "11"
                                                            | "12"
                                                            | "21"
                                                            | "22"
                                                            | "23";
                                                        vendor_nature?:
                                                            | "0"
                                                            | "1"
                                                            | "2";
                                                        linked_employee?: string;
                                                        linked_customer?: string;
                                                        associated_with_legal_entity?: boolean;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                        vendor_accounts?: Array<{
                                                            id?: string;
                                                            account?: string;
                                                            iban?: string;
                                                            account_name?: string;
                                                            bank_id?: string;
                                                            bank_code?: string;
                                                            swift_code?: string;
                                                            vendor_site_code?: string;
                                                            bank_name?: string;
                                                            bank_acronym?: string;
                                                            country?: string;
                                                            bank_control_code?: string;
                                                            extend_info?: Array<{
                                                                field_type: number;
                                                                field_value?: string;
                                                                options?: Array<string>;
                                                                num?: number;
                                                                date?: string;
                                                                range_date?: Array<string>;
                                                                field_code: string;
                                                                appendix?: Array<{
                                                                    file_id?: string;
                                                                    file_name?: string;
                                                                    file_type?:
                                                                        | "DOC"
                                                                        | "DOCX"
                                                                        | "XLS"
                                                                        | "XLSX"
                                                                        | "PNG"
                                                                        | "JPG"
                                                                        | "JPEG"
                                                                        | "PDF"
                                                                        | "ZIP"
                                                                        | "RAR";
                                                                    file_size?: number;
                                                                    download_url?: string;
                                                                }>;
                                                            }>;
                                                        }>;
                                                        vendor_addresses?: Array<{
                                                            id?: string;
                                                            country?: string;
                                                            province?: string;
                                                            city?: string;
                                                            county?: string;
                                                            address?: string;
                                                            extend_info?: Array<{
                                                                field_type: number;
                                                                field_value?: string;
                                                                options?: Array<string>;
                                                                num?: number;
                                                                date?: string;
                                                                range_date?: Array<string>;
                                                                field_code: string;
                                                                appendix?: Array<{
                                                                    file_id?: string;
                                                                    file_name?: string;
                                                                    file_type?:
                                                                        | "DOC"
                                                                        | "DOCX"
                                                                        | "XLS"
                                                                        | "XLSX"
                                                                        | "PNG"
                                                                        | "JPG"
                                                                        | "JPEG"
                                                                        | "PDF"
                                                                        | "ZIP"
                                                                        | "RAR";
                                                                    file_size?: number;
                                                                    download_url?: string;
                                                                }>;
                                                            }>;
                                                        }>;
                                                        vendor_company_views?: Array<{
                                                            id?: string;
                                                            company_code?: string;
                                                            gl_account?: string;
                                                            vendor_site_code?: string;
                                                            payment_term?: string;
                                                            down_payment_term?: string;
                                                            extend_info?: Array<{
                                                                field_type: number;
                                                                field_value?: string;
                                                                options?: Array<string>;
                                                                num?: number;
                                                                date?: string;
                                                                range_date?: Array<string>;
                                                                field_code: string;
                                                                appendix?: Array<{
                                                                    file_id?: string;
                                                                    file_name?: string;
                                                                    file_type?:
                                                                        | "DOC"
                                                                        | "DOCX"
                                                                        | "XLS"
                                                                        | "XLSX"
                                                                        | "PNG"
                                                                        | "JPG"
                                                                        | "JPEG"
                                                                        | "PDF"
                                                                        | "ZIP"
                                                                        | "RAR";
                                                                    file_size?: number;
                                                                    download_url?: string;
                                                                }>;
                                                            }>;
                                                        }>;
                                                        vendor_contacts?: Array<{
                                                            id?: string;
                                                            name?: string;
                                                            position?: string;
                                                            email?: string;
                                                            phone?: string;
                                                            remark?: string;
                                                            extend_info?: Array<{
                                                                field_type: number;
                                                                field_value?: string;
                                                                options?: Array<string>;
                                                                num?: number;
                                                                date?: string;
                                                                range_date?: Array<string>;
                                                                field_code: string;
                                                                appendix?: Array<{
                                                                    file_id?: string;
                                                                    file_name?: string;
                                                                    file_type?:
                                                                        | "DOC"
                                                                        | "DOCX"
                                                                        | "XLS"
                                                                        | "XLSX"
                                                                        | "PNG"
                                                                        | "JPG"
                                                                        | "JPEG"
                                                                        | "PDF"
                                                                        | "ZIP"
                                                                        | "RAR";
                                                                    file_size?: number;
                                                                    download_url?: string;
                                                                }>;
                                                            }>;
                                                        }>;
                                                        gl_account?: string;
                                                        down_payment_term?: string;
                                                        payment_term?: string;
                                                        vendor_site_code?: string;
                                                        appendix?: Array<{
                                                            file_id?: string;
                                                            file_name?: string;
                                                            file_type?:
                                                                | "DOC"
                                                                | "DOCX"
                                                                | "XLS"
                                                                | "XLSX"
                                                                | "PNG"
                                                                | "JPG"
                                                                | "JPEG"
                                                                | "PDF"
                                                                | "ZIP"
                                                                | "RAR";
                                                            file_size?: number;
                                                            download_url?: string;
                                                        }>;
                                                        is_risked?: boolean;
                                                        owner_depts?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=list_all&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_all&project=mdm&resource=vendor&version=v1 document }
                 *
                 * 交易方全量数据分页查询
                 *
                 * 交易方全量数据分页查询。参数均采用驼峰式
                 */
                listAll: async (
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
                                        ad_country?: string;
                                        ad_province?: string;
                                        ad_city?: string;
                                        address?: string;
                                        ad_postcode?: string;
                                        legal_person?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        contact_person?: string;
                                        contact_telephone?: string;
                                        contact_mobile_phone?: string;
                                        fax?: string;
                                        e_mail?: string;
                                        status: number;
                                        vendor?: string;
                                        vendor_text?: string;
                                        short_text?: string;
                                        vendor_type?: "1" | "2";
                                        vendor_category?:
                                            | "11"
                                            | "12"
                                            | "21"
                                            | "22"
                                            | "23";
                                        vendor_nature?: "0" | "1" | "2";
                                        linked_employee?: string;
                                        linked_customer?: string;
                                        associated_with_legal_entity?: boolean;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        vendor_accounts?: Array<{
                                            id?: string;
                                            account?: string;
                                            iban?: string;
                                            account_name?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            swift_code?: string;
                                            vendor_site_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_addresses?: Array<{
                                            id?: string;
                                            country?: string;
                                            province?: string;
                                            city?: string;
                                            county?: string;
                                            address?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_company_views?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            gl_account?: string;
                                            vendor_site_code?: string;
                                            payment_term?: string;
                                            down_payment_term?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_contacts?: Array<{
                                            id?: string;
                                            name?: string;
                                            position?: string;
                                            email?: string;
                                            phone?: string;
                                            remark?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        gl_account?: string;
                                        down_payment_term?: string;
                                        payment_term?: string;
                                        vendor_site_code?: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                        is_risked?: boolean;
                                        owner_depts?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/vendors/list_all`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=vendor&version=v1 document }
                 *
                 * 创建交易方
                 *
                 * 使用该接口创建一个交易方,字段是否必填是根据后台动态配置的，如想获取配置，主数据的配置开放文档里获取。参数均采用驼峰式
                 */
                create: async (
                    payload?: {
                        data: {
                            id?: string;
                            ad_country?: string;
                            ad_province?: string;
                            ad_city?: string;
                            address?: string;
                            ad_postcode?: string;
                            legal_person?: string;
                            certification_type?:
                                | "0"
                                | "1"
                                | "2"
                                | "3"
                                | "4"
                                | "5"
                                | "6"
                                | "8"
                                | "9"
                                | "10"
                                | "11"
                                | "12"
                                | "13";
                            certification_id?: string;
                            contact_person?: string;
                            contact_telephone?: string;
                            contact_mobile_phone?: string;
                            fax?: string;
                            e_mail?: string;
                            status: number;
                            vendor?: string;
                            vendor_text?: string;
                            short_text?: string;
                            vendor_type?: "1" | "2";
                            vendor_category?: "11" | "12" | "21" | "22" | "23";
                            vendor_nature?: "0" | "1" | "2";
                            linked_employee?: string;
                            linked_customer?: string;
                            associated_with_legal_entity?: boolean;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            vendor_accounts?: Array<{
                                id?: string;
                                account?: string;
                                iban?: string;
                                account_name?: string;
                                bank_id?: string;
                                bank_code?: string;
                                swift_code?: string;
                                vendor_site_code?: string;
                                bank_name?: string;
                                bank_acronym?: string;
                                country?: string;
                                bank_control_code?: string;
                                extend_info?: Array<{
                                    field_type: number;
                                    field_value?: string;
                                    options?: Array<string>;
                                    num?: number;
                                    date?: string;
                                    range_date?: Array<string>;
                                    field_code: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                            }>;
                            vendor_addresses?: Array<{
                                id?: string;
                                country?: string;
                                province?: string;
                                city?: string;
                                county?: string;
                                address?: string;
                                extend_info?: Array<{
                                    field_type: number;
                                    field_value?: string;
                                    options?: Array<string>;
                                    num?: number;
                                    date?: string;
                                    range_date?: Array<string>;
                                    field_code: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                            }>;
                            vendor_company_views?: Array<{
                                id?: string;
                                company_code?: string;
                                gl_account?: string;
                                vendor_site_code?: string;
                                payment_term?: string;
                                down_payment_term?: string;
                                extend_info?: Array<{
                                    field_type: number;
                                    field_value?: string;
                                    options?: Array<string>;
                                    num?: number;
                                    date?: string;
                                    range_date?: Array<string>;
                                    field_code: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                            }>;
                            vendor_contacts?: Array<{
                                id?: string;
                                name?: string;
                                position?: string;
                                email?: string;
                                phone?: string;
                                remark?: string;
                                extend_info?: Array<{
                                    field_type: number;
                                    field_value?: string;
                                    options?: Array<string>;
                                    num?: number;
                                    date?: string;
                                    range_date?: Array<string>;
                                    field_code: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                            }>;
                            gl_account?: string;
                            down_payment_term?: string;
                            payment_term?: string;
                            vendor_site_code?: string;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                            is_risked?: boolean;
                            owner_depts?: Array<string>;
                        };
                        params?: {
                            user_id?: string;
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
                                    vendor?: {
                                        id?: string;
                                        ad_country?: string;
                                        ad_province?: string;
                                        ad_city?: string;
                                        address?: string;
                                        ad_postcode?: string;
                                        legal_person?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        contact_person?: string;
                                        contact_telephone?: string;
                                        contact_mobile_phone?: string;
                                        fax?: string;
                                        e_mail?: string;
                                        status: number;
                                        vendor?: string;
                                        vendor_text?: string;
                                        short_text?: string;
                                        vendor_type?: "1" | "2";
                                        vendor_category?:
                                            | "11"
                                            | "12"
                                            | "21"
                                            | "22"
                                            | "23";
                                        vendor_nature?: "0" | "1" | "2";
                                        linked_employee?: string;
                                        linked_customer?: string;
                                        associated_with_legal_entity?: boolean;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        vendor_accounts?: Array<{
                                            id?: string;
                                            account?: string;
                                            iban?: string;
                                            account_name?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            swift_code?: string;
                                            vendor_site_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_addresses?: Array<{
                                            id?: string;
                                            country?: string;
                                            province?: string;
                                            city?: string;
                                            county?: string;
                                            address?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_company_views?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            gl_account?: string;
                                            vendor_site_code?: string;
                                            payment_term?: string;
                                            down_payment_term?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_contacts?: Array<{
                                            id?: string;
                                            name?: string;
                                            position?: string;
                                            email?: string;
                                            phone?: string;
                                            remark?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        gl_account?: string;
                                        down_payment_term?: string;
                                        payment_term?: string;
                                        vendor_site_code?: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                        is_risked?: boolean;
                                        owner_depts?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/vendors`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=vendor&version=v1 document }
                 *
                 * 更新交易方
                 *
                 * 使用该接口来根据id来更新交易方的全部字段，字段是否必填是根据后台动态配置的，如想获取配置，主数据的配置开放文档里获取。参数均采用驼峰式
                 */
                update: async (
                    payload?: {
                        data: {
                            id?: string;
                            ad_country?: string;
                            ad_province?: string;
                            ad_city?: string;
                            address?: string;
                            ad_postcode?: string;
                            legal_person?: string;
                            certification_type?:
                                | "0"
                                | "1"
                                | "2"
                                | "3"
                                | "4"
                                | "5"
                                | "6"
                                | "8"
                                | "9"
                                | "10"
                                | "11"
                                | "12"
                                | "13";
                            certification_id?: string;
                            contact_person?: string;
                            contact_telephone?: string;
                            contact_mobile_phone?: string;
                            fax?: string;
                            e_mail?: string;
                            status: number;
                            vendor?: string;
                            vendor_text?: string;
                            short_text?: string;
                            vendor_type?: "1" | "2";
                            vendor_category?: "11" | "12" | "21" | "22" | "23";
                            vendor_nature?: "0" | "1" | "2";
                            linked_employee?: string;
                            linked_customer?: string;
                            associated_with_legal_entity?: boolean;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            vendor_accounts?: Array<{
                                id?: string;
                                account?: string;
                                iban?: string;
                                account_name?: string;
                                bank_id?: string;
                                bank_code?: string;
                                swift_code?: string;
                                vendor_site_code?: string;
                                bank_name?: string;
                                bank_acronym?: string;
                                country?: string;
                                bank_control_code?: string;
                                extend_info?: Array<{
                                    field_type: number;
                                    field_value?: string;
                                    options?: Array<string>;
                                    num?: number;
                                    date?: string;
                                    range_date?: Array<string>;
                                    field_code: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                            }>;
                            vendor_addresses?: Array<{
                                id?: string;
                                country?: string;
                                province?: string;
                                city?: string;
                                county?: string;
                                address?: string;
                                extend_info?: Array<{
                                    field_type: number;
                                    field_value?: string;
                                    options?: Array<string>;
                                    num?: number;
                                    date?: string;
                                    range_date?: Array<string>;
                                    field_code: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                            }>;
                            vendor_company_views?: Array<{
                                id?: string;
                                company_code?: string;
                                gl_account?: string;
                                vendor_site_code?: string;
                                payment_term?: string;
                                down_payment_term?: string;
                                extend_info?: Array<{
                                    field_type: number;
                                    field_value?: string;
                                    options?: Array<string>;
                                    num?: number;
                                    date?: string;
                                    range_date?: Array<string>;
                                    field_code: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                            }>;
                            vendor_contacts?: Array<{
                                id?: string;
                                name?: string;
                                position?: string;
                                email?: string;
                                phone?: string;
                                remark?: string;
                                extend_info?: Array<{
                                    field_type: number;
                                    field_value?: string;
                                    options?: Array<string>;
                                    num?: number;
                                    date?: string;
                                    range_date?: Array<string>;
                                    field_code: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                            }>;
                            gl_account?: string;
                            down_payment_term?: string;
                            payment_term?: string;
                            vendor_site_code?: string;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                            is_risked?: boolean;
                            owner_depts?: Array<string>;
                        };
                        params?: {
                            user_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { vendor_id?: string };
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
                                    vendor?: {
                                        id?: string;
                                        ad_country?: string;
                                        ad_province?: string;
                                        ad_city?: string;
                                        address?: string;
                                        ad_postcode?: string;
                                        legal_person?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        contact_person?: string;
                                        contact_telephone?: string;
                                        contact_mobile_phone?: string;
                                        fax?: string;
                                        e_mail?: string;
                                        status: number;
                                        vendor?: string;
                                        vendor_text?: string;
                                        short_text?: string;
                                        vendor_type?: "1" | "2";
                                        vendor_category?:
                                            | "11"
                                            | "12"
                                            | "21"
                                            | "22"
                                            | "23";
                                        vendor_nature?: "0" | "1" | "2";
                                        linked_employee?: string;
                                        linked_customer?: string;
                                        associated_with_legal_entity?: boolean;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        vendor_accounts?: Array<{
                                            id?: string;
                                            account?: string;
                                            iban?: string;
                                            account_name?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            swift_code?: string;
                                            vendor_site_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_addresses?: Array<{
                                            id?: string;
                                            country?: string;
                                            province?: string;
                                            city?: string;
                                            county?: string;
                                            address?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_company_views?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            gl_account?: string;
                                            vendor_site_code?: string;
                                            payment_term?: string;
                                            down_payment_term?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_contacts?: Array<{
                                            id?: string;
                                            name?: string;
                                            position?: string;
                                            email?: string;
                                            phone?: string;
                                            remark?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        gl_account?: string;
                                        down_payment_term?: string;
                                        payment_term?: string;
                                        vendor_site_code?: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                        is_risked?: boolean;
                                        owner_depts?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/vendors/:vendor_id`,
                                path
                            ),
                            method: "PUT",
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=vendor&apiName=query_vendors&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_vendors&project=mdm&resource=vendor&version=v1 document }
                 *
                 * 根据证件id查询交易方
                 *
                 * 根据交易方证件id来获取对应的交易方。参数均采用蛇形
                 */
                queryVendors: async (
                    payload?: {
                        params: {
                            certification_id: string;
                            ad_country: string;
                            certification_type?: string;
                            status?: number;
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
                                    vendor?: {
                                        id?: string;
                                        ad_country?: string;
                                        ad_province?: string;
                                        ad_city?: string;
                                        address?: string;
                                        ad_postcode?: string;
                                        legal_person?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        contact_person?: string;
                                        contact_telephone?: string;
                                        contact_mobile_phone?: string;
                                        fax?: string;
                                        e_mail?: string;
                                        status: number;
                                        vendor?: string;
                                        vendor_text?: string;
                                        short_text?: string;
                                        vendor_type?: "1" | "2";
                                        vendor_category?:
                                            | "11"
                                            | "12"
                                            | "21"
                                            | "22"
                                            | "23";
                                        vendor_nature?: "0" | "1" | "2";
                                        linked_employee?: string;
                                        linked_customer?: string;
                                        associated_with_legal_entity?: boolean;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        vendor_accounts?: Array<{
                                            id?: string;
                                            account?: string;
                                            iban?: string;
                                            account_name?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            swift_code?: string;
                                            vendor_site_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_addresses?: Array<{
                                            id?: string;
                                            country?: string;
                                            province?: string;
                                            city?: string;
                                            county?: string;
                                            address?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_company_views?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            gl_account?: string;
                                            vendor_site_code?: string;
                                            payment_term?: string;
                                            down_payment_term?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        vendor_contacts?: Array<{
                                            id?: string;
                                            name?: string;
                                            position?: string;
                                            email?: string;
                                            phone?: string;
                                            remark?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                        }>;
                                        gl_account?: string;
                                        down_payment_term?: string;
                                        payment_term?: string;
                                        vendor_site_code?: string;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                        is_risked?: boolean;
                                        owner_depts?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/vendors/query_vendors`,
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
             * legal_entity
             */
            legalEntity: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            legal_entity?: string;
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
                                    `${this.domain}/open-apis/mdm/v1/legal_entities`,
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
                                                        legal_entity?: string;
                                                        legal_entity_text?: string;
                                                        short_text?: string;
                                                        certification_type?:
                                                            | "0"
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "5"
                                                            | "6"
                                                            | "8"
                                                            | "9"
                                                            | "10"
                                                            | "11"
                                                            | "12"
                                                            | "13";
                                                        certification_id?: string;
                                                        legal_person?: string;
                                                        country?: string;
                                                        province?: string;
                                                        city?: string;
                                                        address?: string;
                                                        taxpayer_type?:
                                                            | "1"
                                                            | "2";
                                                        telephone?: string;
                                                        bank_id?: string;
                                                        bank_name?: string;
                                                        bank_account?: string;
                                                        status: number;
                                                        legal_entity_banks?: Array<{
                                                            id?: string;
                                                            company_code?: string;
                                                            bank_id?: string;
                                                            bank_code?: string;
                                                            bank_name?: string;
                                                            bank_acronym?: string;
                                                            country?: string;
                                                            account_name?: string;
                                                            bank_account?: string;
                                                            swift_code?: string;
                                                            bank_control_code?: string;
                                                            extend_info?: Array<{
                                                                field_type: number;
                                                                field_value?: string;
                                                                options?: Array<string>;
                                                                num?: number;
                                                                date?: string;
                                                                range_date?: Array<string>;
                                                                field_code: string;
                                                                appendix?: Array<{
                                                                    file_id?: string;
                                                                    file_name?: string;
                                                                    file_type?:
                                                                        | "DOC"
                                                                        | "DOCX"
                                                                        | "XLS"
                                                                        | "XLSX"
                                                                        | "PNG"
                                                                        | "JPG"
                                                                        | "JPEG"
                                                                        | "PDF"
                                                                        | "ZIP"
                                                                        | "RAR";
                                                                    file_size?: number;
                                                                    download_url?: string;
                                                                }>;
                                                            }>;
                                                            iban_account?: string;
                                                            currency: string;
                                                            gl_account?: string;
                                                            clearing_account?: string;
                                                            account_attribute_desc?: string;
                                                        }>;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                        appendix?: Array<{
                                                            file_id?: string;
                                                            file_name?: string;
                                                            file_type?:
                                                                | "DOC"
                                                                | "DOCX"
                                                                | "XLS"
                                                                | "XLSX"
                                                                | "PNG"
                                                                | "JPG"
                                                                | "JPEG"
                                                                | "PDF"
                                                                | "ZIP"
                                                                | "RAR";
                                                            file_size?: number;
                                                            download_url?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=legal_entity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mdm&resource=legal_entity&version=v1 document }
                 *
                 * 获取法人实体
                 *
                 * 根据法人实体编码，来获取对应的法人实体信息。参数均采用驼峰式
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            legal_entity?: string;
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
                                        legal_entity?: string;
                                        legal_entity_text?: string;
                                        short_text?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        legal_person?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        address?: string;
                                        taxpayer_type?: "1" | "2";
                                        telephone?: string;
                                        bank_id?: string;
                                        bank_name?: string;
                                        bank_account?: string;
                                        status: number;
                                        legal_entity_banks?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            account_name?: string;
                                            bank_account?: string;
                                            swift_code?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                            iban_account?: string;
                                            currency: string;
                                            gl_account?: string;
                                            clearing_account?: string;
                                            account_attribute_desc?: string;
                                        }>;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/legal_entities`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=legal_entity&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=legal_entity&version=v1 document }
                 *
                 * 获取单个法人实体信息
                 *
                 * 通过该接口，凭借法人主体id 获取单个法人实体信息。参数均采用驼峰式
                 */
                get: async (
                    payload?: {
                        path?: { legal_entity_id?: string };
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
                                    legal_entity?: {
                                        id?: string;
                                        legal_entity?: string;
                                        legal_entity_text?: string;
                                        short_text?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        legal_person?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        address?: string;
                                        taxpayer_type?: "1" | "2";
                                        telephone?: string;
                                        bank_id?: string;
                                        bank_name?: string;
                                        bank_account?: string;
                                        status: number;
                                        legal_entity_banks?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            account_name?: string;
                                            bank_account?: string;
                                            swift_code?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                            iban_account?: string;
                                            currency: string;
                                            gl_account?: string;
                                            clearing_account?: string;
                                            account_attribute_desc?: string;
                                        }>;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/legal_entities/:legal_entity_id`,
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
                listAllWithIterator: async (
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
                                    `${this.domain}/open-apis/mdm/v1/legal_entities/list_all`,
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
                                                        legal_entity?: string;
                                                        legal_entity_text?: string;
                                                        short_text?: string;
                                                        certification_type?:
                                                            | "0"
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "5"
                                                            | "6"
                                                            | "8"
                                                            | "9"
                                                            | "10"
                                                            | "11"
                                                            | "12"
                                                            | "13";
                                                        certification_id?: string;
                                                        legal_person?: string;
                                                        country?: string;
                                                        province?: string;
                                                        city?: string;
                                                        address?: string;
                                                        taxpayer_type?:
                                                            | "1"
                                                            | "2";
                                                        telephone?: string;
                                                        bank_id?: string;
                                                        bank_name?: string;
                                                        bank_account?: string;
                                                        status: number;
                                                        legal_entity_banks?: Array<{
                                                            id?: string;
                                                            company_code?: string;
                                                            bank_id?: string;
                                                            bank_code?: string;
                                                            bank_name?: string;
                                                            bank_acronym?: string;
                                                            country?: string;
                                                            account_name?: string;
                                                            bank_account?: string;
                                                            swift_code?: string;
                                                            bank_control_code?: string;
                                                            extend_info?: Array<{
                                                                field_type: number;
                                                                field_value?: string;
                                                                options?: Array<string>;
                                                                num?: number;
                                                                date?: string;
                                                                range_date?: Array<string>;
                                                                field_code: string;
                                                                appendix?: Array<{
                                                                    file_id?: string;
                                                                    file_name?: string;
                                                                    file_type?:
                                                                        | "DOC"
                                                                        | "DOCX"
                                                                        | "XLS"
                                                                        | "XLSX"
                                                                        | "PNG"
                                                                        | "JPG"
                                                                        | "JPEG"
                                                                        | "PDF"
                                                                        | "ZIP"
                                                                        | "RAR";
                                                                    file_size?: number;
                                                                    download_url?: string;
                                                                }>;
                                                            }>;
                                                            iban_account?: string;
                                                            currency: string;
                                                            gl_account?: string;
                                                            clearing_account?: string;
                                                            account_attribute_desc?: string;
                                                        }>;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                        appendix?: Array<{
                                                            file_id?: string;
                                                            file_name?: string;
                                                            file_type?:
                                                                | "DOC"
                                                                | "DOCX"
                                                                | "XLS"
                                                                | "XLSX"
                                                                | "PNG"
                                                                | "JPG"
                                                                | "JPEG"
                                                                | "PDF"
                                                                | "ZIP"
                                                                | "RAR";
                                                            file_size?: number;
                                                            download_url?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=legal_entity&apiName=list_all&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_all&project=mdm&resource=legal_entity&version=v1 document }
                 *
                 * 法人实体全量数据分页查询
                 *
                 * 法人实体全量数据分页查询。参数均采用驼峰式
                 */
                listAll: async (
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
                                        legal_entity?: string;
                                        legal_entity_text?: string;
                                        short_text?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        legal_person?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        address?: string;
                                        taxpayer_type?: "1" | "2";
                                        telephone?: string;
                                        bank_id?: string;
                                        bank_name?: string;
                                        bank_account?: string;
                                        status: number;
                                        legal_entity_banks?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            account_name?: string;
                                            bank_account?: string;
                                            swift_code?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                            iban_account?: string;
                                            currency: string;
                                            gl_account?: string;
                                            clearing_account?: string;
                                            account_attribute_desc?: string;
                                        }>;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/legal_entities/list_all`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=legal_entity&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=legal_entity&version=v1 document }
                 *
                 * 创建法人实体
                 *
                 * 根据该接口，来创建一个法人实体，字段是否必填是根据后台动态配置的，如想获取配置，主数据的配置开放文档里获取。参数均采用驼峰式
                 */
                create: async (
                    payload?: {
                        data: {
                            id?: string;
                            legal_entity?: string;
                            legal_entity_text?: string;
                            short_text?: string;
                            certification_type?:
                                | "0"
                                | "1"
                                | "2"
                                | "3"
                                | "4"
                                | "5"
                                | "6"
                                | "8"
                                | "9"
                                | "10"
                                | "11"
                                | "12"
                                | "13";
                            certification_id?: string;
                            legal_person?: string;
                            country?: string;
                            province?: string;
                            city?: string;
                            address?: string;
                            taxpayer_type?: "1" | "2";
                            telephone?: string;
                            bank_id?: string;
                            bank_name?: string;
                            bank_account?: string;
                            status: number;
                            legal_entity_banks?: Array<{
                                id?: string;
                                company_code?: string;
                                bank_id?: string;
                                bank_code?: string;
                                bank_name?: string;
                                bank_acronym?: string;
                                country?: string;
                                account_name?: string;
                                bank_account?: string;
                                swift_code?: string;
                                bank_control_code?: string;
                                extend_info?: Array<{
                                    field_type: number;
                                    field_value?: string;
                                    options?: Array<string>;
                                    num?: number;
                                    date?: string;
                                    range_date?: Array<string>;
                                    field_code: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                                iban_account?: string;
                                currency: string;
                                gl_account?: string;
                                clearing_account?: string;
                                account_attribute_desc?: string;
                            }>;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                        };
                        params?: {
                            user_id?: string;
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
                                    legal_entity?: {
                                        id?: string;
                                        legal_entity?: string;
                                        legal_entity_text?: string;
                                        short_text?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        legal_person?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        address?: string;
                                        taxpayer_type?: "1" | "2";
                                        telephone?: string;
                                        bank_id?: string;
                                        bank_name?: string;
                                        bank_account?: string;
                                        status: number;
                                        legal_entity_banks?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            account_name?: string;
                                            bank_account?: string;
                                            swift_code?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                            iban_account?: string;
                                            currency: string;
                                            gl_account?: string;
                                            clearing_account?: string;
                                            account_attribute_desc?: string;
                                        }>;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/legal_entities`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=legal_entity&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=legal_entity&version=v1 document }
                 *
                 * 更新法人实体
                 *
                 * 使用该接口来根据id来更新法人实体的全部字段，字段是否必填是根据后台动态配置的，如想获取配置，主数据的配置开放文档里获取。参数均采用驼峰式
                 */
                update: async (
                    payload?: {
                        data: {
                            id?: string;
                            legal_entity?: string;
                            legal_entity_text?: string;
                            short_text?: string;
                            certification_type?:
                                | "0"
                                | "1"
                                | "2"
                                | "3"
                                | "4"
                                | "5"
                                | "6"
                                | "8"
                                | "9"
                                | "10"
                                | "11"
                                | "12"
                                | "13";
                            certification_id?: string;
                            legal_person?: string;
                            country?: string;
                            province?: string;
                            city?: string;
                            address?: string;
                            taxpayer_type?: "1" | "2";
                            telephone?: string;
                            bank_id?: string;
                            bank_name?: string;
                            bank_account?: string;
                            status: number;
                            legal_entity_banks?: Array<{
                                id?: string;
                                company_code?: string;
                                bank_id?: string;
                                bank_code?: string;
                                bank_name?: string;
                                bank_acronym?: string;
                                country?: string;
                                account_name?: string;
                                bank_account?: string;
                                swift_code?: string;
                                bank_control_code?: string;
                                extend_info?: Array<{
                                    field_type: number;
                                    field_value?: string;
                                    options?: Array<string>;
                                    num?: number;
                                    date?: string;
                                    range_date?: Array<string>;
                                    field_code: string;
                                    appendix?: Array<{
                                        file_id?: string;
                                        file_name?: string;
                                        file_type?:
                                            | "DOC"
                                            | "DOCX"
                                            | "XLS"
                                            | "XLSX"
                                            | "PNG"
                                            | "JPG"
                                            | "JPEG"
                                            | "PDF"
                                            | "ZIP"
                                            | "RAR";
                                        file_size?: number;
                                        download_url?: string;
                                    }>;
                                }>;
                                iban_account?: string;
                                currency: string;
                                gl_account?: string;
                                clearing_account?: string;
                                account_attribute_desc?: string;
                            }>;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            appendix?: Array<{
                                file_id?: string;
                                file_name?: string;
                                file_type?:
                                    | "DOC"
                                    | "DOCX"
                                    | "XLS"
                                    | "XLSX"
                                    | "PNG"
                                    | "JPG"
                                    | "JPEG"
                                    | "PDF"
                                    | "ZIP"
                                    | "RAR";
                                file_size?: number;
                                download_url?: string;
                            }>;
                        };
                        params?: {
                            user_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { legal_entity_id?: string };
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
                                    legal_entity?: {
                                        id?: string;
                                        legal_entity?: string;
                                        legal_entity_text?: string;
                                        short_text?: string;
                                        certification_type?:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "8"
                                            | "9"
                                            | "10"
                                            | "11"
                                            | "12"
                                            | "13";
                                        certification_id?: string;
                                        legal_person?: string;
                                        country?: string;
                                        province?: string;
                                        city?: string;
                                        address?: string;
                                        taxpayer_type?: "1" | "2";
                                        telephone?: string;
                                        bank_id?: string;
                                        bank_name?: string;
                                        bank_account?: string;
                                        status: number;
                                        legal_entity_banks?: Array<{
                                            id?: string;
                                            company_code?: string;
                                            bank_id?: string;
                                            bank_code?: string;
                                            bank_name?: string;
                                            bank_acronym?: string;
                                            country?: string;
                                            account_name?: string;
                                            bank_account?: string;
                                            swift_code?: string;
                                            bank_control_code?: string;
                                            extend_info?: Array<{
                                                field_type: number;
                                                field_value?: string;
                                                options?: Array<string>;
                                                num?: number;
                                                date?: string;
                                                range_date?: Array<string>;
                                                field_code: string;
                                                appendix?: Array<{
                                                    file_id?: string;
                                                    file_name?: string;
                                                    file_type?:
                                                        | "DOC"
                                                        | "DOCX"
                                                        | "XLS"
                                                        | "XLSX"
                                                        | "PNG"
                                                        | "JPG"
                                                        | "JPEG"
                                                        | "PDF"
                                                        | "ZIP"
                                                        | "RAR";
                                                    file_size?: number;
                                                    download_url?: string;
                                                }>;
                                            }>;
                                            iban_account?: string;
                                            currency: string;
                                            gl_account?: string;
                                            clearing_account?: string;
                                            account_attribute_desc?: string;
                                        }>;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        appendix?: Array<{
                                            file_id?: string;
                                            file_name?: string;
                                            file_type?:
                                                | "DOC"
                                                | "DOCX"
                                                | "XLS"
                                                | "XLSX"
                                                | "PNG"
                                                | "JPG"
                                                | "JPEG"
                                                | "PDF"
                                                | "ZIP"
                                                | "RAR";
                                            file_size?: number;
                                            download_url?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/legal_entities/:legal_entity_id`,
                                path
                            ),
                            method: "PUT",
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
             * config
             */
            config: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=config&apiName=config_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=config_list&project=mdm&resource=config&version=v1 document }
                 *
                 * 字段配置列表查询
                 *
                 * 字段配置列表查询
                 */
                configList: async (
                    payload?: {
                        params?: { biz_line?: "vendor" | "legalEntity" };
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
                                    config?: Array<{
                                        field_code?: string;
                                        field_name?: string;
                                        module?: number;
                                        field_describe?: string;
                                        sys?: number;
                                        field_type?: number;
                                        required?: number;
                                        status?: number;
                                        field_version?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/config/config_list`,
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
             * department_cost_center_relationship
             */
            departmentCostCenterRelationship: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=department_cost_center_relationship&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=department_cost_center_relationship&version=v1 document }
                 *
                 * 获取单个部门与成本中心关系
                 *
                 * 获取单个部门与成本中心关系
                 */
                get: async (
                    payload?: {
                        path?: {
                            department_cost_center_relationship_uid?: string;
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
                                    department_cost_center_relationship?: {
                                        department_cost_center_relationship_uid?: string;
                                        company_code?: string;
                                        open_department_id: string;
                                        cost_center_code: string;
                                        department_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/department_cost_center_relationships/:department_cost_center_relationship_uid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=department_cost_center_relationship&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=department_cost_center_relationship&version=v1 document }
                 *
                 * 更新部门与成本中心关系
                 *
                 * 更新部门与成本中心关系部分字段，没有填写的字段不会被更新
                 */
                update: async (
                    payload?: {
                        data?: { company_code?: string };
                        path?: {
                            department_cost_center_relationship_uid?: string;
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
                                    department_cost_center_relationship?: {
                                        department_cost_center_relationship_uid?: string;
                                        company_code?: string;
                                        open_department_id: string;
                                        cost_center_code: string;
                                        department_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/department_cost_center_relationships/:department_cost_center_relationship_uid`,
                                path
                            ),
                            method: "PUT",
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=department_cost_center_relationship&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=department_cost_center_relationship&version=v1 document }
                 *
                 * 删除部门与成本中心关系
                 *
                 * 删除单个部门与成本中心关系
                 */
                delete: async (
                    payload?: {
                        path?: {
                            department_cost_center_relationship_uid?: string;
                        };
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
                                `${this.domain}/open-apis/mdm/v1/department_cost_center_relationships/:department_cost_center_relationship_uid`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=department_cost_center_relationship&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=department_cost_center_relationship&version=v1 document }
                 *
                 * 搜索部门与成本中心关系
                 *
                 * 分页搜索部门与成本中心关系
                 */
                search: async (
                    payload?: {
                        data?: {
                            company_code?: string;
                            cost_center_code?: string;
                            department_id?: string;
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            page_size?: string;
                            page_token?: string;
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
                                        department_cost_center_relationship_uid?: string;
                                        company_code?: string;
                                        open_department_id: string;
                                        cost_center_code: string;
                                        department_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/department_cost_center_relationships/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=department_cost_center_relationship&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=department_cost_center_relationship&version=v1 document }
                 *
                 * 创建部门与成本中心关系
                 *
                 * 创建单个部门与成本中心关系
                 */
                create: async (
                    payload?: {
                        data: {
                            company_code?: string;
                            cost_center_code: string;
                            department_id?: string;
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    department_cost_center_relationship?: {
                                        department_cost_center_relationship_uid?: string;
                                        company_code?: string;
                                        open_department_id: string;
                                        cost_center_code: string;
                                        department_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/department_cost_center_relationships`,
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
             * internal_order
             */
            internalOrder: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=internal_order&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=internal_order&version=v1 document }
                 *
                 * 新建内部订单
                 *
                 * 新建单个内部订单
                 */
                create: async (
                    payload?: {
                        data: {
                            internal_order_code: string;
                            internal_order_name: string;
                            type: string;
                            responsible_user_union_id?: string;
                            company_code?: string;
                            co_area_code: string;
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
                                    internal_order: {
                                        internal_order_uid?: string;
                                        internal_order_code: string;
                                        internal_order_name: string;
                                        type: string;
                                        responsible_user_union_id?: string;
                                        company_code?: string;
                                        co_area_code: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/internal_orders`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=internal_order&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=internal_order&version=v1 document }
                 *
                 * 搜索内部订单
                 *
                 * 分页搜索内部订单
                 */
                search: async (
                    payload?: {
                        data?: {
                            type?: string;
                            responsible_user_union_id?: string;
                            company_code?: string;
                        };
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            query?: string;
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
                                        internal_order_uid?: string;
                                        internal_order_code: string;
                                        internal_order_name: string;
                                        type: string;
                                        responsible_user_union_id?: string;
                                        company_code?: string;
                                        co_area_code: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/internal_orders/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=internal_order&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=internal_order&version=v1 document }
                 *
                 * 删除内部订单
                 *
                 * 删除单个内部订单
                 */
                delete: async (
                    payload?: {
                        path: { internal_order_uid: string };
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
                                `${this.domain}/open-apis/mdm/v1/internal_orders/:internal_order_uid`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=internal_order&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=internal_order&version=v1 document }
                 *
                 * 更新内部订单
                 *
                 * 更新内部订单部分字段，没有填写的字段不会被更新
                 */
                update: async (
                    payload?: {
                        data?: {
                            internal_order_name?: string;
                            responsible_user_union_id?: string;
                            company_code?: string;
                        };
                        path: { internal_order_uid: string };
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
                                    internel_order?: {
                                        internal_order_uid?: string;
                                        internal_order_code: string;
                                        internal_order_name: string;
                                        type: string;
                                        responsible_user_union_id?: string;
                                        company_code?: string;
                                        co_area_code: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/internal_orders/:internal_order_uid`,
                                path
                            ),
                            method: "PUT",
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=internal_order&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=internal_order&version=v1 document }
                 *
                 * 获取单个内部订单
                 *
                 * 获取单个内部订单
                 */
                get: async (
                    payload?: {
                        path: { internal_order_uid: string };
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
                                    internal_order?: {
                                        internal_order_uid?: string;
                                        internal_order_code: string;
                                        internal_order_name: string;
                                        type: string;
                                        responsible_user_union_id?: string;
                                        company_code?: string;
                                        co_area_code: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/internal_orders/:internal_order_uid`,
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
             * company.asset
             */
            companyAsset: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.asset&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=company.asset&version=v1 document }
                 *
                 * 获取单个公司资产
                 *
                 * 获取单个公司资产
                 */
                get: async (
                    payload?: {
                        path: { company_uid: string; asset_uid: string };
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
                                    asset?: {
                                        asset_uid?: string;
                                        asset_sub_no: string;
                                        asset_type: string;
                                        asset_type_name: string;
                                        asset_name: string;
                                        quantity?: number;
                                        unit?: string;
                                        company_uid: string;
                                        asset_type_name_en?: string;
                                        asset_no: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid/assets/:asset_uid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.asset&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=company.asset&version=v1 document }
                 *
                 * 删除公司资产
                 *
                 * 删除单个公司资产
                 */
                delete: async (
                    payload?: {
                        path: { company_uid: string; asset_uid?: string };
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
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid/assets/:asset_uid`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.asset&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=company.asset&version=v1 document }
                 *
                 * 创建公司资产
                 *
                 * 创建单个公司资产
                 */
                create: async (
                    payload?: {
                        data: {
                            asset_sub_no: string;
                            asset_type: string;
                            asset_type_name: string;
                            asset_name: string;
                            quantity?: number;
                            unit?: string;
                            asset_type_name_en?: string;
                            asset_no: string;
                        };
                        path: { company_uid: string };
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
                                    asset?: {
                                        asset_uid?: string;
                                        asset_sub_no: string;
                                        asset_type: string;
                                        asset_type_name: string;
                                        asset_name: string;
                                        quantity?: number;
                                        unit?: string;
                                        company_uid: string;
                                        asset_type_name_en?: string;
                                        asset_no: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid/assets`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.asset&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=company.asset&version=v1 document }
                 *
                 * 更新公司资产
                 *
                 * 更新公司资产部分字段，没有填写的字段不会被更新
                 */
                update: async (
                    payload?: {
                        data?: {
                            asset_name?: string;
                            quantity?: number;
                            unit?: string;
                            asset_type_name_en?: string;
                        };
                        path: { company_uid: string; asset_uid?: string };
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
                                    asset?: {
                                        asset_uid?: string;
                                        asset_sub_no: string;
                                        asset_type: string;
                                        asset_type_name: string;
                                        asset_name: string;
                                        quantity?: number;
                                        unit?: string;
                                        company_uid: string;
                                        asset_type_name_en?: string;
                                        asset_no: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid/assets/:asset_uid`,
                                path
                            ),
                            method: "PUT",
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.asset&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=company.asset&version=v1 document }
                 *
                 * 搜索公司资产
                 *
                 * 分页搜索公司资产
                 */
                search: async (
                    payload?: {
                        data?: { asset_sub_no?: string; asset_type?: string };
                        params?: {
                            query?: string;
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { company_uid: string };
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
                                        asset_uid?: string;
                                        asset_sub_no: string;
                                        asset_type: string;
                                        asset_type_name: string;
                                        asset_name: string;
                                        quantity?: number;
                                        unit?: string;
                                        company_uid: string;
                                        asset_type_name_en?: string;
                                        asset_no: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid/assets/search`,
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
             * company
             */
            company: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=company&version=v1 document }
                 *
                 * 删除公司
                 *
                 * 删除单个公司
                 */
                delete: async (
                    payload?: {
                        path?: { company_uid?: string };
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
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=company&version=v1 document }
                 *
                 * 获取单个公司
                 *
                 * 获取单个公司
                 */
                get: async (
                    payload?: {
                        path?: { company_uid?: string };
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
                                    company?: {
                                        company_code: string;
                                        company_name: string;
                                        company_uid?: string;
                                        legal_entity_code: string;
                                        co_area_code: string;
                                        currency_code: string;
                                        country_code: string;
                                        company_name_en?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=company&version=v1 document }
                 *
                 * 更新公司
                 *
                 * 更新公司部分字段，没有填写的字段不会被更新
                 */
                update: async (
                    payload?: {
                        data?: {
                            company_name?: string;
                            co_area_code?: string;
                            company_name_en?: string;
                        };
                        path: { company_uid: string };
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
                                    company?: {
                                        company_code: string;
                                        company_name: string;
                                        company_uid?: string;
                                        legal_entity_code: string;
                                        co_area_code: string;
                                        currency_code: string;
                                        country_code: string;
                                        company_name_en?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid`,
                                path
                            ),
                            method: "PUT",
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=company&version=v1 document }
                 *
                 * 创建公司
                 *
                 * 创建单个公司
                 */
                create: async (
                    payload?: {
                        data: {
                            company_code: string;
                            company_name: string;
                            legal_entity_code: string;
                            co_area_code: string;
                            currency_code: string;
                            country_code: string;
                            company_name_en?: string;
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
                                    company?: {
                                        company_code: string;
                                        company_name: string;
                                        company_uid?: string;
                                        legal_entity_code: string;
                                        co_area_code: string;
                                        currency_code: string;
                                        country_code: string;
                                        company_name_en?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=company&version=v1 document }
                 *
                 * 搜索公司
                 *
                 * 分页搜索公司
                 */
                search: async (
                    payload?: {
                        data?: {
                            legal_entity_code?: string;
                            co_area_code?: string;
                            country_code?: string;
                        };
                        params?: {
                            query?: string;
                            page_size?: number;
                            page_token?: string;
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
                                        company_code: string;
                                        company_name: string;
                                        company_uid?: string;
                                        legal_entity_code: string;
                                        co_area_code: string;
                                        currency_code: string;
                                        country_code: string;
                                        company_name_en?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/search`,
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
             * company.company_bank_account
             */
            companyCompanyBankAccount: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.company_bank_account&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=company.company_bank_account&version=v1 document }
                 *
                 * 删除公司银行账号
                 *
                 * 删除单个公司银行账号
                 */
                delete: async (
                    payload?: {
                        path: {
                            company_uid: string;
                            company_bank_account_uid?: string;
                        };
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
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid/company_bank_accounts/:company_bank_account_uid`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.company_bank_account&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=company.company_bank_account&version=v1 document }
                 *
                 * 获取单个公司银行账号
                 *
                 * 获取单个公司银行账号
                 */
                get: async (
                    payload?: {
                        path: {
                            company_uid: string;
                            company_bank_account_uid: string;
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
                                    company_bank_account?: {
                                        company_bank_account_uid?: string;
                                        company_uid: string;
                                        account: string;
                                        iban?: string;
                                        account_name: string;
                                        currency_code: string;
                                        local_routing_code?: string;
                                        gl_account_code?: string;
                                        clearing_account_code?: string;
                                        swift?: string;
                                        account_attri_desc?: string;
                                        i18n_account_attri_desc?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid/company_bank_accounts/:company_bank_account_uid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.company_bank_account&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=company.company_bank_account&version=v1 document }
                 *
                 * 搜索公司银行账号
                 *
                 * 分页搜索公司银行账号
                 */
                search: async (
                    payload?: {
                        data?: {
                            iban?: string;
                            local_routing_code?: string;
                            swift?: string;
                        };
                        params?: {
                            query?: string;
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { company_uid: string };
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
                                        company_bank_account_uid?: string;
                                        company_uid: string;
                                        account: string;
                                        iban?: string;
                                        account_name: string;
                                        currency_code: string;
                                        local_routing_code?: string;
                                        gl_account_code?: string;
                                        clearing_account_code?: string;
                                        swift?: string;
                                        account_attri_desc?: string;
                                        i18n_account_attri_desc?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid/company_bank_accounts/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.company_bank_account&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=company.company_bank_account&version=v1 document }
                 *
                 * 更新公司银行账号
                 *
                 * 更新公司银行账号部分字段，没有填写的字段不会被更新
                 */
                update: async (
                    payload?: {
                        data?: {
                            iban?: string;
                            account_name?: string;
                            local_routing_code?: string;
                            gl_account_code?: string;
                            clearing_account_code?: string;
                            swift?: string;
                            account_attri_desc?: string;
                            i18n_account_attri_desc?: Array<{
                                lang_locale: "zh_CN" | "en_US" | "ja_JP";
                                value: string;
                                valid_to: string;
                            }>;
                        };
                        path: {
                            company_uid: string;
                            company_bank_account_uid?: string;
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
                                    company_bank_account?: {
                                        company_bank_account_uid?: string;
                                        company_uid: string;
                                        account: string;
                                        iban?: string;
                                        account_name: string;
                                        currency_code: string;
                                        local_routing_code?: string;
                                        gl_account_code?: string;
                                        clearing_account_code?: string;
                                        swift?: string;
                                        account_attri_desc?: string;
                                        i18n_account_attri_desc?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid/company_bank_accounts/:company_bank_account_uid`,
                                path
                            ),
                            method: "PUT",
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=company.company_bank_account&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=company.company_bank_account&version=v1 document }
                 *
                 * 创建公司银行账号
                 *
                 * 创建单个公司银行账号
                 */
                create: async (
                    payload?: {
                        data: {
                            account: string;
                            iban?: string;
                            account_name: string;
                            currency_code: string;
                            local_routing_code?: string;
                            gl_account_code?: string;
                            clearing_account_code?: string;
                            swift?: string;
                            account_attri_desc?: string;
                            i18n_account_attri_desc?: Array<{
                                lang_locale: "zh_CN" | "en_US" | "ja_JP";
                                value: string;
                                valid_to: string;
                            }>;
                        };
                        path: { company_uid: string };
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
                                    company_bank_account?: {
                                        company_bank_account_uid?: string;
                                        company_uid: string;
                                        account: string;
                                        iban?: string;
                                        account_name: string;
                                        currency_code: string;
                                        local_routing_code?: string;
                                        gl_account_code?: string;
                                        clearing_account_code?: string;
                                        swift?: string;
                                        account_attri_desc?: string;
                                        i18n_account_attri_desc?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/companies/:company_uid/company_bank_accounts`,
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
             * gl_account_company_relationship
             */
            glAccountCompanyRelationship: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account_company_relationship&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=gl_account_company_relationship&version=v1 document }
                 *
                 * 删除会计科目与公司关系
                 *
                 * 删除单个会计科目与公司关系
                 */
                delete: async (
                    payload?: {
                        path?: { gl_account_company_relationship_uid?: string };
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
                                `${this.domain}/open-apis/mdm/v1/gl_account_company_relationships/:gl_account_company_relationship_uid`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account_company_relationship&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=gl_account_company_relationship&version=v1 document }
                 *
                 * 获取单个会计科目与公司关系
                 *
                 * 获取单个会计科目与公司关系
                 */
                get: async (
                    payload?: {
                        path?: { gl_account_company_relationship_uid?: string };
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
                                    gl_account_company_relationship?: {
                                        gl_account_code: string;
                                        company_code: string;
                                        gl_account_company_relationship_uid?: string;
                                        valid_to: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/gl_account_company_relationships/:gl_account_company_relationship_uid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account_company_relationship&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=gl_account_company_relationship&version=v1 document }
                 *
                 * 搜索会计科目与公司关系
                 *
                 * 分页搜索会计科目与公司关系
                 */
                search: async (
                    payload?: {
                        data?: {
                            gl_account_code?: string;
                            company_code?: string;
                            valid_to?: string;
                        };
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
                                        gl_account_code: string;
                                        company_code: string;
                                        gl_account_company_relationship_uid?: string;
                                        valid_to: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/gl_account_company_relationships/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account_company_relationship&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=gl_account_company_relationship&version=v1 document }
                 *
                 * 更新会计科目与公司关系
                 *
                 * 更新会计科目与公司关系部分字段，没有填写的字段不会被更新
                 */
                update: async (
                    payload?: {
                        data?: { valid_to?: string };
                        path?: { gl_account_company_relationship_uid?: string };
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
                                    gl_account_company_relationship?: {
                                        gl_account_code: string;
                                        company_code: string;
                                        gl_account_company_relationship_uid?: string;
                                        valid_to: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/gl_account_company_relationships/:gl_account_company_relationship_uid`,
                                path
                            ),
                            method: "PUT",
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account_company_relationship&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=gl_account_company_relationship&version=v1 document }
                 *
                 * 创建会计科目与公司关系
                 *
                 * 创建单个会计科目与公司关系
                 */
                create: async (
                    payload?: {
                        data: {
                            gl_account_code: string;
                            company_code: string;
                            valid_to: string;
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
                                    gl_account_company_relationship: {
                                        gl_account_code: string;
                                        company_code: string;
                                        gl_account_company_relationship_uid?: string;
                                        valid_to: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/gl_account_company_relationships`,
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
             * cost_center
             */
            costCenter: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=cost_center&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=cost_center&version=v1 document }
                 *
                 * 搜索成本中心
                 *
                 * 分页搜索成本中心
                 */
                search: async (
                    payload?: {
                        data?: {
                            responsible_user_union_id?: string;
                            company_code?: string;
                            profit_center_code?: string;
                            business_area?: string;
                            fee_type?: string;
                            valid_to?: string;
                            company_code_list?: Array<string>;
                        };
                        params?: {
                            query?: string;
                            page_size?: number;
                            page_token?: string;
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
                                        cost_center_uid?: string;
                                        cost_center_code: string;
                                        i18n_cost_center_name?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                        responsible_user_union_id?: string;
                                        co_area_code: string;
                                        company_code?: string;
                                        profit_center_code?: string;
                                        business_area?: string;
                                        fee_type: string;
                                        valid_to: string;
                                        cost_center_name: string;
                                        company_code_list?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/cost_centers/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=cost_center&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=cost_center&version=v1 document }
                 *
                 * 更新成本中心
                 *
                 * 更新成本中心部分字段，没有填写的字段不会被更新
                 */
                update: async (
                    payload?: {
                        data?: {
                            i18n_cost_center_name?: Array<{
                                lang_locale: "zh_CN" | "en_US" | "ja_JP";
                                value: string;
                                valid_to: string;
                            }>;
                            responsible_user_union_id?: string;
                            company_code?: string;
                            business_area?: string;
                            fee_type?: string;
                            valid_to?: string;
                            cost_center_name?: string;
                            company_code_list?: Array<string>;
                        };
                        path?: { cost_center_uid?: string };
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
                                    cost_center?: {
                                        cost_center_uid?: string;
                                        cost_center_code: string;
                                        i18n_cost_center_name?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                        responsible_user_union_id?: string;
                                        co_area_code: string;
                                        company_code?: string;
                                        profit_center_code?: string;
                                        business_area?: string;
                                        fee_type: string;
                                        valid_to: string;
                                        cost_center_name: string;
                                        company_code_list?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/cost_centers/:cost_center_uid`,
                                path
                            ),
                            method: "PUT",
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=cost_center&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=cost_center&version=v1 document }
                 *
                 * 获取单个成本中心
                 *
                 * 获取单个成本中心
                 */
                get: async (
                    payload?: {
                        path?: { cost_center_uid?: string };
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
                                    cost_center?: {
                                        cost_center_uid?: string;
                                        cost_center_code: string;
                                        i18n_cost_center_name?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                        responsible_user_union_id?: string;
                                        co_area_code: string;
                                        company_code?: string;
                                        profit_center_code?: string;
                                        business_area?: string;
                                        fee_type: string;
                                        valid_to: string;
                                        cost_center_name: string;
                                        company_code_list?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/cost_centers/:cost_center_uid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=cost_center&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=cost_center&version=v1 document }
                 *
                 * 删除成本中心
                 *
                 * 删除单个成本中心
                 */
                delete: async (
                    payload?: {
                        path?: { cost_center_uid?: string };
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
                                `${this.domain}/open-apis/mdm/v1/cost_centers/:cost_center_uid`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=cost_center&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=cost_center&version=v1 document }
                 *
                 * 新建成本中心
                 *
                 * 新建单个成本中心
                 */
                create: async (
                    payload?: {
                        data: {
                            cost_center_code: string;
                            i18n_cost_center_name?: Array<{
                                lang_locale: "zh_CN" | "en_US" | "ja_JP";
                                value: string;
                                valid_to: string;
                            }>;
                            responsible_user_union_id?: string;
                            co_area_code: string;
                            company_code?: string;
                            profit_center_code?: string;
                            business_area?: string;
                            fee_type: string;
                            valid_to: string;
                            cost_center_name: string;
                            company_code_list?: Array<string>;
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
                                    cost_center: {
                                        cost_center_uid?: string;
                                        cost_center_code: string;
                                        i18n_cost_center_name?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                        responsible_user_union_id?: string;
                                        co_area_code: string;
                                        company_code?: string;
                                        profit_center_code?: string;
                                        business_area?: string;
                                        fee_type: string;
                                        valid_to: string;
                                        cost_center_name: string;
                                        company_code_list?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/cost_centers`,
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
             * gl_account
             */
            glAccount: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=gl_account&version=v1 document }
                 *
                 * 搜索会计科目
                 *
                 * 分页搜索会计科目
                 */
                search: async (
                    payload?: {
                        data: { type: string };
                        params?: {
                            query?: string;
                            page_size?: number;
                            page_token?: string;
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
                                        gl_account_uid?: string;
                                        gl_account: string;
                                        gl_account_name: string;
                                        i18n_gl_account_name?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                        type: string;
                                        valid_to: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/gl_accounts/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=gl_account&version=v1 document }
                 *
                 * 删除会计科目
                 *
                 * 删除单个会计科目
                 */
                delete: async (
                    payload?: {
                        path?: { gl_account_uid?: string };
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
                                `${this.domain}/open-apis/mdm/v1/gl_accounts/:gl_account_uid`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=gl_account&version=v1 document }
                 *
                 * 获取单个会计科目
                 *
                 * 获取单个会计科目
                 */
                get: async (
                    payload?: {
                        path?: { gl_account_uid?: string };
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
                                    gl_account?: {
                                        gl_account_uid?: string;
                                        gl_account: string;
                                        gl_account_name: string;
                                        i18n_gl_account_name?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                        type: string;
                                        valid_to: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/gl_accounts/:gl_account_uid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=gl_account&version=v1 document }
                 *
                 * 更新会计科目
                 *
                 * 更新会计科目部分字段，没有填写的字段不会被更新
                 */
                update: async (
                    payload?: {
                        data?: {
                            gl_account_name?: string;
                            i18n_gl_account_name?: Array<{
                                lang_locale: "zh_CN" | "en_US" | "ja_JP";
                                value: string;
                                valid_to: string;
                            }>;
                            type?: string;
                            valid_to?: string;
                        };
                        path?: { gl_account_uid?: string };
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
                                    gl_account?: {
                                        gl_account_uid?: string;
                                        gl_account: string;
                                        gl_account_name: string;
                                        i18n_gl_account_name?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                        type: string;
                                        valid_to: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/gl_accounts/:gl_account_uid`,
                                path
                            ),
                            method: "PUT",
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=gl_account&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=gl_account&version=v1 document }
                 *
                 * 创建会计科目
                 *
                 * 创建单个会计科目
                 */
                create: async (
                    payload?: {
                        data: {
                            gl_account: string;
                            gl_account_name: string;
                            i18n_gl_account_name?: Array<{
                                lang_locale: "zh_CN" | "en_US" | "ja_JP";
                                value: string;
                                valid_to: string;
                            }>;
                            type: string;
                            valid_to: string;
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
                                    gl_account?: {
                                        gl_account_uid?: string;
                                        gl_account: string;
                                        gl_account_name: string;
                                        i18n_gl_account_name?: Array<{
                                            lang_locale:
                                                | "zh_CN"
                                                | "en_US"
                                                | "ja_JP";
                                            value: string;
                                            valid_to: string;
                                        }>;
                                        type: string;
                                        valid_to: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/gl_accounts`,
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
             * project
             */
            project: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=project&version=v1 document }
                 *
                 * 创建项目
                 *
                 * 创建一个项目
                 */
                create: async (
                    payload?: {
                        data: {
                            project_uid?: string;
                            code?: string;
                            name?: string;
                            type?: string;
                            responsible_user_union_id?: string;
                            start_day?: string;
                            end_day?: string;
                            parent_code?: string;
                            level?: number;
                            level_info?: string;
                            status: number;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            is_all_company: boolean;
                            project_company_dept_mappings?: Array<{
                                project_union_id?: string;
                                company_union_id: string;
                                is_all_department: boolean;
                                department_union_id: string;
                            }>;
                            multi_language_name: Array<{
                                language: "zh" | "en" | "ja";
                                value: string;
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
                                    project?: {
                                        project_uid?: string;
                                        code?: string;
                                        name?: string;
                                        type?: string;
                                        responsible_user_union_id?: string;
                                        start_day?: string;
                                        end_day?: string;
                                        parent_code?: string;
                                        level?: number;
                                        level_info?: string;
                                        status: number;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        is_all_company: boolean;
                                        project_company_dept_mappings?: Array<{
                                            project_union_id?: string;
                                            company_union_id: string;
                                            is_all_department: boolean;
                                            department_union_id: string;
                                        }>;
                                        multi_language_name: Array<{
                                            language: "zh" | "en" | "ja";
                                            value: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/projects`,
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
                searchWithIterator: async (
                    payload?: {
                        data: {
                            project_uid?: string;
                            code?: string;
                            name?: string;
                            type?: string;
                            responsible_user_union_id?: string;
                            start_day?: string;
                            end_day?: string;
                            parent_code?: string;
                            level?: number;
                            level_info?: string;
                            status: number;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            is_all_company: boolean;
                            project_company_dept_mappings?: Array<{
                                project_union_id?: string;
                                company_union_id: string;
                                is_all_department: boolean;
                                department_union_id: string;
                            }>;
                            multi_language_name: Array<{
                                language: "zh" | "en" | "ja";
                                value: string;
                            }>;
                        };
                        params?: {
                            query?: string;
                            page_size?: number;
                            page_token?: number;
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
                                    `${this.domain}/open-apis/mdm/v1/projects/search`,
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
                                                    items?: Array<{
                                                        project_uid?: string;
                                                        code?: string;
                                                        name?: string;
                                                        type?: string;
                                                        responsible_user_union_id?: string;
                                                        start_day?: string;
                                                        end_day?: string;
                                                        parent_code?: string;
                                                        level?: number;
                                                        level_info?: string;
                                                        status: number;
                                                        extend_info?: Array<{
                                                            field_type: number;
                                                            field_value?: string;
                                                            options?: Array<string>;
                                                            num?: number;
                                                            date?: string;
                                                            range_date?: Array<string>;
                                                            field_code: string;
                                                            appendix?: Array<{
                                                                file_id?: string;
                                                                file_name?: string;
                                                                file_type?:
                                                                    | "DOC"
                                                                    | "DOCX"
                                                                    | "XLS"
                                                                    | "XLSX"
                                                                    | "PNG"
                                                                    | "JPG"
                                                                    | "JPEG"
                                                                    | "PDF"
                                                                    | "ZIP"
                                                                    | "RAR";
                                                                file_size?: number;
                                                                download_url?: string;
                                                            }>;
                                                        }>;
                                                        is_all_company: boolean;
                                                        project_company_dept_mappings?: Array<{
                                                            project_union_id?: string;
                                                            company_union_id: string;
                                                            is_all_department: boolean;
                                                            department_union_id: string;
                                                        }>;
                                                        multi_language_name: Array<{
                                                            language:
                                                                | "zh"
                                                                | "en"
                                                                | "ja";
                                                            value: string;
                                                        }>;
                                                    }>;
                                                    page_token?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=project&version=v1 document }
                 *
                 * 搜索项目
                 *
                 * query 字段不填：可以查询全量项目数据; query 字段填写：可以根据code / name 来搜索数据
                 */
                search: async (
                    payload?: {
                        data: {
                            project_uid?: string;
                            code?: string;
                            name?: string;
                            type?: string;
                            responsible_user_union_id?: string;
                            start_day?: string;
                            end_day?: string;
                            parent_code?: string;
                            level?: number;
                            level_info?: string;
                            status: number;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            is_all_company: boolean;
                            project_company_dept_mappings?: Array<{
                                project_union_id?: string;
                                company_union_id: string;
                                is_all_department: boolean;
                                department_union_id: string;
                            }>;
                            multi_language_name: Array<{
                                language: "zh" | "en" | "ja";
                                value: string;
                            }>;
                        };
                        params?: {
                            query?: string;
                            page_size?: number;
                            page_token?: number;
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
                                        project_uid?: string;
                                        code?: string;
                                        name?: string;
                                        type?: string;
                                        responsible_user_union_id?: string;
                                        start_day?: string;
                                        end_day?: string;
                                        parent_code?: string;
                                        level?: number;
                                        level_info?: string;
                                        status: number;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        is_all_company: boolean;
                                        project_company_dept_mappings?: Array<{
                                            project_union_id?: string;
                                            company_union_id: string;
                                            is_all_department: boolean;
                                            department_union_id: string;
                                        }>;
                                        multi_language_name: Array<{
                                            language: "zh" | "en" | "ja";
                                            value: string;
                                        }>;
                                    }>;
                                    page_token?: number;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/projects/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=project&version=v1 document }
                 *
                 * 获取单个项目
                 *
                 * 根据project_uid 获取对应的项目数据
                 */
                get: async (
                    payload?: {
                        path: { project_uid: string };
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
                                    project?: {
                                        project_uid?: string;
                                        code?: string;
                                        name?: string;
                                        type?: string;
                                        responsible_user_union_id?: string;
                                        start_day?: string;
                                        end_day?: string;
                                        parent_code?: string;
                                        level?: number;
                                        level_info?: string;
                                        status: number;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        is_all_company: boolean;
                                        project_company_dept_mappings?: Array<{
                                            project_union_id?: string;
                                            company_union_id: string;
                                            is_all_department: boolean;
                                            department_union_id: string;
                                        }>;
                                        multi_language_name: Array<{
                                            language: "zh" | "en" | "ja";
                                            value: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/projects/:project_uid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=project&version=v1 document }
                 *
                 * 删除项目
                 *
                 * 根据project_uid 删除项目
                 */
                delete: async (
                    payload?: {
                        path: { project_uid: string };
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
                                `${this.domain}/open-apis/mdm/v1/projects/:project_uid`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=project&version=v1 document }
                 *
                 * 更新项目
                 *
                 * 根据project_uid更新项目
                 */
                update: async (
                    payload?: {
                        data: {
                            code?: string;
                            name?: string;
                            type?: string;
                            responsible_user_union_id?: string;
                            start_day?: string;
                            end_day?: string;
                            parent_code?: string;
                            level?: number;
                            level_info?: string;
                            status: number;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            is_all_company: boolean;
                            project_company_dept_mappings?: Array<{
                                project_union_id?: string;
                                company_union_id: string;
                                is_all_department: boolean;
                                department_union_id: string;
                            }>;
                            multi_language_name: Array<{
                                language: "zh" | "en" | "ja";
                                value: string;
                            }>;
                        };
                        path: { project_uid: string };
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
                                    project?: {
                                        project_uid?: string;
                                        code?: string;
                                        name?: string;
                                        type?: string;
                                        responsible_user_union_id?: string;
                                        start_day?: string;
                                        end_day?: string;
                                        parent_code?: string;
                                        level?: number;
                                        level_info?: string;
                                        status: number;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        is_all_company: boolean;
                                        project_company_dept_mappings?: Array<{
                                            project_union_id?: string;
                                            company_union_id: string;
                                            is_all_department: boolean;
                                            department_union_id: string;
                                        }>;
                                        multi_language_name: Array<{
                                            language: "zh" | "en" | "ja";
                                            value: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/projects/:project_uid`,
                                path
                            ),
                            method: "PUT",
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
             * user_auth_data_relation
             */
            userAuthDataRelation: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=user_auth_data_relation&apiName=unbind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind&project=mdm&resource=user_auth_data_relation&version=v1 document }
                 *
                 * 用户数据维度解绑
                 *
                 * 通过该接口，可为指定应用下的指定用户解除一类数据维度。
                 */
                unbind: async (
                    payload?: {
                        data: {
                            root_dimension_type: string;
                            sub_dimension_types: Array<string>;
                            authorized_user_ids: Array<string>;
                            uams_app_id: string;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/user_auth_data_relations/unbind`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=user_auth_data_relation&apiName=bind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=bind&project=mdm&resource=user_auth_data_relation&version=v1 document }
                 *
                 * 用户数据维度绑定
                 *
                 * 通过该接口，可为指定应用下的用户绑定一类数据维度，支持批量给多个用户同时增量授权。
                 */
                bind: async (
                    payload?: {
                        data: {
                            root_dimension_type: string;
                            sub_dimension_types: Array<string>;
                            authorized_user_ids: Array<string>;
                            uams_app_id: string;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/user_auth_data_relations/bind`,
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
             * fixed_exchange_rate
             */
            fixedExchangeRate: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=fixed_exchange_rate&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=fixed_exchange_rate&version=v1 document }
                 *
                 * 查询固定汇率
                 *
                 * 根据原始币种、目标币种、查询日期获取固定汇率
                 */
                get: async (
                    payload?: {
                        params: {
                            source_currency: string;
                            target_currency: string;
                            date: string;
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
                                    fixed_exchange_rate?: {
                                        source_currency?: string;
                                        target_currency?: string;
                                        effective_date?: string;
                                        exchange_rate?: string;
                                        status?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v1/fixed_exchange_rate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=fixed_exchange_rate&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=fixed_exchange_rate&version=v1 document }
                 *
                 * 更新固定汇率
                 *
                 * 以原始币种、目标币种、生效日期的组合作为唯一键设定固定汇率，如果指定条件下无汇率值，则新增一条汇率值，否则为更新当前条件下汇率值。
                 */
                update: async (
                    payload?: {
                        data?: {
                            source_currency?: string;
                            target_currency?: string;
                            effective_date?: string;
                            exchange_rate?: string;
                            status?: number;
                        };
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
                                `${this.domain}/open-apis/mdm/v1/fixed_exchange_rate`,
                                path
                            ),
                            method: "PUT",
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
        v2: {
            /**
             * project
             */
            project: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=project&version=v2 document }
                 *
                 * 获取单个项目
                 *
                 * 根据union_id 获取对应的项目数据
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { union_id: string };
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
                                    project?: {
                                        union_id?: string;
                                        code?: string;
                                        name?: string;
                                        type?: string;
                                        responsible_user_id?: string;
                                        start_day?: string;
                                        end_day?: string;
                                        parent_code?: string;
                                        level?: number;
                                        level_info?: string;
                                        status: number;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        is_all_company: boolean;
                                        project_company_dept_mappings?: Array<{
                                            project_union_id?: string;
                                            company_union_id: string;
                                            is_all_department: boolean;
                                            department_union_id?: string;
                                        }>;
                                        multi_language_name: Array<{
                                            language: "zh" | "en" | "ja";
                                            value: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v2/projects/:union_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mdm&resource=project&version=v2 document }
                 *
                 * 删除项目
                 *
                 * 根据union_id 删除项目
                 */
                delete: async (
                    payload?: {
                        path: { union_id: string };
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
                                `${this.domain}/open-apis/mdm/v2/projects/:union_id`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=mdm&resource=project&version=v2 document }
                 *
                 * 搜索项目
                 *
                 * keyword 字段不填：可以查询全量项目数据;keyword 字段填写：可以根据code / name 来搜索数据
                 */
                search: async (
                    payload?: {
                        params?: {
                            keyword?: string;
                            page_size?: number;
                            page_token?: string;
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
                                    items?: Array<{
                                        union_id?: string;
                                        code?: string;
                                        name?: string;
                                        type?: string;
                                        responsible_user_id?: string;
                                        start_day?: string;
                                        end_day?: string;
                                        parent_code?: string;
                                        level?: number;
                                        level_info?: string;
                                        status: number;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        is_all_company: boolean;
                                        project_company_dept_mappings?: Array<{
                                            project_union_id?: string;
                                            company_union_id: string;
                                            is_all_department: boolean;
                                            department_union_id?: string;
                                        }>;
                                        multi_language_name: Array<{
                                            language: "zh" | "en" | "ja";
                                            value: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v2/projects/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mdm&resource=project&version=v2 document }
                 *
                 * 创建项目
                 *
                 * 创建一个项目
                 */
                create: async (
                    payload?: {
                        data: {
                            union_id?: string;
                            code?: string;
                            name?: string;
                            type?: string;
                            responsible_user_id?: string;
                            start_day?: string;
                            end_day?: string;
                            parent_code?: string;
                            level?: number;
                            level_info?: string;
                            status: number;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            is_all_company: boolean;
                            project_company_dept_mappings?: Array<{
                                project_union_id?: string;
                                company_union_id: string;
                                is_all_department: boolean;
                                department_union_id?: string;
                            }>;
                            multi_language_name: Array<{
                                language: "zh" | "en" | "ja";
                                value: string;
                            }>;
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
                                    project?: {
                                        union_id?: string;
                                        code?: string;
                                        name?: string;
                                        type?: string;
                                        responsible_user_id?: string;
                                        start_day?: string;
                                        end_day?: string;
                                        parent_code?: string;
                                        level?: number;
                                        level_info?: string;
                                        status: number;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        is_all_company: boolean;
                                        project_company_dept_mappings?: Array<{
                                            project_union_id?: string;
                                            company_union_id: string;
                                            is_all_department: boolean;
                                            department_union_id?: string;
                                        }>;
                                        multi_language_name: Array<{
                                            language: "zh" | "en" | "ja";
                                            value: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v2/projects`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=project&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mdm&resource=project&version=v2 document }
                 *
                 * 更新项目
                 *
                 * 根据union_id更新项目
                 */
                update: async (
                    payload?: {
                        data: {
                            code?: string;
                            name?: string;
                            type?: string;
                            responsible_user_id?: string;
                            start_day?: string;
                            end_day?: string;
                            parent_code?: string;
                            level?: number;
                            level_info?: string;
                            status: number;
                            extend_info?: Array<{
                                field_type: number;
                                field_value?: string;
                                options?: Array<string>;
                                num?: number;
                                date?: string;
                                range_date?: Array<string>;
                                field_code: string;
                                appendix?: Array<{
                                    file_id?: string;
                                    file_name?: string;
                                    file_type?:
                                        | "DOC"
                                        | "DOCX"
                                        | "XLS"
                                        | "XLSX"
                                        | "PNG"
                                        | "JPG"
                                        | "JPEG"
                                        | "PDF"
                                        | "ZIP"
                                        | "RAR";
                                    file_size?: number;
                                    download_url?: string;
                                }>;
                            }>;
                            is_all_company: boolean;
                            project_company_dept_mappings?: Array<{
                                project_union_id?: string;
                                company_union_id: string;
                                is_all_department: boolean;
                                department_union_id?: string;
                            }>;
                            multi_language_name: Array<{
                                language: "zh" | "en" | "ja";
                                value: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { union_id: string };
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
                                    project?: {
                                        union_id?: string;
                                        code?: string;
                                        name?: string;
                                        type?: string;
                                        responsible_user_id?: string;
                                        start_day?: string;
                                        end_day?: string;
                                        parent_code?: string;
                                        level?: number;
                                        level_info?: string;
                                        status: number;
                                        extend_info?: Array<{
                                            field_type: number;
                                            field_value?: string;
                                            options?: Array<string>;
                                            num?: number;
                                            date?: string;
                                            range_date?: Array<string>;
                                            field_code: string;
                                            appendix?: Array<{
                                                file_id?: string;
                                                file_name?: string;
                                                file_type?:
                                                    | "DOC"
                                                    | "DOCX"
                                                    | "XLS"
                                                    | "XLSX"
                                                    | "PNG"
                                                    | "JPG"
                                                    | "JPEG"
                                                    | "PDF"
                                                    | "ZIP"
                                                    | "RAR";
                                                file_size?: number;
                                                download_url?: string;
                                            }>;
                                        }>;
                                        is_all_company: boolean;
                                        project_company_dept_mappings?: Array<{
                                            project_union_id?: string;
                                            company_union_id: string;
                                            is_all_department: boolean;
                                            department_union_id?: string;
                                        }>;
                                        multi_language_name: Array<{
                                            language: "zh" | "en" | "ja";
                                            value: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v2/projects/:union_id`,
                                path
                            ),
                            method: "PUT",
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
        v3: {
            /**
             * batch_major
             */
            batchMajor: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=batch_major&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=batch_major&version=v3 document }
                 *
                 * 根据id批量查询专业
                 *
                 * 根据id批量查询专业数据
                 */
                get: async (
                    payload?: {
                        data?: { common?: { tenant_id?: string } };
                        params: {
                            languages: Array<string>;
                            fields: Array<string>;
                            ids: Array<string>;
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
                                    data: Array<{
                                        mdm_code?: string;
                                        name?: {
                                            value?: string;
                                            multilingual_value?: Record<
                                                string,
                                                string
                                            >;
                                            return_language?: string;
                                        };
                                        superior_major?: string;
                                        degree?: string;
                                        level?: string;
                                        status?: string;
                                        remark?: string;
                                        order_code?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v3/batch_major`,
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
             * country_region
             */
            countryRegion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=country_region&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mdm&resource=country_region&version=v3 document }
                 *
                 * 分页批量查询国家/地区
                 *
                 * 分页批量查询国家/地区。资源介绍请参考[概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v3/country_region/resource-definition)。
                 */
                list: async (
                    payload?: {
                        data?: {
                            filter?: {
                                logic: "0" | "1";
                                expressions?: Array<{
                                    field: string;
                                    operator:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "7"
                                        | "8"
                                        | "9"
                                        | "10"
                                        | "11"
                                        | "12";
                                    value: {
                                        string_value?: string;
                                        bool_value?: boolean;
                                        int_value?: string;
                                        string_list_value?: Array<string>;
                                        int_list_value?: Array<string>;
                                    };
                                }>;
                            };
                            common?: { tenant_id?: string };
                        };
                        params: {
                            languages: Array<string>;
                            fields: Array<string>;
                            limit?: number;
                            offset?: number;
                            return_count?: boolean;
                            page_token?: string;
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
                                    data?: Array<{
                                        alpha_3_code?: string;
                                        alpha_2_code?: string;
                                        numeric_code?: string;
                                        name?: {
                                            value?: string;
                                            multilingual_value?: Record<
                                                string,
                                                string
                                            >;
                                            return_language?: string;
                                        };
                                        mdm_code?: string;
                                        full_name?: {
                                            value?: string;
                                            multilingual_value?: Record<
                                                string,
                                                string
                                            >;
                                            return_language?: string;
                                        };
                                        global_code?: string;
                                        status?: string;
                                        continents?: {
                                            value: string;
                                            multilingual_name?: Record<
                                                string,
                                                string
                                            >;
                                        };
                                    }>;
                                    total?: string;
                                    next_page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v3/country_regions`,
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
             * batch_country_region
             */
            batchCountryRegion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=batch_country_region&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mdm&resource=batch_country_region&version=v3 document }
                 *
                 * 通过mdmcode批量查询国家/地区信息
                 *
                 * 通过mdmcode批量查询国家/地区信息。资源介绍请参考[概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v3/country_region/resource-definition)。
                 */
                get: async (
                    payload?: {
                        data?: { common?: { tenant_id?: string } };
                        params: {
                            fields: Array<string>;
                            ids: Array<string>;
                            languages: Array<string>;
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
                                    data?: Array<{
                                        alpha_3_code?: string;
                                        alpha_2_code?: string;
                                        numeric_code?: string;
                                        name?: {
                                            value?: string;
                                            multilingual_value?: Record<
                                                string,
                                                string
                                            >;
                                            return_language?: string;
                                        };
                                        mdm_code?: string;
                                        full_name?: {
                                            value?: string;
                                            multilingual_value?: Record<
                                                string,
                                                string
                                            >;
                                            return_language?: string;
                                        };
                                        global_code?: string;
                                        status?: string;
                                        continents?: {
                                            value: string;
                                            multilingual_name?: Record<
                                                string,
                                                string
                                            >;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v3/batch_country_region`,
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
             * major
             */
            major: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mdm&resource=major&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mdm&resource=major&version=v3 document }
                 *
                 * 分页批量查询专业
                 *
                 * 分页批量查询专业
                 */
                list: async (
                    payload?: {
                        data?: { common?: { tenant_id?: string } };
                        params: {
                            languages: Array<string>;
                            fields: Array<string>;
                            limit: number;
                            offset: number;
                            return_count?: boolean;
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
                                    data: Array<{
                                        mdm_code?: string;
                                        name?: {
                                            value?: string;
                                            multilingual_value?: Record<
                                                string,
                                                string
                                            >;
                                            return_language?: string;
                                        };
                                        superior_major?: string;
                                        degree?: string;
                                        level?: string;
                                        status?: string;
                                        remark?: string;
                                        order_code?: string;
                                    }>;
                                    total?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mdm/v3/majors`,
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
