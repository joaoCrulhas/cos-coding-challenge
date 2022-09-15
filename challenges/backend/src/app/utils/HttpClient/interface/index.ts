interface HTTPResponse<R> {
  statusCode: number;
  data: R;
}
interface ErrorResponse extends HTTPResponse<object> {}
interface IHTTPClient {
  put<R, T>(request: HTTPRequest<T>): Promise<HTTPResponse<R>>;
}

interface HTTPRequest<T> {
  endpoint: string;
  body?: T;
  headers?: object;
}


export { ErrorResponse, IHTTPClient, HTTPRequest, HTTPResponse };
