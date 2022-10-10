import { AESCipher } from '@node-sdk/utils/aes-cipher';

export const generateChallenge = (
    data: any,
    options: {
        encryptKey: string;
    }
) => {
    if ('encrypt' in data && !options.encryptKey) {
        throw new Error(
            'auto-challenge need encryptKey, please check for missing in dispatcher'
        );
    }

    const targetData =
        'encrypt' in data
            ? JSON.parse(
                  new AESCipher(options.encryptKey).decrypt(data.encrypt)
              )
            : data;

    return {
        isChallenge: targetData.type === 'url_verification',
        challenge: {
            challenge: targetData.challenge,
        },
    };
};
