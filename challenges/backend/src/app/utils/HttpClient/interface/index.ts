interface HTTPResponse<R> {
  statusCode: number;
  data: R;
}
interface ErrorResponse extends HTTPResponse<object> {}
interface IHTTPClient {
  put<R, T>(request: HTTPRequest<T>): Promise<HTTPResponse<R>>;
  get<R>(request: HTTPRequest): Promise<HTTPResponse<R>>;
}
interface AuthHeaders {
  accept: string;
  authtoken: string;
  userid: string;
}
interface HTTPRequest<T = {}> {
  endpoint: string;
  body?: T;
  headers?: AuthHeaders;
}

export { ErrorResponse, IHTTPClient, HTTPRequest, HTTPResponse };
