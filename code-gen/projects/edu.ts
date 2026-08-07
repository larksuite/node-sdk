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
import ea_symphony from "./ea_symphony";

// auto gen
export default abstract class Client extends ea_symphony {
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
    edu = {
        /**
         * period
         */
        period: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=period&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=edu&resource=period&version=v1 document }
             *
             * 修改学段
             *
             * 修改指定的学段信息
             */
            update: async (
                payload?: {
                    data?: { is_special_grade_type?: boolean };
                    path?: { period_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/periods/:period_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=period&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=period&version=v1 document }
             *
             * 创建学段
             *
             * 创建指定的学段
             */
            create: async (
                payload?: {
                    data?: {
                        campus_id?: string;
                        period_level?: string;
                        grade_num?: number;
                        class_num?: number;
                        is_special_grade_type?: boolean;
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
                            data?: { period_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/periods`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=period&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=period&version=v1 document }
             *
             * 删除学段
             *
             * 删除指定学段
             */
            delete: async (
                payload?: {
                    path?: { period_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/periods/:period_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=period&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=period&version=v1 document }
             *
             * 获取学段列表
             *
             * 根据指定校区获取下属全部学段
             */
            list: async (
                payload?: {
                    params?: { campus_id?: string };
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
                                period_list?: Array<{
                                    period_id?: string;
                                    name?: string;
                                    grade_id_list?: Array<string>;
                                    campus_id?: string;
                                    status?: "invalid" | "valid";
                                    period_level?:
                                        | "kindergarten"
                                        | "primary_school"
                                        | "junior_high_school"
                                        | "senior_high_school";
                                    junior_naming_type?: "number" | "text";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/periods`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=period&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=period&version=v1 document }
             *
             * 获取学段
             *
             * 获取指定学段的信息
             */
            get: async (
                payload?: {
                    path?: { period_id?: string };
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
                                name?: string;
                                grade_id_list?: Array<string>;
                                campus_id?: string;
                                status?: "invalid" | "valid";
                                period_level?:
                                    | "kindergarten"
                                    | "primary_school"
                                    | "junior_high_school"
                                    | "senior_high_school";
                                junior_naming_type?: "number" | "text";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/periods/:period_id`,
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
         * subject
         */
        subject: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=subject&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=subject&version=v1 document }
             *
             * 添加学科
             *
             * 在学校范围内添加新的学科
             */
            create: async (
                payload?: {
                    data?: { name?: string };
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
                            data?: { subject_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/subjects`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=subject&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=subject&version=v1 document }
             *
             * 获取全量学科列表
             *
             * 获取当前学校全量学科列表
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
                                subject_list?: Array<{
                                    subject_id?: string;
                                    name?: string;
                                    is_custom?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/subjects`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=subject&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=subject&version=v1 document }
             *
             * 删除学科
             *
             * 删除指定学科
             */
            delete: async (
                payload?: {
                    path?: { subject_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/subjects/:subject_id`,
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
         * student
         */
        student: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=change_parent&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=change_parent&project=edu&resource=student&version=v1 document }
             *
             * 修改学生家长
             *
             * 修改指定学生的家长关系
             */
            changeParent: async (
                payload?: {
                    data?: {
                        parent_list?: Array<{
                            parent_kind_name?: string;
                            parent_kind?: number;
                            cp?: string;
                        }>;
                    };
                    params?: {
                        user_id_type?: "union_id" | "user_id" | "open_id";
                    };
                    path?: { student_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/students/:student_id/change_parent`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=parent_list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=parent_list&project=edu&resource=student&version=v1 document }
             *
             * 获取学生家长列表
             *
             * 获取指定学生的家长信息列表
             */
            parentList: async (
                payload?: {
                    data?: { student_ids?: Array<string> };
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
                                items?: Array<{
                                    relation_id?: string;
                                    cp_id?: string;
                                    parent_id?: string;
                                    student_id?: string;
                                    parent_kind_name?: string;
                                    parent_kind?: number;
                                }>;
                                inactive_items?: Array<{
                                    relation_id?: string;
                                    cp_id?: string;
                                    parent_id?: string;
                                    student_id?: string;
                                    parent_kind_name?: string;
                                    parent_kind?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/students/parent_list`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=student&version=v1 document }
             *
             * 批量获取指定班级学生
             *
             * 指定班级分页获取学生基本信息
             */
            list: async (
                payload?: {
                    params?: {
                        class_id?: string;
                        user_id_type?: "union_id" | "user_id" | "open_id";
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
                                    student_id?: string;
                                    name?: string;
                                    student_no?: string;
                                    class_path_list?: Array<{
                                        campus_id?: string;
                                        period_id?: string;
                                        grade_id?: string;
                                        class_id?: string;
                                    }>;
                                    status?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/students`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=student&version=v1 document }
             *
             * 删除学生
             *
             * 删除学生信息
             */
            delete: async (
                payload?: {
                    params?: {
                        user_id_type?: "union_id" | "user_id" | "open_id";
                    };
                    path?: { student_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/students/:student_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=student&version=v1 document }
             *
             * 创建学生
             *
             * 创建学生数据
             */
            create: async (
                payload?: {
                    data?: {
                        name?: string;
                        class_id?: string;
                        student_no?: string;
                        employee_id?: string;
                        user_id_type?: "union_id" | "user_id" | "open_id";
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
                            data?: { student_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/students`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=student&version=v1 document }
             *
             * 获取学生信息
             *
             * 获取指定学生的详细信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "union_id" | "user_id" | "open_id";
                    };
                    path?: { student_id?: string };
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
                                student_id?: string;
                                name?: string;
                                student_no?: string;
                                class_path_list?: Array<{
                                    campus_id?: string;
                                    period_id?: string;
                                    grade_id?: string;
                                    class_id?: string;
                                }>;
                                status?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/students/:student_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=edu&resource=student&version=v1 document }
             *
             * 修改学生信息
             *
             * 修改学生基础信息
             */
            update: async (
                payload?: {
                    data?: { name?: string; student_no?: string };
                    params?: {
                        user_id_type?: "union_id" | "user_id" | "open_id";
                    };
                    path?: { student_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/students/:student_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=transfer&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer&project=edu&resource=student&version=v1 document }
             *
             * 学生调班
             *
             * 调整学生所在班级，班级需要指定全量ID
             */
            transfer: async (
                payload?: {
                    data?: { class_id_list?: Array<string> };
                    params?: {
                        user_id_type?: "union_id" | "user_id" | "open_id";
                    };
                    path?: { student_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/students/:student_id/transfer`,
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
         * home_school_chat
         */
        homeSchoolChat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=home_school_chat&apiName=delete_chat&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_chat&project=edu&resource=home_school_chat&version=v1 document }
             *
             * 删除家校群
             *
             * 删除指定班级的家校群
             */
            deleteChat: async (
                payload?: {
                    params?: { class_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/home_school_chats/delete_chat`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=home_school_chat&apiName=chat_list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=chat_list&project=edu&resource=home_school_chat&version=v1 document }
             *
             * 获取家校群列表
             *
             * 获取指定的班级列表的家校群
             */
            chatList: async (
                payload?: {
                    data?: { class_id_list?: Array<string> };
                    params?: {
                        user_id_type?: "union_id" | "user_id" | "open_id";
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
                                chat_list?: Array<{
                                    chat_id?: string;
                                    class_id?: string;
                                    chat_name?: string;
                                    owner_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/home_school_chats/chat_list`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=home_school_chat&apiName=update_chat&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_chat&project=edu&resource=home_school_chat&version=v1 document }
             *
             * 修改家校群
             *
             * 对家校群信息进行修改
             */
            updateChat: async (
                payload?: {
                    data?: {
                        class_id?: string;
                        specified_chat_name?: string;
                        chat_owner_id?: string;
                    };
                    params?: {
                        user_id_type?: "union_id" | "user_id" | "open_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/home_school_chats/update_chat`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=home_school_chat&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=home_school_chat&version=v1 document }
             *
             * 创建家校群
             *
             * 为指定的班级创建家校群
             */
            create: async (
                payload?: {
                    data?: { class_id?: string; specified_chat_name?: string };
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
                            `${this.domain}/open-apis/edu/v1/home_school_chats`,
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
         * class
         */
        class: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=class&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=class&version=v1 document }
             *
             * 创建班级
             *
             * 创建指定的班级
             */
            create: async (
                payload?: {
                    data?: {
                        grade_id?: string;
                        class_seq?: number;
                        class_alias?: string;
                        only_alias?: boolean;
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
                            data?: { class_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/classes`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=class&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=class&version=v1 document }
             *
             * 批量获取班级
             *
             * 获取指定年级下的班级列表
             */
            list: async (
                payload?: {
                    params?: { grade_id?: string };
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
                                class_list?: Array<{
                                    class_id?: string;
                                    name?: string;
                                    grade_id?: string;
                                    status?: "invalid" | "valid";
                                    class_seq_id?: number;
                                    class_alias?: string;
                                    only_alias?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/classes`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=class&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=class&version=v1 document }
             *
             * 删除班级
             *
             * 删除指定的班级
             */
            delete: async (
                payload?: {
                    path?: { class_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/classes/:class_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=class&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=class&version=v1 document }
             *
             * 获取班级
             *
             * 获取指定的班级信息
             */
            get: async (
                payload?: {
                    path?: { class_id?: string };
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
                                class_id?: string;
                                name?: string;
                                grade_id?: string;
                                status?: "invalid" | "valid";
                                class_seq_id?: number;
                                class_alias?: string;
                                only_alias?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/classes/:class_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=class&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=edu&resource=class&version=v1 document }
             *
             * 编辑班级
             *
             * 编辑指定班级信息
             */
            update: async (
                payload?: {
                    data?: {
                        class_seq?: number;
                        class_alias?: string;
                        only_alias?: boolean;
                    };
                    path?: { class_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/classes/:class_id`,
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
         * teacher
         */
        teacher: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=teacher&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=teacher&version=v1 document }
             *
             * 获取教师信息
             *
             * 根据教师ID获取教师信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "union_id" | "user_id" | "open_id";
                    };
                    path?: { teacher_id?: string };
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
                                teacher_id?: string;
                                name?: string;
                                roles?: Array<{
                                    role_id?: string;
                                    role_name?: string;
                                    subject_id?: string;
                                    subject_name?: string;
                                    campus_id?: string;
                                    period_id?: string;
                                    grade_id?: string;
                                    class_id?: string;
                                    action?: string;
                                }>;
                                status?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/teachers/:teacher_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=teacher&apiName=granted_roles&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=granted_roles&project=edu&resource=teacher&version=v1 document }
             *
             * 授予教师角色
             *
             * 对教师的角色进行增量修改
             */
            grantedRoles: async (
                payload?: {
                    data?: {
                        roles?: Array<{
                            role_id?: string;
                            role_name?: string;
                            subject_id?: string;
                            subject_name?: string;
                            campus_id?: string;
                            period_id?: string;
                            grade_id?: string;
                            class_id?: string;
                            action?: "adding" | "deleting";
                        }>;
                    };
                    params?: {
                        user_id_type?: "union_id" | "user_id" | "open_id";
                    };
                    path?: { teacher_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/teachers/:teacher_id/granted_roles`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=teacher&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=teacher&version=v1 document }
             *
             * 获取指定部门教师列表
             *
             * 通过获取指定部门教师基本信息列表
             */
            list: async (
                payload?: {
                    params?: {
                        department_id?: string;
                        user_id_type?: "union_id" | "user_id" | "open_id";
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
                                    teacher_id?: string;
                                    name?: string;
                                    roles?: Array<{
                                        role_id?: string;
                                        role_name?: string;
                                        subject_id?: string;
                                        subject_name?: string;
                                        campus_id?: string;
                                        period_id?: string;
                                        grade_id?: string;
                                        class_id?: string;
                                        action?: "adding" | "deleting";
                                    }>;
                                    status?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/teachers`,
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
         * grade
         */
        grade: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=grade&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=edu&resource=grade&version=v1 document }
             *
             * 更新年级
             *
             * 更新指定年级的基础信息
             */
            update: async (
                payload?: {
                    data?: { grade_level?: number };
                    path?: { grade_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/grades/:grade_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=grade&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=grade&version=v1 document }
             *
             * 创建年级
             *
             * 创建新的年级
             */
            create: async (
                payload?: {
                    data?: {
                        period_id?: string;
                        grade_level?: number;
                        class_num?: number;
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
                            data?: { grade_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/grades`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=grade&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=grade&version=v1 document }
             *
             * 获取年级列表
             *
             * 获取指定学段下的年级信息列表
             */
            list: async (
                payload?: {
                    params?: { period_id?: string };
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
                                grade_list?: Array<{
                                    grade_id?: string;
                                    name?: string;
                                    class_id_list?: Array<string>;
                                    period_id?: string;
                                    status?: "invalid" | "valid";
                                    start_year?: number;
                                    grade_level?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/grades`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=grade&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=grade&version=v1 document }
             *
             * 获取年级
             *
             * 根据指定ID获取年级信息
             */
            get: async (
                payload?: {
                    path?: { grade_id?: string };
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
                                grade_id?: string;
                                name?: string;
                                class_id_list?: Array<string>;
                                period_id?: string;
                                status?: "invalid" | "valid";
                                start_year?: number;
                                grade_level?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/grades/:grade_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=grade&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=grade&version=v1 document }
             *
             * 删除年级
             *
             * 根据指定ID删除年级
             */
            delete: async (
                payload?: {
                    path?: { grade_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/grades/:grade_id`,
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
         * parent
         */
        parent: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=parent&apiName=parent_list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=parent_list&project=edu&resource=parent&version=v1 document }
             */
            parentList: async (
                payload?: {
                    data?: {
                        parent_cp_ids?: Array<string>;
                        parent_ids?: Array<string>;
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
                                items?: Array<{
                                    parent_id: string;
                                    cp_id: string;
                                    name: string;
                                }>;
                                inactive_items?: Array<{
                                    parent_id: string;
                                    cp_id: string;
                                    name: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/parents/parent_list`,
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
         * campus
         */
        campus: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=campus&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=campus&version=v1 document }
             *
             * 获取指定校区
             *
             * 获取指定ID对应的校区
             */
            get: async (
                payload?: {
                    path?: { campus_id?: string };
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
                                campus_id?: string;
                                name?: string;
                                period_id_list?: Array<string>;
                                status?: "invalid" | "valid";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/campuses/:campus_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=campus&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=campus&version=v1 document }
             *
             * 删除校区
             *
             * 删除指定ID的校区
             */
            delete: async (
                payload?: {
                    path?: { campus_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/campuses/:campus_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=campus&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=campus&version=v1 document }
             *
             * 创建校区
             *
             * 在租户下创建新的校区
             */
            create: async (
                payload?: {
                    data?: {
                        name?: string;
                        period_list?: Array<{
                            period_level?:
                                | "kindergarten"
                                | "primary_school"
                                | "junior_high_school"
                                | "senior_high_school";
                            grade_num?: number;
                            class_num?: number;
                            junior_naming_type?: "number" | "text";
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
                            data?: { campus_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/campuses`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=campus&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=edu&resource=campus&version=v1 document }
             *
             * 修改校区
             *
             * 修改指定校区的信息
             */
            update: async (
                payload?: {
                    data?: { name?: string };
                    path?: { campus_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/campuses/:campus_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=edu&resource=campus&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=campus&version=v1 document }
             *
             * 获取校区列表
             *
             * 获取指定租户下的所有校区
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
                                campus_list?: Array<{
                                    campus_id?: string;
                                    name?: string;
                                    period_id_list?: Array<string>;
                                    status?: "invalid" | "valid";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/edu/v1/campuses`,
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
             * period
             */
            period: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=period&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=edu&resource=period&version=v1 document }
                 *
                 * 修改学段
                 *
                 * 修改指定的学段信息
                 */
                update: async (
                    payload?: {
                        data?: { is_special_grade_type?: boolean };
                        path?: { period_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/periods/:period_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=period&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=period&version=v1 document }
                 *
                 * 创建学段
                 *
                 * 创建指定的学段
                 */
                create: async (
                    payload?: {
                        data?: {
                            campus_id?: string;
                            period_level?: string;
                            grade_num?: number;
                            class_num?: number;
                            is_special_grade_type?: boolean;
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
                                data?: { period_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/periods`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=period&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=period&version=v1 document }
                 *
                 * 删除学段
                 *
                 * 删除指定学段
                 */
                delete: async (
                    payload?: {
                        path?: { period_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/periods/:period_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=period&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=period&version=v1 document }
                 *
                 * 获取学段列表
                 *
                 * 根据指定校区获取下属全部学段
                 */
                list: async (
                    payload?: {
                        params?: { campus_id?: string };
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
                                    period_list?: Array<{
                                        period_id?: string;
                                        name?: string;
                                        grade_id_list?: Array<string>;
                                        campus_id?: string;
                                        status?: "invalid" | "valid";
                                        period_level?:
                                            | "kindergarten"
                                            | "primary_school"
                                            | "junior_high_school"
                                            | "senior_high_school";
                                        junior_naming_type?: "number" | "text";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/periods`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=period&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=period&version=v1 document }
                 *
                 * 获取学段
                 *
                 * 获取指定学段的信息
                 */
                get: async (
                    payload?: {
                        path?: { period_id?: string };
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
                                    name?: string;
                                    grade_id_list?: Array<string>;
                                    campus_id?: string;
                                    status?: "invalid" | "valid";
                                    period_level?:
                                        | "kindergarten"
                                        | "primary_school"
                                        | "junior_high_school"
                                        | "senior_high_school";
                                    junior_naming_type?: "number" | "text";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/periods/:period_id`,
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
             * subject
             */
            subject: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=subject&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=subject&version=v1 document }
                 *
                 * 添加学科
                 *
                 * 在学校范围内添加新的学科
                 */
                create: async (
                    payload?: {
                        data?: { name?: string };
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
                                data?: { subject_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/subjects`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=subject&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=subject&version=v1 document }
                 *
                 * 获取全量学科列表
                 *
                 * 获取当前学校全量学科列表
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
                                    subject_list?: Array<{
                                        subject_id?: string;
                                        name?: string;
                                        is_custom?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/subjects`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=subject&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=subject&version=v1 document }
                 *
                 * 删除学科
                 *
                 * 删除指定学科
                 */
                delete: async (
                    payload?: {
                        path?: { subject_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/subjects/:subject_id`,
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
             * student
             */
            student: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=change_parent&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=change_parent&project=edu&resource=student&version=v1 document }
                 *
                 * 修改学生家长
                 *
                 * 修改指定学生的家长关系
                 */
                changeParent: async (
                    payload?: {
                        data?: {
                            parent_list?: Array<{
                                parent_kind_name?: string;
                                parent_kind?: number;
                                cp?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
                        };
                        path?: { student_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/students/:student_id/change_parent`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=parent_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=parent_list&project=edu&resource=student&version=v1 document }
                 *
                 * 获取学生家长列表
                 *
                 * 获取指定学生的家长信息列表
                 */
                parentList: async (
                    payload?: {
                        data?: { student_ids?: Array<string> };
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
                                    items?: Array<{
                                        relation_id?: string;
                                        cp_id?: string;
                                        parent_id?: string;
                                        student_id?: string;
                                        parent_kind_name?: string;
                                        parent_kind?: number;
                                    }>;
                                    inactive_items?: Array<{
                                        relation_id?: string;
                                        cp_id?: string;
                                        parent_id?: string;
                                        student_id?: string;
                                        parent_kind_name?: string;
                                        parent_kind?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/students/parent_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=student&version=v1 document }
                 *
                 * 批量获取指定班级学生
                 *
                 * 指定班级分页获取学生基本信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            class_id?: string;
                            user_id_type?: "union_id" | "user_id" | "open_id";
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
                                        student_id?: string;
                                        name?: string;
                                        student_no?: string;
                                        class_path_list?: Array<{
                                            campus_id?: string;
                                            period_id?: string;
                                            grade_id?: string;
                                            class_id?: string;
                                        }>;
                                        status?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/students`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=student&version=v1 document }
                 *
                 * 删除学生
                 *
                 * 删除学生信息
                 */
                delete: async (
                    payload?: {
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
                        };
                        path?: { student_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/students/:student_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=student&version=v1 document }
                 *
                 * 创建学生
                 *
                 * 创建学生数据
                 */
                create: async (
                    payload?: {
                        data?: {
                            name?: string;
                            class_id?: string;
                            student_no?: string;
                            employee_id?: string;
                            user_id_type?: "union_id" | "user_id" | "open_id";
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
                                data?: { student_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/students`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=student&version=v1 document }
                 *
                 * 获取学生信息
                 *
                 * 获取指定学生的详细信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
                        };
                        path?: { student_id?: string };
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
                                    student_id?: string;
                                    name?: string;
                                    student_no?: string;
                                    class_path_list?: Array<{
                                        campus_id?: string;
                                        period_id?: string;
                                        grade_id?: string;
                                        class_id?: string;
                                    }>;
                                    status?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/students/:student_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=edu&resource=student&version=v1 document }
                 *
                 * 修改学生信息
                 *
                 * 修改学生基础信息
                 */
                update: async (
                    payload?: {
                        data?: { name?: string; student_no?: string };
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
                        };
                        path?: { student_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/students/:student_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=student&apiName=transfer&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer&project=edu&resource=student&version=v1 document }
                 *
                 * 学生调班
                 *
                 * 调整学生所在班级，班级需要指定全量ID
                 */
                transfer: async (
                    payload?: {
                        data?: { class_id_list?: Array<string> };
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
                        };
                        path?: { student_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/students/:student_id/transfer`,
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
             * home_school_chat
             */
            homeSchoolChat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=home_school_chat&apiName=delete_chat&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_chat&project=edu&resource=home_school_chat&version=v1 document }
                 *
                 * 删除家校群
                 *
                 * 删除指定班级的家校群
                 */
                deleteChat: async (
                    payload?: {
                        params?: { class_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/home_school_chats/delete_chat`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=home_school_chat&apiName=chat_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=chat_list&project=edu&resource=home_school_chat&version=v1 document }
                 *
                 * 获取家校群列表
                 *
                 * 获取指定的班级列表的家校群
                 */
                chatList: async (
                    payload?: {
                        data?: { class_id_list?: Array<string> };
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
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
                                    chat_list?: Array<{
                                        chat_id?: string;
                                        class_id?: string;
                                        chat_name?: string;
                                        owner_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/home_school_chats/chat_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=home_school_chat&apiName=update_chat&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_chat&project=edu&resource=home_school_chat&version=v1 document }
                 *
                 * 修改家校群
                 *
                 * 对家校群信息进行修改
                 */
                updateChat: async (
                    payload?: {
                        data?: {
                            class_id?: string;
                            specified_chat_name?: string;
                            chat_owner_id?: string;
                        };
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
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
                                `${this.domain}/open-apis/edu/v1/home_school_chats/update_chat`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=home_school_chat&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=home_school_chat&version=v1 document }
                 *
                 * 创建家校群
                 *
                 * 为指定的班级创建家校群
                 */
                create: async (
                    payload?: {
                        data?: {
                            class_id?: string;
                            specified_chat_name?: string;
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
                                data?: { chat_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/home_school_chats`,
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
             * class
             */
            class: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=class&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=class&version=v1 document }
                 *
                 * 创建班级
                 *
                 * 创建指定的班级
                 */
                create: async (
                    payload?: {
                        data?: {
                            grade_id?: string;
                            class_seq?: number;
                            class_alias?: string;
                            only_alias?: boolean;
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
                                data?: { class_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/classes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=class&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=class&version=v1 document }
                 *
                 * 批量获取班级
                 *
                 * 获取指定年级下的班级列表
                 */
                list: async (
                    payload?: {
                        params?: { grade_id?: string };
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
                                    class_list?: Array<{
                                        class_id?: string;
                                        name?: string;
                                        grade_id?: string;
                                        status?: "invalid" | "valid";
                                        class_seq_id?: number;
                                        class_alias?: string;
                                        only_alias?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/classes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=class&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=class&version=v1 document }
                 *
                 * 删除班级
                 *
                 * 删除指定的班级
                 */
                delete: async (
                    payload?: {
                        path?: { class_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/classes/:class_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=class&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=class&version=v1 document }
                 *
                 * 获取班级
                 *
                 * 获取指定的班级信息
                 */
                get: async (
                    payload?: {
                        path?: { class_id?: string };
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
                                    class_id?: string;
                                    name?: string;
                                    grade_id?: string;
                                    status?: "invalid" | "valid";
                                    class_seq_id?: number;
                                    class_alias?: string;
                                    only_alias?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/classes/:class_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=class&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=edu&resource=class&version=v1 document }
                 *
                 * 编辑班级
                 *
                 * 编辑指定班级信息
                 */
                update: async (
                    payload?: {
                        data?: {
                            class_seq?: number;
                            class_alias?: string;
                            only_alias?: boolean;
                        };
                        path?: { class_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/classes/:class_id`,
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
             * teacher
             */
            teacher: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=teacher&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=teacher&version=v1 document }
                 *
                 * 获取教师信息
                 *
                 * 根据教师ID获取教师信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
                        };
                        path?: { teacher_id?: string };
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
                                    teacher_id?: string;
                                    name?: string;
                                    roles?: Array<{
                                        role_id?: string;
                                        role_name?: string;
                                        subject_id?: string;
                                        subject_name?: string;
                                        campus_id?: string;
                                        period_id?: string;
                                        grade_id?: string;
                                        class_id?: string;
                                        action?: string;
                                    }>;
                                    status?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/teachers/:teacher_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=teacher&apiName=granted_roles&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=granted_roles&project=edu&resource=teacher&version=v1 document }
                 *
                 * 授予教师角色
                 *
                 * 对教师的角色进行增量修改
                 */
                grantedRoles: async (
                    payload?: {
                        data?: {
                            roles?: Array<{
                                role_id?: string;
                                role_name?: string;
                                subject_id?: string;
                                subject_name?: string;
                                campus_id?: string;
                                period_id?: string;
                                grade_id?: string;
                                class_id?: string;
                                action?: "adding" | "deleting";
                            }>;
                        };
                        params?: {
                            user_id_type?: "union_id" | "user_id" | "open_id";
                        };
                        path?: { teacher_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/teachers/:teacher_id/granted_roles`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=teacher&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=teacher&version=v1 document }
                 *
                 * 获取指定部门教师列表
                 *
                 * 通过获取指定部门教师基本信息列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            department_id?: string;
                            user_id_type?: "union_id" | "user_id" | "open_id";
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
                                        teacher_id?: string;
                                        name?: string;
                                        roles?: Array<{
                                            role_id?: string;
                                            role_name?: string;
                                            subject_id?: string;
                                            subject_name?: string;
                                            campus_id?: string;
                                            period_id?: string;
                                            grade_id?: string;
                                            class_id?: string;
                                            action?: "adding" | "deleting";
                                        }>;
                                        status?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/teachers`,
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
             * grade
             */
            grade: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=grade&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=edu&resource=grade&version=v1 document }
                 *
                 * 更新年级
                 *
                 * 更新指定年级的基础信息
                 */
                update: async (
                    payload?: {
                        data?: { grade_level?: number };
                        path?: { grade_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/grades/:grade_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=grade&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=grade&version=v1 document }
                 *
                 * 创建年级
                 *
                 * 创建新的年级
                 */
                create: async (
                    payload?: {
                        data?: {
                            period_id?: string;
                            grade_level?: number;
                            class_num?: number;
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
                                data?: { grade_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/grades`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=grade&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=grade&version=v1 document }
                 *
                 * 获取年级列表
                 *
                 * 获取指定学段下的年级信息列表
                 */
                list: async (
                    payload?: {
                        params?: { period_id?: string };
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
                                    grade_list?: Array<{
                                        grade_id?: string;
                                        name?: string;
                                        class_id_list?: Array<string>;
                                        period_id?: string;
                                        status?: "invalid" | "valid";
                                        start_year?: number;
                                        grade_level?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/grades`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=grade&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=grade&version=v1 document }
                 *
                 * 获取年级
                 *
                 * 根据指定ID获取年级信息
                 */
                get: async (
                    payload?: {
                        path?: { grade_id?: string };
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
                                    grade_id?: string;
                                    name?: string;
                                    class_id_list?: Array<string>;
                                    period_id?: string;
                                    status?: "invalid" | "valid";
                                    start_year?: number;
                                    grade_level?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/grades/:grade_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=grade&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=grade&version=v1 document }
                 *
                 * 删除年级
                 *
                 * 根据指定ID删除年级
                 */
                delete: async (
                    payload?: {
                        path?: { grade_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/grades/:grade_id`,
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
             * parent
             */
            parent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=parent&apiName=parent_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=parent_list&project=edu&resource=parent&version=v1 document }
                 */
                parentList: async (
                    payload?: {
                        data?: {
                            parent_cp_ids?: Array<string>;
                            parent_ids?: Array<string>;
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
                                    items?: Array<{
                                        parent_id: string;
                                        cp_id: string;
                                        name: string;
                                    }>;
                                    inactive_items?: Array<{
                                        parent_id: string;
                                        cp_id: string;
                                        name: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/parents/parent_list`,
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
             * campus
             */
            campus: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=campus&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=edu&resource=campus&version=v1 document }
                 *
                 * 获取指定校区
                 *
                 * 获取指定ID对应的校区
                 */
                get: async (
                    payload?: {
                        path?: { campus_id?: string };
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
                                    campus_id?: string;
                                    name?: string;
                                    period_id_list?: Array<string>;
                                    status?: "invalid" | "valid";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/campuses/:campus_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=campus&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=edu&resource=campus&version=v1 document }
                 *
                 * 删除校区
                 *
                 * 删除指定ID的校区
                 */
                delete: async (
                    payload?: {
                        path?: { campus_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/campuses/:campus_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=campus&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=edu&resource=campus&version=v1 document }
                 *
                 * 创建校区
                 *
                 * 在租户下创建新的校区
                 */
                create: async (
                    payload?: {
                        data?: {
                            name?: string;
                            period_list?: Array<{
                                period_level?:
                                    | "kindergarten"
                                    | "primary_school"
                                    | "junior_high_school"
                                    | "senior_high_school";
                                grade_num?: number;
                                class_num?: number;
                                junior_naming_type?: "number" | "text";
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
                                data?: { campus_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/campuses`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=campus&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=edu&resource=campus&version=v1 document }
                 *
                 * 修改校区
                 *
                 * 修改指定校区的信息
                 */
                update: async (
                    payload?: {
                        data?: { name?: string };
                        path?: { campus_id?: string };
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
                                `${this.domain}/open-apis/edu/v1/campuses/:campus_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=edu&resource=campus&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=edu&resource=campus&version=v1 document }
                 *
                 * 获取校区列表
                 *
                 * 获取指定租户下的所有校区
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
                                    campus_list?: Array<{
                                        campus_id?: string;
                                        name?: string;
                                        period_id_list?: Array<string>;
                                        status?: "invalid" | "valid";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/edu/v1/campuses`,
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
