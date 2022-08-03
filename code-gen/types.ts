import { CTenantKey, CWithHelpdeskAuthorization } from '@node-sdk/consts';

export interface IRequestOptions {
    lark?: {
        [CTenantKey]?: string;
        [CWithHelpdeskAuthorization]?: boolean;
    };
    params?: Record<string, string>;
    data?: Record<string, string>;
    headers?: Record<string, string>;
}