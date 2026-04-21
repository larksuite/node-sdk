export interface QRCodeInfo {
    url: string;
    expireIn: number;
}

export interface StatusChangeInfo {
    status: 'polling' | 'slow_down' | 'domain_switched';
    interval?: number;
}

export interface RegisterAppOptions {
    domain?: string;
    larkDomain?: string;
    source?: string;
    signal?: AbortSignal;
    onQRCodeReady: (info: QRCodeInfo) => void;
    onStatusChange?: (info: StatusChangeInfo) => void;
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
