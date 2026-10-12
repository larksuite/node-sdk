/** A consistent snapshot of the credentials used by one webhook request. */
export interface WebhookCredentials {
    encryptKey: string;
    verificationToken: string;
}

/** Read locally cached credentials; bound any external I/O inside the provider. */
export type WebhookCredentialsProvider = () =>
    | WebhookCredentials
    | Promise<WebhookCredentials>;
