import { LoggerLevel, Logger } from '@node-sdk/typings';

export class LoggerProxy {
    private level: LoggerLevel;

    private logger: Logger;

    constructor(level: LoggerLevel, logger: Logger) {
        this.level = level;
        this.logger = logger;
    }

    error(...msg: any[]) {
        if (this.level >= LoggerLevel.error) {
            this.logger.error(msg);
        }
    }

    warn(...msg: any[]) {
        if (this.level >= LoggerLevel.warn) {
            this.logger.warn(msg);
        }
    }

    info(...msg: any[]) {
        if (this.level >= LoggerLevel.info) {
            this.logger.info(msg);
        }
    }

    debug(...msg: any[]) {
        if (this.level >= LoggerLevel.debug) {
            this.logger.debug(msg);
        }
    }

    trace(...msg: any[]) {
        if (this.level >= LoggerLevel.trace) {
            this.logger.trace(msg);
        }
    }
}
