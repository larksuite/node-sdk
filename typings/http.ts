export interface HttpInstance {
    request<T = any, R = T, D = any>(opts: HttpRequestOptions<D>): Promise<R>;
}

export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

export interface HttpRequestOptions<D> {
	url?: string;
	method?: string;
	headers?: Record<string, any>;
	params?: Record<string, any>;
	data?: D;
	responseType?: ResponseType;
}
