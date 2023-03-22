export interface HttpInstance {
    request<T = any, R = T, D = any>(opts: HttpRequestOptions<D>): Promise<R>;
	get<T = any, R = T, D = any>(url: string, opts?: HttpRequestOptions<D>): Promise<R>;
	delete<T = any, R = T, D = any>(url: string, opts?: HttpRequestOptions<D>): Promise<R>;
	head<T = any, R = T, D = any>(url: string, opts?: HttpRequestOptions<D>): Promise<R>;
	options<T = any, R = T, D = any>(url: string, opts?: HttpRequestOptions<D>): Promise<R>;
	post<T = any, R = T, D = any>(url: string, data?: D, opts?: HttpRequestOptions<D>): Promise<R>;
	put<T = any, R = T, D = any>(url: string, data?: D, opts?: HttpRequestOptions<D>): Promise<R>;
	patch<T = any, R = T, D = any>(url: string, data?: D, opts?: HttpRequestOptions<D>): Promise<R>;
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
