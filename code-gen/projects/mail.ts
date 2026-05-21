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
import lingo from "./lingo";

// auto gen
export default abstract class Client extends lingo {
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
     * 邮箱
     */
    mail = {
        /**
         * 邮件组别名
         */
        mailgroupAlias: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.alias&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/create document }
             *
             * 创建邮件组别名
             *
             * 创建邮件组别名
             */
            create: async (
                payload?: {
                    data?: { email_alias?: string };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                mailgroup_alias?: {
                                    primary_email?: string;
                                    email_alias?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.alias&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/delete document }
             *
             * 删除邮件组别名
             *
             * 删除邮件组别名
             */
            delete: async (
                payload?: {
                    path?: { mailgroup_id?: string; alias_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases/:alias_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.alias&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/list document }
             *
             * 获取邮件组所有别名
             *
             * 获取邮件组所有别名
             */
            list: async (
                payload?: {
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    primary_email?: string;
                                    email_alias?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases`,
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
         * 邮件组
         */
        mailgroup: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/create document }
             *
             * 创建邮件组
             *
             * 创建一个邮件组
             */
            create: async (
                payload?: {
                    data?: {
                        email?: string;
                        name?: string;
                        description?: string;
                        who_can_send_mail?:
                            | "ANYONE"
                            | "ALL_INTERNAL_USERS"
                            | "ALL_GROUP_MEMBERS"
                            | "CUSTOM_MEMBERS";
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
                                mailgroup_id?: string;
                                email?: string;
                                name?: string;
                                description?: string;
                                direct_members_count?: string;
                                include_external_member?: boolean;
                                include_all_company_member?: boolean;
                                who_can_send_mail?:
                                    | "ANYONE"
                                    | "ALL_INTERNAL_USERS"
                                    | "ALL_GROUP_MEMBERS"
                                    | "CUSTOM_MEMBERS";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/delete document }
             *
             * 删除邮件组
             *
             * 删除一个邮件组
             */
            delete: async (
                payload?: {
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/get document }
             *
             * 获取邮件组
             *
             * 获取特定邮件组信息
             */
            get: async (
                payload?: {
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                mailgroup_id?: string;
                                email?: string;
                                name?: string;
                                description?: string;
                                direct_members_count?: string;
                                include_external_member?: boolean;
                                include_all_company_member?: boolean;
                                who_can_send_mail?:
                                    | "ANYONE"
                                    | "ALL_INTERNAL_USERS"
                                    | "ALL_GROUP_MEMBERS"
                                    | "CUSTOM_MEMBERS";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`,
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
                    params?: {
                        manager_user_id?: string;
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
                                `${this.domain}/open-apis/mail/v1/mailgroups`,
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
                                                    mailgroup_id?: string;
                                                    email?: string;
                                                    name?: string;
                                                    description?: string;
                                                    direct_members_count?: string;
                                                    include_external_member?: boolean;
                                                    include_all_company_member?: boolean;
                                                    who_can_send_mail?:
                                                        | "ANYONE"
                                                        | "ALL_INTERNAL_USERS"
                                                        | "ALL_GROUP_MEMBERS"
                                                        | "CUSTOM_MEMBERS";
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/list document }
             *
             * 批量获取邮件组
             *
             * 分页批量获取邮件组
             */
            list: async (
                payload?: {
                    params?: {
                        manager_user_id?: string;
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
                                    mailgroup_id?: string;
                                    email?: string;
                                    name?: string;
                                    description?: string;
                                    direct_members_count?: string;
                                    include_external_member?: boolean;
                                    include_all_company_member?: boolean;
                                    who_can_send_mail?:
                                        | "ANYONE"
                                        | "ALL_INTERNAL_USERS"
                                        | "ALL_GROUP_MEMBERS"
                                        | "CUSTOM_MEMBERS";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/patch document }
             *
             * 修改邮件组
             *
             * 更新邮件组部分字段，没有填写的字段不会被更新
             */
            patch: async (
                payload?: {
                    data?: {
                        email?: string;
                        name?: string;
                        description?: string;
                        who_can_send_mail?:
                            | "ANYONE"
                            | "ALL_INTERNAL_USERS"
                            | "ALL_GROUP_MEMBERS"
                            | "CUSTOM_MEMBERS";
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                mailgroup_id?: string;
                                email?: string;
                                name?: string;
                                description?: string;
                                direct_members_count?: string;
                                include_external_member?: boolean;
                                include_all_company_member?: boolean;
                                who_can_send_mail?:
                                    | "ANYONE"
                                    | "ALL_INTERNAL_USERS"
                                    | "ALL_GROUP_MEMBERS"
                                    | "CUSTOM_MEMBERS";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/update document }
             *
             * 更新邮件组
             *
             * 更新邮件组所有信息
             */
            update: async (
                payload?: {
                    data?: {
                        email?: string;
                        name?: string;
                        description?: string;
                        who_can_send_mail?:
                            | "ANYONE"
                            | "ALL_INTERNAL_USERS"
                            | "ALL_GROUP_MEMBERS"
                            | "CUSTOM_MEMBERS";
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                mailgroup_id?: string;
                                email?: string;
                                name?: string;
                                description?: string;
                                direct_members_count?: string;
                                include_external_member?: boolean;
                                include_all_company_member?: boolean;
                                who_can_send_mail?:
                                    | "ANYONE"
                                    | "ALL_INTERNAL_USERS"
                                    | "ALL_GROUP_MEMBERS"
                                    | "CUSTOM_MEMBERS";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`,
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
         * 邮件组管理员
         */
        mailgroupManager: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.manager&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/batch_create document }
             *
             * 批量创建邮件组管理员
             *
             * 批量创建邮件组管理员
             */
            batchCreate: async (
                payload?: {
                    data?: {
                        mailgroup_manager_list?: Array<{ user_id?: string }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/managers/batch_create`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.manager&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/batch_delete document }
             *
             * 批量删除邮件组管理员
             *
             * 批量删除邮件组管理员
             */
            batchDelete: async (
                payload?: {
                    data?: {
                        mailgroup_manager_list?: Array<{ user_id?: string }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/managers/batch_delete`,
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
                    path?: { mailgroup_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/managers`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.manager&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/list document }
             *
             * 批量获取邮件组管理员
             *
             * 批量获取邮件组管理员
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                items?: Array<{ user_id?: string }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/managers`,
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
         * 邮件组成员
         */
        mailgroupMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=mail&resource=mailgroup.member&version=v1 document }
             */
            batchCreate: async (
                payload?: {
                    data?: {
                        items?: Array<{
                            member_id?: string;
                            email?: string;
                            user_id?: string;
                            department_id?: string;
                            type?:
                                | "USER"
                                | "DEPARTMENT"
                                | "COMPANY"
                                | "EXTERNAL_USER"
                                | "MAIL_GROUP"
                                | "PUBLIC_MAILBOX"
                                | "OTHER_MEMBER";
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    member_id?: string;
                                    email?: string;
                                    user_id?: string;
                                    department_id?: string;
                                    type?:
                                        | "USER"
                                        | "DEPARTMENT"
                                        | "COMPANY"
                                        | "EXTERNAL_USER"
                                        | "MAIL_GROUP"
                                        | "PUBLIC_MAILBOX"
                                        | "OTHER_MEMBER";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members/batch_create`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=mail&resource=mailgroup.member&version=v1 document }
             */
            batchDelete: async (
                payload?: {
                    data?: { member_id_list?: Array<string> };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members/batch_delete`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/create document }
             *
             * 创建邮件组成员
             *
             * 向邮件组添加单个成员
             */
            create: async (
                payload?: {
                    data?: {
                        email?: string;
                        user_id?: string;
                        department_id?: string;
                        type?:
                            | "USER"
                            | "DEPARTMENT"
                            | "COMPANY"
                            | "EXTERNAL_USER"
                            | "MAIL_GROUP"
                            | "PUBLIC_MAILBOX"
                            | "OTHER_MEMBER";
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                member_id?: string;
                                email?: string;
                                user_id?: string;
                                department_id?: string;
                                type?:
                                    | "USER"
                                    | "DEPARTMENT"
                                    | "COMPANY"
                                    | "EXTERNAL_USER"
                                    | "MAIL_GROUP"
                                    | "PUBLIC_MAILBOX"
                                    | "OTHER_MEMBER";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/delete document }
             *
             * 删除邮件组成员
             *
             * 删除邮件组单个成员
             */
            delete: async (
                payload?: {
                    path?: { mailgroup_id?: string; member_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members/:member_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/get document }
             *
             * 获取邮件组成员信息
             *
             * 获取邮件组单个成员信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { mailgroup_id?: string; member_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                member_id?: string;
                                email?: string;
                                user_id?: string;
                                department_id?: string;
                                type?:
                                    | "USER"
                                    | "DEPARTMENT"
                                    | "COMPANY"
                                    | "EXTERNAL_USER"
                                    | "MAIL_GROUP"
                                    | "PUBLIC_MAILBOX"
                                    | "OTHER_MEMBER";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members/:member_id`,
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
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path?: { mailgroup_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members`,
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
                                                    member_id?: string;
                                                    email?: string;
                                                    user_id?: string;
                                                    department_id?: string;
                                                    type?:
                                                        | "USER"
                                                        | "DEPARTMENT"
                                                        | "COMPANY"
                                                        | "EXTERNAL_USER"
                                                        | "MAIL_GROUP"
                                                        | "PUBLIC_MAILBOX"
                                                        | "OTHER_MEMBER";
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/list document }
             *
             * 批量获取邮件组成员
             *
             * 分页批量获取邮件组成员列表
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    member_id?: string;
                                    email?: string;
                                    user_id?: string;
                                    department_id?: string;
                                    type?:
                                        | "USER"
                                        | "DEPARTMENT"
                                        | "COMPANY"
                                        | "EXTERNAL_USER"
                                        | "MAIL_GROUP"
                                        | "PUBLIC_MAILBOX"
                                        | "OTHER_MEMBER";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members`,
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
         * 邮件组权限成员
         */
        mailgroupPermissionMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=mail&resource=mailgroup.permission_member&version=v1 document }
             */
            batchCreate: async (
                payload?: {
                    data?: {
                        items?: Array<{
                            permission_member_id?: string;
                            user_id?: string;
                            department_id?: string;
                            email?: string;
                            type?:
                                | "USER"
                                | "DEPARTMENT"
                                | "MAIL_GROUP"
                                | "PUBLIC_MAILBOX";
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    permission_member_id?: string;
                                    user_id?: string;
                                    department_id?: string;
                                    email?: string;
                                    type?:
                                        | "USER"
                                        | "DEPARTMENT"
                                        | "MAIL_GROUP"
                                        | "PUBLIC_MAILBOX";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/batch_create`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=mail&resource=mailgroup.permission_member&version=v1 document }
             */
            batchDelete: async (
                payload?: {
                    data: { permission_member_id_list: Array<string> };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/batch_delete`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/create document }
             *
             * 创建邮件组权限成员
             *
             * 向邮件组添加单个自定义权限成员，添加后该成员可发送邮件到该邮件组
             */
            create: async (
                payload?: {
                    data?: {
                        user_id?: string;
                        department_id?: string;
                        email?: string;
                        type?:
                            | "USER"
                            | "DEPARTMENT"
                            | "MAIL_GROUP"
                            | "PUBLIC_MAILBOX";
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                permission_member_id?: string;
                                user_id?: string;
                                department_id?: string;
                                email?: string;
                                type?:
                                    | "USER"
                                    | "DEPARTMENT"
                                    | "MAIL_GROUP"
                                    | "PUBLIC_MAILBOX";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/delete document }
             *
             * 删除邮件组权限成员
             *
             * 从自定义成员中删除单个成员，删除后该成员无法发送邮件到该邮件组
             */
            delete: async (
                payload?: {
                    path?: {
                        mailgroup_id?: string;
                        permission_member_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/:permission_member_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/get document }
             *
             * 获取邮件组权限成员
             *
             * 获取邮件组单个权限成员信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: {
                        mailgroup_id?: string;
                        permission_member_id?: string;
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
                                permission_member_id?: string;
                                user_id?: string;
                                department_id?: string;
                                email?: string;
                                type?:
                                    | "USER"
                                    | "DEPARTMENT"
                                    | "MAIL_GROUP"
                                    | "PUBLIC_MAILBOX";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/:permission_member_id`,
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
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path?: { mailgroup_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members`,
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
                                                    permission_member_id?: string;
                                                    user_id?: string;
                                                    department_id?: string;
                                                    email?: string;
                                                    type?:
                                                        | "USER"
                                                        | "DEPARTMENT"
                                                        | "MAIL_GROUP"
                                                        | "PUBLIC_MAILBOX";
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/list document }
             *
             * 批量获取邮件组权限成员
             *
             * 分页批量获取邮件组权限成员列表
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path?: { mailgroup_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    permission_member_id?: string;
                                    user_id?: string;
                                    department_id?: string;
                                    email?: string;
                                    type?:
                                        | "USER"
                                        | "DEPARTMENT"
                                        | "MAIL_GROUP"
                                        | "PUBLIC_MAILBOX";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members`,
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
         * 公共邮箱别名
         */
        publicMailboxAlias: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.alias&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/create document }
             *
             * 创建公共邮箱别名
             *
             * 创建公共邮箱别名
             */
            create: async (
                payload?: {
                    data?: { email_alias?: string };
                    path?: { public_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                public_mailbox_alias?: {
                                    primary_email?: string;
                                    email_alias?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.alias&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/delete document }
             *
             * 删除公共邮箱别名
             *
             * 删除公共邮箱别名
             */
            delete: async (
                payload?: {
                    path?: { public_mailbox_id?: string; alias_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases/:alias_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.alias&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/list document }
             *
             * 获取所有公共邮箱别名
             *
             * 获取所有公共邮箱别名
             */
            list: async (
                payload?: {
                    path?: { public_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    primary_email?: string;
                                    email_alias?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases`,
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
         * 公共邮箱
         */
        publicMailbox: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/create document }
             *
             * 创建公共邮箱
             *
             * 创建一个公共邮箱
             */
            create: async (
                payload?: {
                    data?: { email?: string; name?: string; geo?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                public_mailbox_id?: string;
                                email?: string;
                                name?: string;
                                geo?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/delete document }
             *
             * 释放公共邮箱地址
             *
             * 该接口会永久删除公共邮箱地址。可用于释放邮箱回收站的公共邮箱地址，一旦删除，该邮箱地址将无法恢复。
             */
            delete: async (
                payload?: {
                    path: { public_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/get document }
             *
             * 获取公共邮箱
             *
             * 获取公共邮箱信息
             */
            get: async (
                payload?: {
                    path?: { public_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                public_mailbox_id?: string;
                                email?: string;
                                name?: string;
                                geo?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`,
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
                    params?: {
                        user_id?: string;
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
                                `${this.domain}/open-apis/mail/v1/public_mailboxes`,
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
                                                    public_mailbox_id?: string;
                                                    email?: string;
                                                    name?: string;
                                                    geo?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/list document }
             *
             * 批量获取公共邮箱
             *
             * 分页批量获取公共邮箱列表
             */
            list: async (
                payload?: {
                    params?: {
                        user_id?: string;
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
                                    public_mailbox_id?: string;
                                    email?: string;
                                    name?: string;
                                    geo?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/patch document }
             *
             * 修改公共邮箱
             *
             * 更新公共邮箱部分字段，没有填写的字段不会被更新
             */
            patch: async (
                payload?: {
                    data?: { email?: string; name?: string; geo?: string };
                    path?: { public_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                public_mailbox_id?: string;
                                email?: string;
                                name?: string;
                                geo?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=remove_to_recycle_bin&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_to_recycle_bin&project=mail&resource=public_mailbox&version=v1 document }
             */
            removeToRecycleBin: async (
                payload?: {
                    data?: { to_mail_address?: string };
                    path: { public_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/remove_to_recycle_bin`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/update document }
             *
             * 更新公共邮箱
             *
             * 更新公共邮箱所有信息
             */
            update: async (
                payload?: {
                    data?: { email?: string; name?: string; geo?: string };
                    path?: { public_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                public_mailbox_id?: string;
                                email?: string;
                                name?: string;
                                geo?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`,
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
         * 公共邮箱成员
         */
        publicMailboxMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=mail&resource=public_mailbox.member&version=v1 document }
             */
            batchCreate: async (
                payload?: {
                    data: {
                        items: Array<{
                            member_id?: string;
                            user_id?: string;
                            type?: "USER";
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { public_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    member_id?: string;
                                    user_id?: string;
                                    type?: "USER";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/batch_create`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=mail&resource=public_mailbox.member&version=v1 document }
             */
            batchDelete: async (
                payload?: {
                    data: { member_id_list: Array<string> };
                    path?: { public_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/batch_delete`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=clear&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/clear document }
             *
             * 清空公共邮箱成员
             *
             * 删除公共邮箱所有成员
             */
            clear: async (
                payload?: {
                    path?: { public_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/clear`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/create document }
             *
             * 创建公共邮箱成员
             *
             * 向公共邮箱添加单个成员
             */
            create: async (
                payload?: {
                    data?: { user_id?: string; type?: "USER" };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { public_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                member_id?: string;
                                user_id?: string;
                                type?: "USER";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/delete document }
             *
             * 删除公共邮箱成员
             *
             * 删除公共邮箱单个成员
             */
            delete: async (
                payload?: {
                    path?: { public_mailbox_id?: string; member_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/:member_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/get document }
             *
             * 获取公共邮箱成员信息
             *
             * 获取公共邮箱单个成员信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { public_mailbox_id?: string; member_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                member_id?: string;
                                user_id?: string;
                                type?: "USER";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/:member_id`,
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
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path?: { public_mailbox_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members`,
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
                                                    member_id?: string;
                                                    user_id?: string;
                                                    type?: "USER";
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/list document }
             *
             * 批量获取公共邮箱成员
             *
             * 分页批量获取公共邮箱成员列表
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path?: { public_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    member_id?: string;
                                    user_id?: string;
                                    type?: "USER";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members`,
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
         * 邮箱地址
         */
        user: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user/query document }
             *
             * 邮箱状态查询
             *
             * 使用邮箱状态查询接口，可以输入邮箱地址，查询出该邮箱地址对应的类型以及状态
             */
            query: async (
                payload?: {
                    data: { email_list: Array<string> };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_list?: Array<{
                                    email?: string;
                                    status?: number;
                                    type?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/users/query`,
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
         * 用户邮箱
         */
        userMailbox: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox&apiName=accessible_mailboxes&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=accessible_mailboxes&project=mail&resource=user_mailbox&version=v1 document }
             *
             * 获取主账号的所有可访问邮箱，包括主邮箱和公共邮箱
             */
            accessibleMailboxes: async (
                payload?: {
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                accessible_mailboxes?: Array<{
                                    email_address?: string;
                                    email_type?:
                                        | "MAIL_GROUP"
                                        | "PUBLIC_MAILBOX"
                                        | "USER_PRIMARY"
                                        | "USER_ALIAS"
                                        | "PUBLIC_MAILBOX_ALIAS";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/accessible_mailboxes`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox/delete document }
             *
             * 释放用户邮箱地址
             *
             * 该接口会永久删除用户邮箱地址。可用于删除位于邮箱回收站中的用户邮箱地址，一旦删除，将无法恢复。该接口支持邮件的转移，可以将被释放邮箱的邮件转移到另外一个可以使用的邮箱中。
             */
            delete: async (
                payload?: {
                    params?: { transfer_mailbox?: string };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id`,
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
         * 用户邮箱别名
         */
        userMailboxAlias: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.alias&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/create document }
             *
             * 创建用户邮箱别名
             *
             * 创建用户邮箱别名
             */
            create: async (
                payload?: {
                    data?: { email_alias?: string };
                    path?: { user_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_mailbox_alias?: {
                                    primary_email?: string;
                                    email_alias?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.alias&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/delete document }
             *
             * 删除用户邮箱别名
             *
             * 删除用户邮箱别名
             */
            delete: async (
                payload?: {
                    path?: { user_mailbox_id?: string; alias_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases/:alias_id`,
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
                    params?: { page_token?: string; page_size?: number };
                    path?: { user_mailbox_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases`,
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
                                                    primary_email?: string;
                                                    email_alias?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.alias&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/list document }
             *
             * 获取用户邮箱所有别名
             *
             * 获取用户邮箱所有别名
             */
            list: async (
                payload?: {
                    params?: { page_token?: string; page_size?: number };
                    path?: { user_mailbox_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    primary_email?: string;
                                    email_alias?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases`,
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
         * user_mailbox.draft
         */
        userMailboxDraft: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.draft&version=v1 document }
             *
             * 创建草稿
             */
            create: async (
                payload?: {
                    data?: { raw?: string };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                draft?: {
                                    id?: string;
                                    message?: {
                                        raw?: string;
                                        subject?: string;
                                        to?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        cc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        bcc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        head_from?: {
                                            mail_address: string;
                                            name?: string;
                                        };
                                        body_html?: string;
                                        internal_date?: string;
                                        message_state?: number;
                                        smtp_message_id?: string;
                                        message_id?: string;
                                        attachments?: Array<{
                                            body: string;
                                            filename: string;
                                            id?: string;
                                            attachment_type?: number;
                                            is_inline?: boolean;
                                            cid?: string;
                                        }>;
                                        body_plain_text?: string;
                                        thread_id?: string;
                                        body_preview?: string;
                                        label_ids?: Array<string>;
                                        folder_id?: string;
                                        in_reply_to?: string;
                                        reply_to?: string;
                                        priority_type?: "0" | "1" | "3" | "5";
                                        security_level?: {
                                            is_risk?: boolean;
                                            risk_banner_level?:
                                                | "WARNING"
                                                | "DANGER"
                                                | "INFO";
                                            risk_banner_reason?:
                                                | "NO_REASON"
                                                | "IMPERSONATE_DOMAIN"
                                                | "IMPERSONATE_KP_NAME"
                                                | "UNAUTH_EXTERNAL"
                                                | "MALICIOUS_URL"
                                                | "MALICIOUS_ATTACHMENT"
                                                | "PHISHING"
                                                | "IMPERSONATE_PARTNER"
                                                | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                            is_header_from_external?: boolean;
                                            via_domain?: string;
                                            spam_banner_type?:
                                                | "USER_REPORT"
                                                | "USER_BLOCK"
                                                | "ANTI_SPAM"
                                                | "USER_RULE"
                                                | "BLOCK_DOMIN"
                                                | "BLOCK_ADDRESS";
                                            spam_user_rule_id?: string;
                                            spam_banner_info?: string;
                                        };
                                        references?: string;
                                        body_calendar?: string;
                                    };
                                };
                                reference?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.draft&version=v1 document }
             *
             * 删除指定邮箱账户下的单份邮件草稿。注意：对于草稿状态的邮件，只能使用本接口删除，禁止使用 trash_message；被删除的草稿数据无法恢复，请谨慎使用。
             */
            delete: async (
                payload?: {
                    path: { user_mailbox_id: string; draft_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts/:draft_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.draft&version=v1 document }
             *
             * 获取草稿详情
             */
            get: async (
                payload?: {
                    params?: { format?: "metadata" | "raw" | "full" };
                    path: { user_mailbox_id: string; draft_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                draft?: {
                                    id?: string;
                                    message?: {
                                        subject?: string;
                                        to?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        cc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        bcc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        head_from?: {
                                            mail_address: string;
                                            name?: string;
                                        };
                                        body_html?: string;
                                        internal_date?: string;
                                        message_state?: number;
                                        smtp_message_id?: string;
                                        message_id?: string;
                                        attachments?: Array<{
                                            filename: string;
                                            id?: string;
                                            attachment_type?: number;
                                            is_inline?: boolean;
                                            cid?: string;
                                        }>;
                                        body_plain_text?: string;
                                        thread_id?: string;
                                        body_preview?: string;
                                        label_ids?: Array<string>;
                                        folder_id?: string;
                                        in_reply_to?: string;
                                        reply_to?: string;
                                        priority_type?: "0" | "1" | "3" | "5";
                                        security_level?: {
                                            is_risk?: boolean;
                                            risk_banner_level?:
                                                | "WARNING"
                                                | "DANGER"
                                                | "INFO";
                                            risk_banner_reason?:
                                                | "NO_REASON"
                                                | "IMPERSONATE_DOMAIN"
                                                | "IMPERSONATE_KP_NAME"
                                                | "UNAUTH_EXTERNAL"
                                                | "MALICIOUS_URL"
                                                | "MALICIOUS_ATTACHMENT"
                                                | "PHISHING"
                                                | "IMPERSONATE_PARTNER"
                                                | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                            is_header_from_external?: boolean;
                                            via_domain?: string;
                                            spam_banner_type?:
                                                | "USER_REPORT"
                                                | "USER_BLOCK"
                                                | "ANTI_SPAM"
                                                | "USER_RULE"
                                                | "BLOCK_DOMIN"
                                                | "BLOCK_ADDRESS";
                                            spam_user_rule_id?: string;
                                            spam_banner_info?: string;
                                        };
                                        references?: string;
                                        body_calendar?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts/:draft_id`,
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
                    params?: { page_size?: number; page_token?: string };
                    path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts`,
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
                                                items?: Array<{ id?: string }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.draft&version=v1 document }
             *
             * 拉取草稿列表
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                items?: Array<{ id?: string }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=send&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=send&project=mail&resource=user_mailbox.draft&version=v1 document }
             *
             * 发送草稿
             */
            send: async (
                payload?: {
                    data?: { send_time?: string };
                    path: { user_mailbox_id: string; draft_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                message_id?: string;
                                thread_id?: string;
                                recall_status?: "unavailable" | "available";
                                automation_send_disable?: {
                                    reason?: string;
                                    reference?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts/:draft_id/send`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mail&resource=user_mailbox.draft&version=v1 document }
             *
             * 更新草稿
             */
            update: async (
                payload?: {
                    data: { raw: string };
                    path: { user_mailbox_id: string; draft_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                draft?: {
                                    id?: string;
                                    message?: {
                                        raw?: string;
                                        subject?: string;
                                        to?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        cc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        bcc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        head_from?: {
                                            mail_address: string;
                                            name?: string;
                                        };
                                        body_html?: string;
                                        internal_date?: string;
                                        message_state?: number;
                                        smtp_message_id?: string;
                                        message_id?: string;
                                        attachments?: Array<{
                                            body: string;
                                            filename: string;
                                            id?: string;
                                            attachment_type?: number;
                                            is_inline?: boolean;
                                            cid?: string;
                                        }>;
                                        body_plain_text?: string;
                                        thread_id?: string;
                                        body_preview?: string;
                                        label_ids?: Array<string>;
                                        folder_id?: string;
                                        in_reply_to?: string;
                                        reply_to?: string;
                                        priority_type?: "0" | "1" | "3" | "5";
                                        security_level?: {
                                            is_risk?: boolean;
                                            risk_banner_level?:
                                                | "WARNING"
                                                | "DANGER"
                                                | "INFO";
                                            risk_banner_reason?:
                                                | "NO_REASON"
                                                | "IMPERSONATE_DOMAIN"
                                                | "IMPERSONATE_KP_NAME"
                                                | "UNAUTH_EXTERNAL"
                                                | "MALICIOUS_URL"
                                                | "MALICIOUS_ATTACHMENT"
                                                | "PHISHING"
                                                | "IMPERSONATE_PARTNER"
                                                | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                            is_header_from_external?: boolean;
                                            via_domain?: string;
                                            spam_banner_type?:
                                                | "USER_REPORT"
                                                | "USER_BLOCK"
                                                | "ANTI_SPAM"
                                                | "USER_RULE"
                                                | "BLOCK_DOMIN"
                                                | "BLOCK_ADDRESS";
                                            spam_user_rule_id?: string;
                                            spam_banner_info?: string;
                                        };
                                        references?: string;
                                        body_calendar?: string;
                                    };
                                };
                                reference?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts/:draft_id`,
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
         * user_mailbox.event
         */
        userMailboxEvent: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.event&apiName=subscribe&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscribe&project=mail&resource=user_mailbox.event&version=v1 document }
             *
             * 订阅收信事件
             */
            subscribe: async (
                payload?: {
                    data: { event_type: number };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/event/subscribe`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.event&apiName=subscription&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=mail&resource=user_mailbox.event&version=v1 document }
             *
             * 查询订阅的收信事件
             */
            subscription: async (
                payload?: {
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { event_types?: Array<number> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/event/subscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.event&apiName=unsubscribe&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscribe&project=mail&resource=user_mailbox.event&version=v1 document }
             *
             * 取消订阅收信事件
             */
            unsubscribe: async (
                payload?: {
                    data: { event_type: number };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/event/unsubscribe`,
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
         * user_mailbox.folder
         */
        userMailboxFolder: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.folder&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.folder&version=v1 document }
             *
             * 创建邮箱文件夹
             */
            create: async (
                payload?: {
                    data: { name: string; parent_folder_id: string };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                folder?: {
                                    id?: string;
                                    name: string;
                                    parent_folder_id: string;
                                    folder_type?: number;
                                    unread_message_count?: number;
                                    unread_thread_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/folders`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.folder&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.folder&version=v1 document }
             *
             * 删除用户文件夹。删除后文件夹数据无法恢复，请谨慎使用；删除文件夹会将该文件夹下的邮件移至已删除文件夹中。
             */
            delete: async (
                payload?: {
                    path: { user_mailbox_id: string; folder_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/folders/:folder_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.folder&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.folder&version=v1 document }
             *
             * 获取指定邮箱账户下的单个邮件文件夹详情
             */
            get: async (
                payload?: {
                    path: { user_mailbox_id: string; folder_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                folder?: {
                                    id?: string;
                                    name: string;
                                    parent_folder_id: string;
                                    folder_type?: number;
                                    unread_message_count?: number;
                                    unread_thread_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/folders/:folder_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.folder&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.folder&version=v1 document }
             *
             * 列出用户文件夹，可获取文件夹名称、文件夹ID、文件夹下的未读邮件和未读会话数量
             */
            list: async (
                payload?: {
                    params?: { folder_type?: number };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    name: string;
                                    parent_folder_id: string;
                                    folder_type?: number;
                                    unread_message_count?: number;
                                    unread_thread_count?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/folders`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.folder&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=mail&resource=user_mailbox.folder&version=v1 document }
             *
             * 更新用户文件夹
             */
            patch: async (
                payload?: {
                    data?: { name?: string; parent_folder_id?: string };
                    path: { user_mailbox_id: string; folder_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/folders/:folder_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
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
         * user_mailbox.label
         */
        userMailboxLabel: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.label&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.label&version=v1 document }
             *
             * 根据用户指定的名称、颜色等信息，创建邮件标签
             */
            create: async (
                payload?: {
                    data: {
                        label: { name: string; background_color?: string };
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                label?: {
                                    id?: string;
                                    name?: string;
                                    background_color?: string;
                                    messages_unread?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/labels`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.label&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.label&version=v1 document }
             *
             * 删除用户指定的标签，注意，删除的标签无法恢复
             */
            delete: async (
                payload?: {
                    path: { user_mailbox_id: string; label_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/labels/:label_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.label&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.label&version=v1 document }
             *
             * 根据指定ID，获取邮件标签信息，包括名称、未读数据、颜色等信息
             */
            get: async (
                payload?: {
                    path: { user_mailbox_id: string; label_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                label?: {
                                    id?: string;
                                    name?: string;
                                    background_color?: string;
                                    messages_unread?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/labels/:label_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.label&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.label&version=v1 document }
             *
             * 列出邮件标签，包括ID、名称、颜色、未读信息等内容
             */
            list: async (
                payload?: {
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    name?: string;
                                    background_color?: string;
                                    messages_unread?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/labels`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.label&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=mail&resource=user_mailbox.label&version=v1 document }
             *
             * 更新邮件标签
             */
            patch: async (
                payload?: {
                    data: {
                        label: { name?: string; background_color?: string };
                    };
                    path: { user_mailbox_id: string; label_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                label?: {
                                    id?: string;
                                    name?: string;
                                    background_color?: string;
                                    messages_unread?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/labels/:label_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
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
         * user_mailbox.mail_contact
         */
        userMailboxMailContact: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.mail_contact&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.mail_contact&version=v1 document }
             *
             * 创建邮箱联系人
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        company?: string;
                        phone?: string;
                        mail_address?: string;
                        tag?: string;
                        remark?: string;
                        position?: string;
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                mail_contact?: {
                                    id?: string;
                                    name: string;
                                    company?: string;
                                    phone?: string;
                                    mail_address?: string;
                                    tag?: string;
                                    remark?: string;
                                    avatar?: string;
                                    position?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/mail_contacts`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.mail_contact&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.mail_contact&version=v1 document }
             *
             * 删除指定的邮箱联系人
             */
            delete: async (
                payload?: {
                    path: { user_mailbox_id: string; mail_contact_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/mail_contacts/:mail_contact_id`,
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
                    params: { page_size: number; page_token?: string };
                    path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/mail_contacts`,
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
                                                    name: string;
                                                    company?: string;
                                                    phone?: string;
                                                    mail_address?: string;
                                                    tag?: string;
                                                    remark?: string;
                                                    avatar?: string;
                                                    position?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.mail_contact&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.mail_contact&version=v1 document }
             *
             * 列出邮箱联系人
             */
            list: async (
                payload?: {
                    params: { page_size: number; page_token?: string };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    name: string;
                                    company?: string;
                                    phone?: string;
                                    mail_address?: string;
                                    tag?: string;
                                    remark?: string;
                                    avatar?: string;
                                    position?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/mail_contacts`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.mail_contact&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=mail&resource=user_mailbox.mail_contact&version=v1 document }
             *
             * 更新邮箱联系人
             */
            patch: async (
                payload?: {
                    data: {
                        name: string;
                        company?: string;
                        phone?: string;
                        mail_address?: string;
                        tag?: string;
                        remark?: string;
                        position?: string;
                    };
                    path: { user_mailbox_id: string; mail_contact_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/mail_contacts/:mail_contact_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
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
         * user_mailbox.message.attachment
         */
        userMailboxMessageAttachment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message.attachment&apiName=download_url&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download_url&project=mail&resource=user_mailbox.message.attachment&version=v1 document }
             *
             * 获取附件下载链接
             */
            downloadUrl: async (
                payload?: {
                    params: { attachment_ids: Array<string> };
                    path: { user_mailbox_id: string; message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                download_urls?: Array<{
                                    attachment_id?: string;
                                    download_url?: string;
                                }>;
                                failed_ids?: Array<string>;
                                failed_reasons?: Array<{
                                    attachment_id?: string;
                                    reason?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/:message_id/attachments/download_url`,
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
         * user_mailbox.message
         */
        userMailboxMessage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=batch_get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=mail&resource=user_mailbox.message&version=v1 document }
             *
             * 通过指定邮件ID，获取对应邮件的标签、文件夹、摘要、正文、html、附件等信息。注意，如需获取摘要、正文、主题或收发件人地址，需要申请对应的字段权限。
             */
            batchGet: async (
                payload?: {
                    data?: {
                        format?: "full" | "plain_text_full" | "metadata";
                        message_ids?: Array<string>;
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    raw?: string;
                                    subject?: string;
                                    to?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    cc?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    bcc?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    head_from?: {
                                        mail_address: string;
                                        name?: string;
                                    };
                                    body_html?: string;
                                    internal_date?: string;
                                    message_state?: number;
                                    smtp_message_id?: string;
                                    message_id?: string;
                                    attachments?: Array<{
                                        body: string;
                                        filename: string;
                                        id?: string;
                                        attachment_type?: number;
                                        is_inline?: boolean;
                                        cid?: string;
                                    }>;
                                    body_plain_text?: string;
                                    thread_id?: string;
                                    body_preview?: string;
                                    label_ids?: Array<string>;
                                    folder_id?: string;
                                    in_reply_to?: string;
                                    reply_to?: string;
                                    priority_type?: "0" | "1" | "3" | "5";
                                    security_level?: {
                                        is_risk?: boolean;
                                        risk_banner_level?:
                                            | "WARNING"
                                            | "DANGER"
                                            | "INFO";
                                        risk_banner_reason?:
                                            | "NO_REASON"
                                            | "IMPERSONATE_DOMAIN"
                                            | "IMPERSONATE_KP_NAME"
                                            | "UNAUTH_EXTERNAL"
                                            | "MALICIOUS_URL"
                                            | "MALICIOUS_ATTACHMENT"
                                            | "PHISHING"
                                            | "IMPERSONATE_PARTNER"
                                            | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                        is_header_from_external?: boolean;
                                        via_domain?: string;
                                        spam_banner_type?:
                                            | "USER_REPORT"
                                            | "USER_BLOCK"
                                            | "ANTI_SPAM"
                                            | "USER_RULE"
                                            | "BLOCK_DOMIN"
                                            | "BLOCK_ADDRESS";
                                        spam_user_rule_id?: string;
                                        spam_banner_info?: string;
                                    };
                                    references?: string;
                                    body_calendar?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/batch_get`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=batch_modify&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_modify&project=mail&resource=user_mailbox.message&version=v1 document }
             *
             * 本接口提供修改邮件的能力，支持移动邮件的文件夹、给邮件添加和移除标签、标记邮件读和未读、移动邮件至垃圾邮件等能力。不支持移动邮件到已删除文件夹，如需，请使用批量删除邮件接口。
             */
            batchModify: async (
                payload?: {
                    data?: {
                        message_ids?: Array<string>;
                        add_label_ids?: Array<string>;
                        remove_label_ids?: Array<string>;
                        add_folder?: string;
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/batch_modify`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=batch_trash&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_trash&project=mail&resource=user_mailbox.message&version=v1 document }
             *
             * 通过指定邮件ID，批量移动邮件到已删除文件夹
             */
            batchTrash: async (
                payload?: {
                    data?: { message_ids?: Array<string> };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/batch_trash`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.message&version=v1 document }
             *
             * 获取邮件详情
             */
            get: async (
                payload?: {
                    params?: {
                        format?: "full" | "plain_text_full" | "metadata";
                    };
                    path: { user_mailbox_id: string; message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                message?: {
                                    subject?: string;
                                    to?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    cc?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    bcc?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    head_from?: {
                                        mail_address: string;
                                        name?: string;
                                    };
                                    body_html?: string;
                                    internal_date?: string;
                                    message_state?: number;
                                    smtp_message_id?: string;
                                    message_id?: string;
                                    attachments?: Array<{
                                        filename: string;
                                        id?: string;
                                        attachment_type?: number;
                                        is_inline?: boolean;
                                        cid?: string;
                                    }>;
                                    body_plain_text?: string;
                                    thread_id?: string;
                                    body_preview?: string;
                                    label_ids?: Array<string>;
                                    folder_id?: string;
                                    in_reply_to?: string;
                                    reply_to?: string;
                                    priority_type?: "0" | "1" | "3" | "5";
                                    security_level?: {
                                        is_risk?: boolean;
                                        risk_banner_level?:
                                            | "WARNING"
                                            | "DANGER"
                                            | "INFO";
                                        risk_banner_reason?:
                                            | "NO_REASON"
                                            | "IMPERSONATE_DOMAIN"
                                            | "IMPERSONATE_KP_NAME"
                                            | "UNAUTH_EXTERNAL"
                                            | "MALICIOUS_URL"
                                            | "MALICIOUS_ATTACHMENT"
                                            | "PHISHING"
                                            | "IMPERSONATE_PARTNER"
                                            | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                        is_header_from_external?: boolean;
                                        via_domain?: string;
                                        spam_banner_type?:
                                            | "USER_REPORT"
                                            | "USER_BLOCK"
                                            | "ANTI_SPAM"
                                            | "USER_RULE"
                                            | "BLOCK_DOMIN"
                                            | "BLOCK_ADDRESS";
                                        spam_user_rule_id?: string;
                                        spam_banner_info?: string;
                                    };
                                    references?: string;
                                    body_calendar?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/:message_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=get_by_card&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_by_card&project=mail&resource=user_mailbox.message&version=v1 document }
             *
             * 卡片ID获取邮件ID
             */
            getByCard: async (
                payload?: {
                    params: {
                        card_id: string;
                        owner_id: string;
                        user_id_type?: "open_id" | "user_id" | "union_id";
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                owner_info: {
                                    type: string;
                                    owner_user_id?: string;
                                    public_mailbox_id?: string;
                                };
                                message_ids: Array<string>;
                                card_id: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/get_by_card`,
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
                        folder_id?: string;
                        only_unread?: boolean;
                        label_id?: string;
                    };
                    path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages`,
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
                                                items?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.message&version=v1 document }
             *
             * 根据用户指定的标签或文件夹，列出对应位置下的邮件列表。注意，必须填写folder_id或label_id中的一个字段。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        folder_id?: string;
                        only_unread?: boolean;
                        label_id?: string;
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                items?: Array<string>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=list_thread_message&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_thread_message&project=mail&resource=user_mailbox.message&version=v1 document }
             *
             * 通过用户邮箱地址和邮件会话ID，获取该会话下的所有邮件关键信息列表。如需查询主题、正文、摘要、收发件人信息，请申请字段权限。
             */
            listThreadMessage: async (
                payload?: {
                    params?: {
                        format?: "full" | "plain_text_full" | "metadata";
                        include_spam_trash?: boolean;
                    };
                    path: { user_mailbox_id: string; thread_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    message_id?: string;
                                    thread_id?: string;
                                    folder_id?: string;
                                    smtp_message_id?: string;
                                    internal_date?: string;
                                    message_state?: number;
                                    message?: {
                                        raw?: string;
                                        subject?: string;
                                        to?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        cc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        bcc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        head_from?: {
                                            mail_address: string;
                                            name?: string;
                                        };
                                        body_html?: string;
                                        internal_date?: string;
                                        message_state?: number;
                                        smtp_message_id?: string;
                                        message_id?: string;
                                        attachments?: Array<{
                                            body: string;
                                            filename: string;
                                            id?: string;
                                            attachment_type?: number;
                                            is_inline?: boolean;
                                            cid?: string;
                                        }>;
                                        body_plain_text?: string;
                                        thread_id?: string;
                                        body_preview?: string;
                                        label_ids?: Array<string>;
                                        folder_id?: string;
                                        in_reply_to?: string;
                                        reply_to?: string;
                                        priority_type?: "0" | "1" | "3" | "5";
                                        security_level?: {
                                            is_risk?: boolean;
                                            risk_banner_level?:
                                                | "WARNING"
                                                | "DANGER"
                                                | "INFO";
                                            risk_banner_reason?:
                                                | "NO_REASON"
                                                | "IMPERSONATE_DOMAIN"
                                                | "IMPERSONATE_KP_NAME"
                                                | "UNAUTH_EXTERNAL"
                                                | "MALICIOUS_URL"
                                                | "MALICIOUS_ATTACHMENT"
                                                | "PHISHING"
                                                | "IMPERSONATE_PARTNER"
                                                | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                            is_header_from_external?: boolean;
                                            via_domain?: string;
                                            spam_banner_type?:
                                                | "USER_REPORT"
                                                | "USER_BLOCK"
                                                | "ANTI_SPAM"
                                                | "USER_RULE"
                                                | "BLOCK_DOMIN"
                                                | "BLOCK_ADDRESS";
                                            spam_user_rule_id?: string;
                                            spam_banner_info?: string;
                                        };
                                        references?: string;
                                        body_calendar?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/:thread_id/messages`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=modify&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=modify&project=mail&resource=user_mailbox.message&version=v1 document }
             *
             * 本接口提供修改邮件的能力，支持移动邮件的文件夹、给邮件添加和移除标签、标记邮件已读和未读、移动邮件至垃圾邮件等能力。不支持移动邮件到已删除文件夹，如需删除邮件，请使用删除邮件接口。至少填写add_label_ids、remove_label_ids、add_folder中的一个参数。
             */
            modify: async (
                payload?: {
                    data?: {
                        add_label_ids?: Array<string>;
                        remove_label_ids?: Array<string>;
                        add_folder?: string;
                    };
                    path: { user_mailbox_id: string; message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/:message_id/modify`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=send&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=send&project=mail&resource=user_mailbox.message&version=v1 document }
             */
            send: async (
                payload?: {
                    data?: {
                        subject?: string;
                        to?: Array<{ mail_address: string; name?: string }>;
                        raw?: string;
                        cc?: Array<{ mail_address: string; name?: string }>;
                        bcc?: Array<{ mail_address: string; name?: string }>;
                        body_html?: string;
                        body_plain_text?: string;
                        attachments?: Array<{
                            body: string;
                            filename: string;
                            is_inline?: boolean;
                            cid?: string;
                        }>;
                        dedupe_key?: string;
                        head_from?: { name?: string };
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { message_id?: string; thread_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/send`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=trash&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=trash&project=mail&resource=user_mailbox.message&version=v1 document }
             *
             * 移动邮件到已删除文件夹。注意，该接口无法删除草稿，如需删除草稿，请使用删除草稿接口
             */
            trash: async (
                payload?: {
                    path: { user_mailbox_id: string; message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/:message_id/trash`,
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
         * user_mailbox.rule
         */
        userMailboxRule: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.rule&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.rule&version=v1 document }
             *
             * 创建收信规则
             */
            create: async (
                payload?: {
                    data: {
                        condition: {
                            match_type: number;
                            items: Array<{
                                type: number;
                                operator?: number;
                                input?: string;
                            }>;
                        };
                        action: {
                            items: Array<{ type: number; input?: string }>;
                        };
                        ignore_the_rest_of_rules: boolean;
                        name: string;
                        is_enable: boolean;
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                rule?: {
                                    id?: string;
                                    condition: {
                                        match_type: number;
                                        items: Array<{
                                            type: number;
                                            operator?: number;
                                            input?: string;
                                        }>;
                                    };
                                    action: {
                                        items: Array<{
                                            type: number;
                                            input?: string;
                                        }>;
                                    };
                                    ignore_the_rest_of_rules: boolean;
                                    name: string;
                                    is_enable: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/rules`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.rule&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.rule&version=v1 document }
             *
             * 删除收信规则
             */
            delete: async (
                payload?: {
                    path: { user_mailbox_id: string; rule_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/rules/:rule_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.rule&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.rule&version=v1 document }
             *
             * 列出收信规则
             */
            list: async (
                payload?: {
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    condition: {
                                        match_type: number;
                                        items: Array<{
                                            type: number;
                                            operator?: number;
                                            input?: string;
                                        }>;
                                    };
                                    action: {
                                        items: Array<{
                                            type: number;
                                            input?: string;
                                        }>;
                                    };
                                    ignore_the_rest_of_rules: boolean;
                                    name: string;
                                    is_enable: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/rules`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.rule&apiName=reorder&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reorder&project=mail&resource=user_mailbox.rule&version=v1 document }
             */
            reorder: async (
                payload?: {
                    data: { rule_ids: Array<string> };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/rules/reorder`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.rule&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mail&resource=user_mailbox.rule&version=v1 document }
             */
            update: async (
                payload?: {
                    data: {
                        condition: {
                            match_type: number;
                            items: Array<{
                                type: number;
                                operator?: number;
                                input?: string;
                            }>;
                        };
                        action: {
                            items: Array<{ type: number; input?: string }>;
                        };
                        ignore_the_rest_of_rules: boolean;
                        name: string;
                        is_enable: boolean;
                    };
                    path: { user_mailbox_id: string; rule_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/rules/:rule_id`,
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
         * user_mailbox.setting
         */
        userMailboxSetting: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.setting&apiName=send_as&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=send_as&project=mail&resource=user_mailbox.setting&version=v1 document }
             *
             * 获取账号的所有可发信地址，包括主地址、别名地址、邮件组。可以使用用户地址访问该接口，也可以使用用户有权限的公共邮箱地址访问该接口。
             */
            sendAs: async (
                payload?: {
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                sendable_addresses?: Array<{
                                    email_address?: string;
                                    email_type?:
                                        | "MAIL_GROUP"
                                        | "PUBLIC_MAILBOX"
                                        | "USER_PRIMARY"
                                        | "USER_ALIAS"
                                        | "PUBLIC_MAILBOX_ALIAS";
                                    name?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/settings/send_as`,
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
         * user_mailbox.template.attachment
         */
        userMailboxTemplateAttachment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template.attachment&apiName=download_url&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download_url&project=mail&resource=user_mailbox.template.attachment&version=v1 document }
             *
             * 获取指定邮件模板下的附件下载链接。用于在已知模板 ID 与附件 ID 的场景下，二次获取附件的有效访问 URL，便于在用户端预览或下载邮件模板中的附件资源。
             */
            downloadUrl: async (
                payload?: {
                    params: { attachment_ids: Array<string> };
                    path: { user_mailbox_id: string; template_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                download_urls?: Array<{
                                    attachment_id?: string;
                                    download_url?: string;
                                }>;
                                failed_reasons?: Array<{
                                    attachment_id?: string;
                                    reason?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates/:template_id/attachments/download_url`,
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
         * user_mailbox.template
         */
        userMailboxTemplate: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.template&version=v1 document }
             *
             * 在指定用户邮箱下创建一份可复用的个人邮件模板。请求时需传入完整的模板对象（含名称、主题、正文、收件信息、附件等），创建成功后返回完整模板内容（含系统生成的 template_id），适用于将常用邮件内容沉淀为模板以便后续快速发送同类型邮件。
             */
            create: async (
                payload?: {
                    data: {
                        template: {
                            name: string;
                            subject?: string;
                            template_content?: string;
                            is_plain_text_mode?: boolean;
                            tos?: Array<{
                                mail_address: string;
                                name?: string;
                            }>;
                            ccs?: Array<{
                                mail_address: string;
                                name?: string;
                            }>;
                            bccs?: Array<{
                                mail_address: string;
                                name?: string;
                            }>;
                            attachments?: Array<{
                                filename?: string;
                                id?: string;
                                attachment_type?: number;
                                is_inline?: boolean;
                                cid?: string;
                            }>;
                        };
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                template?: {
                                    template_id?: string;
                                    name: string;
                                    subject?: string;
                                    template_content?: string;
                                    is_plain_text_mode?: boolean;
                                    tos?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    ccs?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    bccs?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    attachments?: Array<{
                                        filename?: string;
                                        id?: string;
                                        attachment_type?: number;
                                        is_inline?: boolean;
                                        cid?: string;
                                    }>;
                                    create_time?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.template&version=v1 document }
             *
             * 永久删除指定用户邮箱下的某个个人邮件模板。删除操作不可恢复，删除后该模板将无法在「列出邮件模板」「获取邮件模板」等接口中再返回，常用于清理已废弃或不再使用的模板。
             */
            delete: async (
                payload?: {
                    path: { user_mailbox_id: string; template_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates/:template_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.template&version=v1 document }
             *
             * 获取指定邮件模板的完整详情，包括模板名称、主题、正文（HTML 或纯文本）、收件人/抄送/密送地址、附件信息等所有字段。常用于编辑模板前回填表单，或在发送邮件场景下读取模板内容做二次填充。
             */
            get: async (
                payload?: {
                    path: { user_mailbox_id: string; template_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                template?: {
                                    template_id?: string;
                                    name: string;
                                    subject?: string;
                                    template_content?: string;
                                    is_plain_text_mode?: boolean;
                                    tos?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    ccs?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    bccs?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    attachments?: Array<{
                                        filename?: string;
                                        id?: string;
                                        attachment_type?: number;
                                        is_inline?: boolean;
                                        cid?: string;
                                    }>;
                                    create_time?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates/:template_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.template&version=v1 document }
             *
             * 列出指定用户邮箱下的全部个人邮件模板基本信息（一次性返回，不分页），常用于在编辑或发送邮件场景下展示可选模板列表。如需获取模板正文与附件等完整字段，请通过获取个人邮件模板详情接口按 `template_id` 查询。
             */
            list: async (
                payload?: {
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    template_id?: string;
                                    name?: string;
                                    create_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mail&resource=user_mailbox.template&version=v1 document }
             *
             * 以全量替换的方式更新指定邮件模板的所有字段（包括名称、主题、正文、附件、收件信息等）。本接口为「全量更新」语义：请求时需传入完整的模板对象，未携带的字段将被清空。**调用依赖**：如仅修改部分字段，请先调用获取个人邮件模板详情接口拿到完整模板，在本地修改后再传回本接口，以避免漏传字段导致数据丢失。
             */
            update: async (
                payload?: {
                    data: {
                        template: {
                            name: string;
                            subject?: string;
                            template_content?: string;
                            is_plain_text_mode?: boolean;
                            tos?: Array<{
                                mail_address: string;
                                name?: string;
                            }>;
                            ccs?: Array<{
                                mail_address: string;
                                name?: string;
                            }>;
                            bccs?: Array<{
                                mail_address: string;
                                name?: string;
                            }>;
                            attachments?: Array<{
                                filename?: string;
                                id?: string;
                                attachment_type?: number;
                                is_inline?: boolean;
                                cid?: string;
                            }>;
                        };
                    };
                    path: { user_mailbox_id: string; template_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                template?: {
                                    template_id?: string;
                                    name: string;
                                    subject?: string;
                                    template_content?: string;
                                    is_plain_text_mode?: boolean;
                                    tos?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    ccs?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    bccs?: Array<{
                                        mail_address: string;
                                        name?: string;
                                    }>;
                                    attachments?: Array<{
                                        filename?: string;
                                        id?: string;
                                        attachment_type?: number;
                                        is_inline?: boolean;
                                        cid?: string;
                                    }>;
                                    create_time?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates/:template_id`,
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
         * user_mailbox.thread
         */
        userMailboxThread: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=batch_modify&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_modify&project=mail&resource=user_mailbox.thread&version=v1 document }
             *
             * 本接口提供修改邮件会话的能力，支持移动邮件会话的文件夹、给邮件会话添加和移除标签、标记邮件会话读和未读、移动邮件会话至垃圾邮件等能力。不支持移动邮件会话到已删除文件夹，如需，请使用批量删除邮件会话接口。
             */
            batchModify: async (
                payload?: {
                    data?: {
                        add_label_ids?: Array<string>;
                        remove_label_ids?: Array<string>;
                        add_folder?: string;
                        thread_ids?: Array<string>;
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/batch_modify`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=batch_trash&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_trash&project=mail&resource=user_mailbox.thread&version=v1 document }
             *
             * 通过指定邮件会话ID，批量移动邮件到已删除文件夹
             */
            batchTrash: async (
                payload?: {
                    data?: { thread_ids?: Array<string> };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/batch_trash`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.thread&version=v1 document }
             *
             * 通过用户邮箱地址和邮件会话ID，获取该会话下的所有邮件关键信息列表。如需查询主题、正文、摘要、收发件人信息，请申请字段权限。
             */
            get: async (
                payload?: {
                    params?: {
                        format?: "full" | "plain_text_full" | "metadata";
                        include_spam_trash?: boolean;
                    };
                    path: { user_mailbox_id: string; thread_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                thread?: {
                                    id?: string;
                                    body_preview?: string;
                                    messages?: Array<{
                                        subject?: string;
                                        to?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        cc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        bcc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        head_from?: {
                                            mail_address: string;
                                            name?: string;
                                        };
                                        body_html?: string;
                                        internal_date?: string;
                                        message_state?: number;
                                        smtp_message_id?: string;
                                        message_id?: string;
                                        attachments?: Array<{
                                            filename: string;
                                            id?: string;
                                            attachment_type?: number;
                                            is_inline?: boolean;
                                            cid?: string;
                                        }>;
                                        body_plain_text?: string;
                                        thread_id?: string;
                                        body_preview?: string;
                                        label_ids?: Array<string>;
                                        folder_id?: string;
                                        in_reply_to?: string;
                                        reply_to?: string;
                                        priority_type?: "0" | "1" | "3" | "5";
                                        security_level?: {
                                            is_risk?: boolean;
                                            risk_banner_level?:
                                                | "WARNING"
                                                | "DANGER"
                                                | "INFO";
                                            risk_banner_reason?:
                                                | "NO_REASON"
                                                | "IMPERSONATE_DOMAIN"
                                                | "IMPERSONATE_KP_NAME"
                                                | "UNAUTH_EXTERNAL"
                                                | "MALICIOUS_URL"
                                                | "MALICIOUS_ATTACHMENT"
                                                | "PHISHING"
                                                | "IMPERSONATE_PARTNER"
                                                | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                            is_header_from_external?: boolean;
                                            via_domain?: string;
                                            spam_banner_type?:
                                                | "USER_REPORT"
                                                | "USER_BLOCK"
                                                | "ANTI_SPAM"
                                                | "USER_RULE"
                                                | "BLOCK_DOMIN"
                                                | "BLOCK_ADDRESS";
                                            spam_user_rule_id?: string;
                                            spam_banner_info?: string;
                                        };
                                        references?: string;
                                        body_calendar?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/:thread_id`,
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
                        folder_id?: string;
                        only_unread?: boolean;
                        label_id?: string;
                    };
                    path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads`,
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
                                                    body_preview?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.thread&version=v1 document }
             *
             * 通过指定文件夹或标签，列出对应位置下的邮件会话列表。接口可返回邮件会话ID和会话下最新一封邮件的摘要。folder_id 和 label_id 必须且只能提供一个。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        folder_id?: string;
                        only_unread?: boolean;
                        label_id?: string;
                    };
                    path: { user_mailbox_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    body_preview?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=modify&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=modify&project=mail&resource=user_mailbox.thread&version=v1 document }
             *
             * 本接口提供修改邮件会话的能力，支持移动邮件会话的文件夹、给邮件会话添加和移除标签、标记邮件会话读和未读、移动邮件会话至垃圾邮件等能力。不支持移动邮件会话到已删除文件夹，如需，请使用删除邮件会话接口。至少填写add_label_ids、remove_label_ids、add_folder中的一个参数。
             */
            modify: async (
                payload?: {
                    data?: {
                        add_label_ids?: Array<string>;
                        remove_label_ids?: Array<string>;
                        add_folder?: string;
                    };
                    path: { user_mailbox_id: string; thread_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/:thread_id/modify`,
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
             * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=trash&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=trash&project=mail&resource=user_mailbox.thread&version=v1 document }
             *
             * 移动指定的邮件会话到已删除文件夹
             */
            trash: async (
                payload?: {
                    path: { user_mailbox_id: string; thread_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/:thread_id/trash`,
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
             * 邮件组别名
             */
            mailgroupAlias: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.alias&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/create document }
                 *
                 * 创建邮件组别名
                 *
                 * 创建邮件组别名
                 */
                create: async (
                    payload?: {
                        data?: { email_alias?: string };
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    mailgroup_alias?: {
                                        primary_email?: string;
                                        email_alias?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.alias&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/delete document }
                 *
                 * 删除邮件组别名
                 *
                 * 删除邮件组别名
                 */
                delete: async (
                    payload?: {
                        path?: { mailgroup_id?: string; alias_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases/:alias_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.alias&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/list document }
                 *
                 * 获取邮件组所有别名
                 *
                 * 获取邮件组所有别名
                 */
                list: async (
                    payload?: {
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        primary_email?: string;
                                        email_alias?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases`,
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
             * 邮件组
             */
            mailgroup: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/create document }
                 *
                 * 创建邮件组
                 *
                 * 创建一个邮件组
                 */
                create: async (
                    payload?: {
                        data?: {
                            email?: string;
                            name?: string;
                            description?: string;
                            who_can_send_mail?:
                                | "ANYONE"
                                | "ALL_INTERNAL_USERS"
                                | "ALL_GROUP_MEMBERS"
                                | "CUSTOM_MEMBERS";
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
                                    mailgroup_id?: string;
                                    email?: string;
                                    name?: string;
                                    description?: string;
                                    direct_members_count?: string;
                                    include_external_member?: boolean;
                                    include_all_company_member?: boolean;
                                    who_can_send_mail?:
                                        | "ANYONE"
                                        | "ALL_INTERNAL_USERS"
                                        | "ALL_GROUP_MEMBERS"
                                        | "CUSTOM_MEMBERS";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/delete document }
                 *
                 * 删除邮件组
                 *
                 * 删除一个邮件组
                 */
                delete: async (
                    payload?: {
                        path?: { mailgroup_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/get document }
                 *
                 * 获取邮件组
                 *
                 * 获取特定邮件组信息
                 */
                get: async (
                    payload?: {
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    mailgroup_id?: string;
                                    email?: string;
                                    name?: string;
                                    description?: string;
                                    direct_members_count?: string;
                                    include_external_member?: boolean;
                                    include_all_company_member?: boolean;
                                    who_can_send_mail?:
                                        | "ANYONE"
                                        | "ALL_INTERNAL_USERS"
                                        | "ALL_GROUP_MEMBERS"
                                        | "CUSTOM_MEMBERS";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`,
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
                        params?: {
                            manager_user_id?: string;
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
                                    `${this.domain}/open-apis/mail/v1/mailgroups`,
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
                                                        mailgroup_id?: string;
                                                        email?: string;
                                                        name?: string;
                                                        description?: string;
                                                        direct_members_count?: string;
                                                        include_external_member?: boolean;
                                                        include_all_company_member?: boolean;
                                                        who_can_send_mail?:
                                                            | "ANYONE"
                                                            | "ALL_INTERNAL_USERS"
                                                            | "ALL_GROUP_MEMBERS"
                                                            | "CUSTOM_MEMBERS";
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/list document }
                 *
                 * 批量获取邮件组
                 *
                 * 分页批量获取邮件组
                 */
                list: async (
                    payload?: {
                        params?: {
                            manager_user_id?: string;
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
                                        mailgroup_id?: string;
                                        email?: string;
                                        name?: string;
                                        description?: string;
                                        direct_members_count?: string;
                                        include_external_member?: boolean;
                                        include_all_company_member?: boolean;
                                        who_can_send_mail?:
                                            | "ANYONE"
                                            | "ALL_INTERNAL_USERS"
                                            | "ALL_GROUP_MEMBERS"
                                            | "CUSTOM_MEMBERS";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/patch document }
                 *
                 * 修改邮件组
                 *
                 * 更新邮件组部分字段，没有填写的字段不会被更新
                 */
                patch: async (
                    payload?: {
                        data?: {
                            email?: string;
                            name?: string;
                            description?: string;
                            who_can_send_mail?:
                                | "ANYONE"
                                | "ALL_INTERNAL_USERS"
                                | "ALL_GROUP_MEMBERS"
                                | "CUSTOM_MEMBERS";
                        };
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    mailgroup_id?: string;
                                    email?: string;
                                    name?: string;
                                    description?: string;
                                    direct_members_count?: string;
                                    include_external_member?: boolean;
                                    include_all_company_member?: boolean;
                                    who_can_send_mail?:
                                        | "ANYONE"
                                        | "ALL_INTERNAL_USERS"
                                        | "ALL_GROUP_MEMBERS"
                                        | "CUSTOM_MEMBERS";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/update document }
                 *
                 * 更新邮件组
                 *
                 * 更新邮件组所有信息
                 */
                update: async (
                    payload?: {
                        data?: {
                            email?: string;
                            name?: string;
                            description?: string;
                            who_can_send_mail?:
                                | "ANYONE"
                                | "ALL_INTERNAL_USERS"
                                | "ALL_GROUP_MEMBERS"
                                | "CUSTOM_MEMBERS";
                        };
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    mailgroup_id?: string;
                                    email?: string;
                                    name?: string;
                                    description?: string;
                                    direct_members_count?: string;
                                    include_external_member?: boolean;
                                    include_all_company_member?: boolean;
                                    who_can_send_mail?:
                                        | "ANYONE"
                                        | "ALL_INTERNAL_USERS"
                                        | "ALL_GROUP_MEMBERS"
                                        | "CUSTOM_MEMBERS";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`,
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
             * 邮件组管理员
             */
            mailgroupManager: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.manager&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/batch_create document }
                 *
                 * 批量创建邮件组管理员
                 *
                 * 批量创建邮件组管理员
                 */
                batchCreate: async (
                    payload?: {
                        data?: {
                            mailgroup_manager_list?: Array<{
                                user_id?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { mailgroup_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/managers/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.manager&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/batch_delete document }
                 *
                 * 批量删除邮件组管理员
                 *
                 * 批量删除邮件组管理员
                 */
                batchDelete: async (
                    payload?: {
                        data?: {
                            mailgroup_manager_list?: Array<{
                                user_id?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { mailgroup_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/managers/batch_delete`,
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
                        path?: { mailgroup_id?: string };
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
                                    `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/managers`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.manager&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/list document }
                 *
                 * 批量获取邮件组管理员
                 *
                 * 批量获取邮件组管理员
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    items?: Array<{ user_id?: string }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/managers`,
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
             * 邮件组成员
             */
            mailgroupMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=mail&resource=mailgroup.member&version=v1 document }
                 */
                batchCreate: async (
                    payload?: {
                        data?: {
                            items?: Array<{
                                member_id?: string;
                                email?: string;
                                user_id?: string;
                                department_id?: string;
                                type?:
                                    | "USER"
                                    | "DEPARTMENT"
                                    | "COMPANY"
                                    | "EXTERNAL_USER"
                                    | "MAIL_GROUP"
                                    | "PUBLIC_MAILBOX"
                                    | "OTHER_MEMBER";
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        member_id?: string;
                                        email?: string;
                                        user_id?: string;
                                        department_id?: string;
                                        type?:
                                            | "USER"
                                            | "DEPARTMENT"
                                            | "COMPANY"
                                            | "EXTERNAL_USER"
                                            | "MAIL_GROUP"
                                            | "PUBLIC_MAILBOX"
                                            | "OTHER_MEMBER";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=mail&resource=mailgroup.member&version=v1 document }
                 */
                batchDelete: async (
                    payload?: {
                        data?: { member_id_list?: Array<string> };
                        path?: { mailgroup_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/create document }
                 *
                 * 创建邮件组成员
                 *
                 * 向邮件组添加单个成员
                 */
                create: async (
                    payload?: {
                        data?: {
                            email?: string;
                            user_id?: string;
                            department_id?: string;
                            type?:
                                | "USER"
                                | "DEPARTMENT"
                                | "COMPANY"
                                | "EXTERNAL_USER"
                                | "MAIL_GROUP"
                                | "PUBLIC_MAILBOX"
                                | "OTHER_MEMBER";
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    member_id?: string;
                                    email?: string;
                                    user_id?: string;
                                    department_id?: string;
                                    type?:
                                        | "USER"
                                        | "DEPARTMENT"
                                        | "COMPANY"
                                        | "EXTERNAL_USER"
                                        | "MAIL_GROUP"
                                        | "PUBLIC_MAILBOX"
                                        | "OTHER_MEMBER";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/delete document }
                 *
                 * 删除邮件组成员
                 *
                 * 删除邮件组单个成员
                 */
                delete: async (
                    payload?: {
                        path?: { mailgroup_id?: string; member_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members/:member_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/get document }
                 *
                 * 获取邮件组成员信息
                 *
                 * 获取邮件组单个成员信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { mailgroup_id?: string; member_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    member_id?: string;
                                    email?: string;
                                    user_id?: string;
                                    department_id?: string;
                                    type?:
                                        | "USER"
                                        | "DEPARTMENT"
                                        | "COMPANY"
                                        | "EXTERNAL_USER"
                                        | "MAIL_GROUP"
                                        | "PUBLIC_MAILBOX"
                                        | "OTHER_MEMBER";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members/:member_id`,
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
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path?: { mailgroup_id?: string };
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
                                    `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members`,
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
                                                        member_id?: string;
                                                        email?: string;
                                                        user_id?: string;
                                                        department_id?: string;
                                                        type?:
                                                            | "USER"
                                                            | "DEPARTMENT"
                                                            | "COMPANY"
                                                            | "EXTERNAL_USER"
                                                            | "MAIL_GROUP"
                                                            | "PUBLIC_MAILBOX"
                                                            | "OTHER_MEMBER";
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/list document }
                 *
                 * 批量获取邮件组成员
                 *
                 * 分页批量获取邮件组成员列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        member_id?: string;
                                        email?: string;
                                        user_id?: string;
                                        department_id?: string;
                                        type?:
                                            | "USER"
                                            | "DEPARTMENT"
                                            | "COMPANY"
                                            | "EXTERNAL_USER"
                                            | "MAIL_GROUP"
                                            | "PUBLIC_MAILBOX"
                                            | "OTHER_MEMBER";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members`,
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
             * 邮件组权限成员
             */
            mailgroupPermissionMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=mail&resource=mailgroup.permission_member&version=v1 document }
                 */
                batchCreate: async (
                    payload?: {
                        data?: {
                            items?: Array<{
                                permission_member_id?: string;
                                user_id?: string;
                                department_id?: string;
                                email?: string;
                                type?:
                                    | "USER"
                                    | "DEPARTMENT"
                                    | "MAIL_GROUP"
                                    | "PUBLIC_MAILBOX";
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        permission_member_id?: string;
                                        user_id?: string;
                                        department_id?: string;
                                        email?: string;
                                        type?:
                                            | "USER"
                                            | "DEPARTMENT"
                                            | "MAIL_GROUP"
                                            | "PUBLIC_MAILBOX";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=mail&resource=mailgroup.permission_member&version=v1 document }
                 */
                batchDelete: async (
                    payload?: {
                        data: { permission_member_id_list: Array<string> };
                        path?: { mailgroup_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/create document }
                 *
                 * 创建邮件组权限成员
                 *
                 * 向邮件组添加单个自定义权限成员，添加后该成员可发送邮件到该邮件组
                 */
                create: async (
                    payload?: {
                        data?: {
                            user_id?: string;
                            department_id?: string;
                            email?: string;
                            type?:
                                | "USER"
                                | "DEPARTMENT"
                                | "MAIL_GROUP"
                                | "PUBLIC_MAILBOX";
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    permission_member_id?: string;
                                    user_id?: string;
                                    department_id?: string;
                                    email?: string;
                                    type?:
                                        | "USER"
                                        | "DEPARTMENT"
                                        | "MAIL_GROUP"
                                        | "PUBLIC_MAILBOX";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/delete document }
                 *
                 * 删除邮件组权限成员
                 *
                 * 从自定义成员中删除单个成员，删除后该成员无法发送邮件到该邮件组
                 */
                delete: async (
                    payload?: {
                        path?: {
                            mailgroup_id?: string;
                            permission_member_id?: string;
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
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/:permission_member_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/get document }
                 *
                 * 获取邮件组权限成员
                 *
                 * 获取邮件组单个权限成员信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: {
                            mailgroup_id?: string;
                            permission_member_id?: string;
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
                                    permission_member_id?: string;
                                    user_id?: string;
                                    department_id?: string;
                                    email?: string;
                                    type?:
                                        | "USER"
                                        | "DEPARTMENT"
                                        | "MAIL_GROUP"
                                        | "PUBLIC_MAILBOX";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/:permission_member_id`,
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
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path?: { mailgroup_id?: string };
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
                                    `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members`,
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
                                                        permission_member_id?: string;
                                                        user_id?: string;
                                                        department_id?: string;
                                                        email?: string;
                                                        type?:
                                                            | "USER"
                                                            | "DEPARTMENT"
                                                            | "MAIL_GROUP"
                                                            | "PUBLIC_MAILBOX";
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/list document }
                 *
                 * 批量获取邮件组权限成员
                 *
                 * 分页批量获取邮件组权限成员列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path?: { mailgroup_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        permission_member_id?: string;
                                        user_id?: string;
                                        department_id?: string;
                                        email?: string;
                                        type?:
                                            | "USER"
                                            | "DEPARTMENT"
                                            | "MAIL_GROUP"
                                            | "PUBLIC_MAILBOX";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members`,
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
             * 公共邮箱别名
             */
            publicMailboxAlias: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.alias&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/create document }
                 *
                 * 创建公共邮箱别名
                 *
                 * 创建公共邮箱别名
                 */
                create: async (
                    payload?: {
                        data?: { email_alias?: string };
                        path?: { public_mailbox_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    public_mailbox_alias?: {
                                        primary_email?: string;
                                        email_alias?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.alias&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/delete document }
                 *
                 * 删除公共邮箱别名
                 *
                 * 删除公共邮箱别名
                 */
                delete: async (
                    payload?: {
                        path?: {
                            public_mailbox_id?: string;
                            alias_id?: string;
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
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases/:alias_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.alias&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/list document }
                 *
                 * 获取所有公共邮箱别名
                 *
                 * 获取所有公共邮箱别名
                 */
                list: async (
                    payload?: {
                        path?: { public_mailbox_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        primary_email?: string;
                                        email_alias?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases`,
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
             * 公共邮箱
             */
            publicMailbox: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/create document }
                 *
                 * 创建公共邮箱
                 *
                 * 创建一个公共邮箱
                 */
                create: async (
                    payload?: {
                        data?: { email?: string; name?: string; geo?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    public_mailbox_id?: string;
                                    email?: string;
                                    name?: string;
                                    geo?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/delete document }
                 *
                 * 释放公共邮箱地址
                 *
                 * 该接口会永久删除公共邮箱地址。可用于释放邮箱回收站的公共邮箱地址，一旦删除，该邮箱地址将无法恢复。
                 */
                delete: async (
                    payload?: {
                        path: { public_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/get document }
                 *
                 * 获取公共邮箱
                 *
                 * 获取公共邮箱信息
                 */
                get: async (
                    payload?: {
                        path?: { public_mailbox_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    public_mailbox_id?: string;
                                    email?: string;
                                    name?: string;
                                    geo?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`,
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
                        params?: {
                            user_id?: string;
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
                                    `${this.domain}/open-apis/mail/v1/public_mailboxes`,
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
                                                        public_mailbox_id?: string;
                                                        email?: string;
                                                        name?: string;
                                                        geo?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/list document }
                 *
                 * 批量获取公共邮箱
                 *
                 * 分页批量获取公共邮箱列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id?: string;
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
                                        public_mailbox_id?: string;
                                        email?: string;
                                        name?: string;
                                        geo?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/patch document }
                 *
                 * 修改公共邮箱
                 *
                 * 更新公共邮箱部分字段，没有填写的字段不会被更新
                 */
                patch: async (
                    payload?: {
                        data?: { email?: string; name?: string; geo?: string };
                        path?: { public_mailbox_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    public_mailbox_id?: string;
                                    email?: string;
                                    name?: string;
                                    geo?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=remove_to_recycle_bin&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_to_recycle_bin&project=mail&resource=public_mailbox&version=v1 document }
                 */
                removeToRecycleBin: async (
                    payload?: {
                        data?: { to_mail_address?: string };
                        path: { public_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/remove_to_recycle_bin`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/update document }
                 *
                 * 更新公共邮箱
                 *
                 * 更新公共邮箱所有信息
                 */
                update: async (
                    payload?: {
                        data?: { email?: string; name?: string; geo?: string };
                        path?: { public_mailbox_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    public_mailbox_id?: string;
                                    email?: string;
                                    name?: string;
                                    geo?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`,
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
             * 公共邮箱成员
             */
            publicMailboxMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=mail&resource=public_mailbox.member&version=v1 document }
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            items: Array<{
                                member_id?: string;
                                user_id?: string;
                                type?: "USER";
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { public_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        member_id?: string;
                                        user_id?: string;
                                        type?: "USER";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=mail&resource=public_mailbox.member&version=v1 document }
                 */
                batchDelete: async (
                    payload?: {
                        data: { member_id_list: Array<string> };
                        path?: { public_mailbox_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=clear&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/clear document }
                 *
                 * 清空公共邮箱成员
                 *
                 * 删除公共邮箱所有成员
                 */
                clear: async (
                    payload?: {
                        path?: { public_mailbox_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/clear`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/create document }
                 *
                 * 创建公共邮箱成员
                 *
                 * 向公共邮箱添加单个成员
                 */
                create: async (
                    payload?: {
                        data?: { user_id?: string; type?: "USER" };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { public_mailbox_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    member_id?: string;
                                    user_id?: string;
                                    type?: "USER";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/delete document }
                 *
                 * 删除公共邮箱成员
                 *
                 * 删除公共邮箱单个成员
                 */
                delete: async (
                    payload?: {
                        path?: {
                            public_mailbox_id?: string;
                            member_id?: string;
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
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/:member_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/get document }
                 *
                 * 获取公共邮箱成员信息
                 *
                 * 获取公共邮箱单个成员信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: {
                            public_mailbox_id?: string;
                            member_id?: string;
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
                                    member_id?: string;
                                    user_id?: string;
                                    type?: "USER";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/:member_id`,
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
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path?: { public_mailbox_id?: string };
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
                                    `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members`,
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
                                                        member_id?: string;
                                                        user_id?: string;
                                                        type?: "USER";
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/list document }
                 *
                 * 批量获取公共邮箱成员
                 *
                 * 分页批量获取公共邮箱成员列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path?: { public_mailbox_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        member_id?: string;
                                        user_id?: string;
                                        type?: "USER";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members`,
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
             * 邮箱地址
             */
            user: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user/query document }
                 *
                 * 邮箱状态查询
                 *
                 * 使用邮箱状态查询接口，可以输入邮箱地址，查询出该邮箱地址对应的类型以及状态
                 */
                query: async (
                    payload?: {
                        data: { email_list: Array<string> };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    user_list?: Array<{
                                        email?: string;
                                        status?: number;
                                        type?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/users/query`,
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
             * 用户邮箱
             */
            userMailbox: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox&apiName=accessible_mailboxes&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=accessible_mailboxes&project=mail&resource=user_mailbox&version=v1 document }
                 *
                 * 获取主账号的所有可访问邮箱，包括主邮箱和公共邮箱
                 */
                accessibleMailboxes: async (
                    payload?: {
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    accessible_mailboxes?: Array<{
                                        email_address?: string;
                                        email_type?:
                                            | "MAIL_GROUP"
                                            | "PUBLIC_MAILBOX"
                                            | "USER_PRIMARY"
                                            | "USER_ALIAS"
                                            | "PUBLIC_MAILBOX_ALIAS";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/accessible_mailboxes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox/delete document }
                 *
                 * 释放用户邮箱地址
                 *
                 * 该接口会永久删除用户邮箱地址。可用于删除位于邮箱回收站中的用户邮箱地址，一旦删除，将无法恢复。该接口支持邮件的转移，可以将被释放邮箱的邮件转移到另外一个可以使用的邮箱中。
                 */
                delete: async (
                    payload?: {
                        params?: { transfer_mailbox?: string };
                        path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id`,
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
             * 用户邮箱别名
             */
            userMailboxAlias: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.alias&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/create document }
                 *
                 * 创建用户邮箱别名
                 *
                 * 创建用户邮箱别名
                 */
                create: async (
                    payload?: {
                        data?: { email_alias?: string };
                        path?: { user_mailbox_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    user_mailbox_alias?: {
                                        primary_email?: string;
                                        email_alias?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.alias&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/delete document }
                 *
                 * 删除用户邮箱别名
                 *
                 * 删除用户邮箱别名
                 */
                delete: async (
                    payload?: {
                        path?: { user_mailbox_id?: string; alias_id?: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases/:alias_id`,
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
                        params?: { page_token?: string; page_size?: number };
                        path?: { user_mailbox_id?: string };
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
                                    `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases`,
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
                                                        primary_email?: string;
                                                        email_alias?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.alias&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/list document }
                 *
                 * 获取用户邮箱所有别名
                 *
                 * 获取用户邮箱所有别名
                 */
                list: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: number };
                        path?: { user_mailbox_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        primary_email?: string;
                                        email_alias?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases`,
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
             * user_mailbox.draft
             */
            userMailboxDraft: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.draft&version=v1 document }
                 *
                 * 创建草稿
                 */
                create: async (
                    payload?: {
                        data?: { raw?: string };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    draft?: {
                                        id?: string;
                                        message?: {
                                            raw?: string;
                                            subject?: string;
                                            to?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            cc?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            bcc?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            head_from?: {
                                                mail_address: string;
                                                name?: string;
                                            };
                                            body_html?: string;
                                            internal_date?: string;
                                            message_state?: number;
                                            smtp_message_id?: string;
                                            message_id?: string;
                                            attachments?: Array<{
                                                body: string;
                                                filename: string;
                                                id?: string;
                                                attachment_type?: number;
                                                is_inline?: boolean;
                                                cid?: string;
                                            }>;
                                            body_plain_text?: string;
                                            thread_id?: string;
                                            body_preview?: string;
                                            label_ids?: Array<string>;
                                            folder_id?: string;
                                            in_reply_to?: string;
                                            reply_to?: string;
                                            priority_type?:
                                                | "0"
                                                | "1"
                                                | "3"
                                                | "5";
                                            security_level?: {
                                                is_risk?: boolean;
                                                risk_banner_level?:
                                                    | "WARNING"
                                                    | "DANGER"
                                                    | "INFO";
                                                risk_banner_reason?:
                                                    | "NO_REASON"
                                                    | "IMPERSONATE_DOMAIN"
                                                    | "IMPERSONATE_KP_NAME"
                                                    | "UNAUTH_EXTERNAL"
                                                    | "MALICIOUS_URL"
                                                    | "MALICIOUS_ATTACHMENT"
                                                    | "PHISHING"
                                                    | "IMPERSONATE_PARTNER"
                                                    | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                                is_header_from_external?: boolean;
                                                via_domain?: string;
                                                spam_banner_type?:
                                                    | "USER_REPORT"
                                                    | "USER_BLOCK"
                                                    | "ANTI_SPAM"
                                                    | "USER_RULE"
                                                    | "BLOCK_DOMIN"
                                                    | "BLOCK_ADDRESS";
                                                spam_user_rule_id?: string;
                                                spam_banner_info?: string;
                                            };
                                            references?: string;
                                            body_calendar?: string;
                                        };
                                    };
                                    reference?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.draft&version=v1 document }
                 *
                 * 删除指定邮箱账户下的单份邮件草稿。注意：对于草稿状态的邮件，只能使用本接口删除，禁止使用 trash_message；被删除的草稿数据无法恢复，请谨慎使用。
                 */
                delete: async (
                    payload?: {
                        path: { user_mailbox_id: string; draft_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts/:draft_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.draft&version=v1 document }
                 *
                 * 获取草稿详情
                 */
                get: async (
                    payload?: {
                        params?: { format?: "metadata" | "raw" | "full" };
                        path: { user_mailbox_id: string; draft_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    draft?: {
                                        id?: string;
                                        message?: {
                                            subject?: string;
                                            to?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            cc?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            bcc?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            head_from?: {
                                                mail_address: string;
                                                name?: string;
                                            };
                                            body_html?: string;
                                            internal_date?: string;
                                            message_state?: number;
                                            smtp_message_id?: string;
                                            message_id?: string;
                                            attachments?: Array<{
                                                filename: string;
                                                id?: string;
                                                attachment_type?: number;
                                                is_inline?: boolean;
                                                cid?: string;
                                            }>;
                                            body_plain_text?: string;
                                            thread_id?: string;
                                            body_preview?: string;
                                            label_ids?: Array<string>;
                                            folder_id?: string;
                                            in_reply_to?: string;
                                            reply_to?: string;
                                            priority_type?:
                                                | "0"
                                                | "1"
                                                | "3"
                                                | "5";
                                            security_level?: {
                                                is_risk?: boolean;
                                                risk_banner_level?:
                                                    | "WARNING"
                                                    | "DANGER"
                                                    | "INFO";
                                                risk_banner_reason?:
                                                    | "NO_REASON"
                                                    | "IMPERSONATE_DOMAIN"
                                                    | "IMPERSONATE_KP_NAME"
                                                    | "UNAUTH_EXTERNAL"
                                                    | "MALICIOUS_URL"
                                                    | "MALICIOUS_ATTACHMENT"
                                                    | "PHISHING"
                                                    | "IMPERSONATE_PARTNER"
                                                    | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                                is_header_from_external?: boolean;
                                                via_domain?: string;
                                                spam_banner_type?:
                                                    | "USER_REPORT"
                                                    | "USER_BLOCK"
                                                    | "ANTI_SPAM"
                                                    | "USER_RULE"
                                                    | "BLOCK_DOMIN"
                                                    | "BLOCK_ADDRESS";
                                                spam_user_rule_id?: string;
                                                spam_banner_info?: string;
                                            };
                                            references?: string;
                                            body_calendar?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts/:draft_id`,
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
                        params?: { page_size?: number; page_token?: string };
                        path: { user_mailbox_id: string };
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
                                    `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.draft&version=v1 document }
                 *
                 * 拉取草稿列表
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    items?: Array<{ id?: string }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=send&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=send&project=mail&resource=user_mailbox.draft&version=v1 document }
                 *
                 * 发送草稿
                 */
                send: async (
                    payload?: {
                        data?: { send_time?: string };
                        path: { user_mailbox_id: string; draft_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    message_id?: string;
                                    thread_id?: string;
                                    recall_status?: "unavailable" | "available";
                                    automation_send_disable?: {
                                        reason?: string;
                                        reference?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts/:draft_id/send`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.draft&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mail&resource=user_mailbox.draft&version=v1 document }
                 *
                 * 更新草稿
                 */
                update: async (
                    payload?: {
                        data: { raw: string };
                        path: { user_mailbox_id: string; draft_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    draft?: {
                                        id?: string;
                                        message?: {
                                            raw?: string;
                                            subject?: string;
                                            to?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            cc?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            bcc?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            head_from?: {
                                                mail_address: string;
                                                name?: string;
                                            };
                                            body_html?: string;
                                            internal_date?: string;
                                            message_state?: number;
                                            smtp_message_id?: string;
                                            message_id?: string;
                                            attachments?: Array<{
                                                body: string;
                                                filename: string;
                                                id?: string;
                                                attachment_type?: number;
                                                is_inline?: boolean;
                                                cid?: string;
                                            }>;
                                            body_plain_text?: string;
                                            thread_id?: string;
                                            body_preview?: string;
                                            label_ids?: Array<string>;
                                            folder_id?: string;
                                            in_reply_to?: string;
                                            reply_to?: string;
                                            priority_type?:
                                                | "0"
                                                | "1"
                                                | "3"
                                                | "5";
                                            security_level?: {
                                                is_risk?: boolean;
                                                risk_banner_level?:
                                                    | "WARNING"
                                                    | "DANGER"
                                                    | "INFO";
                                                risk_banner_reason?:
                                                    | "NO_REASON"
                                                    | "IMPERSONATE_DOMAIN"
                                                    | "IMPERSONATE_KP_NAME"
                                                    | "UNAUTH_EXTERNAL"
                                                    | "MALICIOUS_URL"
                                                    | "MALICIOUS_ATTACHMENT"
                                                    | "PHISHING"
                                                    | "IMPERSONATE_PARTNER"
                                                    | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                                is_header_from_external?: boolean;
                                                via_domain?: string;
                                                spam_banner_type?:
                                                    | "USER_REPORT"
                                                    | "USER_BLOCK"
                                                    | "ANTI_SPAM"
                                                    | "USER_RULE"
                                                    | "BLOCK_DOMIN"
                                                    | "BLOCK_ADDRESS";
                                                spam_user_rule_id?: string;
                                                spam_banner_info?: string;
                                            };
                                            references?: string;
                                            body_calendar?: string;
                                        };
                                    };
                                    reference?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/drafts/:draft_id`,
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
             * user_mailbox.event
             */
            userMailboxEvent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.event&apiName=subscribe&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscribe&project=mail&resource=user_mailbox.event&version=v1 document }
                 *
                 * 订阅收信事件
                 */
                subscribe: async (
                    payload?: {
                        data: { event_type: number };
                        path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/event/subscribe`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.event&apiName=subscription&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=mail&resource=user_mailbox.event&version=v1 document }
                 *
                 * 查询订阅的收信事件
                 */
                subscription: async (
                    payload?: {
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { event_types?: Array<number> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/event/subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.event&apiName=unsubscribe&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscribe&project=mail&resource=user_mailbox.event&version=v1 document }
                 *
                 * 取消订阅收信事件
                 */
                unsubscribe: async (
                    payload?: {
                        data: { event_type: number };
                        path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/event/unsubscribe`,
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
             * user_mailbox.folder
             */
            userMailboxFolder: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.folder&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.folder&version=v1 document }
                 *
                 * 创建邮箱文件夹
                 */
                create: async (
                    payload?: {
                        data: { name: string; parent_folder_id: string };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    folder?: {
                                        id?: string;
                                        name: string;
                                        parent_folder_id: string;
                                        folder_type?: number;
                                        unread_message_count?: number;
                                        unread_thread_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/folders`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.folder&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.folder&version=v1 document }
                 *
                 * 删除用户文件夹。删除后文件夹数据无法恢复，请谨慎使用；删除文件夹会将该文件夹下的邮件移至已删除文件夹中。
                 */
                delete: async (
                    payload?: {
                        path: { user_mailbox_id: string; folder_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/folders/:folder_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.folder&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.folder&version=v1 document }
                 *
                 * 获取指定邮箱账户下的单个邮件文件夹详情
                 */
                get: async (
                    payload?: {
                        path: { user_mailbox_id: string; folder_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    folder?: {
                                        id?: string;
                                        name: string;
                                        parent_folder_id: string;
                                        folder_type?: number;
                                        unread_message_count?: number;
                                        unread_thread_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/folders/:folder_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.folder&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.folder&version=v1 document }
                 *
                 * 列出用户文件夹，可获取文件夹名称、文件夹ID、文件夹下的未读邮件和未读会话数量
                 */
                list: async (
                    payload?: {
                        params?: { folder_type?: number };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        name: string;
                                        parent_folder_id: string;
                                        folder_type?: number;
                                        unread_message_count?: number;
                                        unread_thread_count?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/folders`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.folder&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=mail&resource=user_mailbox.folder&version=v1 document }
                 *
                 * 更新用户文件夹
                 */
                patch: async (
                    payload?: {
                        data?: { name?: string; parent_folder_id?: string };
                        path: { user_mailbox_id: string; folder_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/folders/:folder_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
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
             * user_mailbox.label
             */
            userMailboxLabel: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.label&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.label&version=v1 document }
                 *
                 * 根据用户指定的名称、颜色等信息，创建邮件标签
                 */
                create: async (
                    payload?: {
                        data: {
                            label: { name: string; background_color?: string };
                        };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    label?: {
                                        id?: string;
                                        name?: string;
                                        background_color?: string;
                                        messages_unread?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/labels`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.label&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.label&version=v1 document }
                 *
                 * 删除用户指定的标签，注意，删除的标签无法恢复
                 */
                delete: async (
                    payload?: {
                        path: { user_mailbox_id: string; label_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/labels/:label_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.label&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.label&version=v1 document }
                 *
                 * 根据指定ID，获取邮件标签信息，包括名称、未读数据、颜色等信息
                 */
                get: async (
                    payload?: {
                        path: { user_mailbox_id: string; label_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    label?: {
                                        id?: string;
                                        name?: string;
                                        background_color?: string;
                                        messages_unread?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/labels/:label_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.label&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.label&version=v1 document }
                 *
                 * 列出邮件标签，包括ID、名称、颜色、未读信息等内容
                 */
                list: async (
                    payload?: {
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        name?: string;
                                        background_color?: string;
                                        messages_unread?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/labels`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.label&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=mail&resource=user_mailbox.label&version=v1 document }
                 *
                 * 更新邮件标签
                 */
                patch: async (
                    payload?: {
                        data: {
                            label: { name?: string; background_color?: string };
                        };
                        path: { user_mailbox_id: string; label_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    label?: {
                                        id?: string;
                                        name?: string;
                                        background_color?: string;
                                        messages_unread?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/labels/:label_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
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
             * user_mailbox.mail_contact
             */
            userMailboxMailContact: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.mail_contact&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.mail_contact&version=v1 document }
                 *
                 * 创建邮箱联系人
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            company?: string;
                            phone?: string;
                            mail_address?: string;
                            tag?: string;
                            remark?: string;
                            position?: string;
                        };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    mail_contact?: {
                                        id?: string;
                                        name: string;
                                        company?: string;
                                        phone?: string;
                                        mail_address?: string;
                                        tag?: string;
                                        remark?: string;
                                        avatar?: string;
                                        position?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/mail_contacts`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.mail_contact&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.mail_contact&version=v1 document }
                 *
                 * 删除指定的邮箱联系人
                 */
                delete: async (
                    payload?: {
                        path: {
                            user_mailbox_id: string;
                            mail_contact_id: string;
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/mail_contacts/:mail_contact_id`,
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
                        params: { page_size: number; page_token?: string };
                        path: { user_mailbox_id: string };
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
                                    `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/mail_contacts`,
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
                                                        name: string;
                                                        company?: string;
                                                        phone?: string;
                                                        mail_address?: string;
                                                        tag?: string;
                                                        remark?: string;
                                                        avatar?: string;
                                                        position?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.mail_contact&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.mail_contact&version=v1 document }
                 *
                 * 列出邮箱联系人
                 */
                list: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        name: string;
                                        company?: string;
                                        phone?: string;
                                        mail_address?: string;
                                        tag?: string;
                                        remark?: string;
                                        avatar?: string;
                                        position?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/mail_contacts`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.mail_contact&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=mail&resource=user_mailbox.mail_contact&version=v1 document }
                 *
                 * 更新邮箱联系人
                 */
                patch: async (
                    payload?: {
                        data: {
                            name: string;
                            company?: string;
                            phone?: string;
                            mail_address?: string;
                            tag?: string;
                            remark?: string;
                            position?: string;
                        };
                        path: {
                            user_mailbox_id: string;
                            mail_contact_id: string;
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/mail_contacts/:mail_contact_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
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
             * user_mailbox.message.attachment
             */
            userMailboxMessageAttachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message.attachment&apiName=download_url&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download_url&project=mail&resource=user_mailbox.message.attachment&version=v1 document }
                 *
                 * 获取附件下载链接
                 */
                downloadUrl: async (
                    payload?: {
                        params: { attachment_ids: Array<string> };
                        path: { user_mailbox_id: string; message_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    download_urls?: Array<{
                                        attachment_id?: string;
                                        download_url?: string;
                                    }>;
                                    failed_ids?: Array<string>;
                                    failed_reasons?: Array<{
                                        attachment_id?: string;
                                        reason?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/:message_id/attachments/download_url`,
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
             * user_mailbox.message
             */
            userMailboxMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=batch_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=mail&resource=user_mailbox.message&version=v1 document }
                 *
                 * 通过指定邮件ID，获取对应邮件的标签、文件夹、摘要、正文、html、附件等信息。注意，如需获取摘要、正文、主题或收发件人地址，需要申请对应的字段权限。
                 */
                batchGet: async (
                    payload?: {
                        data?: {
                            format?: "full" | "plain_text_full" | "metadata";
                            message_ids?: Array<string>;
                        };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        raw?: string;
                                        subject?: string;
                                        to?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        cc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        bcc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        head_from?: {
                                            mail_address: string;
                                            name?: string;
                                        };
                                        body_html?: string;
                                        internal_date?: string;
                                        message_state?: number;
                                        smtp_message_id?: string;
                                        message_id?: string;
                                        attachments?: Array<{
                                            body: string;
                                            filename: string;
                                            id?: string;
                                            attachment_type?: number;
                                            is_inline?: boolean;
                                            cid?: string;
                                        }>;
                                        body_plain_text?: string;
                                        thread_id?: string;
                                        body_preview?: string;
                                        label_ids?: Array<string>;
                                        folder_id?: string;
                                        in_reply_to?: string;
                                        reply_to?: string;
                                        priority_type?: "0" | "1" | "3" | "5";
                                        security_level?: {
                                            is_risk?: boolean;
                                            risk_banner_level?:
                                                | "WARNING"
                                                | "DANGER"
                                                | "INFO";
                                            risk_banner_reason?:
                                                | "NO_REASON"
                                                | "IMPERSONATE_DOMAIN"
                                                | "IMPERSONATE_KP_NAME"
                                                | "UNAUTH_EXTERNAL"
                                                | "MALICIOUS_URL"
                                                | "MALICIOUS_ATTACHMENT"
                                                | "PHISHING"
                                                | "IMPERSONATE_PARTNER"
                                                | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                            is_header_from_external?: boolean;
                                            via_domain?: string;
                                            spam_banner_type?:
                                                | "USER_REPORT"
                                                | "USER_BLOCK"
                                                | "ANTI_SPAM"
                                                | "USER_RULE"
                                                | "BLOCK_DOMIN"
                                                | "BLOCK_ADDRESS";
                                            spam_user_rule_id?: string;
                                            spam_banner_info?: string;
                                        };
                                        references?: string;
                                        body_calendar?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/batch_get`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=batch_modify&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_modify&project=mail&resource=user_mailbox.message&version=v1 document }
                 *
                 * 本接口提供修改邮件的能力，支持移动邮件的文件夹、给邮件添加和移除标签、标记邮件读和未读、移动邮件至垃圾邮件等能力。不支持移动邮件到已删除文件夹，如需，请使用批量删除邮件接口。
                 */
                batchModify: async (
                    payload?: {
                        data?: {
                            message_ids?: Array<string>;
                            add_label_ids?: Array<string>;
                            remove_label_ids?: Array<string>;
                            add_folder?: string;
                        };
                        path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/batch_modify`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=batch_trash&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_trash&project=mail&resource=user_mailbox.message&version=v1 document }
                 *
                 * 通过指定邮件ID，批量移动邮件到已删除文件夹
                 */
                batchTrash: async (
                    payload?: {
                        data?: { message_ids?: Array<string> };
                        path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/batch_trash`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.message&version=v1 document }
                 *
                 * 获取邮件详情
                 */
                get: async (
                    payload?: {
                        params?: {
                            format?: "full" | "plain_text_full" | "metadata";
                        };
                        path: { user_mailbox_id: string; message_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    message?: {
                                        subject?: string;
                                        to?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        cc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        bcc?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        head_from?: {
                                            mail_address: string;
                                            name?: string;
                                        };
                                        body_html?: string;
                                        internal_date?: string;
                                        message_state?: number;
                                        smtp_message_id?: string;
                                        message_id?: string;
                                        attachments?: Array<{
                                            filename: string;
                                            id?: string;
                                            attachment_type?: number;
                                            is_inline?: boolean;
                                            cid?: string;
                                        }>;
                                        body_plain_text?: string;
                                        thread_id?: string;
                                        body_preview?: string;
                                        label_ids?: Array<string>;
                                        folder_id?: string;
                                        in_reply_to?: string;
                                        reply_to?: string;
                                        priority_type?: "0" | "1" | "3" | "5";
                                        security_level?: {
                                            is_risk?: boolean;
                                            risk_banner_level?:
                                                | "WARNING"
                                                | "DANGER"
                                                | "INFO";
                                            risk_banner_reason?:
                                                | "NO_REASON"
                                                | "IMPERSONATE_DOMAIN"
                                                | "IMPERSONATE_KP_NAME"
                                                | "UNAUTH_EXTERNAL"
                                                | "MALICIOUS_URL"
                                                | "MALICIOUS_ATTACHMENT"
                                                | "PHISHING"
                                                | "IMPERSONATE_PARTNER"
                                                | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                            is_header_from_external?: boolean;
                                            via_domain?: string;
                                            spam_banner_type?:
                                                | "USER_REPORT"
                                                | "USER_BLOCK"
                                                | "ANTI_SPAM"
                                                | "USER_RULE"
                                                | "BLOCK_DOMIN"
                                                | "BLOCK_ADDRESS";
                                            spam_user_rule_id?: string;
                                            spam_banner_info?: string;
                                        };
                                        references?: string;
                                        body_calendar?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/:message_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=get_by_card&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_by_card&project=mail&resource=user_mailbox.message&version=v1 document }
                 *
                 * 卡片ID获取邮件ID
                 */
                getByCard: async (
                    payload?: {
                        params: {
                            card_id: string;
                            owner_id: string;
                            user_id_type?: "open_id" | "user_id" | "union_id";
                        };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    owner_info: {
                                        type: string;
                                        owner_user_id?: string;
                                        public_mailbox_id?: string;
                                    };
                                    message_ids: Array<string>;
                                    card_id: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/get_by_card`,
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
                            folder_id?: string;
                            only_unread?: boolean;
                            label_id?: string;
                        };
                        path: { user_mailbox_id: string };
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
                                    `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages`,
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
                                                    items?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.message&version=v1 document }
                 *
                 * 根据用户指定的标签或文件夹，列出对应位置下的邮件列表。注意，必须填写folder_id或label_id中的一个字段。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            folder_id?: string;
                            only_unread?: boolean;
                            label_id?: string;
                        };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    items?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=list_thread_message&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_thread_message&project=mail&resource=user_mailbox.message&version=v1 document }
                 *
                 * 通过用户邮箱地址和邮件会话ID，获取该会话下的所有邮件关键信息列表。如需查询主题、正文、摘要、收发件人信息，请申请字段权限。
                 */
                listThreadMessage: async (
                    payload?: {
                        params?: {
                            format?: "full" | "plain_text_full" | "metadata";
                            include_spam_trash?: boolean;
                        };
                        path: { user_mailbox_id: string; thread_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        message_id?: string;
                                        thread_id?: string;
                                        folder_id?: string;
                                        smtp_message_id?: string;
                                        internal_date?: string;
                                        message_state?: number;
                                        message?: {
                                            raw?: string;
                                            subject?: string;
                                            to?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            cc?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            bcc?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            head_from?: {
                                                mail_address: string;
                                                name?: string;
                                            };
                                            body_html?: string;
                                            internal_date?: string;
                                            message_state?: number;
                                            smtp_message_id?: string;
                                            message_id?: string;
                                            attachments?: Array<{
                                                body: string;
                                                filename: string;
                                                id?: string;
                                                attachment_type?: number;
                                                is_inline?: boolean;
                                                cid?: string;
                                            }>;
                                            body_plain_text?: string;
                                            thread_id?: string;
                                            body_preview?: string;
                                            label_ids?: Array<string>;
                                            folder_id?: string;
                                            in_reply_to?: string;
                                            reply_to?: string;
                                            priority_type?:
                                                | "0"
                                                | "1"
                                                | "3"
                                                | "5";
                                            security_level?: {
                                                is_risk?: boolean;
                                                risk_banner_level?:
                                                    | "WARNING"
                                                    | "DANGER"
                                                    | "INFO";
                                                risk_banner_reason?:
                                                    | "NO_REASON"
                                                    | "IMPERSONATE_DOMAIN"
                                                    | "IMPERSONATE_KP_NAME"
                                                    | "UNAUTH_EXTERNAL"
                                                    | "MALICIOUS_URL"
                                                    | "MALICIOUS_ATTACHMENT"
                                                    | "PHISHING"
                                                    | "IMPERSONATE_PARTNER"
                                                    | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                                is_header_from_external?: boolean;
                                                via_domain?: string;
                                                spam_banner_type?:
                                                    | "USER_REPORT"
                                                    | "USER_BLOCK"
                                                    | "ANTI_SPAM"
                                                    | "USER_RULE"
                                                    | "BLOCK_DOMIN"
                                                    | "BLOCK_ADDRESS";
                                                spam_user_rule_id?: string;
                                                spam_banner_info?: string;
                                            };
                                            references?: string;
                                            body_calendar?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/:thread_id/messages`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=modify&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=modify&project=mail&resource=user_mailbox.message&version=v1 document }
                 *
                 * 本接口提供修改邮件的能力，支持移动邮件的文件夹、给邮件添加和移除标签、标记邮件已读和未读、移动邮件至垃圾邮件等能力。不支持移动邮件到已删除文件夹，如需删除邮件，请使用删除邮件接口。至少填写add_label_ids、remove_label_ids、add_folder中的一个参数。
                 */
                modify: async (
                    payload?: {
                        data?: {
                            add_label_ids?: Array<string>;
                            remove_label_ids?: Array<string>;
                            add_folder?: string;
                        };
                        path: { user_mailbox_id: string; message_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/:message_id/modify`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=send&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=send&project=mail&resource=user_mailbox.message&version=v1 document }
                 */
                send: async (
                    payload?: {
                        data?: {
                            subject?: string;
                            to?: Array<{ mail_address: string; name?: string }>;
                            raw?: string;
                            cc?: Array<{ mail_address: string; name?: string }>;
                            bcc?: Array<{
                                mail_address: string;
                                name?: string;
                            }>;
                            body_html?: string;
                            body_plain_text?: string;
                            attachments?: Array<{
                                body: string;
                                filename: string;
                                is_inline?: boolean;
                                cid?: string;
                            }>;
                            dedupe_key?: string;
                            head_from?: { name?: string };
                        };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    message_id?: string;
                                    thread_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/send`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.message&apiName=trash&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=trash&project=mail&resource=user_mailbox.message&version=v1 document }
                 *
                 * 移动邮件到已删除文件夹。注意，该接口无法删除草稿，如需删除草稿，请使用删除草稿接口
                 */
                trash: async (
                    payload?: {
                        path: { user_mailbox_id: string; message_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/messages/:message_id/trash`,
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
             * user_mailbox.rule
             */
            userMailboxRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.rule&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.rule&version=v1 document }
                 *
                 * 创建收信规则
                 */
                create: async (
                    payload?: {
                        data: {
                            condition: {
                                match_type: number;
                                items: Array<{
                                    type: number;
                                    operator?: number;
                                    input?: string;
                                }>;
                            };
                            action: {
                                items: Array<{ type: number; input?: string }>;
                            };
                            ignore_the_rest_of_rules: boolean;
                            name: string;
                            is_enable: boolean;
                        };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    rule?: {
                                        id?: string;
                                        condition: {
                                            match_type: number;
                                            items: Array<{
                                                type: number;
                                                operator?: number;
                                                input?: string;
                                            }>;
                                        };
                                        action: {
                                            items: Array<{
                                                type: number;
                                                input?: string;
                                            }>;
                                        };
                                        ignore_the_rest_of_rules: boolean;
                                        name: string;
                                        is_enable: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/rules`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.rule&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.rule&version=v1 document }
                 *
                 * 删除收信规则
                 */
                delete: async (
                    payload?: {
                        path: { user_mailbox_id: string; rule_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/rules/:rule_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.rule&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.rule&version=v1 document }
                 *
                 * 列出收信规则
                 */
                list: async (
                    payload?: {
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        condition: {
                                            match_type: number;
                                            items: Array<{
                                                type: number;
                                                operator?: number;
                                                input?: string;
                                            }>;
                                        };
                                        action: {
                                            items: Array<{
                                                type: number;
                                                input?: string;
                                            }>;
                                        };
                                        ignore_the_rest_of_rules: boolean;
                                        name: string;
                                        is_enable: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/rules`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.rule&apiName=reorder&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reorder&project=mail&resource=user_mailbox.rule&version=v1 document }
                 */
                reorder: async (
                    payload?: {
                        data: { rule_ids: Array<string> };
                        path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/rules/reorder`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.rule&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mail&resource=user_mailbox.rule&version=v1 document }
                 */
                update: async (
                    payload?: {
                        data: {
                            condition: {
                                match_type: number;
                                items: Array<{
                                    type: number;
                                    operator?: number;
                                    input?: string;
                                }>;
                            };
                            action: {
                                items: Array<{ type: number; input?: string }>;
                            };
                            ignore_the_rest_of_rules: boolean;
                            name: string;
                            is_enable: boolean;
                        };
                        path: { user_mailbox_id: string; rule_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/rules/:rule_id`,
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
             * user_mailbox.setting
             */
            userMailboxSetting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.setting&apiName=send_as&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=send_as&project=mail&resource=user_mailbox.setting&version=v1 document }
                 *
                 * 获取账号的所有可发信地址，包括主地址、别名地址、邮件组。可以使用用户地址访问该接口，也可以使用用户有权限的公共邮箱地址访问该接口。
                 */
                sendAs: async (
                    payload?: {
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    sendable_addresses?: Array<{
                                        email_address?: string;
                                        email_type?:
                                            | "MAIL_GROUP"
                                            | "PUBLIC_MAILBOX"
                                            | "USER_PRIMARY"
                                            | "USER_ALIAS"
                                            | "PUBLIC_MAILBOX_ALIAS";
                                        name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/settings/send_as`,
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
             * user_mailbox.template.attachment
             */
            userMailboxTemplateAttachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template.attachment&apiName=download_url&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download_url&project=mail&resource=user_mailbox.template.attachment&version=v1 document }
                 *
                 * 获取指定邮件模板下的附件下载链接。用于在已知模板 ID 与附件 ID 的场景下，二次获取附件的有效访问 URL，便于在用户端预览或下载邮件模板中的附件资源。
                 */
                downloadUrl: async (
                    payload?: {
                        params: { attachment_ids: Array<string> };
                        path: { user_mailbox_id: string; template_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    download_urls?: Array<{
                                        attachment_id?: string;
                                        download_url?: string;
                                    }>;
                                    failed_reasons?: Array<{
                                        attachment_id?: string;
                                        reason?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates/:template_id/attachments/download_url`,
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
             * user_mailbox.template
             */
            userMailboxTemplate: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mail&resource=user_mailbox.template&version=v1 document }
                 *
                 * 在指定用户邮箱下创建一份可复用的个人邮件模板。请求时需传入完整的模板对象（含名称、主题、正文、收件信息、附件等），创建成功后返回完整模板内容（含系统生成的 template_id），适用于将常用邮件内容沉淀为模板以便后续快速发送同类型邮件。
                 */
                create: async (
                    payload?: {
                        data: {
                            template: {
                                name: string;
                                subject?: string;
                                template_content?: string;
                                is_plain_text_mode?: boolean;
                                tos?: Array<{
                                    mail_address: string;
                                    name?: string;
                                }>;
                                ccs?: Array<{
                                    mail_address: string;
                                    name?: string;
                                }>;
                                bccs?: Array<{
                                    mail_address: string;
                                    name?: string;
                                }>;
                                attachments?: Array<{
                                    filename?: string;
                                    id?: string;
                                    attachment_type?: number;
                                    is_inline?: boolean;
                                    cid?: string;
                                }>;
                            };
                        };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    template?: {
                                        template_id?: string;
                                        name: string;
                                        subject?: string;
                                        template_content?: string;
                                        is_plain_text_mode?: boolean;
                                        tos?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        ccs?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        bccs?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        attachments?: Array<{
                                            filename?: string;
                                            id?: string;
                                            attachment_type?: number;
                                            is_inline?: boolean;
                                            cid?: string;
                                        }>;
                                        create_time?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=mail&resource=user_mailbox.template&version=v1 document }
                 *
                 * 永久删除指定用户邮箱下的某个个人邮件模板。删除操作不可恢复，删除后该模板将无法在「列出邮件模板」「获取邮件模板」等接口中再返回，常用于清理已废弃或不再使用的模板。
                 */
                delete: async (
                    payload?: {
                        path: { user_mailbox_id: string; template_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates/:template_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.template&version=v1 document }
                 *
                 * 获取指定邮件模板的完整详情，包括模板名称、主题、正文（HTML 或纯文本）、收件人/抄送/密送地址、附件信息等所有字段。常用于编辑模板前回填表单，或在发送邮件场景下读取模板内容做二次填充。
                 */
                get: async (
                    payload?: {
                        path: { user_mailbox_id: string; template_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    template?: {
                                        template_id?: string;
                                        name: string;
                                        subject?: string;
                                        template_content?: string;
                                        is_plain_text_mode?: boolean;
                                        tos?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        ccs?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        bccs?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        attachments?: Array<{
                                            filename?: string;
                                            id?: string;
                                            attachment_type?: number;
                                            is_inline?: boolean;
                                            cid?: string;
                                        }>;
                                        create_time?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates/:template_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.template&version=v1 document }
                 *
                 * 列出指定用户邮箱下的全部个人邮件模板基本信息（一次性返回，不分页），常用于在编辑或发送邮件场景下展示可选模板列表。如需获取模板正文与附件等完整字段，请通过获取个人邮件模板详情接口按 `template_id` 查询。
                 */
                list: async (
                    payload?: {
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        template_id?: string;
                                        name?: string;
                                        create_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.template&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=mail&resource=user_mailbox.template&version=v1 document }
                 *
                 * 以全量替换的方式更新指定邮件模板的所有字段（包括名称、主题、正文、附件、收件信息等）。本接口为「全量更新」语义：请求时需传入完整的模板对象，未携带的字段将被清空。**调用依赖**：如仅修改部分字段，请先调用获取个人邮件模板详情接口拿到完整模板，在本地修改后再传回本接口，以避免漏传字段导致数据丢失。
                 */
                update: async (
                    payload?: {
                        data: {
                            template: {
                                name: string;
                                subject?: string;
                                template_content?: string;
                                is_plain_text_mode?: boolean;
                                tos?: Array<{
                                    mail_address: string;
                                    name?: string;
                                }>;
                                ccs?: Array<{
                                    mail_address: string;
                                    name?: string;
                                }>;
                                bccs?: Array<{
                                    mail_address: string;
                                    name?: string;
                                }>;
                                attachments?: Array<{
                                    filename?: string;
                                    id?: string;
                                    attachment_type?: number;
                                    is_inline?: boolean;
                                    cid?: string;
                                }>;
                            };
                        };
                        path: { user_mailbox_id: string; template_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    template?: {
                                        template_id?: string;
                                        name: string;
                                        subject?: string;
                                        template_content?: string;
                                        is_plain_text_mode?: boolean;
                                        tos?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        ccs?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        bccs?: Array<{
                                            mail_address: string;
                                            name?: string;
                                        }>;
                                        attachments?: Array<{
                                            filename?: string;
                                            id?: string;
                                            attachment_type?: number;
                                            is_inline?: boolean;
                                            cid?: string;
                                        }>;
                                        create_time?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/templates/:template_id`,
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
             * user_mailbox.thread
             */
            userMailboxThread: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=batch_modify&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_modify&project=mail&resource=user_mailbox.thread&version=v1 document }
                 *
                 * 本接口提供修改邮件会话的能力，支持移动邮件会话的文件夹、给邮件会话添加和移除标签、标记邮件会话读和未读、移动邮件会话至垃圾邮件等能力。不支持移动邮件会话到已删除文件夹，如需，请使用批量删除邮件会话接口。
                 */
                batchModify: async (
                    payload?: {
                        data?: {
                            add_label_ids?: Array<string>;
                            remove_label_ids?: Array<string>;
                            add_folder?: string;
                            thread_ids?: Array<string>;
                        };
                        path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/batch_modify`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=batch_trash&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_trash&project=mail&resource=user_mailbox.thread&version=v1 document }
                 *
                 * 通过指定邮件会话ID，批量移动邮件到已删除文件夹
                 */
                batchTrash: async (
                    payload?: {
                        data?: { thread_ids?: Array<string> };
                        path: { user_mailbox_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/batch_trash`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=mail&resource=user_mailbox.thread&version=v1 document }
                 *
                 * 通过用户邮箱地址和邮件会话ID，获取该会话下的所有邮件关键信息列表。如需查询主题、正文、摘要、收发件人信息，请申请字段权限。
                 */
                get: async (
                    payload?: {
                        params?: {
                            format?: "full" | "plain_text_full" | "metadata";
                            include_spam_trash?: boolean;
                        };
                        path: { user_mailbox_id: string; thread_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    thread?: {
                                        id?: string;
                                        body_preview?: string;
                                        messages?: Array<{
                                            subject?: string;
                                            to?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            cc?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            bcc?: Array<{
                                                mail_address: string;
                                                name?: string;
                                            }>;
                                            head_from?: {
                                                mail_address: string;
                                                name?: string;
                                            };
                                            body_html?: string;
                                            internal_date?: string;
                                            message_state?: number;
                                            smtp_message_id?: string;
                                            message_id?: string;
                                            attachments?: Array<{
                                                filename: string;
                                                id?: string;
                                                attachment_type?: number;
                                                is_inline?: boolean;
                                                cid?: string;
                                            }>;
                                            body_plain_text?: string;
                                            thread_id?: string;
                                            body_preview?: string;
                                            label_ids?: Array<string>;
                                            folder_id?: string;
                                            in_reply_to?: string;
                                            reply_to?: string;
                                            priority_type?:
                                                | "0"
                                                | "1"
                                                | "3"
                                                | "5";
                                            security_level?: {
                                                is_risk?: boolean;
                                                risk_banner_level?:
                                                    | "WARNING"
                                                    | "DANGER"
                                                    | "INFO";
                                                risk_banner_reason?:
                                                    | "NO_REASON"
                                                    | "IMPERSONATE_DOMAIN"
                                                    | "IMPERSONATE_KP_NAME"
                                                    | "UNAUTH_EXTERNAL"
                                                    | "MALICIOUS_URL"
                                                    | "MALICIOUS_ATTACHMENT"
                                                    | "PHISHING"
                                                    | "IMPERSONATE_PARTNER"
                                                    | "EXTERNAL_ENCRYPTION_ATTACHMENT";
                                                is_header_from_external?: boolean;
                                                via_domain?: string;
                                                spam_banner_type?:
                                                    | "USER_REPORT"
                                                    | "USER_BLOCK"
                                                    | "ANTI_SPAM"
                                                    | "USER_RULE"
                                                    | "BLOCK_DOMIN"
                                                    | "BLOCK_ADDRESS";
                                                spam_user_rule_id?: string;
                                                spam_banner_info?: string;
                                            };
                                            references?: string;
                                            body_calendar?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/:thread_id`,
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
                            folder_id?: string;
                            only_unread?: boolean;
                            label_id?: string;
                        };
                        path: { user_mailbox_id: string };
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
                                    `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads`,
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
                                                        body_preview?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mail&resource=user_mailbox.thread&version=v1 document }
                 *
                 * 通过指定文件夹或标签，列出对应位置下的邮件会话列表。接口可返回邮件会话ID和会话下最新一封邮件的摘要。folder_id 和 label_id 必须且只能提供一个。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            folder_id?: string;
                            only_unread?: boolean;
                            label_id?: string;
                        };
                        path: { user_mailbox_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        body_preview?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=modify&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=modify&project=mail&resource=user_mailbox.thread&version=v1 document }
                 *
                 * 本接口提供修改邮件会话的能力，支持移动邮件会话的文件夹、给邮件会话添加和移除标签、标记邮件会话读和未读、移动邮件会话至垃圾邮件等能力。不支持移动邮件会话到已删除文件夹，如需，请使用删除邮件会话接口。至少填写add_label_ids、remove_label_ids、add_folder中的一个参数。
                 */
                modify: async (
                    payload?: {
                        data?: {
                            add_label_ids?: Array<string>;
                            remove_label_ids?: Array<string>;
                            add_folder?: string;
                        };
                        path: { user_mailbox_id: string; thread_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/:thread_id/modify`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.thread&apiName=trash&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=trash&project=mail&resource=user_mailbox.thread&version=v1 document }
                 *
                 * 移动指定的邮件会话到已删除文件夹
                 */
                trash: async (
                    payload?: {
                        path: { user_mailbox_id: string; thread_id: string };
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
                                `${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/threads/:thread_id/trash`,
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
