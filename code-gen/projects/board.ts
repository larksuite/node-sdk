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
import block from "./block";

// auto gen
export default abstract class Client extends block {
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
    board = {
        v1: {
            /**
             * whiteboard.node
             */
            whiteboardNode: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=board&resource=whiteboard.node&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=board&resource=whiteboard.node&version=v1 document }
                 *
                 * 批量删除节点
                 *
                 * 画板批量删除节点，子节点会被递归删除。
                 */
                batchDelete: async (
                    payload?: {
                        data?: { ids?: Array<string> };
                        params?: { client_token?: string };
                        path: { whiteboard_id: string };
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
                                data?: { client_token: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/board/v1/whiteboards/:whiteboard_id/nodes/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=board&resource=whiteboard.node&apiName=create_plantuml&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_plantuml&project=board&resource=whiteboard.node&version=v1 document }
                 *
                 * 解析画板语法
                 *
                 * 用户可以将PlantUml/Mermaid图表导入画板进行协同编辑
                 */
                createPlantuml: async (
                    payload?: {
                        data: {
                            plant_uml_code: string;
                            style_type?: number;
                            syntax_type?: number;
                            diagram_type?: number;
                            overwrite?: boolean;
                            parse_mode?: number;
                            look_type?: number;
                        };
                        path: { whiteboard_id: string };
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
                                    node_id?: string;
                                    extra?: Record<string, Array<string>>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/board/v1/whiteboards/:whiteboard_id/nodes/plantuml`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=board&resource=whiteboard.node&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=board&resource=whiteboard.node&version=v1 document }
                 *
                 * 获取所有节点
                 *
                 * 获取画板内所有的节点，节点以数组方式返回，可通过 parent_id（父节点）、children（子节点） 关系组装成画板内容。
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { whiteboard_id: string };
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
                                    nodes?: Array<{
                                        id?: string;
                                        type:
                                            | "image"
                                            | "text_shape"
                                            | "group"
                                            | "composite_shape"
                                            | "svg"
                                            | "connector"
                                            | "table"
                                            | "life_line"
                                            | "activation"
                                            | "section"
                                            | "table_uml"
                                            | "table_er"
                                            | "sticky_note"
                                            | "mind_map"
                                            | "paint"
                                            | "combined_fragment";
                                        parent_id?: string;
                                        children?: Array<string>;
                                        x?: number;
                                        y?: number;
                                        angle?: number;
                                        height?: number;
                                        text?: {
                                            text?: string;
                                            font_weight?: "regular" | "bold";
                                            font_size?: number;
                                            horizontal_align?:
                                                | "left"
                                                | "center"
                                                | "right";
                                            vertical_align?:
                                                | "top"
                                                | "mid"
                                                | "bottom";
                                            text_color?: string;
                                            text_background_color?: string;
                                            line_through?: boolean;
                                            underline?: boolean;
                                            italic?: boolean;
                                            angle?: number;
                                            theme_text_color_code?: number;
                                            theme_text_background_color_code?: number;
                                            rich_text?: {
                                                paragraphs?: Array<{
                                                    paragraph_type: number;
                                                    elements?: Array<{
                                                        element_type: number;
                                                        text_element?: {
                                                            text: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        link_element?: {
                                                            herf: string;
                                                            text?: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        mention_user_element?: {
                                                            user_id: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        mention_doc_element?: {
                                                            doc_url: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                    }>;
                                                    indent?: number;
                                                    list_begin_index?: number;
                                                    quote?: boolean;
                                                }>;
                                            };
                                            text_color_type?: number;
                                            text_background_color_type?: number;
                                        };
                                        style?: {
                                            fill_color?: string;
                                            fill_opacity?: number;
                                            border_style?:
                                                | "solid"
                                                | "none"
                                                | "dash"
                                                | "dot";
                                            border_width?:
                                                | "extra_narrow"
                                                | "narrow"
                                                | "medium"
                                                | "bold";
                                            border_opacity?: number;
                                            h_flip?: boolean;
                                            v_flip?: boolean;
                                            border_color?: string;
                                            theme_fill_color_code?: number;
                                            theme_border_color_code?: number;
                                            fill_color_type?: number;
                                            border_color_type?: number;
                                            border_dasharrays?: Array<number>;
                                            border_radius?: {
                                                top_left?: number;
                                                top_right?: number;
                                                bottom_right?: number;
                                                bottom_left?: number;
                                            };
                                            shadow?: {
                                                color?: string;
                                                blur?: number;
                                                offset_x?: number;
                                                offset_y?: number;
                                                opacity?: number;
                                            };
                                            inner_shadow?: {
                                                color?: string;
                                                blur?: number;
                                                offset_x?: number;
                                                offset_y?: number;
                                                opacity?: number;
                                            };
                                            fill_gradient?: {
                                                type?:
                                                    | "linear-gradient"
                                                    | "radial-gradient";
                                                handle_positions?: Array<{
                                                    x?: number;
                                                    y?: number;
                                                }>;
                                                stops?: Array<{
                                                    position?: number;
                                                    color?: string;
                                                }>;
                                            };
                                        };
                                        image?: { token: string };
                                        composite_shape?: {
                                            type:
                                                | "round_rect2"
                                                | "ellipse"
                                                | "hexagon"
                                                | "cylinder"
                                                | "parallelogram"
                                                | "trapezoid"
                                                | "triangle"
                                                | "round_rect"
                                                | "step"
                                                | "diamond"
                                                | "rect"
                                                | "star"
                                                | "bubble"
                                                | "pentagon"
                                                | "forward_arrow"
                                                | "document_shape"
                                                | "condition_shape"
                                                | "cloud"
                                                | "cross"
                                                | "step2"
                                                | "predefined_process"
                                                | "delay_shape"
                                                | "off_page_connector"
                                                | "note_shape"
                                                | "data_process"
                                                | "data_store"
                                                | "data_store2"
                                                | "data_store3"
                                                | "star2"
                                                | "star3"
                                                | "star4"
                                                | "actor"
                                                | "brace"
                                                | "condition_shape2"
                                                | "double_arrow"
                                                | "data_flow_round_rect3"
                                                | "rect_bubble"
                                                | "manual_input"
                                                | "flow_chart_round_rect"
                                                | "flow_chart_round_rect2"
                                                | "flow_chart_diamond"
                                                | "flow_chart_parallelogram"
                                                | "flow_chart_cylinder"
                                                | "flow_chart_trapezoid"
                                                | "flow_chart_hexagon"
                                                | "data_flow_round_rect"
                                                | "data_flow_ellipse"
                                                | "backward_arrow"
                                                | "brace_reverse"
                                                | "flow_chart_mq"
                                                | "horiz_cylinder"
                                                | "class_interface"
                                                | "classifier"
                                                | "circular_ring"
                                                | "pie"
                                                | "right_triangle"
                                                | "octagon"
                                                | "state_start"
                                                | "state_end"
                                                | "state_concurrence"
                                                | "component_shape"
                                                | "component_shape2"
                                                | "component_interface"
                                                | "component_required_interface"
                                                | "component_assembly"
                                                | "cube"
                                                | "boundary"
                                                | "control"
                                                | "entity"
                                                | "data_base"
                                                | "boundary"
                                                | "queue"
                                                | "collection"
                                                | "actor_lifeline"
                                                | "object_lifeline"
                                                | "mind_node_full_round_rect"
                                                | "mind_node_round_rect"
                                                | "mind_node_text";
                                            pie?: {
                                                start_radial_line_angle: number;
                                                central_angle: number;
                                                radius: number;
                                                sector_ratio?: number;
                                            };
                                            circular_ring?: {
                                                start_radial_line_angle: number;
                                                central_angle: number;
                                                radius: number;
                                                sector_ratio?: number;
                                            };
                                            trapezoid?: { top_length?: number };
                                            cube?: {
                                                control_point?: {
                                                    x?: number;
                                                    y?: number;
                                                };
                                            };
                                        };
                                        connector?: {
                                            start_object?: {
                                                id?: string;
                                                snap_to?:
                                                    | "auto"
                                                    | "top"
                                                    | "right"
                                                    | "bottom"
                                                    | "left";
                                                position?: {
                                                    x?: number;
                                                    y?: number;
                                                };
                                            };
                                            end_object?: {
                                                id?: string;
                                                snap_to?:
                                                    | "auto"
                                                    | "top"
                                                    | "right"
                                                    | "bottom"
                                                    | "left";
                                                position?: {
                                                    x?: number;
                                                    y?: number;
                                                };
                                            };
                                            start?: {
                                                attached_object?: {
                                                    id?: string;
                                                    snap_to?:
                                                        | "auto"
                                                        | "top"
                                                        | "right"
                                                        | "bottom"
                                                        | "left";
                                                    position?: {
                                                        x?: number;
                                                        y?: number;
                                                    };
                                                };
                                                position?: {
                                                    x?: number;
                                                    y?: number;
                                                };
                                                arrow_style?:
                                                    | "none"
                                                    | "line_arrow"
                                                    | "triangle_arrow"
                                                    | "empty_triangle_arrow"
                                                    | "circle_arrow"
                                                    | "empty_circle_arrow"
                                                    | "diamond_arrow"
                                                    | "empty_diamond_arrow"
                                                    | "single_arrow"
                                                    | "multi_arrow"
                                                    | "exact_single_arrow"
                                                    | "zero_or_multi_arrow"
                                                    | "zero_or_single_arrow"
                                                    | "single_or_multi_arrow"
                                                    | "x_arrow";
                                            };
                                            end?: {
                                                attached_object?: {
                                                    id?: string;
                                                    snap_to?:
                                                        | "auto"
                                                        | "top"
                                                        | "right"
                                                        | "bottom"
                                                        | "left";
                                                    position?: {
                                                        x?: number;
                                                        y?: number;
                                                    };
                                                };
                                                position?: {
                                                    x?: number;
                                                    y?: number;
                                                };
                                                arrow_style?:
                                                    | "none"
                                                    | "line_arrow"
                                                    | "triangle_arrow"
                                                    | "empty_triangle_arrow"
                                                    | "circle_arrow"
                                                    | "empty_circle_arrow"
                                                    | "diamond_arrow"
                                                    | "empty_diamond_arrow"
                                                    | "single_arrow"
                                                    | "multi_arrow"
                                                    | "exact_single_arrow"
                                                    | "zero_or_multi_arrow"
                                                    | "zero_or_single_arrow"
                                                    | "single_or_multi_arrow"
                                                    | "x_arrow";
                                            };
                                            captions?: {
                                                data?: Array<{
                                                    text?: string;
                                                    font_weight?:
                                                        | "regular"
                                                        | "bold";
                                                    font_size?: number;
                                                    horizontal_align?:
                                                        | "left"
                                                        | "center"
                                                        | "right";
                                                    vertical_align?:
                                                        | "top"
                                                        | "mid"
                                                        | "bottom";
                                                    text_color?: string;
                                                    text_background_color?: string;
                                                    line_through?: boolean;
                                                    underline?: boolean;
                                                    italic?: boolean;
                                                    angle?: number;
                                                    theme_text_color_code?: number;
                                                    theme_text_background_color_code?: number;
                                                    rich_text?: {
                                                        paragraphs?: Array<{
                                                            paragraph_type: number;
                                                            elements?: Array<{
                                                                element_type: number;
                                                                text_element?: {
                                                                    text: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                                link_element?: {
                                                                    herf: string;
                                                                    text?: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                                mention_user_element?: {
                                                                    user_id: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                                mention_doc_element?: {
                                                                    doc_url: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                            }>;
                                                            indent?: number;
                                                            list_begin_index?: number;
                                                            quote?: boolean;
                                                        }>;
                                                    };
                                                    text_color_type?: number;
                                                    text_background_color_type?: number;
                                                }>;
                                            };
                                            shape?:
                                                | "straight"
                                                | "polyline"
                                                | "curve"
                                                | "right_angled_polyline";
                                            turning_points?: Array<{
                                                x?: number;
                                                y?: number;
                                            }>;
                                            caption_auto_direction?: boolean;
                                            caption_position?: number;
                                            specified_coordinate?: boolean;
                                            caption_position_type?: number;
                                        };
                                        width?: number;
                                        section?: { title?: string };
                                        table?: {
                                            meta: {
                                                row_num?: number;
                                                col_num?: number;
                                                row_sizes?: Array<number>;
                                                col_sizes?: Array<number>;
                                                style?: {
                                                    fill_color?: string;
                                                    fill_opacity?: number;
                                                    border_style?:
                                                        | "solid"
                                                        | "none"
                                                        | "dash"
                                                        | "dot";
                                                    border_width?:
                                                        | "extra_narrow"
                                                        | "narrow"
                                                        | "medium"
                                                        | "bold";
                                                    border_opacity?: number;
                                                    h_flip?: boolean;
                                                    v_flip?: boolean;
                                                    border_color?: string;
                                                    theme_fill_color_code?: number;
                                                    theme_border_color_code?: number;
                                                    fill_color_type?: number;
                                                    border_color_type?: number;
                                                    border_dasharrays?: Array<number>;
                                                    border_radius?: {
                                                        top_left?: number;
                                                        top_right?: number;
                                                        bottom_right?: number;
                                                        bottom_left?: number;
                                                    };
                                                    shadow?: {
                                                        color?: string;
                                                        blur?: number;
                                                        offset_x?: number;
                                                        offset_y?: number;
                                                        opacity?: number;
                                                    };
                                                    inner_shadow?: {
                                                        color?: string;
                                                        blur?: number;
                                                        offset_x?: number;
                                                        offset_y?: number;
                                                        opacity?: number;
                                                    };
                                                    fill_gradient?: {
                                                        type?:
                                                            | "linear-gradient"
                                                            | "radial-gradient";
                                                        handle_positions?: Array<{
                                                            x?: number;
                                                            y?: number;
                                                        }>;
                                                        stops?: Array<{
                                                            position?: number;
                                                            color?: string;
                                                        }>;
                                                    };
                                                };
                                                text?: {
                                                    text?: string;
                                                    font_weight?:
                                                        | "regular"
                                                        | "bold";
                                                    font_size?: number;
                                                    horizontal_align?:
                                                        | "left"
                                                        | "center"
                                                        | "right";
                                                    vertical_align?:
                                                        | "top"
                                                        | "mid"
                                                        | "bottom";
                                                    text_color?: string;
                                                    text_background_color?: string;
                                                    line_through?: boolean;
                                                    underline?: boolean;
                                                    italic?: boolean;
                                                    angle?: number;
                                                    theme_text_color_code?: number;
                                                    theme_text_background_color_code?: number;
                                                    rich_text?: {
                                                        paragraphs?: Array<{
                                                            paragraph_type: number;
                                                            elements?: Array<{
                                                                element_type: number;
                                                                text_element?: {
                                                                    text: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                                link_element?: {
                                                                    herf: string;
                                                                    text?: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                                mention_user_element?: {
                                                                    user_id: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                                mention_doc_element?: {
                                                                    doc_url: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                            }>;
                                                            indent?: number;
                                                            list_begin_index?: number;
                                                            quote?: boolean;
                                                        }>;
                                                    };
                                                    text_color_type?: number;
                                                    text_background_color_type?: number;
                                                };
                                            };
                                            title?: string;
                                            cells?: Array<{
                                                row_index: number;
                                                col_index: number;
                                                merge_info?: {
                                                    row_span: number;
                                                    col_span: number;
                                                };
                                                children?: Array<string>;
                                                text?: {
                                                    text?: string;
                                                    font_weight?:
                                                        | "regular"
                                                        | "bold";
                                                    font_size?: number;
                                                    horizontal_align?:
                                                        | "left"
                                                        | "center"
                                                        | "right";
                                                    vertical_align?:
                                                        | "top"
                                                        | "mid"
                                                        | "bottom";
                                                    text_color?: string;
                                                    text_background_color?: string;
                                                    line_through?: boolean;
                                                    underline?: boolean;
                                                    italic?: boolean;
                                                    angle?: number;
                                                    theme_text_color_code?: number;
                                                    theme_text_background_color_code?: number;
                                                    rich_text?: {
                                                        paragraphs?: Array<{
                                                            paragraph_type: number;
                                                            elements?: Array<{
                                                                element_type: number;
                                                                text_element?: {
                                                                    text: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                                link_element?: {
                                                                    herf: string;
                                                                    text?: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                                mention_user_element?: {
                                                                    user_id: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                                mention_doc_element?: {
                                                                    doc_url: string;
                                                                    text_style?: {
                                                                        font_weight?: string;
                                                                        font_size?: number;
                                                                        text_color?: string;
                                                                        text_background_color?: string;
                                                                        line_through?: boolean;
                                                                        underline?: boolean;
                                                                        italic?: boolean;
                                                                    };
                                                                };
                                                            }>;
                                                            indent?: number;
                                                            list_begin_index?: number;
                                                            quote?: boolean;
                                                        }>;
                                                    };
                                                    text_color_type?: number;
                                                    text_background_color_type?: number;
                                                };
                                                style?: {
                                                    fill_color?: string;
                                                    fill_opacity?: number;
                                                    border_style?:
                                                        | "solid"
                                                        | "none"
                                                        | "dash"
                                                        | "dot";
                                                    border_width?:
                                                        | "extra_narrow"
                                                        | "narrow"
                                                        | "medium"
                                                        | "bold";
                                                    border_opacity?: number;
                                                    h_flip?: boolean;
                                                    v_flip?: boolean;
                                                    border_color?: string;
                                                    theme_fill_color_code?: number;
                                                    theme_border_color_code?: number;
                                                    fill_color_type?: number;
                                                    border_color_type?: number;
                                                    border_dasharrays?: Array<number>;
                                                    border_radius?: {
                                                        top_left?: number;
                                                        top_right?: number;
                                                        bottom_right?: number;
                                                        bottom_left?: number;
                                                    };
                                                    shadow?: {
                                                        color?: string;
                                                        blur?: number;
                                                        offset_x?: number;
                                                        offset_y?: number;
                                                        opacity?: number;
                                                    };
                                                    inner_shadow?: {
                                                        color?: string;
                                                        blur?: number;
                                                        offset_x?: number;
                                                        offset_y?: number;
                                                        opacity?: number;
                                                    };
                                                    fill_gradient?: {
                                                        type?:
                                                            | "linear-gradient"
                                                            | "radial-gradient";
                                                        handle_positions?: Array<{
                                                            x?: number;
                                                            y?: number;
                                                        }>;
                                                        stops?: Array<{
                                                            position?: number;
                                                            color?: string;
                                                        }>;
                                                    };
                                                };
                                            }>;
                                        };
                                        locked?: boolean;
                                        z_index?: number;
                                        lifeline?: {
                                            size?: number;
                                            type?: string;
                                        };
                                        paint?: {
                                            type?: "marker" | "highlight";
                                            lines?: Array<{
                                                x?: number;
                                                y?: number;
                                            }>;
                                            width?: number;
                                            color?: string;
                                        };
                                        svg?: {
                                            svg_code?: string;
                                            key?: string;
                                            type?: number;
                                        };
                                        sticky_note?: {
                                            user_id?: string;
                                            show_author_info?: boolean;
                                        };
                                        mind_map_node?: {
                                            parent_id: string;
                                            type?:
                                                | "mind_map_text"
                                                | "mind_map_full_round_rect"
                                                | "mind_map_round_rect";
                                            z_index?: number;
                                            layout_position?:
                                                | "left"
                                                | "right"
                                                | "up"
                                                | "down";
                                            children?: Array<string>;
                                            collapsed?: boolean;
                                        };
                                        mind_map_root?: {
                                            layout?:
                                                | "up_down"
                                                | "left_right"
                                                | "tree_left"
                                                | "tree_right"
                                                | "tree_balance"
                                                | "vertical_time_line"
                                                | "horizontal_time_line";
                                            type?:
                                                | "mind_map_text"
                                                | "mind_map_full_round_rect"
                                                | "mind_map_round_rect";
                                            line_style?:
                                                | "curve"
                                                | "right_angle"
                                                | "round_angle";
                                            up_children?: Array<string>;
                                            down_children?: Array<string>;
                                            left_children?: Array<string>;
                                            right_children?: Array<string>;
                                        };
                                        mind_map?: { parent_id?: string };
                                        syntax?: {
                                            syntax_type?: number;
                                            code?: string;
                                            style_type?: number;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/board/v1/whiteboards/:whiteboard_id/nodes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=board&resource=whiteboard.node&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=board&resource=whiteboard.node&version=v1 document }
                 *
                 * 创建画板节点
                 *
                 * 创建画板节点，支持批量创建、创建含父子关系的节点等。
                 */
                create: async (
                    payload?: {
                        data?: {
                            nodes?: Array<{
                                id?: string;
                                type:
                                    | "image"
                                    | "text_shape"
                                    | "group"
                                    | "composite_shape"
                                    | "svg"
                                    | "connector"
                                    | "table"
                                    | "life_line"
                                    | "activation"
                                    | "section"
                                    | "table_uml"
                                    | "table_er"
                                    | "sticky_note"
                                    | "mind_map"
                                    | "paint"
                                    | "combined_fragment";
                                parent_id?: string;
                                x?: number;
                                y?: number;
                                angle?: number;
                                height?: number;
                                text?: {
                                    text?: string;
                                    font_weight?: "regular" | "bold";
                                    font_size?: number;
                                    horizontal_align?:
                                        | "left"
                                        | "center"
                                        | "right";
                                    vertical_align?: "top" | "mid" | "bottom";
                                    text_color?: string;
                                    text_background_color?: string;
                                    line_through?: boolean;
                                    underline?: boolean;
                                    italic?: boolean;
                                    angle?: number;
                                    theme_text_color_code?: number;
                                    theme_text_background_color_code?: number;
                                    rich_text?: {
                                        paragraphs?: Array<{
                                            paragraph_type: number;
                                            elements?: Array<{
                                                element_type: number;
                                                text_element?: {
                                                    text: string;
                                                    text_style?: {
                                                        font_weight?: string;
                                                        font_size?: number;
                                                        text_color?: string;
                                                        text_background_color?: string;
                                                        line_through?: boolean;
                                                        underline?: boolean;
                                                        italic?: boolean;
                                                    };
                                                };
                                                link_element?: {
                                                    herf: string;
                                                    text?: string;
                                                    text_style?: {
                                                        font_weight?: string;
                                                        font_size?: number;
                                                        text_color?: string;
                                                        text_background_color?: string;
                                                        line_through?: boolean;
                                                        underline?: boolean;
                                                        italic?: boolean;
                                                    };
                                                };
                                                mention_user_element?: {
                                                    user_id: string;
                                                    text_style?: {
                                                        font_weight?: string;
                                                        font_size?: number;
                                                        text_color?: string;
                                                        text_background_color?: string;
                                                        line_through?: boolean;
                                                        underline?: boolean;
                                                        italic?: boolean;
                                                    };
                                                };
                                                mention_doc_element?: {
                                                    doc_url: string;
                                                    text_style?: {
                                                        font_weight?: string;
                                                        font_size?: number;
                                                        text_color?: string;
                                                        text_background_color?: string;
                                                        line_through?: boolean;
                                                        underline?: boolean;
                                                        italic?: boolean;
                                                    };
                                                };
                                            }>;
                                            indent?: number;
                                            list_begin_index?: number;
                                            quote?: boolean;
                                        }>;
                                    };
                                    text_color_type?: number;
                                    text_background_color_type?: number;
                                };
                                style?: {
                                    fill_color?: string;
                                    fill_opacity?: number;
                                    border_style?:
                                        | "solid"
                                        | "none"
                                        | "dash"
                                        | "dot";
                                    border_width?:
                                        | "extra_narrow"
                                        | "narrow"
                                        | "medium"
                                        | "bold";
                                    border_opacity?: number;
                                    h_flip?: boolean;
                                    v_flip?: boolean;
                                    border_color?: string;
                                    theme_fill_color_code?: number;
                                    theme_border_color_code?: number;
                                    fill_color_type?: number;
                                    border_color_type?: number;
                                    border_dasharrays?: Array<number>;
                                    border_radius?: {
                                        top_left?: number;
                                        top_right?: number;
                                        bottom_right?: number;
                                        bottom_left?: number;
                                    };
                                    shadow?: {
                                        color?: string;
                                        blur?: number;
                                        offset_x?: number;
                                        offset_y?: number;
                                        opacity?: number;
                                    };
                                    inner_shadow?: {
                                        color?: string;
                                        blur?: number;
                                        offset_x?: number;
                                        offset_y?: number;
                                        opacity?: number;
                                    };
                                    fill_gradient?: {
                                        type?:
                                            | "linear-gradient"
                                            | "radial-gradient";
                                        handle_positions?: Array<{
                                            x?: number;
                                            y?: number;
                                        }>;
                                        stops?: Array<{
                                            position?: number;
                                            color?: string;
                                        }>;
                                    };
                                };
                                image?: { token: string };
                                composite_shape?: {
                                    type:
                                        | "round_rect2"
                                        | "ellipse"
                                        | "hexagon"
                                        | "cylinder"
                                        | "parallelogram"
                                        | "trapezoid"
                                        | "triangle"
                                        | "round_rect"
                                        | "step"
                                        | "diamond"
                                        | "rect"
                                        | "star"
                                        | "bubble"
                                        | "pentagon"
                                        | "forward_arrow"
                                        | "document_shape"
                                        | "condition_shape"
                                        | "cloud"
                                        | "cross"
                                        | "step2"
                                        | "predefined_process"
                                        | "delay_shape"
                                        | "off_page_connector"
                                        | "note_shape"
                                        | "data_process"
                                        | "data_store"
                                        | "data_store2"
                                        | "data_store3"
                                        | "star2"
                                        | "star3"
                                        | "star4"
                                        | "actor"
                                        | "brace"
                                        | "condition_shape2"
                                        | "double_arrow"
                                        | "data_flow_round_rect3"
                                        | "rect_bubble"
                                        | "manual_input"
                                        | "flow_chart_round_rect"
                                        | "flow_chart_round_rect2"
                                        | "flow_chart_diamond"
                                        | "flow_chart_parallelogram"
                                        | "flow_chart_cylinder"
                                        | "flow_chart_trapezoid"
                                        | "flow_chart_hexagon"
                                        | "data_flow_round_rect"
                                        | "data_flow_ellipse"
                                        | "backward_arrow"
                                        | "brace_reverse"
                                        | "flow_chart_mq"
                                        | "horiz_cylinder"
                                        | "class_interface"
                                        | "classifier"
                                        | "circular_ring"
                                        | "pie"
                                        | "right_triangle"
                                        | "octagon"
                                        | "state_start"
                                        | "state_end"
                                        | "state_concurrence"
                                        | "component_shape"
                                        | "component_shape2"
                                        | "component_interface"
                                        | "component_required_interface"
                                        | "component_assembly"
                                        | "cube"
                                        | "boundary"
                                        | "control"
                                        | "entity"
                                        | "data_base"
                                        | "boundary"
                                        | "queue"
                                        | "collection"
                                        | "actor_lifeline"
                                        | "object_lifeline"
                                        | "mind_node_full_round_rect"
                                        | "mind_node_round_rect"
                                        | "mind_node_text";
                                    pie?: {
                                        start_radial_line_angle: number;
                                        central_angle: number;
                                        radius: number;
                                        sector_ratio?: number;
                                    };
                                    circular_ring?: {
                                        start_radial_line_angle: number;
                                        central_angle: number;
                                        radius: number;
                                        sector_ratio?: number;
                                    };
                                    trapezoid?: { top_length?: number };
                                    cube?: {
                                        control_point?: {
                                            x?: number;
                                            y?: number;
                                        };
                                    };
                                };
                                connector?: {
                                    start?: {
                                        attached_object?: {
                                            id?: string;
                                            snap_to?:
                                                | "auto"
                                                | "top"
                                                | "right"
                                                | "bottom"
                                                | "left";
                                            position?: {
                                                x?: number;
                                                y?: number;
                                            };
                                        };
                                        position?: { x?: number; y?: number };
                                        arrow_style?:
                                            | "none"
                                            | "line_arrow"
                                            | "triangle_arrow"
                                            | "empty_triangle_arrow"
                                            | "circle_arrow"
                                            | "empty_circle_arrow"
                                            | "diamond_arrow"
                                            | "empty_diamond_arrow"
                                            | "single_arrow"
                                            | "multi_arrow"
                                            | "exact_single_arrow"
                                            | "zero_or_multi_arrow"
                                            | "zero_or_single_arrow"
                                            | "single_or_multi_arrow"
                                            | "x_arrow";
                                    };
                                    end?: {
                                        attached_object?: {
                                            id?: string;
                                            snap_to?:
                                                | "auto"
                                                | "top"
                                                | "right"
                                                | "bottom"
                                                | "left";
                                            position?: {
                                                x?: number;
                                                y?: number;
                                            };
                                        };
                                        position?: { x?: number; y?: number };
                                        arrow_style?:
                                            | "none"
                                            | "line_arrow"
                                            | "triangle_arrow"
                                            | "empty_triangle_arrow"
                                            | "circle_arrow"
                                            | "empty_circle_arrow"
                                            | "diamond_arrow"
                                            | "empty_diamond_arrow"
                                            | "single_arrow"
                                            | "multi_arrow"
                                            | "exact_single_arrow"
                                            | "zero_or_multi_arrow"
                                            | "zero_or_single_arrow"
                                            | "single_or_multi_arrow"
                                            | "x_arrow";
                                    };
                                    captions?: {
                                        data?: Array<{
                                            text?: string;
                                            font_weight?: "regular" | "bold";
                                            font_size?: number;
                                            horizontal_align?:
                                                | "left"
                                                | "center"
                                                | "right";
                                            vertical_align?:
                                                | "top"
                                                | "mid"
                                                | "bottom";
                                            text_color?: string;
                                            text_background_color?: string;
                                            line_through?: boolean;
                                            underline?: boolean;
                                            italic?: boolean;
                                            angle?: number;
                                            theme_text_color_code?: number;
                                            theme_text_background_color_code?: number;
                                            rich_text?: {
                                                paragraphs?: Array<{
                                                    paragraph_type: number;
                                                    elements?: Array<{
                                                        element_type: number;
                                                        text_element?: {
                                                            text: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        link_element?: {
                                                            herf: string;
                                                            text?: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        mention_user_element?: {
                                                            user_id: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        mention_doc_element?: {
                                                            doc_url: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                    }>;
                                                    indent?: number;
                                                    list_begin_index?: number;
                                                    quote?: boolean;
                                                }>;
                                            };
                                            text_color_type?: number;
                                            text_background_color_type?: number;
                                        }>;
                                    };
                                    shape?:
                                        | "straight"
                                        | "polyline"
                                        | "curve"
                                        | "right_angled_polyline";
                                    turning_points?: Array<{
                                        x?: number;
                                        y?: number;
                                    }>;
                                    caption_auto_direction?: boolean;
                                    caption_position?: number;
                                    specified_coordinate?: boolean;
                                    caption_position_type?: number;
                                };
                                width?: number;
                                section?: { title?: string };
                                table?: {
                                    meta: {
                                        row_sizes?: Array<number>;
                                        col_sizes?: Array<number>;
                                        style?: {
                                            fill_color?: string;
                                            fill_opacity?: number;
                                            border_style?:
                                                | "solid"
                                                | "none"
                                                | "dash"
                                                | "dot";
                                            border_width?:
                                                | "extra_narrow"
                                                | "narrow"
                                                | "medium"
                                                | "bold";
                                            border_opacity?: number;
                                            h_flip?: boolean;
                                            v_flip?: boolean;
                                            border_color?: string;
                                            theme_fill_color_code?: number;
                                            theme_border_color_code?: number;
                                            fill_color_type?: number;
                                            border_color_type?: number;
                                            border_dasharrays?: Array<number>;
                                            border_radius?: {
                                                top_left?: number;
                                                top_right?: number;
                                                bottom_right?: number;
                                                bottom_left?: number;
                                            };
                                            shadow?: {
                                                color?: string;
                                                blur?: number;
                                                offset_x?: number;
                                                offset_y?: number;
                                                opacity?: number;
                                            };
                                            inner_shadow?: {
                                                color?: string;
                                                blur?: number;
                                                offset_x?: number;
                                                offset_y?: number;
                                                opacity?: number;
                                            };
                                            fill_gradient?: {
                                                type?:
                                                    | "linear-gradient"
                                                    | "radial-gradient";
                                                handle_positions?: Array<{
                                                    x?: number;
                                                    y?: number;
                                                }>;
                                                stops?: Array<{
                                                    position?: number;
                                                    color?: string;
                                                }>;
                                            };
                                        };
                                        text?: {
                                            text?: string;
                                            font_weight?: "regular" | "bold";
                                            font_size?: number;
                                            horizontal_align?:
                                                | "left"
                                                | "center"
                                                | "right";
                                            vertical_align?:
                                                | "top"
                                                | "mid"
                                                | "bottom";
                                            text_color?: string;
                                            text_background_color?: string;
                                            line_through?: boolean;
                                            underline?: boolean;
                                            italic?: boolean;
                                            angle?: number;
                                            theme_text_color_code?: number;
                                            theme_text_background_color_code?: number;
                                            rich_text?: {
                                                paragraphs?: Array<{
                                                    paragraph_type: number;
                                                    elements?: Array<{
                                                        element_type: number;
                                                        text_element?: {
                                                            text: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        link_element?: {
                                                            herf: string;
                                                            text?: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        mention_user_element?: {
                                                            user_id: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        mention_doc_element?: {
                                                            doc_url: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                    }>;
                                                    indent?: number;
                                                    list_begin_index?: number;
                                                    quote?: boolean;
                                                }>;
                                            };
                                            text_color_type?: number;
                                            text_background_color_type?: number;
                                        };
                                    };
                                    title?: string;
                                    cells?: Array<{
                                        row_index: number;
                                        col_index: number;
                                        merge_info?: {
                                            row_span: number;
                                            col_span: number;
                                        };
                                        children?: Array<string>;
                                        text?: {
                                            text?: string;
                                            font_weight?: "regular" | "bold";
                                            font_size?: number;
                                            horizontal_align?:
                                                | "left"
                                                | "center"
                                                | "right";
                                            vertical_align?:
                                                | "top"
                                                | "mid"
                                                | "bottom";
                                            text_color?: string;
                                            text_background_color?: string;
                                            line_through?: boolean;
                                            underline?: boolean;
                                            italic?: boolean;
                                            angle?: number;
                                            theme_text_color_code?: number;
                                            theme_text_background_color_code?: number;
                                            rich_text?: {
                                                paragraphs?: Array<{
                                                    paragraph_type: number;
                                                    elements?: Array<{
                                                        element_type: number;
                                                        text_element?: {
                                                            text: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        link_element?: {
                                                            herf: string;
                                                            text?: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        mention_user_element?: {
                                                            user_id: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                        mention_doc_element?: {
                                                            doc_url: string;
                                                            text_style?: {
                                                                font_weight?: string;
                                                                font_size?: number;
                                                                text_color?: string;
                                                                text_background_color?: string;
                                                                line_through?: boolean;
                                                                underline?: boolean;
                                                                italic?: boolean;
                                                            };
                                                        };
                                                    }>;
                                                    indent?: number;
                                                    list_begin_index?: number;
                                                    quote?: boolean;
                                                }>;
                                            };
                                            text_color_type?: number;
                                            text_background_color_type?: number;
                                        };
                                        style?: {
                                            fill_color?: string;
                                            fill_opacity?: number;
                                            border_style?:
                                                | "solid"
                                                | "none"
                                                | "dash"
                                                | "dot";
                                            border_width?:
                                                | "extra_narrow"
                                                | "narrow"
                                                | "medium"
                                                | "bold";
                                            border_opacity?: number;
                                            h_flip?: boolean;
                                            v_flip?: boolean;
                                            border_color?: string;
                                            theme_fill_color_code?: number;
                                            theme_border_color_code?: number;
                                            fill_color_type?: number;
                                            border_color_type?: number;
                                            border_dasharrays?: Array<number>;
                                            border_radius?: {
                                                top_left?: number;
                                                top_right?: number;
                                                bottom_right?: number;
                                                bottom_left?: number;
                                            };
                                            shadow?: {
                                                color?: string;
                                                blur?: number;
                                                offset_x?: number;
                                                offset_y?: number;
                                                opacity?: number;
                                            };
                                            inner_shadow?: {
                                                color?: string;
                                                blur?: number;
                                                offset_x?: number;
                                                offset_y?: number;
                                                opacity?: number;
                                            };
                                            fill_gradient?: {
                                                type?:
                                                    | "linear-gradient"
                                                    | "radial-gradient";
                                                handle_positions?: Array<{
                                                    x?: number;
                                                    y?: number;
                                                }>;
                                                stops?: Array<{
                                                    position?: number;
                                                    color?: string;
                                                }>;
                                            };
                                        };
                                    }>;
                                };
                                locked?: boolean;
                                z_index?: number;
                                lifeline?: { size?: number; type?: string };
                                paint?: {
                                    type?: "marker" | "highlight";
                                    lines?: Array<{ x?: number; y?: number }>;
                                    width?: number;
                                    color?: string;
                                };
                                svg?: {
                                    svg_code?: string;
                                    key?: string;
                                    type?: number;
                                };
                                sticky_note?: {
                                    user_id?: string;
                                    show_author_info?: boolean;
                                };
                                mind_map_node?: {
                                    parent_id: string;
                                    type?:
                                        | "mind_map_text"
                                        | "mind_map_full_round_rect"
                                        | "mind_map_round_rect";
                                    z_index?: number;
                                    layout_position?:
                                        | "left"
                                        | "right"
                                        | "up"
                                        | "down";
                                    collapsed?: boolean;
                                };
                                mind_map_root?: {
                                    layout?:
                                        | "up_down"
                                        | "left_right"
                                        | "tree_left"
                                        | "tree_right"
                                        | "tree_balance"
                                        | "vertical_time_line"
                                        | "horizontal_time_line";
                                    type?:
                                        | "mind_map_text"
                                        | "mind_map_full_round_rect"
                                        | "mind_map_round_rect";
                                    line_style?:
                                        | "curve"
                                        | "right_angle"
                                        | "round_angle";
                                };
                            }>;
                            overwrite?: boolean;
                        };
                        params?: {
                            client_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { whiteboard_id: string };
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
                                    ids: Array<string>;
                                    client_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/board/v1/whiteboards/:whiteboard_id/nodes`,
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
             * whiteboard
             */
            whiteboard: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=board&resource=whiteboard&apiName=download_as_image&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download_as_image&project=board&resource=whiteboard&version=v1 document }
                 *
                 * 下载画板为图片
                 *
                 * 获取画板的缩略图片，响应数据为图片的二进制图片流。根据 Content-Type 值区图片格式：image/png、image/jpeg、image/gif、image/svg+xml。
                 */
                downloadAsImage: async (
                    payload?: {
                        path: { whiteboard_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/board/v1/whiteboards/:whiteboard_id/download_as_image`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=board&resource=whiteboard&apiName=theme&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=theme&project=board&resource=whiteboard&version=v1 document }
                 *
                 * 获取画板主题
                 *
                 * 获取画板主题，不同主题下有不同的默认配色，具体主题介绍可以参考[主题简介](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/theme-introduction) 。
                 */
                theme: async (
                    payload?: {
                        path: { whiteboard_id: string };
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
                                    theme:
                                        | "classic"
                                        | "minimalist_gray"
                                        | "retro"
                                        | "vibrant_color"
                                        | "minimalist_blue"
                                        | "default";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/board/v1/whiteboards/:whiteboard_id/theme`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=board&resource=whiteboard&apiName=update_theme&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_theme&project=board&resource=whiteboard&version=v1 document }
                 *
                 * 更新主题
                 *
                 * 更新画板主题，具体主题介绍可以参考[主题简介](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/theme-introduction) 。
                 */
                updateTheme: async (
                    payload?: {
                        data?: { theme?: string };
                        path: { whiteboard_id: string };
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
                                `${this.domain}/open-apis/board/v1/whiteboards/:whiteboard_id/update_theme`,
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
