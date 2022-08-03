import merge from 'lodash.merge';
import {
    CTenantKey,
    CWithHelpdeskAuthorization,
    CWithUserAccessToken,
} from '@node-sdk/consts';
import { IRequestOptions } from './types';

export const withAll = (withList: IRequestOptions[]): IRequestOptions =>
    withList.reduce((acc, cur) => merge(acc, cur), {} as IRequestOptions);

export const withTenantKey = (tenantKey: string): IRequestOptions => ({
    lark: {
        [CTenantKey]: tenantKey,
    },
});

export const withHelpDeskCredential = (): IRequestOptions => ({
    lark: {
        [CWithHelpdeskAuthorization]: true,
    },
});

export const withTenantToken = (
    tenantAccessToken: string
): IRequestOptions => ({
    headers: {
        Authorization: `Bearer ${tenantAccessToken}`,
    },
});

export const withUserAccessToken = (
    userAccessToken: string
): IRequestOptions => ({
    lark: {
        [CWithUserAccessToken]: userAccessToken,
    },
});
