/* eslint-disable no-console */
import { Logger } from '@node-sdk/typings';

export const defaultLogger: Logger = {
    error: (...msg: any[]) => {
        console.log('[error]:', ...msg);
    },
    warn: (...msg: any[]) => {
        console.warn('[warn]:', ...msg);
    },
    info: (...msg: any[]) => {
        console.info('[info]:', ...msg);
    },
    debug: (...msg: any[]) => {
        console.debug('[debug]:', ...msg);
    },
    trace: (...msg: any[]) => {
        console.trace('[trace]:', ...msg);
    },
};
