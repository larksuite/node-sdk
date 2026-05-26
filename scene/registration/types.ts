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

export interface RegisterAppOptions {
    domain?: string;
    larkDomain?: string;
    source?: string;
    signal?: AbortSignal;
    onQRCodeReady: (info: QRCodeInfo) => void;
    onStatusChange?: (info: StatusChangeInfo) => void;
    /** Pre-fill values for the app-creation page. See {@link AppPreset}. */
    appPreset?: AppPreset;
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
