import assert from "assert";
import sinon from "sinon";
import { HTTPRequest, IHTTPClient } from "../../../utils/HttpClient/interface";

import { ILogger } from "../../Logger/interface/ILogger";
import { IAuthentication } from "../interface/IAuthentication";
import { Authentication } from "./Authentication";
class HttpClientStub implements IHTTPClient {
  async put<T>(request: HTTPRequest<T>): Promise<any> {
    return request;
  }
}

class LoggerStub implements ILogger {
  log(message: string): void {
    console.log(message);
  }
}

const makeHttpClientStub = () => {
  const httpClient = new HttpClientStub();
  return {
    httpClient,
  };
};
const makeSut = (): {
  sut: IAuthentication;
  httpClient: IHTTPClient;
} => {
  const { httpClient } = makeHttpClientStub();

  const logStub = new LoggerStub();
  const sut = new Authentication(() => httpClient, logStub);
  return {
    httpClient,
    sut,
  };
};

describe("Authentication Service", () => {
  it("should call the at least once to call authentication endpoint", () => {
    const { sut, httpClient } = makeSut();
    const spy = sinon.spy(httpClient, "put");
    sut.authentication({
      email: "userMailTest@gmail.com",
      password: "string",
      meta: "string",
    });
    sinon.assert.calledOnce(spy);
  });
  it("should call httpClient with correct arguments", async () => {
    const { sut, httpClient } = makeSut();
    const spy = sinon.spy(httpClient, "put");
    await sut.authentication({
      email: "userMailTest@gmail.com",
      password: "any_string",
      meta: "string",
    });
    sinon.assert.calledWith(
      spy,
      sinon.match({
        endpoint: "api/v1/authentication/userMailTest@gmail.com",
        body: { password: "any_string", meta: "string" },
      })
    );
  });
  it("Should return an authenticated user if the request to create a token happened successfully", async () => {
    const { sut, httpClient } = makeSut();
    sinon.stub(httpClient, "put").resolves({
      statusCode: 201,
      data: {
        token: "token",
        authenticated: true,
        userId: "buyer-challenge@caronsale.de",
        internalUserId: 2324,
        internalUserUUID: "054d4577-69a0-4e4b-8e5e-975bcf8c62c7",
        type: "1",
        privileges: "{SALESMAN_USER}",
      },
    });
    const response = await sut.authentication({
      email: "userMailTest@gmail.com",
      password: "userPassword",
    });
    assert.deepStrictEqual(response, {
      token: "token",
      authenticated: true,
      userId: "buyer-challenge@caronsale.de",
      internalUserId: 2324,
      internalUserUUID: "054d4577-69a0-4e4b-8e5e-975bcf8c62c7",

      type: "1",
      privileges: "{SALESMAN_USER}",
    });
  });
  beforeEach(() => {
    sinon.restore();
  });
});
