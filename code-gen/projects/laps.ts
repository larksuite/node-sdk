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
import inline_platform from "./inline_platform";

// auto gen
export default abstract class Client extends inline_platform {
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
    laps = {
        v1: {
            /**
             * material
             */
            material: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=material&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=material&version=v1 document }
                 *
                 * Batch upsert material records.
                 */
                batchUpsert: async (
                    payload?: {
                        data: {
                            records: Array<{
                                plant_id?: string;
                                source_system: string;
                                source_id: string;
                                material_code: string;
                                material_name: string;
                                material_type: string;
                                version: number;
                                specification?: string;
                                unit?: string;
                                lead_time_minutes?: number;
                                substitute_allowed?: boolean;
                                status?: string;
                                effective_start_sec?: number;
                                effective_end_sec?: number;
                                ext_json?: string;
                                update_fields?: Array<string>;
                            }>;
                            client_token: string;
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
                                code: number;
                                msg: string;
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/material/batch_upsert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=material&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=material&version=v1 document }
                 *
                 * Query material records.
                 */
                query: async (
                    payload?: {
                        data?: {
                            source_system?: string;
                            source_id?: string;
                            material_codes?: Array<string>;
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
                                code: number;
                                msg: string;
                                data?: {
                                    items?: Array<{
                                        id?: string;
                                        plant_id?: string;
                                        source_system?: string;
                                        source_id?: string;
                                        material_code?: string;
                                        material_name?: string;
                                        material_type?: string;
                                        version?: number;
                                        specification?: string;
                                        unit?: string;
                                        lead_time_minutes?: number;
                                        substitute_allowed?: boolean;
                                        status?: string;
                                        effective_start_sec?: number;
                                        effective_end_sec?: number;
                                        ext_json?: string;
                                        update_fields?: Array<string>;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/material/query`,
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
             * resource
             */
            resource: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=resource&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=resource&version=v1 document }
                 *
                 * Batch upsert resource records.
                 */
                batchUpsert: async (
                    payload?: {
                        data: {
                            records: Array<{
                                plant_id?: string;
                                source_system: string;
                                source_id: string;
                                resource_code: string;
                                resource_name: string;
                                resource_type: string;
                                resource_skills_json?: string;
                                multi_task_allowed?: boolean;
                                max_concurrent_jobs?: number;
                                status?: string;
                                effective_start_sec?: number;
                                effective_end_sec?: number;
                                ext_json?: string;
                                update_fields?: Array<string>;
                            }>;
                            client_token: string;
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
                                code: number;
                                msg: string;
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/resource/batch_upsert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=resource&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=resource&version=v1 document }
                 *
                 * Query resource records.
                 */
                query: async (
                    payload?: {
                        data?: {
                            source_system?: string;
                            source_id?: string;
                            resource_codes?: Array<string>;
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
                                code: number;
                                msg: string;
                                data?: {
                                    items?: Array<{
                                        id?: string;
                                        plant_id?: string;
                                        source_system?: string;
                                        source_id?: string;
                                        resource_code?: string;
                                        resource_name?: string;
                                        resource_type?: string;
                                        resource_skills_json?: string;
                                        multi_task_allowed?: boolean;
                                        max_concurrent_jobs?: number;
                                        status?: string;
                                        effective_start_sec?: number;
                                        effective_end_sec?: number;
                                        ext_json?: string;
                                        update_fields?: Array<string>;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/resource/query`,
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
             * bom
             */
            bom: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=bom&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=bom&version=v1 document }
                 *
                 * Batch upsert bom records.
                 */
                batchUpsert: async (
                    payload?: {
                        data: {
                            records: Array<{
                                plant_id?: string;
                                source_system: string;
                                source_id: string;
                                bom_code: string;
                                product_id: string;
                                version: number;
                                is_default?: boolean;
                                status?: string;
                                ext_json?: string;
                                items: Array<{
                                    source_id: string;
                                    parent_material_code: string;
                                    material_id: string;
                                    unit_qty: string;
                                    loss_rate?: string;
                                    required_op_code?: string;
                                    key_material_flag?: boolean;
                                    substitute_group_code?: string;
                                    status?: string;
                                    ext_json?: string;
                                    update_fields?: Array<string>;
                                }>;
                                update_fields?: Array<string>;
                            }>;
                            client_token: string;
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
                                code: number;
                                msg: string;
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/bom/batch_upsert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=bom&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=bom&version=v1 document }
                 *
                 * Query bom records.
                 */
                query: async (
                    payload?: {
                        data?: {
                            source_system?: string;
                            source_id?: string;
                            bom_codes?: Array<string>;
                            product_codes?: Array<string>;
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
                                code: number;
                                msg: string;
                                data?: {
                                    items?: Array<{
                                        id?: string;
                                        plant_id?: string;
                                        source_system?: string;
                                        source_id?: string;
                                        bom_code?: string;
                                        product_id?: string;
                                        version?: number;
                                        is_default?: boolean;
                                        status?: string;
                                        ext_json?: string;
                                        items?: Array<{
                                            id?: string;
                                            source_id?: string;
                                            parent_material_code?: string;
                                            material_id?: string;
                                            unit_qty?: string;
                                            loss_rate?: string;
                                            required_op_code?: string;
                                            key_material_flag?: boolean;
                                            substitute_group_code?: string;
                                            status?: string;
                                            ext_json?: string;
                                            update_fields?: Array<string>;
                                        }>;
                                        update_fields?: Array<string>;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/bom/query`,
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
             * inventory_snapshot
             */
            inventorySnapshot: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=inventory_snapshot&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=inventory_snapshot&version=v1 document }
                 *
                 * Batch upsert inventory_snapshot records.
                 */
                batchUpsert: async (
                    payload?: {
                        data: {
                            records: Array<{
                                plant_id?: string;
                                source_system: string;
                                source_id: string;
                                snapshot_time_sec: number;
                                warehouse_code: string;
                                material_id: string;
                                available_qty: string;
                                reserved_qty?: string;
                                onhand_qty?: string;
                                unit?: string;
                                quality_status?: string;
                                status?: string;
                                ext_json?: string;
                                update_fields?: Array<string>;
                            }>;
                            client_token: string;
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
                                code: number;
                                msg: string;
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/inventory_snapshot/batch_upsert`,
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
             * material_inbound_plan
             */
            materialInboundPlan: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=material_inbound_plan&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=material_inbound_plan&version=v1 document }
                 *
                 * Batch upsert material_inbound_plan records.
                 */
                batchUpsert: async (
                    payload?: {
                        data: {
                            records: Array<{
                                plant_id?: string;
                                source_system: string;
                                source_id: string;
                                material_id: string;
                                inbound_qty: string;
                                eta_sec: number;
                                arrival_status: string;
                                source_order_code?: string;
                                warehouse_code?: string;
                                status?: string;
                                ext_json?: string;
                                update_fields?: Array<string>;
                            }>;
                            client_token: string;
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
                                code: number;
                                msg: string;
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/material_inbound_plan/batch_upsert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=material_inbound_plan&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=material_inbound_plan&version=v1 document }
                 *
                 * Query material_inbound_plan records.
                 */
                query: async (
                    payload?: {
                        data?: {
                            source_system?: string;
                            source_id?: string;
                            material_codes?: Array<string>;
                            eta_start_sec?: number;
                            eta_end_sec?: number;
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
                                code: number;
                                msg: string;
                                data?: {
                                    items?: Array<{
                                        id?: string;
                                        plant_id?: string;
                                        source_system?: string;
                                        source_id?: string;
                                        material_id?: string;
                                        inbound_qty?: string;
                                        eta_sec?: number;
                                        arrival_status?: string;
                                        source_order_code?: string;
                                        warehouse_code?: string;
                                        status?: string;
                                        ext_json?: string;
                                        update_fields?: Array<string>;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/material_inbound_plan/query`,
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
             * production_order
             */
            productionOrder: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=production_order&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=production_order&version=v1 document }
                 *
                 * Batch upsert production_order records.
                 */
                batchUpsert: async (
                    payload?: {
                        data: {
                            records: Array<{
                                plant_id?: string;
                                source_system: string;
                                source_id: string;
                                order_code: string;
                                parent_order_code?: string;
                                order_type?: string;
                                product_id: string;
                                product_name: string;
                                quantity: string;
                                unit: string;
                                due_time_sec: number;
                                earliest_start_time_sec?: number;
                                priority?: number;
                                penalty_tardy?: string;
                                customer_code?: string;
                                customer_name?: string;
                                order_status?: string;
                                scheduling_status?: string;
                                route_id?: string;
                                bom_id?: string;
                                status?: string;
                                effective_start_sec?: number;
                                effective_end_sec?: number;
                                ext_json?: string;
                                update_fields?: Array<string>;
                            }>;
                            client_token: string;
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
                                code: number;
                                msg: string;
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/production_order/batch_upsert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=production_order&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=production_order&version=v1 document }
                 *
                 * Query production_order records.
                 */
                query: async (
                    payload?: {
                        data?: {
                            source_system?: string;
                            source_id?: string;
                            order_codes?: Array<string>;
                            product_codes?: Array<string>;
                            order_types?: Array<string>;
                            updated_since_sec?: number;
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
                                code: number;
                                msg: string;
                                data?: {
                                    items?: Array<{
                                        id?: string;
                                        plant_id?: string;
                                        source_system?: string;
                                        source_id?: string;
                                        order_code?: string;
                                        parent_order_code?: string;
                                        order_type?: string;
                                        product_id?: string;
                                        product_name?: string;
                                        quantity?: string;
                                        unit?: string;
                                        due_time_sec?: number;
                                        earliest_start_time_sec?: number;
                                        priority?: number;
                                        penalty_tardy?: string;
                                        customer_code?: string;
                                        customer_name?: string;
                                        order_status?: string;
                                        scheduling_status?: string;
                                        route_id?: string;
                                        bom_id?: string;
                                        status?: string;
                                        effective_start_sec?: number;
                                        effective_end_sec?: number;
                                        ext_json?: string;
                                        update_fields?: Array<string>;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/production_order/query`,
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
             * schedule_task
             */
            scheduleTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=schedule_task&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=schedule_task&version=v1 document }
                 *
                 * Query schedule_task records.
                 */
                query: async (
                    payload?: {
                        data?: {
                            order_codes?: Array<string>;
                            op_codes?: Array<string>;
                            resource_codes?: Array<string>;
                            task_statuses?: Array<string>;
                            task_start_from_sec?: string;
                            task_start_to_sec?: string;
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
                                code: number;
                                msg: string;
                                data?: {
                                    items?: Array<{
                                        id?: string;
                                        plant_id?: string;
                                        schedule_id?: string;
                                        schedule_version_id?: string;
                                        task_code?: string;
                                        order_id?: string;
                                        order_code?: string;
                                        op_id?: string;
                                        op_code?: string;
                                        selected_duration_option_id?: string;
                                        resource_id?: string;
                                        resource_code?: string;
                                        scheduled_start_time_sec?: number;
                                        scheduled_end_time_sec?: number;
                                        scheduled_quantity?: string;
                                        completed_quantity?: string;
                                        task_status?: string;
                                        start_task_flag?: boolean;
                                        end_task_flag?: boolean;
                                        origin_task_code?: string;
                                        merge_task_code?: string;
                                        task_edges_json?: string;
                                        input_materials_json?: string;
                                        actual_id?: string;
                                        ext_json?: string;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/schedule_task/query`,
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
             * material_kit_template
             */
            materialKitTemplate: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=material_kit_template&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=material_kit_template&version=v1 document }
                 */
                batchUpsert: async (
                    payload?: {
                        data?: {
                            client_token?: string;
                            records?: Array<{
                                plant_id?: string;
                                template_code?: string;
                                template_name?: string;
                                product_family?: string;
                                task_code?: string;
                                task_name?: string;
                                is_key_task?: boolean;
                                default_arrival_status?: string;
                                default_eta?: number;
                                sort_order?: number;
                                status?: string;
                                ext_json?: string;
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
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/v1/material_kit_template/batch_upsert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=material_kit_template&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=material_kit_template&version=v1 document }
                 */
                query: async (
                    payload?: {
                        data?: {
                            template_codes?: Array<string>;
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
                                        plant_id?: string;
                                        template_code?: string;
                                        template_name?: string;
                                        product_family?: string;
                                        task_code?: string;
                                        task_name?: string;
                                        is_key_task?: boolean;
                                        default_arrival_status?: string;
                                        default_eta?: number;
                                        sort_order?: number;
                                        status?: string;
                                        ext_json?: string;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/v1/material_kit_template/query`,
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
             * material_kit_task
             */
            materialKitTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=material_kit_task&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=material_kit_task&version=v1 document }
                 */
                query: async (
                    payload?: {
                        data?: {
                            template_codes?: Array<string>;
                            order_codes?: Array<string>;
                            product_codes?: Array<string>;
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
                                        plant_id?: string;
                                        source_system?: string;
                                        source_id?: string;
                                        template_code?: string;
                                        task_code?: string;
                                        task_name?: string;
                                        order_code?: string;
                                        product_code?: string;
                                        product_family?: string;
                                        arrival_status?: string;
                                        eta?: number;
                                        actual_arrival_time?: number;
                                        remark?: string;
                                        status?: string;
                                        ext_json?: string;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/v1/material_kit_task/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=material_kit_task&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=material_kit_task&version=v1 document }
                 */
                batchUpsert: async (
                    payload?: {
                        data?: {
                            client_token?: string;
                            records?: Array<{
                                plant_id?: string;
                                source_system?: string;
                                source_id?: string;
                                template_code?: string;
                                task_code?: string;
                                task_name?: string;
                                order_code?: string;
                                product_code?: string;
                                product_family?: string;
                                arrival_status?: string;
                                eta?: number;
                                actual_arrival_time?: number;
                                remark?: string;
                                status?: string;
                                ext_json?: string;
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
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/v1/material_kit_task/batch_upsert`,
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
             * material_kit
             */
            materialKit: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=material_kit&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=material_kit&version=v1 document }
                 *
                 * 批量写入或更新物料齐套聚合记录。
                 */
                batchUpsert: async (
                    payload?: {
                        data?: {
                            client_token?: string;
                            records?: Array<{
                                template_code?: string;
                                template_name?: string;
                                product_family?: string;
                                order_code?: string;
                                tasks_json?: string;
                                status?: string;
                                ext_json?: string;
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
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/v1/material_kit/batch_upsert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=material_kit&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=material_kit&version=v1 document }
                 *
                 * 查询物料齐套聚合记录。
                 */
                query: async (
                    payload?: {
                        data?: {
                            template_codes?: Array<string>;
                            order_codes?: Array<string>;
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
                                        template_code?: string;
                                        template_name?: string;
                                        product_family?: string;
                                        order_code?: string;
                                        tasks_json?: string;
                                        status?: string;
                                        ext_json?: string;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/v1/material_kit/query`,
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
             * product
             */
            product: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=product&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=product&version=v1 document }
                 *
                 * Batch upsert product records.
                 */
                batchUpsert: async (
                    payload?: {
                        data: {
                            records: Array<{
                                plant_id?: string;
                                source_system: string;
                                source_id: string;
                                product_code: string;
                                product_name: string;
                                family_id?: string;
                                unit: string;
                                default_route_id?: string;
                                default_bom_id?: string;
                                batch_rule?: string;
                                min_batch_qty?: string;
                                max_batch_qty?: string;
                                status?: string;
                                effective_start_sec?: number;
                                effective_end_sec?: number;
                                ext_json?: string;
                                update_fields?: Array<string>;
                            }>;
                            client_token: string;
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
                                code: number;
                                msg: string;
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/product/batch_upsert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=product&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=product&version=v1 document }
                 *
                 * Query product records.
                 */
                query: async (
                    payload?: {
                        data?: {
                            source_system?: string;
                            source_id?: string;
                            product_codes?: Array<string>;
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
                                code: number;
                                msg: string;
                                data?: {
                                    items?: Array<{
                                        id?: string;
                                        plant_id?: string;
                                        source_system?: string;
                                        source_id?: string;
                                        product_code?: string;
                                        product_name?: string;
                                        family_id?: string;
                                        unit?: string;
                                        default_route_id?: string;
                                        default_bom_id?: string;
                                        batch_rule?: string;
                                        min_batch_qty?: string;
                                        max_batch_qty?: string;
                                        status?: string;
                                        effective_start_sec?: number;
                                        effective_end_sec?: number;
                                        ext_json?: string;
                                        update_fields?: Array<string>;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/product/query`,
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
             * production_task_actual
             */
            productionTaskActual: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=production_task_actual&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=production_task_actual&version=v1 document }
                 *
                 * Batch upsert production_task_actual records.
                 */
                batchUpsert: async (
                    payload?: {
                        data: {
                            records: Array<{
                                plant_id?: string;
                                source_system: string;
                                source_id: string;
                                schedule_task_id: string;
                                resource_id?: string;
                                actual_start_time_sec: number;
                                actual_end_time_sec?: number;
                                reported_quantity?: string;
                                qualified_quantity?: string;
                                scrap_quantity?: string;
                                cumulative_quantity?: string;
                                operator_id?: string;
                                team_id?: string;
                                abnormal_flag?: boolean;
                                abnormal_reason?: string;
                                status?: string;
                                ext_json?: string;
                                update_fields?: Array<string>;
                            }>;
                            client_token: string;
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
                                code: number;
                                msg: string;
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/production_task_actual/batch_upsert`,
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
             * routing
             */
            routing: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=routing&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=laps&resource=routing&version=v1 document }
                 *
                 * Batch upsert routing records.
                 */
                batchUpsert: async (
                    payload?: {
                        data: {
                            records: Array<{
                                plant_id?: string;
                                source_system: string;
                                source_id: string;
                                route_code: string;
                                route_name: string;
                                product_id: string;
                                version: number;
                                route_type: string;
                                status?: string;
                                effective_start_sec?: number;
                                effective_end_sec?: number;
                                ext_json?: string;
                                operations: Array<{
                                    source_id: string;
                                    op_code: string;
                                    from_op_id?: string;
                                    to_op_id?: string;
                                    op_name: string;
                                    op_type?: string;
                                    setup_time?: string;
                                    changeover_time?: string;
                                    run_time_per_unit?: string;
                                    fixed_time?: string;
                                    time_unit?: string;
                                    transfer_time?: string;
                                    min_wait_time?: string;
                                    max_wait_time?: string;
                                    material_code?: string;
                                    material_qty_per_unit?: string;
                                    split_allowed?: boolean;
                                    parallel_allowed?: boolean;
                                    status?: string;
                                    effective_start_sec?: number;
                                    effective_end_sec?: number;
                                    ext_json?: string;
                                    resource_rels?: Array<{
                                        resource_id: string;
                                        resource_role?: string;
                                        priority_level?: number;
                                        efficiency_ratio?: string;
                                        setup_time_override?: string;
                                        run_time_override?: string;
                                        min_batch_qty?: string;
                                        max_batch_qty?: string;
                                        status?: string;
                                        update_fields?: Array<string>;
                                    }>;
                                    update_fields?: Array<string>;
                                }>;
                                update_fields?: Array<string>;
                            }>;
                            client_token: string;
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
                                code: number;
                                msg: string;
                                data?: { affected_count?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/routing/batch_upsert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=laps&resource=routing&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=laps&resource=routing&version=v1 document }
                 *
                 * Query routing records.
                 */
                query: async (
                    payload?: {
                        data?: {
                            source_system?: string;
                            source_id?: string;
                            route_codes?: Array<string>;
                            product_codes?: Array<string>;
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
                                code: number;
                                msg: string;
                                data?: {
                                    items?: Array<{
                                        id?: string;
                                        plant_id?: string;
                                        source_system?: string;
                                        source_id?: string;
                                        route_code?: string;
                                        route_name?: string;
                                        product_id?: string;
                                        version?: number;
                                        route_type?: string;
                                        status?: string;
                                        effective_start_sec?: number;
                                        effective_end_sec?: number;
                                        ext_json?: string;
                                        operations?: Array<{
                                            id?: string;
                                            source_id?: string;
                                            op_code?: string;
                                            from_op_id?: string;
                                            to_op_id?: string;
                                            op_name?: string;
                                            op_type?: string;
                                            setup_time?: string;
                                            changeover_time?: string;
                                            run_time_per_unit?: string;
                                            fixed_time?: string;
                                            time_unit?: string;
                                            transfer_time?: string;
                                            min_wait_time?: string;
                                            max_wait_time?: string;
                                            material_code?: string;
                                            material_qty_per_unit?: string;
                                            split_allowed?: boolean;
                                            parallel_allowed?: boolean;
                                            status?: string;
                                            effective_start_sec?: number;
                                            effective_end_sec?: number;
                                            ext_json?: string;
                                            resource_rels?: Array<{
                                                id?: string;
                                                resource_id?: string;
                                                resource_role?: string;
                                                priority_level?: number;
                                                efficiency_ratio?: string;
                                                setup_time_override?: string;
                                                run_time_override?: string;
                                                min_batch_qty?: string;
                                                max_batch_qty?: string;
                                                status?: string;
                                                update_fields?: Array<string>;
                                            }>;
                                            update_fields?: Array<string>;
                                        }>;
                                        update_fields?: Array<string>;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/laps/routing/query`,
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
