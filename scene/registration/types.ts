export interface QRCodeInfo {
    url: string;
    expireIn: number;
}

export interface StatusChangeInfo {
    status: 'polling' | 'slow_down' | 'domain_switched';
    interval?: number;
}

/**
 * Pre-fill values shown on the app-creation page after the user scans the QR
 * code. All fields are optional and the user can still edit them on the page;
 * the final values are whatever the user submits.
 */
export interface AppPreset {
    /**
     * App avatar URL(s). Pass a single URL or 1-6 URLs. The first one is the
     * default selection. Each URL must point to a publicly reachable image
     * (png / jpg / jpeg / webp / gif).
     */
    avatar?: string | string[];
    /** App name. Supports `{user}` placeholder, replaced with the scanning user's name. */
    name?: string;
    /** App description. Supports `{user}` placeholder. */
    desc?: string;
}

/**
 * Incremental app config pre-filled into the confirm page shown after the
 * user scans the QR code. Field names align with the app manifest, so a
 * future manifest JSON can be picked into this shape directly.
 *
 * Only these 5 public manifest fields may travel on the URL. Sensitive config
 * (`events.subscription_type` / `request_url` / `security.*` / encrypt keys)
 * must go through the "update application config" OpenAPI instead and is
 * rejected by {@link encodeAddons}.
 *
 * Semantics:
 * - Additive only: items are merged on top of the platform base template;
 *   base permissions can never be removed.
 * - Item names are not validated by the SDK; names unknown to the platform
 *   catalog are silently dropped by the confirm page.
 * - Requires the platform gray-scale for extra config to be enabled,
 *   otherwise the whole param is ignored and the default flow is used.
 */
export interface AppAddons {
    /**
     * Template base selector, carried as the top-level `preset` field inside
     * the encoded addons payload (parsed by the confirm page, not the backend).
     * - `true` / omitted: keep the platform default template and layer the
     *   declared scopes / events / callbacks on top (additive — same as before).
     * - `false`: drop the default template, use the minimal base (bot capability
     *   only, no business scopes) and show only the explicitly declared items.
     *   With `preset: false` an otherwise-empty addons is valid (minimal base,
     *   zero increments); without it at least one item is still required.
     */
    preset?: boolean;
    /** Permission scopes. */
    scopes?: {
        /** App-identity (tenant) scopes, e.g. `'im:message:send_as_bot'`. */
        tenant?: string[];
        /** User-identity scopes, e.g. `'calendar:calendar:read'`. */
        user?: string[];
    };
    /** Event subscriptions. */
    events?: {
        items?: {
            /** App-identity events, e.g. `'im.message.receive_v1'`. */
            tenant?: string[];
            /** User-identity events, e.g. `'calendar.calendar.event.changed_v4'`. */
            user?: string[];
        };
    };
    /** Callbacks, e.g. `'card.action.trigger'`. */
    callbacks?: {
        items?: string[];
    };
}

export interface RegisterAppOptions {
    domain?: string;
    larkDomain?: string;
    source?: string;
    signal?: AbortSignal;
    onQRCodeReady: (info: QRCodeInfo) => void;
    onStatusChange?: (info: StatusChangeInfo) => void;
    /** Pre-fill values for the app-creation page. See {@link AppPreset}. */
    appPreset?: AppPreset;
    /**
     * Incremental scopes / events / callbacks pre-filled into the confirm
     * page. See {@link AppAddons}.
     */
    addons?: AppAddons;
    /**
     * App id (`cli_xxx`) of an existing app to update. When set, the scan
     * flow updates that app's config instead of creating a new one: the
     * confirm page shows the diff brought by {@link addons} and the user
     * explicitly re-authorizes. Carried on the URL as `clientID`.
     *
     * Ignored when {@link createOnly} is `true` — `createOnly` takes
     * precedence and the page still runs the create-new-app flow.
     */
    appId?: string;
    /**
     * When `true`, the landing page only allows creating a new app — the
     * "select existing app" entry is hidden, preventing the user from
     * accidentally binding an existing app (whose webhook/config could later
     * be overwritten). Any other value keeps the default page flow.
     *
     * Takes precedence over {@link appId}: when both are set, the page still
     * runs the create-new-app flow and the update intent is ignored.
     */
    createOnly?: boolean;
}

export interface UserInfo {
    open_id?: string;
    tenant_brand?: 'feishu' | 'lark';
}

export interface RegisterAppResult {
    client_id: string;
    client_secret: string;
    user_info?: UserInfo;
}

export interface BeginResponse {
    device_code: string;
    verification_uri_complete: string;
    verification_uri: string;
    user_code: string;
    interval: number;
    expires_in: number;
}

export interface PollResponse {
    client_id?: string;
    client_secret?: string;
    user_info?: UserInfo;
    error?: string;
    error_description?: string;
}
