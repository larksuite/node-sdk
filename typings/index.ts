/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export interface Cache {
    set: (
        key: string | Symbol,
        value: any,
        expire?: number
    ) => Promise<boolean>;
    get: (key: string | Symbol) => Promise<any>;
}

export interface Logger {
    error: (...msg: any[]) => void | Promise<void>;
    warn: (...msg: any[]) => void | Promise<void>;
    info: (...msg: any[]) => void | Promise<void>;
    debug: (...msg: any[]) => void | Promise<void>;
    trace: (...msg: any[]) => void | Promise<void>;
}

export enum AppType {
    SelfBuild,
    ISV,
}

export enum Domain {
    Feishu,
    Lark,
}

export enum LoggerLevel {
    fatal,
    error,
    warn,
    info,
    debug,
    trace,
}
