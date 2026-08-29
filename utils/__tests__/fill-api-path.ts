import { fillApiPath } from '../fill-api-path';

describe('fillApiPath', () => {
    test('fill right', () => {
        expect(fillApiPath('https://aaa', {})).toBe('https://aaa');
        expect(fillApiPath('https://s/:aaa', { aaa: 'b' })).toBe('https://s/b');
        expect(
            fillApiPath('https://s/:aaa/:ccc', { aaa: 'b', ccc: 'cc' })
        ).toBe('https://s/b/cc');
    });

    test('preserve explicit port in custom domain', () => {
        expect(
            fillApiPath('http://localhost:3000/open-apis/items/:item_id', {
                item_id: 'item-1',
            })
        ).toBe('http://localhost:3000/open-apis/items/item-1');
        expect(fillApiPath('http://localhost:3000/open-apis/ping')).toBe(
            'http://localhost:3000/open-apis/ping'
        );
    });

    test('miss argument', () => {
        expect(() =>
            fillApiPath('http://s/:aaa/:bbb', { aaa: '1' })
        ).toThrowError('request miss bbb path argument');
    });
});
