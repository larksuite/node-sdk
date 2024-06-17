import identity from "lodash.identity";
import pickBy from "lodash.pickby";
import get from "lodash.get";
import fs from "fs";
import { fillApiPath } from "@node-sdk/utils";
import { Logger } from "@node-sdk/typings";
import { formatErrors } from "@node-sdk/client/utils";
import { IRequestOptions } from "@node-sdk/code-gen/types";
import { IPayload } from "@node-sdk/client/types";
import { HttpInstance } from "@node-sdk/typings/http";
import compensation from "./compensation";

// auto gen
export default abstract class Client extends compensation {
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
     * 通讯录
     */
    contact = {
        /**
         * 自定义用户字段
         */
        customAttr: {
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
                                `${this.domain}/open-apis/contact/v3/custom_attrs`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    id: string;
                                                    type: string;
                                                    options?: {
                                                        default_option_id?: string;
                                                        option_type:
                                                            | "TEXT"
                                                            | "PICTURE";
                                                        options: Array<{
                                                            id: string;
                                                            value: string;
                                                            name?: string;
                                                        }>;
                                                    };
                                                    i18n_name?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                    }>;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=custom_attr&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/custom_attr/list document }
             *
             * 获取企业自定义用户字段
             *
             * 获取企业自定义的用户字段配置信息
             *
             * 调用该接口前，需要先确认[企业管理员](https://www.feishu.cn/hc/zh-CN/articles/360049067822)在[企业管理后台 - 组织架构 - 成员字段管理](http://www.feishu.cn/admin/contacts/employee-field-new/custom) 自定义字段管理栏开启了“允许开放平台API调用“。;;![通讯录.gif](//sf3-cn.feishucdn.com/obj/open-platform-opendoc/544738c94f13ef0b9ebaff53a5133cc7_E9EGMkXyzX.gif)
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
                                    id: string;
                                    type: string;
                                    options?: {
                                        default_option_id?: string;
                                        option_type: "TEXT" | "PICTURE";
                                        options: Array<{
                                            id: string;
                                            value: string;
                                            name?: string;
                                        }>;
                                    };
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/custom_attrs`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 部门
         */
        department: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=batch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch&project=contact&resource=department&version=v3 document }
             */
            batch: async (
                payload?: {
                    params: {
                        department_ids: number;
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
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
                                    name: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    leader_user_id?: string;
                                    chat_id?: string;
                                    order?: string;
                                    unit_ids?: Array<string>;
                                    member_count?: number;
                                    status?: { is_deleted?: boolean };
                                    create_group_chat?: boolean;
                                    leaders?: Array<{
                                        leaderType: number;
                                        leaderID: string;
                                    }>;
                                    group_chat_employee_types?: Array<number>;
                                    department_hrbps?: Array<string>;
                                    primary_member_count?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments/batch`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            childrenWithIterator: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        fetch_child?: boolean;
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { department_id: string };
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
                                `${this.domain}/open-apis/contact/v3/departments/:department_id/children`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    name: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                    parent_department_id: string;
                                                    department_id?: string;
                                                    open_department_id?: string;
                                                    leader_user_id?: string;
                                                    chat_id?: string;
                                                    order?: string;
                                                    unit_ids?: Array<string>;
                                                    member_count?: number;
                                                    status?: {
                                                        is_deleted?: boolean;
                                                    };
                                                    create_group_chat?: boolean;
                                                    leaders?: Array<{
                                                        leaderType: number;
                                                        leaderID: string;
                                                    }>;
                                                    group_chat_employee_types?: Array<number>;
                                                    department_hrbps?: Array<string>;
                                                    primary_member_count?: number;
                                                }>;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=children&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/children document }
             *
             * 获取子部门列表
             *
             * 通过部门ID获取部门的子部门列表。
             *
             * - 部门ID 必填，根部门的部门ID 为0。;- 使用 `user_access_token` 时，返回该用户组织架构可见性范围（[登陆企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内的所有可见部门。当进行递归查询时，最多1000个部门对该用户可见。;;- 使用 ;`tenant_access_token` 则基于应用的通讯录权限范围进行权限校验与过滤。;如果部门ID为0，会检验应用是否有全员通讯录权限，如果是非0 部门ID，则会校验应用是否有该部门的通讯录权限。无部门权限返回无部门通讯录权限错误码，有权限则返回部门下子部门列表（根据fetch_child决定是否递归）。
             */
            children: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        fetch_child?: boolean;
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { department_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    name: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    leader_user_id?: string;
                                    chat_id?: string;
                                    order?: string;
                                    unit_ids?: Array<string>;
                                    member_count?: number;
                                    status?: { is_deleted?: boolean };
                                    create_group_chat?: boolean;
                                    leaders?: Array<{
                                        leaderType: number;
                                        leaderID: string;
                                    }>;
                                    group_chat_employee_types?: Array<number>;
                                    department_hrbps?: Array<string>;
                                    primary_member_count?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments/:department_id/children`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/create document }
             *
             * 创建部门
             *
             * 该接口用于向通讯录中创建部门。
             *
             * 只可在应用的通讯录权限范围内的部门下创建部门。若需要在根部门下创建子部门，则应用通讯录权限范围需要设置为“全部成员”。应用商店应用无权限调用此接口。
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        i18n_name?: {
                            zh_cn?: string;
                            ja_jp?: string;
                            en_us?: string;
                        };
                        parent_department_id: string;
                        department_id?: string;
                        leader_user_id?: string;
                        order?: string;
                        unit_ids?: Array<string>;
                        create_group_chat?: boolean;
                        leaders?: Array<{
                            leaderType: number;
                            leaderID: string;
                        }>;
                        group_chat_employee_types?: Array<number>;
                        department_hrbps?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        client_token?: string;
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
                                department?: {
                                    name: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    leader_user_id?: string;
                                    chat_id?: string;
                                    order?: string;
                                    unit_ids?: Array<string>;
                                    member_count?: number;
                                    status?: { is_deleted?: boolean };
                                    leaders?: Array<{
                                        leaderType: number;
                                        leaderID: string;
                                    }>;
                                    group_chat_employee_types?: Array<number>;
                                    department_hrbps?: Array<string>;
                                    primary_member_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/delete document }
             *
             * 删除部门
             *
             * 该接口用于从通讯录中删除部门。
             *
             * 应用需要同时拥有待删除部门及其父部门的通讯录授权。
             */
            delete: async (
                payload?: {
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { department_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments/:department_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/get document }
             *
             * 获取单个部门信息
             *
             * 该接口用于向通讯录获取单个部门信息。
             *
             * - 使用`tenant_access_token`时，应用需要拥有待查询部门的通讯录授权。如果需要获取根部门信息，则需要拥有全员权限。;- 使用`user_access_token`时，用户需要有待查询部门的可见性，如果需要获取根部门信息，则要求员工可见所有人。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { department_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                department?: {
                                    name: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    leader_user_id?: string;
                                    chat_id?: string;
                                    order?: string;
                                    unit_ids?: Array<string>;
                                    member_count?: number;
                                    status?: { is_deleted?: boolean };
                                    leaders?: Array<{
                                        leaderType: number;
                                        leaderID: string;
                                    }>;
                                    group_chat_employee_types?: Array<number>;
                                    department_hrbps?: Array<string>;
                                    primary_member_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments/:department_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
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
                        parent_department_id?: string;
                        fetch_child?: boolean;
                        page_size?: number;
                        page_token?: string;
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
                                `${this.domain}/open-apis/contact/v3/departments`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    name: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                    parent_department_id: string;
                                                    department_id?: string;
                                                    open_department_id?: string;
                                                    leader_user_id?: string;
                                                    chat_id?: string;
                                                    order?: string;
                                                    unit_ids?: Array<string>;
                                                    member_count?: number;
                                                    status?: {
                                                        is_deleted?: boolean;
                                                    };
                                                    leaders?: Array<{
                                                        leaderType: number;
                                                        leaderID: string;
                                                    }>;
                                                    group_chat_employee_types?: Array<number>;
                                                    department_hrbps?: Array<string>;
                                                    primary_member_count?: number;
                                                }>;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=department&version=v3 document }
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        parent_department_id?: string;
                        fetch_child?: boolean;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    name: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    leader_user_id?: string;
                                    chat_id?: string;
                                    order?: string;
                                    unit_ids?: Array<string>;
                                    member_count?: number;
                                    status?: { is_deleted?: boolean };
                                    leaders?: Array<{
                                        leaderType: number;
                                        leaderID: string;
                                    }>;
                                    group_chat_employee_types?: Array<number>;
                                    department_hrbps?: Array<string>;
                                    primary_member_count?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            parentWithIterator: async (
                payload?: {
                    params: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        department_id: string;
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
                                `${this.domain}/open-apis/contact/v3/departments/parent`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    name: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                    parent_department_id: string;
                                                    department_id?: string;
                                                    open_department_id?: string;
                                                    leader_user_id?: string;
                                                    chat_id?: string;
                                                    order?: string;
                                                    unit_ids?: Array<string>;
                                                    member_count?: number;
                                                    status?: {
                                                        is_deleted?: boolean;
                                                    };
                                                    leaders?: Array<{
                                                        leaderType: number;
                                                        leaderID: string;
                                                    }>;
                                                    group_chat_employee_types?: Array<number>;
                                                    department_hrbps?: Array<string>;
                                                    primary_member_count?: number;
                                                }>;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=parent&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/parent document }
             *
             * 获取父部门信息
             *
             * 该接口用来递归获取部门父部门的信息，并按照由子到父的顺序返回有权限的父部门信息列表。
             *
             * 使用`tenant_access_token`时,该接口只返回可见性范围内的父部门信息。;例如：A >>B>>C>>D四级部门，通讯录权限只到B，那么查询D部门的parent，会返回B和C两级部门。;使用user_access_token时,该接口只返回对于用户可见的父部门信息。
             */
            parent: async (
                payload?: {
                    params: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        department_id: string;
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
                                    name: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    leader_user_id?: string;
                                    chat_id?: string;
                                    order?: string;
                                    unit_ids?: Array<string>;
                                    member_count?: number;
                                    status?: { is_deleted?: boolean };
                                    leaders?: Array<{
                                        leaderType: number;
                                        leaderID: string;
                                    }>;
                                    group_chat_employee_types?: Array<number>;
                                    department_hrbps?: Array<string>;
                                    primary_member_count?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments/parent`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/patch document }
             *
             * 修改部门部分信息
             *
             * 该接口用于更新通讯录中部门的信息。
             *
             * 调用该接口需要具有该部门以及更新操作涉及的部门的通讯录权限。
             */
            patch: async (
                payload?: {
                    data?: {
                        name?: string;
                        i18n_name?: {
                            zh_cn?: string;
                            ja_jp?: string;
                            en_us?: string;
                        };
                        parent_department_id?: string;
                        leader_user_id?: string;
                        order?: string;
                        unit_ids?: Array<string>;
                        create_group_chat?: boolean;
                        leaders?: Array<{
                            leaderType: number;
                            leaderID: string;
                        }>;
                        group_chat_employee_types?: Array<number>;
                        department_hrbps?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { department_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                department?: {
                                    name: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    leader_user_id?: string;
                                    chat_id?: string;
                                    order?: string;
                                    unit_ids?: Array<string>;
                                    member_count?: number;
                                    status?: { is_deleted?: boolean };
                                    leaders?: Array<{
                                        leaderType: number;
                                        leaderID: string;
                                    }>;
                                    group_chat_employee_types?: Array<number>;
                                    department_hrbps?: Array<string>;
                                    primary_member_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments/:department_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            searchWithIterator: async (
                payload?: {
                    data: { query: string };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                `${this.domain}/open-apis/contact/v3/departments/search`,
                                path
                            ),
                            method: "POST",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    name: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                    parent_department_id: string;
                                                    department_id?: string;
                                                    open_department_id?: string;
                                                    leader_user_id?: string;
                                                    chat_id?: string;
                                                    order?: string;
                                                    unit_ids?: Array<string>;
                                                    member_count?: number;
                                                    status?: {
                                                        is_deleted?: boolean;
                                                    };
                                                    create_group_chat?: boolean;
                                                    leaders?: Array<{
                                                        leaderType: number;
                                                        leaderID: string;
                                                    }>;
                                                    group_chat_employee_types?: Array<number>;
                                                    department_hrbps?: Array<string>;
                                                    primary_member_count?: number;
                                                }>;
                                                page_token?: string;
                                                has_more: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=search&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/search document }
             *
             * 搜索部门
             *
             * 搜索部门，用户通过关键词查询可见的部门数据，部门可见性需要管理员在后台配置。
             *
             * 部门存在，但用户搜索不到并不一定是搜索有问题，可能是管理员在后台配置了权限控制，导致用户无法搜索到该部门。
             */
            search: async (
                payload?: {
                    data: { query: string };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                    name: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    leader_user_id?: string;
                                    chat_id?: string;
                                    order?: string;
                                    unit_ids?: Array<string>;
                                    member_count?: number;
                                    status?: { is_deleted?: boolean };
                                    create_group_chat?: boolean;
                                    leaders?: Array<{
                                        leaderType: number;
                                        leaderID: string;
                                    }>;
                                    group_chat_employee_types?: Array<number>;
                                    department_hrbps?: Array<string>;
                                    primary_member_count?: number;
                                }>;
                                page_token?: string;
                                has_more: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments/search`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=unbind_department_chat&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/unbind_department_chat document }
             *
             * 部门群转为普通群
             *
             * 通过该接口将部门群转为普通群。
             */
            unbindDepartmentChat: async (
                payload?: {
                    data: { department_id: string };
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
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments/unbind_department_chat`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update document }
             *
             * 更新部门所有信息
             *
             * 该接口用于更新当前部门所有信息。
             *
             * - 调用该接口需要具有该部门与更新部门信息涉及的通讯录权限。;; - 没有填写的字段会被置为空值（order字段除外）。
             */
            update: async (
                payload?: {
                    data: {
                        name: string;
                        i18n_name?: {
                            zh_cn?: string;
                            ja_jp?: string;
                            en_us?: string;
                        };
                        parent_department_id: string;
                        leader_user_id?: string;
                        order?: string;
                        unit_ids?: Array<string>;
                        create_group_chat?: boolean;
                        leaders?: Array<{
                            leaderType: number;
                            leaderID: string;
                        }>;
                        group_chat_employee_types?: Array<number>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { department_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                department?: {
                                    name: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    leader_user_id?: string;
                                    chat_id?: string;
                                    order?: string;
                                    unit_ids?: Array<string>;
                                    member_count?: number;
                                    status?: { is_deleted?: boolean };
                                    leaders?: Array<{
                                        leaderType: number;
                                        leaderID: string;
                                    }>;
                                    group_chat_employee_types?: Array<number>;
                                    primary_member_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments/:department_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=update_department_id&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_department_id&project=contact&resource=department&version=v3 document }
             */
            updateDepartmentId: async (
                payload?: {
                    data: { new_department_id: string };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { department_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/departments/:department_id/update_department_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 人员类型
         */
        employeeTypeEnum: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/create document }
             *
             * 新增人员类型
             *
             * 新增自定义人员类型
             */
            create: async (
                payload?: {
                    data: {
                        content: string;
                        enum_type: number;
                        enum_status: number;
                        i18n_content?: Array<{
                            locale?: string;
                            value?: string;
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
                                employee_type_enum?: {
                                    enum_id?: string;
                                    enum_value?: string;
                                    content: string;
                                    enum_type: number;
                                    enum_status: number;
                                    i18n_content?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/employee_type_enums`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/delete document }
             *
             * 删除人员类型
             *
             * 删除自定义人员类型
             */
            delete: async (
                payload?: {
                    path?: { enum_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/employee_type_enums/:enum_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            listWithIterator: async (
                payload?: {
                    params?: { page_token?: string; page_size?: number };
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
                                `${this.domain}/open-apis/contact/v3/employee_type_enums`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    enum_id?: string;
                                                    enum_value?: string;
                                                    content: string;
                                                    enum_type: number;
                                                    enum_status: number;
                                                    i18n_content?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                    }>;
                                                }>;
                                                has_more?: boolean;
                                                page_token?: string;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list document }
             *
             * 查询人员类型
             *
             * 该接口用于获取员工的人员类型
             */
            list: async (
                payload?: {
                    params?: { page_token?: string; page_size?: number };
                },
                options?: IRequestOptions
            ) => {
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
                                    enum_id?: string;
                                    enum_value?: string;
                                    content: string;
                                    enum_type: number;
                                    enum_status: number;
                                    i18n_content?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/employee_type_enums`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/update document }
             *
             * 更新人员类型
             *
             * 更新自定义人员类型
             */
            update: async (
                payload?: {
                    data: {
                        content: string;
                        enum_type: number;
                        enum_status: number;
                        i18n_content?: Array<{
                            locale?: string;
                            value?: string;
                        }>;
                    };
                    path?: { enum_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                employee_type_enum?: {
                                    enum_id?: string;
                                    enum_value?: string;
                                    content: string;
                                    enum_type: number;
                                    enum_status: number;
                                    i18n_content?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/employee_type_enums/:enum_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * functional_role
         */
        functionalRole: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=functional_role&version=v3 document }
             */
            create: async (
                payload?: {
                    data: { role_name: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { role_id: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/functional_roles`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=functional_role&version=v3 document }
             */
            delete: async (
                payload?: {
                    path: { role_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/functional_roles/:role_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=functional_role&version=v3 document }
             */
            update: async (
                payload?: {
                    data: { role_name: string };
                    path: { role_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/functional_roles/:role_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * functional_role.member
         */
        functionalRoleMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=batch_create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=contact&resource=functional_role.member&version=v3 document }
             */
            batchCreate: async (
                payload?: {
                    data: { members: Array<string> };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { role_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    user_id: string;
                                    reason: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members/batch_create`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=batch_delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=contact&resource=functional_role.member&version=v3 document }
             */
            batchDelete: async (
                payload?: {
                    data?: { members?: Array<string> };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { role_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                result?: Array<{
                                    user_id: string;
                                    reason: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members/batch_delete`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=functional_role.member&version=v3 document }
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { role_id: string; member_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                member?: {
                                    user_id?: string;
                                    scope_type?: "All" | "Part" | "None";
                                    department_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members/:member_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
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
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { role_id: string };
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
                                `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                members?: Array<{
                                                    user_id?: string;
                                                    scope_type?:
                                                        | "All"
                                                        | "Part"
                                                        | "None";
                                                    department_ids?: Array<string>;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=functional_role.member&version=v3 document }
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { role_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                members?: Array<{
                                    user_id?: string;
                                    scope_type?: "All" | "Part" | "None";
                                    department_ids?: Array<string>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=scopes&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=scopes&project=contact&resource=functional_role.member&version=v3 document }
             */
            scopes: async (
                payload?: {
                    data: {
                        members: Array<string>;
                        departments: Array<string>;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { role_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    user_id: string;
                                    reason: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members/scopes`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 用户组
         */
        group: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/create document }
             *
             * 创建用户组
             *
             * 使用该接口创建用户组，请注意创建用户组时应用的通讯录权限范围需为“全部员工”，否则会创建失败，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        description?: string;
                        type?: number;
                        dynamic_group_rule?: {
                            department_level?: "recursive" | "non_recursive";
                            expressions?: Array<{
                                field?: string;
                                operator?: string;
                                value?: string;
                                values?: Array<string>;
                            }>;
                            joiner_rule?: string;
                        };
                        visible_scope?: {
                            visible_scope_type?:
                                | "invisible"
                                | "public"
                                | "group_member_visible"
                                | "specified_scope_visible";
                            visible_users?: Array<string>;
                            visible_departments?: Array<string>;
                            scene_types?: Array<number>;
                        };
                        department_scope_list?: Array<string>;
                        group_id?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
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
                            data?: { group_id: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/delete document }
             *
             * 删除用户组
             *
             * 通过该接口可删除企业中的用户组，请注意删除用户组时应用的通讯录权限范围需为“全部员工”，否则会删除失败，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             */
            delete: async (
                payload?: {
                    path: { group_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group/:group_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/get document }
             *
             * 查询用户组
             *
             * 根据用户组 ID 查询某个用户组的基本信息，支持查询普通用户组和动态用户组。请确保应用的通讯录权限范围里包括该用户组或者是“全部员工”，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                    };
                    path: { group_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                group: {
                                    id: string;
                                    name: string;
                                    description?: string;
                                    member_user_count?: number;
                                    member_department_count?: number;
                                    type?: number;
                                    dynamic_group_rule?: {
                                        department_level?:
                                            | "recursive"
                                            | "non_recursive";
                                        expressions?: Array<{
                                            field?: string;
                                            operator?: string;
                                            value?: string;
                                            values?: Array<string>;
                                        }>;
                                        joiner_rule?: string;
                                        group_status?:
                                            | "completed"
                                            | "failure"
                                            | "creating"
                                            | "updating";
                                    };
                                    visible_scope?: {
                                        visible_scope_type?:
                                            | "invisible"
                                            | "public"
                                            | "group_member_visible"
                                            | "specified_scope_visible";
                                        visible_users?: Array<string>;
                                        visible_departments?: Array<string>;
                                        scene_types?: Array<number>;
                                    };
                                    department_scope_list?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group/:group_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=member_belong&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/member_belong document }
             *
             * 查询用户所属用户组
             *
             * 通过该接口可查询该用户所属的用户组列表，可分别查询普通用户组和动态用户组。如果应用的通讯录权限范围是“全部员工”，则可获取该员工所属的全部用户组列表。如果应用的通讯录权限范围不是“全部员工”，则仅可获取通讯录权限范围内该员工所属的用户组。[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             */
            memberBelong: async (
                payload?: {
                    params: {
                        member_id: string;
                        member_id_type?: "open_id" | "union_id" | "user_id";
                        group_type?: number;
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
                                group_list?: Array<string>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group/member_belong`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/patch document }
             *
             * 更新用户组
             *
             * 使用该接口更新用户组信息，请注意更新用户组时应用的通讯录权限范围需为“全部员工”，否则会更新失败。[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             */
            patch: async (
                payload?: {
                    data?: {
                        name?: string;
                        description?: string;
                        dynamic_group_rule?: {
                            department_level?: "recursive" | "non_recursive";
                            expressions?: Array<{
                                field?: string;
                                operator?: string;
                                value?: string;
                                values?: Array<string>;
                            }>;
                            joiner_rule?: string;
                        };
                        visible_scope?: {
                            visible_scope_type?:
                                | "invisible"
                                | "public"
                                | "group_member_visible"
                                | "specified_scope_visible";
                            visible_users?: Array<string>;
                            visible_departments?: Array<string>;
                            scene_types?: Array<number>;
                        };
                        department_scope_list?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { group_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group/:group_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            simplelistWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        type?: number;
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
                                `${this.domain}/open-apis/contact/v3/group/simplelist`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                grouplist: Array<{
                                                    id: string;
                                                    name: string;
                                                    description?: string;
                                                    member_user_count?: number;
                                                    member_department_count?: number;
                                                    type?: number;
                                                    department_scope_list?: Array<string>;
                                                    group_id?: string;
                                                }>;
                                                page_token: string;
                                                has_more: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=simplelist&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/simplelist document }
             *
             * 查询用户组列表
             *
             * 通过该接口可查询企业的用户组列表，可分别查询普通用户组或动态用户组。如果应用的通讯录权限范围是“全部员工”，则可获取企业全部用户组列表。如果应用的通讯录权限范围不是“全部员工”，则仅可获取通讯录权限范围内的用户组。[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             */
            simplelist: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        type?: number;
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
                                grouplist: Array<{
                                    id: string;
                                    name: string;
                                    description?: string;
                                    member_user_count?: number;
                                    member_department_count?: number;
                                    type?: number;
                                    department_scope_list?: Array<string>;
                                    group_id?: string;
                                }>;
                                page_token: string;
                                has_more: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group/simplelist`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 用户组成员
         */
        groupMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=add&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/add document }
             *
             * 添加用户组成员
             *
             * 向用户组中添加成员(目前成员仅支持用户，未来会支持部门)，如果应用的通讯录权限范围是“全部员工”，则可将任何成员添加到任何用户组。如果应用的通讯录权限范围不是“全部员工”，则仅可将通讯录权限范围中的成员添加到通讯录权限范围的用户组中，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             */
            add: async (
                payload?: {
                    data: {
                        member_type: "user";
                        member_id_type: "open_id" | "union_id" | "user_id";
                        member_id: string;
                    };
                    path: { group_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group/:group_id/member/add`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=batch_add&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_add document }
             *
             * 批量添加用户组成员
             *
             * 向普通用户组中批量添加成员(目前仅支持添加用户，暂不支持添加部门），如果应用的通讯录权限范围是“全部员工”，则可将任何成员添加到任何用户组。如果应用的通讯录权限范围不是“全部员工”，则仅可将通讯录权限范围中的成员添加到通讯录权限范围的用户组中，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             *
             * 请求体中的member_type，目前仅支持user， 未来将支持department。
             */
            batchAdd: async (
                payload?: {
                    data?: {
                        members?: Array<{
                            member_id: string;
                            member_type: string;
                            member_id_type?: string;
                        }>;
                    };
                    path: { group_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    member_id: string;
                                    code: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group/:group_id/member/batch_add`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=batch_remove&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_remove document }
             *
             * 批量移除用户组成员
             *
             * 从普通用户组中批量移除成员 (目前仅支持移除用户，暂不支持移除部门）。如果应用的通讯录权限范围是“全部员工”，则可将任何成员移出任何用户组。如果应用的通讯录权限范围不是“全部员工”，则仅可将通讯录权限范围中的成员从通讯录权限范围的用户组中移除， [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             *
             * 请求体中的member_type，目前仅支持user， 未来将支持department。
             */
            batchRemove: async (
                payload?: {
                    data: {
                        members: Array<{
                            member_id: string;
                            member_type: string;
                            member_id_type?: string;
                        }>;
                    };
                    path: { group_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group/:group_id/member/batch_remove`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=remove&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/remove document }
             *
             * 移除用户组成员
             *
             * 从用户组中移除成员 (目前成员仅支持用户，未来会支持部门)，如果应用的通讯录权限范围是“全部员工”，则可将任何成员移出任何用户组。如果应用的通讯录权限范围不是“全部员工”，则仅可将通讯录权限范围中的成员从通讯录权限范围的用户组中移除， [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             */
            remove: async (
                payload?: {
                    data: {
                        member_type: "user";
                        member_id: string;
                        member_id_type: "open_id" | "union_id" | "user_id";
                    };
                    path: { group_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group/:group_id/member/remove`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=simplelist&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/simplelist document }
             *
             * 查询用户组成员列表
             *
             * 通过该接口可查询某个用户组的成员列表（支持查询成员中的用户和部门）, 本接口支持普通用户组和动态用户组。如果应用的通讯录权限范围是“全部员工”，则可查询企业内任何用户组的成员列表。如果应用的通讯录权限范围不是“全部员工”，则仅可查询通讯录权限范围中的用户组的成员列表，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
             */
            simplelist: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        member_id_type?:
                            | "open_id"
                            | "union_id"
                            | "user_id"
                            | "department_id";
                        member_type?: "user" | "department";
                    };
                    path: { group_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                memberlist: Array<{
                                    member_id: string;
                                    member_type: string;
                                    member_id_type?: string;
                                }>;
                                page_token: string;
                                has_more: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/group/:group_id/member/simplelist`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * job_family
         */
        jobFamily: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=job_family&version=v3 document }
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        description?: string;
                        parent_job_family_id?: string;
                        status: boolean;
                        i18n_name?: Array<{ locale?: string; value?: string }>;
                        i18n_description?: Array<{
                            locale?: string;
                            value?: string;
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
                                job_family?: {
                                    name?: string;
                                    description?: string;
                                    parent_job_family_id?: string;
                                    status?: boolean;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    i18n_description?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    job_family_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_families`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=job_family&version=v3 document }
             */
            delete: async (
                payload?: {
                    path: { job_family_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_families/:job_family_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=job_family&version=v3 document }
             */
            get: async (
                payload?: {
                    path: { job_family_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                job_family?: {
                                    name?: string;
                                    description?: string;
                                    parent_job_family_id?: string;
                                    status?: boolean;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    i18n_description?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    job_family_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_families/:job_family_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
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
                        name?: string;
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
                                `${this.domain}/open-apis/contact/v3/job_families`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    name?: string;
                                                    description?: string;
                                                    parent_job_family_id?: string;
                                                    status?: boolean;
                                                    i18n_name?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                    }>;
                                                    i18n_description?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                    }>;
                                                    job_family_id?: string;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_family&version=v3 document }
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        name?: string;
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
                                    name?: string;
                                    description?: string;
                                    parent_job_family_id?: string;
                                    status?: boolean;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    i18n_description?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    job_family_id?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_families`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=job_family&version=v3 document }
             */
            update: async (
                payload?: {
                    data?: {
                        name?: string;
                        description?: string;
                        parent_job_family_id?: string;
                        status?: boolean;
                        i18n_name?: Array<{ locale?: string; value?: string }>;
                        i18n_description?: Array<{
                            locale?: string;
                            value?: string;
                        }>;
                    };
                    path: { job_family_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                job_family?: {
                                    name?: string;
                                    description?: string;
                                    parent_job_family_id?: string;
                                    status?: boolean;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    i18n_description?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    job_family_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_families/:job_family_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * job_level
         */
        jobLevel: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=job_level&version=v3 document }
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        description?: string;
                        order?: number;
                        status: boolean;
                        i18n_name?: Array<{ locale?: string; value?: string }>;
                        i18n_description?: Array<{
                            locale?: string;
                            value?: string;
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
                                job_level?: {
                                    name?: string;
                                    description?: string;
                                    order?: number;
                                    status?: boolean;
                                    job_level_id?: string;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    i18n_description?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_levels`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=job_level&version=v3 document }
             */
            delete: async (
                payload?: {
                    path: { job_level_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_levels/:job_level_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=job_level&version=v3 document }
             */
            get: async (
                payload?: {
                    path: { job_level_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                job_level?: {
                                    name?: string;
                                    description?: string;
                                    order?: number;
                                    status?: boolean;
                                    job_level_id?: string;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    i18n_description?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_levels/:job_level_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
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
                        name?: string;
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
                                `${this.domain}/open-apis/contact/v3/job_levels`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    name?: string;
                                                    description?: string;
                                                    order?: number;
                                                    status?: boolean;
                                                    job_level_id?: string;
                                                    i18n_name?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                    }>;
                                                    i18n_description?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                    }>;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_level&version=v3 document }
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        name?: string;
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
                                    name?: string;
                                    description?: string;
                                    order?: number;
                                    status?: boolean;
                                    job_level_id?: string;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    i18n_description?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_levels`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=job_level&version=v3 document }
             */
            update: async (
                payload?: {
                    data?: {
                        name?: string;
                        description?: string;
                        order?: number;
                        status?: boolean;
                        i18n_name?: Array<{ locale?: string; value?: string }>;
                        i18n_description?: Array<{
                            locale?: string;
                            value?: string;
                        }>;
                    };
                    path: { job_level_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                job_level?: {
                                    name?: string;
                                    description?: string;
                                    order?: number;
                                    status?: boolean;
                                    job_level_id?: string;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    i18n_description?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_levels/:job_level_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * job_title
         */
        jobTitle: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_title&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=job_title&version=v3 document }
             */
            get: async (
                payload?: {
                    path?: { job_title_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                job_title?: {
                                    job_title_id?: string;
                                    name?: string;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    status?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_titles/:job_title_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
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
                                `${this.domain}/open-apis/contact/v3/job_titles`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    job_title_id?: string;
                                                    name?: string;
                                                    i18n_name?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                    }>;
                                                    status?: boolean;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_title&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_title&version=v3 document }
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
                                    job_title_id?: string;
                                    name?: string;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    status?: boolean;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/job_titles`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 通讯录权限范围
         */
        scope: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                `${this.domain}/open-apis/contact/v3/scopes`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                department_ids?: Array<string>;
                                                user_ids?: Array<string>;
                                                group_ids?: Array<string>;
                                                has_more?: boolean;
                                                page_token?: string;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=scope&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/scope/list document }
             *
             * 获取通讯录授权范围
             *
             * 该接口用于获取应用被授权可访问的通讯录范围，包括可访问的部门列表、用户列表和用户组列表。;授权范围为全员时，返回的部门列表为该企业所有的一级部门；否则返回的部门为管理员在设置授权范围时勾选的部门（不包含勾选部门的子部门）。
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                department_ids?: Array<string>;
                                user_ids?: Array<string>;
                                group_ids?: Array<string>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/scopes`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 单位
         */
        unit: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=bind_department&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/bind_department document }
             *
             * 建立部门与单位的绑定关系
             *
             * 通过该接口建立部门与单位的绑定关系。由于单位是旗舰版付费功能，企业需开通相关版本，否则会绑定失败，不同版本请参考[飞书版本对比](https://www.feishu.cn/service)
             */
            bindDepartment: async (
                payload?: {
                    data: {
                        unit_id: string;
                        department_id: string;
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
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/unit/bind_department`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/create document }
             *
             * 创建单位
             *
             * 该接口用于创建单位。注意：单位功能属于旗舰版付费功能，企业需开通对应版本才可以创建单位，不同版本请参考[飞书版本对比](https://www.feishu.cn/service)。
             */
            create: async (
                payload?: {
                    data: { unit_id?: string; name: string; unit_type: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { unit_id: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/unit`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/delete document }
             *
             * 删除单位
             *
             * 使用该接口删除单位，需要有更新单位的权限。注意：如果单位的单位类型被其它的业务使用，不允许删除。
             */
            delete: async (
                payload?: {
                    path: { unit_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/unit/:unit_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/get document }
             *
             * 获取单位信息
             *
             * 该接口用于获取单位信息
             */
            get: async (
                payload?: {
                    path: { unit_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                unit: {
                                    unit_id: string;
                                    name: string;
                                    unit_type: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/unit/:unit_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list document }
             *
             * 批量获取单位列表
             *
             * 通过该接口获取企业的单位列表，需获取单位的权限
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
                                unitlist: Array<{
                                    unit_id: string;
                                    name: string;
                                    unit_type: string;
                                }>;
                                has_more: boolean;
                                page_token: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/unit`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=list_department&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list_department document }
             *
             * 获取单位绑定的部门列表
             *
             * 通过该接口获取单位绑定的部门列表，需具有获取单位的权限
             */
            listDepartment: async (
                payload?: {
                    params: {
                        unit_id: string;
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                departmentlist: Array<{
                                    unit_id: string;
                                    department_id: string;
                                }>;
                                has_more: boolean;
                                page_token: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/unit/list_department`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/patch document }
             *
             * 修改单位信息
             *
             * 调用该接口，需要有更新单位的权限。注意：单位功能属于旗舰版付费功能，企业需开通对应版本才可以修改单位
             */
            patch: async (
                payload?: {
                    data?: { name?: string };
                    path: { unit_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/unit/:unit_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=unbind_department&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/unbind_department document }
             *
             * 解除部门与单位的绑定关系
             *
             * 通过该接口解除部门与单位的绑定关系，需更新单位的权限，需对应部门的通讯录权限。由于单位是旗舰版付费功能，企业需开通相关功能，否则会解绑失败
             */
            unbindDepartment: async (
                payload?: {
                    data: {
                        unit_id: string;
                        department_id: string;
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
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/unit/unbind_department`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 用户
         */
        user: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=batch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch&project=contact&resource=user&version=v3 document }
             */
            batch: async (
                payload?: {
                    params: {
                        user_ids: number;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
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
                                    user_id?: string;
                                    open_id?: string;
                                    name: string;
                                    en_name?: string;
                                    nickname?: string;
                                    email?: string;
                                    mobile: string;
                                    mobile_visible?: boolean;
                                    gender?: number;
                                    avatar_key?: string;
                                    avatar?: {
                                        avatar_72?: string;
                                        avatar_240?: string;
                                        avatar_640?: string;
                                        avatar_origin?: string;
                                    };
                                    status?: {
                                        is_frozen?: boolean;
                                        is_resigned?: boolean;
                                        is_activated?: boolean;
                                        is_exited?: boolean;
                                        is_unjoin?: boolean;
                                    };
                                    department_ids?: Array<string>;
                                    leader_user_id?: string;
                                    city?: string;
                                    country?: string;
                                    work_station?: string;
                                    join_time?: number;
                                    is_tenant_manager?: boolean;
                                    employee_no?: string;
                                    employee_type?: number;
                                    positions?: Array<{
                                        position_code?: string;
                                        position_name?: string;
                                        department_id?: string;
                                        leader_user_id?: string;
                                        leader_position_code?: string;
                                        is_major?: boolean;
                                    }>;
                                    orders?: Array<{
                                        department_id?: string;
                                        user_order?: number;
                                        department_order?: number;
                                        is_primary_dept?: boolean;
                                    }>;
                                    custom_attrs?: Array<{
                                        type?: string;
                                        id?: string;
                                        value?: {
                                            text?: string;
                                            url?: string;
                                            pc_url?: string;
                                            option_id?: string;
                                            option_value?: string;
                                            name?: string;
                                            picture_url?: string;
                                            generic_user?: {
                                                id: string;
                                                type: number;
                                            };
                                        };
                                    }>;
                                    enterprise_email?: string;
                                    idp_type?: string;
                                    time_zone?: string;
                                    description?: string;
                                    job_title?: string;
                                    need_send_notification?: boolean;
                                    notification_option?: {
                                        channels?: Array<string>;
                                        language?: "zh-CN" | "en-US" | "ja-JP";
                                    };
                                    is_frozen?: boolean;
                                    geo?: string;
                                    job_level_id?: string;
                                    job_family_id?: string;
                                    subscription_ids?: Array<string>;
                                    assign_info?: Array<{
                                        subscription_id?: string;
                                        license_plan_key?: string;
                                        product_name?: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        start_time?: string;
                                        end_time?: string;
                                    }>;
                                    department_path?: Array<{
                                        department_id?: string;
                                        department_name?: {
                                            name?: string;
                                            i18n_name?: {
                                                zh_cn?: string;
                                                ja_jp?: string;
                                                en_us?: string;
                                            };
                                        };
                                        department_path?: {
                                            department_ids?: Array<string>;
                                            department_path_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                    }>;
                                    dotted_line_leader_user_ids?: Array<string>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users/batch`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=batch_get_id&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch_get_id document }
             *
             * 通过手机号或邮箱获取用户 ID
             *
             * 通过该接口，可使用手机号/邮箱获取用户的 ID 信息，具体获取支持的 ID 类型包括 open_id、user_id、union_id，可通过查询参数指定。
             *
             * 如果查询的手机号、邮箱不存在，或者无权限查看对应的用户，则返回的用户ID列表为空。
             */
            batchGetId: async (
                payload?: {
                    data?: {
                        emails?: Array<string>;
                        mobiles?: Array<string>;
                        include_resigned?: boolean;
                    };
                    params?: {
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
                                user_list?: Array<{
                                    user_id?: string;
                                    mobile?: string;
                                    email?: string;
                                    status?: {
                                        is_frozen?: boolean;
                                        is_resigned?: boolean;
                                        is_activated?: boolean;
                                        is_exited?: boolean;
                                        is_unjoin?: boolean;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users/batch_get_id`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/create document }
             *
             * 创建用户
             *
             * 使用该接口向通讯录创建一个用户，可以理解为员工入职。创建用户后只返回有数据权限的数据。具体的数据权限的与字段的对应关系请参照[应用权限](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)。
             *
             * - 新增用户的所有部门必须都在当前应用的通讯录授权范围内才允许新增用户，如果想要在根部门下新增用户，必须要有全员权限。;- 应用商店应用无权限调用此接口。;- 创建用户后，会给用户发送邀请短信/邮件，用户在操作同意后才可访问团队。;- 返回数据中不返回手机号，如果需要请重新查询用户信息获取手机号。
             */
            create: async (
                payload?: {
                    data: {
                        user_id?: string;
                        name: string;
                        en_name?: string;
                        nickname?: string;
                        email?: string;
                        mobile: string;
                        mobile_visible?: boolean;
                        gender?: number;
                        avatar_key?: string;
                        department_ids: Array<string>;
                        leader_user_id?: string;
                        city?: string;
                        country?: string;
                        work_station?: string;
                        join_time?: number;
                        employee_no?: string;
                        employee_type: number;
                        positions?: Array<{
                            position_code?: string;
                            position_name?: string;
                            department_id?: string;
                            leader_user_id?: string;
                            leader_position_code?: string;
                            is_major?: boolean;
                        }>;
                        orders?: Array<{
                            department_id?: string;
                            user_order?: number;
                            department_order?: number;
                            is_primary_dept?: boolean;
                        }>;
                        custom_attrs?: Array<{
                            type?: string;
                            id?: string;
                            value?: {
                                text?: string;
                                url?: string;
                                pc_url?: string;
                                option_id?: string;
                                generic_user?: { id: string; type: number };
                            };
                        }>;
                        enterprise_email?: string;
                        idp_type?: string;
                        description?: string;
                        job_title?: string;
                        need_send_notification?: boolean;
                        notification_option?: {
                            channels?: Array<string>;
                            language?: "zh-CN" | "en-US" | "ja-JP";
                        };
                        geo?: string;
                        job_level_id?: string;
                        job_family_id?: string;
                        subscription_ids?: Array<string>;
                        department_path?: Array<{
                            department_id?: string;
                            department_name?: {
                                name?: string;
                                i18n_name?: {
                                    zh_cn?: string;
                                    ja_jp?: string;
                                    en_us?: string;
                                };
                            };
                            department_path?: {
                                department_ids?: Array<string>;
                                department_path_name?: {
                                    name?: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                };
                            };
                        }>;
                        dotted_line_leader_user_ids?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        client_token?: string;
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
                                user?: {
                                    union_id?: string;
                                    user_id?: string;
                                    open_id?: string;
                                    name: string;
                                    en_name?: string;
                                    nickname?: string;
                                    email?: string;
                                    mobile: string;
                                    mobile_visible?: boolean;
                                    gender?: number;
                                    avatar_key?: string;
                                    avatar?: {
                                        avatar_72?: string;
                                        avatar_240?: string;
                                        avatar_640?: string;
                                        avatar_origin?: string;
                                    };
                                    status?: {
                                        is_frozen?: boolean;
                                        is_resigned?: boolean;
                                        is_activated?: boolean;
                                        is_exited?: boolean;
                                        is_unjoin?: boolean;
                                    };
                                    department_ids?: Array<string>;
                                    leader_user_id?: string;
                                    city?: string;
                                    country?: string;
                                    work_station?: string;
                                    join_time?: number;
                                    is_tenant_manager?: boolean;
                                    employee_no?: string;
                                    employee_type?: number;
                                    positions?: Array<{
                                        position_code?: string;
                                        position_name?: string;
                                        department_id?: string;
                                        leader_user_id?: string;
                                        leader_position_code?: string;
                                        is_major?: boolean;
                                    }>;
                                    orders?: Array<{
                                        department_id?: string;
                                        user_order?: number;
                                        department_order?: number;
                                        is_primary_dept?: boolean;
                                    }>;
                                    custom_attrs?: Array<{
                                        type?: string;
                                        id?: string;
                                        value?: {
                                            text?: string;
                                            url?: string;
                                            pc_url?: string;
                                            option_id?: string;
                                            option_value?: string;
                                            name?: string;
                                            picture_url?: string;
                                            generic_user?: {
                                                id: string;
                                                type: number;
                                            };
                                        };
                                    }>;
                                    enterprise_email?: string;
                                    idp_type?: string;
                                    time_zone?: string;
                                    description?: string;
                                    job_title?: string;
                                    need_send_notification?: boolean;
                                    notification_option?: {
                                        channels?: Array<string>;
                                        language?: "zh-CN" | "en-US" | "ja-JP";
                                    };
                                    is_frozen?: boolean;
                                    geo?: string;
                                    job_level_id?: string;
                                    job_family_id?: string;
                                    department_path?: Array<{
                                        department_id?: string;
                                        department_name?: {
                                            name?: string;
                                            i18n_name?: {
                                                zh_cn?: string;
                                                ja_jp?: string;
                                                en_us?: string;
                                            };
                                        };
                                        department_path?: {
                                            department_ids?: Array<string>;
                                            department_path_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                    }>;
                                    dotted_line_leader_user_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/delete document }
             *
             * 删除用户
             *
             * 该接口用于从通讯录删除一个用户信息，可以理解为员工离职。
             *
             * - 若用户归属部门A、部门B，应用的通讯录权限范围必须包括部门A和部门B才可以删除用户。;- 用户可以在删除员工时设置删除员工数据（如文档）的接收者，如果不设置则由其leader接收，如果该员工没有leader，则会将该员工的数据删除。
             */
            delete: async (
                payload?: {
                    data?: {
                        department_chat_acceptor_user_id?: string;
                        external_chat_acceptor_user_id?: string;
                        docs_acceptor_user_id?: string;
                        calendar_acceptor_user_id?: string;
                        application_acceptor_user_id?: string;
                        minutes_acceptor_user_id?: string;
                        survey_acceptor_user_id?: string;
                        email_acceptor?: {
                            processing_type: "1" | "2" | "3";
                            acceptor_user_id?: string;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { user_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users/:user_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            findByDepartmentWithIterator: async (
                payload?: {
                    params: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        department_id: string;
                        page_size?: number;
                        page_token?: string;
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
                                `${this.domain}/open-apis/contact/v3/users/find_by_department`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    union_id?: string;
                                                    user_id?: string;
                                                    open_id?: string;
                                                    name: string;
                                                    en_name?: string;
                                                    nickname?: string;
                                                    email?: string;
                                                    mobile: string;
                                                    mobile_visible?: boolean;
                                                    gender?: number;
                                                    avatar_key?: string;
                                                    avatar?: {
                                                        avatar_72?: string;
                                                        avatar_240?: string;
                                                        avatar_640?: string;
                                                        avatar_origin?: string;
                                                    };
                                                    status?: {
                                                        is_frozen?: boolean;
                                                        is_resigned?: boolean;
                                                        is_activated?: boolean;
                                                        is_exited?: boolean;
                                                        is_unjoin?: boolean;
                                                    };
                                                    department_ids?: Array<string>;
                                                    leader_user_id?: string;
                                                    city?: string;
                                                    country?: string;
                                                    work_station?: string;
                                                    join_time?: number;
                                                    is_tenant_manager?: boolean;
                                                    employee_no?: string;
                                                    employee_type?: number;
                                                    positions?: Array<{
                                                        position_code?: string;
                                                        position_name?: string;
                                                        department_id?: string;
                                                        leader_user_id?: string;
                                                        leader_position_code?: string;
                                                        is_major?: boolean;
                                                    }>;
                                                    orders?: Array<{
                                                        department_id?: string;
                                                        user_order?: number;
                                                        department_order?: number;
                                                        is_primary_dept?: boolean;
                                                    }>;
                                                    custom_attrs?: Array<{
                                                        type?: string;
                                                        id?: string;
                                                        value?: {
                                                            text?: string;
                                                            url?: string;
                                                            pc_url?: string;
                                                            option_id?: string;
                                                            option_value?: string;
                                                            name?: string;
                                                            picture_url?: string;
                                                            generic_user?: {
                                                                id: string;
                                                                type: number;
                                                            };
                                                        };
                                                    }>;
                                                    enterprise_email?: string;
                                                    idp_type?: string;
                                                    time_zone?: string;
                                                    description?: string;
                                                    job_title?: string;
                                                    need_send_notification?: boolean;
                                                    notification_option?: {
                                                        channels?: Array<string>;
                                                        language?:
                                                            | "zh-CN"
                                                            | "en-US"
                                                            | "ja-JP";
                                                    };
                                                    is_frozen?: boolean;
                                                    geo?: string;
                                                    job_level_id?: string;
                                                    job_family_id?: string;
                                                    department_path?: Array<{
                                                        department_id?: string;
                                                        department_name?: {
                                                            name?: string;
                                                            i18n_name?: {
                                                                zh_cn?: string;
                                                                ja_jp?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        department_path?: {
                                                            department_ids?: Array<string>;
                                                            department_path_name?: {
                                                                name?: string;
                                                                i18n_name?: {
                                                                    zh_cn?: string;
                                                                    ja_jp?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                        };
                                                    }>;
                                                    dotted_line_leader_user_ids?: Array<string>;
                                                }>;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=find_by_department&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/find_by_department document }
             *
             * 获取部门直属用户列表
             *
             * 基于部门ID获取部门直属用户列表。
             *
             * - 部门ID 必填，根部门的部门ID为0。;- 使用 `user_access_token` 情况下根据个人组织架构的通讯录可见范围进行权限过滤，返回个人组织架构通讯录范围（[登录企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内可见的用户数据。;- 使用`tenant_access_token`会根据应用通讯录的范围进行权限过滤。 如果请求的部门ID为0，则校验应用是否具有全员通讯录权限； 如果是非0的部门ID，则会验证应用是否具有该部门的通讯录权限。 无权限返回无权限错误码，有权限则返回对应部门下的直接用户列表。
             */
            findByDepartment: async (
                payload?: {
                    params: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        department_id: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    union_id?: string;
                                    user_id?: string;
                                    open_id?: string;
                                    name: string;
                                    en_name?: string;
                                    nickname?: string;
                                    email?: string;
                                    mobile: string;
                                    mobile_visible?: boolean;
                                    gender?: number;
                                    avatar_key?: string;
                                    avatar?: {
                                        avatar_72?: string;
                                        avatar_240?: string;
                                        avatar_640?: string;
                                        avatar_origin?: string;
                                    };
                                    status?: {
                                        is_frozen?: boolean;
                                        is_resigned?: boolean;
                                        is_activated?: boolean;
                                        is_exited?: boolean;
                                        is_unjoin?: boolean;
                                    };
                                    department_ids?: Array<string>;
                                    leader_user_id?: string;
                                    city?: string;
                                    country?: string;
                                    work_station?: string;
                                    join_time?: number;
                                    is_tenant_manager?: boolean;
                                    employee_no?: string;
                                    employee_type?: number;
                                    positions?: Array<{
                                        position_code?: string;
                                        position_name?: string;
                                        department_id?: string;
                                        leader_user_id?: string;
                                        leader_position_code?: string;
                                        is_major?: boolean;
                                    }>;
                                    orders?: Array<{
                                        department_id?: string;
                                        user_order?: number;
                                        department_order?: number;
                                        is_primary_dept?: boolean;
                                    }>;
                                    custom_attrs?: Array<{
                                        type?: string;
                                        id?: string;
                                        value?: {
                                            text?: string;
                                            url?: string;
                                            pc_url?: string;
                                            option_id?: string;
                                            option_value?: string;
                                            name?: string;
                                            picture_url?: string;
                                            generic_user?: {
                                                id: string;
                                                type: number;
                                            };
                                        };
                                    }>;
                                    enterprise_email?: string;
                                    idp_type?: string;
                                    time_zone?: string;
                                    description?: string;
                                    job_title?: string;
                                    need_send_notification?: boolean;
                                    notification_option?: {
                                        channels?: Array<string>;
                                        language?: "zh-CN" | "en-US" | "ja-JP";
                                    };
                                    is_frozen?: boolean;
                                    geo?: string;
                                    job_level_id?: string;
                                    job_family_id?: string;
                                    department_path?: Array<{
                                        department_id?: string;
                                        department_name?: {
                                            name?: string;
                                            i18n_name?: {
                                                zh_cn?: string;
                                                ja_jp?: string;
                                                en_us?: string;
                                            };
                                        };
                                        department_path?: {
                                            department_ids?: Array<string>;
                                            department_path_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                    }>;
                                    dotted_line_leader_user_ids?: Array<string>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users/find_by_department`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get document }
             *
             * 获取单个用户信息
             *
             * 该接口用于获取通讯录中单个用户的信息。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                user?: {
                                    union_id?: string;
                                    user_id?: string;
                                    open_id?: string;
                                    name?: string;
                                    en_name?: string;
                                    nickname?: string;
                                    email?: string;
                                    mobile?: string;
                                    mobile_visible?: boolean;
                                    gender?: number;
                                    avatar?: {
                                        avatar_72?: string;
                                        avatar_240?: string;
                                        avatar_640?: string;
                                        avatar_origin?: string;
                                    };
                                    status?: {
                                        is_frozen?: boolean;
                                        is_resigned?: boolean;
                                        is_activated?: boolean;
                                        is_exited?: boolean;
                                        is_unjoin?: boolean;
                                    };
                                    department_ids?: Array<string>;
                                    leader_user_id?: string;
                                    city?: string;
                                    country?: string;
                                    work_station?: string;
                                    join_time?: number;
                                    is_tenant_manager?: boolean;
                                    employee_no?: string;
                                    employee_type?: number;
                                    positions?: Array<{
                                        position_code?: string;
                                        position_name?: string;
                                        department_id?: string;
                                        leader_user_id?: string;
                                        leader_position_code?: string;
                                        is_major?: boolean;
                                    }>;
                                    orders?: Array<{
                                        department_id?: string;
                                        user_order?: number;
                                        department_order?: number;
                                        is_primary_dept?: boolean;
                                    }>;
                                    custom_attrs?: Array<{
                                        type?: string;
                                        id?: string;
                                        value?: {
                                            text?: string;
                                            url?: string;
                                            pc_url?: string;
                                            option_value?: string;
                                            name?: string;
                                            picture_url?: string;
                                            generic_user?: {
                                                id: string;
                                                type: number;
                                            };
                                        };
                                    }>;
                                    enterprise_email?: string;
                                    time_zone?: string;
                                    description?: string;
                                    job_title?: string;
                                    geo?: string;
                                    job_level_id?: string;
                                    job_family_id?: string;
                                    assign_info?: Array<{
                                        subscription_id?: string;
                                        license_plan_key?: string;
                                        product_name?: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        start_time?: string;
                                        end_time?: string;
                                    }>;
                                    department_path?: Array<{
                                        department_id?: string;
                                        department_name?: {
                                            name?: string;
                                            i18n_name?: {
                                                zh_cn?: string;
                                                ja_jp?: string;
                                                en_us?: string;
                                            };
                                        };
                                        department_path?: {
                                            department_ids?: Array<string>;
                                            department_path_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                    }>;
                                    dotted_line_leader_user_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users/:user_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
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
                        department_id?: string;
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
                                `${this.domain}/open-apis/contact/v3/users`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    union_id?: string;
                                                    user_id?: string;
                                                    open_id?: string;
                                                    name: string;
                                                    en_name?: string;
                                                    nickname?: string;
                                                    email?: string;
                                                    mobile: string;
                                                    mobile_visible?: boolean;
                                                    gender?: number;
                                                    avatar?: {
                                                        avatar_72?: string;
                                                        avatar_240?: string;
                                                        avatar_640?: string;
                                                        avatar_origin?: string;
                                                    };
                                                    status?: {
                                                        is_frozen?: boolean;
                                                        is_resigned?: boolean;
                                                        is_activated?: boolean;
                                                        is_exited?: boolean;
                                                        is_unjoin?: boolean;
                                                    };
                                                    department_ids?: Array<string>;
                                                    leader_user_id?: string;
                                                    city?: string;
                                                    country?: string;
                                                    work_station?: string;
                                                    join_time?: number;
                                                    is_tenant_manager?: boolean;
                                                    employee_no?: string;
                                                    employee_type?: number;
                                                    positions?: Array<{
                                                        position_code?: string;
                                                        position_name?: string;
                                                        department_id?: string;
                                                        leader_user_id?: string;
                                                        leader_position_code?: string;
                                                        is_major?: boolean;
                                                    }>;
                                                    orders?: Array<{
                                                        department_id?: string;
                                                        user_order?: number;
                                                        department_order?: number;
                                                        is_primary_dept?: boolean;
                                                    }>;
                                                    custom_attrs?: Array<{
                                                        type?: string;
                                                        id?: string;
                                                        value?: {
                                                            text?: string;
                                                            url?: string;
                                                            pc_url?: string;
                                                            option_value?: string;
                                                            name?: string;
                                                            picture_url?: string;
                                                            generic_user?: {
                                                                id: string;
                                                                type: number;
                                                            };
                                                        };
                                                    }>;
                                                    enterprise_email?: string;
                                                    time_zone?: string;
                                                    description?: string;
                                                    job_title?: string;
                                                    geo?: string;
                                                    job_level_id?: string;
                                                    job_family_id?: string;
                                                    assign_info?: Array<{
                                                        subscription_id?: string;
                                                        license_plan_key?: string;
                                                        product_name?: string;
                                                        i18n_name?: {
                                                            zh_cn?: string;
                                                            ja_jp?: string;
                                                            en_us?: string;
                                                        };
                                                        start_time?: string;
                                                        end_time?: string;
                                                    }>;
                                                    department_path?: Array<{
                                                        department_id?: string;
                                                        department_name?: {
                                                            name?: string;
                                                            i18n_name?: {
                                                                zh_cn?: string;
                                                                ja_jp?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        department_path?: {
                                                            department_ids?: Array<string>;
                                                            department_path_name?: {
                                                                name?: string;
                                                                i18n_name?: {
                                                                    zh_cn?: string;
                                                                    ja_jp?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                        };
                                                    }>;
                                                    dotted_line_leader_user_ids?: Array<string>;
                                                }>;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=user&version=v3 document }
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        department_id?: string;
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
                                    union_id?: string;
                                    user_id?: string;
                                    open_id?: string;
                                    name: string;
                                    en_name?: string;
                                    nickname?: string;
                                    email?: string;
                                    mobile: string;
                                    mobile_visible?: boolean;
                                    gender?: number;
                                    avatar?: {
                                        avatar_72?: string;
                                        avatar_240?: string;
                                        avatar_640?: string;
                                        avatar_origin?: string;
                                    };
                                    status?: {
                                        is_frozen?: boolean;
                                        is_resigned?: boolean;
                                        is_activated?: boolean;
                                        is_exited?: boolean;
                                        is_unjoin?: boolean;
                                    };
                                    department_ids?: Array<string>;
                                    leader_user_id?: string;
                                    city?: string;
                                    country?: string;
                                    work_station?: string;
                                    join_time?: number;
                                    is_tenant_manager?: boolean;
                                    employee_no?: string;
                                    employee_type?: number;
                                    positions?: Array<{
                                        position_code?: string;
                                        position_name?: string;
                                        department_id?: string;
                                        leader_user_id?: string;
                                        leader_position_code?: string;
                                        is_major?: boolean;
                                    }>;
                                    orders?: Array<{
                                        department_id?: string;
                                        user_order?: number;
                                        department_order?: number;
                                        is_primary_dept?: boolean;
                                    }>;
                                    custom_attrs?: Array<{
                                        type?: string;
                                        id?: string;
                                        value?: {
                                            text?: string;
                                            url?: string;
                                            pc_url?: string;
                                            option_value?: string;
                                            name?: string;
                                            picture_url?: string;
                                            generic_user?: {
                                                id: string;
                                                type: number;
                                            };
                                        };
                                    }>;
                                    enterprise_email?: string;
                                    time_zone?: string;
                                    description?: string;
                                    job_title?: string;
                                    geo?: string;
                                    job_level_id?: string;
                                    job_family_id?: string;
                                    assign_info?: Array<{
                                        subscription_id?: string;
                                        license_plan_key?: string;
                                        product_name?: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        start_time?: string;
                                        end_time?: string;
                                    }>;
                                    department_path?: Array<{
                                        department_id?: string;
                                        department_name?: {
                                            name?: string;
                                            i18n_name?: {
                                                zh_cn?: string;
                                                ja_jp?: string;
                                                en_us?: string;
                                            };
                                        };
                                        department_path?: {
                                            department_ids?: Array<string>;
                                            department_path_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                    }>;
                                    dotted_line_leader_user_ids?: Array<string>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/patch document }
             *
             * 修改用户部分信息
             *
             * 该接口用于更新通讯录中用户的字段，未传递的参数不会更新。
             */
            patch: async (
                payload?: {
                    data?: {
                        name?: string;
                        en_name?: string;
                        nickname?: string;
                        email?: string;
                        mobile?: string;
                        mobile_visible?: boolean;
                        gender?: number;
                        avatar_key?: string;
                        department_ids?: Array<string>;
                        leader_user_id?: string;
                        city?: string;
                        country?: string;
                        work_station?: string;
                        join_time?: number;
                        employee_no?: string;
                        employee_type?: number;
                        positions?: Array<{
                            position_code?: string;
                            position_name?: string;
                            department_id?: string;
                            leader_user_id?: string;
                            leader_position_code?: string;
                            is_major?: boolean;
                        }>;
                        orders?: Array<{
                            department_id?: string;
                            user_order?: number;
                            department_order?: number;
                            is_primary_dept?: boolean;
                        }>;
                        custom_attrs?: Array<{
                            type?: string;
                            id?: string;
                            value?: {
                                text?: string;
                                url?: string;
                                pc_url?: string;
                                option_id?: string;
                                generic_user?: { id: string; type: number };
                            };
                        }>;
                        enterprise_email?: string;
                        idp_type?: string;
                        description?: string;
                        job_title?: string;
                        is_frozen?: boolean;
                        geo?: string;
                        job_level_id?: string;
                        job_family_id?: string;
                        subscription_ids?: Array<string>;
                        department_path?: Array<{
                            department_id?: string;
                            department_name?: {
                                name?: string;
                                i18n_name?: {
                                    zh_cn?: string;
                                    ja_jp?: string;
                                    en_us?: string;
                                };
                            };
                            department_path?: {
                                department_ids?: Array<string>;
                                department_path_name?: {
                                    name?: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                };
                            };
                        }>;
                        dotted_line_leader_user_ids?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                user?: {
                                    union_id?: string;
                                    user_id?: string;
                                    open_id?: string;
                                    name: string;
                                    en_name?: string;
                                    nickname?: string;
                                    email?: string;
                                    mobile: string;
                                    mobile_visible?: boolean;
                                    gender?: number;
                                    avatar_key?: string;
                                    avatar?: {
                                        avatar_72?: string;
                                        avatar_240?: string;
                                        avatar_640?: string;
                                        avatar_origin?: string;
                                    };
                                    status?: {
                                        is_frozen?: boolean;
                                        is_resigned?: boolean;
                                        is_activated?: boolean;
                                        is_exited?: boolean;
                                        is_unjoin?: boolean;
                                    };
                                    department_ids?: Array<string>;
                                    leader_user_id?: string;
                                    city?: string;
                                    country?: string;
                                    work_station?: string;
                                    join_time?: number;
                                    is_tenant_manager?: boolean;
                                    employee_no?: string;
                                    employee_type?: number;
                                    positions?: Array<{
                                        position_code?: string;
                                        position_name?: string;
                                        department_id?: string;
                                        leader_user_id?: string;
                                        leader_position_code?: string;
                                        is_major?: boolean;
                                    }>;
                                    orders?: Array<{
                                        department_id?: string;
                                        user_order?: number;
                                        department_order?: number;
                                        is_primary_dept?: boolean;
                                    }>;
                                    custom_attrs?: Array<{
                                        type?: string;
                                        id?: string;
                                        value?: {
                                            text?: string;
                                            url?: string;
                                            pc_url?: string;
                                            option_id?: string;
                                            option_value?: string;
                                            name?: string;
                                            picture_url?: string;
                                            generic_user?: {
                                                id: string;
                                                type: number;
                                            };
                                        };
                                    }>;
                                    enterprise_email?: string;
                                    idp_type?: string;
                                    time_zone?: string;
                                    description?: string;
                                    job_title?: string;
                                    need_send_notification?: boolean;
                                    notification_option?: {
                                        channels?: Array<string>;
                                        language?: "zh-CN" | "en-US" | "ja-JP";
                                    };
                                    is_frozen?: boolean;
                                    geo?: string;
                                    job_level_id?: string;
                                    job_family_id?: string;
                                    department_path?: Array<{
                                        department_id?: string;
                                        department_name?: {
                                            name?: string;
                                            i18n_name?: {
                                                zh_cn?: string;
                                                ja_jp?: string;
                                                en_us?: string;
                                            };
                                        };
                                        department_path?: {
                                            department_ids?: Array<string>;
                                            department_path_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                    }>;
                                    dotted_line_leader_user_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users/:user_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=resurrect&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/resurrect document }
             *
             * 恢复已删除用户
             *
             * 该接口用于恢复已删除用户（已离职的成员），仅自建应用可申请，应用商店应用无权调用接口。
             *
             * - 仅支持恢复离职 30 天内的成员。恢复后，部分用户数据仍不可恢复，请谨慎调用。;- 待恢复成员的用户 ID 不能被企业内其他成员使用。如有重复，请先离职对应的成员，否则接口会报错。;- 待恢复成员的手机号和邮箱不能被企业内其他成员使用。如有重复，请先修改对应成员的信息，否则接口会报错。
             */
            resurrect: async (
                payload?: {
                    data?: {
                        departments?: Array<{
                            department_id: string;
                            user_order?: number;
                            department_order?: number;
                        }>;
                        subscription_ids?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { user_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users/:user_id/resurrect`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/update document }
             *
             * 更新用户所有信息
             *
             * 该接口用于更新通讯录中用户的字段。
             *
             * 应用需要拥有待更新用户的通讯录授权，如果涉及到用户部门变更，还需要同时拥有变更前、后所有新部门的通讯录授权。
             */
            update: async (
                payload?: {
                    data: {
                        name: string;
                        en_name?: string;
                        nickname?: string;
                        email?: string;
                        mobile: string;
                        mobile_visible?: boolean;
                        gender?: number;
                        avatar_key?: string;
                        department_ids: Array<string>;
                        leader_user_id?: string;
                        city?: string;
                        country?: string;
                        work_station?: string;
                        join_time?: number;
                        employee_no?: string;
                        employee_type: number;
                        positions?: Array<{
                            position_code?: string;
                            position_name?: string;
                            department_id?: string;
                            leader_user_id?: string;
                            leader_position_code?: string;
                            is_major?: boolean;
                        }>;
                        orders?: Array<{
                            department_id?: string;
                            user_order?: number;
                            department_order?: number;
                            is_primary_dept?: boolean;
                        }>;
                        custom_attrs?: Array<{
                            type?: string;
                            id?: string;
                            value?: {
                                text?: string;
                                url?: string;
                                pc_url?: string;
                                option_id?: string;
                                generic_user?: { id: string; type: number };
                            };
                        }>;
                        enterprise_email?: string;
                        idp_type?: string;
                        description?: string;
                        job_title?: string;
                        is_frozen?: boolean;
                        geo?: string;
                        department_path?: Array<{
                            department_id?: string;
                            department_name?: {
                                name?: string;
                                i18n_name?: {
                                    zh_cn?: string;
                                    ja_jp?: string;
                                    en_us?: string;
                                };
                            };
                            department_path?: {
                                department_ids?: Array<string>;
                                department_path_name?: {
                                    name?: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                };
                            };
                        }>;
                        dotted_line_leader_user_ids?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                user?: {
                                    union_id?: string;
                                    user_id?: string;
                                    open_id?: string;
                                    name: string;
                                    en_name?: string;
                                    nickname?: string;
                                    email?: string;
                                    mobile: string;
                                    mobile_visible?: boolean;
                                    gender?: number;
                                    avatar_key?: string;
                                    avatar?: {
                                        avatar_72?: string;
                                        avatar_240?: string;
                                        avatar_640?: string;
                                        avatar_origin?: string;
                                    };
                                    status?: {
                                        is_frozen?: boolean;
                                        is_resigned?: boolean;
                                        is_activated?: boolean;
                                        is_exited?: boolean;
                                        is_unjoin?: boolean;
                                    };
                                    department_ids?: Array<string>;
                                    leader_user_id?: string;
                                    city?: string;
                                    country?: string;
                                    work_station?: string;
                                    join_time?: number;
                                    is_tenant_manager?: boolean;
                                    employee_no?: string;
                                    employee_type?: number;
                                    positions?: Array<{
                                        position_code?: string;
                                        position_name?: string;
                                        department_id?: string;
                                        leader_user_id?: string;
                                        leader_position_code?: string;
                                        is_major?: boolean;
                                    }>;
                                    orders?: Array<{
                                        department_id?: string;
                                        user_order?: number;
                                        department_order?: number;
                                        is_primary_dept?: boolean;
                                    }>;
                                    custom_attrs?: Array<{
                                        type?: string;
                                        id?: string;
                                        value?: {
                                            text?: string;
                                            url?: string;
                                            pc_url?: string;
                                            option_id?: string;
                                            option_value?: string;
                                            name?: string;
                                            picture_url?: string;
                                            generic_user?: {
                                                id: string;
                                                type: number;
                                            };
                                        };
                                    }>;
                                    enterprise_email?: string;
                                    idp_type?: string;
                                    time_zone?: string;
                                    description?: string;
                                    job_title?: string;
                                    need_send_notification?: boolean;
                                    notification_option?: {
                                        channels?: Array<string>;
                                        language?: "zh-CN" | "en-US" | "ja-JP";
                                    };
                                    is_frozen?: boolean;
                                    geo?: string;
                                    department_path?: Array<{
                                        department_id?: string;
                                        department_name?: {
                                            name?: string;
                                            i18n_name?: {
                                                zh_cn?: string;
                                                ja_jp?: string;
                                                en_us?: string;
                                            };
                                        };
                                        department_path?: {
                                            department_ids?: Array<string>;
                                            department_path_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                    }>;
                                    dotted_line_leader_user_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users/:user_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=update_user_id&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_user_id&project=contact&resource=user&version=v3 document }
             */
            updateUserId: async (
                payload?: {
                    data: { new_user_id: string };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { user_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users/:user_id/update_user_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * work_city
         */
        workCity: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=work_city&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=work_city&version=v3 document }
             */
            get: async (
                payload?: {
                    path?: { work_city_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                work_city?: {
                                    work_city_id?: string;
                                    name?: string;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    status?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/work_cities/:work_city_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
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
                                `${this.domain}/open-apis/contact/v3/work_cities`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    work_city_id?: string;
                                                    name?: string;
                                                    i18n_name?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                    }>;
                                                    status?: boolean;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=work_city&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=work_city&version=v3 document }
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
                                    work_city_id?: string;
                                    name?: string;
                                    i18n_name?: Array<{
                                        locale?: string;
                                        value?: string;
                                    }>;
                                    status?: boolean;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/work_cities`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        v3: {
            /**
             * 自定义用户字段
             */
            customAttr: {
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
                                    `${this.domain}/open-apis/contact/v3/custom_attrs`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        id: string;
                                                        type: string;
                                                        options?: {
                                                            default_option_id?: string;
                                                            option_type:
                                                                | "TEXT"
                                                                | "PICTURE";
                                                            options: Array<{
                                                                id: string;
                                                                value: string;
                                                                name?: string;
                                                            }>;
                                                        };
                                                        i18n_name?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=custom_attr&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/custom_attr/list document }
                 *
                 * 获取企业自定义用户字段
                 *
                 * 获取企业自定义的用户字段配置信息
                 *
                 * 调用该接口前，需要先确认[企业管理员](https://www.feishu.cn/hc/zh-CN/articles/360049067822)在[企业管理后台 - 组织架构 - 成员字段管理](http://www.feishu.cn/admin/contacts/employee-field-new/custom) 自定义字段管理栏开启了“允许开放平台API调用“。;;![通讯录.gif](//sf3-cn.feishucdn.com/obj/open-platform-opendoc/544738c94f13ef0b9ebaff53a5133cc7_E9EGMkXyzX.gif)
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
                                        id: string;
                                        type: string;
                                        options?: {
                                            default_option_id?: string;
                                            option_type: "TEXT" | "PICTURE";
                                            options: Array<{
                                                id: string;
                                                value: string;
                                                name?: string;
                                            }>;
                                        };
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/custom_attrs`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 部门
             */
            department: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=batch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch&project=contact&resource=department&version=v3 document }
                 */
                batch: async (
                    payload?: {
                        params: {
                            department_ids: number;
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
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
                                        name: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        leader_user_id?: string;
                                        chat_id?: string;
                                        order?: string;
                                        unit_ids?: Array<string>;
                                        member_count?: number;
                                        status?: { is_deleted?: boolean };
                                        create_group_chat?: boolean;
                                        leaders?: Array<{
                                            leaderType: number;
                                            leaderID: string;
                                        }>;
                                        group_chat_employee_types?: Array<number>;
                                        department_hrbps?: Array<string>;
                                        primary_member_count?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/departments/batch`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                childrenWithIterator: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            fetch_child?: boolean;
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { department_id: string };
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
                                    `${this.domain}/open-apis/contact/v3/departments/:department_id/children`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        name: string;
                                                        i18n_name?: {
                                                            zh_cn?: string;
                                                            ja_jp?: string;
                                                            en_us?: string;
                                                        };
                                                        parent_department_id: string;
                                                        department_id?: string;
                                                        open_department_id?: string;
                                                        leader_user_id?: string;
                                                        chat_id?: string;
                                                        order?: string;
                                                        unit_ids?: Array<string>;
                                                        member_count?: number;
                                                        status?: {
                                                            is_deleted?: boolean;
                                                        };
                                                        create_group_chat?: boolean;
                                                        leaders?: Array<{
                                                            leaderType: number;
                                                            leaderID: string;
                                                        }>;
                                                        group_chat_employee_types?: Array<number>;
                                                        department_hrbps?: Array<string>;
                                                        primary_member_count?: number;
                                                    }>;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=children&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/children document }
                 *
                 * 获取子部门列表
                 *
                 * 通过部门ID获取部门的子部门列表。
                 *
                 * - 部门ID 必填，根部门的部门ID 为0。;- 使用 `user_access_token` 时，返回该用户组织架构可见性范围（[登陆企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内的所有可见部门。当进行递归查询时，最多1000个部门对该用户可见。;;- 使用 ;`tenant_access_token` 则基于应用的通讯录权限范围进行权限校验与过滤。;如果部门ID为0，会检验应用是否有全员通讯录权限，如果是非0 部门ID，则会校验应用是否有该部门的通讯录权限。无部门权限返回无部门通讯录权限错误码，有权限则返回部门下子部门列表（根据fetch_child决定是否递归）。
                 */
                children: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            fetch_child?: boolean;
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { department_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        name: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        leader_user_id?: string;
                                        chat_id?: string;
                                        order?: string;
                                        unit_ids?: Array<string>;
                                        member_count?: number;
                                        status?: { is_deleted?: boolean };
                                        create_group_chat?: boolean;
                                        leaders?: Array<{
                                            leaderType: number;
                                            leaderID: string;
                                        }>;
                                        group_chat_employee_types?: Array<number>;
                                        department_hrbps?: Array<string>;
                                        primary_member_count?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/departments/:department_id/children`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/create document }
                 *
                 * 创建部门
                 *
                 * 该接口用于向通讯录中创建部门。
                 *
                 * 只可在应用的通讯录权限范围内的部门下创建部门。若需要在根部门下创建子部门，则应用通讯录权限范围需要设置为“全部成员”。应用商店应用无权限调用此接口。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            i18n_name?: {
                                zh_cn?: string;
                                ja_jp?: string;
                                en_us?: string;
                            };
                            parent_department_id: string;
                            department_id?: string;
                            leader_user_id?: string;
                            order?: string;
                            unit_ids?: Array<string>;
                            create_group_chat?: boolean;
                            leaders?: Array<{
                                leaderType: number;
                                leaderID: string;
                            }>;
                            group_chat_employee_types?: Array<number>;
                            department_hrbps?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            client_token?: string;
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
                                    department?: {
                                        name: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        leader_user_id?: string;
                                        chat_id?: string;
                                        order?: string;
                                        unit_ids?: Array<string>;
                                        member_count?: number;
                                        status?: { is_deleted?: boolean };
                                        leaders?: Array<{
                                            leaderType: number;
                                            leaderID: string;
                                        }>;
                                        group_chat_employee_types?: Array<number>;
                                        department_hrbps?: Array<string>;
                                        primary_member_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/departments`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/delete document }
                 *
                 * 删除部门
                 *
                 * 该接口用于从通讯录中删除部门。
                 *
                 * 应用需要同时拥有待删除部门及其父部门的通讯录授权。
                 */
                delete: async (
                    payload?: {
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { department_id?: string };
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
                                `${this.domain}/open-apis/contact/v3/departments/:department_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/get document }
                 *
                 * 获取单个部门信息
                 *
                 * 该接口用于向通讯录获取单个部门信息。
                 *
                 * - 使用`tenant_access_token`时，应用需要拥有待查询部门的通讯录授权。如果需要获取根部门信息，则需要拥有全员权限。;- 使用`user_access_token`时，用户需要有待查询部门的可见性，如果需要获取根部门信息，则要求员工可见所有人。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { department_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    department?: {
                                        name: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        leader_user_id?: string;
                                        chat_id?: string;
                                        order?: string;
                                        unit_ids?: Array<string>;
                                        member_count?: number;
                                        status?: { is_deleted?: boolean };
                                        leaders?: Array<{
                                            leaderType: number;
                                            leaderID: string;
                                        }>;
                                        group_chat_employee_types?: Array<number>;
                                        department_hrbps?: Array<string>;
                                        primary_member_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/departments/:department_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
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
                            parent_department_id?: string;
                            fetch_child?: boolean;
                            page_size?: number;
                            page_token?: string;
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
                                    `${this.domain}/open-apis/contact/v3/departments`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        name: string;
                                                        i18n_name?: {
                                                            zh_cn?: string;
                                                            ja_jp?: string;
                                                            en_us?: string;
                                                        };
                                                        parent_department_id: string;
                                                        department_id?: string;
                                                        open_department_id?: string;
                                                        leader_user_id?: string;
                                                        chat_id?: string;
                                                        order?: string;
                                                        unit_ids?: Array<string>;
                                                        member_count?: number;
                                                        status?: {
                                                            is_deleted?: boolean;
                                                        };
                                                        leaders?: Array<{
                                                            leaderType: number;
                                                            leaderID: string;
                                                        }>;
                                                        group_chat_employee_types?: Array<number>;
                                                        department_hrbps?: Array<string>;
                                                        primary_member_count?: number;
                                                    }>;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=department&version=v3 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            parent_department_id?: string;
                            fetch_child?: boolean;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        name: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        leader_user_id?: string;
                                        chat_id?: string;
                                        order?: string;
                                        unit_ids?: Array<string>;
                                        member_count?: number;
                                        status?: { is_deleted?: boolean };
                                        leaders?: Array<{
                                            leaderType: number;
                                            leaderID: string;
                                        }>;
                                        group_chat_employee_types?: Array<number>;
                                        department_hrbps?: Array<string>;
                                        primary_member_count?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/departments`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                parentWithIterator: async (
                    payload?: {
                        params: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            department_id: string;
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
                                    `${this.domain}/open-apis/contact/v3/departments/parent`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        name: string;
                                                        i18n_name?: {
                                                            zh_cn?: string;
                                                            ja_jp?: string;
                                                            en_us?: string;
                                                        };
                                                        parent_department_id: string;
                                                        department_id?: string;
                                                        open_department_id?: string;
                                                        leader_user_id?: string;
                                                        chat_id?: string;
                                                        order?: string;
                                                        unit_ids?: Array<string>;
                                                        member_count?: number;
                                                        status?: {
                                                            is_deleted?: boolean;
                                                        };
                                                        leaders?: Array<{
                                                            leaderType: number;
                                                            leaderID: string;
                                                        }>;
                                                        group_chat_employee_types?: Array<number>;
                                                        department_hrbps?: Array<string>;
                                                        primary_member_count?: number;
                                                    }>;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=parent&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/parent document }
                 *
                 * 获取父部门信息
                 *
                 * 该接口用来递归获取部门父部门的信息，并按照由子到父的顺序返回有权限的父部门信息列表。
                 *
                 * 使用`tenant_access_token`时,该接口只返回可见性范围内的父部门信息。;例如：A >>B>>C>>D四级部门，通讯录权限只到B，那么查询D部门的parent，会返回B和C两级部门。;使用user_access_token时,该接口只返回对于用户可见的父部门信息。
                 */
                parent: async (
                    payload?: {
                        params: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            department_id: string;
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
                                        name: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        leader_user_id?: string;
                                        chat_id?: string;
                                        order?: string;
                                        unit_ids?: Array<string>;
                                        member_count?: number;
                                        status?: { is_deleted?: boolean };
                                        leaders?: Array<{
                                            leaderType: number;
                                            leaderID: string;
                                        }>;
                                        group_chat_employee_types?: Array<number>;
                                        department_hrbps?: Array<string>;
                                        primary_member_count?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/departments/parent`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/patch document }
                 *
                 * 修改部门部分信息
                 *
                 * 该接口用于更新通讯录中部门的信息。
                 *
                 * 调用该接口需要具有该部门以及更新操作涉及的部门的通讯录权限。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            name?: string;
                            i18n_name?: {
                                zh_cn?: string;
                                ja_jp?: string;
                                en_us?: string;
                            };
                            parent_department_id?: string;
                            leader_user_id?: string;
                            order?: string;
                            unit_ids?: Array<string>;
                            create_group_chat?: boolean;
                            leaders?: Array<{
                                leaderType: number;
                                leaderID: string;
                            }>;
                            group_chat_employee_types?: Array<number>;
                            department_hrbps?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { department_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    department?: {
                                        name: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        leader_user_id?: string;
                                        chat_id?: string;
                                        order?: string;
                                        unit_ids?: Array<string>;
                                        member_count?: number;
                                        status?: { is_deleted?: boolean };
                                        leaders?: Array<{
                                            leaderType: number;
                                            leaderID: string;
                                        }>;
                                        group_chat_employee_types?: Array<number>;
                                        department_hrbps?: Array<string>;
                                        primary_member_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/departments/:department_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                searchWithIterator: async (
                    payload?: {
                        data: { query: string };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    `${this.domain}/open-apis/contact/v3/departments/search`,
                                    path
                                ),
                                method: "POST",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        name: string;
                                                        i18n_name?: {
                                                            zh_cn?: string;
                                                            ja_jp?: string;
                                                            en_us?: string;
                                                        };
                                                        parent_department_id: string;
                                                        department_id?: string;
                                                        open_department_id?: string;
                                                        leader_user_id?: string;
                                                        chat_id?: string;
                                                        order?: string;
                                                        unit_ids?: Array<string>;
                                                        member_count?: number;
                                                        status?: {
                                                            is_deleted?: boolean;
                                                        };
                                                        create_group_chat?: boolean;
                                                        leaders?: Array<{
                                                            leaderType: number;
                                                            leaderID: string;
                                                        }>;
                                                        group_chat_employee_types?: Array<number>;
                                                        department_hrbps?: Array<string>;
                                                        primary_member_count?: number;
                                                    }>;
                                                    page_token?: string;
                                                    has_more: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=search&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/search document }
                 *
                 * 搜索部门
                 *
                 * 搜索部门，用户通过关键词查询可见的部门数据，部门可见性需要管理员在后台配置。
                 *
                 * 部门存在，但用户搜索不到并不一定是搜索有问题，可能是管理员在后台配置了权限控制，导致用户无法搜索到该部门。
                 */
                search: async (
                    payload?: {
                        data: { query: string };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                        name: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        leader_user_id?: string;
                                        chat_id?: string;
                                        order?: string;
                                        unit_ids?: Array<string>;
                                        member_count?: number;
                                        status?: { is_deleted?: boolean };
                                        create_group_chat?: boolean;
                                        leaders?: Array<{
                                            leaderType: number;
                                            leaderID: string;
                                        }>;
                                        group_chat_employee_types?: Array<number>;
                                        department_hrbps?: Array<string>;
                                        primary_member_count?: number;
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/departments/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=unbind_department_chat&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/unbind_department_chat document }
                 *
                 * 部门群转为普通群
                 *
                 * 通过该接口将部门群转为普通群。
                 */
                unbindDepartmentChat: async (
                    payload?: {
                        data: { department_id: string };
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/departments/unbind_department_chat`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update document }
                 *
                 * 更新部门所有信息
                 *
                 * 该接口用于更新当前部门所有信息。
                 *
                 * - 调用该接口需要具有该部门与更新部门信息涉及的通讯录权限。;; - 没有填写的字段会被置为空值（order字段除外）。
                 */
                update: async (
                    payload?: {
                        data: {
                            name: string;
                            i18n_name?: {
                                zh_cn?: string;
                                ja_jp?: string;
                                en_us?: string;
                            };
                            parent_department_id: string;
                            leader_user_id?: string;
                            order?: string;
                            unit_ids?: Array<string>;
                            create_group_chat?: boolean;
                            leaders?: Array<{
                                leaderType: number;
                                leaderID: string;
                            }>;
                            group_chat_employee_types?: Array<number>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { department_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    department?: {
                                        name: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        leader_user_id?: string;
                                        chat_id?: string;
                                        order?: string;
                                        unit_ids?: Array<string>;
                                        member_count?: number;
                                        status?: { is_deleted?: boolean };
                                        leaders?: Array<{
                                            leaderType: number;
                                            leaderID: string;
                                        }>;
                                        group_chat_employee_types?: Array<number>;
                                        primary_member_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/departments/:department_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=update_department_id&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_department_id&project=contact&resource=department&version=v3 document }
                 */
                updateDepartmentId: async (
                    payload?: {
                        data: { new_department_id: string };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { department_id?: string };
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
                                `${this.domain}/open-apis/contact/v3/departments/:department_id/update_department_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 人员类型
             */
            employeeTypeEnum: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/create document }
                 *
                 * 新增人员类型
                 *
                 * 新增自定义人员类型
                 */
                create: async (
                    payload?: {
                        data: {
                            content: string;
                            enum_type: number;
                            enum_status: number;
                            i18n_content?: Array<{
                                locale?: string;
                                value?: string;
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
                                    employee_type_enum?: {
                                        enum_id?: string;
                                        enum_value?: string;
                                        content: string;
                                        enum_type: number;
                                        enum_status: number;
                                        i18n_content?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/employee_type_enums`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/delete document }
                 *
                 * 删除人员类型
                 *
                 * 删除自定义人员类型
                 */
                delete: async (
                    payload?: {
                        path?: { enum_id?: string };
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
                                `${this.domain}/open-apis/contact/v3/employee_type_enums/:enum_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                listWithIterator: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: number };
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
                                    `${this.domain}/open-apis/contact/v3/employee_type_enums`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        enum_id?: string;
                                                        enum_value?: string;
                                                        content: string;
                                                        enum_type: number;
                                                        enum_status: number;
                                                        i18n_content?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list document }
                 *
                 * 查询人员类型
                 *
                 * 该接口用于获取员工的人员类型
                 */
                list: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: number };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        enum_id?: string;
                                        enum_value?: string;
                                        content: string;
                                        enum_type: number;
                                        enum_status: number;
                                        i18n_content?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/employee_type_enums`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/update document }
                 *
                 * 更新人员类型
                 *
                 * 更新自定义人员类型
                 */
                update: async (
                    payload?: {
                        data: {
                            content: string;
                            enum_type: number;
                            enum_status: number;
                            i18n_content?: Array<{
                                locale?: string;
                                value?: string;
                            }>;
                        };
                        path?: { enum_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    employee_type_enum?: {
                                        enum_id?: string;
                                        enum_value?: string;
                                        content: string;
                                        enum_type: number;
                                        enum_status: number;
                                        i18n_content?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/employee_type_enums/:enum_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * functional_role
             */
            functionalRole: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=functional_role&version=v3 document }
                 */
                create: async (
                    payload?: {
                        data: { role_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { role_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/functional_roles`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=functional_role&version=v3 document }
                 */
                delete: async (
                    payload?: {
                        path: { role_id: string };
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
                                `${this.domain}/open-apis/contact/v3/functional_roles/:role_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=functional_role&version=v3 document }
                 */
                update: async (
                    payload?: {
                        data: { role_name: string };
                        path: { role_id: string };
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
                                `${this.domain}/open-apis/contact/v3/functional_roles/:role_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * functional_role.member
             */
            functionalRoleMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=batch_create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=contact&resource=functional_role.member&version=v3 document }
                 */
                batchCreate: async (
                    payload?: {
                        data: { members: Array<string> };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { role_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        user_id: string;
                                        reason: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=batch_delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=contact&resource=functional_role.member&version=v3 document }
                 */
                batchDelete: async (
                    payload?: {
                        data?: { members?: Array<string> };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { role_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    result?: Array<{
                                        user_id: string;
                                        reason: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members/batch_delete`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=functional_role.member&version=v3 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { role_id: string; member_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    member?: {
                                        user_id?: string;
                                        scope_type?: "All" | "Part" | "None";
                                        department_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members/:member_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
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
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { role_id: string };
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
                                    `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    members?: Array<{
                                                        user_id?: string;
                                                        scope_type?:
                                                            | "All"
                                                            | "Part"
                                                            | "None";
                                                        department_ids?: Array<string>;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=functional_role.member&version=v3 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { role_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    members?: Array<{
                                        user_id?: string;
                                        scope_type?: "All" | "Part" | "None";
                                        department_ids?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=scopes&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=scopes&project=contact&resource=functional_role.member&version=v3 document }
                 */
                scopes: async (
                    payload?: {
                        data: {
                            members: Array<string>;
                            departments: Array<string>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { role_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        user_id: string;
                                        reason: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/functional_roles/:role_id/members/scopes`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 用户组
             */
            group: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/create document }
                 *
                 * 创建用户组
                 *
                 * 使用该接口创建用户组，请注意创建用户组时应用的通讯录权限范围需为“全部员工”，否则会创建失败，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            description?: string;
                            type?: number;
                            dynamic_group_rule?: {
                                department_level?:
                                    | "recursive"
                                    | "non_recursive";
                                expressions?: Array<{
                                    field?: string;
                                    operator?: string;
                                    value?: string;
                                    values?: Array<string>;
                                }>;
                                joiner_rule?: string;
                            };
                            visible_scope?: {
                                visible_scope_type?:
                                    | "invisible"
                                    | "public"
                                    | "group_member_visible"
                                    | "specified_scope_visible";
                                visible_users?: Array<string>;
                                visible_departments?: Array<string>;
                                scene_types?: Array<number>;
                            };
                            department_scope_list?: Array<string>;
                            group_id?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
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
                                data?: { group_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/group`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/delete document }
                 *
                 * 删除用户组
                 *
                 * 通过该接口可删除企业中的用户组，请注意删除用户组时应用的通讯录权限范围需为“全部员工”，否则会删除失败，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 */
                delete: async (
                    payload?: {
                        path: { group_id: string };
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
                                `${this.domain}/open-apis/contact/v3/group/:group_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/get document }
                 *
                 * 查询用户组
                 *
                 * 根据用户组 ID 查询某个用户组的基本信息，支持查询普通用户组和动态用户组。请确保应用的通讯录权限范围里包括该用户组或者是“全部员工”，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                        };
                        path: { group_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    group: {
                                        id: string;
                                        name: string;
                                        description?: string;
                                        member_user_count?: number;
                                        member_department_count?: number;
                                        type?: number;
                                        dynamic_group_rule?: {
                                            department_level?:
                                                | "recursive"
                                                | "non_recursive";
                                            expressions?: Array<{
                                                field?: string;
                                                operator?: string;
                                                value?: string;
                                                values?: Array<string>;
                                            }>;
                                            joiner_rule?: string;
                                            group_status?:
                                                | "completed"
                                                | "failure"
                                                | "creating"
                                                | "updating";
                                        };
                                        visible_scope?: {
                                            visible_scope_type?:
                                                | "invisible"
                                                | "public"
                                                | "group_member_visible"
                                                | "specified_scope_visible";
                                            visible_users?: Array<string>;
                                            visible_departments?: Array<string>;
                                            scene_types?: Array<number>;
                                        };
                                        department_scope_list?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/group/:group_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=member_belong&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/member_belong document }
                 *
                 * 查询用户所属用户组
                 *
                 * 通过该接口可查询该用户所属的用户组列表，可分别查询普通用户组和动态用户组。如果应用的通讯录权限范围是“全部员工”，则可获取该员工所属的全部用户组列表。如果应用的通讯录权限范围不是“全部员工”，则仅可获取通讯录权限范围内该员工所属的用户组。[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 */
                memberBelong: async (
                    payload?: {
                        params: {
                            member_id: string;
                            member_id_type?: "open_id" | "union_id" | "user_id";
                            group_type?: number;
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
                                    group_list?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/group/member_belong`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/patch document }
                 *
                 * 更新用户组
                 *
                 * 使用该接口更新用户组信息，请注意更新用户组时应用的通讯录权限范围需为“全部员工”，否则会更新失败。[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            name?: string;
                            description?: string;
                            dynamic_group_rule?: {
                                department_level?:
                                    | "recursive"
                                    | "non_recursive";
                                expressions?: Array<{
                                    field?: string;
                                    operator?: string;
                                    value?: string;
                                    values?: Array<string>;
                                }>;
                                joiner_rule?: string;
                            };
                            visible_scope?: {
                                visible_scope_type?:
                                    | "invisible"
                                    | "public"
                                    | "group_member_visible"
                                    | "specified_scope_visible";
                                visible_users?: Array<string>;
                                visible_departments?: Array<string>;
                                scene_types?: Array<number>;
                            };
                            department_scope_list?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { group_id: string };
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
                                `${this.domain}/open-apis/contact/v3/group/:group_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                simplelistWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            type?: number;
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
                                    `${this.domain}/open-apis/contact/v3/group/simplelist`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    grouplist: Array<{
                                                        id: string;
                                                        name: string;
                                                        description?: string;
                                                        member_user_count?: number;
                                                        member_department_count?: number;
                                                        type?: number;
                                                        department_scope_list?: Array<string>;
                                                        group_id?: string;
                                                    }>;
                                                    page_token: string;
                                                    has_more: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=simplelist&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/simplelist document }
                 *
                 * 查询用户组列表
                 *
                 * 通过该接口可查询企业的用户组列表，可分别查询普通用户组或动态用户组。如果应用的通讯录权限范围是“全部员工”，则可获取企业全部用户组列表。如果应用的通讯录权限范围不是“全部员工”，则仅可获取通讯录权限范围内的用户组。[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 */
                simplelist: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            type?: number;
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
                                    grouplist: Array<{
                                        id: string;
                                        name: string;
                                        description?: string;
                                        member_user_count?: number;
                                        member_department_count?: number;
                                        type?: number;
                                        department_scope_list?: Array<string>;
                                        group_id?: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/group/simplelist`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 用户组成员
             */
            groupMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=add&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/add document }
                 *
                 * 添加用户组成员
                 *
                 * 向用户组中添加成员(目前成员仅支持用户，未来会支持部门)，如果应用的通讯录权限范围是“全部员工”，则可将任何成员添加到任何用户组。如果应用的通讯录权限范围不是“全部员工”，则仅可将通讯录权限范围中的成员添加到通讯录权限范围的用户组中，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 */
                add: async (
                    payload?: {
                        data: {
                            member_type: "user";
                            member_id_type: "open_id" | "union_id" | "user_id";
                            member_id: string;
                        };
                        path: { group_id: string };
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
                                `${this.domain}/open-apis/contact/v3/group/:group_id/member/add`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=batch_add&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_add document }
                 *
                 * 批量添加用户组成员
                 *
                 * 向普通用户组中批量添加成员(目前仅支持添加用户，暂不支持添加部门），如果应用的通讯录权限范围是“全部员工”，则可将任何成员添加到任何用户组。如果应用的通讯录权限范围不是“全部员工”，则仅可将通讯录权限范围中的成员添加到通讯录权限范围的用户组中，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 *
                 * 请求体中的member_type，目前仅支持user， 未来将支持department。
                 */
                batchAdd: async (
                    payload?: {
                        data?: {
                            members?: Array<{
                                member_id: string;
                                member_type: string;
                                member_id_type?: string;
                            }>;
                        };
                        path: { group_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        member_id: string;
                                        code: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/group/:group_id/member/batch_add`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=batch_remove&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_remove document }
                 *
                 * 批量移除用户组成员
                 *
                 * 从普通用户组中批量移除成员 (目前仅支持移除用户，暂不支持移除部门）。如果应用的通讯录权限范围是“全部员工”，则可将任何成员移出任何用户组。如果应用的通讯录权限范围不是“全部员工”，则仅可将通讯录权限范围中的成员从通讯录权限范围的用户组中移除， [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 *
                 * 请求体中的member_type，目前仅支持user， 未来将支持department。
                 */
                batchRemove: async (
                    payload?: {
                        data: {
                            members: Array<{
                                member_id: string;
                                member_type: string;
                                member_id_type?: string;
                            }>;
                        };
                        path: { group_id: string };
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
                                `${this.domain}/open-apis/contact/v3/group/:group_id/member/batch_remove`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=remove&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/remove document }
                 *
                 * 移除用户组成员
                 *
                 * 从用户组中移除成员 (目前成员仅支持用户，未来会支持部门)，如果应用的通讯录权限范围是“全部员工”，则可将任何成员移出任何用户组。如果应用的通讯录权限范围不是“全部员工”，则仅可将通讯录权限范围中的成员从通讯录权限范围的用户组中移除， [点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 */
                remove: async (
                    payload?: {
                        data: {
                            member_type: "user";
                            member_id: string;
                            member_id_type: "open_id" | "union_id" | "user_id";
                        };
                        path: { group_id: string };
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
                                `${this.domain}/open-apis/contact/v3/group/:group_id/member/remove`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=simplelist&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/simplelist document }
                 *
                 * 查询用户组成员列表
                 *
                 * 通过该接口可查询某个用户组的成员列表（支持查询成员中的用户和部门）, 本接口支持普通用户组和动态用户组。如果应用的通讯录权限范围是“全部员工”，则可查询企业内任何用户组的成员列表。如果应用的通讯录权限范围不是“全部员工”，则仅可查询通讯录权限范围中的用户组的成员列表，[点击了解通讯录权限范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
                 */
                simplelist: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            member_id_type?:
                                | "open_id"
                                | "union_id"
                                | "user_id"
                                | "department_id";
                            member_type?: "user" | "department";
                        };
                        path: { group_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    memberlist: Array<{
                                        member_id: string;
                                        member_type: string;
                                        member_id_type?: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/group/:group_id/member/simplelist`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * job_family
             */
            jobFamily: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=job_family&version=v3 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            description?: string;
                            parent_job_family_id?: string;
                            status: boolean;
                            i18n_name?: Array<{
                                locale?: string;
                                value?: string;
                            }>;
                            i18n_description?: Array<{
                                locale?: string;
                                value?: string;
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
                                    job_family?: {
                                        name?: string;
                                        description?: string;
                                        parent_job_family_id?: string;
                                        status?: boolean;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_description?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        job_family_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/job_families`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=job_family&version=v3 document }
                 */
                delete: async (
                    payload?: {
                        path: { job_family_id: string };
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
                                `${this.domain}/open-apis/contact/v3/job_families/:job_family_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=job_family&version=v3 document }
                 */
                get: async (
                    payload?: {
                        path: { job_family_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    job_family?: {
                                        name?: string;
                                        description?: string;
                                        parent_job_family_id?: string;
                                        status?: boolean;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_description?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        job_family_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/job_families/:job_family_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
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
                            name?: string;
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
                                    `${this.domain}/open-apis/contact/v3/job_families`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        name?: string;
                                                        description?: string;
                                                        parent_job_family_id?: string;
                                                        status?: boolean;
                                                        i18n_name?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                        i18n_description?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                        job_family_id?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_family&version=v3 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            name?: string;
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
                                        name?: string;
                                        description?: string;
                                        parent_job_family_id?: string;
                                        status?: boolean;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_description?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        job_family_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/job_families`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=job_family&version=v3 document }
                 */
                update: async (
                    payload?: {
                        data?: {
                            name?: string;
                            description?: string;
                            parent_job_family_id?: string;
                            status?: boolean;
                            i18n_name?: Array<{
                                locale?: string;
                                value?: string;
                            }>;
                            i18n_description?: Array<{
                                locale?: string;
                                value?: string;
                            }>;
                        };
                        path: { job_family_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    job_family?: {
                                        name?: string;
                                        description?: string;
                                        parent_job_family_id?: string;
                                        status?: boolean;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_description?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        job_family_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/job_families/:job_family_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * job_level
             */
            jobLevel: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=job_level&version=v3 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            description?: string;
                            order?: number;
                            status: boolean;
                            i18n_name?: Array<{
                                locale?: string;
                                value?: string;
                            }>;
                            i18n_description?: Array<{
                                locale?: string;
                                value?: string;
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
                                    job_level?: {
                                        name?: string;
                                        description?: string;
                                        order?: number;
                                        status?: boolean;
                                        job_level_id?: string;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_description?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/job_levels`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=job_level&version=v3 document }
                 */
                delete: async (
                    payload?: {
                        path: { job_level_id: string };
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
                                `${this.domain}/open-apis/contact/v3/job_levels/:job_level_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=job_level&version=v3 document }
                 */
                get: async (
                    payload?: {
                        path: { job_level_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    job_level?: {
                                        name?: string;
                                        description?: string;
                                        order?: number;
                                        status?: boolean;
                                        job_level_id?: string;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_description?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/job_levels/:job_level_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
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
                            name?: string;
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
                                    `${this.domain}/open-apis/contact/v3/job_levels`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        name?: string;
                                                        description?: string;
                                                        order?: number;
                                                        status?: boolean;
                                                        job_level_id?: string;
                                                        i18n_name?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                        i18n_description?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_level&version=v3 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            name?: string;
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
                                        name?: string;
                                        description?: string;
                                        order?: number;
                                        status?: boolean;
                                        job_level_id?: string;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_description?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/job_levels`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=job_level&version=v3 document }
                 */
                update: async (
                    payload?: {
                        data?: {
                            name?: string;
                            description?: string;
                            order?: number;
                            status?: boolean;
                            i18n_name?: Array<{
                                locale?: string;
                                value?: string;
                            }>;
                            i18n_description?: Array<{
                                locale?: string;
                                value?: string;
                            }>;
                        };
                        path: { job_level_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    job_level?: {
                                        name?: string;
                                        description?: string;
                                        order?: number;
                                        status?: boolean;
                                        job_level_id?: string;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_description?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/job_levels/:job_level_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * job_title
             */
            jobTitle: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_title&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=job_title&version=v3 document }
                 */
                get: async (
                    payload?: {
                        path?: { job_title_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    job_title?: {
                                        job_title_id?: string;
                                        name?: string;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        status?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/job_titles/:job_title_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
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
                                    `${this.domain}/open-apis/contact/v3/job_titles`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        job_title_id?: string;
                                                        name?: string;
                                                        i18n_name?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                        status?: boolean;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_title&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_title&version=v3 document }
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
                                        job_title_id?: string;
                                        name?: string;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        status?: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/job_titles`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 通讯录权限范围
             */
            scope: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    `${this.domain}/open-apis/contact/v3/scopes`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    department_ids?: Array<string>;
                                                    user_ids?: Array<string>;
                                                    group_ids?: Array<string>;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=scope&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/scope/list document }
                 *
                 * 获取通讯录授权范围
                 *
                 * 该接口用于获取应用被授权可访问的通讯录范围，包括可访问的部门列表、用户列表和用户组列表。;授权范围为全员时，返回的部门列表为该企业所有的一级部门；否则返回的部门为管理员在设置授权范围时勾选的部门（不包含勾选部门的子部门）。
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    department_ids?: Array<string>;
                                    user_ids?: Array<string>;
                                    group_ids?: Array<string>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/scopes`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 单位
             */
            unit: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=bind_department&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/bind_department document }
                 *
                 * 建立部门与单位的绑定关系
                 *
                 * 通过该接口建立部门与单位的绑定关系。由于单位是旗舰版付费功能，企业需开通相关版本，否则会绑定失败，不同版本请参考[飞书版本对比](https://www.feishu.cn/service)
                 */
                bindDepartment: async (
                    payload?: {
                        data: {
                            unit_id: string;
                            department_id: string;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/unit/bind_department`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/create document }
                 *
                 * 创建单位
                 *
                 * 该接口用于创建单位。注意：单位功能属于旗舰版付费功能，企业需开通对应版本才可以创建单位，不同版本请参考[飞书版本对比](https://www.feishu.cn/service)。
                 */
                create: async (
                    payload?: {
                        data: {
                            unit_id?: string;
                            name: string;
                            unit_type: string;
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
                                data?: { unit_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/unit`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/delete document }
                 *
                 * 删除单位
                 *
                 * 使用该接口删除单位，需要有更新单位的权限。注意：如果单位的单位类型被其它的业务使用，不允许删除。
                 */
                delete: async (
                    payload?: {
                        path: { unit_id: string };
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
                                `${this.domain}/open-apis/contact/v3/unit/:unit_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/get document }
                 *
                 * 获取单位信息
                 *
                 * 该接口用于获取单位信息
                 */
                get: async (
                    payload?: {
                        path: { unit_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    unit: {
                                        unit_id: string;
                                        name: string;
                                        unit_type: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/unit/:unit_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list document }
                 *
                 * 批量获取单位列表
                 *
                 * 通过该接口获取企业的单位列表，需获取单位的权限
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
                                    unitlist: Array<{
                                        unit_id: string;
                                        name: string;
                                        unit_type: string;
                                    }>;
                                    has_more: boolean;
                                    page_token: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/unit`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=list_department&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list_department document }
                 *
                 * 获取单位绑定的部门列表
                 *
                 * 通过该接口获取单位绑定的部门列表，需具有获取单位的权限
                 */
                listDepartment: async (
                    payload?: {
                        params: {
                            unit_id: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    departmentlist: Array<{
                                        unit_id: string;
                                        department_id: string;
                                    }>;
                                    has_more: boolean;
                                    page_token: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/unit/list_department`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/patch document }
                 *
                 * 修改单位信息
                 *
                 * 调用该接口，需要有更新单位的权限。注意：单位功能属于旗舰版付费功能，企业需开通对应版本才可以修改单位
                 */
                patch: async (
                    payload?: {
                        data?: { name?: string };
                        path: { unit_id: string };
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
                                `${this.domain}/open-apis/contact/v3/unit/:unit_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=unbind_department&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/unbind_department document }
                 *
                 * 解除部门与单位的绑定关系
                 *
                 * 通过该接口解除部门与单位的绑定关系，需更新单位的权限，需对应部门的通讯录权限。由于单位是旗舰版付费功能，企业需开通相关功能，否则会解绑失败
                 */
                unbindDepartment: async (
                    payload?: {
                        data: {
                            unit_id: string;
                            department_id: string;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/unit/unbind_department`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 用户
             */
            user: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=batch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch&project=contact&resource=user&version=v3 document }
                 */
                batch: async (
                    payload?: {
                        params: {
                            user_ids: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
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
                                        user_id?: string;
                                        open_id?: string;
                                        name: string;
                                        en_name?: string;
                                        nickname?: string;
                                        email?: string;
                                        mobile: string;
                                        mobile_visible?: boolean;
                                        gender?: number;
                                        avatar_key?: string;
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        status?: {
                                            is_frozen?: boolean;
                                            is_resigned?: boolean;
                                            is_activated?: boolean;
                                            is_exited?: boolean;
                                            is_unjoin?: boolean;
                                        };
                                        department_ids?: Array<string>;
                                        leader_user_id?: string;
                                        city?: string;
                                        country?: string;
                                        work_station?: string;
                                        join_time?: number;
                                        is_tenant_manager?: boolean;
                                        employee_no?: string;
                                        employee_type?: number;
                                        positions?: Array<{
                                            position_code?: string;
                                            position_name?: string;
                                            department_id?: string;
                                            leader_user_id?: string;
                                            leader_position_code?: string;
                                            is_major?: boolean;
                                        }>;
                                        orders?: Array<{
                                            department_id?: string;
                                            user_order?: number;
                                            department_order?: number;
                                            is_primary_dept?: boolean;
                                        }>;
                                        custom_attrs?: Array<{
                                            type?: string;
                                            id?: string;
                                            value?: {
                                                text?: string;
                                                url?: string;
                                                pc_url?: string;
                                                option_id?: string;
                                                option_value?: string;
                                                name?: string;
                                                picture_url?: string;
                                                generic_user?: {
                                                    id: string;
                                                    type: number;
                                                };
                                            };
                                        }>;
                                        enterprise_email?: string;
                                        idp_type?: string;
                                        time_zone?: string;
                                        description?: string;
                                        job_title?: string;
                                        need_send_notification?: boolean;
                                        notification_option?: {
                                            channels?: Array<string>;
                                            language?:
                                                | "zh-CN"
                                                | "en-US"
                                                | "ja-JP";
                                        };
                                        is_frozen?: boolean;
                                        geo?: string;
                                        job_level_id?: string;
                                        job_family_id?: string;
                                        subscription_ids?: Array<string>;
                                        assign_info?: Array<{
                                            subscription_id?: string;
                                            license_plan_key?: string;
                                            product_name?: string;
                                            i18n_name?: {
                                                zh_cn?: string;
                                                ja_jp?: string;
                                                en_us?: string;
                                            };
                                            start_time?: string;
                                            end_time?: string;
                                        }>;
                                        department_path?: Array<{
                                            department_id?: string;
                                            department_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            department_path?: {
                                                department_ids?: Array<string>;
                                                department_path_name?: {
                                                    name?: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                            };
                                        }>;
                                        dotted_line_leader_user_ids?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users/batch`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=batch_get_id&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch_get_id document }
                 *
                 * 通过手机号或邮箱获取用户 ID
                 *
                 * 通过该接口，可使用手机号/邮箱获取用户的 ID 信息，具体获取支持的 ID 类型包括 open_id、user_id、union_id，可通过查询参数指定。
                 *
                 * 如果查询的手机号、邮箱不存在，或者无权限查看对应的用户，则返回的用户ID列表为空。
                 */
                batchGetId: async (
                    payload?: {
                        data?: {
                            emails?: Array<string>;
                            mobiles?: Array<string>;
                            include_resigned?: boolean;
                        };
                        params?: {
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
                                    user_list?: Array<{
                                        user_id?: string;
                                        mobile?: string;
                                        email?: string;
                                        status?: {
                                            is_frozen?: boolean;
                                            is_resigned?: boolean;
                                            is_activated?: boolean;
                                            is_exited?: boolean;
                                            is_unjoin?: boolean;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users/batch_get_id`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/create document }
                 *
                 * 创建用户
                 *
                 * 使用该接口向通讯录创建一个用户，可以理解为员工入职。创建用户后只返回有数据权限的数据。具体的数据权限的与字段的对应关系请参照[应用权限](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)。
                 *
                 * - 新增用户的所有部门必须都在当前应用的通讯录授权范围内才允许新增用户，如果想要在根部门下新增用户，必须要有全员权限。;- 应用商店应用无权限调用此接口。;- 创建用户后，会给用户发送邀请短信/邮件，用户在操作同意后才可访问团队。;- 返回数据中不返回手机号，如果需要请重新查询用户信息获取手机号。
                 */
                create: async (
                    payload?: {
                        data: {
                            user_id?: string;
                            name: string;
                            en_name?: string;
                            nickname?: string;
                            email?: string;
                            mobile: string;
                            mobile_visible?: boolean;
                            gender?: number;
                            avatar_key?: string;
                            department_ids: Array<string>;
                            leader_user_id?: string;
                            city?: string;
                            country?: string;
                            work_station?: string;
                            join_time?: number;
                            employee_no?: string;
                            employee_type: number;
                            positions?: Array<{
                                position_code?: string;
                                position_name?: string;
                                department_id?: string;
                                leader_user_id?: string;
                                leader_position_code?: string;
                                is_major?: boolean;
                            }>;
                            orders?: Array<{
                                department_id?: string;
                                user_order?: number;
                                department_order?: number;
                                is_primary_dept?: boolean;
                            }>;
                            custom_attrs?: Array<{
                                type?: string;
                                id?: string;
                                value?: {
                                    text?: string;
                                    url?: string;
                                    pc_url?: string;
                                    option_id?: string;
                                    generic_user?: { id: string; type: number };
                                };
                            }>;
                            enterprise_email?: string;
                            idp_type?: string;
                            description?: string;
                            job_title?: string;
                            need_send_notification?: boolean;
                            notification_option?: {
                                channels?: Array<string>;
                                language?: "zh-CN" | "en-US" | "ja-JP";
                            };
                            geo?: string;
                            job_level_id?: string;
                            job_family_id?: string;
                            subscription_ids?: Array<string>;
                            department_path?: Array<{
                                department_id?: string;
                                department_name?: {
                                    name?: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                };
                                department_path?: {
                                    department_ids?: Array<string>;
                                    department_path_name?: {
                                        name?: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                    };
                                };
                            }>;
                            dotted_line_leader_user_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            client_token?: string;
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
                                    user?: {
                                        union_id?: string;
                                        user_id?: string;
                                        open_id?: string;
                                        name: string;
                                        en_name?: string;
                                        nickname?: string;
                                        email?: string;
                                        mobile: string;
                                        mobile_visible?: boolean;
                                        gender?: number;
                                        avatar_key?: string;
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        status?: {
                                            is_frozen?: boolean;
                                            is_resigned?: boolean;
                                            is_activated?: boolean;
                                            is_exited?: boolean;
                                            is_unjoin?: boolean;
                                        };
                                        department_ids?: Array<string>;
                                        leader_user_id?: string;
                                        city?: string;
                                        country?: string;
                                        work_station?: string;
                                        join_time?: number;
                                        is_tenant_manager?: boolean;
                                        employee_no?: string;
                                        employee_type?: number;
                                        positions?: Array<{
                                            position_code?: string;
                                            position_name?: string;
                                            department_id?: string;
                                            leader_user_id?: string;
                                            leader_position_code?: string;
                                            is_major?: boolean;
                                        }>;
                                        orders?: Array<{
                                            department_id?: string;
                                            user_order?: number;
                                            department_order?: number;
                                            is_primary_dept?: boolean;
                                        }>;
                                        custom_attrs?: Array<{
                                            type?: string;
                                            id?: string;
                                            value?: {
                                                text?: string;
                                                url?: string;
                                                pc_url?: string;
                                                option_id?: string;
                                                option_value?: string;
                                                name?: string;
                                                picture_url?: string;
                                                generic_user?: {
                                                    id: string;
                                                    type: number;
                                                };
                                            };
                                        }>;
                                        enterprise_email?: string;
                                        idp_type?: string;
                                        time_zone?: string;
                                        description?: string;
                                        job_title?: string;
                                        need_send_notification?: boolean;
                                        notification_option?: {
                                            channels?: Array<string>;
                                            language?:
                                                | "zh-CN"
                                                | "en-US"
                                                | "ja-JP";
                                        };
                                        is_frozen?: boolean;
                                        geo?: string;
                                        job_level_id?: string;
                                        job_family_id?: string;
                                        department_path?: Array<{
                                            department_id?: string;
                                            department_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            department_path?: {
                                                department_ids?: Array<string>;
                                                department_path_name?: {
                                                    name?: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                            };
                                        }>;
                                        dotted_line_leader_user_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/delete document }
                 *
                 * 删除用户
                 *
                 * 该接口用于从通讯录删除一个用户信息，可以理解为员工离职。
                 *
                 * - 若用户归属部门A、部门B，应用的通讯录权限范围必须包括部门A和部门B才可以删除用户。;- 用户可以在删除员工时设置删除员工数据（如文档）的接收者，如果不设置则由其leader接收，如果该员工没有leader，则会将该员工的数据删除。
                 */
                delete: async (
                    payload?: {
                        data?: {
                            department_chat_acceptor_user_id?: string;
                            external_chat_acceptor_user_id?: string;
                            docs_acceptor_user_id?: string;
                            calendar_acceptor_user_id?: string;
                            application_acceptor_user_id?: string;
                            minutes_acceptor_user_id?: string;
                            survey_acceptor_user_id?: string;
                            email_acceptor?: {
                                processing_type: "1" | "2" | "3";
                                acceptor_user_id?: string;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users/:user_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                findByDepartmentWithIterator: async (
                    payload?: {
                        params: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            department_id: string;
                            page_size?: number;
                            page_token?: string;
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
                                    `${this.domain}/open-apis/contact/v3/users/find_by_department`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        union_id?: string;
                                                        user_id?: string;
                                                        open_id?: string;
                                                        name: string;
                                                        en_name?: string;
                                                        nickname?: string;
                                                        email?: string;
                                                        mobile: string;
                                                        mobile_visible?: boolean;
                                                        gender?: number;
                                                        avatar_key?: string;
                                                        avatar?: {
                                                            avatar_72?: string;
                                                            avatar_240?: string;
                                                            avatar_640?: string;
                                                            avatar_origin?: string;
                                                        };
                                                        status?: {
                                                            is_frozen?: boolean;
                                                            is_resigned?: boolean;
                                                            is_activated?: boolean;
                                                            is_exited?: boolean;
                                                            is_unjoin?: boolean;
                                                        };
                                                        department_ids?: Array<string>;
                                                        leader_user_id?: string;
                                                        city?: string;
                                                        country?: string;
                                                        work_station?: string;
                                                        join_time?: number;
                                                        is_tenant_manager?: boolean;
                                                        employee_no?: string;
                                                        employee_type?: number;
                                                        positions?: Array<{
                                                            position_code?: string;
                                                            position_name?: string;
                                                            department_id?: string;
                                                            leader_user_id?: string;
                                                            leader_position_code?: string;
                                                            is_major?: boolean;
                                                        }>;
                                                        orders?: Array<{
                                                            department_id?: string;
                                                            user_order?: number;
                                                            department_order?: number;
                                                            is_primary_dept?: boolean;
                                                        }>;
                                                        custom_attrs?: Array<{
                                                            type?: string;
                                                            id?: string;
                                                            value?: {
                                                                text?: string;
                                                                url?: string;
                                                                pc_url?: string;
                                                                option_id?: string;
                                                                option_value?: string;
                                                                name?: string;
                                                                picture_url?: string;
                                                                generic_user?: {
                                                                    id: string;
                                                                    type: number;
                                                                };
                                                            };
                                                        }>;
                                                        enterprise_email?: string;
                                                        idp_type?: string;
                                                        time_zone?: string;
                                                        description?: string;
                                                        job_title?: string;
                                                        need_send_notification?: boolean;
                                                        notification_option?: {
                                                            channels?: Array<string>;
                                                            language?:
                                                                | "zh-CN"
                                                                | "en-US"
                                                                | "ja-JP";
                                                        };
                                                        is_frozen?: boolean;
                                                        geo?: string;
                                                        job_level_id?: string;
                                                        job_family_id?: string;
                                                        department_path?: Array<{
                                                            department_id?: string;
                                                            department_name?: {
                                                                name?: string;
                                                                i18n_name?: {
                                                                    zh_cn?: string;
                                                                    ja_jp?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                            department_path?: {
                                                                department_ids?: Array<string>;
                                                                department_path_name?: {
                                                                    name?: string;
                                                                    i18n_name?: {
                                                                        zh_cn?: string;
                                                                        ja_jp?: string;
                                                                        en_us?: string;
                                                                    };
                                                                };
                                                            };
                                                        }>;
                                                        dotted_line_leader_user_ids?: Array<string>;
                                                    }>;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=find_by_department&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/find_by_department document }
                 *
                 * 获取部门直属用户列表
                 *
                 * 基于部门ID获取部门直属用户列表。
                 *
                 * - 部门ID 必填，根部门的部门ID为0。;- 使用 `user_access_token` 情况下根据个人组织架构的通讯录可见范围进行权限过滤，返回个人组织架构通讯录范围（[登录企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内可见的用户数据。;- 使用`tenant_access_token`会根据应用通讯录的范围进行权限过滤。 如果请求的部门ID为0，则校验应用是否具有全员通讯录权限； 如果是非0的部门ID，则会验证应用是否具有该部门的通讯录权限。 无权限返回无权限错误码，有权限则返回对应部门下的直接用户列表。
                 */
                findByDepartment: async (
                    payload?: {
                        params: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            department_id: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        union_id?: string;
                                        user_id?: string;
                                        open_id?: string;
                                        name: string;
                                        en_name?: string;
                                        nickname?: string;
                                        email?: string;
                                        mobile: string;
                                        mobile_visible?: boolean;
                                        gender?: number;
                                        avatar_key?: string;
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        status?: {
                                            is_frozen?: boolean;
                                            is_resigned?: boolean;
                                            is_activated?: boolean;
                                            is_exited?: boolean;
                                            is_unjoin?: boolean;
                                        };
                                        department_ids?: Array<string>;
                                        leader_user_id?: string;
                                        city?: string;
                                        country?: string;
                                        work_station?: string;
                                        join_time?: number;
                                        is_tenant_manager?: boolean;
                                        employee_no?: string;
                                        employee_type?: number;
                                        positions?: Array<{
                                            position_code?: string;
                                            position_name?: string;
                                            department_id?: string;
                                            leader_user_id?: string;
                                            leader_position_code?: string;
                                            is_major?: boolean;
                                        }>;
                                        orders?: Array<{
                                            department_id?: string;
                                            user_order?: number;
                                            department_order?: number;
                                            is_primary_dept?: boolean;
                                        }>;
                                        custom_attrs?: Array<{
                                            type?: string;
                                            id?: string;
                                            value?: {
                                                text?: string;
                                                url?: string;
                                                pc_url?: string;
                                                option_id?: string;
                                                option_value?: string;
                                                name?: string;
                                                picture_url?: string;
                                                generic_user?: {
                                                    id: string;
                                                    type: number;
                                                };
                                            };
                                        }>;
                                        enterprise_email?: string;
                                        idp_type?: string;
                                        time_zone?: string;
                                        description?: string;
                                        job_title?: string;
                                        need_send_notification?: boolean;
                                        notification_option?: {
                                            channels?: Array<string>;
                                            language?:
                                                | "zh-CN"
                                                | "en-US"
                                                | "ja-JP";
                                        };
                                        is_frozen?: boolean;
                                        geo?: string;
                                        job_level_id?: string;
                                        job_family_id?: string;
                                        department_path?: Array<{
                                            department_id?: string;
                                            department_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            department_path?: {
                                                department_ids?: Array<string>;
                                                department_path_name?: {
                                                    name?: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                            };
                                        }>;
                                        dotted_line_leader_user_ids?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users/find_by_department`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get document }
                 *
                 * 获取单个用户信息
                 *
                 * 该接口用于获取通讯录中单个用户的信息。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    user?: {
                                        union_id?: string;
                                        user_id?: string;
                                        open_id?: string;
                                        name?: string;
                                        en_name?: string;
                                        nickname?: string;
                                        email?: string;
                                        mobile?: string;
                                        mobile_visible?: boolean;
                                        gender?: number;
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        status?: {
                                            is_frozen?: boolean;
                                            is_resigned?: boolean;
                                            is_activated?: boolean;
                                            is_exited?: boolean;
                                            is_unjoin?: boolean;
                                        };
                                        department_ids?: Array<string>;
                                        leader_user_id?: string;
                                        city?: string;
                                        country?: string;
                                        work_station?: string;
                                        join_time?: number;
                                        is_tenant_manager?: boolean;
                                        employee_no?: string;
                                        employee_type?: number;
                                        positions?: Array<{
                                            position_code?: string;
                                            position_name?: string;
                                            department_id?: string;
                                            leader_user_id?: string;
                                            leader_position_code?: string;
                                            is_major?: boolean;
                                        }>;
                                        orders?: Array<{
                                            department_id?: string;
                                            user_order?: number;
                                            department_order?: number;
                                            is_primary_dept?: boolean;
                                        }>;
                                        custom_attrs?: Array<{
                                            type?: string;
                                            id?: string;
                                            value?: {
                                                text?: string;
                                                url?: string;
                                                pc_url?: string;
                                                option_value?: string;
                                                name?: string;
                                                picture_url?: string;
                                                generic_user?: {
                                                    id: string;
                                                    type: number;
                                                };
                                            };
                                        }>;
                                        enterprise_email?: string;
                                        time_zone?: string;
                                        description?: string;
                                        job_title?: string;
                                        geo?: string;
                                        job_level_id?: string;
                                        job_family_id?: string;
                                        assign_info?: Array<{
                                            subscription_id?: string;
                                            license_plan_key?: string;
                                            product_name?: string;
                                            i18n_name?: {
                                                zh_cn?: string;
                                                ja_jp?: string;
                                                en_us?: string;
                                            };
                                            start_time?: string;
                                            end_time?: string;
                                        }>;
                                        department_path?: Array<{
                                            department_id?: string;
                                            department_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            department_path?: {
                                                department_ids?: Array<string>;
                                                department_path_name?: {
                                                    name?: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                            };
                                        }>;
                                        dotted_line_leader_user_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users/:user_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
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
                            department_id?: string;
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
                                    `${this.domain}/open-apis/contact/v3/users`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        union_id?: string;
                                                        user_id?: string;
                                                        open_id?: string;
                                                        name: string;
                                                        en_name?: string;
                                                        nickname?: string;
                                                        email?: string;
                                                        mobile: string;
                                                        mobile_visible?: boolean;
                                                        gender?: number;
                                                        avatar?: {
                                                            avatar_72?: string;
                                                            avatar_240?: string;
                                                            avatar_640?: string;
                                                            avatar_origin?: string;
                                                        };
                                                        status?: {
                                                            is_frozen?: boolean;
                                                            is_resigned?: boolean;
                                                            is_activated?: boolean;
                                                            is_exited?: boolean;
                                                            is_unjoin?: boolean;
                                                        };
                                                        department_ids?: Array<string>;
                                                        leader_user_id?: string;
                                                        city?: string;
                                                        country?: string;
                                                        work_station?: string;
                                                        join_time?: number;
                                                        is_tenant_manager?: boolean;
                                                        employee_no?: string;
                                                        employee_type?: number;
                                                        positions?: Array<{
                                                            position_code?: string;
                                                            position_name?: string;
                                                            department_id?: string;
                                                            leader_user_id?: string;
                                                            leader_position_code?: string;
                                                            is_major?: boolean;
                                                        }>;
                                                        orders?: Array<{
                                                            department_id?: string;
                                                            user_order?: number;
                                                            department_order?: number;
                                                            is_primary_dept?: boolean;
                                                        }>;
                                                        custom_attrs?: Array<{
                                                            type?: string;
                                                            id?: string;
                                                            value?: {
                                                                text?: string;
                                                                url?: string;
                                                                pc_url?: string;
                                                                option_value?: string;
                                                                name?: string;
                                                                picture_url?: string;
                                                                generic_user?: {
                                                                    id: string;
                                                                    type: number;
                                                                };
                                                            };
                                                        }>;
                                                        enterprise_email?: string;
                                                        time_zone?: string;
                                                        description?: string;
                                                        job_title?: string;
                                                        geo?: string;
                                                        job_level_id?: string;
                                                        job_family_id?: string;
                                                        assign_info?: Array<{
                                                            subscription_id?: string;
                                                            license_plan_key?: string;
                                                            product_name?: string;
                                                            i18n_name?: {
                                                                zh_cn?: string;
                                                                ja_jp?: string;
                                                                en_us?: string;
                                                            };
                                                            start_time?: string;
                                                            end_time?: string;
                                                        }>;
                                                        department_path?: Array<{
                                                            department_id?: string;
                                                            department_name?: {
                                                                name?: string;
                                                                i18n_name?: {
                                                                    zh_cn?: string;
                                                                    ja_jp?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                            department_path?: {
                                                                department_ids?: Array<string>;
                                                                department_path_name?: {
                                                                    name?: string;
                                                                    i18n_name?: {
                                                                        zh_cn?: string;
                                                                        ja_jp?: string;
                                                                        en_us?: string;
                                                                    };
                                                                };
                                                            };
                                                        }>;
                                                        dotted_line_leader_user_ids?: Array<string>;
                                                    }>;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=user&version=v3 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            department_id?: string;
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
                                        union_id?: string;
                                        user_id?: string;
                                        open_id?: string;
                                        name: string;
                                        en_name?: string;
                                        nickname?: string;
                                        email?: string;
                                        mobile: string;
                                        mobile_visible?: boolean;
                                        gender?: number;
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        status?: {
                                            is_frozen?: boolean;
                                            is_resigned?: boolean;
                                            is_activated?: boolean;
                                            is_exited?: boolean;
                                            is_unjoin?: boolean;
                                        };
                                        department_ids?: Array<string>;
                                        leader_user_id?: string;
                                        city?: string;
                                        country?: string;
                                        work_station?: string;
                                        join_time?: number;
                                        is_tenant_manager?: boolean;
                                        employee_no?: string;
                                        employee_type?: number;
                                        positions?: Array<{
                                            position_code?: string;
                                            position_name?: string;
                                            department_id?: string;
                                            leader_user_id?: string;
                                            leader_position_code?: string;
                                            is_major?: boolean;
                                        }>;
                                        orders?: Array<{
                                            department_id?: string;
                                            user_order?: number;
                                            department_order?: number;
                                            is_primary_dept?: boolean;
                                        }>;
                                        custom_attrs?: Array<{
                                            type?: string;
                                            id?: string;
                                            value?: {
                                                text?: string;
                                                url?: string;
                                                pc_url?: string;
                                                option_value?: string;
                                                name?: string;
                                                picture_url?: string;
                                                generic_user?: {
                                                    id: string;
                                                    type: number;
                                                };
                                            };
                                        }>;
                                        enterprise_email?: string;
                                        time_zone?: string;
                                        description?: string;
                                        job_title?: string;
                                        geo?: string;
                                        job_level_id?: string;
                                        job_family_id?: string;
                                        assign_info?: Array<{
                                            subscription_id?: string;
                                            license_plan_key?: string;
                                            product_name?: string;
                                            i18n_name?: {
                                                zh_cn?: string;
                                                ja_jp?: string;
                                                en_us?: string;
                                            };
                                            start_time?: string;
                                            end_time?: string;
                                        }>;
                                        department_path?: Array<{
                                            department_id?: string;
                                            department_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            department_path?: {
                                                department_ids?: Array<string>;
                                                department_path_name?: {
                                                    name?: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                            };
                                        }>;
                                        dotted_line_leader_user_ids?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/patch document }
                 *
                 * 修改用户部分信息
                 *
                 * 该接口用于更新通讯录中用户的字段，未传递的参数不会更新。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            name?: string;
                            en_name?: string;
                            nickname?: string;
                            email?: string;
                            mobile?: string;
                            mobile_visible?: boolean;
                            gender?: number;
                            avatar_key?: string;
                            department_ids?: Array<string>;
                            leader_user_id?: string;
                            city?: string;
                            country?: string;
                            work_station?: string;
                            join_time?: number;
                            employee_no?: string;
                            employee_type?: number;
                            positions?: Array<{
                                position_code?: string;
                                position_name?: string;
                                department_id?: string;
                                leader_user_id?: string;
                                leader_position_code?: string;
                                is_major?: boolean;
                            }>;
                            orders?: Array<{
                                department_id?: string;
                                user_order?: number;
                                department_order?: number;
                                is_primary_dept?: boolean;
                            }>;
                            custom_attrs?: Array<{
                                type?: string;
                                id?: string;
                                value?: {
                                    text?: string;
                                    url?: string;
                                    pc_url?: string;
                                    option_id?: string;
                                    generic_user?: { id: string; type: number };
                                };
                            }>;
                            enterprise_email?: string;
                            idp_type?: string;
                            description?: string;
                            job_title?: string;
                            is_frozen?: boolean;
                            geo?: string;
                            job_level_id?: string;
                            job_family_id?: string;
                            subscription_ids?: Array<string>;
                            department_path?: Array<{
                                department_id?: string;
                                department_name?: {
                                    name?: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                };
                                department_path?: {
                                    department_ids?: Array<string>;
                                    department_path_name?: {
                                        name?: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                    };
                                };
                            }>;
                            dotted_line_leader_user_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    user?: {
                                        union_id?: string;
                                        user_id?: string;
                                        open_id?: string;
                                        name: string;
                                        en_name?: string;
                                        nickname?: string;
                                        email?: string;
                                        mobile: string;
                                        mobile_visible?: boolean;
                                        gender?: number;
                                        avatar_key?: string;
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        status?: {
                                            is_frozen?: boolean;
                                            is_resigned?: boolean;
                                            is_activated?: boolean;
                                            is_exited?: boolean;
                                            is_unjoin?: boolean;
                                        };
                                        department_ids?: Array<string>;
                                        leader_user_id?: string;
                                        city?: string;
                                        country?: string;
                                        work_station?: string;
                                        join_time?: number;
                                        is_tenant_manager?: boolean;
                                        employee_no?: string;
                                        employee_type?: number;
                                        positions?: Array<{
                                            position_code?: string;
                                            position_name?: string;
                                            department_id?: string;
                                            leader_user_id?: string;
                                            leader_position_code?: string;
                                            is_major?: boolean;
                                        }>;
                                        orders?: Array<{
                                            department_id?: string;
                                            user_order?: number;
                                            department_order?: number;
                                            is_primary_dept?: boolean;
                                        }>;
                                        custom_attrs?: Array<{
                                            type?: string;
                                            id?: string;
                                            value?: {
                                                text?: string;
                                                url?: string;
                                                pc_url?: string;
                                                option_id?: string;
                                                option_value?: string;
                                                name?: string;
                                                picture_url?: string;
                                                generic_user?: {
                                                    id: string;
                                                    type: number;
                                                };
                                            };
                                        }>;
                                        enterprise_email?: string;
                                        idp_type?: string;
                                        time_zone?: string;
                                        description?: string;
                                        job_title?: string;
                                        need_send_notification?: boolean;
                                        notification_option?: {
                                            channels?: Array<string>;
                                            language?:
                                                | "zh-CN"
                                                | "en-US"
                                                | "ja-JP";
                                        };
                                        is_frozen?: boolean;
                                        geo?: string;
                                        job_level_id?: string;
                                        job_family_id?: string;
                                        department_path?: Array<{
                                            department_id?: string;
                                            department_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            department_path?: {
                                                department_ids?: Array<string>;
                                                department_path_name?: {
                                                    name?: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                            };
                                        }>;
                                        dotted_line_leader_user_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users/:user_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=resurrect&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/resurrect document }
                 *
                 * 恢复已删除用户
                 *
                 * 该接口用于恢复已删除用户（已离职的成员），仅自建应用可申请，应用商店应用无权调用接口。
                 *
                 * - 仅支持恢复离职 30 天内的成员。恢复后，部分用户数据仍不可恢复，请谨慎调用。;- 待恢复成员的用户 ID 不能被企业内其他成员使用。如有重复，请先离职对应的成员，否则接口会报错。;- 待恢复成员的手机号和邮箱不能被企业内其他成员使用。如有重复，请先修改对应成员的信息，否则接口会报错。
                 */
                resurrect: async (
                    payload?: {
                        data?: {
                            departments?: Array<{
                                department_id: string;
                                user_order?: number;
                                department_order?: number;
                            }>;
                            subscription_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users/:user_id/resurrect`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/update document }
                 *
                 * 更新用户所有信息
                 *
                 * 该接口用于更新通讯录中用户的字段。
                 *
                 * 应用需要拥有待更新用户的通讯录授权，如果涉及到用户部门变更，还需要同时拥有变更前、后所有新部门的通讯录授权。
                 */
                update: async (
                    payload?: {
                        data: {
                            name: string;
                            en_name?: string;
                            nickname?: string;
                            email?: string;
                            mobile: string;
                            mobile_visible?: boolean;
                            gender?: number;
                            avatar_key?: string;
                            department_ids: Array<string>;
                            leader_user_id?: string;
                            city?: string;
                            country?: string;
                            work_station?: string;
                            join_time?: number;
                            employee_no?: string;
                            employee_type: number;
                            positions?: Array<{
                                position_code?: string;
                                position_name?: string;
                                department_id?: string;
                                leader_user_id?: string;
                                leader_position_code?: string;
                                is_major?: boolean;
                            }>;
                            orders?: Array<{
                                department_id?: string;
                                user_order?: number;
                                department_order?: number;
                                is_primary_dept?: boolean;
                            }>;
                            custom_attrs?: Array<{
                                type?: string;
                                id?: string;
                                value?: {
                                    text?: string;
                                    url?: string;
                                    pc_url?: string;
                                    option_id?: string;
                                    generic_user?: { id: string; type: number };
                                };
                            }>;
                            enterprise_email?: string;
                            idp_type?: string;
                            description?: string;
                            job_title?: string;
                            is_frozen?: boolean;
                            geo?: string;
                            department_path?: Array<{
                                department_id?: string;
                                department_name?: {
                                    name?: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                };
                                department_path?: {
                                    department_ids?: Array<string>;
                                    department_path_name?: {
                                        name?: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                    };
                                };
                            }>;
                            dotted_line_leader_user_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    user?: {
                                        union_id?: string;
                                        user_id?: string;
                                        open_id?: string;
                                        name: string;
                                        en_name?: string;
                                        nickname?: string;
                                        email?: string;
                                        mobile: string;
                                        mobile_visible?: boolean;
                                        gender?: number;
                                        avatar_key?: string;
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        status?: {
                                            is_frozen?: boolean;
                                            is_resigned?: boolean;
                                            is_activated?: boolean;
                                            is_exited?: boolean;
                                            is_unjoin?: boolean;
                                        };
                                        department_ids?: Array<string>;
                                        leader_user_id?: string;
                                        city?: string;
                                        country?: string;
                                        work_station?: string;
                                        join_time?: number;
                                        is_tenant_manager?: boolean;
                                        employee_no?: string;
                                        employee_type?: number;
                                        positions?: Array<{
                                            position_code?: string;
                                            position_name?: string;
                                            department_id?: string;
                                            leader_user_id?: string;
                                            leader_position_code?: string;
                                            is_major?: boolean;
                                        }>;
                                        orders?: Array<{
                                            department_id?: string;
                                            user_order?: number;
                                            department_order?: number;
                                            is_primary_dept?: boolean;
                                        }>;
                                        custom_attrs?: Array<{
                                            type?: string;
                                            id?: string;
                                            value?: {
                                                text?: string;
                                                url?: string;
                                                pc_url?: string;
                                                option_id?: string;
                                                option_value?: string;
                                                name?: string;
                                                picture_url?: string;
                                                generic_user?: {
                                                    id: string;
                                                    type: number;
                                                };
                                            };
                                        }>;
                                        enterprise_email?: string;
                                        idp_type?: string;
                                        time_zone?: string;
                                        description?: string;
                                        job_title?: string;
                                        need_send_notification?: boolean;
                                        notification_option?: {
                                            channels?: Array<string>;
                                            language?:
                                                | "zh-CN"
                                                | "en-US"
                                                | "ja-JP";
                                        };
                                        is_frozen?: boolean;
                                        geo?: string;
                                        department_path?: Array<{
                                            department_id?: string;
                                            department_name?: {
                                                name?: string;
                                                i18n_name?: {
                                                    zh_cn?: string;
                                                    ja_jp?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            department_path?: {
                                                department_ids?: Array<string>;
                                                department_path_name?: {
                                                    name?: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        ja_jp?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                            };
                                        }>;
                                        dotted_line_leader_user_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users/:user_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=update_user_id&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_user_id&project=contact&resource=user&version=v3 document }
                 */
                updateUserId: async (
                    payload?: {
                        data: { new_user_id: string };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users/:user_id/update_user_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * work_city
             */
            workCity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=work_city&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=work_city&version=v3 document }
                 */
                get: async (
                    payload?: {
                        path?: { work_city_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    work_city?: {
                                        work_city_id?: string;
                                        name?: string;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        status?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/work_cities/:work_city_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
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
                                    `${this.domain}/open-apis/contact/v3/work_cities`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        work_city_id?: string;
                                                        name?: string;
                                                        i18n_name?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                        status?: boolean;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=work_city&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=work_city&version=v3 document }
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
                                        work_city_id?: string;
                                        name?: string;
                                        i18n_name?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        status?: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/work_cities`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
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
