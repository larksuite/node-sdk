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
import verification from "./verification";

// auto gen
export default abstract class Client extends verification {
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
     * 云文档-知识库
     */
    wiki = {
        space: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/create document }
             *
             * 创建知识空间
             *
             * 此接口用于创建知识空间
             *
             * 此接口不支持tenant access token（应用身份访问）
             */
            create: async (
                payload?: {
                    data?: {
                        name?: string;
                        description?: string;
                        open_sharing?: "open" | "closed";
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
                                space?: {
                                    name?: string;
                                    description?: string;
                                    space_id?: string;
                                    space_type?:
                                        | "team"
                                        | "person"
                                        | "my_library";
                                    visibility?: "public" | "private";
                                    open_sharing?: "open" | "closed";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces`,
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
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=get&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get document }
             *
             * 获取知识空间信息
             *
             * 此接口用于根据知识空间ID来查询知识空间的信息。;;空间类型（type）：;- 个人空间：归个人管理。一人仅可拥有一个个人空间，无法添加其他管理员。;- 团队空间：归团队（多人)管理，可添加多个管理员。;;空间可见性（visibility）：;- 公开空间：租户所有用户可见，默认为成员权限。无法额外添加成员，但可以添加管理员。;- 私有空间：仅对知识空间管理员、成员可见，需要手动添加管理员、成员。
             *
             * 本接口要求知识库权限：;- 需要为知识空间成员（管理员）
             */
            get: async (
                payload?: {
                    params?: {
                        lang?:
                            | "zh"
                            | "id"
                            | "de"
                            | "en"
                            | "es"
                            | "fr"
                            | "it"
                            | "pt"
                            | "vi"
                            | "ru"
                            | "hi"
                            | "th"
                            | "ko"
                            | "ja"
                            | "zh-HK"
                            | "zh-TW";
                    };
                    path?: { space_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                space?: {
                                    name?: string;
                                    description?: string;
                                    space_id?: string;
                                    space_type?:
                                        | "team"
                                        | "person"
                                        | "my_library";
                                    visibility?: "public" | "private";
                                    open_sharing?: "open" | "closed";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=get_node&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get_node document }
             *
             * 获取知识空间节点信息
             *
             * 获取知识空间节点信息
             *
             * 知识库权限要求，当前使用的 access token 所代表的应用或用户拥有：;- 节点阅读权限
             */
            getNode: async (
                payload?: {
                    params: {
                        token: string;
                        obj_type?:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "mindnote"
                            | "bitable"
                            | "file"
                            | "slides"
                            | "wiki";
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
                                node?: {
                                    space_id?: string;
                                    node_token?: string;
                                    obj_token?: string;
                                    obj_type:
                                        | "doc"
                                        | "sheet"
                                        | "mindnote"
                                        | "bitable"
                                        | "file"
                                        | "docx"
                                        | "slides";
                                    parent_node_token?: string;
                                    node_type: "origin" | "shortcut";
                                    origin_node_token?: string;
                                    origin_space_id?: string;
                                    has_child?: boolean;
                                    title?: string;
                                    obj_create_time?: string;
                                    obj_edit_time?: string;
                                    node_create_time?: string;
                                    creator?: string;
                                    owner?: string;
                                    node_creator?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/get_node`,
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
                                `${this.domain}/open-apis/wiki/v2/spaces`,
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
                                                    space_id?: string;
                                                    space_type?:
                                                        | "team"
                                                        | "person"
                                                        | "my_library";
                                                    visibility?:
                                                        | "public"
                                                        | "private";
                                                    open_sharing?:
                                                        | "open"
                                                        | "closed";
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
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=list&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/list document }
             *
             * 获取知识空间列表
             *
             * 此接口用于获取有权限访问的知识空间列表。;;此接口为分页接口。由于权限过滤，可能返回列表为空，但分页标记（has_more）为true，可以继续分页请求。;;对于知识空间各项属性描述请参阅[获取知识空间信息](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get)
             *
             * 使用tenant access token调用时，请确认应用/机器人拥有部分知识空间的访问权限，否则返回列表容易为空。
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
                                    name?: string;
                                    description?: string;
                                    space_id?: string;
                                    space_type?:
                                        | "team"
                                        | "person"
                                        | "my_library";
                                    visibility?: "public" | "private";
                                    open_sharing?: "open" | "closed";
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces`,
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
        spaceMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.member&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/create document }
             *
             * 添加知识空间成员
             *
             * 添加知识空间成员或管理员。
             *
             * 知识空间具有[类型](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview)和[可见性](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview)的概念。不同的类型或可见性可以对本操作做出限制：;- 可见性限制：公开知识空间（visibility为public）对租户所有用户可见，因此不支持再添加成员，但可以添加管理员。;- 类型限制：个人知识空间 （type为person）为个人管理的知识空间，不支持添加其他管理员（包括应用/机器人）。但可以添加成员。;;;知识空间权限要求，当前使用的 access token 所代表的应用或用户拥有：;- 为知识空间管理员
             */
            create: async (
                payload?: {
                    data: {
                        member_type: string;
                        member_id: string;
                        member_role: string;
                    };
                    params?: { need_notification?: boolean };
                    path?: { space_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    member_type: string;
                                    member_id: string;
                                    member_role: string;
                                    type?: "user" | "chat" | "department";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id/members`,
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
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.member&apiName=delete&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/delete document }
             *
             * 删除知识空间成员
             *
             * 此接口用于删除知识空间成员或管理员。
             *
             * 知识空间具有[类型](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview)和[可见性](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview)的概念。不同的类型或可见性可以对本操作做出限制：;- 可见性限制：公开知识空间（visibility为public）对租户所有用户可见，因此不支持再删除成员，但可以删除管理员。;- 类型限制：个人知识空间 （type为person）为个人管理的知识空间，不支持删除管理员。但可以删除成员。;;;知识空间权限要求，当前使用的 access token 所代表的应用或用户拥有：;- 为知识空间管理员
             */
            delete: async (
                payload?: {
                    data: {
                        member_type: string;
                        member_role: string;
                        type?: "user" | "chat" | "department";
                    };
                    path: { space_id: string; member_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                member: {
                                    member_type: string;
                                    member_id: string;
                                    member_role: string;
                                    type?: "user" | "chat" | "department";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id/members/:member_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.member&apiName=list&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=wiki&resource=space.member&version=v2 document }
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: { space_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    member_type: string;
                                    member_id: string;
                                    member_role: string;
                                    type?: "user" | "chat" | "department";
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id/members`,
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
        spaceNode: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=copy&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/copy document }
             *
             * 创建知识空间节点副本
             *
             * 此接口用于在知识空间创建节点副本到指定位置。
             */
            copy: async (
                payload?: {
                    data?: {
                        target_parent_token?: string;
                        target_space_id?: string;
                        title?: string;
                    };
                    path?: { space_id?: string; node_token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                node: {
                                    space_id?: string;
                                    node_token?: string;
                                    obj_token?: string;
                                    obj_type:
                                        | "doc"
                                        | "sheet"
                                        | "mindnote"
                                        | "bitable"
                                        | "file"
                                        | "docx"
                                        | "slides";
                                    parent_node_token?: string;
                                    node_type: "origin" | "shortcut";
                                    origin_node_token?: string;
                                    origin_space_id?: string;
                                    has_child?: boolean;
                                    title?: string;
                                    obj_create_time?: string;
                                    obj_edit_time?: string;
                                    node_create_time?: string;
                                    creator?: string;
                                    owner?: string;
                                    node_creator?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/copy`,
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
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/create document }
             *
             * 创建知识空间节点
             *
             * 此接口用于在知识节点里创建[节点](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview)到指定位置。
             *
             * 知识空间权限要求，当前使用的 access token 所代表的应用或用户拥有：;- **父节点**容器编辑权限
             */
            create: async (
                payload?: {
                    data: {
                        obj_type:
                            | "doc"
                            | "sheet"
                            | "mindnote"
                            | "bitable"
                            | "file"
                            | "docx"
                            | "slides";
                        parent_node_token?: string;
                        node_type: "origin" | "shortcut";
                        origin_node_token?: string;
                        title?: string;
                    };
                    path?: { space_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                node?: {
                                    space_id?: string;
                                    node_token?: string;
                                    obj_token?: string;
                                    obj_type:
                                        | "doc"
                                        | "sheet"
                                        | "mindnote"
                                        | "bitable"
                                        | "file"
                                        | "docx"
                                        | "slides";
                                    parent_node_token?: string;
                                    node_type: "origin" | "shortcut";
                                    origin_node_token?: string;
                                    origin_space_id?: string;
                                    has_child?: boolean;
                                    title?: string;
                                    obj_create_time?: string;
                                    obj_edit_time?: string;
                                    node_create_time?: string;
                                    creator?: string;
                                    owner?: string;
                                    node_creator?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes`,
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
                        parent_node_token?: string;
                    };
                    path?: { space_id?: string };
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
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes`,
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
                                                    space_id?: string;
                                                    node_token?: string;
                                                    obj_token?: string;
                                                    obj_type:
                                                        | "doc"
                                                        | "sheet"
                                                        | "mindnote"
                                                        | "bitable"
                                                        | "file"
                                                        | "docx"
                                                        | "slides";
                                                    parent_node_token?: string;
                                                    node_type:
                                                        | "origin"
                                                        | "shortcut";
                                                    origin_node_token?: string;
                                                    origin_space_id?: string;
                                                    has_child?: boolean;
                                                    title?: string;
                                                    obj_create_time?: string;
                                                    obj_edit_time?: string;
                                                    node_create_time?: string;
                                                    creator?: string;
                                                    owner?: string;
                                                    node_creator?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=list&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/list document }
             *
             * 获取知识空间子节点列表
             *
             * 此接口用于分页获取Wiki节点的子节点列表。;;此接口为分页接口。由于权限过滤，可能返回列表为空，但分页标记（has_more）为true，可以继续分页请求。
             *
             * 知识库权限要求，当前使用的 access token 所代表的应用或用户拥有：;- 父节点阅读权限
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        parent_node_token?: string;
                    };
                    path?: { space_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    space_id?: string;
                                    node_token?: string;
                                    obj_token?: string;
                                    obj_type:
                                        | "doc"
                                        | "sheet"
                                        | "mindnote"
                                        | "bitable"
                                        | "file"
                                        | "docx"
                                        | "slides";
                                    parent_node_token?: string;
                                    node_type: "origin" | "shortcut";
                                    origin_node_token?: string;
                                    origin_space_id?: string;
                                    has_child?: boolean;
                                    title?: string;
                                    obj_create_time?: string;
                                    obj_edit_time?: string;
                                    node_create_time?: string;
                                    creator?: string;
                                    owner?: string;
                                    node_creator?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes`,
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
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=move&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move document }
             *
             * 移动知识空间节点
             *
             * 此方法用于在Wiki内移动节点，支持跨知识空间移动。如果有子节点，会携带子节点一起移动。
             *
             * 知识库权限要求：;- 节点编辑权限;- 原父节点容器编辑权限;- 目的父节点容器编辑权限
             */
            move: async (
                payload?: {
                    data?: {
                        target_parent_token?: string;
                        target_space_id?: string;
                    };
                    path: { space_id: string; node_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                node?: {
                                    space_id?: string;
                                    node_token?: string;
                                    obj_token?: string;
                                    obj_type:
                                        | "doc"
                                        | "sheet"
                                        | "mindnote"
                                        | "bitable"
                                        | "file"
                                        | "docx"
                                        | "slides";
                                    parent_node_token?: string;
                                    node_type: "origin" | "shortcut";
                                    origin_node_token?: string;
                                    origin_space_id?: string;
                                    has_child?: boolean;
                                    title?: string;
                                    obj_create_time?: string;
                                    obj_edit_time?: string;
                                    node_create_time?: string;
                                    creator?: string;
                                    owner?: string;
                                    node_creator?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/move`,
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
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=move_docs_to_wiki&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move_docs_to_wiki document }
             *
             * 移动云空间文档至知识空间
             *
             * 该接口允许移动云空间文档至知识空间，并挂载在指定位置
             *
             * 此接口为异步接口。若移动已完成（或文档已在Wiki中），则直接返回结果（Wiki token）。若尚未完成，则返回task id。请使用[获取任务结果](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/task/get)接口进行查询。;;知识库权限要求，当前使用的 access token 所代表的应用或用户拥有：;- 文档可管理权限;- 原文件夹编辑权限;- 目标父节点容器编辑权限
             *
             * ### 移动操作 ###;移动后，文档将从“我的空间”或“共享空间”转移至“知识库”后，无法从下列入口查看到文档：;- 云空间主页：快速访问;- 我的空间;- 共享空间;;### 权限变更 ###;移动后，文档会向所有可查看“页面树”的用户显示，默认继承父页面的权限设置。;</md-alert
             */
            moveDocsToWiki: async (
                payload?: {
                    data: {
                        parent_wiki_token?: string;
                        obj_type:
                            | "doc"
                            | "sheet"
                            | "bitable"
                            | "mindnote"
                            | "docx"
                            | "file"
                            | "slides";
                        obj_token: string;
                        apply?: boolean;
                    };
                    path: { space_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                wiki_token?: string;
                                task_id?: string;
                                applied?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/move_docs_to_wiki`,
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
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=update_title&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/update_title document }
             *
             * 更新知识空间节点标题
             *
             * 此接口用于更新节点标题
             *
             * 此接口目前仅支持文档(doc)、新版文档(docx)和快捷方式。
             */
            updateTitle: async (
                payload?: {
                    data: { title: string };
                    path?: { space_id?: string; node_token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/update_title`,
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
        spaceSetting: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.setting&apiName=update&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-setting/update document }
             *
             * 更新知识空间设置
             *
             * 根据space_id更新知识空间公共设置
             *
             * 知识库权限要求：;- 为知识空间管理员
             */
            update: async (
                payload?: {
                    data?: {
                        create_setting?: string;
                        security_setting?: string;
                        comment_setting?: string;
                    };
                    path?: { space_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                setting?: {
                                    create_setting?: string;
                                    security_setting?: string;
                                    comment_setting?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/spaces/:space_id/setting`,
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
        task: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=task&apiName=get&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/task/get document }
             *
             * 获取任务结果
             *
             * 该方法用于获取wiki异步任务的结果
             *
             * 知识库权限要求，当前 access token 所代表的用户或应用（机器人）：;- 为任务创建者
             */
            get: async (
                payload?: {
                    params: { task_type: "move" };
                    path?: { task_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                task: {
                                    task_id: string;
                                    move_result?: Array<{
                                        node: {
                                            space_id?: string;
                                            node_token?: string;
                                            obj_token?: string;
                                            obj_type:
                                                | "doc"
                                                | "sheet"
                                                | "mindnote"
                                                | "bitable"
                                                | "file"
                                                | "docx"
                                                | "slides";
                                            parent_node_token?: string;
                                            node_type: "origin" | "shortcut";
                                            origin_node_token?: string;
                                            origin_space_id?: string;
                                            has_child?: boolean;
                                            title?: string;
                                            obj_create_time?: string;
                                            obj_edit_time?: string;
                                            node_create_time?: string;
                                            creator?: string;
                                            owner?: string;
                                            node_creator?: string;
                                        };
                                        status: number;
                                        status_msg: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/wiki/v2/tasks/:task_id`,
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
             * 知识库
             */
            node: {
                searchWithIterator: async (
                    payload?: {
                        data: {
                            query: string;
                            space_id?: string;
                            node_id?: string;
                        };
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
                                    `${this.domain}/open-apis/wiki/v1/nodes/search`,
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
                                                    items: Array<{
                                                        node_id: string;
                                                        space_id: string;
                                                        obj_type: number;
                                                        title: string;
                                                        url?: string;
                                                        icon?: string;
                                                        obj_token: string;
                                                        create_time?: string;
                                                        update_time?: string;
                                                        delete_time?: string;
                                                        child_num: number;
                                                        version: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=node&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uEzN0YjLxcDN24SM3QjN/search_wiki document }
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            space_id?: string;
                            node_id?: string;
                        };
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
                                    items: Array<{
                                        node_id: string;
                                        space_id: string;
                                        obj_type: number;
                                        title: string;
                                        url?: string;
                                        icon?: string;
                                        obj_token: string;
                                        create_time?: string;
                                        update_time?: string;
                                        delete_time?: string;
                                        child_num: number;
                                        version: number;
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v1/nodes/search`,
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
             * 知识空间
             */
            space: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/create document }
                 *
                 * 创建知识空间
                 *
                 * 此接口用于创建知识空间
                 *
                 * 此接口不支持tenant access token（应用身份访问）
                 */
                create: async (
                    payload?: {
                        data?: {
                            name?: string;
                            description?: string;
                            open_sharing?: "open" | "closed";
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
                                    space?: {
                                        name?: string;
                                        description?: string;
                                        space_id?: string;
                                        space_type?:
                                            | "team"
                                            | "person"
                                            | "my_library";
                                        visibility?: "public" | "private";
                                        open_sharing?: "open" | "closed";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get document }
                 *
                 * 获取知识空间信息
                 *
                 * 此接口用于根据知识空间ID来查询知识空间的信息。;;空间类型（type）：;- 个人空间：归个人管理。一人仅可拥有一个个人空间，无法添加其他管理员。;- 团队空间：归团队（多人)管理，可添加多个管理员。;;空间可见性（visibility）：;- 公开空间：租户所有用户可见，默认为成员权限。无法额外添加成员，但可以添加管理员。;- 私有空间：仅对知识空间管理员、成员可见，需要手动添加管理员、成员。
                 *
                 * 本接口要求知识库权限：;- 需要为知识空间成员（管理员）
                 */
                get: async (
                    payload?: {
                        params?: {
                            lang?:
                                | "zh"
                                | "id"
                                | "de"
                                | "en"
                                | "es"
                                | "fr"
                                | "it"
                                | "pt"
                                | "vi"
                                | "ru"
                                | "hi"
                                | "th"
                                | "ko"
                                | "ja"
                                | "zh-HK"
                                | "zh-TW";
                        };
                        path?: { space_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    space?: {
                                        name?: string;
                                        description?: string;
                                        space_id?: string;
                                        space_type?:
                                            | "team"
                                            | "person"
                                            | "my_library";
                                        visibility?: "public" | "private";
                                        open_sharing?: "open" | "closed";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=get_node&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get_node document }
                 *
                 * 获取知识空间节点信息
                 *
                 * 获取知识空间节点信息
                 *
                 * 知识库权限要求，当前使用的 access token 所代表的应用或用户拥有：;- 节点阅读权限
                 */
                getNode: async (
                    payload?: {
                        params: {
                            token: string;
                            obj_type?:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "mindnote"
                                | "bitable"
                                | "file"
                                | "slides"
                                | "wiki";
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
                                    node?: {
                                        space_id?: string;
                                        node_token?: string;
                                        obj_token?: string;
                                        obj_type:
                                            | "doc"
                                            | "sheet"
                                            | "mindnote"
                                            | "bitable"
                                            | "file"
                                            | "docx"
                                            | "slides";
                                        parent_node_token?: string;
                                        node_type: "origin" | "shortcut";
                                        origin_node_token?: string;
                                        origin_space_id?: string;
                                        has_child?: boolean;
                                        title?: string;
                                        obj_create_time?: string;
                                        obj_edit_time?: string;
                                        node_create_time?: string;
                                        creator?: string;
                                        owner?: string;
                                        node_creator?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/get_node`,
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
                                    `${this.domain}/open-apis/wiki/v2/spaces`,
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
                                                        space_id?: string;
                                                        space_type?:
                                                            | "team"
                                                            | "person"
                                                            | "my_library";
                                                        visibility?:
                                                            | "public"
                                                            | "private";
                                                        open_sharing?:
                                                            | "open"
                                                            | "closed";
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/list document }
                 *
                 * 获取知识空间列表
                 *
                 * 此接口用于获取有权限访问的知识空间列表。;;此接口为分页接口。由于权限过滤，可能返回列表为空，但分页标记（has_more）为true，可以继续分页请求。;;对于知识空间各项属性描述请参阅[获取知识空间信息](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get)
                 *
                 * 使用tenant access token调用时，请确认应用/机器人拥有部分知识空间的访问权限，否则返回列表容易为空。
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
                                        name?: string;
                                        description?: string;
                                        space_id?: string;
                                        space_type?:
                                            | "team"
                                            | "person"
                                            | "my_library";
                                        visibility?: "public" | "private";
                                        open_sharing?: "open" | "closed";
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces`,
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
             * 空间成员
             */
            spaceMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.member&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/create document }
                 *
                 * 添加知识空间成员
                 *
                 * 添加知识空间成员或管理员。
                 *
                 * 知识空间具有[类型](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview)和[可见性](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview)的概念。不同的类型或可见性可以对本操作做出限制：;- 可见性限制：公开知识空间（visibility为public）对租户所有用户可见，因此不支持再添加成员，但可以添加管理员。;- 类型限制：个人知识空间 （type为person）为个人管理的知识空间，不支持添加其他管理员（包括应用/机器人）。但可以添加成员。;;;知识空间权限要求，当前使用的 access token 所代表的应用或用户拥有：;- 为知识空间管理员
                 */
                create: async (
                    payload?: {
                        data: {
                            member_type: string;
                            member_id: string;
                            member_role: string;
                        };
                        params?: { need_notification?: boolean };
                        path?: { space_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        member_type: string;
                                        member_id: string;
                                        member_role: string;
                                        type?: "user" | "chat" | "department";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.member&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/delete document }
                 *
                 * 删除知识空间成员
                 *
                 * 此接口用于删除知识空间成员或管理员。
                 *
                 * 知识空间具有[类型](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview)和[可见性](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview)的概念。不同的类型或可见性可以对本操作做出限制：;- 可见性限制：公开知识空间（visibility为public）对租户所有用户可见，因此不支持再删除成员，但可以删除管理员。;- 类型限制：个人知识空间 （type为person）为个人管理的知识空间，不支持删除管理员。但可以删除成员。;;;知识空间权限要求，当前使用的 access token 所代表的应用或用户拥有：;- 为知识空间管理员
                 */
                delete: async (
                    payload?: {
                        data: {
                            member_type: string;
                            member_role: string;
                            type?: "user" | "chat" | "department";
                        };
                        path: { space_id: string; member_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    member: {
                                        member_type: string;
                                        member_id: string;
                                        member_role: string;
                                        type?: "user" | "chat" | "department";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/members/:member_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.member&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=wiki&resource=space.member&version=v2 document }
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { space_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        member_type: string;
                                        member_id: string;
                                        member_role: string;
                                        type?: "user" | "chat" | "department";
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/members`,
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
             * 节点
             */
            spaceNode: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=copy&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/copy document }
                 *
                 * 创建知识空间节点副本
                 *
                 * 此接口用于在知识空间创建节点副本到指定位置。
                 */
                copy: async (
                    payload?: {
                        data?: {
                            target_parent_token?: string;
                            target_space_id?: string;
                            title?: string;
                        };
                        path?: { space_id?: string; node_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    node: {
                                        space_id?: string;
                                        node_token?: string;
                                        obj_token?: string;
                                        obj_type:
                                            | "doc"
                                            | "sheet"
                                            | "mindnote"
                                            | "bitable"
                                            | "file"
                                            | "docx"
                                            | "slides";
                                        parent_node_token?: string;
                                        node_type: "origin" | "shortcut";
                                        origin_node_token?: string;
                                        origin_space_id?: string;
                                        has_child?: boolean;
                                        title?: string;
                                        obj_create_time?: string;
                                        obj_edit_time?: string;
                                        node_create_time?: string;
                                        creator?: string;
                                        owner?: string;
                                        node_creator?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/copy`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/create document }
                 *
                 * 创建知识空间节点
                 *
                 * 此接口用于在知识节点里创建[节点](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview)到指定位置。
                 *
                 * 知识空间权限要求，当前使用的 access token 所代表的应用或用户拥有：;- **父节点**容器编辑权限
                 */
                create: async (
                    payload?: {
                        data: {
                            obj_type:
                                | "doc"
                                | "sheet"
                                | "mindnote"
                                | "bitable"
                                | "file"
                                | "docx"
                                | "slides";
                            parent_node_token?: string;
                            node_type: "origin" | "shortcut";
                            origin_node_token?: string;
                            title?: string;
                        };
                        path?: { space_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    node?: {
                                        space_id?: string;
                                        node_token?: string;
                                        obj_token?: string;
                                        obj_type:
                                            | "doc"
                                            | "sheet"
                                            | "mindnote"
                                            | "bitable"
                                            | "file"
                                            | "docx"
                                            | "slides";
                                        parent_node_token?: string;
                                        node_type: "origin" | "shortcut";
                                        origin_node_token?: string;
                                        origin_space_id?: string;
                                        has_child?: boolean;
                                        title?: string;
                                        obj_create_time?: string;
                                        obj_edit_time?: string;
                                        node_create_time?: string;
                                        creator?: string;
                                        owner?: string;
                                        node_creator?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes`,
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
                            parent_node_token?: string;
                        };
                        path?: { space_id?: string };
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
                                    `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes`,
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
                                                        space_id?: string;
                                                        node_token?: string;
                                                        obj_token?: string;
                                                        obj_type:
                                                            | "doc"
                                                            | "sheet"
                                                            | "mindnote"
                                                            | "bitable"
                                                            | "file"
                                                            | "docx"
                                                            | "slides";
                                                        parent_node_token?: string;
                                                        node_type:
                                                            | "origin"
                                                            | "shortcut";
                                                        origin_node_token?: string;
                                                        origin_space_id?: string;
                                                        has_child?: boolean;
                                                        title?: string;
                                                        obj_create_time?: string;
                                                        obj_edit_time?: string;
                                                        node_create_time?: string;
                                                        creator?: string;
                                                        owner?: string;
                                                        node_creator?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/list document }
                 *
                 * 获取知识空间子节点列表
                 *
                 * 此接口用于分页获取Wiki节点的子节点列表。;;此接口为分页接口。由于权限过滤，可能返回列表为空，但分页标记（has_more）为true，可以继续分页请求。
                 *
                 * 知识库权限要求，当前使用的 access token 所代表的应用或用户拥有：;- 父节点阅读权限
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            parent_node_token?: string;
                        };
                        path?: { space_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        space_id?: string;
                                        node_token?: string;
                                        obj_token?: string;
                                        obj_type:
                                            | "doc"
                                            | "sheet"
                                            | "mindnote"
                                            | "bitable"
                                            | "file"
                                            | "docx"
                                            | "slides";
                                        parent_node_token?: string;
                                        node_type: "origin" | "shortcut";
                                        origin_node_token?: string;
                                        origin_space_id?: string;
                                        has_child?: boolean;
                                        title?: string;
                                        obj_create_time?: string;
                                        obj_edit_time?: string;
                                        node_create_time?: string;
                                        creator?: string;
                                        owner?: string;
                                        node_creator?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=move&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move document }
                 *
                 * 移动知识空间节点
                 *
                 * 此方法用于在Wiki内移动节点，支持跨知识空间移动。如果有子节点，会携带子节点一起移动。
                 *
                 * 知识库权限要求：;- 节点编辑权限;- 原父节点容器编辑权限;- 目的父节点容器编辑权限
                 */
                move: async (
                    payload?: {
                        data?: {
                            target_parent_token?: string;
                            target_space_id?: string;
                        };
                        path: { space_id: string; node_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    node?: {
                                        space_id?: string;
                                        node_token?: string;
                                        obj_token?: string;
                                        obj_type:
                                            | "doc"
                                            | "sheet"
                                            | "mindnote"
                                            | "bitable"
                                            | "file"
                                            | "docx"
                                            | "slides";
                                        parent_node_token?: string;
                                        node_type: "origin" | "shortcut";
                                        origin_node_token?: string;
                                        origin_space_id?: string;
                                        has_child?: boolean;
                                        title?: string;
                                        obj_create_time?: string;
                                        obj_edit_time?: string;
                                        node_create_time?: string;
                                        creator?: string;
                                        owner?: string;
                                        node_creator?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/move`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=move_docs_to_wiki&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move_docs_to_wiki document }
                 *
                 * 移动云空间文档至知识空间
                 *
                 * 该接口允许移动云空间文档至知识空间，并挂载在指定位置
                 *
                 * 此接口为异步接口。若移动已完成（或文档已在Wiki中），则直接返回结果（Wiki token）。若尚未完成，则返回task id。请使用[获取任务结果](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/task/get)接口进行查询。;;知识库权限要求，当前使用的 access token 所代表的应用或用户拥有：;- 文档可管理权限;- 原文件夹编辑权限;- 目标父节点容器编辑权限
                 *
                 * ### 移动操作 ###;移动后，文档将从“我的空间”或“共享空间”转移至“知识库”后，无法从下列入口查看到文档：;- 云空间主页：快速访问;- 我的空间;- 共享空间;;### 权限变更 ###;移动后，文档会向所有可查看“页面树”的用户显示，默认继承父页面的权限设置。;</md-alert
                 */
                moveDocsToWiki: async (
                    payload?: {
                        data: {
                            parent_wiki_token?: string;
                            obj_type:
                                | "doc"
                                | "sheet"
                                | "bitable"
                                | "mindnote"
                                | "docx"
                                | "file"
                                | "slides";
                            obj_token: string;
                            apply?: boolean;
                        };
                        path: { space_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    wiki_token?: string;
                                    task_id?: string;
                                    applied?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/move_docs_to_wiki`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=update_title&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/update_title document }
                 *
                 * 更新知识空间节点标题
                 *
                 * 此接口用于更新节点标题
                 *
                 * 此接口目前仅支持文档(doc)、新版文档(docx)和快捷方式。
                 */
                updateTitle: async (
                    payload?: {
                        data: { title: string };
                        path?: { space_id?: string; node_token?: string };
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
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/update_title`,
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
             * 空间设置
             */
            spaceSetting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.setting&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-setting/update document }
                 *
                 * 更新知识空间设置
                 *
                 * 根据space_id更新知识空间公共设置
                 *
                 * 知识库权限要求：;- 为知识空间管理员
                 */
                update: async (
                    payload?: {
                        data?: {
                            create_setting?: string;
                            security_setting?: string;
                            comment_setting?: string;
                        };
                        path?: { space_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    setting?: {
                                        create_setting?: string;
                                        security_setting?: string;
                                        comment_setting?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/spaces/:space_id/setting`,
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
             * 云文档
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=task&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/task/get document }
                 *
                 * 获取任务结果
                 *
                 * 该方法用于获取wiki异步任务的结果
                 *
                 * 知识库权限要求，当前 access token 所代表的用户或应用（机器人）：;- 为任务创建者
                 */
                get: async (
                    payload?: {
                        params: { task_type: "move" };
                        path?: { task_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    task: {
                                        task_id: string;
                                        move_result?: Array<{
                                            node: {
                                                space_id?: string;
                                                node_token?: string;
                                                obj_token?: string;
                                                obj_type:
                                                    | "doc"
                                                    | "sheet"
                                                    | "mindnote"
                                                    | "bitable"
                                                    | "file"
                                                    | "docx"
                                                    | "slides";
                                                parent_node_token?: string;
                                                node_type:
                                                    | "origin"
                                                    | "shortcut";
                                                origin_node_token?: string;
                                                origin_space_id?: string;
                                                has_child?: boolean;
                                                title?: string;
                                                obj_create_time?: string;
                                                obj_edit_time?: string;
                                                node_create_time?: string;
                                                creator?: string;
                                                owner?: string;
                                                node_creator?: string;
                                            };
                                            status: number;
                                            status_msg: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/wiki/v2/tasks/:task_id`,
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
