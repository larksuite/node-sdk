import { LoggerLevel } from '@node-sdk/typings';
import { defaultLogger } from '../default-logger';
import { LoggerProxy } from '../logger-proxy';

describe('logger proxy', () => {
    test('filter work', () => {
        const errorSpy = jest.spyOn(defaultLogger, 'error');
        const warnSpy = jest.spyOn(defaultLogger, 'warn');
        const infoSpy = jest.spyOn(defaultLogger, 'info');
        const debugSpy = jest.spyOn(defaultLogger, 'debug');
        const traceSpy = jest.spyOn(defaultLogger, 'trace');

        /**
         * 同级别调用
         */
        let loggerProxy = new LoggerProxy(LoggerLevel.info, defaultLogger);
        loggerProxy.info('info');
        expect(infoSpy).toBeCalled();
        infoSpy.mockClear();

        /**
         * 低级别调用
         */
        loggerProxy = new LoggerProxy(LoggerLevel.warn, defaultLogger);
        loggerProxy.debug('debug');
        expect(warnSpy).not.toBeCalled();
        expect(debugSpy).not.toBeCalled();
        debugSpy.mockClear();

        /**
         * 高级别调用
         */
        loggerProxy = new LoggerProxy(LoggerLevel.trace, defaultLogger);
        loggerProxy.error('error');
        expect(errorSpy).toBeCalled();
        expect(traceSpy).not.toBeCalled();
    });
});
