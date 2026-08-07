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
import elearning from "./elearning";

// auto gen
export default abstract class Client extends elearning {
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
    event = {
        /**
         * outbound_ip
         */
        outboundIp: {
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
                                `${this.domain}/open-apis/event/v1/outbound_ip`,
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
                                                ip_list?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=outbound_ip&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=event&resource=outbound_ip&version=v1 document }
             *
             * 获取事件出口 IP
             *
             * 飞书开放平台向应用配置的回调地址推送事件时，是通过特定的 IP 发送出去的，应用可以通过本接口获取所有相关的 IP 地址。
             *
             * IP 地址有变更可能，建议定期拉取最新 IP 地址，并自动更新至防火墙规则。此外， IP 变更时，开放平台将会推送卡片消息和发布更新日志提前告知开发者。
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
                                ip_list?: Array<string>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/outbound_ip`,
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
         * failed_event
         */
        failedEvent: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        event_type?: string;
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
                                `${this.domain}/open-apis/event/v1/failed_events`,
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
                                                items: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=failed_event&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=event&resource=failed_event&version=v1 document }
             *
             * 获取失败事件列表
             *
             * 该接口用于获取消费失败的事件列表，可用于服务宕机后的业务恢复。最多支持拉取 3 天内，最多不超过 1000 条事件记录。
             *
             * :::html;<md-alert type="tip">;由于获取失败事件列表不会自动删除已经获取的事件信息，因此你需要确保在事件处理逻辑中添加唯一性判断，以避免对于事件的重复消费，可以使用如下方式判断事件唯一性：;- 对于 1.0 版本的事件，通过事件结构中的 uuid 字段判断事件唯一性。;- 对于 2.0 版本的事件，通过事件结构中的 event_id 字段判断事件唯一性。;</md-alert>;:::
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        event_type?: string;
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
                                items: Array<string>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/failed_events`,
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
         * connection
         */
        connection: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=connection&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=event&resource=connection&version=v1 document }
             *
             * 获取长连接在线数量
             *
             * 查询应用的长连接在线数量。应用由请求头中的 tenant_access_token 确定。;;长连接配置与接入方式请参考[使用长连接接收事件](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case)
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
                            data?: { online_instance_cnt?: number };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/connection`,
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=connection&apiName=bind_user&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=bind_user&project=event&resource=connection&version=v1 document }
             */
            bindUser: async (
                payload?: {
                    path: { connection_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/connections/:connection_id/bind_user`,
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=connection&apiName=unbind_user&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind_user&project=event&resource=connection&version=v1 document }
             */
            unbindUser: async (
                payload?: {
                    path: { connection_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/connections/:connection_id/unbind_user`,
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
         * subscription
         */
        subscription: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=get_encrypt_key&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_encrypt_key&project=event&resource=subscription&version=v1 document }
             *
             * 获取订阅的事件加密密钥
             */
            getEncryptKey: async (
                payload?: {
                    path: { subscription_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { encrypt_key?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id/encrypt_key`,
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=event&resource=subscription&version=v1 document }
             *
             * 删除动态事件订阅
             */
            delete: async (
                payload?: {
                    path: { subscription_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=event&resource=subscription&version=v1 document }
             *
             * 更新动态事件订阅内容
             */
            patch: async (
                payload?: {
                    data?: {
                        filter?: {
                            composite_condition?: {
                                logic_op?: string;
                                condition?: {
                                    operand?: string;
                                    op?: string;
                                    value?: string;
                                    list_value?: Array<string>;
                                };
                                composite_conditions?: Array<{}>;
                            };
                        };
                    };
                    path: { subscription_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                subscription?: {
                                    subscription_id?: string;
                                    authority?: {
                                        type?: string;
                                        open_id?: string;
                                        app_id?: string;
                                    };
                                    target_resource?: string;
                                    event_type?: string;
                                    payload_options?: {
                                        include_resource_data?: boolean;
                                    };
                                    filter?: {
                                        composite_condition?: {
                                            logic_op?: string;
                                            condition?: {
                                                operand?: string;
                                                op?: string;
                                                value?: string;
                                                list_value?: Array<string>;
                                            };
                                            composite_conditions?: Array<{}>;
                                        };
                                    };
                                    state?: string;
                                    suspension?: { code?: string };
                                    expire_time?: number;
                                    create_time?: number;
                                    update_time?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=reactivate&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reactivate&project=event&resource=subscription&version=v1 document }
             *
             * 恢复被挂起的动态事件订阅
             */
            reactivate: async (
                payload?: {
                    path: { subscription_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                subscription?: {
                                    subscription_id?: string;
                                    authority?: {
                                        type?: string;
                                        open_id?: string;
                                        app_id?: string;
                                    };
                                    target_resource?: string;
                                    event_type?: string;
                                    payload_options?: {
                                        include_resource_data?: boolean;
                                    };
                                    filter?: {
                                        composite_condition?: {
                                            logic_op?: string;
                                            condition?: {
                                                operand?: string;
                                                op?: string;
                                                value?: string;
                                                list_value?: Array<string>;
                                            };
                                            composite_conditions?: Array<{}>;
                                        };
                                    };
                                    state?: string;
                                    suspension?: { code?: string };
                                    expire_time?: number;
                                    create_time?: number;
                                    update_time?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id/reactivate`,
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=renew&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=renew&project=event&resource=subscription&version=v1 document }
             *
             * 续期动态事件订阅
             */
            renew: async (
                payload?: {
                    path: { subscription_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                subscription?: {
                                    subscription_id?: string;
                                    authority?: {
                                        type?: string;
                                        open_id?: string;
                                        app_id?: string;
                                    };
                                    target_resource?: string;
                                    event_type?: string;
                                    payload_options?: {
                                        include_resource_data?: boolean;
                                    };
                                    filter?: {
                                        composite_condition?: {
                                            logic_op?: string;
                                            condition?: {
                                                operand?: string;
                                                op?: string;
                                                value?: string;
                                                list_value?: Array<string>;
                                            };
                                            composite_conditions?: Array<{}>;
                                        };
                                    };
                                    state?: string;
                                    suspension?: { code?: string };
                                    expire_time?: number;
                                    create_time?: number;
                                    update_time?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id/renew`,
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=event&resource=subscription&version=v1 document }
             *
             * 查询单个动态事件订阅
             */
            get: async (
                payload?: {
                    path: { subscription_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                subscription?: {
                                    subscription_id?: string;
                                    authority?: {
                                        type?: string;
                                        open_id?: string;
                                        app_id?: string;
                                    };
                                    target_resource?: string;
                                    event_type?: string;
                                    payload_options?: {
                                        include_resource_data?: boolean;
                                    };
                                    filter?: {
                                        composite_condition?: {
                                            logic_op?: string;
                                            condition?: {
                                                operand?: string;
                                                op?: string;
                                                value?: string;
                                                list_value?: Array<string>;
                                            };
                                            composite_conditions?: Array<{}>;
                                        };
                                    };
                                    state?: string;
                                    suspension?: { code?: string };
                                    expire_time?: number;
                                    create_time?: number;
                                    update_time?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=event&resource=subscription&version=v1 document }
             *
             * 批量创建动态事件订阅
             */
            batchCreate: async (
                payload?: {
                    data: {
                        subscriptions: Array<{
                            target_resource: string;
                            event_type: string;
                            payload_options?: {
                                include_resource_data?: boolean;
                                encrypt?: { encrypt_key?: string };
                            };
                            filter?: {
                                composite_condition?: {
                                    logic_op?: string;
                                    condition?: {
                                        operand?: string;
                                        op?: string;
                                        value?: string;
                                        list_value?: Array<string>;
                                    };
                                    composite_conditions?: Array<{}>;
                                };
                            };
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
                                success_subscriptions?: Array<{
                                    subscription_id?: string;
                                    authority?: {
                                        type?: string;
                                        open_id?: string;
                                        app_id?: string;
                                    };
                                    target_resource?: string;
                                    event_type?: string;
                                    payload_options?: {
                                        include_resource_data?: boolean;
                                    };
                                    filter?: {
                                        composite_condition?: {
                                            logic_op?: string;
                                            condition?: {
                                                operand?: string;
                                                op?: string;
                                                value?: string;
                                                list_value?: Array<string>;
                                            };
                                            composite_conditions?: Array<{}>;
                                        };
                                    };
                                    state?: string;
                                    suspension?: { code?: string };
                                    expire_time?: number;
                                    create_time?: number;
                                    update_time?: number;
                                }>;
                                failed_subscriptions?: Array<{
                                    error_code: number;
                                    error_msg: string;
                                    subscription?: {
                                        target_resource: string;
                                        event_type: string;
                                        payload_options?: {
                                            include_resource_data?: boolean;
                                            encrypt?: { encrypt_key?: string };
                                        };
                                        filter?: {
                                            composite_condition?: {
                                                logic_op?: string;
                                                condition?: {
                                                    operand?: string;
                                                    op?: string;
                                                    value?: string;
                                                    list_value?: Array<string>;
                                                };
                                                composite_conditions?: Array<{}>;
                                            };
                                        };
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/subscriptions/batch`,
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=event&resource=subscription&version=v1 document }
             *
             * 创建动态事件订阅
             */
            create: async (
                payload?: {
                    data: {
                        target_resource: string;
                        event_type: string;
                        payload_options?: {
                            include_resource_data?: boolean;
                            encrypt?: { encrypt_key?: string };
                        };
                        filter?: {
                            composite_condition?: {
                                logic_op?: string;
                                condition?: {
                                    operand?: string;
                                    op?: string;
                                    value?: string;
                                    list_value?: Array<string>;
                                };
                                composite_conditions?: Array<{}>;
                            };
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
                                subscription?: {
                                    subscription_id?: string;
                                    authority?: {
                                        type?: string;
                                        open_id?: string;
                                        app_id?: string;
                                    };
                                    target_resource?: string;
                                    event_type?: string;
                                    payload_options?: {
                                        include_resource_data?: boolean;
                                    };
                                    filter?: {
                                        composite_condition?: {
                                            logic_op?: string;
                                            condition?: {
                                                operand?: string;
                                                op?: string;
                                                value?: string;
                                                list_value?: Array<string>;
                                            };
                                            composite_conditions?: Array<{}>;
                                        };
                                    };
                                    state?: string;
                                    suspension?: { code?: string };
                                    expire_time?: number;
                                    create_time?: number;
                                    update_time?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/subscriptions`,
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
                        state?: string;
                        target_resource?: string;
                        event_type?: string;
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
                                `${this.domain}/open-apis/event/v1/subscriptions`,
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
                                                    subscription_id?: string;
                                                    authority?: {
                                                        type?: string;
                                                        open_id?: string;
                                                        app_id?: string;
                                                    };
                                                    target_resource?: string;
                                                    event_type?: string;
                                                    payload_options?: {
                                                        include_resource_data?: boolean;
                                                    };
                                                    filter?: {
                                                        composite_condition?: {
                                                            logic_op?: string;
                                                            condition?: {
                                                                operand?: string;
                                                                op?: string;
                                                                value?: string;
                                                                list_value?: Array<string>;
                                                            };
                                                            composite_conditions?: Array<{}>;
                                                        };
                                                    };
                                                    state?: string;
                                                    suspension?: {
                                                        code?: string;
                                                    };
                                                    expire_time?: number;
                                                    create_time?: number;
                                                    update_time?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=event&resource=subscription&version=v1 document }
             *
             * 分页列出当前应用或当前用户身份下的订阅
             */
            list: async (
                payload?: {
                    params?: {
                        state?: string;
                        target_resource?: string;
                        event_type?: string;
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
                                    subscription_id?: string;
                                    authority?: {
                                        type?: string;
                                        open_id?: string;
                                        app_id?: string;
                                    };
                                    target_resource?: string;
                                    event_type?: string;
                                    payload_options?: {
                                        include_resource_data?: boolean;
                                    };
                                    filter?: {
                                        composite_condition?: {
                                            logic_op?: string;
                                            condition?: {
                                                operand?: string;
                                                op?: string;
                                                value?: string;
                                                list_value?: Array<string>;
                                            };
                                            composite_conditions?: Array<{}>;
                                        };
                                    };
                                    state?: string;
                                    suspension?: { code?: string };
                                    expire_time?: number;
                                    create_time?: number;
                                    update_time?: number;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/event/v1/subscriptions`,
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
             * outbound_ip
             */
            outboundIp: {
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
                                    `${this.domain}/open-apis/event/v1/outbound_ip`,
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
                                                    ip_list?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=outbound_ip&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=event&resource=outbound_ip&version=v1 document }
                 *
                 * 获取事件出口 IP
                 *
                 * 飞书开放平台向应用配置的回调地址推送事件时，是通过特定的 IP 发送出去的，应用可以通过本接口获取所有相关的 IP 地址。
                 *
                 * IP 地址有变更可能，建议定期拉取最新 IP 地址，并自动更新至防火墙规则。此外， IP 变更时，开放平台将会推送卡片消息和发布更新日志提前告知开发者。
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
                                    ip_list?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/outbound_ip`,
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
             * failed_event
             */
            failedEvent: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            event_type?: string;
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
                                    `${this.domain}/open-apis/event/v1/failed_events`,
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
                                                    items: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=failed_event&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=event&resource=failed_event&version=v1 document }
                 *
                 * 获取失败事件列表
                 *
                 * 该接口用于获取消费失败的事件列表，可用于服务宕机后的业务恢复。最多支持拉取 3 天内，最多不超过 1000 条事件记录。
                 *
                 * :::html;<md-alert type="tip">;由于获取失败事件列表不会自动删除已经获取的事件信息，因此你需要确保在事件处理逻辑中添加唯一性判断，以避免对于事件的重复消费，可以使用如下方式判断事件唯一性：;- 对于 1.0 版本的事件，通过事件结构中的 uuid 字段判断事件唯一性。;- 对于 2.0 版本的事件，通过事件结构中的 event_id 字段判断事件唯一性。;</md-alert>;:::
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            event_type?: string;
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
                                    items: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/failed_events`,
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
             * connection
             */
            connection: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=connection&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=event&resource=connection&version=v1 document }
                 *
                 * 获取长连接在线数量
                 *
                 * 查询应用的长连接在线数量。应用由请求头中的 tenant_access_token 确定。;;长连接配置与接入方式请参考[使用长连接接收事件](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case)
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
                                data?: { online_instance_cnt?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/connection`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=connection&apiName=bind_user&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=bind_user&project=event&resource=connection&version=v1 document }
                 */
                bindUser: async (
                    payload?: {
                        path: { connection_id: string };
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
                                `${this.domain}/open-apis/event/v1/connections/:connection_id/bind_user`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=connection&apiName=unbind_user&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind_user&project=event&resource=connection&version=v1 document }
                 */
                unbindUser: async (
                    payload?: {
                        path: { connection_id: string };
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
                                `${this.domain}/open-apis/event/v1/connections/:connection_id/unbind_user`,
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
             * subscription
             */
            subscription: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=get_encrypt_key&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_encrypt_key&project=event&resource=subscription&version=v1 document }
                 *
                 * 获取订阅的事件加密密钥
                 */
                getEncryptKey: async (
                    payload?: {
                        path: { subscription_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { encrypt_key?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id/encrypt_key`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=event&resource=subscription&version=v1 document }
                 *
                 * 删除动态事件订阅
                 */
                delete: async (
                    payload?: {
                        path: { subscription_id: string };
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
                                `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=event&resource=subscription&version=v1 document }
                 *
                 * 更新动态事件订阅内容
                 */
                patch: async (
                    payload?: {
                        data?: {
                            filter?: {
                                composite_condition?: {
                                    logic_op?: string;
                                    condition?: {
                                        operand?: string;
                                        op?: string;
                                        value?: string;
                                        list_value?: Array<string>;
                                    };
                                    composite_conditions?: Array<{}>;
                                };
                            };
                        };
                        path: { subscription_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    subscription?: {
                                        subscription_id?: string;
                                        authority?: {
                                            type?: string;
                                            open_id?: string;
                                            app_id?: string;
                                        };
                                        target_resource?: string;
                                        event_type?: string;
                                        payload_options?: {
                                            include_resource_data?: boolean;
                                        };
                                        filter?: {
                                            composite_condition?: {
                                                logic_op?: string;
                                                condition?: {
                                                    operand?: string;
                                                    op?: string;
                                                    value?: string;
                                                    list_value?: Array<string>;
                                                };
                                                composite_conditions?: Array<{}>;
                                            };
                                        };
                                        state?: string;
                                        suspension?: { code?: string };
                                        expire_time?: number;
                                        create_time?: number;
                                        update_time?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=reactivate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reactivate&project=event&resource=subscription&version=v1 document }
                 *
                 * 恢复被挂起的动态事件订阅
                 */
                reactivate: async (
                    payload?: {
                        path: { subscription_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    subscription?: {
                                        subscription_id?: string;
                                        authority?: {
                                            type?: string;
                                            open_id?: string;
                                            app_id?: string;
                                        };
                                        target_resource?: string;
                                        event_type?: string;
                                        payload_options?: {
                                            include_resource_data?: boolean;
                                        };
                                        filter?: {
                                            composite_condition?: {
                                                logic_op?: string;
                                                condition?: {
                                                    operand?: string;
                                                    op?: string;
                                                    value?: string;
                                                    list_value?: Array<string>;
                                                };
                                                composite_conditions?: Array<{}>;
                                            };
                                        };
                                        state?: string;
                                        suspension?: { code?: string };
                                        expire_time?: number;
                                        create_time?: number;
                                        update_time?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id/reactivate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=renew&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=renew&project=event&resource=subscription&version=v1 document }
                 *
                 * 续期动态事件订阅
                 */
                renew: async (
                    payload?: {
                        path: { subscription_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    subscription?: {
                                        subscription_id?: string;
                                        authority?: {
                                            type?: string;
                                            open_id?: string;
                                            app_id?: string;
                                        };
                                        target_resource?: string;
                                        event_type?: string;
                                        payload_options?: {
                                            include_resource_data?: boolean;
                                        };
                                        filter?: {
                                            composite_condition?: {
                                                logic_op?: string;
                                                condition?: {
                                                    operand?: string;
                                                    op?: string;
                                                    value?: string;
                                                    list_value?: Array<string>;
                                                };
                                                composite_conditions?: Array<{}>;
                                            };
                                        };
                                        state?: string;
                                        suspension?: { code?: string };
                                        expire_time?: number;
                                        create_time?: number;
                                        update_time?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id/renew`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=event&resource=subscription&version=v1 document }
                 *
                 * 查询单个动态事件订阅
                 */
                get: async (
                    payload?: {
                        path: { subscription_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    subscription?: {
                                        subscription_id?: string;
                                        authority?: {
                                            type?: string;
                                            open_id?: string;
                                            app_id?: string;
                                        };
                                        target_resource?: string;
                                        event_type?: string;
                                        payload_options?: {
                                            include_resource_data?: boolean;
                                        };
                                        filter?: {
                                            composite_condition?: {
                                                logic_op?: string;
                                                condition?: {
                                                    operand?: string;
                                                    op?: string;
                                                    value?: string;
                                                    list_value?: Array<string>;
                                                };
                                                composite_conditions?: Array<{}>;
                                            };
                                        };
                                        state?: string;
                                        suspension?: { code?: string };
                                        expire_time?: number;
                                        create_time?: number;
                                        update_time?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/subscriptions/:subscription_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=event&resource=subscription&version=v1 document }
                 *
                 * 批量创建动态事件订阅
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            subscriptions: Array<{
                                target_resource: string;
                                event_type: string;
                                payload_options?: {
                                    include_resource_data?: boolean;
                                    encrypt?: { encrypt_key?: string };
                                };
                                filter?: {
                                    composite_condition?: {
                                        logic_op?: string;
                                        condition?: {
                                            operand?: string;
                                            op?: string;
                                            value?: string;
                                            list_value?: Array<string>;
                                        };
                                        composite_conditions?: Array<{}>;
                                    };
                                };
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
                                    success_subscriptions?: Array<{
                                        subscription_id?: string;
                                        authority?: {
                                            type?: string;
                                            open_id?: string;
                                            app_id?: string;
                                        };
                                        target_resource?: string;
                                        event_type?: string;
                                        payload_options?: {
                                            include_resource_data?: boolean;
                                        };
                                        filter?: {
                                            composite_condition?: {
                                                logic_op?: string;
                                                condition?: {
                                                    operand?: string;
                                                    op?: string;
                                                    value?: string;
                                                    list_value?: Array<string>;
                                                };
                                                composite_conditions?: Array<{}>;
                                            };
                                        };
                                        state?: string;
                                        suspension?: { code?: string };
                                        expire_time?: number;
                                        create_time?: number;
                                        update_time?: number;
                                    }>;
                                    failed_subscriptions?: Array<{
                                        error_code: number;
                                        error_msg: string;
                                        subscription?: {
                                            target_resource: string;
                                            event_type: string;
                                            payload_options?: {
                                                include_resource_data?: boolean;
                                                encrypt?: {
                                                    encrypt_key?: string;
                                                };
                                            };
                                            filter?: {
                                                composite_condition?: {
                                                    logic_op?: string;
                                                    condition?: {
                                                        operand?: string;
                                                        op?: string;
                                                        value?: string;
                                                        list_value?: Array<string>;
                                                    };
                                                    composite_conditions?: Array<{}>;
                                                };
                                            };
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/subscriptions/batch`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=event&resource=subscription&version=v1 document }
                 *
                 * 创建动态事件订阅
                 */
                create: async (
                    payload?: {
                        data: {
                            target_resource: string;
                            event_type: string;
                            payload_options?: {
                                include_resource_data?: boolean;
                                encrypt?: { encrypt_key?: string };
                            };
                            filter?: {
                                composite_condition?: {
                                    logic_op?: string;
                                    condition?: {
                                        operand?: string;
                                        op?: string;
                                        value?: string;
                                        list_value?: Array<string>;
                                    };
                                    composite_conditions?: Array<{}>;
                                };
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
                                    subscription?: {
                                        subscription_id?: string;
                                        authority?: {
                                            type?: string;
                                            open_id?: string;
                                            app_id?: string;
                                        };
                                        target_resource?: string;
                                        event_type?: string;
                                        payload_options?: {
                                            include_resource_data?: boolean;
                                        };
                                        filter?: {
                                            composite_condition?: {
                                                logic_op?: string;
                                                condition?: {
                                                    operand?: string;
                                                    op?: string;
                                                    value?: string;
                                                    list_value?: Array<string>;
                                                };
                                                composite_conditions?: Array<{}>;
                                            };
                                        };
                                        state?: string;
                                        suspension?: { code?: string };
                                        expire_time?: number;
                                        create_time?: number;
                                        update_time?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/subscriptions`,
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
                            state?: string;
                            target_resource?: string;
                            event_type?: string;
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
                                    `${this.domain}/open-apis/event/v1/subscriptions`,
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
                                                        subscription_id?: string;
                                                        authority?: {
                                                            type?: string;
                                                            open_id?: string;
                                                            app_id?: string;
                                                        };
                                                        target_resource?: string;
                                                        event_type?: string;
                                                        payload_options?: {
                                                            include_resource_data?: boolean;
                                                        };
                                                        filter?: {
                                                            composite_condition?: {
                                                                logic_op?: string;
                                                                condition?: {
                                                                    operand?: string;
                                                                    op?: string;
                                                                    value?: string;
                                                                    list_value?: Array<string>;
                                                                };
                                                                composite_conditions?: Array<{}>;
                                                            };
                                                        };
                                                        state?: string;
                                                        suspension?: {
                                                            code?: string;
                                                        };
                                                        expire_time?: number;
                                                        create_time?: number;
                                                        update_time?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=subscription&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=event&resource=subscription&version=v1 document }
                 *
                 * 分页列出当前应用或当前用户身份下的订阅
                 */
                list: async (
                    payload?: {
                        params?: {
                            state?: string;
                            target_resource?: string;
                            event_type?: string;
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
                                        subscription_id?: string;
                                        authority?: {
                                            type?: string;
                                            open_id?: string;
                                            app_id?: string;
                                        };
                                        target_resource?: string;
                                        event_type?: string;
                                        payload_options?: {
                                            include_resource_data?: boolean;
                                        };
                                        filter?: {
                                            composite_condition?: {
                                                logic_op?: string;
                                                condition?: {
                                                    operand?: string;
                                                    op?: string;
                                                    value?: string;
                                                    list_value?: Array<string>;
                                                };
                                                composite_conditions?: Array<{}>;
                                            };
                                        };
                                        state?: string;
                                        suspension?: { code?: string };
                                        expire_time?: number;
                                        create_time?: number;
                                        update_time?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/event/v1/subscriptions`,
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
