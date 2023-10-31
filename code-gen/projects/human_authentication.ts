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
import hire from "./hire";

// auto gen
export default abstract class Client extends hire {
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
     * 实名认证
     */
    human_authentication = {
        /**
         * 实名认证
         */
        identity: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=human_authentication&resource=identity&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/human_authentication-v1/identity/create document }
             *
             * 录入身份信息
             *
             * 该接口用于录入实名认证的身份信息，在唤起有源活体认证前，需要使用该接口进行实名认证。
             *
             * 实名认证接口会有计费管理，接入前请联系飞书开放平台工作人员，邮箱：openplatform@bytedance.com。;;仅通过计费申请的应用，才能在[开发者后台](https://open.feishu.cn/app)查找并申请该接口的权限。
             */
            create: async (
                payload?: {
                    data: {
                        identity_name: string;
                        identity_code: string;
                        mobile?: string;
                    };
                    params: {
                        user_id: string;
                        user_id_type?: "open_id" | "user_id" | "union_id";
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
                            data?: { verify_uid: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/human_authentication/v1/identities`,
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
        },
        v1: {
            /**
             * 实名认证
             */
            identity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=human_authentication&resource=identity&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/human_authentication-v1/identity/create document }
                 *
                 * 录入身份信息
                 *
                 * 该接口用于录入实名认证的身份信息，在唤起有源活体认证前，需要使用该接口进行实名认证。
                 *
                 * 实名认证接口会有计费管理，接入前请联系飞书开放平台工作人员，邮箱：openplatform@bytedance.com。;;仅通过计费申请的应用，才能在[开发者后台](https://open.feishu.cn/app)查找并申请该接口的权限。
                 */
                create: async (
                    payload?: {
                        data: {
                            identity_name: string;
                            identity_code: string;
                            mobile?: string;
                        };
                        params: {
                            user_id: string;
                            user_id_type?: "open_id" | "user_id" | "union_id";
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
                                data?: { verify_uid: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/human_authentication/v1/identities`,
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
            },
        },
    };
}
