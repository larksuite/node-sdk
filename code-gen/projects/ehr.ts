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
import edu from "./edu";

// auto gen
export default abstract class Client extends edu {
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
     * 智能人事
     */
    ehr = {
        /**
         * 飞书人事（标准版)
         */
        attachment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=ehr&resource=attachment&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/attachment/get document }
             *
             * 下载附件
             *
             * 根据文件 token 下载文件。;;调用 「批量获取员工花名册信息」接口的返回值中，「文件」类型的字段 id，即是文件 token
             *
             * ![image.png](//sf1-ttcdn-tos.pstatp.com/obj/open-platform-opendoc/bed391d2a8ce6ed2d5985ea69bf92850_9GY1mnuDXP.png)
             */
            get: async (
                payload?: {
                    path: { token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/ehr/v1/attachments/:token`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                const checkIsReadable = () => {
                    const consumedError =
                        "The stream has already been consumed";
                    if (!res.readable) {
                        this.logger.error(consumedError);
                        throw new Error(consumedError);
                    }
                };

                return {
                    writeFile: async (filePath: string) => {
                        checkIsReadable();
                        return new Promise((resolve, reject) => {
                            const writableStream =
                                fs.createWriteStream(filePath);
                            writableStream.on("finish", () => {
                                resolve(filePath);
                            });
                            writableStream.on("error", (e) => {
                                reject(e);
                            });
                            res.pipe(writableStream);
                        });
                    },
                    getReadableStream: () => {
                        checkIsReadable();
                        return res as Readable;
                    },
                };
            },
        },
        /**
         * 飞书人事（标准版)
         */
        employee: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        view?: "basic" | "full";
                        status?: Array<number>;
                        type?: Array<number>;
                        start_time?: string;
                        end_time?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        user_ids?: Array<string>;
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
                                `${this.domain}/open-apis/ehr/v1/employees`,
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
                                                    user_id?: string;
                                                    system_fields?: {
                                                        name?: string;
                                                        en_name?: string;
                                                        email?: string;
                                                        mobile?: string;
                                                        department_id?: string;
                                                        manager?: {
                                                            user_id?: string;
                                                            name?: string;
                                                            en_name?: string;
                                                        };
                                                        job?: {
                                                            id?: number;
                                                            name?: string;
                                                        };
                                                        job_level?: {
                                                            id?: number;
                                                            name?: string;
                                                        };
                                                        work_location?: {
                                                            id?: number;
                                                            name?: string;
                                                        };
                                                        gender?: number;
                                                        birthday?: string;
                                                        native_region?: {
                                                            iso_code?: string;
                                                            name?: string;
                                                        };
                                                        ethnicity?: number;
                                                        marital_status?: number;
                                                        political_status?: number;
                                                        entered_workforce_date?: string;
                                                        id_type?: number;
                                                        id_number?: string;
                                                        hukou_type?: number;
                                                        hukou_location?: string;
                                                        bank_account_number?: string;
                                                        bank_name?: string;
                                                        social_security_account?: string;
                                                        provident_fund_account?: string;
                                                        employee_no?: string;
                                                        employee_type?: number;
                                                        status?: number;
                                                        hire_date?: string;
                                                        probation_months?: number;
                                                        conversion_date?: string;
                                                        application?: number;
                                                        application_status?: number;
                                                        last_day?: string;
                                                        departure_type?: number;
                                                        departure_reason?: number;
                                                        departure_notes?: string;
                                                        contract_company?: {
                                                            id?: number;
                                                            name?: string;
                                                        };
                                                        contract_type?: number;
                                                        contract_start_date?: string;
                                                        contract_expiration_date?: string;
                                                        contract_sign_times?: number;
                                                        personal_email?: string;
                                                        family_address?: string;
                                                        primary_emergency_contact?: {
                                                            name?: string;
                                                            relationship?: number;
                                                            mobile?: string;
                                                        };
                                                        emergency_contact?: Array<{
                                                            name?: string;
                                                            relationship?: number;
                                                            mobile?: string;
                                                        }>;
                                                        highest_level_of_edu?: {
                                                            level?: number;
                                                            school?: string;
                                                            major?: string;
                                                            degree?: number;
                                                            start?: string;
                                                            end?: string;
                                                        };
                                                        education?: Array<{
                                                            level?: number;
                                                            school?: string;
                                                            major?: string;
                                                            degree?: number;
                                                            start?: string;
                                                            end?: string;
                                                        }>;
                                                        former_work_exp?: {
                                                            company?: string;
                                                            department?: string;
                                                            job?: string;
                                                            start?: string;
                                                            end?: string;
                                                            description?: string;
                                                        };
                                                        work_exp?: Array<{
                                                            company?: string;
                                                            department?: string;
                                                            job?: string;
                                                            start?: string;
                                                            end?: string;
                                                            description?: string;
                                                        }>;
                                                        id_photo_po_side?: Array<{
                                                            id?: string;
                                                            mime_type?: string;
                                                            name?: string;
                                                            size?: number;
                                                        }>;
                                                        id_photo_em_side?: Array<{
                                                            id?: string;
                                                            mime_type?: string;
                                                            name?: string;
                                                            size?: number;
                                                        }>;
                                                        id_photo?: Array<{
                                                            id?: string;
                                                            mime_type?: string;
                                                            name?: string;
                                                            size?: number;
                                                        }>;
                                                        diploma_photo?: Array<{
                                                            id?: string;
                                                            mime_type?: string;
                                                            name?: string;
                                                            size?: number;
                                                        }>;
                                                        graduation_cert?: Array<{
                                                            id?: string;
                                                            mime_type?: string;
                                                            name?: string;
                                                            size?: number;
                                                        }>;
                                                        cert_of_merit?: Array<{
                                                            id?: string;
                                                            mime_type?: string;
                                                            name?: string;
                                                            size?: number;
                                                        }>;
                                                        offboarding_file?: Array<{
                                                            id?: string;
                                                            mime_type?: string;
                                                            name?: string;
                                                            size?: number;
                                                        }>;
                                                        cancel_onboarding_reason?: number;
                                                        cancel_onboarding_notes?: string;
                                                        employee_form_status?: number;
                                                        create_time?: number;
                                                        update_time?: number;
                                                    };
                                                    custom_fields?: Array<{
                                                        key?: string;
                                                        label?: string;
                                                        type?:
                                                            | "text"
                                                            | "date"
                                                            | "option"
                                                            | "file";
                                                        value?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=ehr&resource=employee&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/employee/list document }
             *
             * 批量获取员工花名册信息
             *
             * 根据员工飞书用户 ID / 员工状态 / 雇员类型等搜索条件 ，批量获取员工花名册字段信息。字段包括「系统标准字段 / system_fields」和「自定义字段 / custom_fields」
             */
            list: async (
                payload?: {
                    params?: {
                        view?: "basic" | "full";
                        status?: Array<number>;
                        type?: Array<number>;
                        start_time?: string;
                        end_time?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        user_ids?: Array<string>;
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
                                    user_id?: string;
                                    system_fields?: {
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        mobile?: string;
                                        department_id?: string;
                                        manager?: {
                                            user_id?: string;
                                            name?: string;
                                            en_name?: string;
                                        };
                                        job?: { id?: number; name?: string };
                                        job_level?: {
                                            id?: number;
                                            name?: string;
                                        };
                                        work_location?: {
                                            id?: number;
                                            name?: string;
                                        };
                                        gender?: number;
                                        birthday?: string;
                                        native_region?: {
                                            iso_code?: string;
                                            name?: string;
                                        };
                                        ethnicity?: number;
                                        marital_status?: number;
                                        political_status?: number;
                                        entered_workforce_date?: string;
                                        id_type?: number;
                                        id_number?: string;
                                        hukou_type?: number;
                                        hukou_location?: string;
                                        bank_account_number?: string;
                                        bank_name?: string;
                                        social_security_account?: string;
                                        provident_fund_account?: string;
                                        employee_no?: string;
                                        employee_type?: number;
                                        status?: number;
                                        hire_date?: string;
                                        probation_months?: number;
                                        conversion_date?: string;
                                        application?: number;
                                        application_status?: number;
                                        last_day?: string;
                                        departure_type?: number;
                                        departure_reason?: number;
                                        departure_notes?: string;
                                        contract_company?: {
                                            id?: number;
                                            name?: string;
                                        };
                                        contract_type?: number;
                                        contract_start_date?: string;
                                        contract_expiration_date?: string;
                                        contract_sign_times?: number;
                                        personal_email?: string;
                                        family_address?: string;
                                        primary_emergency_contact?: {
                                            name?: string;
                                            relationship?: number;
                                            mobile?: string;
                                        };
                                        emergency_contact?: Array<{
                                            name?: string;
                                            relationship?: number;
                                            mobile?: string;
                                        }>;
                                        highest_level_of_edu?: {
                                            level?: number;
                                            school?: string;
                                            major?: string;
                                            degree?: number;
                                            start?: string;
                                            end?: string;
                                        };
                                        education?: Array<{
                                            level?: number;
                                            school?: string;
                                            major?: string;
                                            degree?: number;
                                            start?: string;
                                            end?: string;
                                        }>;
                                        former_work_exp?: {
                                            company?: string;
                                            department?: string;
                                            job?: string;
                                            start?: string;
                                            end?: string;
                                            description?: string;
                                        };
                                        work_exp?: Array<{
                                            company?: string;
                                            department?: string;
                                            job?: string;
                                            start?: string;
                                            end?: string;
                                            description?: string;
                                        }>;
                                        id_photo_po_side?: Array<{
                                            id?: string;
                                            mime_type?: string;
                                            name?: string;
                                            size?: number;
                                        }>;
                                        id_photo_em_side?: Array<{
                                            id?: string;
                                            mime_type?: string;
                                            name?: string;
                                            size?: number;
                                        }>;
                                        id_photo?: Array<{
                                            id?: string;
                                            mime_type?: string;
                                            name?: string;
                                            size?: number;
                                        }>;
                                        diploma_photo?: Array<{
                                            id?: string;
                                            mime_type?: string;
                                            name?: string;
                                            size?: number;
                                        }>;
                                        graduation_cert?: Array<{
                                            id?: string;
                                            mime_type?: string;
                                            name?: string;
                                            size?: number;
                                        }>;
                                        cert_of_merit?: Array<{
                                            id?: string;
                                            mime_type?: string;
                                            name?: string;
                                            size?: number;
                                        }>;
                                        offboarding_file?: Array<{
                                            id?: string;
                                            mime_type?: string;
                                            name?: string;
                                            size?: number;
                                        }>;
                                        cancel_onboarding_reason?: number;
                                        cancel_onboarding_notes?: string;
                                        employee_form_status?: number;
                                        create_time?: number;
                                        update_time?: number;
                                    };
                                    custom_fields?: Array<{
                                        key?: string;
                                        label?: string;
                                        type?:
                                            | "text"
                                            | "date"
                                            | "option"
                                            | "file";
                                        value?: string;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/ehr/v1/employees`,
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
        v1: {
            /**
             * 飞书人事（标准版)
             */
            attachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=ehr&resource=attachment&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/attachment/get document }
                 *
                 * 下载附件
                 *
                 * 根据文件 token 下载文件。;;调用 「批量获取员工花名册信息」接口的返回值中，「文件」类型的字段 id，即是文件 token
                 *
                 * ![image.png](//sf1-ttcdn-tos.pstatp.com/obj/open-platform-opendoc/bed391d2a8ce6ed2d5985ea69bf92850_9GY1mnuDXP.png)
                 */
                get: async (
                    payload?: {
                        path: { token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/ehr/v1/attachments/:token`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.readable) {
                            this.logger.error(consumedError);
                            throw new Error(consumedError);
                        }
                    };

                    return {
                        writeFile: async (filePath: string) => {
                            checkIsReadable();
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res as Readable;
                        },
                    };
                },
            },
            /**
             * 飞书人事（标准版)
             */
            employee: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            view?: "basic" | "full";
                            status?: Array<number>;
                            type?: Array<number>;
                            start_time?: string;
                            end_time?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            user_ids?: Array<string>;
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
                                    `${this.domain}/open-apis/ehr/v1/employees`,
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
                                                        user_id?: string;
                                                        system_fields?: {
                                                            name?: string;
                                                            en_name?: string;
                                                            email?: string;
                                                            mobile?: string;
                                                            department_id?: string;
                                                            manager?: {
                                                                user_id?: string;
                                                                name?: string;
                                                                en_name?: string;
                                                            };
                                                            job?: {
                                                                id?: number;
                                                                name?: string;
                                                            };
                                                            job_level?: {
                                                                id?: number;
                                                                name?: string;
                                                            };
                                                            work_location?: {
                                                                id?: number;
                                                                name?: string;
                                                            };
                                                            gender?: number;
                                                            birthday?: string;
                                                            native_region?: {
                                                                iso_code?: string;
                                                                name?: string;
                                                            };
                                                            ethnicity?: number;
                                                            marital_status?: number;
                                                            political_status?: number;
                                                            entered_workforce_date?: string;
                                                            id_type?: number;
                                                            id_number?: string;
                                                            hukou_type?: number;
                                                            hukou_location?: string;
                                                            bank_account_number?: string;
                                                            bank_name?: string;
                                                            social_security_account?: string;
                                                            provident_fund_account?: string;
                                                            employee_no?: string;
                                                            employee_type?: number;
                                                            status?: number;
                                                            hire_date?: string;
                                                            probation_months?: number;
                                                            conversion_date?: string;
                                                            application?: number;
                                                            application_status?: number;
                                                            last_day?: string;
                                                            departure_type?: number;
                                                            departure_reason?: number;
                                                            departure_notes?: string;
                                                            contract_company?: {
                                                                id?: number;
                                                                name?: string;
                                                            };
                                                            contract_type?: number;
                                                            contract_start_date?: string;
                                                            contract_expiration_date?: string;
                                                            contract_sign_times?: number;
                                                            personal_email?: string;
                                                            family_address?: string;
                                                            primary_emergency_contact?: {
                                                                name?: string;
                                                                relationship?: number;
                                                                mobile?: string;
                                                            };
                                                            emergency_contact?: Array<{
                                                                name?: string;
                                                                relationship?: number;
                                                                mobile?: string;
                                                            }>;
                                                            highest_level_of_edu?: {
                                                                level?: number;
                                                                school?: string;
                                                                major?: string;
                                                                degree?: number;
                                                                start?: string;
                                                                end?: string;
                                                            };
                                                            education?: Array<{
                                                                level?: number;
                                                                school?: string;
                                                                major?: string;
                                                                degree?: number;
                                                                start?: string;
                                                                end?: string;
                                                            }>;
                                                            former_work_exp?: {
                                                                company?: string;
                                                                department?: string;
                                                                job?: string;
                                                                start?: string;
                                                                end?: string;
                                                                description?: string;
                                                            };
                                                            work_exp?: Array<{
                                                                company?: string;
                                                                department?: string;
                                                                job?: string;
                                                                start?: string;
                                                                end?: string;
                                                                description?: string;
                                                            }>;
                                                            id_photo_po_side?: Array<{
                                                                id?: string;
                                                                mime_type?: string;
                                                                name?: string;
                                                                size?: number;
                                                            }>;
                                                            id_photo_em_side?: Array<{
                                                                id?: string;
                                                                mime_type?: string;
                                                                name?: string;
                                                                size?: number;
                                                            }>;
                                                            id_photo?: Array<{
                                                                id?: string;
                                                                mime_type?: string;
                                                                name?: string;
                                                                size?: number;
                                                            }>;
                                                            diploma_photo?: Array<{
                                                                id?: string;
                                                                mime_type?: string;
                                                                name?: string;
                                                                size?: number;
                                                            }>;
                                                            graduation_cert?: Array<{
                                                                id?: string;
                                                                mime_type?: string;
                                                                name?: string;
                                                                size?: number;
                                                            }>;
                                                            cert_of_merit?: Array<{
                                                                id?: string;
                                                                mime_type?: string;
                                                                name?: string;
                                                                size?: number;
                                                            }>;
                                                            offboarding_file?: Array<{
                                                                id?: string;
                                                                mime_type?: string;
                                                                name?: string;
                                                                size?: number;
                                                            }>;
                                                            cancel_onboarding_reason?: number;
                                                            cancel_onboarding_notes?: string;
                                                            employee_form_status?: number;
                                                            create_time?: number;
                                                            update_time?: number;
                                                        };
                                                        custom_fields?: Array<{
                                                            key?: string;
                                                            label?: string;
                                                            type?:
                                                                | "text"
                                                                | "date"
                                                                | "option"
                                                                | "file";
                                                            value?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=ehr&resource=employee&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/employee/list document }
                 *
                 * 批量获取员工花名册信息
                 *
                 * 根据员工飞书用户 ID / 员工状态 / 雇员类型等搜索条件 ，批量获取员工花名册字段信息。字段包括「系统标准字段 / system_fields」和「自定义字段 / custom_fields」
                 */
                list: async (
                    payload?: {
                        params?: {
                            view?: "basic" | "full";
                            status?: Array<number>;
                            type?: Array<number>;
                            start_time?: string;
                            end_time?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            user_ids?: Array<string>;
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
                                        user_id?: string;
                                        system_fields?: {
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            mobile?: string;
                                            department_id?: string;
                                            manager?: {
                                                user_id?: string;
                                                name?: string;
                                                en_name?: string;
                                            };
                                            job?: {
                                                id?: number;
                                                name?: string;
                                            };
                                            job_level?: {
                                                id?: number;
                                                name?: string;
                                            };
                                            work_location?: {
                                                id?: number;
                                                name?: string;
                                            };
                                            gender?: number;
                                            birthday?: string;
                                            native_region?: {
                                                iso_code?: string;
                                                name?: string;
                                            };
                                            ethnicity?: number;
                                            marital_status?: number;
                                            political_status?: number;
                                            entered_workforce_date?: string;
                                            id_type?: number;
                                            id_number?: string;
                                            hukou_type?: number;
                                            hukou_location?: string;
                                            bank_account_number?: string;
                                            bank_name?: string;
                                            social_security_account?: string;
                                            provident_fund_account?: string;
                                            employee_no?: string;
                                            employee_type?: number;
                                            status?: number;
                                            hire_date?: string;
                                            probation_months?: number;
                                            conversion_date?: string;
                                            application?: number;
                                            application_status?: number;
                                            last_day?: string;
                                            departure_type?: number;
                                            departure_reason?: number;
                                            departure_notes?: string;
                                            contract_company?: {
                                                id?: number;
                                                name?: string;
                                            };
                                            contract_type?: number;
                                            contract_start_date?: string;
                                            contract_expiration_date?: string;
                                            contract_sign_times?: number;
                                            personal_email?: string;
                                            family_address?: string;
                                            primary_emergency_contact?: {
                                                name?: string;
                                                relationship?: number;
                                                mobile?: string;
                                            };
                                            emergency_contact?: Array<{
                                                name?: string;
                                                relationship?: number;
                                                mobile?: string;
                                            }>;
                                            highest_level_of_edu?: {
                                                level?: number;
                                                school?: string;
                                                major?: string;
                                                degree?: number;
                                                start?: string;
                                                end?: string;
                                            };
                                            education?: Array<{
                                                level?: number;
                                                school?: string;
                                                major?: string;
                                                degree?: number;
                                                start?: string;
                                                end?: string;
                                            }>;
                                            former_work_exp?: {
                                                company?: string;
                                                department?: string;
                                                job?: string;
                                                start?: string;
                                                end?: string;
                                                description?: string;
                                            };
                                            work_exp?: Array<{
                                                company?: string;
                                                department?: string;
                                                job?: string;
                                                start?: string;
                                                end?: string;
                                                description?: string;
                                            }>;
                                            id_photo_po_side?: Array<{
                                                id?: string;
                                                mime_type?: string;
                                                name?: string;
                                                size?: number;
                                            }>;
                                            id_photo_em_side?: Array<{
                                                id?: string;
                                                mime_type?: string;
                                                name?: string;
                                                size?: number;
                                            }>;
                                            id_photo?: Array<{
                                                id?: string;
                                                mime_type?: string;
                                                name?: string;
                                                size?: number;
                                            }>;
                                            diploma_photo?: Array<{
                                                id?: string;
                                                mime_type?: string;
                                                name?: string;
                                                size?: number;
                                            }>;
                                            graduation_cert?: Array<{
                                                id?: string;
                                                mime_type?: string;
                                                name?: string;
                                                size?: number;
                                            }>;
                                            cert_of_merit?: Array<{
                                                id?: string;
                                                mime_type?: string;
                                                name?: string;
                                                size?: number;
                                            }>;
                                            offboarding_file?: Array<{
                                                id?: string;
                                                mime_type?: string;
                                                name?: string;
                                                size?: number;
                                            }>;
                                            cancel_onboarding_reason?: number;
                                            cancel_onboarding_notes?: string;
                                            employee_form_status?: number;
                                            create_time?: number;
                                            update_time?: number;
                                        };
                                        custom_fields?: Array<{
                                            key?: string;
                                            label?: string;
                                            type?:
                                                | "text"
                                                | "date"
                                                | "option"
                                                | "file";
                                            value?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/ehr/v1/employees`,
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
