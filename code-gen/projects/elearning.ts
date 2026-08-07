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
import ehr from "./ehr";

// auto gen
export default abstract class Client extends ehr {
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
    elearning = {
        /**
         * registration
         */
        registration: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=registration&apiName=upload_progress&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_progress&project=elearning&resource=registration&version=v1 document }
             */
            uploadProgress: async (
                payload?: {
                    data: {
                        progress_info_array: Array<{
                            user_id?: string;
                            user_email?: string;
                            progress_objs: Array<{
                                object_id?: string;
                                object_type?: number;
                            }>;
                            percent?: number;
                            online_seconds?: number;
                        }>;
                        system_id: number;
                    };
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
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
                                progress_result_array?: Array<{
                                    progress_info?: {
                                        user_id?: string;
                                        user_email?: string;
                                        progress_objs: Array<{
                                            object_id?: string;
                                            object_type?: number;
                                        }>;
                                        percent?: number;
                                        online_seconds?: number;
                                    };
                                    result?: {
                                        code?: number;
                                        message?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/elearning/v1/registrations/upload_progress`,
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
         * course.learning_state
         */
        courseLearningState: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=course.learning_state&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=course.learning_state&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        learner_ids?: Array<string>;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_size: number;
                        page_token?: string;
                    };
                    path: { course_id: string };
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
                                    id?: string;
                                    course_id?: string;
                                    learner?: {
                                        open_id?: string;
                                        user_id?: string;
                                    };
                                    enroll_at?: number;
                                    enroll_type?: number;
                                    learning_duration?: number;
                                    finished_at?: number;
                                    lessons_num?: number;
                                    learned_lessons_num?: number;
                                    learning_state?: number;
                                    compulsory_lesson_ids?: Array<string>;
                                    learned_compulsory_lesson_ids?: Array<string>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/elearning/v1/courses/:course_id/learning_states`,
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
         * course.lesson.learning_detail
         */
        courseLessonLearningDetail: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=course.lesson.learning_detail&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=course.lesson.learning_detail&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        learner_ids?: Array<string>;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_size: number;
                        page_token?: string;
                    };
                    path: { course_id: string; lesson_id: string };
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
                                    lesson_id?: string;
                                    course_id?: string;
                                    learner?: {
                                        open_id?: string;
                                        user_id?: string;
                                    };
                                    learning_state?: number;
                                    exam_records?: Array<{
                                        score?: number;
                                        answering_duration?: string;
                                        end_time?: string;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/elearning/v1/courses/:course_id/lessons/:lesson_id/learning_details`,
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
         * course
         */
        course: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=course&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=course&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        learner_id?: string;
                        course_id?: Array<string>;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id?: string;
                        page_size: number;
                        page_token?: string;
                        department_id_type?: "open_department_id";
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
                                    id?: string;
                                    title?: string;
                                    description?: string;
                                    cover_url?: string;
                                    owner?: {
                                        open_id?: string;
                                        user_id?: string;
                                    };
                                    categories?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    channels?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    learner_num?: number;
                                    completed_num?: number;
                                    avg_rating?: number;
                                    lessons?: Array<{
                                        id?: string;
                                        name?: string;
                                        type?: number;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/elearning/v1/courses`,
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
         * training
         */
        training: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=training&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=training&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        department_id?: string;
                        department_id_type?: "open_department_id";
                        training_id?: Array<string>;
                        page_size: number;
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
                                    id?: string;
                                    title?: string;
                                    description?: string;
                                    cover_url?: string;
                                    categories?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    channels?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    sessions?: Array<{
                                        duration?: number;
                                        learner_num?: number;
                                        sign_in_num?: number;
                                        instructors?: Array<{
                                            open_id?: string;
                                            user_id?: string;
                                        }>;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/elearning/v1/trainings`,
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
             * registration
             */
            registration: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=registration&apiName=upload_progress&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_progress&project=elearning&resource=registration&version=v1 document }
                 */
                uploadProgress: async (
                    payload?: {
                        data: {
                            progress_info_array: Array<{
                                user_id?: string;
                                user_email?: string;
                                progress_objs: Array<{
                                    object_id?: string;
                                    object_type?: number;
                                }>;
                                percent?: number;
                                online_seconds?: number;
                            }>;
                            system_id: number;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                    progress_result_array?: Array<{
                                        progress_info?: {
                                            user_id?: string;
                                            user_email?: string;
                                            progress_objs: Array<{
                                                object_id?: string;
                                                object_type?: number;
                                            }>;
                                            percent?: number;
                                            online_seconds?: number;
                                        };
                                        result?: {
                                            code?: number;
                                            message?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v1/registrations/upload_progress`,
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
             * course.learning_state
             */
            courseLearningState: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=course.learning_state&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=course.learning_state&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            learner_ids?: Array<string>;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_size: number;
                            page_token?: string;
                        };
                        path: { course_id: string };
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
                                        id?: string;
                                        course_id?: string;
                                        learner?: {
                                            open_id?: string;
                                            user_id?: string;
                                        };
                                        enroll_at?: number;
                                        enroll_type?: number;
                                        learning_duration?: number;
                                        finished_at?: number;
                                        lessons_num?: number;
                                        learned_lessons_num?: number;
                                        learning_state?: number;
                                        compulsory_lesson_ids?: Array<string>;
                                        learned_compulsory_lesson_ids?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v1/courses/:course_id/learning_states`,
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
             * course.lesson.learning_detail
             */
            courseLessonLearningDetail: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=course.lesson.learning_detail&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=course.lesson.learning_detail&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            learner_ids?: Array<string>;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_size: number;
                            page_token?: string;
                        };
                        path: { course_id: string; lesson_id: string };
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
                                        lesson_id?: string;
                                        course_id?: string;
                                        learner?: {
                                            open_id?: string;
                                            user_id?: string;
                                        };
                                        learning_state?: number;
                                        exam_records?: Array<{
                                            score?: number;
                                            answering_duration?: string;
                                            end_time?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v1/courses/:course_id/lessons/:lesson_id/learning_details`,
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
             * course
             */
            course: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=course&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=course&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            learner_id?: string;
                            course_id?: Array<string>;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id?: string;
                            page_size: number;
                            page_token?: string;
                            department_id_type?: "open_department_id";
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
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        cover_url?: string;
                                        owner?: {
                                            open_id?: string;
                                            user_id?: string;
                                        };
                                        categories?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        channels?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        learner_num?: number;
                                        completed_num?: number;
                                        avg_rating?: number;
                                        lessons?: Array<{
                                            id?: string;
                                            name?: string;
                                            type?: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v1/courses`,
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
             * training
             */
            training: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=training&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=training&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            department_id?: string;
                            department_id_type?: "open_department_id";
                            training_id?: Array<string>;
                            page_size: number;
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
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        cover_url?: string;
                                        categories?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        channels?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        sessions?: Array<{
                                            duration?: number;
                                            learner_num?: number;
                                            sign_in_num?: number;
                                            instructors?: Array<{
                                                open_id?: string;
                                                user_id?: string;
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v1/trainings`,
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
             * certificate
             */
            certificate: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            owner_id?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            cert_id_list?: Array<string>;
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
                                    `${this.domain}/open-apis/elearning/v2/certificates`,
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
                                                        id?: string;
                                                        name?: Array<{
                                                            name?: string;
                                                            lang?: string;
                                                        }>;
                                                        description?: Array<{
                                                            name?: string;
                                                            lang?: string;
                                                        }>;
                                                        organization?: Array<{
                                                            name?: string;
                                                            lang?: string;
                                                        }>;
                                                        number?: string;
                                                        effective_time?: number;
                                                        status?: number;
                                                        cover_link?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=certificate&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=certificate&version=v2 document }
                 *
                 * 获取证书列表
                 *
                 * 可通过证书 ID 列表，所有者 ID 或者无参数查询证书信息，无参数时返回该租户下的所有证书，通过该接口，应用可获取到证书的名称、颁发机构、时效、说明、状态等信息。;;;限流策略：每个应用每个租户20次/分钟
                 */
                list: async (
                    payload?: {
                        params?: {
                            owner_id?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            cert_id_list?: Array<string>;
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
                                    items?: Array<{
                                        id?: string;
                                        name?: Array<{
                                            name?: string;
                                            lang?: string;
                                        }>;
                                        description?: Array<{
                                            name?: string;
                                            lang?: string;
                                        }>;
                                        organization?: Array<{
                                            name?: string;
                                            lang?: string;
                                        }>;
                                        number?: string;
                                        effective_time?: number;
                                        status?: number;
                                        cover_link?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v2/certificates`,
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
             * training
             */
            training: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            training_id_list?: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            owner_id?: string;
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
                                    `${this.domain}/open-apis/elearning/v2/trainings`,
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
                                                        id?: string;
                                                        title?: string;
                                                        description?: string;
                                                        cover_url?: string;
                                                        category_list?: Array<{
                                                            id?: string;
                                                            name?: Array<{
                                                                name?: string;
                                                                lang?: string;
                                                            }>;
                                                        }>;
                                                        channel_list?: Array<{
                                                            id?: string;
                                                            name?: Array<{
                                                                name?: string;
                                                                lang?: string;
                                                            }>;
                                                        }>;
                                                        session_list?: Array<{
                                                            duration?: number;
                                                            learner_num?: number;
                                                            vague_learner_num?: number;
                                                            sign_in_num?: number;
                                                            vague_sign_in_num?: number;
                                                            instructor_list?: Array<{
                                                                user_id?: string;
                                                                email?: string;
                                                            }>;
                                                            session_id?: string;
                                                            start_at?: string;
                                                            end_at?: string;
                                                            start_date?: string;
                                                            timezone?: string;
                                                            enroll_rule?: number;
                                                            enroll_offset?: number;
                                                            enroll_start_at?: string;
                                                            enroll_end_at?: string;
                                                            address?: string;
                                                            enable_live?: boolean;
                                                            meeting_type?: number;
                                                            playback_type?: number;
                                                            playback_url?: string;
                                                            completion_condition?: {
                                                                condition_type?: number;
                                                                duration?: number;
                                                                playback_duration?: number;
                                                            };
                                                            enroll_limit?: number;
                                                        }>;
                                                        session_limit?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=training&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=training&version=v2 document }
                 *
                 * 获取活动列表
                 *
                 * 可通过活动 ID 列表，所有者 ID 或者无参数查询活动信息，无参数时返回该租户下的所有活动，通过该接口，应用可获取到活动的标题、描述、分类、频道、期次、学员数等信息。;;;限流策略：每个应用每个租户20次/分钟
                 */
                list: async (
                    payload?: {
                        params?: {
                            training_id_list?: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            owner_id?: string;
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
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        cover_url?: string;
                                        category_list?: Array<{
                                            id?: string;
                                            name?: Array<{
                                                name?: string;
                                                lang?: string;
                                            }>;
                                        }>;
                                        channel_list?: Array<{
                                            id?: string;
                                            name?: Array<{
                                                name?: string;
                                                lang?: string;
                                            }>;
                                        }>;
                                        session_list?: Array<{
                                            duration?: number;
                                            learner_num?: number;
                                            vague_learner_num?: number;
                                            sign_in_num?: number;
                                            vague_sign_in_num?: number;
                                            instructor_list?: Array<{
                                                user_id?: string;
                                                email?: string;
                                            }>;
                                            session_id?: string;
                                            start_at?: string;
                                            end_at?: string;
                                            start_date?: string;
                                            timezone?: string;
                                            enroll_rule?: number;
                                            enroll_offset?: number;
                                            enroll_start_at?: string;
                                            enroll_end_at?: string;
                                            address?: string;
                                            enable_live?: boolean;
                                            meeting_type?: number;
                                            playback_type?: number;
                                            playback_url?: string;
                                            completion_condition?: {
                                                condition_type?: number;
                                                duration?: number;
                                                playback_duration?: number;
                                            };
                                            enroll_limit?: number;
                                        }>;
                                        session_limit?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v2/trainings`,
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
             * course
             */
            course: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            course_id_list?: Array<string>;
                            lang?: "zh" | "en";
                            owner_id?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
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
                                    `${this.domain}/open-apis/elearning/v2/courses`,
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
                                                        id?: string;
                                                        title?: string;
                                                        description?: string;
                                                        cover_url?: string;
                                                        owner?: {
                                                            user_id?: string;
                                                            email?: string;
                                                        };
                                                        teacher_list?: Array<{
                                                            user_id?: string;
                                                            email?: string;
                                                        }>;
                                                        lecture_list?: Array<{
                                                            id?: string;
                                                            name?: string;
                                                        }>;
                                                        category_list?: Array<{
                                                            id?: string;
                                                            name?: Array<{
                                                                name?: string;
                                                                lang?: string;
                                                            }>;
                                                        }>;
                                                        channel_list?: Array<{
                                                            id?: string;
                                                            name?: Array<{
                                                                name?: string;
                                                                lang?: string;
                                                            }>;
                                                        }>;
                                                        visible_scope_info?: {
                                                            visible_status?: number;
                                                            scope_group_list?: Array<{
                                                                scope_list?: Array<{
                                                                    id?: string;
                                                                    name?: string;
                                                                    department_type?: number;
                                                                }>;
                                                                scope_type?: string;
                                                                entry_date?: {
                                                                    from?: string;
                                                                    to?: string;
                                                                };
                                                            }>;
                                                        };
                                                        publish_status?: number;
                                                        created_at?: number;
                                                        published_at?: number;
                                                        total_learner_num?: number;
                                                        vague_total_learner_num?: number;
                                                        unstart_learner_num?: number;
                                                        vague_unstart_learner_num?: number;
                                                        processing_learner_num?: number;
                                                        vague_processing_learner_num?: number;
                                                        completed_learner_num?: number;
                                                        vague_completed_learner_num?: number;
                                                        average_learner_duration?: number;
                                                        avg_rating?: number;
                                                        lesson_list?: Array<{
                                                            id?: string;
                                                            name?: string;
                                                            type?: number;
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=course&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=course&version=v2 document }
                 *
                 * 获取课程列表
                 *
                 * 可通过课程 ID 列表，所有者 ID 或者无参数查询课程信息，无参数时返回该租户下的所有课程，通过该接口，应用可获取到课程的标题、描述、分类、频道、可见范围、课节、学员数等信息。;;;限流策略：每个应用每个租户20次/分钟
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            course_id_list?: Array<string>;
                            lang?: "zh" | "en";
                            owner_id?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
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
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        cover_url?: string;
                                        owner?: {
                                            user_id?: string;
                                            email?: string;
                                        };
                                        teacher_list?: Array<{
                                            user_id?: string;
                                            email?: string;
                                        }>;
                                        lecture_list?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                        category_list?: Array<{
                                            id?: string;
                                            name?: Array<{
                                                name?: string;
                                                lang?: string;
                                            }>;
                                        }>;
                                        channel_list?: Array<{
                                            id?: string;
                                            name?: Array<{
                                                name?: string;
                                                lang?: string;
                                            }>;
                                        }>;
                                        visible_scope_info?: {
                                            visible_status?: number;
                                            scope_group_list?: Array<{
                                                scope_list?: Array<{
                                                    id?: string;
                                                    name?: string;
                                                    department_type?: number;
                                                }>;
                                                scope_type?: string;
                                                entry_date?: {
                                                    from?: string;
                                                    to?: string;
                                                };
                                            }>;
                                        };
                                        publish_status?: number;
                                        created_at?: number;
                                        published_at?: number;
                                        total_learner_num?: number;
                                        vague_total_learner_num?: number;
                                        unstart_learner_num?: number;
                                        vague_unstart_learner_num?: number;
                                        processing_learner_num?: number;
                                        vague_processing_learner_num?: number;
                                        completed_learner_num?: number;
                                        vague_completed_learner_num?: number;
                                        average_learner_duration?: number;
                                        avg_rating?: number;
                                        lesson_list?: Array<{
                                            id?: string;
                                            name?: string;
                                            type?: number;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v2/courses`,
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
             * course_registration
             */
            courseRegistration: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            learner_id_list?: Array<string>;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            course_id?: string;
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
                                    `${this.domain}/open-apis/elearning/v2/course_registrations`,
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
                                                        course_id?: string;
                                                        learner?: {
                                                            user_id?: string;
                                                            email?: string;
                                                        };
                                                        enroll_at?: number;
                                                        enroll_type?: number;
                                                        learning_duration?: number;
                                                        finished_at?: number;
                                                        learning_state?: number;
                                                        compulsory_lesson_id_list?: Array<string>;
                                                        learned_compulsory_lesson_id_list?: Array<string>;
                                                        optional_lesson_id_list?: Array<string>;
                                                        learned_optional_lesson_id_list?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=course_registration&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=course_registration&version=v2 document }
                 *
                 * 获取课程学习记录
                 *
                 * 可通过课程 ID 或学员 ID 进行查询，通过该接口，应用可获取到某个课程下所有或指定学员的学习记录或某学员的所有课程学习记录，从而进行数据分析、卡点控制或用于其他使用场景。;;;限流策略：每个应用每个租户20次/分钟
                 */
                list: async (
                    payload?: {
                        params?: {
                            learner_id_list?: Array<string>;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            course_id?: string;
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
                                    items?: Array<{
                                        course_id?: string;
                                        learner?: {
                                            user_id?: string;
                                            email?: string;
                                        };
                                        enroll_at?: number;
                                        enroll_type?: number;
                                        learning_duration?: number;
                                        finished_at?: number;
                                        learning_state?: number;
                                        compulsory_lesson_id_list?: Array<string>;
                                        learned_compulsory_lesson_id_list?: Array<string>;
                                        optional_lesson_id_list?: Array<string>;
                                        learned_optional_lesson_id_list?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v2/course_registrations`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=course_registration&apiName=enroll&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=enroll&project=elearning&resource=course_registration&version=v2 document }
                 *
                 * 指派学员加入课程
                 *
                 * 通过「管理员指派」的方式将学员加入课程中，学员即可参与到课程的学习中。;;;限流策略：每个应用每个租户20次/分钟
                 */
                enroll: async (
                    payload?: {
                        data: {
                            course_id: string;
                            learner_id_list: Array<string>;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
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
                                `${this.domain}/open-apis/elearning/v2/course_registrations/enroll`,
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
             * train_program_registration
             */
            trainProgramRegistration: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            learner_id_list?: Array<string>;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            train_program_id?: string;
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
                                    `${this.domain}/open-apis/elearning/v2/train_program_registrations`,
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
                                                        train_program_id?: string;
                                                        learner?: {
                                                            user_id?: string;
                                                            email?: string;
                                                        };
                                                        enroll_at?: number;
                                                        enroll_type?: number;
                                                        online_seconds?: number;
                                                        learning_state?: number;
                                                        finished_at?: number;
                                                        compulsory_task_id_list?: Array<string>;
                                                        finished_compulsory_task_id_list?: Array<string>;
                                                        optional_task_id_list?: Array<string>;
                                                        finished_optional_task_id_list?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=train_program_registration&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=train_program_registration&version=v2 document }
                 *
                 * 获取项目学习记录
                 *
                 * 可通过项目 ID 或学员 ID 进行查询，通过该接口，应用可获取到某个项目下所有或指定学员的学习记录或某学员的所有项目学习记录，从而进行数据分析、卡点控制或用于其他使用场景。;;;限流策略：每个应用每个租户20次/分钟
                 */
                list: async (
                    payload?: {
                        params?: {
                            learner_id_list?: Array<string>;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            train_program_id?: string;
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
                                    items?: Array<{
                                        train_program_id?: string;
                                        learner?: {
                                            user_id?: string;
                                            email?: string;
                                        };
                                        enroll_at?: number;
                                        enroll_type?: number;
                                        online_seconds?: number;
                                        learning_state?: number;
                                        finished_at?: number;
                                        compulsory_task_id_list?: Array<string>;
                                        finished_compulsory_task_id_list?: Array<string>;
                                        optional_task_id_list?: Array<string>;
                                        finished_optional_task_id_list?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v2/train_program_registrations`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=train_program_registration&apiName=enroll&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=enroll&project=elearning&resource=train_program_registration&version=v2 document }
                 *
                 * 将学员加入项目
                 *
                 * 通过「管理员指派」的方式将学员加入项目中，学员即可参与到项目的学习中。;;;限流策略：每个应用每个租户20次/分钟
                 */
                enroll: async (
                    payload?: {
                        data: {
                            train_program_id: string;
                            learner_id_list: Array<string>;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
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
                                `${this.domain}/open-apis/elearning/v2/train_program_registrations/enroll`,
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
             * lesson_study_record
             */
            lessonStudyRecord: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            learner_id_list?: Array<string>;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            course_id: string;
                            lesson_id: string;
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
                                    `${this.domain}/open-apis/elearning/v2/lesson_study_records`,
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
                                                        lesson_id?: string;
                                                        course_id?: string;
                                                        learner?: {
                                                            user_id?: string;
                                                            email?: string;
                                                        };
                                                        learning_state?: number;
                                                        exam_record_list?: Array<{
                                                            score?: number;
                                                            answering_duration?: string;
                                                            end_time?: string;
                                                        }>;
                                                        finished_at?: number;
                                                        thought?: string;
                                                        activity_session_record?: {
                                                            activity_session_info?: {
                                                                start_at?: number;
                                                                end_at?: number;
                                                                timezone?: string;
                                                            };
                                                            sign_in_at?: number;
                                                            online_seconds?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=lesson_study_record&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=lesson_study_record&version=v2 document }
                 *
                 * 获取课节学习记录
                 *
                 * 通过课程 ID 和课节 ID 进行查询，通过该接口，应用可获取到某个课节下的所有或指定学员的学习记录，从而进行数据分析、卡点控制或用于其他使用场景。;;;限流策略：每个应用每个租户20次/分钟
                 */
                list: async (
                    payload?: {
                        params: {
                            learner_id_list?: Array<string>;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            course_id: string;
                            lesson_id: string;
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
                                    items?: Array<{
                                        lesson_id?: string;
                                        course_id?: string;
                                        learner?: {
                                            user_id?: string;
                                            email?: string;
                                        };
                                        learning_state?: number;
                                        exam_record_list?: Array<{
                                            score?: number;
                                            answering_duration?: string;
                                            end_time?: string;
                                        }>;
                                        finished_at?: number;
                                        thought?: string;
                                        activity_session_record?: {
                                            activity_session_info?: {
                                                start_at?: number;
                                                end_at?: number;
                                                timezone?: string;
                                            };
                                            sign_in_at?: number;
                                            online_seconds?: number;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v2/lesson_study_records`,
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
             * training_registration
             */
            trainingRegistration: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            learner_ids?: Array<string>;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            training_id?: string;
                            session_id?: string;
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
                                    `${this.domain}/open-apis/elearning/v2/training_registrations`,
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
                                                        training_id?: string;
                                                        session_id?: string;
                                                        learner?: {
                                                            user_id?: string;
                                                            email?: string;
                                                        };
                                                        enroll_at?: string;
                                                        enroll_type?: number;
                                                        enroll_sub_type?: number;
                                                        sign_in_state?: number;
                                                        learning_state?: number;
                                                        completion_condition?: {
                                                            condition_type?: number;
                                                            duration?: number;
                                                            playback_duration?: number;
                                                        };
                                                        meeting_duration?: number;
                                                        playback_duration?: number;
                                                        finished_at?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=training_registration&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=training_registration&version=v2 document }
                 *
                 * 获取活动学习记录
                 *
                 * 可通过活动 ID 或活动期次ID 或学员 ID 进行查询，通过该接口，应用可获取到某个活动/活动期次下所有或指定学员的学习记录或某学员的所有活动学习记录，从而进行数据分析、卡点控制或用于其他使用场景。
                 */
                list: async (
                    payload?: {
                        params?: {
                            learner_ids?: Array<string>;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            training_id?: string;
                            session_id?: string;
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
                                    items?: Array<{
                                        training_id?: string;
                                        session_id?: string;
                                        learner?: {
                                            user_id?: string;
                                            email?: string;
                                        };
                                        enroll_at?: string;
                                        enroll_type?: number;
                                        enroll_sub_type?: number;
                                        sign_in_state?: number;
                                        learning_state?: number;
                                        completion_condition?: {
                                            condition_type?: number;
                                            duration?: number;
                                            playback_duration?: number;
                                        };
                                        meeting_duration?: number;
                                        playback_duration?: number;
                                        finished_at?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v2/training_registrations`,
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
             * user
             */
            user: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=user&apiName=find_external_userinfo_by_phones_or_emails&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=find_external_userinfo_by_phones_or_emails&project=elearning&resource=user&version=v2 document }
                 *
                 * 根据手机号码或者邮箱列表获取外部用户信息
                 *
                 * 可通过手机号码或者邮箱列表获取外部用户信息。返回的外部用户信息字段有外部用户ID、外部用户邮箱、外部用户手机号码、外部用户姓名、用户状态。当通过手机号码查询时，邮箱返回为空；当通过邮箱查询时，手机号码返回为空;;;限流策略：每个应用每个租户20次/分钟
                 */
                findExternalUserinfoByPhonesOrEmails: async (
                    payload?: {
                        params: {
                            targets: Array<string>;
                            targets_type: "phone" | "email";
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
                                        user_id?: string;
                                        email?: string;
                                        phone?: string;
                                        name?: string;
                                        active?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v2/users/find_external_userinfo_by_phones_or_emails`,
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
             * train_program
             */
            trainProgram: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            train_program_id_list?: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            lang?: "zh" | "en";
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            owner_id?: string;
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
                                    `${this.domain}/open-apis/elearning/v2/train_programs`,
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
                                                        id?: string;
                                                        title?: string;
                                                        description?: string;
                                                        cover_link?: string;
                                                        owner?: {
                                                            user_id?: string;
                                                            email?: string;
                                                        };
                                                        category_list?: Array<{
                                                            id?: string;
                                                            name?: Array<{
                                                                name?: string;
                                                                lang?: string;
                                                            }>;
                                                        }>;
                                                        visible_scope_info?: {
                                                            visible_status?: number;
                                                            scope_group_list?: Array<{
                                                                scope_list?: Array<{
                                                                    id?: string;
                                                                    name?: string;
                                                                    department_type?: number;
                                                                }>;
                                                                scope_type?: string;
                                                                entry_date?: {
                                                                    from?: string;
                                                                    to?: string;
                                                                };
                                                            }>;
                                                        };
                                                        created_at?: number;
                                                        published_at?: number;
                                                        publish_status?: number;
                                                        total_learner_num?: number;
                                                        vague_total_learner_num?: number;
                                                        learning_learner_num?: number;
                                                        vague_learning_learner_num?: number;
                                                        completed_learner_num?: number;
                                                        vague_completed_learner_num?: number;
                                                        score?: number;
                                                        stage_list?: Array<{
                                                            id?: string;
                                                            name?: string;
                                                            task_list?: Array<{
                                                                id?: string;
                                                                name?: string;
                                                                type?: number;
                                                                is_disable?: boolean;
                                                            }>;
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=train_program&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=train_program&version=v2 document }
                 *
                 * 获取项目列表
                 *
                 * 可通过项目 ID 列表，所有者 ID 或者无参数查询项目信息，无参数时返回该租户下的所有项目，通过该接口，应用可获取到项目的标题、简介、分类、可见范围、任务、打分、学员数等信息。;;;限流策略：每个应用每个租户20次/分钟
                 */
                list: async (
                    payload?: {
                        params?: {
                            train_program_id_list?: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            lang?: "zh" | "en";
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            owner_id?: string;
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
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        cover_link?: string;
                                        owner?: {
                                            user_id?: string;
                                            email?: string;
                                        };
                                        category_list?: Array<{
                                            id?: string;
                                            name?: Array<{
                                                name?: string;
                                                lang?: string;
                                            }>;
                                        }>;
                                        visible_scope_info?: {
                                            visible_status?: number;
                                            scope_group_list?: Array<{
                                                scope_list?: Array<{
                                                    id?: string;
                                                    name?: string;
                                                    department_type?: number;
                                                }>;
                                                scope_type?: string;
                                                entry_date?: {
                                                    from?: string;
                                                    to?: string;
                                                };
                                            }>;
                                        };
                                        created_at?: number;
                                        published_at?: number;
                                        publish_status?: number;
                                        total_learner_num?: number;
                                        vague_total_learner_num?: number;
                                        learning_learner_num?: number;
                                        vague_learning_learner_num?: number;
                                        completed_learner_num?: number;
                                        vague_completed_learner_num?: number;
                                        score?: number;
                                        stage_list?: Array<{
                                            id?: string;
                                            name?: string;
                                            task_list?: Array<{
                                                id?: string;
                                                name?: string;
                                                type?: number;
                                                is_disable?: boolean;
                                            }>;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v2/train_programs`,
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
             * certificate_acquisition
             */
            certificateAcquisition: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            learner_id_list?: Array<string>;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            cert_id?: string;
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
                                    `${this.domain}/open-apis/elearning/v2/certificate_acquisitions`,
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
                                                        cert_id?: string;
                                                        learner?: {
                                                            user_id?: string;
                                                            email?: string;
                                                        };
                                                        origin?: {
                                                            object_id?: string;
                                                            object_type?: number;
                                                        };
                                                        issued_at?: number;
                                                        status?: number;
                                                        cover_link?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=elearning&resource=certificate_acquisition&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=elearning&resource=certificate_acquisition&version=v2 document }
                 *
                 * 获取证书获取记录
                 *
                 * 可通过证书 ID 或学员 ID 进行查询，通过该接口，应用可获取到某个证书下所有或指定学员的颁发记录或某学员被颁发的所有证书，从而进行数据分析、卡点控制或用于其他使用场景。;;;限流策略：每个应用每个租户20次/分钟
                 */
                list: async (
                    payload?: {
                        params?: {
                            learner_id_list?: Array<string>;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "in_user_id";
                            cert_id?: string;
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
                                    items?: Array<{
                                        cert_id?: string;
                                        learner?: {
                                            user_id?: string;
                                            email?: string;
                                        };
                                        origin?: {
                                            object_id?: string;
                                            object_type?: number;
                                        };
                                        issued_at?: number;
                                        status?: number;
                                        cover_link?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/elearning/v2/certificate_acquisitions`,
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
