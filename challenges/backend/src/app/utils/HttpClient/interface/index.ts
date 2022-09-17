interface HTTPResponse<R> {
  statusCode: number;
  data: R;
}
type ErrorResponse = HTTPResponse<object>;
interface IHTTPClient {
  put<R, T>(request: HTTPRequest<T>): Promise<HTTPResponse<R>>;
  get<R>(request: HTTPRequest): Promise<HTTPResponse<R>>;
}
interface AuthHeaders {
  authtoken: string;
  userid: string;
}
interface HTTPRequest<T = unknown> {
  endpoint: string;
  body?: T;
  headers?: AuthHeaders;
}

export { ErrorResponse, IHTTPClient, HTTPRequest, HTTPResponse };
