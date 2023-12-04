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
import moments from "./moments";

// auto gen
export default abstract class Client extends moments {
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
     * OKR
     */
    okr = {
        /**
         * 图片
         */
        image: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=image&apiName=upload&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/image/upload document }
             *
             * 上传图片
             *
             * 上传图片
             */
            upload: async (
                payload?: {
                    data: {
                        data: Buffer | fs.ReadStream;
                        target_id: string;
                        target_type: number;
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
                            data?: { file_token?: string; url?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/images/upload`,
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
        },
        /**
         * OKR
         */
        okr: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr&apiName=batch_get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/okr/batch_get document }
             *
             * 批量获取OKR
             *
             * 根据OKR id批量获取OKR
             *
             * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
             */
            batchGet: async (
                payload?: {
                    params: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        okr_ids: number;
                        lang?: string;
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
                                okr_list?: Array<{
                                    id?: string;
                                    permission?: number;
                                    period_id?: string;
                                    name?: string;
                                    objective_list?: Array<{
                                        id?: string;
                                        permission?: number;
                                        content?: string;
                                        progress_report?: string;
                                        score?: number;
                                        weight?: number;
                                        progress_rate?: {
                                            percent?: number;
                                            status?: string;
                                        };
                                        kr_list?: Array<{
                                            id?: string;
                                            content?: string;
                                            score?: number;
                                            weight?: number;
                                            kr_weight?: number;
                                            progress_rate?: {
                                                percent?: number;
                                                status?: string;
                                            };
                                            progress_record_list?: Array<{
                                                id?: string;
                                            }>;
                                            progress_rate_percent_last_updated_time?: string;
                                            progress_rate_status_last_updated_time?: string;
                                            progress_record_last_updated_time?: string;
                                            progress_report_last_updated_time?: string;
                                            score_last_updated_time?: string;
                                            deadline?: string;
                                            mentioned_user_list?: Array<{
                                                open_id?: string;
                                                user_id?: string;
                                            }>;
                                        }>;
                                        aligned_objective_list?: Array<{
                                            id?: string;
                                            okr_id?: string;
                                            owner?: {
                                                open_id?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                        aligning_objective_list?: Array<{
                                            id?: string;
                                            okr_id?: string;
                                            owner?: {
                                                open_id?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                        progress_record_list?: Array<{
                                            id?: string;
                                        }>;
                                        progress_rate_percent_last_updated_time?: string;
                                        progress_rate_status_last_updated_time?: string;
                                        progress_record_last_updated_time?: string;
                                        progress_report_last_updated_time?: string;
                                        score_last_updated_time?: string;
                                        deadline?: string;
                                        mentioned_user_list?: Array<{
                                            open_id?: string;
                                            user_id?: string;
                                        }>;
                                    }>;
                                    confirm_status?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/okrs/batch_get`,
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
         * OKR周期
         */
        period: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/list document }
             *
             * 获取OKR周期列表
             *
             * 获取OKR周期列表
             *
             * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
             */
            list: async (
                payload?: {
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
                                page_token?: string;
                                has_more?: boolean;
                                items?: Array<{
                                    id?: string;
                                    zh_name?: string;
                                    en_name?: string;
                                    status?: number;
                                    period_start_time?: string;
                                    period_end_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/periods`,
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
         * OKR进展记录
         */
        progressRecord: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/create document }
             *
             * 创建OKR进展记录
             *
             * 创建OKR进展记录
             */
            create: async (
                payload?: {
                    data: {
                        source_title: string;
                        source_url: string;
                        target_id: string;
                        target_type: number;
                        content: {
                            blocks?: Array<{
                                type?: "paragraph" | "gallery";
                                paragraph?: {
                                    style?: {
                                        list?: {
                                            type?:
                                                | "number"
                                                | "bullet"
                                                | "checkBox"
                                                | "checkedBox"
                                                | "indent";
                                            indentLevel?: number;
                                            number?: number;
                                        };
                                    };
                                    elements?: Array<{
                                        type?:
                                            | "textRun"
                                            | "docsLink"
                                            | "person";
                                        textRun?: {
                                            text?: string;
                                            style?: {
                                                bold?: boolean;
                                                strikeThrough?: boolean;
                                                backColor?: {
                                                    red?: number;
                                                    green?: number;
                                                    blue?: number;
                                                    alpha?: number;
                                                };
                                                textColor?: {
                                                    red?: number;
                                                    green?: number;
                                                    blue?: number;
                                                    alpha?: number;
                                                };
                                                link?: { url?: string };
                                            };
                                        };
                                        docsLink?: {
                                            url?: string;
                                            title?: string;
                                        };
                                        person?: { openId?: string };
                                    }>;
                                };
                                gallery?: {
                                    imageList?: Array<{
                                        fileToken?: string;
                                        src?: string;
                                        width?: number;
                                        height?: number;
                                    }>;
                                };
                            }>;
                        };
                        source_url_pc?: string;
                        source_url_mobile?: string;
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
                                progress_id?: string;
                                modify_time?: string;
                                content?: {
                                    blocks?: Array<{
                                        type?: "paragraph" | "gallery";
                                        paragraph?: {
                                            style?: {
                                                list?: {
                                                    type?:
                                                        | "number"
                                                        | "bullet"
                                                        | "checkBox"
                                                        | "checkedBox"
                                                        | "indent";
                                                    indentLevel?: number;
                                                    number?: number;
                                                };
                                            };
                                            elements?: Array<{
                                                type?:
                                                    | "textRun"
                                                    | "docsLink"
                                                    | "person";
                                                textRun?: {
                                                    text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        strikeThrough?: boolean;
                                                        backColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        textColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        link?: { url?: string };
                                                    };
                                                };
                                                docsLink?: {
                                                    url?: string;
                                                    title?: string;
                                                };
                                                person?: { openId?: string };
                                            }>;
                                        };
                                        gallery?: {
                                            imageList?: Array<{
                                                fileToken?: string;
                                                src?: string;
                                                width?: number;
                                                height?: number;
                                            }>;
                                        };
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/progress_records`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/delete document }
             *
             * 删除OKR进展记录
             *
             * 根据ID删除OKR进展记录
             */
            delete: async (
                payload?: {
                    path: { progress_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/get document }
             *
             * 获取OKR进展记录
             *
             * 根据ID获取OKR进展记录详情
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { progress_id?: string };
                },
                options?: IRequestOptions
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
                                progress_id?: string;
                                modify_time?: string;
                                content?: {
                                    blocks?: Array<{
                                        type?: "paragraph" | "gallery";
                                        paragraph?: {
                                            style?: {
                                                list?: {
                                                    type?:
                                                        | "number"
                                                        | "bullet"
                                                        | "checkBox"
                                                        | "checkedBox"
                                                        | "indent";
                                                    indentLevel?: number;
                                                    number?: number;
                                                };
                                            };
                                            elements?: Array<{
                                                type?:
                                                    | "textRun"
                                                    | "docsLink"
                                                    | "person";
                                                textRun?: {
                                                    text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        strikeThrough?: boolean;
                                                        backColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        textColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        link?: { url?: string };
                                                    };
                                                };
                                                docsLink?: {
                                                    url?: string;
                                                    title?: string;
                                                };
                                                person?: { openId?: string };
                                            }>;
                                        };
                                        gallery?: {
                                            imageList?: Array<{
                                                fileToken?: string;
                                                src?: string;
                                                width?: number;
                                                height?: number;
                                            }>;
                                        };
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/update document }
             *
             * 更新OKR进展记录
             *
             * 根据OKR进展记录ID更新进展详情
             */
            update: async (
                payload?: {
                    data: {
                        content: {
                            blocks?: Array<{
                                type?: "paragraph" | "gallery";
                                paragraph?: {
                                    style?: {
                                        list?: {
                                            type?:
                                                | "number"
                                                | "bullet"
                                                | "checkBox"
                                                | "checkedBox"
                                                | "indent";
                                            indentLevel?: number;
                                            number?: number;
                                        };
                                    };
                                    elements?: Array<{
                                        type?:
                                            | "textRun"
                                            | "docsLink"
                                            | "person";
                                        textRun?: {
                                            text?: string;
                                            style?: {
                                                bold?: boolean;
                                                strikeThrough?: boolean;
                                                backColor?: {
                                                    red?: number;
                                                    green?: number;
                                                    blue?: number;
                                                    alpha?: number;
                                                };
                                                textColor?: {
                                                    red?: number;
                                                    green?: number;
                                                    blue?: number;
                                                    alpha?: number;
                                                };
                                                link?: { url?: string };
                                            };
                                        };
                                        docsLink?: {
                                            url?: string;
                                            title?: string;
                                        };
                                        person?: { openId?: string };
                                    }>;
                                };
                                gallery?: {
                                    imageList?: Array<{
                                        fileToken?: string;
                                        src?: string;
                                        width?: number;
                                        height?: number;
                                    }>;
                                };
                            }>;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { progress_id: string };
                },
                options?: IRequestOptions
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
                                progress_id?: string;
                                modify_time?: string;
                                content?: {
                                    blocks?: Array<{
                                        type?: "paragraph" | "gallery";
                                        paragraph?: {
                                            style?: {
                                                list?: {
                                                    type?:
                                                        | "number"
                                                        | "bullet"
                                                        | "checkBox"
                                                        | "checkedBox"
                                                        | "indent";
                                                    indentLevel?: number;
                                                    number?: number;
                                                };
                                            };
                                            elements?: Array<{
                                                type?:
                                                    | "textRun"
                                                    | "docsLink"
                                                    | "person";
                                                textRun?: {
                                                    text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        strikeThrough?: boolean;
                                                        backColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        textColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        link?: { url?: string };
                                                    };
                                                };
                                                docsLink?: {
                                                    url?: string;
                                                    title?: string;
                                                };
                                                person?: { openId?: string };
                                            }>;
                                        };
                                        gallery?: {
                                            imageList?: Array<{
                                                fileToken?: string;
                                                src?: string;
                                                width?: number;
                                                height?: number;
                                            }>;
                                        };
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
         * 用户OKR
         */
        userOkr: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=user.okr&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/user-okr/list document }
             *
             * 获取用户的OKR列表
             *
             * 根据用户的id获取OKR列表
             *
             * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
             */
            list: async (
                payload?: {
                    params: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        offset: string;
                        limit: string;
                        lang?: string;
                        period_ids?: number;
                    };
                    path?: { user_id?: string };
                },
                options?: IRequestOptions
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
                                okr_list?: Array<{
                                    id?: string;
                                    permission?: number;
                                    period_id?: string;
                                    name?: string;
                                    objective_list?: Array<{
                                        id?: string;
                                        permission?: number;
                                        content?: string;
                                        progress_report?: string;
                                        score?: number;
                                        weight?: number;
                                        progress_rate?: {
                                            percent?: number;
                                            status?: string;
                                        };
                                        kr_list?: Array<{
                                            id?: string;
                                            content?: string;
                                            score?: number;
                                            weight?: number;
                                            kr_weight?: number;
                                            progress_rate?: {
                                                percent?: number;
                                                status?: string;
                                            };
                                            progress_record_list?: Array<{
                                                id?: string;
                                            }>;
                                            progress_rate_percent_last_updated_time?: string;
                                            progress_rate_status_last_updated_time?: string;
                                            progress_record_last_updated_time?: string;
                                            progress_report_last_updated_time?: string;
                                            score_last_updated_time?: string;
                                            deadline?: string;
                                            mentioned_user_list?: Array<{
                                                open_id?: string;
                                                user_id?: string;
                                            }>;
                                        }>;
                                        aligned_objective_list?: Array<{
                                            id?: string;
                                            okr_id?: string;
                                            owner?: {
                                                open_id?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                        aligning_objective_list?: Array<{
                                            id?: string;
                                            okr_id?: string;
                                            owner?: {
                                                open_id?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                        progress_record_list?: Array<{
                                            id?: string;
                                        }>;
                                        progress_rate_percent_last_updated_time?: string;
                                        progress_rate_status_last_updated_time?: string;
                                        progress_record_last_updated_time?: string;
                                        progress_report_last_updated_time?: string;
                                        score_last_updated_time?: string;
                                        deadline?: string;
                                        mentioned_user_list?: Array<{
                                            open_id?: string;
                                            user_id?: string;
                                        }>;
                                    }>;
                                    confirm_status?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/users/:user_id/okrs`,
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
        v1: {
            /**
             * 图片
             */
            image: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=image&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/image/upload document }
                 *
                 * 上传图片
                 *
                 * 上传图片
                 */
                upload: async (
                    payload?: {
                        data: {
                            data: Buffer | fs.ReadStream;
                            target_id: string;
                            target_type: number;
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
                                data?: { file_token?: string; url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/images/upload`,
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
            },
            /**
             * OKR
             */
            okr: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr&apiName=batch_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/okr/batch_get document }
                 *
                 * 批量获取OKR
                 *
                 * 根据OKR id批量获取OKR
                 *
                 * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
                 */
                batchGet: async (
                    payload?: {
                        params: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            okr_ids: number;
                            lang?: string;
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
                                    okr_list?: Array<{
                                        id?: string;
                                        permission?: number;
                                        period_id?: string;
                                        name?: string;
                                        objective_list?: Array<{
                                            id?: string;
                                            permission?: number;
                                            content?: string;
                                            progress_report?: string;
                                            score?: number;
                                            weight?: number;
                                            progress_rate?: {
                                                percent?: number;
                                                status?: string;
                                            };
                                            kr_list?: Array<{
                                                id?: string;
                                                content?: string;
                                                score?: number;
                                                weight?: number;
                                                kr_weight?: number;
                                                progress_rate?: {
                                                    percent?: number;
                                                    status?: string;
                                                };
                                                progress_record_list?: Array<{
                                                    id?: string;
                                                }>;
                                                progress_rate_percent_last_updated_time?: string;
                                                progress_rate_status_last_updated_time?: string;
                                                progress_record_last_updated_time?: string;
                                                progress_report_last_updated_time?: string;
                                                score_last_updated_time?: string;
                                                deadline?: string;
                                                mentioned_user_list?: Array<{
                                                    open_id?: string;
                                                    user_id?: string;
                                                }>;
                                            }>;
                                            aligned_objective_list?: Array<{
                                                id?: string;
                                                okr_id?: string;
                                                owner?: {
                                                    open_id?: string;
                                                    user_id?: string;
                                                };
                                            }>;
                                            aligning_objective_list?: Array<{
                                                id?: string;
                                                okr_id?: string;
                                                owner?: {
                                                    open_id?: string;
                                                    user_id?: string;
                                                };
                                            }>;
                                            progress_record_list?: Array<{
                                                id?: string;
                                            }>;
                                            progress_rate_percent_last_updated_time?: string;
                                            progress_rate_status_last_updated_time?: string;
                                            progress_record_last_updated_time?: string;
                                            progress_report_last_updated_time?: string;
                                            score_last_updated_time?: string;
                                            deadline?: string;
                                            mentioned_user_list?: Array<{
                                                open_id?: string;
                                                user_id?: string;
                                            }>;
                                        }>;
                                        confirm_status?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/okrs/batch_get`,
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
             * OKR周期
             */
            period: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/list document }
                 *
                 * 获取OKR周期列表
                 *
                 * 获取OKR周期列表
                 *
                 * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
                 */
                list: async (
                    payload?: {
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
                                    page_token?: string;
                                    has_more?: boolean;
                                    items?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        status?: number;
                                        period_start_time?: string;
                                        period_end_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/periods`,
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
             * OKR进展记录
             */
            progressRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/create document }
                 *
                 * 创建OKR进展记录
                 *
                 * 创建OKR进展记录
                 */
                create: async (
                    payload?: {
                        data: {
                            source_title: string;
                            source_url: string;
                            target_id: string;
                            target_type: number;
                            content: {
                                blocks?: Array<{
                                    type?: "paragraph" | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indentLevel?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "person";
                                            textRun?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strikeThrough?: boolean;
                                                    backColor?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    textColor?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docsLink?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            person?: { openId?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        imageList?: Array<{
                                            fileToken?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            source_url_pc?: string;
                            source_url_mobile?: string;
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
                                    progress_id?: string;
                                    modify_time?: string;
                                    content?: {
                                        blocks?: Array<{
                                            type?: "paragraph" | "gallery";
                                            paragraph?: {
                                                style?: {
                                                    list?: {
                                                        type?:
                                                            | "number"
                                                            | "bullet"
                                                            | "checkBox"
                                                            | "checkedBox"
                                                            | "indent";
                                                        indentLevel?: number;
                                                        number?: number;
                                                    };
                                                };
                                                elements?: Array<{
                                                    type?:
                                                        | "textRun"
                                                        | "docsLink"
                                                        | "person";
                                                    textRun?: {
                                                        text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            strikeThrough?: boolean;
                                                            backColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            textColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            link?: {
                                                                url?: string;
                                                            };
                                                        };
                                                    };
                                                    docsLink?: {
                                                        url?: string;
                                                        title?: string;
                                                    };
                                                    person?: {
                                                        openId?: string;
                                                    };
                                                }>;
                                            };
                                            gallery?: {
                                                imageList?: Array<{
                                                    fileToken?: string;
                                                    src?: string;
                                                    width?: number;
                                                    height?: number;
                                                }>;
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/progress_records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/delete document }
                 *
                 * 删除OKR进展记录
                 *
                 * 根据ID删除OKR进展记录
                 */
                delete: async (
                    payload?: {
                        path: { progress_id: string };
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
                                `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/get document }
                 *
                 * 获取OKR进展记录
                 *
                 * 根据ID获取OKR进展记录详情
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { progress_id?: string };
                    },
                    options?: IRequestOptions
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
                                    progress_id?: string;
                                    modify_time?: string;
                                    content?: {
                                        blocks?: Array<{
                                            type?: "paragraph" | "gallery";
                                            paragraph?: {
                                                style?: {
                                                    list?: {
                                                        type?:
                                                            | "number"
                                                            | "bullet"
                                                            | "checkBox"
                                                            | "checkedBox"
                                                            | "indent";
                                                        indentLevel?: number;
                                                        number?: number;
                                                    };
                                                };
                                                elements?: Array<{
                                                    type?:
                                                        | "textRun"
                                                        | "docsLink"
                                                        | "person";
                                                    textRun?: {
                                                        text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            strikeThrough?: boolean;
                                                            backColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            textColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            link?: {
                                                                url?: string;
                                                            };
                                                        };
                                                    };
                                                    docsLink?: {
                                                        url?: string;
                                                        title?: string;
                                                    };
                                                    person?: {
                                                        openId?: string;
                                                    };
                                                }>;
                                            };
                                            gallery?: {
                                                imageList?: Array<{
                                                    fileToken?: string;
                                                    src?: string;
                                                    width?: number;
                                                    height?: number;
                                                }>;
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/update document }
                 *
                 * 更新OKR进展记录
                 *
                 * 根据OKR进展记录ID更新进展详情
                 */
                update: async (
                    payload?: {
                        data: {
                            content: {
                                blocks?: Array<{
                                    type?: "paragraph" | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indentLevel?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "person";
                                            textRun?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strikeThrough?: boolean;
                                                    backColor?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    textColor?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docsLink?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            person?: { openId?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        imageList?: Array<{
                                            fileToken?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { progress_id: string };
                    },
                    options?: IRequestOptions
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
                                    progress_id?: string;
                                    modify_time?: string;
                                    content?: {
                                        blocks?: Array<{
                                            type?: "paragraph" | "gallery";
                                            paragraph?: {
                                                style?: {
                                                    list?: {
                                                        type?:
                                                            | "number"
                                                            | "bullet"
                                                            | "checkBox"
                                                            | "checkedBox"
                                                            | "indent";
                                                        indentLevel?: number;
                                                        number?: number;
                                                    };
                                                };
                                                elements?: Array<{
                                                    type?:
                                                        | "textRun"
                                                        | "docsLink"
                                                        | "person";
                                                    textRun?: {
                                                        text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            strikeThrough?: boolean;
                                                            backColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            textColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            link?: {
                                                                url?: string;
                                                            };
                                                        };
                                                    };
                                                    docsLink?: {
                                                        url?: string;
                                                        title?: string;
                                                    };
                                                    person?: {
                                                        openId?: string;
                                                    };
                                                }>;
                                            };
                                            gallery?: {
                                                imageList?: Array<{
                                                    fileToken?: string;
                                                    src?: string;
                                                    width?: number;
                                                    height?: number;
                                                }>;
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
             * 用户OKR
             */
            userOkr: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=user.okr&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/user-okr/list document }
                 *
                 * 获取用户的OKR列表
                 *
                 * 根据用户的id获取OKR列表
                 *
                 * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
                 */
                list: async (
                    payload?: {
                        params: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            offset: string;
                            limit: string;
                            lang?: string;
                            period_ids?: number;
                        };
                        path?: { user_id?: string };
                    },
                    options?: IRequestOptions
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
                                    okr_list?: Array<{
                                        id?: string;
                                        permission?: number;
                                        period_id?: string;
                                        name?: string;
                                        objective_list?: Array<{
                                            id?: string;
                                            permission?: number;
                                            content?: string;
                                            progress_report?: string;
                                            score?: number;
                                            weight?: number;
                                            progress_rate?: {
                                                percent?: number;
                                                status?: string;
                                            };
                                            kr_list?: Array<{
                                                id?: string;
                                                content?: string;
                                                score?: number;
                                                weight?: number;
                                                kr_weight?: number;
                                                progress_rate?: {
                                                    percent?: number;
                                                    status?: string;
                                                };
                                                progress_record_list?: Array<{
                                                    id?: string;
                                                }>;
                                                progress_rate_percent_last_updated_time?: string;
                                                progress_rate_status_last_updated_time?: string;
                                                progress_record_last_updated_time?: string;
                                                progress_report_last_updated_time?: string;
                                                score_last_updated_time?: string;
                                                deadline?: string;
                                                mentioned_user_list?: Array<{
                                                    open_id?: string;
                                                    user_id?: string;
                                                }>;
                                            }>;
                                            aligned_objective_list?: Array<{
                                                id?: string;
                                                okr_id?: string;
                                                owner?: {
                                                    open_id?: string;
                                                    user_id?: string;
                                                };
                                            }>;
                                            aligning_objective_list?: Array<{
                                                id?: string;
                                                okr_id?: string;
                                                owner?: {
                                                    open_id?: string;
                                                    user_id?: string;
                                                };
                                            }>;
                                            progress_record_list?: Array<{
                                                id?: string;
                                            }>;
                                            progress_rate_percent_last_updated_time?: string;
                                            progress_rate_status_last_updated_time?: string;
                                            progress_record_last_updated_time?: string;
                                            progress_report_last_updated_time?: string;
                                            score_last_updated_time?: string;
                                            deadline?: string;
                                            mentioned_user_list?: Array<{
                                                open_id?: string;
                                                user_id?: string;
                                            }>;
                                        }>;
                                        confirm_status?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/users/:user_id/okrs`,
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
        },
    };
}
