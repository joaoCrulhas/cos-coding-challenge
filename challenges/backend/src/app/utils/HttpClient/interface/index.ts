interface IHTTPClient {
  put<R, T>(request: HTTPRequest<T>): Promise<R>;
}

interface HTTPRequest<T> {
  endpoint: string;
  body?: T;
  headers?: object;
}
export { IHTTPClient, HTTPRequest };
