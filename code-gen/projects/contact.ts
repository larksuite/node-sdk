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
         
         */
    contact = {
        /**
         * group
         */
        group: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=group&version=v3 document }
             *
             * 删除用户组
             *
             * 调用该接口删除指定用户组。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=member_belong&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_belong&project=contact&resource=group&version=v3 document }
             *
             * 查询用户所属用户组
             *
             * 调用该接口查询指定用户所属的用户组列表。
             *
             * ## 注意事项;;- 如果应用的通讯录权限范围设置为 **全部员工**，则通过本接口可查询到用户所属的全部用户组列表，否则，仅会查询到应用通讯录权限范围内该用户所属的用户组。了解应用通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;- 支持查询到普通用户组和动态用户组的信息。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=group&version=v3 document }
             *
             * 查询指定用户组
             *
             * 调用该接口通过用户组 ID 查询指定用户组的基本信息，包括用户组名称、成员数量和类型等。
             *
             * ## 注意事项;;- 应用的通讯录权限范围需要符合以下任一设置，才可以成功调用本接口。了解应用通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;     - 通讯录权限范围设置为 **全部员工**。;     - 由企业管理员在管理后台设置应用可见范围内包含当前待查询的用户组，然后应用的通讯录权限范围设置为 **与应用的可用范围一致**。;- 支持查询普通用户组和动态用户组。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=simplelist&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=simplelist&project=contact&resource=group&version=v3 document }
             *
             * 查询用户组列表
             *
             * 调用该接口查询当前租户下的用户组列表，列表内包含用户组的 ID、名字、成员数量和类型等信息。
             *
             * ## 注意事项;;- 如果应用的通讯录权限范围设置为 **全部员工**，则通过本接口可查询到租户内所有用户组的信息，否则，仅会查询到应用通讯录权限范围内的用户组信息。了解应用通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;- 支持查询到普通用户组和动态用户组的信息。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=group&version=v3 document }
             *
             * 创建用户组
             *
             * 调用该接口创建一个用户组。用户组是飞书通讯录中基础实体之一，在用户组内可添加用户或部门资源。各类业务权限管控可以与用户组关联，从而实现高效便捷的成员权限管控。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=contact&resource=group&version=v3 document }
             *
             * 更新用户组
             *
             * 调用该接口更新指定用户组的名称或描述。
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
         * unit
         */
        unit: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=unit&version=v3 document }
             *
             * 获取单位列表
             *
             * 调用该接口获取当前租户内的单位列表。列表内主要包含各单位的 ID、名字、类型信息。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=list_department&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_department&project=contact&resource=unit&version=v3 document }
             *
             * 获取单位绑定的部门列表
             *
             * 调用该接口获取指定单位绑定的部门列表。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=unit&version=v3 document }
             *
             * 获取单位信息
             *
             * 调用该接口获取指定单位的信息，包括单位 ID、名字、类型。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=unit&version=v3 document }
             *
             * 删除单位
             *
             * 调用该接口删除指定单位。
             *
             * ## 注意事项;;如果单位类型被其他业务应用，则不允许直接删除单位。例如，在配置成员的组织架构可见范围时，通过单位类型设置了可见范围，那么该单位类型对应的单位就无法直接删除。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=unbind_department&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind_department&project=contact&resource=unit&version=v3 document }
             *
             * 解除部门与单位的绑定关系
             *
             * 调用该接口解除部门与单位的绑定关系。
             *
             * ## 注意事项;;操作的部门需要在应用的通讯录权限范围内。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=contact&resource=unit&version=v3 document }
             *
             * 修改单位信息
             *
             * 调用该接口修改指定单位的名字。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=bind_department&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=bind_department&project=contact&resource=unit&version=v3 document }
             *
             * 建立部门与单位的绑定关系
             *
             * 调用该接口建立部门与单位的绑定关系。一个部门同时只能绑定一个单位。
             *
             * ## 注意事项;;操作的部门需要在应用的通讯录权限范围内。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;## 使用限制;;- 单个单位可关联的部门数量上限为 1,000。;- 同一个部门只能关联一个单位。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=unit&version=v3 document }
             *
             * 创建单位
             *
             * 调用该接口创建一个单位。
             *
             * ## 前提条件;;单位属于付费功能，企业需要开通对应的飞书版本才可以使用。了解更多，可参见[单位管理](https://www.feishu.cn/hc/zh-CN/articles/333548009177)。;;## 使用限制;;单租户内单位总数上限为 1,000。
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
         * group.member
         */
        groupMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=simplelist&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=simplelist&project=contact&resource=group.member&version=v3 document }
             *
             * 查询用户组成员列表
             *
             * 调用该接口查询指定用户组内的成员列表，列表内主要包括成员 ID 信息。
             *
             * ## 注意事项;;- 本接口支持查询普通用户组和动态用户组的成员信息。;- 本接口支持查询用户组内的用户类型成员或部门类型成员。一次请求中只能查询用户类型成员或者部门类型成员，不支持查询所有类型的用户组成员。;- 如果应用的通讯录权限范围是 **全部员工**，则可以查询当前租户下任何用户组成员列表。如果应用的通讯录权限范围不是 **全部员工**，则仅可查询通讯录权限范围内的用户组成员列表。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=add&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add&project=contact&resource=group.member&version=v3 document }
             *
             * 添加用户组成员
             *
             * 调用该接口向指定的普通用户组内添加成员。
             *
             * ## 注意事项;;- 目前仅支持添加用户类型的成员，暂不支持添加部门类型的成员。;;- 如果应用的通讯录权限范围是 **全部员工**，则可以将当前租户内的任何用户添加到任何用户组当中。如果应用的通讯录权限范围不是 **全部员工**，则所要添加的用户以及对应的用户组，均需要在应用的通讯录权限范围内。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;## 使用限制;;单租户内单个普通用户组的成员数量上限为 100,000，但需要注意，单租户内所有普通用户组的成员数量总和不能超过当前租户成员数量的 10 倍。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=remove&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove&project=contact&resource=group.member&version=v3 document }
             *
             * 移除用户组成员
             *
             * 调用该接口移除指定普通用户组内的某一成员。
             *
             * ## 注意事项;;- 目前仅支持移除用户类型的成员，暂不支持移除部门类型的成员。;;- 如果应用的通讯录权限范围是 **全部员工**，则可以将当前租户内的任何用户移除任何用户组。如果应用的通讯录权限范围不是 **全部员工**，则所要移除的用户以及对应的用户组，均需要在应用的通讯录权限范围内。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=batch_remove&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove&project=contact&resource=group.member&version=v3 document }
             *
             * 批量移除用户组成员
             *
             * 调用该接口从指定普通用户组内移除一个或多个成员。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=batch_add&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_add&project=contact&resource=group.member&version=v3 document }
             *
             * 批量添加用户组成员
             *
             * 调用该接口向指定的普通用户组内添加一个或多个成员。
             *
             * ## 注意事项;;- 目前仅支持添加用户类型的成员，暂不支持添加部门类型的成员。;;- 如果应用的通讯录权限范围是 **全部员工**，则可以将当前租户内的任何用户添加到任何用户组当中。如果应用的通讯录权限范围不是 **全部员工**，则所要添加的用户以及对应的用户组，均需要在应用的通讯录权限范围内。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;## 使用限制;;单租户内单个普通用户组的成员数量上限为 100,000。
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=department&version=v3 document }
             *
             * 删除部门
             *
             * 调用该接口从通讯录中删除指定的部门。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             *
             * 更新部门ID
             *
             * 调用该接口可以更新部门的自定义 ID，即 department_id。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=unbind_department_chat&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind_department_chat&project=contact&resource=department&version=v3 document }
             *
             * 部门群转为普通群
             *
             * 调用该接口将指定部门的部门群转为普通群。
             *
             * ## 注意事项;;应用的通讯录权限范围内需要包含当前操作的部门。了解权限范围，参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=parent&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=parent&project=contact&resource=department&version=v3 document }
             *
             * 获取父部门信息
             *
             * 调用该接口递归获取指定部门的父部门信息，包括部门名称、ID、负责人以及状态等。
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=department&version=v3 document }
             *
             * 获取部门信息列表
             *
             * 该接口用于获取当前部门子部门列表。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
             *
             * 本接口为历史版本接口，不再维护。推荐接口：;;- 查询指定部门的详细信息，可调用[获取单个部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/get)、[批量获取部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/batch)。;- 查询当前部门下子部门信息，可调用[获取子部门列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/children)。;- 查询当前部门的父部门信息，可调用[获取父部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/parent)。;- 通过关键词搜索部门，可调用[搜索部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/search)。;;- 使用 user_access_token 时，返回该用户组织架构可见性范围（[登陆企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内的所有可见部门。当进行递归查询时，只筛查最多1000个部门的可见性。;;- 使用 ; tenant_access_token 则基于应用的通讯录权限范围进行权限校验与过滤。由于 ; parent_department_id 是非必填参数，填与不填存在<b>两种数据权限校验与返回</b>情况：;<br> <br>1、请求设置了 ; parent_department_id 为A（根部门0），会检验A是否在通讯录权限内，若在( parent_department_id=0 时会校验是否为全员权限），则返回部门下子部门列表（根据fetch_child决定是否递归），否则返回无部门通讯录权限错误码。;<br> <br>2、请求未带 ; parent_department_id 参数，如通讯录范围为全员权限，只返回根部门ID(部门ID为0)，否则返回根据通讯录范围配置的部门ID及子部门(根据 ; fetch_child 决定是否递归)。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=children&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=children&project=contact&resource=department&version=v3 document }
             *
             * 获取子部门列表
             *
             * 调用该接口查询指定部门下的子部门列表，列表内包含部门的名称、ID、父部门、负责人以及状态等信息。
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
                                                page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=search&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=contact&resource=department&version=v3 document }
             *
             * 搜索部门
             *
             * 调用该接口以用户身份通过部门名称关键词查询可见部门的信息，包括部门的 ID、父部门、负责人以及状态等。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=contact&resource=department&version=v3 document }
             *
             * 修改部门部分信息
             *
             * 调用该接口更新指定部门的部分信息，包括名称、父部门、排序以及负责人等。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=department&version=v3 document }
             *
             * 更新部门所有信息
             *
             * 调用该接口更新指定部门的信息，包括名称、父部门以及负责人等信息。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=department&version=v3 document }
             *
             * 创建部门
             *
             * 调用该接口在通讯录内创建一个部门。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=batch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch&project=contact&resource=department&version=v3 document }
             *
             * 批量获取部门信息
             *
             * 调用该接口获取一个或多个部门的信息，包括部门名称、ID、父部门、负责人、状态以及成员个数等。
             */
            batch: async (
                payload?: {
                    params: {
                        department_ids: Array<string>;
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=department&version=v3 document }
             *
             * 获取单个部门信息
             *
             * 调用该接口获取单个部门信息，包括部门名称、ID、父部门、负责人、状态以及成员个数等。
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
         * job_level
         */
        jobLevel: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=job_level&version=v3 document }
             *
             * 创建职级
             *
             * 调用该接口创建一个职级。职级是用户属性之一，用于标识用户的职位级别，例如 P1、P2、P3、P4。
             *
             * ## 使用限制;;单租户内职级数量总数上限为 10,000，但需要注意，如果总数超过 4,000，则无法在[管理后台](https://feishu.cn/admin)打开职级列表。
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_level&version=v3 document }
             *
             * 获取租户职级列表
             *
             * 调用该接口获取当前租户下的职级信息，包括职级名称、描述、排序、状态以及多语言等。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             *
             * 更新职级
             *
             * 调用该接口更新指定职级的信息。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             *
             * 删除职级
             *
             * 调用该接口删除指定的职级。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             *
             * 获取单个职级信息
             *
             * 调用该接口获取指定职级的信息，包括职级名称、描述、排序、状态以及多语言等。
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
         * job_family
         */
        jobFamily: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=job_family&version=v3 document }
             *
             * 更新序列
             *
             * 调用该接口更新指定序列的信息。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             *
             * 删除序列
             *
             * 调用该接口删除指定序列。
             *
             * ## 使用限制;;仅支持删除没有子序列的序列。如果序列内存在子序列，则不能直接删除。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=job_family&version=v3 document }
             *
             * 创建序列
             *
             * 调用该接口创建一个序列。序列是用户属性之一，用来定义用户的工作类型，例如产品、研发、运营等。
             *
             * ## 使用限制;;单租户内序列数量总数上限为 10,000，但需要注意，如果总数超过 4,000，则无法在[管理后台](https://feishu.cn/admin)打开序列列表。
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_family&version=v3 document }
             *
             * 获取租户序列列表
             *
             * 调用该接口获取当前租户下的序列信息，包含序列的名称、描述、启用状态以及 ID 等。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             *
             * 获取单个序列信息
             *
             * 调用该接口获取指定序列的信息，包括序列的名称、描述、启用状态以及 ID 等。
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
         * user
         */
        user: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=update_user_id&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_user_id&project=contact&resource=user&version=v3 document }
             *
             * 更新用户ID
             *
             * 调用该接口更新用户的 user_id。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=resurrect&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resurrect&project=contact&resource=user&version=v3 document }
             *
             * 恢复已删除用户
             *
             * 该接口用于恢复已删除用户（已离职的成员）。
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=user&version=v3 document }
             *
             * 获取用户列表
             *
             * 基于部门ID获取部门下直属用户列表。;[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
             *
             * 本接口已为历史版本，不再维护更新，不推荐使用。推荐你使用[获取部门直属用户列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/find_by_department)接口。;;- 使用 user_access_token 情况下根据个人组织架构的通讯录可见范围进行权限过滤，返回个人组织架构通讯录范围（[登陆企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内可见的用户数据。;-  tenant_access_token  基于应用通讯录范围进行权限鉴定。由于 department_id 是非必填参数，填与不填存在<b>两种数据权限校验与返回</b>情况：<br>1、请求设置了 department_id ;（根部门为0），会检验所带部门ID是否具有通讯录权限（如果带上 ; department_id=0 会校验是否有全员权限），有则返回部门下直属的成员列表, 否则提示无部门权限的错误码返回。<br>2、请求未带 ;  department_id 参数，则会返回权限范围内的独立用户（权限范围直接包含了某用户，则该用户视为权限范围内的独立用户）。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=user&version=v3 document }
             *
             * 获取单个用户信息
             *
             * 调用该接口获取通讯录中某一用户的信息，包括用户 ID、名称、邮箱、手机号、状态以及所属部门等信息。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=batch_get_id&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get_id&project=contact&resource=user&version=v3 document }
             *
             * 通过手机号或邮箱获取用户 ID
             *
             * 调用该接口通过手机号或邮箱获取一个或多个用户的 ID （包括 user_id、open_id、union_id）与状态信息。
             *
             * ## 注意事项;;请求后不返回用户 ID 的可能原因：;- 请求头 Authorization 传入的 tenant_access_token 有误。例如，tenant_access_token 对应的应用与实际所需应用不一致。;- 输入的手机号或者邮箱不存在。;- 应用未开通 **获取用户 user ID** API 权限。;- 应用无权限查看用户信息。你需要在应用详情页为应用配置数据权限，具体说明参见[配置应用数据权限](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/configure-app-data-permissions)。;- 使用企业邮箱查询将无法返回用户 ID，必须使用用户的邮箱地址。;- 所查询的用户已离职，如果请求参数 include_resigned 取值为 false，则不会返回离职用户 ID。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=user&version=v3 document }
             *
             * 删除用户
             *
             * 调用该接口从通讯录内删除一个指定用户（该动作可以理解为员工离职），删除时可通过请求参数将用户所有的群组、文档、日程和应用等数据转让至他人。
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
                        anycross_acceptor_user_id?: string;
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=find_by_department&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=find_by_department&project=contact&resource=user&version=v3 document }
             *
             * 获取部门直属用户列表
             *
             * 调用该接口获取指定部门直属的用户信息列表。用户信息包括用户 ID、名称、邮箱、手机号以及状态等信息。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=user&version=v3 document }
             *
             * 更新用户所有信息
             *
             * 该接口用于更新通讯录中用户的字段。
             *
             * 应用需要拥有待更新用户的通讯录授权，如果涉及到用户部门变更，还需要同时拥有变更前、后所有新部门的通讯录授权。;;本接口已为历史版本，不再维护更新，不推荐使用。推荐你使用[修改用户部分信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/patch)接口。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=patch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=contact&resource=user&version=v3 document }
             *
             * 修改用户部分信息
             *
             * 调用该接口更新通讯录中指定用户的信息，包括名称、邮箱、手机号、所属部门以及自定义字段等信息。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=user&version=v3 document }
             *
             * 创建用户
             *
             * 调用该接口向通讯录创建一个用户（该动作可以理解为员工入职）。成功创建用户后，系统会以短信或邮件的形式向用户发送邀请，用户在同意邀请后方可访问企业或团队。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=basic_batch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=basic_batch&project=contact&resource=user&version=v3 document }
             *
             * 获取用户姓名
             *
             * 根据用户 ID 获取用户姓名，仅返回核心信息（姓名），不含扩展字段及敏感信息。
             *
             * 本接口不校验[通讯录授权范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)，将直接根据传入的用户 ID 返回对应基础信息（姓名），不受数据权限范围限制。
             */
            basicBatch: async (
                payload?: {
                    data: { user_ids: Array<string> };
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
                                users?: Array<{
                                    user_id?: string;
                                    name?: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        ja_jp?: string;
                                        en_us?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/contact/v3/users/basic_batch`,
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=batch&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch&project=contact&resource=user&version=v3 document }
             *
             * 批量获取用户信息
             *
             * 调用该接口获取通讯录内一个或多个用户的信息，包括用户 ID、名称、邮箱、手机号、状态以及所属部门等信息。
             */
            batch: async (
                payload?: {
                    params: {
                        user_ids: Array<string>;
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
         * employee_type_enum
         */
        employeeTypeEnum: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=employee_type_enum&version=v3 document }
             *
             * 新增人员类型
             *
             * 调用该接口新增一个自定义的人员类型。人员类型是用户属性之一，用于灵活标记用户的身份类型。
             *
             * ## 使用限制;;自定义的人员类型数量上限为 255，其中创建后又删除的自定义人员类型也会计入数量限制内。
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=employee_type_enum&version=v3 document }
             *
             * 查询人员类型
             *
             * 调用该接口查询当前租户下所有的人员类型信息，包括选项 ID、类型、编号以及内容等。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=delete&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=employee_type_enum&version=v3 document }
             *
             * 删除人员类型
             *
             * 调用该接口删除指定的自定义人员类型。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=update&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=employee_type_enum&version=v3 document }
             *
             * 更新人员类型
             *
             * 调用该接口更新指定的自定义人员类型信息。
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
         * functional_role.member
         */
        functionalRoleMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=functional_role.member&version=v3 document }
             *
             * 查询角色下某个成员的管理范围
             *
             * 调用本接口查询指定角色内的指定成员的管理范围。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             *
             * 删除角色下的成员
             *
             * 调用该接口在指定角色内删除一个或多个成员。
             *
             * ## 注意事项;;待删除的角色成员，需要包含在当前应用的通讯录权限范围内，否则将会操作失败。如何设置通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             *
             * 批量设置角色成员管理范围
             *
             * 调用该接口为指定角色内的一个或多个角色成员设置管理范围。管理范围是指角色成员可以管理的部门范围。
             *
             * ## 注意事项;;当前应用的通讯录权限范围需要包含待操作的用户与部门，否则将会操作失败。如何设置通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=functional_role.member&version=v3 document }
             *
             * 查询角色下的所有成员信息
             *
             * 调用本接口查询指定角色内的所有成员信息，包括成员的用户 ID、管理范围。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=batch_create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=contact&resource=functional_role.member&version=v3 document }
             *
             * 批量添加角色成员
             *
             * 调用该接口在指定角色内添加一个或多个成员。
             *
             * ## 使用限制;;单个角色内成员数量上限为 1000。;;## 注意事项;;待添加到角色的成员，需要包含在当前应用的通讯录权限范围内，否则将会操作失败。如何设置通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
         * functional_role
         */
        functionalRole: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=functional_role&version=v3 document }
             *
             * 创建角色
             *
             * 调用该接口创建一个角色。
             *
             * ## 使用限制;;同一租户下，角色数量上限为 500。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             *
             * 删除角色
             *
             * 调用该接口删除指定角色。
             *
             * ## 注意事项;;角色内如果有成员，则不支持直接删除。你可以调用[查询角色下的所有成员信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/list)接口，查看角色内是否还有成员，如果有，可以调用[删除角色下的成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/batch_delete)接口，将角色成员删除后，再删除角色。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
             *
             * 修改角色名称
             *
             * 调用本接口修改指定角色的角色名称。
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
         * job_title
         */
        jobTitle: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_title&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=job_title&version=v3 document }
             *
             * 获取单个职务信息
             *
             * 调用该接口获取指定职务的信息，包括职务的 ID、名称、多语言名称以及启用状态。
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_title&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_title&version=v3 document }
             *
             * 获取租户职务列表
             *
             * 调用该接口获取当前租户下的职务信息，包括职务的 ID、名称、多语言名称以及启用状态。
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
         * work_city
         */
        workCity: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=work_city&apiName=get&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=work_city&version=v3 document }
             *
             * 获取单个工作城市信息
             *
             * 调用该接口获取指定工作城市的信息，包括工作城市的 ID、名称、多语言名称以及启用状态。
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=work_city&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=work_city&version=v3 document }
             *
             * 获取租户工作城市列表
             *
             * 调用该接口获取当前租户下所有工作城市信息，包括工作城市的 ID、名称、多语言名称以及启用状态。
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
         * scope
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
                                                department_ids?: Array<string>;
                                                user_ids?: Array<string>;
                                                group_ids?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=scope&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=scope&version=v3 document }
             *
             * 获取通讯录授权范围
             *
             * 调用该接口获取当前应用被授权可访问的通讯录范围，包括可访问的部门列表、用户列表和用户组列表。
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
         * custom_attr
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
             * {@link https://open.feishu.cn/api-explorer?project=contact&resource=custom_attr&apiName=list&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=custom_attr&version=v3 document }
             *
             * 获取企业自定义用户字段
             *
             * 调用该接口查询当前企业内自定义用户字段的配置信息。
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        v3: {
            /**
             * group
             */
            group: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=group&version=v3 document }
                 *
                 * 删除用户组
                 *
                 * 调用该接口删除指定用户组。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=member_belong&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_belong&project=contact&resource=group&version=v3 document }
                 *
                 * 查询用户所属用户组
                 *
                 * 调用该接口查询指定用户所属的用户组列表。
                 *
                 * ## 注意事项;;- 如果应用的通讯录权限范围设置为 **全部员工**，则通过本接口可查询到用户所属的全部用户组列表，否则，仅会查询到应用通讯录权限范围内该用户所属的用户组。了解应用通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;- 支持查询到普通用户组和动态用户组的信息。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=group&version=v3 document }
                 *
                 * 查询指定用户组
                 *
                 * 调用该接口通过用户组 ID 查询指定用户组的基本信息，包括用户组名称、成员数量和类型等。
                 *
                 * ## 注意事项;;- 应用的通讯录权限范围需要符合以下任一设置，才可以成功调用本接口。了解应用通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;     - 通讯录权限范围设置为 **全部员工**。;     - 由企业管理员在管理后台设置应用可见范围内包含当前待查询的用户组，然后应用的通讯录权限范围设置为 **与应用的可用范围一致**。;- 支持查询普通用户组和动态用户组。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=simplelist&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=simplelist&project=contact&resource=group&version=v3 document }
                 *
                 * 查询用户组列表
                 *
                 * 调用该接口查询当前租户下的用户组列表，列表内包含用户组的 ID、名字、成员数量和类型等信息。
                 *
                 * ## 注意事项;;- 如果应用的通讯录权限范围设置为 **全部员工**，则通过本接口可查询到租户内所有用户组的信息，否则，仅会查询到应用通讯录权限范围内的用户组信息。了解应用通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;- 支持查询到普通用户组和动态用户组的信息。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=group&version=v3 document }
                 *
                 * 创建用户组
                 *
                 * 调用该接口创建一个用户组。用户组是飞书通讯录中基础实体之一，在用户组内可添加用户或部门资源。各类业务权限管控可以与用户组关联，从而实现高效便捷的成员权限管控。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=contact&resource=group&version=v3 document }
                 *
                 * 更新用户组
                 *
                 * 调用该接口更新指定用户组的名称或描述。
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
             * unit
             */
            unit: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=unit&version=v3 document }
                 *
                 * 获取单位列表
                 *
                 * 调用该接口获取当前租户内的单位列表。列表内主要包含各单位的 ID、名字、类型信息。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=list_department&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_department&project=contact&resource=unit&version=v3 document }
                 *
                 * 获取单位绑定的部门列表
                 *
                 * 调用该接口获取指定单位绑定的部门列表。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=unit&version=v3 document }
                 *
                 * 获取单位信息
                 *
                 * 调用该接口获取指定单位的信息，包括单位 ID、名字、类型。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=unit&version=v3 document }
                 *
                 * 删除单位
                 *
                 * 调用该接口删除指定单位。
                 *
                 * ## 注意事项;;如果单位类型被其他业务应用，则不允许直接删除单位。例如，在配置成员的组织架构可见范围时，通过单位类型设置了可见范围，那么该单位类型对应的单位就无法直接删除。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=unbind_department&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind_department&project=contact&resource=unit&version=v3 document }
                 *
                 * 解除部门与单位的绑定关系
                 *
                 * 调用该接口解除部门与单位的绑定关系。
                 *
                 * ## 注意事项;;操作的部门需要在应用的通讯录权限范围内。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=contact&resource=unit&version=v3 document }
                 *
                 * 修改单位信息
                 *
                 * 调用该接口修改指定单位的名字。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=bind_department&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=bind_department&project=contact&resource=unit&version=v3 document }
                 *
                 * 建立部门与单位的绑定关系
                 *
                 * 调用该接口建立部门与单位的绑定关系。一个部门同时只能绑定一个单位。
                 *
                 * ## 注意事项;;操作的部门需要在应用的通讯录权限范围内。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;## 使用限制;;- 单个单位可关联的部门数量上限为 1,000。;- 同一个部门只能关联一个单位。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=unit&version=v3 document }
                 *
                 * 创建单位
                 *
                 * 调用该接口创建一个单位。
                 *
                 * ## 前提条件;;单位属于付费功能，企业需要开通对应的飞书版本才可以使用。了解更多，可参见[单位管理](https://www.feishu.cn/hc/zh-CN/articles/333548009177)。;;## 使用限制;;单租户内单位总数上限为 1,000。
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
             * group.member
             */
            groupMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=simplelist&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=simplelist&project=contact&resource=group.member&version=v3 document }
                 *
                 * 查询用户组成员列表
                 *
                 * 调用该接口查询指定用户组内的成员列表，列表内主要包括成员 ID 信息。
                 *
                 * ## 注意事项;;- 本接口支持查询普通用户组和动态用户组的成员信息。;- 本接口支持查询用户组内的用户类型成员或部门类型成员。一次请求中只能查询用户类型成员或者部门类型成员，不支持查询所有类型的用户组成员。;- 如果应用的通讯录权限范围是 **全部员工**，则可以查询当前租户下任何用户组成员列表。如果应用的通讯录权限范围不是 **全部员工**，则仅可查询通讯录权限范围内的用户组成员列表。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=add&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add&project=contact&resource=group.member&version=v3 document }
                 *
                 * 添加用户组成员
                 *
                 * 调用该接口向指定的普通用户组内添加成员。
                 *
                 * ## 注意事项;;- 目前仅支持添加用户类型的成员，暂不支持添加部门类型的成员。;;- 如果应用的通讯录权限范围是 **全部员工**，则可以将当前租户内的任何用户添加到任何用户组当中。如果应用的通讯录权限范围不是 **全部员工**，则所要添加的用户以及对应的用户组，均需要在应用的通讯录权限范围内。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;## 使用限制;;单租户内单个普通用户组的成员数量上限为 100,000，但需要注意，单租户内所有普通用户组的成员数量总和不能超过当前租户成员数量的 10 倍。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=remove&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove&project=contact&resource=group.member&version=v3 document }
                 *
                 * 移除用户组成员
                 *
                 * 调用该接口移除指定普通用户组内的某一成员。
                 *
                 * ## 注意事项;;- 目前仅支持移除用户类型的成员，暂不支持移除部门类型的成员。;;- 如果应用的通讯录权限范围是 **全部员工**，则可以将当前租户内的任何用户移除任何用户组。如果应用的通讯录权限范围不是 **全部员工**，则所要移除的用户以及对应的用户组，均需要在应用的通讯录权限范围内。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=batch_remove&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove&project=contact&resource=group.member&version=v3 document }
                 *
                 * 批量移除用户组成员
                 *
                 * 调用该接口从指定普通用户组内移除一个或多个成员。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=batch_add&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_add&project=contact&resource=group.member&version=v3 document }
                 *
                 * 批量添加用户组成员
                 *
                 * 调用该接口向指定的普通用户组内添加一个或多个成员。
                 *
                 * ## 注意事项;;- 目前仅支持添加用户类型的成员，暂不支持添加部门类型的成员。;;- 如果应用的通讯录权限范围是 **全部员工**，则可以将当前租户内的任何用户添加到任何用户组当中。如果应用的通讯录权限范围不是 **全部员工**，则所要添加的用户以及对应的用户组，均需要在应用的通讯录权限范围内。了解通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。;;## 使用限制;;单租户内单个普通用户组的成员数量上限为 100,000。
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=department&version=v3 document }
                 *
                 * 删除部门
                 *
                 * 调用该接口从通讯录中删除指定的部门。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 *
                 * 更新部门ID
                 *
                 * 调用该接口可以更新部门的自定义 ID，即 department_id。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=unbind_department_chat&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind_department_chat&project=contact&resource=department&version=v3 document }
                 *
                 * 部门群转为普通群
                 *
                 * 调用该接口将指定部门的部门群转为普通群。
                 *
                 * ## 注意事项;;应用的通讯录权限范围内需要包含当前操作的部门。了解权限范围，参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=parent&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=parent&project=contact&resource=department&version=v3 document }
                 *
                 * 获取父部门信息
                 *
                 * 调用该接口递归获取指定部门的父部门信息，包括部门名称、ID、负责人以及状态等。
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=department&version=v3 document }
                 *
                 * 获取部门信息列表
                 *
                 * 该接口用于获取当前部门子部门列表。[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
                 *
                 * 本接口为历史版本接口，不再维护。推荐接口：;;- 查询指定部门的详细信息，可调用[获取单个部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/get)、[批量获取部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/batch)。;- 查询当前部门下子部门信息，可调用[获取子部门列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/children)。;- 查询当前部门的父部门信息，可调用[获取父部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/parent)。;- 通过关键词搜索部门，可调用[搜索部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/search)。;;- 使用 user_access_token 时，返回该用户组织架构可见性范围（[登陆企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内的所有可见部门。当进行递归查询时，只筛查最多1000个部门的可见性。;;- 使用 ; tenant_access_token 则基于应用的通讯录权限范围进行权限校验与过滤。由于 ; parent_department_id 是非必填参数，填与不填存在<b>两种数据权限校验与返回</b>情况：;<br> <br>1、请求设置了 ; parent_department_id 为A（根部门0），会检验A是否在通讯录权限内，若在( parent_department_id=0 时会校验是否为全员权限），则返回部门下子部门列表（根据fetch_child决定是否递归），否则返回无部门通讯录权限错误码。;<br> <br>2、请求未带 ; parent_department_id 参数，如通讯录范围为全员权限，只返回根部门ID(部门ID为0)，否则返回根据通讯录范围配置的部门ID及子部门(根据 ; fetch_child 决定是否递归)。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=children&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=children&project=contact&resource=department&version=v3 document }
                 *
                 * 获取子部门列表
                 *
                 * 调用该接口查询指定部门下的子部门列表，列表内包含部门的名称、ID、父部门、负责人以及状态等信息。
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
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=search&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=contact&resource=department&version=v3 document }
                 *
                 * 搜索部门
                 *
                 * 调用该接口以用户身份通过部门名称关键词查询可见部门的信息，包括部门的 ID、父部门、负责人以及状态等。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=contact&resource=department&version=v3 document }
                 *
                 * 修改部门部分信息
                 *
                 * 调用该接口更新指定部门的部分信息，包括名称、父部门、排序以及负责人等。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=department&version=v3 document }
                 *
                 * 更新部门所有信息
                 *
                 * 调用该接口更新指定部门的信息，包括名称、父部门以及负责人等信息。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=department&version=v3 document }
                 *
                 * 创建部门
                 *
                 * 调用该接口在通讯录内创建一个部门。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=batch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch&project=contact&resource=department&version=v3 document }
                 *
                 * 批量获取部门信息
                 *
                 * 调用该接口获取一个或多个部门的信息，包括部门名称、ID、父部门、负责人、状态以及成员个数等。
                 */
                batch: async (
                    payload?: {
                        params: {
                            department_ids: Array<string>;
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=department&version=v3 document }
                 *
                 * 获取单个部门信息
                 *
                 * 调用该接口获取单个部门信息，包括部门名称、ID、父部门、负责人、状态以及成员个数等。
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
             * job_level
             */
            jobLevel: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=job_level&version=v3 document }
                 *
                 * 创建职级
                 *
                 * 调用该接口创建一个职级。职级是用户属性之一，用于标识用户的职位级别，例如 P1、P2、P3、P4。
                 *
                 * ## 使用限制;;单租户内职级数量总数上限为 10,000，但需要注意，如果总数超过 4,000，则无法在[管理后台](https://feishu.cn/admin)打开职级列表。
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_level&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_level&version=v3 document }
                 *
                 * 获取租户职级列表
                 *
                 * 调用该接口获取当前租户下的职级信息，包括职级名称、描述、排序、状态以及多语言等。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 *
                 * 更新职级
                 *
                 * 调用该接口更新指定职级的信息。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 *
                 * 删除职级
                 *
                 * 调用该接口删除指定的职级。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 *
                 * 获取单个职级信息
                 *
                 * 调用该接口获取指定职级的信息，包括职级名称、描述、排序、状态以及多语言等。
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
             * job_family
             */
            jobFamily: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=job_family&version=v3 document }
                 *
                 * 更新序列
                 *
                 * 调用该接口更新指定序列的信息。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 *
                 * 删除序列
                 *
                 * 调用该接口删除指定序列。
                 *
                 * ## 使用限制;;仅支持删除没有子序列的序列。如果序列内存在子序列，则不能直接删除。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=job_family&version=v3 document }
                 *
                 * 创建序列
                 *
                 * 调用该接口创建一个序列。序列是用户属性之一，用来定义用户的工作类型，例如产品、研发、运营等。
                 *
                 * ## 使用限制;;单租户内序列数量总数上限为 10,000，但需要注意，如果总数超过 4,000，则无法在[管理后台](https://feishu.cn/admin)打开序列列表。
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_family&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_family&version=v3 document }
                 *
                 * 获取租户序列列表
                 *
                 * 调用该接口获取当前租户下的序列信息，包含序列的名称、描述、启用状态以及 ID 等。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 *
                 * 获取单个序列信息
                 *
                 * 调用该接口获取指定序列的信息，包括序列的名称、描述、启用状态以及 ID 等。
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
             * user
             */
            user: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=update_user_id&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_user_id&project=contact&resource=user&version=v3 document }
                 *
                 * 更新用户ID
                 *
                 * 调用该接口更新用户的 user_id。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=resurrect&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resurrect&project=contact&resource=user&version=v3 document }
                 *
                 * 恢复已删除用户
                 *
                 * 该接口用于恢复已删除用户（已离职的成员）。
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=user&version=v3 document }
                 *
                 * 获取用户列表
                 *
                 * 基于部门ID获取部门下直属用户列表。;[常见问题答疑](https://open.feishu.cn/document/ugTN1YjL4UTN24CO1UjN/uQzN1YjL0cTN24CN3UjN)。
                 *
                 * 本接口已为历史版本，不再维护更新，不推荐使用。推荐你使用[获取部门直属用户列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/find_by_department)接口。;;- 使用 user_access_token 情况下根据个人组织架构的通讯录可见范围进行权限过滤，返回个人组织架构通讯录范围（[登陆企业管理后台进行权限配置](https://www.feishu.cn/admin/security/permission/visibility)）内可见的用户数据。;-  tenant_access_token  基于应用通讯录范围进行权限鉴定。由于 department_id 是非必填参数，填与不填存在<b>两种数据权限校验与返回</b>情况：<br>1、请求设置了 department_id ;（根部门为0），会检验所带部门ID是否具有通讯录权限（如果带上 ; department_id=0 会校验是否有全员权限），有则返回部门下直属的成员列表, 否则提示无部门权限的错误码返回。<br>2、请求未带 ;  department_id 参数，则会返回权限范围内的独立用户（权限范围直接包含了某用户，则该用户视为权限范围内的独立用户）。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=user&version=v3 document }
                 *
                 * 获取单个用户信息
                 *
                 * 调用该接口获取通讯录中某一用户的信息，包括用户 ID、名称、邮箱、手机号、状态以及所属部门等信息。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=batch_get_id&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get_id&project=contact&resource=user&version=v3 document }
                 *
                 * 通过手机号或邮箱获取用户 ID
                 *
                 * 调用该接口通过手机号或邮箱获取一个或多个用户的 ID （包括 user_id、open_id、union_id）与状态信息。
                 *
                 * ## 注意事项;;请求后不返回用户 ID 的可能原因：;- 请求头 Authorization 传入的 tenant_access_token 有误。例如，tenant_access_token 对应的应用与实际所需应用不一致。;- 输入的手机号或者邮箱不存在。;- 应用未开通 **获取用户 user ID** API 权限。;- 应用无权限查看用户信息。你需要在应用详情页为应用配置数据权限，具体说明参见[配置应用数据权限](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/configure-app-data-permissions)。;- 使用企业邮箱查询将无法返回用户 ID，必须使用用户的邮箱地址。;- 所查询的用户已离职，如果请求参数 include_resigned 取值为 false，则不会返回离职用户 ID。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=user&version=v3 document }
                 *
                 * 删除用户
                 *
                 * 调用该接口从通讯录内删除一个指定用户（该动作可以理解为员工离职），删除时可通过请求参数将用户所有的群组、文档、日程和应用等数据转让至他人。
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
                            anycross_acceptor_user_id?: string;
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=find_by_department&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=find_by_department&project=contact&resource=user&version=v3 document }
                 *
                 * 获取部门直属用户列表
                 *
                 * 调用该接口获取指定部门直属的用户信息列表。用户信息包括用户 ID、名称、邮箱、手机号以及状态等信息。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=user&version=v3 document }
                 *
                 * 更新用户所有信息
                 *
                 * 该接口用于更新通讯录中用户的字段。
                 *
                 * 应用需要拥有待更新用户的通讯录授权，如果涉及到用户部门变更，还需要同时拥有变更前、后所有新部门的通讯录授权。;;本接口已为历史版本，不再维护更新，不推荐使用。推荐你使用[修改用户部分信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/patch)接口。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=patch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=contact&resource=user&version=v3 document }
                 *
                 * 修改用户部分信息
                 *
                 * 调用该接口更新通讯录中指定用户的信息，包括名称、邮箱、手机号、所属部门以及自定义字段等信息。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=user&version=v3 document }
                 *
                 * 创建用户
                 *
                 * 调用该接口向通讯录创建一个用户（该动作可以理解为员工入职）。成功创建用户后，系统会以短信或邮件的形式向用户发送邀请，用户在同意邀请后方可访问企业或团队。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=basic_batch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=basic_batch&project=contact&resource=user&version=v3 document }
                 *
                 * 获取用户姓名
                 *
                 * 根据用户 ID 获取用户姓名，仅返回核心信息（姓名），不含扩展字段及敏感信息。
                 *
                 * 本接口不校验[通讯录授权范围](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)，将直接根据传入的用户 ID 返回对应基础信息（姓名），不受数据权限范围限制。
                 */
                basicBatch: async (
                    payload?: {
                        data: { user_ids: Array<string> };
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
                                    users?: Array<{
                                        user_id?: string;
                                        name?: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/contact/v3/users/basic_batch`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=batch&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch&project=contact&resource=user&version=v3 document }
                 *
                 * 批量获取用户信息
                 *
                 * 调用该接口获取通讯录内一个或多个用户的信息，包括用户 ID、名称、邮箱、手机号、状态以及所属部门等信息。
                 */
                batch: async (
                    payload?: {
                        params: {
                            user_ids: Array<string>;
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
             * employee_type_enum
             */
            employeeTypeEnum: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=employee_type_enum&version=v3 document }
                 *
                 * 新增人员类型
                 *
                 * 调用该接口新增一个自定义的人员类型。人员类型是用户属性之一，用于灵活标记用户的身份类型。
                 *
                 * ## 使用限制;;自定义的人员类型数量上限为 255，其中创建后又删除的自定义人员类型也会计入数量限制内。
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=employee_type_enum&version=v3 document }
                 *
                 * 查询人员类型
                 *
                 * 调用该接口查询当前租户下所有的人员类型信息，包括选项 ID、类型、编号以及内容等。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=contact&resource=employee_type_enum&version=v3 document }
                 *
                 * 删除人员类型
                 *
                 * 调用该接口删除指定的自定义人员类型。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=update&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=contact&resource=employee_type_enum&version=v3 document }
                 *
                 * 更新人员类型
                 *
                 * 调用该接口更新指定的自定义人员类型信息。
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
             * functional_role.member
             */
            functionalRoleMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=functional_role.member&version=v3 document }
                 *
                 * 查询角色下某个成员的管理范围
                 *
                 * 调用本接口查询指定角色内的指定成员的管理范围。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 *
                 * 删除角色下的成员
                 *
                 * 调用该接口在指定角色内删除一个或多个成员。
                 *
                 * ## 注意事项;;待删除的角色成员，需要包含在当前应用的通讯录权限范围内，否则将会操作失败。如何设置通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 *
                 * 批量设置角色成员管理范围
                 *
                 * 调用该接口为指定角色内的一个或多个角色成员设置管理范围。管理范围是指角色成员可以管理的部门范围。
                 *
                 * ## 注意事项;;当前应用的通讯录权限范围需要包含待操作的用户与部门，否则将会操作失败。如何设置通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=functional_role.member&version=v3 document }
                 *
                 * 查询角色下的所有成员信息
                 *
                 * 调用本接口查询指定角色内的所有成员信息，包括成员的用户 ID、管理范围。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role.member&apiName=batch_create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=contact&resource=functional_role.member&version=v3 document }
                 *
                 * 批量添加角色成员
                 *
                 * 调用该接口在指定角色内添加一个或多个成员。
                 *
                 * ## 使用限制;;单个角色内成员数量上限为 1000。;;## 注意事项;;待添加到角色的成员，需要包含在当前应用的通讯录权限范围内，否则将会操作失败。如何设置通讯录权限范围，可参见[权限范围资源介绍](https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM/v3/guides/scope_authority)。
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
             * functional_role
             */
            functionalRole: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=functional_role&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=contact&resource=functional_role&version=v3 document }
                 *
                 * 创建角色
                 *
                 * 调用该接口创建一个角色。
                 *
                 * ## 使用限制;;同一租户下，角色数量上限为 500。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 *
                 * 删除角色
                 *
                 * 调用该接口删除指定角色。
                 *
                 * ## 注意事项;;角色内如果有成员，则不支持直接删除。你可以调用[查询角色下的所有成员信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/list)接口，查看角色内是否还有成员，如果有，可以调用[删除角色下的成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/batch_delete)接口，将角色成员删除后，再删除角色。
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                 *
                 * 修改角色名称
                 *
                 * 调用本接口修改指定角色的角色名称。
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
             * job_title
             */
            jobTitle: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_title&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=job_title&version=v3 document }
                 *
                 * 获取单个职务信息
                 *
                 * 调用该接口获取指定职务的信息，包括职务的 ID、名称、多语言名称以及启用状态。
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=job_title&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=job_title&version=v3 document }
                 *
                 * 获取租户职务列表
                 *
                 * 调用该接口获取当前租户下的职务信息，包括职务的 ID、名称、多语言名称以及启用状态。
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
             * work_city
             */
            workCity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=work_city&apiName=get&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=contact&resource=work_city&version=v3 document }
                 *
                 * 获取单个工作城市信息
                 *
                 * 调用该接口获取指定工作城市的信息，包括工作城市的 ID、名称、多语言名称以及启用状态。
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=work_city&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=work_city&version=v3 document }
                 *
                 * 获取租户工作城市列表
                 *
                 * 调用该接口获取当前租户下所有工作城市信息，包括工作城市的 ID、名称、多语言名称以及启用状态。
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
             * scope
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
                                                    department_ids?: Array<string>;
                                                    user_ids?: Array<string>;
                                                    group_ids?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=scope&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=scope&version=v3 document }
                 *
                 * 获取通讯录授权范围
                 *
                 * 调用该接口获取当前应用被授权可访问的通讯录范围，包括可访问的部门列表、用户列表和用户组列表。
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
             * custom_attr
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
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=custom_attr&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=contact&resource=custom_attr&version=v3 document }
                 *
                 * 获取企业自定义用户字段
                 *
                 * 调用该接口查询当前企业内自定义用户字段的配置信息。
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
