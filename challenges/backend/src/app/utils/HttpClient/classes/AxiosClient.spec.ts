import { API_ENDPOINTS } from "../../ApiEndpoints";
import { HTTPRequest } from "../interface";
import { AxiosClientImpl } from "./AxiosClient";
import env from "env-var";
import nock from "nock";
import { UserAuthentication } from "../../../services/Authentication/entities/UserAuthentication";
import assert from "assert";

const makeSut = () => {
  const baseURL = env.get("COS_BASE_URL").required(true).asString();
  const sut = new AxiosClientImpl(baseURL);
  return {
    sut,
  };
};
describe("Testing the AxiosClientIntegration", () => {
  beforeEach(() => {
    process.env.COS_BASE_URL = "https://api-core-dev.caronsale.de";
  });
<<<<<<< HEAD
  it("Should call http put method with correct params", async () => {
=======
  it("Should return a user if the server response return an user", async () => {
>>>>>>> authentication_service
    const endpoint = `/${API_ENDPOINTS.TOKEN_GENERATOR}/teste%40gmail.com`;
    nock("https://api-core-dev.caronsale.de", {
      encodedQueryParams: true,
    })
      .put(endpoint)
      .reply(201, {
        token: "e",
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
    const { sut } = makeSut();
    const createTokenRequest: HTTPRequest<UserAuthentication> = {
      endpoint,
      body: {
        password: "any_password",
        meta: "string",
      },
    };
    const response = await sut.put(createTokenRequest);
    assert.deepStrictEqual(response, {
<<<<<<< HEAD
      token: "e",
      authenticated: true,
      userId: "buyer-challenge@caronsale.de",
      internalUserId: 2324,
      internalUserUUID: "054d4577-69a0-4e4b-8e5e-975bcf8c62c7",
      type: 1,
      privileges: "{SALESMAN_USER}",
=======
      statusCode: 201,
      data: {
        token: "e",
        authenticated: true,
        userId: "buyer-challenge@caronsale.de",
        internalUserId: 2324,
        internalUserUUID: "054d4577-69a0-4e4b-8e5e-975bcf8c62c7",
        type: "1",
        privileges: "{SALESMAN_USER}",
      },
>>>>>>> authentication_service
    });
  });
});
