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
import docs from "./docs";

// auto gen
export default abstract class Client extends docs {
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
    document_ai = {
        v1: {
            /**
             * business_card
             */
            businessCard: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=business_card&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=business_card&version=v1 document }
                 *
                 * 识别文件中的名片
                 *
                 * 名片识别接口，通过上传 JPG / PNG / PDF 等文件类型进行一次性的名片识别。接口适用于20MB以下的文件，适用于英文、日语的名片。
                 *
                 * 单租户限流：10QPS，同租户下的应用没有限流，共享本租户的 10QPS 限流
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    business_cards?: Array<{
                                        entities?: Array<{
                                            type?:
                                                | "contact_names"
                                                | "company_names"
                                                | "departments"
                                                | "job_titles"
                                                | "emails"
                                                | "websites"
                                                | "addresses"
                                                | "mobile_phones"
                                                | "work_phones"
                                                | "other_phones"
                                                | "faxes";
                                            value?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/business_card/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * contract
             */
            contract: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=contract&apiName=field_extraction&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=field_extraction&project=document_ai&resource=contract&version=v1 document }
                 *
                 * 提取文件中的合同字段
                 *
                 * 支持从doc、docx和pdf文件类型中提取合同字段。;文件大小需要小于10M。
                 *
                 * 单租户限流：10QPS，同租户下的应用没有限流，共享本租户的 10QPS 限流
                 */
                fieldExtraction: async (
                    payload?: {
                        data: {
                            file: Buffer | fs.ReadStream;
                            pdf_page_limit: number;
                            ocr_mode: "force" | "auto" | "unused";
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    file_id?: string;
                                    price?: {
                                        contract_price?: number;
                                        contract_price_original?: string;
                                        text?: string;
                                    };
                                    time?: {
                                        time_start?: string;
                                        time_end?: string;
                                        original_time_start?: string;
                                        original_time_end?: string;
                                        text_start?: string;
                                        text_end?: string;
                                        initial_term?: {
                                            initial_time?: string;
                                            initial_unit?: string;
                                        };
                                        text_initial_term?: string;
                                    };
                                    copy?: {
                                        copy_num?: number;
                                        original_copy?: string;
                                        key?: string;
                                        text?: string;
                                    };
                                    currency?: {
                                        currency_name?: string;
                                        currency_text?: string;
                                    };
                                    header?: string;
                                    body_info?: Array<{
                                        body_type?: "buy" | "sell" | "third";
                                        value?: {
                                            address?: string;
                                            contacts?: string;
                                            email?: string;
                                            phone?: string;
                                            id_number?: string;
                                            legal_representative?: string;
                                            party?: string;
                                        };
                                    }>;
                                    bank_info?: Array<{
                                        bank_type?:
                                            | "buy_bank"
                                            | "sell_bank"
                                            | "third_bank"
                                            | "unceratin_bank";
                                        value?: {
                                            account_name?: string;
                                            bank_name?: string;
                                            account_number?: string;
                                            phone?: string;
                                            contacts?: string;
                                            tax_number?: string;
                                            address?: string;
                                            id_number?: string;
                                            email?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/contract/field_extraction`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * business_license
             */
            businessLicense: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=business_license&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=business_license&version=v1 document }
                 *
                 * 识别文件中的营业执照
                 *
                 * 营业执照识别接口，支持JPG/JPEG/PNG/BMP/PDF五种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    business_license?: {
                                        entities?: Array<{
                                            type?:
                                                | "certificate_type"
                                                | "unified_social_credit_code"
                                                | "company_name"
                                                | "company_type"
                                                | "domicile"
                                                | "legal_representative"
                                                | "registered_capital"
                                                | "established_time"
                                                | "established_date"
                                                | "business_scope"
                                                | "website"
                                                | "approval_date";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/business_license/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * driving_license
             */
            drivingLicense: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=driving_license&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=driving_license&version=v1 document }
                 *
                 * 识别文件中的驾驶证
                 *
                 * 驾驶证识别接口，支持JPG/JPEG/PNG/BMP四种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    driving_license?: {
                                        entities?: Array<{
                                            type?:
                                                | "id_number"
                                                | "name"
                                                | "sex"
                                                | "nationality"
                                                | "address"
                                                | "date_of_birth"
                                                | "date_of_first_issue"
                                                | "class"
                                                | "valid_begin"
                                                | "valid_end"
                                                | "license_issuing_authority"
                                                | "document_id"
                                                | "record"
                                                | "id_photo_location";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/driving_license/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * vehicle_license
             */
            vehicleLicense: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=vehicle_license&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=vehicle_license&version=v1 document }
                 *
                 * 识别文件中的行驶证
                 *
                 * 行驶证识别接口，支持JPG/JPEG/PNG/BMP四种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    vehicle_license?: {
                                        entities?: Array<{
                                            type?:
                                                | "plate_number"
                                                | "vehicle_type"
                                                | "owner"
                                                | "address"
                                                | "use_character"
                                                | "model"
                                                | "vin"
                                                | "engine_number"
                                                | "register_date"
                                                | "issue_date"
                                                | "license_issuing_authority"
                                                | "document_id"
                                                | "approved_passengers_capacity"
                                                | "total_mass"
                                                | "curb_weight"
                                                | "ratified_load_capacity"
                                                | "gabarite"
                                                | "traction_mass"
                                                | "remarks"
                                                | "inspection_record";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/vehicle_license/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * food_manage_license
             */
            foodManageLicense: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=food_manage_license&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=food_manage_license&version=v1 document }
                 *
                 * 识别文件中的食品经营许可证
                 *
                 * 食品经营许可证识别接口，支持JPG/JPEG/PNG/BMP/PDF五种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    food_manage_license?: {
                                        entities?: Array<{
                                            type?:
                                                | "validity_period"
                                                | "issuer"
                                                | "issuing_authority"
                                                | "complaints_hotline"
                                                | "license_number"
                                                | "domicile"
                                                | "legal_representative"
                                                | "credit_code"
                                                | "operator"
                                                | "premise"
                                                | "daily_supervisor"
                                                | "daily_supervisory_authorities"
                                                | "main_body"
                                                | "operating_item";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/food_manage_license/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * food_produce_license
             */
            foodProduceLicense: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=food_produce_license&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=food_produce_license&version=v1 document }
                 *
                 * 识别文件中的食品生产许可证
                 *
                 * 食品生产许可证识别接口，支持JPG/JPEG/PNG/BMP/PDF五种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    food_produce_license?: {
                                        entities?: Array<{
                                            type?:
                                                | "validity_period"
                                                | "issuer"
                                                | "issuing_authority"
                                                | "complaints_hotline"
                                                | "food_category"
                                                | "production_address"
                                                | "license_number"
                                                | "domicile"
                                                | "legal_representative"
                                                | "credit_code"
                                                | "producer"
                                                | "daily_supervisory_authorities"
                                                | "daily_supervisor";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/food_produce_license/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * hkm_mainland_travel_permit
             */
            hkmMainlandTravelPermit: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=hkm_mainland_travel_permit&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=hkm_mainland_travel_permit&version=v1 document }
                 *
                 * 识别文件中的港澳居民来往内地通行证
                 *
                 * 港澳居民来往内地通行证识别接口，支持JPG/JPEG/PNG/BMP四种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    hkm_mainland_travel_permit?: {
                                        entities?: Array<{
                                            type?:
                                                | "full_name_cn"
                                                | "full_name_en"
                                                | "date_of_birth"
                                                | "date_of_expiry"
                                                | "card_number";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/hkm_mainland_travel_permit/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * chinese_passport
             */
            chinesePassport: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=chinese_passport&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=chinese_passport&version=v1 document }
                 *
                 * 识别文件中的中国护照
                 *
                 * 中国护照识别接口，支持JPG/JPEG/PNG/BMP四种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    chinese_passport?: {
                                        entities?: Array<{
                                            type?:
                                                | "full_name_cn"
                                                | "full_name_en"
                                                | "date_of_birth"
                                                | "date_of_expiry"
                                                | "place_of_issue"
                                                | "passport_number";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/chinese_passport/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * tw_mainland_travel_permit
             */
            twMainlandTravelPermit: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=tw_mainland_travel_permit&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=tw_mainland_travel_permit&version=v1 document }
                 *
                 * 识别文件中的台湾居民来往大陆通行证
                 *
                 * 台湾居民来往大陆通行证识别接口，支持JPG/JPEG/PNG/BMP四种文件类型的一次性的识别。;文件大小需要小于10M。
                 *
                 * 单租户限流：10QPS，同租户下的应用没有限流，共享本租户的 10QPS 限流
                 */
                recognize: async (
                    payload?: {
                        data?: { file?: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    tw_mainland_travel_permit?: {
                                        entities?: Array<{
                                            type?:
                                                | "full_name_cn"
                                                | "full_name_en"
                                                | "date_of_birth"
                                                | "date_of_expiry"
                                                | "card_number";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/tw_mainland_travel_permit/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * health_certificate
             */
            healthCertificate: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=health_certificate&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=health_certificate&version=v1 document }
                 *
                 * 识别文件中的健康证
                 *
                 * 健康证识别接口，支持JPG/JPEG/PNG/BMP四种文件类型的一次性的识别。文件大小需要小于10M。
                 *
                 * 单租户限流：10QPS，同租户下的应用没有限流，共享本租户的 10QPS 限流
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    health_certificate?: {
                                        entities?: Array<{
                                            type?:
                                                | "name"
                                                | "issued_by"
                                                | "date_of_handling"
                                                | "date_of_issue"
                                                | "date_of_medical_examination"
                                                | "valid_date"
                                                | "other_date";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/health_certificate/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * vehicle_invoice
             */
            vehicleInvoice: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=vehicle_invoice&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=vehicle_invoice&version=v1 document }
                 *
                 * 识别文件中的机动车发票
                 *
                 * 机动车发票识别接口，支持JPG/JPEG/PNG/BMP四种文件类型的一次性的识别。文件大小需要小于10M。
                 *
                 * 单租户限流：10QPS，同租户下的应用没有限流，共享本租户的 10QPS 限流
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    vehicle_invoice?: {
                                        entities?: Array<{
                                            type?:
                                                | "invoice_code"
                                                | "invoice_num"
                                                | "date"
                                                | "print_code"
                                                | "print_num"
                                                | "machine_num"
                                                | "buyer_name"
                                                | "buyer_id"
                                                | "vehicle_type"
                                                | "product_model"
                                                | "certificate_num"
                                                | "engine_num"
                                                | "vin"
                                                | "total_price"
                                                | "total_price_little"
                                                | "saler_name"
                                                | "saler_id"
                                                | "saler_addr"
                                                | "tax_rate"
                                                | "tax"
                                                | "price";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/vehicle_invoice/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * resume
             */
            resume: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=resume&apiName=parse&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=parse&project=document_ai&resource=resume&version=v1 document }
                 *
                 * 识别文件中的简历信息
                 *
                 * 简历信息解析接口，支持PDF/DOCX/PNG/JPG四种文件类型的一次性的识别。文件大小需要小于30M。
                 *
                 * 单租户限流：10QPS，同租户下的应用没有限流，共享本租户的 10QPS 限流
                 */
                parse: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    resumes?: Array<{
                                        file_md5?: string;
                                        content?: string;
                                        new_content?: string;
                                        name?: string;
                                        email?: string;
                                        mobile?: string;
                                        mobile_is_virtual?: boolean;
                                        country_code?: string;
                                        educations?: Array<{
                                            school?: string;
                                            start_date?: string;
                                            start_time?: string;
                                            end_date?: string;
                                            end_time?: string;
                                            major?: string;
                                            degree?: string;
                                            qualification?: number;
                                        }>;
                                        careers?: Array<{
                                            company?: string;
                                            start_date?: string;
                                            start_time?: string;
                                            end_date?: string;
                                            end_time?: string;
                                            title?: string;
                                            type?: number;
                                            type_str?: string;
                                            job_description?: string;
                                        }>;
                                        projects?: Array<{
                                            name?: string;
                                            title?: string;
                                            start_date?: string;
                                            start_time?: string;
                                            end_date?: string;
                                            end_time?: string;
                                            description?: string;
                                        }>;
                                        work_year?: number;
                                        date_of_birth?: string;
                                        gender?: number;
                                        willing_positions?: Array<string>;
                                        current_location?: string;
                                        willing_locations?: Array<string>;
                                        home_location?: string;
                                        languages?: Array<{
                                            level?: number;
                                            description?: string;
                                        }>;
                                        awards?: Array<{
                                            award?: string;
                                            date?: string;
                                            description?: string;
                                        }>;
                                        certificates?: Array<{
                                            name?: string;
                                            desc?: string;
                                        }>;
                                        competitions?: Array<{
                                            name?: string;
                                            desc?: string;
                                        }>;
                                        self_evaluation?: string;
                                        urls?: Array<string>;
                                        social_links?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/resume/parse`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * bank_card
             */
            bankCard: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=bank_card&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=bank_card&version=v1 document }
                 *
                 * 识别文件中的银行卡
                 *
                 * 银行卡识别接口，支持JPG/JPEG/PNG/BMP四种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    bank_card?: {
                                        entities?: Array<{
                                            type?:
                                                | "card_number"
                                                | "date_of_expiry";
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/bank_card/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * train_invoice
             */
            trainInvoice: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=train_invoice&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=train_invoice&version=v1 document }
                 *
                 * 识别文件中的火车票
                 *
                 * 火车票识别接口，支持JPG/JPEG/PNG/PDF/OFD五种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    train_invoices?: Array<{
                                        entities?: Array<{
                                            type?:
                                                | "start_station"
                                                | "end_station"
                                                | "train_num"
                                                | "name"
                                                | "seat_num"
                                                | "ticket_num"
                                                | "total_amount"
                                                | "time"
                                                | "price"
                                                | "seat_num"
                                                | "seat_cls"
                                                | "id_num"
                                                | "sale_num"
                                                | "sale_station";
                                            value?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/train_invoice/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * taxi_invoice
             */
            taxiInvoice: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=taxi_invoice&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=taxi_invoice&version=v1 document }
                 *
                 * 识别文件中的出租车发票
                 *
                 * 出租车发票识别接口，支持JPG/JPEG/PNG/PDF/OFD五种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    taxi_invoices?: Array<{
                                        entities?: Array<{
                                            type?:
                                                | "car_number"
                                                | "start_time"
                                                | "end_time"
                                                | "distance"
                                                | "start_date"
                                                | "total_amount"
                                                | "invoice_code"
                                                | "invoice_no"
                                                | "price"
                                                | "dispatch_fee"
                                                | "additional_fee"
                                                | "is_sealed"
                                                | "seller_name_in_seal"
                                                | "seller_taxpayer_no_in_seal"
                                                | "title_trial"
                                                | "invoice_special_seal";
                                            value?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/taxi_invoice/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * vat_invoice
             */
            vatInvoice: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=vat_invoice&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=vat_invoice&version=v1 document }
                 *
                 * 识别文件中的增值税发票
                 *
                 * 增值税发票识别接口，支持JPG/JPEG/PNG/PDF/BMP/OFD六种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    vat_invoices?: Array<{
                                        entities?: Array<{
                                            type?:
                                                | "invoice_name"
                                                | "invoice_code"
                                                | "invoice_no"
                                                | "invoice_date"
                                                | "total_price"
                                                | "total_tax"
                                                | "big_total_price_and_tax"
                                                | "check_code"
                                                | "total_price_and_tax"
                                                | "buyer_name"
                                                | "buyer_taxpayer_no"
                                                | "buyer_address_phone"
                                                | "buyer_account"
                                                | "seller_name"
                                                | "seller_taxpayer_no"
                                                | "seller_address_phone"
                                                | "seller_account"
                                                | "payee"
                                                | "invoice_date"
                                                | "password_area"
                                                | "remarks"
                                                | "reviewer"
                                                | "drawer"
                                                | "is_sealed"
                                                | "seller_name_in_seal"
                                                | "seller_taxpayer_no_in_seal"
                                                | "invoice_special_seal"
                                                | "machine_num";
                                            value?: string;
                                            items?: Array<
                                                Array<{
                                                    type?: string;
                                                    value?: string;
                                                }>
                                            >;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/vat_invoice/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * id_card
             */
            idCard: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=id_card&apiName=recognize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recognize&project=document_ai&resource=id_card&version=v1 document }
                 *
                 * 识别文件中的身份证
                 *
                 * 身份证识别接口，支持JPG/JPEG/PNG/BMP四种文件类型的一次性的识别。;文件大小需要小于10M。
                 */
                recognize: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    id_card?: {
                                        entities?: Array<{
                                            type?:
                                                | "identity_code"
                                                | "identity_name"
                                                | "address"
                                                | "valid_date_start"
                                                | "valid_date_end"
                                                | "gender"
                                                | "race"
                                                | "issued_by"
                                                | "birth";
                                            value?: string;
                                        }>;
                                        side?: number;
                                        conners?: Array<number>;
                                        face_conners?: Array<number>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/id_card/recognize`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * kie
             */
            kie: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=kie&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=document_ai&resource=kie&version=v1 document }
                 *
                 * 多模态信息提取
                 *
                 * 使用豆包视觉模型的文档理解多模态应用，针对各种票据、卡证，无需训练配置，即可提供通用的票证抽取服务，提高企业自动化效率。
                 */
                create: async (
                    payload?: {
                        data: {
                            content: Buffer | fs.ReadStream;
                            target_keys?: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    kie?: {
                                        kies?: Array<{
                                            key?: string;
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/kies`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * document
             */
            document: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=document_ai&resource=document&apiName=chunking&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=chunking&project=document_ai&resource=document&version=v1 document }
                 *
                 * 文档理解
                 *
                 * 文档理解接口，支持pdf/docx/doc/xlsx/xls/pptx/ppt/txt/markdown/飞书文档/html/image/多维表格/飞书表格类型的文件根据特定策略拆分成结构化的数据。文件大小支持100MB以内，Excel 类型支持20MB以内。如需更大文件上限请联系客服。
                 *
                 * 单租户限流：10QPS，同租户下的应用没有限流，共享本租户的 10QPS 限流，多模态大模型单租户暂时支持1QPM，需要扩容请联系开发人员。
                 */
                chunking: async (
                    payload?: {
                        data: {
                            file: Buffer | fs.ReadStream;
                            strategy: number;
                            file_type:
                                | "pdf"
                                | "docx"
                                | "doc"
                                | "txt"
                                | "markdown"
                                | "lark_docs"
                                | "lark_sheet"
                                | "bitable"
                                | "html"
                                | "pptx"
                                | "image"
                                | "images_zip"
                                | "xlsx";
                            chunk_size: number;
                            detect_pdf_table?: string;
                            detect_pdf_img?: string;
                            page_size_limit?: string;
                            merge_small_chunks?: string;
                            pdf_with_ocr?: string;
                            doctree_with_outline?: string;
                            custom_splitter?: string;
                            to_md?: string;
                            md_collapsed?: string;
                            detect_header?: string;
                            slides_full_page_as_image?: string;
                            chunk_with_vlm?: string;
                            expected_level?: string;
                            open_access_token?: string;
                            file_token?: string;
                            sub_token?: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    doc_chunks: Array<{
                                        id?: number;
                                        type?:
                                            | "title"
                                            | "section-title"
                                            | "section-text"
                                            | "image"
                                            | "table"
                                            | "header"
                                            | "footer"
                                            | "footnote"
                                            | "caption"
                                            | "toc"
                                            | "others";
                                        positions?: {
                                            page_numbers?: Array<number>;
                                            bboxes?: Array<{
                                                bbox_positions?: Array<string>;
                                            }>;
                                        };
                                        text?: string;
                                        level?: number;
                                        parent?: number;
                                        children?: Array<number>;
                                        label?: string;
                                        block_id?: string;
                                        table_detail?: {
                                            table_idx?: number;
                                            text?: string;
                                            cells?: Array<{
                                                row_cells?: Array<{
                                                    type?: string;
                                                    text?: string;
                                                    x0?: string;
                                                    y0?: string;
                                                    x1?: string;
                                                    y1?: string;
                                                    row_index?: number;
                                                    col_index?: number;
                                                    row_span?: number;
                                                    col_span?: number;
                                                    is_merge_cell?: boolean;
                                                    images?: Array<string>;
                                                    files?: Array<string>;
                                                    is_header?: boolean;
                                                }>;
                                            }>;
                                            table_name?: string;
                                            caption?: string;
                                            md_text?: string;
                                            html_text?: string;
                                            table_img?: {
                                                type?: string;
                                                base64?: string;
                                                url?: string;
                                            };
                                            sub_table_idx?: number;
                                            table_range?: string;
                                            header_ranges?: Array<string>;
                                            desc_ranges?: Array<string>;
                                        };
                                        llm_detail?: {
                                            query_id?: number;
                                            usage?: {
                                                prompt_tokens?: number;
                                                completion_tokens?: number;
                                                total_tokens?: number;
                                            };
                                            finish_reason?: string;
                                        };
                                        image_detail?: {
                                            base64?: string;
                                            caption?: string;
                                            links?: Array<string>;
                                            token?: string;
                                        };
                                        slide_index?: number;
                                        md_text?: string;
                                        html_text?: string;
                                        file_detail?: {
                                            token?: string;
                                            name?: string;
                                            links?: Array<string>;
                                        };
                                        code_detail?: {
                                            language?:
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
                                                | "12"
                                                | "13"
                                                | "14"
                                                | "15"
                                                | "16"
                                                | "17"
                                                | "18"
                                                | "19"
                                                | "20"
                                                | "21"
                                                | "22"
                                                | "23"
                                                | "24"
                                                | "25"
                                                | "26"
                                                | "27"
                                                | "28"
                                                | "29"
                                                | "30"
                                                | "31"
                                                | "32"
                                                | "33"
                                                | "34"
                                                | "35"
                                                | "36"
                                                | "37"
                                                | "38"
                                                | "39"
                                                | "40"
                                                | "41"
                                                | "42"
                                                | "43"
                                                | "44"
                                                | "45"
                                                | "46"
                                                | "47"
                                                | "48"
                                                | "49"
                                                | "50"
                                                | "51"
                                                | "52"
                                                | "53"
                                                | "54"
                                                | "55"
                                                | "56"
                                                | "57"
                                                | "58"
                                                | "59"
                                                | "60"
                                                | "61"
                                                | "62"
                                                | "63"
                                                | "64"
                                                | "65"
                                                | "66"
                                                | "67"
                                                | "68"
                                                | "69"
                                                | "70"
                                                | "71"
                                                | "72"
                                                | "73"
                                                | "74"
                                                | "75";
                                            language_name?: string;
                                            content?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/document_ai/v1/document/chunking`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
        },
    };
}
