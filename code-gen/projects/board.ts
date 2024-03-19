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
                 * {@link https://open.feishu.cn/api-explorer?project=board&resource=whiteboard.node&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=board&resource=whiteboard.node&version=v1 document }
                 *
                 * 列出画板内的节点数据
                 */
                list: async (
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
                                    nodes?: Array<{
                                        id: string;
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
                                            | "paint";
                                        parent_id?: string;
                                        children?: Array<string>;
                                        x?: number;
                                        y?: number;
                                        angle?: number;
                                        width?: number;
                                        height?: number;
                                        text?: {
                                            text: string;
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
                                        };
                                        style?: {
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
                                                | "wide";
                                            border_opacity?: number;
                                            h_flip?: boolean;
                                            v_flip?: boolean;
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
                                                | "cube";
                                        };
                                        connector?: {
                                            start_object?: { id?: string };
                                            end_object?: { id?: string };
                                            captions?: {
                                                data?: Array<{
                                                    text: string;
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
                                                }>;
                                            };
                                        };
                                        section?: { title?: string };
                                        table?: {
                                            meta: {
                                                row_num: number;
                                                col_num: number;
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
                                                    text: string;
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
                                                };
                                            }>;
                                        };
                                        mind_map?: { parent_id?: string };
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
