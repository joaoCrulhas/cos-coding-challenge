import { HTTPRequest, IHTTPClient, HTTPResponse } from "../interface";
import axios, { AxiosInstance } from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
@injectable()
class AxiosClientImpl implements IHTTPClient {
  private axios: AxiosInstance;
  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL: baseURL,
      timeout: 5000,
      headers: { "Content-Type": "application/json" },
    });
  }
  async put<R, T>(request: HTTPRequest<T>): Promise<HTTPResponse<R>> {
    const { body, endpoint } = request;
    const { status, data } = await this.axios.put(endpoint, body);
    return {
      statusCode: status,
      data,
    };
  }
}
export { AxiosClientImpl };
