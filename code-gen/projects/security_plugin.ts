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
import security_and_compliance from "./security_and_compliance";

// auto gen
export default abstract class Client extends security_and_compliance {
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
    security_plugin = {
        v1: {
            /**
             * sec_cli
             */
            secCli: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=sec_cli&apiName=manifest&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=manifest&project=security_plugin&resource=sec_cli&version=v1 document }
                 */
                manifest: async (
                    payload?: {
                        params?: {
                            region?: string;
                            platform?: string;
                            arch?: string;
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
                                data?: { urls?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_plugin/v1/sec_cli/manifest`,
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
             * sandbox
             */
            sandbox: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=sandbox&apiName=load_sandbox_security_config_by_oapi&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=load_sandbox_security_config_by_oapi&project=security_plugin&resource=sandbox&version=v1 document }
                 */
                loadSandboxSecurityConfigByOapi: async (
                    payload?: {
                        data?: { extra?: string; token_expire?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    policies?: Array<{
                                        id?: string;
                                        version?: string;
                                        op?: string;
                                        addresses?: Array<{
                                            type?: string;
                                            value?: string;
                                        }>;
                                        action?: string;
                                        proxy?: string;
                                        state?: string;
                                    }>;
                                    process_config?: {
                                        enabled?: boolean;
                                        dns?: number;
                                        stream?: number;
                                        mark?: number;
                                    };
                                    server_config?: {
                                        config_reload?: number;
                                        state_reload?: number;
                                        log_report?: number;
                                        uat?: string;
                                        extra?: string;
                                        base_url?: string;
                                        api_proxy?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_plugin/v1/sandbox/load_sandbox_security_config_by_oapi`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=sandbox&apiName=report_sandbox_security_log&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=report_sandbox_security_log&project=security_plugin&resource=sandbox&version=v1 document }
                 */
                reportSandboxSecurityLog: async (
                    payload?: {
                        data?: {
                            report_log_info?: {
                                state_logs?: Array<{
                                    report_time?: string;
                                    total_cpu?: string;
                                    program_cpu?: string;
                                    total_memory?: string;
                                    program_memory?: string;
                                    version?: string;
                                    boot_time?: string;
                                    log_id?: string;
                                }>;
                                runtime_logs?: Array<{
                                    report_time?: number;
                                    process_cost?: number;
                                    policy_evaluate_cost?: number;
                                    connect_cost?: number;
                                    relay_cost?: number;
                                    policies?: Array<{
                                        id?: string;
                                        version?: string;
                                        op?: string;
                                        addresses?: Array<{
                                            type?: string;
                                            value?: string;
                                        }>;
                                        action?: string;
                                        proxy?: string;
                                        state?: string;
                                    }>;
                                    params?: string;
                                    action?: string;
                                    err?: string;
                                    read_bytes?: number;
                                    write_bytes?: number;
                                    log_id?: string;
                                    agent_trace?: string;
                                    comm?: string;
                                }>;
                                content_logs?: Array<{
                                    report_time?: string;
                                    content?: string;
                                    level?: string;
                                    log_id?: string;
                                    agent_trace?: string;
                                }>;
                            };
                            extra?: string;
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
                                `${this.domain}/open-apis/security_plugin/v1/sandbox/report_sandbox_security_log`,
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
             * openclaw_plugin
             */
            openclawPlugin: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=openclaw_plugin&apiName=batch_check_skill_detection&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_check_skill_detection&project=security_plugin&resource=openclaw_plugin&version=v1 document }
                 *
                 * 校验skill是否被检测过
                 */
                batchCheckSkillDetection: async (
                    payload?: {
                        data?: {
                            skills?: Array<{
                                skill_name?: string;
                                skill_hash?: string;
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
                                data?: { result?: Record<string, boolean> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_plugin/v1/openclaw_plugin/batch_check_skill_detection`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=openclaw_plugin&apiName=skill_detect&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=skill_detect&project=security_plugin&resource=openclaw_plugin&version=v1 document }
                 *
                 * skill检测
                 */
                skillDetect: async (
                    payload?: {
                        data: {
                            file: Buffer | fs.ReadStream;
                            skill?: {
                                skill_name?: string;
                                skill_hash?: string;
                            };
                            payload?: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_plugin/v1/openclaw_plugin/skill_detect`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=openclaw_plugin&apiName=tracking_openclaw_plugin&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=tracking_openclaw_plugin&project=security_plugin&resource=openclaw_plugin&version=v1 document }
                 */
                trackingOpenclawPlugin: async (
                    payload?: {
                        data?: {
                            name?: string;
                            tag_kv?: Record<string, string>;
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
                                `${this.domain}/open-apis/security_plugin/v1/openclaw_plugin/tracking_openclaw_plugin`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=openclaw_plugin&apiName=detect&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=detect&project=security_plugin&resource=openclaw_plugin&version=v1 document }
                 *
                 * hook点位检测
                 */
                detect: async (
                    payload?: {
                        data?: {
                            hook_name?: string;
                            payload?: Record<string, string>;
                            source?: string;
                            agent_type?: string;
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
                                    effect?: string;
                                    deny_output?: string;
                                    rewrite_output?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_plugin/v1/openclaw_plugin/detect`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=openclaw_plugin&apiName=config&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=config&project=security_plugin&resource=openclaw_plugin&version=v1 document }
                 *
                 * 获取插件配置
                 */
                config: async (
                    payload?: {
                        data?: {
                            source?: string;
                            base_url_list?: Array<string>;
                            payload?: Record<string, string>;
                            agent_type?: string;
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
                                    hook_toggles?: Record<string, boolean>;
                                    sse_chunk_size?: number;
                                    skill_scan_duration_second?: number;
                                    query_duration_second?: number;
                                    enable_llm_req_sync_detect?: boolean;
                                    llm_req_sync_detect_timeout_ms?: number;
                                    enable_llm_req_async_detect?: boolean;
                                    llm_async_detect_loop_query_ms?: number;
                                    enable_llm_resp_sync_detect?: boolean;
                                    enable_tool_call_injection?: boolean;
                                    enable_network_hook?: boolean;
                                    mitm_tool_white_list?: Array<string>;
                                    mitm_tool_black_list?: Array<string>;
                                    mitm_tool_list_mode?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_plugin/v1/openclaw_plugin/config`,
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
             * security_plugin
             */
            securityPlugin: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=security_plugin&apiName=security_plugin_batch_check_skill_detection&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=security_plugin_batch_check_skill_detection&project=security_plugin&resource=security_plugin&version=v1 document }
                 *
                 * security plugin
                 */
                securityPluginBatchCheckSkillDetection: async (
                    payload?: {
                        data?: {
                            skills?: Array<{
                                skill_name?: string;
                                skill_hash?: string;
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
                                data?: { result?: Record<string, boolean> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_plugin/v1/security_plugin/security_plugin_batch_check_skill_detection`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=security_plugin&apiName=security_plugin_skill_detect&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=security_plugin_skill_detect&project=security_plugin&resource=security_plugin&version=v1 document }
                 */
                securityPluginSkillDetect: async (
                    payload?: {
                        data: {
                            file: Buffer | fs.ReadStream;
                            skill?: {
                                skill_name?: string;
                                skill_hash?: string;
                            };
                            payload?: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_plugin/v1/security_plugin/security_plugin_skill_detect`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=security_plugin&apiName=security_plugin_tracking&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=security_plugin_tracking&project=security_plugin&resource=security_plugin&version=v1 document }
                 */
                securityPluginTracking: async (
                    payload?: {
                        data?: {
                            name?: string;
                            tag_kv?: Record<string, string>;
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
                                `${this.domain}/open-apis/security_plugin/v1/security_plugin/security_plugin_tracking`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=security_plugin&apiName=security_plugin_detect&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=security_plugin_detect&project=security_plugin&resource=security_plugin&version=v1 document }
                 */
                securityPluginDetect: async (
                    payload?: {
                        data?: {
                            hook_name?: string;
                            payload?: Record<string, string>;
                            source?: string;
                            agent_type?: string;
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
                                    effect?: string;
                                    deny_output?: string;
                                    rewrite_output?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_plugin/v1/security_plugin/security_plugin_detect`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_plugin&resource=security_plugin&apiName=security_plugin_config&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=security_plugin_config&project=security_plugin&resource=security_plugin&version=v1 document }
                 */
                securityPluginConfig: async (
                    payload?: {
                        data?: {
                            source?: string;
                            base_url_list?: Array<string>;
                            payload?: Record<string, string>;
                            agent_type?: string;
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
                                    hook_toggles?: Record<string, boolean>;
                                    sse_chunk_size?: number;
                                    skill_scan_duration_second?: number;
                                    query_duration_second?: number;
                                    enable_llm_req_sync_detect?: boolean;
                                    llm_req_sync_detect_timeout_ms?: number;
                                    enable_llm_req_async_detect?: boolean;
                                    llm_async_detect_loop_query_ms?: number;
                                    enable_llm_resp_sync_detect?: boolean;
                                    enable_tool_call_injection?: boolean;
                                    enable_network_hook?: boolean;
                                    mitm_tool_white_list?: Array<string>;
                                    mitm_tool_black_list?: Array<string>;
                                    mitm_tool_list_mode?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_plugin/v1/security_plugin/security_plugin_config`,
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
