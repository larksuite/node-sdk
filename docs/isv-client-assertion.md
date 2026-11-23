# ClientAssertion authentication for ISV apps

ClientAssertion authentication for ISV apps must be enabled by the platform. Server-side support is currently limited to ByteDance internal scenarios. The target tenant must install the app and grant the required permissions. The SDK reuses the existing provider and does not generate or store private keys.

To obtain a tenant access token (TAT), the SDK sends a JSON request to `/oauth/v3/token` with `grant_type: client_credentials`, `client_id`, `client_assertion_type`, `client_assertion`, and `tenant_key`. Cached tokens are isolated by app, tenant, and OAuth endpoint. Token expiry and cache failure handling follow the SDK's existing behavior.

User access tokens (UATs) use the existing authorization code exchange and refresh methods, with the `authorization_code` and `refresh_token` grant types respectively. These requests do not include `tenant_key`. Pass the UAT explicitly when calling a business API to avoid triggering a TAT exchange.

The JWT bearer grant for self-built apps, AppSecret authentication, provider precedence, request retries, and TargetInfo proxy routing remain unchanged. Automatic token retrieval for keyless ISV apps does not use AppTicket or AppAccessToken.

```typescript
import * as lark from '@larksuiteoapi/node-sdk';

const client = new lark.Client({
    appId,
    appType: lark.AppType.ISV,
    clientAssertionProvider: provider,
});
const response = await client.request(
    { method: 'GET', url: apiPath },
    lark.withTenantKey(tenantKey),
);
```

`provider` implements the existing `ClientAssertionProvider` interface. Exchange a user authorization code with `client.accessToken.retrieveByAuthorizationCode({ code })` and refresh a UAT with `client.accessToken.refresh({ refreshToken })`. Pass the UAT explicitly to business API calls with `lark.withUserAccessToken(userAccessToken)`.

For a custom business API domain, configure the existing OAuth base URL option. The provider's `aud` remains the actual OAuth host. Do not log assertions, access tokens, authorization codes, or refresh tokens.
