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
  it("Should return a user if the server response return an user", async () => {
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
        type: "1",
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
    });
  });
  it("Should return a list of auctions if api return a success message", async () => {
    const endpoint = API_ENDPOINTS.AUCTION_BIDDING.replace(
      "{customerId}",
      "test@gmail.com"
    );
    nock("https://api-core-dev.caronsale.de", {
      encodedQueryParams: true,
    })
      .get(`/${endpoint}`)
      .reply(200, [
        {
          uuid: "14dd0028-1e41-428e-8f2e-db071a2a6bdc",
          state: 2,
          endingTime: "2022-09-16T15:06:00.000Z",
          remainingTimeInSeconds: 97759,
          remainingTimeForInstantPurchaseInSeconds: null,
          instantPurchasePossibleUntil: null,
          _fk_uuid_highestBiddingBuyerUser: null,
          currentHighestBidValue: 200,
          currentHighestBidValueNet: 0,
          minimumRequiredAsk: 400,
          minimumRequiredAskNet: null,
          numBids: 0,
          amIHighestBidder: false,
          biddingAgentValue: null,
          isMinAskReached: false,
          isCrossBorderNetSale: false,
          buyerPurchaseFee: 89,
          buyerCrossBorderProcessingAmount: 0,
          additionalTaxValue: null,
          additionalTaxType: 0,
          additionalTaxExportDiscount: 0,
        },
      ]);
    const { sut } = makeSut();
    const request: HTTPRequest = {
      endpoint,
      headers: {
        accept: "application/json",
        authtoken: "token",
        userid: "test@gmail.com",
      },
    };
    const response = await sut.get(request);
    assert.deepStrictEqual(response, {
      statusCode: 200,
      data: [
        {
          uuid: "14dd0028-1e41-428e-8f2e-db071a2a6bdc",
          state: 2,
          endingTime: "2022-09-16T15:06:00.000Z",
          remainingTimeInSeconds: 97759,
          remainingTimeForInstantPurchaseInSeconds: null,
          instantPurchasePossibleUntil: null,
          _fk_uuid_highestBiddingBuyerUser: null,
          currentHighestBidValue: 200,
          currentHighestBidValueNet: 0,
          minimumRequiredAsk: 400,
          minimumRequiredAskNet: null,
          numBids: 0,
          amIHighestBidder: false,
          biddingAgentValue: null,
          isMinAskReached: false,
          isCrossBorderNetSale: false,
          buyerPurchaseFee: 89,
          buyerCrossBorderProcessingAmount: 0,
          additionalTaxValue: null,
          additionalTaxType: 0,
          additionalTaxExportDiscount: 0,
        },
      ],
    });
  });
});
