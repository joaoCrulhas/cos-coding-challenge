import { HTTPRequest, IHTTPClient } from "../interface";
import axios, { AxiosError, AxiosInstance } from "axios";
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
  async put<R, T>(request: HTTPRequest<T>): Promise<R> {
    try {
      const { body, endpoint } = request;
      const response = await this.axios.put(endpoint, body);
      return response.data as R;
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        console.log("Patinhos");
        console.log(error.message);
        console.log(error.status);
        console.log(error.response?.data);
      }
      console.log("To aqui");
      throw new Error("error");
    }
  }
}
export { AxiosClientImpl };
