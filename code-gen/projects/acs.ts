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

// auto gen
export default abstract class Client {
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
     * 智能门禁
     */
    acs = {
        /**
         * access_record.access_photo
         */
        accessRecordAccessPhoto: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=access_record.access_photo&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record-access_photo/get document }
             *
             * 下载开门时的人脸识别图片
             *
             * 用户在门禁考勤机上成功开门或打卡后，智能门禁应用都会生成一条门禁记录，对于使用人脸识别方式进行开门的识别记录，还会有抓拍图。;;可以用该接口下载开门时的人脸识别照片。
             */
            get: async (
                payload?: {
                    path?: { access_record_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/access_records/:access_record_id/access_photo`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                return {
                    writeFile: async (filePath: string) => {
                        return new Promise((resolve, reject) => {
                            const writableStream =
                                fs.createWriteStream(filePath);
                            writableStream.on("finish", () => {
                                resolve(filePath);
                            });
                            writableStream.on("error", (e) => {
                                reject(e);
                            });
                            res.pipe(writableStream);
                        });
                    },
                };
            },
        },
        /**
         * 门禁记录
         */
        accessRecord: {
            listWithIterator: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        from: number;
                        to: number;
                        device_id?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/acs/v1/access_records`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    access_record_id?: string;
                                                    user_id?: string;
                                                    device_id?: string;
                                                    is_clock_in?: boolean;
                                                    access_time?: string;
                                                    access_type?:
                                                        | "FA"
                                                        | "QRCode"
                                                        | "Card"
                                                        | "Fp";
                                                    access_data?: string;
                                                    is_door_open?: boolean;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=access_record&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record/list document }
             *
             * 获取门禁记录列表
             *
             * 用户在门禁考勤机上成功开门或打卡后，智能门禁应用都会生成一条门禁记录。;;该接口返回满足查询参数的识别记录。
             */
            list: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        from: number;
                        to: number;
                        device_id?: string;
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
                                items?: Array<{
                                    access_record_id?: string;
                                    user_id?: string;
                                    device_id?: string;
                                    is_clock_in?: boolean;
                                    access_time?: string;
                                    access_type?:
                                        | "FA"
                                        | "QRCode"
                                        | "Card"
                                        | "Fp";
                                    access_data?: string;
                                    is_door_open?: boolean;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/access_records`,
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
         * 门禁设备
         */
        device: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=device&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/device/list document }
             *
             * 获取门禁设备列表
             *
             * 使用该接口获取租户内所有门禁设备。
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
                                items?: Array<{
                                    device_id?: string;
                                    device_name?: string;
                                    device_sn?: string;
                                    property?: {
                                        version?: string;
                                        current_device_face_count?: number;
                                        max_face_capacity?: number;
                                        online_status?: number;
                                        device_name?: string;
                                        is_clock_in?: boolean;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/devices`,
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
         * rule_external
         */
        ruleExternal: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=rule_external&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=acs&resource=rule_external&version=v1 document }
             */
            create: async (
                payload?: {
                    data: {
                        rule: {
                            id?: string;
                            name?: string;
                            devices?: Array<{ id?: string; name?: string }>;
                            user_count?: string;
                            users?: Array<{
                                user_type: number;
                                user_id?: string;
                                user_name?: string;
                                phone_num?: string;
                                department_id?: string;
                            }>;
                            visitor_count?: string;
                            visitors?: Array<{
                                user_type: number;
                                user_id?: string;
                                user_name?: string;
                                phone_num?: string;
                                department_id?: string;
                            }>;
                            remind_face?: boolean;
                            opening_time?: {
                                valid_day?: {
                                    start_day: number;
                                    end_day: number;
                                };
                                weekdays?: Array<number>;
                                day_times?: Array<{
                                    start_hhmm: number;
                                    end_hhmm: number;
                                }>;
                            };
                            is_temp?: boolean;
                        };
                    };
                    params?: {
                        rule_id?: string;
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
                            data?: { rule_id: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/rule_external`,
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
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=rule_external&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=acs&resource=rule_external&version=v1 document }
             */
            delete: async (
                payload?: {
                    params: { rule_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/rule_external`,
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
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=rule_external&apiName=device_bind&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=device_bind&project=acs&resource=rule_external&version=v1 document }
             */
            deviceBind: async (
                payload?: {
                    data: { device_id: string; rule_ids: Array<string> };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/rule_external/device_bind`,
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
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=rule_external&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=acs&resource=rule_external&version=v1 document }
             */
            get: async (
                payload?: {
                    params?: {
                        device_id?: string;
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
                                rules: Array<{
                                    id?: string;
                                    name?: string;
                                    devices?: Array<{
                                        id?: string;
                                        name?: string;
                                    }>;
                                    user_count?: string;
                                    users?: Array<{
                                        user_type: number;
                                        user_id?: string;
                                        user_name?: string;
                                        phone_num?: string;
                                        department_id?: string;
                                    }>;
                                    visitor_count?: string;
                                    visitors?: Array<{
                                        user_type: number;
                                        user_id?: string;
                                        user_name?: string;
                                        phone_num?: string;
                                        department_id?: string;
                                    }>;
                                    remind_face?: boolean;
                                    opening_time?: {
                                        valid_day?: {
                                            start_day: number;
                                            end_day: number;
                                        };
                                        weekdays?: Array<number>;
                                        day_times?: Array<{
                                            start_hhmm: number;
                                            end_hhmm: number;
                                        }>;
                                    };
                                    is_temp?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/rule_external`,
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
         * user.face
         */
        userFace: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user.face&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user-face/get document }
             *
             * 下载人脸图片
             *
             * 对于已经录入人脸图片的用户，可以使用该接口下载用户人脸图片。
             */
            get: async (
                payload?: {
                    params?: {
                        is_cropped?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { user_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/users/:user_id/face`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                return {
                    writeFile: async (filePath: string) => {
                        return new Promise((resolve, reject) => {
                            const writableStream =
                                fs.createWriteStream(filePath);
                            writableStream.on("finish", () => {
                                resolve(filePath);
                            });
                            writableStream.on("error", (e) => {
                                reject(e);
                            });
                            res.pipe(writableStream);
                        });
                    },
                };
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user.face&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user-face/update document }
             *
             * 上传人脸图片
             *
             * 用户需要录入人脸图片才可以使用门禁考勤机。使用该 API 上传门禁用户的人脸图片。
             */
            update: async (
                payload?: {
                    data: {
                        files: Buffer | fs.ReadStream;
                        file_type: string;
                        file_name: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { user_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/users/:user_id/face`,
                            path
                        ),
                        method: "PUT",
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
         * 用户管理
         */
        user: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/get document }
             *
             * 获取单个用户信息
             *
             * 该接口用于获取智能门禁中单个用户的信息。
             *
             * 只能获取已加入智能门禁权限组的用户
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                user?: {
                                    feature?: {
                                        card?: number;
                                        face_uploaded?: boolean;
                                    };
                                    user_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/users/:user_id`,
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
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/acs/v1/users`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    feature?: {
                                                        card?: number;
                                                        face_uploaded?: boolean;
                                                    };
                                                    user_id?: string;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/list document }
             *
             * 获取用户列表
             *
             * 使用该接口获取智能门禁中所有用户信息。
             *
             * 只能获取已加入智能门禁权限组的用户。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
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
                                items?: Array<{
                                    feature?: {
                                        card?: number;
                                        face_uploaded?: boolean;
                                    };
                                    user_id?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/users`,
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
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/patch document }
             *
             * 修改用户部分信息
             *
             * 飞书智能门禁在人脸识别成功后会有韦根信号输出，输出用户的卡号。;对于使用韦根协议的门禁系统，企业可使用该接口录入用户卡号。
             */
            patch: async (
                payload?: {
                    data?: { feature?: { card?: number } };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { user_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/users/:user_id`,
                            path
                        ),
                        method: "PATCH",
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
         * visitor
         */
        visitor: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=visitor&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=acs&resource=visitor&version=v1 document }
             */
            create: async (
                payload?: {
                    data: {
                        user: {
                            user_type: number;
                            user_id?: string;
                            user_name?: string;
                            phone_num?: string;
                            department_id?: string;
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
                            data?: { visitor_id: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/visitors`,
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
             * {@link https://open.feishu.cn/api-explorer?project=acs&resource=visitor&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=acs&resource=visitor&version=v1 document }
             */
            delete: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { visitor_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/acs/v1/visitors/:visitor_id`,
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
        },
        v1: {
            /**
             * access_record.access_photo
             */
            accessRecordAccessPhoto: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=access_record.access_photo&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record-access_photo/get document }
                 *
                 * 下载开门时的人脸识别图片
                 *
                 * 用户在门禁考勤机上成功开门或打卡后，智能门禁应用都会生成一条门禁记录，对于使用人脸识别方式进行开门的识别记录，还会有抓拍图。;;可以用该接口下载开门时的人脸识别照片。
                 */
                get: async (
                    payload?: {
                        path?: { access_record_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/acs/v1/access_records/:access_record_id/access_photo`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    return {
                        writeFile: async (filePath: string) => {
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.pipe(writableStream);
                            });
                        },
                    };
                },
            },
            /**
             * 门禁记录
             */
            accessRecord: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            from: number;
                            to: number;
                            device_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/acs/v1/access_records`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        access_record_id?: string;
                                                        user_id?: string;
                                                        device_id?: string;
                                                        is_clock_in?: boolean;
                                                        access_time?: string;
                                                        access_type?:
                                                            | "FA"
                                                            | "QRCode"
                                                            | "Card"
                                                            | "Fp";
                                                        access_data?: string;
                                                        is_door_open?: boolean;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=access_record&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record/list document }
                 *
                 * 获取门禁记录列表
                 *
                 * 用户在门禁考勤机上成功开门或打卡后，智能门禁应用都会生成一条门禁记录。;;该接口返回满足查询参数的识别记录。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            from: number;
                            to: number;
                            device_id?: string;
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
                                    items?: Array<{
                                        access_record_id?: string;
                                        user_id?: string;
                                        device_id?: string;
                                        is_clock_in?: boolean;
                                        access_time?: string;
                                        access_type?:
                                            | "FA"
                                            | "QRCode"
                                            | "Card"
                                            | "Fp";
                                        access_data?: string;
                                        is_door_open?: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/acs/v1/access_records`,
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
             * 门禁设备
             */
            device: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=device&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/device/list document }
                 *
                 * 获取门禁设备列表
                 *
                 * 使用该接口获取租户内所有门禁设备。
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
                                    items?: Array<{
                                        device_id?: string;
                                        device_name?: string;
                                        device_sn?: string;
                                        property?: {
                                            version?: string;
                                            current_device_face_count?: number;
                                            max_face_capacity?: number;
                                            online_status?: number;
                                            device_name?: string;
                                            is_clock_in?: boolean;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/acs/v1/devices`,
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
             * rule_external
             */
            ruleExternal: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=rule_external&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=acs&resource=rule_external&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            rule: {
                                id?: string;
                                name?: string;
                                devices?: Array<{ id?: string; name?: string }>;
                                user_count?: string;
                                users?: Array<{
                                    user_type: number;
                                    user_id?: string;
                                    user_name?: string;
                                    phone_num?: string;
                                    department_id?: string;
                                }>;
                                visitor_count?: string;
                                visitors?: Array<{
                                    user_type: number;
                                    user_id?: string;
                                    user_name?: string;
                                    phone_num?: string;
                                    department_id?: string;
                                }>;
                                remind_face?: boolean;
                                opening_time?: {
                                    valid_day?: {
                                        start_day: number;
                                        end_day: number;
                                    };
                                    weekdays?: Array<number>;
                                    day_times?: Array<{
                                        start_hhmm: number;
                                        end_hhmm: number;
                                    }>;
                                };
                                is_temp?: boolean;
                            };
                        };
                        params?: {
                            rule_id?: string;
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
                                data?: { rule_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/acs/v1/rule_external`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=rule_external&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=acs&resource=rule_external&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        params: { rule_id: string };
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
                                `${this.domain}/open-apis/acs/v1/rule_external`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=rule_external&apiName=device_bind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=device_bind&project=acs&resource=rule_external&version=v1 document }
                 */
                deviceBind: async (
                    payload?: {
                        data: { device_id: string; rule_ids: Array<string> };
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
                                `${this.domain}/open-apis/acs/v1/rule_external/device_bind`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=rule_external&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=acs&resource=rule_external&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            device_id?: string;
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
                                    rules: Array<{
                                        id?: string;
                                        name?: string;
                                        devices?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                        user_count?: string;
                                        users?: Array<{
                                            user_type: number;
                                            user_id?: string;
                                            user_name?: string;
                                            phone_num?: string;
                                            department_id?: string;
                                        }>;
                                        visitor_count?: string;
                                        visitors?: Array<{
                                            user_type: number;
                                            user_id?: string;
                                            user_name?: string;
                                            phone_num?: string;
                                            department_id?: string;
                                        }>;
                                        remind_face?: boolean;
                                        opening_time?: {
                                            valid_day?: {
                                                start_day: number;
                                                end_day: number;
                                            };
                                            weekdays?: Array<number>;
                                            day_times?: Array<{
                                                start_hhmm: number;
                                                end_hhmm: number;
                                            }>;
                                        };
                                        is_temp?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/acs/v1/rule_external`,
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
             * user.face
             */
            userFace: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user.face&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user-face/get document }
                 *
                 * 下载人脸图片
                 *
                 * 对于已经录入人脸图片的用户，可以使用该接口下载用户人脸图片。
                 */
                get: async (
                    payload?: {
                        params?: {
                            is_cropped?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { user_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/acs/v1/users/:user_id/face`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    return {
                        writeFile: async (filePath: string) => {
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.pipe(writableStream);
                            });
                        },
                    };
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user.face&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user-face/update document }
                 *
                 * 上传人脸图片
                 *
                 * 用户需要录入人脸图片才可以使用门禁考勤机。使用该 API 上传门禁用户的人脸图片。
                 */
                update: async (
                    payload?: {
                        data: {
                            files: Buffer | fs.ReadStream;
                            file_type: string;
                            file_name: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { user_id: string };
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
                                `${this.domain}/open-apis/acs/v1/users/:user_id/face`,
                                path
                            ),
                            method: "PUT",
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
             * 用户管理
             */
            user: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/get document }
                 *
                 * 获取单个用户信息
                 *
                 * 该接口用于获取智能门禁中单个用户的信息。
                 *
                 * 只能获取已加入智能门禁权限组的用户
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    user?: {
                                        feature?: {
                                            card?: number;
                                            face_uploaded?: boolean;
                                        };
                                        user_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/acs/v1/users/:user_id`,
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/acs/v1/users`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        feature?: {
                                                            card?: number;
                                                            face_uploaded?: boolean;
                                                        };
                                                        user_id?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/list document }
                 *
                 * 获取用户列表
                 *
                 * 使用该接口获取智能门禁中所有用户信息。
                 *
                 * 只能获取已加入智能门禁权限组的用户。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
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
                                    items?: Array<{
                                        feature?: {
                                            card?: number;
                                            face_uploaded?: boolean;
                                        };
                                        user_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/acs/v1/users`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/patch document }
                 *
                 * 修改用户部分信息
                 *
                 * 飞书智能门禁在人脸识别成功后会有韦根信号输出，输出用户的卡号。;对于使用韦根协议的门禁系统，企业可使用该接口录入用户卡号。
                 */
                patch: async (
                    payload?: {
                        data?: { feature?: { card?: number } };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/acs/v1/users/:user_id`,
                                path
                            ),
                            method: "PATCH",
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
             * visitor
             */
            visitor: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=visitor&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=acs&resource=visitor&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            user: {
                                user_type: number;
                                user_id?: string;
                                user_name?: string;
                                phone_num?: string;
                                department_id?: string;
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
                                data?: { visitor_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/acs/v1/visitors`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=visitor&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=acs&resource=visitor&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { visitor_id: string };
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
                                `${this.domain}/open-apis/acs/v1/visitors/:visitor_id`,
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
            },
        },
    };
}
