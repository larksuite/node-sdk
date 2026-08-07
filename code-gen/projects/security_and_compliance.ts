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
import search from "./search";

// auto gen
export default abstract class Client extends search {
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
    security_and_compliance = {
        /**
         * key_person
         */
        keyPerson: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=key_person&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=security_and_compliance&resource=key_person&version=v1 document }
             */
            delete: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { key_person_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/key_persons/:key_person_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=key_person&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=key_person&version=v1 document }
             */
            create: async (
                payload?: {
                    data: { key_person_id: string };
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
                                key_person?: {
                                    key_person_id: string;
                                    name?: string;
                                    email?: string;
                                    avatar_url?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/key_persons`,
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
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/security_and_compliance/v1/key_persons`,
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
                                                    key_person_id: string;
                                                    name?: string;
                                                    email?: string;
                                                    avatar_url?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=key_person&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=key_person&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
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
                                    key_person_id: string;
                                    name?: string;
                                    email?: string;
                                    avatar_url?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/key_persons`,
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
         * vault_task
         */
        vaultTask: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=security_and_compliance&resource=vault_task&version=v1 document }
             */
            delete: async (
                payload?: {
                    path?: { task_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks/:task_id`,
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
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks`,
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
                                                    task_id?: string;
                                                    name?: string;
                                                    size?: string;
                                                    valid_days?: number;
                                                    create_time?: string;
                                                    extract_key?: string;
                                                    creator?: {
                                                        id: string;
                                                        name?: string;
                                                    };
                                                    files?: Array<{
                                                        name?: string;
                                                        size?: string;
                                                        url?: string;
                                                        download_url?: string;
                                                    }>;
                                                    status?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=vault_task&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
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
                                    task_id?: string;
                                    name?: string;
                                    size?: string;
                                    valid_days?: number;
                                    create_time?: string;
                                    extract_key?: string;
                                    creator?: { id: string; name?: string };
                                    files?: Array<{
                                        name?: string;
                                        size?: string;
                                        url?: string;
                                        download_url?: string;
                                    }>;
                                    status?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=create_document_vault_task&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_document_vault_task&project=security_and_compliance&resource=vault_task&version=v1 document }
             */
            createDocumentVaultTask: async (
                payload?: {
                    data?: {
                        owner_ids?: Array<string>;
                        content?: string;
                        document_status?: number;
                        document_type?: number;
                        task_name?: string;
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
                                task?: {
                                    task_id?: string;
                                    name?: string;
                                    size?: string;
                                    valid_days?: number;
                                    create_time?: string;
                                    extract_key?: string;
                                    creator?: { id: string; name?: string };
                                    files?: Array<{
                                        name?: string;
                                        size?: string;
                                        url?: string;
                                        download_url?: string;
                                    }>;
                                    status?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks/create_document_vault_task`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=create_im&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_im&project=security_and_compliance&resource=vault_task&version=v1 document }
             */
            createIm: async (
                payload?: {
                    data: {
                        owner_ids: Array<string>;
                        keywords?: Array<string>;
                        create_time_range: { start: string; end: string };
                        task_name: string;
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
                                task?: {
                                    task_id?: string;
                                    name?: string;
                                    size?: string;
                                    valid_days?: number;
                                    create_time?: string;
                                    extract_key?: string;
                                    creator?: { id: string; name?: string };
                                    files?: Array<{
                                        name?: string;
                                        size?: string;
                                        url?: string;
                                        download_url?: string;
                                    }>;
                                    status?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks/create_im`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=create_email&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_email&project=security_and_compliance&resource=vault_task&version=v1 document }
             */
            createEmail: async (
                payload?: {
                    data: {
                        task_name: string;
                        format_type: number;
                        email_filter: {
                            owner_userid_list?: Array<string>;
                            owner_address_list?: Array<string>;
                            time_range: { start: string; end: string };
                            senders?: Array<string>;
                            recipients?: Array<string>;
                            email_title?: string;
                            email_id?: string;
                        };
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
                                task?: {
                                    task_id?: string;
                                    name?: string;
                                    size?: string;
                                    valid_days?: number;
                                    create_time?: string;
                                    extract_key?: string;
                                    creator?: { id: string; name?: string };
                                    files?: Array<{
                                        name?: string;
                                        size?: string;
                                        url?: string;
                                        download_url?: string;
                                    }>;
                                    status?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks/create_email`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=vault_task&version=v1 document }
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string };
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
                                vault_task?: {
                                    task_id?: string;
                                    name?: string;
                                    size?: string;
                                    valid_days?: number;
                                    create_time?: string;
                                    extract_key?: string;
                                    creator?: { id: string; name?: string };
                                    files?: Array<{
                                        name?: string;
                                        size?: string;
                                        url?: string;
                                        download_url?: string;
                                    }>;
                                    status?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks/:task_id`,
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
         * document
         */
        document: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=document&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=document&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        owner_ids?: Array<string>;
                        content?: string;
                        document_status?: number;
                        document_type?: number;
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
                                    token: string;
                                    title?: string;
                                    update_time?: number;
                                    object_status?: number;
                                    object_type?: number;
                                    owner?: { id: string; name?: string };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/documents`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=document&apiName=create_vault_task&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_vault_task&project=security_and_compliance&resource=document&version=v1 document }
             */
            createVaultTask: async (
                payload?: {
                    data?: {
                        owner_ids?: Array<string>;
                        content?: string;
                        document_status?: number;
                        document_type?: number;
                        task_name?: string;
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
                                task?: {
                                    task_id?: string;
                                    name?: string;
                                    size?: string;
                                    valid_days?: number;
                                    create_time?: string;
                                    extract_key?: string;
                                    creator?: { id: string; name?: string };
                                    files?: Array<{
                                        name?: string;
                                        size?: string;
                                        url?: string;
                                        download_url?: string;
                                    }>;
                                    status?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/documents/create_vault_task`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=document&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=document&version=v1 document }
             */
            search: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        owner_ids?: Array<string>;
                        content?: string;
                        document_status?: number;
                        document_type?: number;
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
                                    token: string;
                                    title?: string;
                                    update_time?: number;
                                    object_status?: number;
                                    object_type?: number;
                                    owner?: { id: string; name?: string };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/documents/search`,
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
         * email
         */
        email: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=email&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=email&version=v1 document }
             */
            search: async (
                payload?: {
                    data: {
                        page_size: number;
                        page_token: string;
                        email_filter: {
                            owner_userid_list?: Array<string>;
                            owner_address_list?: Array<string>;
                            time_range: { start: string; end: string };
                            senders?: Array<string>;
                            recipients?: Array<string>;
                            email_title?: string;
                            email_id?: string;
                        };
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
                                items?: Array<{
                                    id: string;
                                    title: string;
                                    owner_type: number;
                                    create_time: string;
                                    owner_user_id: string;
                                    owner_address?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/emails/search`,
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
         * message
         */
        message: {
            searchWithIterator: async (
                payload?: {
                    data: {
                        owner_ids: Array<string>;
                        create_time_range: { start: string; end: string };
                        keywords: Array<string>;
                    };
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/security_and_compliance/v1/messages/search`,
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
                                                    open_message_id: string;
                                                    text?: string;
                                                    open_chat_id: string;
                                                    chat_name: string;
                                                    chat_type: number;
                                                    owner?: {
                                                        user_id: string;
                                                        name: string;
                                                        email: string;
                                                        avatar_url: string;
                                                    };
                                                    create_time: string;
                                                }>;
                                                has_more?: boolean;
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=message&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=message&version=v1 document }
             */
            search: async (
                payload?: {
                    data: {
                        owner_ids: Array<string>;
                        create_time_range: { start: string; end: string };
                        keywords: Array<string>;
                    };
                    params?: {
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
                                    open_message_id: string;
                                    text?: string;
                                    open_chat_id: string;
                                    chat_name: string;
                                    chat_type: number;
                                    owner?: {
                                        user_id: string;
                                        name: string;
                                        email: string;
                                        avatar_url: string;
                                    };
                                    create_time: string;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/messages/search`,
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
         * tenant_third_party_encryption_app.notification
         */
        tenantThirdPartyEncryptionAppNotification: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=tenant_third_party_encryption_app.notification&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=tenant_third_party_encryption_app.notification&version=v1 document }
             */
            create: async (
                payload?: {
                    data: { idempotent_key: string; content: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/tenant_third_party_encryption_app/notification`,
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
         * tenant_third_party_encryption_app.oauth
         */
        tenantThirdPartyEncryptionAppOauth: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=tenant_third_party_encryption_app.oauth&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=tenant_third_party_encryption_app.oauth&version=v1 document }
             */
            get: async (
                payload?: {
                    params: { code: string };
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
                            data?: { union_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/tenant_third_party_encryption_app/oauth`,
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
         * tenant_third_party_encryption_app
         */
        tenantThirdPartyEncryptionApp: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=tenant_third_party_encryption_app&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=tenant_third_party_encryption_app&version=v1 document }
             */
            update: async (
                payload?: {
                    data: {
                        vendor_name: string;
                        status: number;
                        service_start_time: string;
                        service_end_time: string;
                        config?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/tenant_third_party_encryption_app`,
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
         * download_token
         */
        downloadToken: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=download_token&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=download_token&version=v1 document }
             */
            get: async (
                payload?: {
                    params?: {
                        task_id?: string;
                        file_name?: string;
                        file_url?: string;
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
                            data?: { download_token?: { token?: string } };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/download_token`,
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
         * file
         */
        file: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=file&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=file&version=v1 document }
             */
            get: async (
                payload?: {
                    params?: {
                        token?: string;
                        type?: number;
                        im_attachment_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/file`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                        $return_headers: true,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                const checkIsReadable = () => {
                    const consumedError =
                        "The stream has already been consumed";
                    if (!res.data.readable) {
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
                            res.data.pipe(writableStream);
                        });
                    },
                    getReadableStream: () => {
                        checkIsReadable();
                        return res.data as Readable;
                    },
                    headers: res.headers,
                };
            },
        },
        /**
         * app_dlp_execute_log
         */
        appDlpExecuteLog: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        hit_policy_names?: Array<string>;
                        start_time?: string;
                        end_time?: string;
                        user_id?: string;
                        app_apply_module?: number;
                        apply_module?: number;
                        actions?: Array<number>;
                        locale?: "en-US" | "zh-CN" | "ja-JP";
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/security_and_compliance/v1/app_dlp_execute_logs`,
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
                                                    event_name?: string;
                                                    user_id?: string;
                                                    execute_time?: string;
                                                    action_name?: string;
                                                    hit_policies?: Array<string>;
                                                    entity_id?: string;
                                                    evidences?: {
                                                        keyword_hits?: Array<string>;
                                                        regular_hits?: Array<string>;
                                                        sensitive_hits?: Array<string>;
                                                    };
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=app_dlp_execute_log&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=app_dlp_execute_log&version=v1 document }
             *
             * 应用DLP执行日志导出
             *
             * 调用该接口可以导出应用DLP的执行日志，日志分片调用，pageSize请不要超过50
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        hit_policy_names?: Array<string>;
                        start_time?: string;
                        end_time?: string;
                        user_id?: string;
                        app_apply_module?: number;
                        apply_module?: number;
                        actions?: Array<number>;
                        locale?: "en-US" | "zh-CN" | "ja-JP";
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
                                    event_name?: string;
                                    user_id?: string;
                                    execute_time?: string;
                                    action_name?: string;
                                    hit_policies?: Array<string>;
                                    entity_id?: string;
                                    evidences?: {
                                        keyword_hits?: Array<string>;
                                        regular_hits?: Array<string>;
                                        sensitive_hits?: Array<string>;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/app_dlp_execute_logs`,
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
         * data_archiving.user
         */
        dataArchivingUser: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.user&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=data_archiving.user&version=v1 document }
             */
            get: async (
                payload?: {
                    params: {
                        page_token?: string;
                        page_size: number;
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
                                user_ids?: Array<string>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/user`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.user&apiName=add&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add&project=security_and_compliance&resource=data_archiving.user&version=v1 document }
             */
            add: async (
                payload?: {
                    data?: { user_ids?: Array<string> };
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
                            `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/user/add`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.user&apiName=del&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=del&project=security_and_compliance&resource=data_archiving.user&version=v1 document }
             */
            del: async (
                payload?: {
                    data?: { user_ids?: Array<string> };
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
                            `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/user/del`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.user&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=security_and_compliance&resource=data_archiving.user&version=v1 document }
             */
            delete: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/user`,
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
         * data_archiving.messages
         */
        dataArchivingMessages: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.messages&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=data_archiving.messages&version=v1 document }
             */
            create: async (
                payload?: {
                    data?: { seq_id?: string; limit?: number };
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
                                message_infos?: Array<{
                                    message_id?: string;
                                    message_type?: number;
                                    sender_info?: {
                                        type?:
                                            | "User"
                                            | "Bot"
                                            | "System"
                                            | "AI"
                                            | "Unknow";
                                        id?: string;
                                        name?: string;
                                    };
                                    receiver_ids?: Array<string>;
                                    action_type?: string;
                                    chat_id?: string;
                                    action_time?: string;
                                    is_super_chat?: boolean;
                                    is_cross_tenant_chat?: boolean;
                                    chat_name?: string;
                                    content?: string;
                                    chat_mode?: string;
                                    reaction_type?: string;
                                    parent_msg_id?: string;
                                }>;
                                seq_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/messages`,
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
         * data_archiving.downloads
         */
        dataArchivingDownloads: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.downloads&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=data_archiving.downloads&version=v1 document }
             */
            get: async (
                payload?: {
                    params?: { type?: "im_resource_file" };
                    path: { download_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/downloads/:download_id`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                        $return_headers: true,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                const checkIsReadable = () => {
                    const consumedError =
                        "The stream has already been consumed";
                    if (!res.data.readable) {
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
                            res.data.pipe(writableStream);
                        });
                    },
                    getReadableStream: () => {
                        checkIsReadable();
                        return res.data as Readable;
                    },
                    headers: res.headers,
                };
            },
        },
        /**
         * migration.entity_tasks
         */
        migrationEntityTasks: {
            searchWithIterator: async (
                payload?: {
                    data: { task_ids: Array<string> };
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/security_and_compliance/v1/migration/entity_tasks/search`,
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
                                                    task_id?: string;
                                                    task_status?:
                                                        | "create"
                                                        | "complete"
                                                        | "stop";
                                                    entity?: {
                                                        id?: string;
                                                        location?:
                                                            | "CN"
                                                            | "SG"
                                                            | "JP"
                                                            | "VA";
                                                        type?:
                                                            | "docs"
                                                            | "docx"
                                                            | "sheets"
                                                            | "base"
                                                            | "mindnotes"
                                                            | "file"
                                                            | "slides"
                                                            | "chat"
                                                            | "mailbox"
                                                            | "calendar"
                                                            | "minutes"
                                                            | "task";
                                                        creator_id?: string;
                                                        creator_type?:
                                                            | "user"
                                                            | "app";
                                                        create_time?: string;
                                                        mail_address?: string;
                                                    };
                                                    message?: string;
                                                }>;
                                                page_token: string;
                                                has_more: boolean;
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=migration.entity_tasks&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=migration.entity_tasks&version=v1 document }
             *
             * 批量查询实体迁移任务的信息
             *
             * 返回的是迁移任务的状态，及每个迁移任务中包含的实体及实体的数据驻留地等信息
             */
            search: async (
                payload?: {
                    data: { task_ids: Array<string> };
                    params?: {
                        page_token?: string;
                        page_size?: number;
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
                                    task_id?: string;
                                    task_status?:
                                        | "create"
                                        | "complete"
                                        | "stop";
                                    entity?: {
                                        id?: string;
                                        location?: "CN" | "SG" | "JP" | "VA";
                                        type?:
                                            | "docs"
                                            | "docx"
                                            | "sheets"
                                            | "base"
                                            | "mindnotes"
                                            | "file"
                                            | "slides"
                                            | "chat"
                                            | "mailbox"
                                            | "calendar"
                                            | "minutes"
                                            | "task";
                                        creator_id?: string;
                                        creator_type?: "user" | "app";
                                        create_time?: string;
                                        mail_address?: string;
                                    };
                                    message?: string;
                                }>;
                                page_token: string;
                                has_more: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/migration/entity_tasks/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=migration.entity_tasks&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=migration.entity_tasks&version=v1 document }
             *
             * 创建实体资源迁移任务
             *
             * 创建迁移实体到目标数据驻留地的任务。每一个实体的迁移，都会生成一个对应的迁移任务。其中 mailbox 和 calendar 是容器的整体迁移，不支持分段驻留。
             */
            create: async (
                payload?: {
                    data: {
                        entity_ids: Array<string>;
                        entity_type:
                            | "docs"
                            | "docx"
                            | "sheets"
                            | "base"
                            | "mindnotes"
                            | "file"
                            | "slides"
                            | "chat"
                            | "mailbox"
                            | "calendar"
                            | "minutes"
                            | "task";
                        target_location: "CN" | "SG" | "JP" | "VA";
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
                                    task_id: string;
                                    task_status?:
                                        | "create"
                                        | "complete"
                                        | "stop";
                                    entity?: {
                                        id?: string;
                                        type: string;
                                        location: "CN" | "SG" | "JP" | "VA";
                                        mail_address?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/migration/entity_tasks`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=migration.entity_tasks&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=migration.entity_tasks&version=v1 document }
             *
             * 获取一个实体迁移任务的信息
             *
             * 返回的结果是当前任务迁移的实体及实体数据驻留等信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { task_id: string };
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
                                task_id?: string;
                                task_status?: "create" | "complete" | "stop";
                                message?: string;
                                entity?: {
                                    id?: string;
                                    location?: "CN" | "SG" | "JP" | "VA";
                                    type?:
                                        | "docs"
                                        | "docx"
                                        | "sheets"
                                        | "base"
                                        | "mindnotes"
                                        | "file"
                                        | "slides"
                                        | "chat"
                                        | "mailbox"
                                        | "calendar"
                                        | "minutes"
                                        | "task";
                                    creator_id?: string;
                                    creator_type?: "user" | "app";
                                    create_time?: string;
                                    mail_address?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/migration/entity_tasks/:task_id`,
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
         * directory.creator
         */
        directoryCreator: {
            searchWithIterator: async (
                payload?: {
                    data: {
                        creator_type: "user" | "app";
                        creator_id: string;
                        entity_types: Array<
                            | "docs"
                            | "docx"
                            | "sheets"
                            | "base"
                            | "mindnotes"
                            | "file"
                            | "slides"
                            | "chat"
                            | "mailbox"
                            | "calendar"
                            | "minutes"
                            | "task"
                        >;
                        entity_location: "CN" | "SG" | "JP";
                        start_create_time?: string;
                        end_create_time?: string;
                    };
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/security_and_compliance/v1/directory/creator/search`,
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
                                                    entity_id?: string;
                                                    mail_address?: string;
                                                    entity_location?:
                                                        | "CN"
                                                        | "SG"
                                                        | "JP";
                                                    entity_create_time?: string;
                                                    entity_type?:
                                                        | "docs"
                                                        | "docx"
                                                        | "sheets"
                                                        | "base"
                                                        | "mindnotes"
                                                        | "file"
                                                        | "slides"
                                                        | "chat"
                                                        | "mailbox"
                                                        | "calendar"
                                                        | "minutes"
                                                        | "task";
                                                }>;
                                                page_token: string;
                                                has_more: boolean;
                                                creator_id?: string;
                                                creator_type?: "user" | "app";
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=directory.creator&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=directory.creator&version=v1 document }
             *
             * 批量查询业务实体资源的信息
             *
             * 批量查询业务实体资源的信息
             */
            search: async (
                payload?: {
                    data: {
                        creator_type: "user" | "app";
                        creator_id: string;
                        entity_types: Array<
                            | "docs"
                            | "docx"
                            | "sheets"
                            | "base"
                            | "mindnotes"
                            | "file"
                            | "slides"
                            | "chat"
                            | "mailbox"
                            | "calendar"
                            | "minutes"
                            | "task"
                        >;
                        entity_location: "CN" | "SG" | "JP";
                        start_create_time?: string;
                        end_create_time?: string;
                    };
                    params?: {
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
                                    entity_id?: string;
                                    mail_address?: string;
                                    entity_location?: "CN" | "SG" | "JP";
                                    entity_create_time?: string;
                                    entity_type?:
                                        | "docs"
                                        | "docx"
                                        | "sheets"
                                        | "base"
                                        | "mindnotes"
                                        | "file"
                                        | "slides"
                                        | "chat"
                                        | "mailbox"
                                        | "calendar"
                                        | "minutes"
                                        | "task";
                                }>;
                                page_token: string;
                                has_more: boolean;
                                creator_id?: string;
                                creator_type?: "user" | "app";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/directory/creator/search`,
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
         * directory.entity
         */
        directoryEntity: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=directory.entity&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=directory.entity&version=v1 document }
             *
             * 获取一个业务实体资源的信息
             *
             * 获取一个业务实体资源的信息，包括实体创建者id、实体的数据驻留地、实体的创建时间等。
             */
            get: async (
                payload?: {
                    params: {
                        entity_id: string;
                        entity_type:
                            | "docs"
                            | "docx"
                            | "sheets"
                            | "base"
                            | "mindnotes"
                            | "file"
                            | "slides"
                            | "chat"
                            | "mailbox"
                            | "calendar"
                            | "minutes"
                            | "task";
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
                                entity_type?:
                                    | "docs"
                                    | "docx"
                                    | "sheets"
                                    | "base"
                                    | "mindnotes"
                                    | "file"
                                    | "slides"
                                    | "chat"
                                    | "mailbox"
                                    | "calendar"
                                    | "minutes"
                                    | "task";
                                entity_id?: string;
                                entity_location?: "CN" | "SG" | "JP" | "VA";
                                entity_create_time?: string;
                                creator_id?: string;
                                creator_type?: "user" | "app";
                                mail_address?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/directory/entity`,
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
         * device_record
         */
        deviceRecord: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=security_and_compliance&resource=device_record&version=v1 document }
             *
             * 删除设备
             *
             * 使用该接口在设备管理中删除一台设备
             */
            delete: async (
                payload?: {
                    path: { device_record_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/device_records/:device_record_id`,
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
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        device_record_id?: string;
                        user_id?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        device_name?: string;
                        serial_number?: string;
                        uuid?: string;
                        mac_address?: string;
                        imei?: string;
                        android_id?: string;
                        google_aid?: string;
                        idfa?: string;
                        idfv?: string;
                        device_ownership?: string;
                        device_credibility?: string;
                        device_terminal_type?: string;
                        device_source?: string;
                        disk_serial_number?: string;
                        aaid?: string;
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
                                `${this.domain}/open-apis/security_and_compliance/v1/device_records`,
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
                                                    device_record_id?: string;
                                                    device_terminal_type?:
                                                        | "Unknown"
                                                        | "PC"
                                                        | "Mobile";
                                                    device_system?:
                                                        | "Windows"
                                                        | "Android"
                                                        | "MacOS"
                                                        | "iOS"
                                                        | "Linux"
                                                        | "Harmony"
                                                        | "OpenHarmony";
                                                    model?: string;
                                                    device_name?: string;
                                                    serial_number?: string;
                                                    uuid?: string;
                                                    mac_address?: string;
                                                    imei?: string;
                                                    android_id?: string;
                                                    google_aid?: string;
                                                    idfa?: string;
                                                    idfv?: string;
                                                    device_ownership:
                                                        | "Unknown"
                                                        | "Personal"
                                                        | "Company";
                                                    device_source?: string;
                                                    register_time?: string;
                                                    device_credibility:
                                                        | "Unknown"
                                                        | "Credible"
                                                        | "Uncredible";
                                                    version?: string;
                                                    disk_serial_number?: string;
                                                    aaid?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=device_record&version=v1 document }
             *
             * 获取设备信息
             *
             * 使用该接口在设备管理中获取设备的设备参数、设备归属、设备状态等信息
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        device_record_id?: string;
                        user_id?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        device_name?: string;
                        serial_number?: string;
                        uuid?: string;
                        mac_address?: string;
                        imei?: string;
                        android_id?: string;
                        google_aid?: string;
                        idfa?: string;
                        idfv?: string;
                        device_ownership?: string;
                        device_credibility?: string;
                        device_terminal_type?: string;
                        device_source?: string;
                        disk_serial_number?: string;
                        aaid?: string;
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
                                    device_record_id?: string;
                                    device_terminal_type?:
                                        | "Unknown"
                                        | "PC"
                                        | "Mobile";
                                    device_system?:
                                        | "Windows"
                                        | "Android"
                                        | "MacOS"
                                        | "iOS"
                                        | "Linux"
                                        | "Harmony"
                                        | "OpenHarmony";
                                    model?: string;
                                    device_name?: string;
                                    serial_number?: string;
                                    uuid?: string;
                                    mac_address?: string;
                                    imei?: string;
                                    android_id?: string;
                                    google_aid?: string;
                                    idfa?: string;
                                    idfv?: string;
                                    device_ownership:
                                        | "Unknown"
                                        | "Personal"
                                        | "Company";
                                    device_source?: string;
                                    register_time?: string;
                                    device_credibility:
                                        | "Unknown"
                                        | "Credible"
                                        | "Uncredible";
                                    version?: string;
                                    disk_serial_number?: string;
                                    aaid?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/device_records`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=device_record&version=v1 document }
             *
             * 新增设备
             *
             * 使用该接口在设备管理中新增一台设备。新增设备的类型为管理员导入
             */
            create: async (
                payload?: {
                    data: {
                        device_record_id?: string;
                        device_terminal_type?: "Unknown" | "PC" | "Mobile";
                        device_system:
                            | "Windows"
                            | "Android"
                            | "MacOS"
                            | "iOS"
                            | "Linux"
                            | "Harmony"
                            | "OpenHarmony";
                        model?: string;
                        device_name?: string;
                        serial_number?: string;
                        uuid?: string;
                        mac_address?: string;
                        imei?: string;
                        android_id?: string;
                        google_aid?: string;
                        idfa?: string;
                        idfv?: string;
                        device_ownership: "Unknown" | "Personal" | "Company";
                        device_source?: string;
                        register_time?: string;
                        device_credibility:
                            | "Unknown"
                            | "Credible"
                            | "Uncredible";
                        version?: string;
                        disk_serial_number?: string;
                        aaid?: string;
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
                            data?: { device_record_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/device_records`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=device_record&version=v1 document }
             *
             * 更新设备
             *
             * 使用该接口在设备管理中修改一台设备的设备归属、设备状态等信息
             */
            update: async (
                payload?: {
                    data: {
                        device_terminal_type?: "Unknown" | "PC" | "Mobile";
                        device_system?:
                            | "Windows"
                            | "Android"
                            | "MacOS"
                            | "iOS"
                            | "Linux"
                            | "Harmony"
                            | "OpenHarmony";
                        model?: string;
                        device_name?: string;
                        serial_number?: string;
                        uuid?: string;
                        mac_address?: string;
                        imei?: string;
                        android_id?: string;
                        google_aid?: string;
                        idfa?: string;
                        idfv?: string;
                        device_ownership: "Unknown" | "Personal" | "Company";
                        device_source?: string;
                        register_time?: string;
                        device_credibility:
                            | "Unknown"
                            | "Credible"
                            | "Uncredible";
                        version?: string;
                        disk_serial_number?: string;
                        aaid?: string;
                    };
                    path: { device_record_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/device_records/:device_record_id`,
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
         * device_apply_record
         */
        deviceApplyRecord: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_apply_record&apiName=approve&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=approve&project=security_and_compliance&resource=device_apply_record&version=v1 document }
             *
             * 审核设备
             *
             * 使用该接口在设备管理中通过或驳回一条成员自主申报申请
             */
            approve: async (
                payload?: {
                    data: { apply_id: string; pass: boolean };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/device_apply_record/approve`,
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
         * openapi_log
         */
        openapiLog: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=openapi_log&apiName=list_data&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_data&project=security_and_compliance&resource=openapi_log&version=v1 document }
             *
             * 获取OpenAPI审计日志数据
             *
             * 该接口用于获取OpenAPI审计日志数据
             */
            listData: async (
                payload?: {
                    data?: {
                        api_keys?: Array<string>;
                        start_time?: number;
                        end_time?: number;
                        app_id?: string;
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
                                    id: string;
                                    api_key: string;
                                    event_time?: number;
                                    app_id?: string;
                                    ip?: string;
                                    log_detail?: {
                                        path?: string;
                                        method?: string;
                                        query_param?: string;
                                        payload?: string;
                                        status_code?: number;
                                        response?: string;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/openapi_logs/list_data`,
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
         * people_log
         */
        peopleLog: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        latest?: number;
                        oldest?: number;
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
                                `${this.domain}/open-apis/security_and_compliance/v1/people_logs`,
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    event_name: string;
                                                    department_ids?: Array<string>;
                                                    event_module: number;
                                                    operator_type?: number;
                                                    operator_value?: string;
                                                    objects?: Array<{
                                                        object_type?: string;
                                                        object_value?: string;
                                                        object_detail?: {
                                                            clone_source?: string;
                                                            text_detail?: string;
                                                            file_name?: string;
                                                            third_party_appID?: string;
                                                            contain_file_num?: number;
                                                            permission_setting_type?: string;
                                                            permission_external_access_Type?: boolean;
                                                            permission_share_type?: string;
                                                            file_service_source?: string;
                                                            okr_download_content?: string;
                                                            container_type?: string;
                                                            container_id?: string;
                                                            current_page?: string;
                                                        };
                                                        object_name?: string;
                                                        object_owner?: string;
                                                    }>;
                                                    recipients?: Array<{
                                                        recipient_type?: string;
                                                        recipient_value?: string;
                                                        recipient_detail?: {
                                                            permission_action_type?: string;
                                                        };
                                                    }>;
                                                    event_time?: number;
                                                    ip?: string;
                                                    operator_app?: string;
                                                    audit_context?: {
                                                        terminal_type?: number;
                                                        ios_context?: {
                                                            udid?: string;
                                                            did?: string;
                                                            app_ver?: string;
                                                            ver?: string;
                                                            os?: string;
                                                            STZone?: string;
                                                            ML?: string;
                                                            sjd?: string;
                                                            proxyip?: string;
                                                            wifip?: string;
                                                            location?: string;
                                                            active_ip?: string;
                                                            active_ip_detail?: string;
                                                            cell_base_station?: string;
                                                            IP?: string;
                                                        };
                                                        pc_context?: {
                                                            udid?: string;
                                                            did?: string;
                                                            app_ver?: string;
                                                            ver?: string;
                                                            os?: string;
                                                            wifip?: string;
                                                            region?: string;
                                                            IP?: string;
                                                        };
                                                        web_context?: {
                                                            user_agent?: string;
                                                            IP?: string;
                                                        };
                                                        android_context?: {
                                                            udid?: string;
                                                            did?: string;
                                                            app_ver?: string;
                                                            ver?: string;
                                                            region?: string;
                                                            id_i?: string;
                                                            id_r?: string;
                                                            hw_brand?: string;
                                                            hw_manuf?: string;
                                                            wifip?: string;
                                                            route_iip?: string;
                                                            route_gip?: string;
                                                            env_su?: string;
                                                            env_tz?: string;
                                                            env_ml?: string;
                                                            location?: string;
                                                            active_ip?: string;
                                                            active_ip_detail?: string;
                                                            cell_base_station?: string;
                                                            IP?: string;
                                                        };
                                                    };
                                                    extend?: {
                                                        comment_type?: string;
                                                        app_detail?: string;
                                                        two_step_validation?: boolean;
                                                        login_method?: string;
                                                        new_people_num_in_video?: number;
                                                        external_people_num_in_video?: number;
                                                        external_people_num_in_chat?: number;
                                                        join_group?: number;
                                                        quit_group?: number;
                                                        external_people_num_in_doc_share?: number;
                                                    };
                                                    event_id?: string;
                                                    operator_app_name?: string;
                                                    unique_id?: string;
                                                    common_drawers?: {
                                                        common_draw_info_list?: Array<{
                                                            info_key?: string;
                                                            info_val?: string;
                                                            key_i18n_key?: string;
                                                            val_type?: string;
                                                            val_i18n_key?: string;
                                                        }>;
                                                    };
                                                    audit_detail?: {
                                                        mc?: string;
                                                        device_model?: string;
                                                        os?: string;
                                                        city?: string;
                                                    };
                                                    operator_tenant?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=people_log&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=people_log&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
                        latest?: number;
                        oldest?: number;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    event_name: string;
                                    department_ids?: Array<string>;
                                    event_module: number;
                                    operator_type?: number;
                                    operator_value?: string;
                                    objects?: Array<{
                                        object_type?: string;
                                        object_value?: string;
                                        object_detail?: {
                                            clone_source?: string;
                                            text_detail?: string;
                                            file_name?: string;
                                            third_party_appID?: string;
                                            contain_file_num?: number;
                                            permission_setting_type?: string;
                                            permission_external_access_Type?: boolean;
                                            permission_share_type?: string;
                                            file_service_source?: string;
                                            okr_download_content?: string;
                                            container_type?: string;
                                            container_id?: string;
                                            current_page?: string;
                                        };
                                        object_name?: string;
                                        object_owner?: string;
                                    }>;
                                    recipients?: Array<{
                                        recipient_type?: string;
                                        recipient_value?: string;
                                        recipient_detail?: {
                                            permission_action_type?: string;
                                        };
                                    }>;
                                    event_time?: number;
                                    ip?: string;
                                    operator_app?: string;
                                    audit_context?: {
                                        terminal_type?: number;
                                        ios_context?: {
                                            udid?: string;
                                            did?: string;
                                            app_ver?: string;
                                            ver?: string;
                                            os?: string;
                                            STZone?: string;
                                            ML?: string;
                                            sjd?: string;
                                            proxyip?: string;
                                            wifip?: string;
                                            location?: string;
                                            active_ip?: string;
                                            active_ip_detail?: string;
                                            cell_base_station?: string;
                                            IP?: string;
                                        };
                                        pc_context?: {
                                            udid?: string;
                                            did?: string;
                                            app_ver?: string;
                                            ver?: string;
                                            os?: string;
                                            wifip?: string;
                                            region?: string;
                                            IP?: string;
                                        };
                                        web_context?: {
                                            user_agent?: string;
                                            IP?: string;
                                        };
                                        android_context?: {
                                            udid?: string;
                                            did?: string;
                                            app_ver?: string;
                                            ver?: string;
                                            region?: string;
                                            id_i?: string;
                                            id_r?: string;
                                            hw_brand?: string;
                                            hw_manuf?: string;
                                            wifip?: string;
                                            route_iip?: string;
                                            route_gip?: string;
                                            env_su?: string;
                                            env_tz?: string;
                                            env_ml?: string;
                                            location?: string;
                                            active_ip?: string;
                                            active_ip_detail?: string;
                                            cell_base_station?: string;
                                            IP?: string;
                                        };
                                    };
                                    extend?: {
                                        comment_type?: string;
                                        app_detail?: string;
                                        two_step_validation?: boolean;
                                        login_method?: string;
                                        new_people_num_in_video?: number;
                                        external_people_num_in_video?: number;
                                        external_people_num_in_chat?: number;
                                        join_group?: number;
                                        quit_group?: number;
                                        external_people_num_in_doc_share?: number;
                                    };
                                    event_id?: string;
                                    operator_app_name?: string;
                                    unique_id?: string;
                                    common_drawers?: {
                                        common_draw_info_list?: Array<{
                                            info_key?: string;
                                            info_val?: string;
                                            key_i18n_key?: string;
                                            val_type?: string;
                                            val_i18n_key?: string;
                                        }>;
                                    };
                                    audit_detail?: {
                                        mc?: string;
                                        device_model?: string;
                                        os?: string;
                                        city?: string;
                                    };
                                    operator_tenant?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/people_logs`,
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
         * aud_admin_log
         */
        audAdminLog: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        latest?: string;
                        oldest?: string;
                        user_id?: string;
                        category_name?: string;
                        event_name?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
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
                                `${this.domain}/open-apis/security_and_compliance/v1/aud_admin_logs`,
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
                                                    unique_id: string;
                                                    user_id: string;
                                                    category_name: string;
                                                    event_name: string;
                                                    ip_address: string;
                                                    create_time?: string;
                                                    content?: string;
                                                    operation_status: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=aud_admin_log&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=aud_admin_log&version=v1 document }
             *
             * 获取管理员日志
             *
             * 调用该接口需要申请获取管理员后台的管理员行为日志权限，并且只有企业自建应用才有权限调用此接口。;注意：当前接口为灰度申请可用，请联系客服开通灰度
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        latest?: string;
                        oldest?: string;
                        user_id?: string;
                        category_name?: string;
                        event_name?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
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
                                    unique_id: string;
                                    user_id: string;
                                    category_name: string;
                                    event_name: string;
                                    ip_address: string;
                                    create_time?: string;
                                    content?: string;
                                    operation_status: number;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/aud_admin_logs`,
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
         * file_risk_detection_record.result
         */
        fileRiskDetectionRecordResult: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=file_risk_detection_record.result&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=file_risk_detection_record.result&version=v1 document }
             *
             * 更新检测结果
             *
             * 更新检测结果
             */
            update: async (
                payload?: {
                    data: {
                        status: "FINISHED" | "FINISHED_WITH_ERR";
                        risk_tag: "RISK" | "NON_RISK" | "NOT_DETECT";
                        need_bot_notify: boolean;
                    };
                    path: { record_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/file_risk_detection_records/:record_id/result`,
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
         * user_migration
         */
        userMigration: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=cancel&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=security_and_compliance&resource=user_migration&version=v1 document }
             *
             * 取消用户迁移任务
             *
             * 取消用户迁移任务，仅能对未启动迁移的用户做此操作。用户迁移状态可通过「获取单个用户迁移状态」查询。
             */
            cancel: async (
                payload?: {
                    data: { user_ids: Array<string> };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/cancel`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=user_migration&version=v1 document }
             *
             * 获取单个用户迁移状态
             *
             * 通过user_id获取指定用户当前的迁移状态
             */
            get: async (
                payload?: {
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
                    };
                    path: { user_id: string };
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
                                user_migration?: {
                                    user_id?: string;
                                    dest_geo?: string;
                                    task_id?: string;
                                    status?: "0" | "1" | "2";
                                    progress?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/:user_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=user_migration&version=v1 document }
             *
             * 批量获取用户迁移状态
             *
             * 传入用户 ID 列表，批量获取用户迁移状态
             */
            search: async (
                payload?: {
                    data: { user_ids: Array<string> };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
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
                                    dest_geo?: string;
                                    task_id?: string;
                                    status?: "0" | "1" | "2";
                                    progress?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=user_migration&version=v1 document }
             *
             * 迁移用户数据驻留位置
             *
             * 将用户的数据驻留位置迁移到目标地理位置。
             */
            create: async (
                payload?: {
                    data: { user_ids: Array<string>; dest_geo: string };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
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
                                user_migrations?: Array<{
                                    user_id?: string;
                                    dest_geo?: string;
                                    task_id?: string;
                                    status?: "0" | "1" | "2";
                                    progress?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/user_migrations`,
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
         * file_risk_detection_record
         */
        fileRiskDetectionRecord: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=file_risk_detection_record&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=file_risk_detection_record&version=v1 document }
             *
             * 获取检测记录
             *
             * 获取检测记录
             */
            get: async (
                payload?: {
                    path: { record_id: string };
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
                                file_risk_detection_record?: {
                                    record_id: string;
                                    file_url: string;
                                    file_url_expire_time: string;
                                    file_size: string;
                                    trigger_reason: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/file_risk_detection_records/:record_id`,
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
         * multi_geo_entity.tenant
         */
        multiGeoEntityTenant: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=multi_geo_entity.tenant&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=multi_geo_entity.tenant&version=v1 document }
             *
             * 获取数据驻留地理位置列表
             *
             * 获取租户可用的数据驻留地理位置列表
             */
            get: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                tenant?: {
                                    available_geo_locations: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/multi_geo_entity/tenant`,
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
         * dlp_skg_execute_log
         */
        dlpSkgExecuteLog: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=dlp_skg_execute_log&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=dlp_skg_execute_log&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        apply_module?: number;
                        actions?: Array<number>;
                        user_id?: string;
                        start_time: string;
                        end_time: string;
                        locale?: "zh-CN" | "en-US" | "ja-JP";
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
                                    applicable_service?: string;
                                    user_name?: string;
                                    user_id?: string;
                                    trigger?: string;
                                    time?: string;
                                    system_action?: string;
                                    sender_name?: string;
                                    sender_id?: string;
                                    recipient_name?: string;
                                    recipient_id?: string;
                                    chat_name?: string;
                                    chat_id?: string;
                                    message_id?: string;
                                    message_content?: string;
                                    alias_ingroup?: string;
                                    group_description?: string;
                                    group_tab_content?: string;
                                    file_name?: string;
                                    file_key?: string;
                                    document_owner_name?: string;
                                    document_owner_id?: string;
                                    document_name?: string;
                                    document_type?: string;
                                    document_link?: string;
                                    evidence_detail?: {
                                        keyword_hits?: Array<string>;
                                        regular_hits?: Array<string>;
                                        sensitive_hits?: Array<string>;
                                        file_size_hits?: Array<string>;
                                        file_type_hits?: Array<string>;
                                        file_name_ext_hits?: Array<string>;
                                        trigger_snippets?: Array<{
                                            policy_id?: string;
                                            detect_mode_proof_contexts?: Array<{
                                                detect_mode?: number;
                                                detect_name?: string;
                                                proof_contexts?: Array<{
                                                    hit_content?: string;
                                                    context_snippet?: string;
                                                }>;
                                                hit_count?: number;
                                            }>;
                                        }>;
                                        secure_label_hits?: Array<string>;
                                    };
                                    hit_policies?: Array<{
                                        policy_id?: string;
                                        policy_name?: string;
                                    }>;
                                    file_token?: string;
                                    trigger_event_type?: string;
                                    chat_type?: string;
                                    group_owner_name?: string;
                                    group_owner_id?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/dlp_skg_execute_log`,
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
         * dlp_execute_log
         */
        dlpExecuteLog: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=dlp_execute_log&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=dlp_execute_log&version=v1 document }
             *
             * DLP系统执行日志导出
             *
             * 用于导出系统执行日志
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        apply_module?: number;
                        actions?: Array<number>;
                        user_id?: string;
                        start_time: string;
                        end_time: string;
                        locale?: "zh-CN" | "en-US" | "ja-JP";
                        engine_type?: number;
                        include_system_log?: boolean;
                        policy_name?: string;
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
                                    applicable_service?: string;
                                    user_name?: string;
                                    user_id?: string;
                                    trigger?: string;
                                    time?: string;
                                    system_action?: string;
                                    sender_name?: string;
                                    sender_id?: string;
                                    recipient_name?: string;
                                    recipient_id?: string;
                                    chat_name?: string;
                                    chat_id?: string;
                                    message_id?: string;
                                    message_content?: string;
                                    alias_ingroup?: string;
                                    group_description?: string;
                                    group_tab_content?: string;
                                    file_name?: string;
                                    file_key?: string;
                                    document_owner_name?: string;
                                    document_owner_id?: string;
                                    document_name?: string;
                                    document_type?: string;
                                    document_link?: string;
                                    evidence_detail?: {
                                        keyword_hits?: Array<string>;
                                        regular_hits?: Array<string>;
                                        sensitive_hits?: Array<string>;
                                        file_size_hits?: Array<string>;
                                        file_type_hits?: Array<string>;
                                        file_name_ext_hits?: Array<string>;
                                        trigger_snippets?: Array<{
                                            policy_id?: string;
                                            detect_mode_proof_contexts?: Array<{
                                                detect_mode?: number;
                                                detect_name?: string;
                                                proof_contexts?: Array<{
                                                    hit_content?: string;
                                                    context_snippet?: string;
                                                }>;
                                                hit_count?: number;
                                            }>;
                                        }>;
                                        secure_label_hits?: Array<string>;
                                    };
                                    hit_policies?: Array<{
                                        policy_id?: string;
                                        policy_name?: string;
                                    }>;
                                    file_token?: string;
                                    trigger_event_type?: string;
                                    chat_type?: string;
                                    group_owner_name?: string;
                                    group_owner_id?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/dlp_execute_logs`,
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
         * policy_log
         */
        policyLog: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=policy_log&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=policy_log&version=v1 document }
             *
             * 策略日志
             */
            get: async (
                payload?: {
                    params?: {
                        latest?: string;
                        oldest?: string;
                        page_token?: string;
                        page_size?: number;
                        user_id?: string;
                        actions?: Array<string>;
                        policy_name?: string;
                        resource?: string;
                        locale?: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    user_id?: string;
                                    user_name?: string;
                                    action?: string;
                                    resource?: string;
                                    event_time?: string;
                                    condition?: string;
                                    policy_infos?: Array<{
                                        policy_id?: string;
                                        policy_name?: string;
                                    }>;
                                    system_action?: string;
                                    hit_contents?: Array<{
                                        field_key?: string;
                                        field_value?: string;
                                    }>;
                                    proof_details?: Array<{
                                        detect_mode?: number;
                                        detect_proof_contexts?: Array<{
                                            detect_name?: string;
                                            proof_contexts?: Array<{
                                                prefix?: string;
                                                content?: string;
                                                suffix?: string;
                                            }>;
                                        }>;
                                    }>;
                                    detect_rules?: Array<{
                                        rule_id?: string;
                                        rule_version?: number;
                                        rule_name?: string;
                                    }>;
                                    resource_attributes?: Array<{
                                        resource_key?: string;
                                        resource_id?: string;
                                        resource_value?: string;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/policy_log`,
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
         * pdl_info
         */
        pdlInfo: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=pdl_info&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=security_and_compliance&resource=pdl_info&version=v1 document }
             *
             * 查询用户pdl时间线信息
             *
             * 传入open_id，返回对应用户的pdl（数据预期驻留地）时间线信息
             */
            query: async (
                payload?: {
                    data: {
                        user_open_ids: Array<string>;
                        pdl_time_range?: { start: string; end: string };
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
                                user_pdl_infos?: Array<{
                                    id?: string;
                                    infos?: Array<{
                                        pdl?: number;
                                        timestamp_range?: {
                                            start: string;
                                            end: string;
                                        };
                                    }>;
                                }>;
                                failed_infos?: Array<{
                                    id?: string;
                                    code?: number;
                                    msg?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/pdl_info/query`,
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
         * geo_info
         */
        geoInfo: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=geo_info&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=security_and_compliance&resource=geo_info&version=v1 document }
             *
             * 查询实体位置
             *
             * 传入对应实体标识，查询该实体所在geo的信息。
             */
            query: async (
                payload?: {
                    data: { entity_type: string; entity_ids: Array<string> };
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
                                geo_infos?: Array<{
                                    id?: string;
                                    geo?: string;
                                }>;
                                failed_infos?: Array<{
                                    id?: string;
                                    code?: number;
                                    msg?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/geo_info/query`,
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
         * audit_info.behavior
         */
        auditInfoBehavior: {
            groupWithIterator: async (
                payload?: {
                    data?: {
                        filter?: {
                            latest?: number;
                            oldest?: number;
                            event_name?: string;
                            operator_type?: number;
                            operator_value?: string;
                            event_module?: number;
                            object_type?: number;
                            object_value?: string;
                        };
                        group_bys?: Array<string>;
                        order_bys?: Array<{
                            field?: string;
                            direction?: string;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/security_and_compliance/v1/audit_info/behavior/group`,
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    count?: number;
                                                    event_name?: string;
                                                    event_name_id?: number;
                                                    event_module?: number;
                                                    operator_type?: number;
                                                    operator_value?: string;
                                                    object_type?: number;
                                                    object_value?: string;
                                                    object_tenant?: string;
                                                    ip?: string;
                                                    audit_detail?: {
                                                        mc?: string;
                                                        device_model?: string;
                                                        os?: string;
                                                        city?: string;
                                                    };
                                                    operator_tenant?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=audit_info.behavior&apiName=group&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=group&project=security_and_compliance&resource=audit_info.behavior&version=v1 document }
             *
             * ## 功能介绍;对用户行为数据进行分组聚合分析，支持按指定维度分组、筛选条件过滤及排序规则，用于安全合规场景下的行为趋势统计、风险行为聚类等分析需求。
             */
            group: async (
                payload?: {
                    data?: {
                        filter?: {
                            latest?: number;
                            oldest?: number;
                            event_name?: string;
                            operator_type?: number;
                            operator_value?: string;
                            event_module?: number;
                            object_type?: number;
                            object_value?: string;
                        };
                        group_bys?: Array<string>;
                        order_bys?: Array<{
                            field?: string;
                            direction?: string;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    count?: number;
                                    event_name?: string;
                                    event_name_id?: number;
                                    event_module?: number;
                                    operator_type?: number;
                                    operator_value?: string;
                                    object_type?: number;
                                    object_value?: string;
                                    object_tenant?: string;
                                    ip?: string;
                                    audit_detail?: {
                                        mc?: string;
                                        device_model?: string;
                                        os?: string;
                                        city?: string;
                                    };
                                    operator_tenant?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/audit_info/behavior/group`,
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
        v1: {
            /**
             * key_person
             */
            keyPerson: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=key_person&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=security_and_compliance&resource=key_person&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { key_person_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v1/key_persons/:key_person_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=key_person&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=key_person&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: { key_person_id: string };
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
                                    key_person?: {
                                        key_person_id: string;
                                        name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/key_persons`,
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
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/security_and_compliance/v1/key_persons`,
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
                                                        key_person_id: string;
                                                        name?: string;
                                                        email?: string;
                                                        avatar_url?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=key_person&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=key_person&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
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
                                        key_person_id: string;
                                        name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/key_persons`,
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
             * vault_task
             */
            vaultTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=security_and_compliance&resource=vault_task&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        path?: { task_id?: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks/:task_id`,
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
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks`,
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
                                                        task_id?: string;
                                                        name?: string;
                                                        size?: string;
                                                        valid_days?: number;
                                                        create_time?: string;
                                                        extract_key?: string;
                                                        creator?: {
                                                            id: string;
                                                            name?: string;
                                                        };
                                                        files?: Array<{
                                                            name?: string;
                                                            size?: string;
                                                            url?: string;
                                                            download_url?: string;
                                                        }>;
                                                        status?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=vault_task&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
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
                                        task_id?: string;
                                        name?: string;
                                        size?: string;
                                        valid_days?: number;
                                        create_time?: string;
                                        extract_key?: string;
                                        creator?: { id: string; name?: string };
                                        files?: Array<{
                                            name?: string;
                                            size?: string;
                                            url?: string;
                                            download_url?: string;
                                        }>;
                                        status?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=create_document_vault_task&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_document_vault_task&project=security_and_compliance&resource=vault_task&version=v1 document }
                 */
                createDocumentVaultTask: async (
                    payload?: {
                        data?: {
                            owner_ids?: Array<string>;
                            content?: string;
                            document_status?: number;
                            document_type?: number;
                            task_name?: string;
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
                                    task?: {
                                        task_id?: string;
                                        name?: string;
                                        size?: string;
                                        valid_days?: number;
                                        create_time?: string;
                                        extract_key?: string;
                                        creator?: { id: string; name?: string };
                                        files?: Array<{
                                            name?: string;
                                            size?: string;
                                            url?: string;
                                            download_url?: string;
                                        }>;
                                        status?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks/create_document_vault_task`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=create_im&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_im&project=security_and_compliance&resource=vault_task&version=v1 document }
                 */
                createIm: async (
                    payload?: {
                        data: {
                            owner_ids: Array<string>;
                            keywords?: Array<string>;
                            create_time_range: { start: string; end: string };
                            task_name: string;
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
                                    task?: {
                                        task_id?: string;
                                        name?: string;
                                        size?: string;
                                        valid_days?: number;
                                        create_time?: string;
                                        extract_key?: string;
                                        creator?: { id: string; name?: string };
                                        files?: Array<{
                                            name?: string;
                                            size?: string;
                                            url?: string;
                                            download_url?: string;
                                        }>;
                                        status?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks/create_im`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=create_email&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_email&project=security_and_compliance&resource=vault_task&version=v1 document }
                 */
                createEmail: async (
                    payload?: {
                        data: {
                            task_name: string;
                            format_type: number;
                            email_filter: {
                                owner_userid_list?: Array<string>;
                                owner_address_list?: Array<string>;
                                time_range: { start: string; end: string };
                                senders?: Array<string>;
                                recipients?: Array<string>;
                                email_title?: string;
                                email_id?: string;
                            };
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
                                    task?: {
                                        task_id?: string;
                                        name?: string;
                                        size?: string;
                                        valid_days?: number;
                                        create_time?: string;
                                        extract_key?: string;
                                        creator?: { id: string; name?: string };
                                        files?: Array<{
                                            name?: string;
                                            size?: string;
                                            url?: string;
                                            download_url?: string;
                                        }>;
                                        status?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks/create_email`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=vault_task&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string };
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
                                    vault_task?: {
                                        task_id?: string;
                                        name?: string;
                                        size?: string;
                                        valid_days?: number;
                                        create_time?: string;
                                        extract_key?: string;
                                        creator?: { id: string; name?: string };
                                        files?: Array<{
                                            name?: string;
                                            size?: string;
                                            url?: string;
                                            download_url?: string;
                                        }>;
                                        status?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/vault_tasks/:task_id`,
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
             * document
             */
            document: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=document&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=document&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            owner_ids?: Array<string>;
                            content?: string;
                            document_status?: number;
                            document_type?: number;
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
                                        token: string;
                                        title?: string;
                                        update_time?: number;
                                        object_status?: number;
                                        object_type?: number;
                                        owner?: { id: string; name?: string };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/documents`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=document&apiName=create_vault_task&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_vault_task&project=security_and_compliance&resource=document&version=v1 document }
                 */
                createVaultTask: async (
                    payload?: {
                        data?: {
                            owner_ids?: Array<string>;
                            content?: string;
                            document_status?: number;
                            document_type?: number;
                            task_name?: string;
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
                                    task?: {
                                        task_id?: string;
                                        name?: string;
                                        size?: string;
                                        valid_days?: number;
                                        create_time?: string;
                                        extract_key?: string;
                                        creator?: { id: string; name?: string };
                                        files?: Array<{
                                            name?: string;
                                            size?: string;
                                            url?: string;
                                            download_url?: string;
                                        }>;
                                        status?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/documents/create_vault_task`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=document&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=document&version=v1 document }
                 */
                search: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            owner_ids?: Array<string>;
                            content?: string;
                            document_status?: number;
                            document_type?: number;
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
                                        token: string;
                                        title?: string;
                                        update_time?: number;
                                        object_status?: number;
                                        object_type?: number;
                                        owner?: { id: string; name?: string };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/documents/search`,
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
             * email
             */
            email: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=email&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=email&version=v1 document }
                 */
                search: async (
                    payload?: {
                        data: {
                            page_size: number;
                            page_token: string;
                            email_filter: {
                                owner_userid_list?: Array<string>;
                                owner_address_list?: Array<string>;
                                time_range: { start: string; end: string };
                                senders?: Array<string>;
                                recipients?: Array<string>;
                                email_title?: string;
                                email_id?: string;
                            };
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
                                    items?: Array<{
                                        id: string;
                                        title: string;
                                        owner_type: number;
                                        create_time: string;
                                        owner_user_id: string;
                                        owner_address?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/emails/search`,
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
             * message
             */
            message: {
                searchWithIterator: async (
                    payload?: {
                        data: {
                            owner_ids: Array<string>;
                            create_time_range: { start: string; end: string };
                            keywords: Array<string>;
                        };
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/security_and_compliance/v1/messages/search`,
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
                                                        open_message_id: string;
                                                        text?: string;
                                                        open_chat_id: string;
                                                        chat_name: string;
                                                        chat_type: number;
                                                        owner?: {
                                                            user_id: string;
                                                            name: string;
                                                            email: string;
                                                            avatar_url: string;
                                                        };
                                                        create_time: string;
                                                    }>;
                                                    has_more?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=message&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=message&version=v1 document }
                 */
                search: async (
                    payload?: {
                        data: {
                            owner_ids: Array<string>;
                            create_time_range: { start: string; end: string };
                            keywords: Array<string>;
                        };
                        params?: {
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
                                        open_message_id: string;
                                        text?: string;
                                        open_chat_id: string;
                                        chat_name: string;
                                        chat_type: number;
                                        owner?: {
                                            user_id: string;
                                            name: string;
                                            email: string;
                                            avatar_url: string;
                                        };
                                        create_time: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/messages/search`,
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
             * tenant_third_party_encryption_app.notification
             */
            tenantThirdPartyEncryptionAppNotification: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=tenant_third_party_encryption_app.notification&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=tenant_third_party_encryption_app.notification&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: { idempotent_key: string; content: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v1/tenant_third_party_encryption_app/notification`,
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
             * tenant_third_party_encryption_app.oauth
             */
            tenantThirdPartyEncryptionAppOauth: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=tenant_third_party_encryption_app.oauth&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=tenant_third_party_encryption_app.oauth&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params: { code: string };
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
                                data?: { union_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/tenant_third_party_encryption_app/oauth`,
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
             * tenant_third_party_encryption_app
             */
            tenantThirdPartyEncryptionApp: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=tenant_third_party_encryption_app&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=tenant_third_party_encryption_app&version=v1 document }
                 */
                update: async (
                    payload?: {
                        data: {
                            vendor_name: string;
                            status: number;
                            service_start_time: string;
                            service_end_time: string;
                            config?: string;
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
                                `${this.domain}/open-apis/security_and_compliance/v1/tenant_third_party_encryption_app`,
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
             * download_token
             */
            downloadToken: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=download_token&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=download_token&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            task_id?: string;
                            file_name?: string;
                            file_url?: string;
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
                                data?: { download_token?: { token?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/download_token`,
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
             * file
             */
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=file&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=file&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            token?: string;
                            type?: number;
                            im_attachment_id?: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/file`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
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
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
            },
            /**
             * app_dlp_execute_log
             */
            appDlpExecuteLog: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            hit_policy_names?: Array<string>;
                            start_time?: string;
                            end_time?: string;
                            user_id?: string;
                            app_apply_module?: number;
                            apply_module?: number;
                            actions?: Array<number>;
                            locale?: "en-US" | "zh-CN" | "ja-JP";
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/security_and_compliance/v1/app_dlp_execute_logs`,
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
                                                        event_name?: string;
                                                        user_id?: string;
                                                        execute_time?: string;
                                                        action_name?: string;
                                                        hit_policies?: Array<string>;
                                                        entity_id?: string;
                                                        evidences?: {
                                                            keyword_hits?: Array<string>;
                                                            regular_hits?: Array<string>;
                                                            sensitive_hits?: Array<string>;
                                                        };
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=app_dlp_execute_log&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=app_dlp_execute_log&version=v1 document }
                 *
                 * 应用DLP执行日志导出
                 *
                 * 调用该接口可以导出应用DLP的执行日志，日志分片调用，pageSize请不要超过50
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            hit_policy_names?: Array<string>;
                            start_time?: string;
                            end_time?: string;
                            user_id?: string;
                            app_apply_module?: number;
                            apply_module?: number;
                            actions?: Array<number>;
                            locale?: "en-US" | "zh-CN" | "ja-JP";
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
                                        event_name?: string;
                                        user_id?: string;
                                        execute_time?: string;
                                        action_name?: string;
                                        hit_policies?: Array<string>;
                                        entity_id?: string;
                                        evidences?: {
                                            keyword_hits?: Array<string>;
                                            regular_hits?: Array<string>;
                                            sensitive_hits?: Array<string>;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/app_dlp_execute_logs`,
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
             * data_archiving.user
             */
            dataArchivingUser: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.user&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=data_archiving.user&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params: {
                            page_token?: string;
                            page_size: number;
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
                                    user_ids?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/user`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.user&apiName=add&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add&project=security_and_compliance&resource=data_archiving.user&version=v1 document }
                 */
                add: async (
                    payload?: {
                        data?: { user_ids?: Array<string> };
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
                                `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/user/add`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.user&apiName=del&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=del&project=security_and_compliance&resource=data_archiving.user&version=v1 document }
                 */
                del: async (
                    payload?: {
                        data?: { user_ids?: Array<string> };
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
                                `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/user/del`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.user&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=security_and_compliance&resource=data_archiving.user&version=v1 document }
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/user`,
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
             * data_archiving.messages
             */
            dataArchivingMessages: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.messages&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=data_archiving.messages&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: { seq_id?: string; limit?: number };
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
                                    message_infos?: Array<{
                                        message_id?: string;
                                        message_type?: number;
                                        sender_info?: {
                                            type?:
                                                | "User"
                                                | "Bot"
                                                | "System"
                                                | "AI"
                                                | "Unknow";
                                            id?: string;
                                            name?: string;
                                        };
                                        receiver_ids?: Array<string>;
                                        action_type?: string;
                                        chat_id?: string;
                                        action_time?: string;
                                        is_super_chat?: boolean;
                                        is_cross_tenant_chat?: boolean;
                                        chat_name?: string;
                                        content?: string;
                                        chat_mode?: string;
                                        reaction_type?: string;
                                        parent_msg_id?: string;
                                    }>;
                                    seq_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/messages`,
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
             * data_archiving.downloads
             */
            dataArchivingDownloads: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=data_archiving.downloads&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=data_archiving.downloads&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: { type?: "im_resource_file" };
                        path: { download_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/data_archiving/downloads/:download_id`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
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
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
            },
            /**
             * migration.entity_tasks
             */
            migrationEntityTasks: {
                searchWithIterator: async (
                    payload?: {
                        data: { task_ids: Array<string> };
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/security_and_compliance/v1/migration/entity_tasks/search`,
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
                                                        task_id?: string;
                                                        task_status?:
                                                            | "create"
                                                            | "complete"
                                                            | "stop";
                                                        entity?: {
                                                            id?: string;
                                                            location?:
                                                                | "CN"
                                                                | "SG"
                                                                | "JP"
                                                                | "VA";
                                                            type?:
                                                                | "docs"
                                                                | "docx"
                                                                | "sheets"
                                                                | "base"
                                                                | "mindnotes"
                                                                | "file"
                                                                | "slides"
                                                                | "chat"
                                                                | "mailbox"
                                                                | "calendar"
                                                                | "minutes"
                                                                | "task";
                                                            creator_id?: string;
                                                            creator_type?:
                                                                | "user"
                                                                | "app";
                                                            create_time?: string;
                                                            mail_address?: string;
                                                        };
                                                        message?: string;
                                                    }>;
                                                    page_token: string;
                                                    has_more: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=migration.entity_tasks&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=migration.entity_tasks&version=v1 document }
                 *
                 * 批量查询实体迁移任务的信息
                 *
                 * 返回的是迁移任务的状态，及每个迁移任务中包含的实体及实体的数据驻留地等信息
                 */
                search: async (
                    payload?: {
                        data: { task_ids: Array<string> };
                        params?: {
                            page_token?: string;
                            page_size?: number;
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
                                        task_id?: string;
                                        task_status?:
                                            | "create"
                                            | "complete"
                                            | "stop";
                                        entity?: {
                                            id?: string;
                                            location?:
                                                | "CN"
                                                | "SG"
                                                | "JP"
                                                | "VA";
                                            type?:
                                                | "docs"
                                                | "docx"
                                                | "sheets"
                                                | "base"
                                                | "mindnotes"
                                                | "file"
                                                | "slides"
                                                | "chat"
                                                | "mailbox"
                                                | "calendar"
                                                | "minutes"
                                                | "task";
                                            creator_id?: string;
                                            creator_type?: "user" | "app";
                                            create_time?: string;
                                            mail_address?: string;
                                        };
                                        message?: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/migration/entity_tasks/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=migration.entity_tasks&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=migration.entity_tasks&version=v1 document }
                 *
                 * 创建实体资源迁移任务
                 *
                 * 创建迁移实体到目标数据驻留地的任务。每一个实体的迁移，都会生成一个对应的迁移任务。其中 mailbox 和 calendar 是容器的整体迁移，不支持分段驻留。
                 */
                create: async (
                    payload?: {
                        data: {
                            entity_ids: Array<string>;
                            entity_type:
                                | "docs"
                                | "docx"
                                | "sheets"
                                | "base"
                                | "mindnotes"
                                | "file"
                                | "slides"
                                | "chat"
                                | "mailbox"
                                | "calendar"
                                | "minutes"
                                | "task";
                            target_location: "CN" | "SG" | "JP" | "VA";
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
                                        task_id: string;
                                        task_status?:
                                            | "create"
                                            | "complete"
                                            | "stop";
                                        entity?: {
                                            id?: string;
                                            type: string;
                                            location: "CN" | "SG" | "JP" | "VA";
                                            mail_address?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/migration/entity_tasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=migration.entity_tasks&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=migration.entity_tasks&version=v1 document }
                 *
                 * 获取一个实体迁移任务的信息
                 *
                 * 返回的结果是当前任务迁移的实体及实体数据驻留等信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string };
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
                                    task_id?: string;
                                    task_status?:
                                        | "create"
                                        | "complete"
                                        | "stop";
                                    message?: string;
                                    entity?: {
                                        id?: string;
                                        location?: "CN" | "SG" | "JP" | "VA";
                                        type?:
                                            | "docs"
                                            | "docx"
                                            | "sheets"
                                            | "base"
                                            | "mindnotes"
                                            | "file"
                                            | "slides"
                                            | "chat"
                                            | "mailbox"
                                            | "calendar"
                                            | "minutes"
                                            | "task";
                                        creator_id?: string;
                                        creator_type?: "user" | "app";
                                        create_time?: string;
                                        mail_address?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/migration/entity_tasks/:task_id`,
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
             * directory.creator
             */
            directoryCreator: {
                searchWithIterator: async (
                    payload?: {
                        data: {
                            creator_type: "user" | "app";
                            creator_id: string;
                            entity_types: Array<
                                | "docs"
                                | "docx"
                                | "sheets"
                                | "base"
                                | "mindnotes"
                                | "file"
                                | "slides"
                                | "chat"
                                | "mailbox"
                                | "calendar"
                                | "minutes"
                                | "task"
                            >;
                            entity_location: "CN" | "SG" | "JP";
                            start_create_time?: string;
                            end_create_time?: string;
                        };
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/security_and_compliance/v1/directory/creator/search`,
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
                                                        entity_id?: string;
                                                        mail_address?: string;
                                                        entity_location?:
                                                            | "CN"
                                                            | "SG"
                                                            | "JP";
                                                        entity_create_time?: string;
                                                        entity_type?:
                                                            | "docs"
                                                            | "docx"
                                                            | "sheets"
                                                            | "base"
                                                            | "mindnotes"
                                                            | "file"
                                                            | "slides"
                                                            | "chat"
                                                            | "mailbox"
                                                            | "calendar"
                                                            | "minutes"
                                                            | "task";
                                                    }>;
                                                    page_token: string;
                                                    has_more: boolean;
                                                    creator_id?: string;
                                                    creator_type?:
                                                        | "user"
                                                        | "app";
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=directory.creator&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=directory.creator&version=v1 document }
                 *
                 * 批量查询业务实体资源的信息
                 *
                 * 批量查询业务实体资源的信息
                 */
                search: async (
                    payload?: {
                        data: {
                            creator_type: "user" | "app";
                            creator_id: string;
                            entity_types: Array<
                                | "docs"
                                | "docx"
                                | "sheets"
                                | "base"
                                | "mindnotes"
                                | "file"
                                | "slides"
                                | "chat"
                                | "mailbox"
                                | "calendar"
                                | "minutes"
                                | "task"
                            >;
                            entity_location: "CN" | "SG" | "JP";
                            start_create_time?: string;
                            end_create_time?: string;
                        };
                        params?: {
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
                                        entity_id?: string;
                                        mail_address?: string;
                                        entity_location?: "CN" | "SG" | "JP";
                                        entity_create_time?: string;
                                        entity_type?:
                                            | "docs"
                                            | "docx"
                                            | "sheets"
                                            | "base"
                                            | "mindnotes"
                                            | "file"
                                            | "slides"
                                            | "chat"
                                            | "mailbox"
                                            | "calendar"
                                            | "minutes"
                                            | "task";
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                    creator_id?: string;
                                    creator_type?: "user" | "app";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/directory/creator/search`,
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
             * directory.entity
             */
            directoryEntity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=directory.entity&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=directory.entity&version=v1 document }
                 *
                 * 获取一个业务实体资源的信息
                 *
                 * 获取一个业务实体资源的信息，包括实体创建者id、实体的数据驻留地、实体的创建时间等。
                 */
                get: async (
                    payload?: {
                        params: {
                            entity_id: string;
                            entity_type:
                                | "docs"
                                | "docx"
                                | "sheets"
                                | "base"
                                | "mindnotes"
                                | "file"
                                | "slides"
                                | "chat"
                                | "mailbox"
                                | "calendar"
                                | "minutes"
                                | "task";
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
                                    entity_type?:
                                        | "docs"
                                        | "docx"
                                        | "sheets"
                                        | "base"
                                        | "mindnotes"
                                        | "file"
                                        | "slides"
                                        | "chat"
                                        | "mailbox"
                                        | "calendar"
                                        | "minutes"
                                        | "task";
                                    entity_id?: string;
                                    entity_location?: "CN" | "SG" | "JP" | "VA";
                                    entity_create_time?: string;
                                    creator_id?: string;
                                    creator_type?: "user" | "app";
                                    mail_address?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/directory/entity`,
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
             * device_record
             */
            deviceRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=security_and_compliance&resource=device_record&version=v1 document }
                 *
                 * 删除设备
                 *
                 * 使用该接口在设备管理中删除一台设备
                 */
                delete: async (
                    payload?: {
                        path: { device_record_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v1/device_records/:device_record_id`,
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
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            device_record_id?: string;
                            user_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            device_name?: string;
                            serial_number?: string;
                            uuid?: string;
                            mac_address?: string;
                            imei?: string;
                            android_id?: string;
                            google_aid?: string;
                            idfa?: string;
                            idfv?: string;
                            device_ownership?: string;
                            device_credibility?: string;
                            device_terminal_type?: string;
                            device_source?: string;
                            disk_serial_number?: string;
                            aaid?: string;
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
                                    `${this.domain}/open-apis/security_and_compliance/v1/device_records`,
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
                                                        device_record_id?: string;
                                                        device_terminal_type?:
                                                            | "Unknown"
                                                            | "PC"
                                                            | "Mobile";
                                                        device_system?:
                                                            | "Windows"
                                                            | "Android"
                                                            | "MacOS"
                                                            | "iOS"
                                                            | "Linux"
                                                            | "Harmony"
                                                            | "OpenHarmony";
                                                        model?: string;
                                                        device_name?: string;
                                                        serial_number?: string;
                                                        uuid?: string;
                                                        mac_address?: string;
                                                        imei?: string;
                                                        android_id?: string;
                                                        google_aid?: string;
                                                        idfa?: string;
                                                        idfv?: string;
                                                        device_ownership:
                                                            | "Unknown"
                                                            | "Personal"
                                                            | "Company";
                                                        device_source?: string;
                                                        register_time?: string;
                                                        device_credibility:
                                                            | "Unknown"
                                                            | "Credible"
                                                            | "Uncredible";
                                                        version?: string;
                                                        disk_serial_number?: string;
                                                        aaid?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=device_record&version=v1 document }
                 *
                 * 获取设备信息
                 *
                 * 使用该接口在设备管理中获取设备的设备参数、设备归属、设备状态等信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            device_record_id?: string;
                            user_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            device_name?: string;
                            serial_number?: string;
                            uuid?: string;
                            mac_address?: string;
                            imei?: string;
                            android_id?: string;
                            google_aid?: string;
                            idfa?: string;
                            idfv?: string;
                            device_ownership?: string;
                            device_credibility?: string;
                            device_terminal_type?: string;
                            device_source?: string;
                            disk_serial_number?: string;
                            aaid?: string;
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
                                        device_record_id?: string;
                                        device_terminal_type?:
                                            | "Unknown"
                                            | "PC"
                                            | "Mobile";
                                        device_system?:
                                            | "Windows"
                                            | "Android"
                                            | "MacOS"
                                            | "iOS"
                                            | "Linux"
                                            | "Harmony"
                                            | "OpenHarmony";
                                        model?: string;
                                        device_name?: string;
                                        serial_number?: string;
                                        uuid?: string;
                                        mac_address?: string;
                                        imei?: string;
                                        android_id?: string;
                                        google_aid?: string;
                                        idfa?: string;
                                        idfv?: string;
                                        device_ownership:
                                            | "Unknown"
                                            | "Personal"
                                            | "Company";
                                        device_source?: string;
                                        register_time?: string;
                                        device_credibility:
                                            | "Unknown"
                                            | "Credible"
                                            | "Uncredible";
                                        version?: string;
                                        disk_serial_number?: string;
                                        aaid?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/device_records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=device_record&version=v1 document }
                 *
                 * 新增设备
                 *
                 * 使用该接口在设备管理中新增一台设备。新增设备的类型为管理员导入
                 */
                create: async (
                    payload?: {
                        data: {
                            device_record_id?: string;
                            device_terminal_type?: "Unknown" | "PC" | "Mobile";
                            device_system:
                                | "Windows"
                                | "Android"
                                | "MacOS"
                                | "iOS"
                                | "Linux"
                                | "Harmony"
                                | "OpenHarmony";
                            model?: string;
                            device_name?: string;
                            serial_number?: string;
                            uuid?: string;
                            mac_address?: string;
                            imei?: string;
                            android_id?: string;
                            google_aid?: string;
                            idfa?: string;
                            idfv?: string;
                            device_ownership:
                                | "Unknown"
                                | "Personal"
                                | "Company";
                            device_source?: string;
                            register_time?: string;
                            device_credibility:
                                | "Unknown"
                                | "Credible"
                                | "Uncredible";
                            version?: string;
                            disk_serial_number?: string;
                            aaid?: string;
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
                                data?: { device_record_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/device_records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=device_record&version=v1 document }
                 *
                 * 更新设备
                 *
                 * 使用该接口在设备管理中修改一台设备的设备归属、设备状态等信息
                 */
                update: async (
                    payload?: {
                        data: {
                            device_terminal_type?: "Unknown" | "PC" | "Mobile";
                            device_system?:
                                | "Windows"
                                | "Android"
                                | "MacOS"
                                | "iOS"
                                | "Linux"
                                | "Harmony"
                                | "OpenHarmony";
                            model?: string;
                            device_name?: string;
                            serial_number?: string;
                            uuid?: string;
                            mac_address?: string;
                            imei?: string;
                            android_id?: string;
                            google_aid?: string;
                            idfa?: string;
                            idfv?: string;
                            device_ownership:
                                | "Unknown"
                                | "Personal"
                                | "Company";
                            device_source?: string;
                            register_time?: string;
                            device_credibility:
                                | "Unknown"
                                | "Credible"
                                | "Uncredible";
                            version?: string;
                            disk_serial_number?: string;
                            aaid?: string;
                        };
                        path: { device_record_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v1/device_records/:device_record_id`,
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
             * device_apply_record
             */
            deviceApplyRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_apply_record&apiName=approve&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=approve&project=security_and_compliance&resource=device_apply_record&version=v1 document }
                 *
                 * 审核设备
                 *
                 * 使用该接口在设备管理中通过或驳回一条成员自主申报申请
                 */
                approve: async (
                    payload?: {
                        data: { apply_id: string; pass: boolean };
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
                                `${this.domain}/open-apis/security_and_compliance/v1/device_apply_record/approve`,
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
             * openapi_log
             */
            openapiLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=openapi_log&apiName=list_data&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_data&project=security_and_compliance&resource=openapi_log&version=v1 document }
                 *
                 * 获取OpenAPI审计日志数据
                 *
                 * 该接口用于获取OpenAPI审计日志数据
                 */
                listData: async (
                    payload?: {
                        data?: {
                            api_keys?: Array<string>;
                            start_time?: number;
                            end_time?: number;
                            app_id?: string;
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
                                        id: string;
                                        api_key: string;
                                        event_time?: number;
                                        app_id?: string;
                                        ip?: string;
                                        log_detail?: {
                                            path?: string;
                                            method?: string;
                                            query_param?: string;
                                            payload?: string;
                                            status_code?: number;
                                            response?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/openapi_logs/list_data`,
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
             * people_log
             */
            peopleLog: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            latest?: number;
                            oldest?: number;
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
                                    `${this.domain}/open-apis/security_and_compliance/v1/people_logs`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        event_name: string;
                                                        department_ids?: Array<string>;
                                                        event_module: number;
                                                        operator_type?: number;
                                                        operator_value?: string;
                                                        objects?: Array<{
                                                            object_type?: string;
                                                            object_value?: string;
                                                            object_detail?: {
                                                                clone_source?: string;
                                                                text_detail?: string;
                                                                file_name?: string;
                                                                third_party_appID?: string;
                                                                contain_file_num?: number;
                                                                permission_setting_type?: string;
                                                                permission_external_access_Type?: boolean;
                                                                permission_share_type?: string;
                                                                file_service_source?: string;
                                                                okr_download_content?: string;
                                                                container_type?: string;
                                                                container_id?: string;
                                                                current_page?: string;
                                                            };
                                                            object_name?: string;
                                                            object_owner?: string;
                                                        }>;
                                                        recipients?: Array<{
                                                            recipient_type?: string;
                                                            recipient_value?: string;
                                                            recipient_detail?: {
                                                                permission_action_type?: string;
                                                            };
                                                        }>;
                                                        event_time?: number;
                                                        ip?: string;
                                                        operator_app?: string;
                                                        audit_context?: {
                                                            terminal_type?: number;
                                                            ios_context?: {
                                                                udid?: string;
                                                                did?: string;
                                                                app_ver?: string;
                                                                ver?: string;
                                                                os?: string;
                                                                STZone?: string;
                                                                ML?: string;
                                                                sjd?: string;
                                                                proxyip?: string;
                                                                wifip?: string;
                                                                location?: string;
                                                                active_ip?: string;
                                                                active_ip_detail?: string;
                                                                cell_base_station?: string;
                                                                IP?: string;
                                                            };
                                                            pc_context?: {
                                                                udid?: string;
                                                                did?: string;
                                                                app_ver?: string;
                                                                ver?: string;
                                                                os?: string;
                                                                wifip?: string;
                                                                region?: string;
                                                                IP?: string;
                                                            };
                                                            web_context?: {
                                                                user_agent?: string;
                                                                IP?: string;
                                                            };
                                                            android_context?: {
                                                                udid?: string;
                                                                did?: string;
                                                                app_ver?: string;
                                                                ver?: string;
                                                                region?: string;
                                                                id_i?: string;
                                                                id_r?: string;
                                                                hw_brand?: string;
                                                                hw_manuf?: string;
                                                                wifip?: string;
                                                                route_iip?: string;
                                                                route_gip?: string;
                                                                env_su?: string;
                                                                env_tz?: string;
                                                                env_ml?: string;
                                                                location?: string;
                                                                active_ip?: string;
                                                                active_ip_detail?: string;
                                                                cell_base_station?: string;
                                                                IP?: string;
                                                            };
                                                        };
                                                        extend?: {
                                                            comment_type?: string;
                                                            app_detail?: string;
                                                            two_step_validation?: boolean;
                                                            login_method?: string;
                                                            new_people_num_in_video?: number;
                                                            external_people_num_in_video?: number;
                                                            external_people_num_in_chat?: number;
                                                            join_group?: number;
                                                            quit_group?: number;
                                                            external_people_num_in_doc_share?: number;
                                                        };
                                                        event_id?: string;
                                                        operator_app_name?: string;
                                                        unique_id?: string;
                                                        common_drawers?: {
                                                            common_draw_info_list?: Array<{
                                                                info_key?: string;
                                                                info_val?: string;
                                                                key_i18n_key?: string;
                                                                val_type?: string;
                                                                val_i18n_key?: string;
                                                            }>;
                                                        };
                                                        audit_detail?: {
                                                            mc?: string;
                                                            device_model?: string;
                                                            os?: string;
                                                            city?: string;
                                                        };
                                                        operator_tenant?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=people_log&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=people_log&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            latest?: number;
                            oldest?: number;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        event_name: string;
                                        department_ids?: Array<string>;
                                        event_module: number;
                                        operator_type?: number;
                                        operator_value?: string;
                                        objects?: Array<{
                                            object_type?: string;
                                            object_value?: string;
                                            object_detail?: {
                                                clone_source?: string;
                                                text_detail?: string;
                                                file_name?: string;
                                                third_party_appID?: string;
                                                contain_file_num?: number;
                                                permission_setting_type?: string;
                                                permission_external_access_Type?: boolean;
                                                permission_share_type?: string;
                                                file_service_source?: string;
                                                okr_download_content?: string;
                                                container_type?: string;
                                                container_id?: string;
                                                current_page?: string;
                                            };
                                            object_name?: string;
                                            object_owner?: string;
                                        }>;
                                        recipients?: Array<{
                                            recipient_type?: string;
                                            recipient_value?: string;
                                            recipient_detail?: {
                                                permission_action_type?: string;
                                            };
                                        }>;
                                        event_time?: number;
                                        ip?: string;
                                        operator_app?: string;
                                        audit_context?: {
                                            terminal_type?: number;
                                            ios_context?: {
                                                udid?: string;
                                                did?: string;
                                                app_ver?: string;
                                                ver?: string;
                                                os?: string;
                                                STZone?: string;
                                                ML?: string;
                                                sjd?: string;
                                                proxyip?: string;
                                                wifip?: string;
                                                location?: string;
                                                active_ip?: string;
                                                active_ip_detail?: string;
                                                cell_base_station?: string;
                                                IP?: string;
                                            };
                                            pc_context?: {
                                                udid?: string;
                                                did?: string;
                                                app_ver?: string;
                                                ver?: string;
                                                os?: string;
                                                wifip?: string;
                                                region?: string;
                                                IP?: string;
                                            };
                                            web_context?: {
                                                user_agent?: string;
                                                IP?: string;
                                            };
                                            android_context?: {
                                                udid?: string;
                                                did?: string;
                                                app_ver?: string;
                                                ver?: string;
                                                region?: string;
                                                id_i?: string;
                                                id_r?: string;
                                                hw_brand?: string;
                                                hw_manuf?: string;
                                                wifip?: string;
                                                route_iip?: string;
                                                route_gip?: string;
                                                env_su?: string;
                                                env_tz?: string;
                                                env_ml?: string;
                                                location?: string;
                                                active_ip?: string;
                                                active_ip_detail?: string;
                                                cell_base_station?: string;
                                                IP?: string;
                                            };
                                        };
                                        extend?: {
                                            comment_type?: string;
                                            app_detail?: string;
                                            two_step_validation?: boolean;
                                            login_method?: string;
                                            new_people_num_in_video?: number;
                                            external_people_num_in_video?: number;
                                            external_people_num_in_chat?: number;
                                            join_group?: number;
                                            quit_group?: number;
                                            external_people_num_in_doc_share?: number;
                                        };
                                        event_id?: string;
                                        operator_app_name?: string;
                                        unique_id?: string;
                                        common_drawers?: {
                                            common_draw_info_list?: Array<{
                                                info_key?: string;
                                                info_val?: string;
                                                key_i18n_key?: string;
                                                val_type?: string;
                                                val_i18n_key?: string;
                                            }>;
                                        };
                                        audit_detail?: {
                                            mc?: string;
                                            device_model?: string;
                                            os?: string;
                                            city?: string;
                                        };
                                        operator_tenant?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/people_logs`,
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
             * aud_admin_log
             */
            audAdminLog: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            latest?: string;
                            oldest?: string;
                            user_id?: string;
                            category_name?: string;
                            event_name?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
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
                                    `${this.domain}/open-apis/security_and_compliance/v1/aud_admin_logs`,
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
                                                        unique_id: string;
                                                        user_id: string;
                                                        category_name: string;
                                                        event_name: string;
                                                        ip_address: string;
                                                        create_time?: string;
                                                        content?: string;
                                                        operation_status: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=aud_admin_log&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=aud_admin_log&version=v1 document }
                 *
                 * 获取管理员日志
                 *
                 * 调用该接口需要申请获取管理员后台的管理员行为日志权限，并且只有企业自建应用才有权限调用此接口。;注意：当前接口为灰度申请可用，请联系客服开通灰度
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            latest?: string;
                            oldest?: string;
                            user_id?: string;
                            category_name?: string;
                            event_name?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
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
                                        unique_id: string;
                                        user_id: string;
                                        category_name: string;
                                        event_name: string;
                                        ip_address: string;
                                        create_time?: string;
                                        content?: string;
                                        operation_status: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/aud_admin_logs`,
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
             * file_risk_detection_record.result
             */
            fileRiskDetectionRecordResult: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=file_risk_detection_record.result&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=file_risk_detection_record.result&version=v1 document }
                 *
                 * 更新检测结果
                 *
                 * 更新检测结果
                 */
                update: async (
                    payload?: {
                        data: {
                            status: "FINISHED" | "FINISHED_WITH_ERR";
                            risk_tag: "RISK" | "NON_RISK" | "NOT_DETECT";
                            need_bot_notify: boolean;
                        };
                        path: { record_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v1/file_risk_detection_records/:record_id/result`,
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
             * user_migration
             */
            userMigration: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=cancel&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=security_and_compliance&resource=user_migration&version=v1 document }
                 *
                 * 取消用户迁移任务
                 *
                 * 取消用户迁移任务，仅能对未启动迁移的用户做此操作。用户迁移状态可通过「获取单个用户迁移状态」查询。
                 */
                cancel: async (
                    payload?: {
                        data: { user_ids: Array<string> };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/cancel`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=user_migration&version=v1 document }
                 *
                 * 获取单个用户迁移状态
                 *
                 * 通过user_id获取指定用户当前的迁移状态
                 */
                get: async (
                    payload?: {
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
                        };
                        path: { user_id: string };
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
                                    user_migration?: {
                                        user_id?: string;
                                        dest_geo?: string;
                                        task_id?: string;
                                        status?: "0" | "1" | "2";
                                        progress?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/:user_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=user_migration&version=v1 document }
                 *
                 * 批量获取用户迁移状态
                 *
                 * 传入用户 ID 列表，批量获取用户迁移状态
                 */
                search: async (
                    payload?: {
                        data: { user_ids: Array<string> };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
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
                                        dest_geo?: string;
                                        task_id?: string;
                                        status?: "0" | "1" | "2";
                                        progress?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=user_migration&version=v1 document }
                 *
                 * 迁移用户数据驻留位置
                 *
                 * 将用户的数据驻留位置迁移到目标地理位置。
                 */
                create: async (
                    payload?: {
                        data: { user_ids: Array<string>; dest_geo: string };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
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
                                    user_migrations?: Array<{
                                        user_id?: string;
                                        dest_geo?: string;
                                        task_id?: string;
                                        status?: "0" | "1" | "2";
                                        progress?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/user_migrations`,
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
             * file_risk_detection_record
             */
            fileRiskDetectionRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=file_risk_detection_record&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=file_risk_detection_record&version=v1 document }
                 *
                 * 获取检测记录
                 *
                 * 获取检测记录
                 */
                get: async (
                    payload?: {
                        path: { record_id: string };
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
                                    file_risk_detection_record?: {
                                        record_id: string;
                                        file_url: string;
                                        file_url_expire_time: string;
                                        file_size: string;
                                        trigger_reason: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/file_risk_detection_records/:record_id`,
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
             * multi_geo_entity.tenant
             */
            multiGeoEntityTenant: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=multi_geo_entity.tenant&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=multi_geo_entity.tenant&version=v1 document }
                 *
                 * 获取数据驻留地理位置列表
                 *
                 * 获取租户可用的数据驻留地理位置列表
                 */
                get: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    tenant?: {
                                        available_geo_locations: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/multi_geo_entity/tenant`,
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
             * dlp_skg_execute_log
             */
            dlpSkgExecuteLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=dlp_skg_execute_log&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=dlp_skg_execute_log&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            apply_module?: number;
                            actions?: Array<number>;
                            user_id?: string;
                            start_time: string;
                            end_time: string;
                            locale?: "zh-CN" | "en-US" | "ja-JP";
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
                                        applicable_service?: string;
                                        user_name?: string;
                                        user_id?: string;
                                        trigger?: string;
                                        time?: string;
                                        system_action?: string;
                                        sender_name?: string;
                                        sender_id?: string;
                                        recipient_name?: string;
                                        recipient_id?: string;
                                        chat_name?: string;
                                        chat_id?: string;
                                        message_id?: string;
                                        message_content?: string;
                                        alias_ingroup?: string;
                                        group_description?: string;
                                        group_tab_content?: string;
                                        file_name?: string;
                                        file_key?: string;
                                        document_owner_name?: string;
                                        document_owner_id?: string;
                                        document_name?: string;
                                        document_type?: string;
                                        document_link?: string;
                                        evidence_detail?: {
                                            keyword_hits?: Array<string>;
                                            regular_hits?: Array<string>;
                                            sensitive_hits?: Array<string>;
                                            file_size_hits?: Array<string>;
                                            file_type_hits?: Array<string>;
                                            file_name_ext_hits?: Array<string>;
                                            trigger_snippets?: Array<{
                                                policy_id?: string;
                                                detect_mode_proof_contexts?: Array<{
                                                    detect_mode?: number;
                                                    detect_name?: string;
                                                    proof_contexts?: Array<{
                                                        hit_content?: string;
                                                        context_snippet?: string;
                                                    }>;
                                                    hit_count?: number;
                                                }>;
                                            }>;
                                            secure_label_hits?: Array<string>;
                                        };
                                        hit_policies?: Array<{
                                            policy_id?: string;
                                            policy_name?: string;
                                        }>;
                                        file_token?: string;
                                        trigger_event_type?: string;
                                        chat_type?: string;
                                        group_owner_name?: string;
                                        group_owner_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/dlp_skg_execute_log`,
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
             * dlp_execute_log
             */
            dlpExecuteLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=dlp_execute_log&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=dlp_execute_log&version=v1 document }
                 *
                 * DLP系统执行日志导出
                 *
                 * 用于导出系统执行日志
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            apply_module?: number;
                            actions?: Array<number>;
                            user_id?: string;
                            start_time: string;
                            end_time: string;
                            locale?: "zh-CN" | "en-US" | "ja-JP";
                            engine_type?: number;
                            include_system_log?: boolean;
                            policy_name?: string;
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
                                        applicable_service?: string;
                                        user_name?: string;
                                        user_id?: string;
                                        trigger?: string;
                                        time?: string;
                                        system_action?: string;
                                        sender_name?: string;
                                        sender_id?: string;
                                        recipient_name?: string;
                                        recipient_id?: string;
                                        chat_name?: string;
                                        chat_id?: string;
                                        message_id?: string;
                                        message_content?: string;
                                        alias_ingroup?: string;
                                        group_description?: string;
                                        group_tab_content?: string;
                                        file_name?: string;
                                        file_key?: string;
                                        document_owner_name?: string;
                                        document_owner_id?: string;
                                        document_name?: string;
                                        document_type?: string;
                                        document_link?: string;
                                        evidence_detail?: {
                                            keyword_hits?: Array<string>;
                                            regular_hits?: Array<string>;
                                            sensitive_hits?: Array<string>;
                                            file_size_hits?: Array<string>;
                                            file_type_hits?: Array<string>;
                                            file_name_ext_hits?: Array<string>;
                                            trigger_snippets?: Array<{
                                                policy_id?: string;
                                                detect_mode_proof_contexts?: Array<{
                                                    detect_mode?: number;
                                                    detect_name?: string;
                                                    proof_contexts?: Array<{
                                                        hit_content?: string;
                                                        context_snippet?: string;
                                                    }>;
                                                    hit_count?: number;
                                                }>;
                                            }>;
                                            secure_label_hits?: Array<string>;
                                        };
                                        hit_policies?: Array<{
                                            policy_id?: string;
                                            policy_name?: string;
                                        }>;
                                        file_token?: string;
                                        trigger_event_type?: string;
                                        chat_type?: string;
                                        group_owner_name?: string;
                                        group_owner_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/dlp_execute_logs`,
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
             * policy_log
             */
            policyLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=policy_log&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=policy_log&version=v1 document }
                 *
                 * 策略日志
                 */
                get: async (
                    payload?: {
                        params?: {
                            latest?: string;
                            oldest?: string;
                            page_token?: string;
                            page_size?: number;
                            user_id?: string;
                            actions?: Array<string>;
                            policy_name?: string;
                            resource?: string;
                            locale?: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        user_id?: string;
                                        user_name?: string;
                                        action?: string;
                                        resource?: string;
                                        event_time?: string;
                                        condition?: string;
                                        policy_infos?: Array<{
                                            policy_id?: string;
                                            policy_name?: string;
                                        }>;
                                        system_action?: string;
                                        hit_contents?: Array<{
                                            field_key?: string;
                                            field_value?: string;
                                        }>;
                                        proof_details?: Array<{
                                            detect_mode?: number;
                                            detect_proof_contexts?: Array<{
                                                detect_name?: string;
                                                proof_contexts?: Array<{
                                                    prefix?: string;
                                                    content?: string;
                                                    suffix?: string;
                                                }>;
                                            }>;
                                        }>;
                                        detect_rules?: Array<{
                                            rule_id?: string;
                                            rule_version?: number;
                                            rule_name?: string;
                                        }>;
                                        resource_attributes?: Array<{
                                            resource_key?: string;
                                            resource_id?: string;
                                            resource_value?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/policy_log`,
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
             * pdl_info
             */
            pdlInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=pdl_info&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=security_and_compliance&resource=pdl_info&version=v1 document }
                 *
                 * 查询用户pdl时间线信息
                 *
                 * 传入open_id，返回对应用户的pdl（数据预期驻留地）时间线信息
                 */
                query: async (
                    payload?: {
                        data: {
                            user_open_ids: Array<string>;
                            pdl_time_range?: { start: string; end: string };
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
                                    user_pdl_infos?: Array<{
                                        id?: string;
                                        infos?: Array<{
                                            pdl?: number;
                                            timestamp_range?: {
                                                start: string;
                                                end: string;
                                            };
                                        }>;
                                    }>;
                                    failed_infos?: Array<{
                                        id?: string;
                                        code?: number;
                                        msg?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/pdl_info/query`,
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
             * geo_info
             */
            geoInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=geo_info&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=security_and_compliance&resource=geo_info&version=v1 document }
                 *
                 * 查询实体位置
                 *
                 * 传入对应实体标识，查询该实体所在geo的信息。
                 */
                query: async (
                    payload?: {
                        data: {
                            entity_type: string;
                            entity_ids: Array<string>;
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
                                    geo_infos?: Array<{
                                        id?: string;
                                        geo?: string;
                                    }>;
                                    failed_infos?: Array<{
                                        id?: string;
                                        code?: number;
                                        msg?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/geo_info/query`,
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
             * audit_info.behavior
             */
            auditInfoBehavior: {
                groupWithIterator: async (
                    payload?: {
                        data?: {
                            filter?: {
                                latest?: number;
                                oldest?: number;
                                event_name?: string;
                                operator_type?: number;
                                operator_value?: string;
                                event_module?: number;
                                object_type?: number;
                                object_value?: string;
                            };
                            group_bys?: Array<string>;
                            order_bys?: Array<{
                                field?: string;
                                direction?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/security_and_compliance/v1/audit_info/behavior/group`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        count?: number;
                                                        event_name?: string;
                                                        event_name_id?: number;
                                                        event_module?: number;
                                                        operator_type?: number;
                                                        operator_value?: string;
                                                        object_type?: number;
                                                        object_value?: string;
                                                        object_tenant?: string;
                                                        ip?: string;
                                                        audit_detail?: {
                                                            mc?: string;
                                                            device_model?: string;
                                                            os?: string;
                                                            city?: string;
                                                        };
                                                        operator_tenant?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=audit_info.behavior&apiName=group&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=group&project=security_and_compliance&resource=audit_info.behavior&version=v1 document }
                 *
                 * ## 功能介绍;对用户行为数据进行分组聚合分析，支持按指定维度分组、筛选条件过滤及排序规则，用于安全合规场景下的行为趋势统计、风险行为聚类等分析需求。
                 */
                group: async (
                    payload?: {
                        data?: {
                            filter?: {
                                latest?: number;
                                oldest?: number;
                                event_name?: string;
                                operator_type?: number;
                                operator_value?: string;
                                event_module?: number;
                                object_type?: number;
                                object_value?: string;
                            };
                            group_bys?: Array<string>;
                            order_bys?: Array<{
                                field?: string;
                                direction?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        count?: number;
                                        event_name?: string;
                                        event_name_id?: number;
                                        event_module?: number;
                                        operator_type?: number;
                                        operator_value?: string;
                                        object_type?: number;
                                        object_value?: string;
                                        object_tenant?: string;
                                        ip?: string;
                                        audit_detail?: {
                                            mc?: string;
                                            device_model?: string;
                                            os?: string;
                                            city?: string;
                                        };
                                        operator_tenant?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/audit_info/behavior/group`,
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
        v2: {
            /**
             * mail
             */
            mail: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=mail&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=mail&version=v2 document }
                 */
                search: async (
                    payload?: {
                        data: {
                            mode: "public_mail" | "user";
                            public_mail?: {
                                mail_box: Array<string>;
                                mail_id?: string;
                            };
                            user?: {
                                owner_ids: Array<string>;
                                senders?: Array<string>;
                                receivers?: Array<string>;
                                mail_id?: string;
                            };
                            create_time_range?: { start: string; end: string };
                            query?: string;
                        };
                        params?: {
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
                                        id: string;
                                        title: string;
                                        owner_type: number;
                                        create_time: string;
                                        owner_user_id?: string;
                                        owner_address?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/mail/search`,
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
             * download
             */
            download: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=download&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=download&version=v2 document }
                 */
                get: async (
                    payload?: {
                        params: {
                            type:
                                | "task_file"
                                | "im_resource_file"
                                | "im_attachment_file";
                        };
                        path: { download_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/download/:download_id`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
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
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
            },
            /**
             * vault_task
             */
            vaultTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=mail&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mail&project=security_and_compliance&resource=vault_task&version=v2 document }
                 */
                mail: async (
                    payload?: {
                        data: {
                            mode: "public_mail" | "user";
                            public_mail?: {
                                mail_box: Array<string>;
                                mail_id?: string;
                            };
                            user?: {
                                owner_ids: Array<string>;
                                senders?: Array<string>;
                                receivers?: Array<string>;
                                mail_id?: string;
                            };
                            id?: { mail_ids?: Array<string> };
                            task_name: string;
                            create_time_range?: { start: string; end: string };
                            query?: string;
                            export_type?: string;
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
                                    task?: {
                                        task_id: string;
                                        name: string;
                                        create_time: string;
                                        update_time: string;
                                        status:
                                            | "running"
                                            | "success"
                                            | "fail"
                                            | "expired";
                                        fail_reason?: string;
                                        expire_time?: string;
                                        extract_key?: string;
                                        files?: Array<{
                                            name: string;
                                            size: string;
                                            download_url: string;
                                        }>;
                                        creator?: {
                                            user_id: string;
                                            name: string;
                                            email: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/vault_tasks/mail`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=minutes&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=minutes&project=security_and_compliance&resource=vault_task&version=v2 document }
                 */
                minutes: async (
                    payload?: {
                        data: {
                            mode: "search";
                            search?: {
                                owner_ids?: Array<string>;
                                start_time_gte?: string;
                                start_time_lt?: string;
                                update_time_gte?: string;
                                update_time_lt?: string;
                                participant_ids?: Array<string>;
                                query?: string;
                            };
                            export?: {
                                detail_level:
                                    | "text_and_video"
                                    | "only_text"
                                    | "only_video";
                            };
                            task_name: string;
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
                                    task?: {
                                        task_id: string;
                                        name: string;
                                        create_time: string;
                                        update_time: string;
                                        status:
                                            | "running"
                                            | "success"
                                            | "fail"
                                            | "expired";
                                        fail_reason?: string;
                                        expire_time?: string;
                                        extract_key?: string;
                                        files?: Array<{
                                            name: string;
                                            size: string;
                                            download_url: string;
                                        }>;
                                        creator?: {
                                            user_id: string;
                                            name: string;
                                            email: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/vault_tasks/minutes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=vault_task&version=v2 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { task_id: string };
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
                                    task?: {
                                        task_id: string;
                                        name: string;
                                        create_time: string;
                                        update_time: string;
                                        status:
                                            | "running"
                                            | "success"
                                            | "fail"
                                            | "expired";
                                        fail_reason?: string;
                                        expire_time?: string;
                                        extract_key?: string;
                                        files?: Array<{
                                            name: string;
                                            size: string;
                                            download_url: string;
                                        }>;
                                        creator?: {
                                            user_id: string;
                                            name: string;
                                            email: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/vault_tasks/:task_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=docs&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=docs&project=security_and_compliance&resource=vault_task&version=v2 document }
                 */
                docs: async (
                    payload?: {
                        data: {
                            task_name: string;
                            mode: "search" | "url";
                            search?: {
                                owner_ids: Array<string>;
                                doc_status?: Array<number>;
                                doc_type?: Array<number>;
                                doc_tokens?: Array<string>;
                                create_time_range?: {
                                    start: string;
                                    end: string;
                                };
                                update_time_range?: {
                                    start: string;
                                    end: string;
                                };
                                query?: string;
                            };
                            url?: { urls: Array<string> };
                            export?: {
                                with_doc_permission?: boolean;
                                with_comment_json?: boolean;
                            };
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
                                    task?: {
                                        task_id: string;
                                        name: string;
                                        create_time: string;
                                        update_time: string;
                                        status:
                                            | "running"
                                            | "success"
                                            | "fail"
                                            | "expired";
                                        fail_reason?: string;
                                        expire_time?: string;
                                        extract_key?: string;
                                        files?: Array<{
                                            name: string;
                                            size: string;
                                            download_url: string;
                                        }>;
                                        creator?: {
                                            user_id: string;
                                            name: string;
                                            email: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/vault_tasks/docs`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=vault_task&apiName=message&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=message&project=security_and_compliance&resource=vault_task&version=v2 document }
                 */
                message: async (
                    payload?: {
                        data: {
                            mode: "filter" | "context" | "chat";
                            filter?: {
                                owner_ids: Array<string>;
                                create_time_range: {
                                    start: string;
                                    end: string;
                                };
                                chat_type?: Array<number>;
                                chat_ids?: Array<string>;
                            };
                            context?: {
                                owner_ids: Array<string>;
                                create_time_range: {
                                    start: string;
                                    end: string;
                                };
                                chat_type?: Array<number>;
                                chat_ids?: Array<string>;
                                query: string;
                                message_context_radius?: number;
                            };
                            task_name: string;
                            chat?: {
                                create_time_range?: {
                                    start: string;
                                    end: string;
                                };
                                chat_ids: Array<string>;
                            };
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
                                    task?: {
                                        task_id: string;
                                        name: string;
                                        create_time: string;
                                        update_time: string;
                                        status:
                                            | "running"
                                            | "success"
                                            | "fail"
                                            | "expired";
                                        fail_reason?: string;
                                        expire_time?: string;
                                        extract_key?: string;
                                        files?: Array<{
                                            name: string;
                                            size: string;
                                            download_url: string;
                                        }>;
                                        creator?: {
                                            user_id: string;
                                            name: string;
                                            email: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/vault_tasks/message`,
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
             * custodian.docs
             */
            custodianDocs: {
                commentedWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { custodian_id: string };
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
                                    `${this.domain}/open-apis/security_and_compliance/v2/custodians/:custodian_id/docs/commented`,
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
                                                        docs?: {
                                                            obj_token: string;
                                                            obj_type: number;
                                                            obj_status: number;
                                                            create_time: string;
                                                            edit_time: string;
                                                            owner?: {
                                                                user_id: string;
                                                                name: string;
                                                                email: string;
                                                            };
                                                        };
                                                        latest_comment_time?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=custodian.docs&apiName=commented&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=commented&project=security_and_compliance&resource=custodian.docs&version=v2 document }
                 */
                commented: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { custodian_id: string };
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
                                        docs?: {
                                            obj_token: string;
                                            obj_type: number;
                                            obj_status: number;
                                            create_time: string;
                                            edit_time: string;
                                            owner?: {
                                                user_id: string;
                                                name: string;
                                                email: string;
                                            };
                                        };
                                        latest_comment_time?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/custodians/:custodian_id/docs/commented`,
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
                editedWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { custodian_id: string };
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
                                    `${this.domain}/open-apis/security_and_compliance/v2/custodians/:custodian_id/docs/edited`,
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
                                                        docs?: {
                                                            obj_token: string;
                                                            obj_type: number;
                                                            obj_status: number;
                                                            create_time: string;
                                                            edit_time: string;
                                                            owner?: {
                                                                user_id: string;
                                                                name: string;
                                                                email: string;
                                                            };
                                                        };
                                                        latest_edit_time?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=custodian.docs&apiName=edited&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=edited&project=security_and_compliance&resource=custodian.docs&version=v2 document }
                 */
                edited: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { custodian_id: string };
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
                                        docs?: {
                                            obj_token: string;
                                            obj_type: number;
                                            obj_status: number;
                                            create_time: string;
                                            edit_time: string;
                                            owner?: {
                                                user_id: string;
                                                name: string;
                                                email: string;
                                            };
                                        };
                                        latest_edit_time?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/custodians/:custodian_id/docs/edited`,
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
             * message
             */
            message: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=message&apiName=transmitted&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transmitted&project=security_and_compliance&resource=message&version=v2 document }
                 */
                transmitted: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { message_id: string };
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
                                    messages?: Array<{
                                        message_meta: {
                                            message_id: string;
                                            message_type: number;
                                            chat_meta: {
                                                chat_id: string;
                                                chat_type: number;
                                                chat_name: string;
                                                create_time: string;
                                                is_external: boolean;
                                            };
                                            sender?: {
                                                user_id: string;
                                                name: string;
                                                email: string;
                                            };
                                            send_time: string;
                                            reply_message_id?: string;
                                            transmit_parent_message_id?: string;
                                            sender_type: number;
                                            message_status: number;
                                        };
                                        message_content: {
                                            text_content?: { text?: string };
                                            post_content?: {
                                                title?: string;
                                                text?: string;
                                                image_key_list?: Array<string>;
                                                media_key_list?: Array<string>;
                                            };
                                            merge_forward_content?: {
                                                message_id_list?: Array<string>;
                                            };
                                            system_content?: {};
                                            location_content?: {};
                                            share_group_chat_content?: {};
                                            share_user_card_content?: {};
                                            sticker_content?: {};
                                            card_content?: { title?: string };
                                            video_chat_content?: {
                                                topic?: string;
                                            };
                                            to_do_content?: {
                                                id?: string;
                                                summary?: string;
                                            };
                                            hong_bao_content?: {};
                                            calendar_content?: {
                                                summary?: string;
                                            };
                                            file_content?: {
                                                file_key?: string;
                                            };
                                            image_content?: {
                                                image_key?: string;
                                            };
                                            audio_content?: {
                                                audio_key?: string;
                                            };
                                            media_content?: {
                                                media_key?: string;
                                            };
                                            share_calendar_event_content?: {
                                                summary?: string;
                                            };
                                            general_calendar_content?: {
                                                summary?: string;
                                            };
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/messages/:message_id/transmitted`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=message&apiName=context&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=context&project=security_and_compliance&resource=message&version=v2 document }
                 */
                context: async (
                    payload?: {
                        params?: {
                            message_context_radius?: number;
                            send_time_gte?: string;
                            send_time_lt?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { message_id: string };
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
                                        message_meta: {
                                            message_id: string;
                                            message_type: number;
                                            chat_meta: {
                                                chat_id: string;
                                                chat_type: number;
                                                chat_name: string;
                                                create_time: string;
                                                is_external: boolean;
                                            };
                                            sender?: {
                                                user_id: string;
                                                name: string;
                                                email: string;
                                            };
                                            send_time: string;
                                            reply_message_id?: string;
                                            transmit_parent_message_id?: string;
                                            sender_type: number;
                                            message_status: number;
                                        };
                                        message_content: {
                                            text_content?: { text?: string };
                                            post_content?: {
                                                title?: string;
                                                text?: string;
                                                image_key_list?: Array<string>;
                                                media_key_list?: Array<string>;
                                            };
                                            merge_forward_content?: {
                                                message_id_list?: Array<string>;
                                            };
                                            system_content?: {};
                                            location_content?: {};
                                            share_group_chat_content?: {};
                                            share_user_card_content?: {};
                                            sticker_content?: {};
                                            card_content?: { title?: string };
                                            video_chat_content?: {
                                                topic?: string;
                                            };
                                            to_do_content?: {
                                                id?: string;
                                                summary?: string;
                                            };
                                            hong_bao_content?: {};
                                            calendar_content?: {
                                                summary?: string;
                                            };
                                            file_content?: {
                                                file_key?: string;
                                            };
                                            image_content?: {
                                                image_key?: string;
                                            };
                                            audio_content?: {
                                                audio_key?: string;
                                            };
                                            media_content?: {
                                                media_key?: string;
                                            };
                                            share_calendar_event_content?: {
                                                summary?: string;
                                            };
                                            general_calendar_content?: {
                                                summary?: string;
                                            };
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/messages/:message_id/context`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=message&apiName=batch_get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=security_and_compliance&resource=message&version=v2 document }
                 */
                batchGet: async (
                    payload?: {
                        data: { message_ids: Array<string> };
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
                                    items?: Array<{
                                        message_meta: {
                                            message_id: string;
                                            message_type: number;
                                            chat_meta: {
                                                chat_id: string;
                                                chat_type: number;
                                                chat_name: string;
                                                create_time: string;
                                                is_external: boolean;
                                            };
                                            sender?: {
                                                user_id: string;
                                                name: string;
                                                email: string;
                                            };
                                            send_time: string;
                                            reply_message_id?: string;
                                            transmit_parent_message_id?: string;
                                            sender_type: number;
                                            message_status: number;
                                        };
                                        message_content: {
                                            text_content?: { text?: string };
                                            post_content?: {
                                                title?: string;
                                                text?: string;
                                                image_key_list?: Array<string>;
                                                media_key_list?: Array<string>;
                                            };
                                            merge_forward_content?: {
                                                message_id_list?: Array<string>;
                                            };
                                            system_content?: {};
                                            location_content?: {};
                                            share_group_chat_content?: {};
                                            share_user_card_content?: {};
                                            sticker_content?: {};
                                            card_content?: { title?: string };
                                            video_chat_content?: {
                                                topic?: string;
                                            };
                                            to_do_content?: {
                                                id?: string;
                                                summary?: string;
                                            };
                                            hong_bao_content?: {};
                                            calendar_content?: {
                                                summary?: string;
                                            };
                                            file_content?: {
                                                file_key?: string;
                                            };
                                            image_content?: {
                                                image_key?: string;
                                            };
                                            audio_content?: {
                                                audio_key?: string;
                                            };
                                            media_content?: {
                                                media_key?: string;
                                            };
                                            share_calendar_event_content?: {
                                                summary?: string;
                                            };
                                            general_calendar_content?: {
                                                summary?: string;
                                            };
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/messages/batch_get`,
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
             * custodian.chat
             */
            custodianChat: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            create_time_gte?: string;
                            create_time_lt?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { custodian_id: string };
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
                                    `${this.domain}/open-apis/security_and_compliance/v2/custodians/:custodian_id/chats`,
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
                                                        chat_id: string;
                                                        chat_type: number;
                                                        chat_name: string;
                                                        create_time: string;
                                                        is_external: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=custodian.chat&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=custodian.chat&version=v2 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            create_time_gte?: string;
                            create_time_lt?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { custodian_id: string };
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
                                        chat_id: string;
                                        chat_type: number;
                                        chat_name: string;
                                        create_time: string;
                                        is_external: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/custodians/:custodian_id/chats`,
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
             * chat
             */
            chat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=chat&apiName=batch_get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=security_and_compliance&resource=chat&version=v2 document }
                 */
                batchGet: async (
                    payload?: {
                        data: { chat_ids: Array<string> };
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
                                    items?: Array<{
                                        chat_meta?: {
                                            chat_id: string;
                                            chat_type: number;
                                            chat_name: string;
                                            create_time: string;
                                            is_external: boolean;
                                        };
                                        chat_member?: {
                                            members?: Array<{
                                                user_id: string;
                                                name: string;
                                                email: string;
                                            }>;
                                            owner_id: string;
                                            admin_user_ids?: Array<string>;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/chats/batch_get`,
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
             * task_download
             */
            taskDownload: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=task_download&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=task_download&version=v2 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { vault_task_id?: string };
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
                                    task?: {
                                        task_id: string;
                                        name: string;
                                        create_time: string;
                                        update_time: string;
                                        status:
                                            | "running"
                                            | "success"
                                            | "fail"
                                            | "expired";
                                        fail_reason?: string;
                                        expire_time?: string;
                                        extract_key?: string;
                                        files?: Array<{
                                            name: string;
                                            size: string;
                                            download_url: string;
                                        }>;
                                        creator?: {
                                            user_id: string;
                                            name: string;
                                            email: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/task_download/:vault_task_id`,
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
             * download_info
             */
            downloadInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=download_info&apiName=convert&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=convert&project=security_and_compliance&resource=download_info&version=v2 document }
                 */
                convert: async (
                    payload?: {
                        data: {
                            type: "im_file_key" | "im_export_attachment_key";
                            resource_keys: Array<string>;
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
                                        type:
                                            | "im_file_key"
                                            | "im_export_attachment_key";
                                        resource_key: string;
                                        download_url: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/download_info/convert`,
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
             * device_apply_record
             */
            deviceApplyRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_apply_record&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=device_apply_record&version=v2 document }
                 *
                 * 审批设备申报
                 *
                 * 使用该接口在设备管理中通过或驳回一条成员自主申报申请
                 */
                update: async (
                    payload?: {
                        data: { is_approved: boolean };
                        path: { device_apply_record_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/device_apply_records/:device_apply_record_id`,
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
             * octo_deletion_task.minutes
             */
            octoDeletionTaskMinutes: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=octo_deletion_task.minutes&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=octo_deletion_task.minutes&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: { minutes_token: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/octo_deletion_task/minutes`,
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
             * octo_deletion_task.messages
             */
            octoDeletionTaskMessages: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=octo_deletion_task.messages&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=octo_deletion_task.messages&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: { message_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/octo_deletion_task/messages`,
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
             * octo_deletion_task.mails
             */
            octoDeletionTaskMails: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=octo_deletion_task.mails&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=octo_deletion_task.mails&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: { mail_id: string; mailbox_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/octo_deletion_task/mails`,
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
             * octo_deletion_task.docs
             */
            octoDeletionTaskDocs: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=octo_deletion_task.docs&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=octo_deletion_task.docs&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: { doc_token: string; object_type: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/octo_deletion_task/docs`,
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
             * octo_deletion_task.bitables
             */
            octoDeletionTaskBitables: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=octo_deletion_task.bitables&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=octo_deletion_task.bitables&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: { app_token: string; object_type: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/octo_deletion_task/bitables`,
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
             * device_record
             */
            deviceRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 删除设备
                 *
                 * 使用该接口在设备管理中删除一台设备
                 */
                delete: async (
                    payload?: {
                        path: { device_record_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records/:device_record_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=mine&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mine&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 获取设备认证信息
                 *
                 * 通过客户端授权信息获取对应设备认证信息，包含设备归属、可信状态等
                 */
                mine: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    device_record_id?: string;
                                    device_ownership?: number;
                                    device_status?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records/mine`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 更新设备
                 *
                 * 使用该接口在设备管理中修改一台设备的设备归属、设备状态等信息
                 */
                update: async (
                    payload?: {
                        data?: {
                            device_ownership?: number;
                            device_status?: number;
                            is_public?: boolean;
                        };
                        params: { version: string };
                        path: { device_record_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records/:device_record_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 新增设备
                 *
                 * 使用该接口在设备管理中新增一台设备。新增设备的类型为管理员导入
                 */
                create: async (
                    payload?: {
                        data?: {
                            device_system?: number;
                            device_ownership?: number;
                            device_status?: number;
                            is_public?: boolean;
                            serial_number?: string;
                            disk_serial_number?: string;
                            uuid?: string;
                            mac_address?: string;
                            android_id?: string;
                            idfv?: string;
                            aaid?: string;
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
                                data?: { device_record_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 获取设备信息
                 *
                 * 使用该接口在设备管理中获取设备的设备参数、设备归属、设备状态等信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { device_record_id: string };
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
                                    device_record?: {
                                        device_record_id: string;
                                        version: string;
                                        current_user_id?: string;
                                        device_name?: string;
                                        model?: string;
                                        device_system: number;
                                        serial_number?: string;
                                        disk_serial_number?: string;
                                        uuid?: string;
                                        mac_address?: string;
                                        android_id?: string;
                                        idfv?: string;
                                        aaid?: string;
                                        device_ownership: number;
                                        device_status: number;
                                        certification_level: number;
                                        device_terminal_type: number;
                                        latest_user_id?: string;
                                        dids?: Array<string>;
                                        is_managed?: boolean;
                                        mdm_device_id?: string;
                                        mdm_provider_name?: string;
                                        lsa_info?: string;
                                        device_env_info?: string;
                                        created_at?: number;
                                        updated_at?: number;
                                        is_public?: boolean;
                                        source?: number;
                                        cert_verified_at_unix?: string;
                                        cert_serial_number?: string;
                                        cert_issuer?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records/:device_record_id`,
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            device_record_id?: string;
                            current_user_id?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            device_name?: string;
                            serial_number?: string;
                            disk_serial_number?: string;
                            mac_address?: string;
                            android_id?: string;
                            uuid?: string;
                            idfv?: string;
                            aaid?: string;
                            device_ownership?: number;
                            device_status?: number;
                            device_terminal_type?: number;
                            os?: number;
                            latest_user_id?: string;
                            did?: string;
                            is_managed?: boolean;
                            mdm_device_id?: string;
                            mdm_provider_name?: string;
                            lsa_client_status?: number;
                            device_env_detect_status?: number;
                            is_public?: boolean;
                            source?: number;
                            cert_serial_number?: string;
                            cert_issuer?: string;
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
                                    `${this.domain}/open-apis/security_and_compliance/v2/device_records`,
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
                                                        device_record_id: string;
                                                        version: string;
                                                        current_user_id?: string;
                                                        device_name?: string;
                                                        model?: string;
                                                        device_system: number;
                                                        serial_number?: string;
                                                        disk_serial_number?: string;
                                                        uuid?: string;
                                                        mac_address?: string;
                                                        android_id?: string;
                                                        idfv?: string;
                                                        aaid?: string;
                                                        device_ownership: number;
                                                        device_status: number;
                                                        certification_level: number;
                                                        device_terminal_type: number;
                                                        latest_user_id?: string;
                                                        dids?: Array<string>;
                                                        is_managed?: boolean;
                                                        mdm_device_id?: string;
                                                        mdm_provider_name?: string;
                                                        lsa_info?: string;
                                                        device_env_info?: string;
                                                        created_at?: number;
                                                        updated_at?: number;
                                                        is_public?: boolean;
                                                        source?: number;
                                                        cert_verified_at_unix?: string;
                                                        cert_serial_number?: string;
                                                        cert_issuer?: string;
                                                    }>;
                                                    page_token: string;
                                                    has_more: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 查询设备信息
                 *
                 * 使用该接口可分页查询设备列表信息
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            device_record_id?: string;
                            current_user_id?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            device_name?: string;
                            serial_number?: string;
                            disk_serial_number?: string;
                            mac_address?: string;
                            android_id?: string;
                            uuid?: string;
                            idfv?: string;
                            aaid?: string;
                            device_ownership?: number;
                            device_status?: number;
                            device_terminal_type?: number;
                            os?: number;
                            latest_user_id?: string;
                            did?: string;
                            is_managed?: boolean;
                            mdm_device_id?: string;
                            mdm_provider_name?: string;
                            lsa_client_status?: number;
                            device_env_detect_status?: number;
                            is_public?: boolean;
                            source?: number;
                            cert_serial_number?: string;
                            cert_issuer?: string;
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
                                        device_record_id: string;
                                        version: string;
                                        current_user_id?: string;
                                        device_name?: string;
                                        model?: string;
                                        device_system: number;
                                        serial_number?: string;
                                        disk_serial_number?: string;
                                        uuid?: string;
                                        mac_address?: string;
                                        android_id?: string;
                                        idfv?: string;
                                        aaid?: string;
                                        device_ownership: number;
                                        device_status: number;
                                        certification_level: number;
                                        device_terminal_type: number;
                                        latest_user_id?: string;
                                        dids?: Array<string>;
                                        is_managed?: boolean;
                                        mdm_device_id?: string;
                                        mdm_provider_name?: string;
                                        lsa_info?: string;
                                        device_env_info?: string;
                                        created_at?: number;
                                        updated_at?: number;
                                        is_public?: boolean;
                                        source?: number;
                                        cert_verified_at_unix?: string;
                                        cert_serial_number?: string;
                                        cert_issuer?: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records`,
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
             * octo_deletion_log.minutes
             */
            octoDeletionLogMinutes: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=octo_deletion_log.minutes&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=octo_deletion_log.minutes&version=v2 document }
                 */
                get: async (
                    payload?: {
                        path: { minutes_token: string };
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
                                data?: { deleted_by_pt: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/octo_deletion_log/minutes/:minutes_token`,
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
             * octo_deletion_log.messages
             */
            octoDeletionLogMessages: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=octo_deletion_log.messages&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=octo_deletion_log.messages&version=v2 document }
                 */
                get: async (
                    payload?: {
                        path: { message_id: string };
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
                                data?: { deleted_by_pt: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/octo_deletion_log/messages/:message_id`,
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
             * octo_deletion_log.bitables
             */
            octoDeletionLogBitables: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=octo_deletion_log.bitables&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=octo_deletion_log.bitables&version=v2 document }
                 */
                get: async (
                    payload?: {
                        params?: { object_type?: string };
                        path: { app_token: string };
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
                                data?: { deleted_by_pt: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/octo_deletion_log/bitables/:app_token`,
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
             * octo_deletion_log.mails
             */
            octoDeletionLogMails: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=octo_deletion_log.mails&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=octo_deletion_log.mails&version=v2 document }
                 */
                get: async (
                    payload?: {
                        params?: { mailbox_id?: string };
                        path: { mail_id: string };
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
                                data?: { deleted_by_pt: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/octo_deletion_log/mails/:mail_id`,
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
             * octo_deletion_log.docs
             */
            octoDeletionLogDocs: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=octo_deletion_log.docs&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=octo_deletion_log.docs&version=v2 document }
                 */
                get: async (
                    payload?: {
                        params?: { object_type?: string };
                        path: { doc_token: string };
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
                                data?: { deleted_by_pt: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/octo_deletion_log/docs/:doc_token`,
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
             * tenant_restriction_network_policy
             */
            tenantRestrictionNetworkPolicy: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=tenant_restriction_network_policy&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=tenant_restriction_network_policy&version=v2 document }
                 *
                 * 编辑网络限制租户切换策略
                 *
                 * 使用该接口编辑网络限制租户切换策略，编辑允许登录的企业租户范围
                 */
                update: async (
                    payload?: {
                        data?: {
                            allow_list_policy?: {
                                self_only: boolean;
                                allow_tenants: Array<string>;
                                observe_mode: boolean;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/tenant_restriction_network_policy`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=tenant_restriction_network_policy&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=tenant_restriction_network_policy&version=v2 document }
                 *
                 * 获取网络限制租户切换策略
                 *
                 * 使用该接口查看网络限制租户切换策略，获取策略详情，包括允许登录的企业租户范围
                 */
                get: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    policy?: {
                                        enabled?: boolean;
                                        allow_list_policy?: {
                                            self_only: boolean;
                                            allow_tenants: Array<string>;
                                            observe_mode: boolean;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/tenant_restriction_network_policy`,
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
             * tenant_restriction_device_policy
             */
            tenantRestrictionDevicePolicy: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=tenant_restriction_device_policy&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=tenant_restriction_device_policy&version=v2 document }
                 *
                 * 编辑设备限制租户切换策略
                 *
                 * 使用该接口编辑设备限制租户切换策略，编辑允许登录的企业租户范围
                 */
                update: async (
                    payload?: {
                        data?: {
                            allow_list_policy?: {
                                self_only: boolean;
                                allow_tenants: Array<string>;
                                observe_mode: boolean;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/tenant_restriction_device_policy`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=tenant_restriction_device_policy&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=tenant_restriction_device_policy&version=v2 document }
                 *
                 * 获取设备限制租户切换策略
                 *
                 * 使用该接口查看设备限制租户切换策略，获取策略详情，包括允许登录的企业租户范围
                 */
                get: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    policy?: {
                                        enabled?: boolean;
                                        allow_list_policy?: {
                                            self_only: boolean;
                                            allow_tenants: Array<string>;
                                            observe_mode: boolean;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/tenant_restriction_device_policy`,
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
