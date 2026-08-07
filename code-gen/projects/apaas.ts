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
import aily from "./aily";

// auto gen
export default abstract class Client extends aily {
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
    apaas = {
        v1: {
            /**
             * application
             */
            application: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application&apiName=import_app_meta&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=import_app_meta&project=apaas&resource=application&version=v1 document }
                 *
                 * 导入应用元数据包
                 */
                importAppMeta: async (
                    payload?: {
                        data?: {
                            files?: Buffer | fs.ReadStream;
                            ignore_update_metas?: Array<string>;
                            ignore_create_metas?: Array<string>;
                            ignore_delete_metas?: Array<string>;
                            clear_record?: boolean;
                        };
                        path: { namespace: string };
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
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/import_app_meta`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application&version=v1 document }
                 */
                get: async (
                    payload?: {
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    name?: Record<string, string>;
                                    namespace?: string;
                                    description?: Record<string, string>;
                                    owner?: { user_id?: string; name?: string };
                                    tenants?: Array<{
                                        tenant_id?: string;
                                        tenant_name?: string;
                                        domain?: string;
                                        type?: string;
                                    }>;
                                    created_at?: string;
                                    created_by?: string;
                                    status?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application&apiName=export_app_meta&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=export_app_meta&project=apaas&resource=application&version=v1 document }
                 *
                 * 导出应用元数据包
                 */
                exportAppMeta: async (
                    payload?: {
                        data?: { pub_type?: string };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/export_app_meta`,
                                path
                            ),
                            method: "POST",
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=apaas&resource=application&version=v1 document }
                 */
                patch: async (
                    payload?: {
                        data?: {
                            name?: Record<string, string>;
                            description?: Record<string, string>;
                        };
                        path: { namespace: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=application&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            name?: Record<string, string>;
                            namespace: string;
                            description?: Record<string, string>;
                            admins?: Array<string>;
                            sandbox_tenant?: {
                                tenant_id?: string;
                                tenant_name?: string;
                            };
                            env?: {
                                dev_id?: string;
                                test_id?: string;
                                prod_id?: string;
                            };
                            app_scene_type:
                                | "0"
                                | "1"
                                | "2"
                                | "3"
                                | "4"
                                | "5"
                                | "6"
                                | "7"
                                | "10"
                                | "11"
                                | "12"
                                | "21"
                                | "40";
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
                                data?: { namespace?: string; task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications`,
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
             * application.import_meta_task
             */
            applicationImportMetaTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.import_meta_task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.import_meta_task&version=v1 document }
                 *
                 * 获取导入应用任务
                 */
                get: async (
                    payload?: {
                        path: { namespace: string; task_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { status?: "0" | "1" | "2" | "3" };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/import_meta_tasks/:task_id`,
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
             * application.event_subscribe_rule
             */
            applicationEventSubscribeRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.event_subscribe_rule&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=apaas&resource=application.event_subscribe_rule&version=v1 document }
                 */
                batchCreate: async (
                    payload?: {
                        data?: { event_types?: Array<string> };
                        path: { namespace: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/event_subscribe_rules/batch_create`,
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
                        path: { namespace: string };
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
                                    `${this.domain}/open-apis/apaas/v1/applications/:namespace/event_subscribe_rules`,
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
                                                    subscribe_rules?: Array<{
                                                        namespace?: string;
                                                        event_type?: string;
                                                        creator?: string;
                                                        create_time?: string;
                                                        id?: string;
                                                        created_by?: {
                                                            id?: string;
                                                            name?: string;
                                                            tenant_id?: string;
                                                            email?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.event_subscribe_rule&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=application.event_subscribe_rule&version=v1 document }
                 */
                list: async (
                    payload?: {
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    subscribe_rules?: Array<{
                                        namespace?: string;
                                        event_type?: string;
                                        creator?: string;
                                        create_time?: string;
                                        id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            tenant_id?: string;
                                            email?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/event_subscribe_rules`,
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
             * application.connector.instance
             */
            applicationConnectorInstance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.connector.instance&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=apaas&resource=application.connector.instance&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        path: { namespace: string; instance_apiid: string };
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
                                `${this.domain}/open-apis/apaas/applications/:namespace/connectors/instances/:instance_apiid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.connector.instance&apiName=execute&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=execute&project=apaas&resource=application.connector.instance&version=v1 document }
                 */
                execute: async (
                    payload?: {
                        data?: { input_data?: Record<string, string> };
                        path: { namespace: string; instance_apiid: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    biz_code?: string;
                                    biz_message?: string;
                                    output_data?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/applications/:namespace/connectors/instances/:instance_apiid/execute`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.connector.instance&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=apaas&resource=application.connector.instance&version=v1 document }
                 */
                update: async (
                    payload?: {
                        data?: {
                            instance?: {
                                api_name?: string;
                                label?: Record<string, string>;
                                desc?: Record<string, string>;
                                out_biz_type?: string;
                                out_biz_id?: string;
                                definition?: {
                                    connector_source_type?: string;
                                    connector_api_name?: string;
                                    action_api_name?: string;
                                    connection_api_name?: string;
                                    input_data?: string;
                                    output_data_schema?: string;
                                };
                            };
                            ref_info?: {
                                source_api_name?: string;
                                source_type?: string;
                                extra?: Record<string, string>;
                            };
                        };
                        path: { namespace: string; instance_apiid?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    instance?: {
                                        api_id?: string;
                                        api_name?: string;
                                        label?: Record<string, string>;
                                        desc?: Record<string, string>;
                                        out_biz_type?: string;
                                        out_biz_id?: string;
                                        definition?: {
                                            connector_source_type?: string;
                                            connector_api_name?: string;
                                            action_api_name?: string;
                                            connection_api_name?: string;
                                            input_data?: string;
                                            output_data_schema?: string;
                                        };
                                    };
                                    ref_info?: {
                                        source_api_name?: string;
                                        source_type?: string;
                                        extra?: Record<string, string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/applications/:namespace/connectors/instances/:instance_apiid`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.connector.instance&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.connector.instance&version=v1 document }
                 */
                query: async (
                    payload?: {
                        data?: {
                            page_size?: string;
                            page_token?: string;
                            out_biz_type?: string;
                            out_biz_id?: string;
                            criterion?: {
                                conditions?: Array<{
                                    index?: string;
                                    left?: {
                                        type?: string;
                                        settings?: string;
                                        display_names?: Array<string>;
                                    };
                                    right?: {
                                        type?: string;
                                        settings?: string;
                                        display_names?: Array<string>;
                                    };
                                    operator?: string;
                                }>;
                                logic_expression?: string;
                            };
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        api_id?: string;
                                        api_name?: string;
                                        label?: Record<string, string>;
                                        desc?: Record<string, string>;
                                        out_biz_type?: string;
                                        out_biz_id?: string;
                                        definition?: {
                                            connector_source_type?: string;
                                            connector_api_name?: string;
                                            action_api_name?: string;
                                            connection_api_name?: string;
                                            input_data?: string;
                                            output_data_schema?: string;
                                        };
                                    }>;
                                    next_page_token?: string;
                                    count?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/applications/:namespace/connectors/instances/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.connector.instance&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=application.connector.instance&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            instance?: {
                                api_id?: string;
                                api_name?: string;
                                label?: Record<string, string>;
                                desc?: Record<string, string>;
                                out_biz_type?: string;
                                out_biz_id?: string;
                                definition?: {
                                    connector_source_type?: string;
                                    connector_api_name?: string;
                                    action_api_name?: string;
                                    connection_api_name?: string;
                                    input_data?: string;
                                    output_data_schema?: string;
                                };
                            };
                            ref_info?: {
                                source_api_name?: string;
                                source_type?: string;
                                extra?: Record<string, string>;
                            };
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    instance?: {
                                        api_id?: string;
                                        api_name?: string;
                                        label?: Record<string, string>;
                                        desc?: Record<string, string>;
                                        out_biz_type?: string;
                                        out_biz_id?: string;
                                        definition?: {
                                            connector_source_type?: string;
                                            connector_api_name?: string;
                                            action_api_name?: string;
                                            connection_api_name?: string;
                                            input_data?: string;
                                            output_data_schema?: string;
                                        };
                                    };
                                    ref_info?: {
                                        source_api_name?: string;
                                        source_type?: string;
                                        extra?: Record<string, string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/applications/:namespace/connectors/instances`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.connector.instance&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.connector.instance&version=v1 document }
                 */
                get: async (
                    payload?: {
                        path: { namespace: string; instance_apiid: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    instance?: {
                                        api_id?: string;
                                        api_name?: string;
                                        label?: Record<string, string>;
                                        desc?: Record<string, string>;
                                        out_biz_type?: string;
                                        out_biz_id?: string;
                                        definition?: {
                                            connector_source_type?: string;
                                            connector_api_name?: string;
                                            action_api_name?: string;
                                            connection_api_name?: string;
                                            input_data?: string;
                                            output_data_schema?: string;
                                        };
                                    };
                                    ref_info?: {
                                        source_api_name?: string;
                                        source_type?: string;
                                        extra?: Record<string, string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/applications/:namespace/connectors/instances/:instance_apiid`,
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
             * application.members
             */
            applicationMembers: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.members&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.members&version=v1 document }
                 */
                get: async (
                    payload?: {
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    admins?: Array<{
                                        user_id?: string;
                                        name?: string;
                                    }>;
                                    developers?: Array<{
                                        user_id?: string;
                                        name?: string;
                                    }>;
                                    testers?: Array<{
                                        user_id?: string;
                                        name?: string;
                                    }>;
                                    data_admins?: Array<{
                                        user_id?: string;
                                        name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.members&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=apaas&resource=application.members&version=v1 document }
                 */
                patch: async (
                    payload?: {
                        data?: {
                            admins?: Array<string>;
                            developers?: Array<string>;
                            testers?: Array<string>;
                            data_admins?: Array<string>;
                        };
                        path: { namespace: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.members&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=application.members&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            admins?: Array<string>;
                            developers?: Array<string>;
                            testers?: Array<string>;
                            data_admins?: Array<string>;
                        };
                        path: { namespace: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/members`,
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
             * approval_task
             */
            approvalTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=add_assignee&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_assignee&project=apaas&resource=approval_task&version=v1 document }
                 *
                 * 人工任务加签
                 *
                 * 对于人工任务进行加签操作
                 */
                addAssignee: async (
                    payload?: {
                        data: {
                            user_id: string;
                            approvers?: Array<string>;
                            add_assignee_type?: string;
                            opinion?: string;
                        };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/add_assignee`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=agree&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=agree&project=apaas&resource=approval_task&version=v1 document }
                 *
                 * 同意人工任务
                 *
                 * 对于人工任务进行同意操作
                 */
                agree: async (
                    payload?: {
                        data: { user_id: string; opinion?: string };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/agree`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=transfer&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer&project=apaas&resource=approval_task&version=v1 document }
                 *
                 * 转交人工任务
                 *
                 * 对于人工任务进行转交操作
                 */
                transfer: async (
                    payload?: {
                        data: {
                            user_id: string;
                            from_user_ids?: Array<string>;
                            to_user_ids?: Array<string>;
                            opinion?: string;
                        };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/transfer`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=reject&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reject&project=apaas&resource=approval_task&version=v1 document }
                 *
                 * 拒绝人工任务
                 *
                 * 对于人工任务进行拒绝操作
                 */
                reject: async (
                    payload?: {
                        data: { user_id: string; opinion?: string };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/reject`,
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
             * application.component_lib
             */
            applicationComponentLib: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.component_lib&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=apaas&resource=application.component_lib&version=v1 document }
                 */
                update: async (
                    payload?: {
                        data?: { lib_namespace?: string };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/component_lib`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.component_lib&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.component_lib&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            limit?: string;
                            offset?: number;
                            include_deleted?: boolean;
                            search_query?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    refs?: Array<{
                                        basic_info?: {
                                            lib_id?: string;
                                            namespace?: string;
                                            names?: Array<{
                                                language_code?: string;
                                                text?: string;
                                            }>;
                                            descriptions?: Array<{
                                                language_code?: string;
                                                text?: string;
                                            }>;
                                            logo?: {
                                                source?: string;
                                                color?: string;
                                                color_id?: string;
                                                icon?: string;
                                            };
                                            lib_type?: "1" | "2";
                                            owner?: {
                                                id?: string;
                                                name?: string;
                                                tenant_id?: string;
                                                email?: string;
                                            };
                                            install_task_info?: {
                                                task_id?: string;
                                                task_progress?: string;
                                                task_status?: string;
                                            };
                                            sandbox_tenant_name?: string;
                                            status?: string;
                                            i_s_v_market_version?: string;
                                            i_s_v_customer_count?: string;
                                            created_at?: string;
                                            created_by?: {
                                                id?: string;
                                                name?: string;
                                                tenant_id?: string;
                                                email?: string;
                                            };
                                            updated_at?: string;
                                            updated_by?: {
                                                id?: string;
                                                name?: string;
                                                tenant_id?: string;
                                                email?: string;
                                            };
                                            lib_status?: string;
                                            on_top?: boolean;
                                        };
                                        version_number?: string;
                                        can_upgrade?: boolean;
                                        version_id?: string;
                                        comps_count?: string;
                                        operating_task_info?: {
                                            task_id?: string;
                                            task_progress?: string;
                                            task_status?: string;
                                        };
                                        operating_type?: string;
                                        latest_version_number?: string;
                                        installed_at?: string;
                                        installed_by?: {
                                            id?: string;
                                            name?: string;
                                            tenant_id?: string;
                                            email?: string;
                                        };
                                        updated_at?: string;
                                        updated_by?: {
                                            id?: string;
                                            name?: string;
                                            tenant_id?: string;
                                            email?: string;
                                        };
                                        developer_names?: Array<{
                                            language_code?: string;
                                            text?: string;
                                        }>;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/component_lib`,
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
             * application.event_subscribers
             */
            applicationEventSubscribers: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.event_subscribers&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=application.event_subscribers&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            auth_type: string;
                            token?: string;
                            token_client_id?: string;
                            token_url?: string;
                            token_client_secret?: string;
                            webhook_url: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/event_subscribers`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.event_subscribers&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.event_subscribers&version=v1 document }
                 */
                get: async (
                    payload?: {
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    subscriber?: {
                                        namespace?: string;
                                        auth_type?: string;
                                        token?: string;
                                        token_client_id?: string;
                                        token_url?: string;
                                        token_client_secret?: string;
                                        webhook_url?: string;
                                        id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/event_subscribers`,
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
             * component_lib.version
             */
            componentLibVersion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=component_lib.version&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=component_lib.version&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            directions?: Array<{
                                language_code?: string;
                                text?: string;
                            }>;
                            version_number?: string;
                            scope?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/component_lib/:namespace/versions`,
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
                            limit?: string;
                            offset?: string;
                            sort_by?: string;
                            sort_order?: string;
                            status_lists?: Array<string>;
                            search_query?: string;
                        };
                        path: { namespace: string };
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
                                    `${this.domain}/open-apis/apaas/v1/component_lib/:namespace/versions`,
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
                                                    versions?: Array<{
                                                        version_number?: string;
                                                        directions?: Array<{
                                                            language_code?: string;
                                                            text?: string;
                                                        }>;
                                                        status?: number;
                                                        is_latest?: boolean;
                                                        settings?: string;
                                                        isv_link?: string;
                                                        is_isv_market_version?: boolean;
                                                        link?: string;
                                                        is_market_version?: boolean;
                                                        created_at?: string;
                                                        created_by?: {
                                                            id?: string;
                                                            name?: string;
                                                            tenant_id?: string;
                                                            email?: string;
                                                        };
                                                        applied_at?: string;
                                                    }>;
                                                    total?: string;
                                                    lib_names?: Array<{
                                                        language_code?: string;
                                                        text?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=component_lib.version&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=component_lib.version&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            limit?: string;
                            offset?: string;
                            sort_by?: string;
                            sort_order?: string;
                            status_lists?: Array<string>;
                            search_query?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    versions?: Array<{
                                        version_number?: string;
                                        directions?: Array<{
                                            language_code?: string;
                                            text?: string;
                                        }>;
                                        status?: number;
                                        is_latest?: boolean;
                                        settings?: string;
                                        isv_link?: string;
                                        is_isv_market_version?: boolean;
                                        link?: string;
                                        is_market_version?: boolean;
                                        created_at?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            tenant_id?: string;
                                            email?: string;
                                        };
                                        applied_at?: string;
                                    }>;
                                    total?: string;
                                    lib_names?: Array<{
                                        language_code?: string;
                                        text?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/component_lib/:namespace/versions`,
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
             * component_lib.market
             */
            componentLibMarket: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=component_lib.market&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=apaas&resource=component_lib.market&version=v1 document }
                 *
                 * 上架、下架组件库
                 */
                update: async (
                    payload?: {
                        data: {
                            version_number: string;
                            market_scope?: string;
                            gray_tenant_lists?: Array<string>;
                            access_info?: string;
                        };
                        path: { namespace: string };
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
                                `${this.domain}/open-apis/apaas/v1/component_lib/:namespace/market`,
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
             * application.object.record
             */
            applicationObjectRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 删除记录
                 *
                 * 删除对象中的指定记录
                 */
                delete: async (
                    payload?: {
                        path: {
                            namespace: string;
                            object_api_name: string;
                            id: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/:id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 获取记录详情
                 *
                 * 获取对象中指定的记录详情
                 */
                query: async (
                    payload?: {
                        data?: { select?: Array<string> };
                        path: {
                            namespace: string;
                            object_api_name: string;
                            id: string;
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
                                data?: { item: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/:id/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 批量新建记录
                 *
                 * 一次新建多条对象中的记录
                 */
                batchCreate: async (
                    payload?: {
                        data: { records: string };
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        success: boolean;
                                        id?: string;
                                        errors?: Array<{
                                            code: string;
                                            message: string;
                                            sub_code?: string;
                                            fields?: Array<string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 编辑记录
                 *
                 * 编辑对象中的指定记录
                 */
                patch: async (
                    payload?: {
                        data: { record: string };
                        path: {
                            namespace: string;
                            object_api_name: string;
                            id: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/:id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 批量删除记录
                 *
                 * 一次删除多条对象中的记录
                 */
                batchDelete: async (
                    payload?: {
                        data: { ids: Array<string> };
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        success: boolean;
                                        id?: string;
                                        errors?: Array<{
                                            code: string;
                                            message: string;
                                            sub_code?: string;
                                            fields?: Array<string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 批量编辑记录
                 *
                 * 一次编辑多条对象中的记录
                 */
                batchUpdate: async (
                    payload?: {
                        data: { records: string };
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        success: boolean;
                                        id?: string;
                                        errors?: Array<{
                                            code: string;
                                            message: string;
                                            sub_code?: string;
                                            fields?: Array<string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_update`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 新建记录
                 *
                 * 在对象中新建记录
                 */
                create: async (
                    payload?: {
                        data: { record: string };
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_query&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 查询记录列表
                 *
                 * 获取对象中符合指定条件的记录列表
                 */
                batchQuery: async (
                    payload?: {
                        data: {
                            select: Array<string>;
                            filter?: {
                                conditions?: Array<{
                                    index?: string;
                                    left?: {
                                        type?: string;
                                        settings?: string;
                                        display_names?: Array<string>;
                                    };
                                    right?: {
                                        type?: string;
                                        settings?: string;
                                        display_names?: Array<string>;
                                    };
                                    operator?: string;
                                }>;
                                logic_expression?: string;
                            };
                            order_by?: Array<{
                                field: string;
                                direction: "ASC" | "DESC";
                            }>;
                            group_by?: Array<{ field: string }>;
                            page_token?: string;
                            use_page_token?: boolean;
                            page_size?: number;
                            offset?: number;
                            need_total_count?: boolean;
                        };
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    items: string;
                                    total?: number;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_query`,
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
             * application.object
             */
            applicationObject: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object&apiName=oql_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=oql_query&project=apaas&resource=application.object&version=v1 document }
                 *
                 * 执行 OQL
                 *
                 * 在应用内执行 OQL 语句
                 */
                oqlQuery: async (
                    payload?: {
                        data: {
                            query: string;
                            args?: string;
                            named_args?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { columns: Array<string>; rows: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/oql_query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.object&version=v1 document }
                 *
                 * 获取对象列表
                 *
                 * 在应用内查询对象列表;
                 */
                query: async (
                    payload?: {
                        data?: {
                            filter?: { quick_query?: string; type?: string };
                            limit?: number;
                            offset?: number;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        api_name?: string;
                                        label?: {
                                            zh_cn: string;
                                            en_us: string;
                                        };
                                        type?: string;
                                        settings?: {
                                            display_name?: string;
                                            allow_search_fields?: Array<string>;
                                            search_layouts?: Array<string>;
                                        };
                                        fields?: Array<{
                                            api_name?: string;
                                            label?: {
                                                zh_cn: string;
                                                en_us: string;
                                            };
                                            type?: {
                                                name?: string;
                                                settings?: string;
                                            };
                                            created_at?: number;
                                            updated_at?: number;
                                        }>;
                                        created_at?: number;
                                        updated_at?: number;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.object&version=v1 document }
                 *
                 * 获取对象信息
                 *
                 * 在应用内查询某个对象的详情信息;
                 */
                get: async (
                    payload?: {
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    object?: {
                                        api_name?: string;
                                        label?: {
                                            zh_cn: string;
                                            en_us: string;
                                        };
                                        type?: string;
                                        settings?: {
                                            display_name?: string;
                                            allow_search_fields?: Array<string>;
                                            search_layouts?: Array<string>;
                                        };
                                        fields?: Array<{
                                            api_name?: string;
                                            label?: {
                                                zh_cn: string;
                                                en_us: string;
                                            };
                                            type?: {
                                                name?: string;
                                                settings?: string;
                                            };
                                            created_at?: number;
                                            updated_at?: number;
                                        }>;
                                        created_at?: number;
                                        updated_at?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=apaas&resource=application.object&version=v1 document }
                 *
                 * 搜索记录
                 *
                 * 在应用内搜索记录
                 */
                search: async (
                    payload?: {
                        data?: {
                            q?: string;
                            search_objects?: Array<{
                                api_name?: string;
                                search_fields?: Array<string>;
                                select?: Array<string>;
                                filter?: {
                                    conditions?: Array<{
                                        index?: string;
                                        left?: {
                                            type?: string;
                                            settings?: string;
                                            display_names?: Array<string>;
                                        };
                                        right?: {
                                            type?: string;
                                            settings?: string;
                                            display_names?: Array<string>;
                                        };
                                        operator?: string;
                                    }>;
                                    logic_expression?: string;
                                };
                                order_by?: {
                                    field?: string;
                                    order_type?: "asc" | "desc";
                                };
                            }>;
                            page_token?: string;
                            page_size?: string;
                            metadata?: "Label" | "SearchLayout";
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    records?: string;
                                    has_more?: boolean;
                                    next_page_token?: string;
                                    objects?: Array<{
                                        object?: {
                                            id?: number;
                                            api_name?: string;
                                            label?: Record<string, string>;
                                            settings?: {
                                                display_name?: string;
                                                allow_search_fields?: Array<string>;
                                                search_layout?: {
                                                    display_fields?: Array<string>;
                                                };
                                            };
                                        };
                                        fields?: Array<{
                                            id?: number;
                                            api_name?: string;
                                            type?: string;
                                            label?: Record<string, string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/search`,
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
             * application.function
             */
            applicationFunction: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.function&apiName=invoke&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=invoke&project=apaas&resource=application.function&version=v1 document }
                 *
                 * 执行函数
                 *
                 * 执行基于飞书应用引擎开发的应用的自定义函数
                 */
                invoke: async (
                    payload?: {
                        data?: { params?: string };
                        path: { namespace: string; function_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { result?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/functions/:function_api_name/invoke`,
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
             * application.approval_instance
             */
            applicationApprovalInstance: {
                listidsWithIterator: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            api_ids?: Array<string>;
                        };
                        params?: { page_size?: string; page_token?: string };
                        path: { namespace: string };
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
                                    `${this.domain}/open-apis/apaas/v1/applications/:namespace/approval_instances/listids`,
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
                                                    approval_instance_ids?: Array<string>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    count?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.approval_instance&apiName=listids&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=listids&project=apaas&resource=application.approval_instance&version=v1 document }
                 *
                 * 查询审批实例ID列表
                 *
                 * 给定一组流程的ApiID，查询对应的审批实例ID列表
                 */
                listids: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            api_ids?: Array<string>;
                        };
                        params?: { page_size?: string; page_token?: string };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    approval_instance_ids?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    count?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/approval_instances/listids`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.approval_instance&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.approval_instance&version=v1 document }
                 *
                 * 查询审批实例详情
                 *
                 * 给定审批实例ID，返回审批实例的详细信息
                 */
                get: async (
                    payload?: {
                        params?: { includes?: Array<string> };
                        path: {
                            namespace: string;
                            approval_instance_id: string;
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
                                    approval_instance?: {
                                        id?: string;
                                        label?: Record<string, string>;
                                        initiator?: string;
                                        instance_start_time?: string;
                                        status?: string;
                                        tasks?: Array<{
                                            id?: string;
                                            task_status?: string;
                                            task_start_time?: string;
                                            task_end_time?: string;
                                            form_data?: string;
                                            approval_logic?: string;
                                            approvers?: Array<string>;
                                            assigners?: Array<string>;
                                            task_url?: string;
                                            task_type?: string;
                                            free_cc_record?: string;
                                            add_assignee_record?: string;
                                        }>;
                                        comments?: Array<{
                                            id?: string;
                                            commenter?: string;
                                            content?: string;
                                            create_at?: string;
                                            update_at?: string;
                                        }>;
                                        api_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/approval_instances/:approval_instance_id`,
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
             * application.role.member
             */
            applicationRoleMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=batch_remove_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove_authorization&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 批量删除角色成员授权
                 *
                 * 批量删除角色成员授权
                 */
                batchRemoveAuthorization: async (
                    payload?: {
                        data?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                        };
                        path: { namespace: string; role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/roles/:role_api_name/member/batch_remove_authorization`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 获取角色成员详情
                 *
                 * 获取角色成员详情
                 */
                get: async (
                    payload?: {
                        params?: {
                            need_display_name?: boolean;
                            use_api_id?: boolean;
                        };
                        path: { namespace: string; role_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    role_member?: {
                                        role_api_id?: string;
                                        role_api_name?: string;
                                        users?: Array<string>;
                                        departments?: Array<string>;
                                        user_filter?: {
                                            conditions?: Array<{
                                                index?: string;
                                                left?: {
                                                    type?: string;
                                                    settings?: string;
                                                    display_names?: Array<string>;
                                                };
                                                right?: {
                                                    type?: string;
                                                    settings?: string;
                                                    display_names?: Array<string>;
                                                };
                                                operator?: string;
                                            }>;
                                            logic_expression?: string;
                                        };
                                        user_display_infos?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                        department_display_infos?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                        type?: "all" | "custom";
                                        updated_by?: string;
                                        updated_at?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/roles/:role_api_name/member`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=batch_create_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create_authorization&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 批量创建角色成员授权
                 *
                 * 批量创建角色成员授权
                 */
                batchCreateAuthorization: async (
                    payload?: {
                        data?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                        };
                        path: { namespace: string; role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/roles/:role_api_name/member/batch_create_authorization`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 批量新增角色成员（支持企业级角色）
                 *
                 * 批量新增角色成员（支持企业级角色）
                 */
                batchCreate: async (
                    payload?: {
                        data?: {
                            namespace?: string;
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            is_sandbox?: boolean;
                        };
                        path: { role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/roles/:role_api_name/member/batch_create_authorization`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=get_role_member_from_ogw&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_role_member_from_ogw&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 查询角色成员（支持企业级角色）
                 *
                 * 查询角色成员（支持企业级角色）
                 */
                getRoleMemberFromOgw: async (
                    payload?: {
                        data?: {
                            namespace?: string;
                            need_display_name?: boolean;
                            use_api_id?: boolean;
                            is_sandbox?: boolean;
                        };
                        path: { role_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    role_member?: {
                                        role_api_id?: string;
                                        role_api_name?: string;
                                        users?: Array<string>;
                                        departments?: Array<string>;
                                        user_filter?: {
                                            conditions?: Array<{
                                                index?: string;
                                                left?: {
                                                    type?: string;
                                                    settings?: string;
                                                    display_names?: Array<string>;
                                                };
                                                right?: {
                                                    type?: string;
                                                    settings?: string;
                                                    display_names?: Array<string>;
                                                };
                                                operator?: string;
                                            }>;
                                            logic_expression?: string;
                                        };
                                        user_display_infos?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                        department_display_infos?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                        type?: "all" | "custom";
                                        updated_by?: string;
                                        updated_at?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/roles/:role_api_name/member`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=batch_remove&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 批量删除角色成员（支持企业级角色）
                 *
                 * 批量删除角色成员（支持企业级角色）
                 */
                batchRemove: async (
                    payload?: {
                        data?: {
                            namespace?: string;
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            is_sandbox?: boolean;
                        };
                        path: { role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/roles/:role_api_name/member/batch_remove_authorization`,
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
             * application.record_permission.member
             */
            applicationRecordPermissionMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.record_permission.member&apiName=batch_create_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create_authorization&project=apaas&resource=application.record_permission.member&version=v1 document }
                 *
                 * 批量创建记录权限授权
                 *
                 * 批量创建记录权限授权
                 */
                batchCreateAuthorization: async (
                    payload?: {
                        data?: { user_ids?: Array<string> };
                        path: {
                            namespace: string;
                            record_permission_api_name: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/record_permissions/:record_permission_api_name/member/batch_create_authorization`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.record_permission.member&apiName=batch_remove_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove_authorization&project=apaas&resource=application.record_permission.member&version=v1 document }
                 *
                 * 批量删除记录权限授权
                 *
                 * 批量删除记录权限授权
                 */
                batchRemoveAuthorization: async (
                    payload?: {
                        data?: { user_ids?: Array<string> };
                        path: {
                            namespace: string;
                            record_permission_api_name: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/record_permissions/:record_permission_api_name/member/batch_remove_authorization`,
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
             * attachment.file
             */
            attachmentFile: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=attachment.file&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=apaas&resource=attachment.file&version=v1 document }
                 *
                 * 删除文件
                 *
                 * 删除文件
                 */
                delete: async (
                    payload?: {
                        path: { file_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/attachment/files/:file_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=attachment.file&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=apaas&resource=attachment.file&version=v1 document }
                 *
                 * 上传文件
                 *
                 * 上传文件
                 */
                upload: async (
                    payload?: {
                        data?: { file?: Buffer | fs.ReadStream };
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
                                data?: {
                                    file_id?: string;
                                    type?: string;
                                    name?: string;
                                    size?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/attachment/files/upload`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=attachment.file&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=apaas&resource=attachment.file&version=v1 document }
                 *
                 * 下载文件
                 *
                 * 下载文件
                 */
                download: async (
                    payload?: {
                        path: { file_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/attachment/files/:file_id/download`,
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
            },
            /**
             * application.environment_variable
             */
            applicationEnvironmentVariable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.environment_variable&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.environment_variable&version=v1 document }
                 *
                 * 查询环境变量详情
                 *
                 * 查询基于飞书 aPaaS 开发的应用的环境变量详情，包括名称、描述、变量值等
                 */
                get: async (
                    payload?: {
                        path: {
                            namespace: string;
                            environment_variable_api_name: string;
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
                                    item?: {
                                        api_name: string;
                                        label: { zh_cn: string; en_us: string };
                                        description: string;
                                        value: string;
                                        is_encrypted?: boolean;
                                        object_api_name?: string;
                                        object_label?: {
                                            zh_cn: string;
                                            en_us: string;
                                        };
                                        created_at?: number;
                                        updated_at: number;
                                        type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/environment_variables/:environment_variable_api_name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.environment_variable&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.environment_variable&version=v1 document }
                 *
                 * 查询环境变量列表
                 *
                 * 查询基于飞书 aPaaS 开发的应用的环境变量列表
                 */
                query: async (
                    payload?: {
                        data?: {
                            filter?: { quick_query?: string };
                            limit?: number;
                            offset?: number;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        api_name: string;
                                        label: { zh_cn: string; en_us: string };
                                        description: string;
                                        value: string;
                                        is_encrypted?: boolean;
                                        object_api_name?: string;
                                        object_label?: {
                                            zh_cn: string;
                                            en_us: string;
                                        };
                                        created_at?: number;
                                        updated_at: number;
                                        type?: string;
                                    }>;
                                    total: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/environment_variables/query`,
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
             * application.global_option
             */
            applicationGlobalOption: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.global_option&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.global_option&version=v1 document }
                 *
                 * 查询全局选项列表
                 *
                 * 在应用内查询全局选项列表;
                 */
                query: async (
                    payload?: {
                        data?: {
                            filter?: { quick_query?: string };
                            limit?: number;
                            offset?: number;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        api_name?: string;
                                        label?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        options?: Array<{
                                            api_name?: string;
                                            label?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            active?: boolean;
                                        }>;
                                        created_at?: number;
                                        updated_at?: number;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/global_options/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.global_option&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.global_option&version=v1 document }
                 *
                 * 查询全局选项详情
                 *
                 * 在应用内查询某个全局选项的详情信息
                 */
                get: async (
                    payload?: {
                        path: {
                            namespace: string;
                            global_option_api_name: string;
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
                                    data?: {
                                        api_name?: string;
                                        label?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        options?: Array<{
                                            api_name?: string;
                                            label?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            active?: boolean;
                                        }>;
                                        created_at?: number;
                                        updated_at?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/global_options/:global_option_api_name`,
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
             * application.object.field
             */
            applicationObjectField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.field&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.object.field&version=v1 document }
                 *
                 * 获取对象字段信息
                 *
                 * 在应用内查询对象的某个字段的详情信息;
                 */
                get: async (
                    payload?: {
                        path: {
                            namespace: string;
                            object_api_name: string;
                            field_api_name: string;
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
                                    data?: {
                                        api_name?: string;
                                        label?: {
                                            zh_cn: string;
                                            en_us: string;
                                        };
                                        type?: {
                                            name?: string;
                                            settings?: string;
                                        };
                                        created_at?: number;
                                        updated_at?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/fields/:field_api_name`,
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
             * attachment.avatar
             */
            attachmentAvatar: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=attachment.avatar&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=apaas&resource=attachment.avatar&version=v1 document }
                 *
                 * 上传头像
                 *
                 * 上传头像
                 */
                upload: async (
                    payload?: {
                        data?: { image?: Buffer | fs.ReadStream };
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
                                data?: {
                                    image_id?: string;
                                    preview_image_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/attachment/avatars/upload`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=attachment.avatar&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=apaas&resource=attachment.avatar&version=v1 document }
                 *
                 * 下载头像
                 *
                 * 下载头像
                 */
                download: async (
                    payload?: {
                        path: { image_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/attachment/avatars/:image_id/download`,
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
            },
            /**
             * user.external_user
             */
            userExternalUser: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user.external_user&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=apaas&resource=user.external_user&version=v1 document }
                 *
                 * 删除外部用户
                 *
                 * 通过指定用户ID删除租户下的外部用户，请谨慎使用该接口。;仅支持删除租户内手动邀请类型的外部用户；;暂不支持跨地域（海外）调用 OpenAPI。
                 */
                delete: async (
                    payload?: {
                        path: { external_user_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/external_users/:external_user_id`,
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
             * user_task
             */
            userTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=expediting&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=expediting&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 人工任务 - 催办任务
                 *
                 * 对任务当前的处理人发起一次催办
                 */
                expediting: async (
                    payload?: {
                        data: {
                            operator_user_id: string;
                            expediting_user_ids: Array<string>;
                            opinion?: string;
                        };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/expediting`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=cc&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cc&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 人工任务 - 抄送任务
                 *
                 * 对当前的任务进行一次抄送
                 */
                cc: async (
                    payload?: {
                        data: {
                            cc_user_ids: Array<string>;
                            operator_user_id: string;
                        };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/cc`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=chat_group&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=chat_group&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 人工任务 - 发起群聊
                 *
                 * 基于任务，发起一个飞书群聊
                 */
                chatGroup: async (
                    payload?: {
                        data: {
                            operator_user_id: string;
                            invite_user_ids?: Array<string>;
                            chat_id?: string;
                            chat_name?: string;
                        };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { chat_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/chat_group`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=rollback&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rollback&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 人工任务 - 退回
                 *
                 * 对当前任务进行一次退回
                 */
                rollback: async (
                    payload?: {
                        data: {
                            operator_user_id: string;
                            to_task_id: string;
                            opinion: string;
                        };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/rollback`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=rollback_points&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rollback_points&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 人工任务 - 查询可退回的位置
                 *
                 * 查询当前任务可以退回的位置
                 */
                rollbackPoints: async (
                    payload?: {
                        data: { operator_user_id: string };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    tasks?: Array<{
                                        id?: string;
                                        activity_label?: Array<{
                                            language_code?: string;
                                            text?: string;
                                        }>;
                                        is_start?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/rollback_points`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 查询人工任务列表
                 *
                 * 查询人工任务列表
                 */
                query: async (
                    payload?: {
                        data: {
                            type?: string;
                            source?: string;
                            limit?: string;
                            offset?: string;
                            start_time?: string;
                            end_time?: string;
                            api_ids?: Array<string>;
                            kunlun_user_id: string;
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
                                    count?: string;
                                    tasks?: Array<{
                                        task_id?: string;
                                        task_start_time?: string;
                                        workflow_instance?: {
                                            id?: string;
                                            label?: Array<{
                                                language_code?: string;
                                                text?: string;
                                            }>;
                                            status?: string;
                                        };
                                        initiator?: {
                                            user_id?: string;
                                            name?: string;
                                        };
                                        summarys?: Array<{
                                            file_key?: {
                                                language_code?: string;
                                                text?: string;
                                            };
                                            file_value?: Array<{
                                                language_code?: string;
                                                text?: string;
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/user_task/query`,
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
             * application.flow
             */
            applicationFlow: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.flow&apiName=execute&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=execute&project=apaas&resource=application.flow&version=v1 document }
                 *
                 * 发起流程
                 *
                 * 执行相应流程
                 */
                execute: async (
                    payload?: {
                        data: {
                            is_async?: boolean;
                            idempotent_key?: string;
                            loop_masks?: Array<string>;
                            params?: string;
                            operator: string;
                        };
                        path: { namespace: string; flow_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    status?: string;
                                    out_params?: string;
                                    execution_id?: string;
                                    error_msg?: string;
                                    code?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/flows/:flow_id/execute`,
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
             * approval_instance
             */
            approvalInstance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_instance&apiName=cancel&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=apaas&resource=approval_instance&version=v1 document }
                 *
                 * 人工任务 - 撤销
                 *
                 * 撤销一个人工任务（包括审批任务，填写任务）
                 */
                cancel: async (
                    payload?: {
                        data: { user_id: string; opinion: string };
                        path: { approval_instance_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_instances/:approval_instance_id/cancel`,
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
             * user_task_opinion
             */
            userTaskOpinion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task_opinion&apiName=multiget&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=multiget&project=apaas&resource=user_task_opinion&version=v1 document }
                 *
                 * 返回用户配置的所有审批常用语（系统默认不大于200）
                 */
                multiget: async (
                    payload?: {
                        data: { kunlun_user_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    opinions?: Array<{ content: string }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/user_task_opinions/multiget`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task_opinion&apiName=overwrite&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=overwrite&project=apaas&resource=user_task_opinion&version=v1 document }
                 *
                 * 覆盖保存个人审批常用评语
                 */
                overwrite: async (
                    payload?: {
                        data: {
                            opinions?: Array<{ content: string }>;
                            kunlun_user_id: string;
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
                                `${this.domain}/open-apis/apaas/v1/user_task_opinions/overwrite`,
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
             * application.audit_log
             */
            applicationAuditLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=audit_log_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=audit_log_list&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 查询审计日志列表
                 *
                 * 根据搜索/筛选条件，查询审计日志列表
                 *
                 * 每次最多可查询 10,000 条数据
                 */
                auditLogList: async (
                    payload?: {
                        params: {
                            page_size: string;
                            offset: string;
                            quick_query?: string;
                            from: string;
                            to: string;
                            log_type: string;
                            filter?: string;
                            columns?: Array<string>;
                            sort_by?: string;
                            sort_order?: string;
                            app_type?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        log_id?: string;
                                        op_time?: string;
                                        log_type?: string;
                                        operator?: {
                                            id?: string;
                                            name?: string;
                                            tenant_id?: string;
                                            email?: string;
                                        };
                                        outsider?: boolean;
                                        login_type?: string;
                                        lark_tenant_id?: string;
                                        apaas_tenant_id?: string;
                                        user_geo?: string;
                                        client_ip?: string;
                                        ip_loc?: string;
                                        ip_provider?: string;
                                        referer?: string;
                                        origin?: string;
                                        api_path?: string;
                                        full_path?: string;
                                        user_agent?: string;
                                        device_id?: string;
                                        web_device_id?: string;
                                        terminal_type?: string;
                                        os_type?: string;
                                        os_version?: string;
                                        module?: string;
                                        data_object?: string;
                                        audit_scope?: string;
                                        tenant_id?: string;
                                        namespace?: string;
                                        env_type?: string;
                                        op_type?: string;
                                        op_detail?: Record<string, string>;
                                        op_source?: string;
                                        status?: string;
                                        failed_reason_i18n?: Record<
                                            string,
                                            string
                                        >;
                                        data_changes?: Array<string>;
                                        app_name?: Record<string, string>;
                                        keyword_field_app_version?: string;
                                        keyword_field_functional_sub_module?: string;
                                    }>;
                                    total?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log/audit_log_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 飞书低代码平台-查询审计日志详情
                 *
                 * 根据日志 ID 查询审计日志详情
                 */
                get: async (
                    payload?: {
                        params: { log_id: string };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    data?: {
                                        log_id?: string;
                                        basic_info?: {
                                            log_type?: string;
                                            audit_scope?: string;
                                            env_type?: string;
                                            app_id?: string;
                                            module?: string;
                                            op_type?: string;
                                            app_name?: Record<string, string>;
                                        };
                                        op_info?: {
                                            operator?: {
                                                id?: string;
                                                name?: string;
                                                tenant_id?: string;
                                                email?: string;
                                            };
                                            outsider?: boolean;
                                            op_detail?: Record<string, string>;
                                            status?: string;
                                            failed_reason?: string;
                                            failed_reason_i18n?: Record<
                                                string,
                                                string
                                            >;
                                            op_time?: string;
                                            data_object?: string;
                                            op_source?: string;
                                            data_changes?: Array<string>;
                                        };
                                        login_info?: { login_type?: string };
                                        device_info?: {
                                            device_id?: string;
                                            web_device_id?: string;
                                            terminal_type?: string;
                                            os_type?: string;
                                            os_version?: string;
                                        };
                                        net_info?: {
                                            client_ip?: string;
                                            ip_loc?: string;
                                            ip_provider?: string;
                                            referer?: string;
                                            origin?: string;
                                            user_agent?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=data_change_logs_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=data_change_logs_list&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 飞书低代码平台-查询数据变更日志列表
                 *
                 * 根据搜索/筛选条件，查询数据变更日志列表
                 *
                 * 每次最多可查询 10,000 条数据
                 */
                dataChangeLogsList: async (
                    payload?: {
                        params: {
                            quick_query?: string;
                            page_size: string;
                            offset: string;
                            from?: string;
                            to?: string;
                            log_type: string;
                            filter?: string;
                            columns?: Array<string>;
                            sort_by?: string;
                            sort_order?: string;
                            app_type?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        log_id?: string;
                                        op_time?: string;
                                        log_type?: string;
                                        operator?: {
                                            id?: string;
                                            name?: string;
                                            tenant_id?: string;
                                            email?: string;
                                        };
                                        outsider?: boolean;
                                        login_type?: string;
                                        lark_tenant_id?: string;
                                        apaas_tenant_id?: string;
                                        user_geo?: string;
                                        client_ip?: string;
                                        ip_loc?: string;
                                        ip_provider?: string;
                                        referer?: string;
                                        origin?: string;
                                        api_path?: string;
                                        full_path?: string;
                                        user_agent?: string;
                                        device_id?: string;
                                        web_device_id?: string;
                                        terminal_type?: string;
                                        os_type?: string;
                                        os_version?: string;
                                        module?: string;
                                        data_object?: string;
                                        audit_scope?: string;
                                        tenant_id?: string;
                                        namespace?: string;
                                        env_type?: string;
                                        op_type?: string;
                                        op_detail?: Record<string, string>;
                                        op_source?: string;
                                        status?: string;
                                        failed_reason_i18n?: Record<
                                            string,
                                            string
                                        >;
                                        data_changes?: Array<string>;
                                        app_name?: Record<string, string>;
                                        keyword_field_app_version?: string;
                                        keyword_field_functional_sub_module?: string;
                                    }>;
                                    total?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log/data_change_logs_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=data_change_log_detail&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=data_change_log_detail&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 飞书低代码平台-查询数据变更日志详情
                 *
                 * 根据日志 ID 查询数据变更日志详情
                 */
                dataChangeLogDetail: async (
                    payload?: {
                        params: { log_id: string };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    data?: {
                                        log_id?: string;
                                        basic_info?: {
                                            log_type?: string;
                                            audit_scope?: string;
                                            env_type?: string;
                                            app_id?: string;
                                            module?: string;
                                            op_type?: string;
                                            app_name?: Record<string, string>;
                                        };
                                        op_info?: {
                                            operator?: {
                                                id?: string;
                                                name?: string;
                                                tenant_id?: string;
                                                email?: string;
                                            };
                                            outsider?: boolean;
                                            op_detail?: Record<string, string>;
                                            status?: string;
                                            failed_reason?: string;
                                            failed_reason_i18n?: Record<
                                                string,
                                                string
                                            >;
                                            op_time?: string;
                                            data_object?: string;
                                            op_source?: string;
                                            data_changes?: Array<string>;
                                        };
                                        login_info?: { login_type?: string };
                                        device_info?: {
                                            device_id?: string;
                                            web_device_id?: string;
                                            terminal_type?: string;
                                            os_type?: string;
                                            os_version?: string;
                                        };
                                        net_info?: {
                                            client_ip?: string;
                                            ip_loc?: string;
                                            ip_provider?: string;
                                            referer?: string;
                                            origin?: string;
                                            user_agent?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log/data_change_log_detail`,
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
             * application.dataset.field
             */
            applicationDatasetField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.dataset.field&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.dataset.field&version=v1 document }
                 *
                 * 查询数据集字段详情
                 *
                 * 查询数据集的字段详情信息
                 */
                get: async (
                    payload?: {
                        params?: { use_api_id?: boolean };
                        path: {
                            namespace: string;
                            dataset_api_name: string;
                            field_api_name: string;
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
                                    field?: {
                                        api_id?: string;
                                        api_name?: string;
                                        label?: Record<string, string>;
                                        dataset_api_id?: string;
                                        dataset_api_name?: string;
                                        type?: {
                                            name?: string;
                                            settings?: string;
                                        };
                                        encrypt_type?: string;
                                        create_time?: number;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            is_deleted?: boolean;
                                        };
                                        update_time?: number;
                                        updated_by?: {
                                            id?: string;
                                            name?: string;
                                            is_deleted?: boolean;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/datasets/:dataset_api_name/fields/:field_api_name`,
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
             * application.dataset
             */
            applicationDataset: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.dataset&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.dataset&version=v1 document }
                 *
                 * 查询数据集元数据
                 *
                 * 查询某个数据集的详情信息;
                 */
                get: async (
                    payload?: {
                        params?: {
                            use_api_id?: boolean;
                            ignore_settings?: boolean;
                            fill_fields?: boolean;
                        };
                        path: { namespace: string; dataset_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    dataset?: {
                                        namespace?: string;
                                        api_id?: string;
                                        api_name?: string;
                                        label?: Record<string, string>;
                                        source?: {
                                            type?: string;
                                            settings?: {
                                                api_id?: string;
                                                api_name?: string;
                                                label?: Record<string, string>;
                                            };
                                        };
                                        fields?: Array<{
                                            api_id?: string;
                                            api_name?: string;
                                            label?: Record<string, string>;
                                            dataset_api_id?: string;
                                            dataset_api_name?: string;
                                            type?: {
                                                name?: string;
                                                settings?: string;
                                            };
                                            encrypt_type?: string;
                                            create_time?: number;
                                            created_by?: {
                                                id?: string;
                                                name?: string;
                                                is_deleted?: boolean;
                                            };
                                            update_time?: number;
                                            updated_by?: {
                                                id?: string;
                                                name?: string;
                                                is_deleted?: boolean;
                                            };
                                        }>;
                                        data_refresh_time?: number;
                                        create_time?: number;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            is_deleted?: boolean;
                                        };
                                        update_time?: number;
                                        updated_by?: {
                                            id?: string;
                                            name?: string;
                                            is_deleted?: boolean;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/datasets/:dataset_api_name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.dataset&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.dataset&version=v1 document }
                 *
                 * 查询数据集列表
                 *
                 * 查询应用内的数据集列表;
                 */
                query: async (
                    payload?: {
                        data?: {
                            keyword?: string;
                            order_by?: {
                                field?: string;
                                order_type?: "asc" | "desc";
                            };
                            page_type?: string;
                            page_size?: number;
                            page_token?: string;
                            offset?: number;
                            created_bys?: Array<string>;
                            updated_bys?: Array<string>;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    datasets?: Array<{
                                        namespace?: string;
                                        api_id?: string;
                                        api_name?: string;
                                        label?: Record<string, string>;
                                        source?: {
                                            type?: string;
                                            settings?: {
                                                api_id?: string;
                                                api_name?: string;
                                                label?: Record<string, string>;
                                            };
                                        };
                                        fields?: Array<{
                                            api_id?: string;
                                            api_name?: string;
                                            label?: Record<string, string>;
                                            dataset_api_id?: string;
                                            dataset_api_name?: string;
                                            type?: {
                                                name?: string;
                                                settings?: string;
                                            };
                                            encrypt_type?: string;
                                            create_time?: number;
                                            created_by?: {
                                                id?: string;
                                                name?: string;
                                                is_deleted?: boolean;
                                            };
                                            update_time?: number;
                                            updated_by?: {
                                                id?: string;
                                                name?: string;
                                                is_deleted?: boolean;
                                            };
                                        }>;
                                        data_refresh_time?: number;
                                        create_time?: number;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            is_deleted?: boolean;
                                        };
                                        update_time?: number;
                                        updated_by?: {
                                            id?: string;
                                            name?: string;
                                            is_deleted?: boolean;
                                        };
                                    }>;
                                    total?: number;
                                    has_more?: boolean;
                                    next_page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/datasets/query`,
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
             * application.dataset.record
             */
            applicationDatasetRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.dataset.record&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.dataset.record&version=v1 document }
                 *
                 * 查询用户数据集记录列表
                 *
                 * 查询符合条件的数据集的记录列表;
                 */
                query: async (
                    payload?: {
                        data?: {
                            field_api_names?: Array<string>;
                            filter?: {
                                conditions?: Array<{
                                    index?: string;
                                    left?: {
                                        type?: string;
                                        settings?: string;
                                        display_names?: Array<string>;
                                    };
                                    right?: {
                                        type?: string;
                                        settings?: string;
                                        display_names?: Array<string>;
                                    };
                                    operator?: string;
                                }>;
                                logic_expression?: string;
                            };
                            order_by?: Array<{
                                field?: string;
                                order_type?: "asc" | "desc";
                            }>;
                            page_type?: string;
                            page_size?: number;
                            page_token?: string;
                            offset?: number;
                            need_total_count?: boolean;
                        };
                        params?: { use_api_id?: boolean };
                        path: { namespace: string; dataset_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    items?: string;
                                    total?: number;
                                    has_more?: boolean;
                                    next_page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/datasets/:dataset_api_name/records/query`,
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
             * workflow_instance_log
             */
            workflowInstanceLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workflow_instance_log&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=apaas&resource=workflow_instance_log&version=v1 document }
                 *
                 * 搜索流程实例日志
                 *
                 * 给定流程实例ID，返回其详细日志
                 */
                search: async (
                    payload?: {
                        data: {
                            flow_instance_id: string;
                            search?: string;
                            offset?: string;
                            limit?: string;
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
                                    data?: {
                                        total?: string;
                                        logs?: Array<{
                                            title?: string;
                                            level?: string;
                                            tags?: Array<{
                                                key?: string;
                                                value?: string;
                                                value_type?: string;
                                                uri?: string;
                                            }>;
                                            timestamp?: string;
                                            node_api_name?: string;
                                            basic_log?: string;
                                            basic_log_to_show?: string;
                                            json_log?: string;
                                            json_log_to_show?: string;
                                            uri?: string;
                                            uri_labels?: Array<{
                                                language_code?: string;
                                                text?: string;
                                            }>;
                                        }>;
                                        next_keyword_offset?: string;
                                        total_keyword?: string;
                                        has_read_auth?: boolean;
                                    };
                                    status_code?: string;
                                    msg?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workflow_instance_log/search`,
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
             * seat_assignment
             */
            seatAssignment: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
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
                                    `${this.domain}/open-apis/apaas/v1/seat_assignments`,
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
                                                        user_id?: number;
                                                        namespace?: string;
                                                        status?:
                                                            | "in_use"
                                                            | "released";
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=seat_assignment&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=seat_assignment&version=v1 document }
                 *
                 * 查询席位分配详情
                 *
                 * 获取租户下平台席位和应用访问席位分配详情，如用户 ID 、应用命名空间等，需要飞书 aPaaS 系统管理员作为授权人调用当前 API 。
                 */
                list: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
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
                                        user_id?: number;
                                        namespace?: string;
                                        status?: "in_use" | "released";
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/seat_assignments`,
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
             * seat_activity
             */
            seatActivity: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
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
                                    `${this.domain}/open-apis/apaas/v1/seat_activities`,
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
                                                        user_id?: number;
                                                        namespace?: string;
                                                        status?:
                                                            | "in_use"
                                                            | "released";
                                                        active_time?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=seat_activity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=seat_activity&version=v1 document }
                 *
                 * 查询席位活跃详情
                 *
                 * 获取租户下用户使用飞书 aPaaS 席位最近访问应用时间。需要飞书 aPaaS 系统管理员作为授权人调用当前API。
                 */
                list: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
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
                                        user_id?: number;
                                        namespace?: string;
                                        status?: "in_use" | "released";
                                        active_time?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/seat_activities`,
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
             * app
             */
            app: {
                listWithIterator: async (
                    payload?: {
                        params?: { page_size?: string; page_token?: string };
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
                                    `${this.domain}/open-apis/apaas/v1/apps`,
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
                                                        name?: Array<{
                                                            language_code?: string;
                                                            text?: string;
                                                        }>;
                                                        namespace?: string;
                                                        created_at?: number;
                                                        creator?: number;
                                                        owner?: number;
                                                        status?:
                                                            | "pending_launch"
                                                            | "enabled"
                                                            | "disabled"
                                                            | "stopped"
                                                            | "unspecified";
                                                        app_roles_info?: {
                                                            admins?: Array<number>;
                                                            developers?: Array<number>;
                                                            test_users?: Array<number>;
                                                            data_admins?: Array<number>;
                                                        };
                                                        icon?: string;
                                                        description?: Array<{
                                                            language_code?: string;
                                                            text?: string;
                                                        }>;
                                                        type?:
                                                            | "custom"
                                                            | "client_isv_saas"
                                                            | "client_isv_project";
                                                        enable_status?:
                                                            | "enabled"
                                                            | "disabled";
                                                        release_status?:
                                                            | "released"
                                                            | "unreleased";
                                                        service_status?:
                                                            | "available"
                                                            | "unavailable";
                                                        service_unavailable_reason?:
                                                            | "from_isv"
                                                            | "entitlement_expire";
                                                        feature_set?:
                                                            | "paid"
                                                            | "free";
                                                        charge_mode?:
                                                            | "per_user_per_app"
                                                            | "per_user"
                                                            | "independent"
                                                            | "free";
                                                        isv_tenant?: {
                                                            id?: string;
                                                            name?: string;
                                                        };
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=app&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=app&version=v1 document }
                 *
                 * 查看应用基本信息
                 *
                 * 获取企业下应用基本信息，如应用名称 、应用命名空间等。;
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: string; page_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        name?: Array<{
                                            language_code?: string;
                                            text?: string;
                                        }>;
                                        namespace?: string;
                                        created_at?: number;
                                        creator?: number;
                                        owner?: number;
                                        status?:
                                            | "pending_launch"
                                            | "enabled"
                                            | "disabled"
                                            | "stopped"
                                            | "unspecified";
                                        app_roles_info?: {
                                            admins?: Array<number>;
                                            developers?: Array<number>;
                                            test_users?: Array<number>;
                                            data_admins?: Array<number>;
                                        };
                                        icon?: string;
                                        description?: Array<{
                                            language_code?: string;
                                            text?: string;
                                        }>;
                                        type?:
                                            | "custom"
                                            | "client_isv_saas"
                                            | "client_isv_project";
                                        enable_status?: "enabled" | "disabled";
                                        release_status?:
                                            | "released"
                                            | "unreleased";
                                        service_status?:
                                            | "available"
                                            | "unavailable";
                                        service_unavailable_reason?:
                                            | "from_isv"
                                            | "entitlement_expire";
                                        feature_set?: "paid" | "free";
                                        charge_mode?:
                                            | "per_user_per_app"
                                            | "per_user"
                                            | "independent"
                                            | "free";
                                        isv_tenant?: {
                                            id?: string;
                                            name?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/apps`,
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
             * application.role
             */
            applicationRole: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role&apiName=create_role&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_role&project=apaas&resource=application.role&version=v1 document }
                 *
                 * 创建角色（支持企业级角色）
                 *
                 * 创建角色（支持企业级角色）
                 */
                createRole: async (
                    payload?: {
                        data: {
                            namespace?: string;
                            role: {
                                api_name: string;
                                name: Record<string, string>;
                                description?: Record<string, string>;
                            };
                            is_tenant?: boolean;
                            is_sandbox?: boolean;
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
                                data?: { api_name?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/role/create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.role&version=v1 document }
                 *
                 * 查询角色基本信息
                 *
                 * 查询角色基本信息
                 */
                query: async (
                    payload?: {
                        data?: {
                            role_api_names?: Array<string>;
                            query?: string;
                            enabled?: boolean;
                            need_total_count?: boolean;
                            order_by?: {
                                field?: string;
                                order_type?: "asc" | "desc";
                            };
                            page_type?: string;
                            offset?: number;
                            page_size?: number;
                            page_token?: string;
                            is_sandbox?: boolean;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                    next_page_token?: string;
                                    has_more?: boolean;
                                    items?: Array<{
                                        api_id?: string;
                                        api_name?: string;
                                        name?: Record<string, string>;
                                        description?: Record<string, string>;
                                        enabled?: boolean;
                                        created_by?: string;
                                        created_at?: number;
                                        updated_by?: string;
                                        updated_at?: number;
                                        created_env?: string;
                                        created_way?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/role/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role&apiName=bind_tenant_role_application&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=bind_tenant_role_application&project=apaas&resource=application.role&version=v1 document }
                 *
                 * 企业级角色增加应用
                 *
                 * 企业级角色增加应用
                 */
                bindTenantRoleApplication: async (
                    payload?: {
                        data: {
                            namespace_list: Array<string>;
                            is_sandbox?: boolean;
                            delete_namespace_list?: Array<string>;
                        };
                        path: { role_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { api_name: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/role/:role_api_name/bind_app`,
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
             * application.role.permission
             */
            applicationRolePermission: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.permission&apiName=batch_process_page_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_process_page_permission&project=apaas&resource=application.role.permission&version=v1 document }
                 *
                 * 批量修改角色的页面权限
                 *
                 * 批量修改角色的页面权限
                 */
                batchProcessPagePermission: async (
                    payload?: {
                        data?: {
                            upsert_permissions?: Array<{
                                role_api_name?: string;
                                page_api_name?: string;
                                sub_tab_pages?: Array<string>;
                                page_name?: Record<string, string>;
                                sub_tab_page_display_infos?: Array<{
                                    sub_page_key: string;
                                    name?: Record<string, string>;
                                }>;
                            }>;
                            delete_permissions?: Array<{
                                role_api_name?: string;
                                page_api_name?: string;
                                sub_tab_pages?: Array<string>;
                                page_name?: Record<string, string>;
                                sub_tab_page_display_infos?: Array<{
                                    sub_page_key: string;
                                    name?: Record<string, string>;
                                }>;
                            }>;
                            is_sandbox?: boolean;
                        };
                        path: { namespace: string; role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/role/:role_api_name/page_permissions/batch_mix`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.permission&apiName=batch_get_page_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get_page_permission&project=apaas&resource=application.role.permission&version=v1 document }
                 *
                 * 批量获取角色的页面权限
                 *
                 * 批量获取角色的页面权限
                 */
                batchGetPagePermission: async (
                    payload?: {
                        data?: {
                            role_api_names?: Array<string>;
                            page_api_name?: string;
                            need_display_name?: boolean;
                            need_total_count?: boolean;
                            page_type?: string;
                            page_size?: number;
                            offset?: number;
                            page_token?: string;
                            is_sandbox?: boolean;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        role_api_name?: string;
                                        page_api_name?: string;
                                        sub_tab_pages?: Array<string>;
                                        page_name?: Record<string, string>;
                                        sub_tab_page_display_infos?: Array<{
                                            sub_page_key: string;
                                            name?: Record<string, string>;
                                        }>;
                                    }>;
                                    total?: number;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/role/page_permissions/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.permission&apiName=batch_process_data_model_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_process_data_model_permission&project=apaas&resource=application.role.permission&version=v1 document }
                 *
                 * 批量修改对象/数据集权限
                 *
                 * 批量修改对象/数据集权限
                 */
                batchProcessDataModelPermission: async (
                    payload?: {
                        data?: {
                            upsert_permissions?: Array<{
                                role_api_name?: string;
                                data_model_api_name?: string;
                                data_model_type?: string;
                                access_permissions?: Array<number>;
                                field_permission_config?: {
                                    field_config_mode?:
                                        | "all"
                                        | "custom"
                                        | "none";
                                    custom_field_permissions?: Array<{
                                        field_api_name?: string;
                                        field_permissions?: Array<number>;
                                        is_sub_object_field?: boolean;
                                        sub_object_api_name?: string;
                                        sub_object_name?: Record<
                                            string,
                                            string
                                        >;
                                        field_name?: Record<string, string>;
                                    }>;
                                };
                                data_model_name?: Record<string, string>;
                            }>;
                            delete_permissions?: Array<{
                                role_api_name?: string;
                                data_model_api_name?: string;
                                data_model_type?: string;
                                access_permissions?: Array<number>;
                                field_permission_config?: {
                                    field_config_mode?:
                                        | "all"
                                        | "custom"
                                        | "none";
                                    custom_field_permissions?: Array<{
                                        field_api_name?: string;
                                        field_permissions?: Array<number>;
                                        is_sub_object_field?: boolean;
                                        sub_object_api_name?: string;
                                        sub_object_name?: Record<
                                            string,
                                            string
                                        >;
                                        field_name?: Record<string, string>;
                                    }>;
                                };
                                data_model_name?: Record<string, string>;
                            }>;
                            is_sandbox?: boolean;
                        };
                        path: { namespace: string; role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/role/:role_api_name/data_model_permissions/batch_mix`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.permission&apiName=get_allowed_permissions&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_allowed_permissions&project=apaas&resource=application.role.permission&version=v1 document }
                 *
                 * 获取所有可配置的权限元数据
                 *
                 * 获取所有可配置的权限元数据
                 */
                getAllowedPermissions: async (
                    payload?: {
                        params: {
                            type: string;
                            api_name?: string;
                            is_sandbox?: boolean;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    data_model_permissions?: Array<{
                                        api_id?: string;
                                        api_name?: string;
                                        allowed_access?: Array<number>;
                                        fields?: Array<{
                                            api_id?: string;
                                            api_name?: string;
                                            allowed_access?: Array<number>;
                                            display_name?: Record<
                                                string,
                                                string
                                            >;
                                        }>;
                                        data_model_type?: string;
                                        display_name?: Record<string, string>;
                                    }>;
                                    page_permissions?: Array<{
                                        api_id?: string;
                                        api_name?: string;
                                        sub_pages?: Array<{
                                            sub_page_key: string;
                                            display_name?: Record<
                                                string,
                                                string
                                            >;
                                            sub_page_api_name?: string;
                                        }>;
                                        display_name?: Record<string, string>;
                                    }>;
                                    operation_permissions?: Array<{
                                        api_id?: string;
                                        api_name?: string;
                                        operation_type?: string;
                                        display_name?: Record<string, string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/allowed_permissions/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.permission&apiName=batch_get_data_model_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get_data_model_permission&project=apaas&resource=application.role.permission&version=v1 document }
                 *
                 * 批量获取对象/数据集权限
                 *
                 * 批量获取对象/数据集权限
                 */
                batchGetDataModelPermission: async (
                    payload?: {
                        data?: {
                            role_api_names?: Array<string>;
                            data_model_api_name?: string;
                            data_model_type?: string;
                            need_display_name?: boolean;
                            need_total_count?: boolean;
                            page_type?: string;
                            offset?: number;
                            page_size?: number;
                            is_sandbox?: boolean;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        role_api_name?: string;
                                        data_model_api_name?: string;
                                        data_model_type?: string;
                                        access_permissions?: Array<number>;
                                        field_permission_config?: {
                                            field_config_mode?:
                                                | "all"
                                                | "custom"
                                                | "none";
                                            custom_field_permissions?: Array<{
                                                field_api_name?: string;
                                                field_permissions?: Array<number>;
                                                is_sub_object_field?: boolean;
                                                sub_object_api_name?: string;
                                                sub_object_name?: Record<
                                                    string,
                                                    string
                                                >;
                                                field_name?: Record<
                                                    string,
                                                    string
                                                >;
                                            }>;
                                        };
                                        data_model_name?: Record<
                                            string,
                                            string
                                        >;
                                    }>;
                                    total?: number;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/role/data_model_permissions/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.permission&apiName=batch_process_operation_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_process_operation_permission&project=apaas&resource=application.role.permission&version=v1 document }
                 *
                 * 批量修改流程/云函数的权限
                 *
                 * 批量修改流程/云函数的权限
                 */
                batchProcessOperationPermission: async (
                    payload?: {
                        data?: {
                            upsert_permissions?: Array<{
                                role_api_name?: string;
                                operation_api_name?: string;
                                operation_type?: string;
                                operation_name?: Record<string, string>;
                            }>;
                            delete_permissions?: Array<{
                                role_api_name?: string;
                                operation_api_name?: string;
                                operation_type?: string;
                                operation_name?: Record<string, string>;
                            }>;
                            is_sandbox?: boolean;
                        };
                        path: { namespace: string; role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/role/:role_api_name/operation_permissions/batch_mix`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.permission&apiName=batch_get_operation_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get_operation_permission&project=apaas&resource=application.role.permission&version=v1 document }
                 *
                 * 批量获取流程/云函数权限
                 *
                 * 批量获取流程/云函数权限
                 */
                batchGetOperationPermission: async (
                    payload?: {
                        data?: {
                            role_api_names?: Array<string>;
                            operation_api_name?: string;
                            operation_type?: string;
                            need_display_name?: boolean;
                            need_total_count?: boolean;
                            page_type?: string;
                            offset?: number;
                            page_size?: number;
                            is_sandbox?: boolean;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        role_api_name?: string;
                                        operation_api_name?: string;
                                        operation_type?: string;
                                        operation_name?: Record<string, string>;
                                    }>;
                                    total?: number;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/role/operation_permissions/query`,
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
             * application.record_permission
             */
            applicationRecordPermission: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.record_permission&apiName=update_record_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_record_permission&project=apaas&resource=application.record_permission&version=v1 document }
                 *
                 * 更新记录权限
                 *
                 * 更新记录权限
                 */
                updateRecordPermission: async (
                    payload?: {
                        data: {
                            record_permission_rule: {
                                api_name?: string;
                                name?: Record<string, string>;
                                access_permissions?: Array<number>;
                                record_scope?: {
                                    record_scope_mode:
                                        | "all"
                                        | "currentAndSubordinates"
                                        | "currentUser";
                                    fields?: Array<{
                                        api_name: string;
                                        name?: Record<string, string>;
                                    }>;
                                };
                                user_scope?: {
                                    user_scope_mode?: "all" | "role" | "user";
                                    user_list?: Array<{
                                        id: number;
                                        name?: string;
                                    }>;
                                    role_list?: Array<{
                                        api_name: string;
                                        name?: Record<string, string>;
                                    }>;
                                };
                                data_model_api_name?: string;
                                data_model_type?: string;
                                created_by?: string;
                                created_at?: number;
                                updated_by?: string;
                                updated_at?: number;
                                disabled?: boolean;
                            };
                            is_sandbox?: boolean;
                        };
                        path: {
                            namespace: string;
                            record_permission_api_name: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/record_permissions/:record_permission_api_name/update`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.record_permission&apiName=query_record_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_record_permission&project=apaas&resource=application.record_permission&version=v1 document }
                 *
                 * 查询记录权限
                 *
                 * 查询记录权限
                 */
                queryRecordPermission: async (
                    payload?: {
                        data?: {
                            need_total_count?: boolean;
                            page_type?: string;
                            offset?: number;
                            page_size?: number;
                            page_token?: string;
                            data_model_api_name?: string;
                            data_model_type?: string;
                            role_api_name?: string;
                            need_display_name?: boolean;
                            is_sandbox?: boolean;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                    next_page_token?: string;
                                    has_more?: boolean;
                                    items?: Array<{
                                        api_name?: string;
                                        name?: Record<string, string>;
                                        access_permissions?: Array<number>;
                                        record_scope?: {
                                            record_scope_mode:
                                                | "all"
                                                | "currentAndSubordinates"
                                                | "currentUser";
                                            fields?: Array<{
                                                api_name: string;
                                                name?: Record<string, string>;
                                            }>;
                                        };
                                        user_scope?: {
                                            user_scope_mode?:
                                                | "all"
                                                | "role"
                                                | "user";
                                            user_list?: Array<{
                                                id: number;
                                                name?: string;
                                            }>;
                                            role_list?: Array<{
                                                api_name: string;
                                                name?: Record<string, string>;
                                            }>;
                                        };
                                        data_model_api_name?: string;
                                        data_model_type?: string;
                                        created_by?: string;
                                        created_at?: number;
                                        updated_by?: string;
                                        updated_at?: number;
                                        disabled?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/record_permissions/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.record_permission&apiName=delete_record_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_record_permission&project=apaas&resource=application.record_permission&version=v1 document }
                 *
                 * 删除记录权限
                 *
                 * 删除记录权限
                 */
                deleteRecordPermission: async (
                    payload?: {
                        data?: { is_sandbox?: boolean };
                        path: {
                            namespace: string;
                            record_permission_api_name: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/record_permissions/:record_permission_api_name/delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.record_permission&apiName=create_record_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_record_permission&project=apaas&resource=application.record_permission&version=v1 document }
                 *
                 * 创建记录权限
                 *
                 * 创建记录权限
                 */
                createRecordPermission: async (
                    payload?: {
                        data: {
                            record_permission_rule: {
                                api_name?: string;
                                name?: Record<string, string>;
                                access_permissions?: Array<number>;
                                record_scope?: {
                                    record_scope_mode:
                                        | "all"
                                        | "currentAndSubordinates"
                                        | "currentUser";
                                    fields?: Array<{
                                        api_name: string;
                                        name?: Record<string, string>;
                                    }>;
                                };
                                user_scope?: {
                                    user_scope_mode?: "all" | "role" | "user";
                                    user_list?: Array<{
                                        id: number;
                                        name?: string;
                                    }>;
                                    role_list?: Array<{
                                        api_name: string;
                                        name?: Record<string, string>;
                                    }>;
                                };
                                data_model_api_name?: string;
                                data_model_type?: string;
                                created_by?: string;
                                created_at?: number;
                                updated_by?: string;
                                updated_at?: number;
                                disabled?: boolean;
                            };
                            is_sandbox?: boolean;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { api_name?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/record_permissions/create`,
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
             * workspace.table
             */
            workspaceTable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=records_batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=records_batch_update&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 批量更新数据表中的记录
                 *
                 * 批量更新数据表中的记录
                 */
                recordsBatchUpdate: async (
                    payload?: {
                        data: { records: string };
                        path: { workspace_id: string; table_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { record_ids: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name/records_batch_update`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=records_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=records_delete&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 删除数据表中的记录
                 *
                 * 删除数据表中的记录
                 */
                recordsDelete: async (
                    payload?: {
                        params: { filter: string };
                        path: { workspace_id: string; table_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=records_patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=records_patch&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 按条件更新数据表中的记录
                 *
                 * 按条件更新数据表中的记录
                 */
                recordsPatch: async (
                    payload?: {
                        data: { record: string };
                        params: { filter: string };
                        path: { workspace_id: string; table_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { record_ids: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=records_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=records_get&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 查询数据表数据记录
                 *
                 * 查询数据表数据记录
                 */
                recordsGet: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            select?: string;
                            filter?: string;
                            order?: string;
                        };
                        path: { workspace_id: string; table_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    has_more: boolean;
                                    page_token: string;
                                    total: number;
                                    items: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=records_post&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=records_post&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 向数据表中添加或更新记录
                 *
                 * 向数据表中添加或更新记录
                 */
                recordsPost: async (
                    payload?: {
                        data: { records: string };
                        params?: { columns?: string; on_conflict?: string };
                        path: { workspace_id: string; table_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { record_ids: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 获取工作空间下的数据表列表
                 *
                 * 获取工作空间下的数据表列表
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { workspace_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    has_more: boolean;
                                    page_token: string;
                                    items: Array<{
                                        name: string;
                                        description: string;
                                        columns: Array<{
                                            name: string;
                                            description: string;
                                            data_type: string;
                                            is_primary_key: boolean;
                                            is_unique: boolean;
                                            is_auto_increment: boolean;
                                            is_array: boolean;
                                            is_allow_null: boolean;
                                            default_value: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=table_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=table_get&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 获取数据表详细信息
                 *
                 * 获取数据表详细信息
                 */
                tableGet: async (
                    payload?: {
                        path: { workspace_id: string; table_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    name: string;
                                    description: string;
                                    columns: Array<{
                                        name: string;
                                        description: string;
                                        data_type: string;
                                        is_primary_key: boolean;
                                        is_unique: boolean;
                                        is_auto_increment: boolean;
                                        is_array: boolean;
                                        is_allow_null: boolean;
                                        default_value: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name`,
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
             * workspace
             */
            workspace: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace&apiName=sql_commands&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sql_commands&project=apaas&resource=workspace&version=v1 document }
                 *
                 * 执行 SQL
                 *
                 * 在工作空间下执行 SQL 语句
                 */
                sqlCommands: async (
                    payload?: {
                        data: { sql: string };
                        path: { workspace_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { result: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/sql_commands`,
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
             * workspace.view
             */
            workspaceView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.view&apiName=views_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=views_get&project=apaas&resource=workspace.view&version=v1 document }
                 *
                 * 查询视图数据记录
                 *
                 * 查询视图数据记录
                 */
                viewsGet: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            select?: string;
                            filter?: string;
                            order?: string;
                        };
                        path: { workspace_id: string; view_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    has_more: boolean;
                                    page_token: string;
                                    total: number;
                                    items: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/views/:view_name/records`,
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
             * builtin_role
             */
            builtinRole: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=builtin_role&apiName=aily_auth_sys_role&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=aily_auth_sys_role&project=apaas&resource=builtin_role&version=v1 document }
                 *
                 * 飞书aily增加租户管理员
                 *
                 * 飞书aily增加租户管理员
                 */
                ailyAuthSysRole: async (
                    payload?: {
                        data: { user_ids: Array<number> };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/cui/permission/namespace/:namespace/add_admin_user`,
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
             * workspace.enum
             */
            workspaceEnum: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.enum&apiName=enum_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=enum_get&project=apaas&resource=workspace.enum&version=v1 document }
                 *
                 * 获取自定义枚举详细信息
                 *
                 * 获取自定义枚举详细信息
                 */
                enumGet: async (
                    payload?: {
                        path: { workspace_id: string; enum_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    name: string;
                                    description: string;
                                    options: Array<string>;
                                    created_at: string;
                                    created_by: {
                                        id?: string;
                                        name?: string;
                                        avatar?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/enums/:enum_name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.enum&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=workspace.enum&version=v1 document }
                 *
                 * 获取工作空间下的自定义枚举列表
                 *
                 * 获取工作空间下的自定义枚举列表
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { workspace_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    has_more: boolean;
                                    page_token: string;
                                    items: Array<{
                                        name: string;
                                        description: string;
                                        options: Array<string>;
                                        created_at: number;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            avatar?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/enums`,
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
             * tenant_app_metrics
             */
            tenantAppMetrics: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=tenant_app_metrics&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=tenant_app_metrics&version=v1 document }
                 *
                 * 获取应用运营数据
                 *
                 * 获取 aPaaS 应用活跃数据、存储或运行资源用量数据。
                 */
                query: async (
                    payload?: {
                        data: { namespaces: Array<string>; date: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    metrics?: Array<{
                                        namespace?: string;
                                        data?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/tenant_app_metrics/query`,
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
             * application.page
             */
            applicationPage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.page&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.page&version=v2 document }
                 */
                get: async (
                    payload?: {
                        path: { namespace: string; id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                    api_id?: string;
                                    label?: { zh_cn?: string; en_us?: string };
                                    api_name?: string;
                                    description?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    created_by?: string;
                                    created_at?: string;
                                    updated_by?: string;
                                    updated_at?: string;
                                    published_by?: string;
                                    published_at?: string;
                                    page_structures?: Array<{
                                        key?: string;
                                        label?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        sys_page_path?: string;
                                        custom_page_path?: string;
                                        children_keys?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/pages/:id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.page&apiName=search&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=apaas&resource=application.page&version=v2 document }
                 *
                 * 获取页面列表
                 */
                search: async (
                    payload?: {
                        data?: {
                            page_size?: string;
                            page_token?: string;
                            order_bys?: Array<{
                                field?: string;
                                order_type?: "asc" | "desc";
                            }>;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    has_more: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        id?: string;
                                        api_id?: string;
                                        label?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        api_name?: string;
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        created_by?: string;
                                        created_at?: string;
                                        updated_by?: string;
                                        updated_at?: string;
                                        published_by?: string;
                                        published_at?: string;
                                        page_structures?: Array<{
                                            key?: string;
                                            label?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            sys_page_path?: string;
                                            custom_page_path?: string;
                                            children_keys?: Array<string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/applications/:namespace/pages/search`,
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
             * application.release_task
             */
            applicationReleaseTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.release_task&apiName=cancel&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=apaas&resource=application.release_task&version=v2 document }
                 *
                 * 撤回发布申请
                 */
                cancel: async (
                    payload?: {
                        data: { reason: string };
                        path: { namespace: string; task_id: string };
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
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/release_tasks/:task_id/cancel`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.release_task&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.release_task&version=v2 document }
                 *
                 * 获取发布任务详情
                 */
                get: async (
                    payload?: {
                        params?: { query_type?: string };
                        path: { namespace: string; task_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    task_id: number;
                                    version?: string;
                                    version_id?: number;
                                    status?: number;
                                    reason?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/release_tasks/:task_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.release_task&apiName=rollback&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rollback&project=apaas&resource=application.release_task&version=v2 document }
                 *
                 * 回滚线上版本
                 */
                rollback: async (
                    payload?: {
                        data: { reason: string };
                        path: { namespace: string; task_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { task_id: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/release_tasks/:task_id/rollback`,
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
             * application.members
             */
            applicationMembers: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.members&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.members&version=v2 document }
                 *
                 * 查询应用的角色与成员列表
                 */
                get: async (
                    payload?: {
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    admins?: Array<{
                                        user_id?: number;
                                        name?: string;
                                        email?: string;
                                    }>;
                                    developers?: Array<{
                                        user_id?: number;
                                        name?: string;
                                        email?: string;
                                    }>;
                                    testers?: Array<{
                                        user_id?: number;
                                        name?: string;
                                        email?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.members&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=apaas&resource=application.members&version=v2 document }
                 *
                 * 删除应用成员
                 */
                delete: async (
                    payload?: {
                        data?: {
                            admins?: Array<number>;
                            developers?: Array<number>;
                            testers?: Array<number>;
                        };
                        path: { namespace: string };
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
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.members&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=application.members&version=v2 document }
                 *
                 * 添加应用成员
                 */
                create: async (
                    payload?: {
                        data?: {
                            admins?: Array<number>;
                            developers?: Array<number>;
                            testers?: Array<number>;
                        };
                        path: { namespace: string };
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
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/members`,
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
             * application
             */
            application: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=apaas&resource=application&version=v2 document }
                 *
                 * 更新应用基础信息
                 */
                patch: async (
                    payload?: {
                        data: {
                            name: { en_us?: string; zh_cn?: string };
                            description?: { en_us?: string; zh_cn?: string };
                        };
                        path: { namespace: string };
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
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application&apiName=task_check&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=task_check&project=apaas&resource=application&version=v2 document }
                 *
                 * 查询应用创建状态
                 */
                taskCheck: async (
                    payload?: {
                        params: { task_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { status: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/applications/task_check`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=application&version=v2 document }
                 *
                 * 创建应用
                 */
                create: async (
                    payload?: {
                        data: {
                            name: { en_us?: string; zh_cn?: string };
                            namespace: string;
                            description?: { en_us?: string; zh_cn?: string };
                            admins?: Array<number>;
                            sandbox_tenant?: {
                                tenant_id?: number;
                                tenant_name?: string;
                            };
                            env?: {
                                dev_id?: string;
                                test_id?: string;
                                prod_id?: string;
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
                                data?: { namespace?: string; task_id?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application&version=v2 document }
                 *
                 * 获取应用的基础信息
                 */
                get: async (
                    payload?: {
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    name?: { en_us?: string; zh_cn?: string };
                                    namespace?: string;
                                    description?: {
                                        en_us?: string;
                                        zh_cn?: string;
                                    };
                                    owner?: {
                                        user_id?: number;
                                        name?: string;
                                        email?: string;
                                    };
                                    tenants?: Array<{
                                        tenant_id?: number;
                                        tenant_name?: string;
                                        domain?: string;
                                        type?: string;
                                    }>;
                                    created_at?: number;
                                    created_by?: number;
                                    status?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application&apiName=create_acl&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_acl&project=apaas&resource=application&version=v2 document }
                 *
                 * 创建应用ACL
                 */
                createAcl: async (
                    payload?: {
                        data?: {
                            header?: {
                                biz_id?: string;
                                tenant_id?: string;
                                user_id?: string;
                            };
                            param_data?: string;
                            acl_type?: string;
                            schema_api_name?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { data?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/create_acl`,
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
             * application.flow
             */
            applicationFlow: {
                listWithIterator: async (
                    payload?: {
                        params?: { page_size?: string; page_token?: string };
                        path: { namespace: string };
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
                                    `${this.domain}/open-apis/apaas/v2/applications/:namespace/flows`,
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
                                                        label?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        activated: boolean;
                                                        created_by: string;
                                                        created_at: string;
                                                        updated_by?: string;
                                                        updated_at?: string;
                                                        api_id?: string;
                                                        api_name?: string;
                                                    }>;
                                                    page_token?: string;
                                                    count?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.flow&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=application.flow&version=v2 document }
                 *
                 * 获取流程列表
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: string; page_token?: string };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        label?: Record<string, string>;
                                        activated: boolean;
                                        created_by: string;
                                        created_at: string;
                                        updated_by?: string;
                                        updated_at?: string;
                                        api_id?: string;
                                        api_name?: string;
                                    }>;
                                    page_token?: string;
                                    count?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/flows`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.flow&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=apaas&resource=application.flow&version=v2 document }
                 */
                delete: async (
                    payload?: {
                        path: { namespace: string; api_id: string };
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
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/flows/:api_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.flow&apiName=execute&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=execute&project=apaas&resource=application.flow&version=v2 document }
                 */
                execute: async (
                    payload?: {
                        data?: {
                            idempotent_key?: string;
                            variables?: string;
                            is_async?: boolean;
                        };
                        path: { namespace: string; api_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    execution_id?: string;
                                    status?: string;
                                    out_params?: string;
                                    error_code?: string;
                                    error_message?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/flows/:api_id/execute`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.flow&apiName=toggle_activation&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=toggle_activation&project=apaas&resource=application.flow&version=v2 document }
                 */
                toggleActivation: async (
                    payload?: {
                        data?: { activated?: boolean };
                        path: { namespace: string; api_id: string };
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
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/flows/:api_id/toggle_activation`,
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
             * application.execution_history
             */
            applicationExecutionHistory: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.execution_history&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.execution_history&version=v2 document }
                 */
                get: async (
                    payload?: {
                        path: { namespace: string; execution_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    execution_history?: {
                                        execution_id?: string;
                                        basic_execution_history?: {
                                            execution_id?: string;
                                            flow_api_id?: string;
                                            initiator?: string;
                                            start_time?: string;
                                            complete_time?: string;
                                            status?: string;
                                            status_code?: string;
                                            status_messages?: Array<string>;
                                            flow_label?: Record<string, string>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/execution_histories/:execution_id`,
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
                queryWithIterator: async (
                    payload?: {
                        data?: {
                            initiators?: Array<string>;
                            flow_api_ids?: Array<string>;
                            statuses?: Array<string>;
                            from?: string;
                            to?: string;
                            status_code?: string;
                            page_size?: string;
                            page_token?: string;
                        };
                        path: { namespace: string };
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
                                    `${this.domain}/open-apis/apaas/v2/applications/:namespace/execution_histories/query`,
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
                                                    basic_execution_histories?: Array<{
                                                        execution_id?: string;
                                                        flow_api_id?: string;
                                                        initiator?: string;
                                                        start_time?: string;
                                                        complete_time?: string;
                                                        status?: string;
                                                        status_code?: string;
                                                        status_messages?: Array<string>;
                                                        flow_label?: Record<
                                                            string,
                                                            string
                                                        >;
                                                    }>;
                                                    page_token?: string;
                                                    count?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.execution_history&apiName=query&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.execution_history&version=v2 document }
                 */
                query: async (
                    payload?: {
                        data?: {
                            initiators?: Array<string>;
                            flow_api_ids?: Array<string>;
                            statuses?: Array<string>;
                            from?: string;
                            to?: string;
                            status_code?: string;
                            page_size?: string;
                            page_token?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    basic_execution_histories?: Array<{
                                        execution_id?: string;
                                        flow_api_id?: string;
                                        initiator?: string;
                                        start_time?: string;
                                        complete_time?: string;
                                        status?: string;
                                        status_code?: string;
                                        status_messages?: Array<string>;
                                        flow_label?: Record<string, string>;
                                    }>;
                                    page_token?: string;
                                    count?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/execution_histories/query`,
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
             * application.cli_***
             */
            applicationCliCredential: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.cli_credential&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=application.cli_***&version=v2 document }
                 *
                 * 生成应用的CLI_CLIENT_ID和CLI_CLIENT_SECRET
                 */
                create: async (
                    payload?: {
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    cli_client_id?: string;
                                    cli_client_secret?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v2/applications/:namespace/cli_credential`,
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
