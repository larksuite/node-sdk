import { detectReceiveIdType } from '../routing';

describe('detectReceiveIdType', () => {
    test('oc_* → chat_id', () => {
        expect(detectReceiveIdType('oc_abcdef')).toBe('chat_id');
    });

    test('ou_* → open_id', () => {
        expect(detectReceiveIdType('ou_12345')).toBe('open_id');
    });

    test('on_* → union_id', () => {
        expect(detectReceiveIdType('on_xyz')).toBe('union_id');
    });

    test('contains @ → email', () => {
        expect(detectReceiveIdType('alice@example.com')).toBe('email');
    });

    test('otherwise → user_id', () => {
        expect(detectReceiveIdType('u_plain123')).toBe('user_id');
        expect(detectReceiveIdType('some_internal_id')).toBe('user_id');
    });

    test('throws on empty', () => {
        expect(() => detectReceiveIdType('')).toThrow();
    });
});
