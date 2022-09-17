import { HTTPRequest, IHTTPClient, HTTPResponse } from "../interface";
import axios, { AxiosInstance } from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
@injectable()
class AxiosClientImpl implements IHTTPClient {
  private axios: AxiosInstance;
  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      timeout: 5000,
      headers: { "Content-Type": "application/json" },
    });
  }
  public async get<R>(request: HTTPRequest): Promise<HTTPResponse<R>> {
    const { endpoint, headers } = request;
    const config = {
      headers: {
        authtoken: headers?.authtoken || "",
        userid: headers?.userid || "",
      },
    };
    const { data, status } = await this.axios.get<R>(endpoint, config);
    return {
      statusCode: status,
      data,
    };
  }
  public async put<R, T>(request: HTTPRequest<T>): Promise<HTTPResponse<R>> {
    const { body, endpoint } = request;
    const { data, status } = await this.axios.put<R>(endpoint, body);
    return {
      statusCode: status,
      data,
    };
  }
}
export { AxiosClientImpl };
