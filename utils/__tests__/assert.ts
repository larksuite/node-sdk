import { assert } from '../assert';

describe('assert', () => {
    test('predication is boolean', () => {
        const callback = jest.fn(() => {});

        assert(false, callback);
        expect(callback).not.toBeCalled();
        callback.mockClear();

        assert(true, callback);
        expect(callback).toBeCalled();
    });

    test('predication is function', () => {
        const callback = jest.fn(() => {});

        assert(() => false, callback);
        expect(callback).not.toBeCalled();
        callback.mockClear();

        assert(() => true, callback);
        expect(callback).toBeCalled();
    });

    test('async case', () => {
        const callback = jest.fn(async () => {});

        assert(() => true, callback);
        expect(callback).toBeCalled();
        callback.mockClear();

        assert(false, callback);
        expect(callback).not.toBeCalled();
    });
});
