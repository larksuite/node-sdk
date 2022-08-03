import { fillApiPath } from '../fill-api-path';

describe('fillApiPath', () => {
    test('fill right', () => {
        expect(fillApiPath('https://aaa', {})).toBe('https://aaa');
        expect(fillApiPath('https://s:aaa', { aaa: 'b' })).toBe('https://sb');
        expect(fillApiPath('https://s:aaa/:ccc', { aaa: 'b', ccc: 'cc' })).toBe(
            'https://sb/cc'
        );
    });

    test('miss argument', () => {
        expect(() =>
            fillApiPath('http://s:aaa/:bbb', { aaa: '1' })
        ).toThrowError('request miss bbb path argument');
    });
});
