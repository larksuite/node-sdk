import { mergeObject } from '../merge-object';

describe('merge object', () => {
  test('normal merge', () => {
    expect(mergeObject({a: 1}, {b: 2})).toEqual({a: 1, b: 2});
  });

  test('intersect merge', () => {
    expect(mergeObject({a: 1}, {a: 2})).toEqual({a: 2});
  });

  test('undefined merge', () => {
    expect(mergeObject({a: 1, b: undefined}, { b: 2, c: undefined })).toEqual({a: 1, b: 2});
    expect(mergeObject({a: 1, b: undefined}, { a: 2, c: 3 })).toEqual({a: 2, b: undefined, c: 3});
  });
});