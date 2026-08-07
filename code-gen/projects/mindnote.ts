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
import meeting_room from "./meeting_room";

// auto gen
export default abstract class Client extends meeting_room {
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
    mindnote = {
        v1: {
            /**
             * mindnote.node
             */
            mindnoteNode: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mindnote&resource=mindnote.node&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=mindnote&resource=mindnote.node&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            client_token?: string;
                            nodes?: Array<{
                                node_id?: string;
                                parent_id?: string;
                                texts?: Array<{
                                    element_type:
                                        | "text"
                                        | "link"
                                        | "user"
                                        | "doc";
                                    style?: {
                                        bold?: boolean;
                                        underline?: boolean;
                                    };
                                    text?: { content: string };
                                    link?: { content?: string; url: string };
                                    mention_user?: { user: string };
                                    mention_doc?: { doc_url: string };
                                }>;
                                notes?: Array<{
                                    element_type:
                                        | "text"
                                        | "link"
                                        | "user"
                                        | "doc";
                                    style?: {
                                        bold?: boolean;
                                        underline?: boolean;
                                    };
                                    text?: { content: string };
                                    link?: { content?: string; url: string };
                                    mention_user?: { user: string };
                                    mention_doc?: { doc_url: string };
                                }>;
                                images?: Array<{ token: string }>;
                                finish?: boolean;
                                highlight?:
                                    | "red"
                                    | "yellow"
                                    | "pink"
                                    | "blue"
                                    | "cyan"
                                    | "olive"
                                    | "grey";
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { mindnote_id: string };
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
                                    client_token?: string;
                                    ids?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mindnote/v1/mindnotes/:mindnote_id/nodes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=mindnote&resource=mindnote.node&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=mindnote&resource=mindnote.node&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { mindnote_id: string };
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
                                        node_id?: string;
                                        parent_id?: string;
                                        texts?: Array<{
                                            element_type:
                                                | "text"
                                                | "link"
                                                | "user"
                                                | "doc";
                                            style?: {
                                                bold?: boolean;
                                                underline?: boolean;
                                            };
                                            text?: { content: string };
                                            link?: {
                                                content?: string;
                                                url: string;
                                            };
                                            mention_user?: { user: string };
                                            mention_doc?: { doc_url: string };
                                        }>;
                                        notes?: Array<{
                                            element_type:
                                                | "text"
                                                | "link"
                                                | "user"
                                                | "doc";
                                            style?: {
                                                bold?: boolean;
                                                underline?: boolean;
                                            };
                                            text?: { content: string };
                                            link?: {
                                                content?: string;
                                                url: string;
                                            };
                                            mention_user?: { user: string };
                                            mention_doc?: { doc_url: string };
                                        }>;
                                        images?: Array<{ token: string }>;
                                        finish?: boolean;
                                        highlight?:
                                            | "red"
                                            | "yellow"
                                            | "pink"
                                            | "blue"
                                            | "cyan"
                                            | "olive"
                                            | "grey";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/mindnote/v1/mindnotes/:mindnote_id/nodes`,
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
