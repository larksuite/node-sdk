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
import gtm_ai from "./gtm_ai";

// auto gen
export default abstract class Client extends gtm_ai {
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
    helpdesk = {
        /**
         * agent
         */
        agent: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent&apiName=agent_email&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=agent_email&project=helpdesk&resource=agent&version=v1 document }
             *
             * 获取客服邮箱
             *
             * 该接口用于获取客服邮箱地址。
             */
            agentEmail: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { agents?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agent_emails`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=agent&version=v1 document }
             *
             * 更新客服信息
             *
             * 更新客服状态等信息。
             */
            patch: async (
                payload?: {
                    data?: { status?: number };
                    path: { agent_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agents/:agent_id`,
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
         * agent_schedule
         */
        agentSchedule: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_schedule&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=agent_schedule&version=v1 document }
             *
             * 创建客服工作日程
             *
             * 该接口用于创建客服日程。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
             */
            create: async (
                payload?: {
                    data?: {
                        agent_schedules?: Array<{
                            agent_id?: string;
                            schedule?: Array<{
                                start_time?: string;
                                end_time?: string;
                                weekday?: number;
                            }>;
                            agent_skill_ids?: Array<string>;
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agent_schedules`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_schedule&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=agent_schedule&version=v1 document }
             *
             * 查询全部客服工作日程
             *
             * 该接口用于获取所有客服信息。
             */
            list: async (
                payload?: {
                    params: { status: Array<number> };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                agent_schedules?: Array<{
                                    status?: number;
                                    agent?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        company_name?: string;
                                    };
                                    schedule?: Array<{
                                        start_time?: string;
                                        end_time?: string;
                                        weekday?: number;
                                    }>;
                                    agent_skills?: Array<{
                                        id?: string;
                                        name?: string;
                                        is_default?: boolean;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agent_schedules`,
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
         * agent_skill
         */
        agentSkill: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=agent_skill&version=v1 document }
             *
             * 创建客服技能
             *
             * 该接口用于创建客服技能。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
             */
            create: async (
                payload?: {
                    data?: {
                        name?: string;
                        rules?: Array<{
                            id?: string;
                            selected_operator?: number;
                            operand?: string;
                            category?: number;
                        }>;
                        agent_ids?: Array<string>;
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
                            data?: { agent_skill_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agent_skills`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=agent_skill&version=v1 document }
             *
             * 更新客服技能
             *
             * 该接口用于更新客服技能。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
             */
            patch: async (
                payload?: {
                    data?: {
                        agent_skill?: {
                            name?: string;
                            rules?: Array<{
                                id?: string;
                                selected_operator?: number;
                                operator_options?: Array<number>;
                                operand?: string;
                            }>;
                            agent_ids?: Array<string>;
                            agent_skill_id?: string;
                        };
                    };
                    path: { agent_skill_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agent_skills/:agent_skill_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=agent_skill&version=v1 document }
             *
             * 查询指定客服技能
             *
             * 该接口用于获取客服技能。
             */
            get: async (
                payload?: {
                    path?: { agent_skill_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                agent_skill?: {
                                    id?: string;
                                    name?: string;
                                    rules?: Array<{
                                        id?: string;
                                        selected_operator?: number;
                                        operator_options?: Array<number>;
                                        operand?: string;
                                        category?: number;
                                        display_name?: string;
                                    }>;
                                    agent_ids?: Array<string>;
                                    is_default?: boolean;
                                    agents?: Array<{
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                    }>;
                                    agent_skill_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agent_skills/:agent_skill_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=helpdesk&resource=agent_skill&version=v1 document }
             *
             * 删除客服技能
             *
             * 该接口用于删除客服技能。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
             */
            delete: async (
                payload?: {
                    path?: { agent_skill_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agent_skills/:agent_skill_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=agent_skill&version=v1 document }
             *
             * 查询全部客服技能
             *
             * 获取全部客服技能。
             */
            list: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                agent_skills?: Array<{
                                    id?: string;
                                    name?: string;
                                    agent_ids?: Array<string>;
                                    is_default?: boolean;
                                    agent_skill_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agent_skills`,
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
         * agent_skill_rule
         */
        agentSkillRule: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill_rule&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=agent_skill_rule&version=v1 document }
             *
             * 获取客服技能列表
             *
             * 该接口用于获取全部客服技能。仅支持自建应用。
             */
            list: async (payload?: {}, options?: IRequestOptions) => {
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
                                    id?: string;
                                    operator_options?: Array<number>;
                                    operand?: string;
                                    category?: number;
                                    display_name?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agent_skill_rules`,
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
         * category
         */
        category: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=category&version=v1 document }
             *
             * list all categories
             */
            list: async (
                payload?: {
                    params?: {
                        lang?: string;
                        order_by?: number;
                        asc?: boolean;
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
                                categories?: Array<{
                                    category_id: string;
                                    id: string;
                                    name: string;
                                    parent_id: string;
                                    helpdesk_id: string;
                                    language?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/categories`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=category&version=v1 document }
             *
             * 创建知识库分类
             *
             * 该接口用于创建知识库分类。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        parent_id: string;
                        language?: string;
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
                                category?: {
                                    category_id: string;
                                    id: string;
                                    name: string;
                                    parent_id: string;
                                    helpdesk_id: string;
                                    language?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/categories`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=category&version=v1 document }
             *
             * 更新知识库分类详情
             *
             * 该接口用于更新知识库分类详情。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
             */
            patch: async (
                payload?: {
                    data?: { name?: string; parent_id?: string };
                    path: { id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/categories/:id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=helpdesk&resource=category&version=v1 document }
             *
             * 删除知识库分类详情
             *
             * 该接口用于删除知识库分类详情。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
             */
            delete: async (
                payload?: {
                    path: { id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/categories/:id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=category&version=v1 document }
             *
             * 获取知识库分类
             *
             * 该接口用于获取知识库分类。
             */
            get: async (
                payload?: {
                    path: { id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                category_id: string;
                                id: string;
                                name: string;
                                helpdesk_id: string;
                                language?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/categories/:id`,
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
         * event
         */
        event: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=event&apiName=subscribe&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscribe&project=helpdesk&resource=event&version=v1 document }
             *
             * 订阅服务台事件
             *
             * 本接口用于订阅服务台事件。
             */
            subscribe: async (
                payload?: {
                    data: { events: Array<{ type: string; subtype: string }> };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/events/subscribe`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=event&apiName=unsubscribe&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscribe&project=helpdesk&resource=event&version=v1 document }
             *
             * 取消订阅服务台事件
             *
             * 本接口用于取消订阅服务台事件。
             */
            unsubscribe: async (
                payload?: {
                    data: { events: Array<{ type: string; subtype: string }> };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/events/unsubscribe`,
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
         * faq
         */
        faq: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=faq_image&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=faq_image&project=helpdesk&resource=faq&version=v1 document }
             *
             * 获取知识库图像
             *
             * 该接口用于获取知识库图像。
             */
            faqImage: async (
                payload?: {
                    path?: { id?: string; image_key?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/faqs/:id/image/:image_key`,
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
            listWithIterator: async (
                payload?: {
                    params?: {
                        category_id?: string;
                        status?: string;
                        search?: string;
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
                                `${this.domain}/open-apis/helpdesk/v1/faqs`,
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
                                                page_size?: number;
                                                total?: number;
                                                items?: Array<{
                                                    faq_id?: string;
                                                    id?: string;
                                                    helpdesk_id?: string;
                                                    question?: string;
                                                    answer?: string;
                                                    answer_richtext?: Array<{
                                                        content?: string;
                                                        type?: string;
                                                    }>;
                                                    create_time?: number;
                                                    update_time?: number;
                                                    categories?: Array<{
                                                        category_id: string;
                                                        id: string;
                                                        name: string;
                                                        parent_id: string;
                                                        helpdesk_id: string;
                                                        language?: string;
                                                    }>;
                                                    tags?: Array<string>;
                                                    expire_time?: number;
                                                    update_user?: {
                                                        id?: string;
                                                        avatar_url?: string;
                                                        name?: string;
                                                        department?: string;
                                                        city?: string;
                                                        country?: string;
                                                    };
                                                    create_user?: {
                                                        id?: string;
                                                        avatar_url?: string;
                                                        name?: string;
                                                        department?: string;
                                                        city?: string;
                                                        country?: string;
                                                    };
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=faq&version=v1 document }
             *
             * 获取全部知识库详情
             *
             * 该接口用于获取服务台知识库详情。
             */
            list: async (
                payload?: {
                    params?: {
                        category_id?: string;
                        status?: string;
                        search?: string;
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
                                page_size?: number;
                                total?: number;
                                items?: Array<{
                                    faq_id?: string;
                                    id?: string;
                                    helpdesk_id?: string;
                                    question?: string;
                                    answer?: string;
                                    answer_richtext?: Array<{
                                        content?: string;
                                        type?: string;
                                    }>;
                                    create_time?: number;
                                    update_time?: number;
                                    categories?: Array<{
                                        category_id: string;
                                        id: string;
                                        name: string;
                                        parent_id: string;
                                        helpdesk_id: string;
                                        language?: string;
                                    }>;
                                    tags?: Array<string>;
                                    expire_time?: number;
                                    update_user?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    create_user?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/faqs`,
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
                    params: {
                        query: string;
                        base64?: string;
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
                                `${this.domain}/open-apis/helpdesk/v1/faqs/search`,
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
                                                    faq_id?: string;
                                                    id?: string;
                                                    helpdesk_id?: string;
                                                    question?: string;
                                                    answer?: string;
                                                    answer_richtext?: Array<{
                                                        content?: string;
                                                        type?: string;
                                                    }>;
                                                    create_time?: number;
                                                    update_time?: number;
                                                    categories?: Array<{
                                                        category_id: string;
                                                        id: string;
                                                        name: string;
                                                        parent_id: string;
                                                        helpdesk_id: string;
                                                        language?: string;
                                                    }>;
                                                    tags?: Array<string>;
                                                    expire_time?: number;
                                                    update_user?: {
                                                        id?: string;
                                                        avatar_url?: string;
                                                        name?: string;
                                                        department?: string;
                                                        city?: string;
                                                        country?: string;
                                                    };
                                                    create_user?: {
                                                        id?: string;
                                                        avatar_url?: string;
                                                        name?: string;
                                                        department?: string;
                                                        city?: string;
                                                        country?: string;
                                                    };
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=helpdesk&resource=faq&version=v1 document }
             *
             * 搜索知识库
             *
             * 该接口用于搜索服务台知识库。
             */
            search: async (
                payload?: {
                    params: {
                        query: string;
                        base64?: string;
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
                                    faq_id?: string;
                                    id?: string;
                                    helpdesk_id?: string;
                                    question?: string;
                                    answer?: string;
                                    answer_richtext?: Array<{
                                        content?: string;
                                        type?: string;
                                    }>;
                                    create_time?: number;
                                    update_time?: number;
                                    categories?: Array<{
                                        category_id: string;
                                        id: string;
                                        name: string;
                                        parent_id: string;
                                        helpdesk_id: string;
                                        language?: string;
                                    }>;
                                    tags?: Array<string>;
                                    expire_time?: number;
                                    update_user?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    create_user?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/faqs/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=faq&version=v1 document }
             *
             * 创建知识库
             *
             * 该接口用于创建知识库。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
             */
            create: async (
                payload?: {
                    data?: {
                        faq?: {
                            category_id?: string;
                            question: string;
                            answer?: string;
                            answer_richtext?: string;
                            tags?: Array<string>;
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
                            data?: {
                                faq?: {
                                    faq_id?: string;
                                    id?: string;
                                    helpdesk_id?: string;
                                    question?: string;
                                    answer?: string;
                                    answer_richtext?: Array<{
                                        content?: string;
                                        type?: string;
                                    }>;
                                    create_time?: number;
                                    update_time?: number;
                                    categories?: Array<{
                                        category_id: string;
                                        id: string;
                                        name: string;
                                        parent_id: string;
                                        helpdesk_id: string;
                                        language?: string;
                                    }>;
                                    tags?: Array<string>;
                                    expire_time?: number;
                                    update_user?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    create_user?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/faqs`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=faq&version=v1 document }
             *
             * 获取指定知识库详情
             *
             * 该接口用于获取服务台知识库详情。
             */
            get: async (
                payload?: {
                    path?: { id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                faq?: {
                                    faq_id?: string;
                                    id?: string;
                                    helpdesk_id?: string;
                                    question?: string;
                                    answer?: string;
                                    answer_richtext?: Array<{
                                        content?: string;
                                        type?: string;
                                    }>;
                                    create_time?: number;
                                    update_time?: number;
                                    categories?: Array<{
                                        category_id: string;
                                        id: string;
                                        name: string;
                                        parent_id: string;
                                        helpdesk_id: string;
                                        language?: string;
                                    }>;
                                    tags?: Array<string>;
                                    expire_time?: number;
                                    update_user?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    create_user?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/faqs/:id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=helpdesk&resource=faq&version=v1 document }
             *
             * 删除知识库
             *
             * 该接口用于删除知识库。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
             */
            delete: async (
                payload?: {
                    path?: { id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/faqs/:id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=faq&version=v1 document }
             *
             * 修改知识库
             *
             * 该接口用于修改知识库。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
             */
            patch: async (
                payload?: {
                    data?: {
                        faq?: {
                            category_id?: string;
                            question: string;
                            answer?: string;
                            answer_richtext?: Array<{
                                content?: string;
                                type?: string;
                            }>;
                            tags?: Array<string>;
                        };
                    };
                    path?: { id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/faqs/:id`,
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
         * agent.schedules
         */
        agentSchedules: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent.schedules&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=helpdesk&resource=agent.schedules&version=v1 document }
             *
             * 删除客服工作日程
             *
             * 该接口用于删除客服日程。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
             */
            delete: async (
                payload?: {
                    path?: { agent_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agents/:agent_id/schedules`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent.schedules&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=agent.schedules&version=v1 document }
             *
             * 更新客服工作日程
             *
             * 该接口用于更新客服的日程。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
             */
            patch: async (
                payload?: {
                    data?: {
                        agent_schedule?: {
                            schedule?: Array<{
                                start_time?: string;
                                end_time?: string;
                                weekday?: number;
                            }>;
                            agent_skill_ids?: Array<string>;
                        };
                    };
                    path: { agent_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agents/:agent_id/schedules`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent.schedules&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=agent.schedules&version=v1 document }
             *
             * 查询指定客服工作日程
             *
             * 该接口用于获取客服信息。
             */
            get: async (
                payload?: {
                    path: { agent_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                agent_schedule?: {
                                    status?: number;
                                    agent?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        company_name?: string;
                                    };
                                    schedule?: Array<{
                                        start_time?: string;
                                        end_time?: string;
                                        weekday?: number;
                                    }>;
                                    agent_skills?: Array<{
                                        id?: string;
                                        name?: string;
                                        is_default?: boolean;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/agents/:agent_id/schedules`,
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
         * ticket
         */
        ticket: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=customized_fields&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=customized_fields&project=helpdesk&resource=ticket&version=v1 document }
             *
             * 获取服务台自定义字段
             *
             * 该接口用于获取服务台自定义字段详情。
             */
            customizedFields: async (
                payload?: {
                    params?: { visible_only?: boolean };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_customized_fields?: Array<{
                                    user_customized_field_id?: string;
                                    id?: string;
                                    helpdesk_id?: string;
                                    key_name?: string;
                                    display_name?: string;
                                    position?: string;
                                    field_type?: string;
                                    description?: string;
                                    visible?: boolean;
                                    editable?: boolean;
                                    required?: boolean;
                                    created_at?: string;
                                    updated_at?: string;
                                }>;
                                ticket_customized_fields?: Array<{
                                    ticket_customized_field_id: string;
                                    helpdesk_id?: string;
                                    key_name: string;
                                    display_name: string;
                                    position: string;
                                    field_type: string;
                                    description: string;
                                    visible: boolean;
                                    editable?: boolean;
                                    required: boolean;
                                    created_at?: string;
                                    updated_at?: string;
                                    created_by?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    updated_by?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    dropdown_allow_multiple?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/customized_fields`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=ticket_image&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=ticket_image&project=helpdesk&resource=ticket&version=v1 document }
             *
             * 获取工单内图像
             *
             * 该接口用于获取服务台工单消息图象。仅支持自建应用。
             */
            ticketImage: async (
                payload?: {
                    params: {
                        ticket_id: string;
                        msg_id: string;
                        index?: number;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/ticket_images`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=ticket&version=v1 document }
             *
             * 查询指定工单详情
             *
             * 该接口用于获取单个服务台工单详情。仅支持自建应用。
             */
            get: async (
                payload?: {
                    path: { ticket_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                ticket?: {
                                    ticket_id: string;
                                    helpdesk_id?: string;
                                    guest?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    comments?: {
                                        content?: string;
                                        created_at?: number;
                                        id?: number;
                                        user_avatar_url?: string;
                                        user_name?: string;
                                        user_id?: number;
                                    };
                                    ticket_type?: number;
                                    status?: number;
                                    score?: number;
                                    created_at?: number;
                                    updated_at?: number;
                                    closed_at?: number;
                                    dissatisfaction_reason?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    agents?: Array<{
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    }>;
                                    channel?: number;
                                    solve?: number;
                                    closed_by?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    collaborators?: Array<{
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    }>;
                                    customized_fields?: Array<{
                                        id?: string;
                                        value?: string;
                                        key_name?: string;
                                        display_name?: string;
                                        position?: number;
                                        required?: boolean;
                                        editable?: boolean;
                                    }>;
                                    agent_service_duration?: number;
                                    agent_first_response_duration?: number;
                                    bot_service_duration?: number;
                                    agent_resolution_time?: number;
                                    actual_processing_time?: number;
                                    agent_entry_time?: number;
                                    agent_first_response_time?: number;
                                    agent_last_response_time?: number;
                                    agent_owner?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    tags?: Array<{
                                        id?: string;
                                        name?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=ticket&version=v1 document }
             *
             * 查询全部工单详情
             *
             * 该接口用于获取全部工单详情。仅支持自建应用。
             */
            list: async (
                payload?: {
                    params?: {
                        ticket_id?: string;
                        agent_id?: string;
                        closed_by_id?: string;
                        type?: number;
                        channel?: number;
                        solved?: number;
                        score?: number;
                        status_list?: Array<number>;
                        guest_name?: string;
                        guest_id?: string;
                        tags?: Array<string>;
                        page?: number;
                        page_size?: number;
                        create_time_start?: number;
                        create_time_end?: number;
                        update_time_start?: number;
                        update_time_end?: number;
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
                                total?: number;
                                tickets?: Array<{
                                    ticket_id: string;
                                    helpdesk_id?: string;
                                    guest?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    comments?: {
                                        content?: string;
                                        created_at?: number;
                                        id?: number;
                                        user_avatar_url?: string;
                                        user_name?: string;
                                        user_id?: number;
                                    };
                                    ticket_type?: number;
                                    status?: number;
                                    score?: number;
                                    created_at?: number;
                                    updated_at?: number;
                                    closed_at?: number;
                                    dissatisfaction_reason?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    agents?: Array<{
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    }>;
                                    channel?: number;
                                    solve?: number;
                                    closed_by?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    collaborators?: Array<{
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    }>;
                                    customized_fields?: Array<{
                                        id?: string;
                                        value?: string;
                                        key_name?: string;
                                        display_name?: string;
                                        position?: number;
                                        required?: boolean;
                                        editable?: boolean;
                                    }>;
                                    agent_service_duration?: number;
                                    agent_first_response_duration?: number;
                                    bot_service_duration?: number;
                                    agent_resolution_time?: number;
                                    actual_processing_time?: number;
                                    agent_entry_time?: number;
                                    agent_first_response_time?: number;
                                    agent_last_response_time?: number;
                                    agent_owner?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    tags?: Array<{
                                        id?: string;
                                        name?: string;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/tickets`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=start_service&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=start_service&project=helpdesk&resource=ticket&version=v1 document }
             *
             * 创建服务台对话
             *
             * 该接口用于创建服务台对话。
             */
            startService: async (
                payload?: {
                    data: {
                        human_service?: boolean;
                        appointed_agents?: Array<string>;
                        open_id: string;
                        customized_info?: string;
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
                            data?: { chat_id: string; ticket_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/start_service`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=helpdesk&resource=ticket&version=v1 document }
             *
             * 更新工单详情
             *
             * 该接口用于更新服务台工单详情。只会更新数据，不会触发相关操作。如修改工单状态到关单，不会关闭聊天页面。仅支持自建应用。要更新的工单字段必须至少输入一项。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者有当前工单的权限，属于服务台的客服（并且具有该工单的权限）、管理员或所有者;</md-alert>;:::
             */
            update: async (
                payload?: {
                    data?: {
                        status?: number;
                        tag_names?: Array<string>;
                        comment?: string;
                        customized_fields?: Array<{
                            id?: string;
                            value?: string;
                            key_name?: string;
                        }>;
                        ticket_type?: number;
                        solved?: number;
                        channel?: number;
                    };
                    path: { ticket_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=answer_user_query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=answer_user_query&project=helpdesk&resource=ticket&version=v1 document }
             *
             * 回复用户在工单里的提问
             *
             * 该接口用于回复用户提问结果至工单，需要工单仍处于进行中且未接入人工状态。仅支持自建应用。
             */
            answerUserQuery: async (
                payload?: {
                    data: {
                        event_id: string;
                        faqs?: Array<{ id?: string; score?: number }>;
                    };
                    path: { ticket_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id/answer_user_query`,
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
         * ticket_customized_field
         */
        ticketCustomizedField: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=helpdesk&resource=ticket_customized_field&version=v1 document }
             *
             * 删除工单自定义字段
             *
             * 该接口用于删除工单自定义字段。
             *
             * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
             */
            delete: async (
                payload?: {
                    path: { ticket_customized_field_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=ticket_customized_field&version=v1 document }
             *
             * get ticket customized field
             */
            get: async (
                payload?: {
                    path: { ticket_customized_field_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                ticket_customized_field_id: string;
                                helpdesk_id?: string;
                                key_name: string;
                                display_name: string;
                                position: string;
                                field_type: string;
                                description: string;
                                visible: boolean;
                                editable?: boolean;
                                required: boolean;
                                created_at?: string;
                                updated_at?: string;
                                created_by?: {
                                    id?: string;
                                    avatar_url?: string;
                                    name?: string;
                                    email?: string;
                                    department?: string;
                                    city?: string;
                                    country?: string;
                                };
                                updated_by?: {
                                    id?: string;
                                    avatar_url?: string;
                                    name?: string;
                                    email?: string;
                                    department?: string;
                                    city?: string;
                                    country?: string;
                                };
                                dropdown_allow_multiple?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id`,
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
                    data?: { visible?: boolean };
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
                                `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields`,
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
                                                next_page_token?: string;
                                                items?: Array<{
                                                    ticket_customized_field_id: string;
                                                    helpdesk_id?: string;
                                                    key_name: string;
                                                    display_name: string;
                                                    position: string;
                                                    field_type: string;
                                                    description: string;
                                                    visible: boolean;
                                                    editable?: boolean;
                                                    required: boolean;
                                                    created_at?: string;
                                                    updated_at?: string;
                                                    created_by?: {
                                                        id?: string;
                                                        avatar_url?: string;
                                                        name?: string;
                                                        email?: string;
                                                        department?: string;
                                                        city?: string;
                                                        country?: string;
                                                    };
                                                    updated_by?: {
                                                        id?: string;
                                                        avatar_url?: string;
                                                        name?: string;
                                                        email?: string;
                                                        department?: string;
                                                        city?: string;
                                                        country?: string;
                                                    };
                                                    dropdown_allow_multiple?: boolean;
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=ticket_customized_field&version=v1 document }
             *
             * list the ticket customized fields
             */
            list: async (
                payload?: {
                    data?: { visible?: boolean };
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
                                has_more?: boolean;
                                next_page_token?: string;
                                items?: Array<{
                                    ticket_customized_field_id: string;
                                    helpdesk_id?: string;
                                    key_name: string;
                                    display_name: string;
                                    position: string;
                                    field_type: string;
                                    description: string;
                                    visible: boolean;
                                    editable?: boolean;
                                    required: boolean;
                                    created_at?: string;
                                    updated_at?: string;
                                    created_by?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    updated_by?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    dropdown_allow_multiple?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=ticket_customized_field&version=v1 document }
             *
             * update the ticket customized field
             */
            patch: async (
                payload?: {
                    data?: {
                        display_name?: string;
                        position?: string;
                        description?: string;
                        visible?: boolean;
                        required?: boolean;
                    };
                    path: { ticket_customized_field_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=ticket_customized_field&version=v1 document }
             *
             * create ticket customized field
             */
            create: async (
                payload?: {
                    data: {
                        helpdesk_id?: string;
                        key_name: string;
                        display_name: string;
                        position: string;
                        field_type: string;
                        description: string;
                        visible: boolean;
                        editable?: boolean;
                        required: boolean;
                        dropdown_allow_multiple?: boolean;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields`,
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
         * notification
         */
        notification: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=cancel_approve&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel_approve&project=helpdesk&resource=notification&version=v1 document }
             *
             * 取消审核
             *
             * 提交审核后，如果需要取消审核，则调用此接口。
             */
            cancelApprove: async (
                payload?: {
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/cancel_approve`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=cancel_send&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel_send&project=helpdesk&resource=notification&version=v1 document }
             *
             * 取消推送
             *
             * 取消推送接口，审核通过后待调度可以调用，发送过程中可以调用（会撤回已发送的消息），发送完成后可以需要推送（会撤回所有已发送的消息）。
             */
            cancelSend: async (
                payload?: {
                    data: { is_recall: boolean };
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/cancel_send`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=notification&version=v1 document }
             *
             * 创建推送
             *
             * 调用接口创建推送，创建成功后为草稿状态。
             */
            create: async (
                payload?: {
                    data?: {
                        id?: string;
                        job_name?: string;
                        status?: number;
                        create_user?: {
                            user_id?: string;
                            avatar_url?: string;
                            name?: string;
                        };
                        created_at?: string;
                        update_user?: {
                            user_id?: string;
                            avatar_url?: string;
                            name?: string;
                        };
                        updated_at?: string;
                        target_user_count?: number;
                        sent_user_count?: number;
                        read_user_count?: number;
                        send_at?: string;
                        push_content?: string;
                        push_type?: number;
                        push_scope_type?: number;
                        new_staff_scope_type?: number;
                        new_staff_scope_department_list?: Array<{
                            department_id?: string;
                            name?: string;
                        }>;
                        user_list?: Array<{
                            user_id?: string;
                            avatar_url?: string;
                            name?: string;
                        }>;
                        department_list?: Array<{
                            department_id?: string;
                            name?: string;
                        }>;
                        chat_list?: Array<{ chat_id?: string; name?: string }>;
                        ext?: string;
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
                                notification_id?: string;
                                status?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/notifications`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=execute_send&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=execute_send&project=helpdesk&resource=notification&version=v1 document }
             *
             * 执行推送
             *
             * 审核通过后调用此接口设置推送时间，等待调度系统调度，发送消息。
             */
            executeSend: async (
                payload?: {
                    data: { send_at: string };
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/execute_send`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=notification&version=v1 document }
             *
             * 更新推送
             *
             * 更新推送信息，只有在草稿状态下才可以调用此接口进行更新。
             */
            patch: async (
                payload?: {
                    data?: {
                        id?: string;
                        job_name?: string;
                        status?: number;
                        create_user?: {
                            user_id?: string;
                            avatar_url?: string;
                            name?: string;
                        };
                        created_at?: string;
                        update_user?: {
                            user_id?: string;
                            avatar_url?: string;
                            name?: string;
                        };
                        updated_at?: string;
                        target_user_count?: number;
                        sent_user_count?: number;
                        read_user_count?: number;
                        send_at?: string;
                        push_content?: string;
                        push_type?: number;
                        push_scope_type?: number;
                        new_staff_scope_type?: number;
                        new_staff_scope_department_list?: Array<{
                            department_id?: string;
                            name?: string;
                        }>;
                        user_list?: Array<{
                            user_id?: string;
                            avatar_url?: string;
                            name?: string;
                        }>;
                        department_list?: Array<{
                            department_id?: string;
                            name?: string;
                        }>;
                        chat_list?: Array<{ chat_id?: string; name?: string }>;
                        ext?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=preview&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=preview&project=helpdesk&resource=notification&version=v1 document }
             *
             * 预览推送
             *
             * 在正式执行推送之前是可以调用此接口预览设置的推送内容。
             */
            preview: async (
                payload?: {
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/preview`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=submit_approve&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=submit_approve&project=helpdesk&resource=notification&version=v1 document }
             *
             * 提交审核
             *
             * 正常情况下调用创建推送接口后，就可以调用提交审核接口，如果创建人是服务台owner则会自动审核通过，否则会通知服务台owner审核此推送信息。
             */
            submitApprove: async (
                payload?: {
                    data: { reason: string };
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { has_access?: boolean };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/submit_approve`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=notification&version=v1 document }
             *
             * 查询推送
             *
             * 查询推送详情。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { notification_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                notification?: {
                                    id?: string;
                                    job_name?: string;
                                    status?: number;
                                    create_user?: {
                                        user_id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                    };
                                    created_at?: string;
                                    update_user?: {
                                        user_id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                    };
                                    updated_at?: string;
                                    target_user_count?: number;
                                    sent_user_count?: number;
                                    read_user_count?: number;
                                    send_at?: string;
                                    push_content?: string;
                                    push_type?: number;
                                    push_scope_type?: number;
                                    new_staff_scope_type?: number;
                                    new_staff_scope_department_list?: Array<{
                                        department_id?: string;
                                        name?: string;
                                    }>;
                                    user_list?: Array<{
                                        user_id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                    }>;
                                    department_list?: Array<{
                                        department_id?: string;
                                        name?: string;
                                    }>;
                                    chat_list?: Array<{
                                        chat_id?: string;
                                        name?: string;
                                    }>;
                                    ext?: string;
                                };
                                approval_app_link?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id`,
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
         * ticket_message
         */
        ticketMessage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket.message&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=ticket.message&version=v1 document }
             *
             * 获取工单消息详情
             *
             * 该接口用于获取服务台工单消息详情。
             */
            list: async (
                payload?: {
                    params?: {
                        time_start?: number;
                        time_end?: number;
                        page?: number;
                        page_size?: number;
                    };
                    path?: { ticket_id?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    id?: string;
                                    message_id?: string;
                                    message_type: string;
                                    created_at?: number;
                                    content: string;
                                    user_name?: string;
                                    avatar_url?: string;
                                    user_id?: string;
                                }>;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id/messages`,
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
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket.message&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=ticket.message&version=v1 document }
             *
             * 发送工单消息
             *
             * 该接口用于发送工单消息。
             */
            create: async (
                payload?: {
                    data: { msg_type: string; content: string };
                    path?: { ticket_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { message_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id/messages`,
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
         * bot.message
         */
        botMessage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=bot.message&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=bot.message&version=v1 document }
             *
             * 服务台机器人向工单绑定的群内发送消息
             *
             * 通过服务台机器人给指定用户的服务台专属群或私聊发送消息，支持文本、富文本、卡片、图片。
             *
             * - 暂不支持新版卡片（ JSON 2.0 版本）。;- 暂不支持商店应用使用。;- 只支持向没有进行中工单的专属群中发送消息。;
             */
            create: async (
                payload?: {
                    data: {
                        msg_type: "text" | "post" | "image" | "interactive";
                        content: string;
                        receiver_id: string;
                        receive_type?: "chat" | "user";
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
                            data?: { message_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/helpdesk/v1/message`,
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
             * agent
             */
            agent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent&apiName=agent_email&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=agent_email&project=helpdesk&resource=agent&version=v1 document }
                 *
                 * 获取客服邮箱
                 *
                 * 该接口用于获取客服邮箱地址。
                 */
                agentEmail: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { agents?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/agent_emails`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=agent&version=v1 document }
                 *
                 * 更新客服信息
                 *
                 * 更新客服状态等信息。
                 */
                patch: async (
                    payload?: {
                        data?: { status?: number };
                        path: { agent_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/agents/:agent_id`,
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
             * agent_schedule
             */
            agentSchedule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_schedule&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=agent_schedule&version=v1 document }
                 *
                 * 创建客服工作日程
                 *
                 * 该接口用于创建客服日程。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
                 */
                create: async (
                    payload?: {
                        data?: {
                            agent_schedules?: Array<{
                                agent_id?: string;
                                schedule?: Array<{
                                    start_time?: string;
                                    end_time?: string;
                                    weekday?: number;
                                }>;
                                agent_skill_ids?: Array<string>;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/agent_schedules`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_schedule&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=agent_schedule&version=v1 document }
                 *
                 * 查询全部客服工作日程
                 *
                 * 该接口用于获取所有客服信息。
                 */
                list: async (
                    payload?: {
                        params: { status: Array<number> };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    agent_schedules?: Array<{
                                        status?: number;
                                        agent?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            company_name?: string;
                                        };
                                        schedule?: Array<{
                                            start_time?: string;
                                            end_time?: string;
                                            weekday?: number;
                                        }>;
                                        agent_skills?: Array<{
                                            id?: string;
                                            name?: string;
                                            is_default?: boolean;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/agent_schedules`,
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
             * agent_skill
             */
            agentSkill: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=agent_skill&version=v1 document }
                 *
                 * 创建客服技能
                 *
                 * 该接口用于创建客服技能。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
                 */
                create: async (
                    payload?: {
                        data?: {
                            name?: string;
                            rules?: Array<{
                                id?: string;
                                selected_operator?: number;
                                operand?: string;
                                category?: number;
                            }>;
                            agent_ids?: Array<string>;
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
                                data?: { agent_skill_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/agent_skills`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=agent_skill&version=v1 document }
                 *
                 * 更新客服技能
                 *
                 * 该接口用于更新客服技能。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
                 */
                patch: async (
                    payload?: {
                        data?: {
                            agent_skill?: {
                                name?: string;
                                rules?: Array<{
                                    id?: string;
                                    selected_operator?: number;
                                    operator_options?: Array<number>;
                                    operand?: string;
                                }>;
                                agent_ids?: Array<string>;
                                agent_skill_id?: string;
                            };
                        };
                        path: { agent_skill_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/agent_skills/:agent_skill_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=agent_skill&version=v1 document }
                 *
                 * 查询指定客服技能
                 *
                 * 该接口用于获取客服技能。
                 */
                get: async (
                    payload?: {
                        path?: { agent_skill_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    agent_skill?: {
                                        id?: string;
                                        name?: string;
                                        rules?: Array<{
                                            id?: string;
                                            selected_operator?: number;
                                            operator_options?: Array<number>;
                                            operand?: string;
                                            category?: number;
                                            display_name?: string;
                                        }>;
                                        agent_ids?: Array<string>;
                                        is_default?: boolean;
                                        agents?: Array<{
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                        }>;
                                        agent_skill_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/agent_skills/:agent_skill_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=helpdesk&resource=agent_skill&version=v1 document }
                 *
                 * 删除客服技能
                 *
                 * 该接口用于删除客服技能。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
                 */
                delete: async (
                    payload?: {
                        path?: { agent_skill_id?: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/agent_skills/:agent_skill_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=agent_skill&version=v1 document }
                 *
                 * 查询全部客服技能
                 *
                 * 获取全部客服技能。
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    agent_skills?: Array<{
                                        id?: string;
                                        name?: string;
                                        agent_ids?: Array<string>;
                                        is_default?: boolean;
                                        agent_skill_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/agent_skills`,
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
             * agent_skill_rule
             */
            agentSkillRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill_rule&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=agent_skill_rule&version=v1 document }
                 *
                 * 获取客服技能列表
                 *
                 * 该接口用于获取全部客服技能。仅支持自建应用。
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
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
                                        id?: string;
                                        operator_options?: Array<number>;
                                        operand?: string;
                                        category?: number;
                                        display_name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/agent_skill_rules`,
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
             * category
             */
            category: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=category&version=v1 document }
                 *
                 * list all categories
                 */
                list: async (
                    payload?: {
                        params?: {
                            lang?: string;
                            order_by?: number;
                            asc?: boolean;
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
                                    categories?: Array<{
                                        category_id: string;
                                        id: string;
                                        name: string;
                                        parent_id: string;
                                        helpdesk_id: string;
                                        language?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/categories`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=category&version=v1 document }
                 *
                 * 创建知识库分类
                 *
                 * 该接口用于创建知识库分类。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            parent_id: string;
                            language?: string;
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
                                    category?: {
                                        category_id: string;
                                        id: string;
                                        name: string;
                                        parent_id: string;
                                        helpdesk_id: string;
                                        language?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/categories`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=category&version=v1 document }
                 *
                 * 更新知识库分类详情
                 *
                 * 该接口用于更新知识库分类详情。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
                 */
                patch: async (
                    payload?: {
                        data?: { name?: string; parent_id?: string };
                        path: { id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/categories/:id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=helpdesk&resource=category&version=v1 document }
                 *
                 * 删除知识库分类详情
                 *
                 * 该接口用于删除知识库分类详情。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
                 */
                delete: async (
                    payload?: {
                        path: { id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/categories/:id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=category&version=v1 document }
                 *
                 * 获取知识库分类
                 *
                 * 该接口用于获取知识库分类。
                 */
                get: async (
                    payload?: {
                        path: { id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    category_id: string;
                                    id: string;
                                    name: string;
                                    helpdesk_id: string;
                                    language?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/categories/:id`,
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
             * event
             */
            event: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=event&apiName=subscribe&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscribe&project=helpdesk&resource=event&version=v1 document }
                 *
                 * 订阅服务台事件
                 *
                 * 本接口用于订阅服务台事件。
                 */
                subscribe: async (
                    payload?: {
                        data: {
                            events: Array<{ type: string; subtype: string }>;
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
                                `${this.domain}/open-apis/helpdesk/v1/events/subscribe`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=event&apiName=unsubscribe&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscribe&project=helpdesk&resource=event&version=v1 document }
                 *
                 * 取消订阅服务台事件
                 *
                 * 本接口用于取消订阅服务台事件。
                 */
                unsubscribe: async (
                    payload?: {
                        data: {
                            events: Array<{ type: string; subtype: string }>;
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
                                `${this.domain}/open-apis/helpdesk/v1/events/unsubscribe`,
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
             * faq
             */
            faq: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=faq_image&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=faq_image&project=helpdesk&resource=faq&version=v1 document }
                 *
                 * 获取知识库图像
                 *
                 * 该接口用于获取知识库图像。
                 */
                faqImage: async (
                    payload?: {
                        path?: { id?: string; image_key?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/faqs/:id/image/:image_key`,
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            category_id?: string;
                            status?: string;
                            search?: string;
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
                                    `${this.domain}/open-apis/helpdesk/v1/faqs`,
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
                                                    page_size?: number;
                                                    total?: number;
                                                    items?: Array<{
                                                        faq_id?: string;
                                                        id?: string;
                                                        helpdesk_id?: string;
                                                        question?: string;
                                                        answer?: string;
                                                        answer_richtext?: Array<{
                                                            content?: string;
                                                            type?: string;
                                                        }>;
                                                        create_time?: number;
                                                        update_time?: number;
                                                        categories?: Array<{
                                                            category_id: string;
                                                            id: string;
                                                            name: string;
                                                            parent_id: string;
                                                            helpdesk_id: string;
                                                            language?: string;
                                                        }>;
                                                        tags?: Array<string>;
                                                        expire_time?: number;
                                                        update_user?: {
                                                            id?: string;
                                                            avatar_url?: string;
                                                            name?: string;
                                                            department?: string;
                                                            city?: string;
                                                            country?: string;
                                                        };
                                                        create_user?: {
                                                            id?: string;
                                                            avatar_url?: string;
                                                            name?: string;
                                                            department?: string;
                                                            city?: string;
                                                            country?: string;
                                                        };
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=faq&version=v1 document }
                 *
                 * 获取全部知识库详情
                 *
                 * 该接口用于获取服务台知识库详情。
                 */
                list: async (
                    payload?: {
                        params?: {
                            category_id?: string;
                            status?: string;
                            search?: string;
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
                                    page_size?: number;
                                    total?: number;
                                    items?: Array<{
                                        faq_id?: string;
                                        id?: string;
                                        helpdesk_id?: string;
                                        question?: string;
                                        answer?: string;
                                        answer_richtext?: Array<{
                                            content?: string;
                                            type?: string;
                                        }>;
                                        create_time?: number;
                                        update_time?: number;
                                        categories?: Array<{
                                            category_id: string;
                                            id: string;
                                            name: string;
                                            parent_id: string;
                                            helpdesk_id: string;
                                            language?: string;
                                        }>;
                                        tags?: Array<string>;
                                        expire_time?: number;
                                        update_user?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        create_user?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/faqs`,
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
                        params: {
                            query: string;
                            base64?: string;
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
                                    `${this.domain}/open-apis/helpdesk/v1/faqs/search`,
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
                                                        faq_id?: string;
                                                        id?: string;
                                                        helpdesk_id?: string;
                                                        question?: string;
                                                        answer?: string;
                                                        answer_richtext?: Array<{
                                                            content?: string;
                                                            type?: string;
                                                        }>;
                                                        create_time?: number;
                                                        update_time?: number;
                                                        categories?: Array<{
                                                            category_id: string;
                                                            id: string;
                                                            name: string;
                                                            parent_id: string;
                                                            helpdesk_id: string;
                                                            language?: string;
                                                        }>;
                                                        tags?: Array<string>;
                                                        expire_time?: number;
                                                        update_user?: {
                                                            id?: string;
                                                            avatar_url?: string;
                                                            name?: string;
                                                            department?: string;
                                                            city?: string;
                                                            country?: string;
                                                        };
                                                        create_user?: {
                                                            id?: string;
                                                            avatar_url?: string;
                                                            name?: string;
                                                            department?: string;
                                                            city?: string;
                                                            country?: string;
                                                        };
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=helpdesk&resource=faq&version=v1 document }
                 *
                 * 搜索知识库
                 *
                 * 该接口用于搜索服务台知识库。
                 */
                search: async (
                    payload?: {
                        params: {
                            query: string;
                            base64?: string;
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
                                        faq_id?: string;
                                        id?: string;
                                        helpdesk_id?: string;
                                        question?: string;
                                        answer?: string;
                                        answer_richtext?: Array<{
                                            content?: string;
                                            type?: string;
                                        }>;
                                        create_time?: number;
                                        update_time?: number;
                                        categories?: Array<{
                                            category_id: string;
                                            id: string;
                                            name: string;
                                            parent_id: string;
                                            helpdesk_id: string;
                                            language?: string;
                                        }>;
                                        tags?: Array<string>;
                                        expire_time?: number;
                                        update_user?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        create_user?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/faqs/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=faq&version=v1 document }
                 *
                 * 创建知识库
                 *
                 * 该接口用于创建知识库。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
                 */
                create: async (
                    payload?: {
                        data?: {
                            faq?: {
                                category_id?: string;
                                question: string;
                                answer?: string;
                                answer_richtext?: string;
                                tags?: Array<string>;
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
                                data?: {
                                    faq?: {
                                        faq_id?: string;
                                        id?: string;
                                        helpdesk_id?: string;
                                        question?: string;
                                        answer?: string;
                                        answer_richtext?: Array<{
                                            content?: string;
                                            type?: string;
                                        }>;
                                        create_time?: number;
                                        update_time?: number;
                                        categories?: Array<{
                                            category_id: string;
                                            id: string;
                                            name: string;
                                            parent_id: string;
                                            helpdesk_id: string;
                                            language?: string;
                                        }>;
                                        tags?: Array<string>;
                                        expire_time?: number;
                                        update_user?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        create_user?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/faqs`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=faq&version=v1 document }
                 *
                 * 获取指定知识库详情
                 *
                 * 该接口用于获取服务台知识库详情。
                 */
                get: async (
                    payload?: {
                        path?: { id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    faq?: {
                                        faq_id?: string;
                                        id?: string;
                                        helpdesk_id?: string;
                                        question?: string;
                                        answer?: string;
                                        answer_richtext?: Array<{
                                            content?: string;
                                            type?: string;
                                        }>;
                                        create_time?: number;
                                        update_time?: number;
                                        categories?: Array<{
                                            category_id: string;
                                            id: string;
                                            name: string;
                                            parent_id: string;
                                            helpdesk_id: string;
                                            language?: string;
                                        }>;
                                        tags?: Array<string>;
                                        expire_time?: number;
                                        update_user?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        create_user?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/faqs/:id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=helpdesk&resource=faq&version=v1 document }
                 *
                 * 删除知识库
                 *
                 * 该接口用于删除知识库。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
                 */
                delete: async (
                    payload?: {
                        path?: { id?: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/faqs/:id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=faq&version=v1 document }
                 *
                 * 修改知识库
                 *
                 * 该接口用于修改知识库。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的客服、管理员或所有者;</md-alert>;:::
                 */
                patch: async (
                    payload?: {
                        data?: {
                            faq?: {
                                category_id?: string;
                                question: string;
                                answer?: string;
                                answer_richtext?: Array<{
                                    content?: string;
                                    type?: string;
                                }>;
                                tags?: Array<string>;
                            };
                        };
                        path?: { id?: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/faqs/:id`,
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
             * agent.schedules
             */
            agentSchedules: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent.schedules&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=helpdesk&resource=agent.schedules&version=v1 document }
                 *
                 * 删除客服工作日程
                 *
                 * 该接口用于删除客服日程。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
                 */
                delete: async (
                    payload?: {
                        path?: { agent_id?: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/agents/:agent_id/schedules`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent.schedules&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=agent.schedules&version=v1 document }
                 *
                 * 更新客服工作日程
                 *
                 * 该接口用于更新客服的日程。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
                 */
                patch: async (
                    payload?: {
                        data?: {
                            agent_schedule?: {
                                schedule?: Array<{
                                    start_time?: string;
                                    end_time?: string;
                                    weekday?: number;
                                }>;
                                agent_skill_ids?: Array<string>;
                            };
                        };
                        path: { agent_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/agents/:agent_id/schedules`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent.schedules&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=agent.schedules&version=v1 document }
                 *
                 * 查询指定客服工作日程
                 *
                 * 该接口用于获取客服信息。
                 */
                get: async (
                    payload?: {
                        path: { agent_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    agent_schedule?: {
                                        status?: number;
                                        agent?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            company_name?: string;
                                        };
                                        schedule?: Array<{
                                            start_time?: string;
                                            end_time?: string;
                                            weekday?: number;
                                        }>;
                                        agent_skills?: Array<{
                                            id?: string;
                                            name?: string;
                                            is_default?: boolean;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/agents/:agent_id/schedules`,
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
             * ticket
             */
            ticket: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=customized_fields&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=customized_fields&project=helpdesk&resource=ticket&version=v1 document }
                 *
                 * 获取服务台自定义字段
                 *
                 * 该接口用于获取服务台自定义字段详情。
                 */
                customizedFields: async (
                    payload?: {
                        params?: { visible_only?: boolean };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    user_customized_fields?: Array<{
                                        user_customized_field_id?: string;
                                        id?: string;
                                        helpdesk_id?: string;
                                        key_name?: string;
                                        display_name?: string;
                                        position?: string;
                                        field_type?: string;
                                        description?: string;
                                        visible?: boolean;
                                        editable?: boolean;
                                        required?: boolean;
                                        created_at?: string;
                                        updated_at?: string;
                                    }>;
                                    ticket_customized_fields?: Array<{
                                        ticket_customized_field_id: string;
                                        helpdesk_id?: string;
                                        key_name: string;
                                        display_name: string;
                                        position: string;
                                        field_type: string;
                                        description: string;
                                        visible: boolean;
                                        editable?: boolean;
                                        required: boolean;
                                        created_at?: string;
                                        updated_at?: string;
                                        created_by?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        updated_by?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        dropdown_allow_multiple?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/customized_fields`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=ticket_image&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=ticket_image&project=helpdesk&resource=ticket&version=v1 document }
                 *
                 * 获取工单内图像
                 *
                 * 该接口用于获取服务台工单消息图象。仅支持自建应用。
                 */
                ticketImage: async (
                    payload?: {
                        params: {
                            ticket_id: string;
                            msg_id: string;
                            index?: number;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/ticket_images`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=ticket&version=v1 document }
                 *
                 * 查询指定工单详情
                 *
                 * 该接口用于获取单个服务台工单详情。仅支持自建应用。
                 */
                get: async (
                    payload?: {
                        path: { ticket_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    ticket?: {
                                        ticket_id: string;
                                        helpdesk_id?: string;
                                        guest?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        comments?: {
                                            content?: string;
                                            created_at?: number;
                                            id?: number;
                                            user_avatar_url?: string;
                                            user_name?: string;
                                            user_id?: number;
                                        };
                                        ticket_type?: number;
                                        status?: number;
                                        score?: number;
                                        created_at?: number;
                                        updated_at?: number;
                                        closed_at?: number;
                                        dissatisfaction_reason?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        agents?: Array<{
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        }>;
                                        channel?: number;
                                        solve?: number;
                                        closed_by?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        collaborators?: Array<{
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        }>;
                                        customized_fields?: Array<{
                                            id?: string;
                                            value?: string;
                                            key_name?: string;
                                            display_name?: string;
                                            position?: number;
                                            required?: boolean;
                                            editable?: boolean;
                                        }>;
                                        agent_service_duration?: number;
                                        agent_first_response_duration?: number;
                                        bot_service_duration?: number;
                                        agent_resolution_time?: number;
                                        actual_processing_time?: number;
                                        agent_entry_time?: number;
                                        agent_first_response_time?: number;
                                        agent_last_response_time?: number;
                                        agent_owner?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        tags?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=ticket&version=v1 document }
                 *
                 * 查询全部工单详情
                 *
                 * 该接口用于获取全部工单详情。仅支持自建应用。
                 */
                list: async (
                    payload?: {
                        params?: {
                            ticket_id?: string;
                            agent_id?: string;
                            closed_by_id?: string;
                            type?: number;
                            channel?: number;
                            solved?: number;
                            score?: number;
                            status_list?: Array<number>;
                            guest_name?: string;
                            guest_id?: string;
                            tags?: Array<string>;
                            page?: number;
                            page_size?: number;
                            create_time_start?: number;
                            create_time_end?: number;
                            update_time_start?: number;
                            update_time_end?: number;
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
                                    total?: number;
                                    tickets?: Array<{
                                        ticket_id: string;
                                        helpdesk_id?: string;
                                        guest?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        comments?: {
                                            content?: string;
                                            created_at?: number;
                                            id?: number;
                                            user_avatar_url?: string;
                                            user_name?: string;
                                            user_id?: number;
                                        };
                                        ticket_type?: number;
                                        status?: number;
                                        score?: number;
                                        created_at?: number;
                                        updated_at?: number;
                                        closed_at?: number;
                                        dissatisfaction_reason?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        agents?: Array<{
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        }>;
                                        channel?: number;
                                        solve?: number;
                                        closed_by?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        collaborators?: Array<{
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        }>;
                                        customized_fields?: Array<{
                                            id?: string;
                                            value?: string;
                                            key_name?: string;
                                            display_name?: string;
                                            position?: number;
                                            required?: boolean;
                                            editable?: boolean;
                                        }>;
                                        agent_service_duration?: number;
                                        agent_first_response_duration?: number;
                                        bot_service_duration?: number;
                                        agent_resolution_time?: number;
                                        actual_processing_time?: number;
                                        agent_entry_time?: number;
                                        agent_first_response_time?: number;
                                        agent_last_response_time?: number;
                                        agent_owner?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        tags?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/tickets`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=start_service&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=start_service&project=helpdesk&resource=ticket&version=v1 document }
                 *
                 * 创建服务台对话
                 *
                 * 该接口用于创建服务台对话。
                 */
                startService: async (
                    payload?: {
                        data: {
                            human_service?: boolean;
                            appointed_agents?: Array<string>;
                            open_id: string;
                            customized_info?: string;
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
                                data?: { chat_id: string; ticket_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/start_service`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=helpdesk&resource=ticket&version=v1 document }
                 *
                 * 更新工单详情
                 *
                 * 该接口用于更新服务台工单详情。只会更新数据，不会触发相关操作。如修改工单状态到关单，不会关闭聊天页面。仅支持自建应用。要更新的工单字段必须至少输入一项。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者有当前工单的权限，属于服务台的客服（并且具有该工单的权限）、管理员或所有者;</md-alert>;:::
                 */
                update: async (
                    payload?: {
                        data?: {
                            status?: number;
                            tag_names?: Array<string>;
                            comment?: string;
                            customized_fields?: Array<{
                                id?: string;
                                value?: string;
                                key_name?: string;
                            }>;
                            ticket_type?: number;
                            solved?: number;
                            channel?: number;
                        };
                        path: { ticket_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=answer_user_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=answer_user_query&project=helpdesk&resource=ticket&version=v1 document }
                 *
                 * 回复用户在工单里的提问
                 *
                 * 该接口用于回复用户提问结果至工单，需要工单仍处于进行中且未接入人工状态。仅支持自建应用。
                 */
                answerUserQuery: async (
                    payload?: {
                        data: {
                            event_id: string;
                            faqs?: Array<{ id?: string; score?: number }>;
                        };
                        path: { ticket_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id/answer_user_query`,
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
             * ticket_customized_field
             */
            ticketCustomizedField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=helpdesk&resource=ticket_customized_field&version=v1 document }
                 *
                 * 删除工单自定义字段
                 *
                 * 该接口用于删除工单自定义字段。
                 *
                 * :::html;<md-alert type="tip">;	注意事项：;	user_access_token 访问，需要操作者是当前服务台的管理员或所有者;</md-alert>;:::
                 */
                delete: async (
                    payload?: {
                        path: { ticket_customized_field_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=ticket_customized_field&version=v1 document }
                 *
                 * get ticket customized field
                 */
                get: async (
                    payload?: {
                        path: { ticket_customized_field_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    ticket_customized_field_id: string;
                                    helpdesk_id?: string;
                                    key_name: string;
                                    display_name: string;
                                    position: string;
                                    field_type: string;
                                    description: string;
                                    visible: boolean;
                                    editable?: boolean;
                                    required: boolean;
                                    created_at?: string;
                                    updated_at?: string;
                                    created_by?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    updated_by?: {
                                        id?: string;
                                        avatar_url?: string;
                                        name?: string;
                                        email?: string;
                                        department?: string;
                                        city?: string;
                                        country?: string;
                                    };
                                    dropdown_allow_multiple?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id`,
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
                        data?: { visible?: boolean };
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
                                    `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields`,
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
                                                    next_page_token?: string;
                                                    items?: Array<{
                                                        ticket_customized_field_id: string;
                                                        helpdesk_id?: string;
                                                        key_name: string;
                                                        display_name: string;
                                                        position: string;
                                                        field_type: string;
                                                        description: string;
                                                        visible: boolean;
                                                        editable?: boolean;
                                                        required: boolean;
                                                        created_at?: string;
                                                        updated_at?: string;
                                                        created_by?: {
                                                            id?: string;
                                                            avatar_url?: string;
                                                            name?: string;
                                                            email?: string;
                                                            department?: string;
                                                            city?: string;
                                                            country?: string;
                                                        };
                                                        updated_by?: {
                                                            id?: string;
                                                            avatar_url?: string;
                                                            name?: string;
                                                            email?: string;
                                                            department?: string;
                                                            city?: string;
                                                            country?: string;
                                                        };
                                                        dropdown_allow_multiple?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=ticket_customized_field&version=v1 document }
                 *
                 * list the ticket customized fields
                 */
                list: async (
                    payload?: {
                        data?: { visible?: boolean };
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
                                    has_more?: boolean;
                                    next_page_token?: string;
                                    items?: Array<{
                                        ticket_customized_field_id: string;
                                        helpdesk_id?: string;
                                        key_name: string;
                                        display_name: string;
                                        position: string;
                                        field_type: string;
                                        description: string;
                                        visible: boolean;
                                        editable?: boolean;
                                        required: boolean;
                                        created_at?: string;
                                        updated_at?: string;
                                        created_by?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        updated_by?: {
                                            id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                            email?: string;
                                            department?: string;
                                            city?: string;
                                            country?: string;
                                        };
                                        dropdown_allow_multiple?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=ticket_customized_field&version=v1 document }
                 *
                 * update the ticket customized field
                 */
                patch: async (
                    payload?: {
                        data?: {
                            display_name?: string;
                            position?: string;
                            description?: string;
                            visible?: boolean;
                            required?: boolean;
                        };
                        path: { ticket_customized_field_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=ticket_customized_field&version=v1 document }
                 *
                 * create ticket customized field
                 */
                create: async (
                    payload?: {
                        data: {
                            helpdesk_id?: string;
                            key_name: string;
                            display_name: string;
                            position: string;
                            field_type: string;
                            description: string;
                            visible: boolean;
                            editable?: boolean;
                            required: boolean;
                            dropdown_allow_multiple?: boolean;
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
                                `${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields`,
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
             * notification
             */
            notification: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=cancel_approve&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel_approve&project=helpdesk&resource=notification&version=v1 document }
                 *
                 * 取消审核
                 *
                 * 提交审核后，如果需要取消审核，则调用此接口。
                 */
                cancelApprove: async (
                    payload?: {
                        path: { notification_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/cancel_approve`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=cancel_send&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel_send&project=helpdesk&resource=notification&version=v1 document }
                 *
                 * 取消推送
                 *
                 * 取消推送接口，审核通过后待调度可以调用，发送过程中可以调用（会撤回已发送的消息），发送完成后可以需要推送（会撤回所有已发送的消息）。
                 */
                cancelSend: async (
                    payload?: {
                        data: { is_recall: boolean };
                        path: { notification_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/cancel_send`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=notification&version=v1 document }
                 *
                 * 创建推送
                 *
                 * 调用接口创建推送，创建成功后为草稿状态。
                 */
                create: async (
                    payload?: {
                        data?: {
                            id?: string;
                            job_name?: string;
                            status?: number;
                            create_user?: {
                                user_id?: string;
                                avatar_url?: string;
                                name?: string;
                            };
                            created_at?: string;
                            update_user?: {
                                user_id?: string;
                                avatar_url?: string;
                                name?: string;
                            };
                            updated_at?: string;
                            target_user_count?: number;
                            sent_user_count?: number;
                            read_user_count?: number;
                            send_at?: string;
                            push_content?: string;
                            push_type?: number;
                            push_scope_type?: number;
                            new_staff_scope_type?: number;
                            new_staff_scope_department_list?: Array<{
                                department_id?: string;
                                name?: string;
                            }>;
                            user_list?: Array<{
                                user_id?: string;
                                avatar_url?: string;
                                name?: string;
                            }>;
                            department_list?: Array<{
                                department_id?: string;
                                name?: string;
                            }>;
                            chat_list?: Array<{
                                chat_id?: string;
                                name?: string;
                            }>;
                            ext?: string;
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
                                    notification_id?: string;
                                    status?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/notifications`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=execute_send&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=execute_send&project=helpdesk&resource=notification&version=v1 document }
                 *
                 * 执行推送
                 *
                 * 审核通过后调用此接口设置推送时间，等待调度系统调度，发送消息。
                 */
                executeSend: async (
                    payload?: {
                        data: { send_at: string };
                        path: { notification_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/execute_send`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=helpdesk&resource=notification&version=v1 document }
                 *
                 * 更新推送
                 *
                 * 更新推送信息，只有在草稿状态下才可以调用此接口进行更新。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            id?: string;
                            job_name?: string;
                            status?: number;
                            create_user?: {
                                user_id?: string;
                                avatar_url?: string;
                                name?: string;
                            };
                            created_at?: string;
                            update_user?: {
                                user_id?: string;
                                avatar_url?: string;
                                name?: string;
                            };
                            updated_at?: string;
                            target_user_count?: number;
                            sent_user_count?: number;
                            read_user_count?: number;
                            send_at?: string;
                            push_content?: string;
                            push_type?: number;
                            push_scope_type?: number;
                            new_staff_scope_type?: number;
                            new_staff_scope_department_list?: Array<{
                                department_id?: string;
                                name?: string;
                            }>;
                            user_list?: Array<{
                                user_id?: string;
                                avatar_url?: string;
                                name?: string;
                            }>;
                            department_list?: Array<{
                                department_id?: string;
                                name?: string;
                            }>;
                            chat_list?: Array<{
                                chat_id?: string;
                                name?: string;
                            }>;
                            ext?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { notification_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=preview&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=preview&project=helpdesk&resource=notification&version=v1 document }
                 *
                 * 预览推送
                 *
                 * 在正式执行推送之前是可以调用此接口预览设置的推送内容。
                 */
                preview: async (
                    payload?: {
                        path: { notification_id: string };
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
                                `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/preview`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=submit_approve&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=submit_approve&project=helpdesk&resource=notification&version=v1 document }
                 *
                 * 提交审核
                 *
                 * 正常情况下调用创建推送接口后，就可以调用提交审核接口，如果创建人是服务台owner则会自动审核通过，否则会通知服务台owner审核此推送信息。
                 */
                submitApprove: async (
                    payload?: {
                        data: { reason: string };
                        path: { notification_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { has_access?: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/submit_approve`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=helpdesk&resource=notification&version=v1 document }
                 *
                 * 查询推送
                 *
                 * 查询推送详情。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { notification_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    notification?: {
                                        id?: string;
                                        job_name?: string;
                                        status?: number;
                                        create_user?: {
                                            user_id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                        };
                                        created_at?: string;
                                        update_user?: {
                                            user_id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                        };
                                        updated_at?: string;
                                        target_user_count?: number;
                                        sent_user_count?: number;
                                        read_user_count?: number;
                                        send_at?: string;
                                        push_content?: string;
                                        push_type?: number;
                                        push_scope_type?: number;
                                        new_staff_scope_type?: number;
                                        new_staff_scope_department_list?: Array<{
                                            department_id?: string;
                                            name?: string;
                                        }>;
                                        user_list?: Array<{
                                            user_id?: string;
                                            avatar_url?: string;
                                            name?: string;
                                        }>;
                                        department_list?: Array<{
                                            department_id?: string;
                                            name?: string;
                                        }>;
                                        chat_list?: Array<{
                                            chat_id?: string;
                                            name?: string;
                                        }>;
                                        ext?: string;
                                    };
                                    approval_app_link?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id`,
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
             * ticket_message
             */
            ticketMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket.message&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=helpdesk&resource=ticket.message&version=v1 document }
                 *
                 * 获取工单消息详情
                 *
                 * 该接口用于获取服务台工单消息详情。
                 */
                list: async (
                    payload?: {
                        params?: {
                            time_start?: number;
                            time_end?: number;
                            page?: number;
                            page_size?: number;
                        };
                        path?: { ticket_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        id?: string;
                                        message_id?: string;
                                        message_type: string;
                                        created_at?: number;
                                        content: string;
                                        user_name?: string;
                                        avatar_url?: string;
                                        user_id?: string;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id/messages`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket.message&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=ticket.message&version=v1 document }
                 *
                 * 发送工单消息
                 *
                 * 该接口用于发送工单消息。
                 */
                create: async (
                    payload?: {
                        data: { msg_type: string; content: string };
                        path?: { ticket_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { message_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id/messages`,
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
             * bot.message
             */
            botMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=bot.message&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=helpdesk&resource=bot.message&version=v1 document }
                 *
                 * 服务台机器人向工单绑定的群内发送消息
                 *
                 * 通过服务台机器人给指定用户的服务台专属群或私聊发送消息，支持文本、富文本、卡片、图片。
                 *
                 * - 暂不支持新版卡片（ JSON 2.0 版本）。;- 暂不支持商店应用使用。;- 只支持向没有进行中工单的专属群中发送消息。;
                 */
                create: async (
                    payload?: {
                        data: {
                            msg_type: "text" | "post" | "image" | "interactive";
                            content: string;
                            receiver_id: string;
                            receive_type?: "chat" | "user";
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
                                data?: { message_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/helpdesk/v1/message`,
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
