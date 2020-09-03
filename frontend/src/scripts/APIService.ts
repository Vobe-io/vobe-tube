import { ApiMethod, ApiResponse, KeyValue } from 'scripts/types';

export class APIService {
	private _method: ApiMethod = "POST";
	private _headers: string[][] = [];


	get method (): ApiMethod {
		return this._method;
	}

	set method (newMethod: ApiMethod) {
		this._method = newMethod;
	}

	public setMethod (newMethod: ApiMethod): APIService {
		this._method = newMethod;
		return this;
	}

	get headers (): string[][] {
		return this._headers;
	}

	public setHeaders (headers: KeyValue<string, string>[]): APIService {
		for (const i in headers) {
			if (headers[i].hasOwnProperty('key')
				&& headers[i].hasOwnProperty('value')) {
				this._headers.push([headers[i].key, headers[i].value]);
			}
		}
		return this;
	}

	public resetHeaders (): void {
		this._headers = [];
	}

	public request<T> (body: T, method: ApiMethod = this._method, headers: string[][] = this._headers): RequestInit {
		return {
			headers: headers,
			method: method,
			body: JSON.stringify(body)
		}
	}
}

export class RequestBody<T> {
	constructor (private _requestBody: T) {
	}

	get requestBody (): T {
		return this._requestBody;
	}

	set requestBody (newRequestBody: T) {
		this._requestBody = newRequestBody;
	}
}

interface FetchCallback<T> {
	(data: ApiResponse<T>): void
}

export async function commonFetch<T>(info: RequestInfo, init?: RequestInit, response?: FetchCallback<T>) {
	fetch(info, init)
	.then(res => parseResult<T>(res))
	.then(data => {
		if(response) response(data);
	})
	.catch(() => console.log("Server is not responding"));
}

export function parseResult<T>(response: Response) {
  return new Promise<ApiResponse<T>>((resolve) => {
      response.json().then(data => resolve({
        success: response.ok,
        Code: response.status,
        Description: response.statusText,
        Response: data
      }));
  });
}


export default APIService;