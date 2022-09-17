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
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
  public async get<R>({
    endpoint,
    headers,
  }: HTTPRequest): Promise<HTTPResponse<R>> {
    const { data, status } = await this.axios.get<R>(endpoint, {
      headers: {
        authtoken: headers?.authtoken || "",
        userid: headers?.userid || "",
      },
    });
    return {
      statusCode: status,
      data,
    };
  }
  public async put<R, T>({
    body,
    endpoint,
    headers,
  }: HTTPRequest<T>): Promise<HTTPResponse<R>> {
    const { data, status } = await this.axios.put<R>(endpoint, body, {
      headers: {
        authtoken: headers?.authtoken || "",
        userid: headers?.userid || "",
      },
    });
    return {
      statusCode: status,
      data,
    };
  }
}
export { AxiosClientImpl };
