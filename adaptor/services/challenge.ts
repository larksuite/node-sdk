import { AESCipher } from '@node-sdk/utils/aes-cipher';
import { isVerificationTokenValid } from '@node-sdk/dispatcher/verification-token';

/** Validate a URL verification request before returning its challenge. */
export const generateChallenge = (
    data: any,
    options: {
        encryptKey: string;
        verificationToken?: string;
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

    const isChallenge = targetData.type === 'url_verification';
    if (
        isChallenge &&
        options.verificationToken &&
        !isVerificationTokenValid(targetData.token, options.verificationToken)
    ) {
        throw new Error('invalid verification token');
    }

    return {
        isChallenge,
        challenge: {
            challenge: targetData.challenge,
        },
    };
};
