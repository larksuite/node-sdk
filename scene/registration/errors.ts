export type RegisterAppErrorCode =
    | 'access_denied'
    | 'expired_token'
    | 'abort';

export interface RegisterAppError {
    code: RegisterAppErrorCode | string;
    description: string;
}

export function createError(code: RegisterAppErrorCode | string, description: string): RegisterAppError {
    return { code, description };
}
