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
import corehr from "./corehr";

// auto gen
export default abstract class Client extends corehr {
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
    data_cube = {
        v1: {
            /**
             * dataset
             */
            dataset: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=data_cube&resource=dataset&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=data_cube&resource=dataset&version=v1 document }
                 *
                 * 获取数据立方数据集
                 *
                 * 数据立方提供部分API，可被自建应用调用查询开放数据，当前接口可用于查询在数据立方开放的所有数据集数据，请按照如下顺序理解调用规则;* 阅读本文档，了解获取数据集API的相关调用规则;* 查看文末支持的数据集列表及相应的参数规则，找到希望查询的数据集;* 使用APP id向飞书超级管理员或数据立方管理员申请，获取对相应数据集的查询的授权 ;![image.png](//sf3-cn.feishucdn.com/obj/open-platform-opendoc/f5d869922f2b6626a6f699283c94164a_xmFB5iO2SD.png);* 使用获得授权的自建应用调用Api 按照规则查询数据
                 */
                get: async (
                    payload?: {
                        params: {
                            dataset_id: string;
                            page_size?: number;
                            page_token?: string;
                            start_date?: string;
                            end_date?: string;
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            user_id?: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            department_id?: string;
                            include_all?: boolean;
                            incremental_only?: boolean;
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
                                    col_meta_list?: Array<{
                                        name?: string;
                                        type?: "int" | "string" | "boolean";
                                    }>;
                                    datas?: Array<Array<string>>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/data_cube/v1/dataset`,
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
