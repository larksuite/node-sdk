import RequestHandle from './request-handle';
import { WebhookCredentialsProvider } from './webhook-credentials';
import { Logger } from '@node-sdk/typings';

interface WebhookRequest {
    encryptKey: string;
    verificationToken?: string;
    invoke: (data: any) => Promise<any>;
}

// Weak references keep the adapter bridge internal without retaining dispatchers.
const requestFactories = new WeakMap<object, () => Promise<WebhookRequest>>();

/** Register an internal request factory without exposing credential injection. */
export function registerWebhookRequestFactory(
    dispatcher: object,
    factory: () => Promise<WebhookRequest>
) {
    requestFactories.set(dispatcher, factory);
}

/** Obtain one request-local processor shared by the adapter and dispatcher. */
export function createWebhookRequest(
    dispatcher: object
): Promise<WebhookRequest> {
    const factory = requestFactories.get(dispatcher);
    if (!factory) {
        return Promise.reject(
            new Error('webhook request processor unavailable')
        );
    }
    return factory();
}

/** Resolve and copy dynamic credentials before processing any request data. */
export async function resolveRequestHandle(
    provider: WebhookCredentialsProvider | undefined,
    staticHandle: RequestHandle | undefined,
    logger: Logger
): Promise<RequestHandle | undefined> {
    if (provider === undefined) {
        return staticHandle;
    }
    try {
        const credentials = await provider();
        if (
            !credentials ||
            typeof credentials !== 'object' ||
            Array.isArray(credentials)
        ) {
            throw new Error('invalid credentials');
        }
        const { encryptKey, verificationToken } = credentials;
        if (
            typeof encryptKey !== 'string' ||
            typeof verificationToken !== 'string'
        ) {
            throw new Error('invalid credentials');
        }
        return new RequestHandle({ encryptKey, verificationToken, logger });
    } catch {
        // Provider failures can contain secrets; discard both message and cause.
        throw new Error('webhook credentials provider failed');
    }
}
