<<<<<<< HEAD
interface IHTTPClient {
  put<R, T>(request: HTTPRequest<T>): Promise<R>;
=======
interface HTTPResponse<R> {
  statusCode: number;
  data: R;
}
interface ErrorResponse extends HTTPResponse<object> {}
interface IHTTPClient {
  put<R, T>(request: HTTPRequest<T>): Promise<HTTPResponse<R>>;
>>>>>>> authentication_service
}

interface HTTPRequest<T> {
  endpoint: string;
  body?: T;
  headers?: object;
}
<<<<<<< HEAD
export { IHTTPClient, HTTPRequest };
=======

export { ErrorResponse, IHTTPClient, HTTPRequest, HTTPResponse };
>>>>>>> authentication_service
