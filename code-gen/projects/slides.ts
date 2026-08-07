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
import slides_ai from "./slides_ai";

// auto gen
export default abstract class Client extends slides_ai {
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
    slides = {
        v1: {
            /**
             * presentation
             */
            presentation: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=slides&resource=presentation&version=v1 document }
                 *
                 * 获取指定版本的演示文稿
                 */
                get: async (
                    payload?: {
                        params?: { revision_id?: number };
                        path: { presentation_id: string };
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
                                    presentation?: {
                                        presentation_id: string;
                                        revision_id: number;
                                        title?: string;
                                        page_size?: {
                                            width: number;
                                            height: number;
                                        };
                                        masters?: Array<string>;
                                        layouts?: Array<string>;
                                        slides?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations/:presentation_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=slides&resource=presentation&version=v1 document }
                 *
                 * 更新最新版本的演示文稿，包括标题和页面大小
                 */
                patch: async (
                    payload?: {
                        data?: {
                            title?: string;
                            page_size?: { width: number; height: number };
                        };
                        params: { client_token: string };
                        path: { presentation_id: string };
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
                                    presentation?: {
                                        presentation_id: string;
                                        revision_id: number;
                                        title?: string;
                                        page_size?: {
                                            width: number;
                                            height: number;
                                        };
                                        masters?: Array<string>;
                                        layouts?: Array<string>;
                                        slides?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations/:presentation_id`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=slides&resource=presentation&version=v1 document }
                 *
                 * 创建演示文稿
                 */
                create: async (
                    payload?: {
                        data?: {
                            folder_token?: string;
                            title?: string;
                            page_size?: { width: number; height: number };
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
                                    presentation?: {
                                        presentation_id: string;
                                        revision_id: number;
                                        title?: string;
                                        page_size?: {
                                            width: number;
                                            height: number;
                                        };
                                        masters?: Array<string>;
                                        layouts?: Array<string>;
                                        slides?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations`,
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
             * presentation.page
             */
            presentationPage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation.page&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=slides&resource=presentation.page&version=v1 document }
                 *
                 * 批量删除指定版本的演示文稿的页面
                 */
                batchDelete: async (
                    payload?: {
                        data: { page_ids: Array<string> };
                        params: { client_token: string; revision_id?: number };
                        path: { presentation_id: string };
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
                                data?: { revision_id?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations/:presentation_id/pages/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation.page&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=slides&resource=presentation.page&version=v1 document }
                 *
                 * 在指定版本的演示文稿下批量创建页面
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            commands: Array<{
                                page: {
                                    page_id: string;
                                    page_type: "Slide" | "Master" | "Layout";
                                    page_elements?: Array<string>;
                                    element_animation_ids?: Array<string>;
                                    page_properties?: {
                                        background?: {
                                            fill?: {
                                                color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                image?: {
                                                    alpha?: number;
                                                    token?: string;
                                                    mime_type?: string;
                                                    size?: number;
                                                    width?: number;
                                                    height?: number;
                                                    name?: string;
                                                };
                                            };
                                            enable?: boolean;
                                        };
                                        animation?: {
                                            type?:
                                                | "fade"
                                                | "push"
                                                | "cover"
                                                | "pull"
                                                | "slidesFlip"
                                                | "undefined";
                                            duration_ms?: number;
                                            effect?:
                                                | "from_bottom"
                                                | "from_top"
                                                | "from_left"
                                                | "from_right"
                                                | "horizontal"
                                                | "vertical"
                                                | "smoothly"
                                                | "through_black"
                                                | "undefined";
                                        };
                                    };
                                    master_properties?: {
                                        name?: string;
                                        layouts?: Array<string>;
                                        format?: {
                                            title?: {
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                font_size?: number;
                                                font_family?: string;
                                                bold?: boolean;
                                                italic?: boolean;
                                                underline?: boolean;
                                                strikethrough?: boolean;
                                                letter_spacing?: number;
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                padding?: {
                                                    top?: number;
                                                    bottom?: number;
                                                    left?: number;
                                                    right?: number;
                                                };
                                            };
                                            headline?: {
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                font_size?: number;
                                                font_family?: string;
                                                bold?: boolean;
                                                italic?: boolean;
                                                underline?: boolean;
                                                strikethrough?: boolean;
                                                letter_spacing?: number;
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                padding?: {
                                                    top?: number;
                                                    bottom?: number;
                                                    left?: number;
                                                    right?: number;
                                                };
                                            };
                                            subheadline?: {
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                font_size?: number;
                                                font_family?: string;
                                                bold?: boolean;
                                                italic?: boolean;
                                                underline?: boolean;
                                                strikethrough?: boolean;
                                                letter_spacing?: number;
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                padding?: {
                                                    top?: number;
                                                    bottom?: number;
                                                    left?: number;
                                                    right?: number;
                                                };
                                            };
                                            normal_text?: {
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                font_size?: number;
                                                font_family?: string;
                                                bold?: boolean;
                                                italic?: boolean;
                                                underline?: boolean;
                                                strikethrough?: boolean;
                                                letter_spacing?: number;
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                padding?: {
                                                    top?: number;
                                                    bottom?: number;
                                                    left?: number;
                                                    right?: number;
                                                };
                                            };
                                            small_text?: {
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                font_size?: number;
                                                font_family?: string;
                                                bold?: boolean;
                                                italic?: boolean;
                                                underline?: boolean;
                                                strikethrough?: boolean;
                                                letter_spacing?: number;
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                padding?: {
                                                    top?: number;
                                                    bottom?: number;
                                                    left?: number;
                                                    right?: number;
                                                };
                                            };
                                            shape?: {
                                                element?: {
                                                    background?: {
                                                        fill?: {
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            image?: {
                                                                alpha?: number;
                                                                token?: string;
                                                                mime_type?: string;
                                                                size?: number;
                                                                width?: number;
                                                                height?: number;
                                                                name?: string;
                                                            };
                                                        };
                                                        enable?: boolean;
                                                    };
                                                    border?: {
                                                        enable?: boolean;
                                                        width?: number;
                                                        style?:
                                                            | "Solid"
                                                            | "Dash"
                                                            | "Dot"
                                                            | "LongDash"
                                                            | "RoundDot"
                                                            | "SysDot"
                                                            | "SysDash"
                                                            | "DashDot"
                                                            | "LongDashDot"
                                                            | "LongDashDotDot"
                                                            | "Undefined";
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                text?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                            };
                                            table?: {
                                                element?: {
                                                    background?: {
                                                        fill?: {
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            image?: {
                                                                alpha?: number;
                                                                token?: string;
                                                                mime_type?: string;
                                                                size?: number;
                                                                width?: number;
                                                                height?: number;
                                                                name?: string;
                                                            };
                                                        };
                                                        enable?: boolean;
                                                    };
                                                    border?: {
                                                        enable?: boolean;
                                                        width?: number;
                                                        style?:
                                                            | "Solid"
                                                            | "Dash"
                                                            | "Dot"
                                                            | "LongDash"
                                                            | "RoundDot"
                                                            | "SysDot"
                                                            | "SysDash"
                                                            | "DashDot"
                                                            | "LongDashDot"
                                                            | "LongDashDotDot"
                                                            | "Undefined";
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                text?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                            };
                                            line?: {
                                                element?: {
                                                    background?: {
                                                        fill?: {
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            image?: {
                                                                alpha?: number;
                                                                token?: string;
                                                                mime_type?: string;
                                                                size?: number;
                                                                width?: number;
                                                                height?: number;
                                                                name?: string;
                                                            };
                                                        };
                                                        enable?: boolean;
                                                    };
                                                    border?: {
                                                        enable?: boolean;
                                                        width?: number;
                                                        style?:
                                                            | "Solid"
                                                            | "Dash"
                                                            | "Dot"
                                                            | "LongDash"
                                                            | "RoundDot"
                                                            | "SysDot"
                                                            | "SysDash"
                                                            | "DashDot"
                                                            | "LongDashDot"
                                                            | "LongDashDotDot"
                                                            | "Undefined";
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    layout_properties?: {
                                        master_id?: string;
                                        name?: string;
                                    };
                                    slide_properties?: {
                                        layout_id?: string;
                                        note?: {
                                            texts?: Array<{
                                                elements?: Array<{
                                                    type:
                                                        | "TextRun"
                                                        | "MentionUser"
                                                        | "MentionDoc";
                                                    style?: {
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strikethrough?: boolean;
                                                        underline?: boolean;
                                                        font_size?: number;
                                                        font_family?: string;
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        background_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        link?: { url: string };
                                                    };
                                                    text_run?: {
                                                        content: string;
                                                    };
                                                    mention_user?: {
                                                        user_id: string;
                                                    };
                                                    mention_doc?: {
                                                        type:
                                                            | "Doc"
                                                            | "DocX"
                                                            | "Sheet"
                                                            | "Bitable"
                                                            | "Mindnote"
                                                            | "File"
                                                            | "Slides"
                                                            | "Wiki"
                                                            | "Undefined";
                                                        token: string;
                                                        url?: string;
                                                        title?: string;
                                                    };
                                                }>;
                                                style?: {
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    letter_spacing?: number;
                                                    h_align?:
                                                        | "left"
                                                        | "right"
                                                        | "center";
                                                    list?: {
                                                        type?:
                                                            | "Ordered"
                                                            | "Bullet";
                                                        nesting_level?: number;
                                                        number?: string;
                                                        style?:
                                                            | "OrderedStyle1"
                                                            | "OrderedStyle2"
                                                            | "OrderedStyle3"
                                                            | "OrderedStyle4"
                                                            | "OrderedStyle5"
                                                            | "OrderedStyle6"
                                                            | "BulletStyle1"
                                                            | "BulletStyle2"
                                                            | "BulletStyle3"
                                                            | "BulletStyle4"
                                                            | "BulletStyle5"
                                                            | "BulletStyle6"
                                                            | "Undefined";
                                                    };
                                                };
                                            }>;
                                        };
                                        is_skipped?: boolean;
                                    };
                                };
                                index?: number;
                            }>;
                        };
                        params: {
                            client_token: string;
                            revision_id?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { presentation_id: string };
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
                                    revision_id?: number;
                                    pages?: Array<{
                                        page_id: string;
                                        page_type:
                                            | "Slide"
                                            | "Master"
                                            | "Layout";
                                        page_elements?: Array<string>;
                                        element_animation_ids?: Array<string>;
                                        page_properties?: {
                                            background?: {
                                                fill?: {
                                                    color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    image?: {
                                                        alpha?: number;
                                                        token?: string;
                                                        mime_type?: string;
                                                        size?: number;
                                                        width?: number;
                                                        height?: number;
                                                        name?: string;
                                                    };
                                                };
                                                enable?: boolean;
                                            };
                                            animation?: {
                                                type?:
                                                    | "fade"
                                                    | "push"
                                                    | "cover"
                                                    | "pull"
                                                    | "slidesFlip"
                                                    | "undefined";
                                                duration_ms?: number;
                                                effect?:
                                                    | "from_bottom"
                                                    | "from_top"
                                                    | "from_left"
                                                    | "from_right"
                                                    | "horizontal"
                                                    | "vertical"
                                                    | "smoothly"
                                                    | "through_black"
                                                    | "undefined";
                                            };
                                        };
                                        master_properties?: {
                                            name?: string;
                                            layouts?: Array<string>;
                                            format?: {
                                                title?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                headline?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                subheadline?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                normal_text?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                small_text?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                shape?: {
                                                    element?: {
                                                        background?: {
                                                            fill?: {
                                                                color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                image?: {
                                                                    alpha?: number;
                                                                    token?: string;
                                                                    mime_type?: string;
                                                                    size?: number;
                                                                    width?: number;
                                                                    height?: number;
                                                                    name?: string;
                                                                };
                                                            };
                                                            enable?: boolean;
                                                        };
                                                        border?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    text?: {
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        font_size?: number;
                                                        font_family?: string;
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        underline?: boolean;
                                                        strikethrough?: boolean;
                                                        letter_spacing?: number;
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        padding?: {
                                                            top?: number;
                                                            bottom?: number;
                                                            left?: number;
                                                            right?: number;
                                                        };
                                                    };
                                                };
                                                table?: {
                                                    element?: {
                                                        background?: {
                                                            fill?: {
                                                                color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                image?: {
                                                                    alpha?: number;
                                                                    token?: string;
                                                                    mime_type?: string;
                                                                    size?: number;
                                                                    width?: number;
                                                                    height?: number;
                                                                    name?: string;
                                                                };
                                                            };
                                                            enable?: boolean;
                                                        };
                                                        border?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    text?: {
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        font_size?: number;
                                                        font_family?: string;
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        underline?: boolean;
                                                        strikethrough?: boolean;
                                                        letter_spacing?: number;
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        padding?: {
                                                            top?: number;
                                                            bottom?: number;
                                                            left?: number;
                                                            right?: number;
                                                        };
                                                    };
                                                };
                                                line?: {
                                                    element?: {
                                                        background?: {
                                                            fill?: {
                                                                color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                image?: {
                                                                    alpha?: number;
                                                                    token?: string;
                                                                    mime_type?: string;
                                                                    size?: number;
                                                                    width?: number;
                                                                    height?: number;
                                                                    name?: string;
                                                                };
                                                            };
                                                            enable?: boolean;
                                                        };
                                                        border?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        layout_properties?: {
                                            master_id?: string;
                                            name?: string;
                                        };
                                        slide_properties?: {
                                            layout_id?: string;
                                            note?: {
                                                texts?: Array<{
                                                    elements?: Array<{
                                                        type:
                                                            | "TextRun"
                                                            | "MentionUser"
                                                            | "MentionDoc";
                                                        style?: {
                                                            bold?: boolean;
                                                            italic?: boolean;
                                                            strikethrough?: boolean;
                                                            underline?: boolean;
                                                            font_size?: number;
                                                            font_family?: string;
                                                            font_color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            background_color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            link?: {
                                                                url: string;
                                                            };
                                                        };
                                                        text_run?: {
                                                            content: string;
                                                        };
                                                        mention_user?: {
                                                            user_id: string;
                                                        };
                                                        mention_doc?: {
                                                            type:
                                                                | "Doc"
                                                                | "DocX"
                                                                | "Sheet"
                                                                | "Bitable"
                                                                | "Mindnote"
                                                                | "File"
                                                                | "Slides"
                                                                | "Wiki"
                                                                | "Undefined";
                                                            token: string;
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                    }>;
                                                    style?: {
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        letter_spacing?: number;
                                                        h_align?:
                                                            | "left"
                                                            | "right"
                                                            | "center";
                                                        list?: {
                                                            type?:
                                                                | "Ordered"
                                                                | "Bullet";
                                                            nesting_level?: number;
                                                            number?: string;
                                                            style?:
                                                                | "OrderedStyle1"
                                                                | "OrderedStyle2"
                                                                | "OrderedStyle3"
                                                                | "OrderedStyle4"
                                                                | "OrderedStyle5"
                                                                | "OrderedStyle6"
                                                                | "BulletStyle1"
                                                                | "BulletStyle2"
                                                                | "BulletStyle3"
                                                                | "BulletStyle4"
                                                                | "BulletStyle5"
                                                                | "BulletStyle6"
                                                                | "Undefined";
                                                        };
                                                    };
                                                }>;
                                            };
                                            is_skipped?: boolean;
                                        };
                                    }>;
                                    id_relations?: Array<{
                                        temp_id: string;
                                        real_id: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations/:presentation_id/pages/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation.page&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=slides&resource=presentation.page&version=v1 document }
                 *
                 * 批量更新指定版本的演示文稿的页面
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            commands: Array<{
                                page_id: string;
                                command_type:
                                    | "update_page_properties"
                                    | "update_slide_properties"
                                    | "update_layout_properties"
                                    | "update_master_properties";
                                update_page_properties?: {
                                    background?: {
                                        fill?: {
                                            color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                            image?: {
                                                alpha?: number;
                                                token?: string;
                                                mime_type?: string;
                                                size?: number;
                                                width?: number;
                                                height?: number;
                                                name?: string;
                                            };
                                        };
                                        enable?: boolean;
                                    };
                                    animation?: {
                                        type?:
                                            | "fade"
                                            | "push"
                                            | "cover"
                                            | "pull"
                                            | "slidesFlip"
                                            | "undefined";
                                        duration_ms?: number;
                                        effect?:
                                            | "from_bottom"
                                            | "from_top"
                                            | "from_left"
                                            | "from_right"
                                            | "horizontal"
                                            | "vertical"
                                            | "smoothly"
                                            | "through_black"
                                            | "undefined";
                                    };
                                };
                                update_slide_properties?: {
                                    layout_id?: string;
                                    note?: {
                                        texts?: Array<{
                                            elements?: Array<{
                                                type:
                                                    | "TextRun"
                                                    | "MentionUser"
                                                    | "MentionDoc";
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strikethrough?: boolean;
                                                    underline?: boolean;
                                                    font_size?: number;
                                                    font_family?: string;
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    background_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    link?: { url: string };
                                                };
                                                text_run?: { content: string };
                                                mention_user?: {
                                                    user_id: string;
                                                };
                                                mention_doc?: {
                                                    type:
                                                        | "Doc"
                                                        | "DocX"
                                                        | "Sheet"
                                                        | "Bitable"
                                                        | "Mindnote"
                                                        | "File"
                                                        | "Slides"
                                                        | "Wiki"
                                                        | "Undefined";
                                                    token: string;
                                                    url?: string;
                                                    title?: string;
                                                };
                                            }>;
                                            style?: {
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                letter_spacing?: number;
                                                h_align?:
                                                    | "left"
                                                    | "right"
                                                    | "center";
                                                list?: {
                                                    type?: "Ordered" | "Bullet";
                                                    nesting_level?: number;
                                                    number?: string;
                                                    style?:
                                                        | "OrderedStyle1"
                                                        | "OrderedStyle2"
                                                        | "OrderedStyle3"
                                                        | "OrderedStyle4"
                                                        | "OrderedStyle5"
                                                        | "OrderedStyle6"
                                                        | "BulletStyle1"
                                                        | "BulletStyle2"
                                                        | "BulletStyle3"
                                                        | "BulletStyle4"
                                                        | "BulletStyle5"
                                                        | "BulletStyle6"
                                                        | "Undefined";
                                                };
                                            };
                                        }>;
                                    };
                                    is_skipped?: boolean;
                                };
                                update_layout_properties?: {
                                    master_id?: string;
                                    name?: string;
                                };
                                update_master_properties?: {
                                    name?: string;
                                    layouts?: Array<string>;
                                    format?: {
                                        title?: {
                                            font_color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                            font_size?: number;
                                            font_family?: string;
                                            bold?: boolean;
                                            italic?: boolean;
                                            underline?: boolean;
                                            strikethrough?: boolean;
                                            letter_spacing?: number;
                                            line_spacing?: {
                                                type: "Multiple" | "Fixed";
                                                value: number;
                                            };
                                            padding?: {
                                                top?: number;
                                                bottom?: number;
                                                left?: number;
                                                right?: number;
                                            };
                                        };
                                        headline?: {
                                            font_color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                            font_size?: number;
                                            font_family?: string;
                                            bold?: boolean;
                                            italic?: boolean;
                                            underline?: boolean;
                                            strikethrough?: boolean;
                                            letter_spacing?: number;
                                            line_spacing?: {
                                                type: "Multiple" | "Fixed";
                                                value: number;
                                            };
                                            padding?: {
                                                top?: number;
                                                bottom?: number;
                                                left?: number;
                                                right?: number;
                                            };
                                        };
                                        subheadline?: {
                                            font_color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                            font_size?: number;
                                            font_family?: string;
                                            bold?: boolean;
                                            italic?: boolean;
                                            underline?: boolean;
                                            strikethrough?: boolean;
                                            letter_spacing?: number;
                                            line_spacing?: {
                                                type: "Multiple" | "Fixed";
                                                value: number;
                                            };
                                            padding?: {
                                                top?: number;
                                                bottom?: number;
                                                left?: number;
                                                right?: number;
                                            };
                                        };
                                        normal_text?: {
                                            font_color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                            font_size?: number;
                                            font_family?: string;
                                            bold?: boolean;
                                            italic?: boolean;
                                            underline?: boolean;
                                            strikethrough?: boolean;
                                            letter_spacing?: number;
                                            line_spacing?: {
                                                type: "Multiple" | "Fixed";
                                                value: number;
                                            };
                                            padding?: {
                                                top?: number;
                                                bottom?: number;
                                                left?: number;
                                                right?: number;
                                            };
                                        };
                                        small_text?: {
                                            font_color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                            font_size?: number;
                                            font_family?: string;
                                            bold?: boolean;
                                            italic?: boolean;
                                            underline?: boolean;
                                            strikethrough?: boolean;
                                            letter_spacing?: number;
                                            line_spacing?: {
                                                type: "Multiple" | "Fixed";
                                                value: number;
                                            };
                                            padding?: {
                                                top?: number;
                                                bottom?: number;
                                                left?: number;
                                                right?: number;
                                            };
                                        };
                                        shape?: {
                                            element?: {
                                                background?: {
                                                    fill?: {
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        image?: {
                                                            alpha?: number;
                                                            token?: string;
                                                            mime_type?: string;
                                                            size?: number;
                                                            width?: number;
                                                            height?: number;
                                                            name?: string;
                                                        };
                                                    };
                                                    enable?: boolean;
                                                };
                                                border?: {
                                                    enable?: boolean;
                                                    width?: number;
                                                    style?:
                                                        | "Solid"
                                                        | "Dash"
                                                        | "Dot"
                                                        | "LongDash"
                                                        | "RoundDot"
                                                        | "SysDot"
                                                        | "SysDash"
                                                        | "DashDot"
                                                        | "LongDashDot"
                                                        | "LongDashDotDot"
                                                        | "Undefined";
                                                    color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                            text?: {
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                font_size?: number;
                                                font_family?: string;
                                                bold?: boolean;
                                                italic?: boolean;
                                                underline?: boolean;
                                                strikethrough?: boolean;
                                                letter_spacing?: number;
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                padding?: {
                                                    top?: number;
                                                    bottom?: number;
                                                    left?: number;
                                                    right?: number;
                                                };
                                            };
                                        };
                                        table?: {
                                            element?: {
                                                background?: {
                                                    fill?: {
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        image?: {
                                                            alpha?: number;
                                                            token?: string;
                                                            mime_type?: string;
                                                            size?: number;
                                                            width?: number;
                                                            height?: number;
                                                            name?: string;
                                                        };
                                                    };
                                                    enable?: boolean;
                                                };
                                                border?: {
                                                    enable?: boolean;
                                                    width?: number;
                                                    style?:
                                                        | "Solid"
                                                        | "Dash"
                                                        | "Dot"
                                                        | "LongDash"
                                                        | "RoundDot"
                                                        | "SysDot"
                                                        | "SysDash"
                                                        | "DashDot"
                                                        | "LongDashDot"
                                                        | "LongDashDotDot"
                                                        | "Undefined";
                                                    color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                            text?: {
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                font_size?: number;
                                                font_family?: string;
                                                bold?: boolean;
                                                italic?: boolean;
                                                underline?: boolean;
                                                strikethrough?: boolean;
                                                letter_spacing?: number;
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                padding?: {
                                                    top?: number;
                                                    bottom?: number;
                                                    left?: number;
                                                    right?: number;
                                                };
                                            };
                                        };
                                        line?: {
                                            element?: {
                                                background?: {
                                                    fill?: {
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        image?: {
                                                            alpha?: number;
                                                            token?: string;
                                                            mime_type?: string;
                                                            size?: number;
                                                            width?: number;
                                                            height?: number;
                                                            name?: string;
                                                        };
                                                    };
                                                    enable?: boolean;
                                                };
                                                border?: {
                                                    enable?: boolean;
                                                    width?: number;
                                                    style?:
                                                        | "Solid"
                                                        | "Dash"
                                                        | "Dot"
                                                        | "LongDash"
                                                        | "RoundDot"
                                                        | "SysDot"
                                                        | "SysDash"
                                                        | "DashDot"
                                                        | "LongDashDot"
                                                        | "LongDashDotDot"
                                                        | "Undefined";
                                                    color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            }>;
                        };
                        params: {
                            client_token: string;
                            revision_id?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { presentation_id: string };
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
                                    revision_id?: number;
                                    pages?: Array<{
                                        page_id: string;
                                        page_type:
                                            | "Slide"
                                            | "Master"
                                            | "Layout";
                                        page_elements?: Array<string>;
                                        element_animation_ids?: Array<string>;
                                        page_properties?: {
                                            background?: {
                                                fill?: {
                                                    color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    image?: {
                                                        alpha?: number;
                                                        token?: string;
                                                        mime_type?: string;
                                                        size?: number;
                                                        width?: number;
                                                        height?: number;
                                                        name?: string;
                                                    };
                                                };
                                                enable?: boolean;
                                            };
                                            animation?: {
                                                type?:
                                                    | "fade"
                                                    | "push"
                                                    | "cover"
                                                    | "pull"
                                                    | "slidesFlip"
                                                    | "undefined";
                                                duration_ms?: number;
                                                effect?:
                                                    | "from_bottom"
                                                    | "from_top"
                                                    | "from_left"
                                                    | "from_right"
                                                    | "horizontal"
                                                    | "vertical"
                                                    | "smoothly"
                                                    | "through_black"
                                                    | "undefined";
                                            };
                                        };
                                        master_properties?: {
                                            name?: string;
                                            layouts?: Array<string>;
                                            format?: {
                                                title?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                headline?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                subheadline?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                normal_text?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                small_text?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                shape?: {
                                                    element?: {
                                                        background?: {
                                                            fill?: {
                                                                color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                image?: {
                                                                    alpha?: number;
                                                                    token?: string;
                                                                    mime_type?: string;
                                                                    size?: number;
                                                                    width?: number;
                                                                    height?: number;
                                                                    name?: string;
                                                                };
                                                            };
                                                            enable?: boolean;
                                                        };
                                                        border?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    text?: {
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        font_size?: number;
                                                        font_family?: string;
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        underline?: boolean;
                                                        strikethrough?: boolean;
                                                        letter_spacing?: number;
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        padding?: {
                                                            top?: number;
                                                            bottom?: number;
                                                            left?: number;
                                                            right?: number;
                                                        };
                                                    };
                                                };
                                                table?: {
                                                    element?: {
                                                        background?: {
                                                            fill?: {
                                                                color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                image?: {
                                                                    alpha?: number;
                                                                    token?: string;
                                                                    mime_type?: string;
                                                                    size?: number;
                                                                    width?: number;
                                                                    height?: number;
                                                                    name?: string;
                                                                };
                                                            };
                                                            enable?: boolean;
                                                        };
                                                        border?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    text?: {
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        font_size?: number;
                                                        font_family?: string;
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        underline?: boolean;
                                                        strikethrough?: boolean;
                                                        letter_spacing?: number;
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        padding?: {
                                                            top?: number;
                                                            bottom?: number;
                                                            left?: number;
                                                            right?: number;
                                                        };
                                                    };
                                                };
                                                line?: {
                                                    element?: {
                                                        background?: {
                                                            fill?: {
                                                                color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                image?: {
                                                                    alpha?: number;
                                                                    token?: string;
                                                                    mime_type?: string;
                                                                    size?: number;
                                                                    width?: number;
                                                                    height?: number;
                                                                    name?: string;
                                                                };
                                                            };
                                                            enable?: boolean;
                                                        };
                                                        border?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        layout_properties?: {
                                            master_id?: string;
                                            name?: string;
                                        };
                                        slide_properties?: {
                                            layout_id?: string;
                                            note?: {
                                                texts?: Array<{
                                                    elements?: Array<{
                                                        type:
                                                            | "TextRun"
                                                            | "MentionUser"
                                                            | "MentionDoc";
                                                        style?: {
                                                            bold?: boolean;
                                                            italic?: boolean;
                                                            strikethrough?: boolean;
                                                            underline?: boolean;
                                                            font_size?: number;
                                                            font_family?: string;
                                                            font_color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            background_color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            link?: {
                                                                url: string;
                                                            };
                                                        };
                                                        text_run?: {
                                                            content: string;
                                                        };
                                                        mention_user?: {
                                                            user_id: string;
                                                        };
                                                        mention_doc?: {
                                                            type:
                                                                | "Doc"
                                                                | "DocX"
                                                                | "Sheet"
                                                                | "Bitable"
                                                                | "Mindnote"
                                                                | "File"
                                                                | "Slides"
                                                                | "Wiki"
                                                                | "Undefined";
                                                            token: string;
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                    }>;
                                                    style?: {
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        letter_spacing?: number;
                                                        h_align?:
                                                            | "left"
                                                            | "right"
                                                            | "center";
                                                        list?: {
                                                            type?:
                                                                | "Ordered"
                                                                | "Bullet";
                                                            nesting_level?: number;
                                                            number?: string;
                                                            style?:
                                                                | "OrderedStyle1"
                                                                | "OrderedStyle2"
                                                                | "OrderedStyle3"
                                                                | "OrderedStyle4"
                                                                | "OrderedStyle5"
                                                                | "OrderedStyle6"
                                                                | "BulletStyle1"
                                                                | "BulletStyle2"
                                                                | "BulletStyle3"
                                                                | "BulletStyle4"
                                                                | "BulletStyle5"
                                                                | "BulletStyle6"
                                                                | "Undefined";
                                                        };
                                                    };
                                                }>;
                                            };
                                            is_skipped?: boolean;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations/:presentation_id/pages/batch_update`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation.page&apiName=batch_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=slides&resource=presentation.page&version=v1 document }
                 *
                 * 批量获取指定版本的演示文稿的页面
                 */
                batchGet: async (
                    payload?: {
                        data: { page_ids: Array<string> };
                        params?: {
                            revision_id?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { presentation_id: string };
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
                                    revision_id?: number;
                                    pages?: Array<{
                                        page_id: string;
                                        page_type:
                                            | "Slide"
                                            | "Master"
                                            | "Layout";
                                        page_elements?: Array<string>;
                                        element_animation_ids?: Array<string>;
                                        page_properties?: {
                                            background?: {
                                                fill?: {
                                                    color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    image?: {
                                                        alpha?: number;
                                                        token?: string;
                                                        mime_type?: string;
                                                        size?: number;
                                                        width?: number;
                                                        height?: number;
                                                        name?: string;
                                                    };
                                                };
                                                enable?: boolean;
                                            };
                                            animation?: {
                                                type?:
                                                    | "fade"
                                                    | "push"
                                                    | "cover"
                                                    | "pull"
                                                    | "slidesFlip"
                                                    | "undefined";
                                                duration_ms?: number;
                                                effect?:
                                                    | "from_bottom"
                                                    | "from_top"
                                                    | "from_left"
                                                    | "from_right"
                                                    | "horizontal"
                                                    | "vertical"
                                                    | "smoothly"
                                                    | "through_black"
                                                    | "undefined";
                                            };
                                        };
                                        master_properties?: {
                                            name?: string;
                                            layouts?: Array<string>;
                                            format?: {
                                                title?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                headline?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                subheadline?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                normal_text?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                small_text?: {
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    font_size?: number;
                                                    font_family?: string;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    underline?: boolean;
                                                    strikethrough?: boolean;
                                                    letter_spacing?: number;
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                shape?: {
                                                    element?: {
                                                        background?: {
                                                            fill?: {
                                                                color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                image?: {
                                                                    alpha?: number;
                                                                    token?: string;
                                                                    mime_type?: string;
                                                                    size?: number;
                                                                    width?: number;
                                                                    height?: number;
                                                                    name?: string;
                                                                };
                                                            };
                                                            enable?: boolean;
                                                        };
                                                        border?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    text?: {
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        font_size?: number;
                                                        font_family?: string;
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        underline?: boolean;
                                                        strikethrough?: boolean;
                                                        letter_spacing?: number;
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        padding?: {
                                                            top?: number;
                                                            bottom?: number;
                                                            left?: number;
                                                            right?: number;
                                                        };
                                                    };
                                                };
                                                table?: {
                                                    element?: {
                                                        background?: {
                                                            fill?: {
                                                                color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                image?: {
                                                                    alpha?: number;
                                                                    token?: string;
                                                                    mime_type?: string;
                                                                    size?: number;
                                                                    width?: number;
                                                                    height?: number;
                                                                    name?: string;
                                                                };
                                                            };
                                                            enable?: boolean;
                                                        };
                                                        border?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    text?: {
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        font_size?: number;
                                                        font_family?: string;
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        underline?: boolean;
                                                        strikethrough?: boolean;
                                                        letter_spacing?: number;
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        padding?: {
                                                            top?: number;
                                                            bottom?: number;
                                                            left?: number;
                                                            right?: number;
                                                        };
                                                    };
                                                };
                                                line?: {
                                                    element?: {
                                                        background?: {
                                                            fill?: {
                                                                color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                image?: {
                                                                    alpha?: number;
                                                                    token?: string;
                                                                    mime_type?: string;
                                                                    size?: number;
                                                                    width?: number;
                                                                    height?: number;
                                                                    name?: string;
                                                                };
                                                            };
                                                            enable?: boolean;
                                                        };
                                                        border?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        layout_properties?: {
                                            master_id?: string;
                                            name?: string;
                                        };
                                        slide_properties?: {
                                            layout_id?: string;
                                            note?: {
                                                texts?: Array<{
                                                    elements?: Array<{
                                                        type:
                                                            | "TextRun"
                                                            | "MentionUser"
                                                            | "MentionDoc";
                                                        style?: {
                                                            bold?: boolean;
                                                            italic?: boolean;
                                                            strikethrough?: boolean;
                                                            underline?: boolean;
                                                            font_size?: number;
                                                            font_family?: string;
                                                            font_color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            background_color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            link?: {
                                                                url: string;
                                                            };
                                                        };
                                                        text_run?: {
                                                            content: string;
                                                        };
                                                        mention_user?: {
                                                            user_id: string;
                                                        };
                                                        mention_doc?: {
                                                            type:
                                                                | "Doc"
                                                                | "DocX"
                                                                | "Sheet"
                                                                | "Bitable"
                                                                | "Mindnote"
                                                                | "File"
                                                                | "Slides"
                                                                | "Wiki"
                                                                | "Undefined";
                                                            token: string;
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                    }>;
                                                    style?: {
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        letter_spacing?: number;
                                                        h_align?:
                                                            | "left"
                                                            | "right"
                                                            | "center";
                                                        list?: {
                                                            type?:
                                                                | "Ordered"
                                                                | "Bullet";
                                                            nesting_level?: number;
                                                            number?: string;
                                                            style?:
                                                                | "OrderedStyle1"
                                                                | "OrderedStyle2"
                                                                | "OrderedStyle3"
                                                                | "OrderedStyle4"
                                                                | "OrderedStyle5"
                                                                | "OrderedStyle6"
                                                                | "BulletStyle1"
                                                                | "BulletStyle2"
                                                                | "BulletStyle3"
                                                                | "BulletStyle4"
                                                                | "BulletStyle5"
                                                                | "BulletStyle6"
                                                                | "Undefined";
                                                        };
                                                    };
                                                }>;
                                            };
                                            is_skipped?: boolean;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations/:presentation_id/pages/batch_get`,
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
             * presentation.page.page_element
             */
            presentationPagePageElement: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation.page.page_element&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=slides&resource=presentation.page.page_element&version=v1 document }
                 *
                 * 可批量删除指定版本的演示文稿的多个页面下的页面元素
                 */
                batchDelete: async (
                    payload?: {
                        data: { element_ids: Array<string> };
                        params: { client_token: string; revision_id?: number };
                        path: { presentation_id: string };
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
                                data?: { revision_id?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations/:presentation_id/pages/elements/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation.page.page_element&apiName=batch_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=slides&resource=presentation.page.page_element&version=v1 document }
                 *
                 * 可批量查询指定版本的演示文稿的多个页面下的页面元素
                 */
                batchGet: async (
                    payload?: {
                        data: { element_ids: Array<string> };
                        params?: {
                            revision_id?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { presentation_id: string };
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
                                    revision_id?: number;
                                    elements?: Array<{
                                        element_id: string;
                                        page_id: string;
                                        element_type:
                                            | "Shape"
                                            | "Image"
                                            | "Group"
                                            | "Audio"
                                            | "Video"
                                            | "Table"
                                            | "Line"
                                            | "Chart"
                                            | "Board"
                                            | "Animation"
                                            | "Graphics"
                                            | "Undefined";
                                        element_properties?: {
                                            size?: {
                                                width: number;
                                                height: number;
                                            };
                                            location?: { x: number; y: number };
                                            rotation?: number;
                                            skew?: {
                                                angle_x: number;
                                                angle_y: number;
                                            };
                                            flip?: {
                                                is_horizontal?: boolean;
                                                is_vertical?: boolean;
                                            };
                                            background?: {
                                                fill?: {
                                                    color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    image?: {
                                                        alpha?: number;
                                                        token?: string;
                                                        mime_type?: string;
                                                        size?: number;
                                                        width?: number;
                                                        height?: number;
                                                        name?: string;
                                                    };
                                                };
                                                enable?: boolean;
                                            };
                                            border?: {
                                                enable?: boolean;
                                                width?: number;
                                                style?:
                                                    | "Solid"
                                                    | "Dash"
                                                    | "Dot"
                                                    | "LongDash"
                                                    | "RoundDot"
                                                    | "SysDot"
                                                    | "SysDash"
                                                    | "DashDot"
                                                    | "LongDashDot"
                                                    | "LongDashDotDot"
                                                    | "Undefined";
                                                color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                            };
                                            alpha?: number;
                                            shadow?: {
                                                enable?: boolean;
                                                angle?: number;
                                                offset?: number;
                                                blur?: number;
                                                color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                            };
                                            reflection?: {
                                                enable?: boolean;
                                                alpha?: number;
                                                size?: number;
                                                offset?: number;
                                            };
                                            adjust_handler?: {
                                                preset_handlers?: Array<number>;
                                            };
                                        };
                                        shape?: {
                                            type?:
                                                | "Rectangle"
                                                | "Ellipse"
                                                | "Text"
                                                | "Triangle"
                                                | "LeftTriangle"
                                                | "RightTriangle"
                                                | "RegularPentagon"
                                                | "Star"
                                                | "FullRoundRectangle"
                                                | "RoundRectangle"
                                                | "Pentagon"
                                                | "Chevron"
                                                | "RightArrow"
                                                | "LeftRightArrow"
                                                | "RoundRectangleCallout1"
                                                | "RoundRectangleCallout2"
                                                | "RoundRectangleCallout3"
                                                | "RoundDiagonalCornerRectangle"
                                                | "RoundSingleCornerRectangle"
                                                | "ParalleLogram"
                                                | "Pie"
                                                | "Donut"
                                                | "BlockArc"
                                                | "Trapezoid"
                                                | "RectangularCallout"
                                                | "RoundedRectangularCallout"
                                                | "MathPlus"
                                                | "DownArrow"
                                                | "UpArrow"
                                                | "LeftArrow"
                                                | "Arc"
                                                | "Round2SameRect"
                                                | "Hexagon"
                                                | "Diamond"
                                                | "LeftBrace"
                                                | "RightBrace"
                                                | "FlowChartProcess"
                                                | "FlowChartAlternateProcess"
                                                | "StripedRightArrow"
                                                | "Teardrop"
                                                | "Undefined";
                                            texts?: Array<{
                                                elements?: Array<{
                                                    type:
                                                        | "TextRun"
                                                        | "MentionUser"
                                                        | "MentionDoc";
                                                    style?: {
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strikethrough?: boolean;
                                                        underline?: boolean;
                                                        font_size?: number;
                                                        font_family?: string;
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        background_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        link?: { url: string };
                                                    };
                                                    text_run?: {
                                                        content: string;
                                                    };
                                                    mention_user?: {
                                                        user_id: string;
                                                    };
                                                    mention_doc?: {
                                                        type:
                                                            | "Doc"
                                                            | "DocX"
                                                            | "Sheet"
                                                            | "Bitable"
                                                            | "Mindnote"
                                                            | "File"
                                                            | "Slides"
                                                            | "Wiki"
                                                            | "Undefined";
                                                        token: string;
                                                        url?: string;
                                                        title?: string;
                                                    };
                                                }>;
                                                style?: {
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    letter_spacing?: number;
                                                    h_align?:
                                                        | "left"
                                                        | "right"
                                                        | "center";
                                                    list?: {
                                                        type?:
                                                            | "Ordered"
                                                            | "Bullet";
                                                        nesting_level?: number;
                                                        number?: string;
                                                        style?:
                                                            | "OrderedStyle1"
                                                            | "OrderedStyle2"
                                                            | "OrderedStyle3"
                                                            | "OrderedStyle4"
                                                            | "OrderedStyle5"
                                                            | "OrderedStyle6"
                                                            | "BulletStyle1"
                                                            | "BulletStyle2"
                                                            | "BulletStyle3"
                                                            | "BulletStyle4"
                                                            | "BulletStyle5"
                                                            | "BulletStyle6"
                                                            | "Undefined";
                                                    };
                                                };
                                            }>;
                                            style?: {
                                                type?:
                                                    | "Title"
                                                    | "HeadLine"
                                                    | "SubHeadLine"
                                                    | "Text"
                                                    | "SmallText";
                                                v_align?:
                                                    | "top"
                                                    | "bottom"
                                                    | "middle";
                                                h_align?:
                                                    | "left"
                                                    | "right"
                                                    | "center";
                                                font_family?: string;
                                                font_size?: number;
                                                bold?: boolean;
                                                italic?: boolean;
                                                strikethrough?: boolean;
                                                underline?: boolean;
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                background_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                letter_spacing?: number;
                                                list_type?:
                                                    | "Ordered"
                                                    | "Bullet";
                                                list_style?:
                                                    | "OrderedStyle1"
                                                    | "OrderedStyle2"
                                                    | "OrderedStyle3"
                                                    | "OrderedStyle4"
                                                    | "OrderedStyle5"
                                                    | "OrderedStyle6"
                                                    | "BulletStyle1"
                                                    | "BulletStyle2"
                                                    | "BulletStyle3"
                                                    | "BulletStyle4"
                                                    | "BulletStyle5"
                                                    | "BulletStyle6"
                                                    | "Undefined";
                                                padding?: {
                                                    top?: number;
                                                    bottom?: number;
                                                    left?: number;
                                                    right?: number;
                                                };
                                            };
                                            placeholder?: {
                                                type:
                                                    | "Title"
                                                    | "HeadLine"
                                                    | "SubHeadLine"
                                                    | "Text"
                                                    | "SmallText"
                                                    | "Image";
                                                index?: string;
                                                inherited_id?: string;
                                            };
                                        };
                                        image?: {
                                            token?: string;
                                            mime_type?: string;
                                            size?: number;
                                            width?: number;
                                            height?: number;
                                            name?: string;
                                            exposure?: number;
                                            contrast?: number;
                                            saturation?: number;
                                            temperature?: number;
                                            crop?: {
                                                type:
                                                    | "Rectangle"
                                                    | "Ellipse"
                                                    | "Text"
                                                    | "Triangle"
                                                    | "LeftTriangle"
                                                    | "RightTriangle"
                                                    | "RegularPentagon"
                                                    | "Star"
                                                    | "FullRoundRectangle"
                                                    | "RoundRectangle"
                                                    | "Pentagon"
                                                    | "Chevron"
                                                    | "RightArrow"
                                                    | "LeftRightArrow"
                                                    | "RoundRectangleCallout1"
                                                    | "RoundRectangleCallout2"
                                                    | "RoundRectangleCallout3"
                                                    | "RoundDiagonalCornerRectangle"
                                                    | "RoundSingleCornerRectangle"
                                                    | "ParalleLogram"
                                                    | "Pie"
                                                    | "Donut"
                                                    | "BlockArc"
                                                    | "Trapezoid"
                                                    | "RectangularCallout"
                                                    | "RoundedRectangularCallout"
                                                    | "MathPlus"
                                                    | "DownArrow"
                                                    | "UpArrow"
                                                    | "LeftArrow"
                                                    | "Arc"
                                                    | "Round2SameRect"
                                                    | "Hexagon"
                                                    | "Diamond"
                                                    | "LeftBrace"
                                                    | "RightBrace"
                                                    | "FlowChartProcess"
                                                    | "FlowChartAlternateProcess"
                                                    | "StripedRightArrow"
                                                    | "Teardrop"
                                                    | "Undefined";
                                                left_offset: number;
                                                right_offset: number;
                                                top_offset: number;
                                                bottom_offset: number;
                                            };
                                            placeholder?: {
                                                type:
                                                    | "Title"
                                                    | "HeadLine"
                                                    | "SubHeadLine"
                                                    | "Text"
                                                    | "SmallText"
                                                    | "Image";
                                                index?: string;
                                                inherited_id?: string;
                                            };
                                        };
                                        video?: {
                                            token?: string;
                                            mime_type?: string;
                                            size?: number;
                                            width?: number;
                                            height?: number;
                                            name?: string;
                                            play_mode?: "auto" | "click";
                                        };
                                        audio?: {
                                            token?: string;
                                            mime_type?: string;
                                            size?: number;
                                            name?: string;
                                            play_mode?: "auto" | "click";
                                            loop?: boolean;
                                            cross_slide_stop?: boolean;
                                        };
                                        table?: {
                                            rows?: number;
                                            columns?: number;
                                            table_rows?: Array<{
                                                height?: number;
                                                table_cells?: Array<{
                                                    row_span?: number;
                                                    column_span?: number;
                                                    texts?: Array<{
                                                        elements?: Array<{
                                                            type:
                                                                | "TextRun"
                                                                | "MentionUser"
                                                                | "MentionDoc";
                                                            style?: {
                                                                bold?: boolean;
                                                                italic?: boolean;
                                                                strikethrough?: boolean;
                                                                underline?: boolean;
                                                                font_size?: number;
                                                                font_family?: string;
                                                                font_color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                background_color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                link?: {
                                                                    url: string;
                                                                };
                                                            };
                                                            text_run?: {
                                                                content: string;
                                                            };
                                                            mention_user?: {
                                                                user_id: string;
                                                            };
                                                            mention_doc?: {
                                                                type:
                                                                    | "Doc"
                                                                    | "DocX"
                                                                    | "Sheet"
                                                                    | "Bitable"
                                                                    | "Mindnote"
                                                                    | "File"
                                                                    | "Slides"
                                                                    | "Wiki"
                                                                    | "Undefined";
                                                                token: string;
                                                                url?: string;
                                                                title?: string;
                                                            };
                                                        }>;
                                                        style?: {
                                                            line_spacing?: {
                                                                type:
                                                                    | "Multiple"
                                                                    | "Fixed";
                                                                value: number;
                                                            };
                                                            letter_spacing?: number;
                                                            h_align?:
                                                                | "left"
                                                                | "right"
                                                                | "center";
                                                            list?: {
                                                                type?:
                                                                    | "Ordered"
                                                                    | "Bullet";
                                                                nesting_level?: number;
                                                                number?: string;
                                                                style?:
                                                                    | "OrderedStyle1"
                                                                    | "OrderedStyle2"
                                                                    | "OrderedStyle3"
                                                                    | "OrderedStyle4"
                                                                    | "OrderedStyle5"
                                                                    | "OrderedStyle6"
                                                                    | "BulletStyle1"
                                                                    | "BulletStyle2"
                                                                    | "BulletStyle3"
                                                                    | "BulletStyle4"
                                                                    | "BulletStyle5"
                                                                    | "BulletStyle6"
                                                                    | "Undefined";
                                                            };
                                                        };
                                                    }>;
                                                    style?: {
                                                        type?:
                                                            | "Title"
                                                            | "HeadLine"
                                                            | "SubHeadLine"
                                                            | "Text"
                                                            | "SmallText";
                                                        v_align?:
                                                            | "top"
                                                            | "bottom"
                                                            | "middle";
                                                        h_align?:
                                                            | "left"
                                                            | "right"
                                                            | "center";
                                                        font_family?: string;
                                                        font_size?: number;
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strikethrough?: boolean;
                                                        underline?: boolean;
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        background_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        letter_spacing?: number;
                                                        list_type?:
                                                            | "Ordered"
                                                            | "Bullet";
                                                        list_style?:
                                                            | "OrderedStyle1"
                                                            | "OrderedStyle2"
                                                            | "OrderedStyle3"
                                                            | "OrderedStyle4"
                                                            | "OrderedStyle5"
                                                            | "OrderedStyle6"
                                                            | "BulletStyle1"
                                                            | "BulletStyle2"
                                                            | "BulletStyle3"
                                                            | "BulletStyle4"
                                                            | "BulletStyle5"
                                                            | "BulletStyle6"
                                                            | "Undefined";
                                                        padding?: {
                                                            top?: number;
                                                            bottom?: number;
                                                            left?: number;
                                                            right?: number;
                                                        };
                                                    };
                                                    background?: {
                                                        fill?: {
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            image?: {
                                                                alpha?: number;
                                                                token?: string;
                                                                mime_type?: string;
                                                                size?: number;
                                                                width?: number;
                                                                height?: number;
                                                                name?: string;
                                                            };
                                                        };
                                                        enable?: boolean;
                                                    };
                                                    border?: {
                                                        top?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        bottom?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        left?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        right?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                }>;
                                            }>;
                                            table_columns?: Array<{
                                                width?: number;
                                            }>;
                                        };
                                        line?: {
                                            type?:
                                                | "Straight"
                                                | "BentConnector2"
                                                | "BentConnector3"
                                                | "BentConnector4"
                                                | "BentConnector5"
                                                | "CurvedConnector2"
                                                | "CurvedConnector3"
                                                | "CurvedConnector4"
                                                | "CurvedConnector5"
                                                | "Undefined";
                                            start_arrow?: {
                                                type?:
                                                    | "None"
                                                    | "SolidCloseArrow"
                                                    | "EmptyCloseArrow"
                                                    | "Arrow"
                                                    | "SolidCircle"
                                                    | "EmptyCircle"
                                                    | "SolidDiamond"
                                                    | "EmptyDiamond"
                                                    | "Undefined";
                                                scale?: {
                                                    width: "sm" | "med" | "lg";
                                                    height: "sm" | "med" | "lg";
                                                };
                                            };
                                            end_arrow?: {
                                                type?:
                                                    | "None"
                                                    | "SolidCloseArrow"
                                                    | "EmptyCloseArrow"
                                                    | "Arrow"
                                                    | "SolidCircle"
                                                    | "EmptyCircle"
                                                    | "SolidDiamond"
                                                    | "EmptyDiamond"
                                                    | "Undefined";
                                                scale?: {
                                                    width: "sm" | "med" | "lg";
                                                    height: "sm" | "med" | "lg";
                                                };
                                            };
                                        };
                                        group?: { children: Array<string> };
                                        chart?: {
                                            token?: string;
                                            is_refer?: boolean;
                                        };
                                        board?: { token?: string };
                                        animation?: {
                                            target_element_id?: string;
                                            type?:
                                                | "entranceAppear"
                                                | "entranceFadeIn"
                                                | "entranceFlyIn"
                                                | "entranceFloatIn"
                                                | "entranceExpand"
                                                | "entranceSwivelIn"
                                                | "entranceZoomIn"
                                                | "entranceGrowTurn"
                                                | "entranceRiseUp"
                                                | "entranceSpinnerIn"
                                                | "entranceBasicZoomIn"
                                                | "entranceStretchIn"
                                                | "entranceBoomerangIn"
                                                | "entranceBasicSwivelIn"
                                                | "wipeIn"
                                                | "wheelIn"
                                                | "blindsIn"
                                                | "emphasisGrowShrink"
                                                | "emphasisSpin"
                                                | "emphasisPulse"
                                                | "emphasisTransparency"
                                                | "emphasisTeeter"
                                                | "emphasisFlash"
                                                | "exitDisappear"
                                                | "exitFadeOut"
                                                | "exitFlyOut"
                                                | "exitFloatOut"
                                                | "exitContract"
                                                | "exitSwivelOut"
                                                | "exitZoomOut"
                                                | "exitShrinkTurn"
                                                | "exitSinkDown"
                                                | "exitSpinnerOut"
                                                | "exitBasicZoomOut"
                                                | "exitStretchOut"
                                                | "exitBoomerangOut"
                                                | "exitBasicSwivelOut"
                                                | "wipeOut"
                                                | "wheelOut"
                                                | "blindsOut"
                                                | "undefined";
                                            timing?:
                                                | "on_click"
                                                | "same_time_as_previous"
                                                | "after_previous";
                                            delay_ms?: number;
                                            duration_ms?: number;
                                            repeat?: { count?: number };
                                            direction?:
                                                | "from_bottom"
                                                | "from_top"
                                                | "from_left"
                                                | "from_right"
                                                | "from_bottom_left"
                                                | "from_bottom_right"
                                                | "from_up_left"
                                                | "from_up_right"
                                                | "across"
                                                | "horizontal"
                                                | "vertical"
                                                | "object_center"
                                                | "slide_center"
                                                | "in"
                                                | "in_from_screen_center"
                                                | "in_to_screen_bottom"
                                                | "in_slightly"
                                                | "out"
                                                | "out_from_screen_bottom"
                                                | "out_to_screen_center"
                                                | "out_slightly"
                                                | "to_bottom"
                                                | "to_top"
                                                | "to_left"
                                                | "to_right"
                                                | "to_bottom_left"
                                                | "to_bottom_right"
                                                | "to_up_left"
                                                | "to_up_right"
                                                | "undefined";
                                            spoke?:
                                                | "SPOKE_1"
                                                | "SPOKE_2"
                                                | "SPOKE_3"
                                                | "SPOKE_4"
                                                | "SPOKE_8";
                                            scale?: { x: number; y: number };
                                            rotate?: number;
                                        };
                                        graphics?: { id: string };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations/:presentation_id/pages/elements/batch_get`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation.page.page_element&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=slides&resource=presentation.page.page_element&version=v1 document }
                 *
                 * 可在指定版本的演示文稿的多个页面下批量创建页面元素
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            commands: Array<{
                                element: {
                                    element_id: string;
                                    page_id: string;
                                    element_type:
                                        | "Shape"
                                        | "Image"
                                        | "Group"
                                        | "Audio"
                                        | "Video"
                                        | "Table"
                                        | "Line"
                                        | "Chart"
                                        | "Board"
                                        | "Animation"
                                        | "Graphics"
                                        | "Undefined";
                                    element_properties?: {
                                        size?: {
                                            width: number;
                                            height: number;
                                        };
                                        location?: { x: number; y: number };
                                        rotation?: number;
                                        skew?: {
                                            angle_x: number;
                                            angle_y: number;
                                        };
                                        flip?: {
                                            is_horizontal?: boolean;
                                            is_vertical?: boolean;
                                        };
                                        background?: {
                                            fill?: {
                                                color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                image?: {
                                                    alpha?: number;
                                                    token?: string;
                                                    mime_type?: string;
                                                    size?: number;
                                                    width?: number;
                                                    height?: number;
                                                    name?: string;
                                                };
                                            };
                                            enable?: boolean;
                                        };
                                        border?: {
                                            enable?: boolean;
                                            width?: number;
                                            style?:
                                                | "Solid"
                                                | "Dash"
                                                | "Dot"
                                                | "LongDash"
                                                | "RoundDot"
                                                | "SysDot"
                                                | "SysDash"
                                                | "DashDot"
                                                | "LongDashDot"
                                                | "LongDashDotDot"
                                                | "Undefined";
                                            color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                        };
                                        alpha?: number;
                                        shadow?: {
                                            enable?: boolean;
                                            angle?: number;
                                            offset?: number;
                                            blur?: number;
                                            color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                        };
                                        reflection?: {
                                            enable?: boolean;
                                            alpha?: number;
                                            size?: number;
                                            offset?: number;
                                        };
                                        adjust_handler?: {
                                            preset_handlers?: Array<number>;
                                        };
                                    };
                                    shape?: {
                                        type?:
                                            | "Rectangle"
                                            | "Ellipse"
                                            | "Text"
                                            | "Triangle"
                                            | "LeftTriangle"
                                            | "RightTriangle"
                                            | "RegularPentagon"
                                            | "Star"
                                            | "FullRoundRectangle"
                                            | "RoundRectangle"
                                            | "Pentagon"
                                            | "Chevron"
                                            | "RightArrow"
                                            | "LeftRightArrow"
                                            | "RoundRectangleCallout1"
                                            | "RoundRectangleCallout2"
                                            | "RoundRectangleCallout3"
                                            | "RoundDiagonalCornerRectangle"
                                            | "RoundSingleCornerRectangle"
                                            | "ParalleLogram"
                                            | "Pie"
                                            | "Donut"
                                            | "BlockArc"
                                            | "Trapezoid"
                                            | "RectangularCallout"
                                            | "RoundedRectangularCallout"
                                            | "MathPlus"
                                            | "DownArrow"
                                            | "UpArrow"
                                            | "LeftArrow"
                                            | "Arc"
                                            | "Round2SameRect"
                                            | "Hexagon"
                                            | "Diamond"
                                            | "LeftBrace"
                                            | "RightBrace"
                                            | "FlowChartProcess"
                                            | "FlowChartAlternateProcess"
                                            | "StripedRightArrow"
                                            | "Teardrop"
                                            | "Undefined";
                                        texts?: Array<{
                                            elements?: Array<{
                                                type:
                                                    | "TextRun"
                                                    | "MentionUser"
                                                    | "MentionDoc";
                                                style?: {
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strikethrough?: boolean;
                                                    underline?: boolean;
                                                    font_size?: number;
                                                    font_family?: string;
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    background_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    link?: { url: string };
                                                };
                                                text_run?: { content: string };
                                                mention_user?: {
                                                    user_id: string;
                                                };
                                                mention_doc?: {
                                                    type:
                                                        | "Doc"
                                                        | "DocX"
                                                        | "Sheet"
                                                        | "Bitable"
                                                        | "Mindnote"
                                                        | "File"
                                                        | "Slides"
                                                        | "Wiki"
                                                        | "Undefined";
                                                    token: string;
                                                    url?: string;
                                                    title?: string;
                                                };
                                            }>;
                                            style?: {
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                letter_spacing?: number;
                                                h_align?:
                                                    | "left"
                                                    | "right"
                                                    | "center";
                                                list?: {
                                                    type?: "Ordered" | "Bullet";
                                                    nesting_level?: number;
                                                    number?: string;
                                                    style?:
                                                        | "OrderedStyle1"
                                                        | "OrderedStyle2"
                                                        | "OrderedStyle3"
                                                        | "OrderedStyle4"
                                                        | "OrderedStyle5"
                                                        | "OrderedStyle6"
                                                        | "BulletStyle1"
                                                        | "BulletStyle2"
                                                        | "BulletStyle3"
                                                        | "BulletStyle4"
                                                        | "BulletStyle5"
                                                        | "BulletStyle6"
                                                        | "Undefined";
                                                };
                                            };
                                        }>;
                                        style?: {
                                            type?:
                                                | "Title"
                                                | "HeadLine"
                                                | "SubHeadLine"
                                                | "Text"
                                                | "SmallText";
                                            v_align?:
                                                | "top"
                                                | "bottom"
                                                | "middle";
                                            h_align?:
                                                | "left"
                                                | "right"
                                                | "center";
                                            font_family?: string;
                                            font_size?: number;
                                            bold?: boolean;
                                            italic?: boolean;
                                            strikethrough?: boolean;
                                            underline?: boolean;
                                            font_color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                            background_color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                            line_spacing?: {
                                                type: "Multiple" | "Fixed";
                                                value: number;
                                            };
                                            letter_spacing?: number;
                                            list_type?: "Ordered" | "Bullet";
                                            list_style?:
                                                | "OrderedStyle1"
                                                | "OrderedStyle2"
                                                | "OrderedStyle3"
                                                | "OrderedStyle4"
                                                | "OrderedStyle5"
                                                | "OrderedStyle6"
                                                | "BulletStyle1"
                                                | "BulletStyle2"
                                                | "BulletStyle3"
                                                | "BulletStyle4"
                                                | "BulletStyle5"
                                                | "BulletStyle6"
                                                | "Undefined";
                                            padding?: {
                                                top?: number;
                                                bottom?: number;
                                                left?: number;
                                                right?: number;
                                            };
                                        };
                                        placeholder?: {
                                            type:
                                                | "Title"
                                                | "HeadLine"
                                                | "SubHeadLine"
                                                | "Text"
                                                | "SmallText"
                                                | "Image";
                                            index?: string;
                                            inherited_id?: string;
                                        };
                                    };
                                    image?: {
                                        token?: string;
                                        mime_type?: string;
                                        size?: number;
                                        width?: number;
                                        height?: number;
                                        name?: string;
                                        exposure?: number;
                                        contrast?: number;
                                        saturation?: number;
                                        temperature?: number;
                                        crop?: {
                                            type:
                                                | "Rectangle"
                                                | "Ellipse"
                                                | "Text"
                                                | "Triangle"
                                                | "LeftTriangle"
                                                | "RightTriangle"
                                                | "RegularPentagon"
                                                | "Star"
                                                | "FullRoundRectangle"
                                                | "RoundRectangle"
                                                | "Pentagon"
                                                | "Chevron"
                                                | "RightArrow"
                                                | "LeftRightArrow"
                                                | "RoundRectangleCallout1"
                                                | "RoundRectangleCallout2"
                                                | "RoundRectangleCallout3"
                                                | "RoundDiagonalCornerRectangle"
                                                | "RoundSingleCornerRectangle"
                                                | "ParalleLogram"
                                                | "Pie"
                                                | "Donut"
                                                | "BlockArc"
                                                | "Trapezoid"
                                                | "RectangularCallout"
                                                | "RoundedRectangularCallout"
                                                | "MathPlus"
                                                | "DownArrow"
                                                | "UpArrow"
                                                | "LeftArrow"
                                                | "Arc"
                                                | "Round2SameRect"
                                                | "Hexagon"
                                                | "Diamond"
                                                | "LeftBrace"
                                                | "RightBrace"
                                                | "FlowChartProcess"
                                                | "FlowChartAlternateProcess"
                                                | "StripedRightArrow"
                                                | "Teardrop"
                                                | "Undefined";
                                            left_offset: number;
                                            right_offset: number;
                                            top_offset: number;
                                            bottom_offset: number;
                                        };
                                        placeholder?: {
                                            type:
                                                | "Title"
                                                | "HeadLine"
                                                | "SubHeadLine"
                                                | "Text"
                                                | "SmallText"
                                                | "Image";
                                            index?: string;
                                            inherited_id?: string;
                                        };
                                    };
                                    video?: {
                                        token?: string;
                                        mime_type?: string;
                                        size?: number;
                                        width?: number;
                                        height?: number;
                                        name?: string;
                                        play_mode?: "auto" | "click";
                                    };
                                    audio?: {
                                        token?: string;
                                        mime_type?: string;
                                        size?: number;
                                        name?: string;
                                        play_mode?: "auto" | "click";
                                        loop?: boolean;
                                        cross_slide_stop?: boolean;
                                    };
                                    table?: {
                                        rows?: number;
                                        columns?: number;
                                        table_rows?: Array<{
                                            height?: number;
                                            table_cells?: Array<{
                                                row_span?: number;
                                                column_span?: number;
                                                texts?: Array<{
                                                    elements?: Array<{
                                                        type:
                                                            | "TextRun"
                                                            | "MentionUser"
                                                            | "MentionDoc";
                                                        style?: {
                                                            bold?: boolean;
                                                            italic?: boolean;
                                                            strikethrough?: boolean;
                                                            underline?: boolean;
                                                            font_size?: number;
                                                            font_family?: string;
                                                            font_color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            background_color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            link?: {
                                                                url: string;
                                                            };
                                                        };
                                                        text_run?: {
                                                            content: string;
                                                        };
                                                        mention_user?: {
                                                            user_id: string;
                                                        };
                                                        mention_doc?: {
                                                            type:
                                                                | "Doc"
                                                                | "DocX"
                                                                | "Sheet"
                                                                | "Bitable"
                                                                | "Mindnote"
                                                                | "File"
                                                                | "Slides"
                                                                | "Wiki"
                                                                | "Undefined";
                                                            token: string;
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                    }>;
                                                    style?: {
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        letter_spacing?: number;
                                                        h_align?:
                                                            | "left"
                                                            | "right"
                                                            | "center";
                                                        list?: {
                                                            type?:
                                                                | "Ordered"
                                                                | "Bullet";
                                                            nesting_level?: number;
                                                            number?: string;
                                                            style?:
                                                                | "OrderedStyle1"
                                                                | "OrderedStyle2"
                                                                | "OrderedStyle3"
                                                                | "OrderedStyle4"
                                                                | "OrderedStyle5"
                                                                | "OrderedStyle6"
                                                                | "BulletStyle1"
                                                                | "BulletStyle2"
                                                                | "BulletStyle3"
                                                                | "BulletStyle4"
                                                                | "BulletStyle5"
                                                                | "BulletStyle6"
                                                                | "Undefined";
                                                        };
                                                    };
                                                }>;
                                                style?: {
                                                    type?:
                                                        | "Title"
                                                        | "HeadLine"
                                                        | "SubHeadLine"
                                                        | "Text"
                                                        | "SmallText";
                                                    v_align?:
                                                        | "top"
                                                        | "bottom"
                                                        | "middle";
                                                    h_align?:
                                                        | "left"
                                                        | "right"
                                                        | "center";
                                                    font_family?: string;
                                                    font_size?: number;
                                                    bold?: boolean;
                                                    italic?: boolean;
                                                    strikethrough?: boolean;
                                                    underline?: boolean;
                                                    font_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    background_color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    letter_spacing?: number;
                                                    list_type?:
                                                        | "Ordered"
                                                        | "Bullet";
                                                    list_style?:
                                                        | "OrderedStyle1"
                                                        | "OrderedStyle2"
                                                        | "OrderedStyle3"
                                                        | "OrderedStyle4"
                                                        | "OrderedStyle5"
                                                        | "OrderedStyle6"
                                                        | "BulletStyle1"
                                                        | "BulletStyle2"
                                                        | "BulletStyle3"
                                                        | "BulletStyle4"
                                                        | "BulletStyle5"
                                                        | "BulletStyle6"
                                                        | "Undefined";
                                                    padding?: {
                                                        top?: number;
                                                        bottom?: number;
                                                        left?: number;
                                                        right?: number;
                                                    };
                                                };
                                                background?: {
                                                    fill?: {
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        image?: {
                                                            alpha?: number;
                                                            token?: string;
                                                            mime_type?: string;
                                                            size?: number;
                                                            width?: number;
                                                            height?: number;
                                                            name?: string;
                                                        };
                                                    };
                                                    enable?: boolean;
                                                };
                                                border?: {
                                                    top?: {
                                                        enable?: boolean;
                                                        width?: number;
                                                        style?:
                                                            | "Solid"
                                                            | "Dash"
                                                            | "Dot"
                                                            | "LongDash"
                                                            | "RoundDot"
                                                            | "SysDot"
                                                            | "SysDash"
                                                            | "DashDot"
                                                            | "LongDashDot"
                                                            | "LongDashDotDot"
                                                            | "Undefined";
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                    };
                                                    bottom?: {
                                                        enable?: boolean;
                                                        width?: number;
                                                        style?:
                                                            | "Solid"
                                                            | "Dash"
                                                            | "Dot"
                                                            | "LongDash"
                                                            | "RoundDot"
                                                            | "SysDot"
                                                            | "SysDash"
                                                            | "DashDot"
                                                            | "LongDashDot"
                                                            | "LongDashDotDot"
                                                            | "Undefined";
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                    };
                                                    left?: {
                                                        enable?: boolean;
                                                        width?: number;
                                                        style?:
                                                            | "Solid"
                                                            | "Dash"
                                                            | "Dot"
                                                            | "LongDash"
                                                            | "RoundDot"
                                                            | "SysDot"
                                                            | "SysDash"
                                                            | "DashDot"
                                                            | "LongDashDot"
                                                            | "LongDashDotDot"
                                                            | "Undefined";
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                    };
                                                    right?: {
                                                        enable?: boolean;
                                                        width?: number;
                                                        style?:
                                                            | "Solid"
                                                            | "Dash"
                                                            | "Dot"
                                                            | "LongDash"
                                                            | "RoundDot"
                                                            | "SysDot"
                                                            | "SysDash"
                                                            | "DashDot"
                                                            | "LongDashDot"
                                                            | "LongDashDotDot"
                                                            | "Undefined";
                                                        color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            }>;
                                        }>;
                                        table_columns?: Array<{
                                            width?: number;
                                        }>;
                                    };
                                    line?: {
                                        type?:
                                            | "Straight"
                                            | "BentConnector2"
                                            | "BentConnector3"
                                            | "BentConnector4"
                                            | "BentConnector5"
                                            | "CurvedConnector2"
                                            | "CurvedConnector3"
                                            | "CurvedConnector4"
                                            | "CurvedConnector5"
                                            | "Undefined";
                                        start_arrow?: {
                                            type?:
                                                | "None"
                                                | "SolidCloseArrow"
                                                | "EmptyCloseArrow"
                                                | "Arrow"
                                                | "SolidCircle"
                                                | "EmptyCircle"
                                                | "SolidDiamond"
                                                | "EmptyDiamond"
                                                | "Undefined";
                                            scale?: {
                                                width: "sm" | "med" | "lg";
                                                height: "sm" | "med" | "lg";
                                            };
                                        };
                                        end_arrow?: {
                                            type?:
                                                | "None"
                                                | "SolidCloseArrow"
                                                | "EmptyCloseArrow"
                                                | "Arrow"
                                                | "SolidCircle"
                                                | "EmptyCircle"
                                                | "SolidDiamond"
                                                | "EmptyDiamond"
                                                | "Undefined";
                                            scale?: {
                                                width: "sm" | "med" | "lg";
                                                height: "sm" | "med" | "lg";
                                            };
                                        };
                                    };
                                    group?: { children: Array<string> };
                                    chart?: {
                                        token?: string;
                                        is_refer?: boolean;
                                    };
                                    board?: { token?: string };
                                    animation?: {
                                        target_element_id?: string;
                                        type?:
                                            | "entranceAppear"
                                            | "entranceFadeIn"
                                            | "entranceFlyIn"
                                            | "entranceFloatIn"
                                            | "entranceExpand"
                                            | "entranceSwivelIn"
                                            | "entranceZoomIn"
                                            | "entranceGrowTurn"
                                            | "entranceRiseUp"
                                            | "entranceSpinnerIn"
                                            | "entranceBasicZoomIn"
                                            | "entranceStretchIn"
                                            | "entranceBoomerangIn"
                                            | "entranceBasicSwivelIn"
                                            | "wipeIn"
                                            | "wheelIn"
                                            | "blindsIn"
                                            | "emphasisGrowShrink"
                                            | "emphasisSpin"
                                            | "emphasisPulse"
                                            | "emphasisTransparency"
                                            | "emphasisTeeter"
                                            | "emphasisFlash"
                                            | "exitDisappear"
                                            | "exitFadeOut"
                                            | "exitFlyOut"
                                            | "exitFloatOut"
                                            | "exitContract"
                                            | "exitSwivelOut"
                                            | "exitZoomOut"
                                            | "exitShrinkTurn"
                                            | "exitSinkDown"
                                            | "exitSpinnerOut"
                                            | "exitBasicZoomOut"
                                            | "exitStretchOut"
                                            | "exitBoomerangOut"
                                            | "exitBasicSwivelOut"
                                            | "wipeOut"
                                            | "wheelOut"
                                            | "blindsOut"
                                            | "undefined";
                                        timing?:
                                            | "on_click"
                                            | "same_time_as_previous"
                                            | "after_previous";
                                        delay_ms?: number;
                                        duration_ms?: number;
                                        repeat?: { count?: number };
                                        direction?:
                                            | "from_bottom"
                                            | "from_top"
                                            | "from_left"
                                            | "from_right"
                                            | "from_bottom_left"
                                            | "from_bottom_right"
                                            | "from_up_left"
                                            | "from_up_right"
                                            | "across"
                                            | "horizontal"
                                            | "vertical"
                                            | "object_center"
                                            | "slide_center"
                                            | "in"
                                            | "in_from_screen_center"
                                            | "in_to_screen_bottom"
                                            | "in_slightly"
                                            | "out"
                                            | "out_from_screen_bottom"
                                            | "out_to_screen_center"
                                            | "out_slightly"
                                            | "to_bottom"
                                            | "to_top"
                                            | "to_left"
                                            | "to_right"
                                            | "to_bottom_left"
                                            | "to_bottom_right"
                                            | "to_up_left"
                                            | "to_up_right"
                                            | "undefined";
                                        spoke?:
                                            | "SPOKE_1"
                                            | "SPOKE_2"
                                            | "SPOKE_3"
                                            | "SPOKE_4"
                                            | "SPOKE_8";
                                        scale?: { x: number; y: number };
                                        rotate?: number;
                                    };
                                    graphics?: { id: string };
                                };
                                index?: number;
                            }>;
                        };
                        params: {
                            client_token: string;
                            revision_id?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { presentation_id: string };
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
                                    revision_id?: number;
                                    elements?: Array<{
                                        element_id: string;
                                        page_id: string;
                                        element_type:
                                            | "Shape"
                                            | "Image"
                                            | "Group"
                                            | "Audio"
                                            | "Video"
                                            | "Table"
                                            | "Line"
                                            | "Chart"
                                            | "Board"
                                            | "Animation"
                                            | "Graphics"
                                            | "Undefined";
                                        element_properties?: {
                                            size?: {
                                                width: number;
                                                height: number;
                                            };
                                            location?: { x: number; y: number };
                                            rotation?: number;
                                            skew?: {
                                                angle_x: number;
                                                angle_y: number;
                                            };
                                            flip?: {
                                                is_horizontal?: boolean;
                                                is_vertical?: boolean;
                                            };
                                            background?: {
                                                fill?: {
                                                    color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    image?: {
                                                        alpha?: number;
                                                        token?: string;
                                                        mime_type?: string;
                                                        size?: number;
                                                        width?: number;
                                                        height?: number;
                                                        name?: string;
                                                    };
                                                };
                                                enable?: boolean;
                                            };
                                            border?: {
                                                enable?: boolean;
                                                width?: number;
                                                style?:
                                                    | "Solid"
                                                    | "Dash"
                                                    | "Dot"
                                                    | "LongDash"
                                                    | "RoundDot"
                                                    | "SysDot"
                                                    | "SysDash"
                                                    | "DashDot"
                                                    | "LongDashDot"
                                                    | "LongDashDotDot"
                                                    | "Undefined";
                                                color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                            };
                                            alpha?: number;
                                            shadow?: {
                                                enable?: boolean;
                                                angle?: number;
                                                offset?: number;
                                                blur?: number;
                                                color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                            };
                                            reflection?: {
                                                enable?: boolean;
                                                alpha?: number;
                                                size?: number;
                                                offset?: number;
                                            };
                                            adjust_handler?: {
                                                preset_handlers?: Array<number>;
                                            };
                                        };
                                        shape?: {
                                            type?:
                                                | "Rectangle"
                                                | "Ellipse"
                                                | "Text"
                                                | "Triangle"
                                                | "LeftTriangle"
                                                | "RightTriangle"
                                                | "RegularPentagon"
                                                | "Star"
                                                | "FullRoundRectangle"
                                                | "RoundRectangle"
                                                | "Pentagon"
                                                | "Chevron"
                                                | "RightArrow"
                                                | "LeftRightArrow"
                                                | "RoundRectangleCallout1"
                                                | "RoundRectangleCallout2"
                                                | "RoundRectangleCallout3"
                                                | "RoundDiagonalCornerRectangle"
                                                | "RoundSingleCornerRectangle"
                                                | "ParalleLogram"
                                                | "Pie"
                                                | "Donut"
                                                | "BlockArc"
                                                | "Trapezoid"
                                                | "RectangularCallout"
                                                | "RoundedRectangularCallout"
                                                | "MathPlus"
                                                | "DownArrow"
                                                | "UpArrow"
                                                | "LeftArrow"
                                                | "Arc"
                                                | "Round2SameRect"
                                                | "Hexagon"
                                                | "Diamond"
                                                | "LeftBrace"
                                                | "RightBrace"
                                                | "FlowChartProcess"
                                                | "FlowChartAlternateProcess"
                                                | "StripedRightArrow"
                                                | "Teardrop"
                                                | "Undefined";
                                            texts?: Array<{
                                                elements?: Array<{
                                                    type:
                                                        | "TextRun"
                                                        | "MentionUser"
                                                        | "MentionDoc";
                                                    style?: {
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strikethrough?: boolean;
                                                        underline?: boolean;
                                                        font_size?: number;
                                                        font_family?: string;
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        background_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        link?: { url: string };
                                                    };
                                                    text_run?: {
                                                        content: string;
                                                    };
                                                    mention_user?: {
                                                        user_id: string;
                                                    };
                                                    mention_doc?: {
                                                        type:
                                                            | "Doc"
                                                            | "DocX"
                                                            | "Sheet"
                                                            | "Bitable"
                                                            | "Mindnote"
                                                            | "File"
                                                            | "Slides"
                                                            | "Wiki"
                                                            | "Undefined";
                                                        token: string;
                                                        url?: string;
                                                        title?: string;
                                                    };
                                                }>;
                                                style?: {
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    letter_spacing?: number;
                                                    h_align?:
                                                        | "left"
                                                        | "right"
                                                        | "center";
                                                    list?: {
                                                        type?:
                                                            | "Ordered"
                                                            | "Bullet";
                                                        nesting_level?: number;
                                                        number?: string;
                                                        style?:
                                                            | "OrderedStyle1"
                                                            | "OrderedStyle2"
                                                            | "OrderedStyle3"
                                                            | "OrderedStyle4"
                                                            | "OrderedStyle5"
                                                            | "OrderedStyle6"
                                                            | "BulletStyle1"
                                                            | "BulletStyle2"
                                                            | "BulletStyle3"
                                                            | "BulletStyle4"
                                                            | "BulletStyle5"
                                                            | "BulletStyle6"
                                                            | "Undefined";
                                                    };
                                                };
                                            }>;
                                            style?: {
                                                type?:
                                                    | "Title"
                                                    | "HeadLine"
                                                    | "SubHeadLine"
                                                    | "Text"
                                                    | "SmallText";
                                                v_align?:
                                                    | "top"
                                                    | "bottom"
                                                    | "middle";
                                                h_align?:
                                                    | "left"
                                                    | "right"
                                                    | "center";
                                                font_family?: string;
                                                font_size?: number;
                                                bold?: boolean;
                                                italic?: boolean;
                                                strikethrough?: boolean;
                                                underline?: boolean;
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                background_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                letter_spacing?: number;
                                                list_type?:
                                                    | "Ordered"
                                                    | "Bullet";
                                                list_style?:
                                                    | "OrderedStyle1"
                                                    | "OrderedStyle2"
                                                    | "OrderedStyle3"
                                                    | "OrderedStyle4"
                                                    | "OrderedStyle5"
                                                    | "OrderedStyle6"
                                                    | "BulletStyle1"
                                                    | "BulletStyle2"
                                                    | "BulletStyle3"
                                                    | "BulletStyle4"
                                                    | "BulletStyle5"
                                                    | "BulletStyle6"
                                                    | "Undefined";
                                                padding?: {
                                                    top?: number;
                                                    bottom?: number;
                                                    left?: number;
                                                    right?: number;
                                                };
                                            };
                                            placeholder?: {
                                                type:
                                                    | "Title"
                                                    | "HeadLine"
                                                    | "SubHeadLine"
                                                    | "Text"
                                                    | "SmallText"
                                                    | "Image";
                                                index?: string;
                                                inherited_id?: string;
                                            };
                                        };
                                        image?: {
                                            token?: string;
                                            mime_type?: string;
                                            size?: number;
                                            width?: number;
                                            height?: number;
                                            name?: string;
                                            exposure?: number;
                                            contrast?: number;
                                            saturation?: number;
                                            temperature?: number;
                                            crop?: {
                                                type:
                                                    | "Rectangle"
                                                    | "Ellipse"
                                                    | "Text"
                                                    | "Triangle"
                                                    | "LeftTriangle"
                                                    | "RightTriangle"
                                                    | "RegularPentagon"
                                                    | "Star"
                                                    | "FullRoundRectangle"
                                                    | "RoundRectangle"
                                                    | "Pentagon"
                                                    | "Chevron"
                                                    | "RightArrow"
                                                    | "LeftRightArrow"
                                                    | "RoundRectangleCallout1"
                                                    | "RoundRectangleCallout2"
                                                    | "RoundRectangleCallout3"
                                                    | "RoundDiagonalCornerRectangle"
                                                    | "RoundSingleCornerRectangle"
                                                    | "ParalleLogram"
                                                    | "Pie"
                                                    | "Donut"
                                                    | "BlockArc"
                                                    | "Trapezoid"
                                                    | "RectangularCallout"
                                                    | "RoundedRectangularCallout"
                                                    | "MathPlus"
                                                    | "DownArrow"
                                                    | "UpArrow"
                                                    | "LeftArrow"
                                                    | "Arc"
                                                    | "Round2SameRect"
                                                    | "Hexagon"
                                                    | "Diamond"
                                                    | "LeftBrace"
                                                    | "RightBrace"
                                                    | "FlowChartProcess"
                                                    | "FlowChartAlternateProcess"
                                                    | "StripedRightArrow"
                                                    | "Teardrop"
                                                    | "Undefined";
                                                left_offset: number;
                                                right_offset: number;
                                                top_offset: number;
                                                bottom_offset: number;
                                            };
                                            placeholder?: {
                                                type:
                                                    | "Title"
                                                    | "HeadLine"
                                                    | "SubHeadLine"
                                                    | "Text"
                                                    | "SmallText"
                                                    | "Image";
                                                index?: string;
                                                inherited_id?: string;
                                            };
                                        };
                                        video?: {
                                            token?: string;
                                            mime_type?: string;
                                            size?: number;
                                            width?: number;
                                            height?: number;
                                            name?: string;
                                            play_mode?: "auto" | "click";
                                        };
                                        audio?: {
                                            token?: string;
                                            mime_type?: string;
                                            size?: number;
                                            name?: string;
                                            play_mode?: "auto" | "click";
                                            loop?: boolean;
                                            cross_slide_stop?: boolean;
                                        };
                                        table?: {
                                            rows?: number;
                                            columns?: number;
                                            table_rows?: Array<{
                                                height?: number;
                                                table_cells?: Array<{
                                                    row_span?: number;
                                                    column_span?: number;
                                                    texts?: Array<{
                                                        elements?: Array<{
                                                            type:
                                                                | "TextRun"
                                                                | "MentionUser"
                                                                | "MentionDoc";
                                                            style?: {
                                                                bold?: boolean;
                                                                italic?: boolean;
                                                                strikethrough?: boolean;
                                                                underline?: boolean;
                                                                font_size?: number;
                                                                font_family?: string;
                                                                font_color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                background_color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                link?: {
                                                                    url: string;
                                                                };
                                                            };
                                                            text_run?: {
                                                                content: string;
                                                            };
                                                            mention_user?: {
                                                                user_id: string;
                                                            };
                                                            mention_doc?: {
                                                                type:
                                                                    | "Doc"
                                                                    | "DocX"
                                                                    | "Sheet"
                                                                    | "Bitable"
                                                                    | "Mindnote"
                                                                    | "File"
                                                                    | "Slides"
                                                                    | "Wiki"
                                                                    | "Undefined";
                                                                token: string;
                                                                url?: string;
                                                                title?: string;
                                                            };
                                                        }>;
                                                        style?: {
                                                            line_spacing?: {
                                                                type:
                                                                    | "Multiple"
                                                                    | "Fixed";
                                                                value: number;
                                                            };
                                                            letter_spacing?: number;
                                                            h_align?:
                                                                | "left"
                                                                | "right"
                                                                | "center";
                                                            list?: {
                                                                type?:
                                                                    | "Ordered"
                                                                    | "Bullet";
                                                                nesting_level?: number;
                                                                number?: string;
                                                                style?:
                                                                    | "OrderedStyle1"
                                                                    | "OrderedStyle2"
                                                                    | "OrderedStyle3"
                                                                    | "OrderedStyle4"
                                                                    | "OrderedStyle5"
                                                                    | "OrderedStyle6"
                                                                    | "BulletStyle1"
                                                                    | "BulletStyle2"
                                                                    | "BulletStyle3"
                                                                    | "BulletStyle4"
                                                                    | "BulletStyle5"
                                                                    | "BulletStyle6"
                                                                    | "Undefined";
                                                            };
                                                        };
                                                    }>;
                                                    style?: {
                                                        type?:
                                                            | "Title"
                                                            | "HeadLine"
                                                            | "SubHeadLine"
                                                            | "Text"
                                                            | "SmallText";
                                                        v_align?:
                                                            | "top"
                                                            | "bottom"
                                                            | "middle";
                                                        h_align?:
                                                            | "left"
                                                            | "right"
                                                            | "center";
                                                        font_family?: string;
                                                        font_size?: number;
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strikethrough?: boolean;
                                                        underline?: boolean;
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        background_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        letter_spacing?: number;
                                                        list_type?:
                                                            | "Ordered"
                                                            | "Bullet";
                                                        list_style?:
                                                            | "OrderedStyle1"
                                                            | "OrderedStyle2"
                                                            | "OrderedStyle3"
                                                            | "OrderedStyle4"
                                                            | "OrderedStyle5"
                                                            | "OrderedStyle6"
                                                            | "BulletStyle1"
                                                            | "BulletStyle2"
                                                            | "BulletStyle3"
                                                            | "BulletStyle4"
                                                            | "BulletStyle5"
                                                            | "BulletStyle6"
                                                            | "Undefined";
                                                        padding?: {
                                                            top?: number;
                                                            bottom?: number;
                                                            left?: number;
                                                            right?: number;
                                                        };
                                                    };
                                                    background?: {
                                                        fill?: {
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            image?: {
                                                                alpha?: number;
                                                                token?: string;
                                                                mime_type?: string;
                                                                size?: number;
                                                                width?: number;
                                                                height?: number;
                                                                name?: string;
                                                            };
                                                        };
                                                        enable?: boolean;
                                                    };
                                                    border?: {
                                                        top?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        bottom?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        left?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        right?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                }>;
                                            }>;
                                            table_columns?: Array<{
                                                width?: number;
                                            }>;
                                        };
                                        line?: {
                                            type?:
                                                | "Straight"
                                                | "BentConnector2"
                                                | "BentConnector3"
                                                | "BentConnector4"
                                                | "BentConnector5"
                                                | "CurvedConnector2"
                                                | "CurvedConnector3"
                                                | "CurvedConnector4"
                                                | "CurvedConnector5"
                                                | "Undefined";
                                            start_arrow?: {
                                                type?:
                                                    | "None"
                                                    | "SolidCloseArrow"
                                                    | "EmptyCloseArrow"
                                                    | "Arrow"
                                                    | "SolidCircle"
                                                    | "EmptyCircle"
                                                    | "SolidDiamond"
                                                    | "EmptyDiamond"
                                                    | "Undefined";
                                                scale?: {
                                                    width: "sm" | "med" | "lg";
                                                    height: "sm" | "med" | "lg";
                                                };
                                            };
                                            end_arrow?: {
                                                type?:
                                                    | "None"
                                                    | "SolidCloseArrow"
                                                    | "EmptyCloseArrow"
                                                    | "Arrow"
                                                    | "SolidCircle"
                                                    | "EmptyCircle"
                                                    | "SolidDiamond"
                                                    | "EmptyDiamond"
                                                    | "Undefined";
                                                scale?: {
                                                    width: "sm" | "med" | "lg";
                                                    height: "sm" | "med" | "lg";
                                                };
                                            };
                                        };
                                        group?: { children: Array<string> };
                                        chart?: {
                                            token?: string;
                                            is_refer?: boolean;
                                        };
                                        board?: { token?: string };
                                        animation?: {
                                            target_element_id?: string;
                                            type?:
                                                | "entranceAppear"
                                                | "entranceFadeIn"
                                                | "entranceFlyIn"
                                                | "entranceFloatIn"
                                                | "entranceExpand"
                                                | "entranceSwivelIn"
                                                | "entranceZoomIn"
                                                | "entranceGrowTurn"
                                                | "entranceRiseUp"
                                                | "entranceSpinnerIn"
                                                | "entranceBasicZoomIn"
                                                | "entranceStretchIn"
                                                | "entranceBoomerangIn"
                                                | "entranceBasicSwivelIn"
                                                | "wipeIn"
                                                | "wheelIn"
                                                | "blindsIn"
                                                | "emphasisGrowShrink"
                                                | "emphasisSpin"
                                                | "emphasisPulse"
                                                | "emphasisTransparency"
                                                | "emphasisTeeter"
                                                | "emphasisFlash"
                                                | "exitDisappear"
                                                | "exitFadeOut"
                                                | "exitFlyOut"
                                                | "exitFloatOut"
                                                | "exitContract"
                                                | "exitSwivelOut"
                                                | "exitZoomOut"
                                                | "exitShrinkTurn"
                                                | "exitSinkDown"
                                                | "exitSpinnerOut"
                                                | "exitBasicZoomOut"
                                                | "exitStretchOut"
                                                | "exitBoomerangOut"
                                                | "exitBasicSwivelOut"
                                                | "wipeOut"
                                                | "wheelOut"
                                                | "blindsOut"
                                                | "undefined";
                                            timing?:
                                                | "on_click"
                                                | "same_time_as_previous"
                                                | "after_previous";
                                            delay_ms?: number;
                                            duration_ms?: number;
                                            repeat?: { count?: number };
                                            direction?:
                                                | "from_bottom"
                                                | "from_top"
                                                | "from_left"
                                                | "from_right"
                                                | "from_bottom_left"
                                                | "from_bottom_right"
                                                | "from_up_left"
                                                | "from_up_right"
                                                | "across"
                                                | "horizontal"
                                                | "vertical"
                                                | "object_center"
                                                | "slide_center"
                                                | "in"
                                                | "in_from_screen_center"
                                                | "in_to_screen_bottom"
                                                | "in_slightly"
                                                | "out"
                                                | "out_from_screen_bottom"
                                                | "out_to_screen_center"
                                                | "out_slightly"
                                                | "to_bottom"
                                                | "to_top"
                                                | "to_left"
                                                | "to_right"
                                                | "to_bottom_left"
                                                | "to_bottom_right"
                                                | "to_up_left"
                                                | "to_up_right"
                                                | "undefined";
                                            spoke?:
                                                | "SPOKE_1"
                                                | "SPOKE_2"
                                                | "SPOKE_3"
                                                | "SPOKE_4"
                                                | "SPOKE_8";
                                            scale?: { x: number; y: number };
                                            rotate?: number;
                                        };
                                        graphics?: { id: string };
                                    }>;
                                    id_relations?: Array<{
                                        temp_id: string;
                                        real_id: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations/:presentation_id/pages/elements/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=slides&resource=presentation.page.page_element&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=slides&resource=presentation.page.page_element&version=v1 document }
                 *
                 * 可批量更新指定版本的演示文稿的多个页面的页面元素
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            commands: Array<{
                                element_id: string;
                                command_type:
                                    | "update_element_properties"
                                    | "update_shape"
                                    | "update_line"
                                    | "update_image"
                                    | "update_video"
                                    | "update_audio"
                                    | "update_animation"
                                    | "update_graphics"
                                    | "insert_table_rows"
                                    | "insert_table_columns"
                                    | "delete_table_rows"
                                    | "delete_table_columns"
                                    | "merge_table_cells"
                                    | "unmerge_table_cells"
                                    | "update_table_cell"
                                    | "update_table_rows_height"
                                    | "update_table_columns_width"
                                    | "ungroup";
                                update_element_properties?: {
                                    size?: { width: number; height: number };
                                    location?: { x: number; y: number };
                                    rotation?: number;
                                    skew?: { angle_x: number; angle_y: number };
                                    flip?: {
                                        is_horizontal?: boolean;
                                        is_vertical?: boolean;
                                    };
                                    background?: {
                                        fill?: {
                                            color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                            image?: {
                                                alpha?: number;
                                                token?: string;
                                                mime_type?: string;
                                                size?: number;
                                                width?: number;
                                                height?: number;
                                                name?: string;
                                            };
                                        };
                                        enable?: boolean;
                                    };
                                    border?: {
                                        enable?: boolean;
                                        width?: number;
                                        style?:
                                            | "Solid"
                                            | "Dash"
                                            | "Dot"
                                            | "LongDash"
                                            | "RoundDot"
                                            | "SysDot"
                                            | "SysDash"
                                            | "DashDot"
                                            | "LongDashDot"
                                            | "LongDashDotDot"
                                            | "Undefined";
                                        color?: {
                                            rgba_color?: {
                                                red: number;
                                                green: number;
                                                blue: number;
                                                alpha: number;
                                            };
                                            gradient_color?: {
                                                type:
                                                    | "Linear"
                                                    | "Circle"
                                                    | "Undefined";
                                                linear?: {
                                                    angle?: number;
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                                circle?: {
                                                    direction?:
                                                        | "Center"
                                                        | "FromLeftTop"
                                                        | "FromRightTop"
                                                        | "FromLeftBottom"
                                                        | "FromRightBottom"
                                                        | "Undefined";
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                            };
                                        };
                                    };
                                    alpha?: number;
                                    shadow?: {
                                        enable?: boolean;
                                        angle?: number;
                                        offset?: number;
                                        blur?: number;
                                        color?: {
                                            rgba_color?: {
                                                red: number;
                                                green: number;
                                                blue: number;
                                                alpha: number;
                                            };
                                            gradient_color?: {
                                                type:
                                                    | "Linear"
                                                    | "Circle"
                                                    | "Undefined";
                                                linear?: {
                                                    angle?: number;
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                                circle?: {
                                                    direction?:
                                                        | "Center"
                                                        | "FromLeftTop"
                                                        | "FromRightTop"
                                                        | "FromLeftBottom"
                                                        | "FromRightBottom"
                                                        | "Undefined";
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                            };
                                        };
                                    };
                                    reflection?: {
                                        enable?: boolean;
                                        alpha?: number;
                                        size?: number;
                                        offset?: number;
                                    };
                                    adjust_handler?: {
                                        preset_handlers?: Array<number>;
                                    };
                                };
                                update_shape?: {
                                    type?:
                                        | "Rectangle"
                                        | "Ellipse"
                                        | "Text"
                                        | "Triangle"
                                        | "LeftTriangle"
                                        | "RightTriangle"
                                        | "RegularPentagon"
                                        | "Star"
                                        | "FullRoundRectangle"
                                        | "RoundRectangle"
                                        | "Pentagon"
                                        | "Chevron"
                                        | "RightArrow"
                                        | "LeftRightArrow"
                                        | "RoundRectangleCallout1"
                                        | "RoundRectangleCallout2"
                                        | "RoundRectangleCallout3"
                                        | "RoundDiagonalCornerRectangle"
                                        | "RoundSingleCornerRectangle"
                                        | "ParalleLogram"
                                        | "Pie"
                                        | "Donut"
                                        | "BlockArc"
                                        | "Trapezoid"
                                        | "RectangularCallout"
                                        | "RoundedRectangularCallout"
                                        | "MathPlus"
                                        | "DownArrow"
                                        | "UpArrow"
                                        | "LeftArrow"
                                        | "Arc"
                                        | "Round2SameRect"
                                        | "Hexagon"
                                        | "Diamond"
                                        | "LeftBrace"
                                        | "RightBrace"
                                        | "FlowChartProcess"
                                        | "FlowChartAlternateProcess"
                                        | "StripedRightArrow"
                                        | "Teardrop"
                                        | "Undefined";
                                    texts?: Array<{
                                        elements?: Array<{
                                            type:
                                                | "TextRun"
                                                | "MentionUser"
                                                | "MentionDoc";
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strikethrough?: boolean;
                                                underline?: boolean;
                                                font_size?: number;
                                                font_family?: string;
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                background_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                link?: { url: string };
                                            };
                                            text_run?: { content: string };
                                            mention_user?: { user_id: string };
                                            mention_doc?: {
                                                type:
                                                    | "Doc"
                                                    | "DocX"
                                                    | "Sheet"
                                                    | "Bitable"
                                                    | "Mindnote"
                                                    | "File"
                                                    | "Slides"
                                                    | "Wiki"
                                                    | "Undefined";
                                                token: string;
                                                url?: string;
                                                title?: string;
                                            };
                                        }>;
                                        style?: {
                                            line_spacing?: {
                                                type: "Multiple" | "Fixed";
                                                value: number;
                                            };
                                            letter_spacing?: number;
                                            h_align?:
                                                | "left"
                                                | "right"
                                                | "center";
                                            list?: {
                                                type?: "Ordered" | "Bullet";
                                                nesting_level?: number;
                                                number?: string;
                                                style?:
                                                    | "OrderedStyle1"
                                                    | "OrderedStyle2"
                                                    | "OrderedStyle3"
                                                    | "OrderedStyle4"
                                                    | "OrderedStyle5"
                                                    | "OrderedStyle6"
                                                    | "BulletStyle1"
                                                    | "BulletStyle2"
                                                    | "BulletStyle3"
                                                    | "BulletStyle4"
                                                    | "BulletStyle5"
                                                    | "BulletStyle6"
                                                    | "Undefined";
                                            };
                                        };
                                    }>;
                                    style?: {
                                        type?:
                                            | "Title"
                                            | "HeadLine"
                                            | "SubHeadLine"
                                            | "Text"
                                            | "SmallText";
                                        v_align?: "top" | "bottom" | "middle";
                                        h_align?: "left" | "right" | "center";
                                        font_family?: string;
                                        font_size?: number;
                                        bold?: boolean;
                                        italic?: boolean;
                                        strikethrough?: boolean;
                                        underline?: boolean;
                                        font_color?: {
                                            rgba_color?: {
                                                red: number;
                                                green: number;
                                                blue: number;
                                                alpha: number;
                                            };
                                            gradient_color?: {
                                                type:
                                                    | "Linear"
                                                    | "Circle"
                                                    | "Undefined";
                                                linear?: {
                                                    angle?: number;
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                                circle?: {
                                                    direction?:
                                                        | "Center"
                                                        | "FromLeftTop"
                                                        | "FromRightTop"
                                                        | "FromLeftBottom"
                                                        | "FromRightBottom"
                                                        | "Undefined";
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                            };
                                        };
                                        background_color?: {
                                            rgba_color?: {
                                                red: number;
                                                green: number;
                                                blue: number;
                                                alpha: number;
                                            };
                                            gradient_color?: {
                                                type:
                                                    | "Linear"
                                                    | "Circle"
                                                    | "Undefined";
                                                linear?: {
                                                    angle?: number;
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                                circle?: {
                                                    direction?:
                                                        | "Center"
                                                        | "FromLeftTop"
                                                        | "FromRightTop"
                                                        | "FromLeftBottom"
                                                        | "FromRightBottom"
                                                        | "Undefined";
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                            };
                                        };
                                        line_spacing?: {
                                            type: "Multiple" | "Fixed";
                                            value: number;
                                        };
                                        letter_spacing?: number;
                                        list_type?: "Ordered" | "Bullet";
                                        list_style?:
                                            | "OrderedStyle1"
                                            | "OrderedStyle2"
                                            | "OrderedStyle3"
                                            | "OrderedStyle4"
                                            | "OrderedStyle5"
                                            | "OrderedStyle6"
                                            | "BulletStyle1"
                                            | "BulletStyle2"
                                            | "BulletStyle3"
                                            | "BulletStyle4"
                                            | "BulletStyle5"
                                            | "BulletStyle6"
                                            | "Undefined";
                                        padding?: {
                                            top?: number;
                                            bottom?: number;
                                            left?: number;
                                            right?: number;
                                        };
                                    };
                                    placeholder?: {
                                        type:
                                            | "Title"
                                            | "HeadLine"
                                            | "SubHeadLine"
                                            | "Text"
                                            | "SmallText"
                                            | "Image";
                                        index?: string;
                                        inherited_id?: string;
                                    };
                                };
                                update_line?: {
                                    type?:
                                        | "Straight"
                                        | "BentConnector2"
                                        | "BentConnector3"
                                        | "BentConnector4"
                                        | "BentConnector5"
                                        | "CurvedConnector2"
                                        | "CurvedConnector3"
                                        | "CurvedConnector4"
                                        | "CurvedConnector5"
                                        | "Undefined";
                                    start_arrow?: {
                                        type?:
                                            | "None"
                                            | "SolidCloseArrow"
                                            | "EmptyCloseArrow"
                                            | "Arrow"
                                            | "SolidCircle"
                                            | "EmptyCircle"
                                            | "SolidDiamond"
                                            | "EmptyDiamond"
                                            | "Undefined";
                                        scale?: {
                                            width: "sm" | "med" | "lg";
                                            height: "sm" | "med" | "lg";
                                        };
                                    };
                                    end_arrow?: {
                                        type?:
                                            | "None"
                                            | "SolidCloseArrow"
                                            | "EmptyCloseArrow"
                                            | "Arrow"
                                            | "SolidCircle"
                                            | "EmptyCircle"
                                            | "SolidDiamond"
                                            | "EmptyDiamond"
                                            | "Undefined";
                                        scale?: {
                                            width: "sm" | "med" | "lg";
                                            height: "sm" | "med" | "lg";
                                        };
                                    };
                                };
                                update_image?: {
                                    token?: string;
                                    mime_type?: string;
                                    size?: number;
                                    width?: number;
                                    height?: number;
                                    name?: string;
                                    exposure?: number;
                                    contrast?: number;
                                    saturation?: number;
                                    temperature?: number;
                                    crop?: {
                                        type:
                                            | "Rectangle"
                                            | "Ellipse"
                                            | "Text"
                                            | "Triangle"
                                            | "LeftTriangle"
                                            | "RightTriangle"
                                            | "RegularPentagon"
                                            | "Star"
                                            | "FullRoundRectangle"
                                            | "RoundRectangle"
                                            | "Pentagon"
                                            | "Chevron"
                                            | "RightArrow"
                                            | "LeftRightArrow"
                                            | "RoundRectangleCallout1"
                                            | "RoundRectangleCallout2"
                                            | "RoundRectangleCallout3"
                                            | "RoundDiagonalCornerRectangle"
                                            | "RoundSingleCornerRectangle"
                                            | "ParalleLogram"
                                            | "Pie"
                                            | "Donut"
                                            | "BlockArc"
                                            | "Trapezoid"
                                            | "RectangularCallout"
                                            | "RoundedRectangularCallout"
                                            | "MathPlus"
                                            | "DownArrow"
                                            | "UpArrow"
                                            | "LeftArrow"
                                            | "Arc"
                                            | "Round2SameRect"
                                            | "Hexagon"
                                            | "Diamond"
                                            | "LeftBrace"
                                            | "RightBrace"
                                            | "FlowChartProcess"
                                            | "FlowChartAlternateProcess"
                                            | "StripedRightArrow"
                                            | "Teardrop"
                                            | "Undefined";
                                        left_offset: number;
                                        right_offset: number;
                                        top_offset: number;
                                        bottom_offset: number;
                                    };
                                    placeholder?: {
                                        type:
                                            | "Title"
                                            | "HeadLine"
                                            | "SubHeadLine"
                                            | "Text"
                                            | "SmallText"
                                            | "Image";
                                        index?: string;
                                        inherited_id?: string;
                                    };
                                };
                                update_video?: {
                                    token?: string;
                                    mime_type?: string;
                                    size?: number;
                                    width?: number;
                                    height?: number;
                                    name?: string;
                                    play_mode?: "auto" | "click";
                                };
                                update_audio?: {
                                    token?: string;
                                    mime_type?: string;
                                    size?: number;
                                    name?: string;
                                    play_mode?: "auto" | "click";
                                    loop?: boolean;
                                    cross_slide_stop?: boolean;
                                };
                                update_animation?: {
                                    target_element_id?: string;
                                    type?:
                                        | "entranceAppear"
                                        | "entranceFadeIn"
                                        | "entranceFlyIn"
                                        | "entranceFloatIn"
                                        | "entranceExpand"
                                        | "entranceSwivelIn"
                                        | "entranceZoomIn"
                                        | "entranceGrowTurn"
                                        | "entranceRiseUp"
                                        | "entranceSpinnerIn"
                                        | "entranceBasicZoomIn"
                                        | "entranceStretchIn"
                                        | "entranceBoomerangIn"
                                        | "entranceBasicSwivelIn"
                                        | "wipeIn"
                                        | "wheelIn"
                                        | "blindsIn"
                                        | "emphasisGrowShrink"
                                        | "emphasisSpin"
                                        | "emphasisPulse"
                                        | "emphasisTransparency"
                                        | "emphasisTeeter"
                                        | "emphasisFlash"
                                        | "exitDisappear"
                                        | "exitFadeOut"
                                        | "exitFlyOut"
                                        | "exitFloatOut"
                                        | "exitContract"
                                        | "exitSwivelOut"
                                        | "exitZoomOut"
                                        | "exitShrinkTurn"
                                        | "exitSinkDown"
                                        | "exitSpinnerOut"
                                        | "exitBasicZoomOut"
                                        | "exitStretchOut"
                                        | "exitBoomerangOut"
                                        | "exitBasicSwivelOut"
                                        | "wipeOut"
                                        | "wheelOut"
                                        | "blindsOut"
                                        | "undefined";
                                    timing?:
                                        | "on_click"
                                        | "same_time_as_previous"
                                        | "after_previous";
                                    delay_ms?: number;
                                    duration_ms?: number;
                                    repeat?: { count?: number };
                                    direction?:
                                        | "from_bottom"
                                        | "from_top"
                                        | "from_left"
                                        | "from_right"
                                        | "from_bottom_left"
                                        | "from_bottom_right"
                                        | "from_up_left"
                                        | "from_up_right"
                                        | "across"
                                        | "horizontal"
                                        | "vertical"
                                        | "object_center"
                                        | "slide_center"
                                        | "in"
                                        | "in_from_screen_center"
                                        | "in_to_screen_bottom"
                                        | "in_slightly"
                                        | "out"
                                        | "out_from_screen_bottom"
                                        | "out_to_screen_center"
                                        | "out_slightly"
                                        | "to_bottom"
                                        | "to_top"
                                        | "to_left"
                                        | "to_right"
                                        | "to_bottom_left"
                                        | "to_bottom_right"
                                        | "to_up_left"
                                        | "to_up_right"
                                        | "undefined";
                                    spoke?:
                                        | "SPOKE_1"
                                        | "SPOKE_2"
                                        | "SPOKE_3"
                                        | "SPOKE_4"
                                        | "SPOKE_8";
                                    scale?: { x: number; y: number };
                                    rotate?: number;
                                };
                                update_graphics?: { id: string };
                                insert_table_rows?: {
                                    row_index: number;
                                    number: number;
                                };
                                insert_table_columns?: {
                                    column_index: number;
                                    number: number;
                                };
                                delete_table_rows?: {
                                    row_indices: Array<number>;
                                };
                                delete_table_columns?: {
                                    column_indices: Array<number>;
                                };
                                merge_table_cells?: {
                                    row_index: number;
                                    column_index: number;
                                    row_span: number;
                                    column_span: number;
                                };
                                unmerge_table_cells?: {
                                    row_index: number;
                                    column_index: number;
                                };
                                update_table_cell?: {
                                    row_index: number;
                                    column_index: number;
                                    texts?: Array<{
                                        elements?: Array<{
                                            type:
                                                | "TextRun"
                                                | "MentionUser"
                                                | "MentionDoc";
                                            style?: {
                                                bold?: boolean;
                                                italic?: boolean;
                                                strikethrough?: boolean;
                                                underline?: boolean;
                                                font_size?: number;
                                                font_family?: string;
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                background_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                link?: { url: string };
                                            };
                                            text_run?: { content: string };
                                            mention_user?: { user_id: string };
                                            mention_doc?: {
                                                type:
                                                    | "Doc"
                                                    | "DocX"
                                                    | "Sheet"
                                                    | "Bitable"
                                                    | "Mindnote"
                                                    | "File"
                                                    | "Slides"
                                                    | "Wiki"
                                                    | "Undefined";
                                                token: string;
                                                url?: string;
                                                title?: string;
                                            };
                                        }>;
                                        style?: {
                                            line_spacing?: {
                                                type: "Multiple" | "Fixed";
                                                value: number;
                                            };
                                            letter_spacing?: number;
                                            h_align?:
                                                | "left"
                                                | "right"
                                                | "center";
                                            list?: {
                                                type?: "Ordered" | "Bullet";
                                                nesting_level?: number;
                                                number?: string;
                                                style?:
                                                    | "OrderedStyle1"
                                                    | "OrderedStyle2"
                                                    | "OrderedStyle3"
                                                    | "OrderedStyle4"
                                                    | "OrderedStyle5"
                                                    | "OrderedStyle6"
                                                    | "BulletStyle1"
                                                    | "BulletStyle2"
                                                    | "BulletStyle3"
                                                    | "BulletStyle4"
                                                    | "BulletStyle5"
                                                    | "BulletStyle6"
                                                    | "Undefined";
                                            };
                                        };
                                    }>;
                                    style?: {
                                        type?:
                                            | "Title"
                                            | "HeadLine"
                                            | "SubHeadLine"
                                            | "Text"
                                            | "SmallText";
                                        v_align?: "top" | "bottom" | "middle";
                                        h_align?: "left" | "right" | "center";
                                        font_family?: string;
                                        font_size?: number;
                                        bold?: boolean;
                                        italic?: boolean;
                                        strikethrough?: boolean;
                                        underline?: boolean;
                                        font_color?: {
                                            rgba_color?: {
                                                red: number;
                                                green: number;
                                                blue: number;
                                                alpha: number;
                                            };
                                            gradient_color?: {
                                                type:
                                                    | "Linear"
                                                    | "Circle"
                                                    | "Undefined";
                                                linear?: {
                                                    angle?: number;
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                                circle?: {
                                                    direction?:
                                                        | "Center"
                                                        | "FromLeftTop"
                                                        | "FromRightTop"
                                                        | "FromLeftBottom"
                                                        | "FromRightBottom"
                                                        | "Undefined";
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                            };
                                        };
                                        background_color?: {
                                            rgba_color?: {
                                                red: number;
                                                green: number;
                                                blue: number;
                                                alpha: number;
                                            };
                                            gradient_color?: {
                                                type:
                                                    | "Linear"
                                                    | "Circle"
                                                    | "Undefined";
                                                linear?: {
                                                    angle?: number;
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                                circle?: {
                                                    direction?:
                                                        | "Center"
                                                        | "FromLeftTop"
                                                        | "FromRightTop"
                                                        | "FromLeftBottom"
                                                        | "FromRightBottom"
                                                        | "Undefined";
                                                    color_stops?: Array<{
                                                        rgba_color: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        offset: number;
                                                    }>;
                                                };
                                            };
                                        };
                                        line_spacing?: {
                                            type: "Multiple" | "Fixed";
                                            value: number;
                                        };
                                        letter_spacing?: number;
                                        list_type?: "Ordered" | "Bullet";
                                        list_style?:
                                            | "OrderedStyle1"
                                            | "OrderedStyle2"
                                            | "OrderedStyle3"
                                            | "OrderedStyle4"
                                            | "OrderedStyle5"
                                            | "OrderedStyle6"
                                            | "BulletStyle1"
                                            | "BulletStyle2"
                                            | "BulletStyle3"
                                            | "BulletStyle4"
                                            | "BulletStyle5"
                                            | "BulletStyle6"
                                            | "Undefined";
                                        padding?: {
                                            top?: number;
                                            bottom?: number;
                                            left?: number;
                                            right?: number;
                                        };
                                    };
                                    background?: {
                                        fill?: {
                                            color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                            image?: {
                                                alpha?: number;
                                                token?: string;
                                                mime_type?: string;
                                                size?: number;
                                                width?: number;
                                                height?: number;
                                                name?: string;
                                            };
                                        };
                                        enable?: boolean;
                                    };
                                    border?: {
                                        top?: {
                                            enable?: boolean;
                                            width?: number;
                                            style?:
                                                | "Solid"
                                                | "Dash"
                                                | "Dot"
                                                | "LongDash"
                                                | "RoundDot"
                                                | "SysDot"
                                                | "SysDash"
                                                | "DashDot"
                                                | "LongDashDot"
                                                | "LongDashDotDot"
                                                | "Undefined";
                                            color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                        };
                                        bottom?: {
                                            enable?: boolean;
                                            width?: number;
                                            style?:
                                                | "Solid"
                                                | "Dash"
                                                | "Dot"
                                                | "LongDash"
                                                | "RoundDot"
                                                | "SysDot"
                                                | "SysDash"
                                                | "DashDot"
                                                | "LongDashDot"
                                                | "LongDashDotDot"
                                                | "Undefined";
                                            color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                        };
                                        left?: {
                                            enable?: boolean;
                                            width?: number;
                                            style?:
                                                | "Solid"
                                                | "Dash"
                                                | "Dot"
                                                | "LongDash"
                                                | "RoundDot"
                                                | "SysDot"
                                                | "SysDash"
                                                | "DashDot"
                                                | "LongDashDot"
                                                | "LongDashDotDot"
                                                | "Undefined";
                                            color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                        };
                                        right?: {
                                            enable?: boolean;
                                            width?: number;
                                            style?:
                                                | "Solid"
                                                | "Dash"
                                                | "Dot"
                                                | "LongDash"
                                                | "RoundDot"
                                                | "SysDot"
                                                | "SysDash"
                                                | "DashDot"
                                                | "LongDashDot"
                                                | "LongDashDotDot"
                                                | "Undefined";
                                            color?: {
                                                rgba_color?: {
                                                    red: number;
                                                    green: number;
                                                    blue: number;
                                                    alpha: number;
                                                };
                                                gradient_color?: {
                                                    type:
                                                        | "Linear"
                                                        | "Circle"
                                                        | "Undefined";
                                                    linear?: {
                                                        angle?: number;
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                    circle?: {
                                                        direction?:
                                                            | "Center"
                                                            | "FromLeftTop"
                                                            | "FromRightTop"
                                                            | "FromLeftBottom"
                                                            | "FromRightBottom"
                                                            | "Undefined";
                                                        color_stops?: Array<{
                                                            rgba_color: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            offset: number;
                                                        }>;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                                update_table_rows_height?: {
                                    height: number;
                                    row_indices?: Array<number>;
                                };
                                update_table_columns_width?: {
                                    width: number;
                                    column_indices?: Array<number>;
                                };
                                ungroup?: { element_id: string };
                            }>;
                        };
                        params: {
                            client_token: string;
                            revision_id?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { presentation_id: string };
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
                                    revision_id?: number;
                                    elements?: Array<{
                                        element_id: string;
                                        page_id: string;
                                        element_type:
                                            | "Shape"
                                            | "Image"
                                            | "Group"
                                            | "Audio"
                                            | "Video"
                                            | "Table"
                                            | "Line"
                                            | "Chart"
                                            | "Board"
                                            | "Animation"
                                            | "Graphics"
                                            | "Undefined";
                                        element_properties?: {
                                            size?: {
                                                width: number;
                                                height: number;
                                            };
                                            location?: { x: number; y: number };
                                            rotation?: number;
                                            skew?: {
                                                angle_x: number;
                                                angle_y: number;
                                            };
                                            flip?: {
                                                is_horizontal?: boolean;
                                                is_vertical?: boolean;
                                            };
                                            background?: {
                                                fill?: {
                                                    color?: {
                                                        rgba_color?: {
                                                            red: number;
                                                            green: number;
                                                            blue: number;
                                                            alpha: number;
                                                        };
                                                        gradient_color?: {
                                                            type:
                                                                | "Linear"
                                                                | "Circle"
                                                                | "Undefined";
                                                            linear?: {
                                                                angle?: number;
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                            circle?: {
                                                                direction?:
                                                                    | "Center"
                                                                    | "FromLeftTop"
                                                                    | "FromRightTop"
                                                                    | "FromLeftBottom"
                                                                    | "FromRightBottom"
                                                                    | "Undefined";
                                                                color_stops?: Array<{
                                                                    rgba_color: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    offset: number;
                                                                }>;
                                                            };
                                                        };
                                                    };
                                                    image?: {
                                                        alpha?: number;
                                                        token?: string;
                                                        mime_type?: string;
                                                        size?: number;
                                                        width?: number;
                                                        height?: number;
                                                        name?: string;
                                                    };
                                                };
                                                enable?: boolean;
                                            };
                                            border?: {
                                                enable?: boolean;
                                                width?: number;
                                                style?:
                                                    | "Solid"
                                                    | "Dash"
                                                    | "Dot"
                                                    | "LongDash"
                                                    | "RoundDot"
                                                    | "SysDot"
                                                    | "SysDash"
                                                    | "DashDot"
                                                    | "LongDashDot"
                                                    | "LongDashDotDot"
                                                    | "Undefined";
                                                color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                            };
                                            alpha?: number;
                                            shadow?: {
                                                enable?: boolean;
                                                angle?: number;
                                                offset?: number;
                                                blur?: number;
                                                color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                            };
                                            reflection?: {
                                                enable?: boolean;
                                                alpha?: number;
                                                size?: number;
                                                offset?: number;
                                            };
                                            adjust_handler?: {
                                                preset_handlers?: Array<number>;
                                            };
                                        };
                                        shape?: {
                                            type?:
                                                | "Rectangle"
                                                | "Ellipse"
                                                | "Text"
                                                | "Triangle"
                                                | "LeftTriangle"
                                                | "RightTriangle"
                                                | "RegularPentagon"
                                                | "Star"
                                                | "FullRoundRectangle"
                                                | "RoundRectangle"
                                                | "Pentagon"
                                                | "Chevron"
                                                | "RightArrow"
                                                | "LeftRightArrow"
                                                | "RoundRectangleCallout1"
                                                | "RoundRectangleCallout2"
                                                | "RoundRectangleCallout3"
                                                | "RoundDiagonalCornerRectangle"
                                                | "RoundSingleCornerRectangle"
                                                | "ParalleLogram"
                                                | "Pie"
                                                | "Donut"
                                                | "BlockArc"
                                                | "Trapezoid"
                                                | "RectangularCallout"
                                                | "RoundedRectangularCallout"
                                                | "MathPlus"
                                                | "DownArrow"
                                                | "UpArrow"
                                                | "LeftArrow"
                                                | "Arc"
                                                | "Round2SameRect"
                                                | "Hexagon"
                                                | "Diamond"
                                                | "LeftBrace"
                                                | "RightBrace"
                                                | "FlowChartProcess"
                                                | "FlowChartAlternateProcess"
                                                | "StripedRightArrow"
                                                | "Teardrop"
                                                | "Undefined";
                                            texts?: Array<{
                                                elements?: Array<{
                                                    type:
                                                        | "TextRun"
                                                        | "MentionUser"
                                                        | "MentionDoc";
                                                    style?: {
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strikethrough?: boolean;
                                                        underline?: boolean;
                                                        font_size?: number;
                                                        font_family?: string;
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        background_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        link?: { url: string };
                                                    };
                                                    text_run?: {
                                                        content: string;
                                                    };
                                                    mention_user?: {
                                                        user_id: string;
                                                    };
                                                    mention_doc?: {
                                                        type:
                                                            | "Doc"
                                                            | "DocX"
                                                            | "Sheet"
                                                            | "Bitable"
                                                            | "Mindnote"
                                                            | "File"
                                                            | "Slides"
                                                            | "Wiki"
                                                            | "Undefined";
                                                        token: string;
                                                        url?: string;
                                                        title?: string;
                                                    };
                                                }>;
                                                style?: {
                                                    line_spacing?: {
                                                        type:
                                                            | "Multiple"
                                                            | "Fixed";
                                                        value: number;
                                                    };
                                                    letter_spacing?: number;
                                                    h_align?:
                                                        | "left"
                                                        | "right"
                                                        | "center";
                                                    list?: {
                                                        type?:
                                                            | "Ordered"
                                                            | "Bullet";
                                                        nesting_level?: number;
                                                        number?: string;
                                                        style?:
                                                            | "OrderedStyle1"
                                                            | "OrderedStyle2"
                                                            | "OrderedStyle3"
                                                            | "OrderedStyle4"
                                                            | "OrderedStyle5"
                                                            | "OrderedStyle6"
                                                            | "BulletStyle1"
                                                            | "BulletStyle2"
                                                            | "BulletStyle3"
                                                            | "BulletStyle4"
                                                            | "BulletStyle5"
                                                            | "BulletStyle6"
                                                            | "Undefined";
                                                    };
                                                };
                                            }>;
                                            style?: {
                                                type?:
                                                    | "Title"
                                                    | "HeadLine"
                                                    | "SubHeadLine"
                                                    | "Text"
                                                    | "SmallText";
                                                v_align?:
                                                    | "top"
                                                    | "bottom"
                                                    | "middle";
                                                h_align?:
                                                    | "left"
                                                    | "right"
                                                    | "center";
                                                font_family?: string;
                                                font_size?: number;
                                                bold?: boolean;
                                                italic?: boolean;
                                                strikethrough?: boolean;
                                                underline?: boolean;
                                                font_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                background_color?: {
                                                    rgba_color?: {
                                                        red: number;
                                                        green: number;
                                                        blue: number;
                                                        alpha: number;
                                                    };
                                                    gradient_color?: {
                                                        type:
                                                            | "Linear"
                                                            | "Circle"
                                                            | "Undefined";
                                                        linear?: {
                                                            angle?: number;
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                        circle?: {
                                                            direction?:
                                                                | "Center"
                                                                | "FromLeftTop"
                                                                | "FromRightTop"
                                                                | "FromLeftBottom"
                                                                | "FromRightBottom"
                                                                | "Undefined";
                                                            color_stops?: Array<{
                                                                rgba_color: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                offset: number;
                                                            }>;
                                                        };
                                                    };
                                                };
                                                line_spacing?: {
                                                    type: "Multiple" | "Fixed";
                                                    value: number;
                                                };
                                                letter_spacing?: number;
                                                list_type?:
                                                    | "Ordered"
                                                    | "Bullet";
                                                list_style?:
                                                    | "OrderedStyle1"
                                                    | "OrderedStyle2"
                                                    | "OrderedStyle3"
                                                    | "OrderedStyle4"
                                                    | "OrderedStyle5"
                                                    | "OrderedStyle6"
                                                    | "BulletStyle1"
                                                    | "BulletStyle2"
                                                    | "BulletStyle3"
                                                    | "BulletStyle4"
                                                    | "BulletStyle5"
                                                    | "BulletStyle6"
                                                    | "Undefined";
                                                padding?: {
                                                    top?: number;
                                                    bottom?: number;
                                                    left?: number;
                                                    right?: number;
                                                };
                                            };
                                            placeholder?: {
                                                type:
                                                    | "Title"
                                                    | "HeadLine"
                                                    | "SubHeadLine"
                                                    | "Text"
                                                    | "SmallText"
                                                    | "Image";
                                                index?: string;
                                                inherited_id?: string;
                                            };
                                        };
                                        image?: {
                                            token?: string;
                                            mime_type?: string;
                                            size?: number;
                                            width?: number;
                                            height?: number;
                                            name?: string;
                                            exposure?: number;
                                            contrast?: number;
                                            saturation?: number;
                                            temperature?: number;
                                            crop?: {
                                                type:
                                                    | "Rectangle"
                                                    | "Ellipse"
                                                    | "Text"
                                                    | "Triangle"
                                                    | "LeftTriangle"
                                                    | "RightTriangle"
                                                    | "RegularPentagon"
                                                    | "Star"
                                                    | "FullRoundRectangle"
                                                    | "RoundRectangle"
                                                    | "Pentagon"
                                                    | "Chevron"
                                                    | "RightArrow"
                                                    | "LeftRightArrow"
                                                    | "RoundRectangleCallout1"
                                                    | "RoundRectangleCallout2"
                                                    | "RoundRectangleCallout3"
                                                    | "RoundDiagonalCornerRectangle"
                                                    | "RoundSingleCornerRectangle"
                                                    | "ParalleLogram"
                                                    | "Pie"
                                                    | "Donut"
                                                    | "BlockArc"
                                                    | "Trapezoid"
                                                    | "RectangularCallout"
                                                    | "RoundedRectangularCallout"
                                                    | "MathPlus"
                                                    | "DownArrow"
                                                    | "UpArrow"
                                                    | "LeftArrow"
                                                    | "Arc"
                                                    | "Round2SameRect"
                                                    | "Hexagon"
                                                    | "Diamond"
                                                    | "LeftBrace"
                                                    | "RightBrace"
                                                    | "FlowChartProcess"
                                                    | "FlowChartAlternateProcess"
                                                    | "StripedRightArrow"
                                                    | "Teardrop"
                                                    | "Undefined";
                                                left_offset: number;
                                                right_offset: number;
                                                top_offset: number;
                                                bottom_offset: number;
                                            };
                                            placeholder?: {
                                                type:
                                                    | "Title"
                                                    | "HeadLine"
                                                    | "SubHeadLine"
                                                    | "Text"
                                                    | "SmallText"
                                                    | "Image";
                                                index?: string;
                                                inherited_id?: string;
                                            };
                                        };
                                        video?: {
                                            token?: string;
                                            mime_type?: string;
                                            size?: number;
                                            width?: number;
                                            height?: number;
                                            name?: string;
                                            play_mode?: "auto" | "click";
                                        };
                                        audio?: {
                                            token?: string;
                                            mime_type?: string;
                                            size?: number;
                                            name?: string;
                                            play_mode?: "auto" | "click";
                                            loop?: boolean;
                                            cross_slide_stop?: boolean;
                                        };
                                        table?: {
                                            rows?: number;
                                            columns?: number;
                                            table_rows?: Array<{
                                                height?: number;
                                                table_cells?: Array<{
                                                    row_span?: number;
                                                    column_span?: number;
                                                    texts?: Array<{
                                                        elements?: Array<{
                                                            type:
                                                                | "TextRun"
                                                                | "MentionUser"
                                                                | "MentionDoc";
                                                            style?: {
                                                                bold?: boolean;
                                                                italic?: boolean;
                                                                strikethrough?: boolean;
                                                                underline?: boolean;
                                                                font_size?: number;
                                                                font_family?: string;
                                                                font_color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                background_color?: {
                                                                    rgba_color?: {
                                                                        red: number;
                                                                        green: number;
                                                                        blue: number;
                                                                        alpha: number;
                                                                    };
                                                                    gradient_color?: {
                                                                        type:
                                                                            | "Linear"
                                                                            | "Circle"
                                                                            | "Undefined";
                                                                        linear?: {
                                                                            angle?: number;
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                        circle?: {
                                                                            direction?:
                                                                                | "Center"
                                                                                | "FromLeftTop"
                                                                                | "FromRightTop"
                                                                                | "FromLeftBottom"
                                                                                | "FromRightBottom"
                                                                                | "Undefined";
                                                                            color_stops?: Array<{
                                                                                rgba_color: {
                                                                                    red: number;
                                                                                    green: number;
                                                                                    blue: number;
                                                                                    alpha: number;
                                                                                };
                                                                                offset: number;
                                                                            }>;
                                                                        };
                                                                    };
                                                                };
                                                                link?: {
                                                                    url: string;
                                                                };
                                                            };
                                                            text_run?: {
                                                                content: string;
                                                            };
                                                            mention_user?: {
                                                                user_id: string;
                                                            };
                                                            mention_doc?: {
                                                                type:
                                                                    | "Doc"
                                                                    | "DocX"
                                                                    | "Sheet"
                                                                    | "Bitable"
                                                                    | "Mindnote"
                                                                    | "File"
                                                                    | "Slides"
                                                                    | "Wiki"
                                                                    | "Undefined";
                                                                token: string;
                                                                url?: string;
                                                                title?: string;
                                                            };
                                                        }>;
                                                        style?: {
                                                            line_spacing?: {
                                                                type:
                                                                    | "Multiple"
                                                                    | "Fixed";
                                                                value: number;
                                                            };
                                                            letter_spacing?: number;
                                                            h_align?:
                                                                | "left"
                                                                | "right"
                                                                | "center";
                                                            list?: {
                                                                type?:
                                                                    | "Ordered"
                                                                    | "Bullet";
                                                                nesting_level?: number;
                                                                number?: string;
                                                                style?:
                                                                    | "OrderedStyle1"
                                                                    | "OrderedStyle2"
                                                                    | "OrderedStyle3"
                                                                    | "OrderedStyle4"
                                                                    | "OrderedStyle5"
                                                                    | "OrderedStyle6"
                                                                    | "BulletStyle1"
                                                                    | "BulletStyle2"
                                                                    | "BulletStyle3"
                                                                    | "BulletStyle4"
                                                                    | "BulletStyle5"
                                                                    | "BulletStyle6"
                                                                    | "Undefined";
                                                            };
                                                        };
                                                    }>;
                                                    style?: {
                                                        type?:
                                                            | "Title"
                                                            | "HeadLine"
                                                            | "SubHeadLine"
                                                            | "Text"
                                                            | "SmallText";
                                                        v_align?:
                                                            | "top"
                                                            | "bottom"
                                                            | "middle";
                                                        h_align?:
                                                            | "left"
                                                            | "right"
                                                            | "center";
                                                        font_family?: string;
                                                        font_size?: number;
                                                        bold?: boolean;
                                                        italic?: boolean;
                                                        strikethrough?: boolean;
                                                        underline?: boolean;
                                                        font_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        background_color?: {
                                                            rgba_color?: {
                                                                red: number;
                                                                green: number;
                                                                blue: number;
                                                                alpha: number;
                                                            };
                                                            gradient_color?: {
                                                                type:
                                                                    | "Linear"
                                                                    | "Circle"
                                                                    | "Undefined";
                                                                linear?: {
                                                                    angle?: number;
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                                circle?: {
                                                                    direction?:
                                                                        | "Center"
                                                                        | "FromLeftTop"
                                                                        | "FromRightTop"
                                                                        | "FromLeftBottom"
                                                                        | "FromRightBottom"
                                                                        | "Undefined";
                                                                    color_stops?: Array<{
                                                                        rgba_color: {
                                                                            red: number;
                                                                            green: number;
                                                                            blue: number;
                                                                            alpha: number;
                                                                        };
                                                                        offset: number;
                                                                    }>;
                                                                };
                                                            };
                                                        };
                                                        line_spacing?: {
                                                            type:
                                                                | "Multiple"
                                                                | "Fixed";
                                                            value: number;
                                                        };
                                                        letter_spacing?: number;
                                                        list_type?:
                                                            | "Ordered"
                                                            | "Bullet";
                                                        list_style?:
                                                            | "OrderedStyle1"
                                                            | "OrderedStyle2"
                                                            | "OrderedStyle3"
                                                            | "OrderedStyle4"
                                                            | "OrderedStyle5"
                                                            | "OrderedStyle6"
                                                            | "BulletStyle1"
                                                            | "BulletStyle2"
                                                            | "BulletStyle3"
                                                            | "BulletStyle4"
                                                            | "BulletStyle5"
                                                            | "BulletStyle6"
                                                            | "Undefined";
                                                        padding?: {
                                                            top?: number;
                                                            bottom?: number;
                                                            left?: number;
                                                            right?: number;
                                                        };
                                                    };
                                                    background?: {
                                                        fill?: {
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                            image?: {
                                                                alpha?: number;
                                                                token?: string;
                                                                mime_type?: string;
                                                                size?: number;
                                                                width?: number;
                                                                height?: number;
                                                                name?: string;
                                                            };
                                                        };
                                                        enable?: boolean;
                                                    };
                                                    border?: {
                                                        top?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        bottom?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        left?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                        right?: {
                                                            enable?: boolean;
                                                            width?: number;
                                                            style?:
                                                                | "Solid"
                                                                | "Dash"
                                                                | "Dot"
                                                                | "LongDash"
                                                                | "RoundDot"
                                                                | "SysDot"
                                                                | "SysDash"
                                                                | "DashDot"
                                                                | "LongDashDot"
                                                                | "LongDashDotDot"
                                                                | "Undefined";
                                                            color?: {
                                                                rgba_color?: {
                                                                    red: number;
                                                                    green: number;
                                                                    blue: number;
                                                                    alpha: number;
                                                                };
                                                                gradient_color?: {
                                                                    type:
                                                                        | "Linear"
                                                                        | "Circle"
                                                                        | "Undefined";
                                                                    linear?: {
                                                                        angle?: number;
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                    circle?: {
                                                                        direction?:
                                                                            | "Center"
                                                                            | "FromLeftTop"
                                                                            | "FromRightTop"
                                                                            | "FromLeftBottom"
                                                                            | "FromRightBottom"
                                                                            | "Undefined";
                                                                        color_stops?: Array<{
                                                                            rgba_color: {
                                                                                red: number;
                                                                                green: number;
                                                                                blue: number;
                                                                                alpha: number;
                                                                            };
                                                                            offset: number;
                                                                        }>;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                }>;
                                            }>;
                                            table_columns?: Array<{
                                                width?: number;
                                            }>;
                                        };
                                        line?: {
                                            type?:
                                                | "Straight"
                                                | "BentConnector2"
                                                | "BentConnector3"
                                                | "BentConnector4"
                                                | "BentConnector5"
                                                | "CurvedConnector2"
                                                | "CurvedConnector3"
                                                | "CurvedConnector4"
                                                | "CurvedConnector5"
                                                | "Undefined";
                                            start_arrow?: {
                                                type?:
                                                    | "None"
                                                    | "SolidCloseArrow"
                                                    | "EmptyCloseArrow"
                                                    | "Arrow"
                                                    | "SolidCircle"
                                                    | "EmptyCircle"
                                                    | "SolidDiamond"
                                                    | "EmptyDiamond"
                                                    | "Undefined";
                                                scale?: {
                                                    width: "sm" | "med" | "lg";
                                                    height: "sm" | "med" | "lg";
                                                };
                                            };
                                            end_arrow?: {
                                                type?:
                                                    | "None"
                                                    | "SolidCloseArrow"
                                                    | "EmptyCloseArrow"
                                                    | "Arrow"
                                                    | "SolidCircle"
                                                    | "EmptyCircle"
                                                    | "SolidDiamond"
                                                    | "EmptyDiamond"
                                                    | "Undefined";
                                                scale?: {
                                                    width: "sm" | "med" | "lg";
                                                    height: "sm" | "med" | "lg";
                                                };
                                            };
                                        };
                                        group?: { children: Array<string> };
                                        chart?: {
                                            token?: string;
                                            is_refer?: boolean;
                                        };
                                        board?: { token?: string };
                                        animation?: {
                                            target_element_id?: string;
                                            type?:
                                                | "entranceAppear"
                                                | "entranceFadeIn"
                                                | "entranceFlyIn"
                                                | "entranceFloatIn"
                                                | "entranceExpand"
                                                | "entranceSwivelIn"
                                                | "entranceZoomIn"
                                                | "entranceGrowTurn"
                                                | "entranceRiseUp"
                                                | "entranceSpinnerIn"
                                                | "entranceBasicZoomIn"
                                                | "entranceStretchIn"
                                                | "entranceBoomerangIn"
                                                | "entranceBasicSwivelIn"
                                                | "wipeIn"
                                                | "wheelIn"
                                                | "blindsIn"
                                                | "emphasisGrowShrink"
                                                | "emphasisSpin"
                                                | "emphasisPulse"
                                                | "emphasisTransparency"
                                                | "emphasisTeeter"
                                                | "emphasisFlash"
                                                | "exitDisappear"
                                                | "exitFadeOut"
                                                | "exitFlyOut"
                                                | "exitFloatOut"
                                                | "exitContract"
                                                | "exitSwivelOut"
                                                | "exitZoomOut"
                                                | "exitShrinkTurn"
                                                | "exitSinkDown"
                                                | "exitSpinnerOut"
                                                | "exitBasicZoomOut"
                                                | "exitStretchOut"
                                                | "exitBoomerangOut"
                                                | "exitBasicSwivelOut"
                                                | "wipeOut"
                                                | "wheelOut"
                                                | "blindsOut"
                                                | "undefined";
                                            timing?:
                                                | "on_click"
                                                | "same_time_as_previous"
                                                | "after_previous";
                                            delay_ms?: number;
                                            duration_ms?: number;
                                            repeat?: { count?: number };
                                            direction?:
                                                | "from_bottom"
                                                | "from_top"
                                                | "from_left"
                                                | "from_right"
                                                | "from_bottom_left"
                                                | "from_bottom_right"
                                                | "from_up_left"
                                                | "from_up_right"
                                                | "across"
                                                | "horizontal"
                                                | "vertical"
                                                | "object_center"
                                                | "slide_center"
                                                | "in"
                                                | "in_from_screen_center"
                                                | "in_to_screen_bottom"
                                                | "in_slightly"
                                                | "out"
                                                | "out_from_screen_bottom"
                                                | "out_to_screen_center"
                                                | "out_slightly"
                                                | "to_bottom"
                                                | "to_top"
                                                | "to_left"
                                                | "to_right"
                                                | "to_bottom_left"
                                                | "to_bottom_right"
                                                | "to_up_left"
                                                | "to_up_right"
                                                | "undefined";
                                            spoke?:
                                                | "SPOKE_1"
                                                | "SPOKE_2"
                                                | "SPOKE_3"
                                                | "SPOKE_4"
                                                | "SPOKE_8";
                                            scale?: { x: number; y: number };
                                            rotate?: number;
                                        };
                                        graphics?: { id: string };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/slides/v1/presentations/:presentation_id/pages/elements/batch_update`,
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
