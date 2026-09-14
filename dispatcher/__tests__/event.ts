import { LoggerLevel } from '@node-sdk/typings';
import { EventDispatcher } from '../event';

type MockLogger = {
    error: jest.Mock;
    warn: jest.Mock;
    info: jest.Mock;
    debug: jest.Mock;
    trace: jest.Mock;
};

function makeLogger(): MockLogger {
    return {
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
        debug: jest.fn(),
        trace: jest.fn(),
    };
}

function makeDispatcher() {
    const logger = makeLogger();
    /**
     * trace lets every level through LoggerProxy, so an assertion that a level
     * was never called really means the dispatcher stayed silent rather than
     * that the proxy filtered the call out.
     *
     * No encryptKey, so signature verification is skipped and invoke accepts
     * plaintext payloads.
     */
    const dispatcher = new EventDispatcher({
        logger,
        loggerLevel: LoggerLevel.trace,
    });

    return { logger, dispatcher };
}

/**
 * The constructor registers the built-in app_ticket handler and logs while
 * doing so; clear that noise before exercising the behaviour under test.
 */
function clearLogs(logger: MockLogger) {
    Object.keys(logger).forEach((level) => logger[level].mockClear());
}

/**
 * LoggerProxy packs its varargs into a single array before handing them to the
 * logger, so each recorded call has to be flattened back into text.
 */
function logTexts(fn: jest.Mock): string[] {
    return fn.mock.calls.map((call) => call.flat(Infinity).map(String).join(' '));
}

const eventOf = (type: string) => ({
    schema: '2.0',
    header: { event_type: type },
    event: {},
});

describe('EventDispatcher#unregister', () => {
    test('stops dispatching an event once its handler is removed', async () => {
        const { dispatcher } = makeDispatcher();
        const handler = jest.fn();
        dispatcher.register({ 'a.b': handler });

        dispatcher.unregister('a.b');

        expect(await dispatcher.invoke(eventOf('a.b'))).toBe(
            'no a.b event handle'
        );
        expect(handler).not.toHaveBeenCalled();
    });

    test('returns the dispatcher itself so register can be chained onto it', async () => {
        const { dispatcher } = makeDispatcher();
        const oldHandler = jest.fn();
        const newHandler = jest.fn();
        dispatcher.register({ 'a.b': oldHandler });

        const chained = dispatcher.unregister('a.b');

        expect(chained).toBe(dispatcher);
        chained.register({ 'a.b': newHandler });
        await dispatcher.invoke(eventOf('a.b'));
        expect(newHandler).toHaveBeenCalledTimes(1);
        expect(oldHandler).not.toHaveBeenCalled();
    });

    test('removes every key passed in a single call and leaves the rest registered', async () => {
        const { dispatcher } = makeDispatcher();
        const handlerA = jest.fn();
        const handlerB = jest.fn();
        const handlerC = jest.fn();
        dispatcher.register({ a: handlerA, b: handlerB, c: handlerC });

        dispatcher.unregister('a', 'b');

        expect(await dispatcher.invoke(eventOf('a'))).toBe('no a event handle');
        expect(await dispatcher.invoke(eventOf('b'))).toBe('no b event handle');
        await dispatcher.invoke(eventOf('c'));
        expect(handlerA).not.toHaveBeenCalled();
        expect(handlerB).not.toHaveBeenCalled();
        expect(handlerC).toHaveBeenCalledTimes(1);
    });

    test('treats unknown keys, repeated calls and an empty argument list as safe no-ops', async () => {
        const { dispatcher, logger } = makeDispatcher();
        const handlerAB = jest.fn();
        const untouchedHandler = jest.fn();
        dispatcher.register({ 'a.b': handlerAB, c: untouchedHandler });
        clearLogs(logger);

        expect(() => {
            dispatcher.unregister('never.registered');
            dispatcher.unregister('a.b');
            dispatcher.unregister('a.b');
            dispatcher.unregister();
            dispatcher.unregister('__proto__');
        }).not.toThrow();

        expect(logger.error).not.toHaveBeenCalled();
        /**
         * The registry has to stay a Map. In a plain object '__proto__' would
         * be a prototype accessor rather than an ordinary entry, so asserting
         * on the container type is what actually guards this invariant.
         */
        expect(dispatcher.handles).toBeInstanceOf(Map);
        await dispatcher.invoke(eventOf('c'));
        expect(untouchedHandler).toHaveBeenCalledTimes(1);
    });

    test('warns that removing app_ticket makes ISV token lookups trigger a resend', async () => {
        const { dispatcher, logger } = makeDispatcher();
        clearLogs(logger);

        dispatcher.unregister('app_ticket');

        expect(await dispatcher.invoke(eventOf('app_ticket'))).toBe(
            'no app_ticket event handle'
        );
        /**
         * invoke's own miss path warns as well, so match on the presence of the
         * removal notice instead of counting warnings.
         */
        expect(
            logTexts(logger.warn).some(
                (text) => text.includes('app_ticket') && text.includes('resend')
            )
        ).toBe(true);
        expect(logger.error).not.toHaveBeenCalled();
    });
});

describe('EventDispatcher#register', () => {
    test('logs nothing at warn or error when a handler is replaced via unregister', async () => {
        const { dispatcher, logger } = makeDispatcher();
        const oldHandler = jest.fn();
        const newHandler = jest.fn();
        dispatcher.register({ 'a.b': oldHandler });
        clearLogs(logger);

        dispatcher.unregister('a.b');
        dispatcher.register({ 'a.b': newHandler });
        await dispatcher.invoke(eventOf('a.b'));

        expect(logger.error).not.toHaveBeenCalled();
        expect(logger.warn).not.toHaveBeenCalled();
        expect(newHandler).toHaveBeenCalledTimes(1);
        expect(oldHandler).not.toHaveBeenCalled();
    });

    test('warns rather than errors when a handler is overwritten without unregister', async () => {
        const { dispatcher, logger } = makeDispatcher();
        const oldHandler = jest.fn();
        const newHandler = jest.fn();
        dispatcher.register({ 'a.b': oldHandler });
        clearLogs(logger);

        dispatcher.register({ 'a.b': newHandler });
        await dispatcher.invoke(eventOf('a.b'));

        expect(logger.error).not.toHaveBeenCalled();
        expect(logger.warn).toHaveBeenCalledTimes(1);
        const [warning] = logTexts(logger.warn);
        expect(warning).toContain('a.b');
        expect(warning).toContain('unregister');
        expect(newHandler).toHaveBeenCalledTimes(1);
        expect(oldHandler).not.toHaveBeenCalled();
    });

    test('stays silent when the built-in app_ticket handler is overwritten', async () => {
        const { dispatcher, logger } = makeDispatcher();
        const custom = jest.fn();
        clearLogs(logger);

        dispatcher.register({ app_ticket: custom });
        await dispatcher.invoke(eventOf('app_ticket'));

        expect(logger.error).not.toHaveBeenCalled();
        expect(logger.warn).not.toHaveBeenCalled();
        expect(custom).toHaveBeenCalledTimes(1);
    });

    test('keeps register-only usage behaving exactly as before', async () => {
        const { dispatcher, logger } = makeDispatcher();
        const handler = jest.fn().mockResolvedValue('handled');
        clearLogs(logger);

        expect(dispatcher.register({ 'x.y': handler })).toBe(dispatcher);
        expect(logger.error).not.toHaveBeenCalled();
        expect(logger.warn).not.toHaveBeenCalled();

        await expect(dispatcher.invoke(eventOf('x.y'))).resolves.toBe(
            'handled'
        );
        expect(handler).toHaveBeenCalledTimes(1);
        expect(await dispatcher.invoke(eventOf('z.w'))).toBe(
            'no z.w event handle'
        );
    });
});
