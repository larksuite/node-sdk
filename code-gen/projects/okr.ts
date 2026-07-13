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
import myai from "./myai";

// auto gen
export default abstract class Client extends myai {
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
                        okr_ids: Array<string>;
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
         * OKR周期
         */
        period: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/create document }
             *
             * 创建 OKR 周期
             *
             * 根据周期规则创建一个 OKR 周期
             */
            create: async (
                payload?: {
                    data: { period_rule_id: string; start_month: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                period_id?: string;
                                start_month?: string;
                                end_month?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/periods`,
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/patch document }
             *
             * 修改 OKR 周期状态
             *
             * 修改某个 OKR 周期的状态为「正常」、「失效」或「隐藏」，对租户所有人生效，请谨慎操作
             */
            patch: async (
                payload?: {
                    data: { status: number };
                    path: { period_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { period_id?: string; status?: number };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/periods/:period_id`,
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
         * 周期规则
         */
        periodRule: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period_rule&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period_rule/list document }
             *
             * 获取 OKR 周期规则
             *
             * 获取租户的周期规则列表
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
                                period_rules?: Array<{
                                    period_rule_id?: string;
                                    type?: string;
                                    length?: number;
                                    first_month?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/period_rules`,
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
                        progress_rate?: { percent?: number; status?: number };
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
                                progress_rate?: {
                                    percent?: number;
                                    status?: number;
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
                                progress_rate?: {
                                    percent?: number;
                                    status?: number;
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
                        progress_rate?: { percent?: number; status?: number };
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
                                progress_rate?: {
                                    percent?: number;
                                    status?: number;
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
         * 复盘（灰度租户可见）
         */
        review: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=review&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/review/query document }
             *
             * 查询复盘信息
             *
             * 根据周期和用户查询复盘信息。
             */
            query: async (
                payload?: {
                    params: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        user_ids: Array<string>;
                        period_ids: Array<string>;
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
                                review_list?: Array<{
                                    user_id?: {
                                        open_id?: string;
                                        user_id?: string;
                                    };
                                    review_period_list?: Array<{
                                        period_id?: string;
                                        cycle_review_list?: Array<{
                                            url?: string;
                                            create_time?: string;
                                        }>;
                                        progress_report_list?: Array<{
                                            url?: string;
                                            create_time?: string;
                                        }>;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/reviews/query`,
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
                        period_ids?: Array<string>;
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
                            okr_ids: Array<string>;
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
             * OKR周期
             */
            period: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/create document }
                 *
                 * 创建 OKR 周期
                 *
                 * 根据周期规则创建一个 OKR 周期
                 */
                create: async (
                    payload?: {
                        data: { period_rule_id: string; start_month: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    period_id?: string;
                                    start_month?: string;
                                    end_month?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/periods`,
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/patch document }
                 *
                 * 修改 OKR 周期状态
                 *
                 * 修改某个 OKR 周期的状态为「正常」、「失效」或「隐藏」，对租户所有人生效，请谨慎操作
                 */
                patch: async (
                    payload?: {
                        data: { status: number };
                        path: { period_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { period_id?: string; status?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/periods/:period_id`,
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
             * 周期规则
             */
            periodRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period_rule&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period_rule/list document }
                 *
                 * 获取 OKR 周期规则
                 *
                 * 获取租户的周期规则列表
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
                                    period_rules?: Array<{
                                        period_rule_id?: string;
                                        type?: string;
                                        length?: number;
                                        first_month?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/period_rules`,
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
                            progress_rate?: {
                                percent?: number;
                                status?: number;
                            };
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
                                    progress_rate?: {
                                        percent?: number;
                                        status?: number;
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                    progress_rate?: {
                                        percent?: number;
                                        status?: number;
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
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                            progress_rate?: {
                                percent?: number;
                                status?: number;
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
                                    progress_rate?: {
                                        percent?: number;
                                        status?: number;
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
             * 复盘（灰度租户可见）
             */
            review: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=review&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/review/query document }
                 *
                 * 查询复盘信息
                 *
                 * 根据周期和用户查询复盘信息。
                 */
                query: async (
                    payload?: {
                        params: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            user_ids: Array<string>;
                            period_ids: Array<string>;
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
                                    review_list?: Array<{
                                        user_id?: {
                                            open_id?: string;
                                            user_id?: string;
                                        };
                                        review_period_list?: Array<{
                                            period_id?: string;
                                            cycle_review_list?: Array<{
                                                url?: string;
                                                create_time?: string;
                                            }>;
                                            progress_report_list?: Array<{
                                                url?: string;
                                                create_time?: string;
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/reviews/query`,
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
                            period_ids?: Array<string>;
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
             * okr.alignment
             */
            okrAlignment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.alignment&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=okr&resource=okr.alignment&version=v2 document }
                 *
                 * 删除对齐关系
                 */
                delete: async (
                    payload?: {
                        path: { alignment_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { alignment_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/alignments/:alignment_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.alignment&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=okr&resource=okr.alignment&version=v2 document }
                 *
                 * 获取对齐关系
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { alignment_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    alignment?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        from_owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        to_owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        from_entity_type: number;
                                        from_entity_id: string;
                                        to_entity_type: number;
                                        to_entity_id: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/alignments/:alignment_id`,
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
             * okr.category
             */
            okrCategory: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            owner_type?: "user" | "department";
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
                                    `${this.domain}/open-apis/okr/v2/categories`,
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
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        category_type:
                                                            | "person"
                                                            | "team";
                                                        enabled: boolean;
                                                        color:
                                                            | "blue"
                                                            | "purple"
                                                            | "wathet"
                                                            | "turquoise"
                                                            | "indigo"
                                                            | "orange";
                                                        name: {
                                                            zh?: string;
                                                            en?: string;
                                                            ja?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.category&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.category&version=v2 document }
                 *
                 * 批量获取分类
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            owner_type?: "user" | "department";
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        category_type: "person" | "team";
                                        enabled: boolean;
                                        color:
                                            | "blue"
                                            | "purple"
                                            | "wathet"
                                            | "turquoise"
                                            | "indigo"
                                            | "orange";
                                        name: {
                                            zh?: string;
                                            en?: string;
                                            ja?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/categories`,
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
             * okr.cycle
             */
            okrCycle: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            user_id: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/okr/v2/cycles`,
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
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        tenant_cycle_id: string;
                                                        owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        start_time: string;
                                                        end_time: string;
                                                        cycle_status?: number;
                                                        score?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.cycle&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.cycle&version=v2 document }
                 *
                 * 批量获取用户周期
                 */
                list: async (
                    payload?: {
                        params: {
                            user_id: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        tenant_cycle_id: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        start_time: string;
                                        end_time: string;
                                        cycle_status?: number;
                                        score?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/cycles`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.cycle&apiName=objectives_position&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=objectives_position&project=okr&resource=okr.cycle&version=v2 document }
                 *
                 * 更新用户周期下全部目标的位置
                 */
                objectivesPosition: async (
                    payload?: {
                        data: { objective_ids: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { cycle_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        cycle_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        notes?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        weight?: number;
                                        deadline?: string;
                                        category_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/cycles/:cycle_id/objectives_position`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.cycle&apiName=objectives_weight&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=objectives_weight&project=okr&resource=okr.cycle&version=v2 document }
                 *
                 * 更新用户周期下全部目标的权重
                 */
                objectivesWeight: async (
                    payload?: {
                        data: {
                            objective_weights: Array<{
                                objective_id: string;
                                weight: number;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { cycle_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        cycle_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        notes?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        weight?: number;
                                        deadline?: string;
                                        category_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/cycles/:cycle_id/objectives_weight`,
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
             * okr.cycle.objective
             */
            okrCycleObjective: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.cycle.objective&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=okr.cycle.objective&version=v2 document }
                 *
                 * 创建目标
                 */
                create: async (
                    payload?: {
                        data?: {
                            content?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            notes?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            deadline?: string;
                            weight?: number;
                            category_id?: string;
                            score?: number;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { cycle_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { objective_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/cycles/:cycle_id/objectives`,
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
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { cycle_id: string };
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
                                    `${this.domain}/open-apis/okr/v2/cycles/:cycle_id/objectives`,
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
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        cycle_id: string;
                                                        position: number;
                                                        content?: {
                                                            blocks?: Array<{
                                                                block_element_type?:
                                                                    | "paragraph"
                                                                    | "gallery";
                                                                paragraph?: {
                                                                    style?: {
                                                                        list?: {
                                                                            list_type?:
                                                                                | "number"
                                                                                | "bullet"
                                                                                | "checkBox"
                                                                                | "checkedBox"
                                                                                | "indent";
                                                                            indent_level?: number;
                                                                            number?: number;
                                                                        };
                                                                    };
                                                                    elements?: Array<{
                                                                        paragraph_element_type?:
                                                                            | "textRun"
                                                                            | "docsLink"
                                                                            | "mention";
                                                                        text_run?: {
                                                                            text?: string;
                                                                            style?: {
                                                                                bold?: boolean;
                                                                                strike_through?: boolean;
                                                                                back_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                text_color?: {
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
                                                                        docs_link?: {
                                                                            url?: string;
                                                                            title?: string;
                                                                        };
                                                                        mention?: {
                                                                            user_id?: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                gallery?: {
                                                                    images?: Array<{
                                                                        file_token?: string;
                                                                        src?: string;
                                                                        width?: number;
                                                                        height?: number;
                                                                    }>;
                                                                };
                                                            }>;
                                                        };
                                                        score?: number;
                                                        notes?: {
                                                            blocks?: Array<{
                                                                block_element_type?:
                                                                    | "paragraph"
                                                                    | "gallery";
                                                                paragraph?: {
                                                                    style?: {
                                                                        list?: {
                                                                            list_type?:
                                                                                | "number"
                                                                                | "bullet"
                                                                                | "checkBox"
                                                                                | "checkedBox"
                                                                                | "indent";
                                                                            indent_level?: number;
                                                                            number?: number;
                                                                        };
                                                                    };
                                                                    elements?: Array<{
                                                                        paragraph_element_type?:
                                                                            | "textRun"
                                                                            | "docsLink"
                                                                            | "mention";
                                                                        text_run?: {
                                                                            text?: string;
                                                                            style?: {
                                                                                bold?: boolean;
                                                                                strike_through?: boolean;
                                                                                back_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                text_color?: {
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
                                                                        docs_link?: {
                                                                            url?: string;
                                                                            title?: string;
                                                                        };
                                                                        mention?: {
                                                                            user_id?: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                gallery?: {
                                                                    images?: Array<{
                                                                        file_token?: string;
                                                                        src?: string;
                                                                        width?: number;
                                                                        height?: number;
                                                                    }>;
                                                                };
                                                            }>;
                                                        };
                                                        weight?: number;
                                                        deadline?: string;
                                                        category_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.cycle.objective&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.cycle.objective&version=v2 document }
                 *
                 * 批量获取用户周期下的目标
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { cycle_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        cycle_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        notes?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        weight?: number;
                                        deadline?: string;
                                        category_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/cycles/:cycle_id/objectives`,
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
             * okr.indicator
             */
            okrIndicator: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.indicator&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=okr&resource=okr.indicator&version=v2 document }
                 *
                 * 更新指标
                 */
                patch: async (
                    payload?: {
                        data?: {
                            current_value_calculate_type?: number;
                            status_calculate_type?: number;
                            start_value?: number;
                            target_value?: number;
                            current_value?: number;
                            unit?: { unit_type: number; unit_value: string };
                            indicator_status?: number;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { indicator_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    indicator?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        entity_type: number;
                                        entity_id: string;
                                        indicator_status: number;
                                        status_calculate_type: number;
                                        start_value?: number;
                                        target_value?: number;
                                        current_value?: number;
                                        current_value_calculate_type?: number;
                                        unit?: {
                                            unit_type: number;
                                            unit_value: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/indicators/:indicator_id`,
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
             * okr.key_result
             */
            okrKeyResult: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.key_result&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=okr&resource=okr.key_result&version=v2 document }
                 *
                 * 删除关键结果
                 */
                delete: async (
                    payload?: {
                        path: { key_result_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { key_result_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/key_results/:key_result_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.key_result&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=okr&resource=okr.key_result&version=v2 document }
                 *
                 * 获取关键结果
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { key_result_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    key_result?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        objective_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        weight?: number;
                                        deadline?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/key_results/:key_result_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.key_result&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=okr&resource=okr.key_result&version=v2 document }
                 *
                 * 更新关键结果
                 */
                patch: async (
                    payload?: {
                        data?: {
                            content?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            score?: number;
                            deadline?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { key_result_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    key_result?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        objective_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        weight?: number;
                                        deadline?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/key_results/:key_result_id`,
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
             * okr.key_result.indicator
             */
            okrKeyResultIndicator: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.key_result.indicator&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.key_result.indicator&version=v2 document }
                 *
                 * 获取关键结果的指标
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { key_result_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    indicator?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        entity_type: number;
                                        entity_id: string;
                                        indicator_status: number;
                                        status_calculate_type: number;
                                        start_value?: number;
                                        target_value?: number;
                                        current_value?: number;
                                        current_value_calculate_type?: number;
                                        unit?: {
                                            unit_type: number;
                                            unit_value: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/key_results/:key_result_id/indicators`,
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
             * okr.key_result.progress
             */
            okrKeyResultProgress: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { key_result_id: string };
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
                                    `${this.domain}/open-apis/okr/v2/key_results/:key_result_id/progresses`,
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
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        entity_type: number;
                                                        entity_id: string;
                                                        content?: {
                                                            blocks?: Array<{
                                                                block_element_type?:
                                                                    | "paragraph"
                                                                    | "gallery";
                                                                paragraph?: {
                                                                    style?: {
                                                                        list?: {
                                                                            list_type?:
                                                                                | "number"
                                                                                | "bullet"
                                                                                | "checkBox"
                                                                                | "checkedBox"
                                                                                | "indent";
                                                                            indent_level?: number;
                                                                            number?: number;
                                                                        };
                                                                    };
                                                                    elements?: Array<{
                                                                        paragraph_element_type?:
                                                                            | "textRun"
                                                                            | "docsLink"
                                                                            | "mention";
                                                                        text_run?: {
                                                                            text?: string;
                                                                            style?: {
                                                                                bold?: boolean;
                                                                                strike_through?: boolean;
                                                                                back_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                text_color?: {
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
                                                                        docs_link?: {
                                                                            url?: string;
                                                                            title?: string;
                                                                        };
                                                                        mention?: {
                                                                            user_id?: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                gallery?: {
                                                                    images?: Array<{
                                                                        file_token?: string;
                                                                        src?: string;
                                                                        width?: number;
                                                                        height?: number;
                                                                    }>;
                                                                };
                                                            }>;
                                                        };
                                                        progress_rate?: {
                                                            progress_percent?: number;
                                                            progress_status?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.key_result.progress&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.key_result.progress&version=v2 document }
                 *
                 * 批量获取关键结果下的进展
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { key_result_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        entity_type: number;
                                        entity_id: string;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        progress_rate?: {
                                            progress_percent?: number;
                                            progress_status?: number;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/key_results/:key_result_id/progresses`,
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
             * okr.objective.alignment
             */
            okrObjectiveAlignment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.alignment&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=okr.objective.alignment&version=v2 document }
                 *
                 * 创建对齐关系
                 */
                create: async (
                    payload?: {
                        data: { to_entity_type: number; to_entity_id: string };
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { alignment_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/alignments`,
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
                            align_type?: "aligned" | "aligning";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    `${this.domain}/open-apis/okr/v2/objectives/:objective_id/alignments`,
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
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        from_owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        to_owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        from_entity_type: number;
                                                        from_entity_id: string;
                                                        to_entity_type: number;
                                                        to_entity_id: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.alignment&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.objective.alignment&version=v2 document }
                 *
                 * 批量获取目标下的对齐关系
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            align_type?: "aligned" | "aligning";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        from_owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        to_owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        from_entity_type: number;
                                        from_entity_id: string;
                                        to_entity_type: number;
                                        to_entity_id: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/alignments`,
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
             * okr.objective
             */
            okrObjective: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=okr&resource=okr.objective&version=v2 document }
                 *
                 * 删除目标
                 */
                delete: async (
                    payload?: {
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { objective_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=okr&resource=okr.objective&version=v2 document }
                 *
                 * 获取目标
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    objective?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        cycle_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        notes?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        weight?: number;
                                        deadline?: string;
                                        category_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective&apiName=key_results_position&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=key_results_position&project=okr&resource=okr.objective&version=v2 document }
                 *
                 * 更新全部关键结果的位置
                 */
                keyResultsPosition: async (
                    payload?: {
                        data: { key_result_ids: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        objective_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        weight?: number;
                                        deadline?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/key_results_position`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective&apiName=key_results_weight&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=key_results_weight&project=okr&resource=okr.objective&version=v2 document }
                 *
                 * 更新全部关键结果的权重
                 */
                keyResultsWeight: async (
                    payload?: {
                        data: {
                            key_result_weights: Array<{
                                key_result_id: string;
                                weight: number;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        objective_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        weight?: number;
                                        deadline?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/key_results_weight`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=okr&resource=okr.objective&version=v2 document }
                 *
                 * 更新目标
                 */
                patch: async (
                    payload?: {
                        data?: {
                            content?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            score?: number;
                            notes?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            deadline?: string;
                            category_id?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    objective?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        cycle_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        notes?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        weight?: number;
                                        deadline?: string;
                                        category_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id`,
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
             * okr.objective.indicator
             */
            okrObjectiveIndicator: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.indicator&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.objective.indicator&version=v2 document }
                 *
                 * 获取目标的指标
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    indicator?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        entity_type: number;
                                        entity_id: string;
                                        indicator_status: number;
                                        status_calculate_type: number;
                                        start_value?: number;
                                        target_value?: number;
                                        current_value?: number;
                                        current_value_calculate_type?: number;
                                        unit?: {
                                            unit_type: number;
                                            unit_value: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/indicators`,
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
             * okr.objective.key_result
             */
            okrObjectiveKeyResult: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.key_result&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=okr.objective.key_result&version=v2 document }
                 *
                 * 创建关键结果
                 */
                create: async (
                    payload?: {
                        data?: {
                            content?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            deadline?: string;
                            score?: number;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { key_result_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/key_results`,
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
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    `${this.domain}/open-apis/okr/v2/objectives/:objective_id/key_results`,
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
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        objective_id: string;
                                                        position: number;
                                                        content?: {
                                                            blocks?: Array<{
                                                                block_element_type?:
                                                                    | "paragraph"
                                                                    | "gallery";
                                                                paragraph?: {
                                                                    style?: {
                                                                        list?: {
                                                                            list_type?:
                                                                                | "number"
                                                                                | "bullet"
                                                                                | "checkBox"
                                                                                | "checkedBox"
                                                                                | "indent";
                                                                            indent_level?: number;
                                                                            number?: number;
                                                                        };
                                                                    };
                                                                    elements?: Array<{
                                                                        paragraph_element_type?:
                                                                            | "textRun"
                                                                            | "docsLink"
                                                                            | "mention";
                                                                        text_run?: {
                                                                            text?: string;
                                                                            style?: {
                                                                                bold?: boolean;
                                                                                strike_through?: boolean;
                                                                                back_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                text_color?: {
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
                                                                        docs_link?: {
                                                                            url?: string;
                                                                            title?: string;
                                                                        };
                                                                        mention?: {
                                                                            user_id?: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                gallery?: {
                                                                    images?: Array<{
                                                                        file_token?: string;
                                                                        src?: string;
                                                                        width?: number;
                                                                        height?: number;
                                                                    }>;
                                                                };
                                                            }>;
                                                        };
                                                        score?: number;
                                                        weight?: number;
                                                        deadline?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.key_result&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.objective.key_result&version=v2 document }
                 *
                 * 批量获取目标下的关键结果
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        objective_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        weight?: number;
                                        deadline?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/key_results`,
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
             * okr.objective.progress
             */
            okrObjectiveProgress: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    `${this.domain}/open-apis/okr/v2/objectives/:objective_id/progresses`,
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
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        entity_type: number;
                                                        entity_id: string;
                                                        content?: {
                                                            blocks?: Array<{
                                                                block_element_type?:
                                                                    | "paragraph"
                                                                    | "gallery";
                                                                paragraph?: {
                                                                    style?: {
                                                                        list?: {
                                                                            list_type?:
                                                                                | "number"
                                                                                | "bullet"
                                                                                | "checkBox"
                                                                                | "checkedBox"
                                                                                | "indent";
                                                                            indent_level?: number;
                                                                            number?: number;
                                                                        };
                                                                    };
                                                                    elements?: Array<{
                                                                        paragraph_element_type?:
                                                                            | "textRun"
                                                                            | "docsLink"
                                                                            | "mention";
                                                                        text_run?: {
                                                                            text?: string;
                                                                            style?: {
                                                                                bold?: boolean;
                                                                                strike_through?: boolean;
                                                                                back_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                text_color?: {
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
                                                                        docs_link?: {
                                                                            url?: string;
                                                                            title?: string;
                                                                        };
                                                                        mention?: {
                                                                            user_id?: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                gallery?: {
                                                                    images?: Array<{
                                                                        file_token?: string;
                                                                        src?: string;
                                                                        width?: number;
                                                                        height?: number;
                                                                    }>;
                                                                };
                                                            }>;
                                                        };
                                                        progress_rate?: {
                                                            progress_percent?: number;
                                                            progress_status?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.progress&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.objective.progress&version=v2 document }
                 *
                 * 批量获取目标下的进展
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        entity_type: number;
                                        entity_id: string;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
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
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        progress_rate?: {
                                            progress_percent?: number;
                                            progress_status?: number;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/progresses`,
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
