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
import people_ai from "./people_ai";

// auto gen
export default abstract class Client extends people_ai {
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
    people_bytedance = {
        /**
         * employee
         */
        employee: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=employee&apiName=batch_get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=people_bytedance&resource=employee&version=v1 document }
             */
            batchGet: async (
                payload?: {
                    params?: {
                        employee_number_list?: string;
                        department_id_list?: string;
                        email_list?: string;
                        leader_id?: number;
                        limit?: number;
                        offset?: number;
                        modify_time_begin?: string;
                        modify_time_end?: string;
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
                                employees?: Array<{
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    username?: string;
                                    work_city?: string;
                                    work_country?: string;
                                    department?: string;
                                    leader?: string;
                                    avatar_url?: string;
                                    employee_number?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_bytedance/v1/employees/batch_get`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=employee&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_bytedance&resource=employee&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
                        employee_number_list?: string;
                        department_id_list?: string;
                        email_list?: string;
                        leader_id?: number;
                        limit?: number;
                        offset?: number;
                        modify_time_begin?: string;
                        modify_time_end?: string;
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
                                employees?: Array<{
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    username?: string;
                                    work_city?: string;
                                    work_country?: string;
                                    department?: string;
                                    leader?: string;
                                    avatar_url?: string;
                                    employee_number?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_bytedance/v1/employees`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=employee&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=people_bytedance&resource=employee&version=v1 document }
             */
            search: async (
                payload?: {
                    params?: {
                        name_like?: string;
                        name?: string;
                        mobile_like?: string;
                        email?: string;
                        mobile?: string;
                        id?: number;
                        username?: string;
                        employee_number?: number;
                        id_number?: string;
                        status?: number;
                        ignore_department_status?: boolean;
                        limit?: number;
                        offset?: number;
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
                                employees?: Array<{
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    username?: string;
                                    work_city?: string;
                                    work_country?: string;
                                    department?: string;
                                    leader?: string;
                                    avatar_url?: string;
                                    employee_number?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_bytedance/v1/employees/search`,
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
         * gift
         */
        gift: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=gift&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_bytedance&resource=gift&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        activity_id: number;
                        limit?: number;
                        offset?: number;
                        start_time?: string;
                        end_time?: string;
                        employee_number?: number;
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
                                gifts?: Array<{
                                    employee_number: number;
                                    activity_id: number;
                                    gift_style_id: number;
                                    name: string;
                                    phone_number: string;
                                    province?: string;
                                    city?: string;
                                    district?: string;
                                    address: string;
                                    revoke: boolean;
                                    create_time: string;
                                    modify_time: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_bytedance/v1/gifts`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=gift&apiName=minibatch_update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=minibatch_update&project=people_bytedance&resource=gift&version=v1 document }
             */
            minibatchUpdate: async (
                payload?: {
                    data?: {
                        logistic_infos?: Array<{
                            employee_number?: number;
                            activity_id?: number;
                            logistic_company_id?: number;
                            shipment_id?: string;
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
                                update_results?: Array<{
                                    employee_number?: number;
                                    is_success?: boolean;
                                    fail_reason?: {
                                        zh_CN?: string;
                                        en_US?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_bytedance/v1/gifts/minibatch_update`,
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
         * department
         */
        department: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=department&apiName=batch_get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=people_bytedance&resource=department&version=v1 document }
             */
            batchGet: async (
                payload?: {
                    data?: {
                        department_id_list?: Array<string>;
                        name_list?: Array<string>;
                        root_id_list?: Array<string>;
                        limit?: number;
                        offset?: number;
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
                                departments?: Array<{
                                    department_id?: string;
                                    name?: string;
                                    en_name?: string;
                                    parent_id?: string;
                                    leader?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_bytedance/v1/departments/batch_get`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=department&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_bytedance&resource=department&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
                        name?: string;
                        en_name?: string;
                        level?: number;
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
                                departments?: Array<{
                                    department_id?: string;
                                    name?: string;
                                    en_name?: string;
                                    parent_id?: string;
                                    leader?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_bytedance/v1/departments`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=department&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=people_bytedance&resource=department&version=v1 document }
             */
            query: async (
                payload?: {
                    params?: {
                        name?: string;
                        en_name?: string;
                        level?: number;
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
                                departments?: Array<{
                                    department_id?: string;
                                    name?: string;
                                    en_name?: string;
                                    parent_id?: string;
                                    leader?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_bytedance/v1/departments/query`,
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
             * employee
             */
            employee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=employee&apiName=batch_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=people_bytedance&resource=employee&version=v1 document }
                 */
                batchGet: async (
                    payload?: {
                        params?: {
                            employee_number_list?: string;
                            department_id_list?: string;
                            email_list?: string;
                            leader_id?: number;
                            limit?: number;
                            offset?: number;
                            modify_time_begin?: string;
                            modify_time_end?: string;
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
                                    employees?: Array<{
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        username?: string;
                                        work_city?: string;
                                        work_country?: string;
                                        department?: string;
                                        leader?: string;
                                        avatar_url?: string;
                                        employee_number?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_bytedance/v1/employees/batch_get`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=employee&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_bytedance&resource=employee&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            employee_number_list?: string;
                            department_id_list?: string;
                            email_list?: string;
                            leader_id?: number;
                            limit?: number;
                            offset?: number;
                            modify_time_begin?: string;
                            modify_time_end?: string;
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
                                    employees?: Array<{
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        username?: string;
                                        work_city?: string;
                                        work_country?: string;
                                        department?: string;
                                        leader?: string;
                                        avatar_url?: string;
                                        employee_number?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_bytedance/v1/employees`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=employee&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=people_bytedance&resource=employee&version=v1 document }
                 */
                search: async (
                    payload?: {
                        params?: {
                            name_like?: string;
                            name?: string;
                            mobile_like?: string;
                            email?: string;
                            mobile?: string;
                            id?: number;
                            username?: string;
                            employee_number?: number;
                            id_number?: string;
                            status?: number;
                            ignore_department_status?: boolean;
                            limit?: number;
                            offset?: number;
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
                                    employees?: Array<{
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        username?: string;
                                        work_city?: string;
                                        work_country?: string;
                                        department?: string;
                                        leader?: string;
                                        avatar_url?: string;
                                        employee_number?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_bytedance/v1/employees/search`,
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
             * gift
             */
            gift: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=gift&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_bytedance&resource=gift&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            activity_id: number;
                            limit?: number;
                            offset?: number;
                            start_time?: string;
                            end_time?: string;
                            employee_number?: number;
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
                                    gifts?: Array<{
                                        employee_number: number;
                                        activity_id: number;
                                        gift_style_id: number;
                                        name: string;
                                        phone_number: string;
                                        province?: string;
                                        city?: string;
                                        district?: string;
                                        address: string;
                                        revoke: boolean;
                                        create_time: string;
                                        modify_time: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_bytedance/v1/gifts`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=gift&apiName=minibatch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=minibatch_update&project=people_bytedance&resource=gift&version=v1 document }
                 */
                minibatchUpdate: async (
                    payload?: {
                        data?: {
                            logistic_infos?: Array<{
                                employee_number?: number;
                                activity_id?: number;
                                logistic_company_id?: number;
                                shipment_id?: string;
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
                                    update_results?: Array<{
                                        employee_number?: number;
                                        is_success?: boolean;
                                        fail_reason?: {
                                            zh_CN?: string;
                                            en_US?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_bytedance/v1/gifts/minibatch_update`,
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
             * department
             */
            department: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=department&apiName=batch_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=people_bytedance&resource=department&version=v1 document }
                 */
                batchGet: async (
                    payload?: {
                        data?: {
                            department_id_list?: Array<string>;
                            name_list?: Array<string>;
                            root_id_list?: Array<string>;
                            limit?: number;
                            offset?: number;
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
                                    departments?: Array<{
                                        department_id?: string;
                                        name?: string;
                                        en_name?: string;
                                        parent_id?: string;
                                        leader?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_bytedance/v1/departments/batch_get`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=department&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_bytedance&resource=department&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            name?: string;
                            en_name?: string;
                            level?: number;
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
                                    departments?: Array<{
                                        department_id?: string;
                                        name?: string;
                                        en_name?: string;
                                        parent_id?: string;
                                        leader?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_bytedance/v1/departments`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_bytedance&resource=department&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=people_bytedance&resource=department&version=v1 document }
                 */
                query: async (
                    payload?: {
                        params?: {
                            name?: string;
                            en_name?: string;
                            level?: number;
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
                                    departments?: Array<{
                                        department_id?: string;
                                        name?: string;
                                        en_name?: string;
                                        parent_id?: string;
                                        leader?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_bytedance/v1/departments/query`,
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
