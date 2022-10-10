import { generateChallenge } from '../challenge';

describe('generateChallenge(data, options)', () => {
    it('generate right with normal challenge', () => {
        expect(
            generateChallenge(
                {
                    challenge: 'ajls384kdjx98XX',
                    type: 'url_verification',
                },
                {
                    encryptKey: '',
                }
            )
        ).toEqual({
            isChallenge: true,
            challenge: {
                challenge: 'ajls384kdjx98XX',
            },
        });
    });

    it('generate right with encrypt challenge', () => {
        expect(
            generateChallenge(
                {
                    encrypt:
                        'tT1xP+ovuc0T3b/rnZX3ax76exqAn0ANQ6/U45GcciC0mgNBc8JtvqOJGNAPMKpgRs2dVU1NYk9VDeqS8T4SYtU0hzNU54aS84WnxvZ3VFfDcy/RyABlNqlUiGyLDzFI0yxdCMT4KR/YEQXlt6nZi50KwRlZ+A75r645KesZuLMljezYyY8VeeXEVjPw35+e',
                },
                {
                    encryptKey: 'mazhe.nerd',
                }
            )
        ).toEqual({
            isChallenge: true,
            challenge: {
                challenge: '5634b122-c042-4634-bc7f-b07a3c3e77ad',
            },
        });
    });

    it('generate right with no challenge', () => {
        expect(
            generateChallenge(
                {},
                {
                    encryptKey: '',
                }
            )
        ).toEqual({
            isChallenge: false,
            challenge: {
                challenge: undefined,
            },
        });
    });

    it('should throw in encrypt scene but not pass encryptKey', () => {
        expect(() =>
            generateChallenge(
                {
                    encrypt: 'encrypt',
                },
                {
                    encryptKey: '',
                }
            )
        ).toThrowError(
            'auto-challenge need encryptKey, please check for missing in dispatcher'
        );
    });
});
