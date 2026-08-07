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
import unified_kms_log from "./unified_kms_log";

// auto gen
export default abstract class Client extends unified_kms_log {
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
    unified_kms = {
        v1: {
            /**
             * autonomous_key
             */
            autonomousKey: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=unified_kms&resource=autonomous_key&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=unified_kms&resource=autonomous_key&version=v1 document }
                 *
                 * 获取密钥信息
                 *
                 * 通过密钥ID获取单个自主密钥信息
                 */
                get: async (
                    payload?: {
                        path: { key_version_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    autonomous_key: {
                                        key_version_id: string;
                                        status?: number;
                                        create_time?: string;
                                        update_time?: string;
                                        algorithm_type?:
                                            | "AES256"
                                            | "SM4"
                                            | "Unknown";
                                        operator?: {
                                            user_id: string;
                                            name: string;
                                            operator_type?:
                                                | "User"
                                                | "APP"
                                                | "Unknown";
                                        };
                                        key_usage?:
                                            | "EncryptDecrypt"
                                            | "Decrypt";
                                        feature_code?: string;
                                        key_alias?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/unified_kms/v1/autonomous_keys/:key_version_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=unified_kms&resource=autonomous_key&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=unified_kms&resource=autonomous_key&version=v1 document }
                 *
                 * 导入与轮转密钥
                 *
                 * 通过API导入与轮转各业务线产品的自主密钥，详情请参考[通过飞书开放API操作密钥](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/unified_kms-v1/overview#130880d8)
                 */
                create: async (
                    payload?: {
                        data: {
                            encrypted_token: string;
                            public_encrypted_key: string;
                            algorithm_type?: "AES256" | "SM4";
                            feature_code: string;
                            key_alias?: string;
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
                                    key_version_id: string;
                                    hashed_master_key: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/unified_kms/v1/autonomous_keys`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=unified_kms&resource=autonomous_key&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=unified_kms&resource=autonomous_key&version=v1 document }
                 *
                 * 立即删除密钥
                 *
                 * 立即删除指定的密钥，详情请参考[密钥删除](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/unified_kms-v1/overview#4586b958)
                 *
                 * **该操作为高危操作，密钥彻底删除后无法提供数据恢复服务，请谨慎评估与保存原始密钥材料。如需恢复已被删除的密钥，请通过密钥导入接口重新导入原始密钥。**;;该操作将向租户超级管理员发送审核消息，审核通过后操作生效，相关产品功能将不可用，审核有效期为48小时，审核期内不能再次进行删除操作；密钥将在操作生效的**1小时**后被彻底删除，在此期间可取消操作，产品功能将恢复。
                 */
                delete: async (
                    payload?: {
                        params?: { feature_code?: string };
                        path: { key_version_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { key_version_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/unified_kms/v1/autonomous_keys/:key_version_id`,
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            feature_code?: string;
                            start_time?: string;
                            end_time?: string;
                            algorithm_type?: "AES256" | "SM4";
                            key_alias?: string;
                            top_class?: "Office" | "People" | "EA";
                            operator_id?: string;
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
                                    `${this.domain}/open-apis/unified_kms/v1/autonomous_keys`,
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
                                                    autonomous_keys?: Array<{
                                                        key_version_id: string;
                                                        status?: number;
                                                        create_time?: string;
                                                        update_time?: string;
                                                        algorithm_type?:
                                                            | "AES256"
                                                            | "SM4"
                                                            | "Unknown";
                                                        operator?: {
                                                            user_id: string;
                                                            name: string;
                                                            operator_type?:
                                                                | "User"
                                                                | "APP"
                                                                | "Unknown";
                                                        };
                                                        key_usage?:
                                                            | "EncryptDecrypt"
                                                            | "Decrypt";
                                                        feature_code?: string;
                                                        key_alias?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=unified_kms&resource=autonomous_key&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=unified_kms&resource=autonomous_key&version=v1 document }
                 *
                 * 批量获取密钥信息
                 *
                 * 通过筛选条件批量获取自主密钥信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            feature_code?: string;
                            start_time?: string;
                            end_time?: string;
                            algorithm_type?: "AES256" | "SM4";
                            key_alias?: string;
                            top_class?: "Office" | "People" | "EA";
                            operator_id?: string;
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
                                    autonomous_keys?: Array<{
                                        key_version_id: string;
                                        status?: number;
                                        create_time?: string;
                                        update_time?: string;
                                        algorithm_type?:
                                            | "AES256"
                                            | "SM4"
                                            | "Unknown";
                                        operator?: {
                                            user_id: string;
                                            name: string;
                                            operator_type?:
                                                | "User"
                                                | "APP"
                                                | "Unknown";
                                        };
                                        key_usage?:
                                            | "EncryptDecrypt"
                                            | "Decrypt";
                                        feature_code?: string;
                                        key_alias?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/unified_kms/v1/autonomous_keys`,
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
             * key_import_material
             */
            keyImportMaterial: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=unified_kms&resource=key_import_material&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=unified_kms&resource=key_import_material&version=v1 document }
                 *
                 * 获取密钥导入材料
                 *
                 * 获取密钥导入材料，包括用于身份认证的Token以及一把Base64编码的RSA公钥，公钥格式为PKIX, ASN.1 DER，具体使用方法请参考[获取导入材料](	https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/unified_kms-v1/overview#52edd8f0)
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
                                data?: {
                                    key_import_material: {
                                        encrypted_token: string;
                                        public_key: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/unified_kms/v1/key_import_material`,
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
             * autonomous_key.deletion_plan
             */
            autonomousKeyDeletionPlan: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=unified_kms&resource=autonomous_key.deletion_plan&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=unified_kms&resource=autonomous_key.deletion_plan&version=v1 document }
                 *
                 * 创建密钥删除计划
                 *
                 * 创建密钥删除计划，详情可参考[密钥删除](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/unified_kms-v1/overview#4586b958)
                 *
                 * **该操作为高危操作，密钥彻底删除后无法提供恢复服务，请谨慎评估与保存原始密钥材料。如需恢复已被删除的密钥，请通过密钥导入接口重新导入原始密钥。**;;该操作将向租户超级管理员发送审核消息，审核通过后操作生效，相关产品功能将不可用，审核有效期为48小时，审核期内不能再次进行删除操作；密钥将设定时间后被彻底删除，在此期间可取消操作，产品功能将恢复。
                 */
                create: async (
                    payload?: {
                        data: { feature_code?: string; delay_day: number };
                        path: { key_version_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { key_version_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/unified_kms/v1/autonomous_keys/:key_version_id/deletion_plan`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=unified_kms&resource=autonomous_key.deletion_plan&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=unified_kms&resource=autonomous_key.deletion_plan&version=v1 document }
                 *
                 * 取消密钥删除计划
                 *
                 * 取消自主密钥删除计划，详情可参考[密钥删除](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/unified_kms-v1/overview#4586b958)
                 */
                delete: async (
                    payload?: {
                        path: { key_version_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { key_version_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/unified_kms/v1/autonomous_keys/:key_version_id/deletion_plan`,
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
             * autonomous_key.recover
             */
            autonomousKeyRecover: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=unified_kms&resource=autonomous_key.recover&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=unified_kms&resource=autonomous_key.recover&version=v1 document }
                 *
                 * 恢复已删除的主密钥
                 *
                 * 恢复已删除的自主密钥，详情请参考[密钥恢复](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/unified_kms-v1/overview#95eae7dd)
                 */
                create: async (
                    payload?: {
                        data: {
                            encrypted_token: string;
                            public_encrypted_key: string;
                            feature_code: string;
                            algorithm_type: string;
                        };
                        path: { key_version_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    key_version_id: string;
                                    hashed_master_key: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/unified_kms/v1/autonomous_keys/:key_version_id/recover`,
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
