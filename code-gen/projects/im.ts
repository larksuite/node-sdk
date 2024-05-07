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
import human_authentication from "./human_authentication";

// auto gen
export default abstract class Client extends human_authentication {
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
     * 消息与群组
     */
    im = {
        /**
         * 消息 - 批量消息
         */
        batchMessage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=batch_message&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/delete document }
             *
             * 批量撤回消息
             *
             * 批量撤回通过[批量发送消息](https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM)接口发送的消息。
             *
             * 注意事项：;- 应用需要启用[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability) ;- 撤回单条发送的消息请使用[撤回消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/delete)接口;- 不支持撤回发出时间超过1天的消息;- 一次调用涉及大量消息，所以为异步接口，会有一定延迟。
             */
            delete: async (
                payload?: {
                    path: { batch_message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/batch_messages/:batch_message_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=batch_message&apiName=get_progress&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/get_progress document }
             *
             * 查询批量消息整体进度
             *
             * 该接口在[查询批量消息推送和阅读人数](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/read_user)查询结果的基础上，增加了批量请求中有效的userid数量以及消息撤回进度数据。
             *
             * 注意事项:;* 该接口返回的数据为查询时刻的快照数据
             */
            getProgress: async (
                payload?: {
                    path: { batch_message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                batch_message_send_progress?: {
                                    valid_user_ids_count?: number;
                                    success_user_ids_count?: number;
                                    read_user_ids_count?: number;
                                };
                                batch_message_recall_progress?: {
                                    recall?: boolean;
                                    recall_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/batch_messages/:batch_message_id/get_progress`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=batch_message&apiName=read_user&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/read_user document }
             *
             * 查询批量消息推送和阅读人数
             *
             * 批量发送消息后，可以通过该接口查询批量消息推送的总人数和阅读人数。
             *
             * 注意事项：;- 只能查询通过[批量发送消息](https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM)接口产生的消息;- 该接口返回的数据为查询时刻的快照数据
             */
            readUser: async (
                payload?: {
                    path: { batch_message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                read_user?: {
                                    read_count: string;
                                    total_count: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/batch_messages/:batch_message_id/read_user`,
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
         * 群组 - 群公告
         */
        chatAnnouncement: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.announcement&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/get document }
             *
             * 获取群公告信息
             *
             * 获取会话中的群公告信息，公告信息格式与[云文档](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)格式相同。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 获取内部群信息时，操作者须与群组在同一租户下
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                content?: string;
                                revision?: string;
                                create_time?: string;
                                update_time?: string;
                                owner_id_type?:
                                    | "user_id"
                                    | "union_id"
                                    | "open_id"
                                    | "app_id";
                                owner_id?: string;
                                modifier_id_type?:
                                    | "user_id"
                                    | "union_id"
                                    | "open_id"
                                    | "app_id";
                                modifier_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/announcement`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.announcement&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/patch document }
             *
             * 更新群公告信息
             *
             * 更新会话中的群公告信息，更新公告信息的格式和更新[云文档](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)格式相同。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 操作者需要拥有群公告文档的阅读权限;- 获取内部群信息时，操作者须与群组在同一租户下;- 若群开启了 ==仅群主和群管理员可编辑群信息== 配置，群主/群管理员 或 创建群组且具备 ==更新应用所创建群的群信息== 权限的机器人，可更新群公告;- 若群未开启 ==仅群主和群管理员可编辑群信息== 配置，所有成员可以更新群公告
             */
            patch: async (
                payload?: {
                    data: { revision: string; requests?: Array<string> };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/announcement`,
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
         * 群组
         */
        chat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/create document }
             *
             * 创建群
             *
             * 创建群并设置群头像、群名、群描述等。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 本接口支持在创建群的同时拉用户或机器人进群；如果仅需要拉用户或者机器人入群参考 [将用户或机器人拉入群聊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/create)接口
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
                        chat_mode?: string;
                        chat_type?: string;
                        external?: boolean;
                        join_message_visibility?: string;
                        leave_message_visibility?: string;
                        membership_approval?: string;
                        labels?: Array<string>;
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
                        urgent_setting?: "only_owner" | "all_members";
                        video_conference_setting?: "only_owner" | "all_members";
                        edit_permission?: "only_owner" | "all_members";
                        chat_tags?: Array<string>;
                        pin_manage_setting?: "only_owner" | "all_members";
                        hide_member_count_setting?:
                            | "all_members"
                            | "only_owner";
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                urgent_setting?: "only_owner" | "all_members";
                                video_conference_setting?:
                                    | "only_owner"
                                    | "all_members";
                                pin_manage_setting?:
                                    | "only_owner"
                                    | "all_members";
                                add_member_permission?: string;
                                share_card_permission?: string;
                                at_all_permission?: string;
                                edit_permission?: string;
                                group_message_type?: string;
                                chat_mode?: string;
                                chat_type?: string;
                                chat_tag?: string;
                                external?: boolean;
                                tenant_key?: string;
                                join_message_visibility?: string;
                                leave_message_visibility?: string;
                                membership_approval?: string;
                                moderation_permission?: string;
                                labels?: Array<string>;
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
                                hide_member_count_setting?:
                                    | "all_members"
                                    | "only_owner";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/delete document }
             *
             * 解散群
             *
             * 解散群组。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 如果使用tenant_access_token，需要机器人符合以下任一情况才可解散群：;    - 机器人是群主;    - 机器人是群的创建者且具备==更新应用所创建群的群信息==权限;- 如果使用user_access_token，需要对应的用户是群主才可解散群
             */
            delete: async (
                payload?: {
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get document }
             *
             * 获取群信息
             *
             * 获取群名称、群描述、群头像、群主 ID 等群基本信息。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 机器人或授权用户必须在群里（否则只会返回群名称、群头像等基本信息）;- 获取内部群信息时，操作者须与群组在同一租户下
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                avatar?: string;
                                name?: string;
                                description?: string;
                                i18n_names?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                    ja_jp?: string;
                                };
                                add_member_permission?: string;
                                share_card_permission?: string;
                                at_all_permission?: string;
                                edit_permission?: string;
                                owner_id_type?: string;
                                owner_id?: string;
                                user_manager_id_list?: Array<string>;
                                bot_manager_id_list?: Array<string>;
                                group_message_type?: string;
                                chat_mode?: string;
                                chat_type?: string;
                                chat_tag?: string;
                                join_message_visibility?: string;
                                leave_message_visibility?: string;
                                membership_approval?: string;
                                moderation_permission?: string;
                                external?: boolean;
                                tenant_key?: string;
                                user_count?: string;
                                bot_count?: string;
                                labels?: Array<string>;
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
                                urgent_setting?: "only_owner" | "all_members";
                                video_conference_setting?:
                                    | "only_owner"
                                    | "all_members";
                                pin_manage_setting?:
                                    | "only_owner"
                                    | "all_members";
                                hide_member_count_setting?:
                                    | "all_members"
                                    | "only_owner";
                                chat_status?:
                                    | "normal"
                                    | "dissolved"
                                    | "dissolved_save";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=link&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/link document }
             *
             * 获取群分享链接
             *
             * 获取指定群的分享链接。
             *
             * 注意事项:;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - access_token所对应的 **机器人** 或 **授权用户** 必须在`chat_id`参数指定的群组中;- 单聊、密聊、团队群不支持分享群链接;- 当Bot被停用或Bot退出群组时，Bot生成的群链接也将停用;- 当群聊开启了 ==仅群主和群管理员可添加群成员/分享群== 设置时，仅**群主**和**群管理员**可以获取群分享链接;- 获取内部群分享链接时，操作者须与群组在同一租户下
             */
            link: async (
                payload?: {
                    data?: {
                        validity_period?: "week" | "year" | "permanently";
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                share_link?: string;
                                expire_time?: string;
                                is_permanent?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/link`,
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
            listWithIterator: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        sort_type?: "ByCreateTimeAsc" | "ByActiveTimeDesc";
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
                                `${this.domain}/open-apis/im/v1/chats`,
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
                                                    chat_id?: string;
                                                    avatar?: string;
                                                    name?: string;
                                                    description?: string;
                                                    owner_id?: string;
                                                    owner_id_type?: string;
                                                    external?: boolean;
                                                    tenant_key?: string;
                                                    labels?: Array<string>;
                                                    chat_status?:
                                                        | "normal"
                                                        | "dissolved"
                                                        | "dissolved_save";
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/list document }
             *
             * 获取用户或机器人所在的群列表
             *
             * 获取用户或者机器人所在群列表。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 请注意区分本接口和[获取群信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get)的请求 URL;- 获取的群列表不包含P2P单聊
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        sort_type?: "ByCreateTimeAsc" | "ByActiveTimeDesc";
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
                                    chat_id?: string;
                                    avatar?: string;
                                    name?: string;
                                    description?: string;
                                    owner_id?: string;
                                    owner_id_type?: string;
                                    external?: boolean;
                                    tenant_key?: string;
                                    labels?: Array<string>;
                                    chat_status?:
                                        | "normal"
                                        | "dissolved"
                                        | "dissolved_save";
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats`,
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
            searchWithIterator: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        query?: string;
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
                                `${this.domain}/open-apis/im/v1/chats/search`,
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
                                                    chat_id?: string;
                                                    avatar?: string;
                                                    name?: string;
                                                    description?: string;
                                                    owner_id?: string;
                                                    owner_id_type?: string;
                                                    external?: boolean;
                                                    tenant_key?: string;
                                                    labels?: Array<string>;
                                                    chat_status?:
                                                        | "normal"
                                                        | "dissolved"
                                                        | "dissolved_save";
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/search document }
             *
             * 搜索对用户或机器人可见的群列表
             *
             * 搜索对用户或机器人可见的群列表，包括：用户或机器人所在的群、对用户或机器人公开的群。;搜索可获得的群信息包括：群ID（chat_id）、群名称、群描述等。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)
             */
            search: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        query?: string;
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
                                    chat_id?: string;
                                    avatar?: string;
                                    name?: string;
                                    description?: string;
                                    owner_id?: string;
                                    owner_id_type?: string;
                                    external?: boolean;
                                    tenant_key?: string;
                                    labels?: Array<string>;
                                    chat_status?:
                                        | "normal"
                                        | "dissolved"
                                        | "dissolved_save";
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/update document }
             *
             * 更新群信息
             *
             * 更新群头像、群名称、群描述、群配置、转让群主等。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 对于群主/群管理员 或 创建群组且具备 ==更新应用所创建群的群信息== 权限的机器人，可更新所有信息;- 对于不满足上述权限条件的群成员或机器人：;    - 若未开启 ==仅群主和群管理员可编辑群信息== 配置，仅可更新群头像、群名称、群描述、群国际化名称信息;    - 若开启了 ==仅群主和群管理员可编辑群信息== 配置，任何群信息都不能修改;- 如果同时更新 ==邀请用户或机器人入群权限== 和 ==群分享权限== 这两项设置需要满足以下条件：;    - 若未开启 ==仅群主和管理员可以邀请用户或机器人入群==，需要设置 ==群分享权限== 为 ==允许分享==;    - 若开启了 ==仅群主和管理员可以邀请用户或机器人入群==，需要设置 ==群分享权限== 为 ==不允许分享==
             */
            update: async (
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
                        add_member_permission?: string;
                        share_card_permission?: string;
                        at_all_permission?: string;
                        edit_permission?: string;
                        owner_id?: string;
                        join_message_visibility?: string;
                        leave_message_visibility?: string;
                        membership_approval?: string;
                        labels?: Array<string>;
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
                        chat_type?: string;
                        group_message_type?: "chat" | "thread";
                        urgent_setting?: "only_owner" | "all_members";
                        video_conference_setting?: "only_owner" | "all_members";
                        pin_manage_setting?: "only_owner" | "all_members";
                        hide_member_count_setting?:
                            | "all_members"
                            | "only_owner";
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id`,
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
         * 群组 - 群成员
         */
        chatManagers: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.managers&apiName=add_managers&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/add_managers document }
             *
             * 指定群管理员
             *
             * 将用户或机器人指定为群管理员。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 仅有群主可以指定群管理员
             */
            addManagers: async (
                payload?: {
                    data?: { manager_ids?: Array<string> };
                    params?: {
                        member_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "app_id";
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                chat_managers?: Array<string>;
                                chat_bot_managers?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/managers/add_managers`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.managers&apiName=delete_managers&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/delete_managers document }
             *
             * 删除群管理员
             *
             * 删除指定的群管理员（用户或机器人）。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 仅有群主可以删除群管理员
             */
            deleteManagers: async (
                payload?: {
                    data?: { manager_ids?: Array<string> };
                    params?: {
                        member_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "app_id";
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                chat_managers?: Array<string>;
                                chat_bot_managers?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/managers/delete_managers`,
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
         * 群组 - 群成员
         */
        chatMembers: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/create document }
             *
             * 将用户或机器人拉入群聊
             *
             * 将用户或机器人拉入群聊。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 如需拉用户进群，需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability); - 机器人或授权用户必须在群组中;- 外部租户不能被加入到内部群中;- 操作内部群时，操作者须与群组在同一租户下; - 在开启 ==仅群主和群管理员可添加群成员== 的设置时，仅有群主/管理员 或 创建群组且具备 ==更新应用所创建群的群信息== 权限的机器人，可以拉用户或者机器人进群; - 在未开启 ==仅群主和群管理员可添加群成员== 的设置时，所有群成员都可以拉用户或机器人进群
             */
            create: async (
                payload?: {
                    data?: { id_list?: Array<string> };
                    params?: {
                        member_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "app_id";
                        succeed_type?: number;
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                invalid_id_list?: Array<string>;
                                not_existed_id_list?: Array<string>;
                                pending_approval_id_list?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/members`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/delete document }
             *
             * 将用户或机器人移出群聊
             *
             * 将用户或机器人移出群聊。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 用户或机器人在任何条件下均可移除自己出群（即主动退群）;- 仅有群主/管理员 或 创建群组并且具备 ==更新应用所创建群的群信息== 权限的机器人，可以移除其他用户或者机器人;- 每次请求，最多移除50个用户或者5个机器人;- 操作内部群时，操作者须与群组在同一租户下
             */
            delete: async (
                payload?: {
                    data?: { id_list?: Array<string> };
                    params?: {
                        member_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "app_id";
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { invalid_id_list?: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/members`,
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
            getWithIterator: async (
                payload?: {
                    params?: {
                        member_id_type?: "user_id" | "union_id" | "open_id";
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { chat_id: string };
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
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/members`,
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
                                                    member_id_type?: string;
                                                    member_id?: string;
                                                    name?: string;
                                                    tenant_key?: string;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                member_total?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/get document }
             *
             * 获取群成员列表
             *
             * 获取用户/机器人所在群的群成员列表。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 机器人或授权用户必须在群组中; - 该接口不会返回群内的机器人成员; - 由于返回的群成员列表会过滤掉机器人成员，因此返回的群成员个数可能会小于指定的page_size; - 如果有同一时间加入群的群成员，会一次性返回，这会导致返回的群成员个数可能会大于指定的page_size;- 获取内部群信息时，操作者须与群组在同一租户下
             */
            get: async (
                payload?: {
                    params?: {
                        member_id_type?: "user_id" | "union_id" | "open_id";
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    member_id_type?: string;
                                    member_id?: string;
                                    name?: string;
                                    tenant_key?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                                member_total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/members`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=is_in_chat&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/is_in_chat document }
             *
             * 判断用户或机器人是否在群里
             *
             * 根据使用的access_token判断对应的用户或者机器人是否在群里。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 获取内部群信息时，操作者须与群组在同一租户下
             */
            isInChat: async (
                payload?: {
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { is_in_chat?: boolean };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/members/is_in_chat`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=me_join&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/me_join document }
             *
             * 用户或机器人主动加入群聊
             *
             * 用户或机器人主动加入群聊。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 目前仅支持加入公开群;- 操作内部群时，操作者须与群组在同一租户下
             */
            meJoin: async (
                payload?: {
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/members/me_join`,
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
         * chat.menu_item
         */
        chatMenuItem: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.menu_item&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_item/patch document }
             *
             * 修改群菜单元信息
             *
             * 修改某个一级菜单或者二级菜单的元信息。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 机器人必须在群里。
             */
            patch: async (
                payload?: {
                    data: {
                        update_fields: Array<
                            "ICON" | "NAME" | "I18N_NAME" | "REDIRECT_LINK"
                        >;
                        chat_menu_item: {
                            action_type?: "NONE" | "REDIRECT_LINK";
                            redirect_link?: {
                                common_url?: string;
                                ios_url?: string;
                                android_url?: string;
                                pc_url?: string;
                                web_url?: string;
                            };
                            image_key?: string;
                            name?: string;
                            i18n_names?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                        };
                    };
                    path?: { chat_id?: string; menu_item_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                chat_menu_item?: {
                                    action_type?: "NONE" | "REDIRECT_LINK";
                                    redirect_link?: {
                                        common_url?: string;
                                        ios_url?: string;
                                        android_url?: string;
                                        pc_url?: string;
                                        web_url?: string;
                                    };
                                    image_key?: string;
                                    name?: string;
                                    i18n_names?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/menu_items/:menu_item_id`,
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
         * 群组 - 群菜单
         */
        chatMenuTree: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.menu_tree&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/create document }
             *
             * 添加群菜单
             *
             * 向群内添加群菜单。
             *
             * 注意事项：;- 该API是向群内追加菜单，群内原来存在的菜单并不会被覆盖。操作API后，将返回群内所有菜单。;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 机器人必须在群里。;- 一个群内，一级菜单最多有3个，每个一级菜单最多有5个二级菜单。
             */
            create: async (
                payload?: {
                    data: {
                        menu_tree: {
                            chat_menu_top_levels: Array<{
                                chat_menu_item: {
                                    action_type: "NONE" | "REDIRECT_LINK";
                                    redirect_link?: {
                                        common_url?: string;
                                        ios_url?: string;
                                        android_url?: string;
                                        pc_url?: string;
                                        web_url?: string;
                                    };
                                    image_key?: string;
                                    name: string;
                                    i18n_names?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                };
                                children?: Array<{
                                    chat_menu_item?: {
                                        action_type?: "NONE" | "REDIRECT_LINK";
                                        redirect_link?: {
                                            common_url?: string;
                                            ios_url?: string;
                                            android_url?: string;
                                            pc_url?: string;
                                            web_url?: string;
                                        };
                                        image_key?: string;
                                        name?: string;
                                        i18n_names?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                }>;
                            }>;
                        };
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
                                menu_tree?: {
                                    chat_menu_top_levels?: Array<{
                                        chat_menu_top_level_id?: string;
                                        chat_menu_item?: {
                                            action_type?:
                                                | "NONE"
                                                | "REDIRECT_LINK";
                                            redirect_link?: {
                                                common_url?: string;
                                                ios_url?: string;
                                                android_url?: string;
                                                pc_url?: string;
                                                web_url?: string;
                                            };
                                            image_key?: string;
                                            name?: string;
                                            i18n_names?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        };
                                        children?: Array<{
                                            chat_menu_second_level_id?: string;
                                            chat_menu_item?: {
                                                action_type?:
                                                    | "NONE"
                                                    | "REDIRECT_LINK";
                                                redirect_link?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                image_key?: string;
                                                name?: string;
                                                i18n_names?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                            };
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/menu_tree`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.menu_tree&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/delete document }
             *
             * 删除群菜单。
             *
             * 删除群内菜单。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 机器人必须在群里。;- 操作API后，将返回群内所有菜单。
             */
            delete: async (
                payload?: {
                    data: { chat_menu_top_level_ids: Array<string> };
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
                                menu_tree?: {
                                    chat_menu_top_levels?: Array<{
                                        chat_menu_top_level_id?: string;
                                        chat_menu_item?: {
                                            action_type?:
                                                | "NONE"
                                                | "REDIRECT_LINK";
                                            redirect_link?: {
                                                common_url?: string;
                                                ios_url?: string;
                                                android_url?: string;
                                                pc_url?: string;
                                                web_url?: string;
                                            };
                                            image_key?: string;
                                            name?: string;
                                            i18n_names?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        };
                                        children?: Array<{
                                            chat_menu_second_level_id?: string;
                                            chat_menu_item?: {
                                                action_type?:
                                                    | "NONE"
                                                    | "REDIRECT_LINK";
                                                redirect_link?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                image_key?: string;
                                                name?: string;
                                                i18n_names?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                            };
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/menu_tree`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.menu_tree&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/get document }
             *
             * 获取群内菜单
             *
             * 通过群ID获取群内菜单。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 机器人必须在群里。
             */
            get: async (
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
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                menu_tree?: {
                                    chat_menu_top_levels?: Array<{
                                        chat_menu_top_level_id?: string;
                                        chat_menu_item?: {
                                            action_type?:
                                                | "NONE"
                                                | "REDIRECT_LINK";
                                            redirect_link?: {
                                                common_url?: string;
                                                ios_url?: string;
                                                android_url?: string;
                                                pc_url?: string;
                                                web_url?: string;
                                            };
                                            image_key?: string;
                                            name?: string;
                                            i18n_names?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        };
                                        children?: Array<{
                                            chat_menu_second_level_id?: string;
                                            chat_menu_item?: {
                                                action_type?:
                                                    | "NONE"
                                                    | "REDIRECT_LINK";
                                                redirect_link?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                image_key?: string;
                                                name?: string;
                                                i18n_names?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                            };
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/menu_tree`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.menu_tree&apiName=sort&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/sort document }
             *
             * 排序群菜单
             *
             * 给一个群内的一级菜单排序。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 机器人必须在群里。;- 操作API后，将返回群内所有菜单。
             */
            sort: async (
                payload?: {
                    data: { chat_menu_top_level_ids: Array<string> };
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
                                menu_tree?: {
                                    chat_menu_top_levels?: Array<{
                                        chat_menu_top_level_id?: string;
                                        chat_menu_item?: {
                                            action_type?:
                                                | "NONE"
                                                | "REDIRECT_LINK";
                                            redirect_link?: {
                                                common_url?: string;
                                                ios_url?: string;
                                                android_url?: string;
                                                pc_url?: string;
                                                web_url?: string;
                                            };
                                            image_key?: string;
                                            name?: string;
                                            i18n_names?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        };
                                        children?: Array<{
                                            chat_menu_second_level_id?: string;
                                            chat_menu_item?: {
                                                action_type?:
                                                    | "NONE"
                                                    | "REDIRECT_LINK";
                                                redirect_link?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                image_key?: string;
                                                name?: string;
                                                i18n_names?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                            };
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/menu_tree/sort`,
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
         * chat.moderation
         */
        chatModeration: {
            getWithIterator: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { chat_id: string };
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
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/moderation`,
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
                                                moderation_setting?: string;
                                                page_token?: string;
                                                has_more?: boolean;
                                                items?: Array<{
                                                    user_id_type?: string;
                                                    user_id?: string;
                                                    tenant_key?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.moderation&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/get document }
             *
             * 获取群成员发言权限
             *
             * 获取群发言模式、可发言用户名单等
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 机器人 或 授权用户 必须在群里
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                moderation_setting?: string;
                                page_token?: string;
                                has_more?: boolean;
                                items?: Array<{
                                    user_id_type?: string;
                                    user_id?: string;
                                    tenant_key?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/moderation`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.moderation&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/update document }
             *
             * 更新群发言权限
             *
             * 更新群组的发言权限设置，可设置为全员可发言、仅管理员可发言  或 指定用户可发言。
             *
             * 注意事项：; - 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 若以用户授权调用接口，**当授权用户是群主**时，可更新群发言权限;- 若以租户授权调用接口(即以机器人身份调用接口)，当**机器人是群主** 或者 **机器人是群组创建者、具备==更新应用所创建群的群信息==权限且仍在群内**时，可更新群发言权限
             */
            update: async (
                payload?: {
                    data?: {
                        moderation_setting?: string;
                        moderator_added_list?: Array<string>;
                        moderator_removed_list?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/moderation`,
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
         * 群组 - 会话标签页
         */
        chatTab: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/create document }
             *
             * 添加会话标签页
             *
             * 添加自定义会话标签页。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 只允许添加类型为`doc`和`url`的会话标签页;- 添加doc类型时，操作者（access token对应的身份）需要拥有对应文档的权限;- tab_config字段当前只对`url`类型的会话标签页生效;- 在开启 ==仅群主和管理员可管理标签页== 的设置时，仅群主和群管理员可以添加会话标签页;- 操作内部群时，操作者须与群组在同一租户下
             */
            create: async (
                payload?: {
                    data: {
                        chat_tabs: Array<{
                            tab_name?: string;
                            tab_type:
                                | "message"
                                | "doc_list"
                                | "doc"
                                | "pin"
                                | "meeting_minute"
                                | "chat_announcement"
                                | "url"
                                | "file";
                            tab_content?: {
                                url?: string;
                                doc?: string;
                                meeting_minute?: string;
                            };
                            tab_config?: {
                                icon_key?: string;
                                is_built_in?: boolean;
                            };
                        }>;
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                chat_tabs?: Array<{
                                    tab_id?: string;
                                    tab_name?: string;
                                    tab_type:
                                        | "message"
                                        | "doc_list"
                                        | "doc"
                                        | "pin"
                                        | "meeting_minute"
                                        | "chat_announcement"
                                        | "url"
                                        | "file";
                                    tab_content?: {
                                        url?: string;
                                        doc?: string;
                                        meeting_minute?: string;
                                    };
                                    tab_config?: {
                                        icon_key?: string;
                                        is_built_in?: boolean;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=delete_tabs&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/delete_tabs document }
             *
             * 删除会话标签页
             *
             * 删除会话标签页。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 只允许删除类型为`doc`和`url`的会话标签页;- 在开启 ==仅群主和管理员可管理标签页== 的设置时，仅群主和群管理员可以删除会话标签页;- 操作内部群时，操作者须与群组在同一租户下
             */
            deleteTabs: async (
                payload?: {
                    data: { tab_ids: Array<string> };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                chat_tabs?: Array<{
                                    tab_id?: string;
                                    tab_name?: string;
                                    tab_type:
                                        | "message"
                                        | "doc_list"
                                        | "doc"
                                        | "pin"
                                        | "meeting_minute"
                                        | "chat_announcement"
                                        | "url"
                                        | "file";
                                    tab_content?: {
                                        url?: string;
                                        doc?: string;
                                        meeting_minute?: string;
                                    };
                                    tab_config?: {
                                        icon_key?: string;
                                        is_built_in?: boolean;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/delete_tabs`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=list_tabs&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/list_tabs document }
             *
             * 拉取会话标签页
             *
             * 拉取会话标签页。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 操作内部群时，操作者须与群组在同一租户下
             */
            listTabs: async (
                payload?: {
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                chat_tabs?: Array<{
                                    tab_id?: string;
                                    tab_name?: string;
                                    tab_type:
                                        | "message"
                                        | "doc_list"
                                        | "doc"
                                        | "pin"
                                        | "meeting_minute"
                                        | "chat_announcement"
                                        | "url"
                                        | "file";
                                    tab_content?: {
                                        url?: string;
                                        doc?: string;
                                        meeting_minute?: string;
                                    };
                                    tab_config?: {
                                        icon_key?: string;
                                        is_built_in?: boolean;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/list_tabs`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=sort_tabs&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/sort_tabs document }
             *
             * 会话标签页排序
             *
             * 会话标签页排序。
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 消息标签页强制固定为第一顺位，不参与排序，但是请求体中必须包含该标签页的Tab ID;- 操作内部群时，操作者须与群组在同一租户下
             */
            sortTabs: async (
                payload?: {
                    data?: { tab_ids?: Array<string> };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                chat_tabs?: Array<{
                                    tab_id?: string;
                                    tab_name?: string;
                                    tab_type:
                                        | "message"
                                        | "doc_list"
                                        | "doc"
                                        | "pin"
                                        | "meeting_minute"
                                        | "chat_announcement"
                                        | "url"
                                        | "file";
                                    tab_content?: {
                                        url?: string;
                                        doc?: string;
                                        meeting_minute?: string;
                                    };
                                    tab_config?: {
                                        icon_key?: string;
                                        is_built_in?: boolean;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/sort_tabs`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=update_tabs&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/update_tabs document }
             *
             * 更新会话标签页
             *
             * 更新会话标签页
             *
             * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 只允许更新类型为`doc`和`url`的会话标签页;- 更新doc类型时，操作者（access token对应的身份）需要拥有对应文档的权限;- 在开启 ==仅群主和管理员可管理标签页== 的设置时，仅群主和群管理员可以更新会话标签页;- 操作内部群时，操作者须与群组在同一租户下
             */
            updateTabs: async (
                payload?: {
                    data?: {
                        chat_tabs?: Array<{
                            tab_id?: string;
                            tab_name?: string;
                            tab_type:
                                | "message"
                                | "doc_list"
                                | "doc"
                                | "pin"
                                | "meeting_minute"
                                | "chat_announcement"
                                | "url"
                                | "file";
                            tab_content?: {
                                url?: string;
                                doc?: string;
                                meeting_minute?: string;
                            };
                            tab_config?: {
                                icon_key?: string;
                                is_built_in?: boolean;
                            };
                        }>;
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                chat_tabs?: Array<{
                                    tab_id?: string;
                                    tab_name?: string;
                                    tab_type:
                                        | "message"
                                        | "doc_list"
                                        | "doc"
                                        | "pin"
                                        | "meeting_minute"
                                        | "chat_announcement"
                                        | "url"
                                        | "file";
                                    tab_content?: {
                                        url?: string;
                                        doc?: string;
                                        meeting_minute?: string;
                                    };
                                    tab_config?: {
                                        icon_key?: string;
                                        is_built_in?: boolean;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/update_tabs`,
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
         * chat.top_notice
         */
        chatTopNotice: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.top_notice&apiName=delete_top_notice&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/delete_top_notice document }
             *
             * 撤销群置顶
             *
             * 撤销会话中的置顶。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 机器人或授权用户必须在群组中;- 撤销内部群置顶时，操作者须与群组在同一租户下
             */
            deleteTopNotice: async (
                payload?: {
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/top_notice/delete_top_notice`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.top_notice&apiName=put_top_notice&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/put_top_notice document }
             *
             * 更新群置顶
             *
             * 更新会话中的群置顶信息，可以将群中的某一条消息，或者群公告置顶显示。
             *
             * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 机器人或授权用户必须在群组中;- 更新内部群置顶时，操作者须与群组在同一租户下
             */
            putTopNotice: async (
                payload?: {
                    data: {
                        chat_top_notice: Array<{
                            action_type?: "1" | "2";
                            message_id?: string;
                        }>;
                    };
                    path: { chat_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/chats/:chat_id/top_notice/put_top_notice`,
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
         * 消息 - 文件信息
         */
        file: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=file&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/file/create document }
             *
             * 上传文件
             *
             * 上传文件，可以上传视频，音频和常见的文件类型。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 文件大小不得超过30M，且不允许上传空文件
             */
            create: async (
                payload?: {
                    data: {
                        file_type:
                            | "opus"
                            | "mp4"
                            | "pdf"
                            | "doc"
                            | "xls"
                            | "ppt"
                            | "stream";
                        file_name: string;
                        duration?: number;
                        file: Buffer | fs.ReadStream;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { file_key?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/files`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers: {
                            ...headers,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                return get(res, "data", null);
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=file&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/file/get document }
             *
             * 下载文件
             *
             * 下载文件接口，只能下载应用自己上传的文件。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 只能下载机器人自己上传的文件;- 下载用户发送的资源，请使用[获取消息中的资源文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get)接口;- 下载的资源大小不能超过100M;- 如果需要Content-Disposition header，发起请求的时候需要在header中设置Content-Type为application/json
             */
            get: async (
                payload?: {
                    path: { file_key: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/files/:file_key`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                return {
                    writeFile: async (filePath: string) => {
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
                };
            },
        },
        /**
         * 消息 - 图片信息
         */
        image: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=image&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create document }
             *
             * 上传图片
             *
             * 上传图片接口，支持上传 JPEG、PNG、WEBP、GIF、TIFF、BMP、ICO格式图片。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 图片大小不得超过10M，且不支持上传大小为0的图片
             */
            create: async (
                payload?: {
                    data: {
                        image_type: "message" | "avatar";
                        image: Buffer | fs.ReadStream;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { image_key?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/images`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers: {
                            ...headers,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                return get(res, "data", null);
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=image&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/get document }
             *
             * 下载图片
             *
             * 下载图片资源，只能下载当前应用所上传且图片类型为message的图片。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 只能下载机器人自己上传且图片类型为message的图片，avatar类型暂不支持下载;- 下载用户发送的资源，请使用[获取消息中的资源文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get)接口
             */
            get: async (
                payload?: {
                    path: { image_key: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/images/:image_key`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                return {
                    writeFile: async (filePath: string) => {
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
                };
            },
        },
        /**
         * 消息 - 消息卡片
         */
        message: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create document }
             *
             * 发送消息
             *
             * 给指定用户或者会话发送消息，支持文本、富文本、可交互的[消息卡片](https://open.feishu.cn/document/ukTMukTMukTM/uczM3QjL3MzN04yNzcDN)、群名片、个人名片、图片、视频、音频、文件、表情包。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 给用户发送消息，需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability);- 给群组发送消息，需要机器人在群组中
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
                                    id_type: string;
                                    name: string;
                                    tenant_key?: string;
                                }>;
                                upper_message_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/delete document }
             *
             * 撤回消息
             *
             * 机器人撤回机器人自己发送的消息或群主撤回群内消息。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ，撤回消息时机器人仍需要在会话内;- 机器人可以撤回单聊和群组内，自己发送 且 发送时间不超过1天(24小时)的消息;- 若机器人要撤回群内他人发送的消息，则机器人必须是该群的群主、管理员 或者 创建者，且消息发送时间不超过1年;- 无法撤回通过「[批量发送消息](https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM)」接口发送的消息
             */
            delete: async (
                payload?: {
                    path: { message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=forward&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=forward&project=im&resource=message&version=v1 document }
             *
             * 转发一条消息
             */
            forward: async (
                payload?: {
                    data: { receive_id: string };
                    params: {
                        receive_id_type:
                            | "open_id"
                            | "user_id"
                            | "union_id"
                            | "email"
                            | "chat_id"
                            | "thread_id";
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
                                    id_type: string;
                                    name: string;
                                    tenant_key?: string;
                                }>;
                                upper_message_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/forward`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/get document }
             *
             * 获取指定消息的内容
             *
             * 通过 message_id 查询消息内容。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 机器人必须在群组中
             */
            get: async (
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
                                items?: Array<{
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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id`,
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
                    params: {
                        container_id_type: string;
                        container_id: string;
                        start_time?: string;
                        end_time?: string;
                        sort_type?: "ByCreateTimeAsc" | "ByCreateTimeDesc";
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
                                `${this.domain}/open-apis/im/v1/messages`,
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
                                                        id_type: string;
                                                        name: string;
                                                        tenant_key?: string;
                                                    }>;
                                                    upper_message_id?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/list document }
             *
             * 获取会话历史消息
             *
             * 获取会话（包括单聊、群组）的历史消息（聊天记录）。
             *
             * - 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 获取消息时，机器人必须在群组中
             *
             * 接口级别权限默认只能获取单聊（p2p）消息，如果需要获取群组（group）消息，应用还必须拥有 **==获取群组中所有消息==** 权限
             */
            list: async (
                payload?: {
                    params: {
                        container_id_type: string;
                        container_id: string;
                        start_time?: string;
                        end_time?: string;
                        sort_type?: "ByCreateTimeAsc" | "ByCreateTimeDesc";
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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=merge_forward&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=merge_forward&project=im&resource=message&version=v1 document }
             *
             * 合并转发多条消息
             */
            mergeForward: async (
                payload?: {
                    data: {
                        receive_id: string;
                        message_id_list: Array<string>;
                    };
                    params: {
                        receive_id_type:
                            | "open_id"
                            | "user_id"
                            | "union_id"
                            | "email"
                            | "chat_id"
                            | "thread_id";
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
                                message?: {
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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                                invalid_message_id_list?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/merge_forward`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/patch document }
             *
             * 更新应用发送的消息
             *
             * 更新应用已发送的消息卡片内容。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 若以user_access_token更新消息，该操作用户必须是卡片消息的发送者;- 仅支持对所有人更新**未撤回**的[「共享卡片」](ukTMukTMukTM/uAjNwUjLwYDM14CM2ATN)消息，需在卡片的config属性中，显式声明 =="update_multi":true==。 ;- **不支持更新批量消息**;- 文本消息请求体最大不能超过150KB；卡片及富文本消息请求体最大不能超过30KB;- 仅支持修改14天内发送的消息;- 单条消息更新频控为**5QPS**
             */
            patch: async (
                payload?: {
                    data: { content: string };
                    path: { message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=read_users&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/read_users document }
             *
             * 查询消息已读信息
             *
             * 查询消息的已读信息。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 只能查询机器人自己发送，且发送时间不超过7天的消息;- 查询消息已读信息时机器人仍需要在会话内;- 本接口不支持查询批量消息
             */
            readUsers: async (
                payload?: {
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
                        page_size?: number;
                        page_token?: string;
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
                                    user_id_type: string;
                                    user_id: string;
                                    timestamp: string;
                                    tenant_key?: string;
                                }>;
                                has_more: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/read_users`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=reply&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/reply document }
             *
             * 回复消息
             *
             * 回复指定消息，支持文本、富文本、卡片、群名片、个人名片、图片、视频、文件等多种消息类型。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 回复私聊消息，需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability);- 回复群组消息，需要机器人在群中
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
                                    id_type: string;
                                    name: string;
                                    tenant_key?: string;
                                }>;
                                upper_message_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/reply`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=im&resource=message&version=v1 document }
             *
             * 编辑已发送的消息内容，当前仅支持编辑文本和富文本消息。
             */
            update: async (
                payload?: {
                    data: { msg_type: string; content: string };
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
                                    id_type: string;
                                    name: string;
                                    tenant_key?: string;
                                }>;
                                upper_message_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=urgent_app&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_app document }
             *
             * 发送应用内加急
             *
             * 对指定消息进行应用内加急。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 不支持加急批量消息;- 只能加急机器人自己发送的消息;- 加急时机器人需要在加急消息所在的群中;- 调用本接口需要用户已阅读加急的消息才可以继续加急（用户未读的加急上限为200条）
             *
             * 特别说明：;- 默认接口限流为50 QPS，请谨慎调用
             */
            urgentApp: async (
                payload?: {
                    data: { user_id_list: Array<string> };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
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
                            data?: { invalid_user_id_list: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/urgent_app`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=urgent_phone&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_phone document }
             *
             * 发送电话加急
             *
             * 对指定消息进行应用内加急与电话加急。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 只能加急机器人自己发送的消息;- 加急时机器人需要在加急消息所在的群组中;- 需要用户阅读已加急的消息才可以继续加急（用户未读的加急上限为200条）
             *
             * 特别说明：;- 通过接口产生的电话加急将消耗企业的加急额度，请慎重调用;- 通过[租户管理后台](https://admin.feishu.cn/)-费用中心-短信/电话加急 可以查看当前额度;- 默认接口限流为50 QPS，请谨慎调用
             */
            urgentPhone: async (
                payload?: {
                    data: { user_id_list: Array<string> };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
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
                            data?: { invalid_user_id_list: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/urgent_phone`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=urgent_sms&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_sms document }
             *
             * 发送短信加急
             *
             * 对指定消息进行应用内加急与短信加急。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 只能加急机器人自己发送的消息;- 加急时机器人仍需要在加急消息所在的群组中;- 调用本接口需要用户已阅读加急的消息才可以继续加急（用户未读的加急上限为200条）
             *
             * 特别说明：;- 通过接口产生的短信加急将消耗企业的加急额度，请慎重调用;- 通过[租户管理后台](https://admin.feishu.cn/)-费用中心-短信/电话加急 可以查看当前额度;- 默认接口限流为50 QPS，请谨慎调用
             */
            urgentSms: async (
                payload?: {
                    data: { user_id_list: Array<string> };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
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
                            data?: { invalid_user_id_list: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/urgent_sms`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create document }
             *
             * 通过模版消息卡片发送消息
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 给用户发送消息，需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability);- 给群组发送消息，需要机器人在群组中
             */
            createByCard: async (
                payload?: {
                    data: {
                        receive_id: string;
                        uuid?: string;
                        template_id: string;
                        template_variable?: Record<string, any>;
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

                const { template_id, template_variable, ...rest } = data;
                const targetData = {
                    msg_type: "interactive",
                    content: JSON.stringify({
                        type: "template",
                        data: {
                            template_id: template_id,
                            template_variable: template_variable,
                        },
                    }),
                    ...rest,
                };

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
                                    id_type: string;
                                    name: string;
                                    tenant_key?: string;
                                }>;
                                upper_message_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages`,
                            path
                        ),
                        method: "POST",
                        data: targetData,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=reply&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/reply document }
             *
             * 通过模版消息卡片回复消息
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 回复私聊消息，需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability);- 回复群组消息，需要机器人在群中
             */
            replyByCard: async (
                payload?: {
                    data: {
                        reply_in_thread?: boolean;
                        uuid?: string;
                        template_id: string;
                        template_variable?: Record<string, any>;
                    };
                    path: { message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const { template_id, template_variable, ...rest } = data;
                const targetData = {
                    msg_type: "interactive",
                    content: JSON.stringify({
                        type: "template",
                        data: {
                            template_id: template_id,
                            template_variable: template_variable,
                        },
                    }),
                    ...rest,
                };

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
                                    id_type: string;
                                    name: string;
                                    tenant_key?: string;
                                }>;
                                upper_message_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/reply`,
                            path
                        ),
                        method: "POST",
                        data: targetData,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=im&resource=message&version=v1 document }
             *
             * 通过模版消息卡片
             */
            updateByCard: async (
                payload?: {
                    data: {
                        template_id: string;
                        template_variable?: Record<string, any>;
                    };
                    path: { message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const { template_id, template_variable, ...rest } = data;
                const targetData = {
                    msg_type: "interactive",
                    content: JSON.stringify({
                        type: "template",
                        data: {
                            template_id: template_id,
                            template_variable: template_variable,
                        },
                    }),
                    ...rest,
                };

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
                                    id_type: string;
                                    name: string;
                                    tenant_key?: string;
                                }>;
                                upper_message_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id`,
                            path
                        ),
                        method: "PUT",
                        data: targetData,
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
         * 消息 - 表情回复
         */
        messageReaction: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.reaction&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/create document }
             *
             * 添加消息表情回复
             *
             * 给指定消息添加指定类型的表情回复（reaction即表情回复，本文档统一用“reaction”代称）。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 待添加reaction的消息要真实存在，不能被撤回;- 给消息添加reaction，需要reaction的发送方（机器人或者用户）在消息所在的会话内
             */
            create: async (
                payload?: {
                    data: { reaction_type: { emoji_type: string } };
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
                                reaction_id?: string;
                                operator?: {
                                    operator_id: string;
                                    operator_type: "app" | "user";
                                };
                                action_time?: string;
                                reaction_type?: { emoji_type: string };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/reactions`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.reaction&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/delete document }
             *
             * 删除消息表情回复
             *
             * 删除指定消息的表情回复（reaction即表情回复，本文档统一用“reaction”代称）。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 只能删除真实存在的reaction，并且删除reaction请求的操作者必须是reaction的原始添加者
             */
            delete: async (
                payload?: {
                    path: { message_id: string; reaction_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                reaction_id?: string;
                                operator?: {
                                    operator_id: string;
                                    operator_type: "app" | "user";
                                };
                                action_time?: string;
                                reaction_type?: { emoji_type: string };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/reactions/:reaction_id`,
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
                    params?: {
                        reaction_type?: string;
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { message_id: string };
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
                                `${this.domain}/open-apis/im/v1/messages/:message_id/reactions`,
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
                                                items: Array<{
                                                    reaction_id?: string;
                                                    operator?: {
                                                        operator_id: string;
                                                        operator_type:
                                                            | "app"
                                                            | "user";
                                                    };
                                                    action_time?: string;
                                                    reaction_type?: {
                                                        emoji_type: string;
                                                    };
                                                }>;
                                                has_more: boolean;
                                                page_token: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.reaction&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/list document }
             *
             * 获取消息表情回复
             *
             * 获取指定消息的特定类型表情回复列表（reaction即表情回复，本文档统一用“reaction”代称）。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 待获取reaction信息的消息要真实存在，不能被撤回;- 获取消息的reaction，需要request的授权主体（机器人或者用户）在消息所在的会话内
             */
            list: async (
                payload?: {
                    params?: {
                        reaction_type?: string;
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "open_id" | "union_id" | "user_id";
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
                                items: Array<{
                                    reaction_id?: string;
                                    operator?: {
                                        operator_id: string;
                                        operator_type: "app" | "user";
                                    };
                                    action_time?: string;
                                    reaction_type?: { emoji_type: string };
                                }>;
                                has_more: boolean;
                                page_token: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/reactions`,
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
         * message.resource
         */
        messageResource: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.resource&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get document }
             *
             * 获取消息中的资源文件
             *
             * 获取消息中的资源文件，包括音频，视频，图片和文件，**暂不支持表情包资源下载**。当前仅支持 100M 以内的资源文件的下载。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人和消息需要在同一会话中;- 暂不支持获取合并转发消息中的子消息的资源文件
             */
            get: async (
                payload?: {
                    params: { type: string };
                    path: { message_id: string; file_key: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/messages/:message_id/resources/:file_key`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                return {
                    writeFile: async (filePath: string) => {
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
                };
            },
        },
        /**
         * 消息 - Pin
         */
        pin: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=pin&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/create document }
             *
             * Pin消息
             *
             * Pin一条指定的消息。
             *
             * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- Pin消息时，机器人必须在对应的群组中;- 若消息已经被Pin，返回该Pin的操作信息;- 不能Pin一条对操作者不可见的消息;- 对同一条消息的Pin操作不能超过==5 QPS==
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
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                pin?: {
                                    message_id: string;
                                    chat_id?: string;
                                    operator_id?: string;
                                    operator_id_type?: string;
                                    create_time?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/pins`,
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=pin&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/delete document }
             *
             * 移除Pin消息
             *
             * 移除一条指定消息的Pin。
             *
             * 注意事项：;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 移除Pin消息时，机器人必须在对应的群组中;- 若消息未被Pin或已被撤回，返回成功信息;- 不能移除一条对操作者不可见的Pin消息;- 对同一条消息移除Pin的操作不能超过==5 QPS==
             */
            delete: async (
                payload?: {
                    path: { message_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/pins/:message_id`,
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
                    params: {
                        chat_id: string;
                        start_time?: string;
                        end_time?: string;
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
                                `${this.domain}/open-apis/im/v1/pins`,
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
                                                    message_id: string;
                                                    chat_id?: string;
                                                    operator_id?: string;
                                                    operator_id_type?: string;
                                                    create_time?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=pin&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/list document }
             *
             * 获取群内Pin消息
             *
             * 获取所在群内指定时间范围内的所有Pin消息。
             *
             * 注意事项：;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 获取Pin消息时，机器人必须在群组中;- 获取的Pin消息按Pin的创建时间降序排列;- 接口默认限流为==50 QPS==
             */
            list: async (
                payload?: {
                    params: {
                        chat_id: string;
                        start_time?: string;
                        end_time?: string;
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
                                    message_id: string;
                                    chat_id?: string;
                                    operator_id?: string;
                                    operator_id_type?: string;
                                    create_time?: string;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/pins`,
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
         * thread
         */
        thread: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=im&resource=thread&apiName=forward&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=forward&project=im&resource=thread&version=v1 document }
             *
             * 转发
             */
            forward: async (
                payload?: {
                    data: { receive_id: string };
                    params: {
                        receive_id_type:
                            | "open_id"
                            | "user_id"
                            | "union_id"
                            | "email"
                            | "chat_id"
                            | "thread_id";
                        uuid?: string;
                    };
                    path: { thread_id: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    id_type: string;
                                    name: string;
                                    tenant_key?: string;
                                }>;
                                upper_message_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/im/v1/threads/:thread_id/forward`,
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
        v1: {
            /**
             * 消息 - 批量消息
             */
            batchMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=batch_message&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/delete document }
                 *
                 * 批量撤回消息
                 *
                 * 批量撤回通过[批量发送消息](https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM)接口发送的消息。
                 *
                 * 注意事项：;- 应用需要启用[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability) ;- 撤回单条发送的消息请使用[撤回消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/delete)接口;- 不支持撤回发出时间超过1天的消息;- 一次调用涉及大量消息，所以为异步接口，会有一定延迟。
                 */
                delete: async (
                    payload?: {
                        path: { batch_message_id: string };
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
                                `${this.domain}/open-apis/im/v1/batch_messages/:batch_message_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=batch_message&apiName=get_progress&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/get_progress document }
                 *
                 * 查询批量消息整体进度
                 *
                 * 该接口在[查询批量消息推送和阅读人数](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/read_user)查询结果的基础上，增加了批量请求中有效的userid数量以及消息撤回进度数据。
                 *
                 * 注意事项:;* 该接口返回的数据为查询时刻的快照数据
                 */
                getProgress: async (
                    payload?: {
                        path: { batch_message_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    batch_message_send_progress?: {
                                        valid_user_ids_count?: number;
                                        success_user_ids_count?: number;
                                        read_user_ids_count?: number;
                                    };
                                    batch_message_recall_progress?: {
                                        recall?: boolean;
                                        recall_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/batch_messages/:batch_message_id/get_progress`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=batch_message&apiName=read_user&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/read_user document }
                 *
                 * 查询批量消息推送和阅读人数
                 *
                 * 批量发送消息后，可以通过该接口查询批量消息推送的总人数和阅读人数。
                 *
                 * 注意事项：;- 只能查询通过[批量发送消息](https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM)接口产生的消息;- 该接口返回的数据为查询时刻的快照数据
                 */
                readUser: async (
                    payload?: {
                        path: { batch_message_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    read_user?: {
                                        read_count: string;
                                        total_count: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/batch_messages/:batch_message_id/read_user`,
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
             * 群组 - 群公告
             */
            chatAnnouncement: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.announcement&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/get document }
                 *
                 * 获取群公告信息
                 *
                 * 获取会话中的群公告信息，公告信息格式与[云文档](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)格式相同。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 获取内部群信息时，操作者须与群组在同一租户下
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    content?: string;
                                    revision?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    owner_id_type?:
                                        | "user_id"
                                        | "union_id"
                                        | "open_id"
                                        | "app_id";
                                    owner_id?: string;
                                    modifier_id_type?:
                                        | "user_id"
                                        | "union_id"
                                        | "open_id"
                                        | "app_id";
                                    modifier_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/announcement`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.announcement&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/patch document }
                 *
                 * 更新群公告信息
                 *
                 * 更新会话中的群公告信息，更新公告信息的格式和更新[云文档](https://open.feishu.cn/document/ukTMukTMukTM/uAzM5YjLwMTO24CMzkjN)格式相同。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 操作者需要拥有群公告文档的阅读权限;- 获取内部群信息时，操作者须与群组在同一租户下;- 若群开启了 ==仅群主和群管理员可编辑群信息== 配置，群主/群管理员 或 创建群组且具备 ==更新应用所创建群的群信息== 权限的机器人，可更新群公告;- 若群未开启 ==仅群主和群管理员可编辑群信息== 配置，所有成员可以更新群公告
                 */
                patch: async (
                    payload?: {
                        data: { revision: string; requests?: Array<string> };
                        path: { chat_id: string };
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
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/announcement`,
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
             * 群组
             */
            chat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/create document }
                 *
                 * 创建群
                 *
                 * 创建群并设置群头像、群名、群描述等。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 本接口支持在创建群的同时拉用户或机器人进群；如果仅需要拉用户或者机器人入群参考 [将用户或机器人拉入群聊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/create)接口
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
                            chat_mode?: string;
                            chat_type?: string;
                            external?: boolean;
                            join_message_visibility?: string;
                            leave_message_visibility?: string;
                            membership_approval?: string;
                            labels?: Array<string>;
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
                            urgent_setting?: "only_owner" | "all_members";
                            video_conference_setting?:
                                | "only_owner"
                                | "all_members";
                            edit_permission?: "only_owner" | "all_members";
                            chat_tags?: Array<string>;
                            pin_manage_setting?: "only_owner" | "all_members";
                            hide_member_count_setting?:
                                | "all_members"
                                | "only_owner";
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    urgent_setting?:
                                        | "only_owner"
                                        | "all_members";
                                    video_conference_setting?:
                                        | "only_owner"
                                        | "all_members";
                                    pin_manage_setting?:
                                        | "only_owner"
                                        | "all_members";
                                    add_member_permission?: string;
                                    share_card_permission?: string;
                                    at_all_permission?: string;
                                    edit_permission?: string;
                                    group_message_type?: string;
                                    chat_mode?: string;
                                    chat_type?: string;
                                    chat_tag?: string;
                                    external?: boolean;
                                    tenant_key?: string;
                                    join_message_visibility?: string;
                                    leave_message_visibility?: string;
                                    membership_approval?: string;
                                    moderation_permission?: string;
                                    labels?: Array<string>;
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
                                    hide_member_count_setting?:
                                        | "all_members"
                                        | "only_owner";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/delete document }
                 *
                 * 解散群
                 *
                 * 解散群组。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 如果使用tenant_access_token，需要机器人符合以下任一情况才可解散群：;    - 机器人是群主;    - 机器人是群的创建者且具备==更新应用所创建群的群信息==权限;- 如果使用user_access_token，需要对应的用户是群主才可解散群
                 */
                delete: async (
                    payload?: {
                        path: { chat_id: string };
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
                                `${this.domain}/open-apis/im/v1/chats/:chat_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get document }
                 *
                 * 获取群信息
                 *
                 * 获取群名称、群描述、群头像、群主 ID 等群基本信息。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 机器人或授权用户必须在群里（否则只会返回群名称、群头像等基本信息）;- 获取内部群信息时，操作者须与群组在同一租户下
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    avatar?: string;
                                    name?: string;
                                    description?: string;
                                    i18n_names?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    add_member_permission?: string;
                                    share_card_permission?: string;
                                    at_all_permission?: string;
                                    edit_permission?: string;
                                    owner_id_type?: string;
                                    owner_id?: string;
                                    user_manager_id_list?: Array<string>;
                                    bot_manager_id_list?: Array<string>;
                                    group_message_type?: string;
                                    chat_mode?: string;
                                    chat_type?: string;
                                    chat_tag?: string;
                                    join_message_visibility?: string;
                                    leave_message_visibility?: string;
                                    membership_approval?: string;
                                    moderation_permission?: string;
                                    external?: boolean;
                                    tenant_key?: string;
                                    user_count?: string;
                                    bot_count?: string;
                                    labels?: Array<string>;
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
                                    urgent_setting?:
                                        | "only_owner"
                                        | "all_members";
                                    video_conference_setting?:
                                        | "only_owner"
                                        | "all_members";
                                    pin_manage_setting?:
                                        | "only_owner"
                                        | "all_members";
                                    hide_member_count_setting?:
                                        | "all_members"
                                        | "only_owner";
                                    chat_status?:
                                        | "normal"
                                        | "dissolved"
                                        | "dissolved_save";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=link&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/link document }
                 *
                 * 获取群分享链接
                 *
                 * 获取指定群的分享链接。
                 *
                 * 注意事项:;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - access_token所对应的 **机器人** 或 **授权用户** 必须在`chat_id`参数指定的群组中;- 单聊、密聊、团队群不支持分享群链接;- 当Bot被停用或Bot退出群组时，Bot生成的群链接也将停用;- 当群聊开启了 ==仅群主和群管理员可添加群成员/分享群== 设置时，仅**群主**和**群管理员**可以获取群分享链接;- 获取内部群分享链接时，操作者须与群组在同一租户下
                 */
                link: async (
                    payload?: {
                        data?: {
                            validity_period?: "week" | "year" | "permanently";
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    share_link?: string;
                                    expire_time?: string;
                                    is_permanent?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/link`,
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            sort_type?: "ByCreateTimeAsc" | "ByActiveTimeDesc";
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
                                    `${this.domain}/open-apis/im/v1/chats`,
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
                                                        chat_id?: string;
                                                        avatar?: string;
                                                        name?: string;
                                                        description?: string;
                                                        owner_id?: string;
                                                        owner_id_type?: string;
                                                        external?: boolean;
                                                        tenant_key?: string;
                                                        labels?: Array<string>;
                                                        chat_status?:
                                                            | "normal"
                                                            | "dissolved"
                                                            | "dissolved_save";
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/list document }
                 *
                 * 获取用户或机器人所在的群列表
                 *
                 * 获取用户或者机器人所在群列表。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 请注意区分本接口和[获取群信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get)的请求 URL;- 获取的群列表不包含P2P单聊
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            sort_type?: "ByCreateTimeAsc" | "ByActiveTimeDesc";
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
                                        chat_id?: string;
                                        avatar?: string;
                                        name?: string;
                                        description?: string;
                                        owner_id?: string;
                                        owner_id_type?: string;
                                        external?: boolean;
                                        tenant_key?: string;
                                        labels?: Array<string>;
                                        chat_status?:
                                            | "normal"
                                            | "dissolved"
                                            | "dissolved_save";
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats`,
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
                searchWithIterator: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            query?: string;
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
                                    `${this.domain}/open-apis/im/v1/chats/search`,
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
                                                        chat_id?: string;
                                                        avatar?: string;
                                                        name?: string;
                                                        description?: string;
                                                        owner_id?: string;
                                                        owner_id_type?: string;
                                                        external?: boolean;
                                                        tenant_key?: string;
                                                        labels?: Array<string>;
                                                        chat_status?:
                                                            | "normal"
                                                            | "dissolved"
                                                            | "dissolved_save";
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/search document }
                 *
                 * 搜索对用户或机器人可见的群列表
                 *
                 * 搜索对用户或机器人可见的群列表，包括：用户或机器人所在的群、对用户或机器人公开的群。;搜索可获得的群信息包括：群ID（chat_id）、群名称、群描述等。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)
                 */
                search: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            query?: string;
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
                                        chat_id?: string;
                                        avatar?: string;
                                        name?: string;
                                        description?: string;
                                        owner_id?: string;
                                        owner_id_type?: string;
                                        external?: boolean;
                                        tenant_key?: string;
                                        labels?: Array<string>;
                                        chat_status?:
                                            | "normal"
                                            | "dissolved"
                                            | "dissolved_save";
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/update document }
                 *
                 * 更新群信息
                 *
                 * 更新群头像、群名称、群描述、群配置、转让群主等。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 对于群主/群管理员 或 创建群组且具备 ==更新应用所创建群的群信息== 权限的机器人，可更新所有信息;- 对于不满足上述权限条件的群成员或机器人：;    - 若未开启 ==仅群主和群管理员可编辑群信息== 配置，仅可更新群头像、群名称、群描述、群国际化名称信息;    - 若开启了 ==仅群主和群管理员可编辑群信息== 配置，任何群信息都不能修改;- 如果同时更新 ==邀请用户或机器人入群权限== 和 ==群分享权限== 这两项设置需要满足以下条件：;    - 若未开启 ==仅群主和管理员可以邀请用户或机器人入群==，需要设置 ==群分享权限== 为 ==允许分享==;    - 若开启了 ==仅群主和管理员可以邀请用户或机器人入群==，需要设置 ==群分享权限== 为 ==不允许分享==
                 */
                update: async (
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
                            add_member_permission?: string;
                            share_card_permission?: string;
                            at_all_permission?: string;
                            edit_permission?: string;
                            owner_id?: string;
                            join_message_visibility?: string;
                            leave_message_visibility?: string;
                            membership_approval?: string;
                            labels?: Array<string>;
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
                            chat_type?: string;
                            group_message_type?: "chat" | "thread";
                            urgent_setting?: "only_owner" | "all_members";
                            video_conference_setting?:
                                | "only_owner"
                                | "all_members";
                            pin_manage_setting?: "only_owner" | "all_members";
                            hide_member_count_setting?:
                                | "all_members"
                                | "only_owner";
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { chat_id: string };
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
                                `${this.domain}/open-apis/im/v1/chats/:chat_id`,
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
             * 群组 - 群成员
             */
            chatManagers: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.managers&apiName=add_managers&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/add_managers document }
                 *
                 * 指定群管理员
                 *
                 * 将用户或机器人指定为群管理员。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 仅有群主可以指定群管理员
                 */
                addManagers: async (
                    payload?: {
                        data?: { manager_ids?: Array<string> };
                        params?: {
                            member_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "app_id";
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    chat_managers?: Array<string>;
                                    chat_bot_managers?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/managers/add_managers`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.managers&apiName=delete_managers&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/delete_managers document }
                 *
                 * 删除群管理员
                 *
                 * 删除指定的群管理员（用户或机器人）。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 仅有群主可以删除群管理员
                 */
                deleteManagers: async (
                    payload?: {
                        data?: { manager_ids?: Array<string> };
                        params?: {
                            member_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "app_id";
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    chat_managers?: Array<string>;
                                    chat_bot_managers?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/managers/delete_managers`,
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
             * 群组 - 群成员
             */
            chatMembers: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/create document }
                 *
                 * 将用户或机器人拉入群聊
                 *
                 * 将用户或机器人拉入群聊。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 如需拉用户进群，需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability); - 机器人或授权用户必须在群组中;- 外部租户不能被加入到内部群中;- 操作内部群时，操作者须与群组在同一租户下; - 在开启 ==仅群主和群管理员可添加群成员== 的设置时，仅有群主/管理员 或 创建群组且具备 ==更新应用所创建群的群信息== 权限的机器人，可以拉用户或者机器人进群; - 在未开启 ==仅群主和群管理员可添加群成员== 的设置时，所有群成员都可以拉用户或机器人进群
                 */
                create: async (
                    payload?: {
                        data?: { id_list?: Array<string> };
                        params?: {
                            member_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "app_id";
                            succeed_type?: number;
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    invalid_id_list?: Array<string>;
                                    not_existed_id_list?: Array<string>;
                                    pending_approval_id_list?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/delete document }
                 *
                 * 将用户或机器人移出群聊
                 *
                 * 将用户或机器人移出群聊。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 用户或机器人在任何条件下均可移除自己出群（即主动退群）;- 仅有群主/管理员 或 创建群组并且具备 ==更新应用所创建群的群信息== 权限的机器人，可以移除其他用户或者机器人;- 每次请求，最多移除50个用户或者5个机器人;- 操作内部群时，操作者须与群组在同一租户下
                 */
                delete: async (
                    payload?: {
                        data?: { id_list?: Array<string> };
                        params?: {
                            member_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "app_id";
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { invalid_id_list?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/members`,
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
                getWithIterator: async (
                    payload?: {
                        params?: {
                            member_id_type?: "user_id" | "union_id" | "open_id";
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { chat_id: string };
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
                                    `${this.domain}/open-apis/im/v1/chats/:chat_id/members`,
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
                                                        member_id_type?: string;
                                                        member_id?: string;
                                                        name?: string;
                                                        tenant_key?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    member_total?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/get document }
                 *
                 * 获取群成员列表
                 *
                 * 获取用户/机器人所在群的群成员列表。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 机器人或授权用户必须在群组中; - 该接口不会返回群内的机器人成员; - 由于返回的群成员列表会过滤掉机器人成员，因此返回的群成员个数可能会小于指定的page_size; - 如果有同一时间加入群的群成员，会一次性返回，这会导致返回的群成员个数可能会大于指定的page_size;- 获取内部群信息时，操作者须与群组在同一租户下
                 */
                get: async (
                    payload?: {
                        params?: {
                            member_id_type?: "user_id" | "union_id" | "open_id";
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        member_id_type?: string;
                                        member_id?: string;
                                        name?: string;
                                        tenant_key?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    member_total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=is_in_chat&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/is_in_chat document }
                 *
                 * 判断用户或机器人是否在群里
                 *
                 * 根据使用的access_token判断对应的用户或者机器人是否在群里。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 获取内部群信息时，操作者须与群组在同一租户下
                 */
                isInChat: async (
                    payload?: {
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { is_in_chat?: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/members/is_in_chat`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=me_join&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/me_join document }
                 *
                 * 用户或机器人主动加入群聊
                 *
                 * 用户或机器人主动加入群聊。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 目前仅支持加入公开群;- 操作内部群时，操作者须与群组在同一租户下
                 */
                meJoin: async (
                    payload?: {
                        path: { chat_id: string };
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
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/members/me_join`,
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
             * chat.menu_item
             */
            chatMenuItem: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.menu_item&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_item/patch document }
                 *
                 * 修改群菜单元信息
                 *
                 * 修改某个一级菜单或者二级菜单的元信息。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 机器人必须在群里。
                 */
                patch: async (
                    payload?: {
                        data: {
                            update_fields: Array<
                                "ICON" | "NAME" | "I18N_NAME" | "REDIRECT_LINK"
                            >;
                            chat_menu_item: {
                                action_type?: "NONE" | "REDIRECT_LINK";
                                redirect_link?: {
                                    common_url?: string;
                                    ios_url?: string;
                                    android_url?: string;
                                    pc_url?: string;
                                    web_url?: string;
                                };
                                image_key?: string;
                                name?: string;
                                i18n_names?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                    ja_jp?: string;
                                };
                            };
                        };
                        path?: { chat_id?: string; menu_item_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    chat_menu_item?: {
                                        action_type?: "NONE" | "REDIRECT_LINK";
                                        redirect_link?: {
                                            common_url?: string;
                                            ios_url?: string;
                                            android_url?: string;
                                            pc_url?: string;
                                            web_url?: string;
                                        };
                                        image_key?: string;
                                        name?: string;
                                        i18n_names?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/menu_items/:menu_item_id`,
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
             * 群组 - 群菜单
             */
            chatMenuTree: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.menu_tree&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/create document }
                 *
                 * 添加群菜单
                 *
                 * 向群内添加群菜单。
                 *
                 * 注意事项：;- 该API是向群内追加菜单，群内原来存在的菜单并不会被覆盖。操作API后，将返回群内所有菜单。;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 机器人必须在群里。;- 一个群内，一级菜单最多有3个，每个一级菜单最多有5个二级菜单。
                 */
                create: async (
                    payload?: {
                        data: {
                            menu_tree: {
                                chat_menu_top_levels: Array<{
                                    chat_menu_item: {
                                        action_type: "NONE" | "REDIRECT_LINK";
                                        redirect_link?: {
                                            common_url?: string;
                                            ios_url?: string;
                                            android_url?: string;
                                            pc_url?: string;
                                            web_url?: string;
                                        };
                                        image_key?: string;
                                        name: string;
                                        i18n_names?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                    children?: Array<{
                                        chat_menu_item?: {
                                            action_type?:
                                                | "NONE"
                                                | "REDIRECT_LINK";
                                            redirect_link?: {
                                                common_url?: string;
                                                ios_url?: string;
                                                android_url?: string;
                                                pc_url?: string;
                                                web_url?: string;
                                            };
                                            image_key?: string;
                                            name?: string;
                                            i18n_names?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        };
                                    }>;
                                }>;
                            };
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
                                    menu_tree?: {
                                        chat_menu_top_levels?: Array<{
                                            chat_menu_top_level_id?: string;
                                            chat_menu_item?: {
                                                action_type?:
                                                    | "NONE"
                                                    | "REDIRECT_LINK";
                                                redirect_link?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                image_key?: string;
                                                name?: string;
                                                i18n_names?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                            };
                                            children?: Array<{
                                                chat_menu_second_level_id?: string;
                                                chat_menu_item?: {
                                                    action_type?:
                                                        | "NONE"
                                                        | "REDIRECT_LINK";
                                                    redirect_link?: {
                                                        common_url?: string;
                                                        ios_url?: string;
                                                        android_url?: string;
                                                        pc_url?: string;
                                                        web_url?: string;
                                                    };
                                                    image_key?: string;
                                                    name?: string;
                                                    i18n_names?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
                                                    };
                                                };
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/menu_tree`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.menu_tree&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/delete document }
                 *
                 * 删除群菜单。
                 *
                 * 删除群内菜单。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 机器人必须在群里。;- 操作API后，将返回群内所有菜单。
                 */
                delete: async (
                    payload?: {
                        data: { chat_menu_top_level_ids: Array<string> };
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
                                    menu_tree?: {
                                        chat_menu_top_levels?: Array<{
                                            chat_menu_top_level_id?: string;
                                            chat_menu_item?: {
                                                action_type?:
                                                    | "NONE"
                                                    | "REDIRECT_LINK";
                                                redirect_link?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                image_key?: string;
                                                name?: string;
                                                i18n_names?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                            };
                                            children?: Array<{
                                                chat_menu_second_level_id?: string;
                                                chat_menu_item?: {
                                                    action_type?:
                                                        | "NONE"
                                                        | "REDIRECT_LINK";
                                                    redirect_link?: {
                                                        common_url?: string;
                                                        ios_url?: string;
                                                        android_url?: string;
                                                        pc_url?: string;
                                                        web_url?: string;
                                                    };
                                                    image_key?: string;
                                                    name?: string;
                                                    i18n_names?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
                                                    };
                                                };
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/menu_tree`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.menu_tree&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/get document }
                 *
                 * 获取群内菜单
                 *
                 * 通过群ID获取群内菜单。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 机器人必须在群里。
                 */
                get: async (
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    menu_tree?: {
                                        chat_menu_top_levels?: Array<{
                                            chat_menu_top_level_id?: string;
                                            chat_menu_item?: {
                                                action_type?:
                                                    | "NONE"
                                                    | "REDIRECT_LINK";
                                                redirect_link?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                image_key?: string;
                                                name?: string;
                                                i18n_names?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                            };
                                            children?: Array<{
                                                chat_menu_second_level_id?: string;
                                                chat_menu_item?: {
                                                    action_type?:
                                                        | "NONE"
                                                        | "REDIRECT_LINK";
                                                    redirect_link?: {
                                                        common_url?: string;
                                                        ios_url?: string;
                                                        android_url?: string;
                                                        pc_url?: string;
                                                        web_url?: string;
                                                    };
                                                    image_key?: string;
                                                    name?: string;
                                                    i18n_names?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
                                                    };
                                                };
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/menu_tree`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.menu_tree&apiName=sort&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/sort document }
                 *
                 * 排序群菜单
                 *
                 * 给一个群内的一级菜单排序。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 机器人必须在群里。;- 操作API后，将返回群内所有菜单。
                 */
                sort: async (
                    payload?: {
                        data: { chat_menu_top_level_ids: Array<string> };
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
                                    menu_tree?: {
                                        chat_menu_top_levels?: Array<{
                                            chat_menu_top_level_id?: string;
                                            chat_menu_item?: {
                                                action_type?:
                                                    | "NONE"
                                                    | "REDIRECT_LINK";
                                                redirect_link?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                image_key?: string;
                                                name?: string;
                                                i18n_names?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                            };
                                            children?: Array<{
                                                chat_menu_second_level_id?: string;
                                                chat_menu_item?: {
                                                    action_type?:
                                                        | "NONE"
                                                        | "REDIRECT_LINK";
                                                    redirect_link?: {
                                                        common_url?: string;
                                                        ios_url?: string;
                                                        android_url?: string;
                                                        pc_url?: string;
                                                        web_url?: string;
                                                    };
                                                    image_key?: string;
                                                    name?: string;
                                                    i18n_names?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
                                                    };
                                                };
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/menu_tree/sort`,
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
             * chat.moderation
             */
            chatModeration: {
                getWithIterator: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { chat_id: string };
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
                                    `${this.domain}/open-apis/im/v1/chats/:chat_id/moderation`,
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
                                                    moderation_setting?: string;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    items?: Array<{
                                                        user_id_type?: string;
                                                        user_id?: string;
                                                        tenant_key?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.moderation&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/get document }
                 *
                 * 获取群成员发言权限
                 *
                 * 获取群发言模式、可发言用户名单等
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 机器人 或 授权用户 必须在群里
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    moderation_setting?: string;
                                    page_token?: string;
                                    has_more?: boolean;
                                    items?: Array<{
                                        user_id_type?: string;
                                        user_id?: string;
                                        tenant_key?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/moderation`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.moderation&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/update document }
                 *
                 * 更新群发言权限
                 *
                 * 更新群组的发言权限设置，可设置为全员可发言、仅管理员可发言  或 指定用户可发言。
                 *
                 * 注意事项：; - 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 若以用户授权调用接口，**当授权用户是群主**时，可更新群发言权限;- 若以租户授权调用接口(即以机器人身份调用接口)，当**机器人是群主** 或者 **机器人是群组创建者、具备==更新应用所创建群的群信息==权限且仍在群内**时，可更新群发言权限
                 */
                update: async (
                    payload?: {
                        data?: {
                            moderation_setting?: string;
                            moderator_added_list?: Array<string>;
                            moderator_removed_list?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { chat_id: string };
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
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/moderation`,
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
             * 群组 - 会话标签页
             */
            chatTab: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/create document }
                 *
                 * 添加会话标签页
                 *
                 * 添加自定义会话标签页。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 只允许添加类型为`doc`和`url`的会话标签页;- 添加doc类型时，操作者（access token对应的身份）需要拥有对应文档的权限;- tab_config字段当前只对`url`类型的会话标签页生效;- 在开启 ==仅群主和管理员可管理标签页== 的设置时，仅群主和群管理员可以添加会话标签页;- 操作内部群时，操作者须与群组在同一租户下
                 */
                create: async (
                    payload?: {
                        data: {
                            chat_tabs: Array<{
                                tab_name?: string;
                                tab_type:
                                    | "message"
                                    | "doc_list"
                                    | "doc"
                                    | "pin"
                                    | "meeting_minute"
                                    | "chat_announcement"
                                    | "url"
                                    | "file";
                                tab_content?: {
                                    url?: string;
                                    doc?: string;
                                    meeting_minute?: string;
                                };
                                tab_config?: {
                                    icon_key?: string;
                                    is_built_in?: boolean;
                                };
                            }>;
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    chat_tabs?: Array<{
                                        tab_id?: string;
                                        tab_name?: string;
                                        tab_type:
                                            | "message"
                                            | "doc_list"
                                            | "doc"
                                            | "pin"
                                            | "meeting_minute"
                                            | "chat_announcement"
                                            | "url"
                                            | "file";
                                        tab_content?: {
                                            url?: string;
                                            doc?: string;
                                            meeting_minute?: string;
                                        };
                                        tab_config?: {
                                            icon_key?: string;
                                            is_built_in?: boolean;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=delete_tabs&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/delete_tabs document }
                 *
                 * 删除会话标签页
                 *
                 * 删除会话标签页。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 只允许删除类型为`doc`和`url`的会话标签页;- 在开启 ==仅群主和管理员可管理标签页== 的设置时，仅群主和群管理员可以删除会话标签页;- 操作内部群时，操作者须与群组在同一租户下
                 */
                deleteTabs: async (
                    payload?: {
                        data: { tab_ids: Array<string> };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    chat_tabs?: Array<{
                                        tab_id?: string;
                                        tab_name?: string;
                                        tab_type:
                                            | "message"
                                            | "doc_list"
                                            | "doc"
                                            | "pin"
                                            | "meeting_minute"
                                            | "chat_announcement"
                                            | "url"
                                            | "file";
                                        tab_content?: {
                                            url?: string;
                                            doc?: string;
                                            meeting_minute?: string;
                                        };
                                        tab_config?: {
                                            icon_key?: string;
                                            is_built_in?: boolean;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/delete_tabs`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=list_tabs&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/list_tabs document }
                 *
                 * 拉取会话标签页
                 *
                 * 拉取会话标签页。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 操作内部群时，操作者须与群组在同一租户下
                 */
                listTabs: async (
                    payload?: {
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    chat_tabs?: Array<{
                                        tab_id?: string;
                                        tab_name?: string;
                                        tab_type:
                                            | "message"
                                            | "doc_list"
                                            | "doc"
                                            | "pin"
                                            | "meeting_minute"
                                            | "chat_announcement"
                                            | "url"
                                            | "file";
                                        tab_content?: {
                                            url?: string;
                                            doc?: string;
                                            meeting_minute?: string;
                                        };
                                        tab_config?: {
                                            icon_key?: string;
                                            is_built_in?: boolean;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/list_tabs`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=sort_tabs&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/sort_tabs document }
                 *
                 * 会话标签页排序
                 *
                 * 会话标签页排序。
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 消息标签页强制固定为第一顺位，不参与排序，但是请求体中必须包含该标签页的Tab ID;- 操作内部群时，操作者须与群组在同一租户下
                 */
                sortTabs: async (
                    payload?: {
                        data?: { tab_ids?: Array<string> };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    chat_tabs?: Array<{
                                        tab_id?: string;
                                        tab_name?: string;
                                        tab_type:
                                            | "message"
                                            | "doc_list"
                                            | "doc"
                                            | "pin"
                                            | "meeting_minute"
                                            | "chat_announcement"
                                            | "url"
                                            | "file";
                                        tab_content?: {
                                            url?: string;
                                            doc?: string;
                                            meeting_minute?: string;
                                        };
                                        tab_config?: {
                                            icon_key?: string;
                                            is_built_in?: boolean;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/sort_tabs`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=update_tabs&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/update_tabs document }
                 *
                 * 更新会话标签页
                 *
                 * 更新会话标签页
                 *
                 * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人或授权用户必须在群里;- 只允许更新类型为`doc`和`url`的会话标签页;- 更新doc类型时，操作者（access token对应的身份）需要拥有对应文档的权限;- 在开启 ==仅群主和管理员可管理标签页== 的设置时，仅群主和群管理员可以更新会话标签页;- 操作内部群时，操作者须与群组在同一租户下
                 */
                updateTabs: async (
                    payload?: {
                        data?: {
                            chat_tabs?: Array<{
                                tab_id?: string;
                                tab_name?: string;
                                tab_type:
                                    | "message"
                                    | "doc_list"
                                    | "doc"
                                    | "pin"
                                    | "meeting_minute"
                                    | "chat_announcement"
                                    | "url"
                                    | "file";
                                tab_content?: {
                                    url?: string;
                                    doc?: string;
                                    meeting_minute?: string;
                                };
                                tab_config?: {
                                    icon_key?: string;
                                    is_built_in?: boolean;
                                };
                            }>;
                        };
                        path: { chat_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    chat_tabs?: Array<{
                                        tab_id?: string;
                                        tab_name?: string;
                                        tab_type:
                                            | "message"
                                            | "doc_list"
                                            | "doc"
                                            | "pin"
                                            | "meeting_minute"
                                            | "chat_announcement"
                                            | "url"
                                            | "file";
                                        tab_content?: {
                                            url?: string;
                                            doc?: string;
                                            meeting_minute?: string;
                                        };
                                        tab_config?: {
                                            icon_key?: string;
                                            is_built_in?: boolean;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/update_tabs`,
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
             * chat.top_notice
             */
            chatTopNotice: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.top_notice&apiName=delete_top_notice&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/delete_top_notice document }
                 *
                 * 撤销群置顶
                 *
                 * 撤销会话中的置顶。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 机器人或授权用户必须在群组中;- 撤销内部群置顶时，操作者须与群组在同一租户下
                 */
                deleteTopNotice: async (
                    payload?: {
                        path: { chat_id: string };
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
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/top_notice/delete_top_notice`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.top_notice&apiName=put_top_notice&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/put_top_notice document }
                 *
                 * 更新群置顶
                 *
                 * 更新会话中的群置顶信息，可以将群中的某一条消息，或者群公告置顶显示。
                 *
                 * 注意事项：; - 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability); - 机器人或授权用户必须在群组中;- 更新内部群置顶时，操作者须与群组在同一租户下
                 */
                putTopNotice: async (
                    payload?: {
                        data: {
                            chat_top_notice: Array<{
                                action_type?: "1" | "2";
                                message_id?: string;
                            }>;
                        };
                        path: { chat_id: string };
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
                                `${this.domain}/open-apis/im/v1/chats/:chat_id/top_notice/put_top_notice`,
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
             * 消息 - 文件信息
             */
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=file&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/file/create document }
                 *
                 * 上传文件
                 *
                 * 上传文件，可以上传视频，音频和常见的文件类型。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 文件大小不得超过30M，且不允许上传空文件
                 */
                create: async (
                    payload?: {
                        data: {
                            file_type:
                                | "opus"
                                | "mp4"
                                | "pdf"
                                | "doc"
                                | "xls"
                                | "ppt"
                                | "stream";
                            file_name: string;
                            duration?: number;
                            file: Buffer | fs.ReadStream;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { file_key?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/files`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    return get(res, "data", null);
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=file&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/file/get document }
                 *
                 * 下载文件
                 *
                 * 下载文件接口，只能下载应用自己上传的文件。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 只能下载机器人自己上传的文件;- 下载用户发送的资源，请使用[获取消息中的资源文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get)接口;- 下载的资源大小不能超过100M;- 如果需要Content-Disposition header，发起请求的时候需要在header中设置Content-Type为application/json
                 */
                get: async (
                    payload?: {
                        path: { file_key: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/files/:file_key`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    return {
                        writeFile: async (filePath: string) => {
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
                    };
                },
            },
            /**
             * 消息 - 图片信息
             */
            image: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=image&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create document }
                 *
                 * 上传图片
                 *
                 * 上传图片接口，支持上传 JPEG、PNG、WEBP、GIF、TIFF、BMP、ICO格式图片。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 图片大小不得超过10M，且不支持上传大小为0的图片
                 */
                create: async (
                    payload?: {
                        data: {
                            image_type: "message" | "avatar";
                            image: Buffer | fs.ReadStream;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { image_key?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/images`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    return get(res, "data", null);
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=image&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/get document }
                 *
                 * 下载图片
                 *
                 * 下载图片资源，只能下载当前应用所上传且图片类型为message的图片。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 只能下载机器人自己上传且图片类型为message的图片，avatar类型暂不支持下载;- 下载用户发送的资源，请使用[获取消息中的资源文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get)接口
                 */
                get: async (
                    payload?: {
                        path: { image_key: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/images/:image_key`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    return {
                        writeFile: async (filePath: string) => {
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
                    };
                },
            },
            /**
             * 消息 - 消息卡片
             */
            message: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create document }
                 *
                 * 发送消息
                 *
                 * 给指定用户或者会话发送消息，支持文本、富文本、可交互的[消息卡片](https://open.feishu.cn/document/ukTMukTMukTM/uczM3QjL3MzN04yNzcDN)、群名片、个人名片、图片、视频、音频、文件、表情包。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 给用户发送消息，需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability);- 给群组发送消息，需要机器人在群组中
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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/delete document }
                 *
                 * 撤回消息
                 *
                 * 机器人撤回机器人自己发送的消息或群主撤回群内消息。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ，撤回消息时机器人仍需要在会话内;- 机器人可以撤回单聊和群组内，自己发送 且 发送时间不超过1天(24小时)的消息;- 若机器人要撤回群内他人发送的消息，则机器人必须是该群的群主、管理员 或者 创建者，且消息发送时间不超过1年;- 无法撤回通过「[批量发送消息](https://open.feishu.cn/document/ukTMukTMukTM/ucDO1EjL3gTNx4yN4UTM)」接口发送的消息
                 */
                delete: async (
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=forward&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=forward&project=im&resource=message&version=v1 document }
                 *
                 * 转发一条消息
                 */
                forward: async (
                    payload?: {
                        data: { receive_id: string };
                        params: {
                            receive_id_type:
                                | "open_id"
                                | "user_id"
                                | "union_id"
                                | "email"
                                | "chat_id"
                                | "thread_id";
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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/forward`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/get document }
                 *
                 * 获取指定消息的内容
                 *
                 * 通过 message_id 查询消息内容。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 机器人必须在群组中
                 */
                get: async (
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
                                    items?: Array<{
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
                                            id_type: string;
                                            name: string;
                                            tenant_key?: string;
                                        }>;
                                        upper_message_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id`,
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
                        params: {
                            container_id_type: string;
                            container_id: string;
                            start_time?: string;
                            end_time?: string;
                            sort_type?: "ByCreateTimeAsc" | "ByCreateTimeDesc";
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
                                    `${this.domain}/open-apis/im/v1/messages`,
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
                                                        body?: {
                                                            content: string;
                                                        };
                                                        mentions?: Array<{
                                                            key: string;
                                                            id: string;
                                                            id_type: string;
                                                            name: string;
                                                            tenant_key?: string;
                                                        }>;
                                                        upper_message_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/list document }
                 *
                 * 获取会话历史消息
                 *
                 * 获取会话（包括单聊、群组）的历史消息（聊天记录）。
                 *
                 * - 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 获取消息时，机器人必须在群组中
                 *
                 * 接口级别权限默认只能获取单聊（p2p）消息，如果需要获取群组（group）消息，应用还必须拥有 **==获取群组中所有消息==** 权限
                 */
                list: async (
                    payload?: {
                        params: {
                            container_id_type: string;
                            container_id: string;
                            start_time?: string;
                            end_time?: string;
                            sort_type?: "ByCreateTimeAsc" | "ByCreateTimeDesc";
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
                                            id_type: string;
                                            name: string;
                                            tenant_key?: string;
                                        }>;
                                        upper_message_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=merge_forward&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=merge_forward&project=im&resource=message&version=v1 document }
                 *
                 * 合并转发多条消息
                 */
                mergeForward: async (
                    payload?: {
                        data: {
                            receive_id: string;
                            message_id_list: Array<string>;
                        };
                        params: {
                            receive_id_type:
                                | "open_id"
                                | "user_id"
                                | "union_id"
                                | "email"
                                | "chat_id"
                                | "thread_id";
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
                                    message?: {
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
                                            id_type: string;
                                            name: string;
                                            tenant_key?: string;
                                        }>;
                                        upper_message_id?: string;
                                    };
                                    invalid_message_id_list?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/merge_forward`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/patch document }
                 *
                 * 更新应用发送的消息
                 *
                 * 更新应用已发送的消息卡片内容。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 若以user_access_token更新消息，该操作用户必须是卡片消息的发送者;- 仅支持对所有人更新**未撤回**的[「共享卡片」](ukTMukTMukTM/uAjNwUjLwYDM14CM2ATN)消息，需在卡片的config属性中，显式声明 =="update_multi":true==。 ;- **不支持更新批量消息**;- 文本消息请求体最大不能超过150KB；卡片及富文本消息请求体最大不能超过30KB;- 仅支持修改14天内发送的消息;- 单条消息更新频控为**5QPS**
                 */
                patch: async (
                    payload?: {
                        data: { content: string };
                        path: { message_id: string };
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
                                `${this.domain}/open-apis/im/v1/messages/:message_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=read_users&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/read_users document }
                 *
                 * 查询消息已读信息
                 *
                 * 查询消息的已读信息。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 只能查询机器人自己发送，且发送时间不超过7天的消息;- 查询消息已读信息时机器人仍需要在会话内;- 本接口不支持查询批量消息
                 */
                readUsers: async (
                    payload?: {
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
                            page_size?: number;
                            page_token?: string;
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
                                        user_id_type: string;
                                        user_id: string;
                                        timestamp: string;
                                        tenant_key?: string;
                                    }>;
                                    has_more: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/read_users`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=reply&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/reply document }
                 *
                 * 回复消息
                 *
                 * 回复指定消息，支持文本、富文本、卡片、群名片、个人名片、图片、视频、文件等多种消息类型。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 回复私聊消息，需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability);- 回复群组消息，需要机器人在群中
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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/reply`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=im&resource=message&version=v1 document }
                 *
                 * 编辑已发送的消息内容，当前仅支持编辑文本和富文本消息。
                 */
                update: async (
                    payload?: {
                        data: { msg_type: string; content: string };
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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=urgent_app&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_app document }
                 *
                 * 发送应用内加急
                 *
                 * 对指定消息进行应用内加急。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 不支持加急批量消息;- 只能加急机器人自己发送的消息;- 加急时机器人需要在加急消息所在的群中;- 调用本接口需要用户已阅读加急的消息才可以继续加急（用户未读的加急上限为200条）
                 *
                 * 特别说明：;- 默认接口限流为50 QPS，请谨慎调用
                 */
                urgentApp: async (
                    payload?: {
                        data: { user_id_list: Array<string> };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
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
                                data?: { invalid_user_id_list: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/urgent_app`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=urgent_phone&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_phone document }
                 *
                 * 发送电话加急
                 *
                 * 对指定消息进行应用内加急与电话加急。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 只能加急机器人自己发送的消息;- 加急时机器人需要在加急消息所在的群组中;- 需要用户阅读已加急的消息才可以继续加急（用户未读的加急上限为200条）
                 *
                 * 特别说明：;- 通过接口产生的电话加急将消耗企业的加急额度，请慎重调用;- 通过[租户管理后台](https://admin.feishu.cn/)-费用中心-短信/电话加急 可以查看当前额度;- 默认接口限流为50 QPS，请谨慎调用
                 */
                urgentPhone: async (
                    payload?: {
                        data: { user_id_list: Array<string> };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
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
                                data?: { invalid_user_id_list: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/urgent_phone`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=urgent_sms&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_sms document }
                 *
                 * 发送短信加急
                 *
                 * 对指定消息进行应用内加急与短信加急。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 只能加急机器人自己发送的消息;- 加急时机器人仍需要在加急消息所在的群组中;- 调用本接口需要用户已阅读加急的消息才可以继续加急（用户未读的加急上限为200条）
                 *
                 * 特别说明：;- 通过接口产生的短信加急将消耗企业的加急额度，请慎重调用;- 通过[租户管理后台](https://admin.feishu.cn/)-费用中心-短信/电话加急 可以查看当前额度;- 默认接口限流为50 QPS，请谨慎调用
                 */
                urgentSms: async (
                    payload?: {
                        data: { user_id_list: Array<string> };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
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
                                data?: { invalid_user_id_list: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/urgent_sms`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create document }
                 *
                 * 通过模版消息卡片发送消息
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 给用户发送消息，需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability);- 给群组发送消息，需要机器人在群组中
                 */
                createByCard: async (
                    payload?: {
                        data: {
                            receive_id: string;
                            uuid?: string;
                            template_id: string;
                            template_variable?: Record<string, any>;
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

                    const { template_id, template_variable, ...rest } = data;
                    const targetData = {
                        msg_type: "interactive",
                        content: JSON.stringify({
                            type: "template",
                            data: {
                                template_id: template_id,
                                template_variable: template_variable,
                            },
                        }),
                        ...rest,
                    };

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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages`,
                                path
                            ),
                            method: "POST",
                            data: targetData,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=reply&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/reply document }
                 *
                 * 通过模版消息卡片回复消息
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 回复私聊消息，需要机器人对用户有[可用性](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability);- 回复群组消息，需要机器人在群中
                 */
                replyByCard: async (
                    payload?: {
                        data: {
                            reply_in_thread?: boolean;
                            uuid?: string;
                            template_id: string;
                            template_variable?: Record<string, any>;
                        };
                        path: { message_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const { template_id, template_variable, ...rest } = data;
                    const targetData = {
                        msg_type: "interactive",
                        content: JSON.stringify({
                            type: "template",
                            data: {
                                template_id: template_id,
                                template_variable: template_variable,
                            },
                        }),
                        ...rest,
                    };

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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/reply`,
                                path
                            ),
                            method: "POST",
                            data: targetData,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=im&resource=message&version=v1 document }
                 *
                 * 通过模版消息卡片
                 */
                updateByCard: async (
                    payload?: {
                        data: {
                            template_id: string;
                            template_variable?: Record<string, any>;
                        };
                        path: { message_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const { template_id, template_variable, ...rest } = data;
                    const targetData = {
                        msg_type: "interactive",
                        content: JSON.stringify({
                            type: "template",
                            data: {
                                template_id: template_id,
                                template_variable: template_variable,
                            },
                        }),
                        ...rest,
                    };

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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id`,
                                path
                            ),
                            method: "PUT",
                            data: targetData,
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
             * 消息 - 表情回复
             */
            messageReaction: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.reaction&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/create document }
                 *
                 * 添加消息表情回复
                 *
                 * 给指定消息添加指定类型的表情回复（reaction即表情回复，本文档统一用“reaction”代称）。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 待添加reaction的消息要真实存在，不能被撤回;- 给消息添加reaction，需要reaction的发送方（机器人或者用户）在消息所在的会话内
                 */
                create: async (
                    payload?: {
                        data: { reaction_type: { emoji_type: string } };
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
                                    reaction_id?: string;
                                    operator?: {
                                        operator_id: string;
                                        operator_type: "app" | "user";
                                    };
                                    action_time?: string;
                                    reaction_type?: { emoji_type: string };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/reactions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.reaction&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/delete document }
                 *
                 * 删除消息表情回复
                 *
                 * 删除指定消息的表情回复（reaction即表情回复，本文档统一用“reaction”代称）。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 只能删除真实存在的reaction，并且删除reaction请求的操作者必须是reaction的原始添加者
                 */
                delete: async (
                    payload?: {
                        path: { message_id: string; reaction_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    reaction_id?: string;
                                    operator?: {
                                        operator_id: string;
                                        operator_type: "app" | "user";
                                    };
                                    action_time?: string;
                                    reaction_type?: { emoji_type: string };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/reactions/:reaction_id`,
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
                        params?: {
                            reaction_type?: string;
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { message_id: string };
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
                                    `${this.domain}/open-apis/im/v1/messages/:message_id/reactions`,
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
                                                    items: Array<{
                                                        reaction_id?: string;
                                                        operator?: {
                                                            operator_id: string;
                                                            operator_type:
                                                                | "app"
                                                                | "user";
                                                        };
                                                        action_time?: string;
                                                        reaction_type?: {
                                                            emoji_type: string;
                                                        };
                                                    }>;
                                                    has_more: boolean;
                                                    page_token: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.reaction&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/list document }
                 *
                 * 获取消息表情回复
                 *
                 * 获取指定消息的特定类型表情回复列表（reaction即表情回复，本文档统一用“reaction”代称）。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 待获取reaction信息的消息要真实存在，不能被撤回;- 获取消息的reaction，需要request的授权主体（机器人或者用户）在消息所在的会话内
                 */
                list: async (
                    payload?: {
                        params?: {
                            reaction_type?: string;
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
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
                                    items: Array<{
                                        reaction_id?: string;
                                        operator?: {
                                            operator_id: string;
                                            operator_type: "app" | "user";
                                        };
                                        action_time?: string;
                                        reaction_type?: { emoji_type: string };
                                    }>;
                                    has_more: boolean;
                                    page_token: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/reactions`,
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
             * message.resource
             */
            messageResource: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.resource&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get document }
                 *
                 * 获取消息中的资源文件
                 *
                 * 获取消息中的资源文件，包括音频，视频，图片和文件，**暂不支持表情包资源下载**。当前仅支持 100M 以内的资源文件的下载。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 机器人和消息需要在同一会话中;- 暂不支持获取合并转发消息中的子消息的资源文件
                 */
                get: async (
                    payload?: {
                        params: { type: string };
                        path: { message_id: string; file_key: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/messages/:message_id/resources/:file_key`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    return {
                        writeFile: async (filePath: string) => {
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
                    };
                },
            },
            /**
             * 消息 - Pin
             */
            pin: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=pin&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/create document }
                 *
                 * Pin消息
                 *
                 * Pin一条指定的消息。
                 *
                 * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- Pin消息时，机器人必须在对应的群组中;- 若消息已经被Pin，返回该Pin的操作信息;- 不能Pin一条对操作者不可见的消息;- 对同一条消息的Pin操作不能超过==5 QPS==
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    pin?: {
                                        message_id: string;
                                        chat_id?: string;
                                        operator_id?: string;
                                        operator_id_type?: string;
                                        create_time?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/pins`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=pin&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/delete document }
                 *
                 * 移除Pin消息
                 *
                 * 移除一条指定消息的Pin。
                 *
                 * 注意事项：;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 移除Pin消息时，机器人必须在对应的群组中;- 若消息未被Pin或已被撤回，返回成功信息;- 不能移除一条对操作者不可见的Pin消息;- 对同一条消息移除Pin的操作不能超过==5 QPS==
                 */
                delete: async (
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/pins/:message_id`,
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
                        params: {
                            chat_id: string;
                            start_time?: string;
                            end_time?: string;
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
                                    `${this.domain}/open-apis/im/v1/pins`,
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
                                                        message_id: string;
                                                        chat_id?: string;
                                                        operator_id?: string;
                                                        operator_id_type?: string;
                                                        create_time?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=pin&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/list document }
                 *
                 * 获取群内Pin消息
                 *
                 * 获取所在群内指定时间范围内的所有Pin消息。
                 *
                 * 注意事项：;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 获取Pin消息时，机器人必须在群组中;- 获取的Pin消息按Pin的创建时间降序排列;- 接口默认限流为==50 QPS==
                 */
                list: async (
                    payload?: {
                        params: {
                            chat_id: string;
                            start_time?: string;
                            end_time?: string;
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
                                        message_id: string;
                                        chat_id?: string;
                                        operator_id?: string;
                                        operator_id_type?: string;
                                        create_time?: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/pins`,
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
             * thread
             */
            thread: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=thread&apiName=forward&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=forward&project=im&resource=thread&version=v1 document }
                 *
                 * 转发
                 */
                forward: async (
                    payload?: {
                        data: { receive_id: string };
                        params: {
                            receive_id_type:
                                | "open_id"
                                | "user_id"
                                | "union_id"
                                | "email"
                                | "chat_id"
                                | "thread_id";
                            uuid?: string;
                        };
                        path: { thread_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        id_type: string;
                                        name: string;
                                        tenant_key?: string;
                                    }>;
                                    upper_message_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v1/threads/:thread_id/forward`,
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
        },
        v2: {
            /**
             * app_feed_card.batch
             */
            appFeedCardBatch: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=app_feed_card.batch&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=im&resource=app_feed_card.batch&version=v2 document }
                 */
                delete: async (
                    payload?: {
                        data?: {
                            feed_cards?: Array<{
                                biz_id: string;
                                user_id: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
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
                                    failed_cards?: Array<{
                                        biz_id: string;
                                        user_id: string;
                                        reason?: "0" | "1" | "2" | "3" | "4";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v2/app_feed_card/batch`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=app_feed_card.batch&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=im&resource=app_feed_card.batch&version=v2 document }
                 */
                update: async (
                    payload?: {
                        data?: {
                            feed_cards?: Array<{
                                app_feed_card: {
                                    biz_id?: string;
                                    title?: string;
                                    avatar_key?: string;
                                    preview?: string;
                                    status_label?: {
                                        text: string;
                                        type:
                                            | "primary"
                                            | "secondary"
                                            | "success"
                                            | "danger";
                                    };
                                    buttons?: {
                                        buttons: Array<{
                                            multi_url?: {
                                                url?: string;
                                                android_url?: string;
                                                ios_url?: string;
                                                pc_url?: string;
                                            };
                                            action_type: "url_page" | "webhook";
                                            text: { text: string };
                                            button_type?:
                                                | "default"
                                                | "primary"
                                                | "success";
                                            action_map?: Record<string, string>;
                                        }>;
                                    };
                                    link?: { link?: string };
                                    time_sensitive?: boolean;
                                    notify?: {
                                        close_notify?: boolean;
                                        custom_sound_text?: string;
                                        with_custom_sound?: boolean;
                                    };
                                };
                                user_id: string;
                                update_fields: Array<
                                    | "1"
                                    | "2"
                                    | "3"
                                    | "10"
                                    | "11"
                                    | "12"
                                    | "13"
                                    | "101"
                                    | "102"
                                    | "103"
                                >;
                            }>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
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
                                    failed_cards?: Array<{
                                        biz_id: string;
                                        user_id: string;
                                        reason?: "0" | "1" | "2" | "3" | "4";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v2/app_feed_card/batch`,
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
             * app_feed_card
             */
            appFeedCard: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=app_feed_card&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=im&resource=app_feed_card&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            app_feed_card?: {
                                biz_id?: string;
                                title?: string;
                                avatar_key?: string;
                                preview?: string;
                                status_label?: {
                                    text: string;
                                    type:
                                        | "primary"
                                        | "secondary"
                                        | "success"
                                        | "danger";
                                };
                                buttons?: {
                                    buttons: Array<{
                                        multi_url?: {
                                            url?: string;
                                            android_url?: string;
                                            ios_url?: string;
                                            pc_url?: string;
                                        };
                                        action_type: "url_page" | "webhook";
                                        text: { text: string };
                                        button_type?:
                                            | "default"
                                            | "primary"
                                            | "success";
                                        action_map?: Record<string, string>;
                                    }>;
                                };
                                link?: { link?: string };
                                time_sensitive?: boolean;
                                notify?: {
                                    close_notify?: boolean;
                                    custom_sound_text?: string;
                                    with_custom_sound?: boolean;
                                };
                            };
                            user_ids?: Array<string>;
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
                                    failed_cards?: Array<{
                                        biz_id: string;
                                        user_id: string;
                                        reason?: "0" | "1" | "2" | "3" | "4";
                                    }>;
                                    biz_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v2/app_feed_card`,
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
             * biz_entity_tag_relation
             */
            bizEntityTagRelation: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=biz_entity_tag_relation&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=im&resource=biz_entity_tag_relation&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            tag_biz_type: "chat";
                            biz_entity_id: string;
                            tag_ids?: Array<string>;
                            bot_id?: string;
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
                                `${this.domain}/open-apis/im/v2/biz_entity_tag_relation`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=biz_entity_tag_relation&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=im&resource=biz_entity_tag_relation&version=v2 document }
                 */
                get: async (
                    payload?: {
                        params: {
                            tag_biz_type: "chat";
                            biz_entity_id: string;
                            bot_id?: string;
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
                                    tag_info_with_bind_versions?: Array<{
                                        tag_info?: {
                                            id?: string;
                                            tag_type?: string;
                                            name?: string;
                                            i18n_names?: Array<{
                                                locale: string;
                                                name?: string;
                                            }>;
                                            create_time?: string;
                                            update_time?: string;
                                        };
                                        bind_version?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v2/biz_entity_tag_relation`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=biz_entity_tag_relation&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=im&resource=biz_entity_tag_relation&version=v2 document }
                 */
                update: async (
                    payload?: {
                        data: {
                            tag_biz_type: "chat";
                            biz_entity_id: string;
                            tag_ids?: Array<string>;
                            bot_id?: string;
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
                                `${this.domain}/open-apis/im/v2/biz_entity_tag_relation`,
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
             * chat_button
             */
            chatButton: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat_button&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=im&resource=chat_button&version=v2 document }
                 */
                update: async (
                    payload?: {
                        data: {
                            user_ids?: Array<string>;
                            chat_id: string;
                            buttons?: {
                                buttons: Array<{
                                    multi_url?: {
                                        url?: string;
                                        android_url?: string;
                                        ios_url?: string;
                                        pc_url?: string;
                                    };
                                    action_type: "url_page" | "webhook";
                                    text: { text: string };
                                    button_type?:
                                        | "default"
                                        | "primary"
                                        | "success";
                                    action_map?: Record<string, string>;
                                }>;
                            };
                            bot_id?: string;
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
                                    failed_user_reasons?: Array<{
                                        error_code?: number;
                                        error_message?: string;
                                        user_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v2/chat_button`,
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
             * feed_card
             */
            feedCard: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=feed_card&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=im&resource=feed_card&version=v2 document }
                 */
                patch: async (
                    payload?: {
                        data: {
                            time_sensitive: boolean;
                            user_ids: Array<string>;
                        };
                        params: {
                            user_id_type: "open_id" | "user_id" | "union_id";
                        };
                        path: { feed_card_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    failed_user_reasons?: Array<{
                                        error_code?: number;
                                        error_message?: string;
                                        user_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v2/feed_cards/:feed_card_id`,
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
             * tag
             */
            tag: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=tag&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=im&resource=tag&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            create_tag: {
                                tag_type: "tenant";
                                name: string;
                                i18n_names?: Array<{
                                    locale: string;
                                    name?: string;
                                }>;
                            };
                            bot_id?: string;
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
                                    id?: string;
                                    create_tag_fail_reason?: {
                                        duplicate_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v2/tags`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=tag&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=im&resource=tag&version=v2 document }
                 */
                patch: async (
                    payload?: {
                        data?: {
                            patch_tag?: {
                                id?: string;
                                name?: string;
                                i18n_names?: Array<{
                                    locale: string;
                                    name?: string;
                                }>;
                            };
                            bot_id?: string;
                        };
                        path: { tag_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    tag_info?: {
                                        id?: string;
                                        tag_type?: string;
                                        name?: string;
                                        i18n_names?: Array<{
                                            locale: string;
                                            name?: string;
                                        }>;
                                        create_time?: string;
                                        update_time?: string;
                                    };
                                    patch_tag_fail_reason?: {
                                        duplicate_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/im/v2/tags/:tag_id`,
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
             * url_preview
             */
            urlPreview: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=url_preview&apiName=batch_update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=im&resource=url_preview&version=v2 document }
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            preview_tokens: Array<string>;
                            open_ids?: Array<string>;
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
                                `${this.domain}/open-apis/im/v2/url_previews/batch_update`,
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
        },
    };
}
