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
import baike from "./baike";

// auto gen
export default abstract class Client extends baike {
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
    base = {
        v2: {
            /**
             * app.role
             */
            appRole: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=base&resource=app.role&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=base&resource=app.role&version=v2 document }
                 *
                 * 新增自定义角色
                 */
                create: async (
                    payload?: {
                        data: {
                            role_name: string;
                            table_roles: Array<{
                                table_perm: number;
                                table_name?: string;
                                table_id?: string;
                                rec_rule?: {
                                    conditions?: Array<{
                                        field_name: string;
                                        operator?:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty";
                                        value?: Array<string>;
                                    }>;
                                    conjunction?: "and" | "or";
                                    other_perm?: number;
                                };
                                other_rec_rule?: {
                                    conditions?: Array<{
                                        field_name: string;
                                        operator?:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty";
                                        value?: Array<string>;
                                    }>;
                                    conjunction?: "and" | "or";
                                };
                                field_perm?: Record<string, number>;
                                allow_add_record?: boolean;
                                allow_delete_record?: boolean;
                                view_perm?: number;
                                view_rules?: Record<string, number>;
                                field_action_rules?: Record<
                                    string,
                                    Record<string, number>
                                >;
                            }>;
                            block_roles?: Array<{
                                block_id: string;
                                block_perm: number;
                            }>;
                            base_rule?: Record<string, number>;
                        };
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
                                data?: {
                                    role?: {
                                        role_name: string;
                                        table_roles: Array<{
                                            table_perm: number;
                                            table_name?: string;
                                            table_id?: string;
                                            rec_rule?: {
                                                conditions?: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                perm?: number;
                                                other_perm?: number;
                                            };
                                            other_rec_rule?: {
                                                conditions?: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                perm?: number;
                                            };
                                            field_perm?: Record<string, number>;
                                            allow_add_record?: boolean;
                                            allow_delete_record?: boolean;
                                            view_perm?: number;
                                            view_rules?: Record<string, number>;
                                            field_action_rules?: Record<
                                                string,
                                                Record<string, number>
                                            >;
                                        }>;
                                        role_id?: string;
                                        block_roles?: Array<{
                                            block_id: string;
                                            block_perm: number;
                                            block_type?: "dashboard";
                                        }>;
                                        base_rule?: Record<string, number>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/base/v2/apps/:app_token/roles`,
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
                        params?: { page_size?: number; page_token?: string };
                        path: { app_token: string };
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
                                    `${this.domain}/open-apis/base/v2/apps/:app_token/roles`,
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
                                                        role_name: string;
                                                        table_roles: Array<{
                                                            table_perm: number;
                                                            table_name?: string;
                                                            table_id?: string;
                                                            rec_rule?: {
                                                                conditions?: Array<{
                                                                    field_name: string;
                                                                    operator?:
                                                                        | "is"
                                                                        | "isNot"
                                                                        | "contains"
                                                                        | "doesNotContain"
                                                                        | "isEmpty"
                                                                        | "isNotEmpty";
                                                                    value?: Array<string>;
                                                                    field_type?: number;
                                                                }>;
                                                                conjunction?:
                                                                    | "and"
                                                                    | "or";
                                                                perm?: number;
                                                                other_perm?: number;
                                                            };
                                                            other_rec_rule?: {
                                                                conditions?: Array<{
                                                                    field_name: string;
                                                                    operator?:
                                                                        | "is"
                                                                        | "isNot"
                                                                        | "contains"
                                                                        | "doesNotContain"
                                                                        | "isEmpty"
                                                                        | "isNotEmpty";
                                                                    value?: Array<string>;
                                                                    field_type?: number;
                                                                }>;
                                                                conjunction?:
                                                                    | "and"
                                                                    | "or";
                                                                perm?: number;
                                                            };
                                                            field_perm?: Record<
                                                                string,
                                                                number
                                                            >;
                                                            allow_add_record?: boolean;
                                                            allow_delete_record?: boolean;
                                                            view_perm?: number;
                                                            view_rules?: Record<
                                                                string,
                                                                number
                                                            >;
                                                            field_action_rules?: Record<
                                                                string,
                                                                Record<
                                                                    string,
                                                                    number
                                                                >
                                                            >;
                                                        }>;
                                                        role_id?: string;
                                                        block_roles?: Array<{
                                                            block_id: string;
                                                            block_perm: number;
                                                            block_type?: "dashboard";
                                                        }>;
                                                        base_rule?: Record<
                                                            string,
                                                            number
                                                        >;
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
                 * {@link https://open.feishu.cn/api-explorer?project=base&resource=app.role&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=base&resource=app.role&version=v2 document }
                 *
                 * 列出自定义角色
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
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
                                data?: {
                                    items?: Array<{
                                        role_name: string;
                                        table_roles: Array<{
                                            table_perm: number;
                                            table_name?: string;
                                            table_id?: string;
                                            rec_rule?: {
                                                conditions?: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                perm?: number;
                                                other_perm?: number;
                                            };
                                            other_rec_rule?: {
                                                conditions?: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                perm?: number;
                                            };
                                            field_perm?: Record<string, number>;
                                            allow_add_record?: boolean;
                                            allow_delete_record?: boolean;
                                            view_perm?: number;
                                            view_rules?: Record<string, number>;
                                            field_action_rules?: Record<
                                                string,
                                                Record<string, number>
                                            >;
                                        }>;
                                        role_id?: string;
                                        block_roles?: Array<{
                                            block_id: string;
                                            block_perm: number;
                                            block_type?: "dashboard";
                                        }>;
                                        base_rule?: Record<string, number>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/base/v2/apps/:app_token/roles`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=base&resource=app.role&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=base&resource=app.role&version=v2 document }
                 *
                 * 更新自定义角色
                 */
                update: async (
                    payload?: {
                        data: {
                            role_name: string;
                            table_roles: Array<{
                                table_perm: number;
                                table_name?: string;
                                table_id?: string;
                                rec_rule?: {
                                    conditions?: Array<{
                                        field_name: string;
                                        operator?:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty";
                                        value?: Array<string>;
                                    }>;
                                    conjunction?: "and" | "or";
                                    other_perm?: number;
                                };
                                other_rec_rule?: {
                                    conditions?: Array<{
                                        field_name: string;
                                        operator?:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty";
                                        value?: Array<string>;
                                    }>;
                                    conjunction?: "and" | "or";
                                };
                                field_perm?: Record<string, number>;
                                allow_add_record?: boolean;
                                allow_delete_record?: boolean;
                                view_perm?: number;
                                view_rules?: Record<string, number>;
                                field_action_rules?: Record<
                                    string,
                                    Record<string, number>
                                >;
                            }>;
                            block_roles?: Array<{
                                block_id: string;
                                block_perm: number;
                            }>;
                            base_rule?: Record<string, number>;
                        };
                        path: { app_token: string; role_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    role?: {
                                        role_name: string;
                                        table_roles: Array<{
                                            table_perm: number;
                                            table_name?: string;
                                            table_id?: string;
                                            rec_rule?: {
                                                conditions?: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                perm?: number;
                                                other_perm?: number;
                                            };
                                            other_rec_rule?: {
                                                conditions?: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                perm?: number;
                                            };
                                            field_perm?: Record<string, number>;
                                            allow_add_record?: boolean;
                                            allow_delete_record?: boolean;
                                            view_perm?: number;
                                            view_rules?: Record<string, number>;
                                            field_action_rules?: Record<
                                                string,
                                                Record<string, number>
                                            >;
                                        }>;
                                        role_id?: string;
                                        block_roles?: Array<{
                                            block_id: string;
                                            block_perm: number;
                                            block_type?: "dashboard";
                                        }>;
                                        base_rule?: Record<string, number>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/base/v2/apps/:app_token/roles/:role_id`,
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
    };
}
