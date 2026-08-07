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
import docs_ai from "./docs_ai";

// auto gen
export default abstract class Client extends docs_ai {
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
    docs_tool = {
        v2: {
            /**
             * platform.migration
             */
            platformMigration: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.migration&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=docs_tool&resource=platform.migration&version=v2 document }
                 */
                get: async (
                    payload?: {
                        path: { platform_id: string; migration_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    migration?: {
                                        migration_id?: string;
                                        status?: number;
                                        stage?: string;
                                        report_url?: string;
                                        percent?: number;
                                        setting?: {
                                            dest_token?: string;
                                            docx?: boolean;
                                            sheet?: boolean;
                                            dest_type?: number;
                                            dest_id?: string;
                                            public_wiki?: boolean;
                                        };
                                        user_identity?: string;
                                        action?: number;
                                        locale?: string;
                                        time_offset?: number;
                                        migration_num?: {
                                            file_total_num?: number;
                                            file_succeeded_num?: number;
                                            file_failed_num?: number;
                                            file_unsupported_num?: number;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/migrations/:migration_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.migration&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=docs_tool&resource=platform.migration&version=v2 document }
                 */
                list: async (
                    payload?: {
                        params?: { migration_ids?: Array<string> };
                        path: { platform_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    migrations?: Array<{
                                        migration_id?: string;
                                        status?: number;
                                        stage?: string;
                                        report_url?: string;
                                        percent?: number;
                                        setting?: {
                                            dest_token?: string;
                                            docx?: boolean;
                                            sheet?: boolean;
                                            dest_type?: number;
                                            dest_id?: string;
                                            public_wiki?: boolean;
                                        };
                                        user_identity?: string;
                                        action?: number;
                                        locale?: string;
                                        time_offset?: number;
                                        migration_num?: {
                                            file_total_num?: number;
                                            file_succeeded_num?: number;
                                            file_failed_num?: number;
                                            file_unsupported_num?: number;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/migrations`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.migration&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=docs_tool&resource=platform.migration&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            migration_id?: string;
                            status?: number;
                            stage?: string;
                            report_url?: string;
                            percent?: number;
                            setting?: {
                                dest_token?: string;
                                docx?: boolean;
                                sheet?: boolean;
                                dest_type?: number;
                                dest_id?: string;
                                public_wiki?: boolean;
                            };
                            user_identity?: string;
                            action?: number;
                            locale?: string;
                            time_offset?: number;
                            migration_num?: {
                                file_total_num?: number;
                                file_succeeded_num?: number;
                                file_failed_num?: number;
                                file_unsupported_num?: number;
                            };
                        };
                        path: { platform_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { migration_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/migrations`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.migration&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=docs_tool&resource=platform.migration&version=v2 document }
                 */
                patch: async (
                    payload?: {
                        data?: {
                            status?: number;
                            stage?: string;
                            report_url?: string;
                            percent?: number;
                            setting?: {
                                dest_token?: string;
                                docx?: boolean;
                                sheet?: boolean;
                                dest_type?: number;
                                dest_id?: string;
                                public_wiki?: boolean;
                            };
                            user_identity?: string;
                            action?: number;
                            locale?: string;
                            time_offset?: number;
                            migration_num?: {
                                file_total_num?: number;
                                file_succeeded_num?: number;
                                file_failed_num?: number;
                                file_unsupported_num?: number;
                            };
                        };
                        path: { platform_id: string; migration_id: string };
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
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/migrations/:migration_id`,
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
             * platform.user
             */
            platformUser: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.user&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=docs_tool&resource=platform.user&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            user_identity?: string;
                            user_id?: string;
                            name?: string;
                        };
                        path: { platform_id: string };
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
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/users`,
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
             * platform.task
             */
            platformTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.task&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=docs_tool&resource=platform.task&version=v2 document }
                 */
                get: async (
                    payload?: {
                        path: { platform_id: string; task_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    task?: {
                                        task_id?: string;
                                        type?: number;
                                        resource_identities?: Array<string>;
                                        status?: number;
                                        user_identity?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/tasks/:task_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.task&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=docs_tool&resource=platform.task&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            task_id?: string;
                            type?: number;
                            resource_identities?: Array<string>;
                            status?: number;
                            user_identity?: string;
                        };
                        path: { platform_id: string };
                    },
                    options?: IRequestOptions
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
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/tasks`,
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
             * temporary_file
             */
            temporaryFile: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=temporary_file&apiName=upload_finish&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_finish&project=docs_tool&resource=temporary_file&version=v2 document }
                 */
                uploadFinish: async (
                    payload?: {
                        data: { upload_id: string; block_num: number };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { file_token?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_tool/v2/temporary_files/upload_finish`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=temporary_file&apiName=upload_part&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_part&project=docs_tool&resource=temporary_file&version=v2 document }
                 */
                uploadPart: async (
                    payload?: {
                        data: {
                            upload_id: string;
                            seq: number;
                            size: number;
                            checksum?: string;
                            file?: Buffer | fs.ReadStream;
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
                                `${this.domain}/open-apis/docs_tool/v2/temporary_files/upload_part`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=temporary_file&apiName=upload_prepare&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_prepare&project=docs_tool&resource=temporary_file&version=v2 document }
                 */
                uploadPrepare: async (
                    payload?: {
                        data: {
                            file_name: string;
                            parent_type: "docx_migration";
                            size: number;
                            parent_node: string;
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
                                    upload_id?: string;
                                    block_size?: number;
                                    block_num?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_tool/v2/temporary_files/upload_prepare`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=temporary_file&apiName=upload&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=docs_tool&resource=temporary_file&version=v2 document }
                 */
                upload: async (
                    payload?: {
                        data: {
                            file_name: string;
                            parent_type: "docx_migration";
                            size: number;
                            parent_node?: string;
                            file: Buffer | fs.ReadStream;
                            checksum?: string;
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
                                data?: { file_token?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_tool/v2/temporary_files/upload`,
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
            },
            /**
             * platform.migration.report
             */
            platformMigrationReport: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.migration.report&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=docs_tool&resource=platform.migration.report&version=v2 document }
                 */
                get: async (
                    payload?: {
                        path: { platform_id: string; migration_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/migrations/:migration_id/report`,
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
             * platform.file_meta
             */
            platformFileMeta: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.file_meta&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=docs_tool&resource=platform.file_meta&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            space_identity: string;
                            user_identity: string;
                            file_metas?: Array<{
                                file_meta_id?: string;
                                file_identity?: string;
                                name?: string;
                                file_extension?: string;
                                parent_identity?: string;
                                type?: number;
                                space_identity?: string;
                                user_identity?: string;
                                collaborators?: Array<{
                                    role?: number;
                                    type?: number;
                                    collaborator_identity?: string;
                                }>;
                                download_url?: string;
                                size?: string;
                                order?: number;
                            }>;
                        };
                        path: { platform_id: string };
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
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/file_metas`,
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
             * platform.space
             */
            platformSpace: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.space&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=docs_tool&resource=platform.space&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            spaces: Array<{
                                space_id?: string;
                                space_identity?: string;
                                name?: string;
                                collaborators?: Array<{
                                    role?: number;
                                    type?: number;
                                    collaborator_identity?: string;
                                }>;
                                user_identity?: string;
                                type?: number;
                            }>;
                            user_identity: string;
                        };
                        path: { platform_id: string };
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
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/spaces`,
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
             * platform.migration.file
             */
            platformMigrationFile: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform.migration.file&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=docs_tool&resource=platform.migration.file&version=v2 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            user_identity: string;
                            files?: Array<{
                                file_identity?: string;
                                user_identity?: string;
                                temporary_file_token?: string;
                                file_id?: string;
                                status?: number;
                                err_msg?: string;
                                ext?: string;
                            }>;
                        };
                        path: { platform_id: string; migration_id: string };
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
                                `${this.domain}/open-apis/docs_tool/v2/platforms/:platform_id/migrations/:migration_id/files`,
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
             * platform
             */
            platform: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_tool&resource=platform&apiName=platform_id&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=platform_id&project=docs_tool&resource=platform&version=v2 document }
                 */
                platformId: async (
                    payload?: {
                        params: { type: number; device_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { ext?: string; platform_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_tool/v2/platforms/platform_id`,
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
