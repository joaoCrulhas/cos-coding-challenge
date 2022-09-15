import assert from "assert";
import sinon from "sinon";
import { HTTPRequest, IHTTPClient } from "../../../utils/HttpClient/interface";
<<<<<<< HEAD
=======
import { ILogger } from "../../Logger/interface/ILogger";
>>>>>>> authentication_service
import { IAuthentication } from "../interface/IAuthentication";
import { Authentication } from "./Authentication";

class HttpClientStub implements IHTTPClient {
  async put<T>(request: HTTPRequest<T>): Promise<any> {
    return request;
  }
}

<<<<<<< HEAD
=======
class LoggerStub implements ILogger {
  log(message: string): void {
    console.log(message);
  }
}

>>>>>>> authentication_service
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
<<<<<<< HEAD
  const sut = new Authentication(httpClient);
=======
  const logStub = new LoggerStub();
  const sut = new Authentication(() => httpClient, logStub);
>>>>>>> authentication_service
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
<<<<<<< HEAD
      token: "token",
      authenticated: true,
      userId: "buyer-challenge@caronsale.de",
      internalUserId: 2324,
      internalUserUUID: "054d4577-69a0-4e4b-8e5e-975bcf8c62c7",
      type: 1,
      privileges: "{SALESMAN_USER}",
=======
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
>>>>>>> authentication_service
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
<<<<<<< HEAD
      type: 1,
=======
      type: "1",
>>>>>>> authentication_service
      privileges: "{SALESMAN_USER}",
    });
  });
  beforeEach(() => {
    sinon.restore();
  });
});
