import { Domain } from '@node-sdk/typings';

export const formatDomain = (domain: Domain | string): string => {
    switch (domain) {
        case Domain.Feishu:
            return 'https://open.feishu.cn';
        case Domain.Lark:
            return 'https://open.larksuite.com';
        default:
            return domain;
    }
};
