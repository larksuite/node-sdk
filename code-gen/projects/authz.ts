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
import authen from "./authen";

// auto gen
export default abstract class Client extends authen {
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
    authz = {
        v1: {
            /**
             * group.batch_member
             */
            groupBatchMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=group.batch_member&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=authz&resource=group.batch_member&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        data: {
                            members: Array<{
                                member_id: string;
                                member_id_type: string;
                                member_type: string;
                            }>;
                        };
                        path: { open_group_id: string };
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
                                `${this.domain}/open-apis/authz/v1/groups/:open_group_id/batch_member`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=group.batch_member&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authz&resource=group.batch_member&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            members: Array<{
                                member_id: string;
                                member_id_type: string;
                                member_type: string;
                            }>;
                        };
                        path: { open_group_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    batch_members: Array<{
                                        member_id: string;
                                        code: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/groups/:open_group_id/batch_member`,
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
             * group
             */
            group: {
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
                                    `${this.domain}/open-apis/authz/v1/groups`,
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
                                                    groups: Array<{
                                                        open_group_id: string;
                                                        name: string;
                                                        description?: string;
                                                        member_user_count?: number;
                                                        member_department_count?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=group&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authz&resource=group&version=v1 document }
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
                                    groups: Array<{
                                        open_group_id: string;
                                        name: string;
                                        description?: string;
                                        member_user_count?: number;
                                        member_department_count?: number;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/groups`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=group&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=authz&resource=group&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        path: { open_group_id: string };
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
                                `${this.domain}/open-apis/authz/v1/groups/:open_group_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=group&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authz&resource=group&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            open_group_id?: string;
                            name: string;
                            description?: string;
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
                                data?: { open_group_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/groups`,
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type: "open_id" | "union_id" | "user_id";
                            department_id_type:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { open_group_id: string };
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
                                    `${this.domain}/open-apis/authz/v1/groups/:open_group_id/members`,
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
                                                    members: Array<{
                                                        member_id: string;
                                                        member_id_type: string;
                                                        member_type: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=group.member&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authz&resource=group.member&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type: "open_id" | "union_id" | "user_id";
                            department_id_type:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { open_group_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    members: Array<{
                                        member_id: string;
                                        member_id_type: string;
                                        member_type: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/groups/:open_group_id/members`,
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
             * org_visible
             */
            orgVisible: {
                permissionWithIterator: async (
                    payload?: {
                        params: {
                            rule_type: number;
                            assist_rule_type?: number;
                            page_size?: number;
                            page_token?: string;
                            user_id_type: "user_id" | "union_id" | "open_id";
                            department_id_type:
                                | "department_id"
                                | "open_department_id";
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
                                    `${this.domain}/open-apis/authz/v1/org_visible/permission`,
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
                                                    visible_permission?: {
                                                        main_rule?: {
                                                            main_rule_type: number;
                                                            units?: Array<string>;
                                                            dept_leader_visible_the_dept?: boolean;
                                                        };
                                                        assist_rules?: Array<{
                                                            rule_id?: string;
                                                            assist_rule_type?: number;
                                                            subjects?: Array<{
                                                                id: string;
                                                                entity_type: number;
                                                                entity_id_type: string;
                                                            }>;
                                                            effect?: number;
                                                            objects?: Array<{
                                                                id?: string;
                                                                entity_type: number;
                                                                user_id_type?:
                                                                    | "user_id"
                                                                    | "union_id"
                                                                    | "open_id";
                                                                department_id_type?:
                                                                    | "department_id"
                                                                    | "open_department_id";
                                                            }>;
                                                            match_condition?: number;
                                                        }>;
                                                    };
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=org_visible&apiName=permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=permission&project=authz&resource=org_visible&version=v1 document }
                 */
                permission: async (
                    payload?: {
                        params: {
                            rule_type: number;
                            assist_rule_type?: number;
                            page_size?: number;
                            page_token?: string;
                            user_id_type: "user_id" | "union_id" | "open_id";
                            department_id_type:
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    visible_permission?: {
                                        main_rule?: {
                                            main_rule_type: number;
                                            units?: Array<string>;
                                            dept_leader_visible_the_dept?: boolean;
                                        };
                                        assist_rules?: Array<{
                                            rule_id?: string;
                                            assist_rule_type?: number;
                                            subjects?: Array<{
                                                id: string;
                                                entity_type: number;
                                                entity_id_type: string;
                                            }>;
                                            effect?: number;
                                            objects?: Array<{
                                                id?: string;
                                                entity_type: number;
                                                user_id_type?:
                                                    | "user_id"
                                                    | "union_id"
                                                    | "open_id";
                                                department_id_type?:
                                                    | "department_id"
                                                    | "open_department_id";
                                            }>;
                                            match_condition?: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/org_visible/permission`,
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
             * org_visible.permission
             */
            orgVisiblePermission: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=org_visible.permission&apiName=save&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=save&project=authz&resource=org_visible.permission&version=v1 document }
                 */
                save: async (
                    payload?: {
                        data?: {
                            save_visible_permission_request?: {
                                save_main_rule?: {
                                    main_rule_type: number;
                                    units?: Array<string>;
                                    dept_leader_visible_the_dept?: boolean;
                                };
                                assist_rule_type?: number;
                                delete_assist_rule_ids?: Array<string>;
                                add_assist_rules?: Array<{
                                    assist_rule_type: number;
                                    subjects: Array<{
                                        id: string;
                                        entity_type: number;
                                        entity_id_type: string;
                                    }>;
                                    effect: number;
                                    objects: Array<{
                                        id?: string;
                                        entity_type: number;
                                        user_id_type?:
                                            | "user_id"
                                            | "union_id"
                                            | "open_id";
                                        department_id_type?:
                                            | "department_id"
                                            | "open_department_id";
                                    }>;
                                    match_condition?: number;
                                }>;
                                update_assist_rules?: Array<{
                                    rule_id: string;
                                    assist_rule_type?: number;
                                    subjects?: Array<{
                                        id: string;
                                        entity_type: number;
                                        entity_id_type: string;
                                    }>;
                                    effect?: number;
                                    objects?: Array<{
                                        id?: string;
                                        entity_type: number;
                                        user_id_type?:
                                            | "user_id"
                                            | "union_id"
                                            | "open_id";
                                        department_id_type?:
                                            | "department_id"
                                            | "open_department_id";
                                    }>;
                                    match_condition?: number;
                                }>;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: { added_rule_ids?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/org_visible/permission/save`,
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
             * audit_control.rule
             */
            auditControlRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=audit_control.rule&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=authz&resource=audit_control.rule&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        path: { rule_id: string };
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
                                `${this.domain}/open-apis/authz/v1/audit_control/rules/:rule_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=audit_control.rule&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authz&resource=audit_control.rule&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            audit_control_rules: Array<{
                                subject_list: Array<{
                                    id: string;
                                    entity_type: number;
                                    entity_id_type: string;
                                }>;
                                object: {
                                    id: string;
                                    entity_type:
                                        | "file"
                                        | "doc"
                                        | "docx"
                                        | "sheet"
                                        | "bitable"
                                        | "mindnote"
                                        | "slides";
                                };
                                action:
                                    | "preview"
                                    | "edit"
                                    | "copy"
                                    | "comment"
                                    | "duplicate";
                                effect: number;
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
                                data?: { rule_ids?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/audit_control/rules`,
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
                        params: {
                            page_size?: number;
                            page_token?: string;
                            object_id: string;
                            object_type:
                                | "file"
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "bitable"
                                | "mindnote"
                                | "slides";
                            user_id_type: "user_id" | "union_id" | "open_id";
                            department_id_type:
                                | "department_id"
                                | "open_department_id";
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
                                    `${this.domain}/open-apis/authz/v1/audit_control/rules`,
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
                                                    rules?: Array<{
                                                        subject_list: Array<{
                                                            id: string;
                                                            entity_type: number;
                                                            entity_id_type: string;
                                                        }>;
                                                        object: {
                                                            id: string;
                                                            entity_type:
                                                                | "file"
                                                                | "doc"
                                                                | "docx"
                                                                | "sheet"
                                                                | "bitable"
                                                                | "mindnote"
                                                                | "slides";
                                                        };
                                                        action:
                                                            | "preview"
                                                            | "edit"
                                                            | "copy"
                                                            | "comment"
                                                            | "duplicate";
                                                        effect: number;
                                                        rule_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=audit_control.rule&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authz&resource=audit_control.rule&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            object_id: string;
                            object_type:
                                | "file"
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "bitable"
                                | "mindnote"
                                | "slides";
                            user_id_type: "user_id" | "union_id" | "open_id";
                            department_id_type:
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
                                    rules?: Array<{
                                        subject_list: Array<{
                                            id: string;
                                            entity_type: number;
                                            entity_id_type: string;
                                        }>;
                                        object: {
                                            id: string;
                                            entity_type:
                                                | "file"
                                                | "doc"
                                                | "docx"
                                                | "sheet"
                                                | "bitable"
                                                | "mindnote"
                                                | "slides";
                                        };
                                        action:
                                            | "preview"
                                            | "edit"
                                            | "copy"
                                            | "comment"
                                            | "duplicate";
                                        effect: number;
                                        rule_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/audit_control/rules`,
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
             * audit_task
             */
            auditTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=audit_task&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authz&resource=audit_task&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            user_ids: Array<string>;
                            user_id_type: "open_id" | "union_id" | "user_id";
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
                                data?: { task_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/audit_task`,
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
             * audit_task.audit_task_record
             */
            auditTaskAuditTaskRecord: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type: "open_id" | "union_id" | "user_id";
                            task_id: string;
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
                                    `${this.domain}/open-apis/authz/v1/audit_task/records`,
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
                                                        user_id: string;
                                                        resourse_id: string;
                                                        resource_type:
                                                            | "unknown"
                                                            | "doc"
                                                            | "docx"
                                                            | "sheet"
                                                            | "mindnote"
                                                            | "bitable"
                                                            | "file"
                                                            | "slides"
                                                            | "minutes";
                                                        resource_permission:
                                                            | "unknown"
                                                            | "owner"
                                                            | "full_access"
                                                            | "edit"
                                                            | "view";
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=audit_task.audit_task_record&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authz&resource=audit_task.audit_task_record&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type: "open_id" | "union_id" | "user_id";
                            task_id: string;
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
                                        user_id: string;
                                        resourse_id: string;
                                        resource_type:
                                            | "unknown"
                                            | "doc"
                                            | "docx"
                                            | "sheet"
                                            | "mindnote"
                                            | "bitable"
                                            | "file"
                                            | "slides"
                                            | "minutes";
                                        resource_permission:
                                            | "unknown"
                                            | "owner"
                                            | "full_access"
                                            | "edit"
                                            | "view";
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/audit_task/records`,
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
             * communication.permission
             */
            communicationPermission: {
                queryWithIterator: async (
                    payload?: {
                        params: {
                            rule_type: number;
                            assist_rule_type?: number;
                            page_size?: number;
                            page_token?: string;
                            user_id_type: "user_id" | "union_id" | "open_id";
                            department_id_type:
                                | "department_id"
                                | "open_department_id";
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
                                    `${this.domain}/open-apis/authz/v1/communication/permission/query`,
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
                                                    communication_permission?: {
                                                        main_rule?: {
                                                            main_rule_type: number;
                                                        };
                                                        assist_rules?: Array<{
                                                            rule_id?: string;
                                                            assist_rule_type: number;
                                                            subjects: Array<{
                                                                id: string;
                                                                entity_type: number;
                                                                entity_id_type: string;
                                                            }>;
                                                            effect: number;
                                                            action_types: Array<number>;
                                                            objects: Array<{
                                                                id: string;
                                                                entity_type: number;
                                                                entity_id_type: string;
                                                            }>;
                                                            match_condition?: number;
                                                        }>;
                                                    };
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=communication.permission&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=authz&resource=communication.permission&version=v1 document }
                 *
                 * 查询规则
                 *
                 * 查询沟通协作权限规则
                 */
                query: async (
                    payload?: {
                        params: {
                            rule_type: number;
                            assist_rule_type?: number;
                            page_size?: number;
                            page_token?: string;
                            user_id_type: "user_id" | "union_id" | "open_id";
                            department_id_type:
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    communication_permission?: {
                                        main_rule?: { main_rule_type: number };
                                        assist_rules?: Array<{
                                            rule_id?: string;
                                            assist_rule_type: number;
                                            subjects: Array<{
                                                id: string;
                                                entity_type: number;
                                                entity_id_type: string;
                                            }>;
                                            effect: number;
                                            action_types: Array<number>;
                                            objects: Array<{
                                                id: string;
                                                entity_type: number;
                                                entity_id_type: string;
                                            }>;
                                            match_condition?: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/communication/permission/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=communication.permission&apiName=save&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=save&project=authz&resource=communication.permission&version=v1 document }
                 *
                 * 保存规则
                 *
                 * 保存沟通协作的权限规则，支持主规则/补充规则
                 */
                save: async (
                    payload?: {
                        data?: {
                            save_communication_permission_request?: {
                                save_main_rule?: { main_rule_type: number };
                                assist_rule_type?: number;
                                delete_assist_rule_ids?: Array<string>;
                                add_assist_rules?: Array<{
                                    assist_rule_type: number;
                                    subjects: Array<{
                                        id: string;
                                        entity_type: number;
                                        entity_id_type: string;
                                    }>;
                                    effect: number;
                                    action_types: Array<number>;
                                    objects: Array<{
                                        id: string;
                                        entity_type: number;
                                        entity_id_type: string;
                                    }>;
                                    match_condition?: number;
                                }>;
                                update_assist_rules?: Array<{
                                    rule_id: string;
                                    assist_rule_type?: number;
                                    subjects?: Array<{
                                        id: string;
                                        entity_type: number;
                                        entity_id_type: string;
                                    }>;
                                    effect?: number;
                                    action_types: Array<number>;
                                    objects?: Array<{
                                        id: string;
                                        entity_type: number;
                                        entity_id_type: string;
                                    }>;
                                    match_condition?: number;
                                }>;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: { added_rule_ids?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/communication/permission/save`,
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
             * target_tenant.cross_organization_view_search_rule
             */
            targetTenantCrossOrganizationViewSearchRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=target_tenant.cross_organization_view_search_rule&apiName=save&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=save&project=authz&resource=target_tenant.cross_organization_view_search_rule&version=v1 document }
                 *
                 * 批量变更规则
                 *
                 * 批量变更跨组织可见可搜规则
                 */
                save: async (
                    payload?: {
                        data?: {
                            save_b2b_visible_rule_request?: {
                                delete_rule_ids?: Array<string>;
                                add_rules?: Array<{
                                    subjects: Array<{
                                        id: string;
                                        entity_type: number;
                                        entity_id_type: string;
                                    }>;
                                    objects: Array<{
                                        id: string;
                                        entity_type: number;
                                        entity_id_type: string;
                                    }>;
                                }>;
                                update_rules?: Array<{
                                    rule_id: string;
                                    subjects?: Array<{
                                        id: string;
                                        entity_type: number;
                                        entity_id_type: string;
                                    }>;
                                    objects?: Array<{
                                        id: string;
                                        entity_type: number;
                                        entity_id_type: string;
                                    }>;
                                }>;
                            };
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
                                data?: { added_rule_ids?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/target_tenants/:target_tenant_key/cross_organization_view_search_rules/save`,
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
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type: "open_id" | "union_id" | "user_id";
                            department_id_type:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { target_tenant_key: string };
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
                                    `${this.domain}/open-apis/authz/v1/target_tenants/:target_tenant_key/cross_organization_view_search_rules`,
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
                                                        rule_id?: string;
                                                        subjects?: Array<{
                                                            id: string;
                                                            entity_type: number;
                                                            entity_id_type: string;
                                                        }>;
                                                        objects?: Array<{
                                                            id: string;
                                                            entity_type: number;
                                                            entity_id_type: string;
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=authz&resource=target_tenant.cross_organization_view_search_rule&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authz&resource=target_tenant.cross_organization_view_search_rule&version=v1 document }
                 *
                 * 查询规则列表
                 *
                 * 查询关联组织可见可搜规则列表
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type: "open_id" | "union_id" | "user_id";
                            department_id_type:
                                | "department_id"
                                | "open_department_id";
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        rule_id?: string;
                                        subjects?: Array<{
                                            id: string;
                                            entity_type: number;
                                            entity_id_type: string;
                                        }>;
                                        objects?: Array<{
                                            id: string;
                                            entity_type: number;
                                            entity_id_type: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authz/v1/target_tenants/:target_tenant_key/cross_organization_view_search_rules`,
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
