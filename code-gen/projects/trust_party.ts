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
import trust_layer from "./trust_layer";

// auto gen
export default abstract class Client extends trust_layer {
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
    trust_party = {
        v1: {
            /**
             * trust_party_app.visibility
             */
            trustPartyAppVisibility: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=trust_party_app.visibility&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=trust_party&resource=trust_party_app.visibility&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params: {
                            tenant_key: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    visible_user_ids?: Array<string>;
                                    visible_department_ids?: Array<string>;
                                    is_all?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/trust_party_apps/:app_id/visibility`,
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
             * trust_party_app.to_tenants
             */
            trustPartyAppToTenants: {
                listWithIterator: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { app_id: string };
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
                                    `${this.domain}/open-apis/trust_party/v1/trust_party_apps/:app_id/to_tenants`,
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
                                                    tenant_keys?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=trust_party_app.to_tenants&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=trust_party&resource=trust_party_app.to_tenants&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { app_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    tenant_keys?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/trust_party_apps/:app_id/to_tenants`,
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
             * trust_party_chat
             */
            trustPartyChat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=trust_party_chat&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=trust_party&resource=trust_party_chat&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        path?: { chat_id?: string };
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
                                `${this.domain}/open-apis/trust_party/v1/trust_party_chats/:chat_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=trust_party_chat&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=trust_party&resource=trust_party_chat&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            avatar?: string;
                            name?: string;
                            description?: string;
                            i18n_names?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            owner_id?: string;
                            user_id_list?: Array<string>;
                            bot_id_list?: Array<string>;
                            group_message_type?: "chat" | "thread";
                            chat_mode?: "group";
                            toolkit_ids?: Array<string>;
                            restricted_mode_setting?: {
                                status?: boolean;
                                screenshot_has_permission_setting?:
                                    | "all_members"
                                    | "not_anyone";
                                download_has_permission_setting?:
                                    | "all_members"
                                    | "not_anyone";
                                message_has_permission_setting?:
                                    | "all_members"
                                    | "not_anyone";
                            };
                            join_message_visibility?:
                                | "only_owner"
                                | "all_members"
                                | "not_anyone";
                            leave_message_visibility?:
                                | "only_owner"
                                | "all_members"
                                | "not_anyone";
                            membership_approval?:
                                | "no_approval_required"
                                | "approval_required";
                        };
                        params?: {
                            user_id_type?: "union_id" | "open_id";
                            set_bot_manager?: boolean;
                            uuid?: string;
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
                                    chat_id?: string;
                                    avatar?: string;
                                    name?: string;
                                    description?: string;
                                    i18n_names?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    owner_id?: string;
                                    owner_id_type?: string;
                                    chat_mode?: string;
                                    chat_type?: string;
                                    chat_tag?: string;
                                    external?: boolean;
                                    tenant_key?: string;
                                    toolkit_ids?: Array<string>;
                                    restricted_mode_setting?: {
                                        status?: boolean;
                                        screenshot_has_permission_setting?:
                                            | "all_members"
                                            | "not_anyone";
                                        download_has_permission_setting?:
                                            | "all_members"
                                            | "not_anyone";
                                        message_has_permission_setting?:
                                            | "all_members"
                                            | "not_anyone";
                                    };
                                    add_member_permission?: string;
                                    share_card_permission?: string;
                                    at_all_permission?: string;
                                    edit_permission?: string;
                                    group_message_type?: string;
                                    join_message_visibility?: string;
                                    leave_message_visibility?: string;
                                    membership_approval?: string;
                                    moderation_permission?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/trust_party_chats`,
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
             * collaboration_tenant.collaboration_user
             */
            collaborationTenantCollaborationUser: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=collaboration_tenant.collaboration_user&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=trust_party&resource=collaboration_tenant.collaboration_user&version=v1 document }
                 *
                 * 获取关联组织成员详情
                 *
                 * 获取关联组织成员详情，需要对关联组织成员有权限才可以获取。
                 *
                 * ## 提示;使用 user_access_token 时，按照 admin 管理后台关联组织列表中针对用户设置的可见性规则进行校验，使用 tenant_access_token 时，按照应用互通界面中针对应用设置的可见性规则进行校验。
                 */
                get: async (
                    payload?: {
                        params?: {
                            target_user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id";
                        };
                        path: {
                            target_tenant_key: string;
                            target_user_id: string;
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
                                    target_user: {
                                        open_id?: string;
                                        user_id?: string;
                                        union_id?: string;
                                        name: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        mobile?: string;
                                        status?: {
                                            is_frozen?: boolean;
                                            is_resigned?: boolean;
                                            is_activated?: boolean;
                                            is_exited?: boolean;
                                            is_unjoin?: boolean;
                                        };
                                        department_ids?: Array<string>;
                                        leader_user_id?: string;
                                        job_title?: string;
                                        custom_attrs?: Array<{
                                            type?: string;
                                            id?: string;
                                            value?: {
                                                text?: string;
                                                url?: string;
                                                pc_url?: string;
                                                option_value?: string;
                                                picture_url?: string;
                                                name?: string;
                                                generic_user?: {
                                                    id: string;
                                                    type: number;
                                                };
                                            };
                                        }>;
                                        employee_no?: string;
                                        parent_department_ids?: Array<{
                                            department_id?: string;
                                            open_department_id?: string;
                                        }>;
                                        leader_id?: {
                                            user_id?: string;
                                            open_id?: string;
                                            union_id?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/collaboration_tenants/:target_tenant_key/collaboration_users/:target_user_id`,
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
             * collaboration_tenant.collaboration_department
             */
            collaborationTenantCollaborationDepartment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=collaboration_tenant.collaboration_department&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=trust_party&resource=collaboration_tenant.collaboration_department&version=v1 document }
                 *
                 * 获取关联组织部门详情
                 *
                 * 获取对方的关联组织部门详情，需要对部门有可见性权限才可以获取。;
                 *
                 * ## 提示;使用 user_access_token 时，按照 admin 管理后台关联组织列表中针对用户设置的可见性规则进行校验，使用 tenant_access_token 时，按照应用互通界面中针对应用设置的可见性规则进行校验。
                 */
                get: async (
                    payload?: {
                        params?: {
                            target_department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: {
                            target_tenant_key: string;
                            target_department_id: string;
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
                                    target_department: {
                                        open_department_id?: string;
                                        department_id?: string;
                                        name?: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        order?: string;
                                        leaders?: Array<{
                                            leader_type: number;
                                            id: {
                                                user_id?: string;
                                                open_id?: string;
                                                union_id?: string;
                                            };
                                        }>;
                                        parent_department_id?: {
                                            department_id?: string;
                                            open_department_id?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/collaboration_tenants/:target_tenant_key/collaboration_departments/:target_department_id`,
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
             * collaboration_tenant
             */
            collaborationTenant: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=collaboration_tenant&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=trust_party&resource=collaboration_tenant&version=v1 document }
                 *
                 * 获取关联组织详情
                 *
                 * 基于组织tenant key获取关联组织详情，需要对对方组织有可见权限才可以获取。
                 *
                 * ## 提示;使用 user_access_token 时，按照 admin 管理后台关联组织列表中针对用户设置的可见性规则进行校验，使用 tenant_access_token 时，按照应用互通界面中针对应用设置的可见性规则进行校验。
                 */
                get: async (
                    payload?: {
                        path: { target_tenant_key: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    target_tenant?: {
                                        tenant_key?: string;
                                        tenant_name?: string;
                                        i18n_tenant_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        tenant_short_name?: string;
                                        i18n_tenant_short_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        connect_time?: number;
                                        tenant_tag?: string;
                                        i18n_tenant_tag?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        brand?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/collaboration_tenants/:target_tenant_key`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=collaboration_tenant&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=trust_party&resource=collaboration_tenant&version=v1 document }
                 *
                 * 获取可见关联组织的列表
                 *
                 * 分页获取用户可见的关联列表。
                 *
                 * ## 提示;;使用 user_access_token 时，按照 admin 管理后台关联组织列表中针对用户设置的可见性规则进行校验，使用 tenant_access_token 时，按照应用互通界面中针对应用设置的可见性规则进行校验。
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
                                    target_tenant_list?: Array<{
                                        tenant_key?: string;
                                        tenant_name?: string;
                                        i18n_tenant_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        tenant_short_name?: string;
                                        i18n_tenant_short_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        connect_time?: number;
                                        tenant_tag?: string;
                                        i18n_tenant_tag?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        brand?: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/collaboration_tenants`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=collaboration_tenant&apiName=visible_organization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=visible_organization&project=trust_party&resource=collaboration_tenant&version=v1 document }
                 *
                 * 获取关联组织的成员信息
                 *
                 * 该接口会返回用户在外部部门下可见的下级部门、用户、用户组。
                 *
                 * ## 提示;;使用 user_access_token 时，按照 admin 管理后台关联组织列表中针对用户设置的可见性规则进行校验；使用 tenant_access_token 时，按照应用互通界面中针对应用设置的可见性规则进行校验。
                 */
                visibleOrganization: async (
                    payload?: {
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            target_department_id?: string;
                            page_token?: string;
                            page_size?: number;
                            group_id_type?: "group_id" | "open_group_id";
                            target_group_id?: string;
                        };
                        path: { target_tenant_key: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    collaboration_entity_list?: Array<{
                                        collaboration_entity_type:
                                            | "user"
                                            | "department"
                                            | "group";
                                        department_id?: string;
                                        open_department_id?: string;
                                        user_id?: string;
                                        open_user_id?: string;
                                        union_user_id?: string;
                                        department_name?: string;
                                        i18n_department_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        department_order?: string;
                                        user_name?: string;
                                        i18n_user_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                        user_avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        group_id?: string;
                                        open_group_id?: string;
                                        group_name?: string;
                                        i18n_group_name?: {
                                            zh_cn?: string;
                                            ja_jp?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/collaboration_tenants/:target_tenant_key/visible_organization`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=collaboration_tenant&apiName=proposal&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=proposal&project=trust_party&resource=collaboration_tenant&version=v1 document }
                 */
                proposal: async (
                    payload?: {
                        data: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            target_tenant_key: string;
                            is_share_all_organization: boolean;
                            share_users?: Array<string>;
                            share_departments?: Array<string>;
                            visibility_setting?: number;
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
                                `${this.domain}/open-apis/trust_party/v1/collaboration_tenants/proposal`,
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
             * trust_party_app.visibility.shared_visibility
             */
            trustPartyAppVisibilitySharedVisibility: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=trust_party_app.visibility.shared_visibility&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=trust_party&resource=trust_party_app.visibility.shared_visibility&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params: {
                            user_id?: string;
                            department_id?: string;
                            tenant_key: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { app_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    is_visible?: boolean;
                                    user_id?: string;
                                    type?: "user" | "department";
                                    department_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/trust_party_apps/:app_id/visibility/shared_visibility`,
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
             * trust_party_chat.member
             */
            trustPartyChatMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=trust_party_chat.member&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=trust_party&resource=trust_party_chat.member&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: { id_list?: Array<string> };
                        params?: {
                            member_id_type?: "union_id" | "open_id" | "app_id";
                            succeed_type?: number;
                        };
                        path?: { chat_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    invalid_id_list?: Array<{
                                        id: string;
                                        msg?: string;
                                    }>;
                                    pending_approval_id_list?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/trust_party_chats/:chat_id/members`,
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
             * trust_party_message
             */
            trustPartyMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=trust_party_message&apiName=reply&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reply&project=trust_party&resource=trust_party_message&version=v1 document }
                 */
                reply: async (
                    payload?: {
                        data: {
                            content: string;
                            msg_type: string;
                            reply_in_thread?: boolean;
                            uuid?: string;
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
                                    message_id?: string;
                                    root_id?: string;
                                    parent_id?: string;
                                    thread_id?: string;
                                    msg_type?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    deleted?: boolean;
                                    updated?: boolean;
                                    chat_id?: string;
                                    sender?: {
                                        id: string;
                                        id_type: string;
                                        sender_type: string;
                                        tenant_key?: string;
                                    };
                                    body?: { content: string };
                                    mentions?: Array<{
                                        key: string;
                                        id: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/trust_party_messages/:message_id/reply`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=trust_party&resource=trust_party_message&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=trust_party&resource=trust_party_message&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            receive_id: string;
                            msg_type: string;
                            content: string;
                            uuid?: string;
                        };
                        params: {
                            receive_id_type:
                                | "open_id"
                                | "user_id"
                                | "union_id"
                                | "email"
                                | "chat_id";
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
                                    message_id?: string;
                                    root_id?: string;
                                    parent_id?: string;
                                    thread_id?: string;
                                    msg_type?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    deleted?: boolean;
                                    updated?: boolean;
                                    chat_id?: string;
                                    sender?: {
                                        id: string;
                                        id_type: string;
                                        sender_type: string;
                                        tenant_key?: string;
                                    };
                                    body?: { content: string };
                                    mentions?: Array<{
                                        key: string;
                                        id: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/trust_party/v1/trust_party_messages`,
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
