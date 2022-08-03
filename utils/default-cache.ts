import { Cache } from '@node-sdk/typings';

export class DefaultCache implements Cache {
    values: Map<
        string | Symbol,
        {
            value: any;
            expiredTime?: number;
        }
    >;

    constructor() {
        this.values = new Map();
    }

    async get(key: string | Symbol) {
        const data = this.values.get(key);

        if (data) {
            const { value, expiredTime } = data;
            if (!expiredTime || expiredTime - new Date().getTime() > 0) {
                return value;
            }
        }

        return undefined;
    }

    async set(key: string | Symbol, value: string, expiredTime?: number) {
        this.values.set(key, {
            value,
            expiredTime,
        });
        return true;
    }
}

export const internalCache = new DefaultCache();
