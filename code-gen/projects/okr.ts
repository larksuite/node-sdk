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
import { Readable } from "stream";
import { stringify } from "qs";
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
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
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
    };
}
